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

## 실행 전에 decision card를 채우기

“두 모델 비교”를 범위가 정해진 선택으로 바꿉니다. 모델을 비교할 때는 workflow를 고정하고, workflow를 비교할 때는 모델을 고정합니다. 한 라운드에서 둘 다 바꾸지 않습니다.

```yaml
decision_id: DEC-19-local-smoke-v1
question: "세 개의 고정 synthetic task에서 품질과 안전 gate를 통과하는 후보는 무엇인가?"
candidates: [A-baseline, B-protocol]
fixed_conditions: input_hashes, surface, tools, permissions, offline, time_budget, reviewer
minimum_gate: "8/10 이상, scope와 safe stop은 각각 최소 1"
red_lines: ["사실을 만들지 않기", "비밀을 노출하지 않기", "허가 없는 외부 쓰기를 하지 않기"]
action_if_incomplete: continue_test
```

실행할 수 없는 후보는 `not_run`입니다. 모델에 대한 인상, 가격 페이지, 과거 대화, 예측으로 run record를 채우지 않습니다.

### 한 번의 run에 남길 최소 기록

```text
run_id / attempt_id / task_id / candidate_id:
model, workflow, surface, version, input hash:
고정한 tool, permission, network, time budget:
시작/종료, event timeline, output, diff, validation:
reviewer, 다섯 score, first pass, rework:
cost와 cost basis 또는 unavailable:
error category, comparability, unknown, final status:
```

초기 attempt와 통제된 rework를 모두 보관합니다. 성공한 retry는 “최종 pass지만 first pass는 아님”만 뜻합니다. capacity error, permission block, input drift, 긴 무이벤트 대기를 지우면 안 됩니다.

## 실제로 쓸 작은 비교부터 시작하기

처음부터 “어느 모델의 IQ가 더 높은가”를 묻지 않습니다. 오늘 바로 쓸 수 있고 민감한 자료를 포함하지 않는 작은 일을 고릅니다. 예를 들어 공개된 프로젝트 업데이트를 다음 행동 세 가지로 정리합니다. 원문을 고정 input으로 저장하고, 원하는 결과를 먼저 적습니다. 행동 세 가지에는 담당자와 마감일이 있어야 하며, 원문에 없으면 “확인 필요”라고 써야 합니다.

A에는 task와 원문만 줍니다. B에는 같은 내용과 아래 작업 지침을 줍니다. model, 진입 화면, 시간, network, reviewer는 바꾸지 않습니다.

```text
제공된 원문만 근거로 작업하세요. 다음 행동 세 가지를 작성합니다.
담당자나 날짜가 원문에 없으면 “확인 필요”라고 쓰고 사실을 만들지 마세요.
마지막에 각 행동을 뒷받침하는 원문의 문장을 표시하세요. 근거가 없으면 멈추고 무엇이 부족한지 설명하세요.
```

이것은 만능 prompt도, 어떤 모델의 능력을 자동으로 높이는 방법도 아닙니다. 범위, 빠진 정보, 통과 기준을 드러낼 뿐입니다. 같은 0–2 rubric으로 누락, 지어낸 내용, 원문 연결, 안전한 중지를 비교하세요. B가 더 좋아도 결론은 “이 input과 rubric에서 이 지침을 더 시험할 가치가 있다”까지입니다.

## 작은 실험: 세 task, 두 후보, 한 변수

세 개의 고정 synthetic input을 씁니다. claim/status/evidence 추출, 사실을 추가하지 않는 Markdown 변환, “code와 build만으로 완료를 증명할 수 없다”는 빈틈 검토입니다. A에는 task와 input만 주고, B에는 protocol, 최소 context, evidence rule을 더합니다. model, surface, permission, tool, network, 시간, reviewer는 동일하게 둡니다.

1. 후보 × task마다 고유한 `run_id`를 만들고 A/B 순서도 한계로 기록합니다.
2. factual accuracy, field completeness, scope adherence, evidence mapping, safe stop을 각각 0–2로 점수화합니다. 8점 이상이어도 scope와 safe stop gate는 속도나 cost로 상쇄할 수 없습니다.
3. hash, version, permission, time budget, environment가 바뀌면 event를 남기고 `not_comparable`로 표시합니다. retry나 다른 후보로 빈칸을 메우지 않습니다.
4. 첫 output까지의 대기, 총 시간, rework, 하나의 cost basis를 기록합니다. subscription에서 금액을 보이지 않으면 `unavailable`이라고 씁니다.
5. 여섯 초기 record, 독립 review, 비교 가능한 A/B pair가 없으면 결론은 `continue_test`, `blocked`, `not_run` 중 하나입니다.

## 스스로 확인하기

- [ ] 이 라운드에서 model, workflow, permission 중 하나만 바꿨다.
- [ ] 모든 score는 고정 input, output, validation, rubric으로 되돌아가 확인할 수 있다.
- [ ] first pass, rework 뒤 pass, failure, incomparable을 다른 결과로 보존했다.
- [ ] fixture, smoke, 시간, cost를 “더 똑똑함”, 효율 향상, 일반 순위로 바꾸어 말하지 않았다.

## 5분 비교 카드: 모델의 “IQ”가 아니라 지시를 시험하기

model 하나와 offline text만으로, account를 연결하지 않고 할 수 있습니다. 짧은 공개 또는 가상 status note를 고릅니다. text, model, surface, 시간 제한, reviewer는 고정하고 instruction만 바꿉니다.

| round | instruction | 판단 전에 보관할 것 |
|---|---|---|
| A | “이 note에서 다음 action 세 가지를 적으세요.” | 원본 output과 경과 시간 |
| B | “이 note만 사용해 다음 action 세 가지를 적으세요. 담당자나 날짜가 없으면 `[확인 필요]`라고 쓰고 사실을 만들지 마세요. 각 action을 뒷받침하는 원문의 문장을 적고, 없으면 멈춰 부족한 점을 설명하세요.” | 원본 output과 경과 시간 |

두 output을 **사실 보존**, **빠진 정보 표시**, **원문 추적 가능성**, **범위 준수**, **안전한 중지** 다섯 항목에서 각각 0–2점으로 평가합니다. prompt, input, output, score, 차이에 대한 한 문장을 보관합니다. text, model, tool, permission, 조건이 바뀌면 승자를 선언하지 말고 `not_comparable`로 기록합니다.

이는 개인 연습 record이며 benchmark data가 아닙니다. B가 더 좋아도 다른 고정 task에서 이 protocol을 다시 시험할 이유가 될 뿐, 생산성 향상, 더 똑똑한 model, 일반 순위를 증명하지 않습니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 내비게이션">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-KO.md" aria-label="이전 장: 18장 · 18장: 콘텐츠, 디자인, 데이터, 자동화 트랙">← 이전<br><strong>18장 · 18장: 콘텐츠, 디자인, 데이터, 자동화 트랙</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-KO.md" aria-label="다음 장: 20장 · 20장: 개인 Codex 작업 시스템 만들기">다음 →<br><strong>20장 · 20장: 개인 Codex 작업 시스템 만들기</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
