# 外部资产与来源台账

**盘点日期：** 2026-08-09
**用途：** 记录外部教材、代码、Skill、研究和结构参考的来源、结构、许可证、可用边界和融合决策。

## 总原则

外部资产先进入台账，再进入产品。任何内容只有在确认来源、许可证、归属、适配范围和验证状态后，才可以进入发行版。没有明确许可证的内容默认只作为研究参考或外部链接，不直接复制。

## 来源清单

| ID | 本地文件 | 上游 | 盘点结果 | 许可证信号 | 当前决策 |
|---|---|---|---|---|---|
| S01 | `D:/downloads/codex-orange-book-main.zip` | `bozhouDev/codex-orange-book` | 中文长篇教材、静态站、PDF、232 张 PNG；无 `SKILL.md` | 压缩包和 GitHub API 未发现明确许可证 | 只做结构与主题参考；不复制正文、图片或品牌表达，除非取得明确许可 |
| S02 | `D:/downloads/academic-research-skills-codex-main.zip` | `Imbad0202/academic-research-skills-codex` | 3,533 个文件；单一 Codex 路由 skill；含 workflow、脚本、实验和评测 | `CC BY-NC 4.0`；含上游归属和 NOTICE | 暂作为外部参考/可选非商业研究轨；纳入发行版前进行许可审查并保留完整归属 |
| S03 | `D:/downloads/awesome-agent-skills-main.zip` | `VoltAgent/awesome-agent-skills` | 目录型精选清单，非完整 skill 实现 | MIT | 作为外部生态索引；不把清单数量当作质量证明 |
| S04 | `D:/downloads/marketingskills-main.zip` | `coreyhaines31/marketingskills` | 已检查 `LICENSE`、`README.md`、`CONTRIBUTING.md`、`VERSIONS.md`、`.claude-plugin/plugin.json` 和 `.claude-plugin/marketplace.json`；包内未发现顶层 `NOTICE`；范围包括营销类 skills、references、evals 和 tools | **MIT（仓库级已确认）**：顶层 `LICENSE` 标明版权归 `Corey Haines`（2025），插件元数据也声明 `MIT`。包内引用的第三方方法、外部服务资料和素材未逐项清权：`unknown/unresolved` | MIT 许可范围内可对上游自有内容进行复制、修改和分发，但须保留版权与许可声明；本项目仅作方法参考或原创重写。不得把第三方资料、外部服务条款、品牌表达或未逐项核验的素材作为 MIT 资产发布；纳入发行版前逐项复核 |
| S05 | `D:/downloads/agent-skills-main.zip` | `addyosmani/agent-skills` | 已检查 `LICENSE`、`README.md`、`CONTRIBUTING.md`、`docs/getting-started.md`、`docs/skill-anatomy.md`、`plugin.json`、`.codex-plugin/plugin.json`、`.claude-plugin/plugin.json`、`.claude-plugin/marketplace.json` 和 `.agents/plugins/marketplace.json`；包内未发现顶层 `NOTICE`；范围包括工程 skills、agents、commands、hooks、references、evals、docs 和插件配置 | **MIT（仓库级已确认）**：顶层 `LICENSE` 标明版权归 `Addy Osmani`（2025），Codex/Claude 插件元数据均声明 `MIT`，贡献说明也声明贡献按 MIT 授权。README 中的外部徽章、图片、链接及其他可能的第三方材料未逐项清权：`unknown/unresolved` | MIT 许可范围内可对上游自有仓库内容进行复制、修改和分发，但须保留版权与许可声明；本项目仅提炼流程原则并自行重写、验证。不得直接发布 README 外部图片/徽章或其他第三方材料，除非另有明确许可；纳入发行版前逐项复核 |
| S06 | `D:/downloads/awesome-codex-skills-master.zip` | `composio-community/awesome-codex-skills` | 1,101 个文件、880 个 `SKILL.md`；大量外部服务自动化 | 根目录 Apache-2.0 信号不等于所有嵌套内容许可一致；GitHub API 无统一 SPDX | 作为生态目录和候选扩展；先过滤重复、坏元数据、外部依赖和许可证，再决定是否纳入 |
| S07 | `docs/research/field-problems-*.md` | `openai/codex` GitHub Issues、Stack Overflow/Stack Exchange API | 只保留公开用户报告的原创摘要和原始链接；Stack Overflow 页面标注 CC BY-SA 4.0；未复制外部代码、图片、长段文字、日志、凭据或 Skill 指令 | `reference-only`：用于现实问题研究和教学边界；不把社区回答当作官方支持，不将外部内容作为可发行资产打包 |
| S08 | `docs/research/workbuddyguide-structure-study-2026-08-10.md` | `AlephAITech/WorkBuddyGuide` GitHub 仓库、固定 commit `abd61e8`、`workbuddy.homes` | 只记录公开可核对的目录、VitePress 配置、内容同步链、案例模板、部署边界和阅读体验；没有复制正文、提示词、代码、截图、图标、字体、二维码、品牌或投稿素材 | 根目录公开 MIT；具体媒体、第三方图标/字体、品牌和投稿内容的逐项许可不能由根目录许可证推断 | `reference-only`：只借鉴内容产品结构和可验证的案例机制；不整体 vendoring，不复制视觉/品牌资产；未来单项资产必须重新核对来源、归属和许可 |
| S09 | `docs/research/chapter-02-official-baseline-2026-08-10.md` | OpenAI/Codex 官方文档、Git 官方文档 | 只保留对官方边界和 Git 命令语义的原创改写、短事实卡和链接；没有复制长段落、代码样例、图片或凭据 | 官方页面的再使用边界和页面版本需在发行前复核 | `reference-only`：作为第 2 章的易变事实与安全边界来源，不把官方文档语义当成本机运行证明 |
| S10 | `docs/research/chapter-02-field-problems-2026-08-10.md` | `openai/codex` GitHub Issues、Stack Overflow | 只保留公开用户报告的原创中文摘要、证据分类和原始链接；未复制长文、日志、附件、用户路径、秘密或社区代码 | GitHub Issues 与 Stack Overflow 仍归各自权利人所有；社区建议不是官方支持 | `reference-only`：用于现实问题入口和失败/边界教学；所有案例保持 `candidate`，本项目未做本地复现 |
| S11 | `docs/research/workbuddyguide-structure-benchmark-2026-08-10.md` | `AlephAITech/WorkBuddyGuide` 固定 commit `abd61e8`、GitHub 页面、`workbuddy.homes` | 只记录公开可观察的结构事实与原创比较；没有复制正文、图片、代码、提示词、字体、图标、二维码、品牌资产或第三方媒体 | 根目录 MIT 不能推出图片、字体、投稿内容和第三方素材的逐项授权 | `reference-only`：只迁移双入口、案例层和内容生命周期等信息架构抽象；不复制 WorkBuddyGuide 的视觉或品牌表达 |

| S12 | `assets/readme/codex-field-guide-header.svg` | Prysai Lab 原创页眉图，创建于 2026-08-10 | 本项目为 README 设计的原创 SVG；只使用内嵌几何图形、文字、渐变和网格，不包含外部图片、字体文件、图标、品牌素材或远程请求 | 项目原创资产；仓库发行许可证尚未单独确定，不能将未决定的发行权利扩展到外部项目 | `original-rewrite / project-owned`：可用于本项目 README 与同一项目的文档展示；不得把它标记为第三方素材或从外部来源复制 |
| S13 | `docs/research/README-front-door-benchmark-2026-08-10.md` | Docusaurus、VitePress、Rust Book、MDN、Hugging Face Course、OpenAI Cookbook 官方仓库/站点 | 只记录 README 首屏职责、网站与仓库分工、语言状态和阅读路径的原创比较；没有复制正文、代码、图片或品牌资产 | `reference-only`：公开结构参考；各项目页面和版本会变化 | 只借鉴门面信息架构；不复制外部文案或实现 |
| S14 | `docs/research/multilingual-architecture-round2-2026-08-10.md` | Docusaurus、VitePress、Astro Starlight、Material for MkDocs、Kubernetes 官方文档 | 只记录 locale route、同名文件、缺译提示、anchor、source revision 和发布门槛的原创比较；没有复制正文或代码 | `reference-only`：官方架构参考；访问日期已记录在研究文件 | 用于当前 locale matrix 和切换设计；不声称本项目已经六语言完成 |
| S15 | `docs/research/coding-agent-field-cases-round2-2026-08-10.md` | 公开 coding-agent 用户报告和官方/社区讨论 | 只保留症状、证据层、停止条件和可迁移检查的原创摘要；未复制日志、凭据、代码或长段原文 | `reference-only`：用户报告与社区建议；本项目未本地复现 | 用于失败边界和教材案例；不把社区 workaround 写成官方修复 |
| S16 | `docs/research/codex-official-fact-cards-2026-08-10.md` | OpenAI 第一方 Codex/GPT 文档 | 只保留短事实卡、适用范围、访问日期和不能推出的结论；没有复制长段正文、图片或凭据 | `reference-only`：易变事实需按记录日期和范围复核 | 用于英文章节和 README 的官方基线；不把文档描述当成本机会话权限或运行证据 |
| S17 | `docs/research/practical-ai-agent-guide-benchmark-2026-08-10.md` | OpenAI Codex CLI、Anthropic Claude Code、MCP、Rust Book 官方文档/仓库 | 只记录教程结构、练习、失败边界和验证机制的原创比较；没有复制正文、代码、图片或品牌资产 | `reference-only`：结构研究；官方产品事实仍需单独复核 | 用于能力单元、实验和 claim→evidence 设计；不把示例数量当作学习效果证明 |
| S18 | `docs/research/prompt-patterns-for-real-work-2026-08-10.md` | OpenAI、Anthropic、Google、GitHub 官方提示工程文档与公开 GitHub Community 讨论 | 只保留任务协议字段、提示结构、验收、停止和失败恢复的原创归纳与短事实摘要；没有复制长段正文、代码、图片或 Skill 指令 | `reference-only`：官方文档与社区实践；产品文档、模型行为和社区页面会变化 | 用于 Chapter 3、任务协议实验和真实工作提示结构；不把七字段协议写成任何厂商的官方标准 |
| S19 | `docs/research/field-problems-coding-agents-2026-08-10.md` | OpenAI Codex GitHub Issues、Stack Overflow/Stack Exchange API、公开 coding-agent 讨论与官方文档 | 只保留用户报告、官方事实、社区建议、未证实推测和本项目迁移检查的原创摘要；没有复制日志、凭据、代码、图片或长段原文 | `reference-only`：用户报告与社区建议；本项目未本地复现这些环境，也未确认公开案例的根因或修复 | 用于章节/实验的现实问题索引和失败边界；不得把 accepted answer 或 issue 标签写成官方修复 |
| S20 | `docs/research/site-information-architecture-audit-2026-08-10.md` | 本项目现有入口、状态源、内容矩阵、站点实现和既有结构研究；外部结构参考见文件内来源 | 只记录本项目的原创信息架构审查、优先级和验收清单；没有复制外部项目正文、代码、图片、字体、图标或品牌资产 | `project-audit / reference-only`：包含本地审查与结构参考；建议本身尚未证明为用户效果 | 用于首页入口、能力单元、raw Markdown 边界、locale 状态和站点验收；不把 candidate 审查意见写成生产级结果 |
| S21 | `docs/research/codex-model-selection-official-facts-2026-08-11.md` | OpenAI/Codex 官方模型文档、OpenAI API 模型页、`openai/codex` 公开 Issues | 只保留官方模型定位、配置/工作面边界、用户症状和原创排查方法；没有复制长段正文、截图、Issue 日志、凭据、代码或 Skill 指令 | `reference-only`：官方事实按访问日期和适用范围复核；社区报告只证明报告者描述的症状，不证明根因、修复或本地复现 | 用于 Chapter 6 的英文源文件和模型选择证据边界；不把产品定位写成性能、成本、稳定性或总体排名结论 |
| S22 | `assets/teaching/*.svg` | Prysai Lab 原创教学卡，创建于 2026-08-11 | 两张项目内 SVG：模型选择测试、Skill 到可观察输出；仅使用内嵌几何图形、文字、渐变和网格，无外部图片、字体、图标或远程请求 | 项目原创资产；仓库发行许可证尚未单独确定 | `original-rewrite / project-owned`：用于本项目教学和 README；不标记为第三方素材，不复制 WorkBuddyGuide 或其他项目视觉表达 |
| S23 | `examples/skill-sandbox/product-context-real-estate/` + `assets/cases/product-context-real-estate-desktop.png` | Prysai Lab 原创合成案例，创建于 2026-08-11 | fictional brief、Product Context 草稿、原创 HTML/CSS/inline SVG 和本地浏览器截图；无真实房产、个人数据、外部媒体、CDN、分析或表单 | 项目原创资产；案例只可作为本仓库的合成教学材料，截图的证据范围限于记录的本地渲染视口 | `original-rewrite / project-owned`：可用于本项目案例教学；不得包装为真实客户、市场、库存、转化或 Skill runtime 证据 |
| S24 | `assets/teaching/lifecycle-checkpoints.svg` | Prysai Lab 原创教学卡，创建于 2026-08-11 | 七阶段生命周期与 CP0–CP4 evidence exit 的原创 SVG 教学图；仅使用内嵌几何图形、文字、渐变、网格和滤镜，无外部图片、字体、图标或远程请求 | 项目原创资产；仓库发行许可证尚未单独确定 | `original-rewrite / project-owned`：可用于本项目 Chapter 8 和 README 教学；不标记为第三方素材，不把图示当作 Skill、Agent 或外部服务运行证据 |

## 归档指纹

以下 SHA-256 用于确认本轮输入没有被悄悄替换：

| 文件 | SHA-256 |
|---|---|
| `codex-orange-book-main.zip` | `BA371729FF9B0490792C3172275AFF454FA5BE6E873AB50AA07472D8A3295F86` |
| `academic-research-skills-codex-main.zip` | `F6EE818819D69D07D0637E4E88F30761E8F441BFDD93EDA549D82CE73F45DD5E` |
| `awesome-agent-skills-main.zip` | `FC8A7116F3E88A8D4EE870CC2F50B5A3F8CE007EFAA77AFB98A8F02AEBC75CC6` |
| `marketingskills-main.zip` | `B0076275740B31C1147C9BE5CEF6EF857C047C30E5334257A174292F26763D4D` |
| `agent-skills-main.zip` | `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250` |
| `awesome-codex-skills-master.zip` | `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E` |

## 融合分层

```text
Field Guide 原创主线
├─ Codex/GPT 心智模型与边界
├─ 学习路径、实验和评测
├─ 团队方法与治理
└─ 经验证的教练、路由和质量 skills

领域参考层
├─ 工程生命周期方法（S05）
├─ 营销与增长方法（S04）
└─ 学术研究方法（S02，许可受限）

生态索引层
├─ Agent Skills 生态清单（S03）
└─ Codex/外部服务自动化目录（S06）

参考教材层
└─ 橙皮书的主题结构与实战启发（S01，许可不明）
```

## 融合状态定义

- `reference-only`：只阅读和引用来源，不复制可版权表达；
- `adaptation-candidate`：许可证允许改编，但必须保留归属并通过适配测试；
- `vendored-with-notice`：经审查后以外部组件形式保留原始许可证和 NOTICE；
- `original-rewrite`：由项目团队重新解释、重新组织并自行验证，不能声称为外部原作；
- `blocked`：许可证、依赖、质量或安全边界尚未满足。

## 后续核查任务

1. 对每个候选 skill 读取完整 frontmatter 和依赖声明；
2. 检查重复名称、命名不符合规范、缺失描述和外部服务要求；
3. 追踪嵌套许可证和 NOTICE；
4. 为每个纳入项建立来源、改动、测试和维护责任记录；
5. 由维护组织确认发行版许可证后再创建公开仓库。
