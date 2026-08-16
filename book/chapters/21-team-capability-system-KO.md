<!-- content_id: chapter-21-team-capability-system | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 21장: 팀 역량 시스템 만들기

**상태:** `candidate`. **실험:** `draft / not_run`. 이 연습은 정적 시뮬레이션입니다. 연결, 전송, 쓰기, push, 게시를 허가하지 않으며 운영 연결이 작동함을 증명하지도 않습니다.

## 이 장에서 해결하는 문제

한 사람은 자신의 경험으로 Codex 작업을 이끌 수 있습니다. 팀에는 누가 규칙을 소유하고, 어떤 Skill을 신뢰하며, 누가 업데이트하거나 철회할지를 정하는 체계가 필요합니다. 공통 언어, 방법, 증거, 책임이 없으면 팀은 설명할 수 없는 개인 습관을 나누고 있을 뿐입니다.

## 팀 역량 패키지의 네 층

```text
공유 언어와 프로젝트 규칙
            ↓
재사용 방법과 Skill
            ↓
실험, 작업 세트, 증거 기준
            ↓
권한, 검토, 버전, 유지 책임
```

방법만으로는 부족합니다. 증거는 주장 범위를 정하고, 거버넌스는 사용ㆍ수정ㆍ릴리스ㆍ철회의 책임자를 정합니다.

## 판단: 권한과 작업 승인은 다르다

| 행동 | 안전한 범위 | 승인 | 증거와 복구 |
|---|---|---|---|
| 분석 | 비식별 읽기 전용 사본 | 작업 소유자 | 입력과 log; 사본 폐기 |
| 초안 편집 | 격리 브랜치와 지정 파일 | 소유자와 검토자 | 기준 hash, diff, 검증; diff 복원 |
| 검사 실행 | 테스트 데이터와 지정 명령 | 실행 담당 | log와 종료 코드; 프로세스 중지 |
| push/release | 지정 저장소 또는 초안 대상 | 검토자 또는 릴리스 담당 | preview, 승인, rollback; 버전 되돌리기 |
| 권한/비밀 변경 | 최소ㆍ임시ㆍ취소 가능 | 지정 승인자 | 범위, 만료, 감사; 즉시 취소 |

로그인했거나 접근할 수 있다는 사실은 작업 승인이 아닙니다. 범위, 대상, 승인자, rollback이 불명확하면 `blocked`입니다.

## 행동: 최소 패키지 계약

```text
capability-pack/
├─ README.md                  # 목적, 범위, 재현, 한계
├─ manifest.yaml              # id, 버전, 소유자, 상태, 다음 검토
├─ context/project-context.md # 용어, 경계, 신뢰할 수 있는 출처
├─ protocol/task-protocol.md  # 입력, 판단, 행동, 중단
├─ examples/                  # 성공 및 실패 예시
├─ eval/                      # 수용 기준과 증거 인덱스
└─ governance/                # 권한, 책임, rollback
```

manifest에는 `id`, `version`, `owner`, `status`, 출처와 라이선스, 다음 검토일, 허용 범위, rollback을 둡니다. 버전은 변경을 추적하는 표식일 뿐 검증된 행동의 증거가 아닙니다.

## 학습 목표

다른 사람이 암묵적인 권한 확대 없이 검토, 중단, 재현할 수 있도록 팀 패키지의 경계를 정할 수 있습니다.

## 실제 문제

green build, 익숙한 Skill directory, 기존 account는 승인이나 user acceptance를 증명하지 않습니다. 팀은 누가 어떤 범위에서 행동하고 어떤 증거를 남길지 명시해야 합니다.

## 실험: 두 사람이 전달하고 재현하기

### 준비

버릴 수 있는 사본 두 개, synthetic input, version, 빈 permission matrix를 만듭니다. account, upload, push, 장기 secret은 사용하지 않습니다.

### 작업

A가 작은 document review를 기록하고, B가 구두 설명 없이 다른 사본에서 재현합니다. 권한이 불명확하면 중단하고 한 층만 바꾼 뒤 비교를 반복합니다.

### 증거

input hash, version, 읽은 file, 실제 변경, command와 exit code, diff, reviewer, 미확인 항목, status를 보관합니다.

## 전이 과제

같은 패키지를 짧은 언어 연습으로 옮깁니다. 한 사람이 목표와 교정 경계를 정하고 다른 사람이 보이는 시도와 지연된 회상을 확인합니다. 한 번의 유창한 대화를 숙달이라고 주장하지 않습니다.

## 출처 및 유지보수 경계

팀 계약, evidence, rollback은 안정된 방법입니다. product permission, connector, surface는 바뀌므로 현재 공식 정보와 로컬 승인을 확인합니다.

임시 저장소에서 «릴리스 전 문서 검토» 또는 «신규 구성원 프로젝트 안내»를 고정 작업으로 정합니다. 입력에는 완료 항목, 미검증 항목, 오래된 명령, 확인이 필요한 권한을 넣습니다. A는 프로토콜을 실행해 hash와 log를 남깁니다. B는 말로 보충 설명을 듣지 않고 패키지와 같은 입력만 다른 사본에서 사용해 읽은 것, 행동, 중단 지점, diff, 검증, 암묵 지식의 빈틈을 기록합니다. A는 한 층만 수정해 `0.1.1`로 올리고 B가 다시 실행합니다.

실제 서비스에 연결하거나 데이터를 올리고, 메시지를 보내고, pushㆍ게시하거나 장기 비밀을 저장하지 마십시오. 각 run에는 `run_id`, 담당자, 버전, 입력 hash, 실제 변경, 명령과 종료 코드, 검토자, 미검증 항목, 상태가 필요합니다. 후보 통과는 두 사람이 이해, 맥락, 행동 경계, 증거, 실패 중단 다섯 항목에서 8/10 이상을 얻고, 무단 행동 없이 구두 보충 없이 재현하는 것입니다. 하나라도 빠지면 `candidate` 또는 `blocked`입니다.

## 실패 사례와 회고

`owner`와 `version`을 지우면 검토자는 거절해야 합니다. 외부 기능을 정적 목록에서 모두 `requested`로 표시해도 실제 권한이 아닙니다. 범위, 대상, 승인자, 만료, rollback을 요구하고 중단합니다. 부족한 점을 공유 언어, 방법, 증거, 거버넌스로 분류하십시오. «이해했다»는 log, diff, 독립 재현을 대신하지 않습니다.

## 수용 체크리스트

- [ ] 개인 경험과 공유 언어, 방법, 증거, 거버넌스를 구분할 수 있다.
- [ ] 버전, 소유자, 출처, 권한, rollback이 있는 패키지를 만들 수 있다.
- [ ] 다른 사람이 구두 설명 없이 핵심 흐름을 재현할 수 있다.
- [ ] 모든 run에 hash, log, diff, 검증, 미검증 항목이 있다.
- [ ] 과도한 권한이나 release를 막을 수 있다.

권한, 연결 기능, 제품 화면은 변하는 사실입니다. 현재 공식 문서를 확인하십시오. 이 장은 `candidate`이며, 시뮬레이션은 운영 연결이나 팀 성과를 증명하지 않습니다.

## 빠르게 검토할 수 있는 contribution 보내기

팀은 모든 제안을 큰 변경으로 만들 필요가 없습니다. 검토하기 쉬운 test 또는 content PR은 하나의 분명한 문제만 다루고, source, 변경, validation, 불확실성을 몇 분 안에 찾을 수 있게 합니다.

```yaml
contribution_type: "test-case | content-correction | translation | skill-candidate"
problem: "고치거나 확인할 하나의 claim"
scope: "바꿔도 되는 files와 바꾸지 않는 것"
source_or_fixture: "공식 URL 또는 공유 가능한 최소 fixture"
expected_result: "확인 가능한 output, failure, 또는 block 조건"
evidence: "command, log, diff, screenshot, score 위치"
license: "original 또는 asset register의 license record"
reviewer_questions: ["사실에 source가 있는가?", "permission이나 scope가 바뀌는가?", "failure면 어떻게 하는가?"]
```

secret, 실제 customer data, 허가 없는 model output, 재배포할 수 없는 자료를 붙이지 않습니다. test에 account, 결제, network, write, platform별 permission이 필요하면 먼저 `requested`나 `blocked`로 표시합니다. CI나 maintainer가 authorization을 추측하게 하지 않습니다.

### 빠른 merge를 위한 최소 경로

1. 한 PR에는 독립적으로 검토할 수 있는 한 변경만 넣고 format 전체 변경과 content 변경을 나눕니다.
2. test에는 고정 input, expected result, failure condition, 최소 reproduction command를 넣습니다. 실행하지 않았다면 `not_run`이라고 씁니다.
3. content에는 claim, source, access date, scope, review date를 넣고 translation에는 EN source와 review status도 표시합니다.
4. maintainer는 link와 test 전에 license, data scope, permission, rollback을 먼저 확인합니다.
5. scope가 명확하고 evidence를 찾을 수 있으며 check가 통과하고 permission을 넓히지 않는 변경만 빠른 merge 후보입니다. 나머지는 clarification을 요청하거나 `candidate`로 둡니다.

### 그대로 따라 할 수 있는 작은 test PR

예를 들어 lesson이 “build 통과”를 “기능 완료”라고 썼다고 합시다. 막연히 반박하거나 열 개 장을 한꺼번에 고치지 않습니다. 작은 PR을 열어 공개 가능한 synthetic input 하나를 추가합니다. 기대 결과는 “build 통과”를 build evidence로, “user acceptance”를 미검증으로 남깁니다. 실패하면 maintainer는 어느 경계가 깨졌는지 알 수 있고, 통과해도 그 규칙이 계속 검사된다는 뜻일 뿐입니다.

```text
제목: test: keep build success separate from user acceptance
범위: fixture 하나와 assertion 하나; 제품 사실과 permission은 바꾸지 않음
재현: <최소 command>
기대: build = verified; user acceptance = unverified
자료: 직접 쓴 synthetic text; account, customer data, secret, 제한된 screenshot 없음
```

작아서 빠르게 merge되는 것이 아닙니다. scope, license, 예상 failure, command를 몇 분 안에 확인할 수 있기 때문입니다. 이 정보를 낼 수 없다면 먼저 discussion을 열거나 `blocked`로 두세요. maintainer가 추정을 보완하게 하지 않습니다.

## 스스로 확인하기

- [ ] 제안을 “더 좋게 해 달라”가 아니라 하나의 problem, 고정 input, 확인 가능한 result로 쓸 수 있다.
- [ ] PR에 넣으면 안 되는 자료를 알고, 초록 CI로 authorization이나 독립 review를 대신하지 않는다.
- [ ] 빠른 merge 이유 또는 `blocked` / `candidate`로 남겨야 할 이유를 설명할 수 있다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 내비게이션">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-KO.md" aria-label="이전 장: 20장 · 20장: 개인 Codex 작업 시스템 만들기">← 이전<br><strong>20장 · 20장: 개인 Codex 작업 시스템 만들기</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-KO.md" aria-label="다음 장: 22장 · 22장: 지속적인 업데이트와 미래 대비">다음 →<br><strong>22장 · 22장: 지속적인 업데이트와 미래 대비</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
