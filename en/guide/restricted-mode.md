# Restricted Mode

## Overview

Restricted Mode is designed for deployment to serverless environments (such as Cloudflare) and for use on demo terminals. It disables write operations to ensure safe operation in environments where filesystem writes are not available, and substitutes read operations with static manifest data.

**Environment Variables**:

```bash
# Enable/disable restricted mode (true/false)
NEXT_PUBLIC_RESTRICTED_MODE="false"
```

::: tip
When deploying to Cloudflare, this is automatically set to `true` by the build script.
:::

## Available Features

The following features work normally even in restricted mode.

- **AI Chat**: Conversations with all AI providers (OpenAI, Anthropic, Google, etc.)
- **Text-to-Speech (TTS)**: All TTS engines (VOICEVOX, ElevenLabs, Google TTS, etc.)
- **Speech Input (STT)**: Browser speech recognition, Whisper
- **Character Display**: VRM, Live2D, PNGTuber display and animation
- **Character Selection**: VRM/Live2D/PNGTuber model selection from presets
- **Background Selection**: Background image selection from presets
- **Slide Playback**: Browsing and playing preset slides
- **YouTube Integration**: YouTube comment retrieval and streaming
- **Realtime API**: Real-time conversation via OpenAI Realtime API
- **Settings Persistence**: Saving settings to browser local storage
- **Theme Change**: Color theme switching

## Restricted Features

### Basic Settings

| Feature | Restriction |
|---------|-------------|
| Background image upload | Upload button disabled |
| Background image selection | Only preset images selectable (upload not available) |

### Character Settings

| Feature | Restriction |
|---------|-------------|
| VRM file upload | "Open VRM" button disabled |

::: info
VRM, Live2D, and PNGTuber model **selection** is available. You can choose from models registered as presets.
:::

### Voice Settings

| Feature | Restriction |
|---------|-------------|
| VOICEVOX speaker list update | Update button disabled |
| AivisSpeech speaker list update | Update button disabled |

### Slide Settings

| Feature | Restriction |
|---------|-------------|
| Slide conversion (PDF to slides) | Conversion UI hidden |
| Slide editor | Text area, save, and undo buttons disabled |

::: info
Slide **selection, browsing, and playback** are available. You can select from slide folders registered as presets.
:::

### Image Settings

| Feature | Restriction |
|---------|-------------|
| Image upload | Upload button disabled |
| Image deletion | Delete button disabled |

### Memory Settings

| Feature | Restriction |
|---------|-------------|
| Memory data backup file selection | File selection button disabled |
| Memory data restoration | Restore button disabled |

### Other Settings

| Feature | Restriction |
|---------|-------------|
| Accept external instructions (Message Receiver) | Toggle disabled, API and polling also stopped |
| External linkage mode (WebSocket) | Toggle disabled, WebSocket connection also stopped |

### Pose Features

| Feature | Restriction |
|---------|-------------|
| Pose Y-axis rotation adjustment and save | Adjustment panel hidden |

## Technical Details

### Read APIs

In restricted mode, since the filesystem is not accessible, the following APIs return responses from static manifest data (`assetManifest.json`). Because they return valid data, model and slide selection works without issues.

| API | Returned Data |
|-----|---------------|
| `/api/get-vrm-list` | VRM model list |
| `/api/get-background-list` | Background image list |
| `/api/get-live2d-list` | Live2D model list |
| `/api/get-pngtuber-list` | PNGTuber model list |
| `/api/get-pose-list` | Pose list |
| `/api/getSlideFolders` | Slide folder list |
| `/api/getSupplement` | Slide supplementary information |
| `/api/convertMarkdown` | Slide HTML/CSS |
| `/api/get-image-list` | Image list |

### Write APIs

The following APIs return 403 errors in restricted mode. Since the corresponding UI buttons and toggles are also disabled, you will not encounter these errors during normal operation.

| API | Operation |
|-----|-----------|
| `/api/upload-vrm-list` | VRM file upload |
| `/api/upload-background` | Background image upload |
| `/api/upload-image` | Image upload |
| `/api/delete-image` | Image deletion |
| `/api/convertSlide` | PDF to slide conversion |
| `/api/updateSlideData` | Slide data update |
| `/api/update-pose-rotation` | Pose rotation save |
| `/api/update-aivis-speakers` | AivisSpeech speaker update |
| `/api/update-voicevox-speakers` | VOICEVOX speaker update |
| `/api/save-chat-log` | Chat log save |
| `/api/messages` | Message send/receive (Message Receiver) |

### Customizing Preset Data

Preset data available in restricted mode is managed in `src/constants/assetManifest.json`. By editing this file before deployment, you can customize the models and background images available for selection in restricted mode.

```json
{
  "vrm": ["model1.vrm", "model2.vrm"],
  "backgrounds": ["bg-1.png"],
  "live2d": [{ "path": "/live2d/model/model.model3.json", "name": "model", ... }],
  "pngtuber": [{ "path": "/pngtuber/model", "name": "model", ... }],
  "poses": [{ "name": "wave", "path": "/poses/wave.json" }],
  "slides": { "folders": ["demo"], ... }
}
```

::: tip
You also need to place the corresponding asset files under `public/`.
:::
