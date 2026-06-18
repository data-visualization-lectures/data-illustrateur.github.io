document.addEventListener('DOMContentLoaded', () => {
  const t = (key) => (typeof DI18n !== 'undefined') ? DI18n.t(key) : key;
  const toolHeader = document.querySelector('dataviz-tool-header');
  const showProcessingToast = (message) => {
    if (toolHeader && typeof toolHeader.showMessage === 'function') {
      toolHeader.showMessage(message, 'info', 5000);
    }
  };

  if (toolHeader) {
    toolHeader.setConfig({
      buttons: [
        {
          label: t('sample_load'),
          action: () => {
            showProcessingToast(t('processing_sample'));
            console.log('Sample load action');
            toolHeader.showMessage(t('sample_loaded'), 'success');
          }
        },
        {
          label: t('data_export'),
          action: () => {
            showProcessingToast(t('processing_export'));
            console.log('Data export action');
            toolHeader.showMessage(t('data_exported'), 'info');
          }
        },
        {
          label: t('help'),
          type: 'link',
          href: '/docs/'
        }
      ]
    });
  }
});
