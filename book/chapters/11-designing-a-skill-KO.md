<!-- content_id: chapter-11-designing-a-skill | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 11장: 쓸모 있는 Skill 설계하기

**상태:** `candidate`. **실험:** `not_run`. 이 장은 설계 방법을 정합니다. 특정 host가 Skill을 발견, 로드, 실행했다는 증거는 아닙니다.

## 문제

한 번 잘 된 세션만으로 프롬프트를 Skill로 만들면 위험합니다. 기록하지 않은 사실에 의존하거나, 필요 없는 권한을 요구하거나, 자격 증명을 가정하거나, 유행어만으로 실행될 수 있습니다. 쓸모 있는 Skill은 반복 가능한 작업 범주를 제한된 행동과 검사 가능한 증거에 연결하는 버전 관리 방법 패키지입니다.

> Skill은 제한된 작업 범주를 제한된 행동과 검사 가능한 증거에 연결하는, 발견 가능하고 재사용 가능한 방법 패키지입니다.

Skill은 모델, 도구, 권한, 연결기, 사람의 승인을 대신하지 않습니다.

## 문장보다 먼저 계약 쓰기

```yaml
skill_id: evidence-boundary-review
version: "0.1.0"
owner: named-person-or-team
review_date: "YYYY-MM-DD"
purpose: "제공한 산출물을 지정한 증거 경계로 검토한다."
trigger:
  - "증거 경계 검토를 요청한다."
  - "산출물, 목표, 수용 조건이 제공됐다."
non_trigger:
  - "제한 없는 다시 쓰기를 요청한다."
  - "중요한 주장에 출처가 없다."
  - "다른 이름 붙은 방법이 작업을 맡는다."
required_inputs:
  - 대상 경로 또는 붙여 넣은 산출물
  - 목표, 제외 사항, 수용 조건
  - 중요한 주장의 출처
allowed_actions: "대상 읽기; 버릴 수 있는 출력에 보고서 쓰기; 이름 붙은 가역 로컬 검사 실행"
forbidden_actions: "비밀 읽기/출력, 게시, 전송, 삭제, 설치, 무단 네트워크"
output: "주장 → 증거 → 덮이지 않은 범위 보고서"
stop_when: "입력, 권한, 출처, 복구 대상이 없다"
```

trigger에는 작업 의도, 필요한 입력, 방법의 소유권, 허용 가능한 위험이 있어야 합니다. 키워드 일치만으로는 부족합니다. non-trigger는 가까운 작업을 가로채지 않게 합니다.

## 방법, 데이터, 실행을 나누기

- `SKILL.md`에는 항상 필요한 목적, 경계, 절차, 중단 규칙, 증거를 둡니다.
- `references/`에는 특정 갈래에서만 읽을 자료를 둡니다.
- `scripts/`에는 의존성, 네트워크, 쓰기 범위, 종료 동작을 선언한 결정적 검사만 둡니다.
- `assets/`에는 선언한 정적 자원만 둡니다.

중요한 안전 규칙을 선택적 참고 자료에 숨기지 않습니다. 파일 존재는 발견을, 발견은 로드를, 로드는 채택을, 채택은 동작을 증명하지 않습니다.

## 네 가지 사례로 평가하기

| 사례 | 일어나야 할 일 | 일어나면 안 될 일 |
|---|---|---|
| 긍정 | 방법이 실행되고 검토 가능한 산출물을 남긴다 | 증거 없는 성공 선언 |
| 경계 | 올바른 방법에 넘기거나 구체적으로 질문한다 | 비슷한 이름만으로 실행 |
| 실패 | 위험한 쓰기 전에 멈추고 첫 누락 지점을 남긴다 | 입력, 권한, 결과를 지어냄 |
| 전이 | 도메인 사실을 바꾸고 가정을 다시 검사한다 | 명사만 기계적으로 바꿈 |

한 변수만 바꾸고 산출물에 보이는 신호를 남기는 의도적 실패를 넣습니다. rollback은 대상, 기준선, 단계, 읽어 본 성공 검사가 필요합니다. “되돌리기”만으로는 충분하지 않습니다.

## 연습과 한계

Markdown 링크 검토, 조사 보고서 출처 확인, 릴리스 인계처럼 두 번 이상 한 저위험 방법을 고릅니다. 계약, 긍정 사례, 실행하면 안 되는 근접 사례, 빠진 입력, 보이는 실패, rollback 검사를 만들고, 산출물이 무엇을 증명하고 무엇이 unknown인지 표로 남깁니다.

선언한 환경에서 이 사례들을 기록하고 독립 검토를 받기 전까지 Skill은 `candidate`입니다. 발견, 로드, 실행, 사업 효과를 주장하지 않습니다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 탐색"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="10-planning-and-slicing-KO.md">← 이전<br><strong>10장 · 계획과 수직 슬라이스</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-KO.md">다음 장 준비 중 →<br><strong>12장 제공 상태 보기</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
