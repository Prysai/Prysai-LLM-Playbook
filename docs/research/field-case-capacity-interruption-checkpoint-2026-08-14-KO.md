<!-- content_id: field-case-capacity-interruption-checkpoint-2026-08-14 | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: field-case-capacity-interruption-checkpoint-2026-08-14.md | source_revision: 2026-08-23 -->

# 현장 사례: 중단된 작업은 재시도하기 전에 잠시 멈추기

## 먼저 할 일: 중단을 보이지 않는 상태로 만들지 않기

선택한 모델을 사용할 수 없게 되면 바로 다음 프롬프트를 보내거나 설정을 바꾸거나 작업이 거의 끝났다고 생각하기 쉽습니다. 먼저 멈춥니다. 다음 시도를 시작하기 전에 작은 체크포인트를 만들어, 알고 있는 사실과 기대하는 일을 분리합니다.

1. 목표를 한 문장으로 적습니다.
2. 실제로 확인할 수 있는 마지막 산출물(차이, 테스트 결과, 메모 또는 산출물이 없다는 사실)을 보존합니다.
3. 빠진 결과는 모두 `unknown`으로 표시하고 안심할 만한 이야기로 빈칸을 채우지 않습니다.
4. 이전 작업이 완료, 부분 완료, 미확인 중 무엇인지 말할 수 있을 때만 제한된 다음 단계 하나를 고릅니다.

이 페이지는 오프라인 의사결정 연습입니다. 프롬프트를 보내거나 모델을 재시도·변경하거나 계정을 확인하지 않으며, 어떤 공급자가 어떻게 동작할지도 확정하지 않습니다. 목적은 단순합니다. 중단이 다음 작업이 되기 전에 검토 가능한 기록을 남기는 것입니다.

![중단 체크포인트: 새 프롬프트 전에 멈추고 알려진 것과 모르는 것을 기록한 뒤 제한된 결정을 고른다.](../../assets/teaching/interruption-checkpoint-card-red-black.svg)

## 사례 개요

- `case_id`: `FC-CAPACITY-01`
- `title`: 중단된 작업은 재시도하기 전에 잠시 멈추기
- `problem`: 모델을 사용할 수 없다는 메시지로 작업이 중단되었고, 학습자는 관찰하지 못한 결과를 완료된 작업으로 취급하지 않아야 함
- `audience`: 모델 지원 작업 화면을 사용하는 학습자와 리뷰어
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: 6장, 9장, 19장
- `related_labs`: Lab 001, Lab 013
- `related_skills`: Interruption Checkpoint, Task Protocol, Evidence Review, LLM Comparison Protocol
- `related_evaluations`: `three-task-smoke-v1` (`not_run`)

## 출처 기록

- `source_type`: `github_issue`
- `source_url`: https://github.com/openai/codex/issues/33865
- `source_title`: 선택한 모델을 사용할 수 없게 되었다는 공개 보고
- `source_author_or_publisher`: GitHub 공개 Issue 작성자
- `accessed_at`: 2026-08-14, [모델 용량 현장 신호](field-signal-model-capacity-budget-2026-08-14.md)에 기록됨
- `source_license_or_usage_boundary`: 참고용 공개 보고이며, 이 사례는 자체 요약과 가상의 오프라인 fixture만 사용함
- `quotation_policy`: Issue 원문, 댓글, 로그, 계정 정보, 모델 이름, 기기 정보, 명령 출력, 해결책, 스크린샷, 작업 내용을 복사하지 않음
- `source_scope`: Issue는 한 작성자가 특정 날짜에 선택한 모델을 사용할 수 없다고 공개 보고했다는 사실만 보여 줍니다. 원인, 빈도, 현재 가용성, 재시도 동작, 서비스 정책, 큐 의미, 수정 방법, 다른 화면·계정·모델·공급자의 동작은 입증하지 않습니다. 연결된 현장 신호의 API 속도 제한 문서도 API 경계만 설명하며 이 Codex 보고의 원인을 설명하지 않습니다.

## 보고된 상황

- `user_report_summary`: 공개 Issue 작성자는 특정 상황에서 용량 관련 메시지가 나타나 선택한 모델을 사용할 수 없었다고 설명했습니다.
- `observed_symptom`: 완전한 작업 결과를 받기 전에 선택한 모델을 사용할 수 없었다고 출처가 보고합니다.
- `expected_behavior`: 작성자는 선택한 모델이 목표 작업에 사용 가능하기를 기대했으며, 이는 공급자의 보장이 아닙니다.
- `official_boundary`: 보고된 Codex 사건에 대해서는 `unknown`입니다. 연결된 API 문서는 API 자체의 속도 제한만 설명합니다.
- `product_surface`: 보고된 표면은 CLI이며 여기서는 재현하지 않음
- `product_version`: 검증된 사실로 확정하지 않음
- `operating_system`: 검증된 사실로 확정하지 않음
- `model_or_provider`: 의도적으로 생략하며 모델 비교가 아님
- `network_or_auth_context`: 확인하지 않음; 계정이나 사용 권한을 사용하지 않음
- `input_shape`: 명시적인 수용 조건이 있는 제한된 로컬 편집 작업
- `risk_level`: 이후 프롬프트가 불분명한 로컬 상태에 작용할 수 있으면 `medium`

## 주장과 증거 표

| 주장 | 증거 분류 | 출처 또는 산출물 | 날짜 | 범위 | 한계 | 상태 |
|---|---|---|---|---|---|---|
| 한 공개 작성자가 Codex 환경에서 선택한 모델을 사용할 수 없었다고 보고함 | `reported` | [GitHub Issue #33865](https://github.com/openai/codex/issues/33865) | 2026-08-14 | 날짜가 있는 공개 보고 하나 | 재현, 진단, 빈도 측정, 지원 보장이 아님 | candidate |
| OpenAI API 문서는 API 요청 속도 제한과 응답 헤더를 설명함 | `official` | [Rate limits](https://platform.openai.com/docs/guides/rate-limits), [현장 신호](field-signal-model-capacity-budget-2026-08-14.md)로 범위 제한 | 2026-08-14 | API 문서만 | 이 보고의 원인이나 Codex 동작을 정의하지 않음 | candidate |
| 중단된 작업이 완료, 일부 완료 또는 안전하게 재개 가능함 | `not_observed` | 로컬 작업, 재시도, 계정, 모델, 산출물을 확인하지 않음 | 2026-08-14 | 이 저장소 | 증거가 없다는 것은 작업이 없었다는 뜻이 아님 | unverified |
| 이후 프롬프트를 보내기 전에 명시적인 체크포인트를 보존해야 함 | `project_inference` | 이 오프라인 사례, 6장과 9장, `three-task-smoke-v1` | 2026-08-14 | 보수적인 학습 방법 | 복구, 컨텍스트 보존, 중단 방지를 보장하지 않음 | candidate |

## 재현 상태

- `reproduction_status`: `not_run`
- `reproduction_scope`: 모델을 선택하거나 작업을 보내거나 계정을 확인하거나 요청을 재시도하거나 설정을 바꾸거나 서비스 텔레메트리를 가져오지 않음
- `fixed_input_or_fixture`: **교육 전환**의 가상 기록
- `logs_or_artifacts`: 독립 검토한 오프라인 실행을 나중에 승인하는 경우에만 학습자가 만든 체크포인트 기록을 남김
- `independent_reviewer`: 대기 중
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## 가장 작은 안전 진단 경로

| 단계 | 읽기 전용 확인 또는 저위험 행동 | 예상 관찰 | 중지 규칙 |
|---|---|---|---|
| 1 | 가상 작업을 멈추고 목표, 마지막으로 보인 산출물, 수용 조건을 로컬 기록에 옮깁니다. | 목표와 관찰하지 못한 결과가 분리됩니다. | 목표, 산출물 종류, 수용 조건을 모르면 중지하고 다음 프롬프트를 보내지 않습니다. |
| 2 | 나열된 산출물만 사용해 이전 상태를 `complete`, `partial`, `unknown`으로 분류합니다. | 빠진 증거가 보이는 상태로 남습니다. | 수용 증거 없이 `complete`로 기록하지 않습니다. |
| 3 | 제한된 읽기 검사, 기록을 붙인 새 작업, 현재 공식 도움말·상태 경로에서의 일시 정지 중 하나를 고릅니다. | 다음 행동은 자체 증거를 가지며 중단된 작업의 증거를 물려받지 않습니다. | 재시도, 모델·설정 변경, 크레딧 사용, 컨텍스트 업로드, 재개 주장 전에 중지합니다. |

- `allowed_actions`: 이 가상 사례 읽기, 로컬 체크포인트 작성, 증거 분류, 향후 결정 하나 이름 붙이기
- `forbidden_actions`: 프롬프트 전송, 재시도, 모델·설정 변경, 계정 확인, 크레딧 사용, 파일 업로드, API 호출, commit, push, 게시, 비밀 사용
- `minimal_safe_probe`: 실제 제품 데이터가 없는 5줄 로컬 체크포인트 기록
- `stop_condition`: 마지막 산출물, 수용 의미, 다음 외부 행동의 권한이 없음
- `rollback_or_cleanup`: 필요 없는 가상 로컬 기록을 삭제하며 시스템·계정·저장소는 변경하지 않음

## 교육 전환

- `learner_problem`: 초보자가 작은 변경을 작성하던 중 모델을 사용할 수 없다는 메시지를 보고 “멈춘 곳부터 계속해”를 보내고 싶어 함
- `core_concept`: 보이는 중단, 산출물, 작업 성공은 서로 다릅니다. 새 시도는 이전 증거를 자동으로 이어받지 않습니다.
- `decision_to_teach`: 기록을 남기고 새 작업 전에 제한된 검사를 하거나, 멈추고 현재 공식 도움말·상태 경로를 사용합니다. 전자는 로컬 증거를 분명히 하고 후자는 권한이나 증거가 없을 때 활동을 늘리지 않습니다. 어느 쪽도 용량, 복구, 완료를 보장하지 않습니다.
- `smallest_experiment`: 다음 가상 기록만 사용합니다.

  ```text
  goal: 로컬 연습 페이지의 수용 체크리스트에 한 줄 추가
  last_visible_event: 모델을 사용할 수 없다는 메시지가 표시됨
  artifact_available: 완료 요약, diff, 테스트 결과를 확인하지 않음
  tempting_next_action: “멈춘 곳부터 계속해” 전송
  ```

  도구를 열지 말고 다음 체크포인트를 만듭니다.

  ```text
  goal: 수용 체크리스트에 한 줄 추가
  last_accepted_evidence: unknown
  state_classification: unknown
  missing_evidence: diff 또는 파일 보기와 체크리스트 결과
  next_decision: blocked — 새 작업 전에 이 기록을 보존
  external_actions: not_run
  ```

- `intentional_failure`: 한 줄이 추가됐다고 말하거나, 재시도가 안전하게 이어진다고 말하거나, 모델이 나쁘다고 단정하거나, API 속도 제한이 원인이라고 단정함
- `required_artifact`: 6줄 체크포인트와 새 프롬프트가 이전 작업 완료를 증명하지 못하는 이유를 설명하는 한 문장
- `acceptance`: 목표를 쓰고, 산출물이 없으면 `unknown`을 유지하고, 중단과 완료를 구분하고, 원인·공급자를 주장하지 않고, `external actions: not_run`을 기록함
- `transfer`: 타임아웃, 브라우저 세션 손실, 도구 부재, 연결이 끊긴 인계 등에도 같은 체크포인트를 적용합니다. 변하지 않는 것은 다음 행동에 새 증거가 필요하다는 점이고, 관찰 가능한 산출물과 안전 경계가 바뀝니다.
- `forbidden_claims`: 현재 서비스 가용성, 원인, 큐 동작, 재시도 성공, 모델 품질, 플랫폼 동등성, 과금, 작업 완료, 안전 효과, 학습자 역량, 전이 성공, production-ready 상태

## 콘텐츠 위치

- `primary_chapter`: [9장 — 검증, 의심, 복구](../../book/chapters/09-verification-and-recovery-KO.md)
- `supporting_chapters`: [6장 — 모델 선택](../../book/chapters/06-model-selection-KO.md); [19장 — 모델과 작업 흐름 평가](../../book/chapters/19-evaluate-models-and-workflows-KO.md)
- `primary_lab`: [Lab 013 — 감사 가능한 세로 슬라이스](../../book/labs/lab-013-l3-vertical-slice-KO.md)
- `supporting_labs`: [Lab 001 — 첫 안전 작업](../../book/labs/lab-001-first-safe-task-KO.md)
- `related_skill`: [Interruption Checkpoint](../../skills/prysai-interruption-checkpoint/SKILL.md); [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md); [LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md)
- `evaluation_fixture`: [three-task-smoke-v1](../../evals/candidates/three-task-smoke-v1/README.md), `not_run`
- `update_registry_entry`: 보고가 바뀌거나 공식 Codex 안내를 추가하거나 실제 실행을 제안하거나 제품별 복구 레시피를 요청할 때 재검토

이 사례는 이미 있는 공개 신호를 가르칠 수 있는 형태로 바꾸지만 장, Lab, Skill, 평가, 플랫폼 주장에 대한 성숙도를 높이지는 않습니다.

## 개인정보, 권한, 유지 관리

- `personal_data_removed`: 예; 출처의 신원, 계정, 환경 세부 정보를 재사용하지 않음
- `secrets_removed`: 예; 자격 증명, 토큰, 요금제, 모델 ID, 경로, 작업 내용, 로그를 포함하지 않음
- `private_paths_removed`: 예
- `copyrighted_material_boundary`: 자체 요약과 가상 fixture만 사용하며 Issue 원문, 댓글, 해결책, 문서를 복사하지 않음
- `asset_register_entry`: `docs/sources/asset-register.md`의 S103
- `volatile_facts`: Issue 상태·메타데이터, 서비스 가용성, API 속도 제한, 제품 제어, 도움말 경로, 플랫폼 동작
- `next_review`: 2026-09-14 또는 복구·용량·제품 주장을 하기 전
- `change_trigger`: 출처 변경, 공식 Codex 문서 채택, 실행 제안, 재시도·설정 교육 요청
- `owner`: research-maintainer

## 주장 경계

- `what_can_be_claimed`: 날짜가 있는 공개 보고를 출처, 증거 분류, 재현 상태, 오프라인 체크포인트, 중지 조건이 있는 후보 사례로 표현함
- `what_must_not_be_claimed`: 보고가 흔하거나 현재도 유효하거나 재현 가능하거나 API 속도 제한이 원인이다, 중단을 안전하게 재개할 수 있다, 어떤 공급자가 더 낫다, 연습이 손실을 막는다, 학습·실행·릴리스·프로덕션 증거가 생겼다는 주장은 하지 않음
- `next_smallest_check`: 동의를 받고 독립 검토한 가상 체크포인트 오프라인 실행. 계정, 모델, 작업, 프롬프트, 프로젝트, 사용량, 개인정보, 외부 서비스 데이터를 수집하지 않음
- `current_status`: `candidate`
