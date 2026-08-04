# API设置

## 概述

用于启用通过API从外部进行操作的设置。启用此功能后，可以通过API执行AI角色发言、聊天输入、停止等操作。

`/api/v1` 下提供按用途划分的端点。现有的 `/api/messages` 端点会继续保留，以保持向后兼容。

**环境变量**:

```bash
# 启用通过API从外部进行操作（true/false）
NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED=false

# 客户端ID
NEXT_PUBLIC_CLIENT_ID=""

# 用于 /api/v1 Bearer 认证的 API 密钥
AITUBERKIT_API_KEY=""

# 浏览器端MessageReceiver调用 /api/v1 时使用的API密钥
NEXT_PUBLIC_AITUBERKIT_API_KEY=""
```

`NEXT_PUBLIC_AITUBERKIT_API_KEY` 会公开给浏览器。请仅在可信的封闭网络或本地环境中用于MessageReceiver调用需要认证的 `/api/v1`，不要在公开网站中将其视为机密信息。

## v1 API

`/api/v1` 下的API使用 `Authorization: Bearer YOUR_API_KEY` 请求头进行认证。请在 `.env.local` 的 `AITUBERKIT_API_KEY` 中设置API密钥。

### 通用规则

标记：`●` 必填，`△` 条件必填，`-` 可选

| 项目 | 指定方式 | 要求 | 说明 |
| --- | --- | --- | --- |
| `Authorization` | HTTP请求头 | `●` | 以 `Bearer YOUR_API_KEY` 的格式指定。 |

`receiverId` 是用于指定特定AITuberKit界面的路由ID，例如浏览器标签页或OBS Browser Source。`speak` / `chat` / `stop` / `status` 中必须指定 `receiverId` 或原有的 `clientId`，`events` 中则是用于筛选事件的可选参数。POST系API可在查询字符串或JSON正文中指定，GET系API在查询字符串中指定。

同时指定两者时，优先顺序为JSON正文中的 `receiverId`、JSON正文中的 `clientId`、查询字符串中的 `receiverId`、查询字符串中的 `clientId`。新集成推荐使用 `receiverId`。为兼容现有集成，`clientId` 仍可继续使用。

POST请求正文以JSON发送。发送图片时，请在 `image` 中指定 `data:image/png;base64,...` 这样的Base64 data URI。图片字符串最大约可接受1,000万字符。

### 获取已连接的Receiver（GET /api/v1/receivers）

获取连接到同一服务器的AITuberKit界面列表。用于从多个浏览器标签页或OBS Browser Source中选择操作目标。

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/receivers/'
```

```json
{
  "ok": true,
  "receivers": [
    {
      "receiverId": "aituber-receiver-7be9e2c4-57de-4ddb-a808-e85da6fb2387",
      "configuredClientId": "main-stage",
      "displayName": "Chrome a6fb2387",
      "kind": "browser",
      "capabilities": ["presentation", "chat", "speech"],
      "connected": true,
      "isSpeaking": false,
      "lastSeenAt": "2026-08-04T10:00:00.000Z"
    }
  ]
}
```

| 字段 | 说明 |
| --- | --- |
| `receiverId` | 用作发言、聊天、停止和演示文稿操作目标的临时ID。 |
| `configuredClientId` | 保存在设置界面中的原有逻辑客户端ID。可能由多个Receiver共享。 |
| `displayName` | 用于选择界面的辅助显示名称。请勿用于持久化标识。 |
| `kind` | `browser`、`obs` 或兼容路径的 `legacy`。 |
| `capabilities` | 支持的 `presentation`、`chat`、`speech` 列表。 |
| `isSpeaking` | 表示获取列表时是否正在发言。 |
| `lastSeenAt` | 最后一次报告状态的时间。 |

在同一标签页中重新加载时，`receiverId` 会保持不变，但重新创建标签页或OBS实例后会发生变化。最后一次状态报告超过10秒的Receiver会从列表中移除，因此如果找不到已保存的ID，请重新获取列表。

Receiver Registry在运行AITuberKit的单个Node.js进程中进行管理。在多进程或无服务器架构中，Receiver列表不会共享。此外，`receiverId` 不是认证信息。所有 `/api/v1` 操作都需要API密钥。

### 1. 直接发言（POST /api/v1/speak）

让角色直接说出指定文本。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | `string` | `●` | 接收消息的AITuberKit界面的Receiver ID，或用于兼容的客户端ID。可在查询字符串或JSON正文中指定。 |
| `text` | `string` | `△` | 要发言的正文。未指定 `messages` 时必填。 |
| `messages` | `string[]` | `△` | 将多个文本一起加入队列时指定。未指定 `text` 时必填。 |
| `emotion` | `string` | `-` | 发言时的表情或情绪指定。未指定时按通常状态处理。 |
| `priority` | `"normal"` / `"high"` | `-` | 为 `high` 时，会插入到普通队列消息之前。未指定时为 `normal`。 |
| `interrupt` | `boolean` | `-` | 为 `true` 时，会先停止当前发言和等待队列，再加入此发言。 |
| `speechSessionId` | `string` | `-` | 将同一回答的分段请求归入一个发言会话的ID。去除首尾空格后长度必须为1至200个字符。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "你好。这是通过API进行的发言测试。", "emotion": "neutral", "priority": "normal", "interrupt": false}' \
  'http://localhost:3000/api/v1/speak/?receiverId=YOUR_RECEIVER_ID'
```

将流式生成的回答按句子等单位分段发送时，请为同一回答的所有请求指定相同的 `speechSessionId`。相同ID的发言会按请求顺序（FIFO）加入同一个发言队列，即使 `priority` 为 `high` 也会保持顺序。省略时，每个请求会作为独立的发言会话处理。

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "这是第一句话。", "speechSessionId": "answer-stream-001"}' \
  'http://localhost:3000/api/v1/speak/?receiverId=YOUR_RECEIVER_ID'

curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "这是接下来的句子。", "speechSessionId": "answer-stream-001"}' \
  'http://localhost:3000/api/v1/speak/?receiverId=YOUR_RECEIVER_ID'
```

### 2. 作为聊天输入处理（POST /api/v1/chat）

按照与 AITuberKit 输入框相同的流程处理消息。如果将 `mode` 指定为 `ai_generate`，则会像旧API的 `ai_generate` 一样作为AI回答生成输入处理。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | `string` | `●` | 接收消息的AITuberKit界面的Receiver ID，或用于兼容的客户端ID。可在查询字符串或JSON正文中指定。 |
| `text` | `string` | `△` | 传给角色的输入文本。未指定 `messages` 时必填。 |
| `messages` | `string[]` | `△` | 一次发送多条输入消息时指定。未指定 `text` 时必填。 |
| `mode` | `"user_input"` / `"ai_generate"` | `-` | `user_input` 与从画面输入框发送时相同，`ai_generate` 会作为AI回答生成请求处理。未指定时为 `user_input`。 |
| `systemPrompt` | `string` | `-` | 当 `mode` 为 `ai_generate` 且 `useCurrentSystemPrompt` 为 `false` 时使用的系统提示词。 |
| `useCurrentSystemPrompt` | `boolean` | `-` | 当 `mode` 为 `ai_generate` 时，是否使用当前角色设置中的系统提示词。未指定时为 `true`。 |
| `image` | `string` | `-` | 以Base64 data URI指定图片。示例：`data:image/png;base64,iVBOR...` |
| `priority` | `"normal"` / `"high"` | `-` | 为 `high` 时，会插入到普通队列消息之前。未指定时为 `normal`。 |
| `interrupt` | `boolean` | `-` | 为 `true` 时，会先停止当前发言和等待队列，再加入此输入。 |
| `responseCallback` | `object` | `-` | 将AI回答返回到本地HTTP回调时指定。详情见下文。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "请为今天的直播简短打个招呼。", "mode": "user_input", "interrupt": false}' \
  'http://localhost:3000/api/v1/chat/?receiverId=YOUR_RECEIVER_ID'
```

发送图片时：

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "请描述这张图片。", "mode": "ai_generate", "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/v1/chat/?receiverId=YOUR_RECEIVER_ID'
```

#### AI回答回调

指定 `responseCallback` 后，可在AI回答生成完成后，由AITuberKit服务器将结果返回到本地HTTP端点。

```json
{
  "text": "请说明这份资料的要点。",
  "mode": "user_input",
  "responseCallback": {
    "url": "http://127.0.0.1:8787/aituber-kit/callback",
    "interactionId": "request-001",
    "token": "replace-with-a-random-token"
  }
}
```

将以以下格式向回调端点发送POST请求。

```json
{
  "interactionId": "request-001",
  "token": "replace-with-a-random-token",
  "status": "completed",
  "content": "生成的AI回答"
}
```

- `url` 仅限 `http://127.0.0.1`、`http://localhost`、`http://[::1]`
- `interactionId` 必须以字母或数字开头，可使用字母、数字、连字符和下划线（最多128个字符）
- `token` 长度为8至256个字符。请在回调接收端进行核对
- `status` 为 `completed`、`empty`、`failed` 之一。`failed` 时会包含 `error`

### 3. 停止（POST /api/v1/stop）

停止当前发言和队列。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | `string` | `●` | 要停止的AITuberKit界面的Receiver ID，或用于兼容的客户端ID。可在查询字符串或JSON正文中指定。 |
| `mode` | `"speech"` / `"queue"` / `"all"` | `-` | 停止范围。`speech` 停止当前发言，`queue` 停止等待队列，`all` 停止两者。未指定时为 `all`。 |
| `reason` | `string` | `-` | 停止原因的备注，可用于查看事件日志。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"mode": "all", "reason": "external_control"}' \
  'http://localhost:3000/api/v1/stop/?receiverId=YOUR_RECEIVER_ID'
```

### 4. 获取状态（GET /api/v1/status）

获取已连接客户端的发言状态、处理状态和队列数量。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | 查询字符串 | `●` | 要获取状态的AITuberKit界面的Receiver ID，或用于兼容的客户端ID。 |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/status/?receiverId=YOUR_RECEIVER_ID'
```

### 5. 获取事件（GET /api/v1/events）

API事件可以通过 Server-Sent Events 订阅。在 API Console 中，可以添加 `snapshot=true` 查看最近事件。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | 查询字符串 | `-` | 仅筛选指定Receiver ID或用于兼容的客户端ID的事件。未指定时包含所有Receiver的事件。 |
| `snapshot` | `boolean` | `-` | 为 `true` 时，以JSON返回最近事件。未指定时会建立SSE连接。 |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?receiverId=YOUR_RECEIVER_ID&snapshot=true'
```

以下事件可用于新任务通知和发言状态同步。

| 事件 | 内容 |
| --- | --- |
| `message_queued` | 发言或聊天输入已加入队列 |
| `command_queued` | 演示文稿操作等命令已加入队列 |
| `stop_requested` | 已请求停止发言或等待队列 |
| `speech_started` | 客户端进入发言状态 |
| `speech_ended` | 客户端结束发言状态 |
| `speech_chunk_started` | 分段发言的音频块开始播放。Payload包含`speechChunkId`和`text` |
| `speech_chunk_ended` | 发言音频块播放结束。Payload包含`speechChunkId` |

AITuberKit界面的MessageReceiver会订阅经过认证的SSE，并在收到 `message_queued`、`command_queued` 或 `stop_requested` 时立即获取相应数据。连接期间每15秒进行一次防遗漏检查；只有断开连接时才回退到每秒一次的轮询。SSE重连采用指数退避，从250毫秒开始，最长为5秒。

有关外部演示文稿事件，请参阅[外部演示文稿API](/zh/guide/other/external-presentation-api#订阅事件)。

## API Console

消息发送页面已扩展为 API Console。您可以在此页面执行常规的 `/api/v1` API、外部演示文稿API和现有的 `/api/messages` API。

## 启用功能

您可以切换通过API从外部进行操作功能的开/关状态。开启时，会自动生成客户端ID。<br>
您也可以将客户端ID编辑为任意值。

::: warning
在限制模式环境中，此开关会被禁用，API以及通过SSE和轮询进行的接收处理也会停止。设置界面会在开关附近显示禁用原因。
:::

:::tip 提示
从外部源发送消息时需要客户端ID。
:::

## 消息发送 API（POST /api/v1/messages）

消息发送页面可以根据用途执行多个 `/api/v1` 端点。直接调用 API 时，请指定 `receiverId`（或用于兼容的 `clientId`）和 `Authorization: Bearer YOUR_API_KEY` 请求头。

:::tip 提示
`YOUR_API_KEY` 使用服务器端 `AITUBERKIT_API_KEY` 中设置的值。请将其作为服务器端值管理，不要作为暴露给浏览器的环境变量管理。
:::

`/api/v1/messages/` 是一个通用端点，可通过 `type` 字段切换直接发话、AI生成和普通用户输入。`messages` 用于多条消息，`text` 用于单条消息。

### 1. 让AI角色直接说话（direct_send）

- 让AI角色按原样说出输入的消息
- 如果发送多条消息，它们将按顺序处理
- 使用AITuberKit设置中选择的语音模型

**API请求示例**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"messages": ["你好，今天天气真好。", "请告诉我你今天的日程安排。"], "type": "direct_send"}' \
  'http://localhost:3000/api/v1/messages/?receiverId=YOUR_RECEIVER_ID'
```

### 2. 用AI生成回答然后说话（ai_generate）

- AI从输入消息生成回应，然后AI角色说出该回应
- 如果发送多条消息，它们将按顺序处理
- 使用AITuberKit设置中选择的AI模型和语音模型
- 如何设置系统提示：
  - 要使用AITuberKit系统提示，设置`useCurrentSystemPrompt: true`
  - 要使用自定义系统提示，在`systemPrompt`参数中指定，并设置`useCurrentSystemPrompt: false`
- 要加载过去的对话历史，您可以在系统提示或用户消息的任何位置包含字符串`[conversation_history]`
- 将图像（Base64格式的data URI）附加到 `image` 参数中，可以代替相机捕获使用外部图像发送给AI

**API请求示例**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"systemPrompt": "You are a helpful assistant.", "useCurrentSystemPrompt": false, "messages": ["请告诉我你今天的日程安排。"], "type": "ai_generate"}' \
  'http://localhost:3000/api/v1/messages/?receiverId=YOUR_RECEIVER_ID'
```

### 3. 发送用户输入（user_input）

- 发送的消息处理方式与从AITuberKit输入表单输入的情况相同
- 如果发送多条消息，它们将按顺序处理
- 使用AITuberKit设置中选择的AI模型和语音模型
- 使用AITuberKit的系统提示和对话历史
- 将图像（Base64格式的data URI）附加到 `image` 参数中，可以代替相机捕获使用外部图像进行处理

**API请求示例**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"messages": ["你好，今天天气真好。", "请告诉我你今天的日程安排。"], "type": "user_input"}' \
  'http://localhost:3000/api/v1/messages/?receiverId=YOUR_RECEIVER_ID'
```

## 按用途划分的端点

用途固定时，也可以使用以下端点。

| 端点 | 用途 |
| --- | --- |
| `POST /api/v1/speak/` | 让角色直接说出文本 |
| `POST /api/v1/chat/` | 作为普通输入或AI生成处理 |
| `POST /api/v1/stop/` | 停止当前发话或队列 |
| `GET /api/v1/status/` | 获取已连接客户端状态 |
| `GET /api/v1/events/` | 通过SSE订阅API事件，或查看最近事件 |
| `GET /api/v1/receivers/` | 获取已连接的Receiver列表 |

有关演示文稿的注册、分配和播放操作，请参阅[外部演示文稿API](/zh/guide/other/external-presentation-api)。

## API响应

对每个API请求的响应作为包含请求处理结果的JSON对象返回。响应包括有关已处理消息和处理状态的信息。

:::tip 提示
在消息发送页面上，每种发送方法表单的底部都有一个响应显示区域，您可以在其中查看来自API的响应。
:::

## 注意事项

- `receiverId` 和 `clientId` 是用于选择消息目标的标识符，并非认证信息。请勿向第三方泄露API密钥。
- 在短时间内发送大量消息可能会导致处理延迟。
- 通过API从外部进行操作功能存在安全风险。仅在受信任的环境中启用。
