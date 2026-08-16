<!-- content_id: chapter-17-marketing-track | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 17장: 마케팅 트랙, 제품 이해에서 성장 실험까지

**상태:** `candidate`. **실험:** `draft / not_run`. 이 장은 검토 가능한 마케팅 판단을 가르치며 고객, 캠페인 결과, 인과관계 증명을 제공하지 않습니다.

## 문제

제품, 대상, 포지셔닝, 증거, 원하는 행동이 빠지면 마케팅 작업은 모호해집니다. 데이터가 무엇을 바꿔야 하는지 정하기 전에 개인 데이터를 모으거나 자동 게시하면 위험해집니다.

> 먼저 버전이 있는 Product Context를 만들고, 다음으로 가설을 세우며, 가장 작은 유용한 측정을 정한 뒤 개인정보와 권한 경계 안에서 콘텐츠나 행동을 준비합니다.

## Product Context와 결정

제품과 버전, 비목표, 포함·제외 대상, 문제와 사용 상황, 대안, 차별화와 보유 증거, 반론, 익명화한 고객 언어, voice, 금지 표현, 원하는 행동, channel, 지역, 날짜, owner, review를 기록합니다. 증거 없는 주장은 가설로 남기거나 제거합니다.

metric보다 먼저 결정, 가설, 최소 질문, event와 metric, denominator, sample, 기간, segment, 중복, 누락, 지연, consent, retention, access, 중단 규칙, 다음 행동을 적습니다. “B 변형의 click이 더 많다”는 exposure, denominator, 모집단, 기간이 없으면 의미가 없습니다.

| 역량 그룹 | 산출물 | 경계 |
|---|---|---|
| Product Context | context와 claim register | 사실, 가설, owner, review |
| 포지셔닝 | 대상과 반론에 맞춘 variants | 증거, voice, 금지 주장 |
| 실험 | 가설, exposure, 중단 규칙 | sample, denominator, consent |
| 배포 | 초안 또는 sandbox batch | channel, 승인, rollback |
| 측정 | 집계 report와 한계 | event schema, 품질, 인과 한계 |

## 개인정보, 귀속, 권한

Agent는 context를 정리하고 variant를 쓰며 event 이름을 점검하고 기술 통계를 제시할 수 있습니다. 하지만 인과를 추론하거나 sample bias를 숨기거나 광고, CRM, 이메일, 소셜 채널에 별도 권한 없이 게시할 수는 없습니다. 외부 쓰기에는 test account 또는 sandbox, 사람 승인, batch ID, 철회 또는 rollback이 필요합니다.

이름, 전체 이메일·IP, 사적 대화, 교차 맥락 identifier를 기본 입력으로 쓰지 않습니다. 집계, 비식별화, 짧은 retention, 제한된 access를 우선합니다. 중복, 누락, time zone, 지연, bot, denominator drift를 검사합니다. 보기 좋은 chart는 약한 데이터를 증거로 만들지 않습니다.

account access도 특정 organization 데이터를 특정 실험에 쓸 권한은 아닙니다. 외부 실험마다 host, organization, installation, 대상, 범위를 확인하세요.

## 연습과 경계

세 가지 반론만 있는 합성 제품, testimonial·재고·성과 없음, 수치만 있는 로컬 표를 사용합니다. “매력적인 소개를 써 줘”와 context, 누락 증거, 원하는 행동, 가설, metric, denominator, sample, 다음 결정을 포함한 요청을 비교합니다. 근거 없는 주장을 표시하고 두 variant를 만들되 승자나 인과를 선언하지 않습니다.

요청, context 버전, variant, 가설 표, metric, sample 메모, 비식별 data dictionary, privacy 결정, 다음 결정을 보관합니다. 허가된 데이터, 품질 검토, 사람 검토가 생기기 전까지 이 연습은 `candidate / not_run`입니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="16-engineering-track-KO.md">← 이전<br><strong>16장 · 엔지니어링 트랙, 아이디어에서 신뢰할 수 있는 소프트웨어까지</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-KO.md">다음 장 준비 중 →<br><strong>18장 제공 상태 보기</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
