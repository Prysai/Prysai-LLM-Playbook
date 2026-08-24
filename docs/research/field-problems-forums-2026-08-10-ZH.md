<!-- content_id: field-problems-forums-2026-08-10 | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: field-problems-forums-2026-08-10.md | source_revision: 2026-08-23 -->

# Codex / AI 编程代理的真实工作面问题：论坛与公开 Issue 研究

**研究日期：**2026-08-10  
**状态：**`candidate`（已访问并整理来源；没有本地复现，也没有把论坛建议升级成官方结论）  
**范围：**Codex/AI 编程代理的权限、Windows、VS Code、沙盒网络和目录访问。  
**执行边界：**只读访问 Stack Exchange API、Stack Overflow 页面链接和 `openai/codex` 的公开 Issue；没有运行帖子中的命令、读取秘密、提交或推送。

## 如何阅读这些记录

- **用户报告：**原作者所述的环境、症状或复现过程。
- **回答者建议：**社区 workaround，不等于产品承诺。
- **官方确认：**官方文档、维护者明确回复，或官方代码/发布说明。本轮没有把普通 Issue 作者当作官方确认。
- **本地复现：**本研究没有做本地复现，因此没有任何条目标为本地复现。
- **推测：**作者或回答者对根因的判断，必须保留不确定性。

源站时间戳由源站返回；本文件只声明“2026-08-10 可访问”，不把源站时间戳当成本地核验过的时间线。

## 可教学的案例

### 1. 沙盒内访问 GitHub 被网络 allowlist 拦截

- **来源：**[Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox)
- **报告环境与症状：**Codex CLI、`sandbox_mode = "workspace-write"`；`curl -I https://github.com` 失败，并出现类似 `blocked-by-allowlist` 的代理错误。
- **证据边界：**用户报告、回答者建议和推测；没有本地复现或官方确认。
- **安全教学动作：**先区分沙盒禁网、代理 allowlist、DNS/TLS 和企业防火墙；记录 URL、HTTP 状态、代理错误和有效权限。只为必要域名开通，使用无秘密连通性测试。
- **不能宣称：**`workspace-write` 自带互联网，或开启网络后所有 CLI 都能联网；不能把回答中的配置当作当前官方语法，也不能为省审批直接使用 full access。

### 2. Windows 用户不确定 Codex CLI 是否原生支持

- **来源：**[Stack Overflow #79887792](https://stackoverflow.com/questions/79887792/openai-codex-cli-isnt-available-on-windows-yet-is-there-any-other-way-i-can-hav)
- **报告环境与症状：**Windows 11、PowerShell/Command Prompt、WSL2；作者在官方安装说明中找不到清晰的 Windows 边界。
- **证据边界：**社区建议互相冲突（WSL2 与原生 Windows），没有官方确认或本地复现。
- **安全教学动作：**记录版本、安装来源、`where`/PATH、shell、WSL 发行版和项目所在文件系统；先做无副作用版本检查和只读探测。
- **不能宣称：**仅凭帖子证明 Windows 原生支持或不支持，或证明 WSL2 与原生环境等价。

### 3. VS Code 扩展 `spawn UNKNOWN`，但 CLI 可手动启动

- **来源：**[Stack Overflow #79923404](https://stackoverflow.com/questions/79923404/vs-code-codex-extension-fails-with-spawn-unknown-on-windows-even-though-codex)
- **报告环境与症状：**Windows 企业托管环境、VS Code stable、PowerShell Constrained Language Mode；CLI 能运行，但扩展 host 报 `spawn UNKNOWN`。
- **安全教学动作：**分开记录 VS Code、扩展和 CLI 版本、`where.exe` 结果、扩展 host 日志、shell 策略及 `.exe`/`.cmd` shim；CLI 能运行和扩展能 spawn 是两个验收项。
- **不能宣称：**PATH 正常就等于扩展可用，或问题必然由 Windows PATH 引起；不要绕过企业策略。

### 4. `approval_policy = "on-failure"` 仍逐文件询问

- **来源：**[Stack Overflow #79891423](https://stackoverflow.com/questions/79891423/how-to-stop-codex-from-always-asking-for-approval)
- **报告环境与症状：**VS Code、Windows/WSL、workspace trusted；作者报告 workspace 文件每次修改都要批准。
- **边界与风险：**accepted answer 的环境不同，建议 `never` 并不等于安全地自动批准一切；配置语义必须按当前官方文档核对。
- **安全教学动作：**分别检查“是否询问”和“沙箱是否允许”，确认配置生效位置、session 状态、workspace 与 writable roots；用可恢复的小文件变更验证。
- **不能宣称：**`never` 等于 full access，或 workspace-write 允许所有文件改动。

### 5. Windows Terminal 中出现乱码符号

- **来源：**[Stack Overflow #79880150](https://stackoverflow.com/questions/79880150/gibberish-symbols-in-codex-under-windows-cmd-in-windows-terminal)
- **报告环境与症状：**Windows CMD 运行在 Windows Terminal；窗口调整大小后乱码暂时消失。
- **安全教学动作：**记录终端、shell、字体、窗口尺寸、编码页和版本；对比新窗口、重绘、不同终端和纯文本输出，区分编码问题与 TUI 重绘问题。
- **不能宣称：**`chcp 65001` 必然修复、乱码一定是 UTF-8，或 resize 是永久 workaround。

### 6. 试图用沙盒阻止读取私密目录

- **来源：**[Stack Overflow #79959031](https://stackoverflow.com/questions/79959031/how-to-prevent-codex-cli-from-reading-certain-files-or-directories-via-sandbox)
- **报告环境与症状：**Codex CLI、Linux `~/private` 示例；用户希望由内核级沙盒强制“不可读”。
- **安全教学动作：**优先用操作系统权限隔离，把私密数据移出工作区；核对有效 profile、绝对路径、cwd、writable roots 与 helper，用无敏感文件验证读失败。
- **不能宣称：**任意平台都支持相同 deny 规则，沙盒能抵御所有外传路径，或模型说“读不了”就等于内核证据。

### 7. Maven 依赖下载失败

- **来源：**[Stack Overflow #79636395](https://stackoverflow.com/questions/79636395/codex-unable-to-access-java-maven-repository)
- **报告环境与症状：**Java/Spring Boot、`./mvnw clean test`；出现 `Network is unreachable`，随后发生依赖缺失连锁错误。
- **安全教学动作：**先区分网络不可达与 POM/版本错误；记录 Maven settings、代理环境、目标域名和缓存命中，优先组织批准的代理或预置依赖缓存。
- **不能宣称：**推荐未知公共代理，或把“能访问 OpenAI”当成 Maven Central、GitHub 或任意域名都可访问。

### 8. Windows Computer Use 无法枚举窗口

- **来源：**[openai/codex Issue #37306](https://github.com/openai/codex/issues/37306)
- **报告环境与症状：**Windows、Codex App、Computer Use；`EnumWindows failed`，窗口枚举调用失败。公开 bug 标签不等于维护者确认。
- **安全教学动作：**先验证普通应用是否能枚举，再分离窗口 API、helper 路径/安装和权限/活动桌面；保留错误码和已尝试动作。
- **不能宣称：**Windows Computer Use 普遍可用或不可用，或 helper 进程能启动就证明控制链路有效。

### 9. Windows Desktop 工作时短暂闪出命令提示符

- **来源：**[openai/codex Issue #37153](https://github.com/openai/codex/issues/37153)
- **报告环境与症状：**Windows Desktop；用户看到前台 console 窗口和 `conhost.exe` 子进程，担心未授权活动。
- **安全教学动作：**记录父子进程、路径、签名、时间点和版本，对比空闲与执行任务；必要时提交最小反馈包，不上传源码或秘密。
- **不能宣称：**一次闪窗就是外传或恶意软件，也不能把 alpha 行为外推到所有 Desktop 版本。

### 10. writable root 与 cwd 的权限提示可能矛盾

- **来源：**[openai/codex Issue #37655](https://github.com/openai/codex/issues/37655)
- **报告环境与症状：**CLI、macOS、tmux；说明文字称 cwd 可编辑，但目标路径仍要求批准。
- **安全教学动作：**以实际拒绝/批准为准，分别记录 cwd、writable roots、effective profile、生成提示和目标路径；用 cwd 内、允许 root 内、root 外三格矩阵测试。
- **不能宣称：**模型收到的权限说明等于 OS enforcement，或仅凭 `workspace-write` 断言 cwd 一定可写；未核对版本源码/测试前不能说已修复。

## 跨案例的最小排查卡

1. **分层：**模型提示、审批策略、沙盒 enforcement、操作系统权限、网络代理和目标工具是不同边界。
2. **收集证据：**版本、平台、安装来源、shell/终端、cwd、有效配置路径、精确错误、父子进程和失败 URL。
3. **低风险验证：**无秘密、可恢复、单文件或单域名测试；不要直接运行帖子里的安装脚本、代理或权限放宽命令。
4. **确认生效配置：**用户编辑的文件不等于当前 session、扩展或 app 使用的配置；重启和切换工作区可能改变状态。
5. **分级验收：**命令启动、项目读取、文件写入、网络访问、VS Code 集成、Computer Use 控制分别验收，一个结果不能代替全部结果。

## 来源、许可与使用边界

Stack Overflow 页面标注 CC BY-SA 4.0；本文件只做事实摘要和链接引用，不复制大段原文、代码或回答者命令。GitHub Issue 只作为公开用户报告引用，不把作者、标签或搜索结果当作 OpenAI 官方确认。本文件没有复制外部图片、代码或 Skill 指令，因此不新增资产登记项。

## 阻塞与未核对项

- OpenAI 官方 Codex 文档本轮出现重定向，未能可靠取得最终正文；没有把官方语义写成已确认事实。
- GitHub REST 继续读取详情/评论时触发匿名 rate limit；已取得的证据限于可访问页面、搜索结果和 Issue 摘要，没有宣称维护者确认。
- Reddit、GitHub Discussions 和无法可靠引用的页面没有纳入最终记录。
- 本轮没有本地复现任何论坛问题；所有本地复现均保持未完成。
- 论坛内容、版本、配置语法和产品支持矩阵会变化；正式发布前重新访问 URL，补一手来源、访问日期和当前版本范围。
