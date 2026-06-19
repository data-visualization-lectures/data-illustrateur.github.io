/**
 * Cloud UI for Data Illustrator
 */

(function () {
    // Styles are now handled by dataviz-tool-header

    // === i18n helper ===
    const t = (key) => (typeof DI18n !== 'undefined') ? DI18n.t(key) : key;

    function installCloudUiStyles() {
        if (document.getElementById('di-cloud-ui-styles')) return;

        const style = document.createElement('style');
        style.id = 'di-cloud-ui-styles';
        style.textContent = [
            '#csvBtn {',
            '  display: none !important;',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    }

    // === UI Setup ===
    function bindUI() {
        console.log('[CloudUI] Binding UI...');

        // 1. Open Button (Replace with Cloud Load)
        const openBtn = document.getElementById('openBtn');
        if (openBtn) {
            // Clone to remove existing listeners (prevent local file dialog)
            const newOpenBtn = openBtn.cloneNode(true);
            newOpenBtn.id = 'openBtn';
            newOpenBtn.textContent = t('load_project_file');
            newOpenBtn.onclick = loadProjects;
            openBtn.parentNode.replaceChild(newOpenBtn, openBtn);
        } else {
            console.warn('[CloudUI] #openBtn not found');
        }

        // 2. Save Button (Wrap for Cloud Save)
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.textContent = t('save_project_file');
            // Use Capture phase to ensure we monitor before the native handler fires
            saveBtn.addEventListener('click', () => {
                if (window.CloudSaveBridge) {
                    window.CloudSaveBridge.startCloudSave();
                } else {
                    showToast(t('save_failed') + 'CloudSaveBridge not loaded', 'error');
                }
            }, true);
        } else {
            console.warn('[CloudUI] #saveBtn not found');
        }

        // 3. Export Button (Label Change Only)
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.textContent = t('export_svg');
        } else {
            console.warn('[CloudUI] #exportBtn not found');
        }
    }

    function showToast(msg, type = 'info', duration = 3000) {
        const toolHeader = document.querySelector('dataviz-tool-header');
        if (toolHeader && toolHeader.showMessage) {
            toolHeader.showMessage(msg, type, duration);
        } else {
            // Fallback (e.g. during initial load if header not ready)
            console.log('Toast:', msg, type);
        }
    }

    function showProcessingToast(message, duration = 5000) {
        showToast(message, 'info', duration);
    }

    function installHeaderProcessingToasts(header) {
        if (!header || header.__dvzNativeProjectProcessingToasts === '1' || header.__dvzProcessingToastsInstalled === '1') return;

        if (typeof header.showLoadModal === 'function') {
            const originalShowLoadModal = header.showLoadModal.bind(header);
            header.showLoadModal = (...args) => {
                showProcessingToast(t('processing_project_list'));
                return originalShowLoadModal(...args);
            };
        }

        if (typeof header.loadProject === 'function') {
            const originalLoadProject = header.loadProject.bind(header);
            header.loadProject = (...args) => {
                showProcessingToast(t('processing_project_load'));
                return originalLoadProject(...args);
            };
        }

        if (typeof header.saveProject === 'function') {
            const originalSaveProject = header.saveProject.bind(header);
            header.saveProject = (...args) => {
                showProcessingToast(t('processing_project_save'));
                return originalSaveProject(...args);
            };
        }

        header.__dvzProcessingToastsInstalled = '1';
    }

    // === Bridge Logic: Load ===
    function loadProjects() {
        const toolHeader = document.querySelector('dataviz-tool-header');
        if (!toolHeader) {
            showToast(t('error_header_not_ready'), 'error');
            return;
        }
        installHeaderProcessingToasts(toolHeader);

        // Use new dataviz-tool-header API
        toolHeader.showLoadModal();
    }

    function injectProjectData(projectData) {
        if (!window.CloudDataBridge) {
            showToast(t('load_failed') + 'CloudDataBridge not loaded', 'error');
            return false;
        }

        return window.CloudDataBridge.injectProjectData(projectData);
    }

    function injectCsvData(text, fileName) {
        if (!window.CloudDataBridge) {
            showToast(t('load_failed') + 'CloudDataBridge not loaded', 'error');
            return false;
        }

        return window.CloudDataBridge.injectCsvData(text, fileName);
    }

    function getSampleFileName(detail) {
        const format = (detail && detail.format ? detail.format : 'csv').toLowerCase();
        const fallbackName = detail && detail.url ? detail.url.split('/').pop() : 'sample';
        const name = detail && (detail.name || detail.nameEn) ? (detail.name || detail.nameEn) : fallbackName;
        return name.toLowerCase().endsWith('.' + format) ? name : name + '.' + format;
    }

    async function fetchText(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }
        return response.text();
    }

    async function loadSampleCsv(detail) {
        if (!detail || !detail.url) {
            showToast(t('load_failed') + 'Sample URL is missing', 'error');
            return;
        }

        showProcessingToast(t('processing_sample'));
        try {
            const text = await fetchText(detail.url);
            if (injectCsvData(text, getSampleFileName(detail))) {
                showToast(t('sample_loaded'), 'success');
            } else {
                showToast(t('load_failed') + t('error_no_file_loader'), 'error');
            }
        } catch (e) {
            console.error('[CloudUI] Sample data load failed:', e, detail);
            showToast(t('load_failed') + e.message, 'error');
        }
    }

    async function loadCsvFromUrl(dataUrl) {
        showProcessingToast(t('processing_sample'));
        try {
            const text = await fetchText(dataUrl);
            if (!injectCsvData(text, dataUrl.split('/').pop() || 'data.csv')) {
                showToast(t('load_failed') + t('error_no_file_loader'), 'error');
            }
        } catch (e) {
            console.error('[CloudUI] URL data load failed:', e, dataUrl);
            showToast(t('load_failed') + e.message, 'error');
        }
    }

    function openCsvFilePicker() {
        const csvBtn = document.getElementById('csvBtn');
        if (csvBtn) {
            csvBtn.click();
        } else {
            showToast(t('load_failed') + t('error_no_file_loader'), 'error');
        }
    }

    function hideOriginalNavigation() {
        const navContainer = document.querySelector('.myBtnGroup');
        if (navContainer) {
            navContainer.style.display = 'none';
        }
    }

    function configureToolHeader(toolHeader) {
        installHeaderProcessingToasts(toolHeader);

        // Configure UI buttons
        toolHeader.setConfig({
            logo: {
                type: 'text',
                text: 'Data Illustrator',
                textClass: 'font-bold text-lg'
            },
            buttons: [
                {
                    label: t('load_data_file'),
                    action: openCsvFilePicker,
                    align: 'left'
                },
                {
                    label: t('load_sample_project'),
                    type: 'link',
                    align: 'left',
                    href: 'https://data-illustrator.dataviz.jp/gallery/',
                    target: '_blank'
                },
                {
                    label: t('save_project'),
                    action: () => {
                        const btn = document.getElementById('saveBtn');
                        if (btn) btn.click();
                    },
                    align: 'right'
                },
                {
                    label: t('load_project'),
                    action: () => {
                        const btn = document.getElementById('openBtn');
                        if (btn) btn.click();
                    },
                    align: 'right'
                },
                {
                    label: t('export'),
                    type: 'dropdown',
                    align: 'right',
                    items: [
                        {
                            label: t('export_svg'),
                            action: () => {
                                const btn = document.getElementById('exportBtn');
                                if (btn) btn.click();
                            }
                        }
                    ]
                },
                {
                    label: t('help'),
                    type: 'link',
                    align: 'right',
                    href: '/tutorials/interface/overview/',
                    target: '_blank'
                }
            ]
        });

        // Configure project management using new API
        toolHeader.setProjectConfig({
            appName: 'data-illustrator',
            onProjectLoad: (projectData) => {
                // Called when user loads a project from the modal
                if (injectProjectData(projectData)) {
                    showToast(t('project_loaded'), 'success');
                }
            },
            onProjectSave: (projectMeta) => {
                // Called when user saves a project
                console.log('[CloudUI] Project saved:', projectMeta);
                showToast(t('saved'), 'success');
            },
            onProjectDelete: (projectId) => {
                // Called when user deletes a project
                console.log('[CloudUI] Project deleted:', projectId);
                showToast(t('deleted'), 'success');
            }
        });

        // Sample data picker integration
        toolHeader.setSampleConfig({
            toolId: 'data-illustrator',
            onSampleSelect: loadSampleCsv
        });

        hideOriginalNavigation();
    }

    function handleUrlParams() {
        const params = new URLSearchParams(window.location.search);

        // ?data_url= support
        const dataUrl = params.get('data_url');
        if (dataUrl) {
            loadCsvFromUrl(dataUrl);
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        const projectId = params.get('project_id');
        if (projectId) {
            console.log('[CloudUI] Auto-loading project:', projectId);
            loadProjectById(projectId);
        }
    }

    // === Init ===
    let initialized = false;
    const init = () => {
        if (initialized) return;
        initialized = true;

        // Wait a bit to ensure target buttons are rendered and app is ready
        setTimeout(() => {
            installCloudUiStyles();
            bindUI();

            // Initialize Tool Header
            const toolHeader = document.querySelector('dataviz-tool-header');
            if (toolHeader) {
                configureToolHeader(toolHeader);
            }
            handleUrlParams();
        }, 1000);
    };

    // Helper function for auto-loading project by ID
    async function loadProjectById(id) {
        try {
            const toolHeader = document.querySelector('dataviz-tool-header');
            if (toolHeader && toolHeader.loadProject) {
                installHeaderProcessingToasts(toolHeader);
                const data = await toolHeader.loadProject(id);
                if (injectProjectData(data)) {
                    showToast(t('project_loaded'));
                }
            }
        } catch (e) {
            console.error(e);
            showToast(t('load_failed') + e.message, 'error');
        }
    }

    window.addEventListener('load', init);
    if (document.readyState === 'complete') {
        init();
    }

})();
