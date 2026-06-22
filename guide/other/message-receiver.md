# API設定

## 概要

外部からのAPI操作を有効にするための設定です。この機能を有効にすると、API経由でAIキャラクターの発話・会話入力・停止などを実行できます。

`/api/v1` 配下に用途別のエンドポイントが提供されます。既存の `/api/messages` は互換性維持のため引き続き利用できます。

**環境変数**:

```bash
# 外部からのAPI操作有効化設定（true/false）
NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED=false

# クライアントID / Client ID
NEXT_PUBLIC_CLIENT_ID=""

# /api/v1 のBearer認証に使うAPIキー
AITUBERKIT_API_KEY=""
```

## v1 API

`/api/v1` 配下のAPIは `Authorization: Bearer YOUR_API_KEY` ヘッダーで認証します。APIキーは `.env.local` の `AITUBERKIT_API_KEY` に設定してください。

### 共通仕様

表記: `●` 必須、`△` 条件付き、`-` 任意

| 項目 | 指定方法 | 要件 | 説明 |
| --- | --- | --- | --- |
| `Authorization` | HTTPヘッダー | `●` | `Bearer YOUR_API_KEY` の形式で指定します。 |

`clientId` は対象クライアントを指定するパラメータです。`speak` / `chat` / `stop` / `status` では必須、`events` ではイベントを絞り込むための任意パラメータです。POST系APIではクエリ文字列またはJSON本文、GET系APIではクエリ文字列で指定します。

POSTリクエストの本文はJSONで送信します。画像を送る場合は、`image` に `data:image/png;base64,...` のようなBase64 data URIを指定してください。画像文字列は最大約1,000万文字まで受け付けます。

### 1. 直接発話させる（POST /api/v1/speak）

キャラクターにテキストをそのまま発話させます。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `clientId` | `string` | `●` | メッセージを受け取るAITuberKit側のクライアントIDです。クエリ文字列またはJSON本文で指定します。 |
| `text` | `string` | `△` | 発話させる本文です。`messages` を指定しない場合に必須です。 |
| `messages` | `string[]` | `△` | 複数文をまとめてキューに入れる場合に指定します。`text` を指定しない場合に必須です。 |
| `emotion` | `string` | `-` | 発話時の表情・感情指定です。未指定の場合は通常状態で処理します。 |
| `priority` | `"normal"` / `"high"` | `-` | `high` の場合は通常より前にキューへ入れます。未指定時は `normal` です。 |
| `interrupt` | `boolean` | `-` | `true` の場合、現在の発話と待機キューを停止してからこの発話を入れます。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "こんにちは。API経由の発話テストです。", "emotion": "neutral", "priority": "normal", "interrupt": false}' \
  'http://localhost:3000/api/v1/speak/?clientId=YOUR_CLIENT_ID'
```

### 2. 会話入力として処理する（POST /api/v1/chat）

AITuberKitの入力欄に送った場合と同じ会話処理に流します。`mode` に `ai_generate` を指定すると、旧APIの `ai_generate` と同じくAI回答生成用の入力として処理します。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `clientId` | `string` | `●` | メッセージを受け取るAITuberKit側のクライアントIDです。クエリ文字列またはJSON本文で指定します。 |
| `text` | `string` | `△` | キャラクターへ渡す入力文です。`messages` を指定しない場合に必須です。 |
| `messages` | `string[]` | `△` | 複数の入力文をまとめて送る場合に指定します。`text` を指定しない場合に必須です。 |
| `mode` | `"user_input"` / `"ai_generate"` | `-` | `user_input` は入力欄から送った場合と同じ処理、`ai_generate` はAI回答生成用の入力として処理します。未指定時は `user_input` です。 |
| `systemPrompt` | `string` | `-` | `mode` が `ai_generate` かつ `useCurrentSystemPrompt` が `false` の場合に使うシステムプロンプトです。 |
| `useCurrentSystemPrompt` | `boolean` | `-` | `mode` が `ai_generate` の場合、現在のキャラクター設定のシステムプロンプトを使うかどうかです。未指定時は `true` です。 |
| `image` | `string` | `-` | 画像をBase64 data URIで指定します。例: `data:image/png;base64,iVBOR...` |
| `priority` | `"normal"` / `"high"` | `-` | `high` の場合は通常より前にキューへ入れます。未指定時は `normal` です。 |
| `interrupt` | `boolean` | `-` | `true` の場合、現在の発話と待機キューを停止してからこの入力を入れます。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "今日の配信で一言あいさつしてください。", "mode": "user_input", "interrupt": false}' \
  'http://localhost:3000/api/v1/chat/?clientId=YOUR_CLIENT_ID'
```

画像付きで送る場合:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "この画像について説明してください。", "mode": "ai_generate", "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/v1/chat/?clientId=YOUR_CLIENT_ID'
```

### 3. 停止する（POST /api/v1/stop）

現在の発話とキューを停止します。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `clientId` | `string` | `●` | 停止対象のAITuberKit側のクライアントIDです。クエリ文字列またはJSON本文で指定します。 |
| `mode` | `"speech"` / `"queue"` / `"all"` | `-` | 停止範囲です。`speech` は現在の発話、`queue` は待機キュー、`all` は両方を停止します。未指定時は `all` です。 |
| `reason` | `string` | `-` | 停止理由のメモです。イベントログ確認用に残せます。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"mode": "all", "reason": "external_control"}' \
  'http://localhost:3000/api/v1/stop/?clientId=YOUR_CLIENT_ID'
```

### 4. 状態を取得する（GET /api/v1/status）

接続中クライアントの発話状態、処理状態、キュー件数を取得します。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `clientId` | クエリ文字列 | `●` | 状態を取得するAITuberKit側のクライアントIDです。 |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/status/?clientId=YOUR_CLIENT_ID'
```

### 5. イベントを取得する（GET /api/v1/events）

APIイベントは Server-Sent Events として購読できます。API Consoleでは `snapshot=true` を付けて直近イベントを確認できます。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `clientId` | クエリ文字列 | `-` | 指定したクライアントIDのイベントだけに絞り込みます。未指定の場合は全クライアントのイベントを対象にします。 |
| `snapshot` | `boolean` | `-` | `true` の場合は直近イベントをJSONで返します。未指定の場合はSSE接続になります。 |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?clientId=YOUR_CLIENT_ID&snapshot=true'
```

## API Console

「メッセージ送信ページ」は API Console として拡張されています。`/api/v1` APIと既存の `/api/messages` の両方を画面から実行できます。

## 機能の有効化

外部からのAPI操作を受け付ける機能のON/OFFを切り替えることができます。ONにすると、クライアントIDが自動的に生成されます。<br>
クライアントIDは、任意の値に編集することも可能です。

::: warning
制限モードが有効な環境では、このトグルは無効化され、APIとポーリングも停止します。設定画面ではトグルの近くに無効化理由が表示されます。
:::

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
- 外部からのAPI操作を受け付ける機能は、セキュリティ上のリスクを伴います。信頼できる環境でのみ有効化してください。
