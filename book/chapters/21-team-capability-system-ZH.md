<!-- content_id: chapter-21-team-capability-system | locale: ZH | language: zh-CN | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 21 章：构建团队能力系统

> `content_status: candidate`
> `experiment_status: draft / not_run`
> 权限练习是静态模拟。它不授权、不连接、不发送、不写入、不推送、不发布，也不证明生产连接可用。

## 本章要解决的问题

一个人可以凭经验引导 Codex 完成任务。团队面临的却是不同的问题：规则归谁所有？哪个 Skill 值得信任？由谁来更新它？每个成员的权限是否都超出了任务所需？成功的例子能否在没有口头背景的情况下被复现？没有共同的语言、证据和责任，团队只是在分发不透明的个人习惯。

## 一个现实世界的问题入口

FP-03 涉及主机或组织标识不一致，FP-04 涉及跨多个组织授权时的混乱，它们都是公开的问题报告，不是关于连接器行为的普适结论。在这里，它们只被用来测试一件事：在共享能力之前，主机、组织、权限和所有权是否已被明确记录。

## 学习目标

学完本章后，你应该能够：

- 把个人方法拆分为共同语言、方法、证据和治理；
- 交付一个带 manifest、版本、负责人、来源、权限矩阵和回滚说明的能力包；
- 让另一位成员在可丢弃副本中独立复现关键工作流；
- 把使用、修改、执行、推送、发布和权限变更分配给不同的责任；
- 当能力的来源发生变化、范围过宽或行为不再有证据支持时，阻止、回滚、迁移或退役该能力。

## 概念：团队能力包的四层

```text
共同语言和项目规则
            ↓
可复用的方法与 Skill
            ↓
实验、任务集和证据标准
            ↓
权限、审查、版本化和维护所有权
```

共同语言让成员使用同一套术语。方法层定义有边界的输入、触发条件、行动和停止条件。证据层在声明的范围内支撑结论。治理层决定谁可以使用、修改、发布和撤销这个包。没有证据，方法只是建议；没有治理，它就可能传播过时的事实或扩大权限。

## 决策：行动权限与责任

“已登录”和“有访问权限”都不是批准记录。请用以下字段逐项决定每个能力：

| 行动级别 | 数据范围 | 技术权限 | 任务授权 | 批准人 | 所需证据 | 回滚或复核 |
|---|---|---|---|---|---|---|
| 只读分析 | 脱敏的可丢弃副本 | 只读 | 明确的任务范围 | 任务负责人 | 输入、来源和日志 | 丢弃副本；按任务复核 |
| 草稿编辑 | 隔离分支 | 限定写入 | 指定文件或目录 | 负责人加复核者 | 基线哈希、diff 和验证 | 恢复 diff；合并前复核 |
| 运行检查 | 测试数据 | 仅限指定命令 | 列出命令和超时 | 运行负责人 | 日志、退出码和部分状态 | 停止进程；恢复副本 |
| 推送或发布 | 指定仓库或草稿端点 | 对目标的限定写入 | 明确的发布请求 | 复核者或发布负责人 | 预览、验收和回滚 | 回退版本；保留审计记录 |
| 权限变更或秘密处理 | 最小必要范围 | 临时且可撤销 | 单独的人工确认 | 指定授权人；必要时双重复核 | 范围、到期、审计和回滚 | 立即撤销；再次复核 |

能使用不等于能修改；能修改不等于能发布。如果范围、目标、批准人或回滚不清楚，这个决定就是 `blocked`。

## 行动：定义最小能力包契约

使用一个可检查的目录。团队可以重命名文件，但必须保留这些责任：

```text
capability-pack/
├─ README.md                  # 目的、范围、快速复现、边界
├─ manifest.yaml              # id、版本、负责人、状态、下次复核
├─ context/
│  └─ project-context.md      # 术语、边界、可信来源、运行模式
├─ protocol/
│  └─ task-protocol.md        # 输入、决定、行动、停止、交付
├─ examples/
│  ├─ positive.md             # 正例
│  └─ failure.md              # 失败和边界示例
├─ eval/
│  ├─ acceptance.md           # 验收标准和评分
│  └─ evidence-index.md       # 日志、diff、验证和未验证项
└─ governance/
   ├─ permission-matrix.md    # 数据、范围、批准和到期
   ├─ ownership.md            # 负责人、复核者和备份角色
   └─ rollback.md             # 回滚、迁移、退役和恢复
```

至少，`manifest.yaml` 要包含：

```yaml
id: "team-capability-release-review"
version: "0.1.0"
owner: "person or team role"
status: "candidate"
source: "original | adapted | external link; license record location"
next_review: "YYYY-MM-DD"
decision_owner: "role that accepts or blocks the package"
allowed_scope: "redacted disposable copy / named test repository"
rollback: "discard disposable copy or restore baseline hash"
```

版本是可追踪的变更标识符，不是“行为已验证”的同义词。`candidate` 表示结构已经存在，而新鲜的独立复现仍然不足。

## 实验：交付一个团队能力包

这是一个双人、低风险、独立复现的练习，不涉及任何真实的外部连接。

### 准备

选择“发布前文档审查”或“新成员项目入门”作为固定任务。在临时仓库或脱敏副本中工作。准备固定输入 `team-pack-review-v1`：一份短文档，其中包含已完成项、未验证项、一条过时命令和一项需要确认的权限。成员 A 创建能力包，包含 `version: 0.1.0`、负责人、来源、权限矩阵、三项验收证据和回滚说明。保存输入哈希和干净副本的哈希。

不要连接外部服务、授权账户、发送消息、上传客户数据、推送、发布，也不要把长期有效的秘密放进包里。

### 任务

1. A 按任务协议执行一次，保存日志 `21-team-pack-review-v1-A-01`。
2. A 把包交给 B。B 在另一个可丢弃副本中只使用这个包和固定输入，不做任何口头补充，保存 `21-team-pack-review-v1-B-01`。
3. B 记录读了什么、采取了什么行动、流程在哪里停止、输出 diff、验证、权限判断和隐性知识缺口。
4. A 只修改一个层级，把版本升到 `0.1.1`，并记录变更和原因。B 以 `B-02` 再次运行。

### 证据门

证据包必须包含：

- `manifest.yaml`、目录清单、版本和负责人；
- 固定输入，以及 A 和 B 的可丢弃副本哈希；
- 一个正例、一个失败示例，以及协议或 `SKILL.md`；
- A、B 和修订后 B 的独立日志、diff、验证输出和评分；
- 包含数据范围、技术范围、任务授权、批准人、到期时间和禁止行动的权限矩阵；
- 来源和许可证记录位置、下次复核日期和回滚说明；
- 隐性知识缺口，以及修订前后的差异；
- 未验证项，以及相关的 `content_status`/`claim_status`。

每次运行都需要一条可定位的记录：

```yaml
run_id: "21-team-pack-review-v1-B-01"
member: "A | B"
pack_version: "0.1.0"
input_hash: "sha256:..."
actual_changes: "no-change or diff summary"
validation: "commands, exit codes, and key output; not_run if not executed"
reviewer: "independent review role; not_assigned if none"
unverified_items: ["real connection", "production release", "long-lived permissions"]
status: "pass | fail | blocked | not_run"
```

如果没有 `decision_owner`、日志位置、独立成员记录或未验证项列表，这个包就保持 `candidate` 或 `blocked`。口头交接不是证据。

从 0 到 2 分对五个维度评分：目标理解、情境处理、行动边界、证据完整性和失败停止。候选实验通过要求 A 和 B 都至少达到 8/10，没有未经授权的行动，并且 B 的关键工作流在无口头补充的情况下可以运行。缺少任何一份独立日志、权限矩阵、回滚计划或输入哈希，结果就保持 `candidate` 或 `blocked`，不能称为已验证。

### 失败案例与边界

失败变体一移除 `owner` 和 `version`；复核者应拒绝验收。失败变体二提供一份脱敏的静态权限列表，其中每个外部能力都标记为 `requested`。这只是纸上模拟。不要在任何真实账户、公共仓库、生产服务或包含秘密的环境中进行授权、连接、发送、写入、推送或发布。正确的回应是识别过宽的范围、目标、批准人、到期和回滚要求，然后把包标记为 `blocked` 或 `candidate`。

### 反思

把缺口归类到共同语言、方法、证据或治理之下。解释为什么 B 无法复现工作流、应该改变哪个层级、修订后哪些失败或证据发生了变化，以及权限矩阵是否仍然比任务更宽。还要确定：如果负责人离开、来源过期或能力产生副作用，谁能回滚或退役这个包。“我理解了”不能替代日志或 diff。

## 边界与常见错误

- 共享上下文不得包含密码、长期有效的秘密、未经授权的客户材料或无根据的市场主张。
- Skill 的名称或目录并不能证明其许可证、触发边界、依赖关系或行为已经过审查。
- 组织规则、任务上下文和个人偏好是不同层级；外部文本不得静默覆盖组织规则。
- 模拟的权限结果只能证明审查流程被执行过，不能证明连接器、账户或生产服务可用。
- 发布、权限变更和秘密处理需要单独批准；实验不会自动授予它们。
- 配置好的能力、成功的构建或声明的团队包，并不能证明运行时行为、团队成果、部署或用户验收。

## 迁移任务

把一个能力包从个人项目移入组织项目。重新检查它的名称、许可证、品牌、数据范围、权限、负责人、复核者、发布目标和回滚。写出一条在迁移后仍然成立的假设，和一条必须放弃的假设。不要仅仅因为包的名字看起来眼熟就批准它。

## 验收清单

- [ ] 我能把个人经验拆分为共同语言、方法、证据和治理。
- [ ] 我能产出包含目录、版本、负责人、来源、权限矩阵和回滚计划的包。
- [ ] 另一位成员可以在可丢弃副本中复现关键工作流，无需口头补充。
- [ ] 每次运行都有输入哈希、`run-id`、日志、diff、评分和未验证项列表。
- [ ] 我能区分使用、修改、执行、推送、发布和权限变更的责任。
- [ ] 我能在静态权限模拟中识别过宽的范围，并拒绝真实的授权。
- [ ] 当包失败时，它有回滚、迁移、阻止或退役的路径。

## 来源与维护边界

四层治理模型和包契约是本项目的方法论。Skill 分发、权限模式、连接器范围和组织设置是易变的事实。这些记录把主张绑定到来源和范围；静态实验不能证明生产连接性或团队影响。

```yaml
- claim: "Skill and Plugin composition, distribution, and availability depend on the current product surface and configuration"
  source: "https://learn.chatgpt.com/docs/skills-and-plugins.md"
  checked_at: "2026-08-09"
  applies_to: "Product entry points, account scope, and organization scope stated by the official documentation"
  owner: "capability-package maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
- claim: "Sandbox and approval settings define different access and pause boundaries; login status alone cannot establish them"
  source: "https://learn.chatgpt.com/docs/permission-modes.md"
  checked_at: "2026-08-09"
  applies_to: "Operating surfaces and configuration scopes stated by the official documentation"
  owner: "security and governance maintainer"
  next_review: "2026-11-09"
  claim_status: "current"
```

实验保持 `draft / not_run`，本章保持 `candidate`。模拟的权限配置不包含任何真实的令牌、密码、cookie 或连接信息。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-ZH.md" aria-label="上一章: 第 20 章 · 建立个人 Codex 工作系统">← 上一章<br><strong>第 20 章 · 建立个人 Codex 工作系统</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-ZH.md" aria-label="下一章: 第 22 章 · 持续更新与未来适应">下一章 →<br><strong>第 22 章 · 持续更新与未来适应</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
