/**
 * Cloud API Client for Data Illustrator
 * Handles communication with api.dataviz.jp
 */

(function () {
    const API_BASE_URL = window.datavizApiUrl ? `${window.datavizApiUrl}/api` : 'https://api.dataviz.jp/api';
    const APP_NAME = 'data-illustrator';

    const CloudAPI = {
        /**
         * Get Authorization Header from existing session
         */
        async getAuthHeaders() {
            // 1. Try to get session from the exposed Supabase client (preferred)
            const client = window.datavizSupabase || (window.supabase && window.supabase.auth ? window.supabase : null);
            if (client) {
                const { data } = await client.auth.getSession();
                if (data?.session?.access_token) {
                    return {
                        'Authorization': `Bearer ${data.session.access_token}`,
                        'Content-Type': 'application/json'
                    };
                }
            }

            // 2. Fallback: Parse cookies for 'sb-dataviz-auth-token' (matching dataviz-auth-client.js)
            const COOKIE_NAME = 'sb-dataviz-auth-token';

            function getCookie(name) {
                const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                if (match) return match[2];
                return null;
            }

            const tokenCookie = getCookie(COOKIE_NAME);
            if (tokenCookie) {
                try {
                    // Decode: Cookie -> URL Decode -> Base64 Decode -> JSON
                    let decoded = decodeURIComponent(tokenCookie);
                    if (decoded.startsWith('base64-')) decoded = decoded.slice(7);
                    // Simple fix for base64
                    const jsonStr = atob(decoded.replace(/-/g, '+').replace(/_/g, '/'));
                    const session = JSON.parse(jsonStr);

                    if (session && session.access_token) {
                        return {
                            'Authorization': `Bearer ${session.access_token}`,
                            'Content-Type': 'application/json'
                        };
                    }
                } catch (e) {
                    console.error("CloudAPI: Cookie parse failed", e);
                }
            }

            throw new Error('Not authenticated. Please log in first.');
        },

        /**
         * List Projects
         */
        async listProjects() {
            const headers = await this.getAuthHeaders();
            // Explicitly request all columns to ensure thumbnail_path is included
            const response = await fetch(`${API_BASE_URL}/projects?app=${APP_NAME}&select=*`, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                throw await this.handleError(response);
            }
            return await response.json();
        },

        /**
         * Get Project Data
         */
        async getProject(id) {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                throw await this.handleError(response);
            }
            // Note: The API returns the raw JSON data directly
            return await response.json();
        },

        /**
         * Create New Project
         */
        async createProject(name, data, thumbnailInfo) {
            const headers = await this.getAuthHeaders();

            const body = {
                name,
                app_name: APP_NAME,
                data
            };

            // Send Base64 Thumbnail to API; Server handles storage
            if (thumbnailInfo) {
                body.thumbnail = thumbnailInfo;
            }

            const response = await fetch(`${API_BASE_URL}/projects`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw await this.handleError(response);
            }

            return await response.json();
        },

        /**
         * Update Existing Project
         */
        async updateProject(id, name, data, thumbnailInfo) {
            const headers = await this.getAuthHeaders();

            const body = {
                name,
                data
            };

            // Send Base64 Thumbnail to API
            if (thumbnailInfo) {
                body.thumbnail = thumbnailInfo;
            }

            const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw await this.handleError(response);
            }

            return await response.json();
        },

        /**
         * Delete Project
         */
        async deleteProject(id) {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: 'DELETE',
                headers
            });

            if (!response.ok) {
                throw await this.handleError(response);
            }
            return { success: true };
        },

        async handleError(response) {
            try {
                const err = await response.json();
                return new Error(err.detail || err.error || `API Error: ${response.status}`);
            } catch (e) {
                return new Error(`API Error: ${response.status}`);
            }
        },

        /**
         * Get Current User ID (from Session or Cookie)
         */
        async getCurrentUserId() {
            // 1. Supabase Client
            const client = window.datavizSupabase || (window.supabase && window.supabase.auth ? window.supabase : null);
            if (client) {
                const { data } = await client.auth.getUser();
                if (data?.user?.id) return data.user.id;
            }

            // 2. Cookie Fallback (reuse logic roughly or rely on getAuthHeaders parsing?)
            // We can't easily reuse getAuthHeaders logic without refactoring, but we can try to extract ID from token?
            // JWT usually contains 'sub' claim which is user_id.

            try {
                const headers = await this.getAuthHeaders();
                const token = headers['Authorization']?.split(' ')[1];
                if (token) {
                    // Simple JWT decode
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    return payload.sub; // 'sub' is usually user_id
                }
            } catch (e) {
                console.error('CloudAPI: Failed to get user ID', e);
            }
            return null;
        },

        /**
         * Get Signed URL for Storage
         */
        async getSignedUrl(bucket, path) {
            const headers = await this.getAuthHeaders();
            const SUPABASE_URL = 'https://vebhoeiltxspsurqoxvl.supabase.co';

            // Storage API: POST /storage/v1/object/sign/{bucket}/{path}
            // Note: path might contain slashes, verify if they need encoding. 
            // Usually Supabase handles the path in URL? Or just the prefix?
            // Actually API ref says: POST /object/sign/{bucket}/{wildcard}

            const url = `${SUPABASE_URL}/storage/v1/object/sign/${bucket}/${path}`;
            console.log('[CloudAPI] Signing URL:', url);

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify({ expiresIn: 3600 })
            });

            if (!response.ok) {
                console.error('[CloudAPI] Sign failed', response.status, await response.text());
                return null;
            }

            const data = await response.json();
            // data.signedURL contains the path part with token?
            // Usually returns { signedURL: "/object/sign/bucket/path?token=..." }
            // Note: it returns relative path from domain root usually.

            if (data.signedURL) {
                // Ensure /storage/v1 prefix is present
                const path = data.signedURL.startsWith('/') ? data.signedURL : `/${data.signedURL}`;
                if (path.startsWith('/storage/v1')) {
                    return `${SUPABASE_URL}${path}`;
                }
                return `${SUPABASE_URL}/storage/v1${path}`;
            }
            return null;
        }
    };

    window.CloudAPI = CloudAPI;

})();
