<!-- content_id: chapter-20-personal-codex-work-system | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 20 章：构建个人 LLM 工作系统

**状态：**`candidate`。**实验状态：**`draft / not_run`。本章提供可迁移方法，不假定某个产品的记忆、自动加载或入口恒定存在。

## 问题

每次都重新解释项目、目标、术语、边界和验收，会带来上下文不一致、决定无法审查、旧命令被复用，以及经验无法进入下一项任务。更大的风险是把个人笔记当成保存令牌、密码、Cookie、客户文本或未经确认结论的地方。

| 资产 | 要回答的问题 | 明确排除 |
|---|---|---|
| 项目规则 | 项目始终要遵守什么？ | 临时猜测和秘密 |
| 任务上下文 | 这次具体做什么？ | 无关历史 |
| 当前状态 | 已读、已改、已验证或被阻塞什么？ | 把计划写成结果 |
| 模板 | 相似任务如何开始与交接？ | 未验证的永久结论 |
| 复盘 | 什么可迁移、什么失效？ | 凭据和不必要个人资料 |

上下文不是越多越好；相关性、可信度、敏感性和时效性比长度重要。

## Skill 还是任务协议？

一次性任务或输入输出仍在变化时，保留任务协议；稳定输入、决策点和输出，并拥有正例、失败例和迁移任务时，才可建立 Skill 候选。若触发或副作用不清，继续观察或阻塞。秘密、外部写入或生产发布的授权、回滚不明时，一律阻塞。

从项目卡、任务协议、状态日志、证据索引和复盘开始。启动时检查规则、分支、状态和权限；执行中只加入必要上下文；交接时分开“已验证”和“未验证”；复盘时只提炼他人能理解和检查的规则。

## 小练习与验收

在临时副本中分类四张提示卡：有截图却没有修复的移动端溢出；构建通过却没有用户验收；缺版本/入口/日志的认证错误；缺受众/来源的文案更新。比较只给任务输入的路径 A 与使用五类记录的路径 B。每条路径重复两次，保存哈希、`run_id`、澄清、实际修改、验证、证据、返工、未验证项和状态。

- [ ] 我的交接列出了实际运行的命令、结果与退出码。
- [ ] 我把已验证、未验证、风险与下一位负责人分开写。
- [ ] 我把过期命令和目录标为 `stale`，没有继续使用。
- [ ] 我没有把一次偶然成功写成 Skill 或产品记忆已被验证。

即使四份日志完整，真实 Skill 或记忆行为仍需要独立证据；本章保持 `candidate`。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章节导航"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-ZH.md">← 上一章<br><strong>第 19 章·评估模型与工作流</strong></a></td><td align="right"><a data-chapter-nav="next" href="21-team-capability-system-ZH.md">下一章 →<br><strong>第 21 章·构建团队能力系统</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
