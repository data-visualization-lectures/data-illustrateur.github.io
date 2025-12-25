/**
 * Cloud UI & Bridge for Data Illustrator
 */

(function () {
    // === Styles ===
    const styles = `
      #cloud-ui-container {
        position: fixed;
        top: 60px; /* Below global header (48px) */
        right: 180px; /* Adjust based on existing toolbar */
        z-index: 10001; /* Above app header (1000) */
        font-family: sans-serif;
      }
      .cloud-btn {
        background: #3ecf8e;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        margin-right: 8px;
      }
      .cloud-btn:hover { background: #34b379; }
      
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
      }
      .cloud-toast.show { opacity: 1; }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // === State ===
    let capturedBlob = null;
    let projects = [];

    // === UI Components ===
    function createButton() {
        const container = document.createElement('div');
        container.id = 'cloud-ui-container';

        const loadBtn = document.createElement('button');
        loadBtn.className = 'cloud-btn';
        loadBtn.textContent = '☁️ プロジェクト・ファイルの読込';
        loadBtn.onclick = openProjectList;

        const saveBtn = document.createElement('button');
        saveBtn.className = 'cloud-btn';
        saveBtn.textContent = '☁️ プロジェクト・ファイルの保存';
        saveBtn.onclick = handleSaveClick;

        container.appendChild(loadBtn);
        container.appendChild(saveBtn);
        document.body.appendChild(container);
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

    // Hook HTMLAnchorElement.prototype.click to prevent local download
    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
        if (isInterceptingDownload && this.hasAttribute('download')) {
            // console.log('Blocked local download for cloud save.');
            return;
        }
        return originalAnchorClick.apply(this, arguments);
    };

    // Hook URL.createObjectURL to capture the blob
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function (blob) {
        // console.log('Captured Blob:', blob);
        if (blob instanceof Blob) {
            // Check if it looks like our file (JSON or text)
            // Data Illustrator likely exports JSON
            capturedBlob = blob;
        }
        return originalCreateObjectURL.apply(this, arguments);
    };

    async function handleSaveClick() {
        // 1. Reset capture & Start interception
        capturedBlob = null;
        isInterceptingDownload = true;

        // 2. Trigger the native save button
        // The user says ID is "saveBtn" for .msc file
        const nativeSaveBtn = document.getElementById('saveBtn');
        if (!nativeSaveBtn) {
            alert('Error: Native Save button (#saveBtn) not found.');
            isInterceptingDownload = false;
            return;
        }

        nativeSaveBtn.click();

        // 3. Wait for Blob capture
        // Since click() often triggers synchronous processing, check immediately, otherwise wait a bit
        setTimeout(async () => {
            isInterceptingDownload = false; // Stop interception

            if (!capturedBlob) {
                // Retry or fail. Sometimes it's async.
                // alert('Could not capture project data.');
                // Attempt to find if an Anchor tag was created?
                // For now, assume hook works.
                showToast('Failed to capture data. Please try again.');
                return;
            }

            // 4. Read Blob
            const textData = await capturedBlob.text();
            let jsonData;
            try {
                jsonData = JSON.parse(textData);
            } catch (e) {
                console.error("Not a JSON file?", textData.substring(0, 100));
                showToast('Captured data is not valid JSON.');
                return;
            }

            // 5. Generate Thumbnail from SVG
            const thumbDataUri = await generateThumbnail();

            // 6. Show Save Modal
            showSaveModal(jsonData, thumbDataUri);

        }, 500); // 500ms delay to allow internal processing
    }

    async function generateThumbnail() {
        const svg = document.querySelector('svg'); // Assuming main SVG
        if (!svg) return null;

        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        // Set canvas size (match SVG or use fixed thumb size)
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
        // Simple Prompt for now, or build a custom modal
        const name = prompt('Enter Project Name:', `Project ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`);
        if (!name) return;

        // Ideally we check for existing ID to update, but for now always create new or we need to store current ID loaded
        // TODO: Store currently loaded project ID to support "Update"

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
            const res = await CloudAPI.listProjects();
            projects = res.projects || [];
            renderProjectListModal();
        } catch (e) {
            showToast('Error loading projects: ' + e.message);
        }
    }

    function renderProjectListModal() {
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

        // URL Base for storage
        // Assuming 'projects' bucket based on table name and public access
        const SUPABASE_URL = 'https://vebhoeiltxspsurqoxvl.supabase.co';
        const storageBase = `${SUPABASE_URL}/storage/v1/object/public/projects/`;

        if (projects.length === 0) {
            body.innerHTML = '<p>No projects found.</p>';
        } else {
            projects.forEach(p => {
                let thumbSrc = p.thumbnail_path;
                if (thumbSrc && !thumbSrc.startsWith('http') && !thumbSrc.startsWith('data:')) {
                    // Remove any leading slashes just in case
                    const cleanPath = thumbSrc.startsWith('/') ? thumbSrc.slice(1) : thumbSrc;
                    thumbSrc = `${storageBase}${cleanPath}`;
                }

                // console.log('[CloudUI] Thumb URL:', thumbSrc);

                const el = document.createElement('div');
                el.className = 'project-list-item';
                el.innerHTML = `
                  <img src="${thumbSrc || ''}" class="project-thumb" alt="thumb" />
                  <div class="project-info">
                      <div class="project-name">${p.name}</div>
                      <div class="project-date">${new Date(p.updated_at).toLocaleString()}</div>
                  </div>
                  <div class="project-actions">
                      <button class="load-btn">Open</button>
                      <button class="delete-btn">Delete</button>
                  </div>
                `;

                el.querySelector('.load-btn').onclick = () => loadProject(p.id);
                el.querySelector('.delete-btn').onclick = (e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure?')) deleteProject(p.id);
                };
                body.appendChild(el);
            });
        }

        modal.appendChild(header);
        modal.appendChild(body);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    async function loadProject(id) {
        showToast('Loading data...');
        try {
            const data = await CloudAPI.getProject(id);
            injectData(data);
            document.querySelector('.cloud-modal-overlay').remove();
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
        // Data Illustrator structure usually has one main input for loading.
        const fileInputs = document.querySelectorAll('input[type="file"]');
        if (fileInputs.length === 0) {
            console.error('CloudUI: input[type="file"] not found');
            alert('Error: Could not find file loader element. Please ensure you are on the main editor screen.');
            return;
        }

        // Use the first one found (usually correct in SPA)
        const fileInput = fileInputs[0];
        console.log('[CloudUI] Injecting data into:', fileInput, 'Total inputs:', fileInputs.length);

        // Create a File object
        // Data Illustrator expects .msc file (JSON content)
        const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        const file = new File([blob], "project.msc", { type: 'application/json' });

        // Override files property
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        // React Hack: Notify React that the value has changed
        // This is necessary because React might ignore the event if it doesn't match internal tracker
        const tracker = fileInput._valueTracker;
        if (tracker) {
            tracker.setValue("dummy_value_to_force_change");
            // Note: For file inputs, value is path, setting it is restricted, but tracking works on retrieval.
            // Actually, for file inputs, just setting 'files' and firing event is usually enough, 
            // but if tracker exists, we update it.
        }

        // Dispatch change event
        const event = new Event('change', { bubbles: true });
        const inputEvent = new Event('input', { bubbles: true });

        fileInput.dispatchEvent(inputEvent);
        fileInput.dispatchEvent(event);

        console.log('[CloudUI] Events dispatched');
    }

    // === Init ===
    // Wait for DOM
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(createButton, 1000); // Delay slightly to ensure UI load
    });

    // Also try immediately incase we are loaded late
    if (document.readyState === 'complete') {
        createButton();
    }

})();
