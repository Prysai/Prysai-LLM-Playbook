# Codex: From First Task to Real Work 实施计划

## 总览

把六个输入项目重新组织成一套从 GPT/Codex 入门、真实任务实践、Skill 选择、Agent 工作逻辑、结果验证到团队能力建设的书籍式学习系统。每一阶段都必须留下来源、许可证、内容状态和可检查证据。

## 当前阶段

本轮进入“高信息密度蓝皮书”升级：以英文为默认开发优先级，逐步让全部 reader-facing 文件带语言后缀并保持同语言链接；同时把官方机制、真实用户问题、Skill 工程、评测和视觉阅读体验串成可验证路径。当前仓库仍处于公开开发阶段；书稿、Skill、实验、翻译和评测中的未验证部分必须继续保持 `draft`、`candidate`、`in-progress` 或 `not_run`。当前状态以 `docs/governance/content-status.yaml` 与 `docs/governance/locale-matrix.yaml` 为准。

## 当前切片：Chapter 9 English source

本切片把“证据审查与恢复”从当前中文源文件迁移为英文主线源文件，并让
README、书籍目录、展示页、学习路径和状态登记指向同一 `-EN` 入口。章节
保持 `candidate`，实验保持 `not_run`，因为本项目尚未完成声明范围内的
fresh-context 前测和运行时评测。新增的证据恢复阶梯图是项目原创教学资产，
只表达方法关系，不作为 Skill、Agent、用户验收或生产运行证据。

### Acceptance criteria

- [x] Chapter 9 EN source contains the problem, objectives, claim-to-evidence
      mapping, failure/recovery order, breakpoint card, experiment, deliberate
      failure, transfer, acceptance checklist, and volatile-fact boundaries.
- [x] All English reader-facing entries link to the `-EN` source, while the
      legacy Simplified Chinese path remains recorded as a legacy path.
- [x] The teaching SVG has no external assets or runtime claims and is recorded
      in `docs/sources/asset-register.md`.
- [x] Project validators, local links, diff checks, and manual content review
      pass before commit.
- [ ] Browser/visual review of the local static server remains pending because
      the embedded browser blocks loopback URLs with `ERR_BLOCKED_BY_CLIENT`.

## 当前切片：Book navigation and project map

本切片把 22 章的阅读顺序、英文迁移边界和章节页脚导航收敛到
`docs/governance/book-navigation.yaml`。生成器只维护章节文件中的标记块：首章
只有“下一章”，中间章有“上一章/下一章”，末章只有“上一章”。项目地图则把
章节、实验、Skill、研究、治理、质量、来源、案例、评测、脚本和站点的职责写清楚，
让新贡献者能从目录直接定位内容。

### Acceptance criteria

- [x] The research record cites first-party structure sources and records the
      reference-only/license boundary.
- [x] The navigation source contains all 22 chapters in order and distinguishes
      English source paths from migration-pending legacy paths.
- [x] The generator is idempotent and the validator checks first/middle/last
      footer boundaries, path resolution, and migration labels.
- [x] README, book entry, and English table of contents link to the project map.

## 当前切片：Canonical project directory map

本切片把“从 GitHub 目录找文件”与“沿书籍主线阅读”分成两个互补入口：
`docs/governance/project-structure.yaml` 是目录职责、首入口、权威来源和
生成边界的机器契约；各主要目录提供短 landing page；`docs/project-map-EN.md`
是面向人的投影。它不改变 22 章的 canonical order，也不把结构检查写成
运行、翻译或学习掌握证据。

### Acceptance criteria

- [x] Every non-excluded top-level directory is represented in the structure contract.
- [x] Important subdirectories have a discoverable entry page.
- [x] Generated outputs name their source, owner, and edit rule.
- [x] CI runs `scripts/validate_project_structure.py`.
- [x] Structure, link, localization, content-status, and generated-data checks pass.
- [ ] Browser review of the local static server remains a separate pending gate.

## 阶段任务

### 阶段 1：地基与命名

- [ ] 确认对外项目名为 `Codex: From First Task to Real Work`，中文副标题为“Codex：从第一个任务到真实工作”。
- [x] 完成 GitHub 同类项目命名研究，并形成可复核的候选记录。
- [x] 在本地 README、书稿入口和展示页采用统一的名称候选。
- [x] 将组织名限制在治理、归属、许可证、贡献和发布门禁文件。
- [x] 建立 22 章目录、实验、来源台账和首批能力包。

### 阶段 2：内容融合与更新

- [x] 对六个输入压缩包完成目录级审计和候选 Skill 清单。
- [x] 完成第 4–7 章一轮官方事实刷新，并保留账户级、运行时和评测未验证边界。
- [ ] 按许可证和内容边界逐项抽取、改写和归属。
- [ ] 完成第 1–22 章的新鲜上下文前测与修订。
- [ ] 为工程、研究、营销、内容/设计/数据/自动化建立可迁移实践。
- [ ] 研究并吸收 LLM、Agent、工具调用、上下文选择、提示注入和评测的一手机制资料，形成可插入章节的机制卡与失败实验。
- [ ] 建立持续更新的真实问题波次，优先收录可访问的 GitHub Issues、Stack Overflow/Stack Exchange、Hacker News 和公开社区报告，并将问题接入章节、实验、Skill 和评测。
- [ ] 对 22 章做信息密度审稿，优先补齐“现实症状—机制解释—最小实验—故意失败—证据—迁移”的缺口。
- [ ] 研究并记录高质量同类教程的内容结构、案例模型、搜索、版本和贡献机制；只做原创重写，不复制表达或资产。

### 阶段 3：能力包与评测

- [x] 建立 7 个内部 Skill 的初版结构。
- [ ] 为每个 Skill 完成正例、边界例、失败例和迁移例。
- [x] 完成 Coach、Workflow Orchestrator、Research Router、Product Context 的独立静态合同审查，并记录其与运行验证的边界。
- [x] 建立 39 项固定评测夹具，覆盖 16 个轨道。
- [ ] 运行模型/工作流评测，保留输入、输出、环境、评分和复核人。
- [ ] 只有在声明范围内完成前测后，才把状态从 `candidate` 改为 `verified`。

### 阶段 4：发布与持续维护

- [x] 建立私有 GitHub 开发仓库和基础质量工作流。
- [x] 建立机器可读的当前状态源、状态验证器和 CI 门禁。
- [ ] 完成许可证、公开范围和维护责任审查。
- [ ] 完成展示页与书稿入口的持续可用性检查。
- [ ] 建立易变事实的定期复核、迁移指南和下线策略。
- [x] 为本轮事实刷新建立 ADR、质量记录和状态/维护索引交接。
- [ ] 完成默认 EN 的 6 语言 reader-facing 内容矩阵，或在迁移期间逐项公开缺口，不把入口文件数量写成全书翻译完成。
- [ ] 让语言切换保持 `content_id`、语言后缀、同语言链接、锚点和可分享 URL 状态，并用自动检查和浏览器检查证明。
- [ ] 首页透明展示源码目录、学习路径、现实问题、实验、Skill、评测、状态和未验证边界。
- [ ] 将站点视觉优化为清晰的蓝皮书阅读入口：先证明内容路径和实际链接，再逐步增强层次、响应式、键盘和可访问性。

## 验收证据

- 结构、来源档案、评测夹具和本地链接检查通过；
- 当前状态源覆盖 22 章、13 个实验、7 个 Skill、39 项评测和展示页；
- Skill 结构校验通过，但不得把结构通过描述为运行或生产验证；
- 章节和 Skill 的状态与实际证据一致；
- 私有仓库元数据、README、展示页和治理文档使用同一项目名；
- 没有 token、压缩包、个人数据或其他秘密进入版本库。

## 风险

| 风险 | 应对 |
|---|---|
| 外部材料许可证不清 | 只保留审计记录或原创改写，必要时隔离并附归属 |
| 产品和模型事实过时 | 记录官方来源、访问日期、适用范围和下次复核责任 |
| 结构检查掩盖实际效果 | 用 fresh-context 前测、运行日志和人工复核推进状态 |
| Skill 名称带来品牌噪音 | 公开显示使用功能名，技术目录名只为安装兼容保留命名空间 |
