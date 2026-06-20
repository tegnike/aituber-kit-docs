# 外部連携モード設定

## 概要

外部連携モードは、AITuberKitを外部WebSocketサーバーと接続し、外部アプリケーション側で生成した応答をAITuberKitのキャラクターに発話・表示させるための機能です。

AITuberKit本体は、チャット表示、音声合成、表情・モーション、画像表示を担当します。AI処理、独自ツール実行、配信制御などは外部サーバー側に実装できます。

::: warning ベータ版機能について
**この外部連携モードは現在ベータ版として提供されています。**

- 予告なく仕様が変更される可能性があります
- 動作が不安定な場合があります
- 本番環境での使用は十分にテストを行った上でご利用ください
- バグや問題を発見した場合は、フィードバックをいただけると幸いです
  :::

## 環境変数

```bash
# 外部連携モードの有効化
NEXT_PUBLIC_EXTERNAL_LINKAGE_MODE=true

# 外部連携WebSocket URL
NEXT_PUBLIC_EXTERNAL_LINKAGE_URL="ws://localhost:8000/ws"
```

`NEXT_PUBLIC_EXTERNAL_LINKAGE_URL` を指定しない場合は、`ws://localhost:8000/ws` が使われます。設定画面からも接続URLを変更できます。

## できること

- 外部サーバーからのテキスト・画像入力を受け取る
- AITuberKitから外部サーバーへユーザー入力とカメラ画像を送る
- `v2` protocolでストリーミング応答を扱う
- `ack` によりrequest受理状態を確認する
- `ping` / `pong` によるheartbeatを確認する
- 実行中の応答を `control.cancel` で中断する
- 接続断時に再接続backoffを行う
- 既存のlegacy JSON形式も互換として扱う

## 制限事項

外部連携モードを有効にすると、以下の機能が無効になります。

- 会話継続モード
- リアルタイムAPIモード

また、外部連携モード有効時は以下の点に注意してください。

- AIの処理は外部サーバー側で行う必要があります
- AITuberKitは受信した応答の表示、音声、キャラクター制御を担当します
- 外部サーバーが停止している場合は、接続状態がエラーまたは切断になります

## 設定画面

1. AITuberKitを起動します
2. 設定画面を開きます
3. 「AI設定」から「外部連携モード」をONにします
4. 必要に応じて「外部連携WebSocket URL」を変更します

![外部連携モードの設定画面](/images/external_linkage_v2_a7f4c.webp)

設定画面では、次の状態を確認できます。

| 項目 | 内容 |
| ---- | ---- |
| 接続状態 | `未接続`、`接続中`、`接続済み`、`切断`、`エラー` |
| プロトコル | `legacy (v1互換)` または `v2` |
| 再接続回数 | 自動再接続を試みた回数 |
| ハートビート | `未開始`、`正常`、`応答なし` |
| リクエスト状態 | `待機中`、`送信済み`、`受理済み`、`完了`、`エラー` |
| 最終ACK | serverが最後にrequestを受理した時刻 |
| 最終エラー | WebSocketまたはrequest単位のエラー |

「再接続」ボタンで現在のURLへ再接続できます。「実行中止」ボタンは、`v2` protocolで実行中requestがある場合のみ有効になります。

## 対応サーバー

外部連携用の専用サーバーは `tegnike/aituber-server` です。ローカルで利用する場合は、server側を起動してからAITuberKitの外部連携モードをONにします。

```bash
cd aituber-server
docker-compose up -d --build
```

serverの既定WebSocket endpoint:

```text
ws://127.0.0.1:8000/ws
```

AITuberKit側の既定URLは `ws://localhost:8000/ws` です。通常はそのまま接続できます。

## Protocol

外部連携は、既存互換の `legacy (v1互換)` 形式と、新しい `v2` 形式に対応しています。`v1` という独立した新protocolはなく、従来JSON形式を互換モードとして扱う呼び名が `legacy` です。

接続直後、serverが `session.ready` を送信した場合、AITuberKitは `v2` 対応serverとして認識し、以後の送信を `v2` に切り替えます。`session.ready` が返らないserverに対しては、従来のlegacy形式で送受信します。

### v2 envelope

`v2` では、すべてのmessageを共通envelopeで扱います。wire上の `version` 値は互換性のため文字列の `"2"` ですが、画面やドキュメントでは `v2` と表記します。

```json
{
  "version": "2",
  "id": "msg_client_001",
  "type": "chat.message",
  "sessionId": "session_client_001",
  "timestamp": "2026-06-20T00:00:00.000Z",
  "payload": {
    "text": "こんにちは",
    "image": "data:image/png;base64,..."
  },
  "metadata": {}
}
```

主なeventは次の通りです。

| type | 方向 | 用途 |
| ---- | ---- | ---- |
| `session.ready` | server -> AITuberKit | server準備完了とcapabilities通知 |
| `session.hello` | AITuberKit -> server | client側の機能通知 |
| `chat.message` | AITuberKit -> server | ユーザー入力 |
| `chat.start` | server -> AITuberKit | 応答開始 |
| `chat.delta` | server -> AITuberKit | ストリーミング応答断片 |
| `chat.done` | server -> AITuberKit | 応答終了 |
| `chat.error` | server -> AITuberKit | 応答単位のエラー |
| `ack` | server -> AITuberKit | request受理通知 |
| `ping` / `pong` | 双方向 | heartbeat |
| `control.cancel` | AITuberKit -> server | 実行中処理のキャンセル |
| `file.upload` | AITuberKit -> server | ファイル送信 |
| `character.message.received` | AITuberKit -> server | AITuberKitがserver応答を受信 |
| `character.message.rendered` | AITuberKit -> server | AITuberKitが応答をチャット表示へ反映 |
| `character.speech.start` | AITuberKit -> server | 発話処理開始 |
| `character.speech.done` | AITuberKit -> server | 発話セグメント完了 |
| `character.speech.error` | AITuberKit -> server | 発話処理エラー |
| `character.response.done` | AITuberKit -> server | 応答全体の発話完了 |

### 応答ストリーム

serverは1つの応答を `chat.start`、複数の `chat.delta`、最後の `chat.done` で返します。

```json
{
  "version": "2",
  "type": "chat.delta",
  "requestId": "msg_client_001",
  "payload": {
    "text": "こんにちは。"
  }
}
```

`requestId` は、元の `chat.message.id` と対応させます。AITuberKitはこのIDを使ってrequest状態を更新します。

### AITuberKit側のライフサイクルイベント

`chat.done` は「serverの応答生成が終わった」ことを表します。音声合成やキャラクターの発話再生が終わったことは表しません。

AITuberKitで発話が終わった後にserver側で次の行動を起こしたい場合は、AITuberKitから送られる `character.response.done` を使います。

```json
{
  "version": "2",
  "type": "character.response.done",
  "requestId": "msg_client_001",
  "payload": {
    "requestId": "msg_client_001",
    "speechSegmentCount": 2,
    "completedAt": "2026-06-20T00:00:05.000Z"
  }
}
```

より細かく制御したい場合は、発話文ごとの `character.speech.start` / `character.speech.done` を参照できます。たとえば、字幕表示、外部照明、OBS切替などを発話単位で同期できます。

### キャンセル

実行中の応答を止める場合、AITuberKitは `control.cancel` を送ります。

```json
{
  "version": "2",
  "type": "control.cancel",
  "payload": {
    "requestId": "msg_client_001"
  }
}
```

serverがキャンセルを受け付けた場合は `ack` を返し、最終的に `chat.done` に `cancelled: true` を含めて返します。

```json
{
  "version": "2",
  "type": "chat.done",
  "requestId": "msg_client_001",
  "payload": {
    "requestId": "msg_client_001",
    "cancelled": true
  }
}
```

## Legacy形式

既存serverとの互換のため、従来のJSON形式も引き続き利用できます。

AITuberKitからserverへの送信:

```json
{
  "content": "ユーザーのメッセージ",
  "type": "chat",
  "image": "data:image/png;base64,..."
}
```

serverからAITuberKitへの受信:

```json
{
  "text": "アシスタントの応答",
  "role": "assistant",
  "emotion": "happy",
  "type": "",
  "image": "data:image/png;base64,..."
}
```

パラメータの説明:

- `text`: キャラクターに喋らせるテキスト内容
- `role`: 通常は `assistant`
- `emotion`: 表情。`neutral`、`happy`、`sad`、`angry`、`relaxed`、`surprised`
- `type`: `start` で応答開始、`end` で応答終了、空文字で通常message
- `image`: Base64エンコード画像。ストリーミング時は最初のチャンクにのみ含めることを推奨

## Pythonから送信する例

`v2` serverへ接続してメッセージを送る例です。

```python
import json
import uuid
import websocket
from datetime import datetime, timezone

def now_iso():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

ws = websocket.create_connection("ws://localhost:8000/ws")

# session.ready を受信
print(ws.recv())

message_id = f"msg_{uuid.uuid4().hex}"
ws.send(json.dumps({
    "version": "2",
    "id": message_id,
    "type": "chat.message",
    "sessionId": "session_sample",
    "timestamp": now_iso(),
    "payload": {
        "text": "こんにちは！"
    }
}))

while True:
    event = json.loads(ws.recv())
    print(event)
    if event.get("type") == "chat.done":
        break

ws.close()
```

## トラブルシューティング

### 接続できない

- serverが起動しているか確認します
- 設定画面の「外部連携WebSocket URL」が正しいか確認します
- Dockerでserverを起動している場合、`8000` portが公開されているか確認します
- ファイアウォールやセキュリティソフトがWebSocket通信を止めていないか確認します

### protocolが `legacy (v1互換)` のままになる

serverが `session.ready` を送っていない場合、AITuberKitはlegacy serverとして扱います。`v2` を使う場合は、接続直後にserverから `session.ready` を送ってください。

### requestが完了しない

- serverが `chat.done` を返しているか確認します
- `requestId` が元の `chat.message.id` と一致しているか確認します
- `chat.error` が返っていないか確認します

### heartbeatが応答なしになる

AITuberKitは `v2` 接続中に `ping` を送ります。serverが `pong` を返さない状態が続くと、heartbeatが「応答なし」になります。server側の `ping` / `pong` 実装を確認してください。
