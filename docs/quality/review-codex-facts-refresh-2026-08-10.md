# 第 4–7 章官方事实刷新与集成审查

**审查日期：** 2026-08-10
**审查状态：** `candidate`
**审查范围：** 第 4–7 章、实验 003/004/007、3 个项目 Skill、官方事实刷新记录及其维护入口。
**审查人角色：** `curriculum-maintainer`
**下一次复核：** 2026-09-09

## 结论

本轮已把一份只使用 OpenAI 官方文档的事实刷新记录接入第 4–7 章的来源入口，并补强了上下文准入、工作面选择、模型比较、Skill 生命周期、证据状态和动作边界。

本轮结论仍然是：

- 章节为 `candidate`；
- 实验为 `draft`，`run_status: not_run`；
- 3 个修改过的 Skill 仍为 `candidate`；
- 官方事实记录为 `candidate`，单条事实可以是 `current`；
- 本轮没有进行 Codex CLI、桌面应用、IDE、Cloud、Plugin、MCP 或外部账号运行验证；
- “GPT-5.6 Luna 性价比最高”仍是 `disputed` 假设，不是项目实测结论。

## 证据核对

| 检查对象 | 本轮证据 | 结论 |
|---|---|---|
| 官方事实来源 | [openai-codex-facts-refresh-2026-08-09.md](../research/openai-codex-facts-refresh-2026-08-09.md)，18 条 `official_fact`、3 条 `unconfirmed`、3 条 `local_unreproduced_boundary` | 来源字段完整；记录仍为 `candidate` |
| 第 4–7 章 | 输入准入、R0–R3、五道工作面选择门、模型卡、`not_comparable`、Skill 状态分离 | 结构与边界已集成；未完成学习者前测 |
| 实验 003/004/007 | 声明范围、证据范围、`verified/unknown/blocked`、来源/许可证/回滚、动作状态 | 教学合同已补强；实验尚未运行 |
| 项目 Skill | Task Protocol、Evidence Review、Skill Selector 增加 owner、confirmation、checkpoint、rollback、review date 等交接字段 | 静态结构可审查；未完成完整 fresh-context 验证 |
| 许可证边界 | 研究记录只保存事实、来源 URL 和适用范围，没有复制外部正文、图片、代码或 Skill 指令 | 不新增外部发行资产主张 |
| 外部状态 | 本轮未登录外部账号、安装 Plugin、连接 MCP、创建 Cloud 环境、推送 Git 或发布内容 | 外部动作 `not_observed` |

## 发现与处理

1. 新的事实记录原先没有出现在章节和维护注册表的入口中；已将第 4–7 章、内容矩阵、更新地图和官方事实注册表指向刷新记录。
2. 产品文档描述与当前账户/运行时状态容易被混用；本轮保留 `unconfirmed` 和 `local_unreproduced_boundary`，并在 ADR-0006 中固定风险与证据门。
3. 组织、仓库、连接器和模型可用性没有从登录状态推断；后续实验必须分段记录身份、资源、动作和结果证据。

## 尚未证明的事项

- 任何 Codex 工作面中的真实沙盒拒绝、审批提示、模型切换、Skill 触发、Plugin 安装、MCP 连接或 Cloud diff；
- 7 个 Skill 的完整正例、边界例、失败例、迁移例和独立 fresh-context 结果；
- 38 项评测的实际运行结果，以及 Luna、Terra、Sol 的任务级比较；
- 展示页的目标浏览器、键盘、窄屏和语言切换人工验收；
- 六个输入归档的最终发行许可和组织发布范围。

## 下一步

1. 使用项目 Python 运行结构、内容、链接、评测、状态和 Skill 校验；
2. 只提交本轮正式文件，保留 `.work/`、`tmp/` 和未纳入本轮的研究草稿；
3. 推送后检查 GitHub Actions，并把运行结果作为本轮交付证据；
4. 下一轮优先补 7 个 Skill 的 fresh-context 前测和第 19–22 章的运行/学习者证据。
