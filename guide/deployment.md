# デプロイ

AITuberKitは、ローカル環境での実行に加えて、各種クラウドプラットフォームへのデプロイに対応しています。

## Vercel

Next.jsアプリケーションとして、Vercelへのデプロイが最も簡単です。

### 手順

1. [Vercel](https://vercel.com/) にアカウントを作成し、GitHubリポジトリを連携します
2. 「New Project」からAITuberKitのリポジトリをインポートします
3. 環境変数を設定します（`.env.example`を参考に、必要なAPIキーを設定）
4. 「Deploy」をクリックしてデプロイを実行します

### 設定のポイント

- **Framework Preset**: `Next.js`が自動検出されます
- **Node.js Version**: `24.x`を指定してください
- **環境変数**: サーバーサイドのAPIキー（`OPENAI_API_KEY`等）はVercelの環境変数設定で管理してください

::: warning セキュリティに関する注意
Vercelにデプロイする場合、APIキーはVercelの環境変数として設定し、クライアント側に露出しないようにしてください。`NEXT_PUBLIC_`プレフィックスが付いた環境変数はクライアント側に公開されるため、APIキーには使用しないでください。
:::

## Cloudflare

Cloudflare Workers/Pagesへのデプロイにも対応しています。[OpenNext for Cloudflare](https://opennext.js.org/cloudflare)を使用してNext.jsアプリケーションをCloudflare上で実行します。

### 前提条件

- [Cloudflare](https://www.cloudflare.com/)のアカウント
- Wrangler CLI（`npm install -g wrangler`）のインストールとログイン（`wrangler login`）

### ビルドとデプロイ

```bash
# Cloudflare用ビルドのみ
npm run build:cloudflare

# ローカルプレビュー（ビルド + wrangler dev）
npm run preview:cloudflare

# デプロイ（ビルド + wrangler deploy）
npm run deploy:cloudflare
```

### 仕組み

- `scripts/build-cloudflare.js`がビルドプロセスを管理します
- ビルド時に`NEXT_PUBLIC_RESTRICTED_MODE=true`が自動設定され、制限モードで動作します
- `public/`配下の不要ファイル（gitignored、25MB超、非ASCIIファイル名）は自動的に退避・復元されます
- 設定ファイルは`wrangler.jsonc`と`open-next.config.ts`で管理されます

### 制限事項

- 制限モード（Restricted Mode）で動作するため、一部の機能が制限される場合があります
- Cloudflare Workersのランタイム制約（メモリ、実行時間等）に注意してください

## Docker

Docker環境を使ったデプロイも可能です。

### Docker Compose

```bash
# 環境変数ファイルを準備
cp .env.example .env

# Docker Composeで起動
docker compose up
```

### 本番環境向けDockerデプロイ

Dockerfileは開発モード（`npm run dev`）で起動する設定になっています。本番環境で使用する場合は、以下のようにDockerfileを調整してください：

```dockerfile
# CMD を本番用に変更
RUN npm run build
CMD ["npx", "next", "start"]
```

## セキュリティに関する注意事項

どのプラットフォームにデプロイする場合でも、以下の点に注意してください：

- **APIキーの管理**: APIキーは環境変数で管理し、クライアントサイドに露出しないようにしてください
- **アクセス制限**: 必要に応じて認証・認可の仕組みを実装してください
- **利用者への説明**: 各利用者が自身のAPIキーを使用する場合は、セキュリティ上の注意点について説明してください

詳細は[はじめに](/guide/introduction#セキュリティに関する注意事項)のセキュリティセクションも参照してください。
