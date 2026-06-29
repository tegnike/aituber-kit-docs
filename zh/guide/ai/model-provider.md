# AI服务设置

## 概述

在AITuberKit中，您可以选择并使用各种AI服务（OpenAI、Anthropic、Google Gemini等）。这些设置允许您选择要使用的AI服务和模型，设置API密钥等。

## 支持的AI服务

AITuberKit支持以下AI服务：

![AI服务设置](/images/ai_settings_m4d8q.webp)

- OpenAI - 提供GPT-5.4、GPT-5.3、GPT-5.2、GPT-5.1、GPT-4.1等高性能模型
- Anthropic - 提供Claude Opus 4.6、Claude Sonnet 4.6等
- Google Gemini - 提供Gemini 3.1、Gemini 3、Gemini 2.5系列等
- Azure OpenAI - Azure平台上的OpenAI模型
- xAI - 提供Grok模型
- Groq - 提供专注于快速推理的各种模型
- Cohere - 提供Command-R系列
- Mistral AI - 提供Mistral Large、Open Mistral等
- Perplexity - 提供Sonar系列
- Fireworks - 提供Llama、Mixtral等的优化实现
- DeepSeek - 提供DeepSeek Chat、DeepSeek Reasoner
- OpenRouter - 提供广泛的模型
- LM Studio - 提供本地LLM执行环境
- Ollama - 提供本地LLM执行环境
- Dify - 自定义聊天机器人构建平台
- 自定义API - 使用自己的API

大多数AI服务都提供预定义的模型选择，但如果您想使用自定义模型，请启用"使用自定义模型"。

### 模型选择图标

在模型选择框中，模型名称旁边可能会显示表示支持功能的表情符号。

| 图标 | 含义 |
| --- | --- |
| 📷 | 支持图像输入 |
| 🔍 | 支持搜索。目前会显示在支持搜索接地的 Google Gemini 模型上 |
| 💡 | 支持推理。可能适用推理努力等级或推理 token 预算 |

## OpenAI

```bash
# OpenAI API密钥
OPENAI_API_KEY=sk-...
```

**支持的模型**:

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
- gpt-4.1-mini（默认）
- gpt-4.1-nano
- gpt-4o
- gpt-4o-mini

**获取API密钥**:
可以从[OpenAI的API keys页面](https://platform.openai.com/account/api-keys)获取API密钥。

## Anthropic

```bash
# Anthropic API密钥
ANTHROPIC_API_KEY=sk-ant-...
```

**支持的模型**:

- claude-opus-4-6
- claude-sonnet-4-6（默认）
- claude-opus-4-5
- claude-opus-4-1
- claude-opus-4-0
- claude-sonnet-4-5
- claude-sonnet-4-0
- claude-haiku-4-5

**获取API密钥**:
可以从[Anthropic控制台](https://console.anthropic.com)获取API密钥。

## Google Gemini

```bash
# Google Gemini API密钥
GOOGLE_API_KEY=...
```

**支持的模型**:

- gemini-3.1-pro-preview
- gemini-3.1-flash-image-preview
- gemini-3.1-flash-lite-preview
- gemini-3-pro-preview
- gemini-3-pro-image-preview
- gemini-3-flash-preview
- gemini-2.5-pro
- gemini-2.5-flash（默认）
- gemini-2.5-flash-lite
- gemini-2.5-flash-lite-preview-06-17
- gemini-2.0-flash

**获取API密钥**:
可以从[Google AI Studio](https://aistudio.google.com/app/apikey?hl=zh)获取API密钥。

#### Google搜索接地功能

使用Google Gemini，您可以使用"搜索接地"功能，该功能在生成AI响应时利用实时网络搜索。
此外，对于某些模型，您可以设置动态阈值来判断是否使用搜索接地功能。值为0时将始终执行搜索，值为1时将不执行搜索。

```bash
# 启用搜索接地功能
NEXT_PUBLIC_USE_SEARCH_GROUNDING=true
# 搜索接地功能的动态阈值
NEXT_PUBLIC_DYNAMIC_RETRIEVAL_THRESHOLD=0.3
```

::: tip
搜索接地功能适用于Google Gemini 3.1/3系列、Gemini 2.5系列和Gemini 2.0 Flash模型。
:::

## Azure OpenAI

```bash
# Azure OpenAI API密钥
AZURE_API_KEY=...
# Azure OpenAI端点
AZURE_ENDPOINT="https://RESOURCE_NAME.openai.azure.com/openai/deployments/DEPLOYMENT_NAME/chat/completions?api-version=API_VERSION"
```

**获取API密钥**:
可以从[Azure门户](https://portal.azure.com/#view/Microsoft_Azure_AI/AzureOpenAI/keys)获取API密钥。

## xAI

```bash
# xAI API Key
XAI_API_KEY=...
```

**支持的模型**:

- grok-4-1
- grok-4-1-fast-reasoning
- grok-4-1-fast-non-reasoning
- grok-4-fast-non-reasoning
- grok-4-fast-reasoning
- grok-code-fast-1
- grok-4（默认）
- grok-4-0709
- grok-4-latest
- grok-3
- grok-3-latest
- grok-3-mini
- grok-3-mini-latest

**获取API密钥**:
可以从[xAI仪表板](https://x.ai/api)获取API密钥。

## Groq

```bash
# Groq API密钥
GROQ_API_KEY=...
```

**支持的模型**:

- gemma2-9b-it
- llama-3.1-8b-instant
- llama-3.3-70b-versatile（默认）
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

**获取API密钥**:
可以从[Groq仪表板](https://console.groq.com/keys)获取API密钥。

## Cohere

```bash
# Cohere API密钥
COHERE_API_KEY=...
```

**支持的模型**:

- command-a-03-2025（默认）
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

**获取API密钥**:
可以从[Cohere仪表板](https://dashboard.cohere.com/api-keys)获取API密钥。

## Mistral AI

```bash
# Mistral AI API密钥
MISTRALAI_API_KEY=...
```

**支持的模型**:

- pixtral-large-latest
- mistral-large-latest（默认）
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

**获取API密钥**:
可以从[Mistral AI仪表板](https://console.mistral.ai/api-keys/)获取API密钥。

## Perplexity

```bash
# Perplexity API密钥
PERPLEXITY_API_KEY=...
```

**支持的模型**:

- sonar-deep-research
- sonar-reasoning-pro
- sonar-reasoning
- sonar-pro（默认）
- sonar

**获取API密钥**:
可以从[Perplexity仪表板](https://www.perplexity.ai/settings/api)获取API密钥。

## Fireworks

```bash
# Fireworks API密钥
FIREWORKS_API_KEY=...
```

**支持的模型**:

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

**获取API密钥**:
可以从[Fireworks仪表板](https://fireworks.ai/account/api-keys)获取API密钥。

## DeepSeek

```bash
# DeepSeek API密钥
DEEPSEEK_API_KEY=...
```

**支持的模型**:

- deepseek-chat
- deepseek-reasoner

**获取API密钥**:
可以从[DeepSeek平台](https://platform.deepseek.com/api_keys)获取API密钥。

## OpenRouter

```bash
# OpenRouter API Key
OPENROUTER_API_KEY=...
```

**支持的模型**:

请参阅[OpenRouter Models](https://openrouter.ai/models)。

**获取API密钥**:
可以从[OpenRouter仪表板](https://openrouter.ai/keys)获取API密钥。

## LM Studio, Ollama

```bash
# 本地LLM URL
# 例如 Ollama: http://localhost:11434/v1/chat/completions
# 例如 LM Studio: http://localhost:1234/v1/chat/completions
NEXT_PUBLIC_LOCAL_LLM_URL=""
# 本地LLM模型
NEXT_PUBLIC_LOCAL_LLM_MODEL=""
```

要使用本地LLM，您需要设置并启动单独的服务器。

使用 Ollama 的推理模型或自定义模型时，可以启用推理模式。可选择的推理级别为 `none` / `low` / `medium` / `high`。

**设置示例**: [如何设置Ollama](https://note.com/schroneko/n/n8b1a5bbc740b)

## Dify

Dify是一个允许您轻松构建自定义聊天机器人的平台。

```bash
# Dify API密钥
DIFY_API_KEY=""
# Dify API URL
DIFY_URL=""
```

::: warning 注意
Dify仅支持"聊天机器人"或"代理"类型的应用程序。<br>
此外，使用Dify时，过去消息的保留数量和系统提示需要在Dify端进行设置。<br>
如果无法获得良好的回答，请删除对话历史记录后再次提问。
:::

## 自定义API

要使用自定义API，请设置以下环境变量：

```bash
# 自定义API URL
NEXT_PUBLIC_CUSTOM_API_URL=""
# 自定义API Headers
NEXT_PUBLIC_CUSTOM_API_HEADERS=""
# 自定义API Body
NEXT_PUBLIC_CUSTOM_API_BODY=""
# 在自定义API中启用系统消息（true/false）
NEXT_PUBLIC_INCLUDE_SYSTEM_MESSAGES_IN_CUSTOM_API=true
# 在图像对象中包含MIME类型（true/false）
NEXT_PUBLIC_CUSTOM_API_INCLUDE_MIME_TYPE=true
```

### 服务器端保密环境变量

如果您不希望将API密钥或端点暴露给浏览器，可以使用服务器端专用环境变量。这些变量优先于 `NEXT_PUBLIC_` 版本。

```bash
# 控制匿名API路由是否可以使用服务器端API密钥、CUSTOM_API_*、写入API或服务器资源
# disabled: 默认值。仅允许请求侧提供的API密钥，拒绝服务器端密钥和受保护的服务器资源
# protected: 需要 Authorization: Bearer AITUBERKIT_SERVER_SECRET_TOKEN
# demo: 仅允许来自 allowed origins / same-origin 的浏览器请求（建议配合速率限制）
# unprotected: 旧版兼容。公开URL不推荐使用
AITUBERKIT_SERVER_SECRET_ACCESS_MODE="disabled"

# protected模式使用的Bearer令牌
AITUBERKIT_SERVER_SECRET_TOKEN=""

# demo模式允许的Origin（逗号分隔）。未指定时仅允许与Host相同的Origin
AITUBERKIT_ALLOWED_ORIGINS=""

# demo模式的简单速率限制（每个IP和功能每分钟次数，生产环境建议配合WAF等）
AITUBERKIT_DEMO_RATE_LIMIT_PER_MINUTE="20"

# 将Custom API的reasoning或provider metadata转发给客户端（通常建议false）
AITUBERKIT_FORWARD_CUSTOM_API_METADATA="false"

# 自定义API URL（服务器端保密用，设置时优先于NEXT_PUBLIC版本）
CUSTOM_API_URL=""
# 自定义API头（服务器端保密用，覆盖合并到前端设置）
CUSTOM_API_HEADERS=""
# 自定义API主体（服务器端保密用，覆盖合并到前端设置）
CUSTOM_API_BODY=""
```

::: tip 优先级
- **URL**：设置 `CUSTOM_API_URL` 后，将优先于 `NEXT_PUBLIC_CUSTOM_API_URL`
- **头/主体**：服务器端环境变量的值将覆盖合并到前端设置
:::

::: warning 公开URL
使用 `CUSTOM_API_*` 或 `OPENAI_API_KEY` 等服务器端密钥的API，默认会通过 `AITUBERKIT_SERVER_SECRET_ACCESS_MODE="disabled"` 被拒绝。公开演示环境请设置 `demo` 和 `AITUBERKIT_ALLOWED_ORIGINS`，外部应用或管理用途请设置 `protected` 和 `AITUBERKIT_SERVER_SECRET_TOKEN`。`unprotected` 仅用于旧版兼容，不推荐在公开URL中使用。
:::

### 会话ID（threadId）自动发送

使用自定义API时，每个浏览器会自动生成一个唯一的会话ID（UUID v4），并作为请求体中的 `threadId` 字段发送。

- 会话ID保存在 `localStorage` 中，在清除Cookie/站点数据之前会持续保留
- **重置对话历史时，会话ID也会自动重置**（生成新的ID）
- 外部API可以使用它进行线程管理或对话连续性控制
- 如果不需要，可以在外部API端忽略

发送的请求体示例：

```json
{
  "threadId": "550e8400-e29b-41d4-a716-446655440000",
  "messages": [...],
  ...
}
```

### 支持的格式

自定义API的SSE流式响应会自动从以下格式标准化为Vercel AI SDK格式：

- **OpenAI兼容格式**：包含 `choices[0].delta.content` 的响应
- **`payload.text`格式**：部分LLM特有格式
- **Vercel AI SDK格式**：直接通过

此外，还支持将OpenAI兼容格式的 `choices[0].delta.reasoning_content` 转换为思考过程数据。在设置中启用"显示思考过程"后，可以显示来自自定义API的思考过程。

### 发送图像MIME类型

启用多模态输入时，`NEXT_PUBLIC_CUSTOM_API_INCLUDE_MIME_TYPE` 会控制图像对象中是否包含 `mimeType` 属性。当外部API要求带MIME类型的图像输入时，请启用此项。

::: warning 注意
此API始终启用流式模式。请注意返回格式。<br>
虽然我们测试了OpenAI兼容的API和一些其他API，但我们不能保证所有API都能正常运行。
:::
