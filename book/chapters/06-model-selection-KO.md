<!-- content_id: chapter-06-model-selection | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 6장: 모델 선택은 모델 숭배가 아니다

**상태:** `candidate`. 아래의 비교 프로토콜은 작성되어 있고 출처로 한정되어 있지만,
이 저장소는 고정 작업 세트를 아직 실행하지 않았습니다. 모델 성능, 비용, 지연 시간, 용량,
안정성, 그리고 전체 순위는 여전히 `not_run` 상태입니다.

## 이 장이 해결하는 문제

모델 선택은 흔히 “최고의 모델을 쓰세요”라는 슬로건으로 대체됩니다. 실제 업무는 더 좁은
질문을 필요로 합니다.

> 이 작업, 이 작업면, 이 provider, 이 컨텍스트, 이 도구 세트, 이 권한 경계, 이 시간
> 예산, 이 수용 기준(rubric)에서 최소 요구 조건을 충족하는 후보는 무엇이며, 시험을
> 확장할 충분한 근거가 있는가?

후보가 선택한 작업면에서 사용할 수 없거나, 두 실행이 서로 다른 입력, 도구, 권한,
reasoning 설정을 사용한다면 깨끗한 모델 비교가 성립하지 않습니다. 보기 좋은 demo는 한
구성이 한 번의 결과를 냈다는 것을 보여 줄 뿐입니다. 보편적인 순위나 전반적인 가치를
확립할 수는 없습니다.

## 학습 목표

이 장을 마치면 다음을 할 수 있어야 합니다.

- 모델을 고르기 전에 작업과 작업면을 선택한다.
- 카탈로그나 선택기(picker)에서 추론하지 않고 실제 account, workspace, provider,
  session에서 모델 가용성을 확인한다.
- 모델 ID, provider, reasoning effort, 컨텍스트, 도구, 권한, 수용 기준을 서로 다른
  비교 변수로 분리한다.
- 한 후보를 구하려고 조건을 바꾸지 않고 저위험 세 작업 스모크 비교(smoke comparison)를
  실행한다.
- 용량, provider 불일치, 오래 기다림 실패를 증거로 보존한다.
- 실험이 무엇을 증명하는지, 무엇을 증명하지 않는지, 언제 멈춰야 하는지 말한다.

## 실제 문제: 모델 선택은 평범한 방식으로 실패한다

이 프로젝트의 [Codex 현장 조사](../evidence-library-KO.md#source-notes)는 공개
GitHub Issue와 기타 공개 토론을 수집합니다. 이 보고들은 증상이지 공식 진단이나 로컬
재현이 아닙니다. 모델 선택이 잘못될 때 사람들이 세우는 가정을 드러내기 때문에 가치가
있습니다.

| 공개 증상 | 신고자가 관찰한 것 | 증명하지 **않는** 것 | 가장 먼저 취할 안전한 대응 |
|---|---|---|---|
| 모델 선택기가 `model`을 바꾸지만 사용자 지정 `model_provider`는 남겨 둠 | 보이는 모델과 실제 유효한 provider가 잘못된 짝을 이룰 수 있음 | 선택기, provider, 모델이 보편적으로 고장 났다는 것 | 유효한 `model`과 `model_provider`를 함께 읽고, 고치기 전에 가린(redacted) 구성 diff를 보존 |
| 선택한 모델이 용량 제한에 걸림 | 작업이 완전한 결과를 내기 전에 멈추고, 이후 prompt가 부분 상태를 만날 수 있음 | 모델 품질이 낮다는 것, 또는 재시도가 첫 시도가 끝났다는 뜻이라는 것 | checkpoint, diff, 로그, 테스트를 저장하고 계속 진행하기 전에 상태를 분류 |
| Windows 명령이 `Working` 상태로 남음 | UI는 활동을 보여 주지만 검증 가능한 출력은 도착하지 않음 | formatter, Agent, 모델이 여전히 유용한 진전을 만들고 있다는 것 | timeout/stop 규칙을 적용하고 안전하게 중단한 뒤 worktree를 검사하고 제한된 check만 다시 실행 |

원본 링크, 날짜, 버전, 근거 수준, 불확실성 메모는
[모델 선택 연구 기록](../evidence-library-KO.md#source-notes)에
있습니다. 이 프로젝트는 그 보고들의 명령이나 해결 방법을 실행하지 않았습니다.

### 실제 보고서를 전설로 만들지 않고 활용하는 법

각 증상에 대해 네 가지 꼬리표(label)를 분리해 두세요.

1. **사용자 보고(User report):** 어떤 사람이 이름이 알려진 환경에서 이런 일이
   일어났다고 말한 내용.
2. **독립 보고(Independent report):** 다른 사용자가 비슷한 증상을 설명하는지 여부.
3. **공식 확인(Official confirmation):** 관리자(maintainer)의 답변, 공식 문서, 릴리스
   노트, 기타 일차 당사자(first-party) 증거.
4. **Playbook 증거:** 이 프로젝트가 실제로 재현한 내용.

위 세 예시에서는 처음 두 꼬리표가 있을 수 있지만, 이 프로젝트는 그것들을 보장된 해결책으로
격상할 로컬 재현도 공식 근본 원인 확인도 없습니다. 이것은 행동을 바꿉니다. 마법의 설정을
약속하는 대신 증거를 보존하고 다음 검사를 좁히는 것입니다.

## 1. 모델 선택은 구성 결정이다

### 가용성이 품질보다 먼저다

두 개의 별도 관문(gate)을 사용하세요.

```text
공식 제품 문서
→ 실제 account / workspace / organization 승인
→ 대상 작업면과 provider
→ 이 session에서 보이는 모델
→ 무해한 요청 성공
→ 필요한 도구 호출 가능
→ 작업 결과 검증
```

각 화살표는 서로 다른 주장을 담고 있습니다. 모델이 공식 페이지에 설명되어 있어도 어떤
account에서는 사용할 수 없을 수 있습니다. 선택기에 나타나도 provider가 요청을 받으면
실패할 수 있습니다. 텍스트 응답이 성공해도 작업에 필요한 파일, 터미널, 브라우저,
connector가 사용 가능하다는 것을 증명하지 못할 수 있습니다.

후보 카드(candidate card)에 다음 필드를 사용하세요.

```text
candidate_id:
model_id:
provider:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | API | other
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:
model_visible_evidence:
harmless_request_evidence:
```

`not_observed`는 유효한 결과입니다. 검사를 수행하지 않았거나 쓸 수 있는 증거를 남기지
못했다는 뜻입니다. 추측으로 양식을 채우는 것보다 안전합니다.

### 제품 포지셔닝은 출발 가설이다

2026-08-11 출처 확인 시점에 공식 Codex 모델 페이지는 권장 GPT-5.6 선택지들을 대략
다음과 같이 설명합니다.

| 공식 포지셔닝 | 합리적인 출발 가설 | 여전히 시험해야 할 것 |
|---|---|---|
| Sol: 추가 분석과 다듬기가 필요한 복잡하고 열린 작업 | 모호함, 판단, 고가치 검토가 지배적일 때 시도 | 여러분의 작업 세트에서 첫 통과율, 소요 시간, 비용, 안정성, 도구 동작 |
| Terra: 실용적인 일상 업무의 주력 모델 | 강한 reasoning과 도구 사용이 필요한 일반 작업에 시도 | 실제 제약 조건 아래에서 수용 기준을 통과하는지 여부 |
| Luna: 명확하고 반복 가능한 대량 작업 | 추출, 분류, 변환, 구조화된 요약에 시도 | 컨텍스트, provider, effort, 검토 비용을 포함한 뒤에도 결과가 수용 가능한지 여부 |

이것들은 제품 설명이지 Playbook 벤치마크 결과가 아닙니다. 공식 페이지는 또한 reasoning
effort를 높이면 복잡한 작업은 개선될 수 있지만 시간이 더 걸리고 token을 더 많이 쓴다고
경고합니다. 수용 기준을 만족하는 가장 낮은 effort에서 시작하고, 작업이 더 많은 계획,
분석, 확인이 필요할 때만 올리세요. 그 설정을 실행의 일부로 기록하세요.

`Max`와 `Ultra`는 공짜 품질 꼬리표가 아닙니다. 공식 페이지는 Max를 한 작업에 더 많은
reasoning 시간을 주는 것, Ultra를 분리 가능한 복잡한 작업에 subagent를 사용하는 것으로
설명합니다. 이 둘은 workflow와 리소스 범위를 바꾸므로, Ultra 실행은 단일 Agent 실행과
모델만 비교하는 비교가 아닙니다.

### 모델, provider, 작업면은 하나의 튜플이다

후보를 `model = ...`로만 적지 마세요. 유용한 비교 정체성(identity)은 다음과 같습니다.

```text
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
```

핵심 구성원 하나라도 바뀌면 다른 workflow를 비교하고 있는 것이거나, 실행을
`not_comparable`로 표시하고 새 계약 아래에서 양쪽을 다시 실행해야 합니다.

공식 문서는 로컬 desktop, CLI, IDE 기본값에 공유되는 `config.toml` 경로를 설명하는
반면, Cloud 채팅은 다른 기본 모델 경계를 가집니다. 구성 파일은 구성 증거일 뿐입니다.
유효한 provider와 model을 다시 읽어 확인하고 무해한 요청을 보낸 뒤에만 튜플을 활성
상태로 취급하세요.

## 2. 올바른 순서로 결정한다

좋아하는 모델부터 시작하지 마세요. 다음 순서를 사용하세요.

```text
작업과 위험 정의
→ Local / Worktree / Cloud 선택
→ 진입점과 provider 선택
→ 대상 접근과 모델 가용성 확인
→ context, tools, permissions, effort, acceptance 고정
→ 같은 작업 세트 실행
→ comparable / not_comparable 행 검토
→ 확장, 중단, 또는 추가 증거 수집
```

### 먼저 작업을 분류한다

작업 종류(task class)는 “충분히 좋다”가 무엇을 뜻하는지 알려 줍니다.

- **이해하고 추출하기:** 자료에서 구조화된 값을 찾는다.
- **변환하고 생성하기:** 고정된 schema 아래에서 다시 쓰거나, 요약하거나, 분류하거나,
  형식을 맞춘다.
- **계획하고 판단하기:** 제약 조건, 트레이드오프, 불확실성을 다룬다.
- **코드 작성과 도구 사용:** repository를 검사하고, 편집하고, 실행하고, 수리한다.
- **조사하고 검토하기:** 출처를 찾고, 주장을 대조하고, 공백을 드러낸다.
- **창작하고 설계하기:** 피드백 라운드를 거치며 스타일을 유지한다.

추출을 통과하는 후보가 여러 파일 수리나 고위험 증거 검토에는 여전히 잘못된 선택일 수
있습니다. 수용 기준은 작업 종류와 일치해야 합니다.

### 작업면과 위험 경계를 고정한다

필요한 증거를 제공할 수 있는 가장 작은 환경을 고르세요. 작업이 원격 실행을 필요로 하지
않으면 synthetic 또는 가린 입력은 Local에 두세요. 현재 커밋하지 않은 작업을 분리해야
할 때는 버릴 수 있는(disposable) Worktree를 사용하세요. Cloud는 repository, 환경,
네트워크, secrets, 검토 경로가 승인되고 관찰 가능할 때만 사용하세요.

모델 선택은 누락된 파일, 사용할 수 없는 connector, 잘못된 checkout, 허가되지 않은
쓰기를 보완하지 못합니다. 환경이 잘못되었다면 불평등한 조건에서 모델을 “시험”하는 대신
작업면 결정 단계에서 멈추세요.

## 3. 실행 전에 후보 카드를 작성한다

후보 또는 workflow마다 카드 한 장을 사용하세요.

```text
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:

reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
known_capacity_or_network_issue:

not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
```

첫 실행 전에 다음을 고정하세요.

- 정확한 작업 입력과 그 버전
- 작업면, 진입점, provider, 모델, effort 설정
- 관련 컨텍스트와 도구 버전
- 권한과 허용된 부작용
- 수용 기준과 검토자(reviewer)
- 시간 경계와 재시도 예산
- 비용 측정 기준

한 후보를 위해서만 prompt를 바꾸거나, 컨텍스트를 추가하거나, 도구를 허용하거나, effort를
올리거나, 권한을 넓히지 마세요. 작업 계약이 바뀌면 버전을 올리고 두 후보를 모두 다시
실행하세요.

## 4. 실험: 세 작업 스모크 비교

**실험 상태:** `not_run`. 이것은 연습 프로토콜이지 이 저장소가 모델 비교를 실행했다는
증거가 아닙니다.

### 준비

같은 작업면에서 `surface_available: yes`인 후보 두 개를 고르세요. 입력을 기억에서
재현하는 대신 버전 고정된 오프라인
[`three-task-smoke-v1` fixture](../../evals/candidates/three-task-smoke-v1/README-KO.md)를
사용하세요. 여기에는 synthetic이고 민감하지 않은 입력과 로컬 validator가 들어 있으며,
모델 실행은 포함되지 않습니다. production 데이터, 실제 secrets, 외부 쓰기, 게시, push,
deployment, 유료 connector를 사용하지 마세요. 각 작업은 처음에 한 번 실행하고, 사전에
선언한 같은 형식의 재작업(rework)은 최대 한 번만 허용하세요.

`task_set_version: three-task-smoke-v1`, 두 후보 카드, 수용 기준 하나, raw 출력 위치,
로그 위치, 그리고 사용 불가, 용량 중단, 권한 불일치, 입력 드리프트, 도구 버전 드리프트에
대한 중지 조건을 고정하세요.

### 고정 작업

정식 작업 ID는 `extract-01`, `markdown-02`, `gap-review-03`입니다. 이들은 구조화 추출,
제약 아래의 Markdown 변환, 증거 공백 검토를 다룹니다. 각 작업 디렉터리에는 instruction,
고정 입력 하나, 기대 출력 하나, validator가 들어 있습니다. 패키지는 `fixture.json`에
정확한 입력 SHA-256 값을 공개하므로 검토자가 드리프트를 감지할 수 있습니다.

한 후보를 위해 작업을 더 보기 좋은 demo로 교체하지 마세요. 입력, instruction, 출력
schema, 수용 규칙이 바뀌어야 한다면 새 작업 세트 버전을 만들고 양쪽을 다시 실행하세요.

### 작업 절차

1. 어느 후보를 호출하기 전에 두 후보 카드를 모두 완성하고 보존한다.
2. 선택한 작업면에서 가용성을 확인하고 증거 위치를 기록한다.
3. 후보 A와 B를 같은 작업 순서, 같은 입력, 같은 수용 기준으로 실행한다.
4. 사람이 편집하기 전에 raw 출력을 저장한다. 이벤트, 소요 시간, 비용 기준, 오류 범주를
   기록한다.
5. 실행이 실패하면 사전에 선언한 통제된 재작업만 허용한다. 반복되는 맹목 재시도를 숨은
   성공 지표로 만들지 마라.
6. 요약을 계산하기 전에 모든 `not_comparable` 행을 검토한다.
7. `worth expanding`, `do not expand yet`, `insufficient evidence` 중 하나와 한계,
   다음 실행 조건으로만 마무리한다.

### 증거

비교 기록에는 최소한 다음이 포함되어야 합니다.

```text
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence
reasoning_effort_or_config | context_fingerprint | tools_and_versions
permission_profile | first_pass | rework_count | duration
cost_basis | cost_observed | error_type | reviewer_score
comparable | not_comparable_reason | raw_evidence
```

다른 검토자가 세 입력, 조건, 수용 기준을 재구성할 수 있어야 합니다. 중단된 실행을
채우는 데 빈 셀, 추정값, 또는 다른 후보의 출력을 사용하지 마세요. 선택한 비용 기준이 그
변환을 명시적으로 정의하지 않는 한 token 수는 화폐가 아닙니다.

## 5. 실패 유형과 안전한 복구

| 실패 유형 | 결과를 비교할 수 없는 이유 | 안전한 처리 |
|---|---|---|
| 선택한 작업면에서 후보가 보이지 않거나 호출할 수 없음 | 비교할 같은 작업면 실행이 없음 | `surface_available: no` 또는 `not_observed`로 기록하고 그 후보를 중단하며 사용 불가를 모델 품질로 점수화하지 않음 |
| 모델 선택기와 provider가 불일치 | 요청이 의도한 모델을 사용하지 않았을 수 있음 | 가린 유효 구성 diff를 보존하고 튜플을 고치거나 비교를 provider/workflow 시험으로 변경 |
| 용량 오류가 한 실행을 중단 | 출력과 소요 시간이 불완전하고 다음 시도가 부분 상태에서 시작할 수 있음 | 오류와 checkpoint를 저장하고 `blocked` 또는 `not_comparable`로 분류하며 선언된 조건 아래에서만 양쪽을 재실행 |
| 명령이 검증 가능한 이벤트 없이 대기 | `Working` 꼬리표는 결과가 아님 | timeout 규칙을 적용하고 중단한 뒤 diff와 프로세스 상태를 검사하고 검증이 없음을 기록 |
| 한쪽만 추가 컨텍스트, 더 높은 effort, 새 도구를 받음 | 독립 변수가 더 이상 모델만이 아님 | `not_comparable`로 표시하고 두 기록을 보존하며 고정 계약으로 재실행 |
| 매력적인 demo 하나로 전체 승자를 발표 | 표본 크기와 결론 범위가 맞지 않음 | `candidate` 또는 `insufficient evidence`로 돌아가고 주장을 넓히기 전에 작업 종류와 반복 횟수를 확장 |

용량이나 오래 기다림 실패에 대한 현실적인 대응은 “될 때까지 계속 클릭하기”가 아닙니다.
그것은 마지막으로 알려진 상태를 보존하고, 작업이 완료였는지, 부분이었는지, 알 수
없는지 확인한 뒤 제한된 복구를 선택하는 것입니다. 새 대화는 복구 작업면이 될 수
있지만, 이전 대화의 증거를 상속하지는 않습니다.

## 성찰

카드와 raw 증거에서 답하세요. 기억에서 답하지 마세요.

- 어떤 작업이 확장/중단 결정을 바꾸었는가?
- 어떤 차이가 모델에서 비롯되었고, 어떤 차이가 작업면, provider, 컨텍스트, 도구, 권한,
  용량, 검토자에서 비롯되었을 수 있는가?
- 더 빠르거나 더 저렴한 출력이 여전히 수용 기준을 통과하지 못하는 지점은 어디인가?
- 어떤 문장이 공식 제품 포지셔닝이고, 어떤 문장이 이 스모크 실행의 관찰인가?
- 매력적인 demo가 하나뿐이라면, 일반 순위를 정확히 무엇이 막는가?

## 전이 과제

같은 비교 필드를 다음 작업 중 하나로 옮기세요.

- Local과 Worktree에서 같은 모델
- 엄격한 출력 schema가 있는 문서 변환
- 인용과 unknown 열이 있는 조사 출처 대조
- 읽기 전용 도구 경계가 있는 저위험 코드 검사

새 작업 세트 버전과 도메인별 수용 기준을 고정하세요. 모델 선택이나 세 작업 결과를 새
도메인으로 복사하지 마세요. 어떤 결론이 작업 수준으로 남고 어떤 주장을 버려야 하는지
밝히세요.

## 장의 증거

의도된 산출물은 후보 카드 두 장, 고정된 작업 세트와 rubric, 초기 raw 실행과 통제된
재작업, 비교 표, 유형화된 오류 기록, 확장/중단 결정입니다. 그 기록이 생길 때까지 이
장은 `not_run`을 유지해야 합니다. 공식 포지셔닝과 단일 demo는 평가 증거를 대체할 수
없습니다.

## 출처 및 유지보수 경계

| 사실 또는 방법 경계 | 출처 | 확인일 | 적용 대상 | 담당자 / 다음 검토 |
|---|---:|---:|---|---|
| 공식 모델 포지셔닝, reasoning 지침, 로컬 기본값, Cloud 모델 경계, 지원 중단(deprecation) 공지 | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 | 확인 시점의 공식 문서. 계정 수준의 증명이나 벤치마크가 아님 | `facts-maintainer` / 2026-09-11 |
| CLI 작업면과 로컬 repository workflow | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 | 공식 CLI 문서. 이 session의 유효 구성이 아님 | `facts-maintainer` / 2026-09-11 |
| Cloud 환경, 설정, 로그, 검토 경계 | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | 공식 Cloud 문서. 설정이 agent 단계 완료를 뜻하지는 않음 | `facts-maintainer` / 2026-09-11 |
| 공개된 model/provider, 용량, 오래 기다림 증상 | [현장 문제 기록](../evidence-library-KO.md#source-notes) | 2026-08-11 | 사용자 보고와 프로젝트 지침. 로컬 재현이나 공식 근본 원인 주장 없음 | `curriculum-maintainer` / 2026-09-11 |
| 고정 작업 비교 방법 | [평가 장](19-evaluate-models-and-workflows-KO.md)과 [버전 고정 fixture](../../evals/candidates/three-task-smoke-v1/README-KO.md) | 2026-08-14 | Playbook 방법과 로컬 fixture validator. 아직 완료된 모델 실행 없음 | `evaluation-maintainer` / 2026-09-11 |

모델 ID, 작업면 매트릭스, 가격, 용량, 구성 문법, provider 지원, effort 제어, 지원
중단 공지는 바뀔 수 있습니다. 바뀌면 일차 당사자 출처를 갱신한 뒤 사실 영향
레지스트리, 연구 기록, 이 장, 영향을 받는 평가 fixture, 상태 출처를 업데이트하세요.
공식 포지셔닝, 사용자 증상, 로컬 실행 증거를 별도의 문장으로 유지하세요.

## 수용 체크리스트

- [ ] 모델 이름을 대기 전에 작업, 위험, 작업면, provider, 수용 기준을 정의할 수 있다.
- [ ] 모델 카탈로그, 구성 값, 선택기 꼬리표에서 접근을 추론하는 대신 실제 가용성
      증거를 기록할 수 있다.
- [ ] 모델, provider, effort, 컨텍스트, 도구, 권한, 비용 기준, 작업 세트 버전으로
      후보 카드 두 장을 채울 수 있다.
- [ ] 한쪽의 조건을 바꾸지 않고 `three-task-smoke-v1`의 여섯 초기 실행을 실행하거나
      올바르게 차단할 수 있다.
- [ ] provider 불일치, 용량, 오래 기다림 증거를 보존하고 복구와 검증을 구분할 수 있다.
- [ ] 작업 범위 안의 관찰만 보고하고, demo 하나가 전체 순위나 가성비 주장을 증명할 수
      없는 이유를 설명할 수 있다.
- [ ] 이 장이 여전히 `candidate`이고 실험과 모델 평가가 여전히 `not_run`임을 말할 수
      있다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 내비게이션">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-KO.md" aria-label="이전 장: 5장 · 5장: 알맞은 Codex 작업면 선택하기">← 이전<br><strong>5장 · 5장: 알맞은 Codex 작업면 선택하기</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-KO.md" aria-label="다음 장: 7장 · 7장: Skills, Plugins, MCP, 도구는 어떻게 일을 나누는가">다음 →<br><strong>7장 · 7장: Skills, Plugins, MCP, 도구는 어떻게 일을 나누는가</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
