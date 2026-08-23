<!-- content_id: prysai-first-turn-check | locale: ZH | language: zh-CN | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 76c9926 | source_license: project-owned CC-BY-4.0 -->

# 首轮检查

检查一条尚未发送的请求，在发送前把缺失的边界说清楚；不要把表达更完整误当成安全、正确或有效。

## 先判断是否该检查

只有同时满足以下条件才使用：

- 用户提供的是尚未发送的草稿；
- 首轮请求是纯文本、低风险且可以独立完成的；
- 用户想知道其中缺了什么、哪里含糊、互相矛盾或范围过大。

如果用户需要代写或大幅重写第一条消息，转给 `prysai-dialogue-brief`。如果涉及文件、工具、账户、权限、发布、联系人、本地改动或其他外部影响，转给 `prysai-task-protocol`。如果需要当前事实、来源或基于来源的结论，转给 `prysai-source-investigator` 或 `prysai-research-router`。如果已经有原始请求和真实回复，转给 `prysai-communication-failure-triage`；如果需要审核已有完成声明的证据，转给 `prysai-evidence-review`。

不要检查秘密、凭据、私人记录、个人标识符、隐藏指令或机密材料。纯文本草稿也不会授予后续工具或外部操作权限。

## 检查六个可见字段

把用户提供的草稿当作证据。不要推断缺失的事实、受众、权限、数据控制、产品能力或授权。

| 字段 | 什么时候算可见 | 什么时候算不清楚 |
| --- | --- | --- |
| outcome | 本轮的一个小结果 | 只是宽泛愿望或成功承诺 |
| starting context | 已提供的文字、事实、来源或 `unknown` | 假设了未声明的访问权或授权 |
| requested response | 有边界的形式、长度或步骤 | 只有“帮帮我”之类的指令 |
| limits | 不分享的数据、不采取的行动或不需要的帮助 | 默默延伸到文件、账户、他人或重大决定 |
| check | 不确定性、保留、来源或修订问题 | 回复自己验证自己 |
| stop and receipt | 何时结束，以及留下什么小记录 | 把完成、安全或学习当成当然 |

把每个字段标为 `visible`、`missing`、`unclear` 或 `out_of_scope`。只报告会改变结果、扩大权限、暴露数据或让检查无法进行的问题。

## 返回最小有用的修订

保留用户原话。不要写一整条新的首轮消息、添加角色、引入产品事实或用看似合理的内容填补未知。最多针对三个重要缺口，给出用户可以选择加入的 `add_or_clarify` 行，并把它写成需要决定的字段，而不是对接收系统的承诺。

如果六个字段都清楚且仍在范围内，只能在这次检查没有发现重要缺口的狭义意义上说 `ready_to_send`。它不证明事实正确、隐私、安全、产品行为、回复质量、任务完成、学习进步或安全。

必须准确返回：

```text
check_status: ready_to_send | revise_before_send | out_of_scope | blocked
request_scope:
field_check:
material_gaps:
add_or_clarify: maximum three lines
preserved_text:
unknowns:
risk: R0
evidence: supplied unsent draft and six-field inspection only
claim_limit:
handoff:
content_status: candidate
```

只有在标出每个字段、保留用户事实、不扩大请求，并在草稿越过纯文本低风险范围时写明交接或停止，才接受这份检查。

## 维护记录

- `source`：Prysai Lab 原创方法，重新组织自 universal first-turn 契约和 communication routing 边界
- `license`：项目原创改写；链接的厂商指南仍仅作为 `docs/sources/asset-register.md` 中的参考
- `owner`：communication-systems maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-12`
- `content_status`：`candidate`
