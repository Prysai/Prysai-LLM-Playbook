<!-- content_id: chapter-06-model-selection | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 6장: 모델 선택은 모델 숭배가 아니다

**상태:** `candidate`. 비교 프로토콜과 출처 경계는 작성되어 있지만 이 저장소는
고정 작업 세트를 아직 실행하지 않았습니다. 성능, 비용, 지연 시간, 용량, 안정성, 순위는
모두 `not_run` 상태입니다.

## 이 장이 해결하는 문제

“가장 좋은 모델을 쓰세요”는 업무 결론이 아닙니다. 더 쓸모 있는 질문은 이렇습니다.

> 이 작업, 이 작업면, 이 provider, 이 컨텍스트와 도구, 이 권한 한계, 이 시간과 수용 기준에서
> 최소 조건을 충족하는 후보는 무엇이며, 시험을 넓힐 근거는 무엇인가?

후보가 고른 작업면에서 쓸 수 없거나 두 실행이 입력, 도구, 권한, 설정이 다르면 깨끗한 비교가
아닙니다. 보기 좋은 시연은 한 설정이 한 번 결과를 냈다는 것만 보이며, 일반 순위를 정하지
않습니다.

## 학습 목표

- 모델보다 먼저 작업과 작업면을 선택한다.
- 실제 account, workspace, provider, session에서 가용성을 확인한다.
- 모델, provider, reasoning effort, 컨텍스트, 도구, 권한, 수용 기준을 구분한다.
- 한 후보를 살리려고 조건을 바꾸지 않고 세 저위험 작업을 비교한다.
- 용량, provider, 기다림 실패도 증거로 남긴다.
- 실험이 증명하는 것과 증명하지 않는 것, 멈출 시점을 말한다.

## 공개 보고: 마법의 해결책이 아니라 증상

[Codex 현장 조사](../evidence-library-KO.md#source-notes)는 공개 Issue와 토론을 모읍니다.
이는 증상이지 공식 진단이나 로컬 재현이 아닙니다.

| 증상 | 관찰 | 그것만으로 증명하지 않는 것 | 안전한 대응 |
|---|---|---|---|
| 선택기는 `model`을 바꾸나 `model_provider`가 남음 | 보이는 모델과 실제 provider 조합이 맞지 않을 수 있음 | 선택기, provider, 모델 전체가 고장 남 | 두 값을 읽고 가린 설정 diff를 남겨 조합을 고침 |
| 모델이 용량 제한에 걸림 | 작업이 끝나기 전 멈추고 다음 시도가 부분 상태를 물려받을 수 있음 | 모델 품질이 낮음, 재시도가 첫 시도 완료를 뜻함 | checkpoint, diff, log, check를 보존하고 상태를 분류 |
| 명령이 `Working`에서 멈춤 | UI 활동 표시가 검증 가능한 출력은 아님 | formatter, Agent, 모델이 정상 진행 중 | 시간 한도를 적용해 중단하고 worktree를 검사한 뒤 좁은 check 하나 수행 |

[모델 선택 기록](../evidence-library-KO.md#source-notes)에서 링크, 날짜,
한계를 확인하세요. 각 보고에서 개인의 말, 독립 보고 유무, 공식 확인, 이 Playbook의 재현을
나눕니다. 재현 없는 보고를 보장된 해결책으로 바꾸지 마세요.

## 1. 모델을 고른다는 것은 구성을 고르는 일

### 품질보다 가용성이 먼저다

~~~
공식 문서 → account / workspace / organization 승인
→ 목표 작업면과 provider → session에서 보이는 모델
→ 무해한 요청 성공 → 필요한 도구 호출 가능
→ 작업 결과 검증
~~~

각 화살표는 별개의 주장입니다. 공식 페이지, 카탈로그 항목, 선택기에 보이는 이름은 그 모델이
필요한 파일, 터미널, 브라우저, connector와 함께 이 작업을 처리할 수 있다는 증거가 아닙니다.

후보 카드를 사용하세요.

~~~
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
~~~

`not_observed`는 유효한 결과입니다. 추측으로 채우는 것보다 안전합니다.

### 제품 포지셔닝은 출발 가설일 뿐이다

공식 페이지는 모델을 복잡하고 열린 작업, 일상 업무, 반복 가능한 대량 변환에 맞는다고 설명할 수
있습니다. 이것은 무엇을 시험할지 고르는 힌트일 뿐 승자 선언이 아닙니다. 높은 reasoning effort는
분석을 늘리는 대신 시간이나 token을 쓸 수 있습니다. 수용 기준을 만족하는 가장 작은 설정에서
시작하세요. reasoning이나 subagent를 더하면 비교 대상은 모델만이 아니라 workflow와 예산이 됩니다.

### 모델, provider, 작업면은 한 묶음이다

~~~
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
~~~

주요 항목 하나라도 바뀌면 다른 흐름을 비교하는 것입니다. `not_comparable`로 표시하고 새 계약 아래
양쪽을 다시 실행합니다. 설정 파일은 설정만 보여 줍니다. 실제 provider와 model을 읽어 되돌리고,
무해한 요청이 통한 뒤에만 활성으로 취급하세요.

## 2. 올바른 순서로 결정한다

~~~
작업과 위험 정의 → Local / Worktree / Cloud 선택 → entry와 provider 선택
→ 접근과 가용성 확인 → context, tools, permissions, effort, acceptance 고정
→ 같은 세트 실행 → 비교 가능한 행 검토 → 확대, 중단 또는 추가 증거 수집
~~~

먼저 작업을 분류합니다. 추출, 변환, 계획, 도구를 쓰는 구현, 조사/검토, 창작/설계는 필요한
증거가 다릅니다. 추출을 잘하는 후보가 여러 파일 수리나 고위험 증거 검토에 맞는다는 뜻은 아닙니다.
rubric은 작업 종류에 맞춰야 합니다.

필요한 증거를 남길 수 있는 가장 작은 작업면을 고르세요. 원격 실행이 필요 없으면 synthetic 또는
가린 입력을 Local에 둡니다. 커밋하지 않을 작업을 분리하려면 버릴 수 있는 Worktree를 사용합니다.
Cloud는 repository, environment, network, secrets, review 경로가 승인되고 관찰될 때만 사용합니다.
모델은 누락 파일, 쓸 수 없는 connector, 틀린 checkout, 허가되지 않은 쓰기를 보완하지 못합니다.

## 3. 실행 전 후보 카드

~~~
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
~~~

첫 실행 전에 입력과 버전, 작업면, entry, provider, model, effort, context, tool version,
permissions, rubric, reviewer, 시간 제한, 재시도, 비용 기준을 고정합니다. 한쪽만 prompt, context,
tool, effort, permission을 좋게 만들지 마세요. 계약이 달라지면 버전을 올리고 양쪽을 다시 합니다.

## 4. 실험: 세 작업 비교하기

**실험 상태:** `not_run`. 이는 연습 프로토콜이며 이 저장소가 모델을 비교했다는 증거가 아닙니다.

같은 작업면에서 `surface_available: yes`인 후보 둘을 고릅니다. synthetic input과 로컬 validator만
있는 버전 고정 fixture [`three-task-smoke-v1`](../../evals/candidates/three-task-smoke-v1/README-KO.md)를
사용하세요. 모델 실행은 포함되어 있지 않습니다. production data, secret, 외부 쓰기, 게시, push,
deploy, 유료 connector를 사용하지 마세요. 각 작업은 한 번 실행하고 사전에 정한 같은 형식의
통제된 재시도만 최대 한 번 허용합니다.

고정 작업은 `extract-01`, `markdown-02`, `gap-review-03`입니다. 구조화 추출, 제약 아래 Markdown
변환, 증거 공백 검토를 각각 다룹니다. 한 후보만 눈에 띄는 demo로 바꾸지 마세요. 입력, instruction,
schema, acceptance가 바뀌면 새 버전을 만들고 양쪽을 반복합니다.

1. 후보 호출 전 두 카드를 완성한다.
2. 가용성을 확인하고 증거 위치를 기록한다.
3. A와 B를 같은 순서, 입력, rubric으로 실행한다.
4. 편집 전 raw output, event, duration, cost, error를 저장한다.
5. 실패 시 통제된 재시도만 허용한다. 맹목 재시도를 성공률로 바꾸지 않는다.
6. 요약 전에 모든 `not_comparable` 행을 검토한다.
7. 결론은 `worth expanding`, `do not expand yet`, `insufficient evidence` 중 하나로 제한하고 한계를 쓴다.

~~~
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence | reasoning_effort_or_config
context_fingerprint | tools_and_versions | permission_profile | first_pass
rework_count | duration | cost_basis | cost_observed | error_type
reviewer_score | comparable | not_comparable_reason | raw_evidence
~~~

## 5. 실패, 복구, 전이

| 실패 | 처리 |
|---|---|
| 후보가 보이지 않거나 호출 불가 | `no` 또는 `not_observed`로 기록하고 가용성을 품질 점수로 쓰지 않음 |
| 선택기와 provider 불일치 | 가린 diff를 남기고 조합을 고치거나 provider/workflow 시험으로 선언 |
| 용량이 실행을 끊음 | error와 checkpoint를 저장해 `blocked` 또는 `not_comparable`로 표시; 선언한 조건으로 양쪽 재실행 |
| 검증 가능한 event 없는 대기 | 시간 규칙 적용, 중단 후 diff/state 검사, 빠진 검증 기록 |
| 한쪽만 추가 context, effort, tool을 받음 | `not_comparable`로 하고 고정 계약으로 반복 |
| demo가 만능 승자를 선언 | `candidate` 또는 `insufficient evidence`로 되돌림 |

같은 항목을 Local 대 Worktree, 엄격한 schema 문서 변환, 인용과 unknown 열이 있는 source
reconciliation, read-only tool 코드 조사에 옮길 수 있습니다. 새 세트와 rubric 없이는 결과를 다른
분야로 복사하지 마세요.

## 증거 경계와 출처

예정된 산출물은 후보 카드 두 장, 고정 세트와 rubric, raw run, 표, 유형화 error, 확대/중단 판단입니다.
그것들이 생기기 전까지 모두 `not_run`입니다. 공식 포지셔닝이나 한 번의 demo는 평가를 대신하지 않습니다.

| 변하는 경계 | 일차 출처 | 확인일 |
|---|---|---|
| 모델 포지셔닝, reasoning, 한계 | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 |
| CLI와 로컬 repository 흐름 | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 |
| Cloud 환경과 검토 | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 |
| model/provider/capacity 공개 증상 | [현장 기록](../evidence-library-KO.md#source-notes) | 2026-08-11 |

모델 ID, 가격, 용량, provider 지원, 문법, control은 바뀔 수 있습니다. 먼저 일차 출처를 갱신하고
공식 포지셔닝, 사용자 보고, 로컬 증거를 별 문장으로 기록하세요.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-KO.md" aria-label="이전 장: 5장 · 알맞은 Codex 작업면 선택하기">← 이전 장<br><strong>5장 · 알맞은 Codex 작업면 선택하기</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-KO.md" aria-label="다음 장: 7장 · Skills, Plugins, MCP, 도구는 어떻게 일을 나누는가">다음으로 →<br><strong>7장 · Skills, Plugins, MCP, 도구</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
