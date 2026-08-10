# 公共展示页浏览器验收记录

**验收日期：** 2026-08-10
**验收状态：** candidate
**验收范围：** 本地静态服务 http://localhost:4173/site/；英文默认、中文切换、学习路径、L3 实验入口、窄屏布局、窄屏菜单和控制台错误
**环境边界：** Codex 应用内浏览器；本地静态服务；未登录外部账户；未读取凭据、Cookie、localStorage 内容或浏览历史

## 实际运行证据

| 检查 | 结果 | 实际观察 |
|---|---|---|
| 英文默认 | passed | 无 lang 参数打开后，document.documentElement.lang 为 en，标题为英文；生成学习路径正常加载 |
| URL 指定英文 | passed | ?lang=en 保持英文、更新标题和 description，学习路径警告为隐藏 |
| 中文切换 | passed | 点击语言按钮后 lang 为 zh-CN，URL 变为 ?lang=zh，标题、按钮 aria-label 和实验卡片文案切换为中文 |
| L3 学习路径 | passed | 选择 L3 后显示 L3，主实验为“Auditable vertical slice”，下一实验入口指向实验 013，支撑实验同时显示实验 003、007、009 |
| 实验 013 展示卡 | passed | 英文页面存在一张 Auditable vertical slice 卡片；中文页面切换为“可审计的竖向切片” |
| 320px 布局 | passed | scrollWidth 等于 clientWidth（305px），未发现横向溢出 |
| 390px 布局 | passed | scrollWidth 等于 clientWidth（375px），未发现横向溢出 |
| 窄屏菜单 | passed | 390px 下菜单按钮可见；点击后 aria-expanded=true 且导航获得 is-open；按 Escape 后关闭并将焦点返回菜单按钮 |
| 控制台 | passed | 本次页面加载与交互未观察到 error 或 warning 日志 |
| 本地页面响应 | passed | http://localhost:4173/site/ 返回 HTTP 200 |

## 未由本次记录证明的内容

- 未证明 GitHub Pages、生产域名或任意外部部署环境已更新。
- 未证明 Markdown 源文件在所有托管平台上会以终端读者友好的 HTML 渲染。
- 未完成屏幕阅读器、真实移动设备、色彩对比度工具、性能、跨浏览器和用户测试。
- 未运行实验 013、39 项评测或 7 个项目 Skill 的完整 fresh-context 前测；这些状态保持 draft / candidate / not_run。
- 本记录证明的是当前本地页面在上述尺寸和交互范围内的运行观察，不把页面整体升级为 verified 或 production-ready。

## 下一次页面变更的最小复核

每次改变站点文案、生成数据、语言字典、响应式规则或交互脚本后，至少重跑英文默认、中文切换、L3 主实验、320/390px 无溢出、窄屏菜单 Escape、控制台和本地链接检查；若改变部署配置，还要在目标部署环境重新验收。
