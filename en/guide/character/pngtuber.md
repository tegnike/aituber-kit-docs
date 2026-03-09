# PNGTuber Settings

## Overview

PNGTuber is a character display method that combines video and lip sync. Without needing to prepare 3D/2D models like VRM or Live2D, you can display characters using only video assets and mouth part images.

**Environment Variables**:

```bash
# PNGTuber model path
NEXT_PUBLIC_SELECTED_PNGTUBER_PATH=/pngtuber/nike01

# PNGTuber lip sync sensitivity (0-100)
NEXT_PUBLIC_PNGTUBER_SENSITIVITY=50

# PNGTuber chroma key settings
NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_ENABLED=false
NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_COLOR=#00FF00
NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_TOLERANCE=50

# PNGTuber position and size settings
NEXT_PUBLIC_PNGTUBER_SCALE=1.0
NEXT_PUBLIC_PNGTUBER_OFFSET_X=0
NEXT_PUBLIC_PNGTUBER_OFFSET_Y=0
```

## Preparing PNGTuber Models

PNGTuber models are created using the [MotionPNGTuber](https://github.com/rotejin/MotionPNGTuber) tool.

Each model should be placed in the `public/pngtuber/{model name}/` directory with the following structure:

```
public/pngtuber/{model name}/
├── loop_mouthless_h264.mp4    # Mouthless video file (required)
├── mouth_track.json           # Mouth position tracking data (required)
└── mouth/                     # Mouth parts image folder (required)
    ├── closed.png             # Closed mouth (required)
    ├── open.png               # Open mouth (required)
    ├── half.png               # Half-open mouth (optional)
    ├── e.png                  # "e" mouth shape (optional)
    └── u.png                  # "u" mouth shape (optional)
```

### Required Files

- **Video file**: A mouthless video in `*_mouthless_h264.mp4` format. H264 encoding is recommended
- **Tracking data**: `mouth_track.json` - A JSON file containing mouth position information for each frame
- **Mouth part images**: At minimum `closed.png` and `open.png` are required in the `mouth/` folder

### Setup Steps

1. Create assets using [MotionPNGTuber](https://github.com/rotejin/MotionPNGTuber)
2. Place the created folder in the `public/pngtuber` directory
3. Select the PNGTuber model in the application

::: tip
By adding more mouth part images (`half.png`, `e.png`, `u.png`), you can achieve more natural lip syncing.
:::

## Selecting Models

PNGTuber models available in the application can be selected from a dropdown menu. The model switches in real-time when selected.

## Lip Sync Sensitivity

PNGTuber lip sync sensitivity can be adjusted with the environment variable `NEXT_PUBLIC_PNGTUBER_SENSITIVITY`. Values can be set in the range of 0 to 100. Higher values make the mouth respond to smaller audio inputs.

## Position and Size Adjustment

PNGTuber display position and size can be adjusted with the following environment variables:

- **Scale** (`NEXT_PUBLIC_PNGTUBER_SCALE`): Model display size (default: 1.0)
- **X Offset** (`NEXT_PUBLIC_PNGTUBER_OFFSET_X`): Horizontal position adjustment
- **Y Offset** (`NEXT_PUBLIC_PNGTUBER_OFFSET_Y`): Vertical position adjustment

## Chroma Key Feature

When using video assets, the chroma key feature can make specific colors transparent. Green (#00FF00) is set as the default transparent color.

- **Enable** (`NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_ENABLED`): Toggle chroma key feature on/off
- **Transparent Color** (`NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_COLOR`): Color to make transparent (HEX color code)
- **Tolerance** (`NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_TOLERANCE`): Color tolerance range (0-100)

## Notes About Models

- PNGTuber is a simpler display method compared to VRM and Live2D, so it is lightweight in operation
- It has a lip sync feature that automatically switches mouth parts based on audio volume
- If you want to make the video background transparent, use the chroma key feature
