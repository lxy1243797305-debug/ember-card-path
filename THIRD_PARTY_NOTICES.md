# 素材与第三方许可

## Noto Serif SC 字体

- 文件：`dist/assets/travel-serif.woff2`。
- 上游：[Google Fonts / Noto Serif SC](https://github.com/google/fonts/tree/main/ofl/notoserifsc)。
- 原始文件：`NotoSerifSC[wght].ttf`。
- 本仓库将字体子集化并转换为 WOFF2，仅包含当前游戏文字；没有修改字形设计。
- 许可：SIL Open Font License 1.1，原文见 [`dist/assets/OFL-NotoSerifSC.txt`](dist/assets/OFL-NotoSerifSC.txt)。
- Copyright 2012 Google Inc. All Rights Reserved.

字体保持其独立许可，不改用项目的 MIT 许可。

## 角色插画

- 文件：`dist/assets/characters.png`。
- 来源：2026-10-25 使用 OpenAI 内置 imagegen 工具生成的原创奇幻角色图集，3 列 × 2 行。
- 内容：旅人、苔地窃贼、失落甲胄、提灯幽蛾、符石巨像、枯冠守望者。
- 完整生成提示词见 [`ART-PROMPT.md`](ART-PROMPT.md)。
- 随仓库按 MIT 条款提供。

## 图标与音效

`dist/assets/mark.svg` 和界面内联 SVG 为项目原创图形，采用 MIT。音效由 Web Audio 在运行时合成，不包含第三方录音或音乐文件。
