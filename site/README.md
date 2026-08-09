# Codex Field Guide 展示页

这是 Codex Field Guide 的静态展示页实现，范围仅限 `site/`。页面采用 Swiss editorial 方向：白色/中性背景、近黑文字、单一 Swiss Red `#E4002B`、可见细线网格和左对齐编辑层级。页面的核心交互是：

- L0—L6 成长路径标签切换，会更新当前等级的说明与章节入口；
- 22 章路线按 A—D 四条路线筛选，并保留章节折叠；
- 响应式导航在窄屏下折叠为菜单；
- 所有章节、实验、Skill、质量记录链接指向仓库内的真实文件。

## 本地打开

在仓库根目录启动一个静态文件服务，例如：

```powershell
py -m http.server 4173
```

然后访问 `http://localhost:4173/site/`。也可以直接打开 `site/index.html`，但使用静态服务更接近正常链接环境。

## 验证

1. 检查导航锚点、章节筛选、章节折叠和 L0—L6 切换；
2. 检查窄屏布局与菜单展开；
3. 确认没有外部字体、脚本、图片或 CDN 请求；
4. 在仓库根目录执行项目验证：

```powershell
$py = 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
& $py scripts\validate_project.py
& $py scripts\audit_input_archives.py
```

本页对项目状态的表述来自仓库内的 `book/table-of-contents.md` 与 `docs/quality/forward-test-2026-08-09.md`。当前页面实现状态为 **candidate**：静态文件与交互已实现，仍需在目标浏览器完成视觉与可访问性人工验收；页面不把 `candidate` 写成 `verified` 或 `production-ready`。
