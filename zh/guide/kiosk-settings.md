# 自助终端模式设置

## 概述

自助终端模式是面向数字标牌和演示终端等不特定多数人操作的环境的功能。提供不当输入过滤、输入限制、密码保护设置等功能。

## 自助终端模式

切换自助终端模式的启用/禁用。

**环境变量**:

```bash
# 自助终端模式的启用/禁用（true/false）
NEXT_PUBLIC_KIOSK_MODE_ENABLED="false"
```

## 密码

设置用于限制访问设置界面的密码。启用自助终端模式时，打开设置界面时需要输入密码。

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
