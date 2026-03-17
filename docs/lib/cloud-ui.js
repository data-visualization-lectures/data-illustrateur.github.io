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

    // === Styles ===
    const styles = `
      /* UI Container removed - reusing existing buttons */
      
      .cloud-modal-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cloud-modal {
        background: white;
        width: 600px;
        max-height: 80vh;
        border-radius: 8px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-family: sans-serif;
      }
      .cloud-modal-header { font-size: 18px; font-weight: bold; margin-bottom: 15px; display: flex; justify-content: space-between; }
      .cloud-modal-body { flex: 1; overflow-y: auto; }
      .cloud-modal-footer { margin-top: 15px; text-align: right; }
      
      .project-list-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
      }
      .project-list-item:hover { background: #f5f5f5; }
      .project-thumb { width: 80px; height: 60px; object-fit: cover; background: #ddd; margin-right: 15px; border-radius: 4px; }
      .project-info { flex: 1; }
      .project-name { font-weight: bold; }
      .project-date { font-size: 12px; color: #666; }
      .project-actions button { margin-left: 5px; padding: 4px 8px; cursor: pointer; }
      .delete-btn { background: #ff4d4f; color: white; border: none; border-radius: 3px; }
      .load-btn { background: #3ecf8e; color: white; border: none; border-radius: 3px; }
      

    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // === State ===
    let capturedBlob = null;
    let projects = [];
    let currentUserId = null;

    // === UI Setup ===
    function bindUI() {
        console.log('[CloudUI] Binding UI...');

        // 1. Open Button (Replace with Cloud Load)
        const openBtn = document.getElementById('openBtn');
        if (openBtn) {
            // Clone to remove existing listeners (prevent local file dialog)
            const newOpenBtn = openBtn.cloneNode(true);
            newOpenBtn.id = 'openBtn';
            newOpenBtn.textContent = 'プロジェクト・ファイルの読込';
            newOpenBtn.onclick = openProjectList;
            openBtn.parentNode.replaceChild(newOpenBtn, openBtn);
        } else {
            console.warn('[CloudUI] #openBtn not found');
        }

        // 2. Save Button (Wrap for Cloud Save)
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.textContent = 'プロジェクト・ファイルの保存';
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
            exportBtn.textContent = 'SVG画像出力';
        } else {
            console.warn('[CloudUI] #exportBtn not found');
        }
    }

    function showToast(msg) {
        const toolHeader = document.querySelector('dataviz-tool-header');
        if (toolHeader && toolHeader.showMessage) {
            toolHeader.showMessage(msg);
        } else {
            // Fallback (e.g. during initial load if header not ready)
            console.log('Toast:', msg);
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
                    showToast('Captured data is not valid JSON.');
                    return;
                }

                // Generate Thumbnail
                const thumbDataUri = await generateThumbnail();

                // Show Save Modal
                showSaveModal(jsonData, thumbDataUri);
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

    function showSaveModal(data, thumbnail) {
        // Simple Prompt for now
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const defaultName = `${year}-${month}-${day} ${hours}:${minutes}`;
        const name = prompt('Enter Project Name:', defaultName);
        if (!name) return;

        showToast('Saving...');
        CloudAPI.createProject(name, data, thumbnail)
            .then(() => showToast('Saved successfully!'))
            .catch(e => {
                console.error(e);
                showToast('Save failed: ' + e.message);
            });
    }


    // === Bridge Logic: Load ===

    async function openProjectList() {
        try {
            showToast('Loading projects...');

            // Get current user for thumbnail fallback
            currentUserId = await CloudAPI.getCurrentUserId();
            console.log('[CloudUI] Current User ID:', currentUserId);

            const res = await CloudAPI.listProjects();
            console.log('[CloudUI] listProjects response:', res);
            projects = Array.isArray(res) ? res : (res.projects || []);

            await renderProjectListModal();
        } catch (e) {
            console.error(e);
            showToast('Error loading projects: ' + e.message);
        }
    }

    async function renderProjectListModal() {
        // cleanup old
        const old = document.querySelector('.cloud-modal-overlay');
        if (old) old.remove();

        const overlay = document.createElement('div');
        overlay.className = 'cloud-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'cloud-modal';

        const header = document.createElement('div');
        header.className = 'cloud-modal-header';
        header.innerHTML = `<span>Your Projects</span> <button onclick="this.closest('.cloud-modal-overlay').remove()">X</button>`;

        const body = document.createElement('div');
        body.className = 'cloud-modal-body';
        body.innerHTML = '<p>Loading thumbnails...</p>';

        modal.appendChild(header);
        modal.appendChild(body);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        if (projects.length === 0) {
            body.innerHTML = '<p>No projects found.</p>';
        } else {
            // Generate list items HTML with Signed URLs
            const itemsHtml = await Promise.all(projects.map(async p => {
                if (!p.thumbnail_path && currentUserId && p.id) {
                    p.thumbnail_path = `${currentUserId}/${p.id}.png`;
                }

                let thumbHtml = '<div class="project-thumb no-image"></div>';
                if (p.thumbnail_path) {
                    const cleanPath = p.thumbnail_path.startsWith('/') ? p.thumbnail_path.slice(1) : p.thumbnail_path;
                    // Attempt to sign URL
                    const signedUrl = await CloudAPI.getSignedUrl('user_projects', cleanPath);
                    if (signedUrl) {
                        thumbHtml = `<img src="${signedUrl}" class="project-thumb" alt="${p.name}" />`;
                    }
                }

                return `
                  <div class="project-list-item">
                    ${thumbHtml}
                    <div class="project-info">
                        <div class="project-name">${p.name}</div>
                        <div class="project-date">${new Date(p.updated_at).toLocaleString()}</div>
                    </div>
                    <div class="project-actions">
                        <button class="load-btn" data-id="${p.id}">Open</button>
                        <button class="delete-btn" data-id="${p.id}">Delete</button>
                    </div>
                  </div>
                `;
            }));

            body.innerHTML = itemsHtml.join('');

            // Bind events
            body.querySelectorAll('.load-btn').forEach(btn => {
                btn.onclick = () => loadProject(btn.dataset.id);
            });
            body.querySelectorAll('.delete-btn').forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure?')) deleteProject(btn.dataset.id);
                };
            });
        }
    }

    async function loadProject(id) {
        showToast('Loading data...');
        try {
            const data = await CloudAPI.getProject(id);
            injectData(data);
            const overlay = document.querySelector('.cloud-modal-overlay');
            if (overlay) overlay.remove();
            showToast('Project loaded!');
        } catch (e) {
            console.error(e);
            showToast('Load failed: ' + e.message);
        }
    }

    async function deleteProject(id) {
        try {
            await CloudAPI.deleteProject(id);
            // refresh
            openProjectList();
        } catch (e) {
            showToast('Delete failed: ' + e.message);
        }
    }

    function injectData(jsonData) {
        // Need to find the input file element.
        // Data Illustrator structure usually has one main input for loading projects (.msc) and one for data (.csv).
        const fileInputs = Array.from(document.querySelectorAll('input[type="file"]'));

        if (fileInputs.length === 0) {
            console.error('CloudUI: input[type="file"] not found');
            alert('Error: Could not find file loader element.');
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
                toolHeader.setConfig({
                    logo: {
                        type: 'text',
                        text: 'Data Illustrator',
                        textClass: 'font-bold text-lg'
                    },
                    buttons: [
                        {
                            label: 'サンプルプロジェクトの読込',
                            type: 'link',
                            align: 'left',
                            href: 'https://data-illustrator.dataviz.jp/gallery/',
                            target: '_blank'
                        },
                        {
                            label: 'プロジェクトの保存',
                            action: () => {
                                const btn = document.getElementById('saveBtn');
                                if (btn) btn.click();
                            },
                            align: 'right'
                        },
                        {
                            label: 'プロジェクトの読込',
                            action: () => {
                                const btn = document.getElementById('openBtn');
                                if (btn) btn.click();
                            },
                            align: 'right'
                        },
                        {
                            label: '出力',
                            type: 'dropdown',
                            align: 'right',
                            items: [
                                {
                                    label: 'SVG画像出力',
                                    action: () => {
                                        const btn = document.getElementById('exportBtn');
                                        if (btn) btn.click();
                                    }
                                }
                            ]
                        },
                        {
                            label: 'ヘルプ',
                            type: 'link',
                            align: 'right',
                            href: '/tutorials/interface/overview/',
                            target: '_blank'
                        }
                    ]
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
                loadProject(projectId);
            }
        }, 1000);
    };

    window.addEventListener('load', init);
    if (document.readyState === 'complete') {
        init();
    }

})();
