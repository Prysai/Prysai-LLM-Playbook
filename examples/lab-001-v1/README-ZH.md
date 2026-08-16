# Lab 001 v1：第一次安全改动夹具

这是配合[实验 001](../../book/labs/lab-001-first-safe-task-ZH.md)的小型合成夹具。它没有真实项目、Git 历史、凭据、网络请求、安装步骤、账号、模型调用或外部副作用。

## 你会改什么

先把**整个**目录复制到可丢弃的位置。只在副本中检查 `seed/README.md`，并且只修改这个文件；不要修改 `verify_readme.py` 或 `expected/acceptance.json`。

验收合同已经给出改正依据：预览命令必须写明端口 `8080`，README 必须写明本地 URL。比较固定的本地证据，不要根据模型回答猜命令。

## 怎么做

在副本中并排打开 `seed/README.md` 和 `expected/acceptance.json`。

1. 发现 README 缺少端口和本地 URL。
2. 只做这一次允许的 README 修改。
3. 检查 README 是否包含全部 `required_readme_strings`：手动结果应为 `3/3`。

如果电脑本来就有 Python 3，可选运行 `python .\seed\verify_readme.py`。修改前应为 `FIRST_SAFE_CHANGE_FAILED`，修改后应为 `FIRST_SAFE_CHANGE_OK`。不要为了得到这个额外信号安装 Python。

## 有边界的任务卡

```text
目标：修正 seed/README.md 的本地预览说明。
先读：seed/README.md 和 expected/acceptance.json。
允许编辑：展示计划后，只改 seed/README.md。
不要：修改验证器或验收文件；安装；联网；读取密钥；提交、推送或发布。
回执：基线、计划、准确 diff、第二次结果和未验证清单。
停止：副本、目标或验收来源不可用。
```

通过只说明这个固定合成检查器通过；不证明学习者完成、模型行为、真实项目命令或能力迁移。
