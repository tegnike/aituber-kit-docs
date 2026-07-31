# 基本設定

## 概要

AITuberKitの基本設定について説明します。環境変数による設定方法については[環境変数一覧](/guide/environment-variables)をご覧ください。

## 言語設定

**環境変数**:

```bash
# デフォルト言語の設定（以下のいずれかの値を指定）
# ja: 日本語, en: 英語, ko: 韓国語, zh-CN: 中国語(簡体字), zh-TW: 中国語(繁体字), vi: ベトナム語
# fr: フランス語, es: スペイン語, pt: ポルトガル語, de: ドイツ語
# ru: ロシア語, it: イタリア語, ar: アラビア語, hi: ヒンディー語, pl: ポーランド語, th: タイ語
NEXT_PUBLIC_SELECT_LANGUAGE=en
```

AITuberKitは多言語対応しており、以下の言語から選択できます：

- アラビア語 (Arabic)
- 英語 (English)
- フランス語 (French)
- ドイツ語 (German)
- ヒンディー語 (Hindi)
- イタリア語 (Italian)
- 日本語 (Japanese)
- 韓国語 (Korean)
- ポーランド語 (Polish)
- ポルトガル語 (Portuguese)
- ロシア語 (Russian)
- スペイン語 (Spanish)
- タイ語 (Thai)
- 中国語（簡体字）(Simplified Chinese)
- 中国語（繁体字）(Traditional Chinese)
- ベトナム語 (Vietnamese)

::: warning 注意
日本語以外の言語を選択すると、日本語専用の音声サービス（VOICEVOX、KOEIROMAP、AivisSpeech、Aivis Cloud API）が選択されている場合は、自動的にGoogle音声合成に切り替わります。
:::

## サイトURL

OGP（Open Graph Protocol）やTwitterカードで使用される画像URLのベースURLを設定します。SNSでサイトをシェアした際にプレビュー画像が正しく表示されるようになります。

**環境変数**:

```bash
# サイトURL（OGP・Twitterカードの画像URLに使用）
NEXT_PUBLIC_SITE_URL="https://aituberkit.com"
```

## 英単語読み上げ設定

英単語を日本語で読み上げるかどうかを設定できます。

:::tip
この設定は日本語が選択されている場合のみ表示されます。
:::

**環境変数**:

```bash
# 英単語を日本語で読み上げる設定（true/false）
NEXT_PUBLIC_CHANGE_ENGLISH_TO_JAPANESE=false
```

## 制限モード

制限モードを有効にすると、ファイルのアップロード・削除・更新などの書き込み系操作が無効化されます。Cloudflareなどのサーバーレス環境へのデプロイや、デモ端末での利用時に使用します。

**環境変数**:

```bash
# 制限モードの有効/無効（true/false）
NEXT_PUBLIC_RESTRICTED_MODE="false"
```

制限される機能の詳細は[制限モード](/guide/restricted-mode)を参照してください。

## デモ表示とサブパス公開

`NEXT_PUBLIC_DEMO_MODE` を有効にすると、紹介画面と設定画面にデモ利用時の注意事項を表示します。これはAPIアクセス制御の `AITUBERKIT_SERVER_SECRET_ACCESS_MODE="demo"` とは別の表示設定です。

GitHub Pagesなどのサブパスで公開する場合は、`NEXT_PUBLIC_BASE_PATH` に先頭の `/` を含むベースパスを設定します。

**環境変数**:

```bash
# デモモードの注意表示（true/false）
NEXT_PUBLIC_DEMO_MODE="false"

# サブパス公開時のベースパス（例: /aituber-kit）
NEXT_PUBLIC_BASE_PATH=""
```

## Live2D機能

Live2D機能の有効/無効を切り替えます。Live2D機能を使用するには、Live2D社とのライセンス契約が必要です。デフォルトでは無効になっています。

**環境変数**:

```bash
# Live2D機能の有効/無効（true/false）
NEXT_PUBLIC_LIVE2D_ENABLED="false"
```

::: warning 注意
Live2D機能を使用するには、Live2D Inc.とのライセンス契約が必要です。ライセンス契約なしでの商用利用はできません。
:::

## 背景画像の設定

**環境変数**:

```bash
# 背景画像のパス
NEXT_PUBLIC_BACKGROUND_IMAGE_PATH=/backgrounds/bg-c.png
```

アプリケーションの背景画像をカスタマイズすることができます。「背景画像をアップロード」ボタンをクリックして、お好みの画像をアップロードしてください。

一度アップロードした画像は、設定画面からいつでも選択できるようになります。

環境変数でデフォルトの背景画像を指定することも可能です。

::: tip
グリーンバックを選択することも可能です。環境変数で設定する場合は、`green` と指定してください。
:::

## 回答欄を表示する

会話履歴が表示されていないときに、AIの回答テキストを画面上に表示するかどうかを設定できます。

**環境変数**:

```bash
# 回答欄の表示設定（true/false）
NEXT_PUBLIC_SHOW_ASSISTANT_TEXT=true

# 回答欄のスタイル（bubble: ガラスバブル, borderless: 縁無し字幕風）
NEXT_PUBLIC_ASSISTANT_TEXT_STYLE="borderless"
```

![回答欄を表示する](/images/basic_3efh5.webp)

回答欄を表示する場合は、ガラスバブルまたは縁無し字幕風のスタイルを選択できます。

## 会話ログの表示

会話ログのデザインと左右の表示位置を設定できます。画面端からの距離は外縁をドラッグして調整でき、環境変数で初期値を指定することもできます。

```bash
# チャットログの表示位置（left/right）
NEXT_PUBLIC_CHAT_LOG_POSITION="right"

# チャットログのデザイン（glass/classic）
NEXT_PUBLIC_CHAT_LOG_STYLE="classic"

# 画面端からの距離（px、空欄でデザイン標準値）
NEXT_PUBLIC_CHAT_LOG_EDGE_OFFSET=
```

## 回答欄にキャラクター名を表示する

回答欄にキャラクター名を表示するかどうかを設定できます。

**環境変数**:

```bash
# キャラクター名表示設定（true/false）
NEXT_PUBLIC_SHOW_CHARACTER_NAME=true
```

## 操作パネル表示

画面右上に操作パネルを表示するかどうかを設定できます。

:::tip ヒント
設定画面の表示・非表示ショートカットは、下の設定で変更できます。初期値は Mac では `Cmd + .`、Windows・Linuxでは `Ctrl + .` です。
スマホ・タブレットでは画面左上を長押し（約1秒）して表示できます。外付けキーボードを接続している場合は、設定したショートカットも使用できます。
:::

**環境変数**:

```bash
# 操作パネル表示設定（true/false）
NEXT_PUBLIC_SHOW_CONTROL_PANEL=true

# 設定画面の表示・非表示ショートカット（ModはCtrlまたはCmd）
NEXT_PUBLIC_SETTINGS_TOGGLE_SHORTCUT=Mod+Period
```

### 設定画面の表示・非表示ショートカット

![設定画面の表示・非表示ショートカット](/images/basic_shortcut_k7m2q.webp)

入力欄を選択してから、割り当てたいキーまたはキーの組み合わせを押します。別の操作と同じショートカットは登録できません。「初期設定に戻す」を選ぶと、Macでは `Cmd + .`、Windows・Linuxでは `Ctrl + .` に戻ります。

## カラーテーマ

アプリケーションのカラーテーマを選択できます。選択したテーマは即座に適用されます。

- デフォルト
- モノクロ
- クール
- オーシャン
- フォレスト
- サンセット

![カラーテーマの変更](/images/usage-tips_lfsd4.webp)

```bash
# default, mono, cool, ocean, forest, sunset
NEXT_PUBLIC_COLOR_THEME="default"
```
