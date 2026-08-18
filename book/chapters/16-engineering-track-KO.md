<!-- content_id: chapter-16-engineering-track | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 16장: 엔지니어링 트랙, 아이디어에서 신뢰할 수 있는 소프트웨어까지

**상태:** `candidate`. **실험:** `draft / not_run`. 이 장은 엔지니어링 수명 주기를 가르치며 현장 보고는 로컬 재현이나 모든 버전의 원인 확인이 아닙니다.

## 이 장에서 해결하는 문제

엔지니어링 작업은 요구사항, 설계 선택, 테스트 설계, 런타임 관찰, rollback이 분명해지기 전에 코딩을 시작하게 만듭니다. patch가 build되고 unit test가 모두 통과해도 사용자 경로, 오류 처리, 의존성 버전, 배포, 복구가 맞는 것은 아닙니다.

> build 성공, unit test 성공, integration test 성공, 런타임 동작, 사용자 수용, 프로덕션 준비는 서로 다른 주장입니다.

엔지니어링 Skill은 증거를 지닌 수명 주기여야 합니다. 각 단계에는 진입 조건, 가장 작은 slice, 실패 경로, 종료 증거가 있습니다.

## 엔지니어링 수명 주기

```text
문제 정의 → 명세와 수용 → 계획과 slice
→ 점진적 구현 → static check와 test
→ 런타임 검증 → review와 단순화
→ release와 rollback → 유지보수와 regression
```

| 단계 | 진입 조건 | 최소 종료 증거 |
|---|---|---|
| 정의 | 문제와 범위 | 다른 사람이 되풀이할 수 있는 문제 문장 |
| 명세 | 경계, 입력, 출력, 오류 | 수용 기준과 비목표 |
| 계획 | 의존성과 위험 | 독립 검증 가능한 slice |
| 구현 | 현재 slice와 baseline | 작고 설명 가능한 diff |
| 테스트 | 동작과 실패를 시험할 수 있음 | command, 결과, 실패 설명 |
| 런타임 | 시작 가능한 환경과 대표 데이터 | version, log, response 또는 화면 |
| release | review와 rollback 가능 | 기록, 모니터링, rollback rehearsal |

## 구현 전에 명세하기

“export 기능을 추가”라면 형식, 데이터 범위, 권한, 부분 파일 처리, 덮어쓰기 정책, 최종 수용을 묻습니다. 사용자 행동, 입력 제약, 성공·오류 출력, 경계, 비목표, 성능·보안 제약, 관찰 신호, 수용 방법을 적습니다. Skill은 결정을 조용한 기본값으로 바꾸지 못합니다.

source-driven, doubt-driven, incremental 방식으로 진행합니다. API와 버전은 공식 문서, 타입, 현재 code, 재현 결과가 권위이며 blog와 모델 기억은 단서입니다. 타입과 unit test가 증명하지 못하는 network, database, browser, permission, concurrency, time zone, deployment을 확인합니다. 한 번에 설명 가능한 slice 하나만 바꾸고 diff와 rollback 지점을 보존합니다.

## 런타임, 중지, 복구

build 증거는 compile 가능함, test 증거는 지정 assertion 통과를 뜻합니다. 런타임 증거에는 start command, version, 환경 값, 실제 입력, response 또는 화면, log, 오류 경로가 필요합니다. 프로덕션 준비에는 security, performance, migration, monitoring, rollback, 사용자 수용도 더 필요합니다.

timeout까지 출력 없음, 누락된 test 의존성, 알 수 없는 worktree 변경, 실제 credential 요청, 지속적 환경 변경, publish, deploy, restart는 멈추고 범위를 확인할 신호입니다. 녹색 결과를 위해 force reinstall이나 권한 확장을 하지 말고, 권한이 없다면 격리 환경, test double, static check를 사용합니다.

## 연습과 경계

로컬 목록을 중복 제거해 JSON으로 쓰는 저위험 기능을 고릅니다. 정상, 빈, 중복, 잘못된 입력을 준비합니다. 목표만 주는 라운드와 문제, 수용 기준, 비목표, slice, test matrix를 먼저 만드는 라운드를 비교합니다. 양쪽 모두 static check, unit test, 로컬 실행, 빈·잘못된 입력을 시험하고 계약, diff, command, 종료 상태, log, version, 입력, rollback 지점을 남깁니다.

중단을 흉내 냈다면 계속하기 전에 worktree, diff, log, test 상태를 검사합니다. 실제 기록과 독립 review가 있기 전까지 `candidate / not_run`입니다. 특정 권한 없이 install, publish, deploy, restart하지 마세요.

## 요청을 엔지니어링 작업 카드로 바꾸기

“export 기능을 추가해”는 코딩 시작 조건이 아닙니다. unknown은 모델이 정하지 않고 질문으로 남깁니다.

```text
사용자 행동: <페이지/명령>에서 <명확한 데이터 범위>를 export한다.
성공: <형식>과 <필드>를 만들고 <관찰 가능한 결과>를 보여 준다.
실패: 권한, 빈 데이터, 잘못된 입력, 쓰기 실패를 어떻게 돌려줄까?
비목표: history migration, publish, 권한 변경, 외부 서비스 연결을 하지 않는다.
범위: read/write path, 허용 command, network와 secret 경계.
수용: test, 한 번의 local run, human check와 각각의 coverage.
복구: 원래 상태, 임시 산출물, read-back, 중지 조건.
```

다른 개발자가 goal과 non-goal을 되풀이할 수 있을 때 첫 slice를 고릅니다. format, overwrite, permission이 unknown이면 가장 작은 slice는 조용한 write가 아니라 read-only preview일 수 있습니다.

| 증거 | 말할 수 있는 것 | 말할 수 없는 것 |
|---|---|---|
| build 성공 | 지정 config로 compile/package 가능 | 사용자 흐름이나 deploy 정확성 |
| test 통과 | 그 environment에서 assertion 통과 | 미포함 error, browser, permission, 실제 입력 |
| local run | 지정 input이 관찰된 result 생성 | production, 모든 account, performance |
| remote read-back | 지정 revision/record가 remote에 있음 | 사용자 수용, monitoring, safe rollback |

## Web coding: 보이는 결과를 실제 브라우저까지 가져가기

“완성된 웹사이트를 만들어”는 독자, 상태, source file, runtime, browser review,
rollback을 한 문장에 섞습니다. 먼저 `examples/skill-sandbox/product-context-real-estate`
의 README와 `index.html`을 버릴 수 있는 복사본에서 읽고, `index.html`의 보이는 문장
하나만 바꾸세요. framework, image, form, API, network는 추가하지 않습니다. Python 3가
이미 있다면 복사본에서 `python -m http.server 4182`를 실행하고
`http://127.0.0.1:4182/`를 열어 title, 새 문장, 유지된 헤딩, link, console, 390px
viewport를 확인합니다.

복사본, 허용 파일, URL, 보인 상태, diff와 deploy, accessibility, 다른 browser,
사용자 수용의 미확인 항목을 기록하세요. source diff만으로 CSS, 상대 path, mobile
clipping, runtime error를 알 수 없습니다. local render는 deploy가 아닙니다.

## 작은 실험: JSON 세로 슬라이스

버릴 수 있는 디렉터리에서 `input.json`의 문자열 목록을 읽어 중복을 제거하고 `output.json`에 씁니다. read/write는 그 디렉터리 안에서만 하며 network, install, login, commit, push, publish는 하지 않습니다.

1. 작업 카드와 baseline을 씁니다: normal, empty, duplicate, missing field/invalid JSON.
2. normal과 duplicate만 먼저 구현하고 diff와 command output을 보관합니다.
3. empty와 invalid를 추가합니다. 매번 설명 가능한 한 지점만 바꾸고 선언된 check를 실행합니다.
4. 독립 command로 `output.json`을 읽고 version, input, exit status, raw output, scope를 남깁니다.
5. interruption을 흉내 냅니다. 계속하기 전에 status, diff, log, output을 읽고 continue/recover/checkpoint를 결정합니다.

출력이 없거나 dependency가 없거나 PATH 변경, runtime 재설치, log 업로드, deploy, restart가 제안되면 중지하고 부족한 authorization과 recovery를 밝힙니다.

## 스스로 확인하기

- [ ] 사용자 행동, 성공/실패, 비목표, 범위, 수용, 복구를 썼다.
- [ ] slice마다 diff, command, exit status, input/output, unknown을 남긴다.
- [ ] build, test, local run, remote, 사용자 수용을 혼동하지 않는다.
- [ ] interruption 뒤에는 재시도 전에 state를 확인한다.

## 엔지니어링 작업 카드: 수용 가능한 최소 change

이 카드는 본인이 소유하거나 허가받은 disposable project copy용입니다. 먼저 문제를 제한한 다음 어떤 LLM이든 read, plan, edit를 돕게 합니다. install, network, commit, push, publish, production data 접근을 허가하지 않습니다.

```text
goal: [하나의 구체적인 action] 뒤 사용자가 볼 수 있는 확인 가능한 결과는 무엇인가?
scope: [path]를 read; 확인 뒤 [path]만 edit; [path]는 edit하지 않음.
baseline: 현재 branch / commit, 기존 change, test / command의 원래 결과.
source of truth: 어떤 specification, existing behavior, test, interface, design이 이 사실을 소유하는가?
minimum slice: 이번에 바꿀 observable behavior 하나는 무엇인가?
acceptance: file scope, focused check, runtime observation, human read가 각각 무엇을 확인하는가?
forbidden: install, network, delete, commit, push, publish, external message, secret read.
stop: path, specification, authority, recovery, acceptance rule이 불분명하면 pause.
delivery: diff, 실제 command와 output, passed / failed / not_run, unknown, 가장 작은 다음 check.
```

### 네 개의 green은 네 가지 다른 결론입니다

| signal | 최대한 말할 수 있는 것 | 아직 말할 수 없는 것 |
|---|---|---|
| small diff | 비교 범위의 text change가 작음 | requirement 충족 또는 runtime 정확성 |
| static check passed | 기록한 environment에서 그 check가 통과함 | 모든 path와 user가 동작함 |
| local run passed | 하나의 명시된 run scenario를 관찰함 | deploy, performance, security, external integration |
| human acceptance | 지정 reader가 지정 rule로 결과를 봄 | maintenance, transfer, 넓은 adoption |

하나라도 빠지면 delivery에 `not_run`, `blocked`, `unknown`을 남기세요. green을 얻기 위해 permission을 넓히거나 environment를 바꾸거나 specification을 다시 쓰지 않습니다.

## 학습 목표

requirement를 작고 검증 가능한 slice로 나누고 build, test, local run, publish, user acceptance를 별도 evidence claim으로 다룰 수 있습니다.

## 실제 문제: green test가 user task의 끝은 아니다

patch가 compile되어도 empty input, 잘못된 path, recovery를 놓칠 수 있습니다. green 수가 아니라 check가 구체적인 user action과 failure를 덮는지가 중요합니다.

### 준비

`input.json`이 있는 버릴 수 있는 local directory를 사용합니다. network, credential, remote, install 없이 원본 file과 써도 되는 path를 기록합니다.

### 작업

string list의 duplicate만 제거하고 local `output.json`을 씁니다. normal, empty, duplicate, invalid input을 확인하고 한 번에 설명 가능한 한 점만 바꿉니다.

### 증거

card, diff, command, exit status, input, 독립적으로 읽은 output, 실행하지 않은 action을 보관합니다. 기록 없는 test는 publish나 user acceptance를 증명하지 않습니다.

### 회고

각 check는 실제로 어떤 claim을 뒷받침하나요? 어떤 failure path가 unknown이며 다음 최소 check는 무엇인가요?

## 전이 과제

link, navigation, publish status를 바꾸지 않고 learning example을 고칠 때 card를 적용합니다. user effect, files, check, recovery를 씁니다.

## 수용 체크리스트

- [ ] user action, success, failure, non-goal, scope, recovery를 쓸 수 있다.
- [ ] diff, command, result, 미확인 claim을 나누어 전달한다.
- [ ] unknown path, secret, network, persistent effect에서 멈춘다.

## 출처 및 유지보수 경계

lifecycle과 evidence 분리는 안정적인 방법입니다. framework, command, runtime, deployment rule은 project마다 변하므로 확인합니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 내비게이션">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="15-research-track-KO.md" aria-label="이전 장: 15장 · 15장: 연구 트랙, 질문에서 감사 가능한 지식까지">← 이전<br><strong>15장 · 15장: 연구 트랙, 질문에서 감사 가능한 지식까지</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="17-marketing-track-KO.md" aria-label="다음 장: 17장 · 17장: 마케팅 트랙, 제품 이해에서 성장 실험까지">다음 →<br><strong>17장 · 17장: 마케팅 트랙, 제품 이해에서 성장 실험까지</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
