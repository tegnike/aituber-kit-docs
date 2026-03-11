# PNGTuberの設定

## 概要

PNGTuberは動画とリップシンクを組み合わせたキャラクター表示方式です。VRMやLive2Dのような3D/2Dモデルを用意しなくても、動画素材と口パーツの画像だけでキャラクターを表示できます。

**環境変数**:

```bash
# PNGTuberモデルのパス
NEXT_PUBLIC_SELECTED_PNGTUBER_PATH=/pngtuber/nike01

# PNGTuberリップシンク感度（0-100）
NEXT_PUBLIC_PNGTUBER_SENSITIVITY=50

# PNGTuberクロマキー設定
NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_ENABLED=false
NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_COLOR=#00FF00
NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_TOLERANCE=50

# PNGTuber位置・サイズ設定
NEXT_PUBLIC_PNGTUBER_SCALE=1.0
NEXT_PUBLIC_PNGTUBER_OFFSET_X=0
NEXT_PUBLIC_PNGTUBER_OFFSET_Y=0
```

## PNGTuberモデルの準備

PNGTuberモデルは [MotionPNGTuber](https://github.com/rotejin/MotionPNGTuber) ツールを使用してアセットを作成します。

各モデルは `public/pngtuber/{モデル名}/` ディレクトリに以下の構成で配置します：

```
public/pngtuber/{モデル名}/
├── loop_mouthless_h264.mp4    # 口なし動画ファイル（必須）
├── mouth_track.json           # 口の位置トラッキングデータ（必須）
└── mouth/                     # 口パーツ画像フォルダ（必須）
    ├── closed.png             # 閉じた口（必須）
    ├── open.png               # 開いた口（必須）
    ├── half.png               # 半開きの口（任意）
    ├── e.png                  # 「え」の口（任意）
    └── u.png                  # 「う」の口（任意）
```

### 必須ファイル

- **動画ファイル**: `*_mouthless_h264.mp4` 形式の口なし動画。H264エンコードが推奨されます
- **トラッキングデータ**: `mouth_track.json` - フレームごとの口の位置情報を含むJSONファイル
- **口パーツ画像**: `mouth/` フォルダ内に最低限 `closed.png` と `open.png` が必要です

### セットアップ手順

1. [MotionPNGTuber](https://github.com/rotejin/MotionPNGTuber) を使用してアセットを作成します
2. 作成したフォルダを `public/pngtuber` ディレクトリに配置します
3. アプリケーション上でPNGTuberモデルを選択します

::: tip
口パーツ画像を増やすことで（`half.png`、`e.png`、`u.png`）、より自然な口パクを実現できます。
:::

## モデルの選択

![PNGTuber設定](/images/pngtuber_k4m2s.webp)

アプリケーション内で利用可能なPNGTuberモデルは、ドロップダウンメニューから選択できます。選択するとリアルタイムでモデルが切り替わります。

## リップシンク感度

PNGTuberのリップシンク感度は、環境変数 `NEXT_PUBLIC_PNGTUBER_SENSITIVITY` で調整できます。値は0から100の範囲で設定可能です。値が高いほど、小さな音声入力でも口パクが反応するようになります。

## 位置・サイズの調整

PNGTuberの表示位置とサイズは以下の環境変数で調整できます：

- **スケール** (`NEXT_PUBLIC_PNGTUBER_SCALE`): モデルの表示サイズ（デフォルト: 1.0）
- **X座標オフセット** (`NEXT_PUBLIC_PNGTUBER_OFFSET_X`): 水平方向の位置調整
- **Y座標オフセット** (`NEXT_PUBLIC_PNGTUBER_OFFSET_Y`): 垂直方向の位置調整

## クロマキー機能

動画素材を使用する場合、クロマキー機能で特定の色を透過させることができます。緑色（#00FF00）がデフォルトの透過色として設定されています。

- **有効化** (`NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_ENABLED`): クロマキー機能のオン/オフ
- **透過色** (`NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_COLOR`): 透過させる色（HEXカラーコード）
- **許容値** (`NEXT_PUBLIC_PNGTUBER_CHROMA_KEY_TOLERANCE`): 色の許容範囲（0-100）

## モデルについての注意点

- PNGTuberはVRMやLive2Dと比べてシンプルな表示方式のため、動作が軽量です
- 音声の音量に応じて口パーツが自動的に切り替わるリップシンク機能があります
- 動画素材の背景を透過させたい場合は、クロマキー機能を活用してください
