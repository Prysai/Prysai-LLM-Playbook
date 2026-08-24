<!-- content_id: lab-004-skill-selection | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-004-skill-selection
title: "가장 작은 유효 역량 고르기"
level: L4
domain: general
goal: "작업 적합성, 위험, 라이선스, 검증 비용으로 Skill 또는 도구를 선택한다"
setup: "저위험 로컬 작업 하나와 revision이 고정된 역량 후보"
task: "설치나 인증 없이 프로토콜만, 프로토콜과 Skill, 프로토콜과 Skill과 도구를 비교한다"
evidence:
  - "작업 적합성, 의존성, 권한, 검증 비용이 있는 세 접근 기록"
  - "후보별 source, revision, license, nested asset, rollback 메모"
  - "recommendation-only 결정 하나와 blocked 결정 하나"
failure_variant: "license 또는 rollback이 불명확한 보이는 후보를 고르고 단순 작업에 무관한 역량을 추가한다"
reflection: "어떤 역량이 자리를 얻었는가? 어떤 의존성이 가장 큰 유지 비용을 만들었는가? 무엇을 뺄 수 있는가?"
status: draft
last_verified: "Not run"
transfer_task: "저위험 research 또는 content task에서 비교를 반복한다"
transfer_domain: "research, engineering, marketing, or documentation"
transfer_evidence: "작업 공백(task gap), 비교표, 도입 기록(adoption record), 검토자 의견(reviewer comment)을 보존한다"
transfer_limitations: "recommendation-only 비교는 설치, runtime behavior, 장기 유지 가치를 증명하지 않는다"
---

# Lab 004: 가장 작은 유효 역량 고르기

## 학습 목표

인기, 개수, 설치 편의가 아니라 특정 작업의 빈틈을 메우기 때문에 역량을 고릅니다.

## 준비

저위험 로컬 작업 하나를 정하고 다음 세 접근을 비교합니다.

1. 작성한 작업 프로토콜만 사용한다.
2. 프로토콜과 관련 Skill 하나를 사용한다.
3. 프로토콜, Skill, 외부 도구 또는 connector 하나를 사용한다.

후보 revision을 고정합니다. source, license, dependency, 예정된 설치 범위, permission, side effect,
owner, review date, rollback을 기록합니다. 뒤의 작업이 명시적으로 허가하기 전에는 설치하거나
인증하지 마세요.

## 결정 기록

후보마다 짧은 adoption record를 만듭니다.

```text
task_gap:
trigger / non_trigger:
source / revision:
license / notice / nested_assets:
dependencies / permissions / side_effects:
isolated_trial:
rollback / recovery_check:
positive / boundary / failure / transfer tests:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unknowns / unblock_conditions:
```

이 Lab의 기본 결정은 `recommendation-only` 또는 `blocked`입니다. 발견, 설치, 로드, 호출, 행동 효과,
검증된 결과는 다른 상태입니다. 따로 기록하세요.

## 실패 사례

폴더는 있지만 license, nested asset, 고정 revision, rollback 절차가 분명하지 않은 후보를 고릅니다.
올바른 결정은 `blocked`입니다. 찾을 수 있다는 것은 쓸 권한이 있다는 뜻이 아닙니다. 설치되었다고
행동이 검증된 것도 아닙니다.

그다음 단순 텍스트 작업에 무관한 역량을 여러 개 더합니다. permission, dependency, verification cost가
작업에 주는 구체적 가치보다 큰 역량은 거부하세요.

## 수용 체크리스트

- [ ] 후보를 비교하기 전에 작업 공백(task gap)을 적었다.
- [ ] 적어도 한 후보를 구체적인 이유로 거부했다.
- [ ] license와 nested asset의 불확실성이 보인다.
- [ ] permission과 외부 side effect가 작업에 필요한 범위를 넘지 않는다.
- [ ] 설치와 행동을 같은 상태로 취급하지 않는다.
- [ ] maintainer가 chat history 없이 rollback 설명을 따를 수 있다.

## 보존할 증거

수정하지 않은 task input, 세 접근 기록, 후보 revision identifier, license note, 결정표, reviewer comment를
보존합니다. 이 Lab은 어떤 외부 Skill이 설치되었거나 안정적으로 작동한다는 증거가 아닙니다.

## 회고와 전이

research 또는 content task에서 비교를 반복하세요. 어느 새 dependency가 가장 큰 유지 비용을 만들었나요?
최종 증거의 질을 낮추지 않고 무엇을 제거할 수 있나요?

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-003-evidence-review-KO.md" aria-label="이전 Lab: Lab 003 · 완료 주장 감사하기">← 이전 Lab<br><strong>Lab 003 · 완료 주장 감사하기</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-005-design-a-skill-KO.md" aria-label="다음 Lab: Lab 005 · 반복되는 방법을 경계가 분명한 Skill로 만들기">다음 →<br><strong>Lab 005 · 반복되는 방법을 경계가 분명한 Skill로 만들기</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
