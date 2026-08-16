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

## 처음 10분: 모호한 요청을 확인 가능한 초안으로 바꾸기

새 tool을 고르거나 account를 연결하기 전에 먼저 해 봅니다. 가상의 brief와 버려도 되는 local file을 씁니다. 예를 들면 “가상의 행사 신청 세 건을 한 페이지로 업데이트하기”입니다. model이 그럴듯해 보이게 하는 것이 아니라, 작은 요청을 실제로 확인할 만큼 분명하게 만들 수 있는지 보는 연습입니다.

1. **reader**, **final form**, **제공한 사실**, **금지 data/action**, **합격 기준**을 다섯 줄로 씁니다.
2. 아래 prompt의 대괄호를 자신의 과제로 바꿉니다.

   ```text
   [reader]를 위한 [final form]을 만드세요. 다음 제공 사실만 사용하세요: [facts].
   숫자, source, 이름, 결과를 지어내지 마세요. 정보가 부족하면 [missing]으로 표시하고 질문은 하나만 하세요.
   draft만 반환하세요. 전송, 게시, login, 외부 service 호출은 하지 마세요.
   acceptance check: [관찰 가능한 확인 항목 세 가지].
   ```

3. reader처럼 draft를 열어 제공 사실, 각 `[missing]`, 제목 순서, 적어 둔 acceptance check를 확인합니다.
4. brief, prompt, output과 **passed**, **failed**, **unknown** 세 줄 기록을 남깁니다. 실제 data, 배포, 새 permission이 필요하면 멈추고 다음 decision으로 적습니다. task를 조용히 넓히지 않습니다.

깔끔한 draft 하나가 prompt가 언제나 더 낫다거나, 일이 더 빨라졌다거나, flow가 프로덕션에 안전하다는 뜻은 아닙니다. 다음 수정과 비교할 수 있는 작고 점검 가능한 evidence일 뿐입니다.

단계는 저위험 로컬 읽기, 되돌릴 수 있는 project 작업, 승인과 log가 있는 통제 외부 연결, 명시적 권한·privacy/license review·preview·rollback·online verification을 가진 프로덕션 쓰기 또는 공개의 네 가지입니다. 상위로 갈 때마다 새 이유, permission, risk, evidence, 복구 계획이 필요합니다.

## 연습과 경계

합성 product-report context, 비식별 구조 fixture, 가상의 독자를 씁니다. A는 document, B는 document와 분석, C는 render한 chart, D는 외부 배포입니다. 빈 데이터, 누락 column, 극단값, 잘못된 입력을 넣습니다. A/B/C는 로컬에서, D는 test account나 draft endpoint에서만 preview, batch ID, idempotency key, log, 승인과 함께 실행하고 게시하지 않습니다.

A–D 표, 최종 render, data dictionary, validation, 잘못된 입력 응답, log, permission, retry, sandbox 상태, 공개하지 않았다는 증거를 보관합니다. 모의 쓰기 뒤 timeout이면 trace를 보존하고 부분 상태를 조회하며 비멱등 행동을 반복하지 않습니다. 실제 최종 형식 증거와 독립 review 전까지 `candidate / not_run`입니다.

## 자동화 계약: 행동보다 먼저 데이터 정의하기

오프라인 “집계 count를 한 페이지 report로 만들기” 예입니다. 합성 JSON을 읽고 버릴 수 있는 디렉터리에 쓸 뿐 network, login, send는 하지 않습니다.

```text
입력: report-input.json, date·category·count; count는 0 이상 정수.
민감 경계: name, email, IP, chat, token, external ID는 받지 않음.
변환: category별 count 합계와 input/script version 보존.
출력: report.md, time window, denominator, missing field, empty state 포함.
검증: output을 다시 읽고 total, category, hash, empty/bad input 확인.
재시도: 같은 idempotency key와 읽을 수 있는 output에서만; unknown write는 먼저 query.
중지: schema 불일치, 민감 데이터, 디렉터리 불명확, overwrite rule 미확인.
```

exit code 0은 script가 자신의 정의로 끝났다는 뜻일 뿐 field mapping, label, audience, external system을 증명하지 않습니다.

| 전달물 | 열어서 볼 것 | 놓치기 쉬운 failure |
|---|---|---|
| 문서/PDF | hierarchy, page, link, empty, 선택 가능 text | export 깨짐 |
| website | 390px/desktop, keyboard, empty/error, link | button/language 오류 |
| chart | unit, denominator, label, contrast, alt, rights | 예쁘지만 오도함 |
| sheet | formula, filter, empty, unit, recalculate | formula 덮어쓰기 |
| flow | schema, log, batch, key, read-back | timeout 뒤 중복 write |

## 작은 실험: 오프라인 report flow와 두 failure

1. normal, empty, `count` 누락, negative, extreme 합성 input을 만듭니다. 실제 customer/personal/production data는 쓰지 않습니다.
2. Markdown report를 만들고 window, total, category, empty state를 확인합니다. PDF/PNG를 render하면 final form을 검사합니다.
3. 실행마다 input hash, transform version, output path, exit status, raw log, read-back을 보관합니다.
4. write 후 timeout을 흉내 냅니다. 바로 다시 쓰지 말고 같은 batch로 partial report를 읽습니다. unknown이면 `unverified`로 전달하고 중지합니다.
5. missing column/bad data에서는 block reason을 보여 주고 zero, chart, success를 만들지 않습니다.

email, CRM, cloud drive, website 전송은 별도 external write입니다. test account/draft endpoint, target/audience, approval, batch, withdrawal/rollback, online read-back이 필요하며 이 연습은 허가하지 않습니다.

## 스스로 확인하기

- [ ] input field, 민감 경계, version, output, validation, retry, stop을 썼다.
- [ ] final form을 열어 empty/error/accessibility를 script 외에 확인한다.
- [ ] timeout에서 batch/output을 query한 뒤 write를 재시도한다.
- [ ] local generated, draft, sent, published, online read-back을 구분한다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="17-marketing-track-KO.md">← 이전<br><strong>17장 · 마케팅 트랙, 제품 이해에서 성장 실험까지</strong></a></td><td align="right"><a data-chapter-nav="next" href="19-evaluate-models-and-workflows-KO.md">다음 →<br><strong>19장 · 모델과 워크플로 평가하기, 인상에서 증거로</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
