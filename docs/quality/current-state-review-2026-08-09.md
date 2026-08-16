# 当前状态审查记录

**审查日期：** 2026-08-09
**审查方式：** 读取当前工作树、运行结构与内容契约校验，并对章节、实验、Skill、评测和展示页的登记项做路径交叉检查。
**当前结论：** 项目整体为 `candidate`；实验和评测尚未运行，展示页尚未完成目标浏览器验收，不能标记为 `verified` 或 `production-ready`。

## 当前状态快照

| 范围 | 当前数量 | 当前状态 | 运行/复核边界 | 规范入口 |
|---|---:|---|---|---|
| 章节 | 22 | `candidate` | 内容契约与路径可检查；学习者前测未闭环 | [`book/chapters/`](../../book/chapters/) |
| 实验 | 12 | `draft` | `run_status: not_run`；没有运行日志就不能称为已验证 | [`book/labs/README-EN.md`](../../book/labs/README-EN.md) |
| 项目 Skill | 7 | `candidate` | 结构检查通过；3/7 完成基础独立上下文前测，全部仍需更完整证据 | [`docs/skill-registry.md`](../skill-registry.md) |
| 评测夹具 | 38 项 / 15 轨道 | `candidate` | `run_status: not_run`；当前只有固定夹具结构 | [`evals/task-set-v1.yaml`](../../evals/task-set-v1.yaml) |
| 展示页 | 1 | `candidate` | 英文默认、中文切换已写入；`browser_review: pending` | [`site/README.md`](../../site/README.md) |
| 输入归档与许可证 | 6 个归档 | `candidate` | 仓库 MIT 与第三方范围已记录；发行范围仍需最终审查 | [`docs/sources/asset-register.md`](../sources/asset-register.md) |

## 已确认的改进

- 章节、实验、Skill、评测和展示页现在由 [`docs/governance/content-status.yaml`](../governance/content-status.yaml) 提供当前状态和证据路径。
- [`scripts/validate_content_status.py`](../../scripts/validate_content_status.py) 会检查登记项数量、路径、状态、日期和未运行边界，并已接入项目结构校验与 CI。
- 旧的质量报告保留为历史证据；它们中的旧数量或旧问题描述按报告日期理解，不覆盖当前状态。
- 第 19–22 章已有临时副本、静态权限模拟、hash/diff、回滚和 `claim_status` 边界；相关旧审查报告仍保留原始审查结论，不能当作本轮运行证据。
- 第 20–22 章引用的权限来源已统一到当前确认的 [`permission-modes`](https://learn.chatgpt.com/docs/permission-modes.md) 页面；官方事实记录的维护责任改用角色名 `facts-maintainer`。

## 仍未证明的事项

### 内容与学习效果

结构校验只能确认文件和教学合同存在，不能证明学习者已经掌握。第 1–22 章仍需在声明范围内完成正例、边界例、失败例、迁移和人工复核证据。

### 实验与评测运行

12 个实验和 38 项评测夹具目前没有提交运行日志、固定输入 hash、环境、输出、评分和复核人。因此状态源保持 `draft`/`candidate` 与 `not_run`，不提前升级。

### Skill 运行质量

3 个 Skill 的基础独立上下文前测记录在 [`docs/quality/forward-test-2026-08-09.md`](forward-test-2026-08-09.md)；这不是 7 个 Skill 全部通过，也不是迁移或生产验证。其余 4 个 Skill 仍需前测，7 个都需要更完整的正例、边界、失败、迁移和维护证据。

### 展示页运行质量

页面源码、翻译字典、相对路径和响应式规则已有静态检查；当前没有目标浏览器中的截图、键盘焦点、窄屏布局、菜单和 Markdown 入口运行记录。`browser_review` 保持 `pending`。

## 历史报告如何使用

以下报告是按日期保存的审查快照，不应被静默改写成当前结果：

- [`review-curriculum-completeness-2026-08-09.md`](review-curriculum-completeness-2026-08-09.md)：早期审查曾以 10 个实验为基线，后续增补已在报告顶部说明；当前数量以状态源为准。
- [`review-presentation-2026-08-09.md`](review-presentation-2026-08-09.md)：记录展示层当时的静态审查和浏览器运行时缺口。
- [`review-chapters-19-22-2026-08-09.md`](review-chapters-19-22-2026-08-09.md)：记录第 19–22 章修订前后的审查背景；当前章节文本已有部分修正，但本报告不替代新的运行证据。
- [`review-skills-current-2026-08-09.md`](review-skills-current-2026-08-09.md)：记录 7 个 Skill 的静态质量和前测设计边界。

## 本轮验证记录

本轮静态检查应至少包括：

```text
scripts/validate_content_status.py
scripts/validate_project.py
scripts/validate_update_registry.py
```

这些命令证明的是结构和登记表一致，不证明实验、评测、浏览器交互或外部服务行为已经运行。

## 下一次复核

| 事项 | 负责人角色 | 触发条件 | 下次复核 |
|---|---|---|---|
| 官方产品事实 | `facts-maintainer` | 官方页面、模型、权限或 Skill 行为变化 | 2026-09-09 |
| 评测夹具与运行日志 | `evaluation-maintainer` | 模型、Skill、工作流或失败类别变化 | 2026-09-09 |
| 展示页浏览器验收 | `site-maintainer` | 导航、语言、数量或页面交互变化 | 2026-09-09 |
| 章节、实验和 Skill 状态 | 对应维护角色 | 新鲜前测、运行日志或许可证证据出现 | 2026-11-09 |
