/**
 * Cloud UI & Bridge for Data Illustrator
 */

(function () {
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
      
      /* Toast */
      .cloud-toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        margin-top: 10px;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 10001;
        font-family: sans-serif;
      }
      .cloud-toast.show { opacity: 1; }
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
        let toast = document.querySelector('.cloud-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'cloud-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // === Bridge Logic: Save ===

    let isInterceptingDownload = false;

    // === Interception Hooks ===

    function attachInterceptors(element) {
        // Capture click event
        element.addEventListener('click', (e) => {
            if (isInterceptingDownload && (element.hasAttribute('download') || (element.href && element.href.startsWith('blob:')))) {
                e.preventDefault();
                e.stopImmediatePropagation();
                console.log('[CloudUI] Blocked detached anchor download (event)');
            }
        }, true);

        // Override .click()
        const originalClick = element.click;
        element.click = function () {
            if (isInterceptingDownload && (this.hasAttribute('download') || (this.href && this.href.startsWith('blob:')))) {
                console.log('[CloudUI] Blocked detached anchor download (.click)');
                return;
            }
            if (originalClick) return originalClick.apply(this, arguments);
        };

        // Override dispatchEvent (some libs use this instead of .click())
        const originalDispatch = element.dispatchEvent;
        element.dispatchEvent = function (event) {
            if (isInterceptingDownload && event.type === 'click' && (this.hasAttribute('download') || (this.href && this.href.startsWith('blob:')))) {
                console.log('[CloudUI] Blocked detached anchor download (.dispatchEvent)');
                // Prevent default behavior if cancellable
                if (event.cancelable) event.preventDefault();
                return false;
            }
            return originalDispatch.apply(this, arguments);
        };
    }

    // 1. Hook document.createElement
    const originalCreateElement = document.createElement;
    document.createElement = function (tagName) {
        const element = originalCreateElement.apply(this, arguments);
        if (tagName && typeof tagName === 'string' && tagName.toLowerCase() === 'a') {
            attachInterceptors(element);
        }
        return element;
    };

    // 1b. Hook document.createElementNS (Crucial for FileSaver.js compatibility)
    const originalCreateElementNS = document.createElementNS;
    document.createElementNS = function (ns, tagName) {
        const element = originalCreateElementNS.apply(this, arguments);
        // Check for 'a' tag (ignore namespace for broader coverage in this context)
        // tagName is the qualified name.
        if (tagName && typeof tagName === 'string') {
            const lower = tagName.toLowerCase();
            if (lower === 'a' || lower.endsWith(':a')) {
                attachInterceptors(element);
            }
        }
        return element;
    };

    // 2. Hook HTMLAnchorElement.prototype.click (Global safety net)
    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
        if (isInterceptingDownload && (this.hasAttribute('download') || (this.href && this.href.startsWith('blob:')))) {
            console.log('[CloudUI] Blocked anchor download (prototype.click)');
            return;
        }
        return originalAnchorClick.apply(this, arguments);
    };

    // 3. Global Capture Listener (For attached elements)
    window.addEventListener('click', (e) => {
        if (isInterceptingDownload && e.target.tagName === 'A' && (e.target.hasAttribute('download') || (e.target.href && e.target.href.startsWith('blob:')))) {
            console.log('[CloudUI] Blocked anchor download (window capture)');
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    // 4. Hook URL.createObjectURL to capture the blob
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function (blob) {
        if (blob instanceof Blob) {
            // We capture all blobs, validating them later in monitorSaveProcess
            capturedBlob = blob;
        }
        return originalCreateObjectURL.apply(this, arguments);
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
        const svg = document.querySelector('svg'); // Assuming main SVG
        if (!svg) return null;

        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        // Set canvas size
        const rect = svg.getBoundingClientRect();
        canvas.width = rect.width || 800;
        canvas.height = rect.height || 600;

        // SVG to DataURI
        const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        return new Promise((resolve) => {
            img.onload = () => {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => {
                console.error('Thumbnail generation failed');
                resolve(null);
            };
            img.src = url;
        });
    }

    function showSaveModal(data, thumbnail) {
        // Simple Prompt for now
        const defaultName = `Project ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`;
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

            // Auto-load project if param exists
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
