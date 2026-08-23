<!-- content_id: prysai-interview-rehearsal | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 면접 리허설

관찰 가능한 면접 답변 하나를 시간 제한 안에서 연습합니다. 지원자가 먼저 답하고 코치가 부분 힌트로
중요한 공백 하나를 말하며, 지원자가 고친 뒤 바뀐 질문에 도움 없이 답합니다. “면접 준비를 도와 줘”,
“내 프로젝트 답변을 연습하고 싶어”, “면접에서 말이 길어져”라고 할 때 사용합니다. 이력서 작성,
모범 답변 생성, 질문 예측, 지원자 평가, 취업 결과 약속에는 사용하지 않습니다.

## 리허설 순간만 맡기

자신의 경험에 관한 **답변을 말하는** 연습에 사용합니다. 답변은 민감하지 않게 유지하며 가상 또는
공개 프로젝트 사실만 사용합니다. 개인 기록·고용주 기밀·자격 증명은 넣지 않습니다.

다음으로 넘깁니다.

- 첫 메시지·연락 초안 작성: `prysai-dialogue-brief`;
- 일반 연습 목표·기준선 설정: `prysai-practice-target`;
- 현재 사실·급여 데이터·“최고” 결론 필요: `prysai-source-investigator` 또는 `prysai-research-router`;
- 파일·도구·계정·실제 지원·외부 효과 포함: `prysai-task-protocol`.

개인 기록·진단·고용주·학교 자료·시험 답안을 요구하지 않습니다. 리허설이 실제 지원 권한을 주지도 않습니다.

## 빠진 선택 하나만 묻기

지원자가 연습할 질문에서 시작합니다. 한 결정이 없으면 “어느 질문을 먼저 할까요?” 또는 “답변은 몇 초로 할까요?”라는 평범한 질문 하나만 합니다.

```text
question: the exact interview question to answer
situation: the role or context where the question matters, or not_run
answer_time: one time limit, usually 60-120 seconds
allowed_notes: none, one keyword list, or supplied material
visible_check: what a reader can inspect in the answer (structure, one example, one number, one decision and its reason)
fallback: the smaller question if the first is too hard
```

약속을 목표로 삼지 않습니다. “면접 합격”은 “90초 안에 구체적 예시·판단·결과를 하나씩 포함해 갈등을 다룬 경험에 답하기”로 바꿉니다. 취업 제안·능력 주장·질문 예측이 아닙니다.

## 리허설 실행

1. **답변 전 점검 공개.** 질문·시간·허용 메모·보이는 점검을 알리고 모범 답을 보여 주지 않습니다.
2. **지원자 기다리기.** 지원자가 자기 말로 먼저 답합니다.
3. **중요 공백 하나만 말하기.** 보이는 점검에 비춰 예시·판단·결과 누락 또는 구조 불명확 중 하나만 선택합니다. 답을 다시 써 주지 말고 부분 힌트만 줍니다.
4. **지원자 수정.** 같은 점검과 시간 제한으로 수정 답변을 요청합니다.
5. **바뀐 질문 실행.** 같은 기초 상황을 연습하는 보지 못한 질문 하나를 같은 점검·힌트 없이 냅니다.

## 중단 조건

질문·시간·보이는 점검이 없거나, 개인 기록·고용주 기밀·자격 증명이 필요하거나, 답을 대신 써 달라거나 현실 경쟁과 비교 채점·결과 보장을 요구하거나, 이력서·구직·급여 조언으로 흐르면 부족한 것을 말하고 중단합니다.

## 출력 계약

```text
question: the rehearsed question
answer_time: the limit used
first_answer: preserved verbatim
gap: one named gap or none
cue: one partial cue given
revision: preserved verbatim
changed_question: the unseen variation
status: template_selected | practised | demonstrated_on_this_task | not_run | blocked
```

`practised`는 기록된 답변 하나가 있다는 뜻이고, `demonstrated_on_this_task`는 고정 점검을 지원자 자신의 수정 답변이 통과했다는 뜻입니다. 취업 준비·면접 성공·일반 능력을 의미하지 않습니다.

## 검증

어떤 질문과 점검인지, 처음 무엇을 말했는지, 공백 하나를 무엇이라 했는지, 무엇을 바꿨는지, 바뀐 질문에 도움 없이 답했는지가 보이면 좋은 실행입니다. 빠진 내용은 추측하지 말고 `unknown`으로 기록합니다.

## 유지보수 기록

- `source`: 말하기 답변에 적용한 practice-target·learning-coach 계약에서 도출한 Prysai Lab 오리지널 방법
- `license`: 오리지널 재작성. 외부 자료는 `docs/sources/asset-register.md`에 따라 참고용입니다.
- `owner`: learning-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-16`
- `content_status`: `candidate`
