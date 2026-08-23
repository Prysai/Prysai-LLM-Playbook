<!-- content_id: prysai-first-turn-check | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 76c9926 | source_license: project-owned CC-BY-4.0 -->

# 첫 번째 요청 점검

사용자가 작성했지만 아직 보내지 않은 요청을 보내기 전에 점검합니다. 더 보기 좋게 다듬은 요청이 곧 안전하고 정확하거나 효과적인 요청이라는 뜻은 아닙니다. 빠진 경계를 드러내는 것이 이 Skill의 역할입니다.

## 먼저 점검 대상인지 확인하기

다음 조건을 모두 만족할 때만 사용합니다.

- 사용자가 아직 보내지 않은 초안을 제시했습니다.
- 예정된 첫 차례가 텍스트만으로 이루어지는 저위험 작업이며 자체적으로 범위가 닫혀 있습니다.
- 무엇이 빠졌는지, 모호한지, 서로 충돌하는지, 범위가 지나치게 넓은지 확인하려고 합니다.

첫 메시지를 새로 쓰거나 크게 고치려면 `prysai-dialogue-brief`로 넘깁니다. 파일, 도구, 계정, 권한, 게시, 연락처, 로컬 변경 또는 다른 외부 효과가 관련되면 `prysai-task-protocol`로 넘깁니다. 최신 사실, 출처 또는 출처에 근거한 결론이 필요하면 `prysai-source-investigator`나 `prysai-research-router`로 넘깁니다. 원래 요청과 실제 답변이 이미 있으면 `prysai-communication-failure-triage`를, 완료 주장을 증거로 확인하려면 `prysai-evidence-review`를 사용합니다.

비밀, 자격 증명, 비공개 기록, 개인 식별자, 숨은 지침 또는 기밀 자료는 점검하지 않습니다. 텍스트 초안만으로 이후 도구 사용이나 외부 행동이 허가되는 것도 아닙니다.

## 보이는 여섯 항목 점검하기

제공된 초안을 증거로 읽습니다. 적혀 있지 않은 사실, 대상, 권한, 데이터 통제, 제품 기능 또는 허가를 추측하지 않습니다.

| 항목 | 다음을 적었으면 visible | 다음이면 불명확 |
| --- | --- | --- |
| outcome | 이번 차례의 작은 결과 하나 | 넓은 희망이나 성공 약속 |
| starting context | 제공된 텍스트, 사실, 출처 또는 `unknown` | 선언하지 않은 접근권이나 권한을 전제함 |
| requested response | 범위가 정해진 형식, 길이 또는 순서 | “도와줘”만 적혀 있음 |
| limits | 공유하지 않을 데이터, 하지 않을 행동 또는 요청하지 않은 도움 | 파일, 계정, 사람 또는 중요한 결정으로 조용히 확장됨 |
| check | 불확실성, 보존, 출처 또는 수정에 관한 질문 | 답변이 스스로를 검증함 |
| stop and receipt | 언제 끝내며 어떤 짧은 기록을 남기는지 | 완료, 안전 또는 학습을 당연하게 여김 |

각 항목을 `visible`, `missing`, `unclear`, `out_of_scope` 중 하나로 분류합니다. 결과를 바꾸거나 권한을 넓히거나 데이터를 노출하거나 점검 자체를 불가능하게 만들 수 있는 중요한 문제만 적습니다.

## 가장 작은 유용한 수정 반환하기

사용자의 표현을 유지합니다. 완전히 새로운 첫 메시지를 만들거나 역할·제품 주장을 추가하거나 모르는 내용을 그럴듯하게 채우지 않습니다. 중요한 빈칸은 최대 세 개까지 사용자가 추가할지 결정할 수 있는 `add_or_clarify` 한 줄로 제시합니다. 받는 시스템이 지킬 것이라는 약속이 아니라 결정할 항목으로 씁니다.

여섯 항목이 모두 보이고 범위 안에 있다면, 중요한 누락을 찾지 못했다는 좁은 의미에서만 `ready_to_send`라고 합니다. 사실의 정확성, 개인정보 보호, 보안, 제품 동작, 답변 품질, 작업 완료, 학습 향상 또는 안전을 증명하지 않습니다.

다음 형식을 정확히 반환합니다.

```text
check_status: ready_to_send | revise_before_send | out_of_scope | blocked
request_scope:
field_check:
material_gaps:
add_or_clarify: maximum three lines
preserved_text:
unknowns:
risk: R0
evidence: supplied unsent draft and six-field inspection only
claim_limit:
handoff:
content_status: candidate
```

여섯 항목을 모두 표시하고 제공된 사실을 보존하며 요청 범위를 넓히지 않고, 초안이 텍스트 전용 저위험 범위를 벗어나면 인계 또는 중지를 명시해야 이 점검을 수락합니다.

## 유지보수 기록

- `source`: universal first-turn 계약과 communication routing 경계를 바탕으로 한 Prysai Lab 오리지널 방법
- `license`: 오리지널 재작성. 링크된 공급업체 안내는 `docs/sources/asset-register.md`에서 참고 자료로만 다룸
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
