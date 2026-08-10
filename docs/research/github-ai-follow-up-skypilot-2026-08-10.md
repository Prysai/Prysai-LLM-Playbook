# `skypilot-org/skypilot#10397` 实时复核报告

**访问日期：** 2026-08-09（America/Los_Angeles；GitHub 公开 API/源文件）  
**报告状态：** candidate；这是只读研究，不是 maintainer 批准、PR 接受或 patch 验证。  
**外部操作边界：** 未 clone、fork、编辑或向候选仓库发送任何 GitHub 写操作。

## 结论

- Issue **仍为 open**：标题为 `Helm: apiService.config is write-once when the state PVC persists (silent)`；创建与最后更新均为 `2026-08-09T15:24:35Z`；无 assignee、label、milestone；`comments = 0`；`closed_at = null`。
- 评论、timeline、events 公开 API 均返回 **0 条**，因此当前没有 maintainer 评论、分配、关闭、关联事件或公开讨论可供引用。
- 按 issue 编号及 `apiService.config`、`state PVC`、`configAuthoritative` 关键词检索 `is:pr is:open`，GitHub API 均返回 `total_count = 0`；对应仓库 PR 搜索页也显示 `No results matched your search`。截至访问时未发现匹配的 open PR。
- 仓库默认分支是 `master`。最新提交为 [`8770fcf4`](https://github.com/skypilot-org/skypilot/commit/8770fcf4a7c1635e74d73c405d32c3f979061130)，时间 `2026-08-09T01:35:26Z`，主题为 `#10396` smoke-test 修复；提交信息带有 `Co-authored-by: Claude Fable 5`。这能证明近期有活动，不能单独证明项目存在正式 AI 贡献政策或接受本 issue 的 patch。

**是否可在无 maintainer assignment 时开始：**

可以开始**本地、可回滚的范围确认和 chart 单元测试设计**；现有贡献指南没有发现必须先 self-assign、claim issue 或等待 assignment 的门槛，Issue 也未分配。但不建议在没有维护者确认的情况下直接实现或提交 `apiService.configAuthoritative` 这类新公开 values/API 语义：仓库当前设计明确把 PVC 作为配置 source of truth，改变 ownership 方向不是机械的测试补丁。安全边界是先做默认行为保持不变的 chart-only 草案/测试，提交前在 issue 或 PR 中请求维护者确认 flag 名称、默认值、回写方向、API/dashboard 编辑冲突和回滚语义。

## Issue、评论与时间线

Issue 正文报告的现象是：`storage.enabled: true` 时，第一次启动把 ConfigMap 配置写入 PVC；之后 PVC 中已有非空 `~/.sky/config.yaml`，后续 Helm `apiService.config` 变化被静默忽略。报告给出的 workaround 是 `apiService.preDeployHook` 在 chart 逻辑前把 ConfigMap 复制到 PVC，并提出一个显式的 ConfigMap-authoritative 选项；这些是 issue 作者的复现、建议和 workaround，不是 maintainer 的确认。

## 当前实现与精确文件边界

| 文件 | 当前可核对事实 |
|---|---|
| [`charts/skypilot/templates/api-deployment.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/templates/api-deployment.yaml#L216-L237) | 启动脚本先执行 `preDeployHook`；若 `/root/.sky/config.yaml` 非空，调用 `initialize_configmap_sync_on_startup('~/.sky/config.yaml')`，将 PVC 配置同步回 ConfigMap；为空时才执行 `cp /var/skypilot/config/config.yaml /root/.sky/config.yaml`。 |
| [`charts/skypilot/templates/api-deployment.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/templates/api-deployment.yaml#L350-L379) | 持久化场景下 `/root/.sky` 或 `api_server/clients` 使用 `state-volume`，ConfigMap 挂载在 `/var/skypilot/config`；这构成 issue 所描述的 PVC/ConfigMap 两个配置位置。 |
| [`charts/skypilot/templates/api-configmap.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/templates/api-configmap.yaml#L1-L13) | `apiService.config` 有值时生成 `config.yaml`，否则生成 `{}`。 |
| [`charts/skypilot/values.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/values.yaml#L111-L118) | 文档明确写着：已有 config 时 Helm upgrade 会忽略 `apiService.config`，以避免意外丢失现有配置；现有配置应通过 dashboard 更新。 |
| [`charts/skypilot/values.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/values.yaml#L347-L375) | `storage.enabled` 默认 `true`；文档把 API server state 和 configuration 列为持久化数据，并支持 `existingClaim`。 |
| [`charts/skypilot/developer.md`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/developer.md#L3-L29) | 设计决策是“PVC as the source of truth”；Helm upgrade 不直接改变 API server 配置；ConfigMap 仅为便利而同步，可能与 PVC 不一致。 |
| [`charts/skypilot/values.schema.json`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/values.schema.json#L23-L27) / [`#L162-L167`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/values.schema.json#L162-L167) | 当前 schema 有 `apiService.config`、`preDeployHook`，没有 `configAuthoritative`。 |

## 现有测试位置

- [`charts/skypilot/tests/deployment_test.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/tests/deployment_test.yaml#L1-L5) 测试 `templates/api-deployment.yaml`；已有 storage/upgrade strategy、`/root/.sky`、`api_server/clients` 挂载断言，例如 [`#L271-L335`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/tests/deployment_test.yaml#L271-L335)。本次源文件检查未发现针对启动脚本中 `config.yaml` 两个分支或 `apiService.config` ownership 的直接断言。
- [`charts/skypilot/tests/api_service_test.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/tests/api_service_test.yaml#L1-L27) 只覆盖 `templates/api-service.yaml` 的 IPv4/IPv6 `ipFamilyPolicy`，不是该 issue 的配置行为测试。
- 相关辅助源文件还包括 [`charts/skypilot/templates/pvc.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/templates/pvc.yaml) 和 [`charts/skypilot/templates/api-configmap.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/templates/api-configmap.yaml)。因此，若获维护者确认，最小候选范围应至少涉及 deployment 渲染、values/schema 文档和 deployment chart tests；不能只改 issue 建议中的单个 shell 分支而不定义旧行为兼容性。

## CONTRIBUTING、AI guidance 与许可证

- [`CONTRIBUTING.md`](https://github.com/skypilot-org/skypilot/blob/master/CONTRIBUTING.md#L3-L18) 欢迎 bug report、bug-fix/feature PR、test、example、documentation 和 tutorial；对新贡献者建议从 `good first issue` 看起。
- [`CONTRIBUTING.md`](https://github.com/skypilot-org/skypilot/blob/master/CONTRIBUTING.md#L170-L178) 要求 fork/branch、按需补测试、格式化、push 后开 PR，并在 PR 中写 `Tested:`；Helm API server 的本地测试流程在 [`#L240-L277`](https://github.com/skypilot-org/skypilot/blob/master/CONTRIBUTING.md#L240-L277)。这些是贡献与验证要求，不是 assignment gate。
- 仓库有顶层 [`AGENTS.md`](https://github.com/skypilot-org/skypilot/blob/master/AGENTS.md)，开头明确说它是给 AI assistants 的开发指南；其 PR 部分要求格式化、测试、manual test plan 和 backward compatibility（[`#L267-L282`](https://github.com/skypilot-org/skypilot/blob/master/AGENTS.md#L267-L282)），并提醒 API/CLI 变更保持兼容（[`#L408-L434`](https://github.com/skypilot-org/skypilot/blob/master/AGENTS.md#L408-L434)）。顶层 [`CLAUDE.md`](https://github.com/skypilot-org/skypilot/blob/master/CLAUDE.md) 内容仅指向 `AGENTS.md`。
- 本次公开仓库目录检查未发现独立的 `.github/AI_POLICY.md`、`.github/ai-policy.md` 或 `.github/AGENTS.md`；因此不能把 `AGENTS.md` 的 AI-assistant 工程指引扩大解释为完整的 AI 使用/署名/披露政策。
- 仓库 API 元数据显示许可证为 **Apache-2.0**；原文见 [`LICENSE`](https://github.com/skypilot-org/skypilot/blob/master/LICENSE#L1-L5)。许可证允许在其条款下修改和分发，但不等于 maintainer 会接受某个设计或 PR。

## 建议的安全起步线

1. 先把工作限定为本地/个人分支的 chart-only 草案：补充默认旧行为的渲染断言，再设计显式 authoritative 分支的正反例；不触碰真实 Kubernetes、云账户、secrets 或生产 PVC。
2. 在公开提交前请维护者确认：`apiService.configAuthoritative` 是否是期望接口、默认是否必须为 `false`、ConfigMap/PVC 双向同步在 flag 开关下如何处理、dashboard/API 修改与 Helm upgrade 谁胜出，以及外部数据库场景是否禁用该值。
3. 只有在这些语义确认后，才把 `values.yaml`、`values.schema.json`、developer 文档、`api-deployment.yaml` 和 `deployment_test.yaml` 作为一个一致变更提交；当前研究没有 clone、编辑、运行候选仓库，因此没有 patch 或测试通过证据。

## 一手来源与访问记录

以下均为 2026-08-09 访问的公开 GitHub API/仓库源文件：

- Issue：[网页](https://github.com/skypilot-org/skypilot/issues/10397) · [API](https://api.github.com/repos/skypilot-org/skypilot/issues/10397) · [comments API](https://api.github.com/repos/skypilot-org/skypilot/issues/10397/comments?per_page=100) · [timeline API](https://api.github.com/repos/skypilot-org/skypilot/issues/10397/timeline?per_page=100) · [events API](https://api.github.com/repos/skypilot-org/skypilot/issues/10397/events?per_page=100)
- PR 检索：[issue 编号](https://github.com/skypilot-org/skypilot/pulls?q=is%3Apr+is%3Aopen+10397) · [`apiService.config`](https://github.com/skypilot-org/skypilot/pulls?q=is%3Apr+is%3Aopen+%22apiService.config%22) · [`state PVC`](https://github.com/skypilot-org/skypilot/pulls?q=is%3Apr+is%3Aopen+%22state+PVC%22) · [`configAuthoritative`](https://github.com/skypilot-org/skypilot/pulls?q=is%3Apr+is%3Aopen+configAuthoritative)
- 仓库与活动：[repo API](https://api.github.com/repos/skypilot-org/skypilot) · [`master` commits](https://github.com/skypilot-org/skypilot/commits/master) · [latest commit](https://github.com/skypilot-org/skypilot/commit/8770fcf4a7c1635e74d73c405d32c3f979061130)
- 贡献/政策/许可：[`CONTRIBUTING.md`](https://raw.githubusercontent.com/skypilot-org/skypilot/master/CONTRIBUTING.md) · [`AGENTS.md`](https://raw.githubusercontent.com/skypilot-org/skypilot/master/AGENTS.md) · [`CLAUDE.md`](https://raw.githubusercontent.com/skypilot-org/skypilot/master/CLAUDE.md) · [`LICENSE`](https://raw.githubusercontent.com/skypilot-org/skypilot/master/LICENSE)
- Chart：[chart tree](https://github.com/skypilot-org/skypilot/tree/master/charts/skypilot) · [templates](https://github.com/skypilot-org/skypilot/tree/master/charts/skypilot/templates) · [tests](https://github.com/skypilot-org/skypilot/tree/master/charts/skypilot/tests)

