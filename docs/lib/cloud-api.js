/**
 * Cloud API Client for Data Illustrator
 * Handles communication with api.dataviz.jp
 */

(function () {
    const API_BASE_URL = 'https://api.dataviz.jp/api';
    const APP_NAME = 'data-illustrator';

    const CloudAPI = {
        /**
         * Get Authorization Header from existing session
         */
        async getAuthHeaders() {
            // 1. Try to get session from the exposed Supabase client (preferred)
            if (window.supabase) {
                const { data } = await window.supabase.auth.getSession();
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
            const response = await fetch(`${API_BASE_URL}/projects?app=${APP_NAME}`, {
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
                data,
                thumbnail: thumbnailInfo // Base64 Data URI
            };

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
                data, // Optional: if provided, overwrites
                thumbnail: thumbnailInfo // Optional
            };

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
        }
    };

    window.CloudAPI = CloudAPI;

})();
