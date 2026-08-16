<!-- content_id: lab-005-design-a-skill | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-005-design-a-skill
title: "반복되는 방법을 경계가 분명한 Skill로 만들기"
level: L4
domain: general
goal: "반복 흐름이 Skill이 될 가치가 있는지 판단하고, 어디서나 작동하는 대신 작업을 좁히는지 확인한다"
setup: "두 번 이상 끝낸 저위험 흐름, 분리된 연습 폴더, 민감 정보를 뺀 네 사례, 공식 Skill 검사기"
task: "안정된 판단을 뽑아 가장 작은 유용한 Skill을 쓰고, 긍정·경계·실패·전이 사례를 시험한 뒤 설치 없이 채택 결정을 남긴다"
status: draft
last_verified: "not run"
---

# Lab 005: 반복되는 방법을 경계가 분명한 Skill로 만들기

## 학습 목표

반복 작업에 안정된 판단 패턴이 있을 때만 재사용 가능한 지시 묶음을 만듭니다. Skill은 한 번 잘 나온
답을 보관하는 곳도, 특정 프로젝트 체크리스트도, 한 분야의 모든 사실을 넣는 곳도 아닙니다.

## 준비

적어도 두 번 끝낸 무해한 작업 흐름을 고르고 두 실행 기록을 남깁니다. 민감 정보를 뺀 입력과 Skill
발견 루트 밖의 연습 폴더를 사용하세요. 자격 증명, 운영 데이터, 미공개 고객 자료, 재사용 조건이
불명확한 외부 자료는 사용하지 않습니다.

`extraction.md`에 다음 네 열을 만듭니다.

| 관찰한 단계 | 안정된 판단 | 프로젝트 고유 세부 사항 | 두 실행의 근거 |
|---|---|---|---|

안정된 판단만 Skill 후보입니다. 파일 이름, 고객 세부 정보, 임시 우회책, 한 번뿐인 대상은 프로젝트
맥락에 남겨 둡니다.

## 과제와 실험

다음을 포함하는 가장 작은 후보를 작성합니다.

- 관련 요청에는 작동하고 가까운 요청에는 물러나는 설명;
- 입력, 허용 행동, 권한 한계, 비밀 처리, 출력, 수용 조건;
- 짧은 핵심 흐름과 필요할 때만 분리하는 상세 참조 또는 스크립트;
- 긍정·경계·실패 예시 하나씩;
- 출처, 라이선스, 담당자, 버전, 다음 검토일.

공식 검사기를 실행한 뒤 새 문맥에서 긍정, 경계, 실패, 다른 분야 전이라는 네 고정 사례를 시험합니다.
후보가 발견되었는지, 로드되었는지, 선택되었는지, 따랐는지, 행동이 검증되었는지를 따로 기록합니다.
한 상태는 다음 상태를 증명하지 않습니다.

마지막으로 `skill-adoption-decision.md`를 작성합니다.

```text
candidate_revision:
task_gap:
trigger_conditions / non_trigger_conditions:
source / license / notice:
dependencies:
permissions / external_side_effects:
positive / boundary / failure / transfer results:
target_install_scope:
backup / rollback / rollback_check:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install
unverified / unblock_conditions:
```

이 Lab은 채택 추천에서 멈춥니다. 설치는 공유 상태를 바꾸므로 별도 승인이 필요합니다.

## 남길 증거

원래 두 작업 기록, `extraction.md`, 후보 디렉터리 전체, 버전 또는 해시, 검사기 출력, 네 사례의
입출력, 새 문맥 메모, 채택 결정을 보관합니다. 실패한 시험은 실패로 남기며 나중의 수정 실행으로
덮어쓰지 않습니다.

## 실패 사례

먼저 실제 프로젝트 파일명이나 고객 고유 규칙을 Skill에 고정합니다. 전이 사례를 실행해 후보가
잘못 작동하거나 무관한 지시를 내리는지 확인합니다. 우연한 세부 사항을 빼고 새 시도 ID로 다시
실행하세요.

다음으로 라이선스나 사용 허가 기록이 불명확한 외부 조각을 넣습니다. 검사기가 통과해도 올바른
결정은 `blocked`입니다. 올바른 파일 구조는 출처를 해결하지 않습니다.

## 수용 체크리스트

- [ ] 두 번의 사전 실행이 모든 안정된 판단을 뒷받침한다.
- [ ] 작동 조건과 비작동 조건을 모두 시험했다.
- [ ] 긍정, 경계, 실패, 전이의 원본 결과를 남겼다.
- [ ] 출처와 재사용 허가를 기록했다.
- [ ] 설치, 비밀 사용, 공개 또는 외부 부작용이 없었다.
- [ ] 결정에 미검증 항목과 다음 검토 책임자를 적었다.

## 회고와 전이

다른 분야의 흐름에 이 방법을 적용합니다. 무엇이 옮겨도 남았나요? 무엇이 프로젝트 맥락이었나요?
후보가 반복되는 누락을 줄였는지, 단지 지시를 길게 만들었는지 확인하세요.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-004-skill-selection-KO.md" aria-label="이전 Lab: Lab 004 · 가장 작은 유용한 역량 고르기">← 이전 Lab<br><strong>Lab 004 · 가장 작은 유용한 역량 고르기</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="../table-of-contents-KO.md" aria-label="한국어 목차로 돌아가기: Lab 006은 아직 번역되지 않음">다음 Lab 준비 중 →<br><strong>Lab 006 제공 상태 보기</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
