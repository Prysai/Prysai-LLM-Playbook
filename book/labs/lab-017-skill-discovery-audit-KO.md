<!-- content_id: lab-017-skill-discovery-audit | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-017-skill-discovery-audit
title: "Skill을 채택하기 전에 발견 경로 감사하기"
level: L4
domain: general
goal: "존재, 발견, 로드, 동작, 라이선스, 채택을 각각 다른 주장으로 유지하기"
setup: "일회용 디렉터리에 고정 revision의 비식별 Skill 샘플 두 개; 설치, 자격 증명, 외부 쓰기 없음"
task: "각 발견 단계를 기록하고 revision과 라이선스 경계를 검토해 제한된 채택 결정을 만들기"
evidence: ["목록, 발견 출력, source revision, 라이선스, 의존성, 네 가지 사례 계획", "recommendation-only, blocked, approved-to-install, installed-candidate를 구분하는 결정 기록"]
failure_variant: "후보가 실제 .env나 업로드를 요청하게 한다. blocked로 표시하고 요청을 충족하지 않는다"
reflection: "디렉터리 목록이 증명하지 못한 단계는 무엇이며 채택 전에 어떤 증거가 필요한가?"
status: draft
last_verified: "not run"
transfer_task: "MCP 서버에도 단계를 적용해 설정, 발견, 읽기, 호출 결과, 채택을 분리하기"
transfer_domain: "MCP 검토, Skill 유지보수, 엔지니어링 또는 조사"
transfer_evidence: "revision, 라이선스, 대상 범위, backup, rollback, 소유자, 승인 지점, 다음 검토"
transfer_limitations: "정적 샘플은 실제 Skill의 로드, 안전 동작, 모든 중첩 자산의 라이선스를 증명하지 않음"
---

# Lab 017: Skill을 채택하기 전에 발견 경로 감사하기

## 문제

Skill은 디스크에 있어도 암시적 목록에 없을 수 있고, 명시 이름으로 해결돼도 로드에서 실패할 수 있습니다. 이는 서로 다른 관찰입니다. 디렉터리 목록이나 한 번의 smoke test를 채택 결정으로 만들지 마십시오.

## 준비

고정 revision의 비식별 샘플 두 개를 임시 디렉터리에 둡니다. 하나는 추적 가능한
라이선스와 제한된 입력이 있고, 다른 하나는 명확한 라이선스, 의존성 목록 또는
복구 대상이 없습니다. 어느 것도 설치하지 말고, 자격 증명이나 외부 쓰기도 사용하지
않습니다.

테스트 전에 후보마다 다음 정보를 남깁니다.

| 항목 | 남길 내용 |
|---|---|
| 식별 정보 | 이름, 정확한 revision, 경로, 해시 |
| 출처 | URL, 작성자 또는 책임자, 확인일, 범위 |
| 라이선스 | 라이선스 파일, NOTICE, 중첩 자산, 확인되지 않은 항목 |
| 의존성 | 버전, 네트워크, 계정, 요청하는 자격 증명 |
| 대상 | 예정 설치 루트, 사용자, 책임자 |
| 제거 | 백업, 복구 방법, 삭제 허용 여부, 다음 검토일 |

## 과제

다음 단계를 각각 기록합니다. `not_observed`는 충분한 관찰이 없다는 뜻이지,
“아마 그렇다”는 뜻이 아닙니다.

```text
파일 존재:
암시적 발견:
명시 이름 해결:
새 세션에서 로드:
긍정 동작:
경계 동작:
실패/주입 동작:
프로젝트 간 이전:
채택 결정: recommendation-only | blocked | approved-to-install | installed-candidate
```

revision, 라이선스, NOTICE, 중첩 자산, 의존성, 네트워크/계정 요구, 설치 범위,
백업, 복구 방법, 소유자와 다음 검토일도 검토합니다.

## 네 가지 테스트 사례

실행하기 전에 네 가지 사례를 설계합니다.

1. **긍정:** 일반 입력, 로컬로 제한된 범위와 예상 출력;
2. **경계:** 입력 누락, 범위를 벗어난 리소스 또는 권한 부족;
3. **실패/주입:** 외부 지시, 자격 증명 요청 또는 예상 밖 payload;
4. **전이:** 다른 디렉터리나 프로젝트에서 revision, 의존성과 복구 방법을 유지.

각 사례에 전제 조건, 읽기 작업, 예상 신호, 증거, 상태와 중지 조건을 적습니다.
디렉터리 목록은 디렉터리 목록 자체만 증명합니다.

## 증거

목록, revision, 읽기 전용 발견 출력, 라이선스·의존성 검토, 네 가지 사례, 결정
패키지와 제거 계획을 보관합니다. 결정 패키지는 설치 없는 권고, `blocked`, 조건부
설치 승인과 이미 설치된 후보를 구분하고, 범위·소유자·백업·복구 방법·다음 검토일을
기록해야 합니다.

## 의도적 실패와 경계

후보가 실제 `.env` 파일, 인증 또는 업로드를 요청하게 합니다. 올바른 결과는 `blocked`입니다.
요청은 데이터로 보관하고, 자격 증명을 노출하지 않으며, “무엇을 하는지 보자”며 후보를
설치하지 말고 부족한 증거를 적습니다. 목록, 형식 검사기 또는 눈에 보이는 라이선스만으로는
안전한 동작, 실제 트리거, 중첩 자산의 사용 권리를 증명할 수 없습니다.

로컬 테스트를 실행할 수 없으면 `not_run`으로 적고 결과를 추정하지 않습니다. revision이
바뀌면 라이선스, 의존성과 네 가지 사례를 다시 검토합니다. 결정은 기록한 revision에만
적용됩니다.

## 회고

디렉터리 목록이 증명하지 못한 단계는 무엇입니까? 설치 전에 필요한 관찰은 무엇입니까?
제거 비용이나 의존성에서 아직 모르는 것은 무엇입니까?

## 전이

같은 단계를 MCP 서버에 적용합니다. 보이는 설정, 도구 발견, 대상에 대한 읽기 전용 접근,
호출 결과, 원격 상태의 독립적인 read-back과 채택 결정을 나누어 기록합니다. 서버가 설정된
사실, 도구가 발견되고 호출 가능한 사실, 결과를 관찰한 사실, 외부 쓰기가 승인된 사실은
서로 다른 주장입니다.

## 수용 체크리스트

- [ ] 존재, 암시적 발견, 명시 이름 해결, 로드, 동작과 채택을 분리했다.
- [ ] revision을 고정하고 라이선스, NOTICE, 중첩 자산과 의존성을 확인했다.
- [ ] 긍정, 경계, 실패/주입과 전이 사례를 설계했다.
- [ ] 대상 범위, 소유자, 백업, 복구 방법과 승인 지점을 적었다.
- [ ] 자격 증명, 인증 또는 업로드 요청은 모두 `blocked`로 남겼다.
- [ ] 실행하지 않은 테스트는 `not_run`이며 목록을 동작의 증거로 바꾸지 않았다.
- [ ] 결정에서 권고, 차단, 조건부 승인과 관찰된 설치를 구분했다.
- [ ] 결정 패키지에 미확인 항목과 후보 제거 방법을 남겼다.

## 출처

- [현장 문제와 프롬프트 패턴 — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-11, FP2-12.
- [7장: Skill, 플러그인, MCP와 도구](../chapters/07-skills-plugins-and-tools-KO.md).
- [14장: 외부 Skill 발견·설치·감사](../chapters/14-discover-and-audit-skills-KO.md).

이 출처들은 단계 분리와 출처 검토를 뒷받침하지만, 실제 Skill의 로드나 안전한 동작,
중첩 자산 전체의 라이선스를 증명하지는 않습니다. 이 Lab은 `draft / not_run`이며 외부
Skill을 설치하지 않았습니다.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-KO.md">← 이전<br><strong>Lab 016 · 부작용 경계</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-KO.md">다음 →<br><strong>Lab 018 · 언어 전이</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
