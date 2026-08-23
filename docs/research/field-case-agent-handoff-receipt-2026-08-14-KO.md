<!-- content_id: field-case-agent-handoff-receipt-2026-08-14 | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: field-case-agent-handoff-receipt-2026-08-14.md | source_revision: 2026-08-23 -->

# 현장 사례: 하위 Agent를 만들었다고 해서 작업 인계가 확인되는 것은 아니다

## 먼저 빠진 확인 지점을 이름 붙이기

작업 목록에 하위 Agent가 나타났다고 해서 작업을 받았다는 뜻은 아닙니다. 실제 작업을 넘기기 전에 다음 확인 지점을 서로 구분해 기록합니다.

1. 인계 요청을 만들었는가
2. 받는 Agent를 시작했거나 깨웠는가
3. 받는 Agent가 무해한 작업 수신 기록을 보여 줄 수 있는가
4. 받는 Agent가 말한 작업을 끝냈는가
5. 부모 작업이 확인 가능한 결과를 받았는가

세 번째 지점만이 전달을 입증합니다. 이 지점이 없으면 인계를 `blocked`로 기록하고 그 경로로 실제 작업을 보내지 않습니다. 대신 단일 Agent나 사람이 확인할 수 있는 인계를 사용합니다. 이 페이지는 오프라인 의사결정 보조 자료입니다. Agent를 만들거나 메시지를 보내거나 세션을 확인하거나 제품을 진단하지 않습니다.

![인계의 다섯 확인 지점: 생성, 시작, 수신 기록, 실행, 결과 반환. 수신 기록이 전달의 관문이다.](../../assets/teaching/agent-handoff-receipt-checkpoints-red-black.svg)

## 사례 개요

- `case_id`: `FC-HANDOFF-01`
- `title`: 하위 Agent를 만들었다고 해서 작업 인계가 확인되는 것은 아니다
- `problem`: 부모 작업 흐름에는 하위 Agent가 만들어진 것처럼 보이지만, 받는 쪽에서 작업 본문을 확인하지 못할 수 있음
- `audience`: 여러 단계의 도구 지원 개발 환경을 사용하는 학습자와 리뷰어
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: 10장, 12장
- `related_labs`: Lab 013
- `related_skills`: Task Protocol, Evidence Review
- `related_evaluations`: 배정되지 않음

## 출처 기록

- `source_type`: `github_issue`
- `source_url`: https://github.com/openai/codex/issues/37822
- `source_title`: 생성되었다고 표시되지만 작업 수신 기록이 보이지 않았다는 공개 보고
- `source_author_or_publisher`: GitHub 공개 보고자
- `accessed_at`: 2026-08-14
- `source_license_or_usage_boundary`: 참고용 공개 보고이며, 이 사례는 자체 요약과 가상의 오프라인 fixture만 사용함
- `quotation_policy`: Issue 원문, 명령, 로그, 스크린샷, 첨부 파일, 계정, 프로젝트 경로, 공급자 설정, 재현 자료를 복사하지 않음
- `source_scope`: 확인 당시 Issue 메타데이터는 공개된 Open 상태의 보고라는 사실만 보여 줍니다. 한 작성자가 특정 환경에서 설명한 내용과 기대는 보여 주지만, 원인, 현재 제품 동작, 빈도, 지원되는 해결책 또는 다른 계정·버전·공급자·작업 흐름·플랫폼의 동작을 입증하지 않습니다.

## 보고된 상황

- `user_report_summary`: 한 공개 보고자는 부모가 하위 Agent에게 작업을 넘기는 과정에서 자식이 시작된 것처럼 보였지만 작업을 받지 않은 듯 답했다고 설명했습니다. 보고에는 둘 이상의 지정된 화면과 설정에서 같은 증상이 나타났다는 설명이 있습니다.
- `observed_symptom`: 하위 작업은 보이거나 활성 상태였지만, 자식의 답변에는 기대한 작업 문장을 받았다는 근거가 없었습니다.
- `expected_behavior`: 보고자는 자식이 부모가 보낸 메시지를 받고 그에 따라 행동하기를 기대했습니다.
- `official_boundary`: `unknown`. 이 사례는 내부 구현, 현재 지원 여부, 설정 또는 수정 방법을 다루지 않습니다.
- `product_surface`: 데스크톱과 CLI가 보고되었지만 어느 쪽도 여기서 재현하지 않았습니다.
- `product_version`: 출처에 나온 버전과 설정은 독립적으로 확인하지 않았습니다.
- `operating_system`: 출처 작성자가 플랫폼을 언급했지만 이 프로젝트에서는 확인하지 않았습니다.
- `model_or_provider`: 사용자 지정 공급자 환경이 보고되었지만 공급자 비교는 하지 않습니다.
- `network_or_auth_context`: 확인하지 않음; 계정, 자격 증명, 공급자, 연결을 사용하지 않음
- `input_shape`: 고정된 가상 수신 문구만 확인하며 실제 작업, 저장소, 파일, 비밀, 사용자 콘텐츠는 사용하지 않음
- `risk_level`: 수신 확인 전에 실제 작업이 되돌릴 수 없는 행동이나 민감한 내용을 넘긴다면 `medium`

## 주장과 증거 표

| 주장 | 증거 분류 | 출처 또는 산출물 | 날짜 | 범위 | 한계 | 상태 |
|---|---|---|---|---|---|---|
| 공개 Issue #37822는 이 사례를 확인한 날 존재했고 Open 상태였다. | `direct` | [GitHub Issue #37822](https://github.com/openai/codex/issues/37822) | 2026-08-14 | 공개 메타데이터 | Open 상태는 활성 결함, 우선순위, 재현, 미해결 원인을 입증하지 않음 | candidate |
| 한 보고자가 자식이 생성 또는 시작되었지만 수신 기록이 보이지 않았다고 설명했다. | `reported` | 같은 공개 Issue | 2026-08-14 | 한 작성자가 말한 환경과 관찰 | 독립 재현이나 일반적 동작 주장이 아님 | candidate |
| 특정 내부 필드나 복호화 경로 때문에 메시지가 사라졌다. | `not_observed` | 로컬 자료, 실행, 독립 검토 없음 | 2026-08-14 | 내부 메커니즘과 진단 | 보고자의 메커니즘 추측을 프로젝트 사실로 채택하지 않음 | unverified |
| 생성, 시작, 수신, 실행, 반환은 따로 기록해야 하는 주장이다. | `project_inference` | 이 사례, 10장, 12장, Lab 013 | 2026-08-14 | 보수적인 다단계 작업 흐름 교육 | 구현, 모든 실패의 탐지, Agent의 안전한 사용을 보장하지 않음 | candidate |

## 재현 상태

- `reproduction_status`: `not_run`
- `reproduction_scope`: 인계 도구를 호출하거나 하위 Agent를 만들거나 로그·세션을 확인하거나 공급자를 사용하거나 보고된 환경을 실행하지 않음
- `fixed_input_or_fixture`: **교육 전환** 섹션의 원래 오프라인 수신 카드
- `logs_or_artifacts`: 나중에 승인된 학습자 실행을 허가할 경우에만 가상 체크 카드와 제한된 결정 기록을 남김
- `independent_reviewer`: 대기 중
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## 가장 작은 안전 진단 경로

| 단계 | 읽기 전용 확인 또는 저위험 행동 | 예상 관찰 | 중지 규칙 |
|---|---|---|---|
| 1 | 가상 인계 카드를 읽고 생성, 시작, 수신, 실행, 반환을 각각 표시합니다. | 화면에 보인 상태를 작업 수신으로 조용히 격상하지 않습니다. | 실제 작업, 개인 내용, 도구, 계정, 설정이 들어오면 중지합니다. |
| 2 | 카드에 생성과 일반적인 자식 응답만 있으면 수신 필드를 `not_observed`로 표시합니다. | 인계는 `blocked`가 되고 결과를 채택하지 않습니다. | 결함, 권한 부족, 안전한 재시도 조건을 추측하지 않습니다. |
| 3 | 하나의 Agent가 맡는 제한된 작업이나 사람이 읽을 수 있는 인계를 대안으로 선택합니다. | 다음 단계의 담당자가 분명하고 숨은 전달 가정이 없습니다. | Agent 생성, 메시지 전송, 설정 변경, 실제 부작용 재시도 전에 중지합니다. |

- `allowed_actions`: 가상 기록 읽기, 관찰 분류, 로컬 수신 기록 작성, 위임하지 않는 대안 선택
- `forbidden_actions`: Agent 생성·깨우기, 작업 전송, 비밀 노출, 로그·세션 읽기, 공급자나 기능 스위치 변경, 부작용 재시도, 설치, commit, push, 게시, 계정 사용
- `minimal_safe_probe`: 고정 문구 `RECEIPT-OK`로 다섯 지점 카드를 완성
- `stop_condition`: 고정 문구를 실제 작업으로 바꾸거나, 대안의 담당자가 없거나, 검토하지 않은 외부 부작용을 추가하는 경우
- `rollback_or_cleanup`: 유용한 결정 기록이 없는 임시 수신 기록은 삭제하고 가상 fixture는 바꾸지 않음

## 교육 전환

- `learner_problem`: 작업 흐름 화면에는 도우미가 있는 것처럼 보이지만, 학습자는 도우미가 작업을 받았는지 알 수 없음
- `core_concept`: 수명 주기가 보이는 것과 메시지가 전달된 것은 다릅니다. 실행을 믿기 전에 신뢰할 수 있는 인계의 수신 경계를 둬야 합니다.
- `decision_to_teach`: 승인된 별도 작업 전에 무해한 수신 probe를 사용하거나, 수신 기록이 없으면 단일 Agent 또는 사람에게 작업을 남깁니다. 전자는 확인 지점을 늘리고 후자는 느릴 수 있습니다. 어느 쪽도 전달 증거를 만들어 내지 않습니다.
- `smallest_experiment`: 다음 오프라인 카드만 사용합니다.

  ```text
  handoff_id: demo-01
  parent_request: "정확히 반환: RECEIPT-OK"
  visible_status: child created; child started
  child_reply: "작업 할당을 기다리는 중입니다."
  receipt_observed: no
  execution_observed: no
  result_returned: no usable task result
  ```

  도구를 실행하지 말고 아래 제한된 결정 기록을 완성합니다.

  ```text
  created: observed
  started: observed
  receipt: not_observed
  execution: not_observed
  returned_result: not_accepted
  decision: blocked — 단일 Agent 또는 사람의 인계를 사용
  external_actions: not_run
  ```

- `intentional_failure`: `created`를 전달 증거로 취급하거나, 자식에게 빠진 작업을 추측하게 하거나, 수신 기록 없이 실제 작업을 보내거나, 보고를 확인된 제품 결함이라고 표현함
- `required_artifact`: 완성된 수신 기록, 관찰하지 못한 지점을 말하는 한 문장, 담당자가 있는 대안
- `acceptance`: 다섯 지점을 모두 구분하고, 메시지 수신을 관찰하지 못했다고 기록하고, 원인이나 설정을 주장하지 않고, 실제 작업을 보내지 않고, 대안을 적고, `external_actions: not_run`을 기록함
- `transfer`: 같은 카드를 큐 작업자, Webhook, 승인 시스템, 빌드 파이프라인, 팀 티켓에 적용합니다. 변하지 않는 원칙은 보이는 수명 주기 이벤트가 다음 실행자에게 내용이 전달되었다는 증거가 아니라는 점입니다.
- `forbidden_claims`: 현재 Codex 결함, 내부 메커니즘, 지원되는 설정, 안전한 재시도, 실행 결과, Agent 능력 보장, 학습자 능력, 전이 성공, 안전 효과 또는 production-ready 상태

## 콘텐츠 위치

- `primary_chapter`: [10장 — 계획과 세로 자르기](../../book/chapters/10-planning-and-slicing-KO.md)
- `supporting_chapters`: [12장 — Agent 루프와 중지](../../book/chapters/12-agent-loop-and-stop-KO.md); [9장 — 검증과 복구](../../book/chapters/09-verification-and-recovery-KO.md)
- `primary_lab`: [Lab 013 — 세로 슬라이스](../../book/labs/lab-013-l3-vertical-slice-KO.md)
- `supporting_labs`: [Lab 007 — 행동 경계](../../book/labs/lab-007-action-boundaries-KO.md); [Lab 016 — 부작용 경계](../../book/labs/lab-016-side-effect-boundary-KO.md)
- `related_skill`: [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`: 없음
- `update_registry_entry`: 출처 변경, 공식 제품 경계의 확인, 통제된 로컬 재현 제안, 실행 가능한 인계 실습 요청이 있으면 재검토

이 사례는 오래된 공개 신호를 검색할 수 있게 만들고 안전한 교육 형태로 바꿉니다. 연결된 장, Lab, Skill, 평가의 성숙도를 바꾸지는 않습니다.

## 개인정보, 권한, 유지 관리

- `personal_data_removed`: 예; 출처의 신원을 재사용하지 않는 가상 실습
- `secrets_removed`: 예; 계정, 공급자, 경로, 작업 내용, 세션 내용을 사용하지 않음
- `private_paths_removed`: 예
- `copyrighted_material_boundary`: 자체 요약과 자체 가상 카드만 사용하며 Issue 원문, 명령, 로그, 첨부, 스크린샷, 답변을 복사하지 않음
- `asset_register_entry`: `docs/sources/asset-register.md`의 S89
- `volatile_facts`: Issue 상태, 제품 지원, 인계 동작, 버전, 공급자, 권한, 구현 세부 사항
- `next_review`: 2026-09-14 또는 제품·런타임·설정·게시 주장을 하기 전
- `change_trigger`: 출처 변경, 공식 문서의 인정, 온라인 실습 제안, 실행 가능한 인계 추가 요청
- `owner`: research-maintainer

## 주장 경계

- `what_can_be_claimed`: 오래된 공개 보고를 출처, 증상, 증거 분류, 재현 상태, 오프라인 진단 경로, 중지 조건을 갖춘 제한된 사례로 나타냈습니다.
- `what_must_not_be_claimed`: 보고가 현재도 유효하거나 재현 가능하다, 모든 인계가 영향을 받는다, 원인을 안다, 설정으로 해결된다, 자식이 숨은 메시지를 받았다, 오프라인 카드가 모든 실패를 발견한다, 학습자가 실제 위임을 완료했다는 주장은 하지 않습니다.
- `next_smallest_check`: 독립 검토와 동의 후 지정된 환경에서 고정 수신 probe를 실행합니다. 무해한 문구만 사용하고 세션, 저장소, 비밀, 계정, 개인 작업, 개인정보를 수집하지 않으며 부작용 전에 중지합니다.
- `current_status`: `candidate`
