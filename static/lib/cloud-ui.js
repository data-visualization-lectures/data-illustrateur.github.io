/**
 * Cloud UI & Bridge for Data Illustrator
 */

(function () {
    // === Encoding Fix: Auto-detect and convert SHIFT JIS to UTF-8 ===
    const _originalReadAsText = FileReader.prototype.readAsText;

    FileReader.prototype.readAsText = function (blob, encoding) {
        // Fallback if encoding-japanese is not loaded or explicit non-UTF-8 encoding is specified
        if (typeof Encoding === 'undefined' || (encoding && encoding.toLowerCase() !== 'utf-8')) {
            return _originalReadAsText.call(this, blob, encoding);
        }

        const reader = this;
        const tempReader = new FileReader();

        tempReader.onerror = function () {
            Object.defineProperty(reader, 'error', { value: tempReader.error, configurable: true });
            Object.defineProperty(reader, 'readyState', { value: 2, configurable: true });
            if (reader.onerror) reader.onerror(new ProgressEvent('error'));
            reader.dispatchEvent(new ProgressEvent('error'));
        };

        tempReader.onload = function () {
            const uint8Array = new Uint8Array(tempReader.result);

            // Sample first 10KB for detection to keep it fast on large files
            const sample = uint8Array.length > 10240 ? uint8Array.slice(0, 10240) : uint8Array;
            const detected = Encoding.detect(sample);
            console.log('[EncodingFix] Detected encoding:', detected);

            let resultString;
            if (detected && detected !== 'UTF8' && detected !== 'ASCII') {
                const unicodeArray = Encoding.convert(uint8Array, { to: 'UNICODE', from: detected });
                resultString = Encoding.codeToString(unicodeArray);
            } else {
                resultString = new TextDecoder('utf-8').decode(uint8Array);
            }

            Object.defineProperty(reader, 'result', { value: resultString, configurable: true });
            Object.defineProperty(reader, 'readyState', { value: 2, configurable: true });

            if (reader.onload) reader.onload(new ProgressEvent('load'));
            reader.dispatchEvent(new ProgressEvent('load'));
            if (reader.onloadend) reader.onloadend(new ProgressEvent('loadend'));
            reader.dispatchEvent(new ProgressEvent('loadend'));
        };

        FileReader.prototype.readAsArrayBuffer.call(tempReader, blob);
    };

    // Styles are now handled by dataviz-tool-header

    // === i18n helper ===
    const t = (key) => (typeof DI18n !== 'undefined') ? DI18n.t(key) : key;

    // === State ===
    let capturedBlob = null;

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
                // Reset capture & Start interception
                capturedBlob = null;
                isInterceptingDownload = true;
                // Start polling for result
                monitorSaveProcess();
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

    // === Bridge Logic: Save ===

    let isInterceptingDownload = false;

    // === Interception Hooks ===

    // === FileSaver.js Override ===
    // Since FileSaver.js checks for window.saveAs before defining its own implementation,
    // we can override it here to capture the data designated for download.
    window.saveAs = function (blob, name) {
        if (isInterceptingDownload) {
            console.log('[CloudUI] Intercepted saveAs for Cloud Save');
            capturedBlob = blob;
            // Do not trigger local download
            return;
        }

        // Fallback for normal downloads (e.g. Export button)
        console.log('[CloudUI] Passthrough saveAs for local download');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name || 'download';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
    };


    function monitorSaveProcess() {
        // Polling mechanism to capture the blob generated by native logic
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds

        const pollTimer = setInterval(async () => {
            attempts++;

            if (capturedBlob) {
                // Success!
                clearInterval(pollTimer);
                isInterceptingDownload = false; // Stop interception

                // Process Blob
                const textData = await capturedBlob.text();
                let jsonData;
                try {
                    jsonData = JSON.parse(textData);
                } catch (e) {
                    console.error("Not a JSON file?", textData.substring(0, 100));
                    showToast(t('not_valid_json'), 'error');
                    return;
                }

                // Generate Thumbnail
                const thumbDataUri = await generateThumbnail();

                // Show Save Modal
                saveProject(jsonData, thumbDataUri);
                return;
            }

            if (attempts >= maxAttempts) {
                // Timeout
                clearInterval(pollTimer);
                isInterceptingDownload = false;
                console.error('CloudUI: Save timeout - Blob not captured.');
                // Maybe the user cancelled or the app failed to generate?
                // showToast('Save timeout.');
            }
        }, 100);
    }

    async function generateThumbnail() {
        const svg = document.querySelector('svg');
        if (!svg) return null;

        // Try to find the content group to crop to
        // 'scene1' is the main content container in Data Illustrator
        const contentNode = svg.querySelector('#scene1') || svg;

        // Calculate the bounding box of the content
        let bbox;
        try {
            // getBBox gives accurate vector bounds in user units
            bbox = contentNode.getBBox ? contentNode.getBBox() : contentNode.getBoundingClientRect();
        } catch (e) {
            console.warn('Could not get bbox of content, falling back to SVG rect', e);
            bbox = svg.getBoundingClientRect();
        }

        // Add a little padding
        const padding = 20;
        const viewBoxX = bbox.x - padding;
        const viewBoxY = bbox.y - padding;
        const viewBoxW = bbox.width + (padding * 2);
        const viewBoxH = bbox.height + (padding * 2);

        // Serialize the SVG with the new ViewBox to crop it
        const serializer = new XMLSerializer();
        const clone = svg.cloneNode(true);
        clone.setAttribute('viewBox', `${viewBoxX} ${viewBoxY} ${viewBoxW} ${viewBoxH}`);
        clone.setAttribute('width', viewBoxW);
        clone.setAttribute('height', viewBoxH);

        // Remove evtLayer from the clone if it exists, just in case it interferes or adds weight
        const evtLayer = clone.querySelector('#evtLayer');
        if (evtLayer) evtLayer.remove();

        const svgStr = serializer.serializeToString(clone);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        // Set canvas size to match the cropped view
        canvas.width = viewBoxW;
        canvas.height = viewBoxH;

        // SVG to DataURI
        const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        return new Promise((resolve) => {
            img.onload = () => {
                // Fill white background (optional, but good for transparency)
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = (e) => {
                console.error('Thumbnail generation failed', e);
                resolve(null);
            };
            img.src = url;
        });
    }

    // === Bridge Logic: Save ===
    async function saveProject(data, thumbnail) {
        const toolHeader = document.querySelector('dataviz-tool-header');
        if (!toolHeader) {
            showToast(t('error_header_not_ready'), 'error');
            return;
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const defaultName = `${year}-${month}-${day} ${hours}:${minutes}`;

        // Use new dataviz-tool-header API
        toolHeader.showSaveModal({
            name: defaultName,
            data: data,
            thumbnailDataUri: thumbnail || null,
            existingProjectId: null  // Pass currentProjectId if updating existing
        });
    }

    // === Bridge Logic: Load ===
    function loadProjects() {
        const toolHeader = document.querySelector('dataviz-tool-header');
        if (!toolHeader) {
            showToast(t('error_header_not_ready'), 'error');
            return;
        }

        // Use new dataviz-tool-header API
        toolHeader.showLoadModal();
    }

    function injectData(jsonData) {
        // Need to find the input file element.
        // Data Illustrator structure usually has one main input for loading projects (.msc) and one for data (.csv).
        const fileInputs = Array.from(document.querySelectorAll('input[type="file"]'));

        if (fileInputs.length === 0) {
            console.error('CloudUI: input[type="file"] not found');
            alert(t('error_no_file_loader'));
            return;
        }

        // Logic to find the Project Loader (not CSV loader)
        // 1. Look for .msc or .json in accept
        let fileInput = fileInputs.find(i => i.accept && (i.accept.includes('.msc') || i.accept.includes('.json')));

        // 2. If not found, find one that is NOT .csv
        if (!fileInput) {
            fileInput = fileInputs.find(i => !i.accept || !i.accept.includes('.csv'));
        }

        // 3. Last resort
        if (!fileInput && fileInputs.length > 1) {
            fileInput = fileInputs[1];
        } else if (!fileInput) {
            fileInput = fileInputs[0];
        }

        console.log('[CloudUI] Selected target input:', fileInput);

        // Create a File object
        const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        const file = new File([blob], "project.msc", { type: 'application/json' });

        // Override files property
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        // Dispatch events
        const event = new Event('change', { bubbles: true });
        const inputEvent = new Event('input', { bubbles: true });

        fileInput.dispatchEvent(inputEvent);
        fileInput.dispatchEvent(event);
    }

    // === Init ===
    let initialized = false;
    const init = () => {
        if (initialized) return;
        initialized = true;

        // Wait a bit to ensure target buttons are rendered and app is ready
        setTimeout(() => {
            bindUI();

            // Initialize Tool Header
            const toolHeader = document.querySelector('dataviz-tool-header');
            if (toolHeader) {
                // Configure UI buttons
                toolHeader.setConfig({
                    logo: {
                        type: 'text',
                        text: 'Data Illustrator',
                        textClass: 'font-bold text-lg'
                    },
                    buttons: [
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
                        injectData(projectData);
                        showToast(t('project_loaded'), 'success');
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

                // Hide original navigation container as functionalities are moved to tool header
                const navContainer = document.querySelector('.myBtnGroup');
                if (navContainer) {
                    navContainer.style.display = 'none';
                }
            }
            const params = new URLSearchParams(window.location.search);
            const projectId = params.get('project_id');
            if (projectId) {
                console.log('[CloudUI] Auto-loading project:', projectId);
                loadProjectById(projectId);
            }
        }, 1000);
    };

    // Helper function for auto-loading project by ID
    async function loadProjectById(id) {
        try {
            const toolHeader = document.querySelector('dataviz-tool-header');
            if (toolHeader && toolHeader.loadProject) {
                const data = await toolHeader.loadProject(id);
                injectData(data);
                showToast(t('project_loaded'));
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
