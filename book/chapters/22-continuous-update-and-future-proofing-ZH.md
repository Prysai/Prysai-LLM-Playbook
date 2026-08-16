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

## 小练习与验收

在临时副本中创建一项虚构且 `disputed` 的主张，来源为刻意不可用的 `https://example.invalid/public-doc`；不要访问它，也不要把它作为产品证据。为章节、Skill、Lab、权限说明和任务集建立影响矩阵，记录消费者、风险、最小行动、证据、负责人和状态。只修改 fixture，运行相关检查，并保存结果或 `not_run`、差异、未确认项和回滚。

- [ ] 我区分稳定原则、产品用法、领域方法和实例事实。
- [ ] 每项易变主张都有来源、日期、范围、负责人、复核日期和状态。
- [ ] 影响矩阵包含章节、Skills、Labs、任务和权限。
- [ ] 我把主张状态与内容成熟度分开。
- [ ] 我的练习保留哈希、差异、日志、回滚和未确认项。

产品名、权限和行为都是易变事实，应查当前官方来源。本章保持 `candidate`；练习不证明生产行为或团队效果。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-ZH.md">← 上一章<br><strong>第 21 章·构建团队能力系统</strong></a></td><td align="right"></td></tr></table></nav>
<!-- chapter-navigation:end -->
