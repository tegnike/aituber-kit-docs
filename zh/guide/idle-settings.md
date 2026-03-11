# 待机模式设置

## 概述

待机模式功能可以在没有用户输入的期间让角色自动发言。适用于数字标牌和展示展台等需要角色始终保持活跃状态的场景。

![待机模式设置画面](/images/idle_p3n8f.webp)

## 待机模式

切换待机模式的启用/禁用。

**环境变量**:

```bash
# 待机模式的启用/禁用（true/false）
NEXT_PUBLIC_IDLE_MODE_ENABLED="false"
```

## 发言来源

待机模式可以使用以下3种发言来源。可以同时启用多个来源。

### 1. 固定短语

按顺序或随机播放预先注册的短语。可以为每个短语设置情感（neutral、happy、sad、angry、relaxed、surprised）。

#### 播放模式

- **sequential**: 按注册顺序播放（默认）
- **random**: 随机播放

**环境变量**:

```bash
# 播放模式（sequential/random）
NEXT_PUBLIC_IDLE_PLAYBACK_MODE="sequential"
```

### 2. 时段问候

根据时段自动选择并发出问候短语。

- **早上**（5:00-11:59）
- **中午**（12:00-16:59）
- **傍晚**（17:00-4:59）

**环境变量**:

```bash
# 时段问候的启用/禁用
NEXT_PUBLIC_IDLE_TIME_PERIOD_ENABLED="false"

# 早上的问候短语
NEXT_PUBLIC_IDLE_TIME_PERIOD_MORNING=""

# 中午的问候短语
NEXT_PUBLIC_IDLE_TIME_PERIOD_AFTERNOON=""

# 傍晚的问候短语
NEXT_PUBLIC_IDLE_TIME_PERIOD_EVENING=""
```

### 3. AI自动生成

AI根据情况自动生成发言内容。通过自定义提示模板，可以控制生成发言的方向。

**环境变量**:

```bash
# AI自动生成发言的启用/禁用
NEXT_PUBLIC_IDLE_AI_GENERATION_ENABLED="false"

# AI自动生成提示模板
NEXT_PUBLIC_IDLE_AI_PROMPT_TEMPLATE=""
```

## 发言间隔

以秒为单位设置自动发言的间隔（10-300秒）。

**环境变量**:

```bash
# 发言间隔（秒）
NEXT_PUBLIC_IDLE_INTERVAL="30"
```

## 默认情感

设置发言时的默认情感。

**环境变量**:

```bash
# 默认情感
NEXT_PUBLIC_IDLE_DEFAULT_EMOTION="neutral"
```
