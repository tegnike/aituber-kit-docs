# AIサービス設定

## 概要

AITuberKitでは、様々なAIサービス（OpenAI、Anthropic、Google Geminiなど）を選択して利用することができます。この設定では、利用するAIサービスとモデルの選択、APIキーの設定などを行います。

## サポートされているAIサービス

![AI設定](/images/ai_settings_m4d8q.webp)

AITuberKitは以下のAIサービスをサポートしています：

- OpenAI - GPT-5.4、GPT-5.3、GPT-5.2、GPT-5.1、GPT-4.1などの高性能モデルを提供
- Anthropic - Claude Opus 4.6、Claude Sonnet 4.6などを提供
- Google Gemini - Gemini 3.1、Gemini 3、Gemini 2.5シリーズなどを提供
- Azure OpenAI - Azureプラットフォーム上のOpenAIモデル
- xAI - Grokモデルを提供
- Groq - 高速推論に特化した様々なモデルを提供
- Cohere - Command-Rシリーズを提供
- Mistral AI - Mistral Large、Open Mistralなどを提供
- Perplexity - Sonarシリーズを提供
- Fireworks - Llama、Mixtralなどの最適化実装を提供
- DeepSeek - DeepSeek Chat、DeepSeek Reasonerを提供
- OpenRouter - 幅広いモデルを提供
- LM Studio - ローカルLLMを提供
- Ollama - ローカルLLMを提供
- Dify - カスタムチャットボット構築プラットフォーム
- カスタムAPI - カスタムAPIを提供

ほとんどのAIサービスでは、あらかじめモデルを選択肢から選べるようになっていますが、任意のモデルを使用したい場合は「カスタムモデルを使用」を有効にしてください。

### モデル選択のアイコン

モデル選択欄では、モデル名の横に対応機能を示す絵文字が表示される場合があります。

| アイコン | 意味 |
| --- | --- |
| 📷 | 画像入力に対応しています |
| 🔍 | 検索対応モデルです。現在は Google Gemini のサーチグラウンディング対応モデルに表示されます |
| 💡 | 推論対応モデルです。推論努力レベルや推論トークン予算の対象になる場合があります |

## OpenAI

```bash
# OpenAI API キー
OPENAI_API_KEY=sk-...
```

**対応モデル**:

- gpt-5.4-pro
- gpt-5.4
- gpt-5.3-chat-latest
- gpt-5.2-pro
- gpt-5.2-chat-latest
- gpt-5.2
- gpt-5.1-codex-mini
- gpt-5.1-codex
- gpt-5.1-chat-latest
- gpt-5.1
- gpt-5-pro
- gpt-5
- gpt-5-mini
- gpt-5-nano
- gpt-5-codex
- gpt-5-chat-latest
- gpt-4.1
- gpt-4.1-mini（デフォルト）
- gpt-4.1-nano
- gpt-4o
- gpt-4o-mini

**APIキーの取得**:
APIキーは[OpenAIのAPI keysページ](https://platform.openai.com/account/api-keys)から取得できます。

## Anthropic

```bash
# Anthropic API キー
ANTHROPIC_API_KEY=sk-ant-...
```

**対応モデル**:

- claude-opus-4-6
- claude-sonnet-4-6（デフォルト）
- claude-opus-4-5
- claude-opus-4-1
- claude-opus-4-0
- claude-sonnet-4-5
- claude-sonnet-4-0
- claude-haiku-4-5

**APIキーの取得**:
APIキーは[Anthropicコンソール](https://console.anthropic.com)から取得できます。

## Google Gemini

```bash
# Google Gemini API キー
GOOGLE_API_KEY=...
```

**対応モデル**:

- gemini-3.1-pro-preview
- gemini-3.1-flash-image-preview
- gemini-3.1-flash-lite-preview
- gemini-3-pro-preview
- gemini-3-pro-image-preview
- gemini-3-flash-preview
- gemini-2.5-pro
- gemini-2.5-flash（デフォルト）
- gemini-2.5-flash-lite
- gemini-2.5-flash-lite-preview-06-17
- gemini-2.0-flash

**APIキーの取得**:
APIキーは[Google AI Studio](https://aistudio.google.com/app/apikey?hl=ja)から取得できます。

#### Googleサーチグラウンディング機能

Google Geminiでは、AIの回答生成時にリアルタイムでウェブ検索を活用する「サーチグラウンディング」機能が利用できます。
また、一部のモデルでは、サーチグラウンディング機能を使用するかどうかを判定する動的しきい値を設定することが可能です。0の場合は常に検索を実行し、1の場合は検索を実行しません。

```bash
# サーチグラウンディング機能の有効化
NEXT_PUBLIC_USE_SEARCH_GROUNDING=true
# サーチグラウンディング機能の動的しきい値
NEXT_PUBLIC_DYNAMIC_RETRIEVAL_THRESHOLD=0.3
```

::: tip
サーチグラウンディング機能は、Google Gemini 3.1/3シリーズ、Gemini 2.5シリーズ、Gemini 2.0 Flashで利用可能です。
:::

## Azure OpenAI

```bash
# Azure OpenAI API キー
AZURE_API_KEY=...
# Azure OpenAI エンドポイント
AZURE_ENDPOINT="https://RESOURCE_NAME.openai.azure.com/openai/deployments/DEPLOYMENT_NAME/chat/completions?api-version=API_VERSION"
```

**APIキーの取得**:
APIキーは[Azureポータル](https://portal.azure.com/#view/Microsoft_Azure_AI/AzureOpenAI/keys)から取得できます。

## xAI

```bash
# xAI API Key
XAI_API_KEY=...
```

**対応モデル**:

- grok-4-1
- grok-4-1-fast-reasoning
- grok-4-1-fast-non-reasoning
- grok-4-fast-non-reasoning
- grok-4-fast-reasoning
- grok-code-fast-1
- grok-4（デフォルト）
- grok-4-0709
- grok-4-latest
- grok-3
- grok-3-latest
- grok-3-mini
- grok-3-mini-latest

**APIキーの取得**:
APIキーは[xAIダッシュボード](https://x.ai/api)から取得できます。

## Groq

```bash
# Groq API キー
GROQ_API_KEY=...
```

**対応モデル**:

- gemma2-9b-it
- llama-3.1-8b-instant
- llama-3.3-70b-versatile（デフォルト）
- meta-llama/llama-guard-4-12b
- deepseek-r1-distill-llama-70b
- meta-llama/llama-4-maverick-17b-128e-instruct
- meta-llama/llama-4-scout-17b-16e-instruct
- meta-llama/llama-prompt-guard-2-22m
- meta-llama/llama-prompt-guard-2-86m
- moonshotai/kimi-k2-instruct-0905
- qwen/qwen3-32b
- llama-guard-3-8b
- llama3-70b-8192
- llama3-8b-8192
- mixtral-8x7b-32768
- qwen-qwq-32b
- qwen-2.5-32b
- deepseek-r1-distill-qwen-32b
- openai/gpt-oss-20b
- openai/gpt-oss-120b

**APIキーの取得**:
APIキーは[Groqダッシュボード](https://console.groq.com/keys)から取得できます。

## Cohere

```bash
# Cohere API キー
COHERE_API_KEY=...
```

**対応モデル**:

- command-a-03-2025（デフォルト）
- command-a-reasoning-08-2025
- command-r7b-12-2024
- command-r-plus-04-2024
- command-r-plus
- command-r-08-2024
- command-r-03-2024
- command-r
- command
- command-nightly
- command-light
- command-light-nightly

**APIキーの取得**:
APIキーは[Cohereダッシュボード](https://dashboard.cohere.com/api-keys)から取得できます。

## Mistral AI

```bash
# Mistral AI API キー
MISTRALAI_API_KEY=...
```

**対応モデル**:

- pixtral-large-latest
- mistral-large-latest（デフォルト）
- mistral-medium-latest
- mistral-medium-2508
- mistral-medium-2505
- mistral-small-latest
- magistral-small-2507
- magistral-medium-2507
- magistral-small-2506
- magistral-medium-2506
- ministral-3b-latest
- ministral-8b-latest
- pixtral-12b-2409
- open-mistral-7b
- open-mixtral-8x7b
- open-mixtral-8x22b

**APIキーの取得**:
APIキーは[Mistral AIダッシュボード](https://console.mistral.ai/api-keys/)から取得できます。

## Perplexity

```bash
# Perplexity API キー
PERPLEXITY_API_KEY=...
```

**対応モデル**:

- sonar-deep-research
- sonar-reasoning-pro
- sonar-reasoning
- sonar-pro（デフォルト）
- sonar

**APIキーの取得**:
APIキーは[Perplexityダッシュボード](https://www.perplexity.ai/settings/api)から取得できます。

## Fireworks

```bash
# Fireworks API キー
FIREWORKS_API_KEY=...
```

**対応モデル**:

- accounts/fireworks/models/firefunction-v1
- accounts/fireworks/models/deepseek-r1
- accounts/fireworks/models/deepseek-v3
- accounts/fireworks/models/llama-v3p1-405b-instruct
- accounts/fireworks/models/llama-v3p1-8b-instruct
- accounts/fireworks/models/llama-v3p2-3b-instruct
- accounts/fireworks/models/llama-v3p3-70b-instruct
- accounts/fireworks/models/mixtral-8x7b-instruct
- accounts/fireworks/models/mixtral-8x7b-instruct-hf
- accounts/fireworks/models/mixtral-8x22b-instruct
- accounts/fireworks/models/qwen2p5-coder-32b-instruct
- accounts/fireworks/models/qwen2p5-72b-instruct
- accounts/fireworks/models/qwen-qwq-32b-preview
- accounts/fireworks/models/qwen2-vl-72b-instruct
- accounts/fireworks/models/llama-v3p2-11b-vision-instruct
- accounts/fireworks/models/qwq-32b
- accounts/fireworks/models/yi-large
- accounts/fireworks/models/kimi-k2-instruct
- accounts/fireworks/models/kimi-k2-thinking
- accounts/fireworks/models/kimi-k2p5
- accounts/fireworks/models/minimax-m2

**APIキーの取得**:
APIキーは[Fireworksダッシュボード](https://fireworks.ai/account/api-keys)から取得できます。

## DeepSeek

```bash
# DeepSeek API キー
DEEPSEEK_API_KEY=...
```

**対応モデル**:

- deepseek-chat
- deepseek-reasoner

**APIキーの取得**:
APIキーは[DeepSeekプラットフォーム](https://platform.deepseek.com/api_keys)から取得できます。

## OpenRouter

```bash
# OpenRouter API Key
OPENROUTER_API_KEY=...
```

**対応モデル**:

[OpenRouter Models](https://openrouter.ai/models)を参照してください。

**APIキーの取得**:
APIキーは[OpenRouterダッシュボード](https://openrouter.ai/keys)から取得できます。

## LM Studio, Ollama

```bash
# ローカルLLM URL
# ex. Ollama: http://localhost:11434/v1/chat/completions
# ex. LM Studio: http://localhost:1234/v1/chat/completions
NEXT_PUBLIC_LOCAL_LLM_URL=""
# ローカルLLMモデル
NEXT_PUBLIC_LOCAL_LLM_MODEL=""
```

ローカルLLMを利用する場合は、別途サーバーの設定と起動が必要です。

Ollamaでは、推論対応モデルまたはカスタムモデルを使用する場合に推論モードを利用できます。推論レベルは `none` / `low` / `medium` / `high` から選択できます。

**設定例**: [Ollamaの設定方法](https://note.com/schroneko/n/n8b1a5bbc740b)

## Dify

Difyはカスタムチャットボットを簡単に構築できるプラットフォームです。

```bash
# Dify API キー
DIFY_API_KEY=""
# Dify API URL
DIFY_URL=""
```

::: warning 注意
Difyでは、「チャットボット」または「エージェント」タイプのアプリケーションのみ対応しています。<br>
また、Dify使用時は過去のメッセージの保持数やシステムプロンプトは、Dify側で設定する必要があります。<br>
上手く回答が得られない場合は、会話履歴を削除してから改めて質問してください。
:::

## カスタムAPI

カスタムAPIを利用する場合は、以下の環境変数を設定してください。

```bash
# カスタムAPI URL
NEXT_PUBLIC_CUSTOM_API_URL=""
# カスタムAPIヘッダー
NEXT_PUBLIC_CUSTOM_API_HEADERS=""
# カスタムAPIボディ
NEXT_PUBLIC_CUSTOM_API_BODY=""
# カスタムAPIでシステムメッセージを含めるかどうか（true/false）
NEXT_PUBLIC_INCLUDE_SYSTEM_MESSAGES_IN_CUSTOM_API=true
# 画像オブジェクトにMIMEタイプを含めるかどうか（true/false）
NEXT_PUBLIC_CUSTOM_API_INCLUDE_MIME_TYPE=true
```

### サーバーサイド秘匿環境変数

APIキーやエンドポイントをブラウザに公開したくない場合は、サーバーサイド専用の環境変数を使用できます。これらの環境変数は`NEXT_PUBLIC_`版より優先されます。

```bash
# カスタムAPI URL（サーバーサイド秘匿用、設定時はNEXT_PUBLIC版より優先）
CUSTOM_API_URL=""
# カスタムAPIヘッダー（サーバーサイド秘匿用、フロントエンド設定に上書きマージ）
CUSTOM_API_HEADERS=""
# カスタムAPIボディ（サーバーサイド秘匿用、フロントエンド設定に上書きマージ）
CUSTOM_API_BODY=""
```

::: tip 優先順位
- **URL**: `CUSTOM_API_URL` が設定されている場合、`NEXT_PUBLIC_CUSTOM_API_URL` より優先されます
- **ヘッダー・ボディ**: フロントエンド設定をベースに、サーバーサイド環境変数の値で上書きマージされます
:::

### セッションID（threadId）の自動送信

カスタムAPI利用時、ブラウザごとに一意のセッションID（UUID v4）が自動生成され、リクエストボディの `threadId` フィールドとして送信されます。

- セッションIDは `localStorage` に保存され、クッキー/サイトデータを削除しない限り永続的に保持されます
- **会話履歴をリセットすると、セッションIDも自動的にリセットされます**（新しいIDが生成されます）
- 外部API側でスレッド管理や会話の継続に利用できます
- 不要な場合は外部API側で無視してください

送信されるボディの例：

```json
{
  "threadId": "550e8400-e29b-41d4-a716-446655440000",
  "messages": [...],
  ...
}
```

### 対応フォーマット

カスタムAPIのSSEストリーミングレスポンスは、以下の形式を自動的にVercel AI SDK形式に正規化します：

- **OpenAI互換形式**: `choices[0].delta.content` を含むレスポンス
- **`payload.text`形式**: 一部のLLM独自形式
- **Vercel AI SDK形式**: そのまま通過

また、OpenAI互換形式の `choices[0].delta.reasoning_content` を思考プロセス（`reasoning`）として変換する機能にも対応しています。設定画面で「思考プロセスを表示」をONにすると、カスタムAPIからの思考プロセスを表示できます。

### 画像のMIMEタイプ送信

マルチモーダルを有効にしている場合、`NEXT_PUBLIC_CUSTOM_API_INCLUDE_MIME_TYPE` で画像オブジェクトに `mimeType` プロパティを含めるかどうかを切り替えられます。外部APIがMIMEタイプ付きの画像入力を要求する場合は有効にしてください。

::: warning 注意
このAPIではストリーミングモードが常に有効になっています。返却形式にご注意ください。<br>
なお、OpenAI互換のAPIや一部のAPIでは動作確認を行っていますが、全てのAPIでの動作を保証するものではありません。
:::
