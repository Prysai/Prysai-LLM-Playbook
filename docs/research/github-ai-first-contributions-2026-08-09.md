# GitHub AI/ML 开源项目：小型首次贡献候选

**访问日期：** 2026-08-09（GitHub API 时间戳为 UTC）  
**研究状态：** candidate（公开资料研究；不是维护者批准、PR 接受或合并预测）  
**范围：** 只读取公开 GitHub 仓库元数据、提交、issue、issue 时间线、公开贡献指南、许可证文件和开放 PR 搜索结果。没有 clone、fork、编辑、评论、开 issue、创建 PR 或 push 任何候选仓库。

## 结论先行

最值得先联系维护者的是：

1. **`skypilot-org/skypilot#10397`**：Helm 持久化 PVC 使 `apiService.config` 后续修改被静默忽略。问题新、复现信息具体、没有检索到对应开放 PR；预计是 Helm 模板、values/schema、测试和文档的小范围改动，但配置所有权语义需要维护者确认。
2. **`optuna/optuna#6780`**：给 `Study.trials_dataframe()` 增加 opt-in 的 `is_best` 列。维护者已经在公开评论中认可“通过 `attrs` opt-in”和列名 `is_best`，没有检索到对应开放 PR；实现和测试大致是几小时级别，但它是 feature 而不是 bug。
3. **条件候选：`huggingface/peft#3507`**：`PeftMixedModel.disable_adapter()` 退出嵌套或预先禁用的 context 后错误地重新启用 adapter。复现和修复边界非常清楚，也没有检索到对应开放 PR；但是 issue 作者已公开表示准备处理且等待维护者批准，所以不应直接重复实现，应该先询问维护者。

如果目标是“现在就开始写一份没人占用的 patch”，我只会把前两项列为优先入口；第三项适合先请求确认范围。

## 筛选方法与证据边界

本次使用 GitHub CLI 的只读 API，包括仓库元数据、`commits`、`contents`、issue/issue timeline，以及 `search/issues` 的 `is:pr is:open` 查询。判断“没有对应开放 PR”时，至少按 issue 编号做了仓库内开放 PR 搜索；对 PEFT 还按关键方法名做了补充搜索。该结论是**访问时点的公开搜索结果**，不保证在报告之后仍然成立；开始贡献前应重新打开 issue 和 PR 列表。

“几小时”是基于公开 issue、当前源码入口和测试入口的范围估计，不是本地执行结果。以下候选仓库代码都没有在本地运行验证。

## 候选 1：SkyPilot Helm 配置持久化方向反转

### 精确入口

- 仓库：[`skypilot-org/skypilot`](https://github.com/skypilot-org/skypilot)
- Issue：[`#10397 — Helm: apiService.config is write-once when the state PVC persists (silent)`](https://github.com/skypilot-org/skypilot/issues/10397)
- 贡献指南：[`CONTRIBUTING.md`](https://github.com/skypilot-org/skypilot/blob/master/CONTRIBUTING.md)
- 许可证：[`LICENSE`](https://github.com/skypilot-org/skypilot/blob/master/LICENSE)，文件以 Apache License, Version 2.0 开头（Apache-2.0）
- 相关源码：[`charts/skypilot/templates/api-deployment.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/templates/api-deployment.yaml)、[`charts/skypilot/values.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/values.yaml)
- 可用 Helm 测试入口：[`charts/skypilot/tests/api_service_test.yaml`](https://github.com/skypilot-org/skypilot/blob/master/charts/skypilot/tests/api_service_test.yaml)

### 活跃度与开放状态

- 仓库 API 快照：`pushed_at=2026-08-09T01:35:27Z`，`updated_at=2026-08-09T19:22:14Z`，公开 open issue 数量为 345。
- 最近提交包括 [`8770fcf`](https://github.com/skypilot-org/skypilot/commit/8770fcf4a7c1635e74d73c405d32c3f979061130)，时间为 2026-08-09，内容是 smoke test 稳定性修复；此前同日还有 Kubernetes GPU 状态、API 认证写入和 Docker CLI bootstrap 相关提交。
- Issue 于 `2026-08-09T15:24:35Z` 创建，当前仍为 open；公开 API 显示无 assignee、0 条评论。
- 本次仓库内开放 PR 搜索以 issue 编号 `10397` 查询，结果 `total_count=0`；issue 时间线也没有显示关联 PR。这个结果只能说明本次检索没有发现对应 PR。

### 问题与疑似修复范围

Issue 给出的对照是：ConfigMap 中 `kubernetes.provision_timeout=901`，持久化 PVC 的 `/root/.sky/config.yaml` 中仍是 `900`，服务实际读取 `900`。当前 Helm 模板的启动逻辑大致是：

- PVC 上的 `/root/.sky/config.yaml` 非空时，调用 `initialize_configmap_sync_on_startup('~/.sky/config.yaml')`，把 PVC 视为配置源；
- 文件为空时，才把 `/var/skypilot/config/config.yaml` 复制到 PVC。

因此，第一次启动后 PVC 永远非空，GitOps 修改 `apiService.config` 会被静默忽略。Issue 建议增加类似 `apiService.configAuthoritative: true` 的显式开关，使 ConfigMap 在这种部署模式下每次启动都覆盖 PVC。这个字段名和所有权语义尚未得到维护者确认。

合理的最小贡献范围是：

- 在 Helm 模板中增加一个明确的配置源选择分支；
- 在 `values.yaml`、`values.schema.json` 和 Helm values 文档中说明默认行为与风险；
- 在 `api_service_test.yaml` 或相邻 chart 测试中覆盖“空 PVC、非空 PVC、authoritative 开关”三种状态；
- 视维护者意见补充迁移/回滚说明。

**时间估计：** 约 3–6 小时，前提是只做 Helm 渲染和 chart unit test，不搭建真实云环境。

### 风险与不确定性

- 这是同日新 issue，尚无维护者评论；“ConfigMap authoritative”可能与已有“通过 API server/dashboard 修改配置”的工作流冲突。
- 需要确认多副本 API server、已有 PVC、首次部署和升级部署的行为是否一致。
- 目前看到的是公开源码和 issue 证据，没有实际执行 Helm 渲染，也没有验证 issue 报告的 Kubernetes 环境。
- 这是适合先在 issue 中提出设计确认的候选，而不是可以保证几小时内被接受的 patch。

## 候选 2：Optuna trials dataframe 的最佳 trial 标记

### 精确入口

- 仓库：[`optuna/optuna`](https://github.com/optuna/optuna)
- Issue：[`#6780 — Add boolean column for best_trials in optuna.Study.trials_dataframe`](https://github.com/optuna/optuna/issues/6780)
- 维护者确认列名的评论：[`PelinV 的评论`](https://github.com/optuna/optuna/issues/6780#issuecomment-5225375467)
- 接口讨论评论：[`attrs opt-in 建议`](https://github.com/optuna/optuna/issues/6780#issuecomment-5225242124)
- 贡献指南：[`CONTRIBUTING.md`](https://github.com/optuna/optuna/blob/master/CONTRIBUTING.md)
- 许可证：[`LICENSE`](https://github.com/optuna/optuna/blob/master/LICENSE)，文件为 MIT License
- 相关源码：[`optuna/study/study.py`](https://github.com/optuna/optuna/blob/master/optuna/study/study.py)、[`optuna/study/_dataframe.py`](https://github.com/optuna/optuna/blob/master/optuna/study/_dataframe.py)
- 现有测试入口：[`tests/study_tests/test_dataframe.py`](https://github.com/optuna/optuna/blob/master/tests/study_tests/test_dataframe.py)

### 活跃度与开放状态

- 仓库 API 快照：`pushed_at=2026-08-07T07:15:10Z`，`updated_at=2026-08-09T22:46:17Z`，公开 open issue 数量为 15。
- 最近提交包括 [`d02dad5`](https://github.com/optuna/optuna/commit/d02dad591b16ad2993ebfdd1735336d2ba56b00c)，时间为 2026-08-07，合并了 qConstrainedLogEI 重构；前几条提交也包括 context manager 修复和 GP sampler 变更。
- Issue 于 2026-07-30 创建、2026-08-08 更新，当前仍为 open；公开 API 显示无 assignee、4 条评论，标签为 `feature`。
- 公开讨论经历了接口选择：先有人提出将字段加入 `attrs`，再讨论单目标与多目标的命名；维护者 PelinV 明确回复 `Column is_best looks good`。
- 本次仓库内开放 PR 搜索以 issue 编号 `6780` 查询，结果 `total_count=0`。没有把“有人讨论”误读为已有 PR 或已承诺合并。

### 问题与疑似修复范围

Issue 希望 `Study.trials_dataframe()` 能指出哪些 trial 是最佳结果。公开评论已经给出较稳定的最小方向：新增一个不改变默认输出的 `attrs` 值，列名为 `is_best`。

建议的最小实现/测试范围：

- 在 dataframe 属性映射和 `trials_dataframe()` 路径中加入 `is_best` opt-in 字段；
- 单目标 study 使用当前最佳 trial 判断；
- 多目标 study 使用 `Study.best_trials` 表示 Pareto-front 成员；
- 不把该列加入默认 `attrs`，避免破坏现有调用方的列集合；
- 在 `tests/study_tests/test_dataframe.py` 中覆盖单目标、多目标、`multi_index=True/False`，以及没有可用最佳 trial 的边界；
- 先查看现有 `failed`/`pruned` trial 测试，保持状态和列顺序语义一致。

**时间估计：** 约 3–6 小时，前提是维护者已经接受 `attrs` opt-in 和 `is_best` 这两个公开 API 决策。

### 风险与不确定性

- 这是 feature，不是已有失败测试驱动的 bug；“best”在多目标场景必须解释为 Pareto-optimal，不能简单复制单目标逻辑。
- 需要确认空 study、所有 trial 都失败/剪枝、以及不同 storage 状态下的列值和 dtype。
- 维护指南明确提醒，主要由 LLM 生成且缺乏作者理解和验证的首次 PR 通常不接受；贡献者需要自己理解、测试并披露 AI 使用。
- 本次只读了公开 API、源码入口和测试结构，没有运行 Optuna 测试，也没有验证最终 pandas 列格式。

## 候选 3（条件）：PEFT mixed-model adapter 状态恢复

### 精确入口

- 仓库：[`huggingface/peft`](https://github.com/huggingface/peft)
- Issue：[`#3507 — PeftMixedModel.disable_adapter does not preserve nested or pre-disabled state`](https://github.com/huggingface/peft/issues/3507)
- Issue 作者的范围说明：[`先等待维护者批准`](https://github.com/huggingface/peft/issues/3507#issuecomment-5186399084)
- 贡献指南：[`CONTRIBUTING.md`](https://github.com/huggingface/peft/blob/main/CONTRIBUTING.md)
- 许可证：[`LICENSE`](https://github.com/huggingface/peft/blob/main/LICENSE)，GitHub API 将其识别为 Apache License 2.0（Apache-2.0）
- 相关源码：[`src/peft/mixed_model.py`](https://github.com/huggingface/peft/blob/main/src/peft/mixed_model.py)、[`tests/test_mixed.py`](https://github.com/huggingface/peft/blob/main/tests/test_mixed.py)

### 活跃度与开放状态

- 仓库 API 快照：`pushed_at=2026-08-06T12:05:13Z`，`updated_at=2026-08-09T23:13:23Z`，公开 open issue 数量为 61。
- 最近提交包括 [`5f55a63`](https://github.com/huggingface/peft/commit/5f55a6331b6a1620d8200ddb7c7c517dec722908)，时间为 2026-08-06，修复 LoRA+ 对 embedding 学习率的设置；同一时间段还有类型标注、adapter 合并和测试矩阵提交。
- Issue 于 2026-08-04 创建、2026-08-05 更新，当前仍为 open；公开 API 显示无 assignee、1 条评论。
- 本次按 issue 编号 `3507` 和关键方法名 `disable_adapter` 搜索仓库内开放 PR，均为 `total_count=0`。
- 但 issue 作者已经公开写道“pending maintainer approval”，并表示会先写失败测试再实现。因此它不是无人认领的自由入口。

### 问题与疑似修复范围

Issue 给出 CPU 可复现的两个状态错误：嵌套 `with model.disable_adapter()` 时，内层 context 退出后外层仍在运行，但 adapter 被重新启用；如果进入 context 前 adapter 已经禁用，退出后也会被错误地启用。

当前 `src/peft/mixed_model.py` 的 `disable_adapter()` 结构是：调用 `disable_adapter_layers()`，`yield`，然后在 `finally` 中无条件调用 `enable_adapter_layers()`。Issue 建议与普通 `PeftModel` 的状态恢复行为对齐。

合理的最小范围是：

- 只改 `PeftMixedModel.disable_adapter()` 的状态保存/恢复；
- 在 `tests/test_mixed.py` 增加嵌套 context 和进入前已禁用两条 CPU 回归测试；
- 保留现有“默认进入时 enabled，退出后恢复 enabled”的行为；
- 运行针对性 pytest 和项目质量检查，不需要 GPU 或真实模型服务。

**时间估计：** 约 2–5 小时，前提是维护者确认采用该状态恢复方向。

### 风险与不确定性

- Issue 作者已先提出处理意向，直接开始同一实现会造成重复贡献；应该先在 issue 中请求维护者确认，或等待现有作者的 PR。
- mixed model 可能包含多个 adapter/模块状态，简单地把一个全局布尔值放进 context 可能不足；测试应覆盖实际模块状态而不是只断言一次输出。
- 当前 issue 只有作者评论，没有维护者确认；“无开放 PR”不等于维护者接受该方案。
- 本次没有运行 PyTorch/PEFT 测试或复现脚本。

## 选择建议

| 优先级 | 仓库 / issue | 适合作为第一贡献的理由 | 立即行动前的阻塞点 |
|---|---|---|---|
| 1 | `skypilot-org/skypilot#10397` | 新鲜、真实部署 bug、复现表格具体、没有发现对应开放 PR | 先确认 ConfigMap/PVC 所有权语义和开关设计 |
| 2 | `optuna/optuna#6780` | 维护者已认可 opt-in `is_best` 方向，测试面清楚、无需云/GPU | 这是 feature；需自己处理多目标和空 study 边界 |
| 3（条件） | `huggingface/peft#3507` | CPU 可复现、实现边界最小、无发现对应开放 PR | 作者已表示准备处理；先请求维护者确认，不要重复开工 |

## 已排除的相近入口

- `huggingface/datasets#7500`：虽然类型检查复现很具体且此前没有对应开放 PR，但在本次复核中已有用户公开 `#self-assign`，不再作为无人占用的推荐。
- `huggingface/huggingface_hub#4634`：多行 `.env` 解析问题有对应开放 PR [`#4635`](https://github.com/huggingface/huggingface_hub/pull/4635)。
- `huggingface/huggingface_hub#4637`：相对重定向 query 丢失/镜像元数据问题已有开放 PR [`#4644`](https://github.com/huggingface/huggingface_hub/pull/4644) 和 [`#4648`](https://github.com/huggingface/huggingface_hub/pull/4648)。
- `huggingface/peft#3506`：维护者已讨论并有开放 PR [`#3516`](https://github.com/huggingface/peft/pull/3516)。
- `huggingface/trl#6669`：静默重复数据问题已有开放 PR [`#6670`](https://github.com/huggingface/trl/pull/6670)。
- `chroma-core/chroma#7370`：复现和一行修复很干净，但已经有开放 PR [`#7437`](https://github.com/chroma-core/chroma/pull/7437)。
- `keras-team/keras#23413`：GPTQ 除零 bug 已被分配，并有开放 PR [`#23415`](https://github.com/keras-team/keras/pull/23415)。
- `openai/openai-python#3459`：null `response.output` 的修复已有多个开放 PR（包括 [`#3465`](https://github.com/openai/openai-python/pull/3465) 和 [`#3499`](https://github.com/openai/openai-python/pull/3499)）。

## 来源与许可证边界

本报告只对公开 GitHub 页面/API 返回的事实做原创中文摘要，并保留仓库、issue、评论、源码、贡献指南和许可证链接；没有复制候选仓库的代码、图片或贡献指南文本，也没有把候选仓库内容导入本学习项目的运行时。许可证名称只用于判断贡献入口是否清楚，不构成法律意见。仓库自身的贡献政策、CLA、AI 使用披露要求和 issue/PR 状态，在真正贡献前仍需重新核对。

## 接受清单

- [x] 每个推荐项都有精确仓库 URL 和 issue URL。
- [x] 每个推荐项都有近期 commit/issue 活动证据。
- [x] 每个推荐项都有许可证和贡献指南链接。
- [x] 每个推荐项都有疑似文件范围、测试范围、时间估计和风险。
- [x] 对开放 PR、self-claim、维护者批准和本地验证之间的区别作了说明。
- [x] 明确记录本研究未 clone、编辑或运行候选仓库代码。
- [ ] 候选修复尚未 verified；需要贡献者在候选仓库本地复现并按其贡献指南运行测试。
