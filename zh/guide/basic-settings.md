# 基本设置

## 概述

本页介绍AITuberKit的基本设置。关于使用环境变量进行配置的方法，请参阅[环境变量列表](/zh/guide/environment-variables)。

## 语言设置

**环境变量**:

```bash
# 默认语言设置（指定以下值之一）
# ja: 日语, en: 英语, ko: 韩语, zh-CN: 中文(简体), zh-TW: 中文(繁体), vi: 越南语
# fr: 法语, es: 西班牙语, pt: 葡萄牙语, de: 德语
# ru: 俄语, it: 意大利语, ar: 阿拉伯语, hi: 印地语, pl: 波兰语, th: 泰语
NEXT_PUBLIC_SELECT_LANGUAGE=en
```

AITuberKit支持多种语言，您可以从以下语言中选择：

- 阿拉伯语 (Arabic)
- 英语 (English)
- 法语 (French)
- 德语 (German)
- 印地语 (Hindi)
- 意大利语 (Italian)
- 日语 (Japanese)
- 韩语 (Korean)
- 波兰语 (Polish)
- 葡萄牙语 (Portuguese)
- 俄语 (Russian)
- 西班牙语 (Spanish)
- 泰语 (Thai)
- 中文（简体）(Simplified Chinese)
- 中文（繁体）(Traditional Chinese)
- 越南语 (Vietnamese)

::: warning 注意
如果选择日语以外的语言，且已选择日语专用的语音服务（VOICEVOX、KOEIROMAP、AivisSpeech、Aivis Cloud API），系统将自动切换到Google语音合成。
:::

## 站点URL

设置用于OGP（Open Graph Protocol）和Twitter卡片图片URL的基础URL。这样可以确保在社交媒体上分享网站时预览图片能够正确显示。

**环境变量**:

```bash
# 站点URL（用于OGP和Twitter卡片图片URL）
NEXT_PUBLIC_SITE_URL="https://aituberkit.com"
```

## 英语单词读取设置

您可以设置是否在日语中读取英语单词。

:::tip
此设置仅在选择日语时显示。
:::

**环境变量**:

```bash
# 英语单词读取设置（true/false）
NEXT_PUBLIC_CHANGE_ENGLISH_TO_JAPANESE=false
```

## 限制模式

启用限制模式后，文件上传、删除、更新等写入操作将被禁用。适用于部署到Cloudflare等无服务器环境或在演示终端上使用的场景。

**环境变量**:

```bash
# 限制模式的启用/禁用（true/false）
NEXT_PUBLIC_RESTRICTED_MODE="false"
```

有关受限功能的详细信息，请参阅[限制模式](/zh/guide/restricted-mode)。

## 演示提示与子路径部署

启用 `NEXT_PUBLIC_DEMO_MODE` 后，介绍页面和设置页面会显示演示使用注意事项。此项是独立于API访问控制 `AITUBERKIT_SERVER_SECRET_ACCESS_MODE="demo"` 的显示设置。

部署到GitHub Pages等子路径时，请在 `NEXT_PUBLIC_BASE_PATH` 中设置包含开头 `/` 的基础路径。

**环境变量**:

```bash
# 演示模式注意事项显示（true/false）
NEXT_PUBLIC_DEMO_MODE="false"

# 子路径部署的基础路径（例如: /aituber-kit）
NEXT_PUBLIC_BASE_PATH=""
```

## Live2D功能

切换Live2D功能的启用/禁用。使用Live2D功能需要与Live2D Inc.签订许可协议。默认为禁用状态。

**环境变量**:

```bash
# Live2D功能的启用/禁用（true/false）
NEXT_PUBLIC_LIVE2D_ENABLED="false"
```

::: warning 注意
使用Live2D功能需要与Live2D Inc.签订许可协议。未签订许可协议不得用于商业用途。
:::

## 背景图像设置

**环境变量**:

```bash
# 背景图像路径
NEXT_PUBLIC_BACKGROUND_IMAGE_PATH=/backgrounds/bg-c.png
```

您可以自定义应用程序的背景图像。点击“上传背景图像”按钮，上传您喜欢的图像。

一旦上传，图像可以从设置屏幕随时选择。

在设置界面中选择的背景（包括绿幕）会保存在浏览器中，即使重新加载页面也会保留。背景的选择值也包含在[设置备份与恢复](/zh/guide/other/advanced-settings#备份与恢复设置)中，但上传的图像文件本身不包含在内。如果迁移到其他环境，请另行迁移图像文件。

您还可以使用环境变量指定默认的背景图像。

::: tip
您也可以选择绿幕。通过环境变量设置时，请指定 `green`。
:::

## 显示回答框

您可以设置在不显示对话历史时是否在屏幕上显示AI的回答文本。

**环境变量**:

```bash
# 回答框显示设置（true/false）
NEXT_PUBLIC_SHOW_ASSISTANT_TEXT=true

# 回答框样式（bubble: 玻璃气泡, borderless: 无边框字幕风格）
NEXT_PUBLIC_ASSISTANT_TEXT_STYLE="borderless"
```

![显示回答框](/images/basic_3efh5.webp)

显示回答框时，可以选择玻璃气泡或无边框字幕风格。

## 对话日志显示状态

您可以从以下3种状态中选择屏幕上的对话显示方式。通过操作面板的对话日志按钮切换后的状态也会被保存。

- **回答框**：在屏幕上显示最新的AI回答
- **对话日志**：显示用户与AI的对话历史
- **隐藏**：回答框和对话日志均不显示

即使选择了**回答框**，如果上方的**显示回答框**已关闭，也不会显示回答文本。

```bash
# 对话日志显示状态（assistant: 回答框, chat-log: 对话日志, hidden: 隐藏）
NEXT_PUBLIC_CHAT_LOG_MODE="assistant"
```

## 对话日志设计

您可以设置对话日志的设计和左右显示位置。可以拖动外边缘调整与屏幕边缘的距离，也可以通过环境变量指定初始值。

```bash
# 聊天日志显示位置（left/right）
NEXT_PUBLIC_CHAT_LOG_POSITION="right"

# 聊天日志样式（glass/classic）
NEXT_PUBLIC_CHAT_LOG_STYLE="classic"

# 与屏幕边缘的距离（px，留空则使用样式默认值）
NEXT_PUBLIC_CHAT_LOG_EDGE_OFFSET=
```

## 在回答框中显示角色名称

您可以设置是否在回答框中显示角色名称。

**环境变量**:

```bash
# 角色名称显示设置（true/false）
NEXT_PUBLIC_SHOW_CHARACTER_NAME=true
```

## 输入表单显示

您可以设置是否显示屏幕底部的消息输入表单。在仅通过外部API或语音输入进行操作的配置中，可以隐藏输入表单，使画面更加简洁。

**环境变量**:

```bash
# 输入表单显示设置（true/false）
NEXT_PUBLIC_SHOW_INPUT_FORM=true
```

## 控制面板显示

您可以设置是否在屏幕右上角显示控制面板。

:::tip 提示
设置界面也可以通过Mac上的`Cmd + .`或Windows上的`Ctrl + .`快捷键显示。
如果您使用智能手机，也可以通过长按屏幕左上角（约1秒）来显示。
:::

**环境变量**:

```bash
# 控制面板显示设置（true/false）
NEXT_PUBLIC_SHOW_CONTROL_PANEL=true
```

## 颜色主题

您可以选择应用程序的颜色主题。选择的主题将立即应用。

## 面向搜索引擎的官方网站页面

从v2.71.0起，官方演示网站提供面向搜索引擎的介绍页面、网站地图、robots.txt和llms.txt。这些页面与常规角色对话界面分开。

### 官方网站专用页面（v2.72.0及以后）

```bash
# 启用官方网站专用的SEO页面（非官方部署请保持false）
NEXT_PUBLIC_OFFICIAL_SITE=false
```

自行托管时请使用默认值 `false`。官方网站专用的SEO页面仅在官方部署中启用。
