# Basic Settings

## Overview

This page explains the basic settings of AITuberKit. For configuration using environment variables, please see [Environment Variables](/en/guide/environment-variables).

## Language Settings

**Environment Variables**:

```bash
# Default language setting (specify one of the following values)
# ja: Japanese, en: English, ko: Korean, zh: Traditional Chinese, vi: Vietnamese
# fr: French, es: Spanish, pt: Portuguese, de: German
# ru: Russian, it: Italian, ar: Arabic, hi: Hindi, pl: Polish
NEXT_PUBLIC_SELECT_LANGUAGE=en
```

AITuberKit supports multiple languages, and you can choose from the following:

- Arabic
- English
- French
- German
- Hindi
- Italian
- Japanese
- Korean
- Polish
- Portuguese
- Russian
- Spanish
- Thai
- Traditional Chinese
- Vietnamese

::: warning Note
If you select a language other than Japanese and have a Japanese-only voice service (VOICEVOX, KOEIROMAP, AivisSpeech, Aivis Cloud API) selected, it will automatically switch to Google Text-to-Speech.
:::

## English Word Pronunciation Setting

You can set whether to pronounce English words in Japanese.

:::tip
This setting is only displayed when Japanese is selected.
:::

**Environment Variables**:

```bash
# English word pronunciation setting (true/false)
NEXT_PUBLIC_CHANGE_ENGLISH_TO_JAPANESE=false
```

## Restricted Mode

When restricted mode is enabled, write operations such as file uploads, deletions, and updates are disabled. Use this for deployment to serverless environments like Cloudflare or for use on demo terminals.

**Environment Variables**:

```bash
# Enable/disable restricted mode (true/false)
NEXT_PUBLIC_RESTRICTED_MODE="false"
```

For details on restricted features, see [Restricted Mode](/en/guide/restricted-mode).

## Live2D Features

Toggle the Live2D feature on or off. A license agreement with Live2D Inc. is required to use the Live2D feature. It is disabled by default.

**Environment Variables**:

```bash
# Enable/disable Live2D feature (true/false)
NEXT_PUBLIC_LIVE2D_ENABLED="false"
```

::: warning Note
A license agreement with Live2D Inc. is required to use the Live2D feature. Commercial use without a license agreement is not permitted.
:::

## Background Image Settings

**Environment Variables**:

```bash
# Background image path
NEXT_PUBLIC_BACKGROUND_IMAGE_PATH=/backgrounds/bg-c.png
```

You can customize the background image of the application. Click the "Upload Background Image" button to upload your preferred image.

Once uploaded, the image can be selected from the settings screen at any time.

You can also specify the default background image using an environment variable.

::: tip
You can also select a green screen. When setting via environment variables, specify `green`.
:::

## Show Answer Box

You can set whether to display the AI's response text on the screen when the conversation history is not displayed.

**Environment Variables**:

```bash
# Answer box display setting (true/false)
NEXT_PUBLIC_SHOW_ASSISTANT_TEXT=true
```

![Show Answer Box](/images/basic_3efh5.webp)

## Show Character Name in Answer Box

You can set whether to display the character name in the answer box.

**Environment Variables**:

```bash
# Character name display setting (true/false)
NEXT_PUBLIC_SHOW_CHARACTER_NAME=true
```

## Control Panel Display

You can set whether to display the control panel in the upper right corner of the screen.

:::tip Hint
The settings screen can also be displayed using the shortcut `Cmd + .` on Mac or `Ctrl + .` on Windows.
If you are using a smartphone, you can also display it by long-pressing the top left corner of the screen (about 1 second).
:::

**Environment Variables**:

```bash
# Control panel display setting (true/false)
NEXT_PUBLIC_SHOW_CONTROL_PANEL=true
```

## Color Theme

You can select the color theme for the application. The selected theme will be applied immediately.
