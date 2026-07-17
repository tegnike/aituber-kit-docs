# Audio Mode Settings

## Overview

In AITuberKit, you can use Audio Mode, which utilizes OpenAI's Audio API feature to respond with natural voice to text or voice input. This mode is provided as a different feature from the Realtime API mode.

**Environment Variables**:

```bash
# Enable Audio Mode
NEXT_PUBLIC_AUDIO_MODE=false

# Use as the initial value for browser settings
NEXT_PUBLIC_OPENAI_API_KEY=sk-...

# Keep the key server-side instead
OPENAI_API_KEY=sk-...

# Audio mode input type (input_text or input_audio)
NEXT_PUBLIC_AUDIO_MODE_INPUT_TYPE=input_text

# Audio mode voice (alloy, coral, echo, verse, ballad, ash, shimmer, sage)
NEXT_PUBLIC_AUDIO_MODE_VOICE=alloy
```

AITuberKit proxies OpenAI requests through `/api/ai/audio`. When the browser-side API key is empty, the route uses the server-side `OPENAI_KEY` or `OPENAI_API_KEY`. To use a server-side key in a public deployment, set `AITUBERKIT_SERVER_SECRET_ACCESS_MODE` to `protected` or `demo`.

## Supported Models

Audio Mode supports the following models:

- gpt-audio-1.5
- gpt-audio
- gpt-audio-2025-08-28
- gpt-audio-mini (default)
- gpt-audio-mini-2025-12-15
- gpt-audio-mini-2025-10-06

If you have a legacy `gpt-4o-*-audio-preview` model saved, it is automatically migrated to the corresponding `gpt-audio` or `gpt-audio-mini` model at startup.

## Setup Method

To use Audio Mode, follow these steps:

1. Select OpenAI as the AI service
2. Set up the OpenAI API key
3. Turn ON the Audio Mode
4. Select the input type and voice as needed

### Transmission Type Settings

In Audio Mode, you can choose from two transmission methods:

- **Text**: Transcribes voice input with Web Speech API before sending
- **Voice**: Sends voice data directly from the microphone to the Realtime API

### Voice Type Settings

In Audio Mode, the following voice types are available:

- alloy, coral, echo, verse, ballad, ash, shimmer, sage

Each voice has different characteristics, allowing you to select the optimal voice for your character.

## Limitations

- Currently only supports OpenAI's service
- Cannot be used with External Linkage mode or Realtime API mode
- May incur higher API usage fees than other modes
