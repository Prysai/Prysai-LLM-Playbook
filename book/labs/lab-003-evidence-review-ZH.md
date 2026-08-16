<!-- content_id: lab-003-evidence-review | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-12 -->

---
id: lab-003-evidence-review
title: "审计一条完成声明"
level: L3
domain: general
goal: "区分声明、直接证据、推断与缺失验证"
setup: "三份脱敏交付摘要；答案要点保留在学习者上下文之外"
task: "为每一条实质声明映射范围、所需证据、实际证据、状态和最小下一项检查"
evidence:
  - "三份固定输入摘要和答案要点"
  - "一张完成的声明—证据表"
  - "审查笔记和明确的未验证清单"
failure_variant: "插入没有支撑的“全部测试通过”声明，以及由一次浏览器检查支撑的“所有设备”声明"
reflection: "哪些证据证明存在、正确或就绪？写出范围后，哪一条声明变弱了？"
status: draft
last_verified: "Not run"
transfer_task: "将审计表应用于一项小型工程、研究或发布交付"
transfer_domain: "工程、研究或内容交付"
transfer_evidence: "保留有范围的声明、直接证据、缺口、审查笔记和最终状态"
transfer_limitations: "静态审计不能证明被引用产物在检查范围外真实或完整"
---

# 实验 003：审计一条完成声明

## 学习目标

不依赖语气、自信或视觉包装，判断结果是否真的完成。

## 设置

准备三份脱敏交付摘要：一份有直接证据支持，一份部分完成却描述为结束，
一份没有验证记录却经过漂亮包装。答案要点必须保留在学习者上下文之外。

允许动作只有只读检查和请求更窄的证据。不要编辑摘要、编造缺失输出、联系外部服务，
或使用生产日志。

## 任务与实验

为每一条实质声明记录：

| 声明 | 范围 | 所需证据 | 找到的证据 | 状态 | 最小下一项检查 |
|---|---|---|---|---|---|
| 示例 | 文件、环境、版本、日期 | diff 和聚焦检查 | 精确路径或 none | verified / partial / inferred / blocked / unknown | 一项有界动作 |

分别回答：

1. 产物存在吗？
2. 产物在声明范围内正确吗？
3. 它已可供目标读者或环境使用吗？

三个问题需要独立证据。diff 证明改动，不证明正确；通过的单元测试证明覆盖到的行为，
不证明部署或用户验收。

## 失败案例

插入“全部测试通过”这句话，却没有命令输出、测试名称、日期、环境或退出码。正确响应是
降低声明状态并请求证据；不要从自信措辞推断真的跑过。

再用一次浏览器检查来支撑“在每台设备都能用”。你必须缩小声明，或要求更多设备证据。

## 验收标准与清单

- [ ] 每个重要声明都有明确范围。
- [ ] 直接证据与推断在不同列。
- [ ] 无证据声明没有被标为 verified。
- [ ] 下一项检查小于重跑整个项目。
- [ ] 已排除秘密、客户数据与私有日志。
- [ ] 最终交接列出了仍未验证的内容。

## 要保留的证据

保留三份输入摘要、完成的审计表、答案要点比较、审查笔记和最终状态。学习者运行和独立
审查被记录前，此实验仍是 draft / not_run。

## 复盘与迁移

把表格应用到一项小型工程交付、研究结论或发布草稿。哪些证据证明存在、正确和就绪？
把范围写精确后，哪一条声明变弱了？

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="实验导航">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-002-task-protocol-ZH.md" aria-label="上一个实验：实验 002·把一个愿望变成任务协议">← 上一个实验<br><strong>实验 002·任务协议</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-004-skill-selection-ZH.md" aria-label="下一个实验：实验 004·选择最小有用能力">下一个实验 →<br><strong>实验 004·选择最小有用能力</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
