# 事实影响注册表审查

**审查日期：** 2026-08-10
**审查状态：** `candidate`
**审查范围：** 官方事实刷新记录的 24 条 OF/UF/LB 断言、四个影响组、章节/实验/Skill/评测/site 消费者，以及 M11 来源归属。
**审查角色：** curriculum-maintainer、facts-maintainer、evaluation-maintainer
**下一次复核：** 2026-09-09

## 结论

本轮新增机器可读的[事实影响注册表](../governance/fact-impact-registry.yaml)，将每条断言绑定到：

- 来源记录、官方 URL、检查日期、适用范围和事实状态；
- 受影响章节、实验、项目 Skill、评测任务和展示页生成入口；
- 复核级别、必需校验、结果目录和维护记录。

注册表把 24 条断言收敛为四个最小影响组：

| 组 | 范围 | 主要下游 |
|---|---|---|
| G1 | 本地安全与运行时边界 | 第 4/5/12/13/22 章、行动边界实验、权限与证据 Skill |
| G2 | 工作面、账户与外部连接 | 第 5/8/13/20/21/22 章、入口与生命周期实验 |
| G3 | 模型与比较证据 | 第 5/6/19/22 章、模型/证据/研究 Skill 和评测 |
| G4 | Skill、Plugin、MCP 与工具策略 | 第 4/5/7/11/13/14/18/22 章、Skill 审查实验和路由 Skill |

## 事实核对

本轮重新读取了 OpenAI 官方 Plugins 文档：

- Plugin 可以承载 Skills、Connectors 和 MCP 相关能力；
- ChatGPT 的 Chat/Work 在 web、desktop 和 mobile 有不同的支持表述；
- Codex 在 ChatGPT desktop app 中支持 Plugin，Codex CLI 有 Plugin browser；
- IDE extension 不支持 Plugins；
- mobile 可以使用账户可用的 Chat/Work plugins，但不能把桌面目录入口直接外推到 mobile；
- 安装、connector 认证、新会话、工具可见和具体动作结果是不同状态。

因此，`OF-015` 已从“mobile 不提供 Plugin”修正为“mobile 可使用账户可用的 Chat/Work plugins；目录浏览和安装入口不从桌面流程外推”。本轮没有进行 mobile、desktop、CLI、IDE、Plugin、MCP 或账户级运行验证，故不把上述文档事实写成本机或当前账户证据。

同时修正内容矩阵：M11“从定义到交付的工程生命周期”来源应为 S05 Addy Osmani Agent Skills，而不是 S04 Marketing Skills。S05 的 MIT 只覆盖其自有仓库内容，第三方图片、徽章、链接、依赖和嵌套资产仍需逐项复核；本项目采用的是原创重写的方法骨架，不把 S05 作为运行时依赖。

## 验证边界

本记录证明的是静态路径和字段关系，不证明：

- Codex 任一工作面的实际沙盒、审批、模型、Skill、Plugin 或 MCP 行为；
- 当前账户、workspace、组织或 GitHub 连接的可用性；
- 38 项评测已运行，或任何模型具有总体性价比优势；
- 展示页已通过浏览器、窄屏、键盘和语言切换人工验收；
- 六个输入归档已经获得最终发行许可。

评测结果仍写入 `evals/results/`，当前状态继续保持 `not_run`。若官方事实影响模型比较、权限或工具行为，必须按照注册表的 `recheck_level` 重新固定环境并记录运行结果；旧结果不能自动覆盖新事实。

## 复核证据

- [官方事实刷新记录](../research/openai-codex-facts-refresh-2026-08-09.md)
- [更新注册表](../governance/update-registry.yaml)
- [更新地图](../governance/update-map.md)
- [M11 来源融合决策](../sources/skill-integration-decisions.md)
- [评测框架](../quality/evaluation-framework.md)
