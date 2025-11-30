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
npm run start
```

### 4. Build and deploy

```bash
npm run build
```

GitHub Pages（`data-illustrateur.dataviz.jp`）へ配置する際は `config/gh-pages/config.toml` をマージして `baseURL` を明示的にカスタムドメインへ向ける必要があります。`npm run build:gh-pages` は `config/_default/config.toml` に加えて `config/gh-pages/config.toml` を読み込むため、生成される HTML/CSS/JS のリンクがドメイン直下を指すようになり、404 エラーを回避できます。このコマンドで `docs/` を再生成してから `main` ブランチへ push してください。
