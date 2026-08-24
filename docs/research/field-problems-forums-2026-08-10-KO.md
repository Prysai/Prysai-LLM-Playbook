<!-- content_id: field-problems-forums-2026-08-10 | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: field-problems-forums-2026-08-10.md | source_revision: 2026-08-23 -->

# Codex / AI 코딩 에이전트의 실제 작업 환경 문제: 포럼 및 공개 Issue 조사

**조사일:** 2026-08-10  
**상태:** `candidate` (출처를 확인하고 요약했지만 로컬 재현은 하지 않았으며, 포럼의 제안을 공식 결론으로 올리지 않음)  
**범위:** Codex/AI 코딩 에이전트의 권한, Windows, VS Code, sandbox 네트워크, 디렉터리 접근.  
**실행 경계:** Stack Exchange API, Stack Overflow 링크, 공개 `openai/codex` Issue를 읽기 전용으로 확인했다. 게시물의 명령은 실행하지 않았고, 비밀을 읽거나 commit/push하지 않았다.

## 이 기록을 읽는 법

- **사용자 보고:** 작성자가 설명한 환경, 증상 또는 재현 과정.
- **답변자 제안:** 커뮤니티 workaround이며 제품 보장이 아님.
- **공식 확인:** 공식 문서, 유지관리자의 명시적 답변, 공식 코드 또는 릴리스 기록. 일반 Issue 작성자는 공식 확인이 아님.
- **로컬 재현:** 이번 조사에서는 수행하지 않음.
- **추측:** 작성자나 답변자가 제시한 원인 판단이며 확정 사실로 다루지 않음.

출처의 시간 표시는 각 사이트의 값이다. 이 파일은 2026-08-10에 출처에 접근할 수 있었다고만 말하며, 그 표시를 로컬에서 검증한 연표로 바꾸지 않는다.

## 가르칠 수 있는 사례

### 1. sandbox 안에서 네트워크 allowlist가 GitHub를 차단

- **출처:** [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox)
- **증상:** `sandbox_mode = "workspace-write"`인 Codex CLI에서 `curl -I https://github.com`이 `blocked-by-allowlist`와 비슷한 proxy 오류로 실패.
- **경계:** 사용자 보고, 답변, 추측뿐이며 로컬 재현이나 공식 확인은 없음.
- **안전한 확인:** sandbox의 네트워크 차단, proxy allowlist, DNS/TLS, 기업 방화벽을 분리한다. URL, HTTP 상태, proxy 오류와 실제 권한을 기록하고 필요한 도메인만 비밀 없이 확인한다.
- **주장하지 말 것:** `workspace-write`에 인터넷이 포함된다고 말하지 않는다. 네트워크를 켜면 모든 CLI가 연결된다고도, 답변의 설정이 현재 공식 문법이라고도 말하지 않는다. 승인을 피하려고 `full access`를 선택하지 않는다.

### 2. Windows에서 Codex CLI의 네이티브 지원 여부가 불명확

- **출처:** [Stack Overflow #79887792](https://stackoverflow.com/questions/79887792/openai-codex-cli-isnt-available-on-windows-yet-is-there-any-other-way-i-can-hav)
- **증상:** Windows 11, PowerShell/Command Prompt, WSL2 환경에서 공식 문서가 지원 부재와 문서 부족을 구분해 주지 않음.
- **경계:** WSL2와 네이티브 Windows를 두고 커뮤니티 조언이 엇갈리며, 공식 확인과 재현이 없음.
- **안전한 확인:** 버전, 설치 출처, `where`/PATH 해석 결과, shell, WSL 배포판, 프로젝트 파일 시스템을 기록하고 버전 확인과 읽기 전용 탐색부터 시작한다.
- **주장하지 말 것:** 게시물만으로 네이티브 지원 또는 미지원, WSL2와 Windows의 동작 동등성을 단정하지 않는다.

### 3. VS Code 확장은 `spawn UNKNOWN`이지만 CLI는 수동 실행 가능

- **출처:** [Stack Overflow #79923404](https://stackoverflow.com/questions/79923404/vs-code-codex-extension-fails-with-spawn-unknown-on-windows-even-though-codex)
- **증상:** 기업 관리 Windows, 안정판 VS Code, PowerShell Constrained Language Mode에서 CLI는 실행되지만 extension host가 `spawn UNKNOWN`으로 실패.
- **안전한 확인:** VS Code·확장·CLI 버전, `where.exe` 결과, extension host 로그, shell 정책, `.exe`/`.cmd` shim을 나누어 기록한다. “CLI가 실행됨”과 “확장이 spawn할 수 있음”은 별도 수용 조건이다.
- **주장하지 말 것:** PATH가 정상이라고 확장이 사용 가능하다고 보지 않는다. 원인을 PATH 하나로 단정하거나 기업 정책 우회를 권하지 않는다.

### 4. `approval_policy = "on-failure"`인데도 파일마다 승인 요청

- **출처:** [Stack Overflow #79891423](https://stackoverflow.com/questions/79891423/how-to-stop-codex-from-always-asking-for-approval)
- **증상과 경계:** VS Code, Windows/WSL, 신뢰된 workspace에서 파일을 바꿀 때마다 승인을 요구한다. 채택 답변은 다른 버전과 환경에서 작성되었다.
- **안전한 확인:** “승인을 묻는가”와 “sandbox가 허용하는가”를 분리하고, 실제 설정 위치·session·workspace·writable roots를 확인한 뒤 작고 되돌릴 수 있는 변경을 시험한다.
- **주장하지 말 것:** `never`가 전체 접근 권한이라는 뜻도, `workspace-write`가 모든 파일을 허용한다는 뜻도 아니다.

### 5. Windows Terminal에서 Codex 화면에 깨진 기호가 표시

- **출처:** [Stack Overflow #79880150](https://stackoverflow.com/questions/79880150/gibberish-symbols-in-codex-under-windows-cmd-in-windows-terminal)
- **증상:** 이상한 기호가 나타났다가 창 크기를 바꾸면 잠시 사라짐.
- **안전한 확인:** 터미널, shell, 글꼴, 창 크기, 코드 페이지, 버전을 기록하고 새 창·재렌더링·다른 터미널·텍스트 출력으로 비교한다.
- **주장하지 말 것:** `chcp 65001`이 항상 해결하거나 반드시 UTF-8 문제라고 단정하지 않는다. resize를 영구 workaround로 취급하지 않는다.

### 6. sandbox로 비공개 디렉터리 읽기를 막으려는 시도

- **출처:** [Stack Overflow #79959031](https://stackoverflow.com/questions/79959031/how-to-prevent-codex-cli-from-reading-certain-files-or-directories-via-sandbox)
- **증상:** Linux의 `~/private` 예시에서 prompt 준수가 아니라 커널 수준의 읽기 경계를 원함.
- **안전한 확인:** OS 권한으로 격리하고 비공개 데이터를 workspace 밖으로 옮긴다. 민감하지 않은 파일로 profile, 절대 경로, cwd, writable roots, helper를 확인한다.
- **주장하지 말 것:** 모든 플랫폼에서 같은 deny 규칙이 통하거나 모든 외부 전송을 막는다고 말하지 않는다. 모델이 “읽을 수 없다”고 한 말은 커널 증거가 아니다.

### 7. Maven 의존성 다운로드 실패

- **출처:** [Stack Overflow #79636395](https://stackoverflow.com/questions/79636395/codex-unable-to-access-java-maven-repository)
- **증상:** Java/Spring Boot의 `./mvnw clean test`에서 `Network is unreachable`가 발생한 뒤 의존성 버전 오류가 연쇄적으로 나타남.
- **안전한 확인:** 네트워크 불가와 POM/버전 오류를 분리하고 Maven settings, proxy, 대상 도메인, 캐시 적중을 기록한다. 조직이 승인한 proxy나 준비된 의존성 캐시를 우선한다.
- **주장하지 말 것:** 모르는 공개 proxy를 권하거나 OpenAI에 연결되면 Maven Central, GitHub 등 모든 도메인에 연결된다고 추론하지 않는다.

### 8. Windows Computer Use가 창을 열거하지 못함

- **출처:** [openai/codex Issue #37306](https://github.com/openai/codex/issues/37306)
- **증상과 경계:** `EnumWindows failed`가 발생하고 창 열거 호출이 실패한다. 공개 bug 라벨은 유지관리자 확인이 아니다.
- **안전한 확인:** 일반 앱부터 열거되는지 확인한 뒤 창 API, helper 경로/설치, 권한/활성 데스크톱을 분리해 기록한다.
- **주장하지 말 것:** Windows Computer Use 전체의 사용 가능 여부를 일반화하지 않는다. helper가 시작된 것만으로 제어 경로가 검증됐다고 하지 않는다.

### 9. Windows Desktop 작업 중 콘솔 창이 잠깐 깜박임

- **출처:** [openai/codex Issue #37153](https://github.com/openai/codex/issues/37153)
- **증상:** 전면 command-prompt/console 창과 `conhost.exe` 자식 프로세스가 잠시 나타나 승인되지 않은 활동처럼 보임.
- **안전한 확인:** 부모·자식 프로세스, 경로, 서명, 시각, 버전을 기록하고 유휴 상태와 작업 중 상태를 비교한다. 필요하면 소스와 비밀을 제외한 최소 피드백만 제출한다.
- **주장하지 말 것:** 한 번의 깜박임을 데이터 유출이나 악성 코드로 단정하지 않는다. alpha 버전의 행동을 모든 Desktop 버전에 일반화하지 않는다.

### 10. writable root와 cwd의 권한 안내가 어긋날 가능성

- **출처:** [openai/codex Issue #37655](https://github.com/openai/codex/issues/37655)
- **증상:** 생성된 설명은 cwd를 수정할 수 있다고 하지만 실제 `apply_patch`는 승인을 요구하고 다른 root만 writable임.
- **안전한 확인:** 안내 문구보다 실제 거부·승인 결과를 기준으로 cwd, roots, effective profile, 생성된 prompt와 대상 경로를 기록한다. cwd 안, 허용된 root 안, 그 밖의 세 위치를 시험한다.
- **주장하지 말 것:** 권한 설명이 OS enforcement의 증거라고 보지 않는다. `workspace-write`만으로 cwd가 쓰기 가능하다고, 버전의 코드와 테스트를 보지 않고 수정됐다고 말하지 않는다.

## 공통 최소 진단 카드

1. 모델 prompt, 승인 정책, sandbox enforcement, OS 권한, 네트워크 proxy, 대상 도구를 서로 분리한다.
2. 버전, 플랫폼, 설치 출처, shell/터미널, cwd, 실제 설정, 정확한 오류, 프로세스 트리와 실패 URL을 수집한다.
3. 비밀 없이 되돌릴 수 있는 한 파일 또는 한 도메인 시험을 한다. 게시물의 설치 스크립트, proxy, 권한 확대 명령을 그대로 실행하지 않는다.
4. 실제 적용된 설정을 확인한다. 편집한 파일이 실행 중인 session·확장·앱의 설정과 다를 수 있다.
5. 시작, 읽기, 쓰기, 네트워크, VS Code 통합, Computer Use 제어를 각각 수용한다.

## 출처·라이선스·사용 경계

Stack Overflow는 CC BY-SA 4.0으로 표시된다. 이 파일은 사실을 요약하고 링크만 남기며 긴 원문, 코드 또는 답변자의 명령을 복사하지 않는다. GitHub Issue는 공개 사용자 보고로만 인용하며 OpenAI의 공식 확인으로 취급하지 않는다. 외부 이미지·코드·Skill 지침은 복사하지 않았으므로 새 자산 등록은 필요하지 않다.

## 막힌 항목과 확인하지 못한 내용

- 공식 Codex URL은 이번 확인에서 redirect되었고 최종 본문을 안정적으로 가져오지 못했으므로 공식 의미를 확인된 사실로 쓰지 않는다.
- GitHub REST API는 익명 rate limit에 도달해 상세 Issue와 댓글을 더 가져오지 못했다. 접근 가능한 페이지·검색 결과·Issue 요약만 사용했다.
- Reddit, GitHub Discussions, 안정적으로 인용할 수 없었던 페이지는 포함하지 않았다.
- 포럼의 문제는 로컬에서 재현하지 않았다. 모두 미검증 상태다.
- 포럼 내용, 버전, 설정 문법과 지원 범위는 변할 수 있다. 공개 전에 원 URL, 1차 출처, 확인일과 버전 범위를 다시 확인한다.
