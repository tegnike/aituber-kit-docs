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

# ブラウザ側のMessageReceiverが /api/v1 を呼び出す際のAPIキー
NEXT_PUBLIC_AITUBERKIT_API_KEY=""
```

`NEXT_PUBLIC_AITUBERKIT_API_KEY` はブラウザへ公開されます。信頼できる閉域・ローカル環境でMessageReceiverから認証付き `/api/v1` を呼び出す用途に限定し、公開サイトでは秘匿情報として扱わないでください。

## v1 API

`/api/v1` 配下のAPIは `Authorization: Bearer YOUR_API_KEY` ヘッダーで認証します。APIキーは `.env.local` の `AITUBERKIT_API_KEY` に設定してください。

### 共通仕様

表記: `●` 必須、`△` 条件付き、`-` 任意

| 項目 | 指定方法 | 要件 | 説明 |
| --- | --- | --- | --- |
| `Authorization` | HTTPヘッダー | `●` | `Bearer YOUR_API_KEY` の形式で指定します。 |

`receiverId` はブラウザタブやOBS Browser Sourceなど、特定のAITuberKit画面を指定するルーティングIDです。`speak` / `chat` / `stop` / `status` では `receiverId` または従来の `clientId` のどちらかが必須で、`events` ではイベントを絞り込む任意パラメータです。POST系APIではクエリ文字列またはJSON本文、GET系APIではクエリ文字列で指定します。

両方を指定した場合は、JSON本文の `receiverId`、JSON本文の `clientId`、クエリ文字列の `receiverId`、クエリ文字列の `clientId` の順で優先されます。新しい連携では `receiverId` を推奨します。`clientId` は既存連携との互換性のため引き続き利用できます。

POSTリクエストの本文はJSONで送信します。画像を送る場合は、`image` に `data:image/png;base64,...` のようなBase64 data URIを指定してください。画像文字列は最大約1,000万文字まで受け付けます。

### 接続中のReceiverを取得する（GET /api/v1/receivers）

同じサーバーへ接続中のAITuberKit画面を一覧で取得します。複数のブラウザタブやOBS Browser Sourceから、操作対象を選ぶ場合に使用します。

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/receivers/'
```

```json
{
  "ok": true,
  "receivers": [
    {
      "receiverId": "aituber-receiver-7be9e2c4-57de-4ddb-a808-e85da6fb2387",
      "configuredClientId": "main-stage",
      "displayName": "Chrome a6fb2387",
      "kind": "browser",
      "capabilities": ["presentation", "chat", "speech"],
      "connected": true,
      "isSpeaking": false,
      "lastSeenAt": "2026-08-04T10:00:00.000Z"
    }
  ]
}
```

| フィールド | 説明 |
| --- | --- |
| `receiverId` | 発話・チャット・停止・プレゼンテーション操作の配送先に使う一時IDです。 |
| `configuredClientId` | 設定画面に保存された従来の論理クライアントIDです。複数Receiverで共有される場合があります。 |
| `displayName` | 選択UI向けの補助表示名です。永続識別には使用しないでください。 |
| `kind` | `browser`、`obs`、互換経路の `legacy` のいずれかです。 |
| `capabilities` | 対応する `presentation`、`chat`、`speech` の一覧です。 |
| `isSpeaking` | 一覧取得時点で発話中かどうかを示します。 |
| `lastSeenAt` | 最後に状態が報告された時刻です。 |

`receiverId` は同じタブの再読み込みでは維持されますが、タブやOBSインスタンスを作り直すと変わる一時IDです。最終状態報告から10秒を超えたReceiverは一覧から除外されるため、保存済みIDが見つからない場合は一覧を再取得してください。

Receiver RegistryはAITuberKitを実行している1つのNode.jsプロセス内で管理されます。複数プロセス構成やサーバーレス構成ではReceiver一覧は共有されません。また、`receiverId` は認証情報ではありません。すべての `/api/v1` 操作にはAPIキーが必要です。

### 1. 直接発話させる（POST /api/v1/speak）

キャラクターにテキストをそのまま発話させます。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | `string` | `●` | メッセージを受け取るAITuberKit画面のReceiver ID、または互換用クライアントIDです。クエリ文字列またはJSON本文で指定します。 |
| `text` | `string` | `△` | 発話させる本文です。`messages` を指定しない場合に必須です。 |
| `messages` | `string[]` | `△` | 複数文をまとめてキューに入れる場合に指定します。`text` を指定しない場合に必須です。 |
| `emotion` | `string` | `-` | 発話時の表情・感情指定です。未指定の場合は通常状態で処理します。 |
| `priority` | `"normal"` / `"high"` | `-` | `high` の場合は通常より前にキューへ入れます。未指定時は `normal` です。 |
| `interrupt` | `boolean` | `-` | `true` の場合、現在の発話と待機キューを停止してからこの発話を入れます。 |
| `speechSessionId` | `string` | `-` | 分割送信した同じ回答を1つの発話セッションとして扱うIDです。前後の空白を除いて1〜200文字で指定します。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "こんにちは。API経由の発話テストです。", "emotion": "neutral", "priority": "normal", "interrupt": false}' \
  'http://localhost:3000/api/v1/speak/?receiverId=YOUR_RECEIVER_ID'
```

ストリーミング生成した回答を文単位などで分割して送る場合は、同じ回答の全リクエストに共通の `speechSessionId` を指定してください。同じIDの発話は、`priority` が `high` の場合も送信順（FIFO）で同じ発話キューへ追加されます。省略した場合は、リクエストごとに独立した発話として扱われます。

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "最初の文です。", "speechSessionId": "answer-stream-001"}' \
  'http://localhost:3000/api/v1/speak/?receiverId=YOUR_RECEIVER_ID'

curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "続きの文です。", "speechSessionId": "answer-stream-001"}' \
  'http://localhost:3000/api/v1/speak/?receiverId=YOUR_RECEIVER_ID'
```

### 2. 会話入力として処理する（POST /api/v1/chat）

AITuberKitの入力欄に送った場合と同じ会話処理に流します。`mode` に `ai_generate` を指定すると、旧APIの `ai_generate` と同じくAI回答生成用の入力として処理します。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | `string` | `●` | メッセージを受け取るAITuberKit画面のReceiver ID、または互換用クライアントIDです。クエリ文字列またはJSON本文で指定します。 |
| `text` | `string` | `△` | キャラクターへ渡す入力文です。`messages` を指定しない場合に必須です。 |
| `messages` | `string[]` | `△` | 複数の入力文をまとめて送る場合に指定します。`text` を指定しない場合に必須です。 |
| `mode` | `"user_input"` / `"ai_generate"` | `-` | `user_input` は入力欄から送った場合と同じ処理、`ai_generate` はAI回答生成用の入力として処理します。未指定時は `user_input` です。 |
| `systemPrompt` | `string` | `-` | `mode` が `ai_generate` かつ `useCurrentSystemPrompt` が `false` の場合に使うシステムプロンプトです。 |
| `useCurrentSystemPrompt` | `boolean` | `-` | `mode` が `ai_generate` の場合、現在のキャラクター設定のシステムプロンプトを使うかどうかです。未指定時は `true` です。 |
| `image` | `string` | `-` | 画像をBase64 data URIで指定します。例: `data:image/png;base64,iVBOR...` |
| `priority` | `"normal"` / `"high"` | `-` | `high` の場合は通常より前にキューへ入れます。未指定時は `normal` です。 |
| `interrupt` | `boolean` | `-` | `true` の場合、現在の発話と待機キューを停止してからこの入力を入れます。 |
| `responseCallback` | `object` | `-` | AI回答をローカルHTTPコールバックへ返す場合に指定します。詳細は後述します。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "今日の配信で一言あいさつしてください。", "mode": "user_input", "interrupt": false}' \
  'http://localhost:3000/api/v1/chat/?receiverId=YOUR_RECEIVER_ID'
```

画像付きで送る場合:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "この画像について説明してください。", "mode": "ai_generate", "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/v1/chat/?receiverId=YOUR_RECEIVER_ID'
```

#### AI回答のコールバック

`responseCallback` を指定すると、AI回答の生成完了後にAITuberKitサーバーからローカルのHTTPエンドポイントへ結果を返せます。

```json
{
  "text": "この資料の要点を説明してください。",
  "mode": "user_input",
  "responseCallback": {
    "url": "http://127.0.0.1:8787/aituber-kit/callback",
    "interactionId": "request-001",
    "token": "replace-with-a-random-token"
  }
}
```

コールバック先には次の形式でPOSTされます。

```json
{
  "interactionId": "request-001",
  "token": "replace-with-a-random-token",
  "status": "completed",
  "content": "生成されたAI回答"
}
```

- `url` は `http://127.0.0.1`、`http://localhost`、`http://[::1]` のいずれかに限定されます
- `interactionId` は英数字で始まり、英数字・ハイフン・アンダースコアを使用できます（最大128文字）
- `token` は8〜256文字です。コールバック受信側で照合してください
- `status` は `completed`、`empty`、`failed` のいずれかです。`failed` の場合は `error` が含まれます

### 3. 停止する（POST /api/v1/stop）

現在の発話とキューを停止します。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | `string` | `●` | 停止対象のAITuberKit画面のReceiver ID、または互換用クライアントIDです。クエリ文字列またはJSON本文で指定します。 |
| `mode` | `"speech"` / `"queue"` / `"all"` | `-` | 停止範囲です。`speech` は現在の発話、`queue` は待機キュー、`all` は両方を停止します。未指定時は `all` です。 |
| `reason` | `string` | `-` | 停止理由のメモです。イベントログ確認用に残せます。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"mode": "all", "reason": "external_control"}' \
  'http://localhost:3000/api/v1/stop/?receiverId=YOUR_RECEIVER_ID'
```

### 4. 状態を取得する（GET /api/v1/status）

接続中クライアントの発話状態、処理状態、キュー件数を取得します。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | クエリ文字列 | `●` | 状態を取得するAITuberKit画面のReceiver ID、または互換用クライアントIDです。 |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/status/?receiverId=YOUR_RECEIVER_ID'
```

### 5. イベントを取得する（GET /api/v1/events）

APIイベントは Server-Sent Events として購読できます。API Consoleでは `snapshot=true` を付けて直近イベントを確認できます。

| パラメータ | 型 | 要件 | 説明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | クエリ文字列 | `-` | 指定したReceiver ID、または互換用クライアントIDのイベントだけに絞り込みます。未指定の場合は全Receiverを対象にします。 |
| `snapshot` | `boolean` | `-` | `true` の場合は直近イベントをJSONで返します。未指定の場合はSSE接続になります。 |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?receiverId=YOUR_RECEIVER_ID&snapshot=true'
```

ライブイベントを購読する場合は `snapshot` を省略し、`Accept: text/event-stream` を指定します。`curl` ではバッファリングを無効化する `-N` を使用してください。

```bash
curl -N \
  -H "Accept: text/event-stream" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?receiverId=YOUR_RECEIVER_ID'
```

イベントは次のSSEフレーム形式で届きます。

```text
id: evt_01K1ABCDEF
event: message_queued
data: {"id":"evt_01K1ABCDEF","timestamp":1785877200000,"clientId":"aituber-receiver-123","type":"message_queued","payload":{"count":1,"messageType":"direct_send","source":"v1","interrupt":false}}
```

`event`（または `data.type`）で取得対象を判断し、`data.clientId` を配送先IDとして使用します。`message_queued` では `GET /api/v1/client/messages/?receiverId=<data.clientId>`、`command_queued` と `stop_requested` では `GET /api/v1/client/commands/?receiverId=<data.clientId>` を呼び出します。どちらの取得APIにも同じBearer認証が必要です。

Receiverへの新しい処理通知と発話状態の同期には、次のイベントを利用できます。

| イベント | 内容 |
| --- | --- |
| `message_queued` | 発話またはチャット入力がキューへ追加された |
| `command_queued` | プレゼンテーション操作などのコマンドがキューへ追加された |
| `stop_requested` | 発話または待機キューの停止が要求された |
| `speech_started` | クライアントが発話状態になった |
| `speech_ended` | クライアントの発話状態が終了した |
| `speech_chunk_started` | 分割された発話チャンクの再生が始まった。Payloadに`speechChunkId`と`text`を含む |
| `speech_chunk_ended` | 発話チャンクの再生が終了した。Payloadに`speechChunkId`を含む |

AITuberKit画面のMessageReceiverは認証付きSSEを購読し、`message_queued`、`command_queued`、`stop_requested` を受信すると対象データを即時取得します。接続中は取りこぼし確認を15秒ごとに行い、切断中だけ1秒間隔のポーリングへフォールバックします。SSEは250ミリ秒から最大5秒の指数バックオフで再接続します。

外部プレゼンテーションのイベントは[外部プレゼンテーションAPI](/guide/other/external-presentation-api#イベントを購読する)を参照してください。

## API Console

「メッセージ送信ページ」は API Console として拡張されています。通常の `/api/v1` API、外部プレゼンテーションAPI、既存の `/api/messages` を画面から実行できます。

## 機能の有効化

外部からのAPI操作を受け付ける機能のON/OFFを切り替えることができます。ONにすると、クライアントIDが自動的に生成されます。<br>
クライアントIDは、任意の値に編集することも可能です。

::: warning
制限モードが有効な環境では、このトグルは無効化され、APIとSSE・ポーリングによる受信処理も停止します。設定画面ではトグルの近くに無効化理由が表示されます。
:::

:::tip ヒント
クライアントIDは、外部からのメッセージ送信時に必要となります。
:::

## メッセージ送信API（POST /api/v1/messages）

メッセージ送信ページでは、用途に応じて複数の `/api/v1` エンドポイントを実行できます。APIを直接呼び出す場合は、`receiverId`（または互換用の `clientId`）と `Authorization: Bearer YOUR_API_KEY` ヘッダーを指定してください。

:::tip ヒント
`YOUR_API_KEY` にはサーバー側の `AITUBERKIT_API_KEY` に設定した値を使用します。ブラウザに公開される環境変数ではなく、サーバー側の値として管理してください。
:::

`/api/v1/messages/` は、発話・AI生成・通常入力を `type` で切り替えて送信できる汎用エンドポイントです。`messages` には複数メッセージ、`text` には単一メッセージを指定できます。

### 1. AIキャラクターにそのまま発言させる（direct_send）

- 入力したメッセージをそのままAIキャラクターに発言させます
- 複数のメッセージを送信した場合は、順番に処理されます
- 音声モデルはAITuberKitの設定で選択したものが使用されます

**APIリクエスト例**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"messages": ["こんにちは、今日もいい天気ですね。", "今日の予定を教えてください。"], "type": "direct_send"}' \
  'http://localhost:3000/api/v1/messages/?receiverId=YOUR_RECEIVER_ID'
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
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"systemPrompt": "You are a helpful assistant.", "useCurrentSystemPrompt": false, "messages": ["今日の予定を教えてください。"], "type": "ai_generate"}' \
  'http://localhost:3000/api/v1/messages/?receiverId=YOUR_RECEIVER_ID'
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
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"messages": ["こんにちは、今日もいい天気ですね。", "今日の予定を教えてください。"], "type": "user_input"}' \
  'http://localhost:3000/api/v1/messages/?receiverId=YOUR_RECEIVER_ID'
```

## 用途別エンドポイント

用途が決まっている場合は、以下のエンドポイントも利用できます。

| エンドポイント | 用途 |
| --- | --- |
| `POST /api/v1/speak/` | テキストをそのまま発話させる |
| `POST /api/v1/chat/` | 通常入力またはAI生成として処理する |
| `POST /api/v1/stop/` | 現在の発話や待機キューを停止する |
| `GET /api/v1/status/` | 接続中クライアントの状態を取得する |
| `GET /api/v1/events/` | APIイベントをSSE購読、または直近イベントを確認する |
| `GET /api/v1/receivers/` | 接続中のReceiverを一覧で取得する |

プレゼンテーションの登録・割当・再生操作については[外部プレゼンテーションAPI](/guide/other/external-presentation-api)を参照してください。

## APIレスポンス

各APIリクエストに対するレスポンスは、リクエストの処理結果を含むJSONオブジェクトとして返されます。レスポンスには、処理されたメッセージや処理状況に関する情報が含まれます。

:::tip ヒント
メッセージ送信ページでは、各送信方法のフォームの下部にレスポンス表示エリアがあり、APIからのレスポンスを確認することができます。
:::

## 注意点

- `receiverId` と `clientId` は配送先を選ぶための識別子であり、認証情報ではありません。APIキーを第三者に漏洩しないよう注意してください。
- 大量のメッセージを短時間に送信すると、処理が遅延する可能性があります。
- 外部からのAPI操作を受け付ける機能は、セキュリティ上のリスクを伴います。信頼できる環境でのみ有効化してください。
