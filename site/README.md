# Prysai LLM Playbook 展示页

这是 Prysai LLM Playbook 的静态展示页实现，范围仅限 `site/`。页面采用 Swiss editorial 方向：白色/中性背景、近黑文字、单一 Swiss Red `#E4002B`、可见细线网格和左对齐编辑层级。公开页默认英文，支持六个 locale 入口；仓库正在迁移六种内容语言，但运行时 UI 字典目前仍只提供 EN / 中文，ES / JA / KO / DE 会显示明确的 English UI 与内容 fallback 状态，页面不会把入口切片说成整本书或完整 UI 已经六语种化。学习路径面板由 `docs/governance/learning-path.yaml`、`docs/governance/content-status.yaml` 和 `site/content-catalog.json` 生成，`site/learning-path-data.js` 是提交到仓库的生成物；内容身份、语言文件存在性和 fallback 路径由 `site/locale-manifest.js` 生成，两个生成物都不应手工编辑。页面的核心交互是：

- 六语言菜单支持 `?lang=en|zh|es|ja|ko|de`。URL 是可分享的第一优先级，`localStorage` 只是没有显式参数时的便利；菜单切换会保留当前路径、查询参数和 hash。EN / 中文会更新 UI 字典，其他 locale 会保留目标内容 locale 并明确提示 UI/内容 fallback；
- 章节、实验和学习路径链接通过 `content_id + locale` manifest 解析；目标文件缺失时回退到 English source，并通过页面 banner 与链接状态标记 pending。fallback 不等于翻译完成；
- L0—L6 成长路径标签切换，会更新当前等级的说明与章节入口，并支持方向键、Home/End；
- 22 章路线按 A—D 四条路线筛选，并保留章节折叠；
- 实验区展示当前实际存在的 18 个实验，并链接到英文实验索引；
- 响应式导航在窄屏下折叠为菜单，支持 Escape 关闭和焦点返回；
- 首页语言入口使用普通导航语义并标记当前页面；Reader 提供跳到正文、异步加载/错误状态、正文语言标记和高对比度下划线 fallback；
- 所有 Markdown 章节、实验、Skill 与质量记录在本地展示页和 Pages artifact 中都先进入 Reader；Reader 仍从仓库内真实文件取源，chapter/lab 路由身份由 `content-status.yaml` 与 manifest 共同覆盖。非 Markdown 机器记录保留直接文件入口。
- 全文搜索索引不会阻塞首屏。首次输入非空查询、提交查询，或用 `?q=` 打开页面时才加载；仅用键盘聚焦搜索框不会下载索引。加载失败会显示可重试的错误状态，不会伪装成零结果。
- `visual-cases` 区块链接到两张项目原创 SVG 教学卡；它们解释方法，不证明 Skill runtime、客户需求、市场效果或生产准备度。

## Highlight component boundary

This repository is intentionally a dependency-free static site. It does not
currently contain a React, TypeScript, Tailwind, or shadcn application, so the
highlight is implemented as a semantic native element:

```html
<mark class="highlight-text highlight-lime">important text</mark>
```

The matching CSS lives in `site/styles.css` and `site/reader.css`, which keeps
the same emphasis visible in the GitHub Markdown source, the static showcase,
and the reader. It is semantic emphasis, not programming-language syntax
highlighting.

If this project is later migrated to a React application, the expected shadcn
layout is `components/ui/highlight-text.tsx` plus a shared `lib/utils.ts` and
Tailwind entry stylesheet. The optional setup path is:

```powershell
npx shadcn@latest init
npx shadcn@latest add button
```

Choose TypeScript, Tailwind CSS, and the `@/*` import alias during setup. Do
not add that build chain only for the current Pages reader: it would create a
second rendering system without improving the published static artifact.

页面公开名称是 Prysai LLM Playbook；Prysai Lab Logo 作为项目负责人提供的品牌归属标记出现在表头和页脚。Codex Practice Track 是当前旗舰路线。Skill 链接保留仓库内部目录名，以保持安装和文件路径兼容。Logo 的授权边界和显示衍生版见 `assets/branding/` 与 `docs/sources/asset-register.md`。

## 本地打开

在仓库根目录运行受限的预览服务：

```powershell
$py = 'C:\\Users\\Administrator\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe'
& $py scripts\serve_pages_candidate.py --port 4173
```

然后访问 `http://127.0.0.1:4173/`。该命令先构建 `_site/` 候选产物，再只从这个受限产物目录提供文件，并且默认只绑定本机回环地址；它不会把仓库根目录、`.git/`、`.work/`、`node_modules/` 或其他本地工作目录作为预览根目录公开。使用 `Ctrl+C` 停止服务。

## GitHub Pages

The repository includes a Pages workflow at
`.github/workflows/pages.yml`. It builds a bounded artifact with
`scripts/build_pages_artifact.py`, keeping the visual site and the reader-facing
source directories while excluding `.git/`, `.work/`, `tmp/`, symbolic links,
and high-confidence credential signatures. The project-root entry uses the same
`site/` source through a relative base path, so the local `/site/` route remains
useful for development.

The workflow can build the artifact in any repository, but GitHub Pages itself
may be unavailable for a private repository on the current account plan. Check
the repository's Pages settings or API state before calling the site deployed.
The workflow's success is not, by itself, proof that Pages is enabled or that
the public URL is reachable.

The workflow is named **Build Prysai LLM Playbook Pages candidate artifact**. With
the default `deploy: false`, its summary records
`deployment_status=not_deployed`; a green run means only that the bounded
review artifact was built and uploaded. Deployment requires an explicit
`deploy: true` dispatch and remains a separate observable job.

The showcase rewrites Markdown links to `reader.html?path=...` both in local
`/site/` development and in the Pages artifact. The reader fetches the original
Markdown source and renders a bounded, dependency-free reading view; the source
files remain visible and authoritative in the repository. The release-only flag
still handles the different Pages root/base path, but it no longer changes
whether a learner receives a coherent reading surface.

Reader source requests have a bounded deadline and an in-place retry. The
page-level evidence registry is an independent enhancement: slow or unavailable
evidence metadata cannot block the article, navigation, locale, source path, or
document title. At 390 px, the header is not sticky and the title plus opening
paragraph appear before the auxiliary chapter and page-outline disclosures.
The evidence card separates the last completed review from the next scheduled
review and does not present either as certification or a freshness guarantee.

Run the artifact check locally:

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\build_pages_artifact.py --check
```

## 验证

1. 默认打开 `http://127.0.0.1:4173/`，确认页面为英文，`document.documentElement.lang` 为 `en`；
2. 访问 `?lang=en`、`?lang=zh`、`?lang=es`、`?lang=ja`、`?lang=ko`、`?lang=de`，确认菜单高亮、banner 状态和 URL 保持；显式 URL 必须优先于旧的 `localStorage` 值；
3. 在每一种语言下确认正文、标题、description、aria-label 和 `lang` 同步；缺失单元必须显示该语言的不可用提示，不得静默切换到英文或其他语言；
4. 点击章节、实验和学习路径入口，确认它们解析到当前 locale 的存在文件，或显示该 locale 的待翻译不可用状态；确认路径、查询参数和 hash 不丢失；
5. 检查导航锚点、章节筛选、章节折叠和 L0—L6 切换；用方向键、Home/End 操作等级标签；
6. 检查 18 个实验卡片、索引链接和窄屏布局与菜单展开；菜单打开后按 Escape，确认焦点回到菜单按钮；Reader 还要检查跳到正文、加载状态、错误状态和中文外壳文案；
7. 分别在 320px、390px、820px、980px 宽度检查无横向溢出、触控目标可用、中文不被截断；
8. 确认没有外部字体、脚本、图片或 CDN 请求，控制台无错误；
9. 构建 `_site` 后运行 `node scripts/browser_smoke.mjs`；确认首屏没有请求全文索引、搜索意图只加载一次索引、两个 First Win 复制反馈、Reader 正文与上一章/下一章、无效路径错误状态及 390px 回流均通过；
10. 在仓库根目录执行项目验证：

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\validate_project.py
& $py scripts\audit_input_archives.py
& $py scripts\validate_update_registry.py
& $py scripts\validate_site_i18n.py
& $py scripts\validate_content_status.py
& $py scripts\build_learning_path_site.py --check
& $py scripts\build_site_locale_manifest.py --check
```

本页对项目状态的表述以 `docs/governance/content-status.yaml` 为当前单一状态源，并由 `docs/quality/current-state-review-2026-08-09.md` 解释证据边界；`book/table-of-contents-EN.md`、`book/labs/README.md`、`docs/governance/update-map.md` 仍是对应领域的阅读入口。六语种内容入口的身份和翻译状态以 `docs/governance/locale-matrix.yaml` 为准。2026-08-10 已完成一次范围化的本地浏览器验收，详见 `docs/quality/review-public-site-browser-2026-08-10.md`；这不等于完成完整视觉、屏幕阅读器、对比度、跨浏览器、部署环境或真实用户验收。当前页面实现状态仍为 **candidate**，页面不把 `candidate` 写成 `verified` 或 `production-ready`。
