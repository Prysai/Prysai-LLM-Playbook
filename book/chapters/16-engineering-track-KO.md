<!-- content_id: chapter-16-engineering-track | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 16장: 엔지니어링 트랙, 아이디어에서 신뢰할 수 있는 소프트웨어까지

**상태:** `candidate`. **실험:** `draft / not_run`. 이 장은 엔지니어링 수명 주기를 가르치며 현장 보고는 로컬 재현이나 모든 버전의 원인 확인이 아닙니다.

## 문제

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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="15-research-track-KO.md">← 이전<br><strong>15장 · 연구 트랙, 질문에서 감사 가능한 지식까지</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-KO.md">다음 장 준비 중 →<br><strong>17장 제공 상태 보기</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
