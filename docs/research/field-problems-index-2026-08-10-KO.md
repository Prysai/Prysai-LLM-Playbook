<!-- content_id: field-problems-index-2026-08-10 | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: field-problems-index-2026-08-10.md | source_revision: 2026-08-10 -->

# 현장 문제 연구 색인 (2026-08-10)

**상태:** `candidate`. 공개 사용자 보고를 찾아보고 증거의 범위를 정리한 기록입니다. 공식 장애 목록도, 이 프로젝트가 로컬에서 재현한 보고서도 아닙니다.

여러 조사 흐름에서 나온 사례 ID, 원 출처, 확인일, 버전 범위와 학습 경로를 한곳에 모았습니다. 프로젝트가 보관하는 것은 직접 작성한 요약과 진단 방법뿐이며, 외부 게시물·코드·이미지·로그·자격 증명·Skill 지침은 복사하지 않습니다.

## 조사 기록

| 기록 | 범위 | 출처와 확인일 | 증거의 경계 | 주요 학습 위치 |
|---|---|---|---|---|
| [FP](field-problems-codex.md) | Codex CLI/App, 인증, GitHub 호스트, 커넥터, Skill, 모델, 검증 | `openai/codex` 원본 Issue, 2026-08-09 | 주로 사용자 보고이며 로컬 재현 없음. 유지관리자가 확인하지 않은 추측을 원인으로 쓰지 않음 | 5, 9, 12, 13, 14, 15, 22장 |
| [FP-S](field-problems-surface-2026-08-10.md) | 화면, Provider, WSL, 디렉터리 루트, worktree, Cloud, Computer Use, 스레드 소유권 | `openai/codex` 원본 Issue, 2026-08-10 | 사용자 보고. Issue가 `closed`라고 해결된 것은 아님. 로컬 재현 없음 | 5장, Lab 007, 13장, Lab 013 |
| [FUP](field-problems-follow-up-2026-08-10.md) | 하위 Agent 인계, 도구 등록, 두 번째 디렉터리, WSL 프록시, HTTP 507 | `openai/codex` 원본 Issue, 2026-08-10 | 사용자 보고. 로컬 재현과 공식 원인 확인 없음 | 5, 8, 9, 12, 13, 19장, Lab 013 |
| [FUP-P2](field-problems-follow-up-2026-08-10-p2.md) | macOS Local Network 권한, Linear OAuth 반복, 하위 Agent UI 상태 불일치, Windows 권한 선택기 저장 상태 | `openai/codex` Issue와 OpenAI/Apple 공식 경계, 2026-08-10 | 사용자 보고. 원인 미확인, 로컬 재현 없음. 우회 방법은 수정이 아님 | 4, 5, 9, 12장, Lab 001·002·003 |
| [포럼](field-problems-forums-2026-08-10.md) | sandbox 네트워크, Windows, VS Code spawn, 승인, 인코딩, 비공개 경로, Maven, 확인 가능한 GitHub Issue 요약에 관한 Stack Overflow 보고 | Stack Exchange API, 확인 가능한 Stack Overflow 페이지와 공개 GitHub Issue, 2026-08-10 | Stack Overflow 답변은 커뮤니티 제안. Reddit, Discussions, 확실히 확인하지 못한 페이지는 제외. 로컬 재현 없음 | 5, 7, 9, 13장, Lab 013 |

## 본문에 사용하는 사례 매핑

| ID | 보고자가 설명한 증상 | 버전/환경 기록 | 현재 상태와 증거 | 학습 행동 |
|---|---|---|---|---|
| [FP-02](field-problems-codex.md#fp-02：浏览器显示认证成功，但-token-exchange-失败) | 브라우저 페이지는 성공하지만 클라이언트 token exchange가 실패함 | Codex/CLI 0.147.0, Windows 11, WSL/Linux; 2026-08-07 생성, 2026-08-09 정리 | Issue `open`, 사용자 보고, 이 프로젝트에서는 미재현 | 인증 페이지·callback·교환·첫 무부작용 요청을 분리하고 실패하면 `blocked`/`unverified`에서 멈춤 |
| [FP-03](field-problems-codex.md#fp-03：github-enterprise-only-用户被-pr-入口错误地探测到-githubcom) / [FP-04](field-problems-codex.md#fp-04：github-connector-无法为第二个组织建立-installation) | CLI나 첫 조직은 되지만 앱 host 또는 두 번째 조직의 installation이 맞지 않음 | App 26.715.31251 / 26.727.40816, macOS; 2026-07-22·2026-08-01 생성 | Issue `open`, 사용자 보고, 미재현 | hostname, 계정, 조직, 저장소, installation을 따로 확인하고 확인 전 권한을 요청하지 않음 |
| [FP-S-05](field-problems-surface-2026-08-10.md#fp-s-05：windows-linked-worktree-中的-apply_patch-被误判为项目外) / [FP-S-06](field-problems-surface-2026-08-10.md#fp-s-06：界面显示已切到-worktree，但-agent-仍在原-checkout-工作) | worktree 표시, shell, patch, Git 디렉터리가 서로 다를 수 있음 | Windows의 CLI 0.147.0/PowerShell 7.6.4 또는 macOS의 Desktop 26.715.52143; 2026-08-10 정리 | Issue `open`, 사용자 보고, 미재현 | `cwd`, worktree root, workspace root, IDE 경로와 Git 상태를 읽기 전용으로 확인하고 일치할 때까지 쓰기를 멈춤 |
| [FUP-01](field-problems-follow-up-2026-08-10.md#fup-01：子-agent-被创建，但任务消息没有到达) / [FUP-05](field-problems-follow-up-2026-08-10.md#fup-05：长时间没有任何事件，随后-http-507-并自动重试) | 상태나 재시도는 성공처럼 보이지만 메시지 도착, 첫 부작용과 결과가 입증되지 않음 | 2026-08-10 생성/확인; 정확한 버전은 보고마다 다름 | Issue `open`, 사용자 보고, 미재현 | 고정된 짧은 문구와 체크포인트로 생성·도착·실행·반환을 증명하고 재시도 전 diff와 외부 상태를 읽음 |
| [포럼-1](field-problems-forums-2026-08-10.md#1-sandbox-内访问-github-被网络-allowlist-拦截) / [포럼-3](field-problems-forums-2026-08-10.md#3-vs-code-扩展-spawn-unknown，但-cli-能手动启动) | 네트워크 allowlist나 VS Code host는 실패하지만 다른 층은 정상처럼 보임 | Codex CLI, Windows/VS Code, 기업 정책 등; 원본 시간 기록 사용 | 사용자 보고와 답변자 제안, 공식 확인 없음, 미재현 | sandbox·proxy·PATH·확장 host·대상 도구를 나누고 네트워크를 넓히거나 정책을 우회하지 않음 |
| [WF-09](web-field-problems-2026-08-10.md#wf-09：浏览器能读到弹窗，但点击证据仍未成立) | 페이지와 DOM은 읽히지만 클릭 호출이 시간 초과됨 | Windows 브라우저 제어, 2026-08-10 확인 | 사용자 보고, 미재현 | 페이지 표시·요소 식별·호출 반환·페이지 변화를 따로 기록하고 “읽기는 확인, 클릭은 미확인”으로 인계 |
| [P2-01](field-problems-follow-up-2026-08-10-p2.md#p2-01：网络开关已启用，但-macos-local-network-权限仍阻断-lan) | 작업 metadata는 네트워크가 켜졌다고 하지만 macOS Local Network 권한이 LAN을 막음; 권한을 연 뒤에도 HTTP 401을 받음 | Desktop 26.727.51351 / bundled CLI 0.146.0-alpha.9.2, Darwin arm64, 2026-08-10 | 사용자 보고와 공식 경계. 원인 미확인. HTTP 401은 인증 계층에 도달했다는 것만 증명. 미재현 | 설정·시스템 권한·TCP/HTTP·인증을 분리 |
| [P2-02](field-problems-follow-up-2026-08-10-p2.md#p2-02：linear-oauth-显示已接受，但只读调用持续重新认证) | Linear OAuth는 승인됐다고 표시되지만 같은 read-only `get_issue`가 계속 인증을 요구함 | CLI 0.146.1, macOS arm64, 2026-08-10 | 사용자 보고와 공식 커넥터 경계. 우회 방법은 공식 확인 없음. 미재현 | 4·5장, Lab 002·003; 무부작용 재시도 한 번 뒤 멈춤 |
| [P2-03](field-problems-follow-up-2026-08-10-p2.md#p2-03：子-agent-已完成，但父任务界面仍显示-active) | 상태 조회는 하위 Agent가 끝났다고 하지만 결과를 열 때까지 부모 작업은 Active로 남음 | macOS 26.6.1; Windows 커뮤니티 보고도 있음; 2026-08-10 | 사용자 보고. UI 상태 머신과 백그라운드 원인 미확인. 미재현 | 실행 종료 상태·결과 read-back·부모 작업 상태를 따로 기록 |
| [P2-04](field-problems-follow-up-2026-08-10-p2.md#p2-04：windows-权限选择器因旧持久化布尔值而灰掉) | 권한 선택기가 회색으로 표시됨; 오래된 저장 값을 바꾸자 UI는 돌아왔지만 실제 런타임 정책은 별도 확인 필요 | Desktop 26.803.5235.0, Windows 11 Pro 22631, x64, 2026-08-10 | 사용자 진단. 내부 구현과 수정은 미확인. 미재현. 상태 파일 수정을 공식 절차로 만들지 않음 | 4장, Lab 001·003; 백업 후 저위험 probe와 승인 동작을 확인 |

## 증거 수준과 재검토 규칙

- `사용자 보고`는 보고자가 해당 환경에서 증상을 보았다고 말한 사실만 증명하며, 여러 환경의 보고가 자동으로 공식 확인이 되지는 않음.
- `답변자 제안`은 커뮤니티 우회 방법과 위험을 기록할 뿐, 현재 설정 문법이나 지원 정책으로 자동 승격하지 않음.
- `공식 확인`에는 유지관리자의 명시적 답변, 공식 문서, 수정 기록 또는 확인 가능한 릴리스 노트가 필요하며 자동 중복 제거 봇은 포함하지 않음.
- `로컬 재현`은 이 프로젝트에서 실행하고 증거를 저장한 뒤에만 적을 수 있으며 이 색인에는 로컬 재현이 없음.
- 변동 가능한 사례를 본문에 인용할 때 원 URL, Issue 상태, 보고 버전/플랫폼, 확인일과 “이 프로젝트에서는 미재현” 경계를 남김. `closed`는 페이지 상태이지 수정이나 모든 계정에서의 사용 가능성을 뜻하지 않음.

## 포럼과 라이선스의 경계

Stack Overflow 페이지는 CC BY-SA 4.0으로 표시됩니다. 프로젝트는 사실 요약·문제 구조·링크만 사용하며 긴 원문, 코드, 답변자의 명령을 복사하지 않습니다. GitHub Issue는 공개 사용자 보고의 출처로만 인용하며 작성자·라벨·검색 결과를 OpenAI 공식 확인으로 취급하지 않습니다. Reddit, GitHub Discussions, 현재 환경에서 안정적으로 확인할 수 없는 페이지는 본문 증거에 넣지 않습니다.

**다음 검토:** 원 URL을 다시 방문해 유지관리자 답변, 관련 PR, 수정 버전, 페이지 상태와 현재 범위를 기록합니다. 새 증거가 없으면 `candidate`, `unverified`, `blocked`를 유지하고 `verified`로 올리지 않습니다.
