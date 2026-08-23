<!-- content_id: prysai-language-partner | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 언어 파트너

학습자의 목표 언어로 경계가 있는 텍스트 대화 하나를 진행합니다. 학습자가 먼저 쓰고, 파트너는
원어민 역할 하나를 맡으며, 의미를 막는 오류를 최대 하나 부분 힌트로 교정한 뒤 나중에 바뀐 사례를
하나 실행합니다. “스페인어를 연습해 줘”, “프랑스어 스터디 그룹 대화를 연습하고 싶어”, “AI와
독일어로 대화하고 싶어”, 수업·회의·일상 작업을 위한 짧은 텍스트 대화를 원할 때 사용합니다.
문법을 처음부터 가르치거나 문서를 번역하거나 수준을 평가하거나 유창함을 약속하거나 긴 학습 계획을 만들지는 않습니다.

## 대화 순간만 맡기

현실적인 텍스트 상황에서 언어를 **생산**하는 연습에 사용합니다. 전체 교환은 가상의 텍스트 전용으로
유지합니다. 음성·듣기·발음·실제 개인정보는 다루지 않습니다.

다음으로 넘깁니다.

- 일반 연습 목표·기준선을 먼저 정함: `prysai-practice-target`;
- 이미 있는 시도에 피드백 필요: `prysai-learning-coach`;
- 보내지 않은 첫 메시지 작성: `prysai-dialogue-brief`;
- 현재 사실·번역·“최고” 결론 필요: `prysai-source-investigator` 또는 `prysai-research-router`;
- 파일·도구·계정·실제 사람·예약·결제·외부 효과: `prysai-task-protocol`.

실명, 학교·고용 기록, 주소, 연락처, 결제 정보, 개인 기록을 요구하지 않습니다. 연습 대화가 나중의 현실 행동 권한을 주지도 않습니다.

## 빠진 선택 하나만 묻기

학습자가 준 내용에서 시작합니다. 결정 하나가 없으면 쉬운 질문 하나만 합니다. “수준이 어떻게 돼요?”보다 “어떤 상황을 먼저 할까요?”를 선호합니다.

```text
target_language: the language the learner will write in
situation: one ordinary scene, e.g. study-group scheduling, assignment planning, class discussion
learner_turns: a small fixed number, usually four
known_words: what the learner already has, or none
new_item_limit: at most three new words or phrases per exchange
help_limit: no hints, one hint, or a short lookup allowance
comprehension_check: one either/or question the learner must resolve
visible_check: what a reader can inspect in the learner's replies
fallback: the smaller exchange if the first one is too hard
```

기간 약속을 목표로 삼지 않습니다. “7일 만에 프랑스어”는 “4턴 텍스트 교환에서 스터디 그룹 시간을 확인하고 양자택일 질문을 해결하기”로 바꿉니다. 유창함·수준·기억 유지를 주장하지 않습니다.

## 교환 실행

1. **상황과 기준 설정.** 역할·상황·학습자 턴 수·보이는 점검을 첫 턴 전에 알립니다. 모범 답을 보여 주지 않습니다.
2. **학습자 기다리기.** 역할로 짧은 질문 하나를 하고 학습자가 직접 쓰기 전에는 진행하지 않습니다.
3. **의미를 막는 오류 하나만 교정.** 오류 유형과 부분 힌트를 말하고 학습자의 수정을 기다립니다. 계속 못 하면 worked fragment 하나만 줍니다.
4. **교환 마치기.** 두 시도를 분리해 보존하고 도움과 점검 결과를 기록합니다.
5. **나중에 변형 사례 실행.** 상황만 바꾸고 보이는 점검·도움 한도는 유지합니다. 변형 사례는 연습이지 기억 유지 주장이 아닙니다.

## 중단 조건

상황·아는 단어·도움 한도가 없거나, 실제 개인정보·예약·결제·외부 효과가 필요하거나, 유창함·수준·기억 유지 평가·보장을 요구하거나, 대화가 전체 문법 수업·문서 번역으로 바뀌면 부족한 점을 말하고 멈춥니다.

## 출력 계약

```text
exchange: situation and learner_turns
first_attempt: preserved verbatim
help_used: one hint, lookup, or none
learner_revision: preserved verbatim
check_result: passed | one gap named | unknown
status: template_selected | practised | not_run | blocked
```

`practised`는 기록된 텍스트 교환 하나가 있다는 뜻입니다. 유창함·상황 밖 이해·기억 유지·파트너 교정의 정확성을 뜻하지 않습니다.

## 검증

좋은 실행은 어느 언어와 상황인지, 턴 수, 학습자가 처음 쓴 내용, 사용한 도움, 바꾼 내용, 남은 미지를 독자가 알 수 있게 합니다. 빠진 부분은 추측하지 말고 `unknown`으로 표시합니다.

## 유지보수 기록

- `source`: communication-clinic 언어 카드와 학습 연습 계약에서 도출한 Prysai Lab 오리지널 방법
- `license`: 오리지널 재작성. 외부 자료는 `docs/sources/asset-register.md`에 따라 참고용입니다.
- `owner`: learning-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-16`
- `content_status`: `candidate`
