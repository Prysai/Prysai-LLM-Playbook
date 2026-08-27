<!-- content_id: lab-003-evidence-review | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

---
id: lab-003-evidence-review
title: "완료 주장을 감사하기"
level: L3
domain: general
goal: "주장, 직접 증거, 추론, 빠진 검증을 분리하는 연습"
setup: "답안 키를 학습자 문맥 밖에 둔, 정제된 세 가지 전달 요약"
task: "각 중요 주장을 범위, 필요한 증거, 실제 증거, 상태, 가장 작은 다음 검사와 연결"
evidence:
  - "세 고정 입력 요약과 답안 키"
  - "완성된 주장-증거 표"
  - "검토 메모와 명시적인 미검증 목록"
failure_variant: "근거 없는 모든 테스트 통과 주장과 한 브라우저로 뒷받침한 모든 기기 동작 주장을 넣음"
reflection: "어떤 증거가 존재, 정확성, 준비 상태를 보였고 범위를 쓰자 어떤 주장이 약해졌는가"
status: draft
last_verified: "Not run"
transfer_task: "작은 엔지니어링, 연구 또는 게시 전달에 감사 표를 적용"
transfer_domain: "엔지니어링, 연구 또는 콘텐츠 전달"
transfer_evidence: "범위가 정해진 주장, 직접 증거, 빈틈, 검토 메모, 최종 상태를 보관"
transfer_limitations: "정적 감사는 점검 범위 밖에서 참조 산출물이 진짜이거나 완전함을 증명하지 못함"
---

# Lab 003: 완료 주장을 감사하기

## 학습 목표

말투, 자신감, 보기 좋은 마무리를 믿지 않고 결과가 정말 끝났는지 판단합니다.

## 준비

정제한 전달 요약 세 개를 준비합니다. 직접 증거가 있는 것, 일부만 끝났는데 끝났다고
쓴 것, 검증 기록 없이 깔끔하게 꾸민 것입니다. 답안 키는 학습자 문맥 밖에 둡니다.

읽기 검사와 더 좁은 증거 요청만 허용됩니다. 요약을 편집하거나, 없는 출력을 지어내거나,
외부 서비스를 연락하거나, 운영 로그를 쓰지 마세요.

## 작업과 실험

각 중요 주장에 다음을 기록합니다.

| 주장 | 범위 | 필요한 증거 | 찾은 증거 | 상태 | 가장 작은 다음 검사 |
|---|---|---|---|---|---|
| 예 | 파일, 환경, 버전, 날짜 | diff와 집중 검사 | 정확한 경로 또는 `none` | verified / partial / inferred / blocked / unknown | 하나의 경계 있는 행동 |

다음 질문을 구분합니다.

1. 산출물이 존재하는가?
2. 선언한 범위에서 산출물이 올바른가?
3. 의도한 독자 또는 환경에 준비되었는가?

각 질문에는 별도 증거가 필요합니다. diff는 변경을 보일 뿐 정확성을 보이지 않습니다.
통과한 단위 테스트는 그 범위의 행동만 보일 뿐 배포나 사용자 수용을 보이지 않습니다.

## 실패 사례

명령 출력, 테스트 이름, 날짜, 환경, 종료 코드 없이 “모든 테스트가 통과했다”를 넣으세요.
올바른 반응은 주장을 낮추고 증거를 요청하는 것입니다. 자신감 있는 문구에서 실제 실행을
추론하지 마세요.

한 브라우저 증거로 “모든 기기에서 동작한다”라고도 해 보세요. 주장을 좁히거나 더 많은
기기 증거를 요구해야 합니다.

## 수용 체크리스트

- [ ] 중요한 각 주장에 명시적 범위가 있다.
- [ ] 직접 증거와 추론이 다른 열에 있다.
- [ ] 근거 없는 주장을 `verified`로 표시하지 않았다.
- [ ] 다음 검사는 프로젝트 전체 재실행보다 작다.
- [ ] 비밀, 고객 데이터, 비공개 로그를 제외했다.
- [ ] 최종 handoff가 아직 미검증인 것을 나열한다.

## 보존할 증거

세 입력 요약, 완성 표, 답안 키 비교, 검토자 메모, 최종 상태를 보관합니다. 학습자 실행과
독립 검토가 기록되기 전까지 이 Lab은 `draft / not_run`입니다.

## 회고와 전환

작은 엔지니어링 전달, 연구 결론, 게시 초안에 표를 적용하세요. 어떤 증거가 존재, 정확성,
준비 상태를 증명했나요? 범위를 정확히 쓰자 어떤 주장이 약해졌나요?

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-002-task-protocol-KO.md" aria-label="이전 Lab: Lab 002 · 막연한 요구를 작업 프로토콜로 바꾸기">← 이전 Lab<br><strong>Lab 002 · 작업 프로토콜</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-004-skill-selection-KO.md" aria-label="다음 Lab: Lab 004 · 가장 작은 유효 역량 고르기">다음으로 →<br><strong>Lab 004 · 가장 작은 유효 역량 고르기</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
