# AI Service Settings

## Overview

In AITuberKit, you can select and use various AI services (OpenAI, Anthropic, Google Gemini, etc.). These settings allow you to select the AI service and model to use, set API keys, and more.

## Supported AI Services

AITuberKit supports the following AI services:

- OpenAI - Provides high-performance models such as GPT-5.2, GPT-5.1, GPT-4.1
- Anthropic - Provides Claude Opus 4.5, Claude Sonnet 4.5, etc.
- Google Gemini - Provides Gemini 3 Pro, Gemini 2.5 series, etc.
- Azure OpenAI - OpenAI models on the Azure platform
- xAI - Provides Grok models
- Groq - Provides various models specialized for fast inference
- Cohere - Provides Command-R series
- Mistral AI - Provides Mistral Large, Open Mistral, etc.
- Perplexity - Provides Sonar series
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
- gpt-4.1-mini (default)
- gpt-4.1-nano
- gpt-4o
- gpt-4o-mini

**Getting an API Key**:
API keys can be obtained from [OpenAI's API keys page](https://platform.openai.com/account/api-keys).

## Anthropic

```bash
# Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-...
```

**Supported Models**:

- claude-opus-4-5
- claude-opus-4-1
- claude-opus-4-0
- claude-sonnet-4-5 (default)
- claude-sonnet-4-0
- claude-haiku-4-5
- claude-3-7-sonnet-latest
- claude-3-5-haiku-latest

**Getting an API Key**:
API keys can be obtained from the [Anthropic Console](https://console.anthropic.com).

## Google Gemini

```bash
# Google Gemini API Key
GOOGLE_API_KEY=...
```

**Supported Models**:

- gemini-3-pro-preview
- gemini-2.5-pro
- gemini-2.5-flash (default)
- gemini-2.5-flash-lite
- gemini-2.5-flash-lite-preview-06-17
- gemini-2.0-flash
- gemini-1.5-pro
- gemini-1.5-pro-latest
- gemini-1.5-flash
- gemini-1.5-flash-latest
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

- grok-4-fast-non-reasoning
- grok-4-fast-reasoning
- grok-code-fast-1
- grok-4 (default)
- grok-3
- grok-3-latest
- grok-3-fast
- grok-3-fast-latest
- grok-3-mini
- grok-3-mini-latest
- grok-3-mini-fast
- grok-3-mini-fast-latest
- grok-2
- grok-2-latest
- grok-2-1212
- grok-2-vision
- grok-2-vision-latest
- grok-2-vision-1212
- grok-beta
- grok-vision-beta

**Getting an API Key**:
API keys can be obtained from the [xAI Dashboard](https://x.ai/api).

## Groq

```bash
# Groq API Key
GROQ_API_KEY=...
```

**Supported Models**:

- gemma2-9b-it
- llama-3.1-8b-instant
- llama-3.3-70b-versatile (default)
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

**Getting an API Key**:
API keys can be obtained from the [Groq Dashboard](https://console.groq.com/keys).

## Cohere

```bash
# Cohere API Key
COHERE_API_KEY=...
```

**Supported Models**:

- command-a-03-2025 (default)
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

**Getting an API Key**:
API keys can be obtained from the [Cohere Dashboard](https://dashboard.cohere.com/api-keys).

## Mistral AI

```bash
# Mistral AI API Key
MISTRALAI_API_KEY=...
```

**Supported Models**:

- mistral-large-latest (default)
- mistral-medium-latest
- mistral-medium-2505
- mistral-small-latest
- pixtral-large-latest
- pixtral-12b-2409
- magistral-small-2506
- magistral-medium-2506
- ministral-3b-latest
- ministral-8b-latest
- open-mistral-7b
- open-mixtral-8x7b
- open-mixtral-8x22b

**Getting an API Key**:
API keys can be obtained from the [Mistral AI Dashboard](https://console.mistral.ai/api-keys/).

## Perplexity

```bash
# Perplexity API Key
PERPLEXITY_API_KEY=...
```

**Supported Models**:

- sonar-deep-research
- sonar-reasoning-pro
- sonar-reasoning
- sonar-pro (default)
- sonar

**Getting an API Key**:
API keys can be obtained from the [Perplexity Dashboard](https://www.perplexity.ai/settings/api).

## Fireworks

```bash
# Fireworks API Key
FIREWORKS_API_KEY=...
```

**Supported Models**:

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

### Server-Side Secret Environment Variables

If you don't want to expose API keys or endpoints to the browser, you can use server-side only environment variables. These take priority over their `NEXT_PUBLIC_` counterparts.

```bash
# Custom API URL (server-side secret, takes priority over NEXT_PUBLIC version)
CUSTOM_API_URL=""
# Custom API headers (server-side secret, merged over frontend settings)
CUSTOM_API_HEADERS=""
# Custom API body (server-side secret, merged over frontend settings)
CUSTOM_API_BODY=""
```

::: tip Priority
- **URL**: When `CUSTOM_API_URL` is set, it takes priority over `NEXT_PUBLIC_CUSTOM_API_URL`
- **Headers/Body**: Server-side environment variable values are merged over the frontend settings
:::

### Supported Formats

The custom API's SSE streaming responses are automatically normalized to Vercel AI SDK format from the following formats:

- **OpenAI-compatible format**: Responses containing `choices[0].delta.content`
- **`payload.text` format**: Some LLM-specific formats
- **Vercel AI SDK format**: Passed through as-is

Additionally, `choices[0].delta.reasoning_content` in OpenAI-compatible format is converted to reasoning process data. You can display the thinking process from custom APIs by enabling "Show thinking process" in the settings.

::: warning Note
Streaming mode is always enabled for this API. Please pay attention to the response format.<br>
While we have tested with OpenAI-compatible APIs and some other APIs, we cannot guarantee operation with all APIs.
:::
