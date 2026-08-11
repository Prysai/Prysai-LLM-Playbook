# 活跃 AI / agent 项目贡献候选

**访问日期：** 2026-08-09（America/Los_Angeles；GitHub API 的时间戳按 UTC 显示）
**研究状态：** candidate；不是 maintainer approval、PR 接受或 merge 预测。
**来源范围：** 仅使用官方 GitHub repository、Issue、PR、源码、贡献指南/AGENTS 文件、许可证和近期活动页面。没有 clone、修改候选项目代码、评论、commit、push 或创建 PR。

## 结论

本轮保留两个候选。优先级较高的是 LangChain 的 ShellSession 回归 bug，但 Issue 中已有两位贡献者公开表达了处理意向；在没有 maintainer 明确确认前，不应重复实现。Chroma 的 CI 问题没有发现对应的 open PR，但完整修复涉及“机械改动”和“是否让 lint 阻塞合并”两个决策，适合先请求维护者确定范围。

| 优先级 | 项目 / Issue | 当前状态 | 建议范围 | 重复风险 |
|---|---|---|---|---|
| 1 | [langchain-ai/langchain#39363](https://github.com/langchain-ai/langchain/issues/39363) | Open；无 assignee；无对应 open PR；Issue 内有两位贡献者表示愿意处理 | `ShellSession._collect_output` 对无尾换行输出增加回归测试，并修正 marker 解析 | 中：已有 `chelsealong`、`Namraa310806` 公开认领意向 |
| 2 | [chroma-core/chroma#7560](https://github.com/chroma-core/chroma/issues/7560) | Open；无 assignee；未发现对应 open PR | 先做单次 `pre-commit` 调用/钩子覆盖的 CI 小改动；是否移除 `continue-on-error` 需维护者决定 | 低到中：有相邻 lint/CI PR，但未发现针对 #7560 的 open PR |

## 1. LangChain：ShellSession 无尾换行时错误超时

- **Issue 与现状：** [#39363](https://github.com/langchain-ai/langchain/issues/39363) 当前为 open，创建于 2026-08-09，无 assignee。Issue 给出可复现的 `printf` 场景：命令输出和完成 marker 在同一行时，当前 `data.startswith(marker)` 无法识别完成，导致成功命令被报告为 timeout。
- **源码与测试入口：** Issue 指向 [
  `libs/langchain_v1/langchain/agents/middleware/shell_tool.py`
  ](https://github.com/langchain-ai/langchain/blob/master/libs/langchain_v1/langchain/agents/middleware/shell_tool.py)；相邻测试目录为 [
  `libs/langchain_v1/tests/unit_tests/agents/middleware/implementations/`
  ](https://github.com/langchain-ai/langchain/tree/master/libs/langchain_v1/tests/unit_tests/agents/middleware/implementations)。具体测试文件名应以当前 checkout 为准。
- **疑似最小范围：** 在现有输出收集逻辑中处理 marker 前的 prefix，并保留原有截断/计数行为；加入“无尾换行”回归测试和“普通换行”控制测试。不要扩展到 shell 会话协议重设计。
- **重复风险：** Issue 页面显示 `chelsealong` 和 `Namraa310806` 已分别表示愿意处理；尚未发现对应 open PR，但这不是无人占用的入口。应先等待或请求 maintainer 公开确认范围，避免重复提交。
- **维护者活动：** 仓库 [master commits](https://github.com/langchain-ai/langchain/commits/master) 在访问日前仍有活动；近期社区 PR [#39366](https://github.com/langchain-ai/langchain/pull/39366) 和 [#39328](https://github.com/langchain-ai/langchain/pull/39328) 已由 `ccurme` 合并，且 PR 页面有公开 review/check 流程。
- **贡献规则与许可证：** [AGENTS.md](https://github.com/langchain-ai/langchain/blob/master/AGENTS.md) 要求使用 `uv`、pytest、ruff/mypy、Conventional Commits，并要求 PR 说明 AI-agent involvement；[LICENSE](https://github.com/langchain-ai/langchain/blob/master/LICENSE) 为 MIT。AGENTS 还要求 bugfix 配套 unit test，且 unit test 不应联网。
- **推荐判断：** 技术边界最清楚，适合小型 bug fix；但当前更适合作为“等待 maintainer 确认后的备选”，不建议直接抢先实现。

## 2. Chroma：PR lint job 实际上无法有效执行 Python/JS hooks

- **Issue 与现状：** [#7560](https://github.com/chroma-core/chroma/issues/7560) 当前为 open、无 assignee。Issue 指出 [.github/workflows/pr.yml](https://github.com/chroma-core/chroma/blob/main/.github/workflows/pr.yml) 的 `Run pre-commit` 将 12 个 hook 串在一个 `bash -eo pipefail` block 中，首个失败会跳过后续 hook；同时 `continue-on-error: true` 会吞掉失败。Issue 还记录了 `main` 上多个 hook 的独立失败结果。
- **配置与测试入口：** 当前工作流源码明确列出逐个 hook 调用；对应 hook 定义在 [`.pre-commit-config.yaml`](https://github.com/chroma-core/chroma/blob/main/.pre-commit-config.yaml)。开发和测试约定见官方 [DEVELOP.md](https://github.com/chroma-core/chroma/blob/main/DEVELOP.md)；AI-agent 相关仓库说明见 [AGENTS.md](https://github.com/chroma-core/chroma/blob/main/AGENTS.md)。
- **疑似最小范围：** 可先将手写的 12 次调用收敛为一次 `pre-commit run --all-files --show-diff-on-failure`，并处理配置中已存在但 CI 列表遗漏的 hook；这解决 hook 列表漂移和“首个失败遮蔽后续检查”的机械问题。移除 `continue-on-error` 会暴露大量现存格式/质量问题，应拆成后续变更并先征得维护者同意。
- **重复风险：** 以 Issue 编号、`pre-commit`、`lint` 和工作流主题搜索官方 open PR，未发现直接对应 #7560 的 open PR。仓库存在相邻 CI/lint PR，例如已合并的 [#7551](https://github.com/chroma-core/chroma/pull/7551) 与 [#7552](https://github.com/chroma-core/chroma/pull/7552)，因此提交前仍需重新检查主题重叠。
- **维护者活动：** 仓库 [main commits](https://github.com/chroma-core/chroma/commits/main) 在访问日前持续更新；[**#7551**](https://github.com/chroma-core/chroma/pull/7551) 获得 `rescrv` 的 approved review 后合并，[**#7552**](https://github.com/chroma-core/chroma/pull/7552) 获得 collaborator `HammadB` 的 approved review 并由 `rescrv` 合并，说明近期存在公开的维护者/协作者审查与合并活动。
- **许可证：** [LICENSE](https://github.com/chroma-core/chroma/blob/main/LICENSE) 为 Apache-2.0。许可证只用于判断公开贡献边界，不构成法律意见。
- **推荐判断：** 没有发现直接竞争 PR，但它不是“一行修复”：推荐先向维护者确认是否只接受机械覆盖改动，还是同时要求清理约 250 个既有问题。

## 复核与排除规则

开始任何实现前，应重新检查 Issue 是否仍为 open、是否出现 assignee、linked/open PR 或新的维护者回复；GitHub 的公开快照会变化。

本次明确不把以下已出现直接竞争的方向列为候选：

- `huggingface/datasets#7500`：当前官方 open PR [#8457](https://github.com/huggingface/datasets/pull/8457) 已由 `uuzzrm` 提交，属于已有工作，不应重复推荐。
- `langgraph#8383`：已有相关 PR [#8385](https://github.com/langchain-ai/langgraph/pull/8385)，且 Issue 中已有贡献者说明本地修复。
- 先前检查到的 `optuna#6780`、`skypilot#10397`、`dspy#9993` 等方向，若当前仍存在对应 open PR，应以最新官方 Issue/PR 状态为准，不作为本报告的干净入口。

**最终建议：** 先对 Chroma #7560 请求维护者确认 CI 改动的第一阶段范围；LangChain #39363 仅在 maintainer 明确没有人继续处理后再考虑。两者都应以英文提交代码和 PR 文本，并按上游贡献指南披露 AI 使用情况；本报告不替代维护者批准，也没有验证候选项目的本地构建或测试。
