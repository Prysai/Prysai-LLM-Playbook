<!-- content_id: lab-010-product-context | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-010-product-context
title: "두 작업에도 이어지는 공유 제품 맥락 만들기"
level: L3
domain: marketing
goal: "사실, 가정, 포지셔닝 결정, 빠진 증거를 구분하면서 반복 설명을 줄이는 작고 버전 관리되는 제품 기록을 만든다"
setup: "가상의 또는 정제한 제품, 저위험 마케팅 작업 두 개, 실제 캠페인과 연결하지 않는 버전 관리 제품 맥락 파일"
task: "최소 맥락을 만들고 제품 설명과 측정 계획에 사용하며, 포지셔닝 결정 하나를 바꾸고 결과 차이를 살핀다"
evidence:
  - "출처, 신뢰도, 담당자, 검토 날짜가 있는 두 버전의 제품 맥락"
  - "사용한 항목과 가정을 적은 제품 설명과 측정 계획"
  - "포지셔닝 결정 diff, 후속 출력 diff, 지표 근거, 해결하지 못한 증거 공백"
failure_variant: "audience 또는 target_action을 없앤 뒤 세그먼트, 인용, 지표를 지어내지 않고 빠진 맥락을 요청하는지 확인한다"
reflection: "어떤 항목이 재사용됐고, 어떤 변경이 실제 판단을 바꿨으며, 매끈한 문장이 약한 증거를 어디서 감췄는가"
status: draft
last_verified: "not run"
transfer_task: "같은 최소 맥락 계약을 정제한 엔지니어링 도구, 조사 서비스, 내부 콘텐츠 프로젝트로 옮긴다"
transfer_domain: "제품 엔지니어링, 조사 서비스, 콘텐츠 또는 마케팅"
transfer_evidence: "맥락 개정, 출처, 가정, 두 작업의 출력, diff, 지표 한계, 빠진 항목에 대한 반응을 남긴다"
transfer_limitations: "공유 맥락은 반복을 줄일 뿐 사실, 실제 고객 언어, 시장 반응, 귀속, 전략 승인까지 증명하지는 않는다"
---

# Lab 010: 두 작업에도 이어지는 공유 제품 맥락 만들기

## 학습 목표

서로 다른 두 작업이 재사용할 수 있는 작은 제품 정보원을 만듭니다. 목표는 불확실성을 감추지 않는 일관성입니다. 거대한 브랜드 문서를 만들거나 근거 없는 포지셔닝을 더 매끄럽게 반복하는 일이 아닙니다.

## 준비

가상의 제품이나 공개 정보를 정제한 자료를 사용합니다. 고객 목록, 비공개 조사, 내부 매출, 공개하지 않은 전략, 개인 데이터는 넣지 않습니다. 이 연습은 이메일, 광고, 분석, CRM, 게시, 운영 중인 웹사이트에 연결하지 않습니다.

다음 항목이 있는 `product-context-v1.md`를 만듭니다.

```text
product:
audience:
problem:
alternative:
difference:
proof:
objections:
customer_language:
voice:
target_action:
non_goals:
```

모든 항목에 `source`, `status: fact | assumption | decision | unknown`, `confidence`, `owner`, `next_review`를 더합니다. 증거가 없다면 비워 둡니다. 가정을 고객 인용문으로 바꾸지 않습니다.

## 작업과 실험

같은 맥락을 두 작업에 사용합니다.

1. 지정한 대상자를 위한 짧은 제품 설명을 씁니다.
2. 독자가 다음 행동을 고를 만큼 제품을 이해했는지와 같은 실제 판단을 위한 측정 계획을 설계합니다.

두 출력에는 사용한 맥락 항목, 둔 가정, 아직 검증할 사실을 적습니다. 각 지표에는 목표 행동, 데이터 출처, 관찰 기간, 판단 규칙, 한계를 기록합니다. 제안한 지표는 계획이지 측정한 결과가 아닙니다.

이제 포지셔닝 결정을 하나 바꾸고, 맥락 버전을 올리며, 이유를 적은 다음 두 출력을 다시 만듭니다. 맥락 diff와 출력 diff를 비교합니다. 결정 때문에 필요한 변경과 문장 표현만 달라진 부분을 구분합니다.

## 증거와 실패 사례

두 맥락 버전, 항목별 출처, 변경 이유, 각 버전의 두 출력, diff, 지표표, 미해결 항목을 보관합니다. 짧은 프롬프트만으로는 충분한 증거가 아닙니다. 반복해서 쓰지 않아도 된 사실과 두 번째 작업이 이를 올바르게 사용했는지 보여 줍니다.

`audience` 또는 `target_action` 하나를 지우고 두 출력을 다시 요청합니다. 올바른 행동은 빠진 판단을 지적하거나, 출력을 좁히거나, 정보를 묻는 것입니다. 글이 그럴듯해도 세그먼트, 고객 인용, 전환 이벤트, 시장 결과를 만들어 내면 이 Lab은 실패입니다.

## 수용 기준

- [ ] 사실, 가정, 결정, 미지를 눈에 보이게 구분했다.
- [ ] 중요한 모든 항목에 출처, 담당자, 검토 상태가 있다.
- [ ] 두 작업이 한 맥락 버전을 재사용하고 쓴 항목을 밝혔다.
- [ ] 포지셔닝 변경에 이유가 있고 확인 가능한 후속 diff가 있다.
- [ ] 지표가 판단에 연결되며 관찰 결과처럼 쓰이지 않았다.
- [ ] 실제 게시, 연락, 추적, 지출, 개인 데이터 사용이 없었다.

## 회고와 전이

어떤 항목이 반복 설명을 정말 줄였나요? 어떤 항목이 가장 큰 후속 판단 변화를 만들었나요? 다른 분야로 맥락을 옮기고 마케팅 전용 표현을 빼며, 무엇이 남고 무엇이 새 담당자나 증거 출처를 필요로 하는지 기록합니다. 공유 맥락은 반복을 줄여도 사실, 실제 고객 언어, 시장 반응, 귀속, 전략 승인을 증명하지 않습니다.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-009-engineering-lifecycle-KO.md" aria-label="이전 Lab: Lab 009 · 바로 구현하기와 전체 엔지니어링 수명 주기 비교하기">← 이전<br><strong>Lab 009 · 바로 구현하기와 전체 엔지니어링 수명 주기 비교하기</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-011-gpt-codex-boundaries-KO.md" aria-label="다음 Lab: Lab 011 · GPT, Codex, 도구, Agent 구분하기">다음 →<br><strong>Lab 011 · GPT, Codex, 도구, Agent 구분하기</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
