# 嵌入小组件

## 概述

嵌入小组件可以将AITuberKit的对话画面作为 `iframe` 显示在外部网站上。你可以把角色聊天体验放到博客、落地页、会员网站等页面中。

- `/embed` 使用默认的嵌入ID。
- `/embed/{embedId}` 使用指定嵌入ID的设置。
- `embed.js` 会自动查找带有 `data-aituber-kit-embed` 的元素，并在DOM加载后生成 `iframe`。

## 环境变量

完整列表请参阅[环境变量](/zh/guide/environment-variables)。

```bash
# 默认嵌入ID
NEXT_PUBLIC_AITUBERKIT_DEFAULT_EMBED_ID="default"

# 按嵌入ID划分的公开设置（JSON）
# 如果省略 allowedOrigins，则任意网站都可以显示该嵌入。
NEXT_PUBLIC_AITUBERKIT_EMBEDS='{"default":{"characterName":"Nike-chan","modelType":"vrm","selectedVrmPath":"/vrm/nikechan_v2.vrm","showAssistantText":true,"showCharacterName":true}}'
```

`NEXT_PUBLIC_AITUBERKIT_EMBEDS` 是以嵌入ID为键的JSON对象。`default` 会用于 `/embed`，也会作为未指定ID时的回退设置。

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
    "systemPrompt": "你是负责支持的AI助手。",
    "modelType": "pngtuber",
    "selectedPNGTuberPath": "/pngtuber/nike01",
    "showPresetQuestions": true,
    "presetQuestions": ["告诉我价格", "告诉我使用方法"]
  }
}
```

## 基本嵌入

将以下HTML添加到外部网站。`data-base-url` 请设置为AITuberKit部署后的公开URL。

```html
<div
  data-aituber-kit-embed
  data-base-url="https://your-aituberkit.example.com"
  data-embed-id="default"
  data-height="640"
></div>
<script src="https://your-aituberkit.example.com/embed.js" defer></script>
```

如果 `embed.js` 和嵌入页面从同一个基础URL提供，`data-base-url` 可以省略。脚本会根据自身位置自动解析 `/embed` 的URL。

## 通过JavaScript挂载

如果需要在任意时机显示小组件，可以使用 `window.AITuberKitEmbed.mount()`。

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

## 可指定的选项

可以通过 `data-*` 属性或 `mount()` 选项指定。使用 `data-*` 属性时，请使用 kebab case，例如 `data-embed-id` 和 `data-selected-vrm-path`。

| 选项 | 说明 |
| --- | --- |
| `baseUrl` | AITuberKit的公开URL |
| `embedId` | 使用的嵌入ID |
| `width` | `iframe` 宽度。默认值为 `100%` |
| `height` | `iframe` 高度。只有数字时会按 `px` 处理 |
| `radius` | `iframe` 圆角。默认值为 `12px` |
| `loading` | `iframe` 的 `loading` 属性。默认值为 `lazy` |
| `title` | `iframe` 标题 |
| `characterName` | 角色名称 |
| `userDisplayName` | 用户显示名 |
| `systemPrompt` | 系统提示 |
| `modelType` | `vrm`、`live2d` 或 `pngtuber` |
| `selectedVrmPath` | VRM模型路径 |
| `selectedLive2DPath` | Live2D模型路径 |
| `selectedPNGTuberPath` | PNGTuber模型路径 |
| `showAssistantText` | 助手文本显示设置 |
| `showCharacterName` | 角色名称显示设置 |
| `showPresetQuestions` | 预设问题显示设置 |
| `presetQuestions` | 逗号分隔的预设问题 |
| `colorTheme` | `default`、`cool`、`mono`、`ocean`、`forest` 或 `sunset` |
| `backgroundImageUrl` | 背景图片URL |

## 限制公开范围

设置 `allowedOrigins` 后，只有从指定来源引用时才会显示嵌入。

```json
{
  "default": {
    "allowedOrigins": ["https://example.com", "https://www.example.com"]
  }
}
```

如果省略 `allowedOrigins`，任意网站都可以显示该嵌入。如果配置了 `allowedOrigins`，无法读取引用来源的访问会被阻止。

::: warning
`NEXT_PUBLIC_*` 设置和URL查询参数可以从浏览器查看。请不要放入API密钥等秘密信息。需要限制嵌入网站时，请设置 `allowedOrigins`。
:::

## 嵌入模式中禁用的功能

嵌入画面会针对外部网站使用场景自动禁用以下功能：

- 控制面板
- 快捷菜单
- 外部指令接收
- 幻灯片模式
