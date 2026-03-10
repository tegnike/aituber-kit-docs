# YouTube設定

## 概要

YouTubeのライブ配信からコメントを取得し、AIキャラクターが応答する機能を提供します。ユーザーからのコメントを自動で拾い上げ、AIによる返答を生成することができます。

**環境変数**:

```bash
# YouTubeモードを有効にするかどうか（true/false）
NEXT_PUBLIC_YOUTUBE_MODE=false

# YouTubeのAPIキー
NEXT_PUBLIC_YOUTUBE_API_KEY=

# YouTubeのライブ配信ID
NEXT_PUBLIC_YOUTUBE_LIVE_ID=

# コメントソースの選択（youtube-api or onecomme）
NEXT_PUBLIC_YOUTUBE_COMMENT_SOURCE=youtube-api

# YouTubeコメント取得間隔（秒）
NEXT_PUBLIC_YOUTUBE_COMMENT_INTERVAL=10
```

## YouTubeモード

YouTubeモードを有効にすると、YouTubeのライブ配信からコメントを取得して、AIキャラクターが自動的に応答できるようになります。

::: warning 注意
YouTubeモードを有効にすると、いくつかの機能が自動的に無効になります。
:::

### YouTube API設定

YouTubeのAPIを利用するための設定です。

### YouTube APIキー

YouTubeのAPIを使用するためのAPIキーを設定します。YouTubeのコメント取得には、Google Cloud PlatformのAPIキーが必要です。

::: tip APIキーの取得方法

1. [Google Cloud Platform](https://console.cloud.google.com/)にアクセスし、アカウントを作成またはログインします
2. プロジェクトを作成します
3. 「APIとサービス」>「ライブラリ」から「YouTube Data API v3」を有効にします
4. 「認証情報」から「認証情報を作成」>「APIキー」でAPIキーを生成します
5. 生成されたAPIキーをこの設定欄に入力します
   :::

### YouTube Live ID

コメントを取得したいYouTubeライブ配信のIDを入力します。この値はYouTubeライブ配信のURLから取得できます。

例：YouTube URLが `https://www.youtube.com/watch?v=abcdefghijk` の場合、Live IDは `abcdefghijk` です。

::: warning 注意
YouTube Live IDはチャンネルIDではなく、特定のライブ配信のIDです。
:::

### 使い方

YouTubeモードを有効にすると、画面左上にYouTubeモードのボタンが表示されます。

![YouTubeモード](/images/youtube_s045n.png)

このボタンをクリックすることで、コメント取得のオン/オフを切り替えることができます。

::: warning 注意
YouTube Live IDはチャンネルIDではなく、特定のライブ配信のIDです。
:::

### コメント処理の仕組み

AITuber Kitでは以下の流れでYouTubeコメントを処理します：

1. 設定された間隔で YouTube Data API v3 を使ってライブ配信からコメントを取得
2. 取得したコメントを処理キューに追加
3. キュー内のコメントを順次AIに送信し、応答を生成
4. 生成された応答をキャラクターに話させる

### コメントソースの選択

コメントの取得方法を選択できます。

- **YouTube API**: YouTube Data API v3を使用して直接コメントを取得します
- **わんコメ（OneComme）**: [わんコメ](https://onecomme.com/)経由でコメントを取得します。わんコメを使用する場合は、わんコメアプリケーションを起動しておく必要があります

```bash
# わんコメのポート番号
NEXT_PUBLIC_ONECOMME_PORT=11180
```

### コメント取得間隔

コメントの取得間隔を秒単位で設定できます。デフォルトは10秒です。

### エラー対応と注意点

- **コメント取得エラー**: APIキーが無効または制限に達した場合、コメントが取得できない場合があります
- **レート制限**: YouTube Data APIには使用制限があるため、長時間の配信では制限に達する可能性があります
- **コメントフィルタリング**: コメントの最初の文字が「#」の場合、そのコメントは無視されます
- **リソース消費**: 長時間のライブ配信では、メモリ使用量が増加する可能性があります

## 会話継続モード

コメントが無いときにAIが自ら会話を継続するモードです。コメントがない状態が続いても、AIキャラクターが自発的に会話を展開します。

内部的にはMastra Workflowを使用しており、会話の状態を評価して「継続」「新トピック生成」「スリープ」の3つの分岐を自動的に判断します。

![会話継続モードのワークフロー](/images/youtube_workflow_ja.png)

### 機能の詳細

会話継続モードでは、一定時間コメントがない場合にAIが過去の会話文脈を参照し、自然な会話の流れを維持するための新たな話題を提供します。

### カスタマイズ

会話継続モードの動作を環境変数でカスタマイズできます。

```bash
# 新トピック生成までのコメント無し回数（デフォルト: 3）
NEXT_PUBLIC_CONVERSATION_CONTINUITY_NEW_TOPIC_THRESHOLD=3

# スリープまでのコメント無し回数（デフォルト: 6）
NEXT_PUBLIC_CONVERSATION_CONTINUITY_SLEEP_THRESHOLD=6

# 各種プロンプトのカスタマイズ（空欄でデフォルト使用）
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_EVALUATE=""
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_CONTINUATION=""
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_SELECT_COMMENT=""
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_NEW_TOPIC=""
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_SLEEP=""
```

### 注意点

::: warning 利用コストについて
一度の回答で複数回LLMを呼び出すため、API利用料が増加する可能性があります。
:::

### 使用方法

YouTubeモードが有効な状態で「会話継続モード」ボタンをクリックすることで、オン/オフを切り替えることができます。
