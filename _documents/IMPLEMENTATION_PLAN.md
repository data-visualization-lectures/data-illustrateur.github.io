# Data Illustrator クラウド入出力 実装計画書

## 概要
Data Illustrator本体のソースコード（Reactなど）にアクセスできない環境において、ビルド済みのWebアプリケーションに対して外部スクリプトを注入することで、Supabaseを利用したクラウド保存・読み込み機能（.mscファイルの入出力）を実現するための計画書です。

## 前提条件
*   **環境**: ビルド済みのData Illustrator Webサイト (`data-illustrateur.github.io`)
*   **制約**: Data Illustrator内部のソースコード修正は不可。`index.html` へのスクリプト追加のみで対応する。
*   **認証**: 既存の `dataviz-auth-client.js` が提供するSupabase認証セッションを利用する。

## 実装方針：UIオーバーレイ ＆ DOM操作ハック
アプリケーションのDOM構造に外部から介入（ハック）し、データの入出力を行います。

1.  **独自UIの注入**: 画面上に「Cloud Menu」ボタンを追加。
2.  **保存機能**: 標準の「ダウンロード」処理をフックし、生成されたデータをSupabaseへ送信。
3.  **読込機能**: 取得したJSONデータを、標準の「ファイルアップロード」input要素へプログラム的に流し込む。

---

## 詳細フェーズ

### Phase 1: Cloud API クライアントの実装
Data IllustratorとSupabase API (`api.dataviz.jp`) との通信を担うスクリプトを作成します。

*   **ファイル**: `static/lib/cloud-api.js`
*   **機能**:
    *   `listProjects(appName)`: `GET /api/projects`
    *   `getProject(id)`: `GET /api/projects/:id`
    *   `saveProject(data, thumbnail)`: `POST /api/projects` (新規) / `PUT` (更新)
    *   `deleteProject(id)`: `DELETE /api/projects/:id`
*   **要件**:
    *   `dataviz-auth-client.js` で管理されているアクセストークンをヘッダーに付与。
    *   サブスクリプション権限がない場合のエラーハンドリング (403 Forbidden)。

### Phase 2: Cloud UI の実装 (オーバーレイ)
ユーザーがクラウド機能を利用するためのインターフェースを作成します。

*   **ファイル**: `static/lib/cloud-ui.js`
*   **機能**:
    *   **Cloudボタン**: 画面上の適切な位置（ヘッダーまたはツールバー付近）にフローティングボタンを表示。
    *   **プロジェクト一覧モーダル**:
        *   保存済みプロジェクトのリスト表示（サムネイル、名前、更新日）。
        *   「開く（Load）」「削除」アクション。
    *   **保存モーダル**:
        *   プロジェクト名の入力。
        *   新規保存 / 上書き保存の選択。
*   **制御**:
    *   未ログイン時はボタンを非表示、またはログインを促すステータスを表示。

### Phase 3: データ入出力ブリッジの実装 (DOMハック)
Data Illustratorの内部挙動を利用してデータの取り出し・注入を行います。

#### 1. 保存（Export）の実装方法
Data Illustratorが `.msc` ファイルをダウンロードする挙動を利用します。

*   **HTML要素の特定**: 「Save / Export」ボタンのID/Classを特定。
*   **データ取得戦略**:
    *   `URL.createObjectURL` をオーバーライド（フック）し、アプリが生成したBlobデータを横取りする。
    *   または、非表示のダウンロード用 `<a>` タグの生成を監視 (`MutationObserver`) し、`href` 属性（Blob URL）からデータを取得する。
*   **プロセス**:
    1.  ユーザーが「クラウド保存」をクリック。
    2.  スクリプトが裏で「Data IllustratorのExportボタン」をクリック。
    3.  フックした処理でファイルダウンロードをキャンセルし、データ（JSONテキスト）を取得。
    4.  現在のキャンバス（`<canvas>`）から `toDataURL()` でサムネイル画像を生成。
    5.  JSONデータとサムネイルを `cloud-api.js` 経由で送信。

#### 2. 読み込み（Import）の実装方法
Data Illustratorが `.msc` ファイルを読み込む挙動を利用します。

*   **HTML要素の特定**: ファイル読み込み用の `<input type="file">` 要素を特定。
*   **データ注入戦略**:
    *   `DataTransfer` オブジェクトを使用して、取得したJSONデータから `File` オブジェクトを擬似的に作成。
    *   対象の `<input>` 要素の `files` プロパティにセットし、`change` イベントを発火させる。
*   **プロセス**:
    1.  ユーザーが一覧からプロジェクトを選択し「開く」をクリック。
    2.  `cloud-api.js` でJSONデータを取得。
    3.  JSONデータを `File` オブジェクト化。
    4.  Data Illustratorの `<input type="file">` を検索し、データをセット＆イベント発火。

### Phase 4: 統合とデプロイ
*   **`index.html` の修正**:
    *   `cloud-api.js`, `cloud-ui.js` を `<body>` 末尾で読み込むタグを追加。
    *   `cloud_ui.css` (必要であれば) の読み込み。

---

## 課題とリスク
*   **DOM構造の変更**: 将来的にData Illustratorのバージョンが上がり、IDやクラス名が変わると動作しなくなる可能性がある（もろい実装手法であることは認識しておく）。
*   **Blobフックの難易度**: アプリケーションの実装によっては、`URL.createObjectURL` を使わず直接Data URIでダウンロードさせている場合もあり、その場合はフックの手法を変える必要がある。

## 今後のステップ
1.  Phase 1 & 2 のベースコード作成。
2.  実機ブラウザでのDOM調査（ターゲットとなるボタンやInput要素の特定）。
3.  Phase 3 のブリッジロジック実装と検証。
