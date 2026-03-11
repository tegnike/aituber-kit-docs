# YouTube设置

## 概述

提供从YouTube直播获取评论并让AI角色回应的功能。它可以自动获取用户的评论并生成AI回应。

**环境变量**:

```bash
# 是否启用YouTube模式（true/false）
NEXT_PUBLIC_YOUTUBE_MODE=false

# YouTube API密钥
NEXT_PUBLIC_YOUTUBE_API_KEY=

# YouTube直播ID
NEXT_PUBLIC_YOUTUBE_LIVE_ID=

# 评论来源选择（youtube-api or onecomme）
NEXT_PUBLIC_YOUTUBE_COMMENT_SOURCE=youtube-api

# YouTube评论获取间隔（秒）
NEXT_PUBLIC_YOUTUBE_COMMENT_INTERVAL=10
```

## YouTube模式

启用YouTube模式后，可以从YouTube直播获取评论，使AI角色能够自动回应。

::: warning 注意
启用YouTube模式后，某些功能会自动禁用。
:::

### YouTube API设置

使用YouTube API的设置。

### YouTube API密钥

设置使用YouTube API的API密钥。要获取YouTube评论，您需要Google Cloud Platform的API密钥。

::: tip 如何获取API密钥

1. 访问[Google Cloud Platform](https://console.cloud.google.com/)，创建账户或登录
2. 创建项目
3. 从"API和服务" > "库"中启用"YouTube Data API v3"
4. 从"凭据" > "创建凭据" > "API密钥"生成API密钥
5. 在此设置字段中输入生成的API密钥
   :::

### YouTube直播ID

输入您想要获取评论的YouTube直播ID。此值可以从YouTube直播的URL获取。

例如：如果YouTube URL是`https://www.youtube.com/watch?v=abcdefghijk`，则直播ID是`abcdefghijk`。

::: warning 注意
YouTube直播ID是特定直播的ID，而不是频道ID。
:::

### 使用方法

启用YouTube模式后，屏幕左上角会显示YouTube模式按钮。

![YouTube模式](/images/youtube_s045n.webp)

您可以通过点击此按钮切换评论获取的开/关状态。

::: warning 注意
YouTube直播ID是特定直播的ID，而不是频道ID。
:::

### 评论处理机制

AITuber Kit按以下流程处理YouTube评论：

1. 使用YouTube Data API v3按设定的间隔从直播获取评论
2. 将获取的评论添加到处理队列
3. 依次将队列中的评论发送给AI生成回应
4. 让角色说出生成的回应

### 评论来源选择

您可以选择评论的获取方式。

- **YouTube API**: 使用YouTube Data API v3直接获取评论
- **わんコメ（OneComme）**: 通过[わんコメ](https://onecomme.com/)获取评论。使用わんコメ时，需要先启动わんコメ应用程序

```bash
# わんコメ端口号
NEXT_PUBLIC_ONECOMME_PORT=11180
```

### 评论获取间隔

可以以秒为单位设置评论获取间隔。默认为10秒。

### 错误处理和注意事项

- **评论获取错误**：如果API密钥无效或已达到限制，可能无法获取评论
- **速率限制**：YouTube Data API有使用限制，因此在长时间直播中可能达到限制
- **评论过滤**：以"#"开头的评论会被忽略
- **资源消耗**：在长时间直播中，内存使用量可能会增加

## 会话继续模式

当没有评论时AI自行继续对话的模式。即使一段时间没有评论，AI角色也会主动发展对话。在选择了幻灯片模式、外部联动模式或Dify时无法使用。

内部使用Mastra Workflow，自动评估会话状态并判断"继续"、"生成新话题"、"休眠"三种分支。

![会话继续模式工作流程](/images/youtube_workflow_en.webp)

### 功能详情

在会话继续模式下，如果一段时间内没有评论，AI会参考过去的对话上下文，提供新话题以维持自然的对话流程。

### 自定义

可以通过环境变量自定义会话继续模式的行为。

```bash
# 生成新话题前的无评论次数（默认: 3）
NEXT_PUBLIC_CONVERSATION_CONTINUITY_NEW_TOPIC_THRESHOLD=3

# 休眠前的无评论次数（默认: 6）
NEXT_PUBLIC_CONVERSATION_CONTINUITY_SLEEP_THRESHOLD=6

# 各种提示的自定义（留空使用默认值）
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_EVALUATE=""
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_CONTINUATION=""
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_SELECT_COMMENT=""
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_NEW_TOPIC=""
NEXT_PUBLIC_CONVERSATION_CONTINUITY_PROMPT_SLEEP=""
```

### 注意事项

::: warning 关于使用成本
由于一次回应会多次调用LLM，API使用费用可能会增加。
:::

### 使用方法

启用YouTube模式后，您可以通过点击"会话继续模式"按钮切换会话继续模式的开/关状态。
