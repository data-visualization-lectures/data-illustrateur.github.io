/**
 * Data Illustrator i18n - Language detection and translation utility
 * Detects browser language and provides translation lookup.
 * Must be loaded synchronously in <head> before other scripts.
 */
(function () {
  var stored = localStorage.getItem('di-lang');
  var browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);
  var lang = stored ? stored : (browserLang === 'ja' ? 'ja' : 'en');

  var translations = {
    en: {
      // cloud-ui.js buttons
      'load_project_file': 'Load Project File',
      'save_project_file': 'Save Project File',
      'export_svg': 'Export SVG',
      'load_sample_project': 'Load Sample Project',
      'save_project': 'Save Project',
      'load_project': 'Load Project',
      'export': 'Export',
      'help': 'Help',
      // cloud-ui.js messages
      'loading_projects': 'Loading projects...',
      'your_projects': 'Your Projects',
      'no_projects': 'No projects found.',
      'loading_thumbnails': 'Loading thumbnails...',
      'confirm_delete': 'Are you sure?',
      'loading_data': 'Loading data...',
      'project_loaded': 'Project loaded!',
      'load_failed': 'Load failed: ',
      'delete_failed': 'Delete failed: ',
      'error_loading_projects': 'Error loading projects: ',
      'error_no_file_loader': 'Error: Could not find file loader element.',
      'not_valid_json': 'Captured data is not valid JSON.',
      'saving': 'Saving...',
      'saved': 'Saved successfully!',
      'save_failed': 'Save failed: ',
      'enter_project_name': 'Enter Project Name:',
      'processing_project_list': 'Loading project list...',
      'processing_project_load': 'Loading project...',
      'processing_project_save': 'Saving project...',
      'processing_save_prep': 'Preparing save...',
      'processing_sample': 'Loading sample data...',
      'processing_file': 'Reading file...',
      'processing_export': 'Exporting...',
      // layouts/index.html
      'hero_subtitle': 'Create expressive data visualizations without programming',
      'launch_app': 'Launch App',
      'chrome_note': 'For the best experience, use Google Chrome',
      'intro_text': 'Data Illustrator aims to make creating visualizations as easy as drawing illustrations in a vector design tool like Figma or Adobe Illustrator.',
      'feature1_title': 'Flexible Mark Construction',
      'feature1_desc': 'Draw, select, and manipulate shapes as if working in a vector design interface.',
      'feature2_title': 'Bindable Graphics and Data',
      'feature2_desc': 'Bind graphics and data on the canvas through repeat, divide, and densify operations.',
      'feature3_title': 'Automatic Visual Encoding',
      'feature3_desc': 'Bind data columns to visual properties and see results instantly on the canvas.',
      // menus
      'menu_interface': 'User Interface',
      'menu_data': 'Data',
      'menu_shapes': 'Shapes',
      'menu_generate': 'Generate Shapes with Data',
      'menu_groups': 'Groups',
      'menu_encode': 'Encode',
      'menu_get-started': 'Get Started',
      'menu_gallery': 'Gallery',
      'menu_about': 'About',
      // search
      'search_placeholder': 'Search docs...',
      // app.js
      'sample_load': 'Load Sample',
      'sample_loaded': 'Sample loaded',
      'data_export': 'Export Data',
      'data_exported': 'Data exported',
    },
    ja: {
      // cloud-ui.js buttons
      'load_project_file': 'プロジェクト・ファイルの読込',
      'save_project_file': 'プロジェクト・ファイルの保存',
      'export_svg': 'SVG画像出力',
      'load_sample_project': 'サンプルプロジェクトの読込',
      'save_project': 'プロジェクトの保存',
      'load_project': 'プロジェクトの読込',
      'export': '出力',
      'help': 'ヘルプ',
      // cloud-ui.js messages
      'loading_projects': 'プロジェクトを読み込み中...',
      'your_projects': 'プロジェクト一覧',
      'no_projects': 'プロジェクトが見つかりません。',
      'loading_thumbnails': 'サムネイルを読み込み中...',
      'confirm_delete': '本当に削除しますか？',
      'loading_data': 'データを読み込み中...',
      'project_loaded': 'プロジェクトを読み込みました！',
      'load_failed': '読み込みに失敗しました: ',
      'delete_failed': '削除に失敗しました: ',
      'error_loading_projects': 'プロジェクトの読み込みエラー: ',
      'error_no_file_loader': 'エラー: ファイル読み込み要素が見つかりません。',
      'not_valid_json': 'キャプチャされたデータは有効なJSONではありません。',
      'saving': '保存中...',
      'saved': '保存しました！',
      'save_failed': '保存に失敗しました: ',
      'enter_project_name': 'プロジェクト名を入力してください:',
      'processing_project_list': 'プロジェクト一覧を読み込み中です',
      'processing_project_load': 'プロジェクトを読み込み中です',
      'processing_project_save': 'プロジェクトを保存中です',
      'processing_save_prep': '保存準備中です',
      'processing_sample': 'サンプルデータを読み込み中です',
      'processing_file': 'ファイルを読み込み中です',
      'processing_export': '書き出し中です',
      // layouts/index.html
      'hero_subtitle': 'プログラミングなしで表現力豊かなデータ視覚化を作成',
      'launch_app': 'アプリを起動',
      'chrome_note': '最適な体験を得るには、Google Chromeを使用してください',
      'intro_text': 'Data Illustratorは、FigmaやAdobe Illustratorのようなベクターデザインツールでイラストを描くのと同じくらい簡単に、視覚化作成を行うことを目指しています。',
      'feature1_title': '柔軟なマーク作成',
      'feature1_desc': 'ベクターデザインインターフェースで作業しているかのように、図形を描画、選択、操作できます。',
      'feature2_title': '解釈可能なグラフィックスとデータの結合',
      'feature2_desc': '繰り返し（repeat）、分割（divide）、高密度化（densify）の操作を通じて、キャンバス上のグラフィックスとデータを結合します。',
      'feature3_title': '自動的な視覚エンコーディング',
      'feature3_desc': 'データ列を視覚プロパティにバインドし、結果がキャンバス上で即座に更新されるのを確認できます。',
      // menus
      'menu_interface': 'ユーザー・インターフェイス',
      'menu_data': 'データ',
      'menu_shapes': '図形',
      'menu_generate': 'データから図形を生成する',
      'menu_groups': 'グループ',
      'menu_encode': 'エンコード',
      'menu_get-started': '始めよう',
      'menu_gallery': 'ギャラリー',
      'menu_about': 'このツールについて',
      // search
      'search_placeholder': 'ドキュメント検索...',
      // app.js
      'sample_load': 'サンプル読込',
      'sample_loaded': 'サンプルを読み込みました',
      'data_export': 'データ出力',
      'data_exported': 'データを出力しました',
    }
  };

  window.DI18n = {
    lang: lang,
    t: function (key) { return (translations[lang] || translations.en)[key] || key; },
    setLang: function (l) { localStorage.setItem('di-lang', l); location.reload(); }
  };

  document.documentElement.classList.add('lang-' + lang);

  // Swap menu text and placeholders on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    // Menu items with data-i18n-menu attribute
    document.querySelectorAll('[data-i18n-menu]').forEach(function (el) {
      var key = 'menu_' + el.getAttribute('data-i18n-menu');
      var t = DI18n.t(key);
      if (t !== key) el.textContent = t;
    });
    // Placeholders with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var t = DI18n.t(key);
      if (t !== key) {
        el.placeholder = t;
        el.setAttribute('aria-label', t);
      }
    });
  });
})();
