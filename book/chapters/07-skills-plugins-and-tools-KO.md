<!-- content_id: chapter-07-skills-plugins-and-tools | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 7장: Skills, Plugins, MCP와 도구는 어떻게 역할을 나누는가

**상태:** `candidate`. **비교:** `not_run`. 이 장의 사례는 방법을 설명할 뿐,
외부 Skill이 이 저장소에서 실행되었다는 증거는 아닙니다.

**여기서 시작하세요:** 먼저 작업에서 빠진 부분을 정의하고, 그 부분을 메울 가장 작은 역량을 고릅니다.

## 이 장이 해결하는 문제

“Skill이 필요하다”는 판단이 언제나 맞는 것은 아닙니다. Skill, Plugin, MCP 서버, 커넥터,
스크립트, 템플릿, 문서는 서로 다른 문제를 해결합니다. 이들을 서로 바꿔 부를 수 있는 이름처럼
취급하면 작업에 필요 없는 역량까지 설치하고, 의존성을 숨긴 채 외부 부작용의 범위를 넓히게 됩니다.

유용한 질문은 “어느 디렉터리에 Skill이 가장 많은가?”가 아닙니다.

> 이 작업에 무엇이 부족한가? 권한, 라이선스, 의존성, 증거를 관리할 수 있는 범위 안에서
> 그 빈틈을 메울 가장 작은 역량은 무엇인가?

## 학습 목표

- 방법, 연결, 실행, 배포라는 네 층의 역할을 설명할 수 있다.
- 디렉터리가 아니라 작업을 출발점으로 최소한의 유효한 조합을 도출할 수 있다.
- Skill, Plugin, 커넥터를 채택하기 전에 트리거, 의존성, 라이선스, 권한, 부작용,
  증거를 검토할 수 있다.
- 파일의 존재, 발견, 로드, 채택, 동작 검증을 구분할 수 있다.

## 실제 문제: 작업을 시작하기도 전에 발견 단계에서 막힐 수 있다

[Codex 현장 조사](../evidence-library-KO.md#source-notes)는 공개 보고를 기록합니다.
다만 이는 증상의 기록일 뿐, 공식 원인 분석이나 로컬 재현은 아닙니다.

| 공개 증상 | 보고자가 관찰한 것 | **증명하지 않는 것** | 첫 안전 대응 |
|---|---|---|---|
| Skill은 일반 파일로 동작하지만 심볼릭 링크가 되면 발견되지 않음 | 파일 표현 방식에 따라 발견 결과가 달라짐 | 모든 스캐너, 운영체제, 릴리스에서 같은 결함이 발생함 | 정확한 파일 형식과 작업면을 보존하고, 격리 시험에서 일반 파일과 링크를 비교 |
| 명시적인 Skill 사용이 암묵적인 사용 가능 목록에 의존 | 명시한 요청을 현재 작업면의 목록과 독립된 동작으로 취급할 수 없음 | 이것이 일반적인 라우팅 규칙이나 공식 보장이라는 뜻 | 표시된 목록, 정확한 요청, 세션, 로드된 리소스를 따로 보존 |

저장소에 경로가 있다는 사실만으로 현재 호스트가 Skill을 발견했다고 할 수는 없습니다. 화면에 보이는
이름도 이 세션이 Skill을 로드했다는 증거가 아니며, 로드되었다고 해서 외부 의존성이나 권한이 실제로
작동했다는 뜻도 아닙니다.

## 1. 네 층으로 역량을 나누어 보기

선택하기 전에 무엇이 부족한지 네 층 중 어디에 해당하는지 이름 붙입니다.

```text
방법 층          Skill            특정 종류의 작업을 반복하는 방법
연결 층          MCP/connector    외부 데이터, 컨텍스트, 작업에 연결
실행 층          tool             읽기, 편집, 실행, 탐색, 호출
배포 층          Plugin           여러 역량을 배포하고 조합하는 패키지
```

실제 제품에서는 층이 겹칠 수 있지만, 설계할 때 던지는 질문은 서로 다릅니다.

| 층 | 제공하는 것 | 그 자체로 제공하지 않는 것 |
|---|---|---|
| Skill | 반복 작업이나 워크플로를 위한 지침과 지원 리소스 | 권한, 외부 접근, 이 환경에서 방법이 효과적이라는 증거 |
| MCP 서버 / 커넥터 | 외부 도구, 리소스, 컨텍스트, 작업으로 이어지는 다리 | 인증, 각 작업에 대한 승인, 안전한 데이터 경계 |
| tool | 파일 읽기, 명령 실행, API 호출처럼 관찰 가능한 동작 | 사용할 이유, 사용 허가, 결과의 정확성 |
| Plugin | 여러 역량을 배포하고 조합하는 패키지 | 자동 인증이나 모든 구성 요소를 사용할 수 있다는 보장 |

매번 같은 방식으로 실행해야 하는 반복 로직에는 스크립트가 더 적합합니다. 출력 형식을 일정하게
유지하려면 템플릿을, 특정 상황에서만 확인할 배경 지식에는 문서를 사용합니다. 방법은 반복되지만
컨텍스트에 따른 판단이 계속 필요하다면 Skill이 가치 있습니다.

## 2. 범위를 제한하는 순서로 선택한다

1. 작업에 명확한 프로토콜이 있는지 확인하고, 없으면 먼저 작업을 분명히 한다.
2. 같은 방법이 반복되고 사람들이 단계를 빼먹는다면 Skill을 고려한다.
3. 외부 데이터나 작업이 정말 필요할 때만 커넥터 또는 MCP 서버가 필요한지 묻는다.
4. 변환이 결정적이면 스크립트를 우선한다.
5. 여러 역량을 함께 배포해야 할 때 Plugin을 배포 층으로 고려한다.
6. 그 뒤에야 설치, 인증, 추가 권한을 결정한다.

이 순서는 의도적으로 보수적입니다. 큰 디렉터리는 능력이 더 많아 보이게 만들면서 실제 의존성과
권한의 연결 관계를 읽기 어렵게 합니다.

## 3. Skill 이름이 아니라 작업 빈틈에서 시작한다

후보를 채택하기 전에 다음 질문에 글로 답합니다.

- **작업 공백(task gap):** 안정적인 방법, 결정적 스크립트, 외부 연결, 아니면 작업 정의 자체 중 무엇이 부족한가?
- **trigger / non-trigger:** 어떤 입력에서 실행되어야 하는가? 비슷한 요청 중 무엇은 실행하지 않거나 다른 방법이 처리해야 하는가? 단어가 겹친다는 이유만으로는 부족하다.
- **source / revision:** 다른 리뷰어가 URL, 고정 커밋, 버전, 아카이브 해시, 인벤토리 날짜를 확인할 수 있는가?
- **license / dependency:** 저장소 라이선스가 대상 파일을 포함하는가? NOTICE, 중첩된 에셋, 런타임 의존성을 목록화했는가?
- **permission / side effect:** 무엇을 읽고 쓰는가? 네트워크나 계정이 필요한가? 전송, 게시, 삭제, 수정 등 외부를 바꿀 수 있는가?
- **verification / maintenance:** 격리 시험이 정상, 경계, 실패, 이전 사례를 다루는가? 승인, 유지보수, 백업, 업데이트, 롤백 리허설을 누가 맡는가?

외부 디렉터리의 항목 수는 품질 지표가 아닙니다. 자동화 패키지에도 계정, 네트워크, 서드파티
서비스와 관련된 위험이 있습니다. 후보마다 확인한 증거를 바탕으로 검토해야 합니다.

### Plugin에 들어가는 것과 지원이 끝나는 곳

공식 [Plugins](https://learn.chatgpt.com/docs/plugins.md) 문서는 Plugin을 설치 가능한 역량 패키지로
설명하며 Skills, Connectors 또는 둘 다를 포함할 수 있다고 말합니다. Connector는 MCP 서버를 통해
외부 시스템의 도구, 공유 정보, 작업을 제공할 수 있습니다. Plugin은 배포와 조합을 위한 수단이지
인증이나 권한 부여 자체가 아닙니다.

2026-08-09에 확인한 지원 문서는 ChatGPT Chat/Work의 웹, 데스크톱, 모바일, ChatGPT 데스크톱 앱의
Codex, Codex CLI의 Plugin browser를 나열합니다. IDE 확장의 Plugin 지원은 나열하지 않습니다.
모바일에서 Chat/Work를 사용할 수 있다고 해서 데스크톱과 같은 디렉터리 탐색·설치 화면이 있다는 뜻은 아닙니다.

제품과 connection을 각각 증거가 필요한 사슬로 다룹니다.

```text
product support → account / organization authorization → Plugin install
→ connector authentication → 새 session → Skill/tool이 보임
→ 실제 invocation → 외부 결과 verification
```

각 화살표는 독립적인 주장입니다. `Sign in with ChatGPT`만으로 Plugin 데이터에 자동으로 접근할 수 있게 되거나
작업이 승인되는 것은 아닙니다. 영향을 받는 내용을 바꾸기 전
[fact impact registry](../../docs/governance/fact-impact-registry.yaml)의 `OF-015`, `OF-016`,
`UF-001`, `UF-003`, `LB-002`를 검토하세요.

2026-08-10에 확인한 공식 Skills/Plugins 자료는 자동 매칭과 명시적 선택을 서로 다른 진입점으로
설명합니다. ChatGPT는 `@`, Codex는 `$`를 사용하며 설치 후 새 채팅이나 CLI 세션도 흐름에 포함됩니다.
이는 변할 수 있는 제품 사실이지 Skill에 자동으로 붙는 권한이 아닙니다. 로컬에서 확인할 때는 작업면,
세션, 정확한 호출, 로드된 리소스, 동작 출력, 결과 검증을 기록해야 합니다. 이 저장소에는 그런
런타임 기록이 없으므로 상태는 `not_observed`입니다.

## 4. 채택 전에 남길 검토 기록

설치 전 `skill-adoption-decision.md`를 만듭니다. “라이선스를 검토했다”라고 한 줄 적는 것만으로는 부족합니다.
다른 사람이 같은 판단을 따라갈 수 있을 정도로 기록하세요.

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

| 결정 | 뜻 | 여기까지 말할 수 있음 | 여기서부터는 말할 수 없음 |
|---|---|---|---|
| `recommendation-only` | 작업에 맞아 보이며 read-only review 또는 격리 시험을 계속함 | “더 검토할 가치가 있다” | “설치 승인됨” |
| `blocked` | license, NOTICE, revision, dependency, permission, rollback 증거가 없음 | “아직 채택하지 않는다” | “먼저 설치하고 나중에 기록” |
| `approved-to-install` | revision, scope, backup, rollback, approval point가 정의되고 수락됨 | “이 범위에서 설치 가능” | “설치됨” 또는 “검증됨” |
| `installed-candidate` | target path와 설치 기록은 보이지만 behavior review가 끝나지 않음 | “격리 설치 후보가 있다” | “팀이 채택함” 또는 “production-ready” |

프로젝트의 `draft`, `candidate`, `verified`, `production-ready`는 이 채택 결정과 별개입니다. GitHub
페이지에 접근할 수 있다는 사실만으로 라이선스가 명확해지는 것은 아니며, 매니페스트가 있어도 도구 호출이 성공했다는 뜻은 아닙니다.

### 혼동하기 쉬운 다섯 상태

| 상태 | 최소 증거 | 증명하지 않는 것 |
|---|---|---|
| file exists | 고정 revision의 path, manifest, inventory, hash | 현재 작업면이 발견할 수 있음 |
| discovered | 현재 작업면 visible list 또는 name resolution | 이 session이 로드함 |
| loaded | 새 session의 resource 또는 instruction | 팀이 채택함 |
| adopted | 선언 scope의 owner와 approval record | behavior 검증됨 |
| verified | 선언 환경의 positive, boundary, failure, transfer evidence | 다른 account, entry, version에서 같은 동작 |

설치도 관찰 가능한 동작입니다. 대상 경로와 설치 로그는 `installed-candidate`를 뒷받침할 수 있지만,
발견, 로드, 채택, 동작 검증을 건너뛸 수는 없습니다.

### 두 채택 결정 사례

- **추천:** S05의 `code-review-and-quality`는 기준 상태가 정의된 diff review에서
  `recommendation-only` 후보입니다. 근거는 `https://github.com/addyosmani/agent-skills`의 로컬 아카이브,
  SHA-256 `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250`, 저장소 수준의 MIT
  신호입니다. 중첩 의존성, 전체 에셋, 실제 권한, 롤백은 아직 검토하지 않았으므로 다음 단계는
  읽기 전용 검토나 오프라인 격리 시험이지 설치가 아닙니다.
- **blocked 변형:** S06의 `webapp-testing`은 `blocked`로 둡니다. 출처는
  `https://github.com/composio-community/awesome-codex-skills`의 로컬 아카이브이며 SHA-256은
  `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`입니다. 루트에 Apache-2.0
  신호가 있더라도 중첩된 각 Skill, 스크립트, 에셋까지 일관된 라이선스/NOTICE 적용 범위라는 증거는
  없습니다. 에셋별 검토와 실행 가능한 롤백이 없으면 `SKILL.md`만으로는 충분하지 않습니다.

## 5. 역량은 조합하되 무작정 쌓지 않는다

```text
task protocol → domain method → tool 또는 connection → evidence review
```

저위험 마케팅 실험에서는 task protocol이 목표와 경계를 정하고, product context method가 대상과 포지셔닝을
정리하며, analytics tool이 필요한 데이터를 기록하고, Evidence Review가 이벤트가 실제로 일어났는지 확인합니다.
서로 겹치는 Skill 열 개를 여는 것보다 방법 하나와 분명한 프로토콜이 라우팅과 컨텍스트를 이해하기 쉬운 경우가 많습니다.

## 6. 조합 전에 handoff한다

역량이 다른 역량에 일을 넘길 때 같은 field를 씁니다.

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

도메인 Skill은 자신의 방법을, Task Protocol은 실행 경계를, Evidence Review는 기존 주장의 검토를,
Workflow Orchestrator는 단계와 체크포인트를 맡습니다. 호출된 Skill은 다른 Skill의 권한을 얻지 않으며,
완전한 오케스트레이션을 재귀적으로 시작해서도 안 됩니다.

## 7. 실험: 세 역량 조합 비교하기

### 준비

로컬에서 저위험이고 되돌릴 수 있는 작업을 고릅니다. task protocol, 고정된 리비전의 Skill 후보 두 개,
외부 연결이 필요한 시뮬레이션 옵션을 준비합니다. 하나는 격리 검토를 계속할 수 있어야 하고, 다른 하나는
라이선스, NOTICE, 롤백이 불명확해 거부되어야 합니다. 실제 데이터 업로드, 메시지 전송, 제3자 쓰기,
외부 계정 인증은 하지 않습니다. 각 조합에 `run-id`를 붙이고 작업 문구와 acceptance rubric을 고정합니다.

### 작업

같은 작업에 (1) 명확한 프로토콜만, (2) 프로토콜과 도메인 Skill, (3) 프로토콜·도메인 Skill·외부 연결의
세 방식을 설계합니다. 각 후보의 채택 전 검토를 먼저 끝냅니다. 실험은 읽기 전용입니다. 설치, 인증,
팀 단위 설정은 활성화하지 않습니다. 출력 품질, 시간, 권한 범위, 검증 비용, 부작용을 비교합니다.

### 증거와 회고

세 경로, 각 `run-id`, 두 개의 adoption decision, 의존성/권한 표, 라이선스 확인 결과,
시뮬레이션 또는 실제 출력, 검증 결과, 명시적인 “실행하지 않은 외부 동작” 목록을 남깁니다.
유효한 기록은 source/revision을 검증할 수 있게 하고, 라이선스 결론을 실제 파일에 연결하며, 설치·백업·
롤백 대상, 담당자, 승인 지점을 명시합니다. 또한 정상·경계·실패·이전 사례를 다루고, 추가 연결 없는
기준 상태를 남깁니다. 시뮬레이션 호출은 반드시 시뮬레이션이라고 표시합니다.

`recommendation-only`나 `blocked`를 다음 상태로 옮기려면 어떤 evidence가 필요한지 설명하세요.
각 관찰이 existence, discovery, load, adoption, verification 중 무엇을 보이는지 기록하고 초기 상태로
후기 상태를 대신하지 않습니다.

## 의도적인 실패와 경계 사례

서로 겹치는 세 Skill을 제시합니다. 그중 하나는 작업에 로컬 정리만 필요해도 외부 업로드를 요구합니다.
또한 저장소에 접근할 수 있고 `SKILL.md`도 있지만 라이선스나 롤백이 불명확한 후보를 추가합니다. 겹침을
찾고 불필요한 권한을 거부하며 불명확한 후보를 `blocked`로 두고 프로토콜만 또는 하나의 Skill 기준 상태를
보존하면 통과입니다.

## 전이 과제

네 층 모델을 research workflow와 product report workflow에 적용하세요. 각각에서 방법과 연결을 구분하고,
스크립트로 옮겨야 할 결정적 변환을 찾습니다.

## 출처 및 유지보수 경계

| 사실 또는 경계 | source | 확인일 | 적용 범위 |
|---|---|---:|---|
| Skill의 task/workflow instruction과 resource, explicit selection | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) | 2026-08-09 | 당시 공식 설명; 여기서 로드됐다는 증거 아님 |
| Plugin composition, surface, install, connector authentication, approval | [Plugins](https://learn.chatgpt.com/docs/plugins.md) | 2026-08-09 | account/organization별 access 변경 가능 |
| MCP server, tool/resource/prompt, allow/deny configuration | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | authentication, tool, policy는 별도 review 필요 |
| connector/MCP action의 approval boundary | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | 이 repository의 runtime configuration 아님 |
| symbolic link와 explicit invocation discovery symptom | [Codex field research](../evidence-library-KO.md#source-notes) | 2026-08-09 | 공개 보고, 재현 또는 공식 root cause 없음 |
| candidate archive inventory와 license signal | [Skill candidate catalog](../evidence-library-KO.md#source-notes) | 2026-08-09 | project inventory, 외부 Skill 설치 승인 아님 |

Skill, Plugin, 커넥터, MCP, 매니페스트, 인증, 호출의 세부 사항은 바뀝니다. 먼저 공식 기록을 갱신하고
fact impact registry, 이 장, Labs, Skills, fixtures, site route를 차례로 검토하세요. 공식 설명,
커뮤니티 증상, 로컬 런타임 증거를 한 문장에 섞지 마세요.

## 수용 체크리스트

- [ ] Skill, Plugin, MCP 서버, connector, tool, script, template, document를 구분한다.
- [ ] 작업 공백(task gap), trigger, non-trigger, source revision, license, dependency, permission, side effect, owner, rollback을 설명한다.
- [ ] candidate를 `recommendation-only`로 두고 license나 rollback이 불명확하면 `blocked`로 표시한다.
- [ ] existence, discovery, load, adoption, verified behavior를 구분한다.
- [ ] 고정 input, acceptance, evidence boundary에서 protocol baseline과 역량 조합을 비교한다.
- [ ] 실행하지 않은 외부 action과 runtime success를 말하기 전 필요한 evidence를 설명한다.
- [ ] 이 장은 `candidate`, 비교는 `not_run`임을 보고한다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 내비게이션">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-KO.md" aria-label="이전 장: 6장 · 6장: 모델 선택은 모델 숭배가 아니다">← 이전<br><strong>6장 · 6장: 모델 선택은 모델 숭배가 아니다</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="08-full-lifecycle-workflow-KO.md" aria-label="다음 장: 8장 · 8장: 정의에서 전달까지">다음 →<br><strong>8장 · 8장: 정의에서 전달까지</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
