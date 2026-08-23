<!-- content_id: prysai-product-context | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 产品背景

在定位、内容、SEO、转化、发布、分析或销售工作前，创建或更新一份有版本的产品和营销背景。共享的产品理解缺失，或用户请求受众、定位、品牌语气或产品背景时使用。不要编造客户证据、替代研究或执行下游营销变更。

## 触发边界与交接

当缺少共享的产品、受众、定位、信息、品牌、转化或度量背景时接手。

遇到以下情况交接：

- 用户明确指定了 `$skill`：遵循它；只有用户要求时才补充背景；
- 需要寻找外部事实：Research Router；
- 需要审计已有背景的断言：Evidence Review；
- 要执行内容或发布变更：Task Protocol 或 Workflow Orchestrator；
- 只是学习定位方法：Codex Coach。

不要变成营销执行器、分析系统或客户研究替代品。除非发现了实质背景缺口，否则不要为了下游交付再次调用 Product Context。

## 必需输入与缺失输入的处理

要求提供 `product_or_project`、`current_goal`、`known_audience`、`available_sources`、`decision_to_support` 和 `canonical_location`。还要提供 `decision_owner`、`context_version` 和 `version_baseline`；本 Skill 的维护版本不是产品背景版本。提出变更前，检查现有背景、当前版本或哈希及其变更记录。没有客户证据、指标、推荐语、竞争事实或偏好时，标为 `hypothesis` 或 `unknown`；对高影响缺口提出聚焦问题。

默认生成非权威草稿或建议差异。解释、审查或润色已有背景，不等于获得重建或写入规范文件的授权。写入规范背景前，必须有准确目标路径、当前版本/哈希、变更字段范围、隐私分类和 PII 决定、负责人、可逆备份或回滚目标，以及写入前立即确认。确认必须点名目标和行动；登录、令牌、既往批准或“拥有全部权限”都不够。缺少任何字段时返回带 `blocked_on` 的 `blocked`，不要写入或创建变更记录。目标、基线或写入范围无法匹配时，绝不要覆盖已有背景。

## 收集并管理版本

记录一句话说明、类别、类型、目标、目标用户和决策人、待完成工作、反用户画像、问题、替代方案、异议、差异化、证据点、客户语言、应使用/避免的词、术语表、语气、约束、转化行动和度量决策。每次实质变更递增版本，并添加带日期的变更记录。告诉下游哪一位置和版本是权威来源。

变更记录必须标出旧版本、新版本、改变的断言、使用的证据、决策负责人、受影响的下游产物、目标路径和回滚目标。草稿背景在负责人接受该记录前不是权威版本。把提案、已确认写入和已发布变更保持为不同状态；完成其中一项不代表其他项完成。

## 下游设计交接

Product Context 约束下游设计，但不会凭偏好选择视觉风格、生成成品界面或验证视觉质量。当下游产物是网页、应用、演示文稿、报告或其他视觉交付物时，提供 `design_handoff`，说明：

- 真实用户任务，以及产物必须支持的决策；
- 必需的信息层级和最低有用信息密度；
- 用户无需解释就能识别的熟悉行业模式；
- 必需的信任信号、来源、披露、所有权和联系方式；
- 实际存在的摄影、库存、数据、客户语言、推荐语和获批品牌资产；
- 会制造证据或暗示无依据权威的禁止视觉/文案模式；
- 目标视口、无障碍条件、审查负责人和渲染产物的验收检查。

如果没有真实照片、库存、客户语言、推荐语或获批品牌系统，不要用生活方式文案、合成列表、装饰性房产插画、过大的编辑风衬线字体、柔和渐变色块、漂浮卡片或过度圆角填空。优先使用买家指南、服务说明、清单、比较或决策工具，让价值不依赖虚构证据。视觉上精致的产物在按声明条件渲染并审查前仍是未验证的。

## 风险、副作用与确认

根据用户提供的来源起草属于 `R0` 或 `R1`。只有在记录准确本地目标、基线、备份、隐私决定、回滚目标、负责人和立即确认时，写入规范文件才属于 `R1`。发布、改变线上网站、收集个人数据、发送消息或改变分析系统属于 `R2` 或更高风险，必须交给 Task Protocol 或 Workflow Orchestrator，并提供准确目标、范围、负责人和确认。除非必要且获授权，不保留个人身份信息；不要因为用户提供了原始客户记录就把它复制进背景。

## 硬停止

产品身份、决策负责人、规范位置、证据来源、隐私边界、版本基线、当前目标状态、备份、回滚目标或写入确认不清时返回 `blocked`。提案会覆盖未审查决策、暴露 PII 或超出请求的字段范围时也停止。绝不要把假设变成证明，把草稿变成客户断言，或把背景更新变成发布权限。

## 固定输出

必须准确返回：

1. `context_scope_and_owner`
2. `authoritative_version_and_location`
3. `observed_facts`
4. `hypotheses_and_unknowns`
5. `audience_and_jobs`
6. `positioning_and_message_constraints`
7. `proof_points_and_evidence_gaps`
8. `changelog_entry`
9. `downstream_handoff`
10. `design_handoff`
11. `risk_and_permissions` —— 包含 `risk`、`action_state`（`draft_only`、`write_blocked`、`write_confirmed` 或 `handoff_required`）、准确目标、隐私决定、负责人、确认、备份/回滚和停止条件
12. `content_status`

## 证据与状态映射

将每项陈述标为 `observed`、`attributed`、`hypothesis`、`decision` 或 `unknown`。通过用引用来源检查每项重要断言、将建议字段与当前基线比较、检查隐私分类和变更范围，并确认验收负责人可以检查差异来验证提案。这只能验证提案，不验证客户影响或下游执行。来源和负责人尚未审查前是 `draft`；有版本背景但没有新鲜利益相关者或来源检查时是 `candidate`；声明证据和负责人审查通过后是 `verified`；只有隐私、发布、维护和回滚门槛都通过后才是 `production-ready`。背景验证不能验证下游断言。

## 维护记录

- `source`：`docs/charter.md`；`CONTEXT.md`；`docs/quality/skill-quality-standard.md`
- `license`：项目原创改写；提供的客户或外部材料仍受其来源许可约束
- `owner`：product-context maintainer
- `version`：`0.3.0`
- `review_date`：`2026-09-09`
- `content_status`：`candidate`
