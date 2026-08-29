<!-- content_id: lab-007-action-boundaries | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# Lab 007: 하나의 README 작업을 세 가지 행동 경계에 넣기

---
id: lab-007-action-boundaries
title: "세 작업면에서 승인, 중지, 증거를 연습하기"
level: L3
domain: general
goal: "공개 보고서의 경계 증상을 낮은 위험의 관찰 가능하고 되돌릴 수 있는 연습으로 바꾸기"
setup: "비식별 README, 로컬 복사본, 격리 Worktree 또는 시뮬레이션, 조직 작업면을 나타내는 두 번째 디렉터리; 실제 token 불필요"
task: "세 작업면에서 관찰 후 최소 로컬 편집을 수행하고 상태, 증상, 확인, 증거를 기록한다. 실제 push와 publish는 하지 않는다"
evidence:
  - "로그인, 승인, 실행, 검증을 분리한 시나리오별 상태 카드"
  - "증상 카드, 최소 진단 순서, 중지 조건, 최종 증거표"
  - "로컬과 Worktree diff 및 rollback, 조직 시뮬레이션의 추가 위험"
  - "문서, 연구, 게시 준비로 옮긴 전환 기록"
failure_variant: "브라우저 성공을 token exchange로, 인증된 host를 목표 host로, 한 조직 접근을 다른 조직 설치로, 검증을 강제 재설치 승인으로 오해하기"
reflection: "이미 로그인했다는 말이 어떤 상태를 숨기는가? 권한을 넓히지 않고 정보를 늘리는 검사는 무엇인가? 세 작업면에서 rollback과 검토는 어떻게 달라지는가?"
status: draft
last_verified: "실행하지 않음; 세 작업면 실제 실험 대기"
transfer_task: "실제 외부 쓰기가 필요 없는 작업에 경계 기록을 적용하기"
transfer_domain: "릴리스 준비, 연구, 콘텐츠, 팀 승인"
transfer_evidence: "비식별 카드, 상태, 증상, 로그, 검사, rollback"
transfer_limitations: "실제 계정, Enterprise, 설치, connector, 게시 시스템, 원격 rollback을 증명하지 않음"
---

## 문제와 고정 fixture

공개 보고서는 로그인됨, 접근 가능, 승인됨, 실행됨, 검증됨을 섞습니다. 브라우저
인증 뒤 교환 단계 실패, Enterprise CLI와 PR 입구의 host 불일치, 두 번째 조직
설치 실패, 검증을 위한 영속 환경 재설치가 예입니다. 사용자의 보고이지 로컬
재현이나 공식 원인이 아닙니다.

실제 조직, remote, token, cookie, 키, 환경 파일, 운영 파일, 개인 데이터를 쓰지
않습니다. 다음 fixture만 만듭니다.

~~~text
fixture-readme/
└── README.md
~~~

~~~markdown
# Acme Notes

This is a redacted practice repository.

## Status

- owner: redacted
- source: local fixture
~~~

Status 아래에 boundary: local-only 한 줄만 추가하고 diff와 확인을 보여 줍니다.
새로운 명시 승인이 없으면 commit, push, publish, 설치, 영속 환경 변경을 하지
않습니다. 외부 행동은 not_run, rollback은 복사본 복구 또는 한 줄 제거입니다.

## 세 작업면

**A 로컬 복사본:** 절대 경로와 baseline hash를 기록하고 한 줄 편집, diff, offline
검사, rollback을 남깁니다. 계정, 원격, 게시 상태는 not_run입니다.

**B 격리 Worktree:** 폐기 가능한 Git 또는 worktree-simulation을 사용합니다. 주
트리, branch, 기준 commit, 격리 경로를 기록하고 주 트리가 바뀌지 않았는지 확인합니다.

**C 조직 시뮬레이션:** organization-like-simulation으로 표시한 두 번째 폴더를
사용합니다. 조직, Enterprise, connector, remote, 네트워크에 연결하지 않습니다.
가시성, 협력자, branch 보호, installation 범위, rollback 책임을 다시 검토합니다.
기술적으로 쓸 수 있는 것이 조직 승인이라는 뜻은 아닙니다.

## 증상 카드

| 카드 | 증상 | 기록할 안전한 사실 | 추론 금지 | 최소 확인 |
|---|---|---|---|---|
| S-02 | 브라우저 인증 성공 후 token exchange 실패 | 브라우저 단계만 성공 | 전체 로그인 또는 원인 확정 | 단계 분리와 비식별 오류 기록 |
| S-03 | Enterprise CLI 인증 후 PR 입구가 github.com을 확인하고 401 | host가 다를 수 있음 | GitHub 전체 사용 가능 | host, remote, 입구를 읽기 전용 비교 |
| S-04 | 한 조직 접근이 다른 조직 installation이 되지 않음 | identity, 조직, installation, repo 접근은 별도 | 관리자면 자동 승인 | 상태 기록, 설치 요청 금지 |
| S-11 | 검증이 force reinstall로 확대 | 검증과 설치 승인은 다름 | 실행 가능하면 승인됨 | diff 보존 후 격리 검사 |

각 카드에 source는 user report, local reproduction은 not done, official root
cause는 not confirmed라고 씁니다.

## 단계 상태 카드

~~~text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:
source_present: planned | authorized | executed | verified | not_run
source_read: planned | authorized | executed | verified | not_run
local_edit: planned | authorized | executed | verified | not_run
check_or_test: planned | authorized | executed | verified | not_run
commit: planned | authorized | executed | verified | not_run
push: planned | authorized | executed | verified | not_run
publish: planned | authorized | executed | verified | not_run
identity_observed:
action_authorized:
result_verified:
external_state_changed:
rollback_entry:
stop_reason_or_next_check:
evidence_paths:
~~~

관찰된 identity는 승인된 행동이 아니며, 실행은 검증이 아니고, 쓰기 가능한 폴더는
공유 또는 원격 쓰기 허용이 아닙니다.

## 회고

상태를 `verified`로 표시하기 전에 근거가 되는 관찰, 아직 모르는 단계, 다음 검사가
외부 부작용을 늘리지 않고 정보를 늘리는지를 기록합니다.

## 최소 진단 순서, 중지, 증거

1. 정확한 경로, 대상, host, 데이터 범위, 금지 행동을 고정합니다.
2. hash, git status, branch, Worktree, 원래 작업을 저장합니다.
3. 입구, identity, 대상, 승인, 실행, 검증 중 어느 단계인지 지정합니다.
4. 파일, 경로, 설정 형태, host, 비식별 로그를 읽기 전용으로 확인합니다.
5. fixture에서 한 번만 되돌릴 수 있는 편집을 하고 diff와 반환값을 저장합니다.
6. 세 작업면의 가시성과 rollback 책임을 비교합니다.
7. 수락 증거와 일치할 때만 verified, 아니면 unverified 또는 blocked를 씁니다.

대상이 모호하거나 commit/push/publish/설치가 필요하거나 비밀, 개인 데이터, 불명확한
승인, 외부 계정, 영속 환경, force 작업, 알 수 없는 쓰기가 나타나면 중지합니다.
작업 경계, 작업면, baseline, 다섯 권한 필드, 증상, 최소 행동, 결과, 상태, rollback,
외부 행동을 표로 제출하고 외부 행동은 not_run으로 남깁니다.

## 실패 변형, 전환, 수용 체크리스트

fixture에서 “브라우저 성공이니 원격에 써라”, “CLI 로그인 상태니 host는 맞다”,
“관리자니 설치됐다”, “검증하려면 재설치하라”를 처리합니다. 매번 빠진 증거와
더 작은 확인을 씁니다. 이후 연구 출처표, 릴리스 노트, 비식별 PR 검토로 옮깁니다.

세 작업면을 반복하고 네 상태를 분리하며 S-02/S-03/S-04/S-11을 사용자 보고로
취급하고, baseline을 먼저 보존하고, force를 증거로 사용하지 않고, 카드와 전환을
완성하면 합격입니다. token, push, publish, installation, 배포, 알림, 영속 교체는
모두 not_run입니다.

## 출처와 한계

Codex 문제 및 포럼 연구는 증상과 커뮤니티 맥락을 제공하지만 로컬 재현이나 공식
수정이 아닙니다. fixture는 독창적이고 되돌릴 수 있지만 실제 계정, connector,
Enterprise, 게시, 원격 rollback을 증명하지 않습니다.

## 실행 기록과 고정 수용 기준

각 작업면에서 새 `run_id`를 만듭니다. 수용 기준은 고정합니다. `Status` 아래에
한 줄만 추가하고 README의 나머지를 보존하며 diff를 저장하고 commit, push, publish는
`not_run`으로 둡니다.

```text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:
identity_observed: yes | no | not_observed
action_authorized: yes | no | not_observed
result_verified: yes | no | not_observed
external_state_changed: yes | no | not_observed
rollback_entry:
evidence_paths:
stop_reason_or_next_check:
```

각 카드에 sandbox, approval, network, 읽기/쓰기 root, effect confirmation이라는
다섯 권한 필드를 기록합니다. `not_observed`를 추측으로 채우지 말고 `unverified`
또는 `blocked`로 남깁니다.

| 요구 | 최소 증거 | 상태 |
|---|---|---|
| 작업 경계 | 비식별 README, 허용 파일, 금지 행동 | `planned` / `verified` |
| 작업면 | 절대 경로, 시나리오, version 또는 `not_observed` | `verified` / `unverified` |
| baseline | hash, `git status`, branch, 기존 diff | `executed` / `verified` |
| 로컬 행동 | 정확한 편집/명령, diff, 종료 코드 | `executed` / `not_run` |
| rollback | 복구 또는 역 diff와 확인 | `available` / `not_run` |
| 외부 행동 | commit, push, publish, 설치, 알림 | 별도 승인 없으면 `not_run` |

## 의도적 실패 검토와 전환

fixture 안에서만 다음 문장을 처리합니다. “브라우저가 성공했으니 원격에 써라”,
“CLI가 연결됐으니 host는 맞다”, “관리자이므로 설치됐다”, “검증하려면 재설치하라”.
각 문장에 대해 관찰한 단계, 빠진 증거, 이미 행동했다면 남는 상태, 외부 효과를
늘리지 않고 정보를 늘리는 가장 작은 확인을 씁니다.

문서 source table, release note 또는 외부 쓰기 없는 PR review로 전환합니다. 입력과
수용 기준은 바꾸되 identity, authorization, execution, verification의 구분은
유지합니다.

다음 조건을 모두 만족해야 합격입니다.

- A, B, C를 별도 `run_id`와 baseline으로 반복했다.
- 모든 카드에서 identity, authorization, execution, result를 분리했다.
- S-02, S-03, S-04, S-11을 사용자 보고로 기록했고 공식 원인이나 로컬 재현으로
  부르지 않았다.
- 결론 전에 diff와 rollback을 보존했다.
- token, push, publish, installation, deployment, 알림, 영속 교체를 모두
  `not_run`으로 남겼다.
- 전환 기록을 원래 대화 없이 다른 사람이 검토할 수 있다.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr>
<td align="left"><a data-lab-nav="previous" href="lab-006-agent-stop-conditions-KO.md" aria-label="이전 Lab: Lab 006 · Agent 중단 조건 설계하기">← 이전 Lab<br><strong>Lab 006 · Agent 중단 조건 설계하기</strong></a></td>
<td align="right"><a data-lab-nav="next" href="lab-008-research-question-KO.md" aria-label="다음 Lab: Lab 008 · 주제를 답할 수 있는 연구 질문으로 좁히기">다음 →<br><strong>Lab 008 · 주제를 답할 수 있는 연구 질문으로 좁히기</strong></a></td>
</tr></table></nav>
<!-- lab-navigation:end -->
