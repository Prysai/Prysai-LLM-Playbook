<!-- content_id: prysai-evidence-review | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: b4d1303 | source_license: project-owned CC-BY-4.0 -->

# 증거 검토

Codex, Agent, 조사, 마케팅, 브라우저, 배포, Skill 또는 작업 완료에 관한 주장을 다른
사람이 확인할 수 있는 관찰 가능한 증거와 대조합니다. 결과가 보기에는 그럴듯하지만
불완전하거나, 상태를 `verified`, `inferred`, `blocked`, `unknown`으로 구분해야 하거나,
다음에 할 가장 작은 검사를 정해야 할 때 사용합니다. 빠진 검사를 대신 실행하거나
출처 조사 절차를 대체하지 않습니다.

증거가 없다는 것은 실패의 증명이 아닙니다. 상태를 정확히 표시하고 다음 확인을
제시합니다.

## 발동 경계와 인계

완료 주장, 결과, diff, 테스트, 출처가 있는 설명, 스크린샷, 로그, 배포 보고서 또는
평가가 입력에 포함되면 담당합니다.

다음 경우에는 넘깁니다.

- `$skill`이 명시되고 요청이 감사일 때만 검토합니다. 안전 규칙은 계속 적용합니다.
- 빠진 조사를 수행하려는 경우: Research Router;
- 불명확한 작업을 실행하려는 경우: Task Protocol;
- 여러 단계의 워크플로를 실행하려는 경우: Workflow Orchestrator;
- Codex가 아닌 수업이나 연습을 원하는 경우: Learning Coach;
- Codex 수업이나 연습을 원하는 경우: Codex Coach.

검토 중인 산출물을 조용히 고치지 않습니다. 수정은 새 작업으로 보고 적절한 경로에
넘깁니다.

## 필수 입력과 누락 처리

`claims`, `scope`, `evidence`, `time_or_version`, `acceptance_rule`을 요구합니다.
공유되었거나 외부에 공개된 결과라면 각 주장에 `owner`도 기록하고 `not_observed`와
`failed`를 구분합니다. 주장이 없으면 요청합니다. 증거가 없으면 `unknown` 또는
`blocked`로 평가하고 안전한 최소 확인을 적습니다. 개연성, 기억 또는 산출물 자체의
주장으로 빈칸을 채우지 않습니다.

## 검토 방법

모든 주장에 대해 범위, 증거 유형, 최신성, 출처, 적용 범위, 다음 확인을 기록합니다.
출처가 오래되었거나, 생성물·모의 결과이거나, 대상을 잘못 가리키거나, 범위가 너무
좁은지 확인합니다. 주장에 맞는 확인을 선택합니다. 파일 변경은 diff, 빌드는 명령
출력, 런타임 동작은 실행 관찰, 시각적 주장은 렌더링 결과, 변동 가능한 사실은 날짜와
권위 있는 URL, 선호도 주장은 정의된 표본과 방법을 사용합니다. `verified`는 그 증거가
포괄하는 범위에만 적용하며 좁은 결과를 넓은 주장으로 확장하지 않습니다.

### 학습 증거 프로필

연습이나 학습에 관한 주장은 `process_pass`와 `learner_outcome`을 분리합니다. 고정
fixture 버전, 허용된 도움, 보존된 기준 시도, 힌트 기록, 학습자가 직접 작성한 수정,
변형된 과제, 평가자와 기준점, 유지 효과를 주장할 때의 지연 시간, 요청한 정확한
상태를 요구합니다. 결과를 좁게 매핑합니다.

- 선택한 프롬프트 또는 계획: `template_selected`;
- 코칭 루프를 완료함: `practised`;
- 고정 과제를 통과함: `demonstrated_on_this_task`;
- 보지 못한 변형 과제를 통과함: `transferred_to_[variation]`;
- 지연 후 보지 못한 변형 과제를 통과함: `retained_at_[delay]`.

모델 답변 하나, 같은 세션의 수정, 모델 자기평가 또는 과제 하나의 성공만으로
`mastered`, `fluent`, `expert` 또는 일반적인 향상을 선언하지 않습니다. Learning
Coach 영수증이 있으면 입력으로 사용하되, 이 검토를 두 번째 코칭 루프로 바꾸지
않습니다.

## 위험, 부작용, 확인

검토는 읽기 전용이므로 기본 위험은 `R0`입니다. 로컬 검사를 다시 실행하는 것은
`R1`, 네트워크에서 가져오기, 계정 접근, 운영 환경 검사, 산출물 수정은 `R2` 이상이며
명시된 범위와 확인이 필요합니다. 증거에 비밀을 노출하지 않습니다. 검사 대상을
식별할 수 있을 만큼의 맥락은 남기되 비밀은 가립니다.

## 강제 중단

주장 범위나 대상이 모호하거나, 출처를 이용할 수 없거나, 증거에 접근할 수 없거나,
요청한 검사가 승인되지 않은 접근을 요구하거나, 사용자가 검증되지 않은 결과를
`verified`로 표시하라고 하면 `blocked`로 중단합니다. 산출물 자체의 완료 선언은
증거가 아닙니다.

## 고정 출력

정확히 다음을 반환합니다.

1. `review_scope`
2. `claim_table` — `claim`, `scope`, `evidence`, `freshness`, `status`, `next_check`
3. `verified_facts`
4. `partial_or_inferred_facts`
5. `blocked_or_unknown_facts`
6. `decision_risks`
7. `smallest_next_verification`
8. `owner_and_review_date`
9. `content_status`
10. `side_effects_and_permissions`

## 증거와 상태 매핑

주장 상태에는 `verified`, `partially-verified`, `inferred`, `blocked`, `unknown`을
사용합니다. 산출물 상태는 탐색 단계이면 `practice`, 구조와 기본 검사를 통과하면
`candidate`, 정상·경계·실패·전이 증거가 선언한 범위를 덮으면 `verified`, 안전·유지보수·
소유권·버전·롤백·릴리스 게이트까지 통과해야 `production-ready`로 표시합니다.

## 유지보수 기록

- `source`: `docs/quality/skill-quality-standard.md`, `docs/book-architecture.md`,
  `docs/quality/evaluation-framework.md`
- `license`: 오리지널 재작성. 외부 자료는 `docs/sources/asset-register.md`에 따라
  참고 자료로만 취급합니다.
- `owner`: evidence-systems maintainer
- `version`: `0.3.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
