<!-- content_id: lab-013-l3-vertical-slice | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-013-l3-vertical-slice
title: "완전한 수직 슬라이스 실행하기"
level: L3
domain: engineering
goal: "제한된 변경을 정의부터 증거와 인수인계까지 옮기기"
setup: "일회용 저장소 사본, 허용된 Markdown 출력 경로 하나, 게시 및 자격 증명 없음"
task: "릴리스 노트 변경을 CP0부터 CP4까지 실행하고, 집중 검사, 실패 분기, 새 맥락 인수인계를 포함하기"
evidence: ["입력 hash, 기준 상태, checkpoint, 행동 log", "실제 diff, 명령 출력, 종료 코드, 주장-증거 표", "실패 기록, 인수인계, rollback, 미검증 목록"]
failure_variant: "필수 입력 제거, 검사 실패, CP2 뒤 재개, 외부 행동 지시 주입, 영속 환경 변경 요구"
reflection: "가장 큰 근거 없는 주장 또는 불필요한 행동을 막은 checkpoint는 무엇인가?"
status: draft
last_verified: "Maintainer reference run accepted 2026-08-12; learner run not run"
transfer_task: "저위험 조사 또는 콘텐츠 작업으로 checkpoint 흐름 이전"
transfer_domain: "엔지니어링, 조사 또는 콘텐츠"
transfer_evidence: "다시 쓴 프로토콜, checkpoint, 결과물 또는 blocked 기록, 증거 표, 인수인계"
transfer_limitations: "로컬 슬라이스는 원격 게시, 운영 동작, 독자 이해를 증명하지 않음"
---

# Lab 013: 완전한 수직 슬라이스 실행하기

## 목표와 준비

계획, 편집, 검사, 검토, 인계, 게시를 혼동하지 않고 작은 흐름 하나를 완성합니다. 일회용 사본에서 지정된 Markdown 릴리스 노트 하나만 바꿉니다. 입력과 hash, 시작 `git status`, 허용 경로, 수용 기준, rollback, 금지 행동을 기록합니다. 게시, push, 의존성 설치, 자격 증명 사용은 범위 밖입니다.

| Checkpoint | 필요한 증거 |
|---|---|
| CP0 정의 | 목표, 입력, 범위, 권한, 중단 조건, 기준 hash |
| CP1 계획 | 최소 슬라이스, 방법, 예상 증거, rollback |
| CP2 변경 | diff, 변경 경로, 행동 log, 출력 hash |
| CP3 검증 | 명령, 원시 출력, 종료 코드, 범위, 미실행 검사 |
| CP4 인수인계 | 완료, 미완료, 증거, 미지, 다음 검사, rollback |

## 실험과 실패

입력에 제공된 사실만으로 노트를 작성합니다. 허용 경로만 바뀌었는지, 필수 내용이 있는지, 근거 없는 주장이 없는지 확인합니다. 성공한 diff는 게시, 독자 이해, 원격 동기화를 증명하지 않습니다.

다음 중 적어도 하나를 실패시킵니다. 입력을 빼고 편집 전 멈추기, 집중 검사를 실패시키고 출력을 보존하기, CP2 뒤 checkpoint와 저장소 상태만으로 새 맥락에서 재개하기, token 업로드 지시를 데이터로 처리하기, 승인 없는 영속 변경에서 멈추기. 재시도는 진단 조건이 바뀌고 기존 부작용을 이해한 뒤에만 합니다.

- [ ] 목표, 범위, 권한, 수용, rollback이 명시되어 있다.
- [ ] CP0–CP4를 보존했고 허용 경로만 바뀌었다.
- [ ] 명령에 원시 출력과 종료 상태가 있다.
- [ ] 한 실패 분기가 안전히 중단되거나 복구되었다.
- [ ] 인수인계가 로컬 완료와 게시ㆍ운영을 구분한다.

hash, checkpoint, diff, log, 출력, 실패 기록, 주장-증거 표, 인수인계를 보관합니다. 이 Lab은 `draft / not_run`입니다. 유지관리자의 결정적 참조 실행은 학습자 독립성, Codex 동작, 전이, 운영을 증명하지 않습니다.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-KO.md">← 이전<br><strong>Lab 012 · 팀 역량 이전</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-014-resume-reconciliation-KO.md">다음 →<br><strong>Lab 014 · 재개 전 상태 조정</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
