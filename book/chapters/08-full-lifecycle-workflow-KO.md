<!-- content_id: chapter-08-full-lifecycle-workflow | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 8장: 정의에서 전달까지

**상태:** `candidate`. 이 장은 증거를 남기는 작업 흐름과 복구 규칙을 설명합니다. 비교 실험은 `not_run`이며 실제 Codex 실행, 고객 업무, 운영 배포를 증명하지 않습니다.

## 문제와 목표

모델에게 시작을 시키는 일과 다른 사람이 쓸 수 있는 일을 끝내는 일은 다릅니다. 목표가 모호하거나 범위가 커지거나 검사가 다른 파일을 보고 있어도 화면은 정상처럼 보일 수 있습니다.

```text
define → plan → build → verify → review → deliver → maintain
```

각 화살표는 판단 지점입니다. Agent가 완료라고 말해서가 아니라 다른 사람이 확인할 증거가 있을 때만 다음 단계로 갑니다. 이 장을 마치면 편집 전 범위·제외·수용·권한·복구를 쓰고, 큰 요청을 증거가 빠른 수직 슬라이스로 나누며, 마지막 수용 상태를 알고 조건부 재시도를 할 수 있어야 합니다.

## 증거를 운반하는 단계

| 단계 | 종료 증거 | 멈출 때 |
|---|---|---|
| Define | 작업 프로토콜과 수용 조건 | 입력 부족이 범위, 위험, 권한을 바꾼다 |
| Plan | 슬라이스와 검사가 있는 계획 | 확인 가능한 결과 없는 수평 계획 |
| Build | diff, 변경 파일, checkpoint | 범위를 벗어나거나 복구가 불명확하다 |
| Verify | 명령, 종료 코드, 출력, 환경 | 멈춤, 잘못된 대상, 증거 부족 |
| Review | 주장-증거 표와 열린 위험 | 주장이 증거보다 넓다 |
| Deliver | 요약과 산출물 경로 | published 또는 live라고 과장된다 |
| Maintain | 담당자, 검토, 복구 기록 | 담당자나 복구 방법이 없다 |

종료 조건이 빠지면 `blocked` 또는 `unverified`로 남깁니다. 단계 수가 많아도 빠진 권한, 파일, 검사를 대신하지 못합니다.

## 문구와 증거를 구분하기

| 주장 | 최소 증거 | 증명하지 않는 것 |
|---|---|---|
| 소스가 바뀌었다 | 지정 경로의 diff | 변경이 맞다는 것 |
| 검사를 실행했다 | 명령, 폴더, 종료 코드, 출력 | 애플리케이션 동작 |
| 애플리케이션이 동작한다 | 지정 입력과 환경의 실행 관찰 | 모든 계정과 OS에서의 동작 |
| 페이지가 보기 좋다 | viewport와 기준을 남긴 렌더 검사 | 수요, 완전한 접근성, 배포 |
| 기능을 출시했다 | 저장소 또는 배포 상태와 후속 검사 | 모든 사용자 도달 |

빌드 통과는 유용하지만 실행, 시각, 보안, 사용자 수용 증거가 자동으로 되지는 않습니다.

## 행동 전에 정의하고 복구하기

```text
owner: content-maintainer
target: docs/guide.md
allowed_scope: 규칙 읽기; 대상 편집; 기존 로컬 검사 실행
non_goals: 의존성 설치; commit; push; publish; 시스템 변경 금지
acceptance: 지정 결함을 고치고 허용한 검사 종료를 남긴다
evidence: diff, 변경 파일 목록, 명령 출력, 미검증 목록
stop_when: 범위, 권한, 대상, 복구 출처가 빠진다
rollback: 기록한 편집 전 복사본 또는 clean checkpoint로 돌아간다
```

`모든 데이터 → 모든 API → 모든 UI → 통합 → 테스트` 같은 수평 계획 대신, `한 입력 → 가장 작은 변경 → 관찰 가능한 행동 → 집중 검사`라는 수직 슬라이스를 사용합니다. 쓰기, 네트워크, 인증, 설치, 재시작, 배포, 외부 메시지는 필요하고 명시적으로 허가됐을 때만 더합니다.

재시도 전에는 `failed_stage`, `failure_class`, `last_accepted_checkpoint`, `changes_since_checkpoint`, `retry_condition`, `fallback`을 남깁니다. “계속해”는 복구 계획이 아닙니다. 명령이 `Working`에 머물면 침묵은 성공이 아니라 관찰입니다.

## 먼저 작고 완전한 slice 하나 끝내기

처음부터 site, code, release로 시작할 필요는 없습니다. 직접 확인할 수 있는 짧은 글, local README 하나, 이미 사용 허가된 공개 source 묶음을 고르세요. 목표는 model이 “많이 하게” 하는 것이 아니라 define부터 handoff까지 보이는 한 바퀴를 끝내는 것입니다.

```text
result: 120자 이내 설명으로 새 reader가 첫 단계를 찾게 한다.
input: 원문, 예상 reader, 알려진 문제 하나.
allowed: 원문을 읽고 plan을 제안한다. 확인 뒤에도 그 text만 편집한다.
not allowed: network, sign-in, install, 전송, publish, 다른 file 변경.
check: before/after text를 보관하고 “첫 단계를 찾는가”를 한 번 확인한다.
handoff: 바꾼 것, 바꾸지 않은 것, check 결과, 남은 unknown.
```

일곱 단계를 통과합니다. reader와 result를 정의하고, 한 변경을 plan하며, 원문을 checkpoint로 보관하고, 편집하고, 전후를 비교하고, 새 시각으로 review한 뒤, 다음 사람이나 내일의 자신에게 handoff합니다. 더 많은 자료나 external action이 필요하면 `blocked`에서 멈춥니다. 닫힌 것처럼 보이기 위해 permission을 넓히지 않습니다.

### 두 시도가 비교 가능한 때

“model에게 바로 편집을 요청”과 “먼저 protocol을 작성”을 비교하려면 원문, goal, allowed action, time limit, check rule을 고정합니다. first output, 실제 시간, rework, diff, check result, unknown을 남깁니다. text, model, tool, permission, environment가 바뀌면 `not_comparable`입니다. 한 번 더 빠르거나 보기 좋은 결과는 일반 효율이나 model 우위를 증명하지 않습니다.

## 실험과 한계

버려도 되는 폴더에서 작은 문서 작업을 직접 요청과 프로토콜·checkpoint·집중 검사 방식으로 비교합니다. 첫 출력, diff, 명령, 종료 코드, 실제 시간, 재작업을 남깁니다. 없는 시간이나 비용은 추정하지 말고 `unavailable`로 적습니다.

시간 초과, 입력 변경, 권한 차단, 로컬 쓰기 결과 불명 중 하나를 일으킵니다. 중단한 시도를 보존하고 재시도 전 대상을 읽습니다. 고정 조건이 바뀌면 `not_comparable`로 표시합니다. 작은 과제 몇 개로 일반 효율, 품질, 모델 순위를 증명할 수 없고, 링크 검사가 학습, 공개, 채택을 증명하지도 않습니다.

## checkpoint를 가지고 한 바퀴 돌기

짧은 작업도 중간에 무엇이 확정됐는지 남겨야 합니다. 다음 사람이 conversation을 읽지 않아도
이어갈 수 있는지가 기준입니다.

```text
CP0: original text, target path, 허용 scope, rollback source
CP1: goal과 acceptance 확인; 아직 edit하지 않음
CP2: 한 곳만 edit; before/after와 diff 보관
CP3: named check 실행 또는 stop; output과 limit 보관
CP4: claim과 evidence 검토; handoff와 next action 작성
```

각 checkpoint에 마지막으로 확인한 것, 바뀌었을 수 있는 file, 부족한 evidence, 다음 안전한
행동 하나를 적습니다. `CP2`가 없으면 model이 “바꿨다”고 해도 change를 delivery에 넣지 않습니다.
`CP3`가 timeout되면 silence를 pass라고 하지 않고 output, process state, diff를 남겨
`unverified` 또는 `blocked`로 둡니다.

## 주장마다 검사를 고르기

| 주장 | 필요한 evidence | 아직 증명하지 않는 것 |
|---|---|---|
| text를 바꿨다 | named path의 before/after 또는 diff | 독자가 이해한다는 것 |
| local check가 통과했다 | command, directory, exit code, output | 다른 environment의 동작 |
| page가 보인다 | recorded viewport의 render review | accessibility, demand, deployment |
| external change를 보냈다 | target 쪽 read-back | 모든 사람이 볼 수 있다는 것 |

하나의 green check를 모든 주장에 쓰지 않습니다. 특히 diff는 change의 증거일 뿐 user value나
publish의 증거가 아닙니다. evidence가 없으면 문장을 좁힙니다.

## 다음 사람을 위한 짧은 handoff

```text
status: passed | partial | blocked | unverified
done: evidence가 있는 action만
changed: exact paths 또는 none
evidence: CP 번호, diff, command output, review note
not done: commit / push / publish / external write 여부
not proven: reader usefulness, runtime, visual, security 등
next: 안전한 행동 하나
```

이는 “전부 완료”보다 짧아도 더 강한 handoff입니다. target, authority, recovery source가
불명확하면 다음 행동은 edit가 아니라 질문 또는 read-only check입니다. 실행 기록과 review가
생기기 전까지 이 장과 비교 실험은 `candidate`, `not_run`입니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-KO.md">← 이전<br><strong>7장 · Skills, Plugins, MCP, 도구</strong></a></td><td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-KO.md">다음 →<br><strong>9장 · 검증, 의심, 복구</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
