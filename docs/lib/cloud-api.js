/**
 * Cloud API Client for Data Illustrator
 * Handles communication with api.dataviz.jp
 */

const API_BASE_URL = 'https://api.dataviz.jp/api';
const APP_NAME = 'data-illustrator';

const CloudAPI = {
    /**
     * Get Authorization Header from existing session
     */
    async getAuthHeaders() {
        // 既存の認証クライアントからセッションを取得する試み
        // window.supabaseなどがあるか、localStorageを探す
        let token = null;

        // 1. Check for standard Supabase local storage
        // The key usually depends on the project reference, we'll try to find one starting with 'sb-' and ending with '-auth-token'
        for (const key in localStorage) {
            if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
                try {
                    const session = JSON.parse(localStorage.getItem(key));
                    if (session && session.access_token) {
                        token = session.access_token;
                        break;
                    }
                } catch (e) {
                    console.error('Error parsing auth token', e);
                }
            }
        }

        if (!token) {
            throw new Error('Not authenticated. Please log in first.');
        }

        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
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
