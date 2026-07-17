# オーディオモード設定

## 概要

AITuberKitでは、OpenAIが提供するAudio API機能を活用して、テキストまたは音声入力に対して自然な音声で応答するオーディオモードを利用できます。このモードは、リアルタイムAPIモードとは異なる機能として提供されています。

**環境変数**:

```bash
# オーディオモードの有効化
NEXT_PUBLIC_AUDIO_MODE=false

# ブラウザ設定の初期値として使う場合
NEXT_PUBLIC_OPENAI_API_KEY=sk-...

# サーバー側で秘匿して使う場合
OPENAI_API_KEY=sk-...

# オーディオモードの入力タイプ（input_text or input_audio）
NEXT_PUBLIC_AUDIO_MODE_INPUT_TYPE=input_text

# オーディオモードの音声（alloy, coral, echo, verse, ballad, ash, shimmer, sage）
NEXT_PUBLIC_AUDIO_MODE_VOICE=alloy
```

OpenAIへのリクエストはAITuberKitの `/api/ai/audio` が中継します。ブラウザ側のAPIキーが空の場合はサーバー側の `OPENAI_KEY` または `OPENAI_API_KEY` を使用します。公開環境でサーバー側キーを利用する場合は、`AITUBERKIT_SERVER_SECRET_ACCESS_MODE` を `protected` または `demo` に設定してください。

## 対応モデル

オーディオモードでは、以下のモデルに対応しています：

- gpt-audio-1.5
- gpt-audio
- gpt-audio-2025-08-28
- gpt-audio-mini（デフォルト）
- gpt-audio-mini-2025-12-15
- gpt-audio-mini-2025-10-06

旧 `gpt-4o-*-audio-preview` 系を保存している場合は、起動時に対応する `gpt-audio` / `gpt-audio-mini` へ自動移行されます。

## 設定方法

オーディオモードを利用するには、以下の手順で設定します：

1. AIサービスとしてOpenAIを選択
2. OpenAI APIキーを設定
3. オーディオモードをONに設定
4. 必要に応じて入力タイプと音声を選択

### 送信タイプ設定

オーディオモードでは、2種類の送信方法から選択できます：

- **テキスト**：マイクで入力された音声をWeb Speech APIで文字起こしした後に送信
- **音声**：マイクからの音声データを直接Realtime APIに送信

### 音声タイプ設定

オーディオモードでは、以下の音声タイプが選択可能です：

- alloy, coral, echo, verse, ballad, ash, shimmer, sage

各音声には異なる特性があり、キャラクターに合わせて最適な声を選択できます。

## 制限事項

- 現在OpenAIのサービスのみ対応
- 外部連携モード、リアルタイムAPIモードとの併用不可
- 他のモードよりもAPI利用料金が高くなる場合あり
