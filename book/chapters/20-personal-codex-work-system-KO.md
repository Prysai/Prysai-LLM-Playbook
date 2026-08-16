<!-- content_id: chapter-20-personal-codex-work-system | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 20장: 개인 Codex 작업 시스템 만들기

**상태:** `candidate`. **실험:** `draft / not_run`. 이 장은 옮길 수 있는 방법을 제시하며 제품의 memory, 자동 로드, 진입점 동작이 영구적이라고 가정하지 않습니다.

## 문제

많은 사람이 project, goal, 용어, 제약, acceptance를 매번 다시 설명합니다. context가 들쑥날쑥해지고, 결정은 추적되지 않으며, 낡은 command는 재사용되고, 경험은 다음 task로 옮겨지지 않습니다. 더 큰 위험은 개인 편의 기록을 token, password, cookie, customer text, 확인되지 않은 결론 저장소로 쓰는 것입니다.

## 다섯 asset, 다섯 역할

| Asset | 답하는 질문 | Lifecycle | 넣지 않을 것 |
|---|---|---|---|
| Project rules | 이 project가 늘 지켜야 할 것은 무엇인가 | version 관리, 의도적 변경·review | 일시적 추측과 비밀 |
| Task context | 이번에는 무엇을 해야 하는가 | task마다 만들고 archive | 무관한 기록 |
| Current state | 무엇을 읽고, 바꾸고, 검증하고, block했는가 | checkpoint마다 갱신 | 결과처럼 쓰인 plan |
| Template | 비슷한 task를 어떻게 시작·전달하는가 | 반복 뒤 추출 | 검증되지 않은 영구 결론 |
| Reflection | 무엇이 되었고, 실패했고, 다음에 바꿀까 | 옮길 수 있는 교훈만 | token, cookie, customer text, 불필요한 개인 데이터 |

context가 많다고 좋은 것은 아닙니다. relevance, 신뢰성, 민감도, 최신성이 더 중요합니다.

## Skill을 만들까, protocol을 유지할까

| 관찰 | 결정 | 필요한 증거 |
|---|---|---|
| 일회성이거나 input/output이 변하는 중 | task protocol 유지 | 한 task의 input, 제약, 결정, 전달 기록 |
| input, 결정 지점, output이 안정되고 긍정·실패 사례가 있음 | Skill candidate 생성 | 세 번 이상 실행, failure set, transfer task |
| 방법은 유용하지만 trigger나 부작용이 불명확 | 계속 관찰 또는 block | gap 기록, risk, 미완 validation |
| 비밀, 외부 write, 프로덕션 release에 권한·rollback 불명확 | Block | permission matrix, 사람 승인, rollback plan |

한 번의 우연한 성공은 Skill의 근거가 아닙니다. decision ID, 반복 task, candidate asset, 안정 input, failure, evidence, owner, review, action을 기록합니다.

## 최소 개인 패키지

project map, task protocol, state log, evidence index, reflection 다섯 기록으로 시작합니다. 시작 시 rules, branch, state, permission을 검사하고, 실행 중에는 필요한 context만 유지하며, 전달할 때 verified와 미완을 나누고, reflection에서 다른 사람이 이해하고 시험할 수 있는 규칙을 뽑습니다.

전달에는 변경 사항, 실제 실행한 command, result와 exit code, 미검증·범위 밖 항목, risk, recovery, 다음 owner를 적습니다. 개인 습관을 제품 보장으로 바꾸지 말고 현재 공식 문서와 허가된 surface를 확인합니다.

## 연습과 경계

임시 복사본에서 고치지 않은 mobile overflow, user acceptance 없는 build success, version/entry/log 없는 authentication failure, audience/source 없는 copy update를 분류합니다. task/input만 주는 A와 다섯 기록을 쓰는 B를 비교합니다. 같은 input과 baseline을 복원해 각 두 번 실행하고 hash, `run_id`, clarification, 실제 변경, validation, 여섯 evidence, rework, unverified, status를 보관합니다.

낡은 command와 directory를 fixture로 넣어 stale로 표시하고 재사용을 멈춥니다. 네 log가 완전하고 비밀·외부 부작용이 없으며 acceptance를 review해야 실험이 통과합니다. 그래도 Skill이나 실제 memory 동작을 검증하지는 않습니다.

## 개인 습관을 확인 가능한 인계로 바꾸기

개인 작업 시스템은 모든 것을 적어 두는 곳이 아닙니다. 다음 task를 시작할 때 짧은 시간 안에 세 가지를 답하게 해야 합니다. 무엇을 deliver해야 하는가? 어떤 사실을 실제로 확인했는가? 어디서 사람에게 물어보기 위해 멈춰야 하는가? 이 질문에 도움이 안 되는 record라면 더 쌓지 말고 줄입니다.

```yaml
handoff_id: personal-system-20-example
goal: "네 개의 문제 보고를 안전하게 다음 단계로 보낼 수 있는지 판단"
read: ["project rules", "task input", "current state"]
changed: []
verified: ["input hash", "current branch", "external write 없음"]
not_verified: ["실제 sign-in entry", "build에 대한 user acceptance"]
blocked_by: ["version, entry, error log 누락"]
next_owner_action: "누락 input을 채운 뒤 다시 분류"
recovery: "temporary record를 지우고 clean copy 복원"
```

`verified`에는 실제로 확인한 것만 씁니다. plan, 예측, “전에 됐음”은 `not_verified`나 `blocked_by`에 둡니다. 그러면 다음 사람이 handoff를 완료 보고로 오해하지 않습니다.

## 10분으로 시작하기: 다음 task를 위한 한 장의 카드

처음부터 복잡한 “세컨드 브레인”을 만들 필요는 없습니다. model에게 문서를 고치거나 자료를 정리하거나 code를 검토해 달라고 하기 전에 이 카드를 3분 동안 쓰고, 끝난 뒤 2분 동안 보완하세요. 긴 chat 기록보다 검토하고 인계하기 쉽습니다.

```text
목표: 어떤 구체적인 결과가 필요한가?
input: 어떤 file, 글, link를 사용해도 되는가?
경계: 무엇을 바꾸면 안 되며, 어떤 행동은 먼저 사람에게 물어야 하는가?
통과 기준: 어떤 file, test, page, record로 확인할 것인가?
결과: 실제로 무엇을 바꾸었고, 어떤 command를 실행했으며, 어떤 증거가 부족한가?
다음: 누가 어떤 조건에서 이어서 하는가?
```

“README를 개선해 주세요”는 아직 인계 가능한 task가 아닙니다. “`README.md`의 첫 세 단락만 고친다. license, link, 사실 주장은 바꾸지 않는다. local link를 검사하고, 확인하지 못한 제품 사실은 보류로 남긴다”로 바꾸세요. 그러면 model이 해도 되는 일과 안 되는 일, 마지막에 남겨야 하는 것을 누구나 알 수 있습니다. model의 제안은 먼저 “확인 필요”에 두고 “결과”에 바로 넣지 않습니다.

## 작은 실험 추가: 오래된 정보를 먼저 찾기

A/B 실행 전에 실행하지 않은 오래된 command 하나와 존재하지 않는 directory 하나를 `project-map`에 넣습니다. source, 마지막 확인 날짜, 현재 상태, 안전한 확인 방법을 쓰게 합니다. 올바른 행동은 “다시 실행”이 아닙니다. 허용 범위에서 current state를 읽고 `stale`로 표시하며 불확실성을 남깁니다.

1. 현재 상태를 확인할 수 없으면 `blocked`로 두고 command가 아직 유효하다고 추정하지 않습니다.
2. directory가 있어도 목적이 불명확하면 관찰만 기록하고 write target으로 삼지 않습니다.
3. account, network, external write가 필요하면 멈추고 명확한 authorization을 요청합니다.
4. reflection에는 “시작 전에 source와 날짜를 확인” 같은 옮길 수 있는 규칙만 남기며 낡은 command를 영구 template로 만들지 않습니다.

## 스스로 확인하기

- [ ] 처음 읽는 사람도 구두 설명 없이 goal, evidence, block을 찾을 수 있다.
- [ ] 어떤 record가 `stale`인지와 현재 사실로 돌아갈 최소 행동을 설명할 수 있다.
- [ ] 개인 노트를 비밀 보관소, 제품 memory 보장, verified Skill로 취급하지 않았다.
- [ ] input 부족, 실행 가능, 사람 확인 필요 상태를 구분했다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-KO.md">← 이전<br><strong>19장 · 모델과 워크플로 평가하기, 인상에서 증거로</strong></a></td><td align="right"><a data-chapter-nav="next" href="21-team-capability-system-KO.md">다음 →<br><strong>21장 · 팀 역량 시스템 만들기</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
