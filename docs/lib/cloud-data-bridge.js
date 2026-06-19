/**
 * Data injection bridge for Data Illustrator.
 *
 * Feeds project JSON and CSV sample data into the app through its existing
 * file input handlers.
 */

(function () {
    const t = (key) => (typeof DI18n !== 'undefined') ? DI18n.t(key) : key;

    function getFileInputs() {
        return Array.from(document.querySelectorAll('input[type="file"]'));
    }

    function dispatchFileInput(fileInput, file) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        fileInput.dispatchEvent(new Event('input', { bubbles: true }));
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function findProjectInput(fileInputs) {
        let fileInput = fileInputs.find(i => i.accept && (i.accept.includes('.msc') || i.accept.includes('.json')));

        if (!fileInput) {
            fileInput = fileInputs.find(i => !i.accept || !i.accept.includes('.csv'));
        }

        if (!fileInput && fileInputs.length > 1) {
            fileInput = fileInputs[1];
        } else if (!fileInput) {
            fileInput = fileInputs[0];
        }

        return fileInput;
    }

    function injectProjectData(jsonData) {
        const fileInputs = getFileInputs();

        if (fileInputs.length === 0) {
            console.error('CloudDataBridge: input[type="file"] not found');
            alert(t('error_no_file_loader'));
            return false;
        }

        const fileInput = findProjectInput(fileInputs);
        console.log('[CloudDataBridge] Selected target input:', fileInput);

        const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        const file = new File([blob], 'project.msc', { type: 'application/json' });
        dispatchFileInput(fileInput, file);
        return true;
    }

    function injectCsvData(text, fileName) {
        const fileInputs = getFileInputs();
        const csvInput = fileInputs.find(i => i.accept && i.accept.includes('.csv')) || fileInputs[0];
        if (!csvInput) return false;

        const blob = new Blob([text], { type: 'text/csv' });
        const file = new File([blob], fileName || 'data.csv', { type: 'text/csv' });
        dispatchFileInput(csvInput, file);
        return true;
    }

    window.CloudDataBridge = {
        injectProjectData,
        injectCsvData
    };
})();
