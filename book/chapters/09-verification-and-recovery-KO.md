<!-- content_id: chapter-09-verification-and-recovery | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 9장: 검증, 의심, 복구

**상태:** `candidate`. **실험:** `not_run`. 이 장은 완료되었다는 주장을 증거와 대조하고, 불확실해진 작업 흐름을 복구하는 방법을 설명합니다. 로컬에서 재현한 결과나 공식 진단, 운영 환경의 증거를 제공하는 장은 아닙니다.

## 이 장에서 해결하는 문제

Agent는 틀렸거나 범위를 벗어났거나 실행하지 않았거나 잘못된 환경에서 확인한 결과에도 그럴듯한 완료 보고를 쓸 수 있습니다. 맹신하거나 끝없이 의심하는 대신, 보고를 서로 분리된 주장으로 나누고 선언한 범위에서 각 주장을 뒷받침할 최소한의 증거를 붙입니다.

| 주장 | 최소 증거 | 증명하지 않는 것 |
|---|---|---|
| 파일이 바뀌었다 | diff, 경로, hash | 정확성 또는 완전성 |
| 검사가 통과했다 | 명령, 폴더, 종료 코드, 관련 출력 | 다른 환경에서도 같은 방식으로 동작한다는 것 |
| 애플리케이션이 동작한다 | 실제 시작과 핵심 경로에 대한 관찰 | 사용자 가치, 보안, 운영 준비 |
| 페이지가 올바르게 보인다 | viewport를 기록한 렌더링 확인 | 완전한 접근성, backend 동작, 전환 성과 |
| 사실이 공식 출처에 근거한다 | 권위 있는 URL, 확인 날짜, 범위, 검토 담당자 | 이 계정의 접근 권한이나 로컬 설정 |

약한 증거 하나로 나머지 모두를 대신할 수는 없습니다. 빌드 통과는 실행을, 캡처는 수요를, 공식 URL은 접근 권한을 증명하지 않습니다.

## 학습 목표

완료 보고를 하나씩 확인할 수 있는 claim으로 나누고, 각 claim에 맞는 최소 evidence를 고르며, 근거가 처음 끊긴 지점을 찾고, 안전한 다음 check나 정직한 handoff를 작성할 수 있습니다. 이 연습만으로 제품의 신뢰성이나 학습 효과를 증명할 수는 없으며, 독립적인 run과 review가 필요합니다.

## 실제 문제: 그럴듯한 summary를 뒷받침할 evidence가 없다

reply는 diff, test output, 독자 관찰 없이도 “완료”, “모든 test 통과”, “독자가 이해함”이라고 말할 수 있습니다. 특정 모델의 문제를 진단하는 이야기가 아닙니다. request, authorization, tool, action, result, review 사이에서 처음 빠진 단계만 확인해야 하는 이유를 보여 줍니다.

## 첫 번째 단절을 찾기

```text
요청 → 권한 → 보이는 도구 → 행동 → 결과 → 검토
```

관찰할 수 없는 첫 번째 화살표를 기록합니다. 세션을 사용할 수 있다고 해서 도구가 등록된 것은 아니며, 실행의 통제권을 되찾았다고 해서 의도한 결과가 올바르다는 뜻도 아닙니다.

| 상태 | 뜻 |
|---|---|
| `verified` | 선언한 범위에서 증거가 주장을 지지한다 |
| `unverified` | 필요한 증거가 없다; 거짓이라는 뜻은 아니다 |
| `unknown` | 분류할 관찰이 부족하다 |
| `partial` | 일부만 뒷받침된다 |
| `not_observed` | 프로젝트가 관찰을 기록하지 않았다 |
| `error` | 선언한 작업의 실패 증거가 있다 |

## 안전한 확인 한 번으로 복구하기

용량 오류, `Working`에 머무는 명령, 없는 도구, 재설치 제안이 나오면 먼저 diff, 출력, 로그, 마지막으로 수용한 checkpoint를 보관합니다. 그다음 대상 상태를 확인하거나, 같은 명령을 제한된 범위에서 한 번만 다시 실행하거나, 필요한 입력을 묻거나, 멈추는 것 중 하나만 고릅니다. 이 확인이 설치, 재시작, 배포 또는 범위 밖 쓰기를 허가하는 것은 아닙니다.

```text
claim: 모든 테스트가 통과했다
evidence: 테스트 출력 없음
status: unverified
next_check: 고정한 폴더와 revision에서 승인된 명령만 실행
```

### 초록색 표시가 결론은 아닙니다

초록색 표시는 특정 시점에 **하나의** 검사가 오류 없이 끝났다는 뜻일 뿐입니다.
“작동한다”라고 쓰기 전에 다음을 나눕니다.

| 본 것 | 아직 확인할 것 | 작고 안전한 확인 방법 |
|---|---|---|
| 명령이 종료 코드 0으로 끝남 | 예상한 명령, 폴더, revision이었는가 | 명령, 폴더, revision, 필요한 출력을 남긴다 |
| diff가 있음 | 요청과 경계를 지킨 변경인가 | 목표와 합의한 제한을 기준으로 diff를 읽는다 |
| 페이지가 열림 | 예상 입력으로 중요한 경로가 반응하는가 | 무해한 입력과 기록한 viewport로 한 경로를 확인한다 |
| 모델이 “완료”라고 말함 | 각 주장에 독립적인 관찰이 있는가 | 경로, 출력, diff 또는 명시적 제한을 요청한다 |

한 검사의 성공을 보안, 사용자 가치 또는 운영 준비에 대한 약속으로 바꾸지 않습니다.
관찰이 없으면 그 줄은 `unverified`로 둡니다. 자신감으로 채우지 마세요.

### 복구 기록: 다음 사람이 안전하게 이어서 작업하기

작업 흐름을 멈췄거나 통제권을 되찾았다면 짧은 receipt를 남깁니다. 무작정 처음부터
다시 시작하지 않고, 다음 사람이 권한을 넓히지 않은 채 무엇을 확인할 수 있는지 알 수 있게 합니다.

```text
목표와 경계: 무엇을 하려 했고 무엇은 허가되지 않았는가
마지막 확인 지점: 실제로 있는 관찰, 경로 또는 출력
첫 미확인 지점: 증거가 없는 첫 주장
대상 상태: 변경 없음 / 부분 변경 / 알 수 없음
보관한 증거: diff, 로그, 출력, 캡처 또는 구체적 링크
다음 안전 검사: 읽기 전용 또는 되돌릴 수 있는 한 행동
아직 하지 않을 일: 공개, 설치, 배포 또는 범위 확장
```

receipt가 결과를 고치거나 원인을 증명하지는 않습니다. `아마도`를 `완료`로 바꾸지 않고,
안전하게 다시 시작할 정확한 위치만 남깁니다.

## 실험과 경계

### 준비

버려도 되는 로컬 폴더에 민감한 내용을 가린 summary, diff, test output, source link, 의도적으로 빠뜨린 evidence 하나를 둡니다. secret, production, install, sign-in, external change는 사용하지 않습니다.

### 작업

민감한 내용을 가린 요약, diff, 테스트 출력, 출처 링크, 의도적으로 빠뜨린 증거 하나를 준비합니다. Lab 003을 사용해 주장, 범위, 증거, 상태, 다음 단계를 표로 만들고, 출력이 없는 “모든 테스트 통과”라는 말을 말투가 확신에 차 있어도 받아들이지 않습니다. 사실에 관한 주장, 실행에 관한 주장, 사용자 효과에 관한 주장을 하나씩 넣고, 왜 약한 증거 하나로 세 가지를 모두 뒷받침할 수 없는지 설명합니다. 운영 서비스에 연결하거나 외부 시스템을 바꾸지 않습니다.

복구가 상태를 다시 관찰 가능하게 해도 자동으로 `verified`가 되지는 않습니다. 이 장은 `candidate`, 실험은 `not_run`입니다.

### 증거

claim-evidence 표, 이름을 붙인 path와 output, 각 행의 status, 첫 단절, 안전한 다음 check를 보존합니다. run이 없으면 `not_run`으로 적고, 자신감 있는 말투만 보고 test output을 지어내지 않습니다.

## 따라 해 보기: 확신에 찬 요약을 그대로 믿지 않기

90단어 안팎의 안내문을 두고 이렇게 요청했다고 가정해 봅시다. “처음 보는 사람이 첫 단계를
알 수 있게 다듬어 주세요. 사실은 바꾸지 말고 공개도 하지 마세요.” 모델이 “완료했습니다.
명확하고 모든 검사가 통과했습니다”라고 답해도, 바로 완료라고 적지 않습니다.

1. 정확히 어떤 파일 또는 문장이 바뀌었나요? diff나 전후 본문을 받습니다.
2. 어떤 검사를 했나요? 명령, 폴더, 종료 코드, 필요한 출력을 받습니다.
3. 아직 무엇을 확인하지 않았나요? 초보자의 이해, 웹에서의 모습, 공개 후 반응을 따로 둡니다.
4. 다음 안전한 검사는 무엇인가요? 이 예에서는 두 문장을 비교하고 처음 읽는 사람에게
   “가장 먼저 무엇을 하겠어요?”라고 한 가지만 묻습니다.

모델을 거짓말쟁이라고 단정할 필요는 없습니다. 넓은 한 문장을 주장 표로 바꾸기만 하면 됩니다.
테스트 출력이 없으면 “모든 검사를 통과했다”는 `unverified`입니다. 문장만 비교했다면
“본문 diff는 확인했고, 독자 이해는 확인하지 못했다”가 정직한 인계입니다.

## 초보자를 위한 복구 카드

기대와 다를 때 지시를 무작정 덧붙이지 않습니다. 관찰한 사실만 채웁니다.

```text
목표: 첫 단계를 더 분명하게 한다. 공개하지 않는다
마지막 확인: 초안과 diff가 있다
첫 단절: 처음 보는 독자가 이해했다는 증거가 없다
다음 안전 검사: 한 질문으로 독자 확인을 요청한다
중지 조건: 공개, 설치, 다른 파일 변경이 필요해진다
정직한 인계: 본문 검토는 있음; 독자 이해는 unverified
```

이 카드는 “안 됐다”를 조사 가능한 다음 단계로 바꿉니다. 모델, Skill, 과정의 효과를
증명하지는 않습니다. 관찰한 것, 빠진 것, 여전히 안전한 행동만 따로 남깁니다.

## claim을 evidence에 대응시키기

summary를 받으면 먼저 claim을 한 줄씩 나눕니다. artifact 하나나 green check 하나를 여러 결론에
돌려 쓰지 않기 위해서입니다.

| claim | scope에 맞는 evidence | evidence가 있어도 남는 한계 |
| --- | --- | --- |
| 지정한 file이 바뀜 | exact path, before/after diff, 필요하면 hash | 변경이 요청한 의미를 만족함 |
| named command가 pass함 | exact command, working directory, revision, timeout, exit status, relevant output | 다른 command, environment, 실행하지 않은 path |
| page의 한 path가 열림 | recorded viewport, input, URL, render observation | 모든 browser, authenticated state, accessibility 전체 |
| source가 문장을 지지함 | original URL, access date, 인용 범위, scope | current product behavior, account access, 인과 |
| beginner가 이해함 | 누가 무엇을 읽었는지, 질문, 답, 조건을 남긴 reader observation | 모든 reader, 보존, transfer |

`claim → evidence → status → next check` 표를 만들고 evidence가 없는 row는 `unverified`로 둡니다.
거짓이라고 단정할 필요는 없습니다. 다만 evidence가 없는 사실을 success 말로 숨기지 않는 것이 중요합니다.

```text
claim: README의 start step은 초보자에게 분명하다
evidence: maintainer의 본문 검토와 local diff
status: partial
not proven: 처음 보는 reader가 올바르게 행동할 수 있음
next check: 한 사람에게 “가장 먼저 무엇을 하겠어요?”라고 한 질문만 함
```

## capability chain과 breakpoint card

“tool이 보인다”, “session이 열린다”, “control을 되찾았다”는 서로 다른 layer의 signal입니다.
아래 chain의 각 화살표에는 독립 proof가 필요합니다.

```text
request → authorization → visible tool → action started → result observed → acceptance review
```

support할 수 없는 첫 layer에서 멈춥니다. 뒤 layer를 추측해 채우지 않습니다.

| breakpoint | 먼저 보존할 것 | 다음의 작은 check |
| --- | --- | --- |
| authorization이 불명확 | task contract, requested action, approval screen/record | scope와 approver를 확인한다. 실행하지 않는다 |
| visible tool이 없음 | current surface, account/environment label, exact missing control | official/current setup을 읽거나 human에게 ask |
| action start가 불명확 | proposal, tool trace, target baseline | named local target을 read-only로 확인 |
| result가 불명확 | diff, partial output, log, timestamp | exact artifact를 read back |
| acceptance가 없음 | artifact와 requirement | requirement를 직접 검사하는 한 check를 고름 |

breakpoint card는 recovery를 작게 유지합니다.

```text
last confirmed layer:
first unsupported layer:
artifact / side-effect state:
evidence preserved:
claim downgraded to:
one safe next check:
explicitly forbidden next actions:
```

## event 없는 대기 다루기

오래 `Working`으로 보이거나 command가 응답하지 않는 것은 성공이나 failure가 아니라 먼저 timeline의
문제입니다. 기다리기를 반복하기 전에 시작 시각, 마지막 output, process/tool state, observed diff,
allowed timeout을 기록합니다. timeout 뒤에는 같은 write를 보내기 전에 artifact를 읽거나, authorized한
interrupt를 사용하거나, `unknown`으로 handoff합니다.

```text
started_at:
last_output_at:
no-event threshold:
process or tool state:
artifact read-back:
external side effects observed:
decision: wait once | interrupt | read back | stop
```

elapsed time은 effect proof가 아닙니다. 특히 write, publish, send, payment 같은 non-idempotent action은
response를 잃어도 blind retry하지 않습니다. baseline과 postcondition을 대조한 뒤 human이 새 attempt를
허용할지 결정합니다.

## completion status와 recovery status를 나누기

recovery로 control을 되찾아도 completion claim이 참이 되는 것은 아닙니다. 두 column을 따로 남깁니다.

| recovery state | completion state | 정직한 handoff 예 |
| --- | --- | --- |
| checkpoint를 저장하고 pause | `unverified` | “재개 가능한 checkpoint는 있다. 결과는 미확인” |
| target을 read back해 partial diff 확인 | `partial` | “일부 변경을 확인. acceptance check는 미실행” |
| missing input 식별 | `blocked` | “원인 후보가 아니라 필요한 input 부재를 관찰” |
| exact check가 scope 안에서 pass | `verified` | “이 local rule은 pass. scope 밖은 not proven” |

이는 product status label을 정하는 것이 아닙니다. delivery claim이 실제로 보존한 evidence보다 강해지지
않게 하는 vocabulary입니다.

## 전이 과제

고정 source를 쓰는 research memo나 static page review에 같은 method를 옮깁니다. language practice에서는 도움을 받은 답변과 나중에 도움 없이 회상하는 과제를 구분합니다. fact claim,
execution claim, reader-effect claim을 하나씩 쓰고 각각에 다른 evidence를 요구합니다. citation, diff,
output 중 하나를 일부러 빼고 claim을 downgrade한 뒤 한 가지 safe next check를 고릅니다.

- [ ] build, diff, screenshot, source URL, reader feedback 어느 것도 다른 종류의 claim을 자동으로 증명하지 않는다고 설명할 수 있다.
- [ ] first unsupported layer를 이름 붙이고 scope를 넓히지 않고 다음 check를 고른다.
- [ ] no-event command의 timeline을 보존하고 time만으로 success라 하지 않는다.
- [ ] recovery state와 completion state를 따로 전달한다.
- [ ] `verified`는 exact acceptance check 기록이 있는 row에만 쓴다.

## 수용 체크리스트

- [ ] 각 completion claim에 scope, evidence 또는 `unverified`가 있다.
- [ ] diff, test output, runtime observation, render review, user observation을 구분한다.
- [ ] 첫 근거 없는 단계를 찾아 안전한 next check 하나만 골랐다.
- [ ] handoff에 change, evidence, unknown, 실행하지 않은 side effect를 적었다.

## 출처와 갱신 경계

이 장의 method는 project-authored teaching framework입니다. product-specific behavior, command, approval,
UI status는 volatile하므로 current official documentation과 actual environment에서 확인해야 합니다. 공개
field report는 symptom의 teaching input일 뿐 local reproduction, root cause, universal fix의 evidence가 아닙니다.
참조는 English source chapter와 [evidence library](../evidence-library-KO.md#source-notes)에 남아 있습니다.
장은 `candidate`, 실험은 `not_run` 상태를 유지합니다.

## 의도적인 실패와 되돌아보기

독자에게 묻지 않았는데도 “독자가 이해했다”라고 쓴 인계를 하나 만드세요. 증거를 넘는
주장을 표시하고 정직한 상태로 고칩니다. 그다음 상태를 바꾸려면 필요한 최소 증거와,
그래도 범위 밖으로 남는 사실을 설명합니다. 답을 diff와 함께 보관하세요. 실행 기록과
검토가 생기기 전까지 이 장은 `candidate`, 이 연습은 `not_run`입니다.

## 회고

표에서 가장 과장하고 싶었던 문장은 무엇이었나요? 어떤 최소 check가 그 문장을 더 좁게 지지하며, 그 check 뒤에도 어떤 중요한 주장이 열린 채로 남나요?

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 내비게이션">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-KO.md" aria-label="이전 장: 8장 · 8장: 정의에서 전달까지">← 이전<br><strong>8장 · 8장: 정의에서 전달까지</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing-KO.md" aria-label="다음 장: 10장 · 10장: 계획과 수직 슬라이스">다음 →<br><strong>10장 · 10장: 계획과 수직 슬라이스</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
