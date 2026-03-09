# AI Settings

## Overview

AITuberKit works with multiple AI services to enable character conversation capabilities. This page explains the basic content of AI settings and the supported AI services.

**Environment Variables**:

```bash
# AI service selection
# openai, anthropic, google, azure, xai, groq, cohere,
# mistralai, perplexity, fireworks, deepseek, openrouter, localLlm, dify
NEXT_PUBLIC_SELECT_AI_SERVICE=openai

# Selected AI model name
NEXT_PUBLIC_SELECT_AI_MODEL=gpt-4.1-mini

# Whether to use custom model
NEXT_PUBLIC_CUSTOM_MODEL="false"

# Number of past messages to retain
NEXT_PUBLIC_MAX_PAST_MESSAGES=10

# Temperature parameter to adjust conversation randomness (0.0-2.0)
NEXT_PUBLIC_TEMPERATURE=0.7

# Maximum number of tokens
NEXT_PUBLIC_MAX_TOKENS=4096
```

## Supported AI Services

AITuberKit supports the following AI services:

- OpenAI GPT
- Anthropic Claude
- Google Gemini
- Azure OpenAI
- xAI
- Groq
- Cohere
- Mistral AI
- Perplexity
- Fireworks
- DeepSeek
- OpenRouter
- LM Studio
- Ollama
- Dify
- Custom API

Using each service requires the corresponding API key.

::: tip
API keys may incur usage fees. Please check the pricing structure of each service before using.
:::

## Conversation Settings

In AITuberKit, the following settings are available for conversations with AI:

- **Number of Past Messages to Retain**: Sets the number of messages to retain as conversation history. More messages provide better context understanding but increase API usage costs.
- **Temperature Setting**: Adjusts the randomness of responses. Higher values result in more diverse responses, while lower values result in more deterministic responses.
- **Maximum Number of Tokens**: Sets the maximum number of tokens for responses. This value varies depending on the AI model being used.

## Reasoning Mode

Some AI models support Reasoning Mode, which enables the AI to generate responses through a deeper thinking process.

```bash
# Enable reasoning mode (true/false)
NEXT_PUBLIC_REASONING_MODE=false

# Reasoning level (low/medium/high)
NEXT_PUBLIC_REASONING_EFFORT=medium

# Reasoning token budget (for Anthropic, Cohere, Google)
NEXT_PUBLIC_REASONING_TOKEN_BUDGET=8192

# Always show thinking process (true/false)
NEXT_PUBLIC_SHOW_THINKING_TEXT=false
```

### Reasoning Level

The available reasoning levels vary depending on the model.

- **low**: Light reasoning (fast)
- **medium**: Standard reasoning
- **high**: Deep reasoning (high accuracy but slower)

### Thinking Text Display

Enabling "Always show thinking text" allows you to display the AI's thinking process in the conversation log.
