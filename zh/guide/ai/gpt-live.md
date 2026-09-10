# GPT-Live-1语音对话

## 概述

从v2.77.0起，可以使用GPT-Live-1进行语音对话，在对方发话时也能持续通过麦克风输入。语音由GPT-Live-1处理，推理和Web搜索由另一个OpenAI模型负责。这是独立于常规[实时API](/zh/guide/ai/realtime-api)和仅将语音输入转录为文本功能的模式。

## 设置与开始对话

1. 在AI设置中选择OpenAI并设置API密钥。需要拥有GPT-Live访问权限。
2. 开启“GPT-Live-1”。
3. 选择声音、推理模型，并根据需要启用Web搜索。
4. 在对话界面点击“开始对话”，允许使用麦克风。
5. 结束时点击“结束对话”。系统会停止发送麦克风音频，等待服务器的结束通知后断开连接。

连接不会自动开始。即使隐藏了常规输入表单，GPT-Live操作栏仍会显示。

![GPT-Live设置](/images/live_settings_g7p2a.webp)

![GPT-Live对话操作栏](/images/live_conversation_m8k4b.webp)

| 设置 | 内容 |
| --- | --- |
| 声音 | 可选择 `marin`（默认）及另外12种声音 |
| 推理模型 | `gpt-5.6-terra`（默认）。指定可用于GPT-Live的Responses委派的模型ID |
| 推理模型的Web搜索 | 默认关闭。开启后，推理端可以使用Web搜索 |
| 系统提示词 | 将现有的角色设置同时传给语音端和推理端 |

设置更改从下次连接起生效。声音选项会按照官方分类标注女性或男性，未提供分类的 `marin` 显示为“未公布”。

| 分类 | 声音 |
| --- | --- |
| 女性 | quartz、willow、gleam、bossa、delta |
| 男性 | ripple、vesper、stone、meridian、tempo、beacon、cinder |
| 未公布 | marin |

## 对话历史与上限

建立连接时，会传入“保留的过去消息数量”所指定的最近文本消息。GPT-Live最多支持128条，并保留常规模式的设置值。不会将图片或音频数据本身作为过去的历史记录发送。

- 历史记录的官方上限为合计8,192个令牌。
- 系统提示词最多为16,384个令牌，包含应用程序附加的指令。
- 令牌数与字符数不同。系统不会按固定字符数截断正文。
- 准确的上限检查由API执行。超过上限时会显示错误，请减少历史记录条数或缩短提示词后重新连接。

“结束对话→重新连接”会继承历史记录。如需开始全新的对话，请按照**结束对话→重置对话历史→开始对话**的顺序操作。即使在连接期间清除界面上的历史记录，也不会清除已连接的GPT-Live上下文。系统提示词仍会继续生效。

## 语音与其他功能

接收的音频会直接播放，并联动VRM、Live2D和PNGTuber的口型同步。用户与角色的字幕分别添加到对话日志中。如果浏览器阻止音频播放，请点击界面显示的播放按钮。

此模式不使用常规TTS和语音识别设置。其工作方式不同于结合实时API、音频模式、外部连接、幻灯片、YouTube、自动发话或记忆等功能的常规聊天处理。启用冲突的输入或自动发话模式时，GPT-Live会关闭。长期记忆（RAG）不会加入此模式的历史记录。

## 环境变量

```bash
# GPT-Live全双工语音（需要OpenAI API密钥；后端另行计费）
NEXT_PUBLIC_LIVE_MODE=false
NEXT_PUBLIC_LIVE_VOICE=marin
NEXT_PUBLIC_LIVE_BACKEND_MODEL=gpt-5.6-terra
NEXT_PUBLIC_LIVE_WEB_SEARCH=false
```

对话历史的初始保留条数使用现有的 `NEXT_PUBLIC_MAX_PAST_MESSAGES=10`。服务器端密钥使用 `OPENAI_KEY` 或 `OPENAI_API_KEY`。使用服务器端密钥时，还需设置[服务器密钥访问控制](/zh/guide/environment-variables)。保持默认的 `AITUBERKIT_SERVER_SECRET_ACCESS_MODE=disabled` 时无法使用。

## 计费与错误

语音按连接时长计费，即使麦克风没有声音，计时也会继续。推理和Web搜索另行计费。创建WebRTC连接时收取的15秒初始化费用，会抵扣开始后的按时长计费。

密钥访问被拒绝、连接失败、超出令牌上限和推理失败等情况会显示在界面上。即使未收到结束确认，也会释放本地麦克风，但服务器端的结束确认和最终使用时长会显示为未确认。连接故障时不会自动重新连接。

官方资料：[GPT-Live连接](https://developers.openai.com/api/docs/guides/voice-webrtc?api=live)、[会话与历史记录](https://developers.openai.com/api/docs/guides/live-conversations)、[推理委派](https://developers.openai.com/api/docs/guides/live-delegation)。
