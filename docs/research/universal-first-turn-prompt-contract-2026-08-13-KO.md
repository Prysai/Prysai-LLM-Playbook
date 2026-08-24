<!-- content_id: universal-first-turn-prompt-contract-2026-08-13 | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: universal-first-turn-prompt-contract-2026-08-13.md | source_revision: 2026-08-23 -->

# 범용 첫 턴 프롬프트 계약: 범위를 정한 초보자 기록

**기록일:** 2026-08-13  
**자료 확인일:** 2026-08-13 (America/Los_Angeles)  
**상태:** `candidate` 연구 기록. 프롬프트 실행, 모델 비교, 학습자·출처 품질·보존·전이·독립 평가는 진행하지 않았다.  
**담당:** curriculum-maintainer  
**다음 검토:** 2026-09-13. 특정 제품에 맞추거나 연구에 사용하거나 사용자 결과의 근거로 제시하기 전에는 먼저 검토한다.

## 범위와 질문

이 기록은 초보자가 처음 보낼 작은 원본 프롬프트 카드 두 장을 제안한다. 하나는 5분
스페인어 연습이고, 하나는 5분 연구 분류다. 특정 제품의 문법, 도구 이름, 계정 설정,
모델 이름, 숨겨진 지시 계층을 전제로 하지 않는다.

**질문:** 제품이 달라도 같은 항목을 평범한 말로 표현하면서, 제품·계정·도구·출력이
동일하다고 주장하지 않으려면 첫 턴에 어떤 필드를 넣어야 하는가?

여기서 “범용”은 제품을 바꿔도 같은 필드를 자연어로 표현할 수 있다는 뜻일 뿐이다.
OpenAI, Anthropic, Google, Microsoft, Meta가 같은 모델, 기능, 도구, 문맥 처리,
데이터 통제, 가격, 이용 가능성, 권한, 응답, 안전 동작을 제공한다는 뜻이 아니다.
실제로 사용하는 제품과 표면의 최신 문서를 확인해야 한다.

카드는 의도적으로 범위를 제한한다. 계정 접근, 브라우징, 음성, 업로드, 연락, 구매,
게시, 코드 실행, 건강·법률·금융·고용·교육 배치 결정을 요청하지 않는다. 적용되는
데이터 통제와 권한을 이해하기 전에는 사적 기록, 자격 증명, 개인정보, 기밀 연구자료를
제품에 붙여 넣지 않는다.

## 증거 분류와 주장 경계

| 분류 | 이 기록에서의 용도 | 증명하지 않는 것 |
| --- | --- | --- |
| `official fact` | 제품 소유자가 자기 제품 범위에서 공개한 프롬프트 안내 | 제품 간 동일성, 출력 정확성, 교육 효과 |
| `public user report` | 날짜가 있는 한 사람의 필요·어려움 보고 | 일반성, 현재 제품 사실, 원인, 검증된 해결책 |
| `community suggestion` | 이 기록에는 남기지 않음 | 공식 안내나 효과 증거 |
| `local reproduction` | 없음. `not_run` | 어떤 제품의 동작이나 사용자 결과 |
| `project inference` | 의도·제한·기록을 보이게 하는 보수적 카드 설계 | 평가 전 카드가 효과 있다는 주장 |

`not_run`은 증거가 아니라 상태다. 완료 시간, 모델 동작, 품질 점수, 학습자 반응,
언어 평가, 인용 확인, 전이 결과를 관찰하지 않았다는 뜻이다.

## 공식 안내: 제품별로 범위를 나누기

아래 다섯 문서는 서로 다른 조직의 제품별 문서다. OpenAI는 지시·문맥·예시·프롬프트
평가를, Anthropic은 최적화 전 성공 기준과 경험적 테스트를, Google은 명확하고 구체적인
지시와 예시를, Microsoft는 지시·주요 내용·예시를, Meta는 Llama 프롬프트 가이드를 다룬다.

이는 하나로 합친 벤치마크가 아니라 다섯 가지 독립된 공식 사실이다. 여기서 얻는 좁은
**프로젝트 추론**은 첫 요청에 작업, 사용 가능한 문맥, 원하는 응답, 제한, 중단 또는
확인 조건을 명시하자는 것이다. 이 필드가 필요·충분·최적이거나 제품 간 안정적이며
언어 학습과 연구에 효과적이라는 증거는 아니다.

## 날짜가 있는 공개 신호

다음 두 보고서는 초보자에게 있을 법한 필요를 보여 주기 위한 신호일 뿐이며, 교육자료로
복사하거나 제품 사실로 사용하지 않는다.

| ID | 공개 보고 | 남기는 좁은 신호 | 엄격한 경계 |
| --- | --- | --- | --- |
| U1 | OpenAI Community [*Learn languages at the same time*][U1] (2024-12-03 게시, 2026-08-13 확인) | 한 작성자가 더 긴 언어 연습을 원했고 사용 제한을 느꼈다고 설명 | 한 사람의 목표와 인식된 제약뿐. 현재 한도·수요·학습 효과의 근거가 아님 |
| U2 | OpenAI Community [*Long instruction prompt on short input data*][U2] (2024-06-24 게시, 2026-08-13 확인) | 긴 지시와 조금씩 바뀌는 입력을 반복하고 더 나은 상호작용을 물음 | 하나의 워크플로 고민뿐. 모든 제품의 메모리·비용·권장 설정의 근거가 아님 |

**프로젝트 추론:** 작업 경계와 작은 기록이 보이는 짧은 첫 요청은 “언어를 가르쳐 줘”나
“이걸 연구해 줘”보다 점검하기 쉽다. 접근 제한, 지시 지속, 난이도, 답변 품질을 검증한
해결책이라는 뜻은 아니다.

## 후보 첫 턴 계약

아래는 이 프로젝트가 직접 쓴 표현이다. 요청을 구성하는 체크리스트이지 명령 문법이나
시스템 해석의 보장이 아니다.

| 필드 | 사용자가 제공할 것 | 필요한 이유 | 추정하지 말 것 |
| --- | --- | --- | --- |
| **하나의 결과** | 이번 대화에서 관찰 가능한 작은 결과 하나 | 다음 행동과 큰 목표를 분리 | 숙달, 유창함, 전문성, 완료 보장 |
| **시작 문맥** | 직접 쓴 짧은 예, 아는 사실, 제공한 자료, `unknown` | 답변이 의존할 수 있는 범위를 표시 | 사용자나 자료의 유효한 평가 |
| **요청한 응답** | 제한된 형식·길이·순서 | 저장하거나 거절할 수 있는 결과를 만듦 | 정확성, 관련성, 준수 |
| **제한** | 공유하지 않을 데이터, 하지 않을 행동, 필요 없는 도움 | 권한과 부작용을 명시 | 완전한 개인정보·보안·정책 준수 |
| **확인** | 불확실성을 드러내는 질문·출처 조건·수정 요청 | 답변을 스스로 검증된 것으로 취급하지 않게 함 | 검증된 사실, 교육 품질, 신뢰할 점수 |
| **중단과 기록** | 세션 종료 조건과 보관할 작은 기록 | 미완료와 다음 단계를 보이게 함 | 보존, 전이, 실제 과제 완료 |

![경계를 보이게 하세요: 첫 턴의 여섯 필드를 이름 붙이세요. 필드가 보인다고 안전·정확성·완료가 증명되는 것은 아닙니다.](../../assets/teaching/first-turn-contract-card.svg)

### 보내기 전: 확인하되 인증하지 않기

아직 보내지 않은 저위험 텍스트 요청이라면 [First-Turn Check Skill](../../skills/prysai-first-turn-check/SKILL.md)로
각 필드를 `visible`, `missing`, `unclear`, `out_of_scope`로 표시할 수 있다. 최대 세 개의
`add_or_clarify`만 반환하며 프롬프트 전체를 대신 작성하지 않는다. 첫 메시지를 작성할 때는
[Dialogue Brief](../../skills/prysai-dialogue-brief/SKILL.md), 파일·도구·계정·권한·외부 효과가
있을 때는 [Task Protocol](../../skills/prysai-task-protocol/SKILL.md)을 사용한다.

이 방법은 초안을 점검하기 쉽게 할 뿐 답변, 제품 동작, 데이터 처리, 안전, 학습 결과를 검증하지 않는다.

## 카드 A: 5분 초급 스페인어 연습

짧은 글쓰기 교환만 하는 원본 저위험 연습이다. 사람을 평가하거나 CEFR 등급을 부여하거나
음성·브라우징을 쓰거나 실제 의사소통 능력을 주장하지 않는다.

### 다음 조건에서만 사용

- 인사나 음료 주문처럼 평범하고 민감하지 않은 주제일 것
- 몇 문장으로 끝낼 수 있을 것
- 수정은 권위 있는 언어 평가가 아니라 확인할 제안으로 다룰 것

### 원본 카드

~~~text
I have five minutes for beginner Spanish practice.

Outcome: I want to write one polite two-sentence reply for [a simple situation].
Starting context: [words I know, a self-written attempt, or "unknown"].

Give me one short situation and wait for my reply. Do not assign a level or
claim that I have learned Spanish. After I reply, point out at most two changes
that would most affect meaning or politeness. For each change, say whether you
are uncertain. Ask me for one revision.

Do not use personal information, browse, contact anyone, or turn this into a
study plan. End by listing: my first reply, my revision, help used, one thing I
should check elsewhere, and the smallest next practice or stop condition.
~~~

### 5분 기록이 보여 줄 수 있는 것

한 번 기록한 세션에서 짧게 시도하고 공개된 도움을 받아 수정했다는 것까지다. 스페인어
습득, 문법·높임의 적절성, 독립 수행, 보존, 전이, 언어 수준은 보여 주지 않는다. 실제
메시지에 쓸 수정은 사람이나 권위 있는 자료로 먼저 확인한다.

## 카드 B: 5분 연구 분류

최종 답변이나 인용처럼 보이는 문장을 만드는 카드가 아니라 다음 연구 확인 단계를 점검하는
카드다. 사용자가 현재 대화에 제공한 자료만 쓰고, 제품의 브라우징 능력을 별도로 허용·확인하지
않았다면 외부 출처를 읽었다고 말하지 않는다.

### 다음 조건에서만 사용

- 질문을 한 문장으로 좁혀 말할 수 있을 것
- 결과만으로 고위험 결론을 내리지 않을 것
- 나중에 확인할 URL이나 문서 제목을 보관할 수 있을 것

### 원본 카드

~~~text
I have five minutes to prepare a research check, not a final answer.

Question: [one narrow question].
Material I supplied: [URLs, titles, excerpts, or "none"].

First, restate the question and name what evidence would be needed. Then make a
three-row table with: possible claim, supplied source or "missing", and what
would need checking. Do not invent citations, state that you opened a source
you cannot access, or give a recommendation. Separate fact, report, and
inference. If the material is missing, contradictory, personal, or high stakes,
stop and tell me the smallest safe next step.

End with: sources actually supplied, unknowns, and one question I should answer
before continuing.
~~~

이 카드는 출처의 존재·최신성·공정한 표현·주장 뒷받침, 사실의 정확성·완전성, 학술적
품질, 법적 충분성, 안전한 결정을 증명하지 않는다. 생성된 URL·인용·요약·표·확신 표현도
그 자체로 증거가 아니다.

## 7일 언어 학습의 경계

7일 안에 스페인어 또는 다른 언어를 배울 수 있다는 주장도, 배울 수 없다는 주장도 하지 않는다.
그런 주장을 하려면 학습자 기준선, 목표 능력, 연습·도움 기록, 평가 과제, 채점 기준, 독립 채점자,
보존 기간, 전이 조건이 필요하지만 이 기록에는 없다.

매일 7번 채팅하거나 카드 한 장씩 수행했다고 해서 유창함, 수준, 보존, 독립 대화, LLM의 인과 효과가
증명되지 않는다. 공식 프롬프트 안내와 개인 보고 두 건도 이 증거 공백을 채우지 않는다.

## 아직 확인되지 않은 것

두 카드가 학습·연구·프롬프트 능력을 높이는지, 명명된 제품이 같은 방식으로 따르는지, 답변·수정·인용·요약이
정확한지, 제품이 학습자 평가·출처 확인·고위험 결정을 안전하게 하는지 확인되지 않았다. U1/U2가 흔하고
현재도 유효하며 제품이 원인이고 이 계약이 해결하는지도 모른다. 5분 소요, 7일 결과, 학습자 시험,
독립 검토, 보안 평가, 운영 승인도 기록되지 않았다.

## 출처·재사용·라이선스 경계

Prysai Lab이 직접 작성한 종합 기록이다. 계약과 두 카드는 이 기록을 위해 만들었으며 외부 프롬프트,
공급자 예시, 포럼 문장, 평가 문항, 코드, 화면, 이미지, 로고, 자격 증명, 사용자 데이터를 복사하지 않았다.
외부 자료는 링크하고 짧게 바꾸어 말했을 뿐이며 조건·라이선스·제품 범위·이용 가능성은 각 소유자에게 있고 바뀔 수 있다.
제품별로 적용하려면 대상 표면의 최신 문서와 약관을 다시 확인한다.

## 출처 대장

| ID | 분류 | 출처와 확인일 | 제한된 용도 | 담당 / 다음 검토 | 증명하지 않는 것 |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | OpenAI [*Prompt engineering*][O1], 2026-08-13 | 지시·문맥·예시·평가 안내 | facts-maintainer / 2026-09-13 | 다른 제품, 정확성, 학습 효과 |
| O2 | official fact | Anthropic [*Prompt engineering overview*][O2], 2026-08-13 | 성공 기준과 경험적 테스트 | facts-maintainer / 2026-09-13 | 다른 제품, 효과, 학습 결과 |
| O3 | official fact | Google [*Prompt design strategies*][O3], 2026-08-13 | 명확하고 구체적인 지시·예시 | facts-maintainer / 2026-09-13 | 다른 제품, 출처 정확성, 언어 결과 |
| O4 | official fact | Microsoft Learn [*Prompt engineering techniques*][O4], 2026-08-13 | 지시·주요 콘텐츠·예시 | facts-maintainer / 2026-09-13 | 모델 동일성, 연구 품질 |
| O5 | official fact | Meta [*Prompt engineering*][O5], 2026-08-13 | Llama 프롬프트 안내 | facts-maintainer / 2026-09-13 | 다른 제품, 정확성, 초보자 결과 |
| U1/U2 | public user report | OpenAI Community, 위의 게시/확인일 | 한 사람의 목표와 워크플로 고민 | curriculum-maintainer / 2026-09-13 | 일반성, 한도, 원인, 해결 |
| P1 | project inference | 이 계약과 두 카드 | 제품 중립적인 첫 요청 점검 | curriculum-maintainer / `not_run` | 동일성, 정확성, 효과, 시간 |
| L1 | local reproduction | 없음; `not_run` | 실행하지 않음 | curriculum-maintainer / `not_run` | 어떤 결과든 |
| C1 | community suggestion | 보존하지 않음 | 좁은 결론에 불필요 | curriculum-maintainer / `not_run` | 수요, 모범 사례, 효과 |

## 중단 기록과 남은 증거 공백

서로 다른 조직의 공식 안내 다섯 개와 날짜·추적이 가능한 공개 보고 두 개를 확인한 뒤 중단했다.
계정을 사용하지 않았고, 모델을 호출하지 않았고, 개인정보를 모으지 않았고, 제품을 비교하지 않았다.

초보자가 카드를 이해하는지, 5분 안에 끝내는지, 제품 표면이 같은 문구를 받아들이는지, 답변과 수정이
정확한지, 세션 밖에서 연습이 유지·전이되는지는 남은 질문이다. 미래 평가는 승인된 프로토콜,
명시된 과제와 환경, 동의와 데이터 경계, 기록된 제품 조건, 독립 검증을 필요로 한다.

[O1]: https://developers.openai.com/api/docs/guides/prompt-engineering
[O2]: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
[O3]: https://ai.google.dev/gemini-api/docs/prompting-strategies
[O4]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering
[O5]: https://www.llama.com/docs/how-to-guides/prompting/
[U1]: https://community.openai.com/t/learn-languages-at-the-same-time/1040799
[U2]: https://community.openai.com/t/long-instruction-prompt-on-short-input-data/837381
