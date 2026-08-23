<!-- content_id: field-case-blocked-network-boundary-2026-08-14 | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: field-case-blocked-network-boundary-2026-08-14.md | source_revision: 2026-08-23 -->

# 현장 사례: `FC-NETWORK-01` — 차단된 요청이 권한을 넓혀 주지는 않는다

## 먼저 경계를 지키기

요청이 차단되었다는 것은 현재 경로로는 계속 진행할 수 없다는 뜻입니다. 제한 없는 네트워크, 프록시 또는 더 넓은 권한이 허용되었다는 뜻은 아닙니다.

설정을 건드리기 전에 다음 세 가지를 적습니다.

1. 작업에 필요한 하나의 외부 결과. 실제 endpoint나 비밀을 덧붙이지 않습니다.
2. 최소 예외를 승인할 수 있는 사람, 또는 외부 요청을 대신할 승인된 오프라인 산출물.
3. 가장 작은 비민감 probe와 예외가 승인될 때 보존할 증거.

이 중 하나라도 불명확하면 중지하고 더 좁은 결정을 요청합니다. 이 페이지는 오프라인 의사결정 보조 자료이지 설정 안내서가 아닙니다. 네트워크 요청, 프록시 설정, 실제 제품 동작을 다루지 않습니다.

## 사례 개요

- `case_id`: `FC-NETWORK-01`
- `title`: 차단된 요청이 권한을 넓혀 주지는 않는다
- `problem`: 네트워크 요청이 차단되었고, 검토 가능한 최소 예외를 요청할지 근거 없이 접근을 넓힐지 결정해야 함
- `audience`: 도구를 사용하는 개발 환경의 학습자와 리뷰어
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: 4장, 9장, 13장
- `related_labs`: Lab 001, Lab 007, Lab 016
- `related_skills`: Task Protocol, Evidence Review
- `related_evaluations`: 배정되지 않음

## 출처 기록

- `source_type`: `forum`
- `source_url`: https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox
- `source_title`: sandbox 안의 Codex CLI 세션에서 외부 접속하는 방법에 관한 공개 질문
- `source_author_or_publisher`: Stack Overflow 공개 기여자
- `accessed_at`: 2026-08-10, `field-problems-forums-2026-08-10.md`에 기록된 날짜
- `source_license_or_usage_boundary`: 공개 보고는 참고용이며, 이 사례는 자체 요약과 가상의 오프라인 fixture만 사용함
- `quotation_policy`: 게시물 원문, 설정 조각, 로그, 자격 증명, 실제 환경 URL, 우회 명령을 복사하지 않음
- `source_scope`: 질문은 한 작성자가 한 환경에서 외부 요청이 차단되었다고 설명했다는 사실만 보여 줍니다. 현재 설정 문법, 공식 제품 경계, 안전한 해결책, 원인 또는 다른 환경의 동작을 입증하지 않습니다.

## 보고된 상황

- `user_report_summary`: 질문 작성자는 sandbox를 유지하면서 명령이 공개 호스트에 접근하기를 원했지만, 작업을 끝내기 전에 요청이 차단되었다고 설명했습니다.
- `observed_symptom`: 프록시나 허용 목록과 비슷한 외부 요청 차단이 보고됨
- `expected_behavior`: 좁은 네트워크 경로가 sandbox와 함께 작동하기를 기대함
- `official_boundary`: 이 사례에서는 `unknown`. 현재 설정 문법이나 지원 보장을 가르치지 않음
- `product_surface`: 보고된 CLI
- `product_version`: 확인된 사실로 기록하지 않음
- `operating_system`: 확인된 사실로 기록하지 않음
- `model_or_provider`: 교육적 판단과 무관함
- `network_or_auth_context`: 제한된 외부 경로가 보고되었으나 계정, 프록시, 자격 증명을 확인하지 않음
- `input_shape`: 작업에 필요한 공개 호스트(실제 호스트는 의도적으로 생략)
- `risk_level`: 실제 작업에서 네트워크, 프로젝트 문맥 또는 프록시를 넓히면 `high`

## 주장과 증거 표

| 주장 | 증거 분류 | 출처 또는 산출물 | 날짜 | 범위 | 한계 | 상태 |
|---|---|---|---|---|---|---|
| sandbox Codex CLI 세션에서 외부 요청이 차단되었다는 보고 | `reported` | [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox) | 2026-08-10 | 하나의 보고 환경 | 질문은 재현, 진단, 지원 보장이 아님 | candidate |
| 보고서에 최신의 안전한 설정 방법이 있음 | `not_observed` | 설정을 복사·실행·독립 검토하지 않음 | 2026-08-14 | 설정과 배포 | 의도적으로 사례 범위 밖 | unverified |
| 차단은 제한 없는 네트워크나 프록시 변경의 허가임 | `not_observed` | 소유자 승인과 실제 작업이 없음 | 2026-08-14 | 네트워크 정책을 바꿀 권한 | 차단은 경계의 증거이지 경계를 제거할 허가가 아님 | unverified |
| 목표, 이유, 최소 범위, 안전한 probe를 검토할 수 있을 때까지 요청을 차단 상태로 유지해야 함 | `project_inference` | 이 사례, 13장, Lab 007, Lab 016 | 2026-08-14 | 외부 효과에 대한 보수적 교육 규칙 | 공급업체 설정을 정의하거나 예외의 안전성을 보장하지 않음 | candidate |

## 재현 상태

- `reproduction_status`: `not_run`
- `reproduction_scope`: 네트워크 요청, 실제 sandbox 검사, 프록시 변경, 허용 목록 추가, 계정 사용을 하지 않음
- `fixed_input_or_fixture`: **교육 변환** 섹션의 오프라인 기록
- `logs_or_artifacts`: 승인된 실습에서 사용할 경계 카드와 짧은 결정 기록
- `independent_reviewer`: 대기 중
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## 가장 작은 안전 진단 경로

| 단계 | 읽기 전용 확인 또는 저위험 행동 | 예상 관찰 | 중지 규칙 |
|---|---|---|---|
| 1 | 로컬 fixture에 필요한 결과, 호스트 범주, 허용 행동, 증거, 중지 조건을 적습니다. | 외부 효과와 작업 목표가 분리됩니다. | 호스트, 이유, 소유자, 데이터 분류, 외부 효과가 불명확하면 중지합니다. |
| 2 | 합성 차단을 `reported`로 기록하고 유효 정책, 대상, 최소 범위, 안전한 probe의 빈칸을 적습니다. | 오류처럼 보이는 기록은 경계의 증거이지 진단이 아닙니다. | 설정 변경, 제품 결함, 해결 성공을 추정하지 않습니다. |
| 3 | 소유자에게 보낼 결정 요청에 호스트가 필요한 이유, 비민감 최소 probe, 남길 증거, 되돌리는 방법을 적습니다. | 예외를 승인·거부·축소할 수 있습니다. | 실제 요청, 프록시·정책 변경, 설치, 업로드, 자격 증명 사용 전에 중지합니다. |

- `allowed_actions`: 가상 기록 읽기, 증거 분류, 로컬 결정 요청 작성, 오프라인 대안 확인
- `forbidden_actions`: 네트워크 요청, 정책 편집, 프록시 추가, 비밀 노출, 의존성 설치, 권한 변경, commit, push, 게시, 계정 사용
- `minimal_safe_probe`: 네 줄 경계 카드와 최소 호스트 범위·비민감 테스트를 적은 승인 요청
- `stop_condition`: 소유자 결정, 데이터 분류, 대상, 증거 계획, 복구 경로 중 하나라도 없음
- `rollback_or_cleanup`: 보존할 가치가 없으면 임시 기록을 삭제하고 가상 fixture는 그대로 둠

## 교육 변환

- `learner_problem`: 작업에 외부 입력이 필요하지만 첫 요청이 차단되어 학습자가 제한을 없애고 싶어 함
- `core_concept`: 기술적 한계, 작업의 필요, 한계를 바꿀 권한은 별개의 사실입니다. 오류는 새 권한을 만들지 않습니다.
- `decision_to_teach`: 최소한으로 검토 가능한 예외를 요청하고 잠시 멈추거나, 승인된 오프라인 산출물을 사용하거나 작업을 미룹니다. 조용히 접근을 넓히는 것보다 모두 정직한 선택입니다.
- `smallest_experiment`: 요청을 보내지 말고 다음 오프라인 기록만 사용합니다.

  ```text
  task: 아직 다운로드하지 않은 checksum 확인
  local record: 필요한 공개 호스트 요청이 fixture에서 차단됨
  proposed next action: 제한 없는 네트워크를 켜고 다시 시도
  ```

  다음 기록을 작성합니다.

  ```text
  observed: fixture에 차단이 기록됨
  known need: checksum 작업에 지정 범주의 공개 호스트가 필요함
  missing evidence: 유효 정책, 소유자 승인, 최소 probe, 복구 경로
  decision: blocked — 최소 예외 또는 승인된 오프라인 산출물 요청
  external actions: not_run
  ```

- `intentional_failure`: 차단을 제한 없는 네트워크의 허가로 간주하거나, 검토 없이 프록시가 안전하다고 하거나, 확인 가능한 산출물 없이 checksum을 검증했다고 말함
- `required_artifact`: 완성된 기록, 작업 목표와 권한 요청을 구분하는 한 문장, 안전한 오프라인 대안
- `acceptance`: 차단을 진단하지 않고 기록하며, 호스트는 범주로만 적고, 제한 없는 제안을 거부하고, 소유자의 결정 또는 오프라인 대안을 남기고, `external actions: not_run`을 기록합니다.
- `transfer`: 패키지 다운로드, 연구 API, Webhook, 브라우저 제출에도 같은 경계를 적용합니다. “기술적 필요가 권한을 만들지 않는다”는 원칙은 유지하고 대상과 최소 probe만 바꿉니다.
- `forbidden_claims`: 현재 Codex 설정, 공식 네트워크 정책, 제품 결함, 안전한 프록시, 성공한 요청, 로컬 재현, 학습자 역량, 안전 효과, 전이 성공, 프로덕션 준비 완료

## 콘텐츠 배치

- `primary_chapter`: [13장 — 행동 경계](../../book/chapters/13-action-boundaries-KO.md)
- `supporting_chapters`: [4장 — 맥락·권한·Agent 행동 경계](../../book/chapters/04-context-permissions-and-agent-KO.md); [9장 — 검증·의심·복구](../../book/chapters/09-verification-and-recovery-KO.md)
- `primary_lab`: [Lab 016 — 부작용 경계](../../book/labs/lab-016-side-effect-boundary-KO.md)
- `supporting_labs`: [Lab 001 — 첫 번째 안전한 작업](../../book/labs/lab-001-first-safe-task-KO.md); [Lab 007 — 행동 경계](../../book/labs/lab-007-action-boundaries-KO.md)
- `related_skill`: [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`: 배정되지 않음
- `update_registry_entry`: 공개 출처 변경, 공식 정책 추가, 실제 실습 제안, 설정 예시 추가 시 다시 검토

이 사례는 과거 현장 신호를 검색 가능한 경계 사례로 바꿉니다. 연결된 콘텐츠의 성숙도를 높이지는 않습니다.

## 개인정보, 권한, 유지보수

- `personal_data_removed`: yes; 실습은 가상이며 실제 신원이나 endpoint를 재사용하지 않음
- `secrets_removed`: yes; 자격 증명, 프록시, 계정, 프로젝트 경로, 실제 URL이 없음
- `private_paths_removed`: yes
- `copyrighted_material_boundary`: 자체 요약과 자체 fixture만 사용하며 게시물, 설정, 답변을 복사하지 않음
- `asset_register_entry`: `docs/sources/asset-register.md`의 S88
- `volatile_facts`: 출처 상태, 제품 설정, 기본값, 프록시 동작, 제품 지원
- `next_review`: 2026-09-14 또는 설정·보안·실행·게시 주장을 하기 전
- `change_trigger`: 출처 또는 공식 문서 변경, 실제 실습 제안, 새 설정 예시
- `owner`: research-maintainer

## 주장 범위

- `what_can_be_claimed`: 이전 공개 보고를 출처 유형, 증상, 증거 분류, 재현 상태, 저위험 진단 경로, 중지 규칙이 있는 후보 사례로 정리했습니다.
- `what_must_not_be_claimed`: 보고가 현재이거나 재현 가능함, 원인을 알고 있음, 제한 없는 접근이 필요하거나 안전함, 제품이 특정 설정을 지원함, fixture가 보안을 증명함, 학습자가 결정을 완료함
- `next_smallest_check`: 고정된 오프라인 기록을 독립적으로 검토하고 동의받은 뒤 실행합니다. 네트워크 트래픽, 자격 증명, 계정, 프로젝트, 프록시, 개인정보를 수집하지 않습니다.
- `current_status`: `candidate`
