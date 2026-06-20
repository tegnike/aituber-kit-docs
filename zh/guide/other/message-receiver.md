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
```

## v1 API

`/api/v1` 下的API使用 `Authorization: Bearer YOUR_API_KEY` 请求头进行认证。请在 `.env.local` 的 `AITUBERKIT_API_KEY` 中设置API密钥。

### 通用规则

标记：`●` 必填，`△` 条件必填，`-` 可选

| 项目 | 指定方式 | 要求 | 说明 |
| --- | --- | --- | --- |
| `Authorization` | HTTP请求头 | `●` | 以 `Bearer YOUR_API_KEY` 的格式指定。 |

`clientId` 用于指定目标客户端。`speak` / `chat` / `stop` / `status` 中为必填，`events` 中为用于筛选事件的可选参数。POST系API可在查询字符串或JSON正文中指定，GET系API在查询字符串中指定。

POST请求正文以JSON发送。发送图片时，请在 `image` 中指定 `data:image/png;base64,...` 这样的Base64 data URI。图片字符串最大约可接受1,000万字符。

### 1. 直接发言（POST /api/v1/speak）

让角色直接说出指定文本。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `clientId` | `string` | `●` | 接收消息的 AITuberKit 端客户端ID。可在查询字符串或JSON正文中指定。 |
| `text` | `string` | `△` | 要发言的正文。未指定 `messages` 时必填。 |
| `messages` | `string[]` | `△` | 将多个文本一起加入队列时指定。未指定 `text` 时必填。 |
| `emotion` | `string` | `-` | 发言时的表情或情绪指定。未指定时按通常状态处理。 |
| `priority` | `"normal"` / `"high"` | `-` | 为 `high` 时，会插入到普通队列消息之前。未指定时为 `normal`。 |
| `interrupt` | `boolean` | `-` | 为 `true` 时，会先停止当前发言和等待队列，再加入此发言。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "你好。这是通过API进行的发言测试。", "emotion": "neutral", "priority": "normal", "interrupt": false}' \
  'http://localhost:3000/api/v1/speak/?clientId=YOUR_CLIENT_ID'
```

### 2. 作为聊天输入处理（POST /api/v1/chat）

按照与 AITuberKit 输入框相同的流程处理消息。如果将 `mode` 指定为 `ai_generate`，则会像旧API的 `ai_generate` 一样作为AI回答生成输入处理。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `clientId` | `string` | `●` | 接收消息的 AITuberKit 端客户端ID。可在查询字符串或JSON正文中指定。 |
| `text` | `string` | `△` | 传给角色的输入文本。未指定 `messages` 时必填。 |
| `messages` | `string[]` | `△` | 一次发送多条输入消息时指定。未指定 `text` 时必填。 |
| `mode` | `"user_input"` / `"ai_generate"` | `-` | `user_input` 与从画面输入框发送时相同，`ai_generate` 会作为AI回答生成请求处理。未指定时为 `user_input`。 |
| `systemPrompt` | `string` | `-` | 当 `mode` 为 `ai_generate` 且 `useCurrentSystemPrompt` 为 `false` 时使用的系统提示词。 |
| `useCurrentSystemPrompt` | `boolean` | `-` | 当 `mode` 为 `ai_generate` 时，是否使用当前角色设置中的系统提示词。未指定时为 `true`。 |
| `image` | `string` | `-` | 以Base64 data URI指定图片。示例：`data:image/png;base64,iVBOR...` |
| `priority` | `"normal"` / `"high"` | `-` | 为 `high` 时，会插入到普通队列消息之前。未指定时为 `normal`。 |
| `interrupt` | `boolean` | `-` | 为 `true` 时，会先停止当前发言和等待队列，再加入此输入。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "请为今天的直播简短打个招呼。", "mode": "user_input", "interrupt": false}' \
  'http://localhost:3000/api/v1/chat/?clientId=YOUR_CLIENT_ID'
```

发送图片时：

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "请描述这张图片。", "mode": "ai_generate", "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/v1/chat/?clientId=YOUR_CLIENT_ID'
```

### 3. 停止（POST /api/v1/stop）

停止当前发言和队列。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `clientId` | `string` | `●` | 要停止的 AITuberKit 端客户端ID。可在查询字符串或JSON正文中指定。 |
| `mode` | `"speech"` / `"queue"` / `"all"` | `-` | 停止范围。`speech` 停止当前发言，`queue` 停止等待队列，`all` 停止两者。未指定时为 `all`。 |
| `reason` | `string` | `-` | 停止原因的备注，可用于查看事件日志。 |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"mode": "all", "reason": "external_control"}' \
  'http://localhost:3000/api/v1/stop/?clientId=YOUR_CLIENT_ID'
```

### 4. 获取状态（GET /api/v1/status）

获取已连接客户端的发言状态、处理状态和队列数量。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `clientId` | 查询字符串 | `●` | 要获取状态的 AITuberKit 端客户端ID。 |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/status/?clientId=YOUR_CLIENT_ID'
```

### 5. 获取事件（GET /api/v1/events）

API事件可以通过 Server-Sent Events 订阅。在 API Console 中，可以添加 `snapshot=true` 查看最近事件。

| 参数 | 类型 | 要求 | 说明 |
| --- | --- | --- | --- |
| `clientId` | 查询字符串 | `-` | 仅筛选指定客户端ID的事件。未指定时包含所有客户端的事件。 |
| `snapshot` | `boolean` | `-` | 为 `true` 时，以JSON返回最近事件。未指定时会建立SSE连接。 |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?clientId=YOUR_CLIENT_ID&snapshot=true'
```

## API Console

消息发送页面已扩展为 API Console。您可以在此页面执行 `/api/v1` API 和现有的 `/api/messages` API。

## 启用功能

您可以切换通过API从外部进行操作功能的开/关状态。开启时，会自动生成客户端ID。<br>
您也可以将客户端ID编辑为任意值。

:::tip 提示
从外部源发送消息时需要客户端ID。
:::

## 旧版消息发送

为了保持向后兼容，旧版 `/api/messages` 端点仍然可以使用。

旧版API提供三种发送消息的方法：

### 1. 让AI角色直接说话（direct_send）

- 让AI角色按原样说出输入的消息
- 如果发送多条消息，它们将按顺序处理
- 使用AITuberKit设置中选择的语音模型

**API请求示例**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"messages": ["你好，今天天气真好。", "请告诉我你今天的日程安排。"]}' \
  'http://localhost:3000/api/messages/?clientId=YOUR_CLIENT_ID&type=direct_send'
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
  -d '{"systemPrompt": "You are a helpful assistant.", "useCurrentSystemPrompt": false, "messages": ["请描述一下这张图片。"], "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/messages/?clientId=YOUR_CLIENT_ID&type=ai_generate'
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
  -d '{"messages": ["你好，今天天气真好。"], "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/messages/?clientId=YOUR_CLIENT_ID&type=user_input'
```

## API响应

对每个API请求的响应作为包含请求处理结果的JSON对象返回。响应包括有关已处理消息和处理状态的信息。

:::tip 提示
在消息发送页面上，每种发送方法表单的底部都有一个响应显示区域，您可以在其中查看来自API的响应。
:::

## 注意事项

- 客户端ID用于限制来自外部源的访问。注意不要泄露给第三方。
- 在短时间内发送大量消息可能会导致处理延迟。
- 通过API从外部进行操作功能存在安全风险。仅在受信任的环境中启用。
