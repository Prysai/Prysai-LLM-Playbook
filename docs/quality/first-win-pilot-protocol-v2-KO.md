<!-- content_id: first-win-pilot-protocol-v2 | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: first-win-pilot-protocol-v2.md | source_revision: 2026-08-23 -->

# First Win 파일럿 프로토콜 v2

**상태:** `candidate` 프로토콜. 모집, 참가자 실행, 결과는 기록되지 않았다.

## 이 파일럿이 알려 줄 수 있는 결정

가이드를 처음 읽는 사람이 모델이 쓴 짧은 메시지에서 누락된 출처 사실과 근거 없는
추가 사실을 찾아 First Win 방법을 사용하고, 보지 못한 메시지에서도 확인을 반복할 수 있는가?

이 파일럿은 과제, 루브릭, 문장, 경로 순서를 개선할 수 있지만 교육 효과, 보존,
일반적인 글쓰기 능력, 모델 신뢰성, 시장 수요, 인기, 다른 과정보다 우수하다는 사실을
증명할 수 없다.

## 좁은 구성 개념

검토 대상은 하나다.

> 짧은 모델 답변의 출처 충실성 오류를 찾아내고, 근거 없는 정보를 추가하지 않은 채 가장 작은 수정을 한다.

자신감, 취향, 공손함, 문법 수준, 프롬프트 길이, 모델 선호, Codex 능력은 이 구성 개념의
점수에 넣지 않는다.

## 참가자와 권한

이 가이드를 사용하지 않았지만 채팅 모델을 써 본 성인 5–8명을 모집한다. 경험 있는 초보자
표본이며, 처음 채팅하는 사람에 대한 증거가 아니다. 첫 라운드는 효과 연구가 아니라 측정 도구
디버깅이다. 한 라운드에는 고정된 저장소 commit 또는 변경할 수 없는 Pages 후보 하나만 쓴다.

모집 전에 모집 채널, 개인정보 담당자, 진행자, 독립 채점자, 보존 기간, 삭제 날짜를 정한다.
참여는 자발적이어야 한다. 미성년자, 직속 부하, 성적에 영향을 받는 학생, 거절하기 어려운 사람을
모집하지 않는다.

이름, 연락처, 원본 채팅, 계정 자료, 사적 파일, 고용주 자료, 건강·금융 정보, 화면 녹화를
수집하지 않는다. 무작위 세션 코드, 거친 경험 구간, 조건 기록, 채점한 산출물, 소요 시간,
사용한 도움, 첫 이탈 지점, 비식별 관찰 메모만 보관한다.

## 고정 조건

첫 세션 전에 다음을 기록한다.

- 프로토콜 revision과 후보 SHA
- 진입 URL과 언어
- 브라우저 버전과 viewport
- 모델과 표면, 보이는 설정
- 진행자와 독립 채점자
- 루브릭 revision, 보존 종료일, 삭제 담당자

한 라운드 동안 모델, 프롬프트, 과제 순서, 루브릭, 공개 사이트 revision을 고정한다.
하나라도 바꿔야 하면 라운드를 멈추고 새 revision으로 시작한다. 중도 포기와 제외도 집계한다.

## commit에 묶인 파일럿 패키지

승인된 세션 전에 [pilot-kit 계약](../governance/first-win-pilot-kit.yaml)으로 하나의 로컬 전용
패키지를 만든다. 고정 참가자 worksheet, 진행자 runbook, 채점자 key, 빈 기록, 집계 템플릿을
기존 commit에서 복사하고 정확한 digest를 쓴다. 생성기는 잘못된 commit, 비어 있지 않은 출력
디렉터리, 잘못된 역할 별칭, 진행자와 독립 채점자가 같은 별칭인 경우, 만료된 보존일, 자격 증명·
쿼리·fragment가 든 URL을 거부한다. 진행자와 독립 채점자는 서로 다른 사람이어야 하며, 이름 대신
역할 별칭으로 분리를 감사할 수 있게 한다. 생성기는 모집·연락·데이터 수집·승인을 하지 않는다.

권한, 개인정보, 보존, 독립 검토 역할을 확인한 뒤 저장소 루트에서만 실행한다.

```text
python scripts/first_win_pilot_kit.py \
  --candidate-sha <full-40-character-commit-sha> \
  --output-dir .work/first-win-pilot/<round-label> \
  --pilot-authorizer <role-alias> \
  --privacy-owner <role-alias> \
  --moderator <role-alias> \
  --independent-scorer <role-alias> \
  --deletion-owner <role-alias> \
  --recruitment-channel <approved-channel-alias> \
  --retention-end <YYYY-MM-DD> \
  --locale <locale> \
  --model-surface <surface-label> \
  --browser-os-viewport <environment-label>
```

첫 세션 전에 `--validate-package <local-package-path>`를 실행하고 `manifest.json`을 선택한
commit과 비교한다. 참가자 데이터를 패키지에 넣지 않는다. 빈 CSV는 필드만 정의한다. 채점자 key는
참가자에게 주지 않는다. `prepared_no_recruitment_or_participant_run_recorded`는 준비 상태이지
학습자 증거가 아니다.

## 1단계 — 도움 없는 기준선

First Win 프롬프트, 예시, check, rescue prompt를 보여 주지 않는다. 다음 허구의 출처와 일부러
결함을 넣은 답변을 보여 준다.

> The volunteer briefing starts Tuesday at 3. Bring the printed checklist. If you cannot attend, message the coordinator.

> The volunteer briefing starts Tuesday at 3 in Room 204. If you cannot attend, email the coordinator.

참가자에게 출처 충실성 문제를 모두 표시하고 수정 메시지를 쓰게 한다. 결함의 개수나 종류는
말하지 않는다. 고정 answer key에는 세 가지가 있다.

1. `Bring the printed checklist`가 빠졌다.
2. `Room 204`를 만들어 냈다.
3. 근거 없는 연락 방식 `email`로 `message`를 바꿨다.

## 연구 화면 제시

공개 선택형 워밍업은 세 가지 check 상태를 모두 선택해야 허용 가능한 예시를 보여 준다.
연구 worksheet는 공개 source, prompt, check, rescue prompt, 비교 게이트, 경계 문장을 한 commit에
묶고 URL과 digest를 기록해야 한다. worksheet 결과를 도움 없는 공개 홈페이지 사용의 증거라고 부르지 않는다.

기준선 전에 별도의 무점수 공개 화면 관찰을 한다. 추천 Codex 경로와 선택 워밍업을 구분하는지,
첫 로컬 과제를 찾는지, 예시가 설명용이라는 점을 이해하는지, check에 도달하는지를 기록한다.
관찰과 과제 점수를 섞지 않는다. 관찰이 끝날 때까지 worksheet, prompt, 예시, check, rescue, key를 보이지 않는다.

## 2단계 — First Win 안내

commit에 묶인 worksheet를 연다. 참가자는 고정 source를 사용해 prompt를 복사하고, repair 전에
모델의 첫 답변을 보존한다. 각 check에 `PASS / FAIL / UNSURE`와 판단을 뒷받침하는 정확한 단어를
기록한 뒤 예시를 공개한다.

모든 check가 통과하면 `not_observable_no_failure`로 기록하고 recovery 성공으로 세지 않는다.
그 다음 다음의 고정 결함 답변을 보여 주고 첫 실패 check를 찾아 같은 rescue prompt를 사용하게 한다.

> The workshop starts Friday at 10 in Studio B. Please bring your notes. If you cannot attend, email the organizer.

첫 판단 전에 예시가 보였다면 `example_exposed`로 기록하고 2단계 비교 점수만 제외한다. 이 제시
실수만으로 기준선이나 이후 보존 기록을 버리지 않는다. 참가자가 source 사실과 누락 정보를 구분했는지,
`UNSURE`를 허용 상태로 취급했는지, 진행자 도움 없이 첫 실패를 찾았는지, 필요한 것만 고쳤는지,
연습이 증명하지 않는 것을 설명했는지를 기록한다.

## 3단계 — 즉시 보지 못한 전이

원래 prompt를 그대로 주지 않고 새 허구의 source를 보여 준다.

> The repair appointment is Monday at 8. Leave the side gate unlocked. Call us if the time no longer works.

참가자는 짧은 지시를 쓰고 답변을 점검한 뒤 필요하면 고친다. 지시, 첫 답변, 표시한 발견,
최종 답변, 전후 diff의 다섯 기록을 보존한다. 첫 답변이 맞아도 점검했다는 증거는 아니다.
source에 충실하면 `no_correction_needed`로 적고 First Win을 다시 열거나 문장을 복사한 것까지 모든 도움을 기록한다.

## 4단계 — 지연된 보지 못한 전이

48–72시간 뒤 다른 분야에서 원래 prompt, check, 예시, rescue 문장을 주지 않고 사용한다.

> Applications close Thursday at noon. Attach one work sample. Contact the programme office if the form does not open.

참가자가 모델을 지시하고 답변을 검사해 충실성 오류를 고치게 한다. 3단계와 같은 다섯 기록을
남기고 돌아왔는지를 적는다. 늦은 자료가 없다고 마지막 점수로 대신하지 않는다.

## 세션 기록

단계마다 한 행을 쓰고 두 채점자의 열을 모두 보존한다.

```text
session_code | phase | timer_start | timer_end | completed | first_answer
participant_instruction | marked_findings | check_1 | check_2 | check_3
help_code | recovery_branch | final_answer | before_after_diff | drop_off
example_exposed | scorer_a_dimensions | scorer_b_dimensions | disagreement
```

2단계 시간은 source가 보이는 순간부터 세 check 판단을 잠그고 repair를 마치거나
`not_observable_no_failure`를 기록할 때까지 잰다. 15분은 검증되지 않은 목표이지 합격 기준이 아니다.

허용 `help_code`: `none`, `reopen_first_win`, `copy_text`, `moderator_clarification`, `other_recorded`.
허용 recovery: `independent`, `seeded`, `not_observable_no_failure`, `not_attempted`, `stopped`.
필수 필드가 모두 있어야 단계가 완료된다. 빠진 값은 0점이 아니다.

## 채점 루브릭

가능하면 단계를 모르는 상태에서 기준선과 전이 산출물을 평가한다.

| 차원 | 0 | 1 | 2 |
| --- | --- | --- | --- |
| 필수 사실 | 두 개 이상 누락/변경 | 하나 누락/변경 | 모두 보존 |
| 근거 없는 사실 | 두 개 이상 추가 | 하나 추가 | 없음 |
| 요청한 행동 | 없거나 크게 변경 | 있으나 모호함 | 명확히 보존 |
| 수정 범위 | 새 결함을 만듦 | 목표를 고치지만 불필요한 수정 | 가장 작고 충분함 |

두 채점자가 독립적으로 모든 산출물을 점수 내고 두 점수와 불일치 이유를 보존한다. 평균으로
숨기지 말고 차원별 일치와 불일치를 보고한다. 첫 라운드에서 일관되게 적용할 수 없으면 루브릭을 고친다.

## 중지와 안전

사적 자료를 쓰려 하거나, 고용·학업 평가로 오해하거나, 불편함을 느끼거나, 외부 행동이 필요하면
세션을 중지한다. 사적 자료를 삭제하고 안전 중지만 기록한다. 두 참가자가 양립할 수 없게 이해하거나,
answer key가 모호하거나, 표면이 고정 조건을 유지하지 못하거나, 두 세션에서 예시가 너무 일찍 노출되거나,
동의·최소화가 지켜지지 않으면 라운드를 멈추고 도구를 수정한다.

## 집계 보고

비식별 집계만 공개한다. 모집·제외, 완료·재방문, 이탈 지점, 조건 차이, 루브릭 불일치,
기준선/즉시/지연 점수 분포, 2단계 시간과 15분 이내 수, 독립/seeded recovery,
`not_observable_no_failure`, 사용한 도움, 중대 사건, 도구 변경안을 포함한다.
5–8명에서는 설명적 수와 분포만 보고하고 통계적 유의성이나 가이드의 효과를 주장하지 않는다.

## 증거 경계

이 프로토콜을 작성·검증하는 것만으로 학습자 증거가 생기지 않는다. 한 라운드는 이 revision의
과제 사용성과 측정에 대한 증거를 만들 수 있지만 Q-001·Q-002를 닫지 않으며 과정, First Win,
Labs, 평가 fixture의 상태를 높이지 않는다.
