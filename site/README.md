# Prysai LLM Playbook 展示页

这是 Prysai LLM Playbook 的静态展示页实现，范围仅限 `site/`。页面采用 Swiss editorial 方向：白色/中性背景、近黑文字、单一 Swiss Red `#E4002B`、可见细线网格和左对齐编辑层级。公开页默认英文，并提供 EN、ZH、ES、JA、KO、DE、ZHTW 七种界面语言与对应课程路径。首页先让读者选择今天要完成的事、生成一条可直接使用的提示词，再展示课程索引与项目资料；它不会要求新用户先理解仓库目录。学习路径面板由 `docs/governance/learning-path.yaml`、`docs/governance/content-status.yaml` 和 `site/content-catalog.json` 生成，`site/learning-path-data.js` 是提交到仓库的生成物；内容身份和语言路径由 `site/locale-manifest.js` 生成，两个生成物都不应手工编辑。页面的核心交互是：

- 七语言菜单支持 `?lang=en|zh|es|ja|ko|de|zh-tw`。URL 是唯一的语言来源：没有参数的入口始终是英文；菜单切换会保留当前路径、查询参数和 hash；
- 章节、实验和学习路径链接通过 `content_id + locale` manifest 解析，并始终停留在所选语言路径；Reader 不会静默把正文切回英文；
- L0—L6 成长路径标签切换，会更新当前等级的说明与章节入口，并支持方向键、Home/End；
- 22 章路线按 A—D 四条路线筛选，并保留章节折叠；
- 实验区展示当前实际存在的 18 个实验，并链接到英文实验索引；
- 响应式导航在窄屏下折叠为菜单，支持 Escape 关闭和焦点返回；
- 首页主菜单使用显式 `index.html#...` 入口，避免 Hugging Face Static Space 的 iframe、Pages 根入口和 `/site/` 开发入口把片段解析到不同文档；页眉与页脚 Logo 在普通 Docs 页面使用 `_top` 回到 canonical Docs 首页，在被 Hugging Face sandbox iframe 包裹时由运行时代码改为带 `noopener` 的用户触发新标签页；同一嵌入模式下，Start here、Learning path、Reading routes 和 Project index 也改为 canonical Docs 的新标签页入口，并保留当前 `lang` 参数，避免宿主把相对链接解析成错误的 `/site/` 路径；
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
`site/` source through an explicit `site/index.html` base document. This keeps
the local `/site/` route useful for development and prevents static hosts from
treating fragment navigation as a directory request.

On qualifying pushes to `main`, the workflow builds the artifact and requests
a GitHub Pages deployment. GitHub Pages must remain enabled in the repository
settings for the deployment job to publish it. A successful workflow is
deployment evidence for that run, but it is not proof that the public URL is
currently reachable to readers, indexed, or ranked; check the deployment URL
and a fresh HTTP request separately.

## Docs mirror

The same bounded artifact is also mirrored to
`https://docs.prysai.com/llm-playbook/` after a qualifying push to `main`.
The mirror is served by a restricted deployment account: it accepts a static
archive only, validates its paths and file types, and atomically changes the
published release. The deployment key is stored as the protected
`DOCS_DEPLOY_SSH_KEY` GitHub Environment secret and is never committed here.

The workflow is named **Build and publish Prysai LLM Playbook site**. A
qualifying push to `main` builds the bounded artifact, deploys it to GitHub
Pages, and requests the atomic Docs mirror publish. Manual dispatch defaults
to `deploy: true`; choosing `false` builds only the bounded review artifact.
The GitHub Pages and Docs mirror jobs are separate observable jobs. A green
build alone does not prove either public origin now serves the new files.

## Search metadata and public URL

`site/seo-config.json` is the single source for the intended public site URL
and the seven supported language routes. The Pages artifact generator uses it to
create `robots.txt` and `sitemap.xml`; the home page uses the same route shape
for canonical, alternate-language, Open Graph, Twitter, and structured-data
metadata. If the project moves to a custom domain, change only
`public_site_url`, then rebuild the artifact.

The generated artifact also exposes `sitemap_index.xml` as a compatibility
entry point. The canonical project URLs are under the configured public prefix:
`https://docs.prysai.com/llm-playbook/sitemap.xml` and
`https://docs.prysai.com/llm-playbook/sitemap_index.xml`. The main sitemap lists
the seven crawlable locale entries plus Reader URLs whose source file exists, whose
content status is at least `candidate`, and whose translation is not
`in-progress`, `not-started`, or `stale`. This keeps draft and incomplete
translations out of crawler discovery even though the Reader may display them
with an explicit status notice for review. Missing translations and other
non-renderable records are excluded. The domain-root URL
`https://docs.prysai.com/sitemap_index.xml` belongs to the host-level site, not
this repository's `/llm-playbook/` artifact, so changing this project cannot
create or repair that root-level endpoint.

The same configuration defines the public site name and the discovery alias
`LLMPlaybook`, emitted as Schema.org `WebSite.name` and `alternateName` on each
language entry. This helps a crawler associate the spelling with the site; it
does not create a ranking, guarantee indexing, or replace useful content and
independent links.

These files make a deployment ready for crawlers. They do not prove that Pages
is enabled, that the URL is publicly reachable, that a crawler has indexed the
site, or that the site will rank for a query.

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
2. 访问无参数入口以及 `?lang=en`、`?lang=zh`、`?lang=es`、`?lang=ja`、`?lang=ko`、`?lang=de`，确认菜单高亮、banner 状态和 URL 保持；无参数和 `?lang=en` 必须始终呈现英文，不能继承浏览器旧偏好；
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

本页对项目状态的表述以 `docs/governance/content-status.yaml` 为当前单一状态源，并由 `docs/quality/current-state-review-2026-08-09.md` 解释证据边界；`book/table-of-contents-EN.md`、`book/labs/README-EN.md`、`docs/governance/update-map.md` 仍是对应领域的阅读入口。七语种内容入口的身份和翻译状态以 `docs/governance/locale-matrix.yaml` 为准。2026-08-10 已完成一次范围化的本地浏览器验收，详见 `docs/quality/review-public-site-browser-2026-08-10.md`；这不等于完成完整视觉、屏幕阅读器、对比度、跨浏览器、部署环境或真实用户验收。当前页面实现状态仍为 **candidate**，页面不把 `candidate` 写成 `verified` 或 `production-ready`。
