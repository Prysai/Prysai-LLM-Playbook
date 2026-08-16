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

## 준비와 작업

고정 revision의 비식별 샘플 두 개를 사용합니다. 하나는 추적 가능한 라이선스와 제한된 입력이 있고, 다른 하나는 명확한 라이선스, 의존성 목록, rollback 대상이 없습니다. 어느 것도 설치하거나 자격 증명을 쓰지 않습니다. 다음 단계를 각각 기록합니다.

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

모르는 것은 `not_observed`로 씁니다. revision, 라이선스, NOTICE, 중첩 자산, 의존성, 네트워크/계정 요구, 설치 범위, backup, rollback, 소유자, 다음 검토일을 검토합니다.

## 실패, 전이, 수용

후보가 실제 `.env`나 업로드를 요청하게 합니다. 올바른 결과는 `blocked`이며, «성공» 시연을 위해 요청을 들어주지 않습니다. 목록, 결정 패키지, 읽기 전용 발견 출력, 긍정ㆍ경계ㆍ실패/주입ㆍ이전 계획을 보관합니다.

- [ ] 존재, 발견, 로드, 동작, 채택을 분리했다.
- [ ] revision을 고정하고 라이선스 경계를 점검했다.
- [ ] 긍정, 경계, 실패/주입, 이전 사례를 설계했다.
- [ ] 대상 범위, backup, rollback, 소유자, 승인 지점을 적었다.
- [ ] 후보를 성공처럼 보이게 하려고 설치나 업로드를 하지 않았다.

MCP에서는 보이는 설정, 도구 발견, 읽기 전용 대상 접근, 호출 결과, 외부 read-back, 채택을 구분합니다. 이 Lab은 `draft / not_run`이며 샘플은 실제 Skill의 안전성이나 완전한 라이선스를 증명하지 않습니다.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-KO.md">← 이전<br><strong>Lab 016 · 부작용 경계</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-KO.md">다음 Lab 준비 중 →<br><strong>Lab 018 제공 상태 보기</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
