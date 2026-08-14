# 展示层 fresh-context 独立审查报告

**审查日期：** 2026-08-09  
**审查范围：** `README.md`、`site/index.html`、`site/styles.css`、`site/app.js`、`book/table-of-contents.md`、`book/README.md`、`docs/research/project-naming-2026-08-09.md`、`docs/research/project-naming-refresh-2026-08-09.md`；为核对状态，补读 `docs/skill-registry.md`、`docs/quality/forward-test-2026-08-09.md` 和相关实验文件。  
**审查类型：** 只读、独立上下文、展示层与证据一致性审查。  
**审查状态：** candidate；不构成浏览器视觉验收、可访问性验收或 production-ready 结论。

> **历史快照说明（2026-08-09 命名刷新后）：** 本报告记录命名迁移前的展示层状态。其关于 `Codex Field Guide`、`From GPT to Codex` 或 `Codex: Learn, Practice, Verify` 的当前名称判断不再作为现行决策依据；现行 reader-facing 名称见 [`ADR-0034`](../adr/0034-prysai-llm-playbook-reader-identity.md)。

## 结论摘要

展示页整体能正确传达项目的核心性质：它是一个围绕 Codex 的学习、实验、证据和团队工作流系统，不是 Skill 目录或安装手册。页面对 22 章、7 个 Skill、v0.1、`candidate` 边界和“书稿仍在推进”的总体描述，大部分能在仓库中找到对应证据。

但当前不宜把展示页视为与项目状态完全同步。存在三个优先修正问题：

1. 当前正式名、命名研究刷新版的首选名和展示页使用的名称不一致；这是尚未完成决策的品牌状态问题。
2. LAB 003 展示为 L5，实验元数据实际为 L3，直接误导学习路径。
3. “查看实验室规则与全部入口”只展示 4 个实验卡片，且 `book/labs/README.md` 不是 10 个实验的完整直接入口清单，承诺范围过宽。

此外，页面链接虽然指向存在的仓库文件，但多数目标是 Markdown 原文件；在普通静态服务或 GitHub Pages 中，这通常不是适合终端读者的渲染页面。键盘交互、焦点、减少动画和窄屏可读性仍需要真实浏览器验收。

## 与项目证据的一致性

### 已对齐的部分

- `site/index.html:43,89` 宣称有 22 章；实际 `book/chapters/` 有 22 个章节文件，`book/table-of-contents.md` 也列出第 1–22 章。
- `site/index.html:123-133` 展示 7 个 Skill，并将三项明确标为 `candidate`、其余标为仍需前测；这与 `docs/skill-registry.md` 的 7 项全部 `candidate`，以及 `docs/quality/forward-test-2026-08-09.md` 只记录三项首批前测相符。
- `site/index.html:50`、`site/README.md:33` 将页面和项目保持在 v0.1/`candidate` 语境，没有把展示实现称为 `verified` 或 `production-ready`。
- `site/index.html:100-103` 对已写、规划中、草稿/待前测的章节状态，整体符合 `book/table-of-contents.md` 的状态标记。
- `site/index.html:142` 对 `draft`、`candidate`、`verified`、`production-ready` 的定义与项目状态语言一致；这里是状态定义，不是宣称已有内容达到后三种状态。
- 页面没有把文档数量、Skill 数量或一次输出宣称为“掌握”，与 `README.md`、`CONTEXT.md` 和 `docs/charter.md` 的证据优先原则一致。

### 发现的问题

#### P1 — 命名决策在展示层没有反映最新研究结论

`README.md:79`、`CONTEXT.md:1,7`、`site/index.html:7,40` 和页脚仍把 `Codex Field Guide` 当作正式项目名；但命名研究刷新版 `docs/research/project-naming-refresh-2026-08-09.md:88-96,153-170` 已明确记录：直接冲突复核后，`Field Guide` 不再是首选，当前首选改为 `From GPT to Codex`，且研究状态仍为 `candidate`。

这不一定是页面代码错误，因为研究本身没有批准改名，项目其他治理文档仍承认 `Codex Field Guide` 是当前正式名。但展示页没有说明“正式名称仍待决策”或“命名研究已有候选变更”，因此访客无法判断这是已确认品牌还是研究中的旧名称。

**建议：** 在名称决策完成前，展示层至少要有一个一致的“当前正式名/候选改名”边界；决策完成后再同步标题、描述、页眉、页脚、导航和仓库说明。不要只改展示页而留下 README、CONTEXT、ADR 的分裂状态。

#### P1 — LAB 003 的等级与实验元数据不一致

`site/index.html:114` 将“证据审查”显示为 `L5`；实际 `book/labs/lab-003-evidence-review.md:6` 的 frontmatter 是 `level: L3`。`book/table-of-contents.md` 也把证据审查实验作为第 19 章入口，而不是 L5 专属实验。

这是展示层可直接观察的事实错误，会让初学者误判前置能力和学习顺序。页面文案“candidate 前测相关”也没有明确说明它是 Skill 前测关系，而不是该实验自身状态；该实验自身仍是 `status: draft`。

**建议：** 以实验 frontmatter 为唯一展示等级来源，并把“实验等级”和“关联 Skill 状态”拆成两个标签。

#### P1 — “全部实验入口”承诺超过实际展示覆盖

`site/index.html:112-117` 只展示 LAB 001–004 四个卡片，并链接到 `book/labs/README.md`，链接文字却是“查看实验室规则与全部入口”。当前仓库实际有 10 个 `lab-*.md` 文件；`book/labs/README.md` 主要是规则和模板，并不是 10 个实验的完整链接目录。

这会让访客以为页面已覆盖全部实验，而实际只能从展示页直接进入 4 个。当前 4 个卡片本身是真实文件链接，但覆盖率没有被诚实标出。

**建议：** 要么展示全部 10 个实验，要么明确写“首批入口 / 4 个精选实验”，并提供真正列出 10 个文件的索引入口。

#### P2 — 链接指向真实 Markdown 文件，但不一定提供可读的终端阅读体验

静态文件检查未发现缺失的相对目标：章节、4 个实验卡片、7 个 Skill、质量记录、CSS 和 JS 文件均存在；`app.js` 中 L0–L6 的动态章节目标也均对应存在文件。

不过，`site/index.html` 大量链接直接指向 `../book/**/*.md`、`../skills/**/SKILL.md`。`site/README.md:18` 说明静态服务更接近正常链接环境，但普通静态服务不会把 Markdown 自动渲染为文章页，用户通常会看到原始 Markdown 文本或下载行为。于是“链接存在”成立，但“展示页提供连贯可读的学习入口”不完全成立。

**建议：** 明确选择一种产品行为：提供静态 HTML 渲染页；或把这些链接标为“打开仓库源文件”；或使用适配目标托管平台的 Markdown 页面方案。不要把文件存在检查当成阅读体验验证。

## 组织名与品牌边界

展示页正文、标题、页脚和可见导航中没有过度使用 `Prysai` 或 `Prysai Lab`；这是正确的。`CONTEXT.md` 明确规定组织名用于所有者、治理、许可证和贡献记录，不作为每个产品标题或 Skill 展示名的固定前缀。

页面链接 URL 中出现 `skills/prysai-*` 技术命名空间，但卡片可见名称使用 `Codex Coach`、`Task Protocol` 等功能名。这与 `docs/skill-registry.md` 对安装兼容命名空间和界面显示名的区分一致，不属于品牌过度曝光。

当前更大的品牌问题不是组织名过多，而是 `Codex Field Guide` 与命名研究刷新版的 `From GPT to Codex` 之间缺少决策状态说明。

## 可读性审查

### 做得较好的地方

- `lang="zh-CN"`、页面标题和 meta description 已设置，首屏定位清楚。
- 首屏明确说明学习对象、学习方式和证据闭环；没有只用抽象品牌词或 Skill 数量吸引访客。
- 章节、实验、Skill、状态和第一个安全任务分成清晰区块，符合“概念 → 判断 → 操作 → 实验 → 复盘”的书籍架构。
- CSS 提供 800px 和 480px 两级响应式布局，导航、网格和页脚有窄屏降级规则。
- 没有外部字体、图片或 CDN 依赖，降低了加载和供应链不确定性。

### 仍需验证或改进的地方

- `styles.css` 大量使用 `0.68rem–0.8rem` 的辅助文字和英文大写眉题；中文窄屏上可能出现信息密度偏高、状态标签不易读的问题，目前没有浏览器截图或真实设备验收证据。
- 大标题使用较强的负字距（例如 `.hero h1` 和 `.section h2`），视觉上可能造成中文字符拥挤；这是需要渲染检查的风险，不应仅凭源码判定为缺陷。
- 章节列表、Skill 卡片和页脚依赖大量小字号与灰色文字；应在实际桌面和窄屏下检查对比度、换行和触控目标大小。
- `book/labs/README.md` 与章节/Skill 源文件作为原始 Markdown 打开时，正文可读性取决于浏览器对 Markdown 的处理方式，不能由页面视觉样式覆盖。

## 可访问性审查

### 已具备的基础

- 有跳过链接 `site/index.html:12`，主要内容有 `main#main`。
- 导航有 `aria-label`，菜单按钮有 `aria-expanded` 和 `aria-controls`。
- 成长路径使用了 `tablist`、`tab`、`tabpanel` 和 `aria-selected`，章节折叠使用原生 `details/summary`。
- 装饰性箭头、字母标记和菜单线条使用了 `aria-hidden` 或不承担语义。
- 没有图片，因此不存在缺失 `alt` 文本问题。

### P2 — Tab 交互没有完整实现熟悉的键盘模式

`site/index.html:66-75` 使用了 ARIA tab 角色，但 `site/app.js:18-28` 只实现鼠标/普通按钮点击，没有左右箭头、Home/End、焦点移动或自动/手动激活模式的明确实现。所有 tab 仍可能被逐个 Tab 到达，语义和键盘行为之间存在不完整匹配。

`tabpanel` 有 `tabindex="0"`，但没有反向的 `aria-labelledby`；这不一定阻断使用，却使辅助技术对当前等级与面板的关系表达不完整。

**建议：** 采用完整的原生按钮分组语义，或按 WAI-ARIA tab pattern 实现键盘导航、焦点管理和标题关联；选择前者时可以减少不必要的 ARIA。

### P2 — 菜单缺少 Escape 关闭与焦点返回

`site/app.js:44-53` 能打开菜单、点击链接后关闭，但没有 Escape 关闭、打开后焦点进入菜单、关闭后焦点返回按钮等行为。窄屏键盘和屏幕阅读器用户可能需要额外 Tab 才能恢复上下文。

### P2 — 缺少减少动画设置

`site/styles.css:1` 设置了 `scroll-behavior:smooth` 和多个 transition，但没有 `@media (prefers-reduced-motion: reduce)` 覆盖。对偏好减少动画的用户，页面仍可能执行平滑滚动和悬浮位移动画。

### P2 — 缺少统一的 `:focus-visible` 设计

源码对部分导航链接有 `:focus` 样式，但没有统一的 `:focus-visible` 轮廓规则；按钮、卡片链接、折叠标题和菜单按钮的焦点可见性主要依赖浏览器默认样式。真实浏览器中应检查焦点是否在白底、红底和深色背景上都清楚可见。

## 运行时验证边界

本轮尝试连接应用内浏览器，但当前浏览器运行时不可用，因此没有取得真实桌面/窄屏截图，也没有完成点击、键盘、焦点、滚动和 Markdown 目标页面的运行时验证。

已完成的静态证据包括：

- 页面源码与项目 README、书籍目录、书稿 README、命名研究和质量记录的交叉阅读；
- 本地相对链接目标存在性检查，未发现缺失文件；
- 动态 L0–L6 章节目标的路径存在性检查；
- 章节文件、实验文件和 Skill 目录数量与展示页数字的对照。

因此，本报告可以确认“静态内容与文件边界的大部分关系”，不能确认“目标浏览器中的实际布局、可访问性或链接响应”。

## 建议优先级

1. 修正 LAB 003 的 L5/L3 展示错误，并明确实验等级与 Skill 状态的区别。
2. 解决正式项目名与命名研究刷新版首选名的决策漂移，再同步展示页和文档。
3. 修正“全部入口”表述，补齐 10 个实验入口或改成“4 个精选入口”。
4. 决定 Markdown 源文件链接是预期产品体验还是临时开发入口；如为公开展示，补充可读的 HTML/托管方案。
5. 在真实桌面和窄屏浏览器完成视觉验收，并补做键盘 tab、菜单 Escape、焦点可见性、减少动画和 Markdown 链接检查。

**最终判断：** 展示页是一个有清晰方向、静态证据大体诚实的 `candidate` 展示实现；目前存在可见的状态/内容不同步，且尚无浏览器运行时验收证据，不应标为 `verified` 或 `production-ready`。
