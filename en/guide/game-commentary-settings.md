# Game Commentary Mode Settings

## Overview

The game commentary mode allows AI characters to provide real-time game commentary. It periodically captures the screen, sends screenshots to a multimodal AI model, and generates spoken commentary with emotions. Combined with YouTube live streaming, it enables interactive game commentary with viewer participation.

::: tip
To use game commentary mode, you need to configure a multimodal AI model (with image recognition capability).
:::

## Game Commentary Mode

Toggle the game commentary mode on or off. When enabled, a game controller button appears on the main page.

::: warning Mutual Exclusion
Game commentary mode is mutually exclusive with the following features. Enabling game commentary mode will automatically disable these features:

- Idle Mode
- Presence Detection
- Realtime API
- Audio Mode
- External Linkage Mode

Note that YouTube mode is NOT mutually exclusive and can be used simultaneously.
:::

**Environment Variables**:

```bash
# Enable/disable game commentary mode (true/false)
NEXT_PUBLIC_GAME_COMMENTARY_ENABLED="false"
```

## Usage

1. Enable game commentary mode in the settings
2. A game controller button appears on the main page
3. Click the button to start commentary (screen capture begins automatically)
4. AI captures the screen → generates commentary → speaks → waits → repeats
5. Click the button again to stop commentary

## Capture Interval

Set the screen capture interval in seconds (10-60 seconds). This is the wait time from when the previous commentary generation and speech playback completes until the next capture. To prevent overlapping, this uses completion-based setTimeout rather than setInterval.

**Environment Variables**:

```bash
# Capture interval (seconds)
NEXT_PUBLIC_GAME_COMMENTARY_CAPTURE_INTERVAL="15"
```

## Context Count

Set the number of past commentaries to reference when generating new commentary (1-20). Including past commentaries as context prevents repetitive content and produces more natural commentary. Commentary history is maintained in a ring buffer separate from the chat log.

**Environment Variables**:

```bash
# Context count
NEXT_PUBLIC_GAME_COMMENTARY_CONTEXT_COUNT="5"
```

## Prompt Template

Customize the prompt template used for generating commentary. Leaving the template empty will use the default prompt.

**Environment Variables**:

```bash
# Commentary prompt template
NEXT_PUBLIC_GAME_COMMENTARY_PROMPT_TEMPLATE=""
```

## Image Quality

Set the JPEG quality for captured images (0.3-1.0). Lower values result in smaller file sizes and reduced API call costs, but lower image quality.

**Environment Variables**:

```bash
# Capture image quality (0.3-1.0)
NEXT_PUBLIC_GAME_COMMENTARY_IMAGE_QUALITY="0.7"
```

## Resize Width

Set the resize width for captured images in pixels. Set to 0 to disable resizing. Reducing image size helps lower API call costs.

**Environment Variables**:

```bash
# Resize width (px, 0=no resize)
NEXT_PUBLIC_GAME_COMMENTARY_RESIZE_WIDTH="1024"
```

## Save to Chat Log

Configure whether to save commentary to the chat log. When enabled, commentaries are saved to the chat log with a `[実況]` prefix. This allows context sharing with other features that reference the chat log, such as YouTube integration and Mastra workflows.

**Environment Variables**:

```bash
# Save to chat log (true/false)
NEXT_PUBLIC_GAME_COMMENTARY_SAVE_TO_CHAT="true"
```
