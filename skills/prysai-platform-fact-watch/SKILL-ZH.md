<!-- content_id: prysai-platform-fact-watch | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: 82c7fae | source_license: project-owned CC-BY-4.0 -->

# 平台事实监测

把“这个平台可能变了”转化为一项小而明确的维护决策。这个 Skill 会盘点已有断言及其影响范围；它不会浏览网页、运行产品、接纳新的适配器、发布版本，也不会替代来源审查。

## 先建立断言卡片

至少需要：一个明确的平台、一个有来源支持的断言或 claim ID、它当前面向读者的位置、来源负责人和 URL、最近检查日期、适用范围、负责人、下次复核日期，以及本次复核的原因。缺少任何字段都标记为 `unreviewed`，不能把它当作无害的空白。

让断言保持窄而具体。“Claude Code 有一种权限模式”和“Grok Build 有一条 API 路由”是两张不同的卡片。平台名称、功能标签或 HTTP 响应，都不能代替一条断言。

## 对变化信号分类

在不推断当前产品行为的前提下，选择一个状态：

- `review_due`：计划的复核日期已到，或来源尚未按声明的间隔检查；
- `source_changed`：有日期的一手来源复核报告了与记录断言存在实质差异；
- `source_unavailable`：引用的来源当前无法支持这条断言；
- `scope_changed`：这条断言可能不再适用于指定的界面、账户、地区、版本或权限边界；
- `no_change_recorded`：有日期的一手来源复核确认，在记录的范围内没有变化；
- `unreviewed`：没有可用的合适一手复核。

不能根据记忆、重定向后的 URL、搜索摘要、社区帖子或一次成功登录来选择 `no_change_recorded`。来源检查只能在记录的日期和范围内确认一项陈述。

## 映射受影响的教学面

列出每个受影响的规范单元，并标明它所扮演的角色：

```text
claim_id:
platform / surface:
source owner / URL:
last_checked / next_review:
change_status:
affected_units:
  - path | role: stable_core | adapter_fact | task_step | Lab | Skill | route | generated_page
reader_risk: none | clarification | pause_named_step | remove_current_claim
safe_interim_text:
owner:
next_action:
```

明确的权限、证据、恢复和最小副作用等稳定核心原则通常仍然可用。产品命令、界面路径、权限默认值、价格、权益、集成或模型可用性属于适配器事实，需要来源复核。不要因为一个来源变化，就断言整门课程失效。

## 选择最小的安全行动

- `no_change_recorded`：保留当前范围内的措辞，只更新复核收据；不要声称它具有更广泛的持久性。
- `review_due` 或 `unreviewed`：保留通用核心，把指定步骤标记为待复核，并将当前事实交给 `prysai-source-investigator`。
- `source_changed`、`source_unavailable` 或 `scope_changed`：在来源审查确定替代措辞前，暂停或移除指定的教学步骤。保留旧记录作为历史证据。
- 如果变化让适配器的来源、运行、权限或失败记录受到质疑：将准入决策交给 `prysai-platform-adapter-review`。
- 如果公开断言、生成页面或发布说明已经写出了旧事实：发布更正前，将证据包交给 `prysai-evidence-review`。

绝不能凭记忆静默改写产品操作步骤。不要根据新鲜度收据，就把一个适配器说成已接纳、安全、等价或可用于生产。

## 返回维护收据

只返回一条记录，其中包含断言卡片、变化状态、受影响单元、读者风险、安全的临时文字、来源审查交接、任何适配器或断言审计交接、负责人、下次复核日期，以及未知项。

最后必须附上这条限制：`This receipt manages the freshness boundary of one named platform claim. It does not prove current product behavior, account access, permission safety, runtime success, adapter admission, model quality, learner outcome, or cross-platform equivalence.`

## 维护记录

- `source`：源自 ADR-0025、内容生命周期、事实影响登记表和有来源边界的适配器准入记录，由 Prysai Lab 原创的维护方法
- `license`：项目原创改写；一手平台文档和公开报告仍根据 `docs/sources/asset-register.md` 仅作参考
- `owner`：facts-maintainer
- `version`：`0.1.0`
- `review_date`：`2026-09-14`
- `content_status`：`candidate`
