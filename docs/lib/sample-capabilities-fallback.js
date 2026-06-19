/**
 * Fallback for the shared sample picker capability endpoint.
 *
 * The shared picker requires /tool-capabilities.json. If the central endpoint
 * is unavailable, provide the minimal capability data needed by this tool.
 */

(function () {
    if (window.__dvSampleCapabilitiesFallbackInstalled === '1' || typeof window.fetch !== 'function') {
        return;
    }

    const fallbackCapabilities = {
        'data-illustrator': {
            acceptedTableShapes: ['long', 'wide']
        }
    };

    const originalFetch = window.fetch.bind(window);

    function isToolCapabilitiesRequest(input) {
        const url = typeof input === 'string' ? input : input && input.url;
        if (!url) return false;

        try {
            const parsed = new URL(url, window.location.href);
            return parsed.pathname === '/tool-capabilities.json';
        } catch (e) {
            return false;
        }
    }

    function createFallbackResponse() {
        return new Response(JSON.stringify(fallbackCapabilities), {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    window.fetch = async function (input, init) {
        if (!isToolCapabilitiesRequest(input)) {
            return originalFetch(input, init);
        }

        try {
            const response = await originalFetch(input, init);
            if (response.ok || response.status !== 404) {
                return response;
            }
            console.warn('[SampleCapabilitiesFallback] Using fallback after 404 from tool-capabilities.json');
        } catch (e) {
            console.warn('[SampleCapabilitiesFallback] Using fallback after tool-capabilities.json fetch failed', e);
        }

        return createFallbackResponse();
    };

    window.__dvSampleCapabilitiesFallbackInstalled = '1';
})();
