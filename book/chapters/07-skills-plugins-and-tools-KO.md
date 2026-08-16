<!-- content_id: chapter-07-skills-plugins-and-tools | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 7장: Skills, Plugins, MCP, 도구는 어떻게 일을 나누는가

**상태:** `candidate`. **비교:** `not_run`. 이 장의 사례는 방법을 가르칠 뿐,
외부 Skill이 이 저장소에서 작동했다는 증거는 아닙니다.

**여기서 시작하세요:** 먼저 작업의 빈틈을 이름 붙이고 그 빈틈을 메우는 가장 작은 역량을 고릅니다.

## 이 장이 해결하는 문제

“Skill이 필요하다”가 항상 맞는 진단은 아닙니다. Skill, Plugin, MCP 서버, connector, script,
template, document는 서로 다른 문제를 풉니다. 이들을 바꿔 쓸 수 있는 이름처럼 취급하면 작업에
필요 없는 역량을 설치하고, dependency를 숨기며, 외부 부작용을 모른 채 넓히게 됩니다.

유용한 질문은 “어느 디렉터리에 Skill이 가장 많은가?”가 아닙니다.

> 이 작업에 무엇이 부족한가? permission, license, dependency, evidence를 관리할 수 있는 채로
> 그 빈틈을 메울 가장 작은 역량은 무엇인가?

## 학습 목표

- 방법, 연결, 실행, 배포라는 네 층의 역할을 설명한다.
- 디렉터리가 아니라 작업에서 최소 유효 조합을 이끌어 낸다.
- Skill, Plugin, connector를 채택하기 전에 trigger, dependency, license, permission,
  side effect, evidence를 검토한다.
- 파일 존재, 발견, 로드, 채택, 동작 검증을 구분한다.

## 실제 진입점: 발견은 작업 시작 전에도 실패한다

[Codex 현장 조사](../evidence-library-KO.md#source-notes)는 공개 보고를 기록합니다.
이는 증상이지 공식 원인 분석이나 로컬 재현이 아닙니다.

| 공개 증상 | 보고자가 관찰한 것 | **증명하지 않는 것** | 첫 안전 대응 |
|---|---|---|---|
| Skill은 일반 파일로 동작하지만 symbolic link가 되면 발견되지 않음 | 파일 표현 방식이 discovery 결과를 바꿈 | 모든 scanner, OS, release가 같은 결함을 가짐 | 정확한 파일 표현과 작업면을 보존하고 격리 시험에서 일반 파일과 link를 비교 |
| 명시적인 Skill 사용이 암묵적인 가용 목록에 의존 | 명시 요청을 현재 작업면 목록과 독립된 행동으로 취급할 수 없음 | 일반 routing rule 또는 공식 보장 | 보이는 목록, 정확한 요청, session, 로드 resource를 따로 보존 |

저장소에 경로가 있다는 것은 현재 host가 Skill을 발견했다는 뜻이 아닙니다. 보이는 이름은 이
session이 로드했다는 증거가 아니고, 로드는 외부 dependency나 permission이 동작한다는 증거도 아닙니다.

## 1. 네 층 역량 모델

선택 전에 무엇이 부족한지 층으로 이름 붙입니다.

```text
방법 층          Skill            한 종류 작업을 반복하는 방법
연결 층          MCP/connector    외부 data, context, action
실행 층          tool             읽기, 편집, 실행, 탐색, 호출
배포 층          Plugin           여러 역량을 배포하고 조합하는 package
```

현실 제품에서는 겹칠 수 있지만 설계 질문은 다릅니다.

| 층 | 제공하는 것 | 그 자체로 제공하지 않는 것 |
|---|---|---|
| Skill | 반복 task/workflow의 instruction과 지원 resource | permission, 외부 access, 이 환경에서 방법이 효과 있다는 증거 |
| MCP 서버 / connector | 외부 tool, resource, context, action으로 가는 다리 | authentication, 각 action 승인, 안전한 data boundary |
| tool | 파일 읽기, 명령 실행, API 호출 같은 관찰 가능한 action | 사용할 이유, 사용 허가, 결과 정확성 |
| Plugin | 여러 역량의 배포와 composition | 자동 authorization, 모든 component가 이용 가능하다는 보장 |

매번 같은 방식으로 실행되어야 하는 반복 로직에는 script가 낫습니다. 안정적인 output shape에는
template, 특정 상황에서만 읽을 배경 지식에는 document가 맞습니다. 방법이 반복되지만 context에 따른
판단을 계속 요구할 때 Skill이 가치 있습니다.

## 2. 범위를 제한하는 순서로 선택한다

1. 작업에 명확한 protocol이 있는지 판단하고, 없으면 먼저 분명히 한다.
2. 같은 방법이 반복되고 사람들이 단계를 빼먹으면 Skill을 고려한다.
3. 외부 data나 action이 필요할 때만 connector 또는 MCP 서버가 필요한지 묻는다.
4. 변환이 결정적이면 script를 우선한다.
5. 여러 역량을 함께 배포해야 할 때 Plugin을 배포 층으로 고려한다.
6. 그 뒤에만 설치, authentication, 추가 permission을 결정한다.

이 순서는 의도적으로 보수적입니다. 큰 디렉터리는 능력이 더 많아 보이게 하면서 실제 dependency와
permission graph를 읽기 어렵게 만듭니다.

## 3. Skill 이름이 아니라 작업 빈틈에서 시작한다

후보를 채택하기 전에 다음을 글로 답합니다.

- **task gap:** 안정적인 방법, 결정적 script, 외부 connection, 아니면 작업 정의 자체 중 무엇이 부족한가?
- **trigger / non-trigger:** 어떤 input이 발동해야 하는가? 비슷한 요청 중 무엇은 발동하지 않거나 다른 방법이 처리해야 하는가? 단어가 겹치는 것만으로는 부족하다.
- **source / revision:** 다른 reviewer가 URL, 고정 commit, version, archive hash, inventory date를 확인할 수 있는가?
- **license / dependency:** repository license가 목표 파일을 덮는가? NOTICE, nested asset, runtime dependency를 목록화했는가?
- **permission / side effect:** 무엇을 read/write 하는가? network나 account가 필요한가? send, publish, delete, modify 등 외부를 바꿀 수 있는가?
- **verification / maintenance:** 격리 시험이 positive, boundary, failure, transfer를 다루는가? 누가 approval, 유지보수, backup, update, rollback rehearsal을 맡는가?

외부 디렉터리의 항목 수는 품질 지표가 아닙니다. 자동화 package도 account, network, third-party
service 위험을 가집니다. 후보마다 자신의 evidence에 기반한 review가 필요합니다.

### Plugin에 들어가는 것과 지원이 끝나는 곳

공식 [Plugins](https://learn.chatgpt.com/docs/plugins.md) 문서는 Plugin을 설치 가능한 역량 package로
설명하며 Skills, Connectors, 또는 둘 다를 포함할 수 있다고 말합니다. Connector는 MCP 서버가
뒷받침하여 외부 시스템의 tool, shared information, action을 제공할 수 있습니다. Plugin은 배포와
composition이지 authorization이 아닙니다.

2026-08-09에 확인한 지원 문서는 ChatGPT Chat/Work의 web, desktop, mobile, ChatGPT desktop 앱의
Codex, Codex CLI의 Plugin browser를 나열합니다. IDE extension Plugin 지원은 나열하지 않습니다.
mobile에서 Chat/Work가 된다고 desktop과 같은 directory browse/install surface가 있다는 뜻은 아닙니다.

제품과 connection을 각각 증거가 필요한 사슬로 다룹니다.

```text
product support → account / organization authorization → Plugin install
→ connector authentication → 새 session → Skill/tool이 보임
→ 실제 invocation → 외부 결과 verification
```

각 화살표는 독립적인 주장입니다. `Sign in with ChatGPT`는 Plugin data access를 자동으로 주거나
action을 승인하지 않습니다. 영향을 받는 내용을 바꾸기 전
[fact impact registry](../../docs/governance/fact-impact-registry.yaml)의 `OF-015`, `OF-016`,
`UF-001`, `UF-003`, `LB-002`를 검토하세요.

2026-08-10에 확인한 공식 Skills/Plugins 자료는 auto match와 explicit selection을 다른 진입점으로
설명합니다. ChatGPT는 `@`, Codex는 `$`를 쓰며 설치 뒤 새 chat이나 CLI session도 flow에 포함합니다.
이는 변하는 제품 사실이지 Skill에 자동으로 붙는 permission이 아닙니다. 로컬 check에는 작업면,
session, 정확한 invocation, 로드 resource, behavior output, result verification이 남아야 합니다.
이 repository에는 그런 runtime record가 없으므로 상태는 `not_observed`입니다.

## 4. 채택 전 review package

설치 전 `skill-adoption-decision.md`를 만듭니다. “license를 검토했다”만으로는 부족합니다.

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

| 결정 | 뜻 | 말할 수 있는 것 | 말할 수 없는 것 |
|---|---|---|---|
| `recommendation-only` | 작업에 맞아 보이며 read-only review 또는 격리 시험을 계속함 | “더 검토할 가치가 있다” | “설치 승인됨” |
| `blocked` | license, NOTICE, revision, dependency, permission, rollback 증거가 없음 | “아직 채택하지 않는다” | “먼저 설치하고 나중에 기록” |
| `approved-to-install` | revision, scope, backup, rollback, approval point가 정의되고 수락됨 | “이 범위에서 설치 가능” | “설치됨” 또는 “검증됨” |
| `installed-candidate` | target path와 설치 기록은 보이지만 behavior review가 끝나지 않음 | “격리 설치 후보가 있다” | “팀이 채택함” 또는 “production-ready” |

프로젝트의 `draft`, `candidate`, `verified`, `production-ready`는 이 채택 결정과 별개입니다. GitHub
페이지 접근 가능성은 license를 명확히 하지 않고, manifest 존재는 tool invocation 성공을 증명하지 않습니다.

### 혼동하기 쉬운 다섯 상태

| 상태 | 최소 증거 | 증명하지 않는 것 |
|---|---|---|
| file exists | 고정 revision의 path, manifest, inventory, hash | 현재 작업면이 발견할 수 있음 |
| discovered | 현재 작업면 visible list 또는 name resolution | 이 session이 로드함 |
| loaded | 새 session의 resource 또는 instruction | 팀이 채택함 |
| adopted | 선언 scope의 owner와 approval record | behavior 검증됨 |
| verified | 선언 환경의 positive, boundary, failure, transfer evidence | 다른 account, entry, version에서 같은 동작 |

설치도 관찰 가능한 action입니다. target path와 install log는 `installed-candidate`를 뒷받침할 수 있지만,
discovery, load, adoption, behavior verification을 건너뛸 수는 없습니다.

### 두 채택 결정 사례

- **추천:** S05의 `code-review-and-quality`는 정의된 baseline이 있는 diff review에서
  `recommendation-only` 후보입니다. `https://github.com/addyosmani/agent-skills`의 local archive,
  SHA-256 `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250`, repository-level MIT
  signal이 근거입니다. nested dependency, 전체 asset set, 실제 permission, rollback은 아직 검토되지
  않았으므로 다음 단계는 read-only review 또는 offline isolated trial이지 설치가 아닙니다.
- **blocked 변형:** S06의 `webapp-testing`은 `blocked`여야 합니다. source는
  `https://github.com/composio-community/awesome-codex-skills`의 local archive, SHA-256은
  `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`입니다. root의 Apache-2.0
  signal은 있어도 각 nested Skill, script, asset에 일관된 license/NOTICE coverage가 있다는 증거는
  없습니다. asset별 review와 연습 가능한 rollback 없이는 `SKILL.md`만으로 충분하지 않습니다.

## 5. 역량을 조합하되 쌓아 올리지 않는다

```text
task protocol → domain method → tool 또는 connection → evidence review
```

저위험 marketing experiment에서는 task protocol이 goal과 boundary를 정의하고, product context method가
audience와 positioning을 주며, analytics tool이 필요한 data를 기록하고, Evidence Review가 event가 실제로
일어났는지 확인합니다. 겹치는 Skill 열 개를 여는 것보다 method 하나와 분명한 protocol이 routing과
context를 이해하기 쉬운 경우가 많습니다.

## 6. 조합 전에 handoff한다

역량이 다른 역량에 일을 넘길 때 같은 field를 씁니다.

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

domain Skill은 자기 방법을, Task Protocol은 실행 경계를, Evidence Review는 기존 claim 검토를,
Workflow Orchestrator는 phase와 checkpoint를 맡습니다. 호출된 Skill은 다른 Skill permission을 얻지
않으며 완전한 orchestration을 재귀적으로 시작해서도 안 됩니다.

## 7. 실험: 세 역량 조합 비교하기

### 준비와 작업

local, 저위험, reversible task를 고릅니다. task protocol, fixed revision Skill candidate 둘, 외부
connection이 필요할 simulated option을 준비합니다. 하나는 격리 review를 이어갈 수 있고, 하나는
license, NOTICE, rollback이 불명확해 거부되어야 합니다. real data upload, message 전송, third-party
write, 외부 account authentication은 하지 않습니다. 각 조합에 `run-id`를 주고 task text와 acceptance
rubric을 고정합니다.

같은 task에 (1) 명확한 protocol만, (2) protocol과 domain Skill, (3) protocol, domain Skill, external
connection의 세 방식을 설계합니다. 각 candidate의 pre-adoption review를 먼저 끝냅니다. 실험은
read-only입니다. 설치, authentication, team-level setting을 활성화하지 않습니다. output quality, time,
permission scope, verification cost, side effect를 비교합니다.

### 증거와 회고

세 경로, 각 `run-id`, 두 개의 adoption decision, dependency/permission table, license finding,
simulated 또는 actual output, verification result, 명시적인 “실행하지 않은 외부 action” 목록을 남깁니다.
유효 행은 source/revision을 검증 가능하게 하고, license conclusion을 실제 파일에 연결하며, install,
backup, rollback target, owner, approval point를 이름 붙이고, positive/boundary/failure/transfer를
다루며, 추가 connection 없는 baseline을 남깁니다. simulated call은 simulated라고 부릅니다.

`recommendation-only`나 `blocked`를 다음 상태로 옮기려면 어떤 evidence가 필요한지 설명하세요.
각 관찰이 existence, discovery, load, adoption, verification 중 무엇을 보이는지 기록하고 초기 상태로
후기 상태를 대신하지 않습니다.

## 의도적인 실패와 경계 사례

하나는 외부 upload를 요구하지만 작업은 local organization만 필요로 하는, 겹치는 세 Skill을 제시합니다.
또 repository는 열리고 `SKILL.md`도 있으나 license 또는 rollback이 불명확한 후보를 더합니다. 겹침을
찾고 불필요한 permission을 거부하며 불명확 후보를 `blocked`로 두고 protocol만 또는 한 Skill baseline을
보존하면 통과입니다.

## 전이

네 층 모델을 research workflow와 product report workflow에 적용하세요. 각각에서 method, connection,
script가 되어야 할 결정적 변환을 찾습니다.

## 출처와 유지보수 경계

| 사실 또는 경계 | source | 확인일 | 적용 범위 |
|---|---|---:|---|
| Skill의 task/workflow instruction과 resource, explicit selection | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) | 2026-08-09 | 당시 공식 설명; 여기서 로드됐다는 증거 아님 |
| Plugin composition, surface, install, connector authentication, approval | [Plugins](https://learn.chatgpt.com/docs/plugins.md) | 2026-08-09 | account/organization별 access 변경 가능 |
| MCP server, tool/resource/prompt, allow/deny configuration | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | authentication, tool, policy는 별도 review 필요 |
| connector/MCP action의 approval boundary | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | 이 repository의 runtime configuration 아님 |
| symbolic link와 explicit invocation discovery symptom | [Codex field research](../evidence-library-KO.md#source-notes) | 2026-08-09 | 공개 보고, 재현 또는 공식 root cause 없음 |
| candidate archive inventory와 license signal | [Skill candidate catalog](../evidence-library-KO.md#source-notes) | 2026-08-09 | project inventory, 외부 Skill 설치 승인 아님 |

Skill, Plugin, connector, MCP, manifest, authentication, invocation 세부 사항은 바뀝니다. first-party
record를 먼저 갱신하고 fact impact registry, 이 장, Labs, Skills, fixtures, site route를 검토하세요.
공식 설명, community symptom, local runtime evidence를 한 문장에 섞지 않습니다.

## 수용 체크리스트

- [ ] Skill, Plugin, MCP 서버, connector, tool, script, template, document를 구분한다.
- [ ] task gap, trigger, non-trigger, source revision, license, dependency, permission, side effect, owner, rollback을 설명한다.
- [ ] candidate를 `recommendation-only`로 두고 license나 rollback이 불명확하면 `blocked`로 표시한다.
- [ ] existence, discovery, load, adoption, verified behavior를 구분한다.
- [ ] 고정 input, acceptance, evidence boundary에서 protocol baseline과 역량 조합을 비교한다.
- [ ] 실행하지 않은 외부 action과 runtime success를 말하기 전 필요한 evidence를 설명한다.
- [ ] 이 장은 `candidate`, 비교는 `not_run`임을 보고한다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-KO.md" aria-label="이전 장: 6장 · 모델 선택은 모델 숭배가 아니다">← 이전 장<br><strong>6장 · 모델 선택은 모델 숭배가 아니다</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow-KO.md" aria-label="다음 장: 8장 · 정의에서 전달까지">다음 장 →<br><strong>8장 · 정의에서 전달까지</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
