# 使用技巧

## 概述

本页面介绍了更有效地使用AITuberKit的提示和技巧。通过了解设置界面中可能难以找到的功能和舒适使用的技术，您可以扩展AITuberKit的可能性。

## 页面重新加载时始终优先使用环境变量的设置

在AITuberKit中，您可以选择页面重新加载时是优先使用环境变量，还是优先使用在屏幕上更改的值。<br>
初始设置中，屏幕上更改的值优先。<br>
如果要优先使用环境变量，请在以下环境变量中指定 `true`。

```
NEXT_PUBLIC_ALWAYS_OVERRIDE_WITH_ENV_VARIABLES="true"
```

## 更改颜色主题

AITuberKit的颜色主题可以通过编辑`src/styles/themes.css`文件中的`default`设置轻松更改。该文件定义了应用程序中使用的颜色。

只需更改这些颜色代码就可以刷新应用程序的整体外观。

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

![更改颜色主题](/images/usage-tips_lfsd4.png)

:::tip
更改颜色设置可能看起来有点复杂，但借助AI助手很容易完成。例如，只需向AI请求"请将此颜色主题更改为单色"，就能获得适当的颜色代码建议。AI还可以帮助创建自定义颜色主题或微调现有主题。
:::
