# 语音输入设置

## 概述

语音输入设置可用于配置将麦克风语音转换为文本的方式，以及判断发言开始和结束的行为。您可以从以下三种模式中选择。

1. **浏览器标准**：使用浏览器的 Web Speech API，在发言过程中进行转录。
2. **OpenAI 录音后转录**：录音结束后，将音频发送到 OpenAI 转录 API。
3. **OpenAI 发言中转录**：通过 WebRTC 连接到 `gpt-live-transcribe`，并在发言过程中显示部分转录结果。

::: info 关于 OpenAI 发言中转录
此模式仅用于将语音输入转换为文本。AI 回答生成和语音合成（TTS）仍使用 AI 设置和语音设置中选择的现有处理方式。它与通过 OpenAI Realtime API 处理从语音输入到回答语音全过程的“实时 API 模式”是不同的功能。
:::

**环境变量**：

```bash
# 语音识别模式（browser, whisper, live-transcription）
NEXT_PUBLIC_SPEECH_RECOGNITION_MODE=browser

# 语音识别超时（秒）
NEXT_PUBLIC_INITIAL_SPEECH_TIMEOUT=5.0

# 静音检测超时（秒）
NEXT_PUBLIC_NO_SPEECH_TIMEOUT=2.0

# 显示静音进度条（true/false）
NEXT_PUBLIC_SHOW_SILENCE_PROGRESS_BAR=true

# 连续麦克风输入模式（true/false）
NEXT_PUBLIC_CONTINUOUS_MIC_LISTENING_MODE=false

# 语音输入快捷键（例如：Alt、Control+Space）
NEXT_PUBLIC_VOICE_INPUT_SHORTCUT=Alt

# OpenAI API 密钥（用于 OpenAI 转录）
NEXT_PUBLIC_OPENAI_KEY=

# 录音后转录使用的模型
NEXT_PUBLIC_WHISPER_TRANSCRIPTION_MODEL=gpt-transcribe
```

## 麦克风输入方法

麦克风输入有以下方法。

1. **使用键盘快捷键**

   - 可以在“语音输入快捷键”中注册任意按键或组合键。默认值为Windows和Linux上的Alt、Mac上的Option。
   - 按住已注册的按键期间接收语音输入。
   - 说完后松开按键即可发送请求。
   - 为避免在输入文字时误触发，在输入框中不会响应不含修饰键的字符键。
   - 在智能手机和平板电脑上，仅当连接外接键盘时才能使用此功能。

2. **使用麦克风按钮**
   - 点击屏幕底部的麦克风按钮开始语音输入。
   - 说完后再次点击按钮即可发送请求。
   - 将静音检测超时设置为大于 0 秒，即可在达到设定的静音时间后自动发送。

在不使用外接键盘的智能手机和平板电脑上，请使用麦克风按钮。

### 更改语音输入快捷键

![语音输入快捷键](/images/speech_shortcut_p4n8s.webp)

选择语音输入设置中的“语音输入快捷键”输入框，然后按下要分配的按键或组合键。无法注册与显示/隐藏设置界面的快捷键相同的组合键。选择“恢复默认设置”后，Windows和Linux将恢复为Alt，Mac将恢复为Option。

## 语音识别模式

### 浏览器标准

使用浏览器内置的 Web Speech API。识别结果会在发言过程中显示，且不需要 OpenAI API 密钥。识别准确性、支持的语言和可用性因浏览器和操作系统而异。

### OpenAI 录音后转录

录音结束后，将音频数据发送到 OpenAI 转录 API。需要 OpenAI API 密钥并选择模型。发言过程中不会显示中间结果。

### OpenAI 发言中转录

使用 OpenAI 的 `gpt-live-transcribe`。按下麦克风按钮后，应用会获取短期客户端密钥并开始建立 WebRTC 连接；连接完成后，发言过程中的转录结果会依次显示在输入框中。

建立连接所需的等待时间会因网络环境而异。转录会在连接完成后开始，因此请等麦克风按钮显示为已启用状态后再开始说话。模型固定为 `gpt-live-transcribe`，设置页面中不提供模型选择。

::: warning 注意
使用实时 API 模式或音频模式时，语音识别模式会固定为浏览器标准。
:::

## 发言结束设置

以下设置适用于浏览器标准和 OpenAI 发言中转录。

### 语音识别超时

设置语音识别开始后，等待检测到首次发言的时间。如果在此时间内未检测到发言，语音识别将自动停止。设置为 0 秒时，等待时间不受限制。

您可以使用滑块在 0 到 60 秒的范围内调整。

### 静音检测超时

设置语音输入过程中检测到静音后，自动完成语音识别并发送前的等待时间。设置为 0 秒时，不会因静音而自动结束，需要再次按下麦克风按钮进行发送。

您可以使用滑块在 0 到 10 秒的范围内调整。

### 显示静音进度条

设置在语音输入过程中检测到静音时是否显示进度条。启用后，会显示静音超时前的剩余时间。

### 连续麦克风输入

此设置仅适用于浏览器标准。AI 发言结束后会自动重新开始麦克风输入，并在达到设定的静音时间后发送。

如果在未识别到语音的情况下超过语音识别超时，连续麦克风输入会自动关闭。如果希望始终保持等待状态，请将语音识别超时设置为 0 秒。

::: warning 注意
在实时 API 模式下，语音识别超时、静音检测超时、静音进度条显示和连续麦克风输入设置将被禁用。
:::

## OpenAI API 设置

选择 OpenAI 录音后转录或 OpenAI 发言中转录时，需要 OpenAI API 密钥。您可以从 OpenAI 控制面板获取 API 密钥。

### 录音后转录的模型选择

模型选择仅在使用 OpenAI 录音后转录时显示。可以选择以下模型。

- **gpt-transcribe**：推荐用于新转录设置的默认模型
- **whisper-1**：需要单词级时间戳、SRT/VTT 字幕、将语音翻译为英语等功能时使用的模型
- **gpt-4o-transcribe**：基于 GPT-4o 的现有转录模型
- **gpt-4o-transcribe-diarize**：支持说话人识别的模型
- **gpt-4o-mini-transcribe**：基于 GPT-4o mini 的现有转录模型
- **gpt-4o-mini-transcribe-2025-12-15**：`gpt-4o-mini-transcribe` 的固定快照

不同模型的准确性、速度、功能和费用各不相同。通常建议从 `gpt-transcribe` 开始；仅在需要字幕、时间戳、翻译或说话人识别等特定功能时选择其他模型。

## 注意事项

- 浏览器标准语音识别的准确性和支持的语言因浏览器和操作系统而异。
- 使用 OpenAI API 的模式会产生 API 使用费用。
- OpenAI 发言中转录需要能够使用麦克风的 HTTPS 环境或 localhost。
