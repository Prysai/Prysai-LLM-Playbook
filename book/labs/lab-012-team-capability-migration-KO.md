<!-- content_id: lab-012-team-capability-migration | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-012-team-capability-migration
title: "개인 방법을 팀 역량으로 바꾸기"
level: L6
domain: team
goal: "두 사람이 방법을 재현, 검토, 업데이트, rollback할 수 있게 패키징하기"
setup: "가상의 주간 보고 작업, 익명 두 역할, 실제 조직 시스템 없음"
task: "v0.1을 만들고 새 맥락에서 두 번 재현한 뒤, v0.2에서 한 요구를 바꾸고 영향과 rollback을 검토하기"
evidence: ["소유자, 권한, 수용 기준이 있는 두 패키지 버전", "입력 hash, 출력, 점수가 있는 독립 실행 두 건", "diff, 영향 행렬, rollback 결과, 미검증 목록"]
failure_variant: "소유자, 입력 출처, 권한 경계, 수용 규칙을 제거하거나 수용 기준을 바꾸지 않고 대상자를 변경하기"
reflection: "한 사람의 기억에만 있던 지식은 무엇이며, 무엇이 패키지 상속을 위험하게 만드는가?"
status: draft
last_verified: "not run"
transfer_task: "저위험 엔지니어링, 조사, 콘텐츠 흐름에 형식을 적용하기"
transfer_domain: "팀 엔지니어링, 조사 또는 콘텐츠 운영"
transfer_evidence: "버전, 권한 행렬, 독립 run, diff, 영향, rollback, 검토 메모 보관"
transfer_limitations: "정적 시뮬레이션은 계정 접근, 운영 통합, 조직 채택을 증명하지 않음"
---

# Lab 012: 개인 방법을 팀 역량으로 바꾸기

## 목표

개인의 직감과 채팅 기록을 다른 사람이 안전하게 실행할 수 있는 버전 관리 계약으로 바꿉니다.

## 준비

가상의 주간 보고 작업과 익명 두 역할을 사용합니다. 실제 계정, 이름, 고객 데이터, 내부 지표, 공유 시스템, 운영 저장소를 사용하지 마십시오. `v0.1`에는 목적과 비목표, 소유자와 검토 주기, 입출력 형식, 권한 행렬과 금지 행동, 절차와 중단 조건, 성공ㆍ경계ㆍ실패ㆍ전이 검사, rollback 대상을 넣습니다.

## 독립 재현

A와 B는 새 맥락에서 같은 패키지를 받고 작성자의 채팅 기록을 보지 않습니다. 각자는 입력 hash, `run_id`, 판단, 출력, 불확실성, 점수를 기록합니다. 차이를 조용히 평균 내지 말고 비교합니다. 실제 요구 하나를 바꿔 `v0.2`를 만들고 diff, 영향 소비자, 이전 결정, 호환성 주장, rollback 검사를 기록합니다.

## 실패, 수용, 전이

소유자, 입력 출처, 권한 경계, 수용 규칙 중 하나를 제거합니다. 올바른 결과는 이전을 멈추고 빠진 계약을 기록하는 것입니다. `v0.2`에서 대상자만 바꾸고 수용 기준을 그대로 두면 검토자는 호환성 주장을 거절하거나 새 증거를 요구해야 합니다.

- [ ] 두 사람이 새 맥락에서 작업을 재현했다.
- [ ] 입력, 출력, 권한, 소유자가 명시되어 있다.
- [ ] 두 run의 차이를 설명했다.
- [ ] 버전 변경에 영향과 rollback 기록이 있다.
- [ ] 실제 계정, 운영 시스템, 기밀 입력을 쓰지 않았다.

두 버전, hash, 권한 행렬, 독립 기록, 점수 메모, diff, 영향 행렬, rollback, 미검증 항목을 보관합니다. 이것들이 없으면 L6 역량은 증명되지 않았습니다. 다음에는 저위험 로컬 흐름에 적용하고 어떤 부분이 한 사람의 기억에만 있었는지, 여섯 달 뒤 무엇이 위험한 상속이 될지 적으십시오.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-011-gpt-codex-boundaries-KO.md">← 이전<br><strong>Lab 011 · GPT, Codex, 도구, Agent 구분하기</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-013-l3-vertical-slice-KO.md">다음 →<br><strong>Lab 013 · 감사 가능한 수직 슬라이스</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
