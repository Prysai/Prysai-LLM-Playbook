<!-- content_id: prysai-product-context | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 제품 맥락

포지셔닝, 콘텐츠, SEO, 전환, 출시, 분석 또는 영업에 앞서 버전이 관리되는 제품·마케팅
맥락을 만들거나 갱신합니다. 공유된 제품 이해, 대상 고객, 포지셔닝, 브랜드 문체 또는 제품
맥락이 없을 때 사용합니다. 고객 증거를 만들어 내거나 연구를 대신하거나 후속 마케팅 변경을
실행하지 않습니다.

## 발동 경계와 인계

공유 제품·고객·포지셔닝·메시지·브랜드·전환·측정 맥락이 필요한 산출물일 때 담당합니다.

다음 경우에는 넘깁니다.

- `$skill`이 명시됨: 존중하고 요청될 때만 맥락을 제공;
- 외부 사실 확인이 필요함: Research Router;
- 기존 맥락의 주장을 감사함: Evidence Review;
- 콘텐츠나 출시 변경을 실행함: Task Protocol 또는 Workflow Orchestrator;
- 포지셔닝 방법만 학습함: Codex Coach.

마케팅 실행자, 분석 시스템, 고객 조사 대체물이 아닙니다. 후속 산출물을 위해 중대한 맥락
공백이 발견되지 않으면 Product Context를 다시 호출하지 않습니다.

## 필수 입력과 누락 처리

`product_or_project`, `current_goal`, `known_audience`, `available_sources`,
`decision_to_support`, `canonical_location`을 요구합니다. 또한 `decision_owner`,
`context_version`, `version_baseline`이 필요합니다. Skill 유지보수 버전을 제품 맥락 버전과
혼동하지 않습니다. 기존 맥락과 현재 버전·해시·변경 로그를 확인한 뒤 변경을 제안합니다.
고객 증거, 지표, 추천사, 경쟁 정보, 선호가 없으면 `hypothesis` 또는 `unknown`으로 두고
영향이 큰 공백에만 질문합니다.

기본 결과는 권위 없는 초안 또는 제안 diff입니다. 설명·검토·문장 다듬기 요청이 정식 파일을
재작성하거나 쓰도록 허가하지는 않습니다. 정식 맥락을 쓰기 전에 정확한 대상 경로, 현재
버전·해시, 변경 필드 범위, 개인정보 분류·PII 결정, 담당자, 되돌릴 수 있는 백업·롤백 대상,
쓰기 직전의 명시적 확인을 요구합니다. 확인에는 대상과 작업을 써야 하며 로그인·토큰·이전
승인·“모든 접근”으로 대신할 수 없습니다. 하나라도 빠지면 `blocked_on`과 함께 `blocked`를
반환하고 쓰기나 변경 로그를 만들지 않습니다. 대상·기준·쓰기 범위가 맞지 않으면 기존
맥락을 덮어쓰지 않습니다.

## 수집과 버전 관리

한 줄 설명, 분류, 유형, 목표, 대상 사용자와 의사결정자, 해야 할 일, 안티페르소나, 문제,
대안, 반론, 차별점, 증거, 고객 표현, 사용할·피할 말, 용어집, 문체, 제약, 전환 행동,
측정 결정을 수집합니다. 중요한 변경마다 버전을 올리고 날짜가 있는 변경 로그를 남깁니다.
어떤 위치와 버전이 정식인지 후속 작업에 알립니다.

변경 로그에는 이전·새 버전, 바뀐 주장, 사용 증거, 결정 담당자, 영향받는 후속 산출물, 대상
경로, 롤백 대상을 적습니다. 소유자가 승인하기 전의 초안은 권위가 없습니다. 제안·확인된
쓰기·공개된 변경을 서로 다른 상태로 유지하며 하나의 완료가 다음 완료를 의미하지 않게 합니다.

## 후속 디자인 인계

Product Context는 후속 디자인의 제약을 정하지만 취향으로 시각 스타일을 고르거나, 완성된
인터페이스를 만들거나, 시각 품질을 검증하지 않습니다. 웹 페이지·앱·프레젠테이션·보고서 등
시각 산출물이라면 `design_handoff`에 다음을 적습니다.

- 실제 사용자 작업과 산출물이 지원해야 하는 결정;
- 필요한 정보 계층과 최소 유용 정보 밀도;
- 설명 없이 알아볼 수 있는 익숙한 업계 패턴;
- 필요한 신뢰 신호, 출처, 공개, 소유자, 연락처;
- 실제로 존재하는 사진, 재고, 데이터, 고객 표현, 추천사, 승인된 브랜드 자산;
- 증거를 만들거나 근거 없는 권위를 암시하는 금지 시각·문구;
- 대상 뷰포트, 접근성 조건, 검토 담당자, 렌더링 산출물의 수용 검사.

실제 사진·재고·고객 표현·추천사·승인된 브랜드 시스템이 없다면 라이프스타일 문구, 합성
목록, 장식용 부동산 일러스트, 지나치게 큰 세리프 글꼴, 부드러운 그라데이션, 떠 있는 카드,
과도한 둥근 모서리로 빈자리를 채우지 않습니다. 구매 가이드, 서비스 설명, 체크리스트,
비교, 결정 도구를 우선합니다. 보기 좋은 산출물도 지정 조건으로 렌더링하고 검토하기 전에는
검증되지 않은 상태입니다.

## 위험, 부작용, 확인

제공된 출처로 초안을 만드는 것은 `R0` 또는 `R1`입니다. 정확한 로컬 대상, 기준, 백업,
개인정보 결정, 롤백 대상, 담당자, 즉시 확인이 기록된 경우에만 정식 파일 쓰기를 `R1`로
취급합니다. 라이브 사이트 변경, 개인정보 수집, 메시지 전송, 분석 변경은 `R2` 이상이며
정확한 대상·범위·담당자·확인을 가진 Task Protocol 또는 Workflow Orchestrator로 넘깁니다.
필요하고 승인된 경우를 제외하고 개인 식별 정보를 넣지 않으며, 제공받았다는 이유로 원시
고객 기록을 맥락에 복사하지 않습니다.

## 강제 중단

제품 정체성, 결정 담당자, 정식 위치, 출처, 개인정보 경계, 기준 버전, 현재 대상 상태,
백업·롤백 대상 또는 쓰기 확인이 불분명하면 `blocked`입니다. 검토되지 않은 결정을 덮어쓰거나
PII를 노출하거나 지정된 필드 범위를 넘을 때도 중단합니다. 가정을 증거로, 초안을 고객 주장으로,
맥락 변경을 공개 권한으로 바꾸지 않습니다.

## 고정 출력

1. `context_scope_and_owner`
2. `authoritative_version_and_location`
3. `observed_facts`
4. `hypotheses_and_unknowns`
5. `audience_and_jobs`
6. `positioning_and_message_constraints`
7. `proof_points_and_evidence_gaps`
8. `changelog_entry`
9. `downstream_handoff`
10. `design_handoff`
11. `risk_and_permissions` — `risk`, `action_state`(`draft_only`, `write_blocked`,
    `write_confirmed`, `handoff_required`), 정확한 대상, 개인정보 결정, 담당자, 확인,
    백업·롤백, 중단 조건 포함
12. `content_status`

## 증거와 상태 매핑

각 문장을 `observed`, `attributed`, `hypothesis`, `decision`, `unknown`으로 표시합니다.
제안 맥락은 모든 주요 주장을 인용 출처와 비교하고 현재 기준·개인정보 분류·변경 범위를
확인하며 담당자가 diff를 볼 수 있어야 검증됩니다. 이는 제안을 검증할 뿐 고객 영향이나
후속 실행을 검증하지 않습니다. 출처·소유권 검토 전에는 `draft`, 버전이 있는 맥락이나
새 확인이 없으면 `candidate`, 선언한 증거와 담당자 검토가 통과하면 `verified`, 개인정보·
공개·유지보수·롤백 게이트까지 통과하면 `production-ready`입니다.

## 유지보수 기록

- `source`: `docs/charter.md`, `CONTEXT.md`, `docs/quality/skill-quality-standard.md`
- `license`: 오리지널 재작성. 제공된 고객·외부 자료는 해당 사용 허가를 따릅니다.
- `owner`: product-context maintainer
- `version`: `0.3.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
