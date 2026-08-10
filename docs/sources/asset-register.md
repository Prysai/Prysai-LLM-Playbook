# 外部资产与来源台账

**盘点日期：** 2026-08-09
**用途：** 记录六个输入压缩包的来源、结构、许可证、可用边界和融合决策。

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
