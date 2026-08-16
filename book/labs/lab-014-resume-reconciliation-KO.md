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

## 왜 필요한가

중단 후 새 지시는 작업이 진행 중인 것처럼 보이게 할 수 있지만, 대상, worktree, 이전 부작용은 여전히 불확실할 수 있습니다. 계속하기 전에 상태를 조정합니다. 재개된 대화를 연속성의 증거로 삼지 마십시오.

## 준비와 작업

두 텍스트 파일이 있는 일회용 사본을 사용합니다. 목표, 대상 경로, 브랜치, 마지막 행동, 보류 행동, 권한, 증거가 담긴 checkpoint를 만듭니다. 두 번째 작업을 시작하거나 오래된 checkpoint로 바꿔 중단을 흉내 냅니다. 자격 증명, 네트워크, 운영, 비가역 명령은 사용하지 않습니다.

1. 현재 디렉터리, 저장소 루트, 브랜치, 대상 파일, hash 또는 수정 시각, diff를 기록합니다.
2. checkpoint와 비교합니다.
3. 각 필드를 `matched`, `changed`, `not_observed`로 분류합니다.
4. 목표, 대상, 권한, 부작용 상태가 조정될 때만 계속합니다. 그렇지 않으면 새 checkpoint를 만들고 멈춥니다.

## 실패, 증거, 수용

보이는 작업 이름만 같게 하고 저장소 루트나 대상 파일을 바꿉니다. 편집 전에 멈춰 첫 불일치 필드를 찾습니다. 쓰기 가능하다고 잘못된 checkout을 고치지 마십시오. checkpoint, 명령과 출력, diff, 분류 표, 짧은 결정을 보관합니다.

- [ ] 실제 경로, 저장소, 브랜치, 대상, diff를 캡처했다.
- [ ] 현재 상태와 이름 있는 checkpoint를 비교했다.
- [ ] 변경과 미관찰을 구분했다.
- [ ] 대상 또는 부작용이 불확실하면 중단했다.
- [ ] 재개 prompt를 연속성 증거라고 부르지 않았다.

원격 쓰기 없이 브라우저나 MCP에서 마지막 확인 요청, 대상 계정 또는 리소스, 승인, 이전 호출이 원격 상태를 바꿨을 위험을 확인합니다. 이 Lab은 `draft / not_run`이며 fixture는 실제 연속성을 증명하지 않습니다.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-KO.md">← 이전<br><strong>Lab 013 · 감사 가능한 수직 슬라이스</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-KO.md">다음 Lab 준비 중 →<br><strong>Lab 015 제공 상태 보기</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
