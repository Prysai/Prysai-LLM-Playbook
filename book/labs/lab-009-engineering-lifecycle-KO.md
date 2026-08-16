<!-- content_id: lab-009-engineering-lifecycle | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-009-engineering-lifecycle
title: "바로 구현하기와 전체 엔지니어링 수명 주기 비교하기"
level: L3
domain: engineering
goal: "작은 비교를 보편적 우위의 증거로 포장하지 않고, 정의·계획·검증·검토·전달이 어느 지점에서 재작업을 줄이는지 측정한다"
setup: "버려도 되는 로컬 저장소, 고정한 저위험 과제 세 개, 기준 리비전, 고정 도구, 운영 또는 외부 부작용 없음"
task: "같은 세 과제를 직접 방식과 수명 주기 방식으로 실행하고, 첫 결과·조건 변화·증거 품질·재작업을 비교한다"
evidence:
  - "두 경로의 baseline revision, 고정 task, 순서, input hash"
  - "첫 result, 통제된 rework, diff, check output, rework count"
failure_variant: "baseline을 복원하지 않거나 build pass를 user acceptance라고 부르고 not comparable 또는 unverified로 표시한다"
reflection: "어떤 phase가 가장 큰 근거 없는 claim이나 rework를 막았으며 어떤 교란 요인이 남는가?"
status: draft
last_verified: "not run"
transfer_task: "같은 baseline으로 작은 documentation 또는 research workflow에 비교를 옮긴다"
transfer_domain: "engineering, research 또는 documentation"
transfer_evidence: "고정 input, 두 run record, diff, check, 비교, 한계를 보관한다"
transfer_limitations: "세 로컬 task는 일반적인 model이나 process 우위를 증명하지 않는다"
---

# Lab 009: 바로 구현하기와 전체 엔지니어링 수명 주기 비교하기

## 학습 목표

명시적인 정의, 계획, 검증, 검토, 전달이 같은 조건의 고정 과제 세 개를 개선하는지라는 좁은 주장을 시험합니다. 이것은 엔지니어링 스모크 테스트이지 모델 순위표가 아닙니다.

## 준비

커밋한 기준 상태가 있는, 버려도 되는 저장소를 만듭니다. 작은 과제 세 개와 수용 검사를 고정합니다. 두 방식에서 환경, 모델, 도구, 권한, 네트워크 조건, 시간 예산을 같게 유지합니다. 모델을 바꾼다면 방식을 고정하고, 방식을 바꾼다면 모델을 고정합니다. 과제마다 기준 상태로 되돌리고, 실행 순서는 미리 정한 뒤 순서 편향을 한계로 기록합니다.

후보 A에는 고정된 목표, 입력, 수용 규칙만 줍니다. 후보 B에는 `define`, `plan`, `build`, `verify`, `review`, `deliver` 단계가 적힌 작업 프로토콜을 줍니다.

## 과제와 실험

다음과 같이 해가 없는 fixture를 사용합니다.

1. 짧은 합성 배송 기록에서 이름이 붙은 항목 세 개를 추출합니다.
2. 완료된 일과 검증하지 못한 일을 구분한 Markdown으로 기록을 정리합니다.
3. “코드가 있고 빌드되므로 기능은 검증됐다”는 근거 없는 주장을 검토합니다.

A를 세 과제에 모두 실행한 뒤 B를 세 과제에 모두 실행합니다. 각 실행에서 통제된 재작업은 한 번까지만 허용합니다. 재작업이 성공하더라도 첫 결과는 보존합니다.

실제 값만 기록합니다.

```yaml
run_id: lab-009-v1-A-extract-01
attempt_id: initial
candidate: A
task_id: extract-01
baseline_revision: actual-revision
input_hash: sha256:actual-hash
surface: actual-surface-and-version
model: actual-model-id
workflow: direct
tool_versions: actual-values
permissions: disposable-local-repository
network: offline
started_at: actual-timestamp
ended_at: actual-timestamp
first_pass: true
rework_count: 0
elapsed: actual-duration
cost_value: actual-value-or-unavailable
cost_basis: actual-basis-or-unavailable
error_category: none
comparability: comparable
validation: command-output-and-exit-code
status: pass
```

모르는 시간이나 비용을 추정하지 말고 `unavailable`로 남깁니다. 재작업 뒤의 통과를 첫 시도 성공으로 바꾸지 않습니다.

## 엔지니어 경험이 없어도 할 수 있는 가장 작은 버전

실제 웹사이트나 복잡한 저장소에서 시작할 필요가 없습니다. 임시 file `status.md`를 만들고 아래 세 줄의 synthetic text만 넣으세요.

```text
build 검사: 종료 코드 0
mobile 검사: 완료
user acceptance: 아직 실행하지 않음
```

A에는 “이 내용을 완료 상태로 정리해 주세요”만 줍니다. B에는 같은 글과 함께 **“`status.md`만 바꿀 수 있다. 모르는 것은 남긴다. 먼저 plan을 적는다. 끝에 세 줄이 남았는지 검사한다. user acceptance를 완료라고 쓰지 않는다”**를 줍니다. 둘 다 network를 사용하지 않고 commit이나 다른 file 변경을 하지 않습니다.

어느 답이 더 멋진지 비교하지 마세요. “아직 실행하지 않음”을 보존했는지, 실제 변경을 설명했는지, 확인할 수 있는 결과를 남겼는지 비교하세요. B가 더 분명해도 이 synthetic text에서 이 protocol을 더 시험할 가치가 있다는 뜻일 뿐, modelㆍteamㆍ실제 project의 효율을 증명하지 않습니다.

## 증거, 실패 사례, 수용 기준

여섯 번의 첫 출력, 별도 시도로 남긴 재작업, 모든 diff, 명령, 종료 코드, 검사 출력, 검토 메모, 전달 요약, 2×3 비교표를 보관합니다. 결론은 `expand`, `do_not_expand`, `insufficient_evidence` 중 하나로 남깁니다.

한 실행에서 시간 초과 기준, 권한 차단, 입력 해시 변경, 도구 버전 변경, 또는 로컬 쓰기 결과 불명을 일으킵니다. 중단한 시도를 보관하고 다시 시도하기 전에 대상을 확인합니다. 고정 조건이 바뀌었다면 비교를 `not_comparable`로 표시합니다. 이후의 성공이 비교 가능성을 소급해 고치지는 않습니다.

- [ ] 두 방식이 같은 고정 과제와 복원한 기준 상태를 사용했다.
- [ ] 여섯 번의 첫 시도와 재작업을 각각 확인할 수 있다.
- [ ] 첫 통과, 시간, 재작업, 오류 분류, 검증에 실제 값만 썼다.
- [ ] 실패 갈래를 하나 이상 대조했거나 `not_comparable`로 정직하게 남겼다.
- [ ] 빌드 성공을 실행, 배포, 사용자 검증이라고 부르지 않았다.
- [ ] 결론이 세 과제 스모크 테스트의 범위를 넘지 않는다.

## 회고와 전이

어느 단계가 중요한 문제를 가장 먼저 잡았나요? 결과를 바꾸지 않고 의식만 늘린 단계는 무엇인가요? 유용했던 점검만 다른 가역적 과제로 옮기고, 왜 비교할 수 있거나 없는지 설명합니다. 작은 과제 세 개로 일반적인 비용·품질·모델 순위를 증명할 수 없으며, 로컬 검사는 배포나 사용자 수용도 증명하지 않습니다.
