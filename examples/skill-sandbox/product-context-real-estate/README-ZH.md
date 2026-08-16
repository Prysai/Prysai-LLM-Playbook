# 产品上下文 → 首次置业者指南

这个可丢弃的本地沙盒演示 `prysai-product-context` Skill 的受限链路：

```text
合成简报 → 上下文草案 → 设计交接 → 静态置业者指南 → 浏览器截图
```

它不是房源、客户交付物、市场研究、咨询服务或获客页面。它没有真实库存、人物、客户引语、市场统计、分析工具、表单、外部图片、网络字体、CDN、API 或账号连接。

早期版本在视觉审查中被拒绝：它使用了泛化的生活方式装饰和虚构房源卡片。替代原则很实际：缺少真实证据或素材时，应提供有用的决策支持，而不是编造氛围。

## 本地运行

在仓库根目录执行：

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py -m http.server 4182
```

打开 `http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/`。

## 查看这些文件

- `brief.md`：虚构输入。
- `context-draft.md`：非权威上下文输出、交接记录和被拒绝模式。
- `index.html`、`styles.css`：下游指南。
- `scripts/capture_case_screenshots.mjs`：可复现的 Edge 截图。
- `assets/cases/` 与链接案例记录：证据及非声明边界。

上下文草案不授权发布，也不构成规范的产品上下文写入；它仍是 `candidate` 教学材料。
