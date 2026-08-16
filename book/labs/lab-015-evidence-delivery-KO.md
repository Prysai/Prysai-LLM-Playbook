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

## 문제

명령은 실행돼도 출력이 숨겨지거나 잘리거나 다른 작업 디렉터리에 붙거나 주장에 비해 너무 약할 수 있습니다. «완료»를 주장-증거 기록으로 바꿉니다.

## 준비와 작업

일회용 텍스트 변경, 집중 검사, 의도적으로 하지 않는 검사를 만듭니다. 출처 주장, 검사 주장, 실행 또는 사용자 효과 주장이 있는 비식별 인수인계를 준비합니다. 실제 서비스나 사용자 데이터는 사용하지 마십시오. 각 주장에 다음을 기록합니다.

```text
주장:
범위:
명령 또는 관찰:
작업 디렉터리:
종료 코드 / 결과:
저장 출력:
상태: verified | partial | unverified | blocked | not_run
최소 다음 검사:
```

두 번째 검토자나 새 세션이 증거가 없거나 범위를 넘거나 다른 행에서 추론된 주장을 거절하게 합니다.

## 실패와 경계 연습

출력 파일을 없애고 인수인계에는 명령 이름만 둡니다. 올바른 상태는 `unverified` 또는 `not_run`이지 «아마 통과»가 아닙니다. 네트워크 없이 터미널 표시보다 긴 텍스트를 파일에 저장하고, 도구 호출 전 BMP와 비BMP 문자열을 비교하고, 파일 시스템이 허용할 때 긴 일반 테스트 파일명을 쓰는 경계를 모델링할 수 있습니다. 로컬 fixture는 다른 제품 문제를 재현했다는 증거가 아닙니다.

## 수용과 전이

- [ ] 모든 완료 문장을 범위가 있는 주장으로 나눴다.
- [ ] 명령에 경로, 출력, 종료 코드가 있다.
- [ ] 누락 증거를 명시했다.
- [ ] 나중 성공이 이전 미지 상태를 덮어쓰지 않는다.
- [ ] 인수인계에 다음 검사와 중단 조건이 있다.

정적 사이트에서는 소스 존재, build, 브라우저 렌더, 스크린샷 검토, 공개 URL 도달을 구분합니다. 이 Lab은 `draft / not_run`입니다. 소스 검사는 시각 실행이나 사용자 수용을 증명하지 않습니다.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Lab 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-KO.md">← 이전<br><strong>Lab 014 · 재개 조정</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-KO.md">다음 →<br><strong>Lab 016 · 부작용 경계</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
