<!-- content_id: chapter-12-agent-loop-and-stop | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 12장: Agent 루프, 상태, 중지 조건

**상태:** `candidate`. **실험:** `not_run`. 이 장은 관찰 가능한 루프를 설명하며 특정 호스트, 모델, 도구의 동작을 증명하지 않습니다.

## 이 장이 해결하는 문제

“Agent에게 맡기자”는 한 번의 행동처럼 들립니다. 실제로는 모델 제안, 호스트 판단, 도구의 실행 또는 거부, 관찰, 상태 갱신, 검증, 계속할지 멈출지의 판단이 이어집니다. 자신감 있는 최종 문장은 이 사건들을 대신하지 못합니다.

> 모델 출력은 제안입니다. 도구 결과는 관찰입니다. 검증된 전달에는 대상 환경의 증거가 필요합니다.

## 관찰 가능한 루프

```text
작업 계약 → 상태 읽기 → 모델 제안 → 호스트 승인
→ 도구 실행 → 관찰 → 상태 갱신 → 수용 확인
                                  ↓
                    전달 / 질문 / 복구 / 중지
```

| 계층 | 증명할 수 있는 것 | 그것만으로 증명할 수 없는 것 |
|---|---|---|
| 제안 | 모델이 다음 행동을 제안함 | 승인, 실행, 정확성 |
| 호스트 판단 | 허용, 거부, 보류가 있었음 | 의도한 결과가 생김 |
| 도구 효과 | 시작, 종료, 오류, diff | 변경이 사용자의 의미를 충족함 |
| 검증 | 특정 규칙을 검사함 | 검사 범위 밖 주장 |

“파일을 고치고 테스트하겠다”와 “완료” 사이에 승인, 명령, 종료 상태, diff, 테스트 범위가 없으면 `unverified`입니다. 막연히 환각이라 부르기 전에 첫 번째로 뒷받침되지 않는 전환을 기록하세요.

## 상태를 적어 두기

짧은 checkpoint가 중단 후 안전한 재개를 만듭니다.

```yaml
task: "일회용 입력 파일의 비어 있지 않은 줄 정렬"
scope:
  read: ["sandbox/input.txt"]
  write: ["sandbox/output.txt", "sandbox/evidence/"]
completed: ["경로 확인", "작업 계약 읽음"]
state: blocked_input
last_observation: "sandbox/input.txt가 없음"
verification: not_run
retry: {used: 0, allowed: 1}
next_safe_action: "입력 파일 요청"
```

유용한 상태 이름은 `ready`, `proposed`, `awaiting_approval`, `running`, `feedback_received`, `blocked_input`, `paused`, `unknown`, `verified`, `stopped`입니다. 최종 답변이 있다고 해서 알 수 없는 상태가 `verified`가 되지는 않습니다.

의도가 아니라 사건을 기록하세요. 제안, 승인, 실행 시작과 종료, 효과, 검증, 전달입니다. 관찰하지 못한 값은 `not_observed`로 남기며 모델이 하겠다고 한 말로 채우지 않습니다.

## 재시도는 제한된 판단

재시도 전에 실패를 분류합니다. 입력 누락, 범위·권한 충돌, 해석 오류, 도구·환경 오류, 모호한 검증, 조건 변화입니다. 같은 조건에서 같은 행동을 반복하는 것은 보통 진단이 아닙니다.

시도 횟수, 시간, 변경 가능한 범위, 외부 부작용, 비용, 불확실성 예산을 정합니다. 응답을 잃었다면 쓰기를 반복하기 전에 대상을 읽고 사후 조건을 비교하세요. 쓰기는 이미 성공했을 수 있습니다.

| 행동 종류 | 불확실한 결과 뒤 첫 조치 |
|---|---|
| 읽기 전용 | 허용된 읽기 범위에서 다시 확인 |
| 멱등 | 상태와 사후 조건 읽기 |
| 보상 가능 | 효과 확인 후 제한된 보상 준비 |
| 비멱등 | 멈추고 대조한 뒤 재시도 |

## 연습과 경계

일회용 디렉터리에서 원본 문서를 바꾸지 않고 존재하지 않는 파일을 가리키는 링크를 보고하도록 Agent에게 요청하세요. 읽기·쓰기 루트, 누락 링크의 정의, check, 읽기 전용 재시도 두 번, 잘못된 루트 같은 의도적 실패를 정합니다. 제안, 보고서, check를 따로 검토하세요.

각 전환을 설명하고 증거와 함께 `verified`, `partial`, `blocked`, `unverified` 중 하나로 전달할 수 있으면 연습은 성공입니다. 독립적인 실행 기록이 남기 전까지 이 장은 `candidate / not_run`입니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="11-designing-a-skill-KO.md">← 이전<br><strong>11장 · 제 몫을 하는 Skill 설계하기</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-KO.md">다음 장 준비 중 →<br><strong>13장 제공 상태 보기</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
