<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 19장: 모델과 워크플로 평가하기, 인상에서 증거로

**상태:** `candidate`. **실험:** `draft / not_run`. 평가 fixture에는 모델 실행 로그가 없습니다. 이 장은 어떤 모델이 더 낫다는 증명이 아닙니다.

## 문제

“이 모델은 더 똑똑하다”, “이 Skill은 믿을 만하다”, “작업이 빨리 끝났다”는 관찰일 수 있지만 선택의 근거는 아닙니다. model, prompt, context, tool, permission, 난이도, 사람 review가 결과를 바꿉니다. 조건 하나가 바뀌면 비교는 원래 질문에 답하지 않을 수 있습니다.

> 평가 단위는 보기 좋은 답변이 아닙니다. 고정 입력, 관찰 가능한 행동, 수용 규칙, 증거 묶음, 선언한 범위입니다.

## 결정 대상을 나누기

| 대상 | 질문 | 최소 증거 |
|---|---|---|
| 기본 모델 | 고정 task set에서 quality/safety gate를 통과하는 후보는 무엇인가 | 고정 task, 반복, 채점, error 분류 |
| Skill | 같은 입력에서 omission이나 rework를 줄이는가 | baseline/candidate 차이와 trigger 기록 |
| Workflow | 계획과 검증이 추가 cost를 정당화하는가 | stage log, diff, validation, rework |
| Permission | 새 action space가 측정 가능하고 허가된 이익을 내는가 | permission 표, side effect, recovery cost |

실행 전에 decision card를 만듭니다. 범위 있는 질문, owner, 실제 candidate, task version, 최소 품질, red line —비밀 노출 없음, 무허가 외부 쓰기 없음, 증거 날조 없음—, cost 상한, log 위치, action, 범위, unknown, 다음 review입니다. 실행할 수 없는 후보는 추정이 아니라 `not_run`입니다.

## 조건 고정하기

재사용 task set에는 정상, 입력 누락·충돌, 실패, transfer, 사람 판단 task를 넣습니다. 각 task는 ID, version, input, 허용 행동, 기대 증거, 금지 행동, pass 규칙을 가집니다.

task text, redacted input, context, model ID, surface, tool, network, permission, time budget, 반복, format, rubric, reviewer, hash, recovery를 고정합니다. 후보가 못한다고 task를 지우지 말고 새 version과 이유를 남깁니다. 조건이 변하면 새 decision을 만들거나 `not_comparable`로 표시합니다.

각 attempt에는 `run_id`, `attempt_id`, candidate, task, surface, model, workflow, 시간, input hash, permission, tool version, timeline, diff, validation, reviewer, first pass, rework, cost와 cost basis, error category, comparability, status가 필요합니다. 성공한 retry가 초기 attempt를 덮어쓰면 안 됩니다.

## 연습: 세 task smoke 비교

임시 복사본에서 세 고정 synthetic input을 사용합니다. claim/status/evidence 추출, 사실을 바꾸지 않는 Markdown 변환, code와 build만으로 완료를 주장할 수 없는 이유 검토입니다. task와 input만 주는 A와 protocol, 최소 context, evidence rule을 더한 B를 비교합니다. surface, tool, permission, network, 시간, reviewer는 같게 두고 한 변수만 바꿉니다.

사실 정확성, field 완전성, scope 준수, evidence 대응, 안전 중지를 각각 0–2로 채점합니다. pass는 8/10 이상이며 scope와 안전 중지는 각각 1 이상입니다. hash, permission, tool version, capacity, 조건이 바뀌면 timeline을 보존해 `not_comparable`로 하고 retry나 다른 후보 결과로 채우지 않습니다.

여섯 run record가 불완전하면 `continue_test`, `blocked`, `not_run`만 정직한 행동입니다. smoke 통과도 “확대해 볼 가치”만 뜻하며 “최고 모델”이나 “생산성 향상”을 증명하지 않습니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-KO.md">← 이전<br><strong>18장 · 콘텐츠, 디자인, 데이터, 자동화 트랙</strong></a></td><td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-KO.md">다음 →<br><strong>20장 · Codex 개인 작업 시스템 만들기</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
