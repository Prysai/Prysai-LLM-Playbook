# Field Guide 发布前检查清单

## License gate

- [ ] Root `LICENSE` is present and matches the intended content boundary.
- [ ] Documentation, scripts, diagrams, screenshots, trademarks, and third-party sources have explicit ownership or license decisions.
- [ ] `docs/sources/licensing.md` and the asset register agree with the release.
- [ ] No unresolved asset is included as a vendored or freely reusable release asset.

## 完整性门禁

- [ ] `python scripts/validate_content_completeness.py` 通过；迁移 warning 已逐项确认
- [ ] 三个站点生成器的 `--check` 通过，未手改生成文件
- [ ] `python scripts/build_pages_artifact.py --check` 通过；这只证明本地 artifact 边界，不证明公开 URL

## 产品与内容

- [ ] 正式名称、描述、视觉和受众已确认
- [ ] 书籍目录与实际章节一致
- [ ] 每个公开章节包含目标、实验、失败/边界、验收和来源
- [ ] `draft`、`candidate`、`verified`、`production-ready` 状态使用一致

## 来源与许可证

- [ ] 六个来源的归属和许可证边界已复核
- [ ] 无明确许可证的 S01 内容未被复制进发行版
- [ ] S02 的 CC BY-NC 组件已隔离并保留 LICENSE/NOTICE（如分发）
- [ ] MIT/Apache 组件保留版权、许可证和修改说明
- [ ] 嵌套外部 skill 的许可证未被根目录许可证错误覆盖

## 安全与隐私

- [ ] 没有 token、API key、密码、私钥、cookie、`.env` 或个人数据
- [ ] 示例默认是低风险、可回滚、无外部副作用
- [ ] 高权限、生产、删除、发布和外部消息都有确认点
- [ ] 外部文本、网页、API 返回和 skill 指令被视为不可信数据

## 技术质量

- [ ] 项目结构验证通过
- [ ] 全部 skills 通过官方 validator
- [ ] 本地 Markdown 链接检查通过
- [ ] 输入档案审计结果已更新
- [ ] 章节和实验的 fresh-context 前测完成
- [ ] 易变事实有来源、访问日期、责任人和下一次复核日期
- [ ] `CONTEXT.md` 中的核心术语与目录、章节、Skill 和评测记录一致
- [ ] CI 已为候选 SHA 上传 release evidence packet；packet 中的 gate、blind spots、freshness 和 blockers 已审查

## 组织准备

- [ ] 维护者和审查者已指定
- [ ] 贡献模型已确认
- [ ] 仓库拆分/发布形式已决定
- [ ] 组织许可证已决定
- [ ] 版本、变更日志和下线策略已决定
- [ ] 已声明不可变 release tag、rollback target，并记录一次有边界的恢复演练；未完成时保持 `candidate`
