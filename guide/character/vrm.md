# VRMの設定

## 概要

VRM（Virtual Reality Model）は3Dキャラクターモデル形式で、AITuberKitではVRMモデルを使用してAIキャラクターを表示することができます。

**環境変数**:

```bash
# 選択するVRMモデルのパス
NEXT_PUBLIC_SELECTED_VRM_PATH=/vrm/default.vrm

# VRMキャラクターの照明強度（0.1-3.0）
NEXT_PUBLIC_LIGHTING_INTENSITY=1.0
```

## VRMモデルの準備

AITuberKitでは、以下のVRMバージョンに対応しています：

- VRM 0.0
- VRM 1.0

VRMモデルを使用するには、以下の手順に従ってください：

1. VRMファイル（.vrm拡張子）を準備します
2. VRMファイルを `public/vrm` ディレクトリに配置します
3. アプリケーション上でVRMモデルを選択します

## モデルの読み込み

### 選択肢からのモデル選択

アプリケーション内で利用可能なVRMモデルは、ドロップダウンメニューから選択できます。選択するとリアルタイムでモデルが切り替わります。

### 新しいVRMモデルのアップロード

「VRMを開く」ボタンをクリックすると、ローカルのVRMファイルをアップロードしてアプリケーションで使用することができます。アップロードしたVRMファイルは自動的に `public/vrm` ディレクトリに保存され、選択肢に追加されます。

## モデルの操作方法

3Dモデルは以下のマウス操作で自由に調整できます：

### 位置・向き・サイズの調整

- **右クリック + ドラッグ**：アバターの位置を移動できます
- **左クリック + ドラッグ**：アバターの向きを回転させることができます
- **マウスホイールのスクロール**：アバターのサイズを拡大・縮小できます

これらの操作を組み合わせることで、画面内のアバターの配置を最適な状態に調整できます。画面の構成に合わせてキャラクターの見え方を自由にカスタマイズしましょう。

### 照明強度

VRMキャラクターの照明強度は、環境変数 `NEXT_PUBLIC_LIGHTING_INTENSITY` で調整できます。値は0.1から3.0の範囲で設定可能です。

## モデルについての注意点

- モデルによっては初期表示時の読み込みに時間がかかる場合があります
- ブラウザの種類やバージョンによって表示が異なる場合があります
- 大きなサイズのVRMファイルはパフォーマンスに影響を与える可能性があります

## VRMモデルのライセンスについて

使用するVRMモデルのライセンスを必ず確認してください。商用利用や再配布が制限されている場合があります。VRMモデルを使用する際は、作者の利用規約に従ってください。
