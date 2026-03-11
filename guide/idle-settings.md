# アイドルモード設定

## 概要

アイドルモード機能は、ユーザーからの入力がない間もキャラクターが自動的に発話を行う機能です。デジタルサイネージや展示ブースなど、常にキャラクターがアクティブであることが求められるシーンで活用できます。

![アイドルモード設定画面](/images/idle_p3n8f.webp)

## アイドルモード

アイドルモードの有効/無効を切り替えます。

**環境変数**:

```bash
# アイドルモードの有効/無効（true/false）
NEXT_PUBLIC_IDLE_MODE_ENABLED="false"
```

## 発話ソース

アイドルモードでは、以下の3つの発話ソースを利用できます。複数のソースを同時に有効にすることも可能です。

### 1. 定型フレーズ

事前に登録したフレーズを順番またはランダムに再生します。各フレーズには感情（neutral, happy, sad, angry, relaxed, surprised）を設定できます。

#### 再生モード

- **sequential**: 登録順に再生（デフォルト）
- **random**: ランダムに再生

**環境変数**:

```bash
# 再生モード（sequential/random）
NEXT_PUBLIC_IDLE_PLAYBACK_MODE="sequential"
```

### 2. 時間帯別挨拶

時間帯に応じた挨拶フレーズを自動的に選択して発話します。

- **朝**（5:00-11:59）
- **昼**（12:00-16:59）
- **夕方**（17:00-4:59）

**環境変数**:

```bash
# 時間帯別挨拶の有効/無効
NEXT_PUBLIC_IDLE_TIME_PERIOD_ENABLED="false"

# 朝の挨拶フレーズ
NEXT_PUBLIC_IDLE_TIME_PERIOD_MORNING=""

# 昼の挨拶フレーズ
NEXT_PUBLIC_IDLE_TIME_PERIOD_AFTERNOON=""

# 夕方の挨拶フレーズ
NEXT_PUBLIC_IDLE_TIME_PERIOD_EVENING=""
```

### 3. AI自動生成

AIが状況に応じて自動的に発話内容を生成します。プロンプトテンプレートをカスタマイズすることで、生成される発話の方向性を制御できます。

**環境変数**:

```bash
# AI自動生成発話の有効/無効
NEXT_PUBLIC_IDLE_AI_GENERATION_ENABLED="false"

# AI自動生成プロンプトテンプレート
NEXT_PUBLIC_IDLE_AI_PROMPT_TEMPLATE=""
```

## 発話間隔

自動発話の間隔を秒単位で設定します（10〜300秒）。

**環境変数**:

```bash
# 発話間隔（秒）
NEXT_PUBLIC_IDLE_INTERVAL="30"
```

## デフォルト感情

発話時のデフォルトの感情を設定します。

**環境変数**:

```bash
# デフォルト感情
NEXT_PUBLIC_IDLE_DEFAULT_EMOTION="neutral"
```
