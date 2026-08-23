<!-- content_id: prysai-platform-adapter-review | locale: ZH | language: zh-CN | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: skill-registry | source_license: project-owned CC-BY-4.0 -->

# 平台适配审查

判断一个面向指定平台的教程或工作流，是否真的增加了可来源、可运行、可维护的差异。平台名称换了、功能清单复制了，并不算适配。

## 冻结断言

记录平台、工作面、账户或套餐边界、版本/日期、读者结果、通用核心前置条件、拟定状态和正在审查的准确断言。如果一页混合了多个平台，先拆开；只有固定的对比任务和评分规则真正一致时才保留比较。

## 检查适配契约

必须明确回答：

1. `surface`：聊天、桌面端、CLI、IDE、网页、API 或其他入口；
2. `context_injection`：文件、规则、会话状态、检索或用户材料；
3. `actions`：这个工作面能观察或改变什么；
4. `authority`：权限、确认、沙盒、账户、计费和外部副作用；
5. `persistence`：哪些内容能跨越一轮、一次会话、一个任务或一个项目继续存在；
6. `control_loop`：可观察的计划、工具使用、反馈、重试和委派；
7. `verification_surface`：差异、日志、引用、预览、测试、追踪或外部状态；
8. `failure_modes`：平台特有的误解和降级路径；
9. `volatile_facts`：权威 URL、访问日期、范围、负责人和下次复核；
10. `transfer_lab`：固定输入、安全行动、验收、清理、失败和证据边界。

只有写明理由时才标记 `not_applicable`。没有当前来源或运行支持时标记 `unknown`。

## 应用证据门槛

分开三类证据（其中 `official` 表示官方事实）：

- 官方事实：平台拥有的当前一手文档或来源；
- 运行观察：保留了平台配置和可见行动的运行记录；
- 现场信号：公开报告，只能建立症状或需求。

社区帖子不能满足官方事实门槛。文档不能证明某个用户的账户、运行时或结果。一次成功运行不能证明普遍行为、可靠性、优越性或学习者迁移。

拒绝没有依据的等价说法。产品都叫 Agent、工具、记忆、项目、Skill 或搜索，不代表语义相同。只有在相同输入、验收标准、风险边界和审查规则下比较同一个固定任务；保留配置差异，并记录 `not_comparable`。

## 决定处置方式

返回以下状态之一：

- `admit_candidate`：所需差异、来源、运行、失败、负责人、复核日期和证据边界全部存在；
- `draft_source_gap`：重要的易变断言缺少一手来源；
- `draft_run_gap`：契约有来源，但没有有边界的运行；
- `merge_into_core`：没有有意义的平台差异；
- `quarantine`：许可证、安全、隐私或来源不清；
- `retire`：适配内容过时、无人维护、重复或已无用。

不要因为登录成功、某个命令存在或文案看起来完整就提升状态。`candidate` 适配仍不等于学习者迁移已验证，也不等于生产指导。

## 交付审查结果

先给出处置状态和最重要的理由，然后提供契约矩阵、未支持的断言、来源/运行/许可证缺口、与通用核心的重复、下一项实验、负责人、下次复核日期，以及即使通过仍不能证明什么。内容量要与断言数量相称，不要为单一断言强行套用仪式化标题。

## 维护记录

- `source`：实现 ADR-0025 和金标准内容准入边界的 Prysai Lab 原创方法
- `license`：项目原创改写；供应商文档和社区报告除非另有许可，否则只作参考
- `owner`：platform-adapter maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-12`
- `content_status`：`candidate`
