# 制限モード

## 概要

制限モード（Restricted Mode）は、サーバーレス環境（Cloudflare等）へのデプロイや、デモ端末での利用を想定したモードです。ファイルシステムへの書き込みができない環境でも安全に動作するよう、書き込み系の操作を無効化し、読み取り系の操作は静的マニフェストデータで代替します。

**環境変数**:

```bash
# 制限モードの有効/無効（true/false）
NEXT_PUBLIC_RESTRICTED_MODE="false"
```

::: tip
Cloudflareデプロイ時は、ビルドスクリプトにより自動的に `true` に設定されます。
:::

## 使える機能

制限モードでも以下の機能は通常どおり利用できます。

- **AIチャット**: すべてのAIプロバイダーとの会話（OpenAI、Anthropic、Google等）
- **音声合成（TTS）**: すべての音声合成エンジン（VOICEVOX、ElevenLabs、Google TTS等）
- **音声入力（STT）**: ブラウザ音声認識、Whisper
- **キャラクター表示**: VRM、Live2D、PNGTuberの表示・アニメーション
- **キャラクター選択**: プリセットからのVRM/Live2D/PNGTuberモデル選択
- **背景選択**: プリセットからの背景画像選択
- **スライド再生**: プリセットスライドの閲覧・再生
- **YouTube連携**: YouTubeコメント取得・配信
- **リアルタイムAPI**: OpenAI Realtime APIによるリアルタイム会話
- **設定の保存**: ブラウザのローカルストレージへの設定保存
- **テーマ変更**: カラーテーマの切り替え

## 制限される機能一覧

### 基本設定

| 機能 | 制限内容 |
|------|----------|
| 背景画像アップロード | アップロードボタンが無効化 |
| 背景画像選択 | プリセット画像のみ選択可能（アップロード不可） |

### キャラクター設定

| 機能 | 制限内容 |
|------|----------|
| VRMファイルのアップロード | 「VRMを開く」ボタンが無効化 |

::: info
VRM、Live2D、PNGTuberのモデル**選択**は可能です。プリセットとして登録されているモデルの中から選択できます。
:::

### 合成音声設定

| 機能 | 制限内容 |
|------|----------|
| VOICEVOXスピーカーリスト更新 | 更新ボタンが無効化 |
| AivisSpeechスピーカーリスト更新 | 更新ボタンが無効化 |

### スライド設定

| 機能 | 制限内容 |
|------|----------|
| スライド変換（PDF→スライド） | 変換UIが非表示 |
| スライドエディタ | テキストエリア・保存・元に戻すボタンが無効化 |

::: info
スライドの**選択・閲覧・再生**は可能です。プリセットとして登録されているスライドフォルダから選択できます。
:::

### 画像設定

| 機能 | 制限内容 |
|------|----------|
| 画像アップロード | アップロードボタンが無効化 |
| 画像削除 | 削除ボタンが無効化 |

### 記憶設定

| 機能 | 制限内容 |
|------|----------|
| 記憶データのバックアップファイル選択 | ファイル選択ボタンが無効化 |
| 記憶データの復元 | 復元ボタンが無効化 |

### その他の設定

| 機能 | 制限内容 |
|------|----------|
| 外部からの指示を受け付ける（Message Receiver） | トグルが無効化、APIとポーリングも停止 |
| 外部連携モード（WebSocket） | トグルが無効化、WebSocket接続も停止 |

### ポーズ機能

| 機能 | 制限内容 |
|------|----------|
| ポーズのY軸回転調整・保存 | 調整パネルが非表示 |

## 技術的な詳細

### 読み取り系API

制限モードでは、ファイルシステムにアクセスできないため、以下のAPIは静的マニフェストデータ（`assetManifest.json`）から応答を返します。正常にデータを返すため、モデルやスライドの選択は問題なく動作します。

| API | 返却データ |
|-----|-----------|
| `/api/get-vrm-list` | VRMモデル一覧 |
| `/api/get-background-list` | 背景画像一覧 |
| `/api/get-live2d-list` | Live2Dモデル一覧 |
| `/api/get-pngtuber-list` | PNGTuberモデル一覧 |
| `/api/get-pose-list` | ポーズ一覧 |
| `/api/getSlideFolders` | スライドフォルダ一覧 |
| `/api/getSupplement` | スライド補足情報 |
| `/api/convertMarkdown` | スライドHTML/CSS |
| `/api/get-image-list` | 画像一覧 |

### 書き込み系API

以下のAPIは制限モードでは403エラーを返します。対応するUI側のボタン・トグルも無効化されているため、通常の操作でこのエラーに遭遇することはありません。

| API | 操作内容 |
|-----|----------|
| `/api/upload-vrm-list` | VRMファイルアップロード |
| `/api/upload-background` | 背景画像アップロード |
| `/api/upload-image` | 画像アップロード |
| `/api/delete-image` | 画像削除 |
| `/api/convertSlide` | PDF→スライド変換 |
| `/api/updateSlideData` | スライドデータ更新 |
| `/api/update-pose-rotation` | ポーズ回転保存 |
| `/api/update-aivis-speakers` | AivisSpeechスピーカー更新 |
| `/api/update-voicevox-speakers` | VOICEVOXスピーカー更新 |
| `/api/save-chat-log` | チャットログ保存 |
| `/api/messages` | メッセージ送受信（Message Receiver） |

### プリセットデータのカスタマイズ

制限モードで利用可能なプリセットデータは `src/constants/assetManifest.json` で管理されています。デプロイ前にこのファイルを編集することで、制限モードで選択可能なモデルや背景画像をカスタマイズできます。

```json
{
  "vrm": ["model1.vrm", "model2.vrm"],
  "backgrounds": ["bg-1.png"],
  "live2d": [{ "path": "/live2d/model/model.model3.json", "name": "model", ... }],
  "pngtuber": [{ "path": "/pngtuber/model", "name": "model", ... }],
  "poses": [{ "name": "wave", "path": "/poses/wave.json" }],
  "slides": { "folders": ["demo"], ... }
}
```

::: tip
`public/` 配下に対応するアセットファイルも一緒に配置する必要があります。
:::
