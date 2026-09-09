<!-- content_id: platform-adapter-guide-route | locale: ZH | language: zh-CN | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 2026-09-08-platform-encyclopedia-v14 -->

# LLM 平台与客户端实用百科：选择、安装并使用合适的工作界面

**状态：** candidate。**运行状态：** not_run。

大多数人并不是从某个平台开始，而是从眼前的任务开始：读懂一页内容、改写一段说明、检查一个文件，或者让一项较长的工作继续推进。同一个产品名称，可能对应浏览器聊天、手机应用、桌面应用、IDE 集成、终端 Agent，或者一台托管电脑。这些工作界面不会自动共享文件、凭据、权限或历史记录。

把本页当作一份实用参考，而不是一张“所有工具都要安装”的清单。它按顺序回答五个问题：你要做什么工作，哪种客户端适合，工作将在哪里运行，如何找到厂商当前的安装入口，以及第一次尝试什么才比较安全。完成设置并不等于认证成功，也不等于账号有资格、文件可访问或第一次任务已经完成。

本页不是产品排名，也不保证每个读者都能使用所有账号、操作系统、地区、套餐或功能。它保留 [通用基础路线](universal-core-foundations-ZH.md) 中可迁移的方法：定义任务、限制权限、检查结果、保留证据。命令、套餐、可用性和客户端支持都会变化；文中来源回执记录了所查阅的官方文档及其日期，但不证明某个安装器、账号或任务一定能在你的环境中运行。

> 先选工作界面，再选命令。一个熟悉的产品名称，并不能告诉你文件在本地还是云端，也不能告诉你客户端能否在聊天之外采取行动。

## 先从任务开始，再选择产品

| 眼前要做的事 | 从这里开始 | 只有任务确实需要时才添加 |
| --- | --- | --- |
| 提问、学习、改写或比较已经提供的文本 | 网页或移动端聊天 | 文件、联网、扩展或账号连接 |
| 读取或修改电脑上的文件 | 桌面应用、IDE 集成或终端 Agent | 真实仓库、写入权限或外部工具 |
| 重复执行命令行任务或检查项目 | 可丢弃文件夹中的终端 Agent | 自动化、凭据、依赖变更或发布 |
| 在 IDE 中处理 Google Cloud 资源 | 你正在使用的 IDE 对应的 Google Cloud Code | 指定的云项目、部署、密钥或生产资源 |
| 笔记本合上后仍让工作继续 | 有明确文档说明的云端或托管工作界面 | 真实凭据、私密数据或不可逆操作 |

然后按五步走：

1. 说清楚任务：判断需要的是对话、本地项目、IDE、终端还是托管电脑。
2. 选择最小工作界面：纯文本任务先用纯文本聊天，只有任务需要时才增加文件、扩展、工具或云端访问。
3. 使用厂商当前的入口：按具体产品和操作系统打开官方的下载、安装或登录页面。
4. 先做无害的首次尝试：先请求解释、摘要或草稿，再考虑允许编辑或外部操作。
5. 留下回执：记录客户端、运行位置、可见版本、日期、权限边界和结果。安装、登录、任务完成和接受结果是四件不同的事。

## 先分清你正在阅读哪一种说法

本页内容分为三类：

- **方法：** 定义结果、限制权限、检查输出等可以长期复用的习惯；
- **产品事实：** 厂商当前的名称、客户端、命令、要求或功能，并附官方来源和访问日期；
- **运行证据：** 某台明确的机器、账号、工作区或任务实际发生了什么。

发布公告只能说明厂商声称发布了什么；用户经历可以说明某个话题为什么值得关注。这两者都不能证明功能对所有账号可用，也不能证明工作流可靠。对于变化迅速的产品或公共报道，请遵守[时效内容政策（locale-neutral）](../../docs/governance/timely-content-policy.md)，并保留来源、访问日期、适用范围和未解决问题。

## 把时效话题放进带日期的文章

百科路线负责让读者找到正确的产品和工作界面；带日期的现场笔记负责解释最近发生了什么。把两件事分开，才能更新一个时效话题而不必重写整条学习路线。

| 话题 | 接着阅读 | 它可以帮助你判断什么 | 它不能证明什么 |
| --- | --- | --- | --- |
| Grok Bot | [Grok Bot 现场笔记（locale-neutral）](../../docs/research/grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02.md) | 是否值得为你的账号检查一条低风险、可持续的托管工作流 | 账号可用、运行可靠、完整可审计，或对一般用户都有效 |
| DeepSeek Harness | [DeepSeek Harness 来源回执（locale-neutral）](../../docs/research/encyclopedia-deepseek-harness-sources-2026-09-03.md)，然后阅读下方安装部分 | 应检查哪些官方入口、配置、工作区和安全边界 | 本地安装成功、完整支持 Windows/macOS，或已达到生产运行要求 |
| 本页列出的平台 | [统一平台来源回执（locale-neutral）](../../docs/research/platform-encyclopedia-sources-2026-09-05.md)以及 [2026-09-08 独立复核（locale-neutral）](../../docs/research/platform-encyclopedia-sources-2026-09-08-review.md) | 当前来源记录支持哪个产品名称、客户端、运行位置和官方入口 | 安装成功、账号有资格、客户端等价或生产就绪 |
| 新发布或正在传播的公共话题 | [时效内容政策（locale-neutral）](../../docs/governance/timely-content-policy.md) | 如何记录“为什么现在值得讲”和读者能安全检查什么 | 永久产品事实、代表性用户研究或已测量的效果 |

Grok Bot 现场笔记只把读者提供的个人经历当作需求信号。它是有来源边界的原创参考，不是产品测评，也不是学习结果。新增时效文章前，请填写[时效内容模板（locale-neutral）](../../docs/templates/timely-content.md)，在 update-registry.yaml 的 timely-content 行登记，在 locale-matrix.yaml 中记录英文源和语言状态，并重新生成 Reader 与搜索投影。来源过时或范围变化时，应收窄声明或移除 Reader 链接，而不是让旧事实看起来永久有效。

## 找到适合你的路线

如果你刚开始了解 LLM，请先阅读[通用基础路线](universal-core-foundations-ZH.md)。如果已经掌握基础，可从下面的入口跳转：

| 目标 | 入口 | 停下来检查 |
| --- | --- | --- |
| 理解基本 LLM 工作流 | [通用基础路线](universal-core-foundations-ZH.md) | 能否用自己的话解释结果 |
| 选择网页、移动端、桌面、IDE、终端或云端工作面 | [平台与客户端地图](#platform-and-client-map) | 工作在哪里运行，以及它能看到什么 |
| 理解容易混淆的产品名称 | [容易混淆的名称](#names-that-are-easy-to-confuse) | 名称指的是产品、客户端还是运行环境 |
| 安装产品并完成安全首次尝试 | [安装并完成第一次安全尝试](#install-and-make-a-first-safe-attempt) | 命令是否来自官方，以及会改变什么 |
| 设置 Windows 或 macOS | [Windows 与 macOS 安装路径](#windows-and-macos-setup-paths) | 操作系统、架构、Shell 和 PATH |
| 判断结果是否可接受 | [四种证据状态](#evidence-states) | 是否有任务结果和人的验收决定 |

## 平台与客户端地图

<span id="platform-and-client-map"></span>

先识别工作界面，再识别运行环境。共享品牌并不意味着共享文件系统、Shell、账号或权限模型。

### 把四个层次分开

1. **模型：** 生成回答或提出行动建议的系统。
2. **产品：** 提供模型、账号和政策层的厂商体验。
3. **客户端：** 你打开的浏览器、手机应用、桌面应用、IDE 扩展或终端程序。
4. **运行环境：** 工作实际发生的地方：设备、容器、托管机器或厂商服务。

一个产品可以有多个客户端，也可以对应多种运行环境。安装桌面应用，并不能证明网页版、CLI 和云端 Agent 共享相同工具或权限。

### 一张真正能用的客户端地图

| 产品或产品族 | 本页涉及的客户端 | 工作通常在哪里运行 | 适合的第一次使用 | 要与什么分开 |
| --- | --- | --- | --- | --- |
| [ChatGPT](https://chatgpt.com/) | 网页、移动端和桌面应用 | 厂商服务；桌面应用也可能使用明确选择的本地文件夹 | 不开启额外工具，改写或比较已提供的文本 | ChatGPT 对话不会自动变成本地编程会话 |
| [Codex](https://developers.openai.com/codex/quickstart) | CLI、IDE 集成、桌面端和 Cloud/Web | 本地终端或编辑器、桌面端选定项目，或托管 Codex 环境 | 解释一个文件，再检查提议差异 | 本地、桌面和托管工作面不同 |
| [Claude Code](https://code.claude.com/docs/en/overview) | 终端、IDE 集成、桌面端和浏览器/云端 | 本地 Shell/编辑器，或 Anthropic 托管工作面 | 先解释可丢弃项目，再请求小改动 | 桌面端与 CLI 契约不同 |
| [Google Cloud Code](https://cloud.google.com/code/docs) | VS Code、IntelliJ/JetBrains 和 Cloud Shell | 所选 IDE 或 Google 托管的 Cloud Shell | 打开示例，检查项目和凭据上下文 | 不是 Claude Code、Codex Cloud 或通用终端 Agent |
| [Gemini](https://gemini.google.com/) | 网页、移动端、Gemini CLI 和 IDE 集成 | 厂商聊天服务、本地终端/编辑器或 IDE 界面 | 先做纯文本聊天；需要终端时再用 CLI | 网页/移动端、CLI 和 IDE 上下文不同 |
| [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md) | Web UI 及文档列出的 CLI/profile | 本地 Node 进程和所选本地工作区 | 在可丢弃工作区中启动 Web UI | 不是 DeepSeek 聊天产品，也不是安全保证 |
| [Grok](https://docs.x.ai/grok/overview) | 网页和移动端聊天 | xAI 消费者助手服务 | 提问、起草或比较已提供文本 | Grok Bot 和 Grok Build |
| [Grok Bot](https://docs.x.ai/grok-bot/get-started) | macOS、Windows、Linux 桌面应用，以及 iOS/Android 伴侣应用 | 通过客户端访问的持久化云端电脑 | 起草清单或总结公共页面 | Grok 聊天和 Grok Build |
| [Grok Build](https://docs.x.ai/build/overview) | 终端 TUI、无头 CLI 和 ACP | 本地终端或编辑器集成 | 在可丢弃项目中检查内容，再请求小改动 | Grok Bot 托管电脑 |

三行 Grok 条目是故意分开的。Grok Bot 云端电脑里的终端，是该托管运行环境提供的能力；它不是 Grok Build 文档中的本地 grok 命令。

请按这个顺序使用地图：说清任务；选择能提供所需上下文的最小客户端；按操作系统、架构、账号和地区检查官方设置页；记录客户端和运行环境。如果你答不出“哪个客户端看到了哪些文件，以及行动在哪里发生”，设置就还不可复现。

### 平台卡片：每种工作界面适合做什么

#### ChatGPT

ChatGPT 是通用对话和工作界面。网页、移动端和桌面端是不同客户端，不能据此证明三者拥有相同文件、工具或权限。桌面端选择项目或文件夹会改变交给应用的上下文；先用已提供文本，只有任务需要时才增加一个明确选择的本地文件。ChatGPT 不是 Codex 的另一个名称，一次成功聊天也不是本地编程运行证据。

#### Codex

Codex 是编码工作产品族，官方工作面包括终端 CLI、IDE 集成、桌面体验以及云端/网页工作面。本地终端、桌面项目和托管任务可能拥有不同文件、Shell、审批和网络访问。先从可丢弃项目和一个可检查结果开始，明确云端边界。

#### Claude Code

Claude Code 是 Anthropic 命名的编码 Agent 产品，覆盖终端、IDE、桌面和浏览器/云端。在 Windows 上先查看官方 Shell 路径，不要默认 Bash；原生安装可用 PowerShell，需要 Bash 工具时 Git for Windows 也可能重要。把 CLAUDE.md、项目设置、hooks 和 skills 当作需要审阅的项目上下文。

#### Google Cloud Code

Google Cloud Code 是面向云原生开发的 IDE 扩展家族，官方为 VS Code、IntelliJ/JetBrains 和 Cloud Shell 提供不同路径。不要把 Cloud Code 当成 Claude Code 或 Codex Cloud/Web 的简称。接受构建、部署、密钥或资源操作前，检查当前 Google Cloud 项目和凭据。

#### Gemini

Gemini 网页和移动应用是消费者聊天客户端；Gemini CLI 是独立终端 Agent；IDE 集成会增加编辑器上下文。第一次使用先在网页或移动端提供文本，不启用扩展；需要 Shell 工作流时再选择 CLI，并单独记录身份验证路径。

#### DeepSeek Harness

DeepSeek Harness 是开发者预览版 Agent harness，不是 DeepSeek 聊天产品，也不是 DeepSeek API。官方 Web 入口为 npx @deepseek-ai/dsh web；打开后选择工作区并配置获授权的模型。官方安全说明表示项目尚未经过安全审计；第一次运行应放在没有密钥和不可替代文件的可丢弃工作区中。启动命令不等于模型访问、沙箱隔离或任务安全已经证明。

#### Grok 产品族与 Grok Bot

Grok 是消费者助手；Grok Bot 是在持久化云端电脑上工作的托管团队成员界面；Grok Build 是另有文档的终端编码 Agent。Grok Bot 中出现的终端不等于本地 grok 命令，安装 Grok Build 也不会控制 Bot 的托管电脑。发送、发布、购买、删除和改设置都应等待明确人为审批。

Grok Bot 的组成部分应分开理解：

| 部分 | 它控制什么 | 适合的第一次使用 |
| --- | --- | --- |
| Bot | 持久化的工作角色和长期指令 | 给一个 Bot 一个可重复结果、负责人和验收条件 |
| Skill | 某类任务的可复用方法 | 多个无害输入检查后再保存 |
| Routine | 运行时间或触发条件 | 先测试一次并检查来源日期 |
| Connector | 可访问的外部服务或数据源 | 启用前检查账号、作用域和写权限 |
| 云端电脑 | 远程浏览器、文件、终端和工作上下文 | 使用可丢弃工作区并记录文件位置 |
| 本地执行 | 在当前电脑上行动的额外权限 | 任务确实需要本地文件或命令前保持关闭 |
| 交接或群聊 | Bot 之间如何传递工作、谁能看到 | 每阶段指定一个负责人，结果交回给人 |

共享账号的多个 Bot 可能共享云端文件、会话或凭据。不同名称不会自动产生不同信任区。详见带日期的 [Grok Bot 现场笔记（locale-neutral）](../../docs/research/grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02.md)。

<span id="installation-routes-at-a-glance"></span>

## 安装路径一览

网页或移动端客户端需要打开，桌面应用需要下载，IDE 集成需要添加到编辑器，终端 Agent 需要通过官方包或安装器安装，托管工作面则需要在账号中启用。不要把它们混为一谈；从能完成下一项任务的最小客户端开始。

| 路径 | 例子 | 适合做什么 | 安装或访问方式 | 第一个检查点 |
| --- | --- | --- | --- | --- |
| 网页聊天 | ChatGPT、Gemini、Grok | 提问、起草、比较和学习已提供文本 | 打开官方网页入口 | 账号、地区、工具或扩展 |
| 移动应用 | ChatGPT、Gemini、Grok Bot 伴侣应用 | 阅读、听写、记录和复查 | 按官方应用或下载页面操作 | 发布者及桌面专属设置 |
| 桌面应用 | ChatGPT/Codex、Grok Bot、Claude Code | 大型交互工作区、本地项目或托管电脑客户端 | 按系统和 CPU 架构下载 | 选定文件夹或托管运行环境 |
| IDE 集成 | Codex、Claude Code、Gemini、Google Cloud Code | 选区、编辑器上下文、差异和项目导航 | 安装对应 IDE 的官方扩展 | 工作区、文件、工具和待审差异 |
| 终端 Agent | Codex CLI、Claude Code、Gemini CLI、Grok Build | 重复命令、脚本和版本控制变更 | 官方安装器或包管理器 | 版本命令和权限模式 |
| 托管或云端 Agent | Codex Cloud/Web、Claude 云端、Grok Bot | 远程机器或客户端关闭后继续 | 启用文档说明的云端工作面 | 远程仓库、文件、凭据、网络和审批 |
| DeepSeek Harness Web | @deepseek-ai/dsh Web 入口 | 受控的本地 Agent Web UI | 通过 npx 运行官方入口 | 回环地址、工作区、模型和安全边界 |

### 一分钟选择法

- 纯文本提问、改写、比较或学习：网页或移动端聊天。
- 本地文件、待审差异或项目导航：可丢弃工作区中的桌面、IDE 或终端客户端。
- 可重复脚本或命令行检查：终端 Agent，并保持权限模式可见。
- 需要远程机器：云端或托管工作面，并记录文件和凭据位置。
- 明确涉及 Google Cloud IDE 资源：Google Cloud Code，不要误装名称相似的编码 Agent。

## 安装前与客户端使用

安装或打开真实仓库前：

1. 选没有凭据、生产数据或重要未提交工作的可丢弃文件夹。
2. 从官方产品名称和下载页面开始，避开仿冒包与复制命令。
3. 阅读安装命令；下载并执行脚本会改变电脑，需要你的确认。
4. 第一次只允许读取、起草和展示差异；发送、发布、购买、删除和改权限不是默认动作。
5. 记录客户端、版本、系统、日期和结果。

按客户端类型使用：

- **网页/移动端聊天：** 提供少量文本，请求有边界的回答，与原文比较；先不要上传、联网、启用扩展或连接账号。
- **桌面应用：** 新建对话，必要时选择一个文件夹，先请求只读解释，再审阅小差异。
- **IDE 集成：** 打开一个工作区和文件，检查选区、根目录、工具与权限，再请求小范围改动。
- **终端 Agent：** 记录目录和状态，先做只读检查；触碰未知目录、秘密、依赖、发布或删除时停止。
- **云端/托管客户端：** 记录远程仓库、运行环境、凭据、网络、持久化和审批规则；先从草稿或只读任务开始。

<span id="names-that-are-easy-to-confuse"></span>

## 容易混淆的名称

本页先把产品、客户端和运行环境分开，再进入安装流程。不要仅凭名称相似，就把 Grok、Grok Bot、Grok Build，或 Codex、Claude Code、Google Cloud Code 当成同一种工具。

<span id="install-and-make-a-first-safe-attempt"></span>

## 安装并完成第一次安全尝试

本节命令是来源回执中记录的官方入口，不是本项目执行过的命令。执行前阅读来源；若包名、安装器或权限提示不一致，就停下来。

### 先获取、检查、验证，再使用

下载并立即执行的命令需要特别谨慎。需要可检查副本时，先下载到临时文件，阅读内容，并在厂商公布时核对校验和或签名。本项目没有执行下列厂商安装器。

~~~sh
# macOS/Linux：只下载检查，不要在这一步执行
curl -fL --proto '=https' --tlsv1.2 -o vendor-installer.sh '<official-installer-url>'
sed -n '1,180p' vendor-installer.sh
shasum -a 256 vendor-installer.sh
~~~

~~~powershell
# Windows PowerShell：只下载检查，不要在这一步执行
$installerPath = Join-Path $env:TEMP 'vendor-installer.ps1'
Invoke-WebRequest -Uri '<official-installer-url>' -OutFile $installerPath
Get-Content -Path $installerPath -TotalCount 180
Get-FileHash -Path $installerPath -Algorithm SHA256
~~~

### ChatGPT：网页、移动端和桌面端

打开官方 [ChatGPT 网页入口](https://chatgpt.com/)，先做纯文本练习。移动端从 [ChatGPT 下载页面](https://chatgpt.com/download/)进入，安装前核对发布者、账号、地区和权限。桌面端从 [Codex 桌面应用指南](https://developers.openai.com/codex/app.md)进入，登录后选择 ChatGPT 或 Codex；这不等于桌面端与网页、Codex CLI、IDE 或 Codex Cloud 相同。添加文件夹前把它当作一次权限决定，先用可丢弃文件夹和只读解释。

### Grok Bot：桌面端与伴侣移动端

Grok Bot 的工作发生在持久化云端电脑上，不是本地终端编码 Agent。先查看[官方入门指南](https://docs.x.ai/grok-bot/get-started)列出的账号、套餐、存储和隐私前置条件。按机器选择 macOS Apple silicon/Intel、Windows x64/Arm64 或 Linux 包；打开应用选择 Get started，在浏览器完成认证。第一次请求只做公共页面摘要或清单草稿，并要求来源、未知项和明确停止点。密码、双因素验证码、CAPTCHA 和付款确认应使用官方接管流程，不要把秘密放进聊天。审批和隐私边界见[官方指南](https://docs.x.ai/grok-bot/approvals-security-and-privacy)。

### Grok Build：独立终端编码 Agent

Grok Build 不是 Grok Bot 桌面客户端。官方快捷安装命令如下，会下载并执行远程脚本；执行前先阅读当前来源：

~~~sh
# macOS、Linux 或 Git Bash
curl -fsSL https://x.ai/cli/install.sh | bash
~~~

~~~powershell
# Windows PowerShell
irm https://x.ai/cli/install.ps1 | iex
~~~

先运行 grok --version，再在可丢弃文件夹中请求列出文件并停止。无头只读入口是：

~~~sh
grok -p "List the files in this disposable folder; do not edit anything or run commands." --output-format json
~~~

JSON 是待审阅记录，不是模型遵守边界的证明。来源见[官方 Grok Build README](https://raw.githubusercontent.com/xai-org/grok-build/main/README.md)和[无头脚本参考](https://docs.x.ai/build/cli/headless-scripting)。

### Codex：终端、桌面、IDE 与云端

Codex CLI 的官方入口包括：

~~~bash
# macOS 或 Linux 独立安装器
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# npm 备用路径
npm install -g @openai/codex

# macOS Homebrew 备用路径
brew install --cask codex
~~~

~~~powershell
# Windows PowerShell 独立安装器
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
~~~

安装后在可丢弃项目中运行 codex。只读、非交互检查可使用：

~~~sh
codex exec --json "Summarize the repository structure. Do not edit files or run commands."
~~~

只有明确需要修改时才使用 workspace-write；第一次练习不要使用 danger-full-access。桌面、CLI、IDE 和云端工作面可能有不同文件、Shell、审批和网络访问。Windows 的原生路径见 [Codex CLI](https://developers.openai.com/codex/cli.md)、[Windows 指南](https://developers.openai.com/codex/windows.md)和 [IDE 指南](https://developers.openai.com/codex/ide.md)。

### Claude Code：终端、IDE 与桌面端

官方安装入口包括：

~~~bash
# 警告：会下载并执行远程代码
# macOS、Linux 或 WSL
curl -fsSL https://claude.ai/install.sh | bash

# macOS 或 Linux Homebrew
brew install --cask claude-code
~~~

~~~powershell
# 警告：会下载并执行远程代码
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Windows WinGet
winget install Anthropic.ClaudeCode
~~~

Command Prompt 应使用官方 CMD 入口：

~~~cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
~~~

安装后在可丢弃项目中运行 claude。只读打印模式：

~~~sh
claude -p "Explain the purpose of this disposable fixture. Do not edit files or run commands."
~~~

桌面应用包含 Claude Code，但不承诺与 CLI 的脚本化和自动化相同。原生 Windows 用户先查看 Shell 和 Git for Windows 说明。来源见 [Claude Code 概览](https://code.claude.com/docs/en/overview)、[CLI 参考](https://code.claude.com/docs/en/cli-reference)和[桌面指南](https://code.claude.com/docs/en/desktop)。

### Google Cloud Code：按实际使用的 IDE 选择

它是云原生开发 IDE 扩展，不是通用终端 Agent。VS Code 使用 [安装指南](https://cloud.google.com/code/docs/vscode/install)，IntelliJ/JetBrains 使用 [安装指南](https://cloud.google.com/code/docs/intellij/install)，Cloud Shell Editor 已内置 Cloud Code，不需单独安装扩展。第一次打开示例或可丢弃云原生项目，检查 Google Cloud 项目和凭据，在接受构建、部署、密钥或资源操作前审阅提议。来源见 [Google Cloud Code 来源回执（locale-neutral）](../../docs/research/encyclopedia-cloud-code-sources-2026-09-04.md)。

### Gemini：网页、移动端、CLI 与 IDE

网页和移动端从 [Gemini](https://gemini.google.com/)或官方应用开始，只提供已提供文本。CLI 官方入口包括：

~~~sh
# 运行一次
npx @google/gemini-cli

# npm 全局安装
npm install -g @google/gemini-cli

# macOS/Linux 备用
brew install gemini-cli
~~~

全局安装后在可丢弃项目中运行 gemini；npx 启动不代表已创建永久命令。需要 API key 或 Vertex AI 时，遵守[官方认证指南](https://geminicli.com/docs/get-started/authentication)，不要把密钥放入提示词或项目。IDE 集成见[官方指南](https://geminicli.com/docs/ide-integration)。网页、CLI 和 IDE 结果不能互相替代。

### DeepSeek Harness：开发者预览版 Web 与 profile

DeepSeek Harness 不是 DeepSeek 聊天产品或 API，官方仓库还明确说明尚未经过安全审计。官方 npm Web 入口：

~~~sh
npx @deepseek-ai/dsh web
~~~

默认地址是 127.0.0.1:3080；不自动打开浏览器：

~~~sh
npx @deepseek-ai/dsh web --no-open
~~~

2026-09-08 查询 npm registry 时 latest 指向 0.1.2-rc.1；要复现这次版本观察，可显式使用：

~~~sh
npx @deepseek-ai/dsh@0.1.2-rc.1 web --no-open
~~~

运行前检查 node --version、npm --version 和 npx --version。Web UI 打开后，进入 Settings → Models 配置获授权的 DeepSeek API key，添加并选择可丢弃工作区，再执行只读任务。源码路径为 clone、pnpm install、pnpm run build、pnpm dsh web；源码的 Node/pnpm 要求不能自动改写成 npm 包的兼容性保证。web、headless、sdk、sdk-minimal 和 acp 是不同 profile；文档中的 TUI 示例不证明 TUI 是默认内置入口。来源见 [DeepSeek Harness 来源回执（locale-neutral）](../../docs/research/encyclopedia-deepseek-harness-sources-2026-09-03.md)与[安全说明（locale-neutral）](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md)。官方没有给出所有 profile 和配置在 Windows/macOS 上全面支持的单一承诺。

### 安装中途停止时

| 症状 | 下一步检查 | 安全解释 |
| --- | --- | --- |
| 找不到命令 | 新开 Shell，检查 PATH，运行版本命令 | Shell 可能未重载；认证仍未测试 |
| 下载包与机器不匹配 | 检查 Windows x64/Arm64 或 macOS Intel/Apple silicon | 架构不匹配不等于产品不可用 |
| 浏览器登录成功但客户端不能工作 | 检查客户端账号、提供商、工作区和权限 | 浏览器身份与客户端授权是不同观察 |
| 本地文件夹缺失或托管工作区为空 | 记录确切运行环境和路径 | 可能查看的是另一台机器或检出 |
| 任务要求发送、发布、删除、付款或改权限 | 停止并请求明确批准 | 安装和认证不等于外部操作授权 |
| Harness 启动但会话不可用 | 检查回环地址、工作区、模型配置和 profile 文档 | Web 启动不等于模型访问、沙箱证明或任务成功 |

把原始错误、客户端、版本、系统、工作目录和日期写进回执。不要把凭据或私有文件内容放进 issue、来源记录或故障示例。

<span id="chatgpt-first-task"></span>

## ChatGPT 第一次任务

在获授权的 ChatGPT 工作面中运行下方安全任务。记录确切工作面和日期；联网、记忆、上传和分享能力即使出现，本练习也不需要。桌面端先新建聊天，不要一开始打开真实项目文件夹。

<span id="claude-code-first-task"></span>

## Claude Code 第一次任务

在可丢弃项目中让 Claude Code 解释目录，不编辑文件、不运行命令。检查它读取了什么、没有读取什么，以及权限提示，再请求小而可审查的差异。

<span id="gemini-first-task"></span>

## Gemini 第一次任务

在获授权的网页或移动端聊天中运行安全任务，记录账号和扩展状态。纯文本练习不要启用扩展。如果用 Gemini CLI，从可丢弃文件夹启动，并把 CLI 认证单独记录。

<span id="deepseek-first-task"></span>

## DeepSeek 第一次任务

纯文本练习只使用获授权的聊天工作面。Harness 在 127.0.0.1:3080 启动，只能证明本地 Web 服务器启动；配置模型密钥或 Agent 任务前，先读安全边界、选择工作区并检查每个行动。

<span id="grok-first-task"></span>

## Grok 第一次任务

消费者聊天、Grok Bot 和 Grok Build 是三种不同工作面。Bot 先做草稿或只读任务，Build 先在可丢弃本地文件夹中检查；当前答案或已连接账号都不是发送、发布、付款、文件变更或其他外部行动的授权。

## 所有平台都能使用的安全首次任务

~~~text
结果：把下面这份虚构的俱乐部通知改写给新会员。
材料：“俱乐部每周二 6 点开会。请带上笔记本。房间稍后确认。”
回复格式：写两个句子。保留材料中的每一个事实。把缺失细节放在 [方括号] 中。然后列出你保留的事实。
检查：对照原文和改写。不得添加新的时间、房间、费用、联系方式或承诺。
停止：不要联网搜索、发送、发布、上传、运行命令，也不要擅自假设未知细节。
~~~

检查：每个陈述能否在原文中找到；是否遵守两个句子并列出保留事实；是否把未知细节错误地补成了事实。客户端若提供工具或要求额外材料，就停下来。

<span id="windows-and-macos-setup-paths"></span>

## Windows 与 macOS 安装路径

这只是受控首次使用流程，不是完整支持承诺。厂商文档仍是系统版本、架构、地区、账号资格和安装变化的权威来源。

### 基础依赖

| 依赖 | 官方入口 | 什么时候需要 |
| --- | --- | --- |
| Node.js | [Node.js 下载](https://nodejs.org/en/download/) | Gemini CLI 和其他 Node 客户端，先看产品自己的版本要求 |
| Windows Git | [Git for Windows](https://git-scm.com/download/win) | 克隆可丢弃项目或提供 Git 上下文 |
| macOS/Linux Git | [Git 安装指南](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) | 需要仓库或版本差异的终端工作流 |
| macOS Homebrew | [Homebrew](https://brew.sh/) | 官方文档列出时作为可选包管理器 |

### Windows：PowerShell 优先

~~~powershell
$PSVersionTable.PSVersion
[System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
Get-Command node,npm,git -ErrorAction SilentlyContinue
~~~

按 x64 或 Arm64 选择官方下载。安装器修改 PATH 后重新打开 PowerShell，再运行：

~~~powershell
Get-Command codex,claude,gemini,grok -ErrorAction SilentlyContinue
~~~

只在产品登录或提供商流程中认证；用可丢弃文件夹运行安全首次任务。通过 npx 启动的 dsh 不一定会成为永久全局命令。

### macOS：先检查芯片

~~~sh
sw_vers
uname -m
command -v node npm git brew
~~~

按 Apple silicon 或 Intel 选择官方下载。若命令不在 PATH 中，重新打开 Terminal；通过客户端认证，不要把复制来的值放进 Shell 历史或提示词。从可丢弃文件夹开始并保存可复查输出。

### 简短对照

| 检查 | Windows | macOS |
| --- | --- | --- |
| Shell | 原生安装通常先用 PowerShell | Shell 安装器或 Homebrew 使用 Terminal |
| 架构 | x64 或 Arm64 | Apple silicon 或 Intel |
| 工作区 | 生产检出之外的新文件夹 | 生产检出之外的新文件夹 |
| 安装脚本 | 检查源代码，留意策略、权限和网络 | 检查源代码，留意包管理器、权限和网络 |
| 回执 | 产品、客户端、版本、Shell、日期、结果 | 产品、客户端、版本、Shell、日期、结果 |

## 保留第一次使用记录

| 字段 | 记录什么 |
| --- | --- |
| 客户端和运行环境 | 产品工作面、系统、架构，以及本地还是托管 |
| 范围 | 工作目录/工作区、权限模式、工具或扩展 |
| 身份验证 | 账号或提供商路径，不记录秘密 |
| 任务和结果 | 请求、回答/日志/差异、可见版本和日期 |
| 决定 | 接受、拒绝或停止了什么，以及下一步检查 |

桌面端记录主动打开后的项目或文件夹；IDE 记录文件、选区、项目根目录和差异；终端 Agent 在改动前记录起始目录和 git status --short。如果客户端不能展示它看到了什么或改变了什么，就缩小任务范围。

<span id="evidence-states"></span>

## 四种证据状态

| 声明 | 最低证据 | 它不能证明什么 |
| --- | --- | --- |
| 已安装 | 应用打开或目标命令可解析，记录产品和版本（如可见） | 认证、模型访问或任务成功 |
| 已认证 | 产品接受计划中的账号或提供商流程 | 有权使用某文件夹或执行外部操作 |
| 已运行任务 | 对声明客户端和工作区有带日期回答、日志或差异 | 正确性、安全性或用户接受 |
| 已接受结果 | 用户按要求检查并保留输出、差异或审查记录 | 长期学习、平台等价或生产就绪 |

## 完成第一次任务后，接下来走哪条路线？

- 纯文本入门练习：[Beginner Practice Pack](../communication-clinic-ZH.md)。
- 文件和工具的深度旗舰路线：[First Safe Change](first-safe-change-ZH.md)。
- 平台无关基础：[Universal Core Foundations](universal-core-foundations-ZH.md)。
- 公平比较两个平台：[LLM Comparison Protocol（locale-neutral）](../../skills/prysai-llm-comparison-protocol/SKILL.md)。
- 检查变化中的产品声明：[Platform Fact Watch（locale-neutral）](../../skills/prysai-platform-fact-watch/SKILL.md)。

## 证据状态与边界

本路线仍是 candidate / not_run。它已经补入 ChatGPT、Gemini、Grok Bot、Grok Build、Codex、Claude Code、Google Cloud Code 和 DeepSeek Harness 的带日期官方来源范围，但没有学习者运行、跨平台安装运行、账号资格检查、独立语言审校或生产就绪审查。中文内容已同步到 2026-09-08 英文百科版本，但这不等于中文母语质量和真实运行已经验证。

- [ ] 我识别了产品、客户端和运行环境，没有只凭熟悉名称判断。
- [ ] 我只使用官方来源和可丢弃或获授权工作区。
- [ ] 我记录了确切客户端、操作系统、可见版本（如有）和日期。
- [ ] 我没有粘贴秘密、私信、未发布文件或 API key。
- [ ] 我把工具行动当作提议，并在外部副作用前停下来。
- [ ] 我没有把一个平台的行为当作另一个平台的证明。
