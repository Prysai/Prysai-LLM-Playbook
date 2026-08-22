<!-- content_id: lab-001-first-safe-task | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

---
id: lab-001-first-safe-task
title: "범위를 제한한 README 변경을 하고, 실제로 일어난 일을 증명한다"
level: L1
domain: general
goal: "편집 전 확인, 최소 권한, diff 검토, 범위가 좁은 검증과 정직한 복구를 연습한다"
setup: "Part A에는 어떤 LLM 작업 공간과 가상 또는 민감하지 않은 메모가 필요합니다. Part B에는 README와 실제 로컬 실행 명령의 근거가 있는 폐기 가능 또는 비운영 Git 프로젝트가 필요합니다. 비밀, 고객 데이터, 운영 파일, 외부 쓰기는 사용하지 않습니다"
task: "외부 행동 없이 고정 입력 비교를 한 번 실행합니다. 안전한 프로젝트가 있을 때만 Codex에게 먼저 조사와 계획을 요청하고, 확인 후 README.md만 수정하며 실제 diff와 검증 기록을 남깁니다"
evidence:
  - "같은 고정 입력으로 저장한 두 답변(모호한 요청과 구조화된 요청)과 사실 포함, 요청 형식, 수정 횟수, 미확인 사항에 대한 학습자의 점검"
  - "목표, 입력, 허용·금지 행동, 수용 기준, 중지 조건, 인계 형식이 있는 작업 카드"
  - "편집 전 기준 상태, 계획, 실제 diff, 검증 명령의 근거"
  - "수행·미수행 행동, 검증 결과, 미확인 사항, 다음 확인을 분리한 실행 기록"
failure_variant: "README의 명령과 스크립트 이름을 다르게 하거나, 읽기 전용 검증을 불완전한 출력으로 중단하거나, 허용 경로를 사용할 수 없게 한다"
reflection: "가장 큰 위험을 줄인 확인은 무엇이었는가? diff는 무엇을 증명하고 무엇을 증명하지 못하는가?"
status: draft
last_verified: "not run"
transfer_task: "외부 쓰기를 허용하지 않는 고정 출처 조사 메모 또는 정적 문안 수정에 같은 프로토콜을 적용한다"
transfer_domain: "research, engineering, content, design, or marketing"
transfer_evidence: "두 프로토콜, 바뀐 증거 항목, 하나의 실패 기록, 명시적인 미검증 목록"
transfer_limitations: "이 Lab은 저위험 로컬 경계를 가르칠 뿐이며 계정 권한, 운영 안전, 외부 게시 또는 모든 Codex 작업면의 런타임 동작을 증명하지 않는다"
---

# Lab 001: 안전한 README 변경 하나 만들기

## README 전에: 파일 없이 하는 prompt 비교

Git, Codex, terminal이 없어도 시작할 수 있습니다. 평소 쓰는 어떤 model에서 아래의 가상
note 또는 비밀이 없는 자신의 note를 사용하세요.

```text
월요일: 초보자 안내의 오타 하나를 고쳤다.
화요일: 게시 checklist를 작성했다. reviewer 승인을 기다린다.
수요일: 올바른 command를 몰라 local format check를 실행하지 않았다.
다음: 게시 전에 필요한 check를 Maya에게 확인한다.
```

같은 model과 같은 note로 새 conversation 두 개를 만듭니다. 먼저 “이것을 좋은 project update로
바꿔 주세요”라고 요청합니다. 다음에는 아래처럼 요청합니다.

```text
task: 이 note를 project update로 바꾼다.
reader: 다음 행동을 결정할 teammate 한 명.
사용: 주어진 note만.
포함: 완료, 승인 대기, unknown, 다음 owner/action 하나.
만들지 말 것: note에 없는 test, approval, date, reason.
format: Done, Waiting, Unknown, Next step.
쓰기 전: 이 update를 바꿀 수 있는 빠진 fact를 나열한다.
```

네 가지 사실 보존, 형식, unknown 명시, 쓸 수 있을 때까지의 수정 횟수를 비교합니다. 한 번의
응답으로 prompt나 model이 “더 낫다”고 말하지 않습니다. model, history, input, criterion을 바꾸면
`not_comparable`로 기록합니다. 이 입구는 파일이나 service 권한 없이 관찰 가능한 차이를 만듭니다.

## 이 실습의 목적

이 실습은 1장의 정적인 경계 지도를 실제이지만 통제된 파일 변경으로 옮깁니다.
배포, 커넥터, 또는 현재 보이는 권한 라벨이 어디서나 유효한지 시험하는 과정이 아닙니다.

반드시 폐기 가능하거나 비운영인 프로젝트에서 실행하세요. 자격 증명, 토큰, 쿠키,
개인 키, `.env`, 고객 기록, 운영 설정을 작업에 넣지 마세요.

## 준비

1. 폐기 가능한 프로젝트가 없으면 [첫 안전 변경 fixture](../routes/first-safe-change-KO.md)로 시작합니다. Git, 계정, 설치, 네트워크가 필요 없습니다.
2. 절대 경로와 Git 프로젝트라면 현재 `git status`를 기록합니다. fixture에서는 저장소 정보를 지어내지 말고 `not a Git sandbox`라고 기록합니다.
3. 원래 `README.md`를 보관하거나 깨끗한 체크포인트를 만듭니다.
4. 로컬 실행 명령을 정의하는 실제 파일을 확인합니다. 기억이나 검색 결과로 명령을 만들지 않습니다.
5. 허용된 편집은 `README.md` 하나라고 적습니다.
6. 설치, 네트워크, commit, push, 게시, 외부 메시지, 비밀 읽기, 운영 작업이 이번 실행에 포함되지 않음을 확인합니다.

하나라도 불명확하면 `blocked`로 기록하고 멈춥니다. 먼저 시도해 보는 것은 경계 확인을 대신하지 않습니다.

## 첫 행동 전에 답할 네 가지

| 질문 | 기록할 내용 | 계속할 수 있는 조건 | 멈출 조건 |
| --- | --- | --- | --- |
| 어디에서 실행하는가? | 선언한 sandbox, 관찰한 현재 디렉터리, Git root와 branch 또는 HEAD. fixture만 `not a Git sandbox` 사용 가능. | 관찰 경로가 sandbox 안에 있고 모든 식별자가 같은 복사본을 가리킨다. | 식별자가 없거나 모호하거나 sandbox 밖이거나 서로 다르다. |
| 무엇을 바꿀 수 있는가? | `README.md` 하나. | sandbox 안의 기존 파일 하나가 대상이다. | 다른 경로가 필요하거나 대상을 특정할 수 없다. |
| 무엇이 허용되는가? | 조사, 계획 보고, 승인 뒤 한 번의 편집. | 되돌릴 수 있고 새 권한이 필요 없다. | 비밀, 설치, 네트워크, commit, push, 게시, 삭제, 외부 쓰기가 필요하다. |
| 어떤 증거를 받을 것인가? | 기준 상태, 정확한 diff, 명령 근거, 범위가 좁은 검사 출력, 미확인 사항. | 실행 뒤 모든 항목을 검사하고 보관할 수 있다. | 상태 문구나 검사할 수 없는 답변만 남는다. |

빈칸이나 `unknown`은 추측으로 채우는 칸이 아니라 중지 신호입니다.

## Codex에 줄 작업 카드

아래의 꺾쇠 값을 sandbox의 사실로 바꾸세요.

```text
Run ID: lab001-readme-<date>-<suffix>
Goal: <absolute-path>/README.md에 정확한 로컬 시작 섹션 하나를 추가한다.
Sandbox: <absolute-path>; 수정 가능한 파일은 README.md 하나다.
먼저 읽기: README.md, package/build manifest, 기존 script 파일.
허용 편집: README.md만.
하지 말 것: 설치, 네트워크, 코드 수정, commit, push, 게시, 메시지 전송,
  비밀 읽기, 운영 데이터 사용.
받을 증거: 기준 상태, 계획, 정확한 diff, 명령 근거, 제한된 검사 출력,
  명시적인 미검증 목록.
편집 전: 관찰한 현재 디렉터리, repository root와 branch 또는 HEAD(해당 시),
  선언한 sandbox, 기준 상태, 계획, 명령 근거, 수용 검사를 보고한다.
편집 후: 정확한 diff를 보이고 내가 승인한 검사만 실행한다.
경로, 명령, 권한, 복구 단계가 불명확하면 멈추고 질문한다.
```

문구 자체가 중요한 것이 아니라 목표, 허용 경로, 금지 행동, 증거와 중지 조건이
행동 전에 분명한지 확인하는 것이 중요합니다.

## 저장할 증거

하나의 기록에 다음 필드를 남깁니다.

```text
run_id:
checkpoint_before:
preflight_sandbox:
preflight_observed_directory:
preflight_repository_root:
preflight_branch_or_head:
preflight_edit_target:
preflight_allowed_actions:
preflight_receipt:
inputs_read:
assumptions:
actions_done:
actions_not_done:
diff_scope:
verification_command:
verification_result:
unverified:
blocked_on:
next_check:
permission_boundary:
status: passed | failed | stopped
```

`passed`라고 쓸 수 있는 것은 README만 바뀌고, 명령이 실제 프로젝트 설정으로
뒷받침되며, 외부 쓰기가 없고, 실행하지 못한 검사나 미확인 범위가 명시된 경우뿐입니다.
계획과 행동, 제안한 명령과 실행한 명령, diff와 통과한 검사, 중단된 검사와 성공한
검사를 구분하세요.

## 안전한 기능 탐침

작업이 구성된 경로나 workspace 주장에 의존할 때만 편집 전에 무해한 sentinel을 사용합니다.

1. 절대 경로와 승인된 sandbox 안이라는 사실을 확인합니다.
2. 허용된 정확한 경로에 비밀이 없는 임시 sentinel 파일 하나를 씁니다.
3. 다시 읽어 결과를 기록합니다.
4. 정리도 승인 범위 안일 때만 삭제합니다.

이 탐침은 자격 증명을 읽거나 권한을 바꾸거나 패키지를 설치하거나 네트워크와 다른
저장소에 접근하지 않습니다. 한 번의 무해한 쓰기 증거일 뿐, 더 넓은 도구 권한이나
운영 접근의 증거가 아닙니다.

## 실패와 경계 변형

폐기 가능한 복사본에서만 실행합니다.

### A: 사실의 출처가 충돌함

복사한 manifest의 script 이름을 README의 요청과 다르게 만드세요. 안전한 결과는 충돌을
발견하고 확인을 위해 멈추는 것입니다. 그럴듯한 명령을 고르면 안 됩니다.

### B: 검증이 불완전함

무해한 읽기 전용 검사가 기다리거나 불완전한 출력을 내게 한 뒤 안전한 방법으로 중단합니다.
마지막 이벤트, diff, 상태를 기록하세요. 안전한 결과는 `stopped` 또는 `unverified`이지
`passed`가 아닙니다.

### C: 권한 경계

의존성 설치, 비밀 읽기, 네트워크, push를 요구하는 문장을 추가합니다. 올바른 결과는 새롭고
좁은 결정 또는 `blocked` 기록입니다. 실습을 끝낸 것처럼 보이게 하려고 권한을 넓히지 않습니다.

### D: 기능 불일치

작업 카드에는 디렉터리를 선언하지만 sentinel 경로를 sandbox 밖이나 없는 위치로 둡니다.
안전한 결과는 불일치를 보고하고 편집 전에 멈추는 것입니다.

## 수용 체크리스트와 회고

- [ ] 작업 카드에 대상 파일 하나와 허용 편집 경로 하나가 있다.
- [ ] 첫 행동 전에 sandbox, 관찰 경로, Git 식별자, 대상, 허용 행동, 증거를 기록했다.
- [ ] 기준 상태와 기존 변경을 확인했다.
- [ ] Codex가 편집 전 조사와 좁은 계획을 보였다.
- [ ] 실제 diff는 허용된 파일에 한정된다.
- [ ] 검증 명령은 실제 프로젝트 설정에서 왔다.
- [ ] 실제 출력 또는 `not run`/`stopped`가 명시돼 있다.
- [ ] 실패 변형이 상태를 보존하고 권한을 넓히지 않았다.

기록에 답하세요. 가장 큰 실수를 막은 확인은 무엇이었나요? diff는 무엇을 증명하고
무엇을 증명하지 못했나요? 검사를 중단한 뒤 무엇이 남아 있나요? 다음 작업 카드에
한 필드만 더한다면 무엇인가요?

## 상태와 한계

이 Lab은 `draft`이며 `not_run`입니다. 구조 검증은 누군가가 이 과정을 완수했다는 뜻이
아닙니다. 특정 계정, 모델, Skill, 도구, 커넥터 또는 Codex 작업면이 같은 작업을 할 수
있다는 증거도 아닙니다. 시작하기 전에 [2장: 첫 번째 안전하고 검증 가능한 작업 완료하기](../chapters/02-first-safe-task-KO.md)를
확인하고, 현재 제공되는 다른 단원은 [한국어 목차](../table-of-contents-KO.md)에서 확인하세요.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr>
<td align="left"></td>
<td align="right"><a data-lab-nav="next" href="lab-002-task-protocol-KO.md" aria-label="다음 Lab: Lab 002 · 바람을 작업 프로토콜로 바꾸기">다음 →<br><strong>Lab 002 · 바람을 작업 프로토콜로 바꾸기</strong></a></td>
</tr></table></nav>
<!-- lab-navigation:end -->
