# 故障排除

## 概要

这里总结了在使用AITuberKit时可能遇到的问题及其解决方案。本页面将逐步添加常见错误和问题的原因及处理方法，并基于具体案例详细解释解决方案，以支持您顺利使用软件。

## Windows环境下Chrome或Brave浏览器CPU使用率过高

::: warning 症状
在Windows环境下使用Chrome或Brave浏览器运行AITuberKit时，CPU使用率异常升高至70%，可能会出现卡顿现象。
:::

### 原因

这似乎是Chromium系浏览器与Windows环境之间的兼容性问题。在Mac上使用Chrome时不会发生这种现象。

### 解决方法

**使用Microsoft Edge浏览器**
- Edge浏览器的CPU使用率可控制在15%左右，运行正常
- 您也可以尝试Firefox或Safari等其他浏览器

## AI重复相同的回答

::: warning 症状
AI角色有时会在一个回答中重复相同的内容两次。
:::

### 原因

这很可能是因为AI被之前的回答所影响。

### 解决方法

- 编辑或删除对话历史
- 在AI角色的提示设置中添加不重复相同回答的指示
  - 例如：`请不要重复相同内容进行回答。`

## Live2D模型加载时的TypeError: \_currentFrameNo

::: warning 症状
在AITuberKit中选择自制Live2D模型时，显示以下错误且模型无法渲染。

```text
Unhandled Runtime Error
TypeError: Cannot set properties of undefined (setting '_currentFrameNo')
  at Cubism4InternalModel.updateWebGLContext (...)
  ...
```

:::

### 原因

- `pixi-live2d-display`系列库的已知bug。
- 当模型中没有任何剪切蒙版（ArtMesh ▶ 绘制 ▶ 生成蒙版）时，`_clippingManager`不会被创建而变为`undefined`。
- 在`Cubism4InternalModel.updateWebGLContext`中执行`this._clippingManager._currentFrameNo = ++frame;`时发生TypeError。
- 此外，以Cubism 5格式（.moc3 v4）导出的模型与AITuberKit附带的库不兼容。

### 解决方法

1. 在Live2D Cubism Editor中打开模型。
2. 选择任意ArtMesh，在[检查器] ▶ [绘制] ▶ **生成蒙版**选项中打开。
3. 选择[文件] ▶ [导出] ▶ **模型(.moc3)**，在对话框中指定以下设置进行导出：
   - **SDK**: SDK for Web
   - **版本**: Cubism 4.2（或4.0/4.1）
4. 将输出文件夹放置在`public/live2d/模型名称/`中，并在AITuberKit中重新选择`模型名称.model3.json`。
5. 如需启用口型同步，请在model3.json的**Groups**中添加`LipSync`。

::: tip 提示
只需在眉毛或高光等轻量级网格上添加蒙版即可解决问题。如果想避免视觉影响，也可以创建一个不可见的小网格并为其生成蒙版。
:::

### Live2D设置要点快速参考

| 设置位置                    | 正常运行要点                               | 备注                                             |
| --------------------------- | ------------------------------------------ | ------------------------------------------------ |
| ArtMesh ▶ 绘制 ▶ 生成蒙版 | 至少1个开启                                | 部件任意（眉毛、头发高光等）                     |
| 模型导出                    | **选择SDK for Web / Cubism 4.2或更早版本** | 不支持Cubism 5格式(.moc3 v4)                     |
| model3.json → Groups        | 添加EyeBlink和LipSync                      | 不添加也不会报错，但表情和口型同步功能将无法工作 |

完成上述步骤后，如果AITuberKit能正确渲染模型，则问题解决。
关于Live2D的设置，请参考[这里](character/live2d.md)。
