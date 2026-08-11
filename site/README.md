# Codex: From First Task to Real Work 展示页

这是 Codex: From First Task to Real Work 的静态展示页实现，范围仅限 `site/`。页面采用 Swiss editorial 方向：白色/中性背景、近黑文字、单一 Swiss Red `#E4002B`、可见细线网格和左对齐编辑层级。公开页默认英文，支持六个 locale 入口；仓库正在迁移六种内容语言，但运行时 UI 字典目前仍只提供 EN / 中文，ES / JA / KO / DE 会显示明确的 English UI 与内容 fallback 状态，页面不会把入口切片说成整本书或完整 UI 已经六语种化。学习路径面板由 `docs/governance/learning-path.yaml`、`docs/governance/content-status.yaml` 和 `site/content-catalog.json` 生成，`site/learning-path-data.js` 是提交到仓库的生成物；内容身份、语言文件存在性和 fallback 路径由 `site/locale-manifest.js` 生成，两个生成物都不应手工编辑。页面的核心交互是：

- 六语言菜单支持 `?lang=en|zh|es|ja|ko|de`。URL 是可分享的第一优先级，`localStorage` 只是没有显式参数时的便利；菜单切换会保留当前路径、查询参数和 hash。EN / 中文会更新 UI 字典，其他 locale 会保留目标内容 locale 并明确提示 UI/内容 fallback；
- 章节、实验和学习路径链接通过 `content_id + locale` manifest 解析；目标文件缺失时回退到 English source，并通过页面 banner 与链接状态标记 pending。fallback 不等于翻译完成；
- L0—L6 成长路径标签切换，会更新当前等级的说明与章节入口，并支持方向键、Home/End；
- 22 章路线按 A—D 四条路线筛选，并保留章节折叠；
- 实验区展示当前实际存在的 13 个实验，并链接到实验索引；
- 响应式导航在窄屏下折叠为菜单，支持 Escape 关闭和焦点返回；
- 所有章节、实验、Skill、质量记录链接指向仓库内的真实文件；chapter/lab 路由身份由 `content-status.yaml` 与 manifest 共同覆盖。
- `visual-cases` 区块链接到两张项目原创 SVG 教学卡和一个房地产
  Product Context 概念案例；案例的页面截图只证明本地渲染，不证明 Skill runtime、客户需求、市场效果或生产准备度。

页面公开名称不包含组织名；维护与治理归属只在页脚说明中出现。Skill 链接保留仓库内部目录名，以保持安装和文件路径兼容。

## 本地打开

在仓库根目录启动一个静态文件服务，例如：

```powershell
py -m http.server 4173
```

然后访问 `http://localhost:4173/site/`。也可以直接打开 `site/index.html`，但使用静态服务更接近正常链接环境。

## GitHub Pages

The repository includes a Pages workflow at
`.github/workflows/pages.yml`. It builds a bounded artifact with
`scripts/build_pages_artifact.py`, keeping the visual site and the reader-facing
source directories while excluding `.git/`, `.work/`, `tmp/`, and other local
work material. The project-root entry uses the same `site/` source through a
relative base path, so the local `/site/` route remains useful for development.

The workflow can build the artifact in any repository, but GitHub Pages itself
may be unavailable for a private repository on the current account plan. Check
the repository's Pages settings or API state before calling the site deployed.
The workflow's success is not, by itself, proof that Pages is enabled or that
the public URL is reachable.

The Pages root entry sets a release-only flag so the showcase rewrites Markdown
reader links to `site/reader.html?path=...`. The reader fetches the original
Markdown source and renders a bounded, dependency-free reading view; the source
files remain visible and authoritative. Local `/site/` development keeps the
direct source links, which makes source inspection and release reading two
separate, explicit surfaces.

Run the artifact check locally:

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\build_pages_artifact.py --check
```

## 验证

1. 默认打开 `http://localhost:4173/site/`，确认页面为英文，`document.documentElement.lang` 为 `en`；
2. 访问 `?lang=en`、`?lang=zh`、`?lang=es`、`?lang=ja`、`?lang=ko`、`?lang=de`，确认菜单高亮、banner 状态和 URL 保持；显式 URL 必须优先于旧的 `localStorage` 值；
3. 在 EN / ZH 下确认正文、标题、description、aria-label 和 `lang` 同步；在 ES / JA / KO / DE 下确认英文 UI 与目标 locale fallback 都被明确标出；
4. 点击章节、实验和学习路径入口，确认它们解析到当前 locale 的存在文件，或带 pending 标记的 English fallback；确认路径、查询参数和 hash 不丢失；
5. 检查导航锚点、章节筛选、章节折叠和 L0—L6 切换；用方向键、Home/End 操作等级标签；
6. 检查 13 个实验卡片、索引链接和窄屏布局与菜单展开；菜单打开后按 Escape，确认焦点回到菜单按钮；
7. 分别在 320px 和 390px 宽度检查无横向溢出、触控目标可用、中文不被截断；
8. 确认没有外部字体、脚本、图片或 CDN 请求，控制台无错误；
9. 在仓库根目录执行项目验证：

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\validate_project.py
& $py scripts\audit_input_archives.py
& $py scripts\validate_update_registry.py
& $py scripts\validate_site_i18n.py
& $py scripts\validate_content_status.py
& $py scripts\build_learning_path_site.py --check
& $py scripts\build_site_locale_manifest.py --check
```

本页对项目状态的表述以 `docs/governance/content-status.yaml` 为当前单一状态源，并由 `docs/quality/current-state-review-2026-08-09.md` 解释证据边界；`book/table-of-contents-EN.md`、`book/labs/README.md`、`docs/governance/update-map.md` 仍是对应领域的阅读入口。六语种内容入口的身份和翻译状态以 `docs/governance/locale-matrix.yaml` 为准。2026-08-10 已完成一次范围化的本地浏览器验收，详见 `docs/quality/review-public-site-browser-2026-08-10.md`；这不等于完成完整视觉、屏幕阅读器、对比度、跨浏览器、部署环境或真实用户验收。当前页面实现状态仍为 **candidate**，页面不把 `candidate` 写成 `verified` 或 `production-ready`。
