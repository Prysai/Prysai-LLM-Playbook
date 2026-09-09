<!-- content_id: reader-evidence-library | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | source_revision: 2026-09-09-platform-encyclopedia-evidence-v1 -->

# 证据与术语导航

本页让学习路线保持可读，同时保留证据边界。课程页会指向这里，而不是把读者直接送入面向维护者的英文研究或治理记录。

它是证据导航，不是原始记录的替代品。来源记录只能支持其中明确写出的范围；它不能证明学习效果、当前产品行为、模型质量或普遍安全性。

<a id="core-terms"></a>

## 核心术语

稳定的区分是：**模型**生成输出；**工具**能观察或改变外部系统；**Skill** 是带输入、停止条件和检查的可复用方法；**Agent** 是可观察的多步循环；**证据**是他人可以检查的材料。一个命名平台不自动等价于另一个平台。

完整的维护术语记录标识为 `CONTEXT.md`。产品名称、菜单、默认值、价格、额度和权限都是易变事实，使用前需要带日期的一手来源。

<a id="source-notes"></a>

## 来源说明

课程使用四类证据。依赖前先读标签：

| 标签 | 可以支持什么 | 不能支持什么 |
| --- | --- | --- |
| 官方基线 | 在声明范围内、带日期的产品事实 | 所有账号或未来版本的承诺 |
| 公开现场报告 | 用户报告的问题或做法 | 已确认根因或本地复现 |
| 固定夹具 | 狭窄的本地合同 | 模型、学习者或生产行为 |
| 项目方法 | 提议的步骤及其边界 | 独立效果或采用结论 |

技术来源标识包括 `openai-codex-baseline.md`、`field-problems-codex.md`、`prompt-patterns-for-real-work-2026-08-10.md` 与 `llm-mechanism-deep-dive-2026-08-10.md`。它们是证据记录，不是额外课程章节。

<a id="platform-encyclopedia-sources"></a>

## 平台与客户端百科的具体来源

下面这些记录分别支持平台事实、时效文章和路线维护。链接指向技术记录全文；日期和边界不能只根据产品名称推断。

<a id="grok-bot-field-note"></a>

### Grok Bot 现场笔记

- **来源记录：** [Grok Bot：从聊天走向可审计的持续工作流](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02.md)
- **访问日期：** 2026-09-08；内容记录的原始日期为 2026-09-02。
- **适用范围：** xAI/SpaceXAI 官方页面所描述的 Grok Bot 云端工作面、Bot、连接器、Skill、例程、协作和审批边界，以及一条经过匿名化的用户需求信号。
- **未验证边界：** 不证明账号、套餐、地区或设备资格，不证明安装、运行可靠性、完整审计、效率、学习效果或生产可用性；用户分享的经历不是代表性研究。
- **下一次复核：** 2026-10-08；官方来源、产品 rollout、用户报告或范围发生变化时提前复核。

<a id="deepseek-harness-source-receipt"></a>

### DeepSeek Harness 来源回执

- **来源记录：** [DeepSeek Harness 官方来源百科核对](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/encyclopedia-deepseek-harness-sources-2026-09-03.md)
- **访问日期：** 2026-09-03；npm registry 元数据于 2026-09-08 再次核对。
- **适用范围：** DeepSeek 官方仓库、README、CLI/profile 文档、源码 checkout 条件、Web UI 入口和 npm registry 元数据；包括 developer preview、`dsh` 与 Windows/macOS 证据边界。
- **未验证边界：** 没有执行 `npx`、源码构建、Web UI、CLI、TUI、插件或 API key 配置；不证明安装成功、跨平台等价、沙箱有效、安全审计或生产就绪。
- **下一次复核：** 2026-10-03；安装、profile、Web UI、平台或安全文档变化时提前复核。

<a id="unified-platform-source-receipt"></a>

### 统一平台来源回执

- **来源记录：** [平台与客户端百科统一来源回执](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/platform-encyclopedia-sources-2026-09-05.md)
- **访问日期：** 2026-09-05；选定的官方页面和 npm registry 元数据于 2026-09-08 再次核对。
- **适用范围：** Grok/Grok Bot、Codex、Claude Code、Google Cloud Code、DeepSeek Harness，以及 ChatGPT/Gemini 客户端分类的官方入口、平台和产品名称。
- **未验证边界：** 页面存在、命令记录或 registry 元数据不等于下载、安装、登录、账号资格、运行时兼容、任务正确性、安全性或生产就绪。
- **下一次复核：** 2026-10-08；厂商改变客户端、安装方式、平台、套餐或可用性时提前复核。

<a id="platform-encyclopedia-independent-review-2026-09-08"></a>

### 2026-09-08 独立复核

- **来源记录：** [平台与客户端百科官方来源独立复核报告](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/platform-encyclopedia-sources-2026-09-08-review.md)
- **访问日期：** 2026-09-08。
- **适用范围：** 重新打开 Grok Bot、Codex、Claude Code、Google Cloud Code、DeepSeek Harness 及 Node.js、Git、Homebrew 官方入口，核对产品名称、安装路线、版本字段和来源边界。
- **未验证边界：** 未运行安装器、npm/npx 包或插件，未登录，未创建云资源，未验证本机权限、跨平台运行、任务结果或账号资格。
- **下一次复核：** 2026-10-08；产品更名、入口改变、Windows/macOS 支持改变、npm latest 或安全/审批说明变化时提前复核。

<a id="google-cloud-code-source-receipt"></a>

### Google Cloud Code 来源回执

- **来源记录：** [Google Cloud Code 官方来源回执](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/research/encyclopedia-cloud-code-sources-2026-09-04.md)
- **访问日期：** 2026-09-04。
- **适用范围：** Google Cloud Code 的 VS Code、IntelliJ/JetBrains 和 Cloud Shell 路径，以及它与 Gemini Code Assist、Claude Code、Codex Cloud 的名称边界。
- **未验证边界：** 未安装 IDE 扩展，未登录 Google 账号，未选择云项目，未检查凭据、配额、部署或 Cloud Shell 权限。
- **下一次复核：** 2026-10-04；Google 改变 IDE、Cloud Shell、扩展安装或相关产品边界时提前复核。

<a id="timely-content-policy"></a>

### 时效内容政策

- **维护记录：** [时效内容政策](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/governance/timely-content-policy.md)
- **适用范围：** 规定如何把快速变化的产品、发布或公共话题写成带日期的候选 field note，要求记录问题、范围、来源、许可边界、事实状态、语言状态、Reader 投影和回滚路径。
- **未验证边界：** 这是一套项目维护规则，不是任何厂商功能、账号可用性、用户效果或安全性的来源。
- **下一次复核：** 按 `update-registry.yaml` 的 timely-content 记录执行，当前登记的下一次复核为 2026-10-08；来源变化或出现争议时提前复核。

<a id="timely-content-template"></a>

### 时效内容模板

- **维护模板：** [时效内容记录模板](https://github.com/Prysai/Prysai-LLM-Playbook/blob/main/docs/templates/timely-content.md)
- **适用范围：** 为每条候选时效文章收集 content ID、读者问题、为什么现在值得写、来源与 claim ledger、低风险动作、失败边界、翻译状态、生成投影和回滚信息。
- **未验证边界：** 填完模板不等于来源已核实、功能已安装、任务已运行或文章已达到 `verified`；新的 Reader-facing brief 默认仍是 `candidate`。
- **下一次复核：** 随 timely-content 维护规则和对应记录的 `next_review` 更新；当前关联记录为 2026-10-08。

<a id="method-and-status"></a>

## 方法与状态

可长期迁移的循环是：定义任务 → 选择必要上下文 → 设定行动边界 → 做最小可逆动作 → 检查证据 → 恢复或交接。绿色检查只验证该检查自己的合同。

`draft` 表示材料或证据尚未完成；`candidate` 表示结构与基本检查存在，但声明范围仍缺少足够的新鲜证据；`verified` 与 `production-ready` 需要项目技术发行记录所列的更强证据。

## 不迷失地使用来源

1. 写下你要做的决定。
2. 阅读来源标签和日期。
3. 记录你实际使用的事实、报告或未知项。
4. 一旦决定需要实时平台观察或新授权，就停止。

记录后回到当前章节。不要把旧来源记录直接提升为当前产品事实；先重新核对它的一手来源。
