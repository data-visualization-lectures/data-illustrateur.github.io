### 1. Install Hugo

```bash
https://gohugo.io/getting-started/installing/
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm start

http://localhost:1313?auth_debug
http://localhost:1313/app/?auth_debug

```

### 4. Build and deploy

```bash
npm run build:gh-pages
npm run check:generated
```

GitHub Pages（`data-illustrator.dataviz.jp`）へ配置する際は `config/gh-pages/config.toml` をマージして `baseURL` を明示的にカスタムドメインへ向ける必要があります。`npm run build:gh-pages` は `config/_default/config.toml` に加えて `config/gh-pages/config.toml` を読み込むため、生成される HTML/CSS/JS のリンクがドメイン直下を指すようになり、404 エラーを回避できます。

`docs/` は配信用の生成物です。`assets/`、`content/`、`layouts/`、`static/` を変更した場合は `npm run build:gh-pages` で `docs/` をクリーン再生成してから、`npm run check:generated` で現在のソースと `docs/` が一致していることを確認してください。

このコマンドで `docs/` を再生成してから `save-cloud` ブランチへ push してください（本リポジトリでは `save-cloud` ブランチの `docs/` 配下が GitHub Pages の配信元になっています）。

### Cloud API client

現在の `/app/` は `dataviz-tool-header` 経由でクラウド保存・読込を扱っており、`/lib/cloud-api.js` は直接読み込んでいません。このファイルは外部利用や旧実装との互換用 public client として残しています。

再利用する場合は、`/lib/cloud-api.js` を読み込む前に必要な値を設定できます。

```html
<script>
  window.datavizCloudApiConfig = {
    apiBaseUrl: 'https://api.dataviz.jp',
    appName: 'data-illustrator',
    authCookieName: 'sb-dataviz-auth-token',
    supabaseUrl: 'https://vebhoeiltxspsurqoxvl.supabase.co',
    storageSignExpirySeconds: 3600
  };
</script>
<script src="/lib/cloud-api.js"></script>
```
