<!-- content_id: book-labs-readme | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Prysai LLM Playbook: Lab 목차

<!-- language-switcher:start -->
**언어:** [English](../README-EN.md) | [简体中文](../README-ZH.md) | [Español](../README-ES.md) | [日本語](../README-JA.md) | [한국어](README-KO.md) | [Deutsch](../README-DE.md)
<!-- language-switcher:end -->

Lab은 LLM에게 부탁하는 방식이 실제 일을 더 분명하게 만드는지 직접 확인하는 곳입니다. 서류 작업만
하는 별도 과정도 아니고, Codex Cloud나 프로그래밍을 요구하지도 않습니다. 각 Lab은 답변이 사실을
지키는지, 요청한 형식을 따르는지, 모르는 점을 보이는지, 다른 사람이 검토할 수 있는 변경을 남기는지
같은 눈에 보이는 질문에서 출발합니다.

이것은 한국어 입구의 번역이지, 모든 Lab이 한국어로 준비되었다는 뜻은 아닙니다. 링크는 `-KO`
파일만 엽니다. 아직 없는 Lab은 상태를 밝히며, 알리지 않고 영어로 이동시키지 않습니다.

## 작은 실습으로 시작하기

막연한 요청과 확인 가능한 요청의 차이를 느끼고 싶다면
[Lab 001: 첫 번째 안전한 과제](lab-001-first-safe-task-KO.md)를 여세요. 버릴 수 있는 프로젝트가
없다면 작업 공간 부분은 건너뛰어도 됩니다. 아무것도 설치하지 않고 재사용할 방법을 고르고 싶다면
[Lab 004: Skill 선택](lab-004-skill-selection-KO.md)으로 이어집니다.

`draft` Lab은 무엇을 시도하고, 무엇을 남기며, 언제 멈출지를 적은 학습 계약입니다. 모든 Codex
환경에서 최근 실행되었다거나 누군가가 이미 배웠다는 증거는 아닙니다.

## 현재 상태

카탈로그에는 18개의 고정 ID가 있습니다. 모두 `draft`이고 학습자 실행 상태는 `not_run`입니다.
이 한국어 경로에서는 Lab 001–009와 011, 열 개를 열 수 있습니다. 나머지는 자체 한국어 파일과 번역
상태 기록이 생기기 전까지 이 페이지에서 영어로 연결하지 않습니다.

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
| 010 | 공유 제품 맥락 | L3 | 아직 한국어 제공 없음 |
| 011 | GPT와 Codex 경계 | L0 | [Lab 011 열기](lab-011-gpt-codex-boundaries-KO.md) |
| 012 | 팀 역량 이전 | L6 | 아직 한국어 제공 없음 |
| 013 | 감사 가능한 수직 슬라이스 | L3 | 아직 한국어 제공 없음 |
| 014 | 재개 조정 | L3 | 아직 한국어 제공 없음 |
| 015 | 증거를 갖춘 전달 | L5 | 아직 한국어 제공 없음 |
| 016 | 부작용 경계 | L3 | 아직 한국어 제공 없음 |
| 017 | Skill 발견 감사 | L4 | 아직 한국어 제공 없음 |
| 018 | 고정된 연습 계약의 언어 전이 | L2 | 아직 한국어 제공 없음 |

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
