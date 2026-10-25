---
name: "余烬牌途"
description: "以冒险者手札为视觉世界的原创奇幻单人卡牌游戏"
colors:
  paper: "#f5f0e6"
  ground: "#e9e4d9"
  ink: "#263a32"
  muted: "#596454"
  line: "#d4ccba"
  forest: "#243f35"
  forest-dark: "#192e27"
  red: "#a74631"
  ochre: "#c29651"
  ochre-ink: "#7b5724"
  cream: "#f1e7d0"
  forest-hover: "#355747"
  card-selected: "#fbf7ec"
  player-health: "#b9c7a2"
  enemy-health: "#ce936c"
typography:
  display:
    fontFamily: "TravelSerif, 'Noto Serif SC', 'Songti SC', SimSun, serif"
    fontSize: "29px"
    fontWeight: 650
    letterSpacing: "0.12em"
  headline:
    fontFamily: "TravelSerif, 'Noto Serif SC', 'Songti SC', SimSun, serif"
    fontSize: "24px"
    fontWeight: 650
    letterSpacing: "0.06em"
  character:
    fontFamily: "TravelSerif, 'Noto Serif SC', 'Songti SC', SimSun, serif"
    fontSize: "17px"
    fontWeight: 550
    letterSpacing: "0.04em"
  title:
    fontFamily: "TravelSerif, 'Noto Serif SC', 'Songti SC', SimSun, serif"
    fontSize: "15px"
    fontWeight: 650
  body:
    fontFamily: "'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "14px"
  card-body:
    fontFamily: "'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "11px"
    lineHeight: 1.75
  label:
    fontFamily: "'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "11px"
rounded:
  health: "2px"
  button: "7px"
  toast: "8px"
  card: "12px"
  panel: "16px"
  circular: "50%"
spacing:
  card-gap: "10px"
  card-inset: "6px"
  button-block: "12px"
  button-inline: "20px"
  panel-inset: "24px"
  desktop-gutter: "48px"
  mobile-gutter: "20px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.cream}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.forest-hover}"
    textColor: "{colors.cream}"
  button-primary-disabled:
    backgroundColor: "#cdd0c1"
    textColor: "#4d5949"
  button-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "10px 16px"
  button-text:
    textColor: "{colors.ink}"
    padding: "8px"
  button-icon:
    textColor: "{colors.ink}"
    rounded: "{rounded.circular}"
    width: "40px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "14px 12px 11px"
    width: "145px"
  card-selected:
    backgroundColor: "{colors.card-selected}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  battlefield:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.cream}"
    rounded: "{rounded.panel}"
  intent:
    backgroundColor: "#f2e8d3"
    textColor: "#703f2a"
    rounded: "{rounded.button}"
    padding: "7px 12px"
  dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "24px"
  health-track:
    backgroundColor: "#ffffff1b"
    rounded: "{rounded.health}"
    height: "4px"
---

# Design System: 余烬牌途

## Overview

**Creative North Star: "冒险者手札"**

这是玩家带进雾林的一本温暖手札。米白纸张承载路线、卡牌和笔记，墨绿战场收拢角色与局势，朱红提示剑术和需要注意的动作。画面保留桌面卡牌的触感，同时让生命、能量、敌人意图和牌面说明先被读懂。

宋体承担故事与卡名，清晰的无衬线字体承担操作和数值。插图使用内置 imagegen 生成的原创奇幻角色图集；符文、剑术和工具图标采用一致笔画的内联 SVG。用户已确认温暖、清晰的方向；荧光、玻璃面板与渐变标题不属于这个世界。

**Key Characteristics:**

- 温暖纸面与深绿战场形成清晰的区域分工。
- 宋体叙事、无衬线操作，数值保持稳定可读。
- 卡牌有细边框、内框与短促的抬升反馈。
- 手机保持完整出牌流程，手牌可以横向滚动。

## Colors

以森林、纸张与余火组织颜色。数值以 frontmatter 为准；以下只说明角色，不另建一套色值。

### Primary

- **雾林深绿**（forest）：战场、主要出牌按钮、当前路线节点、卡牌费用底色与选牌轮廓。
- **林影**（forest-dark）：短暂反馈消息的深色底面。
- **林间亮面**（forest-hover）：主要按钮的悬停反馈。

### Secondary

- **余火朱红**（red）：品牌符号、章节标记、位置菱形、键盘焦点。攻击牌另有同色系费用与插图色。
- **暖赭金**（ochre）：装饰性色彩与选择高亮的来源。
- **深赭墨**（ochre-ink）：纸面护符图标和关键恢复数值。保留现有深色文字，不能用装饰赭金替换。

### Tertiary

- **草木生命**（player-health）：玩家生命条。
- **赤陶生命**（enemy-health）：敌人生命条。双方同时显示实际生命数值，不单靠色彩区分。

### Neutral

- **米白纸张**（paper）：卡牌、弹窗、奖励与休憩面板。
- **手札底纸**（ground）：页面背景与手机底部操作栏。
- **林墨**（ink）：纸面主要文字。
- **次级草墨**（muted）：说明、记录、进度与辅助文字。
- **纸页压线**（line）：分隔线、边界与路线连接线。
- **暖奶油**（cream）：深绿表面上的文字。
- **选中亮纸**（card-selected）：被选中的卡牌底色。

**The Readable Ink Rule.** 纸面辅助文字使用次级草墨，护符的文字性赭色使用深赭墨；不要把它们替换回较浅的早期颜色。

## Typography

**Display Font:** TravelSerif，随后回退至 Noto Serif SC、Songti SC、SimSun、serif。

**Body Font:** Segoe UI、PingFang SC、Microsoft YaHei、sans-serif。

TravelSerif 是项目本地自托管的 Noto Serif SC 子集（`dist/assets/travel-serif.woff2`），声明可变字重（100–900）与 `font-display: swap`。字体许可证随资源保存；不要改成远程字体请求。当前没有独立等宽字体角色。

### Hierarchy

- **Display:** 品牌标题使用 display；桌面为默认值，手机（≤760px）缩为（25px），窄手机（≤390px）缩为（22px）。
- **Headline:** 旅程标题使用 headline；≤1050px 为（22px）。阶段面板另用宋体（28px / 650），手机为（25px）；弹窗标题为（22px / 650）。
- **Character:** 角色名称使用 character，手机为（15px），窄手机为（14px）。
- **Title:** 卡名使用 title；手机主手牌仍为（15px），奖励卡名为（13px）。牌名不换行。
- **Body:** 页面基础字号使用 body。卡牌说明使用 card-body，手机主手牌覆盖为（12px / 1.65）；手机奖励牌说明保持（11px）。
- **Label:** 状态、进度和工具辅助信息以 label 为主。生命数值（13px）与能量数字（24px，手机23px）使用等宽数字特性。

**The Story and Action Rule.** 宋体用于故事、标题、卡名和能量标记；操作与效果说明使用无衬线字体，保留明确的实际数值。

## Layout

桌面采用居中的画幅（最大宽1344px），左右内边距（48px）。主区为旅程侧栏（184px）与自适应战斗区两列，列间距（45px），顶部间距（32px）。战场、记录、手牌和出牌栏按战斗阅读顺序纵向排列。

现有响应式断点由 CSS 的最终级联决定：

| 条件 | 实际布局行为 |
| --- | --- |
| ≥1250px | 卡牌宽154px，手牌居中，角色间距74px。 |
| ≤1050px | 页边距28px，侧栏154px，列距26px，卡宽137px；隐藏品牌副标题、选中说明与快捷键提示。 |
| ≤760px | 单列；侧栏转为战场上方横向五站路线，笔记与护符收起；页边距20px、页眉64px、战场最小高290px，角色精灵148px；卡宽131px、最小高186px。 |
| ≤390px | 页边距14px，卡宽125px，品牌22px；角色精灵仍为148px。 |

手机手牌容器保留横向滚动与邻近吸附，最小高度（220px）；不要强行把全部手牌压进屏宽。底部操作栏在手机使用 sticky，底部安全区通过 `env(safe-area-inset-bottom)` 留白。弹窗宽度为（min(680px, calc(100% - 30px))），最大高度（85dvh）；牌组弹窗在手机为两列。奖励仍是三选一，必要时容器允许横向滚动。

## Elevation & Depth

这是有触感的纸面层次。边线和内框定义卡牌，低幅阴影将它们从底纸上分开。战场只用低对比环境亮面；角色使用投影。弹窗通过遮罩获得明确层级，不使用玻璃模糊。

### Shadow Vocabulary

- **战场：** `0 12px 26px -20px #1b342685`。
- **卡牌静止：** `0 5px 8px -6px #313f3299`。
- **选中卡牌：** `0 8px 13px -9px #213f32`。
- **意图标签：** `0 3px 10px #10241d40`。
- **弹窗：** `0 18px 65px #12271a55`；遮罩为 `#15251dc2`。
- **手机操作栏：** `0 -10px 14px -14px #263a3260`。
- **短暂消息：** `0 6px 18px #1b322650`。
- **角色投影：** `drop-shadow(0 8px 9px #071b2650)`。

**The Tactile Selection Rule.** 普通手牌在可悬停设备上移5px，选中卡上移8px并显示底部菱形；选中必须同时可由轮廓和 `aria-pressed` 识别。

## Shapes

大面板使用 panel 圆角，卡牌使用 card 圆角，按钮和意图标签使用 button 圆角。卡牌内框距外边（6px），内框圆角（7px）；费用徽章使用顶部轻圆、底部较深的盾牌轮廓（5px 5px 10px 10px）。路线节点和工具按钮为圆形，菱形用于符文、当前位置与选牌指示。

边线保持纤细（1px）；全局 SVG 以（20px）为基准，空心描边、圆角线端与连接，默认线宽（1.6）。卡牌插图线宽（1.25），品牌与能量图标各有既定细线覆盖。

## Components

### Buttons

主按钮是有分量的深绿纸印，次按钮是描边操作。主、次按钮最小高度（44px）；主按钮悬停变亮，按下下移（1px）。无可打出的卡牌、能量不足或结算锁定时，主按钮显示相应文字并禁用。工具按钮使用文字或圆形图标形式，音效默认关闭且通过 `aria-pressed` 表达状态。

焦点使用朱红（2px）外轮廓，默认外偏移（5px），卡牌为（2px）。短暂状态切换采用（0.2s）；不为触屏强加悬停选择。

### Cards / Containers

手牌是可点击按钮，查看牌堆时使用不可操作的 article；保留牌名、费用、类型、效果与品质。剑术、技艺、符文的费用与图标有各自色彩，但效果必须写在牌面上。能量不足的卡牌变为灰纸，仍允许选中查看，实际打出按钮禁用。

当前交互为轻触选牌，再点击“打出”；数字键可选牌，Enter 出牌，空格结束回合。奖励卡点击后加入牌组；休憩面板提供恢复或精炼，精炼弹窗显示强化后的卡牌效果。牌堆弹窗按费用展示，不宣称抽取顺序。

### Navigation

五站路线显示当前、已完成和未到达状态。当前节点为实心森林绿，完成节点显示勾形 SVG。桌面纵向排列，手机在战场上方横排。页眉工具导航持续提供牌组、音效与帮助；帮助同时提供重新启程入口。

### Enemy Intent and Health

意图为奶油色标签，包含 SVG、动作名和实际数值；攻击、防御、蓄力有不同文字与颜色。战场底部用文字解释即将受到的伤害或效果。双方生命同时提供数值、比例条和带实时范围的 meter 语义；护甲、灼烧和蓄势按实际游戏状态显示。

### Battle Illustration and Feedback

本地图集（`dist/assets/characters.png`）来自 imagegen；CSS 使用（300% 200%）的三列两行布局与六个位置类，不使用远程插图。角色有可读的图像名称。图标来自 app.js 的内联 SVG 路径，不能换成文字字符或表情。

出牌反馈约（0.3s），受击约（0.38s），伤害浮字约（0.8s）；统一弹性缓出为 `cubic-bezier(.16,1,.3,1)`。生命条按（0.4s）变换比例。系统偏好减少动态时，关闭动画、过渡与平滑滚动，隐藏伤害浮字；实际数值与记录仍保留。短促音效需玩家主动开启。

### Dialogs and Status

帮助、牌组、战斗记录和确认使用原生 dialog，标题关联清晰；点击遮罩外缘可以关闭。阶段面板与战斗记录提供 polite live region，短暂消息使用 status。进度文字说明当前浏览器存档；失败时显示明确的保存限制。这里记录现有行为，不作尚未测量的性能或跨设备同步承诺。

## Do's and Don'ts

### Do:

- **Do** 保留“冒险者手札”的温暖纸面、墨绿战场与余火朱红。
- **Do** 用实际文字说明敌人意图、牌效与数值，颜色只作辅助。
- **Do** 使用自托管 TravelSerif 和一致笔画的内联 SVG。
- **Do** 保留手机手牌横向滚动、可见出牌操作与减少动态支持。
- **Do** 以 CSS 最终级联为准，尤其保留手机卡牌正文12px和148px角色精灵。

### Don't:

- **Don't** 引入荧光配色、玻璃面板或渐变标题。
- **Don't** 用较浅的旧辅助墨色替换 muted，或用装饰赭金承担纸面关键文字。
- **Don't** 隐藏牌效文字，只留下插图、颜色或动效。
- **Don't** 把 CSS 组件预览误写成新的游戏功能或性能承诺。

