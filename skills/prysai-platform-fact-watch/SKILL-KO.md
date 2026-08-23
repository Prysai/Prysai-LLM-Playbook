<!-- content_id: prysai-platform-fact-watch | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: b4d1303 | source_license: project-owned CC-BY-4.0 -->

# 플랫폼 사실 변경 감시

벤더 문서, 제품 화면, 권한, 모델, 계정 경로 또는 링크가 바뀌었을 때 이름이 명시된
플랫폼 관련 교육 내용을 최신 상태로 유지하기 위한 작은 정비 결정을 내립니다.
Codex, Claude Code, Grok, ChatGPT, Gemini, Copilot 또는 다른 LLM 플랫폼에서 영향을
받는 장, Lab, Skill, 경로와 독자에게 보여 줄 임시 제한을 찾을 때 사용합니다. 사실을
직접 조회하거나, 새 어댑터를 채택하거나, 플랫폼을 실행하거나, 모델을 비교하는
용도는 아닙니다.

## 주장 카드부터 시작하기

하나의 이름 있는 플랫폼, 출처나 `claim_id`로 뒷받침되는 하나의 주장, 현재 독자에게
보이는 위치, 출처 소유자와 URL, 마지막 확인일, 적용 범위, 담당자, 다음 검토일,
검토 사유를 요구합니다. 항목이 하나라도 없으면 빈칸으로 두지 말고 `unreviewed`로
기록합니다.

주장의 범위를 좁게 유지합니다. “Claude Code에는 권한 모드가 있다”와 “Grok Build에는
API 경로가 있다”는 서로 다른 카드입니다. 플랫폼 이름, 기능 이름 또는 HTTP 응답은
주장을 대신할 수 없습니다.

## 변경 신호 분류

현재 제품의 동작을 추측하지 말고 다음 상태 중 하나만 고릅니다.

- `review_due`: 예정된 검토일이 되었거나 정한 주기 안에 출처를 확인하지 못함;
- `source_changed`: 날짜가 있는 1차 출처 검토에서 기록된 주장과 중요한 차이가
  확인됨;
- `source_unavailable`: 인용한 출처가 현재 주장을 뒷받침하지 못함;
- `scope_changed`: 기록된 화면, 계정, 지역, 버전 또는 권한 범위에 더 이상 적용되지
  않을 수 있음;
- `no_change_recorded`: 날짜가 있는 1차 출처 검토에서 기록된 범위 안의 주장이
  동일함을 확인함;
- `unreviewed`: 적절한 1차 출처 검토가 아직 없음.

기억, 리디렉션된 URL, 검색 결과 일부, 커뮤니티 글 또는 로그인 성공만으로
`no_change_recorded`를 고르지 않습니다. 출처 확인은 기록된 날짜와 범위 안에서만
주장을 뒷받침합니다.

## 영향을 받는 교육 범위 표시

영향을 받는 모든 정식 단위를 나열하고 역할을 표시합니다.

```text
claim_id:
platform / surface:
source owner / URL:
last_checked / next_review:
change_status:
affected_units:
  - path | role: stable_core | adapter_fact | task_step | Lab | Skill | route | generated_page
reader_risk: none | clarification | pause_named_step | remove_current_claim
safe_interim_text:
owner:
next_action:
```

명시적인 권한, 증거, 복구, 부작용 최소화 같은 안정적인 핵심 원칙은 대체로 그대로
사용할 수 있습니다. 제품 명령, 화면 경로, 권한 기본값, 가격, 이용 자격, 통합,
모델 제공 여부는 어댑터 사실이므로 출처 검토가 필요합니다. 출처가 바뀌었다고
과정 전체가 무효라고 쓰지 않습니다.

## 가장 작고 안전한 조치 선택

- `no_change_recorded`: 범위를 제한한 문구를 유지하고 검토 영수증만 갱신합니다.
  더 넓은 기간에도 유효하다고 주장하지 않습니다.
- `review_due` 또는 `unreviewed`: 보편적인 핵심은 유지하고 해당 단계를 검토 대기로
  표시한 뒤 현재 사실을 `prysai-source-investigator`에 넘깁니다.
- `source_changed`, `source_unavailable` 또는 `scope_changed`: 출처 검토로 대체
  문구가 정해질 때까지 해당 교육 단계를 일시 중지하거나 제거합니다. 이전 기록은
  역사적 증거로 보존합니다.
- 변경 때문에 어댑터의 출처, 실행, 권한 또는 실패 기록이 의심되면 채택 결정을
  `prysai-platform-adapter-review`에 넘깁니다.
- 공개 주장, 생성된 페이지 또는 릴리스 노트가 이전 사실을 이미 말하고 있다면,
  정정 내용을 공개하기 전에 산출물 패킷을 `prysai-evidence-review`에 넘깁니다.

기억만으로 제품 절차를 조용히 다시 쓰지 않습니다. 최신성 영수증만으로 어댑터를
admitted, safe, equivalent 또는 `production-ready`로 분류하지 않습니다.

## 유지보수 영수증 반환

주장 카드, 변경 상태, 영향을 받는 단위, 독자 위험, 안전한 임시 문구, 출처 검토
인계, 필요한 경우 어댑터 또는 주장 감사 인계, 담당자, 다음 검토일, 미확인 사항을
포함한 기록을 하나 반환합니다.

마지막에는 반드시 다음 한계를 붙입니다.

`This receipt manages the freshness boundary of one named platform claim. It does not prove current product behavior, account access, permission safety, runtime success, adapter admission, model quality, learner outcome, or cross-platform equivalence.`

## 유지보수 기록

- `source`: ADR-0025, 콘텐츠 수명 주기, 사실 영향 레지스트리, 출처 범위를 제한한
  어댑터 채택 기록에서 도출한 Prysai Lab 오리지널 유지보수 방법
- `license`: 오리지널 재작성. 1차 플랫폼 문서와 공개 보고서는
  `docs/sources/asset-register.md`에 따라 계속 참고 자료로 취급합니다.
- `owner`: facts-maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
