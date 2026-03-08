# AIサービス設定

## 概要

AITuberKitでは、様々なAIサービス（OpenAI、Anthropic、Google Geminiなど）を選択して利用することができます。この設定では、利用するAIサービスとモデルの選択、APIキーの設定などを行います。

## サポートされているAIサービス

AITuberKitは以下のAIサービスをサポートしています：

- OpenAI - GPT-4.1、o3、o4-miniなどの高性能モデルを提供
- Anthropic - Claude Opus 4.1、Claude Sonnet 4などを提供
- Google Gemini - Gemini 2.5 Pro、Gemini 2.5 Flashなどを提供
- Azure OpenAI - Azureプラットフォーム上のOpenAIモデル
- xAI - Grokモデルを提供
- Groq - 高速推論に特化した様々なモデルを提供
- Cohere - Command-Rシリーズを提供
- Mistral AI - Mistral Large、Open Mistralなどを提供
- Perplexity - Llama 3.1 Sonarシリーズを提供
- Fireworks - Llama、Mixtralなどの最適化実装を提供
- DeepSeek - DeepSeek Chat、DeepSeek Reasonerを提供
- OpenRouter - 幅広いモデルを提供
- LM Studio - ローカルLLMを提供
- Ollama - ローカルLLMを提供
- Dify - カスタムチャットボット構築プラットフォーム
- カスタムAPI - カスタムAPIを提供

ほとんどのAIサービスでは、あらかじめモデルを選択肢から選べるようになっていますが、任意のモデルを使用したい場合は「カスタムモデルを使用」を有効にしてください。

## OpenAI

```bash
# OpenAI API キー
OPENAI_API_KEY=sk-...
```

**対応モデル**:

- gpt-4.1（デフォルト）
- gpt-4.1-mini
- gpt-4.1-nano
- gpt-4o
- gpt-4o-mini
- o1
- o1-mini
- o1-preview
- o3-mini
- o3
- o4-mini
- chatgpt-4o-latest

**APIキーの取得**:
APIキーは[OpenAIのAPI keysページ](https://platform.openai.com/account/api-keys)から取得できます。

## Anthropic

```bash
# Anthropic API キー
ANTHROPIC_API_KEY=sk-ant-...
```

**対応モデル**:

- claude-opus-4-1-20250805
- claude-opus-4-20250514
- claude-sonnet-4-20250514
- claude-3-7-sonnet-20250219
- claude-3-5-sonnet-20241022（デフォルト）
- claude-3-5-sonnet-20240620
- claude-3-5-haiku-20241022

**APIキーの取得**:
APIキーは[Anthropicコンソール](https://console.anthropic.com)から取得できます。

## Google Gemini

```bash
# Google Gemini API キー
GOOGLE_API_KEY=...
```

**対応モデル**:

- gemini-2.5-pro
- gemini-2.5-flash
- gemini-2.5-flash-lite
- gemini-2.5-pro-preview-05-06
- gemini-2.5-flash-preview-04-17
- gemini-2.5-pro-exp-03-25
- gemini-2.0-flash
- gemini-1.5-pro
- gemini-1.5-pro-latest
- gemini-1.5-flash
- gemini-1.5-flash-latest（デフォルト）
- gemini-1.5-flash-8b
- gemini-1.5-flash-8b-latest

**APIキーの取得**:
APIキーは[Google AI Studio](https://aistudio.google.com/app/apikey?hl=ja)から取得できます。

#### Googleサーチグラウンディング機能

Google Geminiでは、AIの回答生成時にリアルタイムでウェブ検索を活用する「サーチグラウンディング」機能が利用できます。
また、一部のモデルでは、サーチグラウンディング機能を使用するかどうかを判定する動的しきい値を設定することが可能です。0の場合は常に検索を実行し、1の場合は検索を実行しません。

```bash
# サーチグラウンディング機能の有効化
NEXT_PUBLIC_USE_SEARCH_GROUNDING=true
# サーチグラウンディング機能の動的しきい値
NEXT_PUBLIC_SEARCH_GROUNDING_THRESHOLD=0.3
```

::: tip
サーチグラウンディング機能は、Google Gemini 2.5シリーズ、Gemini 2.0 Flash、Gemini 1.5シリーズで利用可能です。
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

- grok-3（デフォルト）
- grok-3-fast
- grok-3-mini
- grok-3-mini-fast
- grok-2-1212
- grok-2-vision-1212

**APIキーの取得**:
APIキーは[xAIダッシュボード](https://x.ai/api)から取得できます。

## Groq

```bash
# Groq API キー
GROQ_API_KEY=...
```

**対応モデル**:

- meta-llama/llama-4-scout-17b-16e-instruct
- gemma2-9b-it
- llama-3.3-70b-versatile
- llama-3.1-8b-instant
- llama-guard-3-8b
- llama3-70b-8192
- llama3-8b-8192
- mixtral-8x7b-32768
- qwen-qwq-32b
- mistral-saba-24b
- qwen-2.5-32b
- deepseek-r1-distill-qwen-32b
- deepseek-r1-distill-llama-70b

**APIキーの取得**:
APIキーは[Groqダッシュボード](https://console.groq.com/keys)から取得できます。

## Cohere

```bash
# Cohere API キー
COHERE_API_KEY=...
```

**対応モデル**:

- command-a-03-2025
- command-r-plus
- command-r
- command
- command-light

**APIキーの取得**:
APIキーは[Cohereダッシュボード](https://dashboard.cohere.com/api-keys)から取得できます。

## Mistral AI

```bash
# Mistral AI API キー
MISTRALAI_API_KEY=...
```

**対応モデル**:

- pixtral-large-latest
- mistral-large-latest
- mistral-small-latest
- ministral-3b-latest
- ministral-8b-latest
- pixtral-12b-2409

**APIキーの取得**:
APIキーは[Mistral AIダッシュボード](https://console.mistral.ai/api-keys/)から取得できます。

## Perplexity

```bash
# Perplexity API キー
PERPLEXITY_API_KEY=...
```

**対応モデル**:

- sonar-pro
- sonar
- sonar-deep-research

**APIキーの取得**:
APIキーは[Perplexityダッシュボード](https://www.perplexity.ai/settings/api)から取得できます。

## Fireworks

```bash
# Fireworks API キー
FIREWORKS_API_KEY=...
```

**対応モデル**:

- accounts/fireworks/models/deepseek-r1
- accounts/fireworks/models/deepseek-v3
- accounts/fireworks/models/llama-v3p1-405b-instruct
- accounts/fireworks/models/llama-v3p1-8b-instruct
- accounts/fireworks/models/llama-v3p2-3b-instruct
- accounts/fireworks/models/llama-v3p3-70b-instruct
- accounts/fireworks/models/mixtral-8x7b-instruct-hf
- accounts/fireworks/models/mixtral-8x22b-instruct
- accounts/fireworks/models/qwen2p5-coder-32b-instruct
- accounts/fireworks/models/llama-v3p2-11b-vision-instruct
- accounts/fireworks/models/yi-large

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
```

::: warning 注意
このAPIではストリーミングモードが常に有効になっています。返却形式にご注意ください。<br>
なお、OpenAI互換のAPIや一部のAPIでは動作確認を行っていますが、全てのAPIでの動作を保証するものではありません。
:::
