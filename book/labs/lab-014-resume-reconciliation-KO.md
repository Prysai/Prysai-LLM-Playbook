<!-- content_id: lab-014-resume-reconciliation | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-014-resume-reconciliation
title: "다시 시작한 작업을 계속하기 전에 조정하기"
level: L3
domain: general
goal: "계속하기 전 작업 포인터, 대상, 브랜치, 권한, 부작용 상태를 조정하기"
setup: "checkpoint와 두 텍스트 파일이 있는 일회용 로컬 폴더 또는 저장소; 자격 증명, 네트워크, 운영 파일, 비가역 명령 없음"
task: "현재 상태를 기록하고 checkpoint와 비교해 각 필드를 분류한 뒤 목표, 대상, 권한, 부작용이 일치할 때만 계속하기"
evidence: ["checkpoint, 현재 관찰, 명령, 출력, diff, 분류 표, 계속 여부 결정", "일치, 변경, 미관찰 필드 기록"]
failure_variant: "작업 이름만 일치시키고 저장소 루트나 대상 파일을 다르게 한다. 편집 전에 멈춘다"
reflection: "가장 쉽게 가정한 필드는 무엇이고 어떤 관찰이 계속 또는 중단 결정을 바꿨는가?"
status: draft
last_verified: "not run"
transfer_task: "원격 쓰기 없이 브라우저 또는 MCP 세션에 조정 봉투를 적용하기"
transfer_domain: "브라우저, 조사, 엔지니어링, 콘텐츠 인수인계"
transfer_evidence: "이전 요청, 대상, 승인, 관찰된 원격 상태 위험, 새 checkpoint"
transfer_limitations: "일회용 fixture는 실제 계정, 원격 리소스, 운영 재개 작업의 연속성을 증명하지 않음"
---

# Lab 014: 다시 시작한 작업을 계속하기 전에 조정하기

## 이 Lab이 필요한 이유

공개 현장 보고에는 컨텍스트 압축, 용량 중단 또는 재개 뒤에 Agent가 이전
작업으로 돌아온 사례가 있습니다. 새 프롬프트 때문에 실행이 계속되는 것처럼
보여도 작업 포인터, 작업 트리 또는 외부 효과의 상태는 여전히 불확실할 수
있습니다. 이 Lab은 계속하기 전에 상태를 조정하는 방법을 연습합니다.

## 준비

작은 저장소의 임시 복사본이나 텍스트 파일 두 개가 있는 폴더를 사용합니다.
목표, 대상 경로, 브랜치, 마지막으로 완료한 작업, 보류 중인 작업, 권한 상태와
증거를 적은 checkpoint를 만듭니다. 두 번째 작업을 시작하거나 오래된
checkpoint로 바꿔 중단을 흉내 냅니다. 자격 증명, 네트워크, 운영 파일 또는
되돌릴 수 없는 명령은 사용하지 않습니다.

## 과제

1. 현재 작업 디렉터리, 저장소 루트, 브랜치, 대상 파일, 해시 또는 수정 시각,
   현재 diff를 기록합니다.
2. 관찰한 내용을 checkpoint와 비교합니다.
3. 각 필드를 `matched`, `changed`, `not_observed`로 분류합니다.
4. 목표, 대상, 권한, 외부 효과 상태가 모두 조정된 경우에만 계속합니다. 그렇지
   않으면 새 checkpoint를 만들고 멈춥니다.

## 증거

checkpoint, 명령과 출력, diff, 분류 표, 짧은 결정을 보관합니다. 성공한 연습
기록은 임시 fixture에서 조정 절차를 따랐다는 사실만 증명합니다.

## 실패 변형

화면에 보이는 작업 이름은 같게 두고 저장소 루트나 대상 파일을 바꿉니다. 올바른
결과는 편집 전에 멈추고 처음으로 조정되지 않은 필드를 찾는 것입니다. 쓰기가
가능하다는 이유만으로 잘못된 checkout을 고치지 마십시오.

## 전이

같은 틀을 브라우저나 MCP 세션에 적용합니다. 마지막으로 확인된 요청, 대상 계정
또는 리소스, 승인 상태, 이전 호출이 원격 상태를 바꿨을 가능성을 확인합니다.

## 수용 체크리스트

- [ ] 실제 경로, 저장소, 브랜치, 대상과 diff를 기록했다.
- [ ] 현재 상태를 이름을 붙인 checkpoint와 비교했다.
- [ ] 변경된 필드와 관찰하지 못한 필드를 구분했다.
- [ ] 대상이나 외부 효과 상태가 불확실할 때 중단했다.
- [ ] 재개된 프롬프트를 연속성의 증거라고 부르지 않았다.

## 회고

어떤 필드를 가장 쉽게 가정했는지, 어떤 관찰이 결정을 바꿨는지, 무엇이 아직
`not_observed`인지 적습니다.

## 출처

- [현장 문제와 프롬프트 패턴 — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-01~FP2-04 및 FP2-08.
- [10장: 계획과 수직 슬라이스](../chapters/10-planning-and-slicing-KO.md).
- [12장: Agent 루프, 상태와 중지 조건](../chapters/12-agent-loop-and-stop-KO.md).

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-KO.md">← 이전<br><strong>Lab 013 · 감사 가능한 수직 슬라이스</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-015-evidence-delivery-KO.md">다음 →<br><strong>Lab 015 · 증거를 갖춘 전달</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
