# 埋め込みウィジェット

## 概要

埋め込みウィジェットは、AITuberKitの会話画面を外部サイトへ `iframe` として表示する機能です。ブログ、LP、会員サイトなどにキャラクターとの対話画面を配置できます。

- `/embed` はデフォルトの埋め込みIDを使用します。
- `/embed/{embedId}` は指定した埋め込みIDの設定を使用します。
- `embed.js` は `data-aituber-kit-embed` を持つ要素を自動検出し、DOM読み込み後に `iframe` を生成します。

## 環境変数

詳細な一覧は[環境変数一覧](/guide/environment-variables)も参照してください。

```bash
# デフォルト埋め込みID / Default embed ID
NEXT_PUBLIC_AITUBERKIT_DEFAULT_EMBED_ID="default"

# 埋め込みIDごとの公開設定（JSON） / Public settings by embed ID (JSON)
# allowedOriginsを指定しない場合は任意のサイトで表示可能 /
# When allowedOrigins is omitted, the embed can be shown on any site.
NEXT_PUBLIC_AITUBERKIT_EMBEDS='{"default":{"characterName":"ニケちゃん","modelType":"vrm","selectedVrmPath":"/vrm/nikechan_v2.vrm","showAssistantText":true,"showCharacterName":true}}'
```

`NEXT_PUBLIC_AITUBERKIT_EMBEDS` は埋め込みIDをキーにしたJSONです。`default` は `/embed` または未指定時のフォールバックとして使われます。

```json
{
  "default": {
    "characterName": "ニケちゃん",
    "modelType": "vrm",
    "selectedVrmPath": "/vrm/nikechan_v2.vrm",
    "showAssistantText": true,
    "showCharacterName": true,
    "allowedOrigins": ["https://example.com"]
  },
  "support": {
    "characterName": "サポートAI",
    "systemPrompt": "あなたはサポート担当のAIです。",
    "modelType": "pngtuber",
    "selectedPNGTuberPath": "/pngtuber/nike01",
    "showPresetQuestions": true,
    "presetQuestions": ["料金を教えて", "使い方を教えて"]
  }
}
```

## 基本的な埋め込み

外部サイトに次のHTMLを追加します。`data-base-url` にはAITuberKitを公開しているURLを指定してください。

```html
<div
  data-aituber-kit-embed
  data-base-url="https://your-aituberkit.example.com"
  data-embed-id="default"
  data-height="640"
></div>
<script src="https://your-aituberkit.example.com/embed.js" defer></script>
```

`embed.js` と埋め込みページを同じ配信元で公開している場合、`data-base-url` は省略できます。スクリプトの配置場所から `/embed` のURLを自動解決します。

## JavaScriptからマウントする

任意のタイミングで表示したい場合は、`window.AITuberKitEmbed.mount()` を使います。

```html
<div id="aituber-widget"></div>
<script src="https://your-aituberkit.example.com/embed.js"></script>
<script>
  window.AITuberKitEmbed.mount('#aituber-widget', {
    baseUrl: 'https://your-aituberkit.example.com',
    embedId: 'support',
    height: 640,
    title: 'AITuberKit conversation',
  })
</script>
```

## 指定できるオプション

`data-*` 属性または `mount()` のオプションで指定できます。`data-*` 属性では `data-embed-id` や `data-selected-vrm-path` のようにケバブケースで指定します。

| 項目 | 説明 |
| --- | --- |
| `baseUrl` | AITuberKitの公開URL |
| `embedId` | 使用する埋め込みID |
| `width` | `iframe` の幅。未指定時は `100%` |
| `height` | `iframe` の高さ。数値だけの場合は `px` として扱います |
| `radius` | `iframe` の角丸。未指定時は `12px` |
| `loading` | `iframe` の `loading` 属性。未指定時は `lazy` |
| `title` | `iframe` のタイトル |
| `characterName` | キャラクター名 |
| `userDisplayName` | ユーザー表示名 |
| `systemPrompt` | システムプロンプト |
| `modelType` | `vrm`、`live2d`、`pngtuber` |
| `selectedVrmPath` | VRMモデルのパス |
| `selectedLive2DPath` | Live2Dモデルのパス |
| `selectedPNGTuberPath` | PNGTuberモデルのパス |
| `showAssistantText` | 回答欄の表示設定 |
| `showCharacterName` | キャラクター名の表示設定 |
| `showPresetQuestions` | プリセット質問の表示設定 |
| `presetQuestions` | カンマ区切りのプリセット質問 |
| `colorTheme` | `default`、`cool`、`mono`、`ocean`、`forest`、`sunset` |
| `backgroundImageUrl` | 背景画像URL |

## 公開範囲の制限

`allowedOrigins` を指定すると、指定したオリジンから参照された場合だけ埋め込みを表示します。

```json
{
  "default": {
    "allowedOrigins": ["https://example.com", "https://www.example.com"]
  }
}
```

`allowedOrigins` を省略した場合、任意のサイトで表示できます。`allowedOrigins` を指定している場合、参照元が取得できないアクセスは表示不可になります。

::: warning
`NEXT_PUBLIC_*` の設定とURLクエリはブラウザから参照できます。APIキーなどの秘密情報は入れないでください。公開先を制限したい場合は `allowedOrigins` を設定してください。
:::

## 埋め込み画面で無効化される機能

埋め込み画面では外部サイト上での利用に合わせて、以下の機能が自動的に無効化されます。

- 操作パネル
- クイックメニュー
- 外部指示受け付け
- スライドモード
