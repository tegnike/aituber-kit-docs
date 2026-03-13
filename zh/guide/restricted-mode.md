# 限制模式

## 概述

限制模式（Restricted Mode）是为部署到无服务器环境（如Cloudflare等）和在演示终端上使用而设计的模式。为了在无法进行文件系统写入的环境中也能安全运行，它会禁用写入操作，并使用静态清单数据替代读取操作。

**环境变量**:

```bash
# 限制模式的启用/禁用（true/false）
NEXT_PUBLIC_RESTRICTED_MODE="false"
```

::: tip
部署到Cloudflare时，构建脚本会自动将其设置为 `true`。
:::

## 可用功能

即使在限制模式下，以下功能也可以正常使用。

- **AI聊天**: 与所有AI提供商的对话（OpenAI、Anthropic、Google等）
- **语音合成（TTS）**: 所有语音合成引擎（VOICEVOX、ElevenLabs、Google TTS等）
- **语音输入（STT）**: 浏览器语音识别、Whisper
- **角色显示**: VRM、Live2D、PNGTuber的显示和动画
- **角色选择**: 从预设中选择VRM/Live2D/PNGTuber模型
- **背景选择**: 从预设中选择背景图像
- **幻灯片播放**: 浏览和播放预设幻灯片
- **YouTube集成**: YouTube评论获取和直播
- **实时API**: 通过OpenAI Realtime API进行实时对话
- **设置保存**: 将设置保存到浏览器本地存储
- **主题更改**: 颜色主题切换

## 受限功能列表

### 基本设置

| 功能 | 限制内容 |
|------|----------|
| 背景图像上传 | 上传按钮被禁用 |
| 背景图像选择 | 仅可选择预设图像（不可上传） |

### 角色设置

| 功能 | 限制内容 |
|------|----------|
| VRM文件上传 | "打开VRM"按钮被禁用 |

::: info
VRM、Live2D和PNGTuber模型的**选择**功能可用。您可以从注册为预设的模型中进行选择。
:::

### 语音合成设置

| 功能 | 限制内容 |
|------|----------|
| VOICEVOX说话人列表更新 | 更新按钮被禁用 |
| AivisSpeech说话人列表更新 | 更新按钮被禁用 |

### 幻灯片设置

| 功能 | 限制内容 |
|------|----------|
| 幻灯片转换（PDF→幻灯片） | 转换UI被隐藏 |
| 幻灯片编辑器 | 文本区域、保存和撤销按钮被禁用 |

::: info
幻灯片的**选择、浏览和播放**功能可用。您可以从注册为预设的幻灯片文件夹中进行选择。
:::

### 图像设置

| 功能 | 限制内容 |
|------|----------|
| 图像上传 | 上传按钮被禁用 |
| 图像删除 | 删除按钮被禁用 |

### 记忆设置

| 功能 | 限制内容 |
|------|----------|
| 记忆数据备份文件选择 | 文件选择按钮被禁用 |
| 记忆数据恢复 | 恢复按钮被禁用 |

### 其他设置

| 功能 | 限制内容 |
|------|----------|
| 接受外部指令（Message Receiver） | 开关被禁用，API和轮询也会停止 |
| 外部联动模式（WebSocket） | 开关被禁用，WebSocket连接也会停止 |

### 姿势功能

| 功能 | 限制内容 |
|------|----------|
| 姿势Y轴旋转调整和保存 | 调整面板被隐藏 |

## 技术细节

### 读取API

在限制模式下，由于无法访问文件系统，以下API从静态清单数据（`assetManifest.json`）返回响应。由于返回有效数据，模型和幻灯片的选择可以正常工作。

| API | 返回数据 |
|-----|----------|
| `/api/get-vrm-list` | VRM模型列表 |
| `/api/get-background-list` | 背景图像列表 |
| `/api/get-live2d-list` | Live2D模型列表 |
| `/api/get-pngtuber-list` | PNGTuber模型列表 |
| `/api/get-pose-list` | 姿势列表 |
| `/api/getSlideFolders` | 幻灯片文件夹列表 |
| `/api/getSupplement` | 幻灯片补充信息 |
| `/api/convertMarkdown` | 幻灯片HTML/CSS |
| `/api/get-image-list` | 图像列表 |

### 写入API

以下API在限制模式下返回403错误。由于对应的UI按钮和开关也被禁用，正常操作中不会遇到这些错误。

| API | 操作内容 |
|-----|----------|
| `/api/upload-vrm-list` | VRM文件上传 |
| `/api/upload-background` | 背景图像上传 |
| `/api/upload-image` | 图像上传 |
| `/api/delete-image` | 图像删除 |
| `/api/convertSlide` | PDF→幻灯片转换 |
| `/api/updateSlideData` | 幻灯片数据更新 |
| `/api/update-pose-rotation` | 姿势旋转保存 |
| `/api/update-aivis-speakers` | AivisSpeech说话人更新 |
| `/api/update-voicevox-speakers` | VOICEVOX说话人更新 |
| `/api/save-chat-log` | 聊天记录保存 |
| `/api/messages` | 消息收发（Message Receiver） |

### 自定义预设数据

限制模式下可用的预设数据在 `src/constants/assetManifest.json` 中管理。在部署前编辑此文件，可以自定义限制模式下可选择的模型和背景图像。

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
还需要在 `public/` 下放置相应的资源文件。
:::
