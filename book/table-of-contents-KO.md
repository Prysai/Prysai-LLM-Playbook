<!-- content_id: book-table-of-contents | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: dd08a68 -->

# Codex: From First Task to Real Work — 책 목차 v0.2

> 한국어 목차 페이지(`KO`)입니다. 기존
> `book/table-of-contents.md`를 바탕으로 22개 장, 13개 실험, 상태 경계와
> 실제 문제 연구 입구를 유지합니다. 장·실험 본문이나 런타임 검증이 이미
> 6개 언어로 모두 이관되었다는 뜻은 아닙니다.

## 이관 상태와 링크 규칙

- 이 페이지의 `content_status`는 `candidate`이고 원본 리비전은 `dd08a68`입니다.
- 22개 장 기록과 13개의 실제 실험 파일을 모두 유지합니다.
- 장은 `candidate`, 실험은 `draft`이며 `run_status: not_run`입니다.
- 6장의 관련 변동 주장 상태는 `claim_status: disputed`, 22장은
  `claim_status: current | disputed`입니다.
- 이미 존재하는 한국어 입구는 `-KO` 파일로 연결합니다. 1장과 lab-011에는
  `-KO` 파일이 있습니다. 나머지 장과 실험은 이관 중이며 링크 문구에 그 상태를
  명시합니다. 공유 거버넌스·평가·연구 문서는 `locale-neutral`로 표시합니다.
- 다른 언어로 조용히 fallback하지 않습니다. 현지화된 대상이 없으면 링크
  자체에 이관 상태를 표시합니다.

## 읽기 입구

- [한국어 프로젝트 입구](../README-KO.md)
- [한국어 책 입구](README-KO.md)
- [한국어 서문](preface-KO.md)
- [학습 경로 계약 — locale-neutral](../docs/governance/learning-path.yaml)
- [로케일 매트릭스 — locale-neutral](../docs/governance/locale-matrix.yaml)

## 제1부: GPT 이해에서 첫 안전한 사용까지

### 1장 — Codex의 작동 방식을 이해하기 전에 GPT를 이해하기

모델이 컨텍스트에서 어떻게 생성하는지, Codex가 모델을 작업 환경에 연결하는지,
그리고 컨텍스트·도구·Skill·권한·관찰 가능한 Agent 루프가 결과에 어떤 영향을
주는지 설명합니다. **content_status:** `candidate`

- 장: [1장 · KO 소스](chapters/01-gpt-and-codex-KO.md)
- 실험: [lab-011 · KO 소스](labs/lab-011-gpt-codex-boundaries-KO.md)

### 2장 — 첫 번째 안전하고 검증 가능한 작업 완료하기

저위험 작업을 고르고, 첫 작업 프로토콜을 작성하고, 확인 지점을 설정하고,
인계 증거를 남깁니다. **content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/02-first-safe-task.md)
- 실험: [lab-001 · 이관 중 · 현재 원본 경로](labs/lab-001-first-safe-task.md)

### 3장 — 바람을 작업 프로토콜로 바꾸기

목표, 배경, 입력, 제약, 허용된 행동, 수용 기준, 실패 처리와 전달 형식을
정의합니다. **content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/03-task-protocol.md)
- 실험: [lab-002 · 이관 중 · 현재 원본 경로](labs/lab-002-task-protocol.md)

### 4장 — 컨텍스트, 권한과 Agent의 행동 경계

컨텍스트 계층, 신뢰 경계, sandbox, 승인, 외부 부작용과 관찰 가능한 행동을
다룹니다. **content_status:** `candidate`

- 장: [4장 · KO 소스](chapters/04-context-permissions-and-agent-KO.md)
- 실험: [Lab 007 · KO 소스](labs/lab-007-action-boundaries-KO.md)

### 5장 — 올바른 Codex 작업면 선택하기

데스크톱 앱, CLI, IDE, Cloud, Remote 등 작업 진입점을 과제에 맞게 선택하는
방법을 다룹니다. **content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/05-choose-the-codex-surface.md)
- 실험: [Lab 007 · KO 소스](labs/lab-007-action-boundaries-KO.md)

### 6장 — 모델 선택은 모델 숭배가 아니다

작업 세트, 비용, 속도, 안정성, 검증으로 모델을 비교하고 모델 포지셔닝에 대한
가정을 검증합니다. **content_status:** `candidate` · 관련 변동 주장:
`claim_status: disputed`

- 장: [이관 중 · 현재 원본 경로](chapters/06-model-selection.md)
- 연구: [OpenAI/Codex 기준선 — locale-neutral 연구](../docs/research/openai-codex-baseline.md)

## 제2부: 사용자에서 워크플로 설계자로

### 7장 — Skill, Plugin, MCP와 도구의 역할 나누기

방법·연결·실행·배포 계층을 이해하고 가장 작은 유효 능력 조합을 선택합니다.
**content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/07-skills-plugins-and-tools.md)
- 실험: [lab-004 · 이관 중 · 현재 원본 경로](labs/lab-004-skill-selection.md)

### 8장 — 정의에서 전달까지의 전체 수명 주기

정의, 계획, 구축, 검증, 리뷰, 전달과 유지보수를 다루며 검증 가능한 수직
슬라이스로 진행합니다. **content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/08-full-lifecycle-workflow.md)
- 주 실험: [lab-013 · 이관 중 · 현재 원본 경로](labs/lab-013-l3-vertical-slice.md)
- 지원 실험: [lab-009 · 이관 중 · 현재 원본 경로](labs/lab-009-engineering-lifecycle.md)

### 9장 — 검증, 의심과 복구

완료 주장을 주장과 증거로 나누고, 불확실성·실패·복구를 처리합니다.
**content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/09-verification-and-recovery.md)
- 실험: [lab-003 · 이관 중 · 현재 원본 경로](labs/lab-003-evidence-review.md)

### 10장 — 계획과 수직 슬라이스

큰 목표를 의존성이 분명하고 실행·검사 가능한 전달 슬라이스로 나눕니다.
**content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/10-planning-and-slicing.md)
- 실험: [lab-002 · 이관 중 · 현재 원본 경로](labs/lab-002-task-protocol.md) · [lab-013 · 이관 중 · 현재 원본 경로](labs/lab-013-l3-vertical-slice.md)

### 11장 — 정말 유용한 Skill 설계하기

트리거 경계, 점진적 공개, 리소스, 스크립트, 출력, 실패 예시, 평가와 버전을
다룹니다. **content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/11-designing-a-skill.md)
- 실험: [lab-005 · 이관 중 · 현재 원본 경로](labs/lab-005-design-a-skill.md)

### 12장 — Agent 루프, 상태와 정지 조건

관찰, 계획, 행동, 피드백, 재시도, 확인과 정지를 다루며 숨은 추론을 지어내지
않고 행동을 설명합니다. **content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/12-agent-loop-and-stop.md)
- 실험: [lab-006 · 이관 중 · 현재 원본 경로](labs/lab-006-agent-stop-conditions.md)

### 13장 — 파일·터미널·브라우저·GitHub의 행동 경계

읽기 전용 점검, 편집, 명령, 브라우징, 커밋, 푸시, 외부 메시지와 롤백을
다룹니다. **content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/13-action-boundaries.md)
- 실험: [Lab 007 · KO 소스](labs/lab-007-action-boundaries-KO.md)

## 제3부: Skill, 도구와 전문 실무

### 14장 — 외부 Skill 발견, 설치와 감사

인덱스에서 신뢰할 수 있는 능력으로 나아가기 위해 출처, 라이선스, 의존성,
인증, 트리거와 유지보수를 확인합니다. **content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/14-discover-and-audit-skills.md)
- 실험: [lab-004 · 이관 중 · 현재 원본 경로](labs/lab-004-skill-selection.md) · [lab-005 · 이관 중 · 현재 원본 경로](labs/lab-005-design-a-skill.md)

### 15장 — 연구 트랙: 질문에서 감사 가능한 지식으로

연구 질문을 좁히고 출처, 인용, 방법, 재검토, 공개와 완전성을 다룹니다.
**content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/15-research-track.md)
- 실험: [lab-008 · 이관 중 · 현재 원본 경로](labs/lab-008-research-question.md)

### 16장 — 엔지니어링 트랙: 아이디어에서 신뢰할 수 있는 소프트웨어로

요구사항, 사양, 계획, 점진적 구현, 테스트, 디버깅, 리뷰, 출시와 마이그레이션을
다룹니다. **content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/16-engineering-track.md)
- 실험: [lab-009 · 이관 중 · 현재 원본 경로](labs/lab-009-engineering-lifecycle.md)

### 17장 — 마케팅 트랙: 제품 이해에서 성장 실험으로

제품 컨텍스트, 대상, 포지셔닝, 콘텐츠, 전환, 측정과 기여 분석을 다룹니다.
**content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/17-marketing-track.md)
- 실험: [lab-010 · 이관 중 · 현재 원본 경로](labs/lab-010-product-context.md)

### 18장 — 콘텐츠·디자인·데이터·자동화 트랙

모든 Skill을 무작정 설치하지 않고 작업 능력 묶음별로 외부 생태계를 사용합니다.
**content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/18-content-design-data-automation.md)
- 실험: [lab-004 · 이관 중 · 현재 원본 경로](labs/lab-004-skill-selection.md)

## 제4부: 숙련된 사용에서 조직화로

### 19장 — 모델과 워크플로 평가하기

작업 세트를 만들고, 실험을 반복하고, 사람이 점수화하고, 오류를 분류합니다.
**content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/19-evaluate-models-and-workflows.md)
- 실험: [lab-003 · 이관 중 · 현재 원본 경로](labs/lab-003-evidence-review.md) · [lab-009 · 이관 중 · 현재 원본 경로](labs/lab-009-engineering-lifecycle.md)
- 평가 프레임워크: [locale-neutral 거버넌스](../docs/quality/evaluation-framework.md)

### 20장 — 개인 Codex 작업 시스템 만들기

프로젝트 컨텍스트, 메모리, 템플릿, 자주 쓰는 워크플로와 회고를 다룹니다.
**content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/20-personal-codex-work-system.md)
- 실험: [lab-001 · 이관 중 · 현재 원본 경로](labs/lab-001-first-safe-task.md) · [lab-010 · 이관 중 · 현재 원본 경로](labs/lab-010-product-context.md)

### 21장 — 팀 역량 시스템 만들기

공유 Skill, `AGENTS.md`, 권한, 평가, 리뷰, 기여와 버전을 다룹니다.
**content_status:** `candidate`

- 장: [이관 중 · 현재 원본 경로](chapters/21-team-capability-system.md)
- 실험: [lab-012 · 이관 중 · 현재 원본 경로](labs/lab-012-team-capability-migration.md)

### 22장 — 지속적인 업데이트와 미래 대응

변동 사실을 식별하고, 출처를 업데이트하고, 모델을 이관하고, 도구를 감사하고,
오래된 능력을 제거합니다. **content_status:** `candidate` · 관련 변동 주장:
`claim_status: current | disputed`

- 장: [이관 중 · 현재 원본 경로](chapters/22-continuous-update-and-future-proofing.md)
- 실험: [lab-008 · 이관 중 · 현재 원본 경로](labs/lab-008-research-question.md) · [lab-010 · 이관 중 · 현재 원본 경로](labs/lab-010-product-context.md)

## 실험 인덱스와 상태 경계

저장소에는 실제 실험 파일 13개가 있습니다. 모두 `draft`이고
`run_status: not_run`입니다. 목차 링크는 읽기 입구일 뿐, 실험이나 학습
성과가 검증되었다는 증거가 아닙니다.

| 실험 | 초점 | 상태 | 입구 |
|---|---|---|---|
| lab-001 | 첫 안전 작업 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-001-first-safe-task.md) |
| lab-002 | 작업 프로토콜 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-002-task-protocol.md) |
| lab-003 | 증거 검토 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-003-evidence-review.md) |
| lab-004 | Skill 선택 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-004-skill-selection.md) |
| lab-005 | Skill 설계 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-005-design-a-skill.md) |
| lab-006 | Agent 정지 조건 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-006-agent-stop-conditions.md) |
| lab-007 | 행동 경계 | `draft` · `not_run` | [KO 소스](labs/lab-007-action-boundaries-KO.md) |
| lab-008 | 연구 질문 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-008-research-question.md) |
| lab-009 | 엔지니어링 수명 주기 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-009-engineering-lifecycle.md) |
| lab-010 | 제품 컨텍스트 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-010-product-context.md) |
| lab-011 | GPT, Codex, 도구와 Agent | `draft` · `not_run` | [KO 소스](labs/lab-011-gpt-codex-boundaries-KO.md) |
| lab-012 | 팀 역량 이관 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-012-team-capability-migration.md) |
| lab-013 | 감사 가능한 L3 수직 슬라이스 | `draft` · `not_run` | [이관 중 · 현재 원본](labs/lab-013-l3-vertical-slice.md) |

## 평가, 상태와 실제 문제 연구

- [실험 인덱스 — 이관 중 · 현재 원본](labs/README.md): 실제 실험 13개, 레벨, 분야, 이관 초점과 `lab_status`.
- [콘텐츠 통합 매트릭스 — locale-neutral 거버넌스](../docs/content-matrix.md): 능력 매핑과 주제가 반복될 때 추가되는 능력.
- [평가 프레임워크 — locale-neutral 거버넌스](../docs/quality/evaluation-framework.md): 콘텐츠와 능력의 수용 기준.
- [학습 경로 계약 — locale-neutral 거버넌스](../docs/governance/learning-path.yaml): 레벨, 주 실험, 지원 실험과 승급 조건.
- [Codex 실제 사용자 문제 연구 — locale-neutral 연구](../docs/research/field-problems-codex.md): 공식 원인으로 가장하지 않는 공개 문제 입구.
- [실제 문제 연구 인덱스 — locale-neutral 연구](../docs/research/field-problems-index-2026-08-10.md): FP, FP-S, FUP, 포럼 발견과 장·실험 위치를 매핑합니다.
- [포럼과 공개 issue 연구 — locale-neutral 연구](../docs/research/field-problems-forums-2026-08-10.md): 신뢰할 수 있는 Stack Overflow API/페이지와 GitHub issue 요약.
- [공식 기준선 연구 아카이브 — locale-neutral 연구](../docs/research/openai-codex-baseline.md): 변동 주장에 대한 출처 경계.

L0, L3, L6의 독립 주 실험은 [lab-011 · KO 소스](labs/lab-011-gpt-codex-boundaries-KO.md), [lab-013 · 이관 중](labs/lab-013-l3-vertical-slice.md), [lab-012 · 이관 중](labs/lab-012-team-capability-migration.md)입니다.
