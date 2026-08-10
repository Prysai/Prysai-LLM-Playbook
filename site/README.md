# Codex: From First Task to Real Work 展示页

这是 Codex: From First Task to Real Work 的静态展示页实现，范围仅限 `site/`。页面采用 Swiss editorial 方向：白色/中性背景、近黑文字、单一 Swiss Red `#E4002B`、可见细线网格和左对齐编辑层级。公开页默认英文，支持中文切换；书籍正文当前仍以简体中文为主，页面不会把正文说成已经完整双语化。页面的核心交互是：

- EN / 中文切换会更新可见文案、`lang`、标题、description、aria-label，并通过 URL `?lang=en|zh` 和 `localStorage` 保留选择；
- L0—L6 成长路径标签切换，会更新当前等级的说明与章节入口，并支持方向键、Home/End；
- 22 章路线按 A—D 四条路线筛选，并保留章节折叠；
- 实验区展示当前实际存在的 12 个实验，并链接到实验索引；
- 响应式导航在窄屏下折叠为菜单，支持 Escape 关闭和焦点返回；
- 所有章节、实验、Skill、质量记录链接指向仓库内的真实文件。

页面公开名称不包含组织名；维护与治理归属只在页脚说明中出现。Skill 链接保留仓库内部目录名，以保持安装和文件路径兼容。

## 本地打开

在仓库根目录启动一个静态文件服务，例如：

```powershell
py -m http.server 4173
```

然后访问 `http://localhost:4173/site/`。也可以直接打开 `site/index.html`，但使用静态服务更接近正常链接环境。

## 验证

1. 默认打开 `http://localhost:4173/site/`，确认页面为英文，`document.documentElement.lang` 为 `en`；
2. 点击 EN / 中文，确认正文、标题、description、aria-label 和 `lang` 同步，刷新后语言保持；访问 `?lang=zh` 和 `?lang=en` 也应可分享；
3. 检查导航锚点、章节筛选、章节折叠和 L0—L6 切换；用方向键、Home/End 操作等级标签；
4. 检查 12 个实验卡片、索引链接和窄屏布局与菜单展开；菜单打开后按 Escape，确认焦点回到菜单按钮；
5. 分别在 320px 和 390px 宽度检查无横向溢出、触控目标可用、中文不被截断；
6. 确认没有外部字体、脚本、图片或 CDN 请求，控制台无错误；
4. 在仓库根目录执行项目验证：

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\validate_project.py
& $py scripts\audit_input_archives.py
& $py scripts\validate_update_registry.py
& $py scripts\validate_site_i18n.py
& $py scripts\validate_content_status.py
```

本页对项目状态的表述以 `docs/governance/content-status.yaml` 为当前单一状态源，并由 `docs/quality/current-state-review-2026-08-09.md` 解释证据边界；`book/table-of-contents.md`、`book/labs/README.md`、`docs/governance/update-map.md` 仍是对应领域的阅读入口。当前页面实现状态为 **candidate**：静态文件与交互已实现，仍需在目标浏览器完成视觉与可访问性人工验收；页面不把 `candidate` 写成 `verified` 或 `production-ready`。
