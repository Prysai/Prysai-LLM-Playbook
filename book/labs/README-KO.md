<!-- content_id: book-labs-readme | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Prysai LLM Playbook: Lab 목차

<!-- language-switcher:start -->
**언어:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md) | [Français](README-FR.md)
<!-- language-switcher:end -->

Lab은 LLM에게 부탁하는 방식이 실제 일을 더 분명하게 만드는지 직접 확인하는 곳입니다. 서류 작업만
하는 별도 과정도 아니고, Codex Cloud나 프로그래밍을 요구하지도 않습니다. 각 Lab은 답변이 사실을
지키는지, 요청한 형식을 따르는지, 모르는 점을 보이는지, 다른 사람이 검토할 수 있는 변경을 남기는지
같은 눈에 보이는 질문에서 출발합니다.

이것은 전체 Lab 카탈로그의 한국어 입구입니다. 링크는 `-KO` 파일만 열며 알리지 않고 영어로
이동시키지 않습니다. 열여덟 개 파일이 있다는 사실은 독립 언어 검토나 학습자 실행을 뜻하지 않습니다.

## 작은 실습으로 시작하기

막연한 요청과 확인 가능한 요청의 차이를 느끼고 싶다면
[Lab 001: 첫 번째 안전한 과제](lab-001-first-safe-task-KO.md)를 여세요. 버릴 수 있는 프로젝트가
없다면 작업 공간 부분은 건너뛰어도 됩니다. 아무것도 설치하지 않고 재사용할 방법을 고르고 싶다면
[Lab 004: Skill 선택](lab-004-skill-selection-KO.md)으로 이어집니다.

`draft` Lab은 무엇을 시도하고, 무엇을 남기며, 언제 멈출지를 적은 학습 계약입니다. 모든 Codex
환경에서 최근 실행되었다거나 누군가가 이미 배웠다는 증거는 아닙니다.

## 오늘 원하는 결과로 고르기

번호가 가장 작다는 이유만으로 Lab 001부터 시작할 필요는 없습니다. 지금 상황에 맞는 가장 작은
관찰 가능한 결과를 고르세요. 아래의 모든 선택지는 직접 검토할 수 있는 산출물을 남깁니다. 모델이
자신 있게 말한다는 이유만으로 믿을 필요는 없습니다.

| 오늘 하고 싶은 일 | 여기서 시작 | 멈추기 전에 직접 볼 수 있어야 하는 것 |
| --- | --- | --- |
| 코드나 프로젝트 폴더 없이 더 명확한 요청이 도움이 되는지 알아보기 | [Lab 001, 파트 A](lab-001-first-safe-task-KO.md#readme-전에파일-없이-하는-prompt-비교) | 같은 무해한 메모에 대한 두 응답과 짧은 비교 기록 |
| GPT, 작업면, 도구, Agent가 각각 무엇을 하는지 이해하기 | [Lab 011](lab-011-gpt-codex-boundaries-KO.md) | 제안한 행동과 실행 및 확인된 행동을 구분하는 경계 지도 |
| “이것 좀 도와줘”를 다른 사람도 검토할 수 있는 요청으로 바꾸기 | [Lab 002](lab-002-task-protocol-KO.md) | 목표, 출처 경계, 허용 행동, 수용 조건, 중지 조건이 있는 작업 카드 |
| 고정 출처의 조사 답변을 완전한 것처럼 꾸미지 않고 검토하기 | [Lab 008](lab-008-research-question-KO.md) | 출처 목록, 범위를 제한한 결론, 명시한 미확인 목록 |
| 로컬 파일을 아주 작게 변경하기 | [첫 안전 변경](../routes/first-safe-change-KO.md) 뒤 [Lab 001, 작업 공간 부분](lab-001-first-safe-task-KO.md#이-실습의-목적) | 폐기 가능한 복사본 안의 검토한 README diff와 범위를 좁힌 로컬 검사 |

오늘 사용할 수 있는 것이 채팅 창뿐이라면 첫 번째 행으로 충분합니다. 목록을 따라가기 위해 도구를
설치하거나 계정을 만들거나 실제 프로젝트를 사용하지 마세요. 폐기 가능한 폴더, 허용된 하나의 대상,
보관할 증거를 말할 수 있을 때 작업 공간 실습으로 넘어가세요.

## 현재 상태

카탈로그에는 18개의 고정 ID가 있습니다. 모두 `draft`이고 학습자 실행 상태는 `not_run`입니다.
이 한국어 경로에서는 Lab 001–018, 열여덟 개를 열 수 있습니다. 모든 Lab에 자체 한국어 파일이 있으며 이 페이지에서 영어로 연결하지 않습니다.

## 한국어 Lab 지도

| Lab | 역량 | 수준 | 한국어 경로 상태 |
|---|---|---:|---|
| 001 | 첫 요청을 쓸 수 있게 만들기 | L1 | [Lab 001 열기](lab-001-first-safe-task-KO.md) |
| 002 | 과제 프로토콜 | L2 | [Lab 002 열기](lab-002-task-protocol-KO.md) |
| 003 | 증거 검토 | L3 | [Lab 003 열기](lab-003-evidence-review-KO.md) |
| 004 | Skill 선택 | L4 | [Lab 004 열기](lab-004-skill-selection-KO.md) |
| 005 | Skill 설계 | L4 | [Lab 005 열기](lab-005-design-a-skill-KO.md) |
| 006 | Agent 중단 조건 | L5 | [Lab 006 열기](lab-006-agent-stop-conditions-KO.md) |
| 007 | 행동 경계 | L3 | [Lab 007 열기](lab-007-action-boundaries-KO.md) |
| 008 | 조사 질문 | L3 | [Lab 008 열기](lab-008-research-question-KO.md) |
| 009 | 엔지니어링 생명주기 | L3 | [Lab 009 열기](lab-009-engineering-lifecycle-KO.md) |
| 010 | 공유 제품 맥락 | L3 | [Lab 010 열기](lab-010-product-context-KO.md) |
| 011 | GPT와 Codex 경계 | L0 | [Lab 011 열기](lab-011-gpt-codex-boundaries-KO.md) |
| 012 | 팀 역량 이전 | L6 | [Lab 012 열기](lab-012-team-capability-migration-KO.md) |
| 013 | 감사 가능한 수직 슬라이스 | L3 | [Lab 013 열기](lab-013-l3-vertical-slice-KO.md) |
| 014 | 재개 조정 | L3 | [Lab 014 열기](lab-014-resume-reconciliation-KO.md) |
| 015 | 증거를 갖춘 전달 | L5 | [Lab 015 열기](lab-015-evidence-delivery-KO.md) |
| 016 | 부작용 경계 | L3 | [Lab 016 열기](lab-016-side-effect-boundary-KO.md) |
| 017 | Skill 발견 감사 | L4 | [Lab 017 열기](lab-017-skill-discovery-audit-KO.md) |
| 018 | 고정된 연습 계약의 언어 전이 | L2 | [Lab 018 열기](lab-018-language-transfer-KO.md) |

번호는 카탈로그 ID일 뿐, 다음 번호가 필수이거나 다음 수준을 뜻하지 않습니다. 진도는 학습 경로가
정하며 이 목차는 오늘 한국어로 열 수 있는 자료만 보여 줍니다.

## Lab을 안전하게 하는 방법

1. 버릴 수 있는 폴더, 고정된 입력 버전, 실제 자격 증명 없이 시작합니다.
2. 행동하기 전에 Lab의 권한과 부작용 경계를 읽습니다.
3. 기준선, 명령, 출력, 변경, 실패 분기, 모르는 점을 남깁니다.
4. 대상, 권한, 출처, 복구 방법을 확인할 수 없으면 멈춥니다.
5. 원래 실습을 기록한 뒤에만 전이 과제를 합니다.

## 상태의 경계

`draft`는 `candidate`, `verified`, `production-ready`라고 부르기 전에 프로젝트가 정한 증거가 더
필요하다는 뜻입니다. `run_status: not_run`은 이 저장소에 해당 Lab의 학습자 실행 결과가 없다는
뜻입니다. 파일 존재, 페이지 열림, 로컬 링크 검사가 통과했다는 사실은 학습, 모델 동작 또는 다른
환경에서의 효과를 증명하지 않습니다.

## 한국어 경로로 돌아가기

- [한국어 책 입구](../README-KO.md)
- [한국어 책 목차](../table-of-contents-KO.md)
- [초보자 연습 카드](../communication-clinic-KO.md)
