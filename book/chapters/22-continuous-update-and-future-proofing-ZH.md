<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 22 章：持续更新与面向未来

**状态：**`candidate`。**实验：**`draft / not_run`。只在临时副本或隔离分支运行；不使用生产环境、真实凭据、推送、发布或外部批量替换。

## 问题

模型、Codex 入口、权限、Skill 和外部服务会改变。今天可用的流程，若缺来源、范围、复核日期、迁移计划和回滚，数月后可能误导人。持续维护不是追逐每个新功能，而是有纪律地判断什么稳定、什么需要重新检查，以及何时保留、阻塞、迁移或下线。

| 层级 | 例子 | 维护方式 |
|---|---|---|
| 稳定原则 | 上下文影响理解；工具改变行动空间；证据支撑完成声明 | 教学、实验、边界复核 |
| 产品用法 | 入口、Skill 调用、权限、配置 | 对照具体官方页面 |
| 领域方法 | 工程、研究、营销、文档、数据 | 练习任务与人工复核 |
| 实例事实 | 模型 ID、价格、额度、参数、外部 API | 绑定带日期的来源 |

内容成熟度 `draft | candidate | verified | production-ready`、易变主张状态 `current | stale | disputed | removed` 和运行观察 `planned | authorized | executed | verified | not_run` 彼此不同。来源更新不等于章节已验证。

### 四层内容有四种寿命

| 层级 | 何时通常仍成立 | 何时必须重新检查 | 常见错误 |
|---|---|---|---|
| 稳定原则 | 更换模型、入口或界面后仍可迁移 | 新证据改变原则边界时 | 因产品改名而重写原则 |
| 产品用法 | 特定产品、账户和版本范围内 | 入口、权限、配置或官方说明变化时 | 把一次账户观察写成所有人事实 |
| 领域方法 | 在同类任务和声明条件内 | 任务、受众、风险或验收方式变化时 | 把一份案例扩展成万能流程 |
| 实例事实 | 直到带日期的来源失效或范围变化 | 模型 ID、价格、额度、参数、API 行为变化时 | 让旧截图或旧聊天代替当前来源 |

## 决定与影响矩阵

当权威来源仍在且范围匹配，标为 `current` 并记录来源、复核和受影响对象；来源冲突或观察不一致时标为 `disputed`，暂停确定表述；没有来源时标为 `stale`；许可证或安全不再允许时标为 `removed` 并记录迁移和恢复。没有负责人、证据或回滚，工作就是 `blocked`。

```yaml
claim: "具体主张"
source: "官方或权威 URL"
checked_at: "YYYY-MM-DD"
applies_to: "产品、版本、地区或账户范围"
owner: "负责角色"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

流程是：发现变化 → 判断影响和风险 → 找到受影响的章节、Skills、Labs、任务和权限 → 核查来源或有限证据 → 做最小安全修改 → 重跑相关检查 → 在新上下文中审查 → 保留、迁移、阻塞、下线或发布。

| 证据情况 | 主张状态与动作 | 退出条件 |
|---|---|---|
| 权威来源仍可访问、范围仍匹配，相关检查也通过 | `current`；保留或更新解释 | 已记录来源、复核日期和受影响对象 |
| 来源互相冲突、账户范围不清，或观察与来源冲突 | `disputed`；暂停确定表述 | 标记未知项并分配复核负责人；不发布确定结论 |
| 来源不可用，且没有替代证据 | `stale`；提醒或临时阻塞 | 不再把旧主张写成当前事实 |
| 许可证或安全条件不再允许能力，且没有安全替代方案 | `removed`；下线 | 保留迁移说明和恢复信息 |
| 已有兼容替代，且迁移和评测通过 | `current`；发布迁移说明 | 写明旧范围、替代路径、证据和下次复核 |

发现变化不等于应该全文重写。先画影响矩阵；没有负责人、证据或回滚目标的改动保持 `blocked`。

## 小练习与验收

在临时副本中创建一项虚构且 `disputed` 的主张，来源为刻意不可用的 `https://example.invalid/public-doc`；不要访问它，也不要把它作为产品证据。为章节、Skill、Lab、权限说明和任务集建立影响矩阵，记录消费者、风险、最小行动、证据、负责人和状态。只修改 fixture，运行相关检查，并保存结果或 `not_run`、差异、未确认项和回滚。

- [ ] 我区分稳定原则、产品用法、领域方法和实例事实。
- [ ] 每项易变主张都有来源、日期、范围、负责人、复核日期和状态。
- [ ] 影响矩阵包含章节、Skills、Labs、任务和权限。
- [ ] 我把主张状态与内容成熟度分开。
- [ ] 我的练习保留哈希、差异、日志、回滚和未确认项。

产品名、权限和行为都是易变事实，应查当前官方来源。本章保持 `candidate`；练习不证明生产行为或团队效果。

## 发布前的最小更新卡

不要因为发现一个新名称或网页截图，就批量替换整本书。先用一张更新卡把改动限制在可回滚范围内：它告诉下一位维护者改了什么、为什么只改这些，以及哪些结论仍不能说。

```yaml
update_id: update-22-example
trigger: "来源不再可访问，或范围与当前说明冲突"
claim_status_before: disputed
affected_units: ["chapter", "lab", "skill", "permission-note", "task-set"]
safe_action: "暂停确定表述；只更新临时 fixture 的状态与提示"
validation: "相关静态检查，或 not_run"
unverified: ["真实账户行为", "生产权限", "学习者效果"]
rollback_target: "临时副本的基线哈希"
release_decision: blocked
```

`release_decision: blocked` 不是失败，而是在缺少第二来源、负责人、证据或回滚时避免把猜测带入公开版本。只有卡片中的未确认项被实际证据关闭，状态才可能变化。

## 小练习补充：拒绝全局替换

把一个虚构的模型或工具名称放进临时 fixture 的五种消费者中：章节、Lab、Skill、权限说明和任务集。先不改名称，而是逐项写出它是否属于稳定原则、产品用法、领域方法或实例事实。

1. 实例事实才能进入来源复核队列；稳定原则不因产品改名而重写。
2. 每个消费者必须有自己的风险和最小行动，不能用“全文替换”代替影响分析。
3. 某个消费者没有来源、许可证记录或回滚时，保留 `blocked`，不要靠其他页面的通过结果补足。
4. 只修改一项 fixture 后保存 diff；验证结束后恢复基线或丢弃临时副本。

## 本章验收补充

- [ ] 我能给任何易变主张列出触发、影响范围、最小行动、未知项和回滚目标。
- [ ] 我不会把来源刷新、文件存在或 CI 通过写成运行时、用户效果或发布已验证。
- [ ] 我知道何时应停止发布，而不是为了“跟上更新”做全局替换。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-ZH.md">← 上一章<br><strong>第 21 章·构建团队能力系统</strong></a></td><td align="right"></td></tr></table></nav>
<!-- chapter-navigation:end -->
