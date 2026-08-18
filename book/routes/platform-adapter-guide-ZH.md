<!-- content_id: platform-adapter-guide-route | locale: ZH | language: zh-CN | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 选择你的 LLM 平台：核心相同，适配器一次加一个

**状态：** `candidate`。**运行状态：** `not_run`。

ChatGPT、Claude、Gemini、DeepSeek、Grok 和 Codex 都以对话的方式与你交流，
但它们并不是同一个产品。本路线保留 [Universal Core Foundations 路线](universal-core-foundations-ZH.md)
中可迁移的核心，然后一次只加入一个诚实的适配器：各平台真正不同的地方、
你今天能在每个平台安全尝试的内容，以及你在相信任何平台特有说法之前
必须在官方来源中核实的内容。

Playbook 的主打练习路径是 Codex，但方法并不绑定某一家厂商。下面列出的
每个平台都是**候选适配器**：通用核心仍然适用，而平台特有的控制项必须
各自有带日期的第一方来源，才能成为教学事实。

## 第零规则：永远不要凭名称推断等价

一个模型名称、一次登录或一个眼熟的按钮，并不能证明两个平台共享工具、
权限、记忆、账号、价格、数据控制或 Agent 行为。在转述任何平台说法之前，
先问三个问题：

1. **具体是哪一个产品界面**（网页聊天、应用、CLI、IDE、API、agent）？
2. **哪个第一方来源、在什么时间核实过**，表明这件事今天依然成立？
3. **如果说法有误，什么会明显地不一样？**

如果三个问题你都无法回答，就把该说法标为 `unknown`，并记下下一次核查
的时间。关于这条规则背后的维护方法，请参阅
Platform Adapter Review Skill
和 Platform Fact Watch。

## 一页平台总览

| 平台 | 常见界面 | 与核心通常不同的地方 | 本页中可安全尝试的第一步 |
|---|---|---|---|
| ChatGPT | 网页聊天、应用、API | 账号范围、记忆设置、文件上传、联网搜索开关、分享链接 | [ChatGPT 首个任务](#chatgpt-first-task) |
| Claude / Claude Code | 网页聊天、CLI agent、IDE | 终端 + 文件 agent、权限提示、CLAUDE.md 项目记忆 | [Claude Code 首个任务](#claude-code-first-task) |
| Gemini | 网页聊天、应用、API | Google 账号范围、Google Workspace 集成、应用扩展 | [Gemini 首个任务](#gemini-first-task) |
| DeepSeek | 网页聊天、应用、API | 模型选择与上下文窗口随版本而异；以官方模型页面为准 | [DeepSeek 首个任务](#deepseek-first-task) |
| Grok | 网页聊天、应用 | X 账号集成、实时帖子访问、模型发布节奏 | [Grok 首个任务](#grok-first-task) |
| Codex | 桌面端、CLI、IDE、云端、API | Playbook 的主打路径：文件、工具、Skills、Agents、权限 | [Codex 路径](../routes/first-safe-change-ZH.md) |

这张表是定位参考，不是等价证明。每一行在被课程引用之前，都仍然需要它
自己当前的来源。界面可用性、价格和权限默认值变化频繁；请把它们当作
易变事实。

## 任何平台上的首个安全任务

把下面这段请求复制到你选择的平台。它使用虚构材料，不涉及工具，也不需要
账号数据——同一个任务在任何地方都能完成，这正是核心的意义所在。

```text
结果：把这份虚构的俱乐部通知改写成面向新会员的版本。
材料："俱乐部每周二 6 点开会。请自带笔记本。房间稍后确认。"
回复格式：写两个句子。保留材料中的每一个事实。把缺失的细节放在 [方括号]
里。最后列出你保留的事实。
检查：对照原文与改写。不得出现新的时间、房间、费用、联系方式或承诺。
停止：不要联网搜索、发送、发布，也不要擅自假设未知细节。
```

然后自己检查三件事：

1. 改写中的每一句话，都能在提供的通知里找到对应的原文吗？
2. 回复是否遵守了两句的限制，并说明了保留了什么？
3. 它是否添加了一个本应保持 `[unknown]` 的细节？

如果聊天界面主动提供搜索、发送、发布、使用工具，或索要超出这个小练习
所需的更多材料，请停下来。平台或许具备这些能力；有能力做，并不等于
被要求去做。

<span id="chatgpt-first-task"></span>

<span id="chatgpt-first-task"></span>

## ChatGPT 首个任务

打开任意一个 ChatGPT 界面，运行上面的首个安全任务。然后记下一个你实际
能观察到的平台差异：回复是否提到了联网搜索、记忆或分享链接？记录你看到
的，而不是你假设的。要对 ChatGPT 的说法做有来源支撑的核查，请使用
Source Investigator Skill，
以 OpenAI 官方帮助页面作为产品事实的权威来源。

<span id="claude-code-first-task"></span>

<span id="claude-code-first-task"></span>

## Claude Code 首个任务

Claude Code 是一个终端 agent：它可以读取和编辑你启动它的那个项目里的
文件。在运行任何东西之前，先创建一个可丢弃的文件夹，在那里运行首个安全
任务。留意权限提示：它在编辑文件或运行命令之前会先询问吗？这个提示正是
聊天与 agent 的区别所在——也是你做出选择的地方。在项目记忆方面，
Claude Code 会读取 `CLAUDE.md` 文件；把里面写的内容都视为模型可能遵循
的指令，所以像审阅任何项目规则一样审阅它。在完成
[First Safe Change 路线](first-safe-change-ZH.md) 的练习纪律之前，不要在
含有凭据、生产数据或破坏性命令的真实仓库里启动 Claude Code。

<span id="gemini-first-task"></span>

<span id="gemini-first-task"></span>

## Gemini 首个任务

在 Gemini 聊天界面运行首个安全任务。留意当前生效的是哪个账号范围，以及
界面上是否提供应用扩展（Google Workspace、YouTube、Maps）。扩展会产生
外部影响：它可以代表你读取或写入数据，因此关于扩展的 Gemini 课程属于
平台适配主题，而不是核心主题。纯文本的练习任务不要启用扩展。

<span id="deepseek-first-task"></span>

## DeepSeek 首个任务

在 DeepSeek 聊天或应用界面运行首个安全任务。模型命名、上下文窗口和可用性
会随版本变化；这些事实以官方模型页面为准。记下你实际使用的模型名称和
日期，以便这次运行可以复现。不要把 API 密钥、私有代码或内部文档粘贴到
网页聊天中。

<span id="grok-first-task"></span>

## Grok 首个任务

在 Grok 聊天界面运行首个安全任务。如果你的账号关联了 X，请注意帖子和
实时内容可能进入对话范围；这既是平台差异，也是一项隐私决定。不要把私信
或草稿粘贴到可能触达社交关系图的对话中。Grok 引用最新帖子的回答是对该
平台检索行为的一种主张——在转述之前，请对照 X/Grok 官方帮助页面核实。

## Codex 首个任务

Codex 是 Playbook 的主打路径，因为它把完整的循环摊开在你面前：上下文、
工具、权限、Skills、Agents 和验证。请从一个可丢弃的项目开始，先走
[First Safe Change 路线](first-safe-change-ZH.md) 和
[Lab 001](../labs/lab-001-first-safe-task-ZH.md)。在“先检查再编辑”的
习惯变得顺手之前，不要贸然跳到云端界面或真实仓库。

## 完成首个任务之后：该走哪条路径？

- 你想要纯文本的入门练习：[Beginner Practice Pack](../communication-clinic-ZH.md)。
- 你想要涉及文件和工具的深度主打路径：[First Safe Change](first-safe-change-ZH.md)。
- 你想先打好与平台无关的基础：[Universal Core Foundations](universal-core-foundations-ZH.md)。
- 你想公平地比较两个平台：LLM Comparison Protocol。
- 你想知道某个平台课程是否应该纳入课程体系：
  Platform Adapter Review。

## 证据状态与边界

本路线为 `candidate / not_run`：结构与检查项已经就位，但还没有任何
学习者运行、跨平台运行或独立评审的记录。上面各平台的描述，是根据官方
文档和带日期的研究凭据整理出的定位参考
（cross-LLM beginner prompting source receipt、
platform teaching boundary card）。
它们不是任何平台行为一致、任务在所有平台都会成功、或产品功能彼此等价
的证据。平台特有的命令、权限、价格和可用性都是易变事实：在依赖它们
之前，请核对官方来源并记录访问日期。

- [ ] 我只使用了虚构、公开或经授权的文本。
- [ ] 我记录了自己运行时的确切界面、可见的模型名称（如有）和日期。
- [ ] 我没有把某一平台的行为当作另一平台的证据。
- [ ] 我没有粘贴机密、私信或未发布文件。
- [ ] 当界面提供工具、联网搜索、上传、发送或发布时，我停了下来。
