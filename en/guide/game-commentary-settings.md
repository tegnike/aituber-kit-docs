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
- Slide Mode

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

## Priority with Normal Chat

When a user sends a normal chat message during game commentary, normal chat takes priority. If commentary is being generated or spoken, the commentary is interrupted, and the next commentary timer resumes after the chat response finishes.

When used together with YouTube integration, viewer comments and AI responses saved in the chat log are also referenced as context for the next commentary generation. Whether commentary itself is saved to the chat log can be controlled with "Save to Chat Log".

## Capture Interval

Set the screen capture interval in seconds (0-20 seconds). This is the wait time from when the previous commentary generation and speech playback completes until the next capture. Setting it to 0 means the next capture starts immediately after speech playback finishes. Since this uses completion-based setTimeout, captures never overlap with ongoing generation or speech.

**Environment Variables**:

```bash
# Capture interval (seconds)
NEXT_PUBLIC_GAME_COMMENTARY_CAPTURE_INTERVAL="5"
```

## Context Count

Set the number of past commentaries to reference when generating new commentary (0-20). Including past commentaries as context prevents repetitive content and produces more natural commentary. Commentary history is maintained in a ring buffer separate from the chat log.

Setting this to `0` disables history reference and generates each commentary independently (the ring buffer is also skipped).

### Scene Description for Screen State Memory

At each capture, the AI generates a **scene description** (an objective description of the screen state) alongside the spoken commentary. The scene description is not spoken aloud — it is stored silently in the ring buffer. On subsequent captures, past scene descriptions are passed to the AI as context, enabling commentary such as:

- **Comparing screen changes**: "HP is lower than before!"
- **Referencing past events**: "That boss is back again!"
- **Tracking game progression**: Understanding the flow from grassland → cave → boss room

The context count setting also applies to the number of scene descriptions retained. For example, with the default setting of 5, the last 5 pairs of scene descriptions and commentary lines are passed as context in the next AI call.

::: info Impact on API Costs
Scene descriptions are generated within the same API call as the commentary, so no additional API calls are made. Output tokens increase slightly, but the cost impact is minimal. However, increasing the context count will increase input tokens, so balance cost and commentary quality when configuring this setting.
:::

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

## Video Delay

Delays the screen sharing video display by the specified number of seconds (0-10 seconds). This is useful for compensating for the time it takes the AI to generate commentary and aligning the timing of audio and video. Set to `0` to disable.

::: info Delay Scope
Video delay is applied only to the **preview display**. The capture images sent to the AI are always acquired in real time, so commentary generation is never slowed down.
:::

**Environment Variables**:

```bash
# Video delay (seconds, 0=disabled)
NEXT_PUBLIC_GAME_COMMENTARY_VIDEO_DELAY="0"
```

## Background Analysis During Speech

This feature analyzes the screen at a low frequency even while commentary is being spoken, and passes the information to the next commentary generation as supplementary context. When enabled, it allows commentary that keeps up with screen changes even during long speech segments, producing more context-aware commentary.

::: warning API Usage Fees
Background analysis runs as separate API calls from the normal commentary generation, so additional multimodal API usage fees will be incurred. We recommend enabling this only when using a fast and inexpensive image analysis model.
:::

### Background Analysis Prompt

The system prompt used for background image analysis during speech. You can specify the game genre and what elements to focus on here. Including information that identifies the game will also stabilize the analysis results. Leaving the prompt empty will use the default prompt.

### Background Analysis Interval

Set how often background image analysis is executed during speech, in seconds (1-10 seconds). Shorter intervals improve scene tracking but increase API usage fees.

**Environment Variables**:

```bash
# Enable/disable background analysis during speech (true/false)
NEXT_PUBLIC_GAME_COMMENTARY_BACKGROUND_ANALYSIS_ENABLED="false"

# Background analysis prompt template
NEXT_PUBLIC_GAME_COMMENTARY_BACKGROUND_ANALYSIS_PROMPT_TEMPLATE=""

# Background analysis interval (seconds)
NEXT_PUBLIC_GAME_COMMENTARY_BACKGROUND_ANALYSIS_INTERVAL="2"
```
