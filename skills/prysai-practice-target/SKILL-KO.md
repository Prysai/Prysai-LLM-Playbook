<!-- content_id: prysai-practice-target | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 연습 목표

야심차거나 모호한 학습 희망을 작고 정직하며 프롬프트로 바로 쓸 수 있는 연습 목표 하나로
바꿉니다. “7일 안에 스페인어 배우기”, “면접을 잘하고 싶다”, “AI로 기술을 배우고 싶다”,
“기간이 정해진 목표를 어디서 시작하나”라는 요청에 사용합니다. 코칭 전에 상황·기준선·세션
예산·허용 도움·보이는 점검·fallback을 정합니다. 기술을 가르치거나 학습 계획·숙련도 평가를
만들거나 연구하거나 결과를 약속하지 않습니다.

## 목표 설정 순간 맡기

LLM 연습 전, 목표는 있으나 경계가 있는 첫 시도가 없을 때 사용합니다. 인계를 준비할 뿐 가르치거나
교정·채점하거나 긴 과정 계획을 만들지 않습니다.

다음으로 넘깁니다.

- 시도가 이미 있고 피드백·교정·변형 사례 연습이 필요: `prysai-learning-coach`;
- 보내지 않은 텍스트 요청 하나를 작성: `prysai-dialogue-brief`;
- 기존 첫 요청을 점검: `prysai-first-turn-check`;
- 현재 사실·출처·“최고” 판단에 의존: `prysai-source-investigator` 또는 `prysai-research-router`;
- 파일·도구·계정·사람·시험·공개·결제·외부 효과가 포함: `prysai-task-protocol`.

학습자 개인정보, 진단, 자격 증명, 고용주·학교 자료, 시험 답안을 요구하지 않습니다. 목표 설정
대화가 나중 행동의 권한을 주지도 않습니다.

## 빠진 선택 하나만 묻기

학습자가 이미 준 목표에서 시작합니다. 한 가지 결정이 없으면 쉬운 질문 하나만 합니다. “수준이
어때요?”보다 “어떤 상황을 먼저 다룰까요?”처럼 구체적인 선택을 선호합니다.

다음 필드만 설정합니다.

```text
practice_target: one thing the learner will say, write, choose, explain, or do
situation: one ordinary context where it matters
baseline: one tiny unaided attempt, or not_run
session_budget: one time or turn limit
allowed_help: none, one hint, a lookup limit, or supplied material
visible_check: what a reader can inspect in the learner's attempt
fallback: the smaller version if the first attempt is too hard
```

기간 고정 약속을 목표로 삼지 않습니다. “7일 만에 프랑스어”는 “4턴의 텍스트 대화에서 기차
시간을 묻고 양자택일 답을 해결하기”로 바꿀 수 있지만 유창함·언어 수준·대화 결과·7일 성과의
주장이 될 수 없습니다.

## 사용할 수 있는 인계 하나 반환

필드가 충분하면 정확히 다음을 반환합니다.

```text
target_status: ready_for_first_attempt | needs_one_answer | out_of_scope | blocked
practice_target:
situation:
baseline:
session_budget:
allowed_help:
visible_check:
fallback:
copy_ready_next_message:
handoff:
claim_limit: a selected target is not evidence of learning, retention, transfer, proficiency, or model quality
content_status: candidate
```

`copy_ready_next_message`는 자연스럽고 짧아야 합니다. 받는 모델이 학습자의 첫 답을 기다리고
시도를 보존하며 학습자가 해 보기 전에 완성 답변을 주지 않게 합니다. 영수증을 평가·점수·페르소나·
약속·12단계 계획으로 바꾸지 않습니다. 목표가 풀리지 않으면 `needs_one_answer`와 질문 하나만
반환합니다. 안전 중요·고위험·시험 제한 목표는 `blocked`로 하고 자격 있거나 승인된 다음 경로를
명시합니다.

## 인계 전 점검

관찰 가능한 수행 하나, 상황 하나, 경계가 있는 첫 시도 하나, 도움 규칙 하나, 보이는 점검 하나,
작은 fallback 하나가 있으면 수용합니다. 모든 미지의 내용을 보이게 둡니다. 목표는 연습을 시작할
준비만 뜻하며 학습자가 준비됐다는 뜻이 아닙니다.

## 유지보수 기록

- `source`: 6단계 후보 연습 기록, Beginner Practice Pack, Learning Coach 경계에서 도출한 Prysai Lab 오리지널 방법
- `license`: 오리지널 재작성. 연결된 출처는 참고 자료로만 취급합니다.
- `owner`: learning-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
