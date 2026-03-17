document.addEventListener('DOMContentLoaded', () => {
  const t = (key) => (typeof DI18n !== 'undefined') ? DI18n.t(key) : key;
  const toolHeader = document.querySelector('dataviz-tool-header');

  if (toolHeader) {
    toolHeader.setConfig({
      buttons: [
        {
          label: t('sample_load'),
          action: () => {
            console.log('Sample load action');
            toolHeader.showMessage(t('sample_loaded'), 'success');
          }
        },
        {
          label: t('data_export'),
          action: () => {
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
