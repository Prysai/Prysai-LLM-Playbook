<!-- content_id: chapter-18-content-design-data-automation | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 18장: 콘텐츠, 디자인, 데이터, 자동화 트랙

**상태:** `candidate`. **실험:** `draft / not_run`. 이 트랙은 전달물 검증 방법을 가르치며 프로덕션 실행 기록이 아닙니다.

## 문제

workflow에 tool이 많을수록 “source file이 있다”, “script가 실행됐다”, “API가 연결됐다”를 완성된 전달물로 착각하기 쉽습니다. layout, empty state, 접근성, license, formula, privacy, permission, 중복 쓰기, 복구도 실패할 수 있습니다.

> 먼저 최종 형식과 독자를 정의합니다. 그다음 risk 순서로 capability를 켜고, render된 결과, 입출력, permission, 복구, 게시 상태를 검사합니다.

## 브랜드가 아니라 전달물로 고르기

| 전달물 | 최종 형식 check | 대표 위험 |
|---|---|---|
| 문서 또는 PDF | pagination, 목차, link, font, 읽기, 인쇄 | reflow, font 누락, 인용·license |
| 웹사이트 | browser render, 반응형, interaction, empty/error, keyboard, mobile | source는 맞지만 UI가 사용 불가 |
| 이미지 또는 영상 | 크기, 선명도, 글자, 권리, caption/alt, 편집성 | 사실 오류, 불명확 license, 접근 불가 |
| 발표자료 | 투사 크기, 계층, contrast, 순서, notes | overflow, 낮은 contrast, script 불일치 |
| 스프레드시트·보고서 | formula, filter, unit, 빈값, export, 재계산 | 숫자 이동, denominator drift, 덮어쓰기 |
| 자동화 | schema, log, retry, idempotency, permission, rollback, 출력 | 중복 쓰기, 유출, 부분 완료 |

source diff는 최종 형식 증거가 아닙니다. 실제 형식이 중요하면 PDF/PNG를 render하고, website를 browser에서 열고, sheet를 재계산하거나 test account로 통제된 flow를 실행합니다. 계층, 읽기, empty/error, 접근성, 정확성, license, 편집성을 확인합니다.

## 되돌릴 수 있고 반복 가능한 자동화

```text
입력 schema와 sample; 민감 필드와 허용 용도;
transform과 version; 외부 call, target, 최소 permission;
timeout, retry, backoff, idempotency key; log, trace ID, error 분류;
출력 schema와 validation; 부분 상태, compensation, rollback;
사람 승인 지점과 중지 조건.
```

“API가 연결됨”은 연결성만 증명합니다. field mapping, 완전성, 중복, permission 범위, 하류 정확성을 증명하지 않습니다. 프로덕션 쓰기 전에는 test account, sandbox, 로컬 simulation을 사용하고 필요하면 input/output hash와 batch ID를 남깁니다.

단계는 저위험 로컬 읽기, 되돌릴 수 있는 project 작업, 승인과 log가 있는 통제 외부 연결, 명시적 권한·privacy/license review·preview·rollback·online verification을 가진 프로덕션 쓰기 또는 공개의 네 가지입니다. 상위로 갈 때마다 새 이유, permission, risk, evidence, 복구 계획이 필요합니다.

## 연습과 경계

합성 product-report context, 비식별 구조 fixture, 가상의 독자를 씁니다. A는 document, B는 document와 분석, C는 render한 chart, D는 외부 배포입니다. 빈 데이터, 누락 column, 극단값, 잘못된 입력을 넣습니다. A/B/C는 로컬에서, D는 test account나 draft endpoint에서만 preview, batch ID, idempotency key, log, 승인과 함께 실행하고 게시하지 않습니다.

A–D 표, 최종 render, data dictionary, validation, 잘못된 입력 응답, log, permission, retry, sandbox 상태, 공개하지 않았다는 증거를 보관합니다. 모의 쓰기 뒤 timeout이면 trace를 보존하고 부분 상태를 조회하며 비멱등 행동을 반복하지 않습니다. 실제 최종 형식 증거와 독립 review 전까지 `candidate / not_run`입니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="17-marketing-track-KO.md">← 이전<br><strong>17장 · 마케팅 트랙, 제품 이해에서 성장 실험까지</strong></a></td><td align="right"><a data-chapter-nav="next" href="19-evaluate-models-and-workflows-KO.md">다음 →<br><strong>19장 · 모델과 워크플로 평가하기, 인상에서 증거로</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
