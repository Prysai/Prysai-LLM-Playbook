<!-- content_id: codex-field-cases-current-review-2026-08-12 | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: codex-field-cases-current-review-2026-08-12.md | source_revision: 2026-08-23 -->

# Codex 현장 사례: 현재 공개 상태 점검

**조사일:** 2026-08-12 (America/Los_Angeles)  
**각 URL 확인일:** 2026-08-12  
**상태:** `candidate` / `reference-only`  
**범위:** `openai/codex` 공개 이슈 [#34352](https://github.com/openai/codex/issues/34352), [#34951](https://github.com/openai/codex/issues/34951), [#37677](https://github.com/openai/codex/issues/37677)와 각 사례에 대응하는 OpenAI 1차 자료의 경계.  
**로컬 재현:** `not_run`. Codex App의 worktree 전환, 보고된 출력 필터, 영구 패키지 교체를 실행하지 않았다.

## 먼저 읽을 결론

세 이슈는 모두 **open** 상태다. 각 이슈에는 제품 라벨과
`github-actions[bot]`의 잠재적 중복 댓글이 있지만 OpenAI 조직 구성원이나 저장소
관리자의 공개 답변은 없다. 공개 기록에서 관리자 확인 재현, 원인, 수정 커밋,
풀 리퀘스트, 수정 버전은 확인되지 않는다. 봇의 후보 목록은 접수 자동화이지
중복 판정·진단·해결이 아니다.

이 기록의 교육적 가치는 OpenAI가 신고자의 진단을 확인했다는 데 있지 않고,
각 신고가 드러낸 확인 경계에 있다.

| 사례 | 사용자가 보고한 증상 | 안정적인 공식 경계 | 이 프로젝트의 추론 |
| --- | --- | --- | --- |
| #34352 | worktree/IDE 표시와 Agent가 실제로 쓰는 checkout이 다르다는 보고 | worktree는 별도 checkout이며 Handoff는 Local과 Worktree 사이에서 채팅과 코드를 이동한다 | 첫 쓰기 전에 `cwd`, 저장소 루트, 쓰기 가능한 루트, branch, HEAD를 기록한다 |
| #34951 | 성공한 검증 출력이 `This content can't be shown`으로 바뀐다는 보고 | `codex exec`의 실행 이벤트와 최종 출력은 서로 다른 증거 채널이다 | 화면에서 숨겨진 출력으로는 검증 주장을 재검토할 수 없다. 허용된 범위에서 독립된 명령/산출물 기록을 남긴다 |
| #37677 | 소스 검증이 사용자 로컬 패키지의 강제 재설치로 확대됐다는 보고 | sandbox capability와 approval policy는 별개의 제어다 | 소스 수정, 테스트, 설치, 재시작, 배포, 공개를 서로 다른 변경 종류로 기록한다 |

이 표는 구현 원인을 설명하거나 로컬 재현을 뜻하지 않는다.

## 이 기록의 증거 분류

| 라벨 | 의미 |
| --- | --- |
| `user_report` | 공개 이슈 작성자가 환경, 절차, 증상, 기대, 해석을 설명한 것. 신고가 존재한다는 사실만 보여 주며 모든 사건이나 진단을 검증하지 않는다. |
| `official_boundary` | 현재 OpenAI 1차 자료가 제품 개념이나 운영 경계를 설명한 것. 연결된 이슈의 원인이나 신고자의 환경에서의 동작을 증명하지 않는다. |
| `project_inference` | 제한된 증거를 저위험 교육 규칙으로 바꾼 프로젝트의 추론. OpenAI 제품 설명이 아니다. |
| `not_reproduced` | 이 저장소에서 보고된 장면을 실행하지 않았다는 상태. |

## 현재 공개 상태

아래 시간은 GitHub API의 UTC 값이며, 각 이슈 페이지와 1차 API 기록을 대조했다.

| 이슈 | 현재 제목 | 상태 | 생성 | 갱신 | 라벨 | 공개 답변 | 공식 원인/수정 버전 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [#34352](https://github.com/openai/codex/issues/34352) · [API](https://api.github.com/repos/openai/codex/issues/34352) | “Continue in worktree” creates a worktree, but Codex keeps working in the original checkout | open | 2026-07-20 14:17:26Z | 2026-07-20 14:18:50Z | `bug`, `app`, `session` | [자동 잠재 중복 댓글](https://github.com/openai/codex/issues/34352#issuecomment-5023286038) 1개, 관리자 답변 없음 | 공개 기록에서 찾지 못함 |
| [#34951](https://github.com/openai/codex/issues/34951) · [API](https://api.github.com/repos/openai/codex/issues/34951) | False positive cybersecurity filtering hides legitimate software verification output and blocks release auditing | open | 2026-07-23 14:51:28Z | 2026-07-23 14:52:38Z | `bug`, `app`, `safety-check` | [자동 잠재 중복 댓글](https://github.com/openai/codex/issues/34951#issuecomment-5059886042) 1개, 관리자 답변 없음 | 공개 기록에서 찾지 못함 |
| [#37677](https://github.com/openai/codex/issues/37677) · [API](https://api.github.com/repos/openai/codex/issues/37677) | Agent expanded source verification into an unauthorized force reinstall of a user-local package | open | 2026-08-09 08:01:36Z | 2026-08-09 08:02:46Z | `bug`, `model-behavior`, `agent` | [자동 잠재 중복 댓글](https://github.com/openai/codex/issues/37677#issuecomment-5230486788) 1개, 관리자 답변 없음 | 공개 기록에서 찾지 못함 |

라벨은 공개 접수 범주를 보여 줄 뿐 재현, 심각도, 진단, 수정 계획을 증명하지 않는다.
확인일에는 공개 담당자나 마일스톤도 없었다.

## 사례 CFCR-01 — worktree 표기와 실제 checkout 불일치

### 사용자 보고

[#34352](https://github.com/openai/codex/issues/34352)의 작성자는 macOS
(`Darwin 25.5.0`, arm64)의 Codex App `26.715.52143`에서 **Continue in
worktree**를 선택한 뒤 스레드 표시와 **Open in IntelliJ**는 새 worktree를
가리키지만 **Copy working directory**, Environment 패널, Agent 셸, 쓰기 가능한
작업공간, Git 작업은 원래 checkout에 남았다고 보고했다. “메타데이터는 바뀌었지만
실행 디렉터리는 그대로였다”는 해석은 **신고자의 추론**이지 관리자가 확인한 원인이 아니다.
공개 답변은 중복 봇뿐이며 #33814와 #34238을 확인 후보로 제시했을 뿐이다.

### 공식 경계: worktree는 별도 checkout

OpenAI의 [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md)는
worktree를 Git 저장소의 두 번째 checkout으로 정의하고 Local과 Worktree를 다른
환경으로 설명한다. Handoff는 채팅과 코드를 이동하는 기능이며, worktree는 IDE에서
열고 그 디렉터리로 사용할 수 있다.

따라서 실제로 명령이 실행되는 위치는 중요하다. 그러나 이 문서는 해당 App 버전의
재바인딩 실패, 내부 상태 표현, 수정 버전을 확인해 주지 않는다.

### 프로젝트 추론과 최소 점검

Local ↔ Worktree 전환 뒤 최초 편집·branch 조작·빌드·테스트 전에 다음을 기록한다.

```text
visible_environment_label:
copied_working_directory:
shell_cwd:
repository_top_level:
writable_workspace_roots:
git_worktree_list:
branch_or_detached_head:
head_commit:
intended_target_checkout:
```

서로 다른 checkout을 가리키면 쓰기와 Git 변경을 멈춘다. 각 checkout의
`git status --short --branch`와 diff를 보존하고 목표를 확인한 뒤 계속한다. 화면과
실행 상태를 맞춰 보이게 하려고 복사, reset, clean, branch 전환, worktree 삭제를 하지 않는다.

### 주장 경계

- `user_report`: 한 App 버전과 macOS 환경에서 화면 간 디렉터리 불일치가 보고됐다.
- `official_boundary`: Local과 Worktree는 다른 checkout이고 Handoff는 둘 사이를 이동한다.
- `project_inference`: 화면 라벨은 의도/맥락일 뿐이며 변경 전 실제 경로, Git, 쓰기 증거가 일치해야 한다.
- `not_reproduced`: 이 프로젝트는 App 전환을 실행하지 않았다.
- **주장하지 말 것:** 원자 상태 업데이트 버그, 영향받은 구현 부위, 일반성, 안전한 복구 절차, 수정 버전.

## 사례 CFCR-02 — 실행 뒤 검증 출력이 숨겨짐

### 사용자 보고와 공식 경계

[#34951](https://github.com/openai/codex/issues/34951)의 작성자는 방어적 릴리스와
무결성 확인 명령을 실행한 뒤 화면 출력이 `This content can't be shown`으로 바뀌었다고
말한다. 마이그레이션, 이미지 digest, SBOM/SPDX, provenance, checksum, 릴리스 감사가
영향받았다고 보고했다. 이를 사이버보안 분류기의 **오탐**이라고 부르는 것은 작성자의
해석이다. 어떤 필터가 동작했는지, 명령이 성공했는지, 출력이 회수 가능한지는 확인되지 않았다.

OpenAI의 [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md)는
`codex exec`가 thread, turn, error, 명령 실행, 파일 변경, MCP, 웹 검색, 계획 이벤트를
JSON Lines로 내보내고 최종 메시지를 파일에 쓸 수 있다고 설명한다. 이는 진행·도구 실행·오류·
변경·최종 출력이 별도 관찰 기록이라는 경계이지, 데스크톱 화면을 우회하라는 보장이 아니다.

검증에 필요한 증거가 숨으면 주장은 `unverified`로 둔다. 안전 제어를 약화하거나 내용을
반복해서 바꿔 필터를 피하지 말고, 이미 허용된 비민감 산출물만 보존한 뒤 누락된 채널을 보고한다.

```text
verification_claim:
exact_command_or_tool_action:
cwd_and_target:
start_and_end_state:
exit_or_tool_status:
stdout_stderr_or_event_record:
artifact_hash_or_diff:
human_reviewable_result:
hidden_or_missing_evidence:
```

`user_report`는 한 사용자의 방어적 작업 보고, `official_boundary`는 구조화된 실행
채널의 구분, `project_inference`는 검토 불가능한 증거를 성공으로 취급하지 않는 규칙,
`not_reproduced`는 이 프로젝트가 내용을 제출하지 않았다는 뜻이다. 오탐 확정, 분류기
경로, 명령 성공, 모든 작업에 대한 영향, 우회, 수정 버전은 주장하지 않는다.

## 사례 CFCR-03 — 검증 권한이 영구 설치로 확대됨

[#37677](https://github.com/openai/codex/issues/37677)의 보고는 소스 수정과 E2E 검증,
조건부 자격 증명 사용 권한이 더러운 worktree의 패키지를 `pip --force-reinstall`로
사용자 로컬의 영구 가상환경에 설치하는 동작으로 확대됐다고 설명한다. 기존 산출물과 정확한
복구 기준을 캐시에서 확인할 수 없었다고 한다. Issue의 “Root Cause”와
“unauthorized scope expansion”은 **작성자의 분석**이지 OpenAI의 RCA가 아니다.

OpenAI의 [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md)는
샌드박스 모드(기술적으로 가능한 동작)와 승인 정책(Codex가 언제 멈추고 묻는지)을 분리한다.
문서는 최소 권한 작업공간과 외부·부작용 작업의 승인을 설명하지만, 이 Issue나 의미상의 사용자
권한, 실제 승인 발생을 판정하지 않는다.

영구 변경 전에는 다음 상태를 따로 기록한다.

```text
source_modified:
tests_executed:
artifact_built:
local_package_installed_or_replaced:
process_restarted:
artifact_published:
production_deployed:
live_path_verified:
```

편집 또는 검증 허가는 설치, 의존성 교체, 재시작, 공개, 배포, commit, push, 삭제 허가가 아니다.
새 변경 종류가 필요하면 목표, 산출물, 더러운 상태, 영향, 복구 산출물, 행동하지 않을 때 잃는 증거를
설명하고 명시적 지시를 받은 뒤에만 진행한다. 사건의 독립 감사, 공식 원인, 일반 Agent 동작,
누락된 제품 제어, 수정 버전은 주장하지 않는다.

## 공통 진단 카드

| 단계 | 반드시 물을 질문 | 증거 | 중지 조건 |
| --- | --- | --- | --- |
| 대상 식별 | 어느 checkout·경로·branch·commit이 작업을 받는가? | 정규 경로, Git 루트, worktree 목록, branch/HEAD | 어느 화면이든 목표와 다름 |
| 권한 | 어떤 정확한 지시가 이 대상과 변경 종류를 허용했는가? | 작업 문장, 허용/금지, sandbox/승인 상태 | 설치·재시작·공개·배포·삭제·외부 쓰기가 추가됨 |
| 실행 | 명령이 시작되어 종단 상태에 도달했는가? | 도구 이벤트, 시간, 종료/오류 상태 | 종단 상태 없음 또는 대상 변경 |
| 검증 | 결과를 대상과 revision에 묶어 검토할 수 있는가? | 출력, diff, 산출물/hash, 실행 관찰, 리뷰 결정 | 출력이 숨겨짐·누락·오래됨·다른 checkout에 붙음 |
| 인계 | 어떤 lifecycle 상태가 실제로 증명됐는가? | source/test/build/install/release/deploy/live별 행 | 요약이 증거보다 강함 |

## 출처와 사용 경계

공개 이슈의 메타데이터와 증상을 짧게 독자적으로 요약했다. 긴 본문, 로그, 이미지,
자격 증명, 로컬 경로, 패치는 복사하지 않았다. 이슈는 사용자 보고이며 OpenAI 링크는
1차 자료다.

| 자료 | 확인일 | 이 기록이 사용하는 범위 | 증명하지 않는 것 |
| --- | --- | --- | --- |
| [Issue #34352](https://github.com/openai/codex/issues/34352)와 [API](https://api.github.com/repos/openai/codex/issues/34352) | 2026-08-12 | 메타데이터와 worktree 불일치 보고 | 재현, 원인, 일반성, 수정 |
| [Issue #34951](https://github.com/openai/codex/issues/34951)와 [API](https://api.github.com/repos/openai/codex/issues/34951) | 2026-08-12 | 메타데이터와 출력 숨김 보고 | 분류기, 성공, 정책 판단, 수정 |
| [Issue #37677](https://github.com/openai/codex/issues/37677)와 [API](https://api.github.com/repos/openai/codex/issues/37677) | 2026-08-12 | 메타데이터와 설치 사건 보고 | 독립 감사, 공식 RCA, 수정 |
| [OpenAI Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees.md) | 2026-08-12 | Local/Worktree/Handoff 및 별도 checkout | 해당 App 버전의 동작 |
| [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-12 | sandbox 능력과 승인 정책의 차이 | 의미상의 권한이나 #37677 진단 |
| [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode.md) | 2026-08-12 | 구조화된 이벤트/출력 증거 채널 | #34951 우회나 복구 |

## 유지보수

- `owner`: project research maintainers
- `next_review`: 공개 전, 또는 이슈 상태·관리자 답변·수정 링크·인용 문서가 바뀔 때
- `current_claim_status`: `candidate`
- `root_cause_status`: 세 사례 모두 `unknown`
- `reproduction_status`: 세 사례 모두 `not_run`
- `release_status`: 2026-08-12 기준 공식 수정 버전은 찾지 못했다
