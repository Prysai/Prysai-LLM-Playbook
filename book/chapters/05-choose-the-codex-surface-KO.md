<!-- content_id: chapter-05-choose-the-codex-surface | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# 5장: 알맞은 Codex 작업면 선택하기

**상태:** `candidate`. 이 장에는 구조화된 선택 방법과 출처에 근거한 제품 경계가
있지만, 독립 학습자 사전 테스트는 아직 통과하지 않았습니다. 이 장만으로 계정 수준
기능, Cloud 실행 또는 모델 비교를 추론해서는 안 됩니다.

## 이 장이 해결하는 문제

같은 목표도 데스크톱 앱, CLI, IDE 확장, 웹 흐름에서 시작할 수 있습니다. 로컬,
Git worktree 또는 Cloud 환경에서 실행될 수도 있습니다. 이것들은 서로 다른 결정입니다.

사람들은 여러 단계를 한 문장으로 뭉뚱그리기 쉽습니다.

~~~
“브라우저 로그인이 됐고, 모델이 선택기에 보이고, setup도 끝났으니 이제 작업할 수 있다.”
~~~

이 문장은 여러 독립된 이유로 틀릴 수 있습니다. 대상 저장소를 읽지 못할 수 있고,
선택한 모델을 그 작업면에서 쓸 수 없을 수 있으며, 터미널·브라우저·connector·파일
도구가 없을 수 있습니다. Cloud setup 스크립트에는 네트워크가 있어도 뒤의 Agent
단계에는 없을 수 있습니다. Worktree 라벨이 보여도 shell이나 IDE는 다른 checkout을
가리킬 수 있습니다.

더 유용한 순서는 다음과 같습니다.

~~~
작업면 선택
→ 진입점 선택
→ 대상과 계정 경계 확인
→ 모델과 도구 확인
→ 가장 작은 행동 실행
→ 전달 전 증거 검토
~~~

*작업면*은 실행이 일어나고 변경이 남는 곳입니다. *진입점*은 사람이 그 작업을
시작하고 검토하는 방법입니다. CLI, IDE, 데스크톱, 웹은 Local, Worktree, Cloud의
다른 이름이 아닙니다.

## 학습 목표

이 장을 마치면 다음을 할 수 있습니다.

- 컨텍스트, 데이터 경계, 부작용, 증거, 복구 요구로 `Local`, `Worktree`, `Cloud`를 고른다.
- 작업면과 데스크톱·CLI·IDE·웹 진입점을 구분한다.
- 대상 리소스 접근, 모델 가용성, 도구 가용성을 별개의 주장으로 확인한다.
- Cloud의 `setup`과 `agent` 증거, 네트워크 및 비밀 정보 수명을 따로 기록한다.
- 선택한 안뿐 아니라 거부 및 미관찰 안도 남기는 `surface-decision.md`를 만든다.
- 다음 확인에 작업보다 넓은 권한이 필요하면 안전하게 중단한다.

## 실제 진입점: 단계가 단서다

프로젝트의 현장 조사는 GitHub Issues, Stack Exchange와 공개 토론의 사용자 보고를
수집합니다. 이는 증상 보고이지 로컬 재현, 공식 근본 원인, 보장된 해결책이 아닙니다.
가치는 사람들이 흔히 혼동하는 주장을 드러내는 데 있습니다.

| 공개 보고 범주 | 관찰된 것 | **증명하지 않는 것** | 첫 안전 확인 |
|---|---|---|---|
| OAuth는 성공하지만 token exchange는 실패 | 브라우저 인증 페이지는 끝나지만 클라이언트가 교환을 못 끝냄 | CLI 세션, 대상 host, 저장소가 쓸 수 있음 | 인증, callback, exchange, 첫 무해한 리소스 읽기를 네 단계로 기록 |
| 사용자 provider가 도구 하나만 노출 | 설정은 받아들이지만 shell, files, browser가 없음 | 모델이나 provider가 빠진 행동을 할 수 있음 | 실제 도구 목록을 저장하고 등록과 호출을 따로 시험 |
| Worktree와 checkout이 다름 | UI는 Worktree라 하지만 `cwd`, IDE root, patch 대상, Git 메타데이터가 다름 | 편집 프로세스의 격리가 성립함 | 절대 경로, `.git` 형태, workspace root, `git status`를 읽고 다르면 쓰기 중단 |
| Cloud setup은 성공했지만 비밀 또는 네트워크를 못 씀 | 의존성을 설치하거나 setup 표시가 생긴 뒤 Agent가 서비스에 닿지 못함 | setup과 Agent의 네트워크·비밀이 같은 능력 | setup/Agent 로그, 네트워크 단계, 비밀 수명, diff를 따로 기록 |
| allowlist가 GitHub 등 host를 막음 | proxy, sandbox, 기업 네트워크 정책에서 요청 실패 | 모든 네트워크 권한 확대가 맞거나 승인됨 | 좁은 변경을 요청하기 전 sandbox, allowlist, DNS/TLS, firewall 가설을 분리 |

원래 링크와 날짜는 [현장 문제 색인](../evidence-library-KO.md#source-notes),
[작업면 조사](../evidence-library-KO.md#source-notes),
[포럼 조사](../evidence-library-KO.md#source-notes)에서 확인하세요.
조사 기록은 이 프로젝트가 재현하지 않은 내용도 의도적으로 밝힙니다.

### 현장 사례: 첫 쓰기 전에 대상을 확인한다

![현장 신호와 가장 작은 안전 응답](../../assets/teaching/field-signal-to-safe-degradation-red-black.svg)

범위를 정한 [FC-WORKTREE-01](../evidence-library-KO.md#source-notes)은
worktree 관련 공개 보고를 대상 동일성 연습으로 바꿉니다. 2026-08-12 조사
스냅샷에는 공개된 maintainer의 근본 원인 확인이 없었고, 프로젝트도 그 보고를
재현하지 않았습니다. 교훈은 더 좁습니다. Local에서 Worktree로 넘긴 뒤 편집,
branch 작업, build, test 전에 의도한 checkout과 shell `cwd`, Git top-level,
worktree 목록, branch/HEAD, 쓰기 가능한 root를 비교합니다. 신호 하나라도 다르면
안전한 결과는 쓰기 중단이지, 어느 작업면이 맞는지 추측하는 것이 아닙니다.

## 1. 사람들이 섞어 생각하는 세 층

### 작업면: 실행과 변경이 일어나는 곳

공식 환경 문서는 Codex chat의 세 작업면을 설명합니다.

| 작업면 | 작업이 실행되는 곳 | 쓸모 | 그것만으로 증명하지 않는 것 |
|---|---|---|---|
| `Local` | 사용자 컴퓨터의 현재 프로젝트 디렉터리 | 빠른 검사, 작은 로컬 편집, 현재 checkout에 남겨야 하는 작업 | 현재 디렉터리가 안전하고 깨끗하며 올바른 대상임 |
| `Worktree` | 사용자 컴퓨터의 별도 Git worktree | main checkout과 변경을 분리하고 집중된 diff 검토 | 모든 프로세스가 같은 worktree로 옮겨 갔음, 네트워크나 계정 권한이 바뀜 |
| `Cloud` | 구성된 원격 환경 | 원격 격리 runtime과 저장소 checkout이 맞는 긴 또는 병렬 작업 | 이번 run에 계정, 저장소, 도구, 네트워크, 비밀, 최종 diff가 있음 |

`Local`과 `Worktree`는 모두 로컬 실행입니다. Worktree는 Git 격리 수단이지 보편적
보안 경계가 아닙니다. Cloud는 실행 경계이지 setup, Agent runtime, 외부 연결이
준비되었다는 증거가 아닙니다.

### 진입점: 시작하고 검토하는 방법

진입점은 상호작용 방식을 바꾸지만 실행 경계를 자동으로 바꾸지는 않습니다.

| 진입점 | 장점 | 일반적인 검토 증거 |
|---|---|---|
| 데스크톱 앱 | 보이는 작업 상태, 환경 선택, 대화형 검토 | 환경 라벨, task events, summary, diff, 수동 확인 |
| CLI | 명시적 경로·명령·스크립트, 반복 가능한 로컬 작업 | `cwd`, command output, exit code, Git status, diff, 저장한 logs |
| IDE 확장 | 가까운 편집기 문맥, 선택 파일, 편집기 내 diff | workspace root, 선택 문맥, patch, 집중 diff |
| 웹 / Cloud 흐름 | 원격 setup, 긴 실행, handoff형 검토 | repository/branch, setup 증거, Agent 증거, summary, diff |

CLI는 Local checkout이나 Worktree에서 모두 실행될 수 있습니다. IDE는 Worktree에
붙어 있어도 별도 shell은 원래 checkout에 남을 수 있습니다. “CLI를 썼다”는
“편집은 어디에서 일어났나”라는 질문의 답이 아닙니다.

## 2. 능력은 로그인 배지가 아니라 사슬이다

가용성을 다음 주장 사슬로 취급합니다.

~~~
공식 제품 지원
→ 현재 account / workspace / organization 승인
→ 대상 리소스를 읽을 수 있음
→ 후보 모델이 이 작업면에서 사용 가능
→ 필요한 도구가 등록됨
→ 필요한 도구를 이 단계에서 호출 가능
→ 구체적 행동이 끝남
→ 결과가 검증됨
~~~

각 화살표에는 고유한 증거가 필요합니다. 앞 단계의 성공은 뒤 단계 확인을 대신하지
않습니다.

| 관찰 | 뒷받침할 수 있는 것 | 단독으로 뒷받침하지 못하는 것 |
|---|---|---|
| 브라우저 인증 페이지 완료 | 인증 페이지가 성공 상태에 도달 | token exchange, 대상 host 또는 저장소 접근 |
| 모델이 picker에 표시 | 선택할 때 모델이 보였음 | 다른 작업면 가용성, 도구 접근, 작업 품질 |
| 디렉터리에 쓸 수 있음 | 그 경로와 시점에 write probe 성공 | 올바른 저장소 대상, 원격 승인, 안전한 전달 |
| 도구 이름이 보임 | 능력이 광고되거나 등록됨 | 도구 실행, 필요한 자격 정보, 원하는 부작용 허용 |
| Cloud setup이 의존성을 설치 | setup이 그 단계까지 감 | Agent 단계 네트워크, 비밀 접근, 작업 완료, 검증된 diff |
| UI가 `Completed` 표시 | 제품 상태가 표시됨 | review, test 통과, deploy, push, 사용자 수용 |

사슬이 끊기면 끊긴 단계를 이름으로 기록하세요. “이 작업”을 “제품이 일반적으로 지원”으로
바꿔 주장을 강하게 만들지 마세요.

## 3. 다섯 관문으로 작업면을 고른다

후보 작업면을 다음 순서로 평가합니다. 편한 진입점이나 선호 모델이 위험한 환경 선택을
먼저 좌우하지 못하게 합니다.

### 관문 1: 컨텍스트

작업면이 필요한 정확한 프로젝트 규칙, 대상 파일, 버전, 수용 입력을 읽을 수 있나요?
모르면 저장소 이름이나 성공한 로그인으로 추론하지 않습니다.

### 관문 2: 데이터 경계와 격리

데이터는 현재 컴퓨터, 버릴 수 있는 worktree, 승인된 원격 환경 중 어디에 있어야 하나요?
비밀, 고객 데이터, 비공개 소스, 미커밋 작업이 경계를 넘으면 안 되나요? 원격 작업면은
데이터 전송을 정당화해야 하고, 로컬 작업면도 복구 가능한 기준점을 가져야 합니다.

### 관문 3: 행동과 부작용

작업은 읽기 전용, 로컬 편집, branch 변경, repository push, 외부 API 호출, 운영 행동 중
무엇인가요? 필요한 행동을 지원하는 가장 작은 작업면을 고릅니다. 진단을 쉽게 하려고
네트워크나 원격 쓰기 권한을 주지 마세요.

### 관문 4: 증거

다른 사람이 주장에 대응하는 자료를 검사할 수 있나요? path echo, 대상 읽기, 도구 목록,
command output, diff, test result, Cloud log, 사람의 승인이 예입니다. 행동은 가능하지만
검토 가능한 증거를 남기지 못하는 작업면은 고위험 작업에 좋지 않습니다.

### 관문 5: 복구

인증 실패, 네트워크 단절, 의존성 누락, Agent의 부분 변경 때 상태를 보존하고 알려진
checkpoint에서 재개할 수 있나요? 못하면 작업면을 거부하거나 읽기 전용 probe로 낮춥니다.

### 실용적인 선택표

| 작업 형태 | 유력 후보 | 이유 | 행동 전 필요 증거 |
|---|---|---|---|
| 공개 문서를 읽고 로컬 노트 작성 | `Local` | 원격 쓰기나 특별 격리 불필요 | 올바른 checkout, source list, 출력 경로 |
| 미커밋 작업을 보호하며 공유 저장소 편집 | `Worktree` | 기준점과 diff를 분리하기 좋음 | worktree path, branch/commit, `.git` 형태, Git status |
| 승인된 저장소에 긴 병렬 변경 실행 | `Cloud` | 원격 격리와 handoff가 맞을 수 있음 | 연결 repository, environment, setup/Agent 단계, logs, 최종 diff |
| 고객 데이터를 외부 connector로 전송 | 자동 선택 없음 | data owner, 대상, 승인, 보존 검토 필요 | 정확한 payload, 대상 account, 승인, rollback/보상, 도구 증거 |
| 누락 도구나 접근 불가 경로 진단 | 먼저 현재 작업면에서 읽기 전용 | 실패 경계를 보존함 | tool inventory, 절대 경로, 설정 source, error output |

표는 후보를 제시할 뿐 자동 권한이 아닙니다. 보통 알맞은 작업면이어도 작업은 `blocked`일 수
있습니다.

## 4. 행동 전에 결정 카드를 쓴다

읽기 전용 설명보다 큰 작업이면 `surface-decision.md`를 만드세요. 거부한 카드도
보존합니다. 그럴듯한 선택지를 왜 택하지 않았는지 기록합니다.

~~~
task_id:
task_goal:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | other
decision: selected | rejected | blocked | not_observed

required_context:
context_readable: yes | no | not_observed
context_evidence:
data_boundary:
allowed_side_effects:
isolation_and_git_delivery:

account_authorized: yes | no | not_observed
authorization_evidence:
target_resource_readable: yes | no | not_observed
resource_read_evidence:

model_id:
surface_available: yes | no | not_observed
availability_evidence:
required_tools:
tools_available: yes | no | not_observed
tool_evidence:

setup_action: not_applicable | concrete action
setup_evidence:
agent_action: not_applicable | concrete action
agent_evidence:
network_phase: local_policy | setup | agent | not_observed
secret_lifetime: none | setup_only | full_task_env | not_observed
result_review:

recovery_path:
rejection_or_block_reason:
checked_at:
reviewer:
~~~

작업을 실행하지 않았거나 증거를 모으지 않았다면 `not_observed`를 씁니다. 양식을 채우기
위해 관찰 없는 항목을 `yes`나 `no`로 바꾸지 마세요.

## 5. Cloud에는 setup 단계와 Agent 단계가 있다

공식 Cloud 문서는 setup과 Agent 실행을 서로 다른 수명 주기 부분으로 다룹니다. setup은
네트워크로 의존성을 설치할 수 있습니다. 설정을 바꾸지 않으면 Agent 단계는 보통 offline입니다.
환경의 비밀은 setup에만 있고 Agent 전에 제거될 수 있습니다.

다음을 따로 기록합니다.

~~~
setup_action / setup_evidence
agent_action / agent_evidence
network_phase
secret_lifetime
result_review
~~~

“setup script가 package를 설치했다”는 setup의 증거일 뿐입니다. Agent가 package 서비스에
도달한다는 증거가 아닙니다. “비밀이 환경 설정에 있다”도 task runtime이 읽는다는 증거가
아닙니다. 현재 단계와 데이터 경로를 보일 때까지 외부 호출을 멈추는 편이 안전합니다.

## 6. 작은 관찰 실험: 같은 작업, 세 카드

**실험 상태:** `not_run`. 아래 프로토콜은 연습 설계이며, 이 저장소가 Local, Worktree,
Cloud에서 세 카드 작업을 실행했다는 기록이 아닙니다.

### 준비

버릴 수 있는 Markdown 파일, 짧은 수용 체크리스트, remote 없는 임시 Git 저장소를 준비합니다.
비밀, 개인 데이터, 외부 메시지, 설치, 공개, push, 운영 대상을 쓰지 않습니다.

### 작업

고정 작업은 다음입니다.

> `brief.md`를 읽고 `draft.md`의 지정된 문구 하나만 바꾸고, 읽기 전용 형식 검사를 하나
> 실행한 뒤 diff를 보고한다. 다른 파일은 바꾸지 않는다.

### 절차

1. 실행 전에 Local, Worktree, Cloud 카드를 채웁니다.
2. 각 카드에 다섯 관문을 적용합니다.
3. 후보마다 절대 경로, 대상 읽기, 도구 목록, 모델 표시, 허용 부작용을 기록합니다.
4. 무해한 편집에 충분한 증거가 있는 카드 하나만 선택합니다. 나머지는 이유와 함께 `rejected`, `blocked`, `not_observed`로 표시합니다.
5. diff, 검사 출력, run-id, 정확한 작업면/진입점을 저장합니다.
6. 경로·도구·대상·단계 증거가 바뀌면 권한을 넓히지 말고 중단하여 checkpoint를 보존합니다.

### 최소 증거

~~~
run_id | surface | entry | checkout_or_environment
target_read | model_visible | tools_available
setup_status | agent_status | network_phase | secret_lifetime
decision | diff_path | check_output | reviewer
~~~

통과 기록은 파일 변경보다 많은 것을 보여줍니다. 왜 한 작업면을 골랐고 다른 후보를 거부했는지,
어떤 증거가 최종 주장을 지지하는지 보여줍니다. Cloud를 실행하지 않았다면 카드에
`not_observed`라고 써야 합니다.

### 보존할 증거

결정 카드, 절대 경로, 대상 읽기 결과, 도구 목록, 보인 모델, 단계 상태, diff, 검사 출력,
reviewer 기록을 저장합니다. 빠진 관찰을 UI 라벨만으로 채우지 마세요.

## 7. 실패 패턴과 안전한 축소

| 실패 | 올바른 해석 | 안전한 축소 |
|---|---|---|
| 로그인 성공, 대상 읽기 실패 | identity와 resource access는 다른 단계 | 대상 읽기 증거에서 멈추고 작업을 `blocked`로 둠 |
| 모델은 보이지만 도구 없음 | 모델 선택과 도구 등록은 다름 | text-only 계획이나 알려진 지원 작업면으로 계속; 권한을 맹목적으로 넓히지 않음 |
| Worktree 선택, 경로 불일치 | 격리 메타데이터와 프로세스 작업 디렉터리가 어긋남 | 쓰기 중단, 경로와 Git 상태 검사, 사람 확인 요청 |
| Cloud setup 통과, Agent 실패 | setup 증거는 Agent 증거를 포함하지 않음 | setup은 `passed`, Agent는 `failed`/`not_observed`, 작업은 `blocked`로 보존 |
| 네트워크 요청이 막힘 | sandbox, proxy, DNS/TLS, 기업 정책이 원인 후보 | 요청을 좁히고 오류를 보존; 진단하려고 무제한 네트워크로 전환하지 않음 |
| 새 event 없는 긴 대기 | 진행 또는 완료라고 부를 증거 부족 | 작업면 정책에 따라 stop/cancel하고 마지막 checkpoint 보존 |

이는 진단 상태이지 보편적 제품 버그 진단이 아닙니다. 커뮤니티 해결책은 관련 공식 행동과
현재 runtime을 확인하기 전까지 가설입니다.

## 회고

기억이 아니라 결정 카드와 증거로 답하세요.

- 선택을 바꾼 관문은 컨텍스트, 데이터 경계, 행동, 증거, 복구 중 무엇인가요?
- 어느 앞 단계의 성공을 가장 과장해서 말하고 싶었나요?
- 선택한 진입점은 실행, 검토, 둘 다에 도움이 됐나요?
- 잘못된 작업면과 account permission 또는 tool 부족을 가를 추가 관찰 하나는 무엇인가요?
- 고객 비공개 데이터가 있다면 데이터 경계와 승인 기록은 어떻게 달라지나요?

## 전환 과제

공개 source에는 browser, 가린 증거에는 로컬 shell, 민감 파일에는 격리 환경을 쓰는 research
작업에 이 방법을 옮기세요. 카드를 다시 채우고 이 장의 작업면 선택을 그대로 복사하지 마세요.

## 수용 체크리스트

다음이 가능하면 다음으로 갈 수 있습니다.

- `Local`, `Worktree`, `Cloud`의 차이를 설명한다.
- 데스크톱, CLI, IDE, 웹이 작업면과 같은 범주가 아니라 진입점임을 설명한다.
- 선택 하나와 명시적 거부/미관찰 이유를 담은 카드 세 장을 만든다.
- account authorization, resource readability, model visibility, tool registration, tool invocation, action completion, result review를 구분한다.
- Cloud setup/Agent, network phase, secret lifetime을 따로 기록한다.
- 다음 증명이 작업 계약보다 넓은 권한을 요구할 때 중단하거나 축소한다.

## 출처와 업데이트 경계

결정 방법은 안정적인 교육 방법입니다. 제품 작업면, 모델 행렬, permission mode, Cloud
lifecycle, 도구 가용성, 진입점 지원은 변할 수 있습니다. 현재 제품 주장을 하기 전에는
날짜가 있는 source record를 사용하세요.

| 변하는 사실 | 일차 출처 | 확인일 | 범위 경계 |
|---|---|---|---|
| Codex chat 작업면에는 Local, Worktree, Cloud가 포함됨 | https://learn.chatgpt.com/docs/environments/modes.md | 2026-08-09 | 공식 환경 설명이며 이 account/task가 각 작업면을 쓸 수 있다는 증거는 아님 |
| Cloud setup과 Agent는 별 단계임 | https://learn.chatgpt.com/docs/environments/cloud-environment.md | 2026-08-09 | 공식 Cloud lifecycle이며 여기서 Cloud task를 실행했다는 증거는 아님 |
| setup/Agent 네트워크와 비밀 수명은 별 경계임 | https://learn.chatgpt.com/docs/environments/cloud-environment.md; https://learn.chatgpt.com/docs/cloud/internet-access.md | 2026-08-09 | 조직 정책과 runtime 증거도 필요 |
| Local 권한과 승인은 별 계층임 | https://learn.chatgpt.com/docs/agent-approvals-security.md | 2026-08-09 | 공식 보안 모델이며 현재 세션의 유효 설정을 증명하지 않음 |
| CLI, IDE, Cloud, 모델 지원은 작업면마다 다름 | https://learn.chatgpt.com/docs/codex/cli.md; https://learn.chatgpt.com/docs/codex/ide.md; https://learn.chatgpt.com/docs/cloud.md; https://learn.chatgpt.com/docs/models.md | 2026-08-09 | account, workspace, rollout, version에 따라 가용성이 바뀔 수 있음 |

[공식 사실 카드](../evidence-library-KO.md#source-notes)는 프로젝트의
날짜별 요약과 한계를 제공합니다. [현장 문제 조사](../evidence-library-KO.md#source-notes)와
관련 작업면/포럼 기록은 공개 사용자 보고를 제공합니다. 어느 것도 현재 account-level 또는
runtime 관찰을 대신하지 않습니다.

## 이 장의 증거 경계

이 장은 `candidate` 콘텐츠 산출물이고 실험은 `not_run`입니다. 이 저장소는 이 장의 일부로
Cloud 환경을 만들거나, 세 카드 작업을 실행하거나, 모델 행렬을 검증하거나, 모든 공개 보고를
재현하지 않았습니다. 나중에 주장을 바꾸려면 run-id, environment, 정확한 입력, tool inventory,
diff, check output, reviewer를 저장해야 합니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 내비게이션">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="04-context-permissions-and-agent-KO.md" aria-label="이전 장: 4장 · 4장: 컨텍스트, 권한, Agent의 행동 경계">← 이전<br><strong>4장 · 4장: 컨텍스트, 권한, Agent의 행동 경계</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="06-model-selection-KO.md" aria-label="다음 장: 6장 · 6장: 모델 선택은 모델 숭배가 아니다">다음 →<br><strong>6장 · 6장: 모델 선택은 모델 숭배가 아니다</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
