# 平台与客户端百科官方来源独立复核报告

**复核日期：** 2026-09-08（America/Los_Angeles）
**复核状态：** `candidate / source-checked / read-only / not-installed / not-logged-in`
**复核工作树：** 当前隔离的本地验证 checkout（具体路径不记录）
**范围：** 仅复核厂商官方文档、官方仓库和 npm 官方 registry 元数据；未运行安装器、未执行 npm/npx 包、未登录、未创建云资源、未修改既有文件。本文是平台事实与入口的来源收据，不是安装成功、账号可用性、运行时兼容性、安全审计或生产就绪证明。

## 先给结论

1. 拼写应保持为 **Grok Bot**。xAI 当前官方文档把它描述为需要符合条件的计划、桌面应用或移动应用，以及云端持久计算机的产品；本次官方来源没有建立一个独立的 Grok Bot Web 客户端 URL 或 Grok Bot CLI 安装器。Grok Bot 的云端终端不能改写成“本地终端安装”。
2. **Codex** 的入口应拆成 ChatGPT 桌面应用、Codex CLI、IDE 扩展和 Codex cloud。桌面应用是 ChatGPT 桌面入口中选择 Codex；CLI 有 macOS/Linux 独立安装器、Windows PowerShell 安装器、npm 和 Homebrew；IDE 入口至少包括 VS Code 兼容编辑器、Cursor、Windsurf，以及文档指向的 Xcode/JetBrains 集成。官方说明不等于本机安装成功或账户具备全部功能。
3. **Claude Code** 是 Anthropic 的正式名称，官方把 terminal、IDE、desktop、web 分开描述。native 安装、Homebrew 和 WinGet 的更新行为不同；Windows 还区分 PowerShell 与 CMD。Claude Code 不应被重命名为 “Cloud Code”。
4. **Google Cloud Code** 是 Google Cloud 的另一项官方产品/扩展家族，入口覆盖 VS Code、IntelliJ 和 Cloud Shell；它不能与 Claude Code、Codex cloud 或一般意义的“云端代码代理”合并成一个条目。
5. **DeepSeek Harness**（命令 `dsh`）仍由官方仓库标为 developer preview，并警告会有兼容性破坏变更。npm `latest` 在本次查询为 `0.1.2-rc.1`，而仓库根 `package.json` 的当前工作树版本是 `0.1.5-alpha.1`；二者不能互相替代。发布包元数据显示 `dsh` bin 和 MIT，但没有 `engines` 字段；源码仓库的 Node 约束仅适用于源码 checkout。
6. “Windows/macOS 安装入口”必须按产品和表面分别记录：桌面应用、IDE 插件、终端 CLI、浏览器/云端入口不是同一个运行时。链接可达、文档有命令或 registry 有包，都不证明下载、安装、登录、权限、网络、沙箱或任务执行成功。

## 术语和证据规则

- **官方明示：** 来源页面直接给出产品名、入口、平台、命令、版本或许可字段。
- **保守改写：** 本报告只做短小的原创事实转述并链接原文，不复制厂商段落、命令之外的长文本、截图、Logo、代码包或 UI 资产。
- **未验证：** 本次没有执行的事项，不能从官方文档存在性推断出来。
- **适用范围：** 来源对某个产品、版本、客户端、操作系统或仓库状态负责的边界。相邻产品的名称相似，不扩大来源范围。

## 当前入口差异总表

| 产品/表面 | 官方来源支持的入口 | Windows | macOS | IDE/桌面/终端边界 | 最容易过时的事实与本次未验证 |
| --- | --- | --- | --- | --- | --- |
| **Grok Bot** | xAI Grok Bot desktop app；iPhone/Android companion app；Bot 使用共享的持久云端计算机 | 官方 get-started 列出 Windows 桌面入口 | 官方列出 macOS 桌面入口 | 桌面/移动是客户端；browser、filesystem、terminal 是云端 Bot 的工作面，不是本地 CLI | 计划/地区/账户、Cursor 数据设置、下载架构、商店可用性、安装成功、登录和 Bot 权限未验证；没有把 Grok Build CLI 归入 Grok Bot |
| **Codex** | ChatGPT desktop app；Codex CLI；Codex IDE extension；Codex cloud | ChatGPT 桌面应用；CLI Windows standalone PowerShell installer；IDE 入口依编辑器 | ChatGPT 桌面应用；CLI macOS standalone installer/Homebrew | 桌面应用、CLI、IDE 扩展、cloud 是分开的文档和运行面 | 计划/地区/组织权限、下载与登录、CLI/IDE/cloud 行为等价、Windows sandbox/WSL/工具链未验证 |
| **Claude Code** | native CLI；Homebrew；WinGet；VS Code/Cursor；JetBrains；Claude desktop Code tab；web | PowerShell/CMD native；WinGet；desktop x64/ARM64 | native；Homebrew；desktop Intel/Apple Silicon | JetBrains 插件要求另装 CLI；desktop 内置 Claude Code；web 无本地 setup | 版本、订阅/Console 资格、插件与 CLI 配合、beta Linux desktop、安装与更新结果未验证 |
| **Google Cloud Code** | Cloud Code for VS Code；Cloud Code for IntelliJ；Cloud Code for Cloud Shell | IDE/Cloud Shell 入口由 Google 页面和各 IDE 安装页负责 | 同上；IntelliJ 菜单路径不同 | 云原生 IDE 支持/扩展家族，不是 Claude Code 或 Codex cloud | Google Cloud 项目、凭据、IDE 版本、插件安装、部署和功能矩阵未验证；不要以“Cloud Code”作为 Anthropic 别名 |
| **DeepSeek Harness** | `npx @deepseek-ai/dsh web`；源码 checkout；`dsh` profiles（web/headless/sdk/sdk-minimal/acp 等） | 官方来源未给出整个项目的 Windows 全面支持承诺 | 官方来源未给出整个项目的 macOS 全面支持承诺 | npm/source CLI；Web UI 默认 loopback；profile 不是多个独立公共 bin | developer preview、破坏性变更、npm 与源码版本差异、Node/包兼容性、API key、沙箱、插件和运行结果未验证 |

## 逐项官方来源复核

### 1. Grok Bot（拼写边界：Bot）

**官方明示的事实**

- xAI 的 [Grok Bot overview](https://docs.x.ai/grok-bot/overview) 将 Bots 作为使用持久云端计算机的工作面，列出 browser、filesystem、terminal 等能力；这描述的是 Bot 的云端工作环境，不是本地安装了一个终端程序。
- [Get started](https://docs.x.ai/grok-bot/get-started) 当前列出 Grok Bot desktop app for **macOS、Windows、Linux**，并要求符合条件的计划；页面还涉及云端数据存储与 Cursor 账户/数据设置条件。
- [Grok Bot for Mobile](https://docs.x.ai/grok-bot/mobile) 当前列出 iPhone/iOS 与 Android 移动入口，并说明移动应用连接到与桌面应用相同的 Bots、对话、例程、连接器和共享云端计算机；页面给出 iOS 18+ 与 Android 9+ 的设备要求。
- [Approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) 把消息发送、发布、购买/资金转移、删除或覆盖数据、改变权限、生产变更、接受法律条款等列为需要谨慎边界/审批的后果性动作，并明确审批不会撤销已经完成的工作。

**不能写成的内容**

- 不能改变产品拼写；也不能把一般 [Grok overview](https://docs.x.ai/grok/overview) 的消费者助手入口替代 Grok Bot 条目。
- 不能把 Bot 云端 terminal 写成 `grok-bot` 本地 CLI，也不能把单独的 [Grok Build](https://docs.x.ai/build/overview) coding agent 当成 Grok Bot 的终端安装方式。
- 本次没有找到或验证独立的 Grok Bot 公共 Web 客户端 URL、下载包 hash、安装器成功、移动商店上架状态、区域/计划实际可用性或账户登录。

**适用范围与复核责任**

以上 xAI 来源适用于 xAI 文档当前描述的 Grok Bot 产品和其桌面/移动/云端工作面；入口、计划、平台、区域、审批和存储事实应由 Prysai Playbook maintainer/editor 在下一次内容发布前重新检查。

### 2. OpenAI Codex

**官方明示的事实**

- [Codex quickstart](https://developers.openai.com/codex/quickstart) 把 ChatGPT desktop app/web、Codex CLI、Codex IDE extension 和 Codex cloud 作为不同的使用入口；当前页面说明 ChatGPT desktop app 可用于 macOS、Windows、Linux。
- [Codex CLI](https://developers.openai.com/codex/cli) 当前列出：macOS/Linux standalone installer、Windows standalone PowerShell installer、`npm install -g @openai/codex` 和 `brew install --cask codex`。页面还描述从项目目录启动 `codex`、登录、`codex exec` 和通过 CLI 使用 Codex cloud 的路线。
- [Codex IDE extension](https://developers.openai.com/codex/ide) 当前列出 VS Code 及兼容编辑器的扩展入口，并明确链接/命名 Cursor、Windsurf；页面还指向 Xcode 和 JetBrains 自有集成路径。它描述的是编辑器上下文（例如打开的文件/选择），不是任意 IDE 的普遍兼容承诺。
- [Codex cloud](https://developers.openai.com/codex/cloud) 是单独的云端工作面；不能由桌面应用或 CLI 的存在推导出某个账号已经拥有 cloud 权限或本地/cloud 行为完全相同。
- [Windows sandbox](https://developers.openai.com/codex/windows) 当前说明可在 Windows 原生 PowerShell 中使用 Windows sandbox，并区分 `elevated` 与 `unelevated` 模式；页面把 Windows 11 标为推荐基线，近期完整更新的 Windows 10 标为 best effort，并说明 WSL 是特定工作流下的选择。
- [ChatGPT desktop app](https://developers.openai.com/codex/app) 当前的首次使用路径是安装 ChatGPT、登录、选择工作位置，然后在 ChatGPT 或 Codex 之间选择；macOS/Windows 使用 [ChatGPT download](https://chatgpt.com/download/)，Linux 使用官方 Linux 安装指南。

官方 npm registry 在 2026-09-08 查询到 `@openai/codex`：`latest=0.153.4`、`bin.codex=bin/codex.js`、`engines.node=>=16`、`license=Apache-2.0`、repository 为 `openai/codex` 的 `codex-cli` 目录。该 registry 观察没有下载或执行包。

**适用范围与未验证事项**

OpenAI 文档适用于对应的 Codex 产品入口和当前文档说明；npm 字段只适用于本次查询到的 registry 版本快照。计划/地区/组织资格、安装器执行、签名/哈希、实际 PATH、Windows sandbox 政策、IDE 扩展响应、登录和任务完成未验证。不能以本报告替代 OpenAI 的最新下载页、账户提示或目标环境测试。

### 3. Claude Code（不是 Cloud Code）

**官方明示的事实**

- [Claude Code overview](https://code.claude.com/docs/en/overview) 当前明确使用产品名 **Claude Code**，并把 terminal、IDE extensions、desktop app、browser/web 作为不同 surfaces；多数 surface 需要 Claude subscription 或 Anthropic Console 账户。
- Terminal native install：macOS/Linux/WSL 使用 `https://claude.ai/install.sh`，Windows PowerShell 使用 `https://claude.ai/install.ps1`，Windows CMD 使用 `https://claude.ai/install.cmd`。官方还建议 native Windows 使用 Git for Windows 以获得 Bash tool；没有 Git for Windows 时使用 PowerShell shell tool。WSL 不需要 Git for Windows。
- Homebrew 入口是 `brew install --cask claude-code`；官方区分稳定 channel 的 `claude-code` 与 latest channel 的 `claude-code@latest`，并说明 Homebrew 安装不会自动更新。
- WinGet 入口是 `winget install Anthropic.ClaudeCode`，官方说明 WinGet 安装不会自动更新。
- IDE 入口包括 VS Code/Cursor 扩展；JetBrains 入口覆盖 IntelliJ IDEA、PyCharm、WebStorm 等，但 JetBrains 插件要求单独安装 Claude Code CLI。
- Desktop app 入口当前列出 macOS Intel/Apple Silicon、Windows x64、Windows ARM64；Ubuntu/Debian desktop 仍在 beta 路径。官方说明 desktop Code tab 内置 Claude Code，因此不必另装 CLI 来使用该桌面 Code tab；这是 desktop 入口的说明，不是 CLI 与 desktop 的行为等价证明。

**适用范围与未验证事项**

官方页面适用于 Anthropic 当前命名的 Claude Code 产品及其列出的 surfaces。没有证据把 “Cloud Code” 作为 Anthropic 产品名；Google Cloud Code 见下一节。版本、订阅/Console 资格、Windows shell 选择、Git for Windows、插件安装、desktop beta、自动更新行为的实际结果和任务执行均未验证。

### 4. Google Cloud Code

**官方明示的事实**

- [Cloud Code extensions](https://cloud.google.com/code/docs) 当前将 Cloud Code 组织为 Google Cloud 的 IDE 支持/扩展文档，并明确列出 Cloud Code for **VS Code、IntelliJ、Cloud Shell**。
- [Cloud Code for VS Code](https://cloud.google.com/code/docs/vscode) 与 [Cloud Code for IntelliJ](https://cloud.google.com/code/docs/intellij) 是各自 IDE 的入口；IntelliJ 安装页当前说明可从 JetBrains Marketplace 安装 Cloud Code，并提示安装 Cloud Code 时 Gemini Code Assist 插件也会默认安装。
- [Cloud Code for Cloud Shell](https://cloud.google.com/code/docs/shell) 将其描述为面向 Kubernetes 与 Cloud Run 全生命周期的 IDE support；这是 Cloud Shell/Google Cloud 开发路径，不是 Anthropic Claude Code 的重命名。
- Google 官方总览将 Cloud Code 与 VS Code、IntelliJ、Cloud Shell 分开列出，故百科应使用完整名称 **Google Cloud Code** 或 **Cloud Code for ...**，避免与 Claude Code、Codex cloud 合并。

**适用范围与未验证事项**

以上页面适用于 Google Cloud 的 Cloud Code 扩展/Cloud Shell 文档；本次未安装 IDE 插件、未登录 Google Cloud、未检查项目/凭据/地区、未验证 Gemini Code Assist 的具体安装结果、Kubernetes/Cloud Run 部署或版本兼容性。不能从页面存在推导出本机 IDE 已可用。

### 5. DeepSeek Harness

**官方明示的事实**

- 官方 [README](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md) 将 DeepSeek Harness（`dsh`）描述为 DeepSeek AI 开发的开源 agent harness，标为 **developer preview**，并警告会有 compatibility-breaking changes。
- README 的 npm 入口是 `npx @deepseek-ai/dsh web`；官方说明默认在 `http://127.0.0.1:3080` 启动 Web UI，并在本地启动时打开默认浏览器；`--no-open` 可禁用浏览器交接。源码入口则是 `git clone`、`pnpm install`、`pnpm run build`、`pnpm dsh web`。
- [CLI README](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/README.md) 明确 `dsh` 是 Node application launcher，`web`、`headless`、`sdk`、`sdk-minimal`、`acp` 是 profiles，而不是多个独立的公共 bin。
- [CLI reference](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md) 当前把 `dsh web` 作为 `--profile web` 的硬编码别名，并说明 `--host`、`--port`、`--trusted-host`、`--no-open` 的边界；它还明确源码运行需要先有构建产物，文档示例不等于本机运行证据。
- 官方仓库根 [package.json](https://github.com/deepseek-ai/deepseek-harness/blob/master/package.json) 当前显示源码仓库版本 `0.1.5-alpha.1`、`packageManager=pnpm@11.7.0`、Node `^22.19.0 || >=24.0.0`，并将许可证字段写为 MIT。这个约束是官方源码 checkout 的仓库声明，不应自动写成 npm 发布包的 engines 约束。
- npm 官方 registry [@deepseek-ai/dsh](https://registry.npmjs.org/@deepseek-ai%2fdsh) 在 2026-09-08 查询到 `latest=0.1.2-rc.1`、`bin.dsh=lib/bin.js`、`license=MIT`、repository 为 `deepseek-ai/deepseek-harness` 的 `apps/cli` 目录，且本次读取的 latest 元数据没有 `engines` 字段。registry 版本与源码根版本不同，必须分别标注。
- 官方 [LICENSE](https://github.com/deepseek-ai/deepseek-harness/blob/master/LICENSE) 是 MIT；[THIRD_PARTY_NOTICES.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/THIRD_PARTY_NOTICES.md) 说明第三方依赖各自保留其许可证，并记录依赖闭包/通知边界。

**Windows/macOS 边界**

官方来源提供了源码、CLI、Web、profile、构建和依赖说明，但本次没有找到一条可据此宣称“DeepSeek Harness 整体全面支持 Windows 与 macOS”的单一官方兼容承诺。仓库中的平台代码、CI、Windows/macOS 相关实现或打包脚本只能证明仓库包含相应路径，不能证明每个发行入口、profile、插件、沙箱、原生模块和功能组合都在目标系统成功运行。

**适用范围与未验证事项**

以上结论分别适用于 `master` 源码快照、当前 npm registry 元数据或仓库许可证文件；它们不是固定版本锁定的长期承诺。未运行 npx、未下载/安装 tarball、未执行源码构建、未登录或提供 API key，未验证 PATH、Node 版本矩阵、pnpm、浏览器交接、端口、插件、沙箱、SDK/ACP、Windows/macOS 原生模块、网络和任务结果。

## Windows/macOS、桌面/IDE/终端入口的统一写法

### Windows

- Codex：优先指向官方 Windows sandbox/ChatGPT desktop 文档；若说 CLI 安装，明确是 Windows PowerShell standalone installer 或 npm，不要把 WSL 当成必需条件。Windows 版本、管理员策略、ConPTY、sandbox 模式和 IDE 原生依赖必须另行核对。
- Claude Code：明确区分 PowerShell、CMD、WinGet、desktop x64/ARM64；Git for Windows 是官方建议的 Bash 前置，不是本次已安装事实。
- Grok Bot：官方列出 Windows desktop app，但计划、Cursor 设置、安装包和登录必须单独验证。
- Google Cloud Code：通过 VS Code/IntelliJ 的 IDE 安装路径或 Cloud Shell 进入，不写成一个独立的 Claude-like terminal agent。
- DeepSeek Harness：仅写 `npx @deepseek-ai/dsh web` 或源码 checkout 这一官方入口，并同时标注 developer preview；不写“Windows 全面支持”。

### macOS

- Codex：区分 ChatGPT desktop app、CLI standalone installer/Homebrew、IDE 扩展；不要以 desktop app 的可下载性证明 CLI 或 cloud 可用。
- Claude Code：区分 native shell installer、Homebrew channel 和 desktop universal（Intel/Apple Silicon）；Homebrew 不自动更新，native 与之不同。
- Grok Bot：官方列出 macOS desktop app；移动 companion app 是 iOS 路线，不能代替桌面入口。
- Google Cloud Code：macOS 的 IntelliJ/VS Code 插件入口仍属于 Google Cloud IDE 扩展，需按 IDE 版本和 Google Cloud 认证条件核对。
- DeepSeek Harness：官方源码/npm入口不等于 macOS 二进制桌面应用；没有本次运行证据就不写安装成功。

### 终端、IDE、桌面、浏览器的不可合并边界

| 表面 | 可记录的事实 | 不可推断的结论 |
| --- | --- | --- |
| 终端 | 官方安装命令、npm bin、shell/CLI 文档 | 已安装、PATH 正确、登录成功、命令能完成任务 |
| IDE | 官方 Marketplace/扩展/插件入口与要求 | 任意 IDE 兼容、CLI 与插件自动配合、编辑器上下文完整 |
| 桌面 | 官方下载入口、支持的架构/系统、内置功能说明 | 下载包可信、安装成功、账户有权限、与 CLI/cloud 等价 |
| 浏览器/云端 | 官方 Web/cloud/Cloud Shell 文档与 URL | 本地文件可见、云端任务权限、数据驻留、后台任务或连接器可用 |

## 访问记录

以下 URL 均在 2026-09-08 访问或查询；页面标题/内容属于当日观察，平台页面和 registry 会变化。

| ID | 官方来源 | 厂商/类型 | 适用范围 | 未验证事项 |
| --- | --- | --- | --- | --- |
| X1 | [Grok Bot overview](https://docs.x.ai/grok-bot/overview) | xAI 文档 | Grok Bot 身份、持久云端计算机与工作面 | 账户、计划、区域、Web/CLI 入口、运行结果 |
| X2 | [Grok Bot get started](https://docs.x.ai/grok-bot/get-started) | xAI 文档 | macOS/Windows/Linux desktop、资格和首次设置边界 | 下载、安装、登录、Cursor 设置实际结果 |
| X3 | [Grok Bot for Mobile](https://docs.x.ai/grok-bot/mobile) | xAI 文档 | iPhone/Android companion、移动系统要求和云端同步描述 | 商店、地区、设备、账户和后台行为 |
| X4 | [Approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy) | xAI 文档 | 审批、敏感输入和后果性动作的官方指导 | 独立安全审计、隔离、回滚、实际审批行为 |
| O1 | [Codex quickstart](https://developers.openai.com/codex/quickstart) | OpenAI 文档 | ChatGPT desktop/web、CLI、IDE、cloud 的入口分层 | 权限、计划、安装、登录、跨 surface 等价 |
| O2 | [Codex CLI](https://developers.openai.com/codex/cli) | OpenAI 文档 | macOS/Linux/Windows/npm/Homebrew CLI 入口 | 执行、PATH、版本、认证和任务结果 |
| O3 | [Codex IDE extension](https://developers.openai.com/codex/ide) | OpenAI 文档 | VS Code-compatible、Cursor、Windsurf，以及 Xcode/JetBrains 指向 | 任意 IDE、插件响应和上下文完整性 |
| O4 | [Codex cloud](https://developers.openai.com/codex/cloud) | OpenAI 文档 | Codex cloud 独立云端工作面 | 账号资格、网络、权限、云端任务结果 |
| O5 | [Windows sandbox](https://developers.openai.com/codex/windows) | OpenAI 文档 | Windows 原生 sandbox、PowerShell、版本建议、WSL 边界 | 本机策略、管理员/UAC、sandbox 实际运行 |
| O6 | [ChatGPT desktop app](https://developers.openai.com/codex/app) | OpenAI 文档 | macOS/Windows/Linux desktop 首次入口与 Codex 选择 | 下载、登录、功能资格和本机文件权限 |
| O7 | [@openai/codex registry metadata](https://registry.npmjs.org/@openai%2fcodex) | npm 官方 registry | 2026-09-08 `latest=0.153.4`、bin、Node engines、Apache-2.0 字段 | tarball、安装、执行、版本持续性 |
| A1 | [Claude Code overview](https://code.claude.com/docs/en/overview) | Anthropic 文档 | terminal/IDE/desktop/web、native/Homebrew/WinGet 和更新差异 | 版本、订阅、安装、登录、插件和更新结果 |
| A2 | [Claude Code desktop](https://code.claude.com/docs/en/desktop) | Anthropic 文档 | desktop Code tab、macOS/Windows/Ubuntu-Debian 入口 | beta、账户、下载、desktop/CLI 行为等价 |
| G1 | [Cloud Code extensions](https://cloud.google.com/code/docs) | Google Cloud 文档 | VS Code、IntelliJ、Cloud Shell 产品族 | IDE/云项目/凭据/插件/部署结果 |
| G2 | [Cloud Code for VS Code](https://cloud.google.com/code/docs/vscode) | Google Cloud 文档 | VS Code 安装和扩展范围 | 本机 IDE 版本、安装与认证 |
| G3 | [Cloud Code for IntelliJ](https://cloud.google.com/code/docs/intellij) | Google Cloud 文档 | IntelliJ 安装和 Marketplace 路径 | 插件/协作插件/Google Cloud 资格 |
| G4 | [Cloud Code for Cloud Shell](https://cloud.google.com/code/docs/shell) | Google Cloud 文档 | Cloud Shell 的 Kubernetes/Cloud Run IDE support | Cloud Shell 会话、项目、部署和权限 |
| D1 | [DeepSeek Harness README](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md) | DeepSeek 官方仓库 | developer preview、npm/source Web UI 入口、loopback URL | 安装、运行、API key、跨平台成功 |
| D2 | [DeepSeek Harness CLI README](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/README.md) | DeepSeek 官方仓库 | `dsh` launcher 与 profile 分类 | profile、插件、SDK/ACP 和执行 |
| D3 | [DeepSeek Harness CLI reference](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md) | DeepSeek 官方仓库 | 参数、Web alias、build/source 和权限边界 | 本机行为、端口、浏览器、沙箱 |
| D4 | [DeepSeek Harness package.json](https://github.com/deepseek-ai/deepseek-harness/blob/master/package.json) | DeepSeek 官方仓库 | 源码版本、pnpm、Node engines、仓库许可证字段 | 发布包兼容性、安装和平台矩阵 |
| D5 | [@deepseek-ai/dsh registry metadata](https://registry.npmjs.org/@deepseek-ai%2fdsh) | npm 官方 registry | 2026-09-08 `latest=0.1.2-rc.1`、bin、MIT、repository、无 engines 字段 | tarball、npx、运行、Node/npm 兼容性 |
| D6 | [DeepSeek Harness LICENSE](https://github.com/deepseek-ai/deepseek-harness/blob/master/LICENSE) | DeepSeek 官方仓库 | 仓库 MIT 许可文本 | 第三方依赖许可之外的发行审查 |
| D7 | [THIRD_PARTY_NOTICES.md](https://github.com/deepseek-ai/deepseek-harness/blob/master/THIRD_PARTY_NOTICES.md) | DeepSeek 官方仓库 | 直接依赖/披露的第三方许可证边界 | 本项目发行包的完整许可审计 |
| B1 | [Node.js downloads](https://nodejs.org/en/download/) | Node.js 官方 | Windows/macOS 等终端路线的可选 Node 前置入口 | 本机 Node 版本、安装和 PATH |
| B2 | [Git for Windows](https://git-scm.com/download/win) | Git 官方 | Windows 终端/Claude Code Bash 的可选前置入口 | 本机 Git、shell、策略和版本 |
| B3 | [Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) | Git 官方 | macOS/Linux/Windows Git 安装文档入口 | 安装与 shell 配置 |
| B4 | [Homebrew](https://brew.sh/) | Homebrew 官方 | macOS 包管理器；也说明 Linux/WSL 支持 | Homebrew 安装、包版本和产品 cask 结果 |

## 许可证与改写边界

- 本文件是 Prysai Lab 的原创来源复核记录，只保存短小的事实转述、产品名称、必要的命令/版本字段和链接；不复制 vendor 文案段落、截图、Logo、源码、npm tarball、安装器或外部 Skill 指令。
- **DeepSeek Harness：** 官方仓库 LICENSE 为 MIT，但第三方通知明确各依赖保留自身许可证；任何把代码、依赖或文案纳入项目的动作都需要单独检查对应文件和通知，不能只看到根许可证就宣称全部资产可按 MIT 使用。
- **OpenAI npm：** 本次 registry 元数据显示 `@openai/codex` 为 Apache-2.0；这只说明该发布包元数据的许可字段，不自动授予复制 OpenAI 文档、商标、截图或服务内容的权利。
- **Google Cloud 文档：** Cloud Code 页面明示一般文档内容为 CC BY 4.0、代码样例为 Apache 2.0（除非另有说明）；本文件不复制其页面内容或代码。后续改写须保留署名/链接等适用条件，并逐项检查页面例外。
- **xAI、Anthropic、OpenAI 文档页面及下载入口：** 本次没有把网页内容许可概括为 CC/MIT/Apache，也不把“官方可访问”当作再发布许可。后续读者材料使用原创说明和链接；若要复制文案、图片、商标或代码，必须重新核对对应页面/仓库的许可证和品牌政策。
- 事实来源和项目内容分离：来源的更新、许可证或条款变化由来源所有者负责；本项目的原创转述、日期、适用范围、未验证项和下一次复核由 Prysai Playbook maintainer/editor 负责。

## 下一次复核触发器

最迟在 **2026-10-08** 前复核，或在以下任一事件发生时提前复核：产品更名；桌面/IDE/终端入口改变；Windows/macOS/架构支持改变；CLI 安装命令或自动更新策略改变；npm `latest`、bin、engines 或 license 字段改变；DeepSeek Harness 离开 developer preview；计划、地区、登录、Cloud Shell、插件或安全/审批说明改变。

**本报告的最终限制：** 来源核验完成不等于 `installed`、`authenticated`、`runtime-verified`、`cross-platform-equivalent`、`learner-verified`、`production-ready` 或 `publicly available`。这些状态必须由各自范围内的独立证据支持。
