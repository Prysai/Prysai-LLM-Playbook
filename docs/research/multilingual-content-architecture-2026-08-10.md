# 多语言文档内容架构审计

**审计日期：** 2026-08-10（America/Los_Angeles）
**研究状态：** `candidate`
**审计范围：** `AGENTS.md`、`docs/adr/0010-locale-suffixed-content.md`、`docs/governance/locale-matrix.yaml`、`scripts/validate_localization.py`、所有 `README-*.md`、`book/*-*.md` 入口，以及 Docusaurus、VitePress、Astro Starlight、MkDocs/Material 和成熟文档项目的一手资料。
**变更边界：** 本次只新增本研究文件；没有改代码、没有重命名内容、没有补翻译、没有改变矩阵或站点行为。

## 结论先行

当前的“六语言”是六个 locale 入口切片和一个六 locale 目标矩阵，不是六语言完整内容支持。

仓库目前确实有六个 locale 标识：`EN`、`ZH`、`ES`、`JA`、`KO`、`DE`。但是，`locale-matrix.yaml` 只登记了 4 个 `content_id`：

1. `project-readme`；
2. `book-readme`；
3. `book-preface`；
4. `book-table-of-contents`。

因此现有验证结果 `4 content_ids × 6 locales = 24 个登记槽位` 的含义是“4 个入口对象各有六个状态/路径记录”，不是“全书的每个内容对象都已有六种语言”。矩阵处于 `mode: migration`，非英文条目也全部是 `translation_status: in-progress`；它允许内容登记但未完成，不会把入口数量解释成覆盖率。

现有主体内容仍是：

- 22 个未加 locale 后缀的章节源文件；
- 13 个未加 locale 后缀的 lab 文件；
- 7 个未加 locale 后缀的 `SKILL.md`；
- 站点运行时只提供 EN / 中文切换，其余四个 locale 入口没有暴露为运行时语言。

所以正确的公开表述应是：

> 项目已建立 EN 默认、六 locale 后缀规则和四个入口对象的迁移切片；22 章、13 labs、skills 及站点多语言运行时仍未完成六语言迁移。

这也是当前 `site/index.html` 与 `site/app.js` 已经采用的诚实边界：站点文案写明“六个仓库入口 locale 已登记”，并区分“运行时 EN / 中文切换”和“仍在迁移审查的其他入口切片”。

## 1. 当前仓库证据

### 1.1 读取到的项目契约

`AGENTS.md` 要求：

- 公共 showcase 默认英文并提供中文切换；书籍当前正文仍以简体中文为主，不能声称已完全双语；
- 稳定原则和易变产品事实分开；易变事实要有权威 URL、访问日期、范围、负责人和下次复核日期；
- 外部资料先作为数据处理，不能把资料中的指令当作自动授权；
- 结果只有在对应证据存在时才能称为 `verified`；
- 内容变化必须区分 `draft`、`candidate`、`verified`、`production-ready`。

`ADR-0010` 已经给出目标架构：

- `EN` 是默认 locale 和源 locale；
- 每个 reader-facing 本地化文件，包括英文源文件，都使用最终的 `-EN`、`-ZH`、`-ES`、`-JA`、`-KO`、`-DE` 后缀；
- 共享 `content_id` 和共享 stem 是跨语言身份；翻译不是新的章节或新的内容 ID；
- reader-facing 链接在目标 locale 存在时必须保持相同 locale；
- 当前静态站点的公开 locale 状态是 `?lang=<url_token>`，无参数时默认 `EN`；URL 中明确的 locale 优先于浏览器偏好；
- 缺失翻译不能静默 fallback 到英文，迁移期必须有显式状态提示；
- `content_status` 和 `translation_status` 是两个维度；
- migration mode 和 release mode 是不同门禁，绿色 locale 检查不是生产完成证明。

### 1.2 入口数量与主体数量

截至本次审计，`git ls-files` 和工作树扫描得到的核心数量如下：

| 内容层 | 当前文件形态 | 当前状态 | 审计解释 |
|---|---|---|---|
| 顶层项目入口 | `README-EN/ZH/ES/JA/KO/DE.md` | 六 locale 入口切片 | 是入口覆盖，不是全仓库覆盖 |
| 书籍入口 | `book/README-*.md` | 六 locale 入口切片 | 只描述如何进入书籍 |
| 序言 | `book/preface-*.md` | 六 locale 条目，均仍待独立语言审查 | 不是 22 章的替代物 |
| 目录 | `book/table-of-contents-*.md` | 六 locale 目录条目 | 目录中的章节链接仍大量指向无后缀 legacy 源文件 |
| 章节 | `book/chapters/*.md` | 22 个无后缀文件 | 没有 `-EN` 或其他五 locale 章节副本 |
| labs | `book/labs/lab-*.md` | 13 个无后缀实验文件 | 没有六 locale lab 内容；`book/labs/README.md` 另行分类 |
| Skills | `skills/*/SKILL.md` | 7 个无后缀执行文档 | 没有 locale 副本；还要先解决运行时是否要求精确文件名 |
| showcase UI | `site/index.html` + `site/app.js` | EN / 中文字典和切换 | `ES/JA/KO/DE` 没有 UI 字典或运行时入口 |

这里的 22 章、13 labs、7 Skills 是项目自身入口和目录内容声明的数量，不代表这些内容已经通过运行、独立语言审查或读者验收。书籍入口中的状态也明确保留了 `candidate`、`draft` 和 `not_run`。

### 1.3 矩阵的实际范围

当前 `docs/governance/locale-matrix.yaml` 使用 JSON 兼容语法保存四行内容。它登记：

| `content_id` | 6 个 locale 是否都有矩阵键 | 当前非 EN 状态 |
|---|---:|---|
| `project-readme` | 是 | `in-progress` |
| `book-readme` | 是 | `in-progress` |
| `book-preface` | 是 | `in-progress` |
| `book-table-of-contents` | 是 | `in-progress` |

矩阵的 `legacy_paths` 只覆盖 `README.md`、`book/README.md`、`book/preface.md`、`book/table-of-contents.md` 这组入口。22 个章节、13 个 labs 和 7 个 Skills 尚未成为矩阵内容行。因此，矩阵没有机会报告它们“缺失翻译”或“过期翻译”；它们尚未进入这个检查域。

此外，审计时这些 locale 入口文件和矩阵文件在工作树中均显示为未跟踪新增文件（`git status --short` 的 `??` 状态）。这是工作树事实，不是提交、发布或生产部署证据。

### 1.4 当前校验器实际检查了什么

本次运行：

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\validate_localization.py
```

实际输出：

```text
LOCALIZATION_OK mode=migration content_ids=4
files=EN:4,ZH:4,ES:4,JA:4,KO:4,DE:4
registered_paths=24
```

这个结果可以证明：当前四个矩阵对象的命名、路径登记、状态字段和限定范围内的链接检查通过 migration mode。它不能证明翻译质量或全量覆盖。

按 `scripts/validate_localization.py` 的实现，当前校验器主要做这些事情：

- 确认默认 locale 是 `EN`，并且 locale 集合恰好是六个值；
- 确认每个矩阵内容行声明六个 locale；
- 确认矩阵路径以对应的大写后缀结尾、使用声明的 stem、没有重复路径；
- 确认登记文件存在且非空；release mode 下才把缺失文件和 `in-progress` / `stale` 判为错误；
- 扫描带允许后缀的文件，拒绝没有进入矩阵的后缀文件；
- 当链接目标已经在矩阵中时，检查目标 locale 是否和源文件相同；
- 对矩阵登记过的 legacy path，要求迁移期链接文本带迁移提示；
- 按 locale 输出文件计数。

当前校验器还没有证明以下事项：

- 所有 22 章、13 labs、7 Skills 是否都已进入矩阵；
- 文件内的 `content_id` 是否与矩阵一致；
- 翻译正文是否真的使用目标语言、是否完整、是否可读、是否术语一致；
- `source_revision` 是否等于实际英文源版本；
- 英文源发生变化后是否自动把对应翻译标记为 `stale`；
- translated heading 生成的 anchor 是否稳定、目标 anchor 是否存在；
- 语言切换器是否按同一 `content_id` 工作，是否保留路径、hash 和其他 shareable state；
- HTML `lang`、标题、description、可访问名称和站点 UI 是否在六种语言都有覆盖；
- 未登记的无后缀章节/lab 链接是否跨语言或丢失迁移提示；
- GitHub、静态站点、浏览器、部署、重定向和真实读者行为。

特别要注意：文件名是 `.yaml`，但 `load_matrix()` 使用 `json.loads()` 解析。当前文件的 JSON 语法也是合法 YAML 的子集，因此这次运行成功；但未来若写入普通 YAML 特性，当前校验器会直接解析失败。这是工具契约缺口，应在实现阶段明确“JSON-compatible YAML”还是引入真正的 YAML parser，不能让扩展名制造错误预期。

### 1.5 站点运行时现状

`site/app.js` 的当前行为是：

1. 读取白名单中的 `?lang=en` 或 `?lang=zh`；
2. 若 URL 没有合法参数，再读取 `localStorage` 中的 `codex-field-guide-language`；
3. 两者都不可用时回退 `en`；
4. 切换时更新 `<html lang>`、标题、description、可见字典、ARIA 文本，并用 `history.replaceState()` 写回 `?lang=`；
5. 用 `localStorage` 作为下次访问便利偏好。

这个解析优先级基本符合 ADR 和现有双语研究：明确 URL > 已保存偏好 > EN 默认。它也会保留当前 URL 中已有的 hash，因为它在当前 URL 上修改 query，而不是重新构造一个空 URL。

但它仍然是“两语言展示页切换”，不是“六语言内容路由器”：

- `copy` 只有 `en` 和 `zh`；
- `data-lang-option` 只有 EN / 中文；
- 站点链接有的指向 `book/table-of-contents-EN.md`，有的仍指向 `book/chapters/03-task-protocol.md`、`book/labs/README.md` 等无后缀路径；
- 切换器没有从 `content_id` 矩阵解析同一内容对象，也没有对 Markdown 文件目标做 locale 映射；
- 站点 section 的 hash 不是章节 Markdown 的 anchor，当前能保留页面 hash 不等于能在翻译文件之间保留同一个文档 anchor。

## 2. 为什么六个入口不是六语言完整支持

“入口”与“内容覆盖”是两个不同的集合：

```text
locale 集合（6 个）
        ×
已登记的 content_id 集合（4 个）
        =
当前 validator 能证明的 24 个入口槽位

全量 reader-facing 内容集合
        =
章节 22 + labs 13 + Skills 7 + 其他明确纳入范围的入口/UI
```

目前只做入口切片有合理的迁移价值：读者可以看到项目从哪里开始，贡献者可以先验证命名规则、状态字段、同语言入口和迁移提示，旧无后缀路径还可以保留。它没有合理地推出下面任何一个结论：

- 22 章已经有六种语言；
- 13 labs 已经可以用六种语言完成；
- 7 个 Skills 的运行说明已经本地化；
- 六种语言的 UI、导航、搜索、错误页和可访问性文本都已覆盖；
- 每个 locale 都有相同的学习路径和同一组可验证实验；
- 翻译内容经过独立语言审查、事实复核、浏览器验收或生产部署。

成熟文档项目也把“语言可选”与“语言可发布”分开。Kubernetes 要求新 localization 先满足 minimum required content，之后才启用网站语言选择；MDN 维护活跃 locale，未维护的 locale 会被归档；这两者都说明 locale 名称、目录和少量页面存在不能替代维护责任和发布门槛。

## 3. 一手资料对照

下表只记录来源页面明确展示的机制，以及对本项目的可迁移含义。来源项目的目录结构和规模不同，不把它们的实现细节直接当作本项目代码要求。

| 项目 | 文件/目录策略 | URL 与语言切换 | 缺失翻译、anchor 或更新策略 | 对本项目的启示 |
|---|---|---|---|---|
| Docusaurus | locale 配置集中声明；翻译文件位于 `i18n/[locale]/[pluginName]/...`；Markdown/MDX 作为完整文档翻译 | `defaultLocale` 的 base URL 默认可省略 locale，其他 locale 通常使用 `/<locale>/`；官方主题有 `localeDropdown`；不把自动 locale detection 作为内建目标 | 教程明确展示“新增 locale 但尚未翻译”的状态；Git 方案提醒翻译文件需要持续与源文件同步；翻译标题可能改变自动生成的 anchor，官方建议显式 heading ID | URL locale、文件语言、翻译状态必须分开；anchor 不能依赖翻译标题；英文源版本要可追踪 |
| VitePress | `docs/foo.md`、`docs/es/foo.md`、`docs/fr/foo.md` 等按 locale 目录组织；也允许每个 locale 独立目录 | `locales` 可定义 label、`lang`、locale-specific config 和切换链接；独立 locale 目录时 `/` 不会自动重定向到 `/en/`，需要部署层规则；官方示例用 cookie 记住语言 | 目录和同名文件建立语言对应；cookie 只是偏好持久化，不应代替 URL/路由身份 | 选择一个 canonical URL 规则；URL 决定当前页语言，偏好只能辅助；不要让根 URL 和 `/en/` 同时成为不明主地址 |
| Astro Starlight | `src/content/docs/en/foo.md`、`src/content/docs/zh-cn/foo.md` 用同一文件名关联同一页面；可配置 root locale | `defaultLocale` 影响 UI 与 fallback；root locale 可以不带 `/en/`；`Astro.currentLocale` 与 `getRelativeLocaleUrl()` 用于生成当前语言链接 | 缺失页面会显示默认语言内容并附带“尚不可用”提示；内置 UI 有 untranslated-content 文案；同名文件是关联键 | fallback 必须显式可见；矩阵应以稳定 `content_id`/stem 关联，而非译后标题；同 locale 链接应由一个生成器产生 |
| MkDocs / Material for MkDocs | MkDocs 本身以 `docs_dir` 和相对 Markdown 链接为核心；Material 建议多语言文档按每种语言建立项目或子路径 | Material 的一个 `mkdocs.yml` 只有一个 canonical `theme.language`；多语言通常用子路径项目互链；官方 selector 使用绝对链接、`lang` 和 `hreflang`；“Stay on page”在相同 path 存在时从 `/en/foo/` 切到 `/de/foo/` | Material 提醒某些语言的默认 slug 会产生不可读 anchor；MkDocs 可配置严格 link/anchor validation | 如果采用多站点/子目录，必须把当前 path 和 anchor 当作切换契约；语言 selector 需有 `lang`/SEO 信息；anchor 需要明确策略 |
| Kubernetes | 每个 locale 在 `content/<lang>/`，翻译文档保持与英文相同的 URL path；另外有 locale-specific `i18n` 字符串和 `OWNERS` | 新 locale 需要配置语言、内容目录、语言名和切换入口；满足 minimum required content 后才启用公开语言选择 | 新 localization 要有至少两名贡献者、维护团队和最小内容集；机器翻译必须人工审查；源文件基于指定 release；修英文源后再同步翻译；单个 PR 尽量只改一个 locale | “有 locale”不等于“可发布”；按 locale 建责任和审查边界；先修 EN，再标记受影响翻译 stale；按小切片发布 |
| MDN | 翻译内容按 locale 目录/仓库组织；每个 locale 有自己的维护指南和活跃维护者 | 页面语言由 locale 路径与语言切换器区分；活跃 locale 才公开，未维护 locale 归档 | 翻译 front matter 用 `l10n.sourceCommit` 记录同步到的英文提交；禁止部分翻译文档；机器翻译只能作参考，不能当作本地化完成 | `source_revision` 必须是可比对的真实版本；缺一整页比混合语言的“半翻译页”诚实；需要 owner/reviewer 和 locale 健康状态 |

### 3.1 Docusaurus：文件位置、URL 和 anchor 的三个分离点

Docusaurus 官方 i18n 资料适合用来拆分三个经常被混淆的问题：

1. 配置层声明 `defaultLocale` 与支持的 `locales`；
2. 文件层把翻译放在对应 locale/plugin 目录；
3. 发布层为默认语言和其他语言生成不同的 base URL。

官方还明确指出，自动 locale detection 不属于其内建目标，翻译 slug 也不是默认自动处理的对象。对本项目而言，浏览器语言、`localStorage` 和 cookie 都不能覆盖一个明确的 URL locale。

官方 Markdown 教程特别重要：如果标题由英文 `Hello World` 变为其他语言，自动生成的 ID 可能改变，旧的 `#hello-world` 就会失效。因此跨语言切换要保留的不是“当前标题文本”，而是显式稳定的 anchor ID。

### 3.2 VitePress：目录对应关系和持久化边界

VitePress 的最小例子用同一相对文件名表示各语言页面：`foo.md`、`es/foo.md`、`fr/foo.md`。这是一种清晰的 path identity，但官方同时提醒：如果把英文也放入 `/en/` 目录，根路径不会自动重定向到 `/en/`，部署层必须明确规则。

官方 cookie 示例只解决“下次访问记住语言”，不解决当前页面的 canonical identity。这个区别正适合本项目：`?lang=` 或未来的 locale path 负责可分享、可刷新、可复现；持久化偏好只做便利。

### 3.3 Starlight：fallback 可以有，但必须显式

Starlight 用语言目录中的同名文件建立页面对应关系，并允许 root locale。其官方行为是：如果目标语言页面缺失，可以显示默认语言页面，但同时展示未翻译提示。

这和本项目 ADR 的“没有静默 fallback”并不矛盾。可借鉴的是“fallback 的状态必须显式注册和显示”，不能把英文内容以 `ZH` 文件名或 `ZH` 页面标题伪装成中文翻译。对本项目的 migration mode，更安全的选择是：同 locale 的 status page/notice 说明缺失，并给出英文 canonical 入口；未来若产品选择 Starlight 式 fallback，也必须在矩阵和 UI 中明确标记 `fallback-from: EN`。

### 3.4 Material for MkDocs：跨项目 selector 和保持当前 path

Material 官方说明，一个 `mkdocs.yml` 只能为整个构建设置一个 canonical `theme.language`。它推荐多语言文档以语言子路径或独立项目构建，然后用 language selector 互链；selector 的条目应包含名称、绝对链接和语言代码，`lang` 还用于 `hreflang`。

其 “Stay on page” 文档展示了期望的映射：

```text
/en/       -> /de/
/en/foo/   -> /de/foo/
/en/bar/   -> /de/bar/
```

但这个例子成立的前提是两种语言有相同 path。若本项目的翻译文件仍以不同标题生成不同路径或 anchor，就不能只做字符串替换；必须先通过矩阵找到同一 `content_id`。

### 3.5 Kubernetes 与 MDN：可发布性和 stale 的治理证据

Kubernetes 的一手指南把 localization 当作维护项目：语言团队要能自我维持；新语言要有最小内容集、贡献者、评审权限和工作流；机器翻译不能单独满足质量要求；修英文源问题后再同步到翻译；一个 PR 尽量只改一个 locale。

MDN 的翻译指南把 `l10n.sourceCommit` 放进翻译 front matter，并禁止部分翻译文档和把机器翻译当最终本地化。这两种做法共同说明：stale 检测的核心不是“文件存在”，而是“翻译对应哪个英文版本、哪些结构/术语/事实已被重新审查”。

## 4. 建议的本项目架构契约

以下是对 ADR-0010 的实现化解释；它们是本研究的建议，不表示本次已经实施。

### 4.1 默认 EN 与 URL 优先级

在当前静态 showcase 继续使用 ADR 规定的 canonical query 方案：

```text
无参数                         -> EN
?lang=en                       -> EN
?lang=zh                       -> ZH
?lang=es                       -> ES
?lang=ja                       -> JA
?lang=ko                       -> KO
?lang=de                       -> DE
非法 ?lang 或未知值             -> EN，并记录可观察的 fallback
```

解析优先级固定为：

```text
合法 URL locale > 白名单内的持久化偏好 > EN 默认
```

要求：

- 明确 URL locale 永远胜过 `localStorage`、cookie、浏览器 `Accept-Language`；
- URL 无 locale 时默认 EN，不用隐式浏览器语言把同一个分享链接改成另一种语言；
- 切换器改写 URL 时保留当前 path、query 中允许保留的学习路径/filter 状态和 hash；
- 同步 `<html lang>`、title、description、可见语言名、按钮文本、ARIA 名称和 `hreflang`/canonical 信息；
- 未来若改为 `/<locale>/...`，必须只选择一种 canonical URL 方案，并为旧 `?lang=` URL 提供可审计的 redirect/兼容规则；不能让两套 URL 同时自称 canonical。

### 4.2 所有本地化文件带后缀，locale-neutral 文件明确分类

对 reader-facing Markdown 和被用户直接阅读的本地化资产，统一使用：

```text
<stable-stem>-EN.md
<stable-stem>-ZH.md
<stable-stem>-ES.md
<stable-stem>-JA.md
<stable-stem>-KO.md
<stable-stem>-DE.md
```

英文也必须带 `-EN`，这样 GitHub、raw link、下载压缩包、本地编辑器和矩阵都能直接判断语言。

不要把“所有仓库文件”误解为“所有文件都要复制六份”。以下文件应在矩阵中明确标成 locale-neutral 或排除 reader-facing locale 导航：

- `AGENTS.md`、`CONTEXT.md`、ADR、治理 YAML/JSON、source register；
- validators、构建脚本、测试 fixtures 和机器可读数据；
- 不以读者正文形式发布的内部配置。

Skills 需要一个额外决策：`SKILL.md` 可能是运行时按精确文件名发现的执行契约。若 loader 要求 `SKILL.md`，不能为了文件名规则盲目把它改成 `SKILL-EN.md` 并破坏 Skill 发现。建议分开：

- 运行时执行契约保留为明确标注的 locale-neutral `SKILL.md`，只包含不依赖语言的规范或由工具读取的默认契约；
- reader-facing 的 Skill 教学/说明副本使用 `SKILL-EN.md` 等后缀，并进入 locale matrix；
- 只有在 Skill loader 已验证支持 locale 选择后，才把运行时正文拆为带后缀的执行文件；
- 这项边界应成为一个单独的工具契约决策，不在 22 章/13 labs 的文件迁移中顺手猜测。

### 4.3 `content_id` 是切换主键，不是翻译标题或相对路径

每个跨语言对象至少需要这些字段：

```yaml
content_id: chapter-01-gpt-and-codex
kind: chapter
stem: book/chapters/01-gpt-and-codex
source_locale: EN
source_revision: <actual commit or content digest>
locales:
  EN:
    path: book/chapters/01-gpt-and-codex-EN.md
    content_status: candidate
    translation_status: source
  ZH:
    path: book/chapters/01-gpt-and-codex-ZH.md
    content_status: draft
    translation_status: not-started
    translated_from: EN
    source_revision: <same source revision when started>
    coverage: none
    reason: translation not started
```

稳定 stem 可以参与生成路径，但不应依赖译后标题。矩阵必须是一份 canonical identity source；站点、目录、语言切换器、前后章导航、chapter-to-lab 链接都从它解析。

### 4.4 同语言链接规则

对当前页面 `(content_id = X, locale = L)` 的每个 reader-facing 目标 `Y`：

1. 先解析目标的 `content_id`，不能只拿链接文本或翻译后的文件名猜测；
2. 如果 `Y` 的 `L` 变体存在，链接到 `Y-L`；
3. 如果 `Y-L` 不存在，显示登记过的 `not-started` / `in-progress` / `stale` 状态，并给出明确英文入口；
4. 不得把 `Y-EN` 静默当作 `Y-ZH`、`Y-DE` 等；
5. locale-neutral 文件可以无后缀，但链接标签要说明它是治理/来源/验证资料，而不是当前语言的正文；
6. 外部链接不重写，但 surrounding label 不得暗示它已经本地化；
7. 同一规则适用于目录、卡片、搜索结果、上一页/下一页、chapter/lab 关系、站点 UI 和语言切换器。

一个最小可测试例子：

```text
chapter-01-EN -> chapter-02-EN
chapter-01-ZH -> chapter-02-ZH
chapter-01-JA -> chapter-02-JA
```

当 `chapter-02-ZH` 还没有开始时，`chapter-01-ZH` 应显示“中文翻译未开始，阅读英文源”，而不是悄悄链接到 `chapter-02-EN`。

### 4.5 切换时保持 `content_id`、anchor、path 和分享状态

语言切换的输入和输出应能写成一个纯映射：

```text
switch(currentContentId, targetLocale, currentAnchor, currentShareState)
  -> targetPath + targetLocale + validAnchor + preservedShareState
```

具体要求：

- `content_id` 不变；
- locale 由目标文件矩阵记录决定，不由标题翻译或路径字符串替换决定；
- public path 保持同一个 route key；如果部署采用 locale prefix，只有 locale segment 改变；如果采用当前 `?lang=`，只改变 `lang` 参数；
- 所有跨语言可分享的 heading 使用显式、稳定、ASCII 或明确 Unicode 策略的 anchor ID，例如 `## 任务协议 {#task-protocol}`；
- 切换前后只有在目标文件确实存在该 anchor 时才保留 `#anchor`；如果不存在，验证器报错，运行时显示“目标语言没有该 anchor”的可见错误或落到该文档顶部，不得静默丢弃；
- 保留必要的 query state，如学习级别、路线筛选、搜索参数，但不要把临时 UI 状态无限复制到所有链接；
- 在页面加载和直接分享时，不依赖内存、cookie 或 `localStorage` 才能恢复语言和内容；
- 浏览器验收必须覆盖：直接打开 EN、直接打开每个已发布 locale、带 anchor 切换、刷新、复制 URL 到新会话、缺失翻译和非法 locale。

这里“保持 path”不是要求每个物理 Markdown 文件的相对路径都永远不变，而是要求 path 由同一个 `content_id` 的 canonical route 派生。物理文件在迁移期可以有 legacy mapping；公共 canonical URL 不应随翻译标题漂移。

### 4.6 Translation stale 检测

`translation_status: stale` 不能靠人工记忆或“最近看过文件”维护。建议至少记录：

```yaml
source_revision: <EN commit or source digest>
source_units_digest: <headings/anchors/links/code-assets digest>
translated_from: EN
coverage: full | partial | none
reviewed_at: 2026-08-10
reviewer: <person or team>
translation_status: candidate | verified | stale
stale_reasons: []
```

CI/校验器应执行：

1. 通过 `content_id` 找到当前 EN canonical file；
2. 计算或读取当前 EN 的 commit/path revision；
3. 比较非 EN 文件记录的 `source_revision`；
4. 若英文正文、显式 heading ID、内容链接、代码接口、图片/alt text 或受影响的 volatile fact 改变，标记翻译 `stale`；
5. 生成受影响 locale、变更 unit 和理由的报告；
6. 在翻译复核后更新 revision、coverage、reviewer、reviewed_at，才允许从 `stale` 回到 `candidate` 或 `verified`。

最低版本可以只比较源 commit；更可靠的版本还要比较结构单元摘要：

- heading/anchor ID 集合；
- `content_id` 链接目标集合；
- fenced code 的语言、命令和关键 API token；
- 图片路径、alt text 和关键表格字段；
- fact-impact registry 中声明会影响该页面的易变事实。

这样可以区分“英文修了一个拼写”与“英文改变了 API 命令和章节结论”，并让 stale 原因可审计。一个翻译的文件修改时间不能替代源版本关系。

## 5. 渐进迁移方案

目标是让每一步都可审查、可回滚、可报告，不把“复制文件”当作“翻译完成”。发布范围按内容对象和 locale 明确标记，不能因目录数量增加而自动升级状态。

### Phase 0：冻结契约，先不迁移主体

**目标：** 先让命名、身份、状态和发布词汇不会在迁移中漂移。

动作：

- 维持 `EN` 默认和六 locale 白名单；
- 保留 4 个现有入口 `content_id`，把 `source_revision: dd08a68` 是否仍是有效提交/内容版本核实为实际来源；
- 决定矩阵是严格 JSON-compatible YAML 还是正式 YAML，并让文件扩展名、解析器和贡献文档一致；
- 明确 `book/labs/README.md`、`site/README.md`、7 个 `SKILL.md`、governance 和 validators 的 locale-neutral / translatable 分类；
- 把“entry slice”“content coverage”“runtime UI coverage”“translation review”“reader acceptance”分成不同报告字段；
- 不执行 mass rename，不删除无后缀源文件。

**验收证据：** 矩阵 schema 文档、分类表、legacy map、状态词汇测试；仍然只能报告 migration candidate。

### Phase 1：全量盘点，先登记缺口

**目标：** 让 22 章、13 labs 和 7 Skills 至少进入可测量的范围，但不伪造文件。

建议新增矩阵行（实现时再改矩阵，本文不执行）：

- 22 个 `kind: chapter`；
- 13 个 `kind: lab`；
- 7 个 Skill reader-facing 文档对象，或将其执行契约与翻译说明分开登记；
- 书籍/labs 索引、站点 UI 和其他读者入口作为单独 kind，不和正文数量混算。

每行必须有六个 locale 键；缺失翻译用 `not-started`，有部分工作用 `in-progress`，并写 `reason`。EN 源尚未加后缀时，用 `legacy_paths` 映射，不能把当前简体中文无后缀正文重新标记为 EN。

**验收证据：** matrix report 能输出每个 kind 的 `EN/ZH/ES/JA/KO/DE` 计数；所有缺失都可定位到 `content_id`，而不是只输出“6 个语言”。

### Phase 2：先建立可审查的 EN 源

**目标：** 为公开 reader-facing 对象逐步创建 `-EN` canonical source，但不把当前中文正文静默改名为英文。

顺序建议按学习依赖走：

1. preface、book guide、table of contents；
2. chapters 01–06 的基础路径；
3. 关联的 labs 001–004、011；
4. chapters 07–13 与 labs 005–007；
5. chapters 14–18 与 labs 008–010；
6. chapters 19–22、labs 012–013；
7. 被公开引用的 Skills reader-facing 文档。

每个 slice 只宣称“EN source candidate”时，必须有内容审查；不能因为英文文件存在就标成 `verified`。原无后缀文件在兼容窗口继续保留，使用 redirect 或薄 stub 指到 canonical `-EN`，并保留 anchor 诊断。

**验收证据：** `-EN` 文件、content ID、legacy mapping、同语言链接、anchor 清单和内容状态记录。

### Phase 3：按 locale、按完整文件翻译垂直切片

**目标：** 先验证一条真实学习路径，而不是同时制造 42 个半成品。

建议选择一个最小垂直切片，例如：

- `book-preface` / `chapter-01`；
- 一个对应的 lab；
- 支撑该切片的一个 reader-facing Skill 说明；
- 目录和上一/下一页链接。

翻译流程：

1. 固定 EN `source_revision`；
2. 一个 PR 尽量只处理一个 locale 和一个 bounded slice；
3. 完整翻译一个文件，避免页面内部混合两种语言；
4. 保留 `content_id`、显式 anchor、代码语法、链接 identity 和 evidence scope；
5. 做术语、链接、anchor、事实和语言审查；
6. 只在对应证据存在后从 `in-progress` 升到 `candidate` 或 `verified`。

如果只完成了 ZH slice，ES/JA/KO/DE 仍然必须保留 `not-started`，不能为了产生“六语言文件树”复制英文文本或把机器翻译标为完成。

### Phase 4：扩大到 22 章和 13 labs

**目标：** 让每个 locale 的公开学习路径完整、同语言链接闭合、状态可见。

按依赖和读者入口扩展，每次只扩大一个 kind/route：

- 先完成章节基础路由，再补对应 labs；
- 每个章节链接到存在的同 locale lab，缺失时显示状态页；
- labs 的 setup、evidence、failure、secret boundary、reflection 也必须完整翻译；
- 章节正文、目录、学习路径和站点卡片都从矩阵生成或由 validator 检查；
- 任何 EN 源变化先更新 EN，再列出受影响翻译的 stale 集合；
- 不以“同一套中文正文仍可点击”替代目标语言覆盖。

**每个 locale 的候选门槛：** 至少有声明的 public minimum set、所有目标文件路径存在、没有跨 locale reader link、anchor/link 检查通过、译文独立审查完成，且所有未覆盖内容在导航上明确标识。

### Phase 5：Skills 和运行时 UI 分开治理

**目标：** 不因翻译 Skill 文档破坏 Skill 运行，也不因站点字典完整而声称正文完成。

- 先验证 Skill loader 是否要求 `SKILL.md` 精确文件名；
- 对执行契约使用 locale-neutral/EN canonical 的方案，对读者说明使用后缀文件；
- UI 字典为每个 locale 建稳定 key 覆盖检查，key 不使用可见中文/英文文本；
- 语言切换器只显示达到公开门槛的 locale，未达门槛的 locale 可以在治理报告中存在但不在运行时 selector 中冒充可用；
- UI `verified`、正文 `candidate`、Skill fresh-context pretest `not_run` 必须同时展示，不互相升级。

### Phase 6：release mode 和旧链接收口

**目标：** 只有在真正达到定义范围时才使用“六语言支持”措辞。

release mode 至少要求：

- 每个公开 translatable `content_id` 都有六个实际文件或明确的发布例外；
- EN 与每个译文有可比对的 source revision；
- translation coverage、reviewer、review date 和 stale 状态完整；
- 同 locale 链接和有效 anchor 通过；
- 语言切换能保留 `content_id`、path、anchor 和 shareable state；
- 旧无后缀路径有 deterministic redirect/stub、anchor 审计和回滚方案；
- 浏览器/部署验证覆盖直接 URL、刷新、新会话、缺失翻译、非法 locale 和语言 selector；
- 站点 UI、章节、labs、Skills 具体范围分别报告，不用一个总计数字覆盖差异。

只有 public scope 的六 locale 文件、审查和运行时证据都满足，才能把项目的状态从“入口迁移切片”改写为“六语言支持”。在此之前，旧链接不能因为暂时还能打开就被视为迁移完成。

## 6. 需要补强的校验与报告

未来实现阶段可把现有 validator 扩展成以下检查层：

| 检查层 | 必须回答的问题 | 当前状态 |
|---|---|---|
| Schema | 六 locale、status 词汇、content ID、stem、路径是否一致？ | 部分已有 |
| Inventory | 所有章节/lab/Skill reader-facing 对象是否进入矩阵？ | 缺失 |
| Filename | 每个本地化文件是否有且只有一个允许后缀？ | 对已扫描后缀文件已有 |
| Link | 当前 locale 的所有内部目标是否解析到相同 locale？ | 只覆盖已登记目标 |
| Legacy | 无后缀旧路径是否有显式迁移提示和确定 canonical target？ | 只覆盖矩阵 legacy_paths |
| Anchor | 目标文件是否存在同名稳定 anchor？切换后是否保留？ | 缺失 |
| Identity | switcher 是否以同一 `content_id` 映射，而不是拼字符串？ | 缺失 |
| Stale | 当前 EN revision 是否等于译文记录的 source revision？ | 缺失 |
| Coverage | 文件、heading、代码、链接、alt text、表格是否达到声明覆盖？ | 缺失 |
| Language | 目标文件是否确实为目标语言，是否有乱码/英文泄漏/混合语言？ | 缺失 |
| UI | 每个公开 locale 的字典、`lang`、title、description、ARIA、搜索和错误文案是否覆盖？ | 当前仅 EN/ZH |
| Runtime | 直接打开、刷新、分享 URL、selector、fallback、部署 redirect 是否符合契约？ | 未由该脚本证明 |

报告输出应至少包括：

```text
content_id | kind | locale | path | content_status | translation_status
source_revision | current_source_revision | coverage | reviewer | reviewed_at
stale_reason | link_errors | anchor_errors | runtime_evidence
```

不要只输出 `files=EN:...`。文件数量没有告诉读者哪些是 source、哪些是 in-progress、哪些 stale、哪些只是入口。

## 7. 不伪造完成的状态语言

建议在迁移期间固定使用下列陈述：

| 状态 | 可以说什么 | 不能说什么 |
|---|---|---|
| `not-started` | 该 locale 已列入目标，但此对象尚未开始 | 该 locale 已支持 |
| `in-progress` | 文件或翻译工作存在，覆盖/审查未完成 | 翻译完成、可发布 |
| `candidate` | 结构和基础检查通过，声明范围仍缺少部分证据 | 语言质量或读者体验已验证 |
| `verified` | 声明范围内的覆盖、术语、链接、source revision 和审查证据存在 | 全仓库、全站点或生产已验证 |
| `stale` | 英文源或相关事实变更，译文需要复核 | 仍然是当前翻译 |
| `production-ready` | 内容、语言、运行时、安全、维护、版本、许可证和发布门禁都通过 | 仅凭静态 validator 通过即可 |

本次审计自身的状态是 `candidate`：研究资料和仓库基线已记录，尚未实现架构、尚未运行六 locale 的浏览器流程，也没有把任何翻译升级为 `verified`。

## 8. 研究限制与来源边界

### 8.1 本次没有证明的内容

- 没有修改或实现 `content_id` 生成器、locale-aware link resolver、stale checker 或 redirect；
- 没有运行站点六语言浏览器验收，因为当前站点只实现 EN / 中文运行时字典；
- 没有证明现有 ES、JA、KO、DE 文本的语言质量、编码质量或独立审校结果；
- 没有把文件存在、矩阵通过或 validator 通过解释为翻译完成；
- 没有把官方框架的默认行为当作本项目已经拥有的行为。

### 8.2 来源和许可证边界

本文件使用官方文档和成熟项目公开仓库作为事实来源，只保留短的机制描述和链接，没有复制其正文、图片、品牌、代码片段或翻译资产。它们用于架构研究和引用，不自动成为本项目发行资产。若后续要复制代码、模板、截图、术语表或其他外部材料，仍须单独在 `docs/sources/asset-register.md` 核对来源、许可证、归属和适配范围；本次遵守“只写研究目标文件”的用户约束，没有修改资产台账。

## 9. 一手来源清单

以下页面于 **2026-08-10** 访问。产品文档、版本号和实现细节会变化，后续实现前应重新访问核对。

### 框架官方文档

1. Docusaurus — [i18n Introduction](https://docusaurus.io/docs/i18n/introduction)：目标、默认 locale、翻译文件类型和 `i18n/[locale]/[pluginName]` 文件位置。
2. Docusaurus — [i18n Tutorial](https://docusaurus.io/docs/i18n/tutorial)：`defaultLocale`、locale base URL、`localeDropdown`、独立 locale 构建、Markdown 翻译和显式 heading ID。
3. Docusaurus — [Using Git for i18n](https://docusaurus.io/docs/i18n/git)：翻译文件与英文源同步的维护责任、source 文件修改后的 backport，以及 Git 翻译的 trade-off。
4. Docusaurus — [Heading IDs](https://docusaurus.io/docs/markdown-features/toc)：自动 heading ID 的限制和显式 ID 语法。
5. VitePress — [Internationalization](https://vitepress.dev/guide/i18n)：locale 目录、同名 Markdown、locale 配置、HTML `lang`、root path 与 cookie 示例。
6. Astro Starlight — [Internationalization (i18n)](https://starlight.astro.build/guides/i18n/)：locale 目录、root locale、fallback content、未翻译提示和当前 locale URL helper。
7. MkDocs — [Configuration](https://www.mkdocs.org/user-guide/configuration/)：相对 Markdown 链接、严格 link/anchor validation 和 site URL 约束。
8. Material for MkDocs — [Changing the language](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/)：单项目 canonical language、language selector、`lang`/`hreflang`、Stay on page 和多语言子路径建议。

### 成熟文档项目的官方治理资料

9. Kubernetes — [Localizing Kubernetes documentation](https://kubernetes.io/docs/contribute/localization/)：locale 目录与英文 URL 对齐、minimum required content、语言团队、源 release、单 locale PR 和机器翻译人工审查门槛。
10. MDN Web Docs — [MDN Web Docs localization](https://developer.mozilla.org/en-US/docs/MDN/Community/Translated_content)：活跃/机器翻译/退休 locale、维护责任和未维护 locale 的处理。
11. MDN translated-content — [Translation guidelines](https://github.com/mdn/translated-content/blob/main/docs/README.md)：`l10n.sourceCommit`、禁止部分翻译、机器翻译只能作参考以及 locale-specific 指南结构。

### 仓库内一手证据

- `AGENTS.md`：项目工作规则、证据语言、来源/许可证边界和验证命令。
- `docs/adr/0010-locale-suffixed-content.md`：六 locale、后缀、content identity、同语言链接、URL 状态、migration/release mode 和 translation status 的目标决策。
- `docs/governance/locale-matrix.yaml`：截至审计时实际登记的 4 个 `content_id`、24 个 locale 路径槽位和 migration mode。
- `scripts/validate_localization.py`：截至审计时实际可运行的矩阵、文件名、存在性、有限同语言链接和 legacy notice 检查。
- `site/index.html`、`site/app.js`：当前 showcase 的 EN / 中文 UI、`?lang` / `localStorage` 行为和“入口切片而非六语言完整”的公开表述。
- `README-*.md`、`book/*-*.md`：入口内容、迁移说明、22 章/13 labs 状态和当前 reader-facing 链接边界。

## 10. 审计后的最小决策

在实现任何代码前，应先确认以下四件事：

1. **范围：** “六语言支持”是指全量 22 章 + 13 labs + 7 Skills，还是另有明确的 public minimum set；必须写成可计数的矩阵范围。
2. **Skill 文件契约：** loader 是否允许 `SKILL-EN.md` 等后缀；若不允许，执行文件如何保持 locale-neutral、reader-facing 翻译放在哪里。
3. **canonical URL：** 当前继续 `?lang=`，还是将来采用 locale path；只能有一套 canonical 规则，旧 URL 需要可验证的兼容映射。
4. **stale 版本源：** `source_revision` 使用提交、内容 digest 还是二者组合；谁负责翻译审查和 stale 解除。

在这四项没有形成可执行契约前，继续新增入口文件只会增加“看起来有六种语言”的数量，不能减少实际迁移风险。
