<!-- content_id: platform-adapter-guide-route | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# LLM 플랫폼 선택하기: 핵심은 같고, 어댑터는 하나씩

**상태:** `candidate`. **실행 상태:** `not_run`.

ChatGPT, Claude, Gemini, DeepSeek, Grok, Codex 모두 대화로 당신에게 응답하지만,
같은 제품은 아닙니다. 이 루트는
[Universal Core Foundations 루트](universal-core-foundations-KO.md)에서
재사용 가능한 핵심을 유지한 채, 플랫폼별 어댑터를 한 번에 하나씩 추가합니다:
플랫폼별로 실제로 무엇이 다른지, 각 플랫폼에서 오늘 안전하게 시도할 수 있는
것이 무엇인지, 그리고 플랫폼 특정 주장을 신뢰하기 전에 공식 출처에서
반드시 확인해야 할 것이 무엇인지.

Playbook의 대표 실습 트랙은 Codex이지만, 이 방법은 한 벤더에 묶여 있지
않습니다. 아래에 이름을 올린 각 플랫폼은 **후보 어댑터(candidate adapter)**입니다:
보편 핵심은 적용되며, 플랫폼별 제어 항목은 각각 날짜가 찍힌 1차 출처가
확보되어야 교재의 사실이 될 수 있습니다.

## 규칙 제로: 이름만으로 동등함을 추론하지 말 것

모델 이름, 로그인, 익숙한 버튼 하나가 두 플랫폼이 도구, 권한, 메모리, 계정,
가격, 데이터 통제, Agent 동작을 공유한다는 증거는 아닙니다. 플랫폼 주장을
반복하기 전에 세 가지 질문을 하십시오:

1. **정확히 어느 제품 표면인가** (웹 채팅, 앱, CLI, IDE, API, 에이전트)?
2. **어떤 1차 출처가 언제 확인되었으며, 오늘도 여전히 사실이라고 말할 수 있는가?**
3. **주장이 틀렸다면 무엇이 눈에 띄게 달라지는가?**

세 질문에 모두 답할 수 없다면 해당 주장을 `unknown`으로 두고 다음 확인
시점을 기록하십시오. 이 규칙 뒤에 있는 유지보수 방법은
[Platform Adapter Review Skill(locale-neutral)](../../skills/prysai-platform-adapter-review/SKILL-KO.md)과
[Platform Fact Watch(locale-neutral)](../../skills/prysai-platform-fact-watch/SKILL-KO.md)를 참고하십시오.

## 한 페이지 플랫폼 지도

| 플랫폼 | 대표 표면 | 핵심과 주로 다른 점 | 이 페이지에서 안전한 첫 단계 |
|---|---|---|---|
| ChatGPT | 웹 채팅, 앱, API | 계정 범위, 메모리 설정, 파일 업로드, 브라우징 토글, 공유 링크 | [ChatGPT 첫 과제](#chatgpt-first-task) |
| Claude / Claude Code | 웹 채팅, CLI 에이전트, IDE | 터미널 + 파일 에이전트, 권한 프롬프트, CLAUDE.md 프로젝트 메모리 | [Claude Code 첫 과제](#claude-code-first-task) |
| Gemini | 웹 채팅, 앱, API | Google 계정 범위, Google Workspace 통합, 앱 확장 | [Gemini 첫 과제](#gemini-first-task) |
| DeepSeek | **이 경로의 출처 기록은 API만 다룹니다**; 웹 채팅과 앱은 그 증거 범위 밖입니다 | API 모델 목록, 계정 한도, tool call 제어는 제품별로 다르고 변동됩니다; 정확한 표면의 공식 출처를 확인하십시오 | [DeepSeek 첫 과제](#deepseek-first-task) |
| Grok | 웹 채팅, 앱 | X 계정 연동, 실시간 게시물 접근, 모델 릴리스 주기 | [Grok 첫 과제](#grok-first-task) |
| Codex | 데스크톱, CLI, IDE, 클라우드, API | Playbook의 대표 트랙: 파일, 도구, Skills, Agents, 권한 | [Codex 경로](../routes/first-safe-change-KO.md) |

이 표는 방향 안내이지 동등성의 증거가 아닙니다. 각 행도 수업이 의존하기
전에 그 자체의 최신 출처가 필요합니다. 표면 제공 여부, 가격, 권한 기본값은
자주 바뀌므로 변동성 높은 사실로 취급하십시오.

## 어떤 플랫폼에서든 안전한 첫 과제

선택한 플랫폼에 이 요청을 복사해 넣으십시오. 가상의 자료를 사용하고, 도구를
쓰지 않으며, 계정 데이터도 필요 없습니다. 같은 과제가 어디서나 작동하는
다는 점이 바로 핵심입니다.

```text
결과: 이 가상 동아리 안내문을 새 회원용으로 다시 써 주세요.
자료: "동아리는 화요일 6시에 모입니다. 공책을 가져오세요. 장소는 나중에
확인됩니다."
응답 형태: 두 문장으로 쓰세요. 명시된 모든 사실을 유지하세요. 빠진 세부
사항은 [대괄호] 안에 넣으세요. 그런 다음 보존한 사실을 나열하세요.
확인: 원문과 다시 쓴 결과를 비교하세요. 새로운 시간, 장소, 회비, 연락처,
약속이 등장하면 안 됩니다.
중지: 검색, 전송, 게시를 하지 말고, 알 수 없는 세부 사항을 추정하지 마세요.
```

그런 다음 세 가지를 직접 확인하십시오:

1. 다시 쓴 결과의 모든 문장을 제시된 안내문에서 찾아낼 수 있는가?
2. 응답이 두 문장 제한을 지키고 무엇을 보존했는지 보여 주었는가?
3. `[unknown]`으로 남겨야 할 세부 사항을 추가하지 않았는가?

채팅이 검색, 전송, 게시, 도구 사용을 제안하거나 이 작은 연습에 필요한 것보다
더 많은 자료를 요구하면 중지하십시오. 플랫폼이 그런 동작을 할 수는 있어도,
능력이 있다는 것은 그것을 사용하라는 지시가 아닙니다.

<span id="chatgpt-first-task"></span>

## ChatGPT 첫 과제

어떤 ChatGPT 표면이든 열고 위의 안전한 첫 과제를 실행하십시오. 그런 다음
실제로 관찰할 수 있는 플랫폼 차이 하나를 기록하십시오: 응답이 브라우징,
메모리, 또는 공유 링크를 언급하는가? 추측한 것이 아니라 본 것을 기록하십시오.
ChatGPT 관련 주장은 공식 OpenAI 도움말 페이지를 제품 사실의 기준 출처로
삼아 확인하십시오. 이를 위해 [Source Investigator Skill(locale-neutral)](../../skills/prysai-source-investigator/SKILL-KO.md)을 활용할 수 있습니다.

<span id="claude-code-first-task"></span>

## Claude Code 첫 과제

Claude Code는 터미널 에이전트입니다. 실행한 프로젝트 디렉터리에서 파일을 읽고
편집할 수 있습니다. 무엇이든 실행하기 전에 임시 폴더를 만들고 그곳에서
안전한 첫 과제를 실행하십시오. 권한 프롬프트를 지켜보십시오: 파일을 편집하거나
명령을 실행하기 전에 물어보는가? 이러한 승인 절차가 채팅과 에이전트의 차이를
보여 주며, 동시에 사용자가 선택할 수 있는 지점입니다. 프로젝트 메모리의 경우
Claude Code는
`CLAUDE.md` 파일을 읽습니다. 거기에 쓰인 모든 것은 모델이 따를 수 있는
지시이므로, 프로젝트 규칙처럼 검토하십시오. 자격 증명, 운영 데이터, 또는
[First Safe Change 루트](first-safe-change-KO.md)의 규율을 먼저 완료할 때까지는
자격 증명·운영 데이터·파괴적 명령이 있는 실제 저장소에서 Claude Code를 시작하지
마십시오.

<span id="gemini-first-task"></span>

## Gemini 첫 과제

Gemini 채팅 표면에서 안전한 첫 과제를 실행하십시오. 어떤 계정 범위가
활성화되어 있는지, 앱 확장(Google Workspace, YouTube, Maps)이 UI에
제공되는지 기록하십시오. 확장은 외부 효과입니다: 당신을 대신해 읽거나 쓸 수
있으므로, 확장에 관한 Gemini 수업은 핵심 주제가 아니라 플랫폼 어댑터
주제입니다. 텍스트 전용 연습 과제에는 확장을 활성화하지 마십시오.

<span id="deepseek-first-task"></span>

## DeepSeek 첫 과제

이 페이지에서 다루는 DeepSeek 어댑터의 출처 범위는 **API로 한정됩니다**.
DeepSeek 웹 채팅이나 앱의 제공 여부와 동작, 컨텍스트 창, 가격, 계정 권한을
검증한 내용이 아닙니다. 웹 채팅이나 앱을 사용하려면 그 표면에 해당하는 최신
공식 문서를 따로 확인하고 결과를 별도로 기록하십시오. 이 API 기록은 그
표면의 증거가 아닙니다.

키와 비공개 데이터를 쓰지 않는 첫 과제라면 위의 공통 안전 과제를 사용 권한이
있는 표면에서만 실행하십시오. API 실험을 명시적으로 승인받았다면 먼저
[DeepSeek 공식 API 문서](https://api-docs.deepseek.com/)를
읽고 아래의 API 경계를 따르십시오. 실제로 사용한 모델 이름과 날짜를 기록하고,
API 키·비공개 코드·내부 문서를 채팅이나 요청에 붙여넣지 마십시오.

<span id="grok-first-task"></span>

## Grok 첫 과제

Grok 채팅 표면에서 안전한 첫 과제를 실행하십시오. 계정이 X에 연결되어
있다면 게시물과 실시간 콘텐츠가 대화 범위에 포함될 수 있음을 유의하십시오.
이는 플랫폼의 차이인 동시에 개인정보 보호에 관한 선택입니다. 소셜 그래프에 닿을 수
있는 대화에 비공개 메시지나 초안을 붙여넣지 마십시오. 최신 게시물을 인용하는
Grok 답변은 플랫폼의 검색(retrieval) 동작에 대한 주장이므로, 반복하기 전에
공식 X/Grok 도움말 페이지와 대조하십시오.

## Codex 첫 과제

Codex는 컨텍스트, 도구, 권한, Skills, Agents, 검증이라는 전체 루프를
드러내기 때문에 Playbook의 대표 트랙입니다. 임시 프로젝트에서
[First Safe Change 루트](first-safe-change-KO.md)와
[Lab 001](../labs/lab-001-first-safe-task-KO.md)부터 시작하십시오.
검사 후 편집(inspect-before-edit) 습관이 익숙해지기 전까지 클라우드
표면이나 실제 저장소로 건너뛰지 마십시오.

## 첫 과제 이후: 어떤 트랙을 따라야 하는가?

- 텍스트 전용 입문 연습을 원한다면: [Beginner Practice Pack](../communication-clinic-KO.md).
- 파일과 도구가 있는 심화 대표 트랙을 원한다면: [First Safe Change](first-safe-change-KO.md).
- 먼저 플랫폼 중립 기초를 원한다면: [Universal Core Foundations](universal-core-foundations-KO.md).
- 두 플랫폼을 공정하게 비교하고 싶다면: [LLM Comparison Protocol(locale-neutral)](../../skills/prysai-llm-comparison-protocol/SKILL-KO.md).
- 플랫폼 수업이 커리큘럼에 들어갈 자격이 있는지 알고 싶다면:
  [Platform Adapter Review(locale-neutral)](../../skills/prysai-platform-adapter-review/SKILL-KO.md).

## 증거 상태와 경계

이 루트는 `candidate / not_run`입니다: 구조와 검사 항목은 존재하지만,
학습자 실행, 플랫폼 간 실행, 또는 독립 검토는 기록되지 않았습니다. 위의
플랫폼별 설명은 1차 문서와 확인 날짜를 함께 적은 연구 기록
([cross-LLM beginner prompting source receipt(locale-neutral)](../evidence-library-KO.md#source-notes),
[platform teaching boundary card(locale-neutral)](../evidence-library-KO.md#source-notes),
[DeepSeek API source receipt(locale-neutral)](../evidence-library-KO.md#source-notes))에서
파생된 방향 안내입니다. 이것은 어떤 플랫폼이 동일하게 동작한다거나, 과제가
어디서나 성공한다거나, 제품 기능이 동등하다는 증거가 아닙니다. 플랫폼별
명령, 권한, 가격, 제공 여부는 변동성 높은 사실입니다. 의존하기 전에 접근
날짜와 함께 공식 출처를 확인하십시오.

- [ ] 나는 가상의, 공개된, 또는 허가받은 텍스트만 사용했다.
- [ ] 나는 내 실행의 정확한 표면, 보이는 경우 모델 이름, 날짜를 기록했다.
- [ ] 나는 한 플랫폼의 동작을 다른 플랫폼의 증거로 취급하지 않았다.
- [ ] 나는 비밀, 비공개 메시지, 미공개 파일을 붙여넣지 않았다.
- [ ] 나는 도구, 브라우징, 업로드, 전송, 게시가 제안되었을 때 중지했다.
