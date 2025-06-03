# Multimodal Settings

## Overview

Multimodal AI models are AI models that can understand and process multiple forms of information (modalities), not just text but also images and audio. In AITuberKit, you can utilize these multimodal features to create a richer interaction experience.

**Environment Variables**:

```bash
# Select an AI service that supports multimodal
# Multimodal supported: openai, anthropic, google, azure
NEXT_PUBLIC_SELECT_AI_SERVICE=openai

# Select a model that supports multimodal
NEXT_PUBLIC_SELECT_AI_MODEL=gpt-4o-2024-11-20
```

## Supported Models

Multimodal-compatible models are marked as follows.

![Multimodal Compatible Models](/images/ai_vay45.png)

## How to Use

To utilize multimodal features, follow these steps:

1. Select a compatible AI service and model in the settings screen
2. Enable webcam or screen sharing (if needed)
3. Send a message

::: warning Note
Multimodal features may incur higher API usage fees compared to text-only conversations.
:::

![Multimodal AI Image](/images/ai_k3nfi.png)

### Explanation of Multimodal-Related Features

#### 1. Multimodal-Related Buttons

These are displayed when a multimodal-compatible model is selected.

- **Screen Share Button**: Allows you to select a screen to share
- **Webcam Button**: Launches the webcam to share
- **Image Upload Button**: Allows you to upload images

#### 2. Shared Screen/Webcam Video

Displays the video from the shared screen or webcam.
This video frame can be moved by dragging.
You can also resize the video display area by clicking and dragging the corners.

When you send a message while this screen is displayed, the message will include the image at the time the message is sent.
However, if there is an image below this video, that image will be sent with priority.

**Video Operation Buttons**:

- **Shared Screen/Camera Switch Button**: Switches between shared screen and webcam video
- **Background Switch Button**: Switches the shared screen or webcam video as background
- **Shutter Button**: Takes a snapshot of the shared screen or webcam video

#### 3. Captured/Uploaded Images

Displays captured images or uploaded images.
When you send a message while an image is displayed here, the message will include this image.

**Image Upload Methods**:

- **Image Upload Button**: Select an image from the file selection dialog
- **Drag and Drop**: You can also upload images by dragging and dropping image files onto the chat screen
- **Capture Feature**: Capture from webcam or shared screen using the shutter button

::: warning Note
To optimize input context length, the API only sends the latest image. Images used in past conversations are not included when sending a new message, so please note.
:::

## Limitations

- Each AI service has limitations on supported input formats and file sizes
- High image resolution may slow down processing or increase costs
- Image recognition accuracy may vary depending on the model
