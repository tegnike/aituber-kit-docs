# Multimodal Settings

## Overview

In AITuberKit, you can utilize multimodal features to create a richer interaction experience using not only text but also images.

**Environment Variables**:

```bash
# Enable multimodal functionality for Azure, OpenRouter, local LLM, custom API, and other models with custom model selection
NEXT_PUBLIC_ENABLE_MULTIMODAL="true"

# Image display position setting
# input: input area, side: side panel, icon: icon
NEXT_PUBLIC_IMAGE_DISPLAY_POSITION="input"

# Whether to include MIME type for images
NEXT_PUBLIC_CUSTOM_API_INCLUDE_MIME_TYPE="false"
```

## Supported Models

### Azure OpenAI, OpenRouter, LM Studio, Ollama, Custom API

After setting up multimodal-enabled models available in each AI service, please enable the "Use multimodal" setting.

### Other AI Services

Multimodal-compatible models are marked with a camera icon as follows.

![Multimodal Compatible Models](/images/ai_vay45.webp)

You can also set any model you prefer.<br>
If you want to use multimodal functionality, please enable the "Use multimodal" setting.

Dify does not support multimodal functionality.

::: warning Note
Multimodal features may incur higher API usage fees compared to text-only conversations.
:::

## How to Use

To utilize multimodal features, follow these steps:

1. Select a compatible AI service and model in the settings screen
2. Enable the "Use multimodal" setting
3. Enable webcam or screen sharing (if needed)
4. Send a message

### Use Multimodal Setting

When the "Use multimodal" setting is enabled, multimodal functionality is used whenever a message with an image is sent. When disabled, only text is sent to the AI even if an image is attached.

The previous "AI decides / always use / do not use" selection has been removed. Image sending is now controlled by this single on/off setting.

### MIME Type Setting

Only when using Custom API, you can set whether to include the MIME type of images.<br>
We have confirmed that MIME type inclusion is required when using with Mastra.

## Explanation of Multimodal-Related Features

![Multimodal AI Image](/images/ai_k3nfi.webp)

### 1. Multimodal-Related Buttons

- **Screen Share Button**: Allows you to select a screen to share
- **Webcam Button**: Launches the webcam to share
- **Image Upload Button**: Allows you to upload images (displayed only when using multimodal)

### 2. Shared Screen/Webcam Video

Displays the video from the shared screen or webcam.
This video frame can be moved by dragging.
You can also resize the video display area by clicking and dragging the corners.

When you send a message while this screen is displayed, the message will include a screenshot at the time the message is sent.
However, if an image is already uploaded, that image will be sent with priority.

**Video Operation Buttons**:

- **Shared Screen/Camera Switch Button**: Switches between shared screen and webcam video
- **Background Switch Button**: Switches the shared screen or webcam video as background
- **Shutter Button**: Takes a snapshot of the shared screen or webcam video

### 3. Captured/Uploaded Images

Displays captured images or uploaded images.
When you send a message while an image is displayed here, the message will include this image.

**Image Upload Methods**:

- **Image Upload Button**: Select an image from the file selection dialog
- **Drag and Drop**: You can also upload images by dragging and dropping image files onto the screen
- **Copy & Paste**: You can also paste images from the clipboard into the chat field
- **Capture Feature**: Capture from webcam or shared screen using the shutter button

::: warning Note
To optimize input context length, the API only sends the latest image. Images used in past conversations are not included when sending a new message, so please note.
:::

The placement of uploaded images can be selected from the following options:

- **Input area**: Images are displayed above the chat input field
- **Side panel**: Displayed on the right side of the main screen (as shown in the image above)
- **Icon**: A clip icon is displayed in the chat input field (no photo demo available)

## Limitations

- Each AI service has limitations on supported input formats and file sizes
- High image resolution may slow down processing or increase costs
- Image recognition accuracy may vary depending on the model
