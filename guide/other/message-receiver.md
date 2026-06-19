# API設定

## 概要

外部からAIキャラクターへの指示を受け付けるための設定です。この機能を有効にすると、専用のAPIを通じてAIキャラクターに発言させることができます。

新しい外部APIは `/api/v1` 配下に用途別のエンドポイントとして提供されます。既存の `/api/messages` は互換性維持のため引き続き利用できます。

**環境変数**:

```bash
# 外部指示受け付け有効化設定（true/false）
NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED=false

# クライアントID / Client ID
NEXT_PUBLIC_CLIENT_ID=""

# /api/v1 のBearer認証に使うAPIキー
AITUBERKIT_API_KEY=""
```

## v1 API

`/api/v1` 配下のAPIは `Authorization: Bearer YOUR_API_KEY` ヘッダーで認証します。APIキーは `.env.local` の `AITUBERKIT_API_KEY` に設定してください。

### 1. 直接発話させる（POST /api/v1/speak）

キャラクターにテキストをそのまま発話させます。

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "こんにちは。外部APIからの発話テストです。", "emotion": "neutral", "priority": "normal", "interrupt": false}' \
  'http://localhost:3000/api/v1/speak/?clientId=YOUR_CLIENT_ID'
```

### 2. 会話入力として処理する（POST /api/v1/chat）

AITuberKitの入力欄に送った場合と同じ会話処理に流します。`mode` に `ai_generate` を指定すると、旧APIの `ai_generate` と同じくAI回答生成用の入力として処理します。

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "今日の配信で一言あいさつしてください。", "mode": "user_input", "interrupt": false}' \
  'http://localhost:3000/api/v1/chat/?clientId=YOUR_CLIENT_ID'
```

### 3. 停止する（POST /api/v1/stop）

現在の発話とキューを停止します。

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"mode": "all", "reason": "external_control"}' \
  'http://localhost:3000/api/v1/stop/?clientId=YOUR_CLIENT_ID'
```

### 4. 状態を取得する（GET /api/v1/status）

接続中クライアントの発話状態、処理状態、キュー件数を取得します。

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/status/?clientId=YOUR_CLIENT_ID'
```

### 5. イベントを取得する（GET /api/v1/events）

APIイベントは Server-Sent Events として購読できます。API Consoleでは `snapshot=true` を付けて直近イベントを確認できます。

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?clientId=YOUR_CLIENT_ID&snapshot=true'
```

## API Console

「メッセージ送信ページ」は API Console として拡張されています。新しい `/api/v1` APIと既存の `/api/messages` の両方を画面から実行できます。

## 機能の有効化

外部からの指示を受け付ける機能のON/OFFを切り替えることができます。ONにすると、クライアントIDが自動的に生成されます。<br>
クライアントIDは、任意の値に編集することも可能です。

:::tip ヒント
クライアントIDは、外部からのメッセージ送信時に必要となります。
:::

## 旧APIのメッセージ送信

互換性維持のため、旧 `/api/messages` エンドポイントも引き続き利用できます。

旧APIでは以下の3つの方法でメッセージを送信できます：

### 1. AIキャラクターにそのまま発言させる（direct_send）

- 入力したメッセージをそのままAIキャラクターに発言させます
- 複数のメッセージを送信した場合は、順番に処理されます
- 音声モデルはAITuberKitの設定で選択したものが使用されます

**APIリクエスト例**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"messages": ["こんにちは、今日もいい天気ですね。", "今日の予定を教えてください。"]}' \
  'http://localhost:3000/api/messages/?clientId=YOUR_CLIENT_ID&type=direct_send'
```

### 2. AIで回答を生成してから発言させる（ai_generate）

- 入力したメッセージからAIが回答を生成し、その回答をAIキャラクターに発言させます
- 複数のメッセージを送信した場合は、順番に処理されます
- AIモデルおよび音声モデルはAITuberKitの設定で選択したものが使用されます
- システムプロンプトの設定方法：
  - AITuberKitのシステムプロンプトを使用する場合は `useCurrentSystemPrompt: true` を設定
  - カスタムのシステムプロンプトを使用する場合は `systemPrompt` パラメータに指定し、`useCurrentSystemPrompt: false` を設定
- 過去の会話履歴を読み込ませる場合は、システムプロンプトまたはユーザーメッセージの任意の位置に `[conversation_history]` という文字列を含めることができます
- 画像（Base64形式のdata URI）を `image` パラメータに添付すると、カメラキャプチャの代わりに外部画像を使用してAIに送信します

**APIリクエスト例**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"systemPrompt": "You are a helpful assistant.", "useCurrentSystemPrompt": false, "messages": ["この画像について説明してください。"], "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/messages/?clientId=YOUR_CLIENT_ID&type=ai_generate'
```

### 3. ユーザー入力を送信する（user_input）

- 送信したメッセージはAITuberKitの入力フォームから入力された場合と同じ処理がされます
- 複数のメッセージを送信した場合は、順番に処理されます
- AIモデルおよび音声モデルはAITuberKitの設定で選択したものが使用されます
- システムプロンプトや会話履歴はAITuberKitの値が使用されます
- 画像（Base64形式のdata URI）を `image` パラメータに添付すると、カメラキャプチャの代わりに外部画像を使用して処理します

**APIリクエスト例**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"messages": ["こんにちは、今日もいい天気ですね。"], "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/messages/?clientId=YOUR_CLIENT_ID&type=user_input'
```

## APIレスポンス

各APIリクエストに対するレスポンスは、リクエストの処理結果を含むJSONオブジェクトとして返されます。レスポンスには、処理されたメッセージや処理状況に関する情報が含まれます。

:::tip ヒント
メッセージ送信ページでは、各送信方法のフォームの下部にレスポンス表示エリアがあり、APIからのレスポンスを確認することができます。
:::

## 注意点

- クライアントIDは外部からのアクセスを制限するために使用されます。第三者に漏洩しないよう注意してください。
- 大量のメッセージを短時間に送信すると、処理が遅延する可能性があります。
- 外部からの指示を受け付ける機能は、セキュリティ上のリスクを伴います。信頼できる環境でのみ有効化してください。
