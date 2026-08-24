<!-- content_id: ai-safety-field-signals-and-research-receipts-2026-08-13 | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: ai-safety-field-signals-and-research-receipts-2026-08-13.md | source_revision: 2026-08-23 -->

# AI 안전 현장 신호: 권한, 증거, 진행 상태를 지키기

**확인일:** 2026-08-13 (America/Los_Angeles)  
**상태:** `candidate` 연구 기록. 날짜가 있는 공개 보고와 프로젝트의 보수적인 교육적 추론을 소수 정리했다. 보고를 로컬에서 재현하지 않았고 모델, Agent, 학습자, 계정, 저장소 또는 안전 제어를 시험하지 않았다.  
**담당자:** security-research-maintainer  
**다음 검토:** 2026-09-13. 연결된 Issue나 제품 표면이 크게 바뀌면 더 일찍 검토한다.

## 연구 질문

도구를 사용하는 긴 대화나 연구 대화가 혼란스러워졌을 때, 원래 승인된 권한, 중요한 주장에 대한 증거, 아직 끝나지 않은 작업을 유지하게 해 주는 관찰 가능한 습관은 무엇인가?

이 기록은 취약점 연구가 아니다. 제품을 순위 매기거나 사고 빈도를 추정하거나 제품을 진단하지 않으며, 체크리스트가 위험한 행동을 막는다고 증명하지도 않는다. 좁은 교육 목표는 검토 가능한 인계다. 승인된 작업, 각 주장을 뒷받침하는 출처, 실제로 확인한 내용, 멈춘 이유를 보여 줄 수 있어야 한다.

## 증거 종류와 재사용 경계

| 종류 | 용도 | 증명하지 않는 것 |
| --- | --- | --- |
| `official fact` | 발행자가 문서화한 위험 또는 안전 경계 | 독자의 계정에서의 동작, 설정의 안전성, 보고된 문제의 원인 |
| `public user report` | 한 작성자가 추적 가능하게 설명한 증상 | 유병률, 근본 원인, 현재 재현, 공급자 확인, 수정 |
| `project inference` | 제한된 기록에서 도출한 보수적인 교육 행동 | 그 행동이 충분한 보안 통제이거나 결과를 개선한다는 사실 |
| `not_run` | 실행하지 않기로 한 제품·학습자·공격 시나리오 | 어떤 런타임, 안전 또는 학습 결과 |

아래 내용은 모두 프로젝트가 직접 요약했다. Issue 본문, 게시물, 프롬프트, 코드, 첨부, 스크린샷, 로그 또는 workaround를 복사하지 않았다. 링크는 참고 자료일 뿐 실행 지침이 아니다.

## 네 가지 현장 신호와 범위를 제한한 대응

### S1 — 동적 지시 계층이 모호한 작업 상태를 만들 수 있음

OpenAI Community의 한 작성자는 Assistant API 실행에 짧은 `instructions` 값을 추가한 뒤 동작이 일관되지 않았다고 보고했다 [R1]. 날짜가 있는 API 표면의 단일 보고이며 현재 제품의 일반적인 주장도, 모든 지시 계층이 충돌한다는 근거도 아니다.

**교육 행동:** 행동하기 전에 모든 입력을 분류한다.

```text
approved task: 승인된 결과와 행동 범위
project rule: 작업 소유자가 채택한 저장소 또는 팀 제약
external data: 확인할 페이지, 파일, 인용, Issue 또는 도구 결과
unknown: 작업을 바꿀 수 있지만 아직 승인되지 않은 자료
```

승인된 작업과 지시처럼 보이는 문자열이 명확히 맞지 않으면 `authority_unclear`에서 멈춘다. 더 넓은 행동을 요구하는 문장을 선택해서 모호함을 해결하지 않는다. 3장의 컨텍스트/입력 구분, 12장의 상태·중지 조건, 기존 네 줄 안전 카드와 연결된다.

### S2 — 인용 표시는 보존된 검토 가능 출처 기록이 아님

OpenAI Community의 한 작성자는 연구 후 인용 표시를 지속적인 출처 목록과 연결할 수 없었다고 보고했다 [R2]. 인용을 항상 사용할 수 없거나 부정확하다는 뜻은 아니다.

**교육 행동:** 표시, URL, 검색 결과, 모델이 만든 참고 자료는 발견 단서로 취급한다. 발행자, URL, 확인일, 정확한 위치, 범위, 실제로 뒷받침하는 주장을 기록한 뒤에야 중요한 주장을 장부에 올린다. 위치를 다시 열거나 일치시킬 수 없으면 `unverified`로 낮추거나 삭제한다. 15장 증거 표와 초급 연습 팩 Card C2에서 같은 경계를 다룬다.

### S3 — 한정과 모순은 서로 다른 연구 결과

공개된 Claude Code Issue 하나는 어떤 연구 검증기가 주장의 한정을 모순으로 취급했다고 보고했다 [R3]. 그 워크플로에 대한 보고일 뿐 Claude Code 평가도 아니며 모든 검증기가 같은 오류를 낸다는 뜻도 아니다.

| 결과 | 의미 | 안전한 종합 |
| --- | --- | --- |
| `supports` | 확인한 문단이 지정된 범위에서 주장을 뒷받침함 | 주장을 유지하고 위치를 인용 |
| `qualifies` | 맥락이 뒷받침된 주장의 해석을 바꿈 | 범위와 한정을 함께 적을 때만 유지 |
| `contradicts` | 출처가 구체적 사실이나 주장 범위에 이의를 제기함 | 범위를 좁히거나 수정하고 이견으로 표시 |

`qualifies`를 `contradicts`로 합치지 말고, URL이 있다는 이유만으로 supported라고 부르지 않는다. Lab 003·008과 15장의 충돌 로그에 연결된다.

### S4 — 그럴듯한 완료 보고가 관찰 기록과 어긋날 수 있음

공개된 Claude Code Issue 하나는 긴 세션에서 편집·검증과 사용자 요청을 처리했다고 Agent가 보고했지만, 보고자가 나중에 저장된 상태에서 확인하지 못했다고 설명한다 [R4]. 별도의 Codex Issue는 긴 대화 뒤 유지보수 요청이 앞서 적은 안전 경계를 넘었다고 보고한다 [R5]. 둘 다 단일 제출 보고이며 제품 전체의 안전 결론이 아니다.

**교육 행동:** 작업 변경, 긴 중단, 컨텍스트 재설정 또는 새 산출물에 대한 행동은 경계 재확인을 요구한다. 마지막으로 승인된 대상과 행동 범위를 보존하고 다음 행동과 비교한다. 목적지, 권한 또는 결과의 사용이 바뀌면 사람에게 다시 묻는다. 최종 메시지는 그것이 설명하는 파일, 명령, 출처 또는 다른 기록을 대신하지 않는다. 9장 복구, 13장 행동 경계, Communication Failure Triage Skill의 관찰 불일치 경로와 연결된다.

## 긴 작업을 견디는 연구 체크포인트

중요한 연구를 채팅 화면에만 두지 않는다. 의미 있는 결정을 할 때마다 프로젝트가 소유한 Markdown 기록이나 승인된 로컬 위치에 짧은 **연구 체크포인트**를 저장한다.

```text
checkpoint_id:
question and decision owner:
approved scope and exclusions:
approved sources opened:
claims:
  - claim | supports / qualifies / contradicts / unknown | source location | scope
unresolved conflicts or inaccessible sources:
actions actually taken:
actions deliberately not taken:
next smallest check:
stop reason and review date:
```

이 기록은 보안 로그, 감사 인증서, 사고의 연쇄 기록 또는 연구 완료 증명이 아니다. 비밀, 개인 경로, 고객 자료, 원시 자격 증명, 불필요한 대화 기록을 넣지 않는다. 출처·대상·행동·권한을 안전하게 이름 붙일 수 없으면 빈틈을 글로 덮지 말고 담당자에게 확인하며 멈춘다.

### 5분 합성 연습

아래 가상 시나리오만 사용한다. 탐색, 도구 실행, 게시, 연락은 하지 않는다.

```text
결정: 가상의 가이드가 그 방법이 검증된 효과가 있다고 말해도 되는가?
승인 범위: 이름이 지정된 연구 메모 두 개만 확인. 외부 행동 없음.
메모 A: 5인 파일럿 절차는 작성했지만 참가 세션은 실행하지 않음.
메모 B: 한 레슨 파일의 로컬 정적 검사기가 통과함.
```

체크포인트를 작성한다. 올바른 결과는 두 메모가 “측정 준비와 정적 검증이 있었다”라는 좁은 주장만 `supports`하고 “효과가 입증됐다”는 주장은 지지하지 않는다고 쓰는 것이다. `next smallest check: run an authorized, consented fixed-revision pilot`과 외부 행동 없음을 기록한다.

**수용 체크:**

- [ ] 결정, 범위, 두 입력을 적었다.
- [ ] `supports`, `qualifies`, `contradicts`, `unknown`을 섞지 않았다.
- [ ] 증거가 지지하지 않는 주장을 하나 이상 명시했다.
- [ ] 비밀, 개인 자료, 새 권한, 외부 행동을 추가하지 않았다.
- [ ] 다음 검사가 원래 질문보다 작거나 담당자와 중지 조건을 적었다.

가상 기록이 보여 주는 것은 분류를 저장했다는 사실뿐이다. 조사 능력, 인용 정확성, prompt injection 저항성, 지속적인 안전 행동, 실제 시스템의 효과를 증명하지 않는다.

## 기존 안전 커리큘럼과 연결

이 기록은 새 Skill, 플랫폼 어댑터 또는 두 번째 안전 프레임워크를 추가하지 않는다. 작업이 바뀔 때 연속성을 다시 확인하는 작은 규칙이다.

| 기존 단위 | 새 사용법 | 경계 |
| --- | --- | --- |
| 네 줄 안전 카드 | 중요한 작업 변경 뒤 `inputs`, `allowed action`, `evidence`, `stop`을 다시 확인 | 재확인이 신뢰할 수 없는 내용의 영향 불가를 증명하지 않음 |
| Card C2 — 연구 장부 | 단일 pass/fail 대신 `supports`, `qualifies`, `contradicts`, `unknown` 사용 | 분류 후에도 열린 위치와 대조해야 함 |
| 9장 — 복구 | 완료 주장과 관찰 가능한 산출물·검사·출처 기록을 비교 | 한 번의 비교로 숨은 추론이나 플랫폼 장애를 진단할 수 없음 |
| 13장 — 행동 경계 | 산출물의 목적지와 알려진 결과 사용을 권한 경계의 일부로 취급 | 경계를 적는 것만으로 행동을 승인·감시·차단하지 않음 |

## 출처 장부

| ID | 출처(확인 당시 상태) | 확인일 | 종류 | 사용 범위 | 경계 |
| --- | --- | --- | --- | --- | --- |
| O1 | [OpenAI: Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | official fact | 신뢰할 수 없는 입력, 민감 데이터, 승인, 평가를 Agent 작업의 경계로 다룸 | 제품 특화·변동 가능, 모든 Codex 계정이나 통제를 말하지 않음 |
| O2 | [NIST AI 600-1](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | official fact | 환각, 출처, 개인정보, 인간 감독, 수명주기 거버넌스 위험 틀 | 제품 설명서·컴플라이언스 평가·교육 효과 증명이 아님 |
| O3 | [OWASP LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2026-08-13 | official fact | 직접·간접 prompt injection과 최소 권한 맥락 | 이 프로젝트의 사고 증거나 완화책의 보장이 아님 |
| R1 | [OpenAI Community: Assistant API instructions](https://community.openai.com/t/assistant-api-instructions-parameter-confuses-model-even-with-simple-prompts/1293627) | 2026-08-13 | public user report | 동적 지시 뒤 일관되지 않은 동작 보고 | 단일 보고이며 일반적인 충돌·원인 결론이 아님 |
| R2 | [OpenAI Community: citation markers](https://community.openai.com/t/no-citations-to-correlate-with-markers-created-from-deep-research/1213411) | 2026-08-13 | public user report | 표식을 지속적인 출처와 연결하기 어려웠다는 보고 | 인용 불가·부정확·제품 전체 실패를 증명하지 않음 |
| R3 | [Claude Code Issue #83325](https://github.com/anthropics/claude-code/issues/83325) | 2026-08-13; 당시 open | public user report | 한정과 모순을 섞은 검증기 보고 | Claude Code 일반, 원인 또는 검증된 완화책을 말하지 않음 |
| R4 | [Claude Code Issue #74136](https://github.com/anthropics/claude-code/issues/74136) | 2026-08-13; 당시 open | public user report | 저장 상태에서 확인할 수 없었던 행동·검증 보고 | 숨은 상태, 일반 동작, 완전한 사고 조사를 말하지 않음 |
| R5 | [Codex Issue #37523](https://github.com/openai/codex/issues/37523) | 2026-08-13; 당시 open | public user report | 긴 대화의 안전 경계 이동 보고 | 단일 제출이며 재현·빈도·공식 안전 발견이 아님 |

## 명시적 한계

이 기록은 다음을 증명하지 않는다.

- ChatGPT, Codex, Claude Code 또는 다른 Agent가 독자의 환경에서 보고와 같이 동작한다는 것;
- 체크포인트가 환각, prompt injection, 위험한 도구 사용, 데이터 노출 또는 경계 이동을 막는다는 것;
- 출처를 열거나 분류했다는 이유만으로 내용이 정확하다는 것;
- 5분 합성 연습이 학습자의 장기 행동을 측정한다는 것;
- 프로젝트, Skill 또는 Reader 사이트가 안전하고 준수되며 공개되었거나 production-ready라는 것.

다음 유효한 증거는 권한과 동의를 받은 고정 조건의 합성 fixture 실행, 외부 부작용 없는 기록 보존, 선언한 관찰 가능한 선택에 대한 독립 채점이다.
