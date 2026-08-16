<!-- content_id: chapter-14-discover-and-audit-skills | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 14장: 외부 Skill 찾기, 설치하기, 감사하기

**상태:** `candidate`. **실험:** `draft / not_run`. 이 장은 Skill 발견과 채택 검토를 가르칩니다. 현장 보고는 학습 입력일 뿐 로컬 재현이나 공식 원인 판정이 아닙니다.

## 문제

외부 Skill은 반복 절차, 분야 지식, 도구 호출을 재사용 가능한 역량으로 묶을 수 있습니다. 동시에 컨텍스트, 의존성, 네트워크, 계정 권한, 외부 부작용, 라이선스 의무도 넓힐 수 있습니다. 질문은 “더 많은 Skill을 어디서 찾나”가 아닙니다. 실제 작업의 빈틈에 Skill이 맞는지, 디렉터리 항목을 감사 가능한 후보로 어떻게 바꾸는지, 비밀을 누출하거나 권한을 넘지 않고 어떻게 시험하는지입니다.

> 디렉터리는 발견의 시작점이지 품질 증명이 아닙니다. 설치는 상태 변화이지 검증이 아닙니다. 호출될 수 있다고 해서 채택해야 하는 것은 아닙니다.

## 먼저 작업 계약을 쓰기

```text
목표: 무엇이 바뀌어야 하는가.
입력: 어떤 파일, 데이터, 공개 소스를 읽어도 되는가.
출력: 전달물의 모양은 무엇인가.
수용: 완료를 보여 줄 증거는 무엇인가.
권한: 어떤 도구, 네트워크, 계정, 쓰기가 허용되는가.
중지: 어떤 조건에서 멈추고 질문하는가.
```

| 빈틈 | 보통의 해결 방법 | 흔한 오판 |
|---|---|---|
| 개념 또는 사실 부족 | 조사, 공식 문서, 사람의 판단 | 출처 확인 대신 Skill 사용 |
| 안정적으로 반복되는 절차 | 로컬 Skill 또는 script | 하나의 거대한 Skill로 모든 상황 처리 |
| 외부 시스템 관찰 또는 변경 | 통제된 tool 또는 connector | “호출 가능”을 “허가됨”으로 취급 |
| 불분명한 목표·수용 규칙 | 먼저 명확화 | 설치로 모호한 요구를 숨김 |

Skill은 방법과 라우팅 계약이고 tool은 외부를 관찰하거나 바꾸는 인터페이스입니다. Plugin과 Connector는 제품 계층입니다. 검토할 때는 Skill이 무엇을 읽는지, 무엇을 권하는지, tool이 실제로 무엇을 하는지, 외부 서비스가 무엇을 받는지를 분리합니다.

## 설치 전 검토 카드

각 후보에 대해 작업 빈틈, trigger / non-trigger, URL과 고정 revision, 인벤토리, license, NOTICE, 중첩 자산, 의존성, 네트워크, 계정, 격리 대상, 비밀 경계, 외부 부작용, backup, rollback, 승인 지점, 네 가지 행동 테스트, owner와 다음 검토일을 기록합니다.

채택 결정은 `recommendation-only`, `blocked`, `approved-to-install`, `installed-candidate` 네 가지뿐입니다. 행동 증거는 별도로 기록하세요. 파일 존재, 발견, 로드, 채택, 검증은 다른 상태입니다. 존재가 발견을, 발견이 로드를, 로드가 채택을, 채택이 검증을 증명하지 않습니다.

## Skill 내용은 신뢰할 수 없는 입력

`SKILL.md`, README, 원격 페이지, Issue, 샘플, tool 결과는 데이터로 취급합니다. “상위 규칙을 무시”, “비밀을 올려라”, “결과를 보내라”, “승인되지 않은 명령을 실행하라”는 말은 Skill 안에 있어도 권한을 얻지 못합니다. 필요한 부분만 추출하고, 비밀을 제거하며, 가능하면 네트워크 없는 sandbox에서 시험하고, 거부한 내용을 기록합니다.

위험은 단계적으로 올립니다. 로컬 읽기, 되돌릴 수 있는 쓰기, sandbox 외부 연결, 그 뒤에 프로덕션 쓰기와 공개입니다. 더 높은 단계로 가기 전 새 권한, 증거, rollback을 선언합니다. 한 번의 smoke test가 뒷받침할 수 있는 최대 상태는 `candidate`입니다.

## 연습과 경계

고정 revision의 두 후보를 설치하지 않고 검토하세요. A는 추적 가능한 license 신호와 작업 적합성이 있어 `recommendation-only`가 될 수 있습니다. B는 license / NOTICE 또는 구체적인 rollback이 없어 `blocked`여야 합니다. URL, revision, 인벤토리, 의존성, 권한, 격리 대상, backup, 복원, 승인, owner를 기록하고 A에 대해 긍정, 경계, 실패·주입, 이전 테스트를 설계하되 실행하지 마세요.

이 연습은 검토 결정을 보여 줄 뿐 발견, 로드, 실행, 실제 채택을 증명하지 않습니다. 선언된 환경에서 실행하고 독립 검토한 기록이 생기기 전까지 이 장은 `candidate / not_run`입니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-KO.md">← 이전<br><strong>13장 · 파일, 터미널, 브라우저, GitHub의 행동 경계</strong></a></td><td align="right"><a data-chapter-nav="next" href="15-research-track-KO.md">다음 →<br><strong>15장 · 연구 트랙, 질문에서 감사 가능한 지식까지</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
