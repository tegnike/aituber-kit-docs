# AI Service Settings

## Overview

In AITuberKit, you can select and use various AI services (OpenAI, Anthropic, Google Gemini, etc.). These settings allow you to select the AI service and model to use, set API keys, and more.

## Supported AI Services

AITuberKit supports the following AI services:

- OpenAI - Provides high-performance models such as GPT-4.1, o3, o4-mini
- Anthropic - Provides Claude Opus 4.1, Claude Sonnet 4, etc.
- Google Gemini - Provides Gemini 2.5 Pro, Gemini 2.5 Flash, etc.
- Azure OpenAI - OpenAI models on the Azure platform
- xAI - Provides Grok models
- Groq - Provides various models specialized for fast inference
- Cohere - Provides Command-R series
- Mistral AI - Provides Mistral Large, Open Mistral, etc.
- Perplexity - Provides Llama 3.1 Sonar series
- Fireworks - Provides optimized implementations of Llama, Mixtral, etc.
- DeepSeek - Provides DeepSeek Chat, DeepSeek Reasoner
- OpenRouter - Provides a wide range of models
- LM Studio - Provides a local LLM execution environment
- Ollama - Provides a local LLM execution environment
- Dify - Custom chatbot building platform
- Custom API - Use your own API

Most AI services allow you to select models from predefined choices, but if you want to use a custom model, please enable "Use Custom Model".

## OpenAI

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-...
```

**Supported Models**:

- gpt-4.1 (default)
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

**Getting an API Key**:
API keys can be obtained from [OpenAI's API keys page](https://platform.openai.com/account/api-keys).

## Anthropic

```bash
# Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-...
```

**Supported Models**:

- claude-opus-4-1-20250805
- claude-opus-4-20250514
- claude-sonnet-4-20250514
- claude-3-7-sonnet-20250219
- claude-3-5-sonnet-20241022 (default)
- claude-3-5-sonnet-20240620
- claude-3-5-haiku-20241022

**Getting an API Key**:
API keys can be obtained from the [Anthropic Console](https://console.anthropic.com).

## Google Gemini

```bash
# Google Gemini API Key
GOOGLE_API_KEY=...
```

**Supported Models**:

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
- gemini-1.5-flash-latest (default)
- gemini-1.5-flash-8b
- gemini-1.5-flash-8b-latest

**Getting an API Key**:
API keys can be obtained from [Google AI Studio](https://aistudio.google.com/app/apikey?hl=en).

#### Google Search Grounding Feature

With Google Gemini, you can use the "Search Grounding" feature, which utilizes real-time web searches when generating AI responses.
Additionally, for some models, you can set a dynamic threshold to determine whether to use the Search Grounding feature. A value of 0 will always execute searches, while a value of 1 will never execute searches.

```bash
# Enable Search Grounding feature
NEXT_PUBLIC_USE_SEARCH_GROUNDING=true
# Dynamic threshold for Search Grounding feature
NEXT_PUBLIC_SEARCH_GROUNDING_THRESHOLD=0.3
```

::: tip
The Search Grounding feature is available with Google Gemini 2.5 series, Gemini 2.0 Flash, and Gemini 1.5 series models.
:::

## Azure OpenAI

```bash
# Azure OpenAI API Key
AZURE_API_KEY=...
# Azure OpenAI Endpoint
AZURE_ENDPOINT="https://RESOURCE_NAME.openai.azure.com/openai/deployments/DEPLOYMENT_NAME/chat/completions?api-version=API_VERSION"
```

**Getting an API Key**:
API keys can be obtained from the [Azure Portal](https://portal.azure.com/#view/Microsoft_Azure_AI/AzureOpenAI/keys).

## xAI

```bash
# xAI API Key
XAI_API_KEY=...
```

**Supported Models**:

- grok-3 (default)
- grok-3-fast
- grok-3-mini
- grok-3-mini-fast
- grok-2-1212
- grok-2-vision-1212

**Getting an API Key**:
API keys can be obtained from the [xAI Dashboard](https://x.ai/api).

## Groq

```bash
# Groq API Key
GROQ_API_KEY=...
```

**Supported Models**:

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

**Getting an API Key**:
API keys can be obtained from the [Groq Dashboard](https://console.groq.com/keys).

## Cohere

```bash
# Cohere API Key
COHERE_API_KEY=...
```

**Supported Models**:

- command-a-03-2025
- command-r-plus
- command-r
- command
- command-light

**Getting an API Key**:
API keys can be obtained from the [Cohere Dashboard](https://dashboard.cohere.com/api-keys).

## Mistral AI

```bash
# Mistral AI API Key
MISTRALAI_API_KEY=...
```

**Supported Models**:

- pixtral-large-latest
- mistral-large-latest
- mistral-small-latest
- ministral-3b-latest
- ministral-8b-latest
- pixtral-12b-2409

**Getting an API Key**:
API keys can be obtained from the [Mistral AI Dashboard](https://console.mistral.ai/api-keys/).

## Perplexity

```bash
# Perplexity API Key
PERPLEXITY_API_KEY=...
```

**Supported Models**:

- sonar-pro
- sonar
- sonar-deep-research

**Getting an API Key**:
API keys can be obtained from the [Perplexity Dashboard](https://www.perplexity.ai/settings/api).

## Fireworks

```bash
# Fireworks API Key
FIREWORKS_API_KEY=...
```

**Supported Models**:

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

**Getting an API Key**:
API keys can be obtained from the [Fireworks Dashboard](https://fireworks.ai/account/api-keys).

## DeepSeek

```bash
# DeepSeek API Key
DEEPSEEK_API_KEY=...
```

**Supported Models**:

- deepseek-chat
- deepseek-reasoner

**Getting an API Key**:
API keys can be obtained from the [DeepSeek Platform](https://platform.deepseek.com/api_keys).

## OpenRouter

```bash
# OpenRouter API Key
OPENROUTER_API_KEY=...
```

**Supported Models**:

See [OpenRouter Models](https://openrouter.ai/models).

**Getting an API Key**:
API keys can be obtained from the [OpenRouter Dashboard](https://openrouter.ai/keys).

## LM Studio, Ollama

```bash
# Local LLM URL
# ex. LM Studio: http://localhost:1234/v1/chat/completions
# ex. Ollama: http://localhost:11434/v1/chat/completions
NEXT_PUBLIC_LOCAL_LLM_URL=""
# Local LLM Model
NEXT_PUBLIC_LOCAL_LLM_MODEL=""
```

To use a local LLM, you need to set up and start a separate server.

**Setup Example**: [How to Set Up Ollama](https://note.com/schroneko/n/n8b1a5bbc740b)

## Dify

Dify is a platform that allows you to easily build custom chatbots.

```bash
# Dify API Key
DIFY_API_KEY=""
# Dify API URL
DIFY_URL=""
```

::: warning Note
Dify only supports "Chatbot" or "Agent" type applications.<br>
Also, when using Dify, the number of past messages to retain and system prompts need to be configured on the Dify side.<br>
If you're not getting satisfactory responses, try deleting the conversation history before asking again.
:::

## Custom API

To use a custom API, set the following environment variables:

```bash
# Custom API URL
NEXT_PUBLIC_CUSTOM_API_URL=""
# Custom API Headers
NEXT_PUBLIC_CUSTOM_API_HEADERS=""
# Custom API Body
NEXT_PUBLIC_CUSTOM_API_BODY=""
# Enable system messages in custom API (true/false)
NEXT_PUBLIC_INCLUDE_SYSTEM_MESSAGES_IN_CUSTOM_API=true
```

::: warning Note
Streaming mode is always enabled for this API. Please pay attention to the response format.<br>
While we have tested with OpenAI-compatible APIs and some other APIs, we cannot guarantee operation with all APIs.
:::
