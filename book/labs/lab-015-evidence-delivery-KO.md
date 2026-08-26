<!-- content_id: lab-015-evidence-delivery | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-015-evidence-delivery
title: "완료 문구가 아니라 증거 전달하기"
level: L5
domain: general
goal: "완료 주장을 범위가 있는 증거 기록으로 나누고 최소 다음 검사를 찾기"
setup: "일회용 텍스트 변경, 집중 검사 하나, 의도적으로 빠진 검사 하나, 비식별 인수인계; 실제 서비스나 사용자 데이터 없음"
task: "출처, 검사, 실행 주장을 범위, 명령 또는 관찰, 결과, 저장 출력, 상태, 다음 검사와 함께 기록하기"
evidence: ["주장-증거 표, 원시 명령 출력, diff, 검토 결정", "verified, partial, unverified, blocked, not_run의 명시적 구분"]
failure_variant: "출력 파일을 지우고 인수인계에 명령 이름만 남긴다. unverified 또는 not_run으로 표시"
reflection: "증거보다 넓은 주장은 무엇이고 어느 작은 검사가 그 차이를 닫는가?"
status: draft
last_verified: "not run"
transfer_task: "정적 사이트에 표를 적용해 소스, build, 브라우저, 스크린샷, 공개 URL을 분리하기"
transfer_domain: "웹 게시, 문서, 조사 또는 엔지니어링"
transfer_evidence: "각 주장에 범위, 명령 또는 관찰, 결과, 출력 경로, 한계를 한 행씩 보관"
transfer_limitations: "소스 검사는 시각적 실행, 사용자 수용, 공개 URL 도달을 증명하지 않음"
---

# Lab 015: 완료 문구가 아니라 증거 전달하기

## 이 Lab이 필요한 이유

명령이 실행되어도 출력이 숨겨지거나 잘리거나 다른 작업 디렉터리에 연결되거나,
주장을 뒷받침하기에는 너무 약할 수 있습니다. 이 Lab은 매끄러운 “완료” 문장을
각 주장과 증거를 연결한 기록으로 바꾸는 연습입니다.

## 준비

임시 텍스트 변경, 집중해서 확인할 검사 하나, 의도적으로 빠뜨린 검사 하나를
준비합니다. 출처 주장, 검사 주장, 실행 또는 사용자 영향 주장을 담은 비식별
인수인계를 만듭니다. 실제 서비스나 사용자 데이터는 사용하지 마십시오.

## 과제

각 주장에 대해 다음을 기록합니다.

```text
claim:
scope:
command or observation:
working directory:
exit code / result:
saved output:
status: verified | partial | unverified | blocked | not_run
smallest next check:
```

두 번째 검토자나 새 세션에게 증거가 없거나 범위를 벗어나거나 다른 행에서
추론한 주장만으로 이루어진 항목을 거부하게 합니다.

## 증거

주장 표, 명령의 원시 출력, diff와 검토 결정을 보관합니다. 소스 검사가 통과해도
시각적 실행 결과나 사용자의 수용을 증명할 수 없는 이유가 기록에 드러나야 합니다.

## 실패 변형

출력 파일을 삭제하고 인수인계에는 명령 이름만 남깁니다. 올바른 상태는
`unverified` 또는 `not_run`이지 “아마 통과”가 아닙니다.

## 현장 변형: Windows에서 발생하는 세 가지 증거 단절

[9장](../chapters/09-verification-and-recovery-KO.md)의 공개 보고 세 가지를
참고 사례로 사용합니다. 이 Lab에서 외부 제품 문제를 재현하려 하지 마십시오.
대신 증거의 경계를 모형화하는 안전한 로컬 fixture를 만듭니다.

1. 터미널 창에 표시할 수 있는 양보다 많은 텍스트를 생성하고 같은 내용을 파일에
   저장한 뒤, 저장된 내용과 화면에 보인 내용을 비교합니다.
2. 텍스트 fixture에 BMP와 비 BMP 문자를 넣습니다. 도구를 호출하기 전에 예상
   문자열과 받은 문자열을 비교하고, 다르면 `blocked`로 표시합니다.
3. 파일 시스템이 허용할 때만 긴 일반 테스트 파일명을 사용하는 임시 Git 저장소를
   만듭니다. 경로 길이와 Git 결과를 기록하고, Codex 내부 ref를 만들거나 지우거나
   저장소 설정을 변경하지 않습니다.

각 사례를 주장 표에 한 행으로 남깁니다.

```text
reported symptom:
local fixture:
source URL:
local reproduction: not_run | observed | blocked
last confirmed stage:
first unknown stage:
durable evidence:
safe next check:
stop condition:
```

올바른 결론은 `reference-only`, `not_run` 또는 `blocked`일 수 있습니다. 경계를
모형화한 로컬 fixture는 외부 문제를 재현했다는 증거가 아니며, 공개 보고에서
복사한 workaround도 공식 수정이 아닙니다.

## 전이

같은 표를 정적 웹사이트에 적용합니다. 소스 파일의 존재, 빌드된 artifact,
브라우저 렌더링, 검토한 스크린샷, 접근 가능한 공개 URL을 서로 구분합니다.

## 수용 체크리스트

- [ ] 모든 완료 문장을 범위가 있는 주장으로 나눴다.
- [ ] 명령에 경로, 종료 코드와 저장된 출력이 있다.
- [ ] 누락된 증거를 명시했다.
- [ ] 나중의 성공이 이전의 `unknown`을 덮어쓰지 않는다.
- [ ] 인수인계에 최소 다음 검사와 중단 조건이 있다.

## 회고

증거보다 범위가 넓었던 주장을 하나 고르고, 그 차이를 닫을 최소 검사를 적습니다.

## 출처

- [현장 문제와 프롬프트 패턴 — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-05, FP2-06, FP2-20.
- [9장: 검증, 의심과 복구](../chapters/09-verification-and-recovery-KO.md).

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-KO.md">← 이전<br><strong>Lab 014 · 재개 조정</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-KO.md">다음 →<br><strong>Lab 016 · 부작용 경계</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
