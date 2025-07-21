# 活用TIPS

## 概要

AITuberKitをより便利に使いこなすためのヒントやコツを紹介します。設定画面からは見つけにくい機能や、快適に利用するためのテクニックを知ることで、AITuberKitの可能性を広げましょう。

## ページリロード時に常に環境変数を優先する設定

AITuberKitでは、ページリロード時に環境変数を優先するか、画面で変更した値を優先するかを選択できます。<br>
初期設定では、画面で変更した値が優先されます。<br>
環境変数を優先する場合は、以下のようの環境変数で `true` を指定してください。

```
NEXT_PUBLIC_ALWAYS_OVERRIDE_WITH_ENV_VARIABLES="true"
```

## カラーテーマの変更

AITuberKitのカラーテーマは、`src/styles/themes.css`ファイルの`default`の設定を編集することで簡単に変更できます。このファイルには、アプリケーション全体で使用される色が定義されています。

これらの色コードを変更するだけで、アプリケーション全体の見た目を一新できます。

```css
:root {
  --color-primary: #856292;
  --color-primary-hover: #8e76a1;
  --color-primary-press: #988bb0;
  --color-primary-disabled: #6f48694d;
  --color-secondary: #ff617f;
  --color-secondary-hover: #ff849b;
  --color-secondary-press: #ff9eb1;
  --color-secondary-disabled: #ff617f4d;
  --color-text-primary: #514062;
  --color-text-base: #ffffff;
  --color-text-default: #2d3748;
  --color-base-light: #fbe2ca;
  --color-base-dark: #332d2d;
}
```

![カラーテーマの変更](/images/usage-tips_lfsd4.png)

:::tip
色設定の変更は少し複雑に感じるかもしれませんが、AIアシスタントに依頼すると簡単です。例えば「このカラーテーマをモノクロに変更してください」とAIに指示するだけで、適切な色コードを提案してもらえます。カスタムカラーテーマの作成や、既存テーマの微調整にもAIが役立ちます。
:::
