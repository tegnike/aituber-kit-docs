# GPT-Live-1 音声会話

## 概要

v2.77.0以降では、相手の発話中もマイク入力を続けられるGPT-Live-1の音声会話を利用できます。音声はGPT-Live-1、推論やWeb検索は別のOpenAIモデルが担当します。通常の[リアルタイムAPI](/guide/ai/realtime-api)や、音声入力のみを文字起こしする機能とは別のモードです。

## 設定と会話の開始

1. AI設定でOpenAIを選択し、APIキーを設定します。GPT-Liveへのアクセス権が必要です。
2. 「GPT-Live-1」をONにします。
3. 声、推論モデル、必要に応じてWeb検索を選びます。
4. 会話画面の「会話を開始」を押し、マイクの利用を許可します。
5. 終えるときは「会話を終了」を押します。マイク送信を止め、サーバーからの終了通知を待って切断します。

接続は自動で開始されません。通常の入力フォームを非表示にしていても、GPT-Liveの操作バーは表示されます。

![GPT-Liveの設定](/images/live_settings_g7p2a.webp)

![GPT-Liveの会話バー](/images/live_conversation_m8k4b.webp)

| 設定 | 内容 |
| --- | --- |
| 声 | `marin`（デフォルト）と追加12音声から選択します |
| 推論モデル | `gpt-5.6-terra`（デフォルト）。GPT-LiveのResponses委譲で利用可能なモデルIDを指定します |
| 推論モデルのWeb検索 | デフォルトOFF。ONにすると推論側でWeb検索を利用します |
| システムプロンプト | 既存のキャラクター設定を音声側と推論側の両方へ渡します |

設定の変更は次の接続から反映されます。声の選択肢には公式の分類に基づく女性・男性を併記し、分類未記載の `marin` は「未公表」と表示します。

| 分類 | 声 |
| --- | --- |
| 女性 | quartz、willow、gleam、bossa、delta |
| 男性 | ripple、vesper、stone、meridian、tempo、beacon、cinder |
| 未公表 | marin |

## 会話履歴と上限

接続開始時に「過去のメッセージ保持数」で指定した直近のテキスト発言を渡します。GPT-Liveでは最大128件で、通常モードの設定値は保持されます。画像や音声データそのものは過去の履歴として送りません。

- 履歴の公式上限は合計8,192トークンです。
- システムプロンプトはアプリが追加する指示を含め16,384トークンまでです。
- トークン数と文字数は同じではありません。本文を固定文字数で切り捨てる処理はありません。
- 正確な上限判定はAPIが行います。超過時はエラーを表示するため、履歴件数またはプロンプトを減らして再接続してください。

「会話終了→再接続」では履歴を引き継ぎます。完全に新しい会話にする場合は、**会話終了→会話履歴リセット→会話開始**の順に操作してください。接続中に画面の履歴を消しても、接続中のGPT-Liveの文脈は消えません。システムプロンプトは引き続き適用されます。

## 音声と他の機能

受信した音声を直接再生し、VRM・Live2D・PNGTuberの口パクへ連携します。ユーザーとキャラクターの字幕は別々に会話ログへ追加されます。音声再生がブラウザにブロックされた場合は、表示される再生ボタンを押してください。

通常のTTS・音声認識設定は使用しません。Realtime API、Audioモード、外部連携、スライド、YouTube、自動発話、記憶を用いた通常のチャット処理などを組み合わせた動作とは異なります。競合する入力・自動発話モードを有効にするとGPT-LiveはOFFになります。長期記憶（RAG）はこのモードの履歴に追加されません。

## 環境変数

```bash
# GPT-Live full-duplex voice (OpenAI API key required; backend billed separately)
NEXT_PUBLIC_LIVE_MODE=false
NEXT_PUBLIC_LIVE_VOICE=marin
NEXT_PUBLIC_LIVE_BACKEND_MODEL=gpt-5.6-terra
NEXT_PUBLIC_LIVE_WEB_SEARCH=false
```

会話履歴の初期件数には既存の `NEXT_PUBLIC_MAX_PAST_MESSAGES=10` を使用します。サーバー側のキーは `OPENAI_KEY` または `OPENAI_API_KEY` を使用します。サーバーのキーを利用する場合は、[サーバーシークレットへのアクセス制御](/guide/environment-variables)も設定してください。既定の `AITUBERKIT_SERVER_SECRET_ACCESS_MODE=disabled` のままでは利用できません。

## 課金とエラー

音声は接続時間に応じて課金され、マイクが無音でも時間は進みます。推論とWeb検索は別途課金されます。WebRTC接続作成時の15秒分の初期化料金は、開始後の時間課金に充当されます。

キーの利用拒否、接続失敗、トークン上限超過、推論失敗などは画面に表示します。終了確認を受け取れない場合もローカルのマイクを解放しますが、サーバーでの終了確認・最終利用時間は未確認として表示します。接続障害時の自動再接続は行いません。

公式資料: [GPT-Liveの接続](https://developers.openai.com/api/docs/guides/voice-webrtc?api=live)、[セッションと履歴](https://developers.openai.com/api/docs/guides/live-conversations)、[推論への委譲](https://developers.openai.com/api/docs/guides/live-delegation)。
