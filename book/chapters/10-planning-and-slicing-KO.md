<!-- content_id: chapter-10-planning-and-slicing | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 10장: 계획과 수직 슬라이스

**상태:** `candidate`. 계획과 예시는 교육 자료입니다. Agent가 작업을 실행했거나 어느 저장소에서나 슬라이스가 동작함을 증명하지 않습니다.

## 문제

자세해 보이는 계획도 끝날 때까지 누구도 결과를 검사할 수 없게 만들 수 있습니다. 모든 데이터, API, UI를 차례대로 끝내는 수평 계획은 틀린 가정을 늦게 발견합니다. 수직 슬라이스는 작아도 입력에서 증거까지 통과하는 결과를 만듭니다.

```text
한 입력 → 가장 작은 변경 → 관찰 가능한 행동 → 집중 검사 → 증거
```

이는 한 번에 모두 바꾸라는 뜻이 아닙니다. 검토와 되돌리기가 가능한 범위에서 가장 비싼 위험을 일찍 발견하는 방법입니다.

## 편집 전에 슬라이스 설계하기

| 항목 | 답할 질문 |
|---|---|
| 결과 | 마지막에 누가 무엇을 관찰할 수 있는가 |
| 입력 | 어느 파일, 데이터, 결정이 고정되는가 |
| 경계 | 어떤 파일, 권한, 부작용이 허용되는가 |
| 최소 변경 | 결과를 만드는 가장 작은 수정은 무엇인가 |
| 검사 | 어떤 명령, 검사, 읽기가 이를 거절할 수 있는가 |
| 증거 | 어떤 diff, 출력, 캡처, 검토를 보관하는가 |
| 미증명 | 무엇이 범위 밖에 남는가 |
| 복구 | 마지막 수용 상태로 어떻게 돌아가는가 |

좋은 슬라이스는 결정에 답합니다. “모든 탐색을 마이그레이션”은 답이 아닙니다. “한 사람이 한국어 목차에서 로컬 장을 열고 연습을 찾은 뒤 기록한 경로로 돌아간다”는 답이 될 수 있습니다.

## 열정보다 의존성으로 계획하기

1. 도구보다 먼저 결과와 수용 조건을 쓴다.
2. 입력, 의존성, 권한, 아직 모르는 사실을 적는다.
3. 결과를 막을 수 있는 미지수를 앞에 둔다.
4. 실패해도 증거가 남는 슬라이스를 고른다.
5. 검사 순서와 중단 조건을 고정한다.
6. 각 슬라이스 뒤에 diff, 범위, 증거, 다음 결정을 검토한다.

작업 목록을 약속으로 바꾸지 않습니다. 작업을 실행해도 결과가 나오지 않을 수 있습니다. 계획은 가정을 보이게 해야지 자신감 있는 문장에 숨기면 안 됩니다.

## 실험과 한계

버려도 되는 복사본에서 같은 작은 변경의 수평 계획과 수직 계획을 비교합니다. 초기 계획, 기준 revision, 명령, diff, 검사, 결정이 바뀐 지점을 보관합니다. 없는 의존성이나 모호한 수용 조건을 넣습니다. 수직 계획은 검사 불가능한 변경을 쌓기 전에 차단을 드러내면 통과입니다.

한 작업으로 일반적인 속도나 품질을 측정하지 않습니다. 관찰하지 않은 시간, 비용, 결과는 `unavailable`, `unknown`, `not_run`으로 남깁니다.

- [ ] 결과, 입력, 범위, 수용 조건을 관찰할 수 있다.
- [ ] 슬라이스에 검사와 복구 출처가 있다.
- [ ] 실패한 시도도 검토할 증거가 남는다.
- [ ] 명시 권한 없는 외부 부작용은 범위 밖이다.
- [ ] 인계서는 변경, 검증, 차단, 미증명을 구분한다.

## 세 가지 계획 워크시트: 첫 증거로 고르기

같은 요청에 대해 편집기를 열기 전에 세 가지 대안을 적습니다. 세 가지를 모두 실행할 필요는
없습니다. 어느 계획이 첫 유용한 결과를 숨기는지 보려는 비교입니다.

| 형태 | 흔한 첫 단계 | 첫 유용한 증거 | 멈출 신호 |
|---|---|---|---|
| 수평 | “모든 데이터부터, 그다음 모든 UI 준비” | 여러 계층 뒤에 늦게 나오는 경우가 많음 | 오늘 검토할 사람, 입력, 검사가 없다 |
| 파일 순서 | “이 파일들을 이 순서로 편집” | 로컬에서 검토할 수 있는 diff | 파일 순서가 누가 무엇을 보는지 설명하지 못한다 |
| 수직 | “고정 입력으로 한 결과를 보이고 검사” | 작은 경로, 검사, 기록 | 첫 경로에 공개, 설치, 여러 시스템 변경이 필요하다 |

다음 단계의 가치가 있는지 빨리 알고 싶을 때 수직 계획을 고릅니다. 의존성, 권한, 파일이
존재하는지조차 모르면 읽기 전용 probe를 고릅니다. probe는 “계속할 수 있는가?”에 답할 뿐,
완성한 기능으로 세지 않습니다.

## 중단과 인계 카드

중단되었다고 계획이 사라지지는 않지만, 자동으로 계속할 권한이 생기는 것도 아닙니다. 세션을
끝내거나 도움을 요청하기 전에 대화를 모르는 사람도 읽을 카드를 남깁니다.

```text
슬라이스: 하나의 관찰 가능한 결과 이름
기준선: 비교한 branch, revision 또는 copy
증거가 있는 완료: 실제로 존재하는 변경과 proof
차단 또는 미지수: 처음 빠진 의존성 또는 검사
대상 상태: 변경 없음 / 부분 변경 / 알 수 없음
아직 하지 않을 일: 권한 확대, 설치, 공개 또는 제외한 파일
다음 한 행동: 읽기 전용 probe 또는 idempotent 재시도
```

다음 한 행동의 이름을 말할 수 없다면 슬라이스가 아직 너무 큽니다. “계속해”라고 요청하기 전에
질문을 나누세요.

## 첫 번째 완결 슬라이스 만들기

“과정 전체를 개선해 주세요”로 시작하지 않습니다. 처음 보는 사람이 읽을 120단어 이하의
로컬 글 하나를 고릅니다. 이 슬라이스의 결과는 작습니다. **무엇이 바뀌었는지**와
**어떻게 확인하는지** 두 제목을 보이게 하고, 공개, 설치, 다른 파일 수정은 하지 않습니다.

먼저 모델에게 아직 편집하지 말라고 말하고 아래 카드를 줍니다.

```text
결과: 독자가 바뀐 내용과 확인 방법을 읽을 수 있다
고정 입력: 120단어 이하의 로컬 파일 하나
허용: 문안 제안; 확인 뒤에는 그 파일만 수정
금지: 공개, 설치, 링크 변경, 다른 파일 수정
수용 조건: 두 제목이 있고 사람이 찾을 수 있다
중지 조건: 파일이 없거나 다른 파일이 필요하거나 요청이 모호해진다
```

그다음 정의 → 세 단계 계획 요청 → 편집 전 범위 확인 → 작은 수정 → 전후 비교 → 두 제목 읽기
→ 정직한 인계 순서로 갑니다. 모델이 일을 넓히려 하면 카드로 돌아갑니다. 새 결정 없이 범위를
넓히는 일은 “더 도움이 되는 일”이 아닙니다.

## 수치를 꾸미지 않고 두 요청 방식 비교하기

직접 요청(“더 명확하게 해 주세요”)과 위 카드를 쓴 요청을 한 번씩 시험할 수 있습니다.
글, 모델, 도구, 사용 가능 시간, 독자 확인 기준을 고정합니다. 두 prompt, 버전, 독자의 질문,
오류를 보관합니다. 변수가 달라지면 `not_comparable`로 남깁니다. 한 번 더 빠르거나 보기 좋은
응답이 일반적인 생산성이나 모델 우위를 증명하지는 않습니다. 이 연습의 목적은 편집 전에 어떤
정보가 빠졌는지, 결과를 검토할 수 있는지를 관찰하는 것입니다.

## 안전한 실패와 되돌아보기

**어떻게 확인하는지**를 일부러 지우거나 존재하지 않는 파일을 지정합니다. 첫 실패는 내용이
부족한지 입력이 틀렸는지 알려줘야 합니다. 실패를 숨기려고 의존성이나 권한을 늘리지 않습니다.
관찰한 것, 아직 증명하지 못한 것, 다음 안전한 행동 하나를 적습니다. 이 장은 `candidate`입니다.
이 연습 하나만으로 효과, 속도, 장기 학습을 측정할 수 없습니다.

## dependency를 보이는 순서로 놓기

plan의 순서는 file 이름이나 team 담당 순서가 아니라, 가장 위험한 가정을 먼저 줄일 수 있는 순서로
정합니다. 각 dependency에 “이것이 없으면 무엇을 할 수 없는가”와 “read-only로 확인할 수 있는가”를
적습니다.

| dependency | 먼저 확인하는 이유 | 가장 작은 check | 미확인일 때 할 일 |
| --- | --- | --- | --- |
| target file identity | 다른 copy를 edit하면 outcome이 무의미함 | absolute path와 baseline 읽기 | stop하고 correct root를 ask |
| acceptance rule | “좋게 하기”만으로는 review 불가 | reader-visible rule을 한 문장으로 쓰기 | outcome을 다시 작게 만들기 |
| required input | input 없이는 proposal을 비교할 수 없음 | named file/source revision 읽기 | `blocked_input`으로 남기기 |
| authority | write나 external action은 task 의미를 바꿈 | allowed path/action을 task card와 대조 | approval을 ask하고 widen하지 않기 |
| verification source | check가 없으면 delivery claim을 만들 수 없음 | command, manual rule, read-back 정하기 | `unverified`로 handoff |

dependency graph가 완벽한 그림일 필요는 없습니다. 중요한 것은 unknown을 뒤에 숨기지 않고, 첫
vertical slice가 그 unknown을 안전하게 드러내게 하는 것입니다.

## worked slice: reader path 하나 고치기

예를 들어 local chapter 첫 120단어가 “무엇을 할지”와 “어떻게 확인할지”를 보여 주지 않는다고
가정합니다. 목표를 “과정 전체 개선”이 아니라 다음처럼 줄입니다.

```text
Outcome: 처음 읽는 사람이 두 제목을 찾고 첫 action 하나를 말할 수 있다.
Fixed input: disposable copy의 named chapter file 하나.
Allowed change: 그 file의 local text만. edit 전에는 proposal만.
Acceptance: “What changed”와 “How to check”가 있고 둘 다 120단어 안 section에 있다.
Evidence: baseline, exact diff, manual read-back, not-proven list.
Stop: 다른 file, link, publish, install 또는 reader data가 필요해진다.
```

이 slice의 value는 과정이 완성되는 데 있지 않습니다. task contract가 충분한지, target이 맞는지,
check가 reader-visible rule을 직접 보는지를 낮은 cost로 발견하는 데 있습니다. acceptance를
만족해도 이해, conversion, retention, 일반 quality는 `not proven`으로 남습니다.

## plan review: 시작 전과 변경 뒤에 묻기

editor를 열기 전과 slice 하나가 끝난 뒤에 같은 다섯 가지를 review합니다.

1. 이 outcome을 한 문장으로 말할 수 있는가? 누가 무엇을 관찰하는가?
2. 첫 check는 만든 artifact가 아니라 acceptance를 보는가?
3. 어떤 assumption이 false이면 이 plan은 즉시 멈춰야 하는가?
4. failure해도 다음 사람이 baseline과 attempted scope를 review할 수 있는가?
5. 다음 slice는 새 evidence를 요구하는가, 아니면 같은 promise를 크게 만들기만 하는가?

yes/no만으로 답할 수 없다면 그 plan은 아직 실행 순서가 아니라 희망입니다. read-only probe,
question 또는 smaller outcome으로 돌아갑니다.

## failure를 evidence로 만들기

| failure | safe result |
| --- | --- |
| target file이 없음 | target을 만들지 않고 `blocked_input`으로 기록 |
| acceptance가 “더 좋게”로 남음 | reader-visible rule을 ask하고 edit하지 않음 |
| first slice가 세 system을 바꿈 | one local artifact로 돌아감 |
| check가 install/network를 요구 | new authority를 ask하거나 `unverified`로 stop |
| diff가 allowed file을 넘음 | extra change를 review하고 rollback/decision 없이 계속하지 않음 |

failure는 plan 실패가 아니라 첫 expensive assumption이 드러난 record입니다. 첫 unsupported claim,
actual diff, 마지막 accepted state, one safe next action을 handoff에 남깁니다.

## 전이와 sources

같은 template를 research memo, marketing copy, design review에 씁니다. 다만 acceptance를 domain에
맞게 바꿉니다. research에는 source scope와 citation, copy에는 supplied facts와 audience rule, design
review에는 viewport와 observation이 필요합니다. platform-specific command, model behavior, speed, cost는
current source와 actual run 없이는 assertion으로 쓰지 않습니다.

- [ ] outcome은 작고 observer가 분명하다.
- [ ] 첫 high-risk dependency에 read-only check 또는 stop rule이 있다.
- [ ] one slice가 one reviewable artifact와 evidence를 남긴다.
- [ ] failure와 unknown을 delivery에서 지우지 않았다.
- [ ] next slice는 scope expansion이 아니라 새 decision이다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="09-verification-and-recovery-KO.md">← 이전<br><strong>9장 · 검증, 의심, 복구</strong></a></td><td align="right"><a data-chapter-nav="next" href="11-designing-a-skill-KO.md">다음 →<br><strong>11장 · 쓸모 있는 Skill 설계하기</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
