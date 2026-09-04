# DeepSeek Harness 官方来源百科核对

**访问日期：** 2026-09-03
**研究状态：** `source-checked / read-only / not-installed / not-run`
**研究范围：** 只核对 DeepSeek Harness 官方仓库 `deepseek-ai/deepseek-harness`、该仓库文档，以及 npm 官方 registry 元数据。本文不把本机历史运行记录、第三方教程、社区帖子或本次安装/运行结果当作证据。

**仓库边界：** 本记录为候选平台适配路线提供来源依据，使用原创事实转述和来源链接；它不验证运行时行为、账号可用性或学习者结果。

**Owner：** Prysai Playbook maintainer/editor
**Next review：** 2026-10-03，或 DeepSeek Harness 的安装、profile、Web UI、平台或安全文档发生变化时提前复核。

## 结论摘要

- 官方仓库把 DeepSeek Harness（命令名 `dsh`）定义为 DeepSeek AI 开发的开源 agent harness，并明确标为 developer preview；官方同时警告会发生破坏兼容性变更。
- 官方 README 的 npm 入口是 `npx @deepseek-ai/dsh web`。仓库文档说该入口默认在 `http://127.0.0.1:3080` 启动 Web UI，并在本机启动时打开默认浏览器；`--no-open` 可关闭浏览器交接。
- 源码 checkout 的仓库根 `package.json` 声明 `pnpm@11.7.0` 和 Node `^22.19.0 || >=24.0.0`。README 的 npm 快速入口只写“安装 Node.js”，没有单独声明 npm 或 npx 版本。
- npm registry 的 `@deepseek-ai/dsh@0.1.2-rc.1` 元数据有 `dsh` bin，但没有 `engines` 字段。因此，源码 checkout 的 Node 约束不能自动改写成已发布包的 registry 兼容性声明。
- CLI/终端边界是明确的：`dsh web` 是 Web profile 别名；`headless`、`sdk`、`sdk-minimal` 和 `acp` 是不同 profile，其中 SDK/ACP 通过 stdio 工作。官方 CLI 文档没有把 TUI 当作默认内置入口；文档中的 `dsh --profile tui` 明确是假设该 profile 已安装的示例。
- 官方没有给出“整个 DeepSeek Harness 在 Windows 和 macOS 上全面支持”的单一声明。仓库包含 Windows ACL、PowerShell、Win32 和 macOS Seatbelt 相关实现/测试与 CI 资料，但这只能证明仓库存在相应平台代码或验证路径，不能单独证明每个发行入口、配置组合或功能在目标平台上可用。
- 官方安全说明明确说项目尚未经过安全审计，不应视为安全或生产就绪；它可以执行模型生成的代码/命令、加载第三方插件并访问被授予的网络、进程、凭据和文件。沙箱、审批和权限控制只能降低风险，不能保证隔离。

## 逐条事实记录

### 1. 项目身份、版本状态与许可证

**事实：** 官方 README 将 DeepSeek Harness（`dsh`）描述为由 DeepSeek AI 开发的开源 agent harness，并说明采用“一切皆插件”架构。README 同时把项目标为 developer preview，并警告会有 compatibility-breaking changes。仓库 README 还链接 MIT 许可证和第三方依赖许可证说明。

**官方 URL：**

- https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md
- https://raw.githubusercontent.com/deepseek-ai/deepseek-harness/master/README.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/LICENSE
- https://github.com/deepseek-ai/deepseek-harness/blob/master/THIRD_PARTY_NOTICES.md

**访问日期：** 2026-09-03
**适用范围：** 官方仓库 `master` 分支 README 对项目整体的描述；版本状态不是对任一具体 npm 版本的稳定性保证。
**未核实项：** 本记录没有进行独立安全审计、生产可靠性测试、长期兼容性测试或许可证法律意见审查。

### 2. npm 安装入口、包名与 npx 行为边界

**事实：** 官方 README 的 npm 运行段落要求先安装 Node.js，然后执行：

```sh
npx @deepseek-ai/dsh web
```

官方 README 没有在该段单独列出 npm 版本、npx 版本、全局安装步骤或 API key 作为启动 Web server 本身的前置条件。Web UI 使用模型前，官方 Web UI 指南要求在 Settings → Models 中配置 DeepSeek API key。

官方 npm registry 元数据（访问日读取）显示：

- 包名：`@deepseek-ai/dsh`
- latest：`0.1.2-rc.1`
- `bin`：`dsh: lib/bin.js`
- license：MIT
- repository：`git+https://github.com/deepseek-ai/deepseek-harness.git`，目录 `apps/cli`
- registry 的该版本没有 `engines` 字段
- registry 记录的 tarball 是 `https://registry.npmjs.org/@deepseek-ai/dsh/-/dsh-0.1.2-rc.1.tgz`

同一 registry 中，未加 scope 的 `deepseek-harness` 是另一个 `0.0.1` 占位包：其描述为 “Reserved package name for the DeepSeek Harness TUI project”，没有 `bin`、repository 或可运行 CLI 声明。不能把 `npx deepseek-harness` 当作官方 Harness CLI 入口。

**官方 URL：**

- https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md#run
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.md
- https://registry.npmjs.org/@deepseek-ai%2fdsh
- https://registry.npmjs.org/deepseek-harness

**访问日期：** 2026-09-03
**适用范围：** README 的 npm 入口适用于官方发布的 `@deepseek-ai/dsh` CLI 路线；registry 字段只描述 registry 当时返回的包元数据。
**未核实项：** 未执行 `npx`，因此未核实本机 npm cache、网络、registry 配置、下载、解包、bin 解析、依赖安装或启动成功。未核实 `npx` 在所有 Node.js 安装方式中的可用性；官方 README 只给出 Node.js 前置条件，没有单独承诺 npm/npx 版本矩阵。

### 3. Node、npm、npx 与源码 checkout 前置条件

**事实：** 仓库根 `package.json` 声明：

```json
"packageManager": "pnpm@11.7.0",
"engines": {
  "node": "^22.19.0 || >=24.0.0"
}
```

源码运行段落给出的顺序是：

```sh
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

官方 CLI 文档还说明：源码运行需要先构建 package 和 frontend artifacts；`pnpm dsh <args...>` 运行 TypeScript 入口并转发参数，源码中的 `package.json` 脚本本身不会先替用户构建。插件管理模式会把参数转发给 pnpm，并要求 pnpm 在 PATH 中。

**官方 URL：**

- https://github.com/deepseek-ai/deepseek-harness/blob/master/package.json
- https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md#run-from-source
- https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/README.md#development
- https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md#plugin-management

**访问日期：** 2026-09-03
**适用范围：** Node/pnpm 约束适用于仓库源码 checkout；`pnpm` 版本是仓库 package-manager 声明，不是对 npm 包用户的独立安装要求。
**未核实项：** 官方这些来源没有给出 npm 版本、npx 版本、Corepack 必须性、Windows PowerShell/cmd 的完整命令差异、Node 安装发行版差异或某个具体 Node 版本的实际安装结果。没有执行 `pnpm install`、`pnpm run build` 或任何启动命令。

### 4. 启动 Web UI、地址、浏览器交接与 SSH 边界

**事实：** 官方 README 说 `npx @deepseek-ai/dsh web` 默认在 `http://127.0.0.1:3080` 启动 Web UI，并在本机启动时打开默认浏览器。SSH 启动只打印 host URL，因为本地转发地址由 SSH 客户端或编辑器持有；`--no-open` 让服务器运行但不打开浏览器。

官方 CLI reference 补充：`dsh web` 是 `--profile web` 的硬编码别名；Web profile 的应用参数包括 `--host`、`--port`、重复使用的 `--trusted-host` 和 `--no-open`。生产 Web runner 需要已构建的 package 和 frontend artifacts。官方 reference 还声明 CLI 有意不支持 `--host 0.0.0.0`，会以 usage error 退出；如果操作系统的浏览器交接失败，服务器仍继续运行并在诊断中给出 URL。

Web UI 指南规定：新 Web UI 没有选中的 workspace，必须先添加并选择 workspace，session composer 才可用；模型请求前需配置 DeepSeek API key。

**官方 URL：**

- https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md#run
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md#web-alias

**访问日期：** 2026-09-03
**适用范围：** 官方 `dsh web` Web profile；默认地址是 loopback 地址，不是对外网公开监听的部署承诺。
**未核实项：** 未启动 server，未访问 `127.0.0.1:3080`，未检查端口占用、浏览器关联、SSH 转发、反向代理、TLS、远程访问或具体 `--host` 值的可用性。

### 5. CLI、Web、headless、SDK、ACP 与终端/TUI 边界

**事实：** 官方 CLI README 将 `dsh` 定义为唯一受支持的 Node application launcher。其入口模式表规定：

| 官方入口 | 官方文档定义的边界 |
|---|---|
| `dsh web` | `--profile web` 的别名，运行 Web UI |
| `dsh --profile headless "job"` | 一次性运行任务，输出最终答案后退出 |
| `dsh --profile sdk` | 通过 JSON-RPC stdio 服务 SDK client |
| `dsh --profile sdk-minimal` | 通过 JSON-RPC stdio 服务 SDK client |
| `dsh --profile acp` | 通过 ACP stdio 服务 automation client |
| `dsh plugin --profile <name> <pnpm args>` | 在 profile 目录中转发给 pnpm 管理插件 |

官方 CLI reference 进一步说明：headless profile 不挂载 browser Connection、HTTP server、Web runtime 或 browser client，也不打开 listening port。启动器 flag 位于 app 参数之前；第一个启动器不认识的 token 起 app 参数边界。Web 应用拥有 `--host`、`--port`、`--trusted-host` 和 `--no-open`。

官方文档中的 `dsh --profile tui --resume <id>` 只写作 “example, assuming the tui profile is installed”；因此不能从该示例推出 `tui` 是默认内置 profile。官方根 README 的默认 npm 入口是 Web UI，而不是 TUI。

**官方 URL：**

- https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/README.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md

**访问日期：** 2026-09-03
**适用范围：** 官方 `@deepseek-ai/dsh` launcher 的 profile 与参数边界。
**未核实项：** 未安装 TUI 或任何外部 plugin，未执行 stdio 协议交互，未验证具体终端 emulator、PTY、shell、编码或信号行为。没有把第三方 `dsh-TUI` 仓库的自述作为 DeepSeek Harness 官方支持声明。

### 6. Windows 与 macOS 支持声明的证据等级

**事实：** 官方仓库中存在 Windows 和 macOS 相关的代码、测试或 CI 资料，包括 Win32 文件/进程相关模块、Windows ACL sandbox 包、macOS Seatbelt 测试，以及通过 Wine 和 Windows Node 进行 Windows gates 的脚本。仓库的 sandbox 文档把平台后端描述为：Linux 可使用 Landlock/bubblewrap，macOS 确保 `sandbox-exec` 可用，Windows 确保 ACL restricted-token runner 可启动；这说明仓库设计了相应后端路径。

**边界事实：** `native/landlock-run` 的 support matrix 只支持 Linux x64 和 Linux arm64 的 Landlock npm 平台包，并明确把其自身的 darwin 和 win32 平台包列为 deliberately unsupported。该矩阵是 `node-addon-landlock-run` 这个独立限制器的支持范围，不是整个 DeepSeek Harness 的总平台矩阵。

**判断：** 现有官方来源不足以支持以下宽泛表述：“DeepSeek Harness 在 Windows/macOS 上全面支持”“所有 Web/CLI/TUI/profile/插件功能跨 Windows/macOS 等价”“某个安装命令在 Windows/macOS 一定可运行”。较窄、可证据化的说法是：仓库包含 Windows/macOS 适配代码、测试或 CI 路径；具体发行包和功能组合仍需逐项验证。

**官方 URL：**

- https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/sandbox/sandbox-windows-acl
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/sandbox/sandbox/README.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/scripts/wine-windows-gates.sh
- https://github.com/deepseek-ai/deepseek-harness/blob/master/native/landlock-run/docs/support-matrix.md
- https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/sandbox/sandbox-local/tests

**访问日期：** 2026-09-03
**适用范围：** 仓库源代码和其声明的测试/CI 路径；不是安装成功、运行成功或产品支持承诺。
**未核实项：** 未在 Windows 或 macOS 上安装、启动或运行 Web UI/CLI/TUI；未执行 Wine gates；未核实不同 CPU、shell、终端、Node 发行版、权限配置、沙箱后端或插件组合的结果；没有真实平台运行证据。

### 7. 安全、权限、凭据与外部副作用

**事实：** 官方 `SAFETY.md` 明确：DeepSeek Harness 是实验性 developer-preview 软件，尚未经过 security audit，不得视为 secure 或 production-ready。项目可以执行模型生成的代码和命令、加载第三方插件，并访问被提供给它的网络、进程、凭据和文件。错误的模型输出、缺陷、错误配置、恶意输入或不可信插件，可能损坏主机、修改/删除文件、泄露数据或凭据，或造成其他非预期影响。

官方安全说明还说：sandboxing、approval prompts 和 permission controls 可以降低风险，但不保证隔离或防止损害；不要把 DeepSeek Harness 作为不可信 workload 的唯一安全控制。官方给出的使用原则是最小权限、优先 disposable VM/container/dedicated environment、备份可访问文件、不暴露不愿承担风险的凭据或数据，并在允许运行前检查插件、配置和拟执行命令。

官方 Web/CLI 文档补充的当前默认边界包括：base-backed profile 的新 session 默认 `workspace-write`；Bash 和 filesystem mutation 受 session workspace 与平台临时根目录限制，但读取和网络访问不受该文件沙箱限制；独立 `sdk-minimal` profile 固定为 `danger-full-access`，且不挂载 approval 或 permission settings service。凭据文档说 API key 通过 UI 保存为写入后不可读的凭据，存放在 `$DSH_HOME/.credentials.yaml`，settings 只保留 credential reference。

官方文档还特别指出：默认启用的 `web_fetch` 在某些 sandbox/approval 模式下无需逐次确认；HTTP fetch 会拒绝非公网目标，但这不等于阻止模型向公网 URL 发送数据。外部 MCP server 默认不启用，因为每个 server command 都是 agent sandbox 外部的受信任可执行代码。

**官方 URL：**

- https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md#web-alias
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/sandbox.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/web.md

**访问日期：** 2026-09-03
**适用范围：** 官方当前仓库文档所描述的 profile、sandbox、credential 和 Web fetch 行为；实际策略由 profile、patch、平台后端和部署配置共同决定。
**未核实项：** 未运行命令、未加载插件、未配置 API key、未检查本机 `$DSH_HOME` 或权限；未做安全审计、沙箱逃逸测试、数据外泄测试、凭据存储取证或第三方插件审查。文档描述不等于本次环境已启用或已证明有效。

## 官方来源索引

| 来源 | 用途 | 访问日期 | 适用范围 | 未核实项 |
|---|---|---|---|---|
| https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md | 项目身份、developer preview、npm/source 启动、Web 默认地址 | 2026-09-03 | 仓库 README | 未验证运行结果或兼容性 |
| https://github.com/deepseek-ai/deepseek-harness/blob/master/package.json | Node 与 pnpm 源码约束 | 2026-09-03 | 仓库 checkout | 未证明 npm 包继承该 `engines` 字段 |
| https://registry.npmjs.org/@deepseek-ai%2fdsh | 已发布 CLI 包、latest、bin、registry engines 字段 | 2026-09-03 | registry 返回的 `@deepseek-ai/dsh` 元数据 | 未下载、安装或运行 tarball |
| https://registry.npmjs.org/deepseek-harness | 名称占位包、无 bin 的元数据边界 | 2026-09-03 | registry 返回的未加 scope 包元数据 | 未把其发布者或相关 TUI 项目视为 DeepSeek 官方实现 |
| https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/README.md | launcher、profile、Web/stdio/插件边界 | 2026-09-03 | 官方 CLI 包文档 | 未运行各 profile |
| https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md | 参数边界、Web host/port、权限与源码运行细节 | 2026-09-03 | 官方 CLI 行为参考 | 未验证具体平台行为 |
| https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md | 安全状态、权限和风险提示 | 2026-09-03 | 整个项目的官方安全声明 | 不是独立安全审计 |
| https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.md | workspace、API key 与 Web UI 使用前置 | 2026-09-03 | Web UI 文档 | 未启动 Web UI |
| https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.md | API key 的保存与凭据引用 | 2026-09-03 | provider 配置文档 | 未配置或读取凭据 |
| https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/sandbox.md | sandbox mode、fail-closed 和平台后端术语 | 2026-09-03 | sandbox package contract | 未测试沙箱强制性 |
| https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/web.md | Web fetch 的网络/审批边界 | 2026-09-03 | Web capability contract | 未执行网络请求 |
| https://github.com/deepseek-ai/deepseek-harness/blob/master/native/landlock-run/docs/support-matrix.md | 独立 Landlock runner 的平台范围 | 2026-09-03 | `node-addon-landlock-run` 子项目 | 不可外推为全 Harness 平台矩阵 |

## 研究停止条件与后续复核

本次在官方来源已经足以回答安装入口、源码前置条件、Web UI 启动方式、CLI/终端边界、安全警告和平台声明的证据范围后停止。没有为了填补官方未声明的 npm/npx 版本、Windows/macOS 全面支持或实际成功率而引入非官方证据。

本记录已为候选 reader-facing 平台适配器提供来源输入，但至少还需要：固定版本/commit、逐平台受控安装与运行记录、正例和失败例、权限/凭据审查、插件许可证边界，以及明确的复核日期。来源核对不等于这些验证已经完成。
