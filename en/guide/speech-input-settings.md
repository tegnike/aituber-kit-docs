# Voice Input Settings

## Overview

Voice input settings let you configure how microphone audio is converted to text and how the start and end of an utterance are detected. You can choose from the following three modes:

1. **Browser standard**: Uses the browser's Web Speech API to transcribe while you speak.
2. **OpenAI transcription after recording**: Sends the audio to the OpenAI transcription API after recording ends.
3. **OpenAI transcription while speaking**: Connects to `gpt-live-transcribe` over WebRTC and displays partial transcription results while you speak.

::: info About OpenAI transcription while speaking
This mode only converts voice input to text. AI response generation and text-to-speech (TTS) continue to use the processes selected in the AI and voice settings. It is separate from Realtime API mode, which uses the OpenAI Realtime API to handle everything from voice input through spoken responses.
:::

**Environment Variables**:

```bash
# Speech recognition mode (browser, whisper, live-transcription)
NEXT_PUBLIC_SPEECH_RECOGNITION_MODE=browser

# Speech recognition timeout (seconds)
NEXT_PUBLIC_INITIAL_SPEECH_TIMEOUT=5.0

# Silence detection timeout (seconds)
NEXT_PUBLIC_NO_SPEECH_TIMEOUT=2.0

# Show silence progress bar (true/false)
NEXT_PUBLIC_SHOW_SILENCE_PROGRESS_BAR=true

# Continuous microphone input mode (true/false)
NEXT_PUBLIC_CONTINUOUS_MIC_LISTENING_MODE=false

# Voice input shortcut (e.g., Alt, Control+Space)
NEXT_PUBLIC_VOICE_INPUT_SHORTCUT=Alt

# OpenAI API key (for OpenAI transcription)
NEXT_PUBLIC_OPENAI_KEY=

# Model used for transcription after recording
NEXT_PUBLIC_WHISPER_TRANSCRIPTION_MODEL=gpt-transcribe
```

## Microphone Input Methods

The following microphone input methods are available:

1. **Using a keyboard shortcut**

   - You can register any key or key combination under "Voice Input Shortcut." The default is Alt on Windows and Linux and Option on Mac.
   - Voice input is accepted while you hold down the registered key.
   - Release the key when you finish speaking to send the request.
   - To prevent accidental activation while typing, unmodified character keys do not respond when an input field is focused.
   - On smartphones and tablets, this method is available only when an external keyboard is connected.

2. **Using the microphone button**
   - Click the microphone button at the bottom of the screen to start voice input.
   - Click the button again when you finish speaking to send the request.
   - Set the silence detection timeout to a value greater than 0 seconds to send automatically after the configured period of silence.

On smartphones and tablets without an external keyboard, use the microphone button.

### Changing the Voice Input Shortcut

![Voice input shortcut](/images/speech_shortcut_p4n8s.webp)

Select the "Voice Input Shortcut" field in the voice input settings, then press the key or key combination you want to assign. You cannot register the same combination as the settings screen show/hide shortcut. Select "Reset to Default" to restore it to Alt on Windows and Linux or Option on Mac.

## Speech Recognition Modes

### Browser Standard

Uses the browser's built-in Web Speech API. Recognition results are displayed while you speak, and no OpenAI API key is required. Accuracy, supported languages, and availability vary by browser and operating system.

### OpenAI Transcription After Recording

Sends the audio data to the OpenAI transcription API after recording ends. An OpenAI API key and model selection are required. Partial results are not displayed while you speak.

### OpenAI Transcription While Speaking

Uses OpenAI's `gpt-live-transcribe`. When you press the microphone button, AITuberKit obtains a short-lived client secret and starts a WebRTC connection. Once connected, transcription results are progressively displayed in the input field while you speak.

Establishing the connection may take some time depending on the network environment. Transcription begins only after the connection is ready, so start speaking after the microphone button becomes active. The model is fixed to `gpt-live-transcribe` and cannot be selected in the settings screen.

::: warning Note
While Realtime API mode or Audio mode is active, the speech recognition mode is fixed to Browser standard.
:::

## Utterance-End Settings

The following settings apply to Browser standard and OpenAI transcription while speaking.

### Speech Recognition Timeout

Sets how long to wait for the first utterance after speech recognition starts. If no utterance is detected within this period, speech recognition stops automatically. Set it to 0 seconds for an unlimited waiting time.

Use the slider to adjust the value from 0 to 60 seconds.

### Silence Detection Timeout

Sets how long to wait after silence is detected before automatically completing speech recognition and sending the request. Set it to 0 seconds to disable automatic completion on silence; press the microphone button again to send the request.

Use the slider to adjust the value from 0 to 10 seconds.

### Show Silence Progress Bar

Controls whether a progress bar is displayed when silence is detected during voice input. When enabled, it shows the remaining time until the silence timeout.

### Continuous Microphone Input

This setting is available only with Browser standard. It automatically restarts microphone input after the AI finishes speaking and sends the request after the configured period of silence.

If the speech recognition timeout is reached without detecting speech, continuous microphone input turns OFF automatically. Set the speech recognition timeout to 0 seconds to keep it waiting indefinitely.

::: warning Note
In Realtime API mode, the speech recognition timeout, silence detection timeout, silence progress bar, and continuous microphone input settings are disabled.
:::

## OpenAI API Settings

An OpenAI API key is required when using either OpenAI transcription after recording or OpenAI transcription while speaking. You can obtain an API key from the OpenAI dashboard.

### Selecting a Model for Transcription After Recording

The model selector is displayed only for OpenAI transcription after recording. The following models are available:

- **gpt-transcribe**: The recommended default model for new transcription configurations
- **whisper-1**: Use when you need word-level timestamps, SRT/VTT subtitles, or audio translation into English
- **gpt-4o-transcribe**: An existing GPT-4o-based transcription model
- **gpt-4o-transcribe-diarize**: Supports speaker identification
- **gpt-4o-mini-transcribe**: An existing GPT-4o mini-based transcription model
- **gpt-4o-mini-transcribe-2025-12-15**: A pinned snapshot of `gpt-4o-mini-transcribe`

Accuracy, speed, features, and pricing vary by model. In most cases, start with `gpt-transcribe` and select another model only when you need a specific feature such as subtitles, timestamps, translation, or speaker identification.

## Notes

- Browser standard speech recognition accuracy and supported languages vary by browser and operating system.
- OpenAI API usage charges apply when using an OpenAI transcription mode.
- OpenAI transcription while speaking requires HTTPS or localhost so the browser can access the microphone.
