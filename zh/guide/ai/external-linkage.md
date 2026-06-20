# 外部连接模式设置

## 概述

外部连接模式用于将 AITuberKit 连接到外部 WebSocket 服务器。外部服务器可以生成回复、执行自定义工具或控制直播流程，AITuberKit 则负责聊天显示、语音合成、角色表情、动作和图像显示。

::: warning 关于测试版功能
**外部连接模式目前作为测试版功能提供。**

- 规格可能会在没有通知的情况下更改
- 运行可能不稳定
- 在生产环境中使用前请充分测试
- 如果发现错误或问题，欢迎反馈
  :::

## 环境变量

```bash
# 启用外部连接模式
NEXT_PUBLIC_EXTERNAL_LINKAGE_MODE=true

# 外部连接 WebSocket URL
NEXT_PUBLIC_EXTERNAL_LINKAGE_URL="ws://localhost:8000/ws"
```

如果未设置 `NEXT_PUBLIC_EXTERNAL_LINKAGE_URL`，将使用 `ws://localhost:8000/ws`。也可以在设置界面中修改连接 URL。

## 可以做什么

- 接收来自外部服务器的文本和图像输入
- 从 AITuberKit 向外部服务器发送用户输入和相机图像
- 使用 `v2` 协议处理流式回复
- 使用 `ack` 确认 request 是否已被接收
- 使用 `ping` / `pong` 检查连接健康状态
- 使用 `control.cancel` 取消正在执行的回复
- 断开连接后使用 backoff 进行重连
- 保持与现有 legacy JSON 格式的兼容

## 限制

启用外部连接模式时，以下功能会被禁用：

- 对话持续模式
- 实时 API 模式

此外，请注意以下事项：

- AI 处理需要在外部服务器端实现
- AITuberKit 负责接收到的回复的显示、语音和角色控制
- 如果外部服务器停止，连接状态会变为错误或断开

## 设置界面

1. 启动 AITuberKit
2. 打开设置界面
3. 在“AI 设置”中打开“外部连接模式”
4. 如有需要，修改“外部连接 WebSocket URL”

![外部连接模式设置界面](/images/external_linkage_v2_a7f4c.webp)

设置界面会显示以下状态。

| 项目 | 内容 |
| ---- | ---- |
| 连接状态 | `idle`、`connecting`、`open`、`closed` 或 `error` |
| 协议 | `legacy (v1 兼容)` 或 `v2` |
| 重连次数 | 自动重连尝试次数 |
| 心跳 | `idle`、`healthy` 或 `stale` |
| Request 状态 | `idle`、`sent`、`acknowledged`、`completed` 或 `error` |
| 最后 ACK | 服务器最后一次接收 request 的时间 |
| 最后错误 | WebSocket 或 request 级别的错误 |

可以使用“重新连接”按钮连接到当前 URL。只有在使用 `v2` 协议且存在正在执行的 request 时，“取消”按钮才会启用。

## 对应服务器

外部连接模式的专用服务器仓库是 `tegnike/aituber-server`。请先启动服务器，然后在 AITuberKit 中打开外部连接模式。

```bash
cd aituber-server
docker-compose up -d --build
```

默认 WebSocket endpoint:

```text
ws://127.0.0.1:8000/ws
```

AITuberKit 默认使用 `ws://localhost:8000/ws`，通常可以直接连接到该 endpoint。

## 协议

外部连接模式同时支持现有兼容的 `legacy (v1 兼容)` 格式和新的 `v2` 格式。这里没有单独的新 `v1` protocol；`legacy` 表示原有 JSON 兼容模式。

连接后，如果服务器立即发送 `session.ready`，AITuberKit 会将其识别为 `v2` 服务器，并将之后的发送格式切换为 `v2`。如果没有收到 `session.ready`，AITuberKit 会继续使用 legacy 格式。

### v2 envelope

在 `v2` 中，所有 message 都使用通用 envelope。为了兼容性，wire 上的 `version` 值仍然是字符串 `"2"`，但 UI 和文档中显示为 `v2`。

```json
{
  "version": "2",
  "id": "msg_client_001",
  "type": "chat.message",
  "sessionId": "session_client_001",
  "timestamp": "2026-06-20T00:00:00.000Z",
  "payload": {
    "text": "你好",
    "image": "data:image/png;base64,..."
  },
  "metadata": {}
}
```

主要 event 如下。

| type | 方向 | 用途 |
| ---- | ---- | ---- |
| `session.ready` | server -> AITuberKit | 服务器准备完成和 capabilities 通知 |
| `session.hello` | AITuberKit -> server | client 端功能通知 |
| `chat.message` | AITuberKit -> server | 用户输入 |
| `chat.start` | server -> AITuberKit | 回复开始 |
| `chat.delta` | server -> AITuberKit | 流式回复片段 |
| `chat.done` | server -> AITuberKit | 回复结束 |
| `chat.error` | server -> AITuberKit | 回复级别错误 |
| `ack` | server -> AITuberKit | request 已接收 |
| `ping` / `pong` | 双向 | 心跳 |
| `control.cancel` | AITuberKit -> server | 取消正在执行的处理 |
| `file.upload` | AITuberKit -> server | 文件发送 |
| `character.message.received` | AITuberKit -> server | AITuberKit 已接收 server 回复 |
| `character.message.rendered` | AITuberKit -> server | AITuberKit 已将回复反映到聊天显示 |
| `character.speech.start` | AITuberKit -> server | 发话处理开始 |
| `character.speech.done` | AITuberKit -> server | 发话片段完成 |
| `character.speech.error` | AITuberKit -> server | 发话处理错误 |
| `character.response.done` | AITuberKit -> server | 本次回复的全部发话完成 |

### 流式回复

服务器使用 `chat.start`、一个或多个 `chat.delta`，以及最后的 `chat.done` 来返回一次回复。

```json
{
  "version": "2",
  "type": "chat.delta",
  "requestId": "msg_client_001",
  "payload": {
    "text": "你好。"
  }
}
```

`requestId` 应与原始 `chat.message.id` 对应。AITuberKit 使用该 ID 更新 request 状态。

### AITuberKit 生命周期事件

`chat.done` 表示 server 端的回复生成已经结束。它并不表示 AITuberKit 端的语音合成或角色播放已经结束。

如果 server 需要在角色说完之后再开始下一步动作，请使用 AITuberKit 发送的 `character.response.done`。

```json
{
  "version": "2",
  "type": "character.response.done",
  "requestId": "msg_client_001",
  "payload": {
    "requestId": "msg_client_001",
    "speechSegmentCount": 2,
    "completedAt": "2026-06-20T00:00:05.000Z"
  }
}
```

如果需要更细粒度的控制，可以使用每个发话片段的 `character.speech.start` / `character.speech.done`。这些事件适合同步字幕、外部灯光、OBS 场景等按发话片段触发的动作。

### 取消

要停止正在执行的回复，AITuberKit 会发送 `control.cancel`。

```json
{
  "version": "2",
  "type": "control.cancel",
  "payload": {
    "requestId": "msg_client_001"
  }
}
```

如果服务器接受取消请求，会返回 `ack`，并最终发送包含 `cancelled: true` 的 `chat.done`。

```json
{
  "version": "2",
  "type": "chat.done",
  "requestId": "msg_client_001",
  "payload": {
    "requestId": "msg_client_001",
    "cancelled": true
  }
}
```

## Legacy 格式

为了兼容现有服务器，legacy JSON 格式仍然可以继续使用。

AITuberKit 到 server:

```json
{
  "content": "用户消息",
  "type": "chat",
  "image": "data:image/png;base64,..."
}
```

server 到 AITuberKit:

```json
{
  "text": "助手回复",
  "role": "assistant",
  "emotion": "happy",
  "type": "",
  "image": "data:image/png;base64,..."
}
```

参数说明：

- `text`：角色要说的文本
- `role`：通常为 `assistant`
- `emotion`：表情。`neutral`、`happy`、`sad`、`angry`、`relaxed`、`surprised`
- `type`：`start` 表示回复开始，`end` 表示回复结束，空字符串表示普通 message
- `image`：Base64 编码图像。流式传输时建议只包含在第一个 chunk 中

## Python 示例

以下示例连接到 `v2` server 并发送 message。

```python
import json
import uuid
import websocket
from datetime import datetime, timezone

def now_iso():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

ws = websocket.create_connection("ws://localhost:8000/ws")

# 接收 session.ready
print(ws.recv())

message_id = f"msg_{uuid.uuid4().hex}"
ws.send(json.dumps({
    "version": "2",
    "id": message_id,
    "type": "chat.message",
    "sessionId": "session_sample",
    "timestamp": now_iso(),
    "payload": {
        "text": "你好！"
    }
}))

while True:
    event = json.loads(ws.recv())
    print(event)
    if event.get("type") == "chat.done":
        break

ws.close()
```

## 故障排查

### 无法连接

- 确认服务器是否已启动
- 确认“外部连接 WebSocket URL”是否正确
- 如果服务器在 Docker 中运行，确认 `8000` port 是否已公开
- 确认防火墙或安全软件是否阻止了 WebSocket 通信

### 协议一直是 `legacy (v1 兼容)`

如果服务器没有发送 `session.ready`，AITuberKit 会将其视为 legacy server。要使用 `v2`，请在连接后立即发送 `session.ready`。

### Request 没有完成

- 确认服务器是否返回 `chat.done`
- 确认 `requestId` 是否与原始 `chat.message.id` 一致
- 确认是否返回了 `chat.error`

### 心跳变为 stale

AITuberKit 在 `v2` 连接期间会发送 `ping`。如果服务器没有返回 `pong`，心跳状态会变为 stale。请确认服务器端的 `ping` / `pong` 实现。
