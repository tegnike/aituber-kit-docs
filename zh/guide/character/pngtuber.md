# PNGTuber设置

## 概述

PNGTuber是一种结合视频和口型同步的角色显示方式。无需准备VRM或Live2D等3D/2D模型，只需视频素材和嘴部图片即可显示角色。

**环境变量**:

```bash
# PNGTuber模型的路径
NEXT_PUBLIC_SELECTED_PNGTUBER_PATH=/pngtuber/nike01

# PNGTuber口型同步灵敏度（0-100）
NEXT_PUBLIC_PNGTUBER_SENSITIVITY=50

# PNGTuber色度键设置
NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_ENABLED=false
NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_COLOR=#00FF00
NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_TOLERANCE=50

# PNGTuber位置和大小设置
NEXT_PUBLIC_PNGTUBER_SCALE=1.0
NEXT_PUBLIC_PNGTUBER_OFFSET_X=0
NEXT_PUBLIC_PNGTUBER_OFFSET_Y=0
```

## 准备PNGTuber模型

PNGTuber模型使用 [MotionPNGTuber](https://github.com/rotejin/MotionPNGTuber) 工具创建素材。

每个模型按以下结构放置在 `public/pngtuber/{模型名}/` 目录中：

```
public/pngtuber/{模型名}/
├── loop_mouthless_h264.mp4    # 无嘴视频文件（必需）
├── mouth_track.json           # 嘴部位置跟踪数据（必需）
└── mouth/                     # 嘴部图片文件夹（必需）
    ├── closed.png             # 闭合的嘴（必需）
    ├── open.png               # 张开的嘴（必需）
    ├── half.png               # 半张开的嘴（可选）
    ├── e.png                  # "e"口型（可选）
    └── u.png                  # "u"口型（可选）
```

### 必需文件

- **视频文件**: `*_mouthless_h264.mp4` 格式的无嘴视频。推荐使用H264编码
- **跟踪数据**: `mouth_track.json` - 包含每帧嘴部位置信息的JSON文件
- **嘴部图片**: `mouth/` 文件夹中至少需要 `closed.png` 和 `open.png`

### 设置步骤

1. 使用 [MotionPNGTuber](https://github.com/rotejin/MotionPNGTuber) 创建素材
2. 将创建的文件夹放置在 `public/pngtuber` 目录中
3. 在应用程序中选择PNGTuber模型

::: tip
通过增加嘴部图片（`half.png`、`e.png`、`u.png`），可以实现更自然的口型同步。
:::

## 选择模型

应用程序中可用的PNGTuber模型可以从下拉菜单中选择。选择后，模型会实时切换。

## 口型同步灵敏度

PNGTuber的口型同步灵敏度可以通过环境变量 `NEXT_PUBLIC_PNGTUBER_SENSITIVITY` 调整。值的范围为0到100。值越高，即使是较小的音频输入也会触发口型同步。

## 位置和大小调整

PNGTuber的显示位置和大小可以通过以下环境变量调整：

- **缩放** (`NEXT_PUBLIC_PNGTUBER_SCALE`): 模型的显示大小（默认: 1.0）
- **X轴偏移** (`NEXT_PUBLIC_PNGTUBER_OFFSET_X`): 水平方向的位置调整
- **Y轴偏移** (`NEXT_PUBLIC_PNGTUBER_OFFSET_Y`): 垂直方向的位置调整

## 色度键功能

使用视频素材时，可以通过色度键功能使特定颜色透明。默认透明色设置为绿色（#00FF00）。

- **启用** (`NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_ENABLED`): 色度键功能的开/关
- **透明色** (`NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_COLOR`): 要透明的颜色（HEX颜色代码）
- **容差** (`NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_TOLERANCE`): 颜色容差范围（0-100）

## 关于模型的注意事项

- PNGTuber与VRM和Live2D相比是更简单的显示方式，因此运行更轻量
- 具有根据音频音量自动切换嘴部图片的口型同步功能
- 如果要使视频素材的背景透明，请使用色度键功能
