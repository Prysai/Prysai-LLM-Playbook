<!-- content_id: first-safe-change-route | locale: ZH | language: zh-CN | default_locale: EN | translation_status: in-progress | translated_from: first-safe-change-EN.md | source_revision: worktree-2026-08-14 -->

# 第一次安全改动：在实验 001 之前，先完成一个离线练习

**内容状态：** `candidate` 补充路线。**学习者运行：** `not_run`。
**翻译状态：** 简体中文完整初稿；尚未经过独立语言审校。

这是第 2 章与实验 001 之间为新手准备的默认安全沙盒。它只给你一个故意不完整的 README、一次允许的本地改动和一个很窄的检查器，然后你再到自己的项目中工作。它不是第 23 章、新 Skill、Git 练习，也不是任何模型已经完成任务的证据。

如果你第一次打开项目文件夹或第一次运行检查器，这正是这条路线存在的原因。你不需要安装新工具、注册账号，也不必拿真实项目冒险。目标会小到你能看见所有相关文件，并自己判断检查是否真的回答了问题。

## 问题

实验 001 要求你准备一个可丢弃项目、找到真实命令来源，并完成一次有边界的 README 改动。这些约束适合面向真实项目的练习，却可能让第一次实践变成循环：新读者还没有安全项目，也不知道该相信哪个命令来源。

## 概念

练习夹具把“练习方法”与“寻找合适项目”分开。它是虚构的、本地的、可丢弃的。唯一预期改动是修正 README；检查器只读取这一个文件并给出小结果。这样，你不用账号、网络、安装、Git、提交、推送、发布或个人数据，也能看见验收条件。

## 决定

如果你还没有可丢弃的本地项目，请使用项目自带的 [第一次安全改动夹具](../../examples/lab-001-v1/README-ZH.md)。把整个夹具复制到 `.work/` 或其他临时目录；不要修改仓库里的原始夹具，否则下一位读者看不到预先放入的错误。

## 操作

先做一个私人的工作副本。在文件管理器中，将整个 `examples/lab-001-v1` 文件夹复制到可随时删除的位置，并命名为 `first-safe-change`。

然后在下面两种检查中选一种：

1. **不运行程序的检查（默认）。** 在复制后的文件夹中打开 `seed/README.md` 和 `expected/acceptance.json`。编辑前，README 少了两个必需的预览信息。只允许改一次 README 后，检查 README 是否清楚包含验收文件中 `required_readme_strings` 列出的三段字符串。
2. **可选的本地检查器。** 仅当你的电脑原本就已经能运行 Python 3 时使用。打开复制后文件夹中的终端并运行：

```powershell
python .\seed\verify_readme.py
```

第一次的结果应该是 `FIRST_SAFE_CHANGE_FAILED`。这是故意设计的起点，不是安装损坏。然后按照夹具 README 中的任务卡先检查 `seed/README.md`，提出最小改动方案；只有你自己认可方案后，才修改**这一份** README。再次使用同一个手动检查或可选命令。通过时的可选本地结果是 `FIRST_SAFE_CHANGE_OK`。

如果没有 Python，不要为了这条路线安装运行时或换用其他命令。使用不运行程序的检查，并记录 `check: manual required_readme_strings 3/3`。如果连可丢弃的本地副本也无法创建，请停止，改做纯文本的 First Win；不要把 GitHub 网页预览假装成一个本地沙盒。

## Web coding 桥接：在真实浏览器中观察一次可见改动

如果下一步目标是 Web coding，不要从“构建完整网站”开始。把项目自带的
[Product Context 沙盒](../../examples/skill-sandbox/product-context-real-estate/README-ZH.md)
当作可丢弃的静态页面。它只有虚构文案，没有真实房源、表单、分析、API 或
外部图片。

1. 将整个 `examples/skill-sandbox/product-context-real-estate` 文件夹复制到临时
   位置，先阅读其中的 README 和 `index.html`。
2. **只改 `index.html`**：为同一个虚构受众替换一处可见句子。不要改 CSS、添加
   框架、获取图片或添加表单。
3. 如果电脑原本已有 Python 3，在复制后的目录运行文档中的本地服务器：

```powershell
python -m http.server 4182
```

在浏览器打开 `http://127.0.0.1:4182/`。检查标题、改动后的句子、未改动的标题、
链接目标、控制台，以及 390px 宽视口。如果命令、目标文件或浏览器结果不清楚，
停止；不要为了这项练习安装运行时。

保留一份简短回执：

```text
sandbox: <复制后的目录>
allowed_change: index.html only
url: http://127.0.0.1:4182/
browser_check: 句子出现一次；标题和链接保留；已观察控制台
diff: <已检查的差异>
unverified: 部署、无障碍审查、其他浏览器、用户验收
```

这只能证明一个视口下的一次本地渲染状态，不证明生产构建、其他响应式状态、
无障碍合规、安全、性能或产品价值。完整工程生命周期见
[第 16 章](../chapters/16-engineering-track-ZH.md)。

## 证据

只保留这一份简短回执：

```text
sandbox: <工作副本路径>
baseline: FIRST_SAFE_CHANGE_FAILED
allowed_change: seed/README.md only
diff: <已检查的 README 差异>
check: manual required_readme_strings 3/3 | FIRST_SAFE_CHANGE_OK
external_actions: none
unverified:
  - learner completion
  - model behavior
  - transfer
```

这个检查器最多只能说明：某个时刻，这份固定、虚构的 README 符合夹具声明的字符串。通过并不等于 Git 操作成功、浏览器正常、账号权限正确、安全审查完成或已经学会。

## 失败与边界情况

不要为了得到通过而修改检查器、验收文件或其他路径。如果建议的修复需要安装、网络请求、密钥、账号、仓库操作或第二个文件，停止。那是新的决策，不属于这个夹具。

## 复盘

1. 在修改前，验收条件的哪一部分已经可以观察？
2. 最终差异证明了什么？一段自信的“已完成”说明又不能证明什么？
3. 在真实项目的实验 001 中，复用这个模式前，你还需要确认哪一项事实？

## 继续

下一项注册单元是[“实验 001：完成一次安全的 README 改动”](../labs/lab-001-first-safe-task-ZH.md)。它会在本夹具的基础上加入真实项目特有的命令来源、沙盒身份和恢复检查。该实验仍为 `draft / not_run`，中文译文尚未经过独立语言审校。

## 状态与限制

本路线对学习者仍是 `candidate / not_run`。仓库中的测试只检查夹具形状，以及检查器声明的通过/失败行为；它不观察学习者、不调用 Codex 或其他模型、不比较产品、不证明迁移能力，也不验证真实项目的命令。
