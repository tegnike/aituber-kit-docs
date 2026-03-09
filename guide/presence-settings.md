# 人感検知設定

## 概要

人感検知機能は、カメラを使用して人の顔を検出し、来場者の検出・離脱に応じてキャラクターが自動で挨拶や応答を行う機能です。デジタルサイネージやキオスク端末での利用を想定しています。

## 人感検知モード

人感検知機能の有効/無効を切り替えます。

**環境変数**:

```bash
# 人感検知モードの有効/無効（true/false）
NEXT_PUBLIC_PRESENCE_DETECTION_ENABLED="false"
```

::: warning 注意
この機能はカメラへのアクセスが必要です。ブラウザのカメラ権限を許可してください。
:::

## カメラ選択

使用するカメラデバイスを選択できます。複数のカメラが接続されている場合、ドロップダウンから選択できます。

## 挨拶メッセージ

来場者を検出した際に、キャラクターが発話する挨拶メッセージを設定できます。複数のフレーズを登録でき、それぞれに感情（neutral, happy, sad, angry, relaxed, surprised）を設定できます。

**環境変数**:

```bash
# 挨拶メッセージ
NEXT_PUBLIC_PRESENCE_GREETING_MESSAGE="いらっしゃいませ！何かお手伝いできることはありますか？"
```

## 離脱時メッセージ

来場者が離脱した際に発話するメッセージを設定できます。空欄にすると離脱時のメッセージは無効になります。

**環境変数**:

```bash
# 離脱時メッセージ（空欄で無効）
NEXT_PUBLIC_PRESENCE_DEPARTURE_MESSAGE=""
```

## 離脱時に会話履歴をクリア

来場者が離脱した際に会話履歴を自動的にクリアするかどうかを設定できます。

**環境変数**:

```bash
# 離脱時に会話履歴をクリア（true/false）
NEXT_PUBLIC_PRESENCE_CLEAR_CHAT_ON_DEPARTURE="true"
```

## 検出パラメータ

### 離脱判定時間

顔が検出されなくなってから離脱と判定するまでの時間（秒）を設定します。

**環境変数**:

```bash
# 離脱判定時間（秒）
NEXT_PUBLIC_PRESENCE_DEPARTURE_TIMEOUT="3"
```

### クールダウン時間

離脱判定後、再び検出を開始するまでの待機時間（秒）を設定します。

**環境変数**:

```bash
# クールダウン時間（秒）
NEXT_PUBLIC_PRESENCE_COOLDOWN_TIME="5"
```

### 検出感度

顔検出の感度を設定します。以下の3段階から選択できます：

- **low**: 低感度（500ms間隔）
- **medium**: 中感度（300ms間隔）（デフォルト）
- **high**: 高感度（150ms間隔）

**環境変数**:

```bash
# 検出感度（low/medium/high）
NEXT_PUBLIC_PRESENCE_DETECTION_SENSITIVITY="medium"
```

### 検出確定時間

顔が検出されてから来場者と判定するまでの時間（秒）を設定します。誤検出を防ぐために使用します。

**環境変数**:

```bash
# 検出確定時間（秒）
NEXT_PUBLIC_PRESENCE_DETECTION_THRESHOLD="0"
```

## デバッグモード

デバッグモードを有効にすると、カメラ映像と検出状態の詳細情報が画面上に表示されます。

**環境変数**:

```bash
# デバッグモード（true/false）
NEXT_PUBLIC_PRESENCE_DEBUG_MODE="false"
```
