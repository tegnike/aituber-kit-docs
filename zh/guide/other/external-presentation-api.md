# 外部演示文稿API

## 概述

您可以将在外部系统中创建的演示文稿注册到AITuberKit，分配给指定客户端，并通过API进行播放、暂停、幻灯片切换等操作。演示文稿和客户端分配信息保存在服务器端，因此重新启动AITuberKit后也可以恢复。

现有的本地幻灯片功能仍可继续使用。分配外部演示文稿期间，外部演示文稿优先；解除分配后，将返回当前选择的本地幻灯片。

## 前置设置

```bash
# 启用来自外部的API操作
NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED=true

# 用于识别操作目标的客户端ID
NEXT_PUBLIC_CLIENT_ID="main-stage"

# 用于 /api/v1 Bearer认证的服务器端API密钥
AITUBERKIT_API_KEY="replace-with-a-random-api-key"

# 外部Presentation Manifest和Assignment的持久化存储位置
# 未指定时: <project-root>/.aituber-kit/presentations
AITUBERKIT_PRESENTATION_STORAGE_DIR=""
```

所有端点都需要指定以下认证请求头。

```http
Authorization: Bearer YOUR_API_KEY
```

如果 `NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED` 处于禁用状态，浏览器端将不会接收外部命令。在限制模式下，外部控制和文件访问将被拒绝。

## 基本流程

1. 注册Presentation Manifest
2. 将已注册的修订版本分配给客户端
3. 通过状态API确认加载完成
4. 通过控制API开始、切换或停止演示
5. 根据需要订阅SSE事件

## 端点

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| `PUT` | `/api/v1/presentations/{presentationId}` | 注册或更新Manifest |
| `GET` | `/api/v1/presentations/{presentationId}` | 获取已保存的Manifest |
| `POST` | `/api/v1/presentations/{presentationId}/activate` | 分配给客户端 |
| `POST` | `/api/v1/presentation/control` | 控制播放状态和显示 |
| `GET` | `/api/v1/presentation/status` | 获取分配状态和浏览器实际状态 |
| `GET` | `/api/v1/events` | 通过SSE订阅Presentation事件 |

## 注册Manifest

`presentationId`、Section ID、Slide ID等ID必须以字母或数字开头，可使用字母、数字、连字符和下划线。URL中的`presentationId`必须与Manifest中的`presentationId`一致。

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "schemaVersion": 1,
    "presentationId": "product-demo",
    "revision": 1,
    "title": "Product Demo",
    "locale": "zh-CN",
    "createdAt": "2026-08-03T12:00:00.000Z",
    "theme": "default",
    "sections": [
      {
        "id": "introduction",
        "title": "概述",
        "qaBrief": "根据产品演示的内容回答问题。",
        "responsePolicy": "不要对资料中未包含的信息进行推测并将其表述为事实。",
        "slides": [
          {
            "id": "intro-1",
            "markdown": "# Product Demo\\n\\n这是通过外部API注册的幻灯片。",
            "narration": "现在开始产品演示。",
            "pauseAfter": true
          }
        ]
      }
    ]
  }' \
  'http://localhost:3000/api/v1/presentations/product-demo'
```

- 新注册返回`201`，更新或重新发送相同内容时返回`200`
- 重新发送相同修订版本和相同内容是不会产生更改的幂等操作
- 如果修订版本早于已保存的版本，或同一修订版本的内容不同，将返回`409`
- 请求正文上限为5 MB
- `theme` 可使用`default`和`dark`。不支持的值将以`default`显示

### 主要Manifest字段

| 字段 | 要求 | 说明 |
| --- | --- | --- |
| `schemaVersion` | 必填 | 当前为`1` |
| `presentationId` | 必填 | 与URL一致的Presentation ID |
| `revision` | 必填 | 大于等于1的整数 |
| `title` | 必填 | 演示文稿名称 |
| `createdAt` | 必填 | 包含时区的ISO 8601日期时间 |
| `thumbnail` | 可选 | 在演示文稿列表或隐藏时使用的图片Asset |
| `description` / `locale` | 可选 | 说明文本和语言信息 |
| `theme` | 可选 | `default`或`dark` |
| `sections` | 必填 | 至少1个，最多50个 |
| `sections[].slides` | 必填 | 每个Section至少需要1个，整体最多200个 |
| `slides[].markdown` | 必填 | 每个最多50,000个字符 |
| `slides[].narration` | 可选 | 朗读文本，最多10,000个字符 |
| `slides[].pauseAfter` | 可选 | 为`true`时，在该幻灯片之后暂停Section |
| `slides[].assets` | 可选 | 最多可指定20个`http`或`https`图片 |
| `qaBrief` | 可选 | 用于Section问答的资料信息 |
| `responsePolicy` | 可选 | Section的回答方针 |
| `sources` | 可选 | 问答时引用的来源信息，整体最多500个 |
| `metadata` | 可选 | 值可以是字符串、数字、布尔值或`null`的附加信息，最多50项 |

Markdown中的HTML、事件处理程序以及`javascript:`、`data:`、`file:`链接将被拒绝。图片Asset必须包含`alt`。

## 获取Manifest

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/presentations/product-demo?revision=1'
```

`revision`为可选参数。如果指定值与已保存的修订版本不同，将返回`409 REVISION_MISMATCH`。

## 分配给Receiver

如果启动了多个浏览器标签页或OBS Browser Source，请先通过 [`GET /api/v1/receivers`](/zh/guide/other/message-receiver) 获取已连接的Receiver，然后选择要操作的 `receiverId`。

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"receiverId":"aituber-receiver-7be9e2c4-57de-4ddb-a808-e85da6fb2387","revision":1,"autoStart":false}' \
  'http://localhost:3000/api/v1/presentations/product-demo/activate'
```

`receiverId`也可以通过查询字符串指定。现有集成仍可继续使用用于兼容的`clientId`。`autoStart`的默认值为`false`，即使资料已加载，也不会自动开始发言。

## 控制演示文稿

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"receiverId":"aituber-receiver-7be9e2c4-57de-4ddb-a808-e85da6fb2387","action":"start"}' \
  'http://localhost:3000/api/v1/presentation/control'
```

| `action` | 操作 |
| --- | --- |
| `start` | 从开头或当前位置开始发言和自动推进 |
| `pause` | 当前发言结束后停止自动推进 |
| `resume` | 从暂停位置继续 |
| `next_slide` / `previous_slide` | 移动到前一张或后一张Slide |
| `next_section` / `previous_section` | 移动到前一个或后一个Section |
| `goto` | 移动到`target.sectionId`或`target.slideId` |
| `reset` | 停止发言并返回开头的`ready`状态 |
| `hide` / `show` | 保持当前位置并隐藏或重新显示资料 |
| `unload` | 解除对客户端的分配 |

使用`goto`时，按如下方式指定目标位置。指定`speak: true`后，会朗读移动后的幻灯片。

```json
{
  "receiverId": "aituber-receiver-7be9e2c4-57de-4ddb-a808-e85da6fb2387",
  "action": "goto",
  "target": {
    "sectionId": "introduction",
    "slideId": "intro-1"
  },
  "speak": true
}
```

控制API接受命令后返回`202`。请通过状态API或SSE事件确认实际应用完成。

## 查看状态

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/presentation/status?receiverId=aituber-receiver-7be9e2c4-57de-4ddb-a808-e85da6fb2387'
```

响应中包含服务器保存的分配状态`desired`、浏览器报告的实际状态`actual`，以及表示两者是否一致的`inSync`。

`actual.state`为`unassigned`、`loading`、`ready`、`playing`、`paused`、`section_paused`、`completed`、`error`之一。

## 订阅事件

您可以通过现有的`GET /api/v1/events`接收以下Presentation事件。

- `presentation_registered`
- `presentation_assigned`
- `presentation_loaded`
- `presentation_started`
- `slide_changed`
- `section_paused`
- `presentation_paused`
- `presentation_completed`
- `presentation_unloaded`
- `presentation_error`

```bash
curl -N -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events?receiverId=aituber-receiver-7be9e2c4-57de-4ddb-a808-e85da6fb2387'
```

## 存储位置与运维注意事项

默认情况下，Manifest和分配信息保存在`<project-root>/.aituber-kit/presentations`。如需更改存储位置，请指定`AITUBERKIT_PRESENTATION_STORAGE_DIR`。

此功能面向可写入的本地Node.js环境、桌面版和自托管环境。在只读环境或仅提供临时文件系统的环境中，注册或分配操作可能返回`503 PRESENTATION_STORAGE_UNAVAILABLE`。

AITuberKit不会判断外部图片的使用许可。请由图片注册方确认相关权利和公开范围。
