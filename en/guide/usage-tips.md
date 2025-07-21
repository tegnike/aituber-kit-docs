# Usage Tips

## Overview

This page introduces tips and techniques for using AITuberKit more effectively. By learning about features that may be difficult to find in the settings screen and techniques for comfortable use, you can expand the possibilities of AITuberKit.

## Setting to Always Prioritize Environment Variables on Page Reload

In AITuberKit, you can choose whether to prioritize environment variables or values changed on the screen when the page is reloaded.<br>
By default, values changed on the screen take priority.<br>
If you want to prioritize environment variables, specify `true` in the following environment variable.

```
NEXT_PUBLIC_ALWAYS_OVERRIDE_WITH_ENV_VARIABLES="true"
```

## Changing the Color Theme

The color theme of AITuberKit can be easily changed by editing the `default` settings in the `src/styles/themes.css` file. This file defines the colors used throughout the application.

Simply changing these color codes can refresh the entire look of the application.

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

![Changing the Color Theme](/images/usage-tips_lfsd4.png)

:::tip
Changing color settings might seem a bit complex, but it's easy with the help of an AI assistant. For example, simply asking the AI "Please change this color theme to monochrome" will get you appropriate color code suggestions. AI can also help with creating custom color themes or fine-tuning existing themes.
:::
