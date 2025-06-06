# マルチモーダル設定

## 概要

マルチモーダルAIモデルは、テキストだけでなく画像や音声などの複数の情報形式（モダリティ）を理解・処理できるAIモデルです。AITuberKitでは、これらのマルチモーダル機能を活用して、より豊かな対話体験を実現できます。

**環境変数**:

```bash
# マルチモーダル対応のAIサービスを選択
# マルチモーダル対応: openai, anthropic, google, azure
NEXT_PUBLIC_SELECT_AI_SERVICE=openai

# マルチモーダル対応のモデルを選択
NEXT_PUBLIC_SELECT_AI_MODEL=gpt-4o-2024-11-20
```

## 対応モデル

マルチモーダル対応モデルは、以下のようにマークが付いています。

![マルチモーダル対応モデル](/images/ai_vay45.png)

## 使用方法

マルチモーダル機能を活用するには、以下の手順に従ってください：

1. 設定画面で対応するAIサービスとモデルを選択
2. Webカメラや画面共有の有効化（必要に応じて）
3. メッセージを送信

::: warning 注意
マルチモーダル機能は、通常のテキストのみの対話に比べてAPI利用料金が高くなる場合があります。
:::

![マルチモーダルAI画像](/images/ai_k3nfi.png)

### マルチモーダル関連機能の説明

#### 1. マルチモーダル関連ボタン

マルチモーダル対応モデルを選択しているときに表示されます。

- **画面共有ボタン**: 共有する画面を選択できます
- **Webカメラボタン**: 共有するWebカメラを起動します
- **画像アップロードボタン**: 画像をアップロードできます

#### 2. 共有画面/Webカメラの映像

共有している画面またはWebカメラの映像が表示されます。
この映像枠はドラッグで移動させることができます。
また、四隅をクリックしてドラッグすることで、映像の表示領域を変更拡張・縮小することも可能です。

この画面が表示されている状態でメッセージを送信すると、メッセージを送信した時点の画像を含めたメッセージが送信されます。
ただし、この映像の下に画像がある場合、そちらが優先して送信されます。

**映像操作ボタン**:

- **共有画面/カメラ切り替えボタン**: 共有する画面またはWebカメラの映像を切り替えます
- **背景切り替えボタン**: 共有画面またはWebカメラの映像を背景として切り替えます
- **シャッターボタン**: 共有画面またはWebカメラの映像を撮影します

#### 3. 撮影/アップロード画像

撮影した画像またはアップロードした画像が表示されます。
ここに画像が表示されている状態でメッセージを送信すると、この画像を含めたメッセージが送信されます。

**画像アップロード方法**:

- **画像アップロードボタン**: ファイル選択ダイアログから画像を選択
- **ドラッグアンドドロップ**: 画像ファイルをチャット画面にドラッグアンドドロップすることでも画像をアップロードできます
- **撮影機能**: Webカメラや共有画面からシャッターボタンで撮影

::: warning 注意
入力コンテキスト長を最適化するため、APIには最新の画像のみが送信されます。過去の会話で使用した画像は、新しいメッセージ送信時には含まれませんのでご注意ください。
:::

## 制限事項

- 各AIサービスによって、対応する入力形式やファイルサイズに制限があります
- 画像解像度が高すぎると処理が遅くなったり、料金が高くなったりする場合があります
- モデルによっては、画像認識の精度に違いがあります
