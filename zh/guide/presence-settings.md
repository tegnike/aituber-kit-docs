# 人感检测设置

## 概述

人感检测功能使用摄像头检测人脸，根据访客的到来和离开，角色会自动进行问候和应答。该功能适用于数字标牌和自助终端等场景。

## 人感检测模式

切换人感检测功能的启用/禁用。

**环境变量**:

```bash
# 人感检测模式的启用/禁用（true/false）
NEXT_PUBLIC_PRESENCE_DETECTION_ENABLED="false"
```

::: warning 注意
此功能需要访问摄像头。请允许浏览器的摄像头权限。
:::

## 摄像头选择

可以选择要使用的摄像头设备。当连接了多个摄像头时，可以从下拉菜单中选择。

## 问候消息

可以设置检测到访客时角色发出的问候消息。可以注册多个短语，并为每个短语设置情感（neutral、happy、sad、angry、relaxed、surprised）。

**环境变量**:

```bash
# 问候消息
NEXT_PUBLIC_PRESENCE_GREETING_MESSAGE="いらっしゃいませ！何かお手伝いできることはありますか？"
```

## 离开时消息

可以设置访客离开时发出的消息。留空则禁用离开时的消息。

**环境变量**:

```bash
# 离开时消息（留空则禁用）
NEXT_PUBLIC_PRESENCE_DEPARTURE_MESSAGE=""
```

## 离开时清除对话历史

可以设置访客离开时是否自动清除对话历史。

**环境变量**:

```bash
# 离开时清除对话历史（true/false）
NEXT_PUBLIC_PRESENCE_CLEAR_CHAT_ON_DEPARTURE="true"
```

## 检测参数

### 离开判定时间

设置从未检测到人脸到判定为离开的时间（秒）。

**环境变量**:

```bash
# 离开判定时间（秒）
NEXT_PUBLIC_PRESENCE_DEPARTURE_TIMEOUT="3"
```

### 冷却时间

设置离开判定后到重新开始检测的等待时间（秒）。

**环境变量**:

```bash
# 冷却时间（秒）
NEXT_PUBLIC_PRESENCE_COOLDOWN_TIME="5"
```

### 检测灵敏度

设置人脸检测的灵敏度。可从以下3个级别中选择：

- **low**: 低灵敏度（500ms间隔）
- **medium**: 中灵敏度（300ms间隔）（默认）
- **high**: 高灵敏度（150ms间隔）

**环境变量**:

```bash
# 检测灵敏度（low/medium/high）
NEXT_PUBLIC_PRESENCE_DETECTION_SENSITIVITY="medium"
```

### 检测确认时间

设置从检测到人脸到判定为访客的时间（秒）。用于防止误检测。

**环境变量**:

```bash
# 检测确认时间（秒）
NEXT_PUBLIC_PRESENCE_DETECTION_THRESHOLD="0"
```

## 调试模式

启用调试模式后，摄像头画面和检测状态的详细信息将显示在屏幕上。

**环境变量**:

```bash
# 调试模式（true/false）
NEXT_PUBLIC_PRESENCE_DEBUG_MODE="false"
```
