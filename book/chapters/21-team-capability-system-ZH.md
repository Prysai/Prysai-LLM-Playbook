<!-- content_id: chapter-21-team-capability-system | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 21 章：构建团队能力系统

**状态：**`candidate`。**实验：**`draft / not_run`。练习是静态模拟，不授权连接、发送、写入、推送或发布，也不证明生产连接。

## 问题

一个人可以凭经验把 Codex 带过一项任务；团队还必须回答：谁拥有规则？哪个 Skill 值得信任？谁更新或撤回？没有共同语言、方法、证据和责任，团队只是在分发不透明的个人习惯。

```text
共同语言和项目规则
        ↓
可复用的方法与 Skill
        ↓
实验、任务集和证据标准
        ↓
权限、审查、版本化和维护责任
```

登录或拥有访问权不等于获得任务授权。范围、目标、批准或回滚不清时，正确决定是 `blocked`。

## 最小能力包

```text
capability-pack/
├─ README.md        # 目的、范围、复现和边界
├─ manifest.yaml    # id、版本、负责人、状态、下次复核
├─ context/         # 术语、边界、可信来源
├─ protocol/        # 输入、决定、行动、停止
├─ examples/        # 正例和失败例
├─ eval/            # 验收和证据索引
└─ governance/      # 权限、责任、回滚
```

manifest 至少有 `id`、`version`、`owner`、状态、来源和许可证、下次复核、允许范围和回滚。版本让变化可追踪，不证明行为已验证。

## 独立复现练习

在临时仓库中选择“发布前文档审查”或“新成员项目入门”作为固定任务。输入同时包含已完成和未确认项、一个过期命令、以及一项需要确认的权限。A 执行并保存哈希与日志；B 只得到能力包和输入，在另一个副本中记录所读内容、行动、停止、差异、验证和隐性知识缺口。A 只改一个层级，从 `0.1.0` 升到 `0.1.1`，再让 B 重跑。

不能连接真实账户、上传数据、发消息、推送、发布或长期保存秘密。每次运行要有 `run_id`、成员、版本、输入哈希、实际修改、命令和退出码、评分者、未确认项和状态。

- [ ] 我的包有版本、负责人、来源、权限和回滚。
- [ ] 另一人无需口头补充也能复现核心步骤。
- [ ] 每次运行都有哈希、日志、差异、验证和未确认项。
- [ ] 我可以阻止过宽权限或未经批准的发布。

这个模拟不能证明生产连接或团队效果；本章保持 `candidate`。

## 让贡献者可以快速审查地提交

团队不需要把每一个建议都变成大型改动。一个容易审核的测试或内容 PR 应只解决一个明确问题，并让审查者能在几分钟内找到来源、变化、验证和不确定性。

```yaml
contribution_type: "test-case | content-correction | translation | skill-candidate"
problem: "要纠正或检验的单一主张"
scope: "允许变更的文件；明确不改什么"
source_or_fixture: "官方来源 URL，或可公开的最小夹具"
expected_result: "可检查的输出、失败或阻塞条件"
evidence: "命令、日志、diff、截图或人工评分位置"
license: "原创，或资产登记中的许可记录"
reviewer_questions: ["事实是否有来源？", "是否改变权限或范围？", "失败时如何处理？"]
```

提交者不应粘贴秘密、真实客户数据、未授权模型输出或不可再分发的材料。若测试需要账号、付费、网络、写入或平台特定权限，应先把它标为 `requested` 或 `blocked`，而不是让 CI 或维护者替自己猜测授权。

### 快速合并的最小路径

1. 一个 PR 只放一个可独立审查的改变；格式化重写和内容修改分开。
2. 为测试给出固定输入、预期结果、失败条件与最小复现命令；不能运行时如实标 `not_run`。
3. 为内容给出主张、来源、访问日期、适用范围与复核日期；翻译还要说明英文源文件和审校状态。
4. 维护者先检查许可证、数据范围、权限和回滚，再检查链接、结构和相关测试。
5. 只有范围清楚、证据可定位、检查通过且未扩权的改动才适合快速合并；其他改动应请求澄清或保持 `candidate`。

## 本章验收补充

- [ ] 我能把一个建议写成单一问题、固定输入和可检查结果，而不是“请让它更好”。
- [ ] 我知道哪些材料不能放进 PR，也不会用 CI 成功替代授权或独立复核。
- [ ] 我能说明一个改动为何可以快速合并，或为何必须停在 `blocked` / `candidate`。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-ZH.md">← 上一章<br><strong>第 20 章·构建个人 LLM 工作系统</strong></a></td><td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-ZH.md">下一章 →<br><strong>第 22 章·持续更新与面向未来</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
