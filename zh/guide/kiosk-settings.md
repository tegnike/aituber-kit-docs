# 展示终端模式设置

## 概述

展示终端模式是适用于展会和数字标牌无人运营的模式。启用后，设置画面的访问将受到限制，并切换为全屏显示。提供不当输入过滤、输入限制、密码保护设置等功能。

## 展示终端模式

切换展示终端模式的启用/禁用。

::: danger 注意
启用后将无法访问设置画面。要恢复访问，请**长按Esc键**，或**连续点击画面右上角5次**以显示密码输入画面。请务必在启用前设置并记住下方的密码。
:::

**环境变量**:

```bash
# 展示终端模式的启用/禁用（true/false）
NEXT_PUBLIC_KIOSK_MODE_ENABLED="false"
```

## 密码

设置用于临时解除展示终端模式的密码。长按Esc键，或在画面右上角连续点击5次可显示密码输入画面。

**环境变量**:

```bash
# 密码
NEXT_PUBLIC_KIOSK_PASSCODE=""
```

::: warning 注意
密码为空时，设置界面的保护将被禁用。请务必设置密码。
:::

## 输入字数限制

限制用户可输入文本的最大字数。

**环境变量**:

```bash
# 输入字数限制
NEXT_PUBLIC_KIOSK_MAX_INPUT_LENGTH="200"
```

## NG词过滤

阻止包含不当词语的消息发送。

**环境变量**:

```bash
# NG词过滤的启用/禁用（true/false）
NEXT_PUBLIC_KIOSK_NG_WORD_ENABLED="false"

# NG词（逗号分隔）
NEXT_PUBLIC_KIOSK_NG_WORDS=""
```

## 引导消息

可以设置在一段时间没有操作时显示的引导消息。可用于向用户展示使用说明等。

**环境变量**:

```bash
# 引导消息
NEXT_PUBLIC_KIOSK_GUIDANCE_MESSAGE=""

# 引导消息显示时间（秒）
NEXT_PUBLIC_KIOSK_GUIDANCE_TIMEOUT="60"
```
