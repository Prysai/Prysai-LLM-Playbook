<!-- content_id: prysai-shift-handoff | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 교대 인계

재사용 가능한 기준, 바뀌는 항목, 권한, 수용 증거를 분리해 반복되는 LLM 협업의 현재 작업을
가장 작게 보이게 합니다. 어제의 맥락이나 이전 예시가 오늘의 작업·권한·결과에도 적용된다고
착각할 수 있을 때 사용합니다. 제품 맥락 작성, 전체 작업 프로토콜 설계, 중단 작업 복구,
완료 주장 감사, 행동 실행에는 쓰지 않습니다.

## 반복 작업의 경계만 맡기

승인된 분류표로 오늘 피드백 메모를 분류하거나, 고정된 사내 문체로 이번 주 업데이트를 검토하거나,
새 출처 기록을 정해진 출력으로 바꾸는 등 반복 텍스트 작업의 기준은 유지되고 항목 하나만 바뀔 때 사용합니다.

다음 경우에는 넘깁니다.

- 제품·대상·포지셔닝·측정 맥락 자체를 버전 있는 결정으로 정함: Product Context;
- 결과·범위·권한·수용 기준이 불분명: Task Protocol;
- 이전 작업이 증거가 보이기 전에 멈춤: Interruption Checkpoint;
- 요청·답변·기대 결과가 있고 통제된 수리가 필요: Communication Failure Triage;
- 바뀌는 항목이 현재 사실: Source Investigator;
- 파일·데이터셋·도구·계정·네트워크·공유 시스템·외부 행동 포함: 현재 항목 브리프 전에 Task Protocol.

반복 채팅 패턴 하나를 메모리·컨텍스트 창·비용·지속성·자동화·제품 설정에 대한 주장으로 바꾸지 않습니다.

## 안정 카드와 현재 카드 요구

눈에 보이는 입력만 모으고 없는 필드는 `missing`으로 표시합니다. 다른 대화 턴이나 이전 예시에서 가져오거나 추측하지 않습니다.

**안정 카드**(이름 있는 작업 흐름에서 재사용):

1. `work_stream` — 반복 작업을 쉬운 말로;
2. `criteria_revision` — 규칙의 버전·날짜·불변 참조;
3. `allowed_inputs` — 모든 항목에 쓸 수 있는 자료;
4. `forbidden_assumptions` — 상속하면 안 되는 사실·출처·권한·이전 출력;
5. `response_shape` — 요구 결과 형식.

**현재 카드**(이번 항목에만 참):

1. `item_id` — 민감하지 않은 로컬 라벨;
2. `item_input` — 제공된 현재 텍스트 또는 안전한 최소 요약;
3. `item_change` — 오늘 새롭거나 달라진 점;
4. `task_request` — 지금 요청한 결과 하나;
5. `acceptance_evidence` — 확인할 보이는 규칙·산출물;
6. `authority_and_risk` — `R0` 텍스트 준비 또는 `handoff_required`.

항목에 비밀·개인 기록·허가 없는 출처 텍스트·근거 없는 주장·승인되지 않은 행동이 있으면 거부합니다. 필요 없는 이전 대화 이력은 요구하지 않습니다.

## 쓰기 전 비교

1. 안정 카드의 필드와 현재 항목만의 필드를 모두 분리한다.
2. 이전 예시는 라벨 있는 참고로만 보존하고 현재 사실·수용 결과로 취급하지 않는다.
3. 다시 제공되지 않은 현재 사실·권한·출처·기한·대상·수용 검사를 `missing` 또는 `not_authorized`로 표시한다.
4. 현재 항목이 안정 기준을 바꾸면 멈추고 소유자 또는 Product Context/Task Protocol로 넘긴다.
5. 제공 텍스트만 사용하는 `R0` 작업일 때만 복사 가능한 브리프를 반환한다. 후속 행동에는 자체 경계와 증거가 필요하다.

## 인계 영수증 반환

```text
handoff_status: ready_for_text_only_current_item | blocked_on_<field> | handoff_required
work_stream:
criteria_revision:
stable_card:
current_item:
item_change:
allowed_inputs:
forbidden_inheritance:
requested_response_shape:
acceptance_evidence:
authority_and_risk:
unknowns_or_conflicts:
next_owner_or_action:
claim_limit:
```

안정·현재 카드, 요청, 결과 형식, 수용 증거, `R0` 경계가 모두 보일 때만
`ready_for_text_only_current_item`을 사용합니다. 영수증은 맥락 경계이며 모델이 규칙을 기억·이해하거나 정확한 답을 만들거나 다음 작업을 끝냈다는 증거가 아닙니다.

## 실패 점검

- “지난번과 같은 규칙”이 기준 버전이나 현재 수용 검사를 말하지 않음;
- 오래된 예시가 오늘의 출처·진실이 됨;
- 현재 항목에 파일·자격 증명·개인 자료·브라우징·공개·지출·계정 변경·외부 행동이 포함됨;
- 현재 항목이 안정 루브릭·권한·대상·출력 계약을 변경함;
- 답변이 이미 완료로 취급됨(Evidence Review 사용).

## 유지보수 기록

- `source`: 출처 범위가 있는 반복 항목 연구 기록·Task Protocol·Product Context·Interruption Checkpoint 경계에서 도출한 Prysai Lab 오리지널 방법
- `license`: 오리지널 재작성. 공식 지침과 공개 보고서는 참고 자료로만 취급합니다.
- `owner`: workflow-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
