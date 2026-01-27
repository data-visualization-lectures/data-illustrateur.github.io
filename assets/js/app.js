document.addEventListener('DOMContentLoaded', () => {
  const toolHeader = document.querySelector('dataviz-tool-header');

  if (toolHeader) {
    toolHeader.setConfig({
      buttons: [
        {
          label: 'サンプル読込',
          action: () => {
            console.log('Sample load action');
            toolHeader.showMessage('サンプルを読み込みました', 'success');
          }
        },
        {
          label: 'データ出力',
          action: () => {
            console.log('Data export action');
            toolHeader.showMessage('データを出力しました', 'info');
          }
        },
        {
          label: 'ヘルプ',
          type: 'link',
          href: '/docs/'
        }
      ]
    });
  }
});
