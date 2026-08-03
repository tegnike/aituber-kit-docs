# 外部プレゼンテーションAPI

## 概要

外部システムで作成したプレゼンテーションをAITuberKitへ登録し、指定したクライアントへ割り当てて、再生・一時停止・スライド移動などをAPIから操作できます。プレゼンテーションとクライアントへの割当はサーバー側へ保存されるため、AITuberKitを再起動した場合も復元できます。

既存のローカルスライド機能は引き続き利用できます。外部プレゼンテーションが割り当てられている間は外部側が優先され、解除すると選択中のローカルスライドへ戻ります。

## 事前設定

```bash
# 外部からのAPI操作を有効化
NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED=true

# 操作対象を識別するクライアントID
NEXT_PUBLIC_CLIENT_ID="main-stage"

# /api/v1 のBearer認証に使うサーバー側APIキー
AITUBERKIT_API_KEY="replace-with-a-random-api-key"

# 外部Presentation ManifestとAssignmentの永続保存先
# 未指定時: <project-root>/.aituber-kit/presentations
AITUBERKIT_PRESENTATION_STORAGE_DIR=""
```

すべてのエンドポイントで次の認証ヘッダーを指定します。

```http
Authorization: Bearer YOUR_API_KEY
```

`NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED` が無効な場合、ブラウザ側は外部コマンドを受信しません。制限モードでは外部制御やファイルアクセスが拒否されます。

## 基本フロー

1. Presentation Manifestを登録する
2. 登録したリビジョンをクライアントへ割り当てる
3. 状態APIで読込完了を確認する
4. 制御APIで開始・移動・停止する
5. 必要に応じてSSEイベントを購読する

## エンドポイント

| メソッド | パス | 用途 |
| --- | --- | --- |
| `PUT` | `/api/v1/presentations/{presentationId}` | Manifestを登録・更新する |
| `GET` | `/api/v1/presentations/{presentationId}` | 保存済みManifestを取得する |
| `POST` | `/api/v1/presentations/{presentationId}/activate` | クライアントへ割り当てる |
| `POST` | `/api/v1/presentation/control` | 再生状態や表示を操作する |
| `GET` | `/api/v1/presentation/status` | 割当状態とブラウザの実状態を取得する |
| `GET` | `/api/v1/events` | PresentationイベントをSSEで購読する |

## Manifestを登録する

`presentationId`、Section ID、Slide IDなどのIDは英数字で始め、英数字・ハイフン・アンダースコアを使用してください。URLとManifest内の`presentationId`は一致させます。

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "schemaVersion": 1,
    "presentationId": "product-demo",
    "revision": 1,
    "title": "Product Demo",
    "locale": "ja-JP",
    "createdAt": "2026-08-03T12:00:00.000Z",
    "theme": "default",
    "sections": [
      {
        "id": "introduction",
        "title": "概要",
        "qaBrief": "製品デモの内容に基づいて質問へ回答する。",
        "responsePolicy": "資料にない情報は推測で断定しない。",
        "slides": [
          {
            "id": "intro-1",
            "markdown": "# Product Demo\\n\\n外部APIから登録したスライドです。",
            "narration": "製品デモを開始します。",
            "pauseAfter": true
          }
        ]
      }
    ]
  }' \
  'http://localhost:3000/api/v1/presentations/product-demo'
```

- 新規登録は`201`、更新または同一内容の再送は`200`を返します
- 同じリビジョン・同じ内容の再送は変更を行わない冪等な処理です
- 保存済みより古いリビジョン、または同じリビジョンで内容が異なる更新は`409`になります
- リクエスト本文の上限は5 MBです
- `theme` は`default`と`dark`を利用できます。未対応の値は`default`として表示されます

### 主なManifest項目

| 項目 | 要件 | 説明 |
| --- | --- | --- |
| `schemaVersion` | 必須 | 現在は`1`です |
| `presentationId` | 必須 | URLと一致するPresentation IDです |
| `revision` | 必須 | 1以上の整数です |
| `title` | 必須 | プレゼンテーション名です |
| `createdAt` | 必須 | タイムゾーンを含むISO 8601日時です |
| `thumbnail` | 任意 | プレゼンテーション一覧や非表示時に使う画像Assetです |
| `description` / `locale` | 任意 | 説明文と言語情報です |
| `theme` | 任意 | `default`または`dark`です |
| `sections` | 必須 | 1件以上、最大50件です |
| `sections[].slides` | 必須 | Sectionごとに1件以上必要です。全体で最大200件です |
| `slides[].markdown` | 必須 | 1件あたり最大50,000文字です |
| `slides[].narration` | 任意 | 読み上げ文です。最大10,000文字です |
| `slides[].pauseAfter` | 任意 | `true`の場合、そのスライドの後でSectionを一時停止します |
| `slides[].assets` | 任意 | `http`または`https`の画像を最大20件指定できます |
| `qaBrief` | 任意 | Sectionの質問応答に使う資料情報です |
| `responsePolicy` | 任意 | Sectionの回答方針です |
| `sources` | 任意 | 質問応答で参照する出典情報です。全体で最大500件です |
| `metadata` | 任意 | 文字列・数値・真偽値・`null`を値に持つ追加情報です。最大50項目です |

Markdown内のHTML、イベントハンドラー、`javascript:`・`data:`・`file:`リンクは拒否されます。画像Assetには`alt`が必要です。

## Manifestを取得する

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/presentations/product-demo?revision=1'
```

`revision`は任意です。指定した値が保存済みリビジョンと異なる場合は`409 REVISION_MISMATCH`になります。

## クライアントへ割り当てる

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"clientId":"main-stage","revision":1,"autoStart":false}' \
  'http://localhost:3000/api/v1/presentations/product-demo/activate'
```

`clientId`はクエリ文字列でも指定できます。`autoStart`のデフォルトは`false`で、資料を読み込んでも自動では発話を開始しません。

## プレゼンテーションを操作する

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"clientId":"main-stage","action":"start"}' \
  'http://localhost:3000/api/v1/presentation/control'
```

| `action` | 動作 |
| --- | --- |
| `start` | 先頭または現在位置から発話と自動進行を開始する |
| `pause` | 現在の発話後に自動進行を停止する |
| `resume` | 一時停止位置から再開する |
| `next_slide` / `previous_slide` | 前後のSlideへ移動する |
| `next_section` / `previous_section` | 前後のSectionへ移動する |
| `goto` | `target.sectionId`または`target.slideId`へ移動する |
| `reset` | 発話を停止し、先頭の`ready`状態へ戻す |
| `hide` / `show` | 現在位置を保ったまま資料を非表示・再表示する |
| `unload` | クライアントへの割当を解除する |

`goto`では次のように移動先を指定します。`speak: true`を指定すると、移動後のスライドを読み上げます。

```json
{
  "clientId": "main-stage",
  "action": "goto",
  "target": {
    "sectionId": "introduction",
    "slideId": "intro-1"
  },
  "speak": true
}
```

制御APIはコマンドを受け付けると`202`を返します。実際の反映完了は状態APIまたはSSEイベントで確認してください。

## 状態を確認する

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/presentation/status?clientId=main-stage'
```

レスポンスにはサーバーへ保存された割当`desired`、ブラウザが報告した実状態`actual`、両者が一致しているかを示す`inSync`が含まれます。

`actual.state`は`unassigned`、`loading`、`ready`、`playing`、`paused`、`section_paused`、`completed`、`error`のいずれかです。

## イベントを購読する

既存の`GET /api/v1/events`で、次のPresentationイベントを受信できます。

- `presentation_registered`
- `presentation_assigned`
- `presentation_loaded`
- `presentation_started`
- `slide_changed`
- `section_paused`
- `presentation_paused`
- `presentation_completed`
- `presentation_unloaded`
- `presentation_error`

```bash
curl -N -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events?clientId=main-stage'
```

## 保存先と運用上の注意

デフォルトではManifestと割当を`<project-root>/.aituber-kit/presentations`へ保存します。保存先を変更する場合は`AITUBERKIT_PRESENTATION_STORAGE_DIR`を指定してください。

本機能は、書き込み可能なローカルNode.js環境、デスクトップ版、セルフホスト環境を対象としています。読み取り専用または一時ファイルシステムのみの環境では、登録や割当が`503 PRESENTATION_STORAGE_UNAVAILABLE`になる場合があります。

外部画像の利用許諾はAITuberKitでは判定しません。画像を登録する側で権利と公開範囲を確認してください。
