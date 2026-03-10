# Idle Mode Settings

## Overview

The idle mode feature allows the character to automatically speak even when there is no input from the user. This is useful in scenarios such as digital signage and exhibition booths where the character needs to be constantly active.

![Idle Mode Settings](/images/idle_p3n8f.png)

## Idle Mode

Toggle the idle mode on or off.

**Environment Variables**:

```bash
# Enable/disable idle mode (true/false)
NEXT_PUBLIC_IDLE_MODE_ENABLED="false"
```

## Speech Sources

In idle mode, the following three speech sources are available. Multiple sources can be enabled simultaneously.

### 1. Fixed Phrases

Plays pre-registered phrases in sequential or random order. Each phrase can have an emotion assigned (neutral, happy, sad, angry, relaxed, surprised).

#### Playback Mode

- **sequential**: Play in registered order (default)
- **random**: Play in random order

**Environment Variables**:

```bash
# Playback mode (sequential/random)
NEXT_PUBLIC_IDLE_PLAYBACK_MODE="sequential"
```

### 2. Time-Based Greetings

Automatically selects and speaks greeting phrases based on the time of day.

- **Morning** (5:00-11:59)
- **Afternoon** (12:00-16:59)
- **Evening** (17:00-4:59)

**Environment Variables**:

```bash
# Enable/disable time-based greetings
NEXT_PUBLIC_IDLE_TIME_PERIOD_ENABLED="false"

# Morning greeting phrase
NEXT_PUBLIC_IDLE_TIME_PERIOD_MORNING=""

# Afternoon greeting phrase
NEXT_PUBLIC_IDLE_TIME_PERIOD_AFTERNOON=""

# Evening greeting phrase
NEXT_PUBLIC_IDLE_TIME_PERIOD_EVENING=""
```

### 3. AI Auto-Generation

AI automatically generates speech content based on the situation. You can control the direction of generated speech by customizing the prompt template.

**Environment Variables**:

```bash
# Enable/disable AI auto-generated speech
NEXT_PUBLIC_IDLE_AI_GENERATION_ENABLED="false"

# AI auto-generation prompt template
NEXT_PUBLIC_IDLE_AI_PROMPT_TEMPLATE=""
```

## Speech Interval

Set the interval for automatic speech in seconds (10-300 seconds).

**Environment Variables**:

```bash
# Speech interval (seconds)
NEXT_PUBLIC_IDLE_INTERVAL="30"
```

## Default Emotion

Set the default emotion for speech.

**Environment Variables**:

```bash
# Default emotion
NEXT_PUBLIC_IDLE_DEFAULT_EMOTION="neutral"
```
