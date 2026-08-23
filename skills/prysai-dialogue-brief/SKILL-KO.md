<!-- content_id: prysai-dialogue-brief | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: dea08a5 | source_license: project-owned CC-BY-4.0 -->

# 대화 브리프

아직 시도하지 않은 저위험 요청을 짧고 바로 복사해 보낼 수 있는 첫 메시지로 정리합니다. 이 Skill은 본격적인 답변, 도구 작업, 조사 또는 학습 루프가 시작되기 전에 요청의 범위를 정리하는 역할을 합니다. 요청을 실행하거나 답변의 품질을 판단하지는 않습니다.

## 먼저 사용 조건을 확인하기

다음 조건을 모두 만족할 때만 사용합니다.

- 사용자가 아직 요청을 보내지 않았고, 고칠 실패 답변도 없습니다.
- 텍스트만으로 끝나는 저위험 첫 대화입니다.
- 파일, 도구, 계정, 브라우징, 비공개 기록, 게시 또는 외부 행동이 필요하지 않습니다.
- 사용자는 범위가 정해진 요청의 표현을 다듬으려는 것이지, 기술을 연습하거나 사실을 조사하려는 것이 아닙니다.

학습자가 기준선, 피드백, 교정 또는 전이 연습을 원하면 `prysai-learning-coach`로 넘깁니다. Codex, 도구, Skill 또는 Agent가 관련되면 `prysai-codex-coach`로 넘깁니다. 파일, 권한, 계정, 외부 행동 또는 실제 전달 대상이 포함되면 `prysai-task-protocol`로 넘깁니다. 최신 사실, 출처 또는 근거가 있는 결론이 필요하면 `prysai-source-investigator` 또는 `prysai-research-router`로 넘깁니다. 요청과 불만족스러운 답변이 이미 있다면 `prysai-communication-failure-triage`를, 기존 주장이 근거로 뒷받침되는지 확인하려면 `prysai-evidence-review`를 사용합니다.

비밀, 민감한 개인정보, 공개되지 않은 기록, 자격 증명, 계정 상태 또는 비공개 프롬프트를 요구하지 않습니다. 브리프를 작성하는 것이 이후 행동을 허가하는 것은 아닙니다.

## 첫 번째 응답에 필요한 정보만 모으기

가능하면 사용자의 표현을 그대로 살려 다음 항목을 수집합니다.

```text
outcome: 첫 응답에서 얻으려는 관찰 가능한 결과 하나
audience: 결과를 사용하거나 읽을 사람
supplied_inputs: 이번 차례에 안전하게 제공된 텍스트나 사실
constraints: 보존할 사실, 제한, 말투, 제외 사항 또는 도움 규칙
output_shape: 요청한 형식과 길이
acceptance_check: 사용자가 수락하기 전에 확인할 것
stop_boundary: 일어나면 안 되는 일 또는 없으면 멈춰야 하는 사실
```

어떤 항목이 빠져 결과가 크게 달라진다면 `needs_clarification` 양식으로 쉬운 확인 질문을 하나만 돌려줍니다. 미완성 브리프를 먼저 쓰거나, 대상을 지어내거나, 모르는 내용을 그럴듯하게 채우거나, 브리프를 풍성해 보이게 하려고 질문을 여러 개 하지 않습니다. 한 번 확인한 뒤에도 관찰 가능한 결과를 정할 수 없다면 `blocked: outcome_not_observable`을 반환하고 가장 작은 미결정 사항을 적습니다.

## 첫 메시지 작성하기

120–180단어의 브리프를 먼저 쓰고, 이어서 바로 복사할 수 있는 첫 메시지를 씁니다. 범위는 한 번의 대화로 제한합니다. 직접적이고 평범한 표현을 사용하며 역할극, 감정적 압박, 숨은 추론 요청, 성능 약속 또는 “도움이 되게” 같은 상투적인 문구를 넣지 않습니다.

복사할 메시지에는 다음 요소를 자연스러운 문장과 라벨로 포함합니다.

```text
Outcome
Audience
Supplied inputs
Constraints
Output shape
Acceptance check
Stop boundary
```

답변에 필요한 사실을 사용자가 주지 않았다면, 받는 모델이 그 사실을 추측하지 말고 `unknown`으로 표시하게 합니다. 출처가 필요하면 출처 계획을 요청하거나 멈춥니다. 근거 없이 확신하는 사실 답변을 요구하지 않습니다.

## 간단한 receipt 반환하기

중요한 항목이 빠졌다면 다음을 정확히 반환합니다.

```text
brief_status: needs_clarification
clarifying_question:
known_inputs:
risk: R0
content_status: candidate
handoff:
```

항목이 충분하다면 다음을 정확히 반환합니다.

```text
brief_status: ready_to_copy | blocked
dialogue_brief: 120–180 words
first_turn: copy-ready text
inputs_preserved:
unknowns:
acceptance_check:
stop_boundary_or_blocker:
risk: R0
evidence: selected brief revision only
content_status: candidate
handoff:
```

제공된 사실을 보존하고, 관찰 가능한 확인 하나를 포함하며, 행동이나 데이터 범위를 임의로 넓히지 않고, 첫 차례를 넘어가는 작업의 담당 경로를 밝혔을 때만 결과를 수락합니다. `ready_to_copy`는 브리프가 준비되었다는 뜻일 뿐 모델의 행동, 답변 품질, 학습 효과, 사실의 정확성, 사용자의 만족 또는 작업 완료를 증명하지 않습니다.

## 유지보수 기록

- `source`: communication-clinic, task, evidence, routing 계약을 바탕으로 한 Prysai Lab 오리지널 방법
- `license`: 오리지널 재작성. 외부 자료는 `docs/sources/asset-register.md`의 참고 자료로만 남김
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
