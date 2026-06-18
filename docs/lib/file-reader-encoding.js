/**
 * FileReader encoding bridge for Data Illustrator.
 *
 * Auto-detects legacy Japanese encodings and converts text file reads to UTF-8.
 */

(function () {
    const t = (key) => (typeof DI18n !== 'undefined') ? DI18n.t(key) : key;

    function showProcessingToast(message, duration = 5000) {
        const toolHeader = document.querySelector('dataviz-tool-header');
        if (toolHeader && toolHeader.showMessage) {
            toolHeader.showMessage(message, 'info', duration);
        } else {
            console.log('Toast:', message, 'info');
        }
    }

    const originalReadAsText = FileReader.prototype.readAsText;

    FileReader.prototype.readAsText = function (blob, encoding) {
        showProcessingToast(t('processing_file'));

        // Fallback if encoding-japanese is not loaded or explicit non-UTF-8 encoding is specified
        if (typeof Encoding === 'undefined' || (encoding && encoding.toLowerCase() !== 'utf-8')) {
            return originalReadAsText.call(this, blob, encoding);
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
})();
