# 音频模式设置

## 概述

在AITuberKit中，您可以使用音频模式，该模式利用OpenAI提供的Audio API功能，以自然语音对文本或语音输入做出响应。此模式作为与实时API模式不同的功能提供。

**环境变量**:

```bash
# 启用音频模式
NEXT_PUBLIC_AUDIO_MODE=false

# 用作浏览器设置的初始值
NEXT_PUBLIC_OPENAI_API_KEY=sk-...

# 改为在服务器端保管密钥
OPENAI_API_KEY=sk-...

# 音频模式输入类型（input_text或input_audio）
NEXT_PUBLIC_AUDIO_MODE_INPUT_TYPE=input_text

# 音频模式语音（alloy, coral, echo, verse, ballad, ash, shimmer, sage）
NEXT_PUBLIC_AUDIO_MODE_VOICE=alloy
```

AITuberKit 通过 `/api/ai/audio` 中转 OpenAI 请求。当浏览器端 API 密钥为空时，该路由会使用服务器端的 `OPENAI_KEY` 或 `OPENAI_API_KEY`。在公开部署中使用服务器端密钥时，请将 `AITUBERKIT_SERVER_SECRET_ACCESS_MODE` 设置为 `protected` 或 `demo`。

## 支持的模型

音频模式支持以下模型：

- gpt-audio-1.5
- gpt-audio
- gpt-audio-2025-08-28
- gpt-audio-mini（默认）
- gpt-audio-mini-2025-12-15
- gpt-audio-mini-2025-10-06

如果保存的是旧版 `gpt-4o-*-audio-preview` 系列模型，应用会在启动时自动迁移到对应的 `gpt-audio` / `gpt-audio-mini`。

## 设置方法

要使用音频模式，请按照以下步骤操作：

1. 选择OpenAI作为AI服务
2. 设置OpenAI API密钥
3. 打开音频模式
4. 根据需要选择输入类型和语音

### 传输类型设置

在音频模式下，您可以选择两种传输方法：

- **文本**：使用Web Speech API在发送前转录语音输入
- **语音**：直接从麦克风将语音数据发送到实时API

### 语音类型设置

在音频模式下，可以使用以下语音类型：

- alloy, coral, echo, verse, ballad, ash, shimmer, sage

每种语音都有不同的特点，允许您为角色选择最佳语音。

## 限制

- 目前仅支持OpenAI的服务
- 不能与外部连接模式或实时API模式一起使用
- 可能比其他模式产生更高的API使用费用
