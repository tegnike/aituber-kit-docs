# Embed Widget

## Overview

The embed widget displays an AITuberKit conversation screen on an external site as an `iframe`. You can place the character chat experience on blogs, landing pages, member sites, and other web pages.

- `/embed` uses the default embed ID.
- `/embed/{embedId}` uses the configuration for the specified embed ID.
- `embed.js` automatically finds elements with `data-aituber-kit-embed` and creates the `iframe` after the DOM is ready.

## Environment Variables

See [Environment Variables](/en/guide/environment-variables) for the full list.

```bash
# Default embed ID
NEXT_PUBLIC_AITUBERKIT_DEFAULT_EMBED_ID="default"

# Public settings by embed ID (JSON)
# When allowedOrigins is omitted, the embed can be shown on any site.
NEXT_PUBLIC_AITUBERKIT_EMBEDS='{"default":{"characterName":"Nike-chan","modelType":"vrm","selectedVrmPath":"/vrm/nikechan_v2.vrm","showAssistantText":true,"showCharacterName":true}}'
```

`NEXT_PUBLIC_AITUBERKIT_EMBEDS` is a JSON object keyed by embed ID. `default` is used by `/embed` and as the fallback when an ID is not specified.

```json
{
  "default": {
    "characterName": "Nike-chan",
    "modelType": "vrm",
    "selectedVrmPath": "/vrm/nikechan_v2.vrm",
    "showAssistantText": true,
    "showCharacterName": true,
    "allowedOrigins": ["https://example.com"]
  },
  "support": {
    "characterName": "Support AI",
    "systemPrompt": "You are an AI support assistant.",
    "modelType": "pngtuber",
    "selectedPNGTuberPath": "/pngtuber/nike01",
    "showPresetQuestions": true,
    "presetQuestions": ["Tell me the pricing", "How do I use this?"]
  }
}
```

## Basic Embed

Add the following HTML to the external site. Set `data-base-url` to the public URL of your AITuberKit deployment.

```html
<div
  data-aituber-kit-embed
  data-base-url="https://your-aituberkit.example.com"
  data-embed-id="default"
  data-height="640"
></div>
<script src="https://your-aituberkit.example.com/embed.js" defer></script>
```

When `embed.js` and the embed page are served from the same base URL, `data-base-url` can be omitted. The script resolves the `/embed` URL from its own location.

## Mounting from JavaScript

Use `window.AITuberKitEmbed.mount()` when you want to show the widget at a specific timing.

```html
<div id="aituber-widget"></div>
<script src="https://your-aituberkit.example.com/embed.js"></script>
<script>
  window.AITuberKitEmbed.mount('#aituber-widget', {
    baseUrl: 'https://your-aituberkit.example.com',
    embedId: 'support',
    height: 640,
    title: 'AITuberKit conversation',
  })
</script>
```

## Available Options

You can pass these values through `data-*` attributes or `mount()` options. Use kebab case for `data-*` attributes, such as `data-embed-id` and `data-selected-vrm-path`.

| Option | Description |
| --- | --- |
| `baseUrl` | Public URL of the AITuberKit deployment |
| `embedId` | Embed ID to use |
| `width` | `iframe` width. Defaults to `100%` |
| `height` | `iframe` height. Numeric values are treated as `px` |
| `radius` | `iframe` border radius. Defaults to `12px` |
| `loading` | `iframe` `loading` attribute. Defaults to `lazy` |
| `title` | `iframe` title |
| `characterName` | Character name |
| `userDisplayName` | User display name |
| `systemPrompt` | System prompt |
| `modelType` | `vrm`, `live2d`, or `pngtuber` |
| `selectedVrmPath` | VRM model path |
| `selectedLive2DPath` | Live2D model path |
| `selectedPNGTuberPath` | PNGTuber model path |
| `showAssistantText` | Assistant text visibility |
| `showCharacterName` | Character name visibility |
| `showPresetQuestions` | Preset question visibility |
| `presetQuestions` | Comma-separated preset questions |
| `colorTheme` | `default`, `cool`, `mono`, `ocean`, `forest`, or `sunset` |
| `backgroundImageUrl` | Background image URL |

## Restricting Origins

Set `allowedOrigins` to show the embed only when it is referenced from specific origins.

```json
{
  "default": {
    "allowedOrigins": ["https://example.com", "https://www.example.com"]
  }
}
```

When `allowedOrigins` is omitted, any site can show the embed. When `allowedOrigins` is configured, requests without a readable referrer are blocked.

::: warning
`NEXT_PUBLIC_*` settings and URL query parameters are visible from the browser. Do not put API keys or other secrets in them. Use `allowedOrigins` when you need to limit where the widget can be embedded.
:::

## Features Disabled in Embed Mode

The embed screen automatically disables these features for external-site usage:

- Control panel
- Quick menu
- External instruction reception
- Slide mode
