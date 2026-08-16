<!-- content_id: chapter-09-verification-and-recovery | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 9장: 검증, 의심, 복구

**상태:** `candidate`. **실험:** `not_run`. 이 장은 완료 주장을 증거와 맞추고 불확실한 작업 흐름을 복구하는 법을 설명합니다. 로컬 재현, 공식 진단, 운영 증거가 아닙니다.

## 문제

Agent는 틀렸거나 범위를 벗어났거나 실행하지 않았거나 잘못된 환경에서 확인한 결과에도 그럴듯한 완료 요약을 쓸 수 있습니다. 맹신이나 끝없는 의심 대신, 요약을 독립 주장으로 나누고 선언한 범위에서 이를 지지할 가장 작은 증거를 붙입니다.

| 주장 | 최소 증거 | 증명하지 않는 것 |
|---|---|---|
| 파일이 바뀌었다 | diff, 경로, hash | 정확성 또는 완전성 |
| 검사가 통과했다 | 명령, 폴더, 종료 코드, 관련 출력 | 다른 환경의 동일 동작 |
| 애플리케이션이 실행된다 | 실제 시작과 핵심 경로 관찰 | 사용자 가치, 보안, 운영 준비 |
| 페이지가 보기 좋다 | viewport를 기록한 렌더 검사 | 완전한 접근성, backend, 전환 |
| 사실이 공식 출처에 있다 | 권위 URL, 접근 날짜, 범위, 검토 담당자 | 이 계정의 접근이나 로컬 설정 |

약한 증거 하나가 나머지 모두를 대신할 수 없습니다. 빌드 통과는 실행을, 캡처는 수요를, 공식 URL은 접근을 증명하지 않습니다.

## 첫 단절을 찾기

```text
요청 → 권한 → 보이는 도구 → 행동 → 결과 → 검토
```

관찰할 수 없는 첫 화살표를 기록합니다. 세션이 가능해도 도구가 등록된 것은 아니며, 실행의 통제권을 되찾아도 의도한 결과가 맞는 것은 아닙니다.

| 상태 | 뜻 |
|---|---|
| `verified` | 선언한 범위에서 증거가 주장을 지지한다 |
| `unverified` | 필요한 증거가 없다; 거짓이라는 뜻은 아니다 |
| `unknown` | 분류할 관찰이 부족하다 |
| `partial` | 일부만 뒷받침된다 |
| `not_observed` | 프로젝트가 관찰을 기록하지 않았다 |
| `error` | 선언한 작업의 실패 증거가 있다 |

## 한 번의 안전한 검사로 복구하기

용량 오류, `Working`에 머무는 명령, 없는 도구, 재설치 제안이 나오면 먼저 diff, 출력, 로그, 마지막 수용 checkpoint를 보관합니다. 그 뒤 대상 검사, 동일 명령의 한 번의 제한된 재시도, 입력 질문, 중지 중 하나만 고릅니다. 검사가 설치, 재시작, 배포, 범위 밖 쓰기를 허가하지는 않습니다.

```text
claim: 모든 테스트가 통과했다
evidence: 테스트 출력 없음
status: unverified
next_check: 고정한 폴더와 revision에서 승인된 명령만 실행
```

## 실험과 경계

정제한 요약, diff, 테스트 출력, 출처 링크, 의도적으로 빠진 증거 하나를 준비합니다. Lab 003으로 주장, 범위, 증거, 상태, 다음 단계를 표로 만들고 출력 없는 “모든 테스트 통과”를 안전한 말투여도 거절합니다. 사실 주장, 실행 주장, 사용자 효과 주장을 하나씩 넣고 약한 증거 하나를 공유할 수 없는 이유를 설명합니다. 운영 서비스에 연결하거나 외부 시스템을 바꾸지 않습니다.

복구가 상태를 다시 관찰 가능하게 해도 자동으로 `verified`가 되지는 않습니다. 이 장은 `candidate`, 실험은 `not_run`입니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-KO.md">← 이전<br><strong>8장 · 정의에서 전달까지</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-KO.md">다음 장 준비 중 →<br><strong>10장 제공 상태 보기</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
