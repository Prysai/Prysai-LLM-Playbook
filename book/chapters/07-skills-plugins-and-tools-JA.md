<!-- content_id: chapter-07-skills-plugins-and-tools | locale: JA | language: ja | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 第 7 章：Skill、Plugin、MCP、ツールは仕事をどう分けるか

**状態：** `candidate`。**比較：** `not_run`。この章のケースは方法を教えるものであり、
外部 Skill がこのリポジトリで動いたことを証明しません。

**ここから始める：** 先にタスクの不足を名前で言い、その不足を埋める最小の能力を選びます。

## この章が解く問題

「Skill が必要だ」は、いつも正しい診断ではありません。Skill、Plugin、MCP server、
connector、script、template、document は別の問題を解きます。交換可能な名前のように扱うと、
タスクに不要な能力を install し、dependency を見えにくくし、外部への影響を知らないまま
広げてしまいます。

役に立つ問いは「どの directory に Skill が多いか」ではありません。

> このタスクに何が足りないか。permission、license、dependency、evidence を管理できるまま、
> その不足を埋める最小の能力は何か。

## 学習目標

- 方法、接続、実行、配布の四層がどう分かれるかを説明する。
- directory からではなくタスクから最小の有用な組み合わせを導く。
- Skill、Plugin、connector を採用する前に trigger、dependency、license、permission、
  side effect、evidence を確認する。
- ファイルの存在、発見、load、採用、行動の検証を区別する。

## 現実の入口：発見はタスク開始前に失敗し得る

[Codex のフィールド調査](../evidence-library-JA.md#source-notes)には公開報告があります。
これは症状であり、公式の原因説明でもローカル再現でもありません。

| 公開症状 | 報告者の観測 | **証明しない**こと | 最初の安全な対応 |
|---|---|---|---|
| Skill は通常ファイルなら動くが symbolic link にすると発見されない | ファイル表現が discovery の結果を変えた | 全 scanner、OS、release に同じ欠陥があること | 正確なファイル表現と作業面を残し、隔離試験で通常ファイルと link を比べる |
| 明示的な Skill 利用が暗黙の利用可能リストに依存する | 明示した要求を、現在の作業面のリストから独立した行動として扱えない | 一般的な routing rule または公式保証 | 見えるリスト、正確な要求、session、load 済み resource を分けて保存する |

repository に path があることは、現在の host がその Skill を発見したことではありません。見える
名前は session が load した証拠ではなく、load は外部 dependency や permission が働いた証拠でも
ありません。

## 1. 四層の能力モデル

選ぶ前に、何が不足しているかを層で呼びます。

```text
方法層          Skill            ある種類のタスクを繰り返す方法
接続層          MCP/connector    外部の data、context、action
実行層          tool             読む、編集する、実行する、閲覧する、呼び出す
配布層          Plugin           複数の能力を配布・組み合わせる package
```

現実の製品では重なることがありますが、設計上の問いは違います。

| 層 | 与えるもの | それだけでは与えないもの |
|---|---|---|
| Skill | 繰り返す task/workflow の instruction と支援 resource | permission、外部 access、またはこの環境で方法が有効という証明 |
| MCP server / connector | 外部 tool、resource、context、action への橋 | authentication、各 action の approval、安全な data boundary |
| tool | file 読み取り、command 実行、API 呼び出しなど観測可能な action | 使う理由、使用許可、結果の正しさ |
| Plugin | 複数能力の配布と composition | 自動の authorization、全 component が使える保証 |

毎回同じように実行すべき繰り返しロジックには script が向きます。安定した output shape には
template、特定時だけ読む背景知識には document が向きます。方法が繰り返され、なお context ごとの
判断を必要とするなら Skill に価値があります。

## 2. 範囲を広げない順序で選ぶ

1. タスクに明確な protocol があるかを判断し、なければ先に明確化する。
2. 同じ方法が繰り返され、人が手順を落とすなら Skill を考える。
3. 外部 data または action が必要なときだけ connector や MCP server が必要かを問う。
4. 変換が決定的なら script を優先する。
5. 複数能力を一緒に配布する必要があるとき Plugin を配布層として考える。
6. その後にだけ install、authentication、追加 permission を決める。

この順序は意図して保守的です。大きな directory は能力が増えたように見せながら、dependency と
permission の実際の graph を読みにくくします。

## 3. Skill 名ではなくタスクの不足から始める

候補を採用する前に、次を文章で答えます。

- **task gap：** 安定した方法、決定的な script、外部 connection、それともタスク定義自体のどれが不足しているか。
- **trigger / non-trigger：** どの input で発火するか。似た要求のどれは発火せず、別の Skill が扱うか。共通語だけでは足りない。
- **source / revision：** 別の reviewer が URL、固定 commit、version、archive hash、inventory date を調べられるか。
- **license / dependency：** repository license は対象 file を覆うか。NOTICE、nested asset、runtime dependency を棚卸ししたか。
- **permission / side effect：** 何を read/write するか。network または account が必要か。send、publish、delete、modify など外部を変えられるか。
- **verification / maintenance：** 隔離試験が positive、boundary、failure、transfer を扱えるか。誰が approval、maintenance、backup、update、rollback rehearsal を持つか。

外部 directory の件数は品質指標ではありません。自動化 package も account、network、third-party
service の risk を持ちます。候補ごとに自身の evidence に基づく review が必要です。

### Plugin に含まれるものと support の終点

公式の [Plugins](https://learn.chatgpt.com/docs/plugins.md) は Plugin を install 可能な能力 package
として説明し、Skills、Connectors、または両方を含められるとしています。Connector は MCP server
で支えられ、外部 system の tool、shared information、action を提供することがあります。Plugin は
配布と composition であり、authorization ではありません。

2026-08-09 に確認した support は、ChatGPT Chat/Work の web、desktop、mobile、ChatGPT desktop
app の Codex、Codex CLI の Plugin browser を挙げています。IDE extension の Plugin support は挙げて
いません。mobile で Chat/Work が使えることは、desktop と同じ directory browse/install surface を
持つことを意味しません。

製品と connection を、個別に根拠が要る鎖として扱います。

```text
product support → account / organization authorization → Plugin install
→ connector authentication → 新しい session → Skill/tool が見える
→ 実際の invocation → 外部結果の verification
```

各矢印は独立した主張です。`Sign in with ChatGPT` は Plugin data access を自動的に与えず、action を
approve もしません。[fact impact registry](../../docs/governance/fact-impact-registry.yaml) の `OF-015`、
`OF-016`、`UF-001`、`UF-003`、`LB-002` を、影響する内容を変える前に確認してください。

2026-08-10 に確認した公式 Skills/Plugins 資料は、auto match と explicit selection を別の入口として
説明します。ChatGPT は `@`、Codex は `$` を使い、install 後の新しい chat または CLI session も
flow の一部です。これらは変動する製品事実であり、Skill に自動で付く permission ではありません。
ローカル check は作業面、session、正確な invocation、load resource、behavior output、result
verification を残す必要があります。この repository にはその runtime record がないため、状態は
`not_observed` のままです。

## 4. 採用前 review package

install 前に `skill-adoption-decision.md` を作ります。「license を確認した」だけでは足りません。

```text
task_gap:
trigger_conditions:
non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets:
dependencies:
target_install_scope:
permissions:
external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps_and_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified:
```

| 決定 | 意味 | 言えること | 言えないこと |
|---|---|---|---|
| `recommendation-only` | タスクには合いそうで、read-only review または隔離試験を続ける | 「さらに review する価値がある」 | 「install を承認した」 |
| `blocked` | license、NOTICE、revision、dependency、permission、rollback の根拠が欠ける | 「まだ採用しない」 | 「先に install して後で記録する」 |
| `approved-to-install` | revision、scope、backup、rollback、approval point が明確で受理された | 「この scope では install できる」 | 「install 済み」または「検証済み」 |
| `installed-candidate` | target path と install record は観測できるが、behavior review は未完了 | 「隔離された install candidate がある」 | 「team が採用した」または「production-ready」 |

プロジェクトの `draft`、`candidate`、`verified`、`production-ready` はこの採用決定とは別です。GitHub
page が見えることは license を明らかにせず、manifest の存在は tool invocation の成功を証明しません。

### 混同しやすい五状態

| 状態 | 最低限の根拠 | 証明しないこと |
|---|---|---|
| file exists | 固定 revision の path、manifest、inventory、hash | 現在の作業面が発見できること |
| discovered | 現在の作業面の visible list または name resolution | この session が load したこと |
| loaded | 新しい session の resource または instruction | team が採用したこと |
| adopted | 宣言された scope における owner と approval record | behavior が検証済みであること |
| verified | 宣言環境の positive、boundary、failure、transfer evidence | 別 account、entry、version で同じに動くこと |

install も観測可能な action です。target path と install log は `installed-candidate` を支えられますが、
discovery、load、adoption、behavior verification を飛ばせません。

### 二つの採用決定例

- **推薦：** S05 の `code-review-and-quality` は、定義済み baseline を持つ diff review に
  `recommendation-only` の候補になります。`https://github.com/addyosmani/agent-skills` の local archive、
  SHA-256 `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250`、repository-level の MIT
  signal が根拠です。nested dependency、完全な asset set、実効 permission、rollback は未 review
  なので、次は read-only review または offline isolated trial であり install ではありません。
- **blocked 変種：** S06 の `webapp-testing` は `blocked` のままにします。source は
  `https://github.com/composio-community/awesome-codex-skills` の local archive、SHA-256 は
  `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E` です。root に Apache-2.0
  signal はあっても、各 nested Skill、script、asset に一貫した license/NOTICE coverage がある根拠は
  ありません。asset ごとの review と演習可能な rollback がない限り、`SKILL.md` の存在だけでは足りません。

## 5. 能力を組み合わせ、積み重ねない

```text
task protocol → domain method → tool または connection → evidence review
```

低リスクの marketing experiment なら、task protocol が goal と boundary を定義し、product context
method が audience と positioning を渡し、analytics tool が必要な data を記録し、Evidence Review が
event が実際に起きたかを調べます。重なる十個の Skill を開くより、一つの method と明確な protocol
の方が routing と context を理解しやすいことが多いです。

## 6. composition 前に handoff する

能力が別の能力へ仕事を渡すとき、同じ field を使います。

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

domain Skill は自身の方法を、Task Protocol は execution boundary を、Evidence Review は既存 claim の
review を、Workflow Orchestrator は phase と checkpoint を担当します。呼び出された Skill は別 Skill の
permission を得ず、完全な orchestration を再帰的に始めるべきでもありません。

## 7. 実験：三つの能力の組み合わせを比べる

### 準備とタスク

local、低リスク、reversible な task を選びます。task protocol、fixed revision の Skill candidate
二つ、外部 connection を要求する simulated option を用意します。一つは隔離 review を続けられ、
もう一つは license、NOTICE、rollback が不明なため拒否されるべきです。real data の upload、message
送信、third party への write、外部 account の authentication はしません。各組み合わせに `run-id` を
与え、task text と acceptance rubric を固定します。

同じ task に対して、(1) 明確な protocol のみ、(2) protocol と domain Skill、(3) protocol、domain
Skill、external connection の三つを設計します。各 candidate の pre-adoption review を先に終えます。
実験は read-only です。install、authentication、team-level setting を有効化しません。output quality、
time、permission scope、verification cost、side effect を比べ、追加能力が純利益となる時と、complexity
だけを増やす時を説明します。

### 証拠と振り返り

三経路、各 `run-id`、二つの `skill-adoption-decision.md`、dependency/permission table、license finding、
simulated または actual output、verification result、明示した「実行しなかった外部 action」一覧を保存
します。有効な行は source と revision を調べられ、license conclusion を実ファイルに向け、install、
backup、rollback target、owner、approval point を名指しし、positive/boundary/failure/transfer を覆い、
追加 connection のない baseline を残します。simulated call は simulated と呼びます。

`recommendation-only` または `blocked` を次状態へ動かすために必要な evidence を説明します。各観測が
existence、discovery、load、adoption、verification のどれを示すかを記し、早い状態で後の状態を置換
しません。

## 意図的な失敗と境界ケース

一つは外部 upload を要求するが task は local organization だけを必要とする、重なった三 Skill を
提示します。さらに repository は開けて `SKILL.md` もあるが license または rollback が不明な候補を
加えます。重なりを見つけ、不必要な permission を拒否し、不明候補を `blocked` とし、protocol のみ
または一 Skill の baseline を残せれば合格です。

## 移行

四層モデルを research workflow と product report workflow へ適用します。それぞれで method、
connection、script にすべき決定的変換を特定します。

## 出典と保守境界

| 事実または境界 | source | 確認日 | 適用範囲 |
|---|---|---:|---|
| Skill の task/workflow instruction と resource、explicit selection | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) | 2026-08-09 | 当日の公式説明。ここで load された証明ではない |
| Plugin の composition、surface、install、connector authentication、approval | [Plugins](https://learn.chatgpt.com/docs/plugins.md) | 2026-08-09 | account/organization により access は変わる |
| MCP server、tool/resource/prompt、allow/deny configuration | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | authentication、tool、policy は別 review が必要 |
| connector/MCP action の approval boundary | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | この repository の runtime configuration ではない |
| symbolic link と explicit invocation の discovery symptom | [Codex field research](../evidence-library-JA.md#source-notes) | 2026-08-09 | 公開報告。再現または公式 root cause なし |
| candidate archive inventory と license signal | [Skill candidate catalog](../evidence-library-JA.md#source-notes) | 2026-08-09 | project inventory。外部 Skill の install 承認ではない |

Skill、Plugin、connector、MCP、manifest、authentication、invocation の詳細は変わります。まず
first-party record を更新し、それから fact impact registry、本章、Lab、Skill、fixture、site route を
review してください。公式説明、community symptom、local runtime evidence を一文に混ぜません。

## 受け入れチェックリスト

- [ ] Skill、Plugin、MCP server、connector、tool、script、template、document を区別できる。
- [ ] task gap、trigger、non-trigger、source revision、license、dependency、permission、side effect、owner、rollback を説明できる。
- [ ] candidate を `recommendation-only` に保ち、license または rollback が不明なら `blocked` にできる。
- [ ] existence、discovery、load、adoption、verified behavior を区別できる。
- [ ] 固定した input、acceptance、evidence boundary で protocol baseline と能力の組み合わせを比較できる。
- [ ] 実行しなかった外部 action と runtime success を言う前に必要な evidence を説明できる。
- [ ] 本章は `candidate`、比較は `not_run` のままだと報告できる。

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="章のナビゲーション">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-JA.md" aria-label="前の章：第 6 章 · モデル選択はモデル崇拝ではない">← 前の章<br><strong>第 6 章 · モデル選択はモデル崇拝ではない</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow-JA.md" aria-label="次の章：第 8 章 · 定義から引き渡しまで">次の章へ →<br><strong>第 8 章 · 定義から引き渡しまで</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
