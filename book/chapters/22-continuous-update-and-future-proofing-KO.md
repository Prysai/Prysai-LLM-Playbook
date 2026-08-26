<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# 22장: 지속적인 업데이트와 미래 대비

**상태:** `candidate`. **실험:** `draft / not_run`. 임시 사본이나 격리 브랜치에서만 합니다. 운영 접근, 실제 자격 증명, push, release, 외부 일괄 치환은 사용하지 않습니다.

## 이 장에서 해결하는 문제

모델, Codex 진입점, 권한, Skill, 외부 서비스는 바뀝니다. 출처, 범위, 검토일, 마이그레이션 계획, rollback이 없는 워크플로는 몇 달 후 오해를 낳을 수 있습니다. 지속 보수는 새 기능을 모두 받아들이는 경쟁이 아닙니다. 무엇이 안정적이고 무엇을 재확인하며 언제 유지ㆍ차단ㆍ이전ㆍ폐기할지를 규율 있게 결정하는 일입니다.

## 네 층과 다른 수명

| 층 | 예시 | 관리 방식 |
|---|---|---|
| 안정 원칙 | 맥락은 이해에 영향을 주고, 도구는 행동 공간을 바꾸며, 증거는 완료 주장을 뒷받침한다 | 교육, 실험, 경계 검토 |
| 제품 사용 | Codex 진입점, Skill 호출, 권한, 설정 | 해당 공식 페이지 재확인 |
| 도메인 방법 | 엔지니어링, 조사, 마케팅, 문서, 데이터 | 실습과 사람의 검토 |
| 개별 사실 | 모델 ID, 가격, 한도, 매개변수, 외부 API | 날짜가 있는 출처에 연결; 필요하면 이전 또는 삭제 |

내용 성숙도 `draft | candidate | verified | production-ready`, 변동 주장 상태 `current | stale | disputed | removed`, 실행 관찰 `planned | authorized | executed | verified | not_run`을 혼동하지 마십시오. 출처가 최신이라고 장이 검증되는 것은 아닙니다.

## 판단: 유지, 업데이트, 차단, 폐기

| 상황 | 행동 | 필요한 종료 조건 |
|---|---|---|
| 권위 있는 출처가 있고 범위가 맞음 | `current`; 유지 또는 최소 수정 | 출처, 검토일, 영향 대상을 기록 |
| 출처가 충돌하거나 관찰과 맞지 않음 | `disputed`; 단정 중지 | 불확실성과 검토 담당 기록 |
| 출처가 사라지고 대체 근거가 없음 | `stale`; 경고 또는 차단 | 이전 주장을 현재 사실처럼 제시하지 않기 |
| 라이선스나 보안 조건이 허용하지 않음 | `removed`; 폐기 | 이전과 복구 안내 보존 |
| 호환 대체물이 있고 이전을 평가함 | `current`; 이전 안내 | 이전 범위, 경로, 증거, 다음 검토 |

담당자, 증거, rollback이 하나라도 없으면 `blocked`입니다.

## 학습 목표

변경을 층별로 구분하고 `disputed` 주장을 보류하며, 가장 작은 되돌릴 수 있는 범위만 업데이트할 수 있습니다.

## 실제 문제

제품 페이지를 찾았거나 CI가 통과했다는 사실만으로는 계정 접근 권한이나 런타임 동작을 증명할 수 없습니다. 실제 유지보수 문제는 한 주장이 장, Lab, Skill 전체에 사실처럼 퍼지기 전에 멈추는 것입니다.

## 행동: 주장 기록과 영향 행렬

```yaml
claim: "구체적인 주장"
source: "공식 또는 권위 있는 URL"
checked_at: "YYYY-MM-DD"
applies_to: "제품, 버전, 지역, 계정 범위"
owner: "책임 역할"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

흐름은 변화 발견 → 영향과 위험 분류 → 장, Skill, Lab, 작업, 권한 영향처 찾기 → 출처 또는 제한된 증거 확인 → 최소 안전 변경 → 관련 검사 재실행 → 새 맥락 검토 → 유지, 이전, 차단, 폐기, 공개입니다.

모델이나 Skill을 이전할 때는 첫 시도 결과, 오류, 맥락, 도구, 권한, trigger, 출력 형식, 라이선스, 담당자, 복구를 다시 확인합니다. 출처 새로고침은 계정 접근, 실행, 배포, 팀 효과를 증명하지 않습니다.

## 실험: 가상 제품 변경 처리하기

### 준비

버릴 수 있는 사본, baseline hash, synthetic fixture, 빈 impact matrix를 만듭니다. 유효하지 않은 URL은 데이터일 뿐이며 account, network write, 제품 접근을 사용하지 않습니다.

### 작업

주장을 `disputed`로 표시하고 다섯 consumer를 기록한 뒤 fixture만 바꿉니다. source, owner, reviewer, rollback이 없으면 게시하지 말고 중단합니다.

### 증거

claim record, source 또는 부재 기록, scope, hash, diff, matrix, check log, unknown, rollback target을 보관합니다.

임시 사본에 `update-impact-demo-v1`을 만들고 `https://example.invalid/public-doc`에 관한 가상 `disputed` 주장을 둡니다. 이 도메인은 의도적으로 사용할 수 없습니다. 접근하거나 지시를 실행하거나 실제 제품 증거로 취급하지 마십시오. 기준 hash, 목록, 변경 전 diff, `run_id`를 보관합니다.

공개 설명은 바뀌었지만 두 번째 신뢰 가능한 출처가 없다고 가정합니다. `disputed`를 유지하고 단정적 설명을 멈춥니다. 장, Skill, Lab, 권한 메모, 작업 세트별로 소비자, 위험, 최소 조치, 증거, 담당자, 상태를 둔 영향 행렬을 작성합니다. fixture만 고치고 관련 검사만 실행하여 결과 또는 `not_run`, diff, 미검증 항목, rollback을 기록합니다. `decision_owner`, 임시 `delivery_target`, `reviewer`, `rollback_target` 중 하나라도 빠지면 `blocked`입니다.

증거 패키지에는 주장, 출처 또는 부재 기록, 범위, 담당자, 검토일, hash 또는 diff, 영향 행렬, log, 미확인 목록이 있어야 합니다. rollback은 임시 hash 복원이나 사본 폐기 절차여야 합니다.

### 회고

가장 먼저 놓친 consumer는 무엇입니까? 전체 치환 대신 `blocked`가 타당한 unknown은 무엇입니까?

## 전이 과제

오래된 언어 학습 조언을 같은 card로 검토합니다. source, 대상, 지연된 독립 과제가 주장을 뒷받침할 때까지 `disputed`로 둡니다. 유창한 model response는 학습 효과 증거가 아닙니다.

## 수용 체크리스트

- [ ] 변동 claim에 source, scope, owner, review, status가 있다.
- [ ] matrix에 chapter, Skill, Lab, task, permission이 포함된다.
- [ ] 되돌릴 수 있는 diff를 production이나 learner effect 증거로 취급하지 않는다.

## 출처 및 유지보수 경계

impact analysis, status, rollback은 안정된 방법입니다. 이름, permission, product behavior는 변하는 사실이므로 현재 권위 있는 source가 필요합니다.

## 실패, 전이, 수용

작업, 출처, 권한, 라이선스를 검토하지 않고 모델 이름을 전체 자료에서 치환해 의도적으로 실패시킵니다. 중단하고 실패 diff를 임시 사본에 남긴 뒤 기준을 복원하고 누락 소비자를 행렬에 추가합니다. 실제 외부 Skill 후보는 라이선스, 의존성, trigger, 권한, 위험, 담당자, 평가를 확인할 때까지 `blocked` 또는 적응 후보일 뿐입니다.

- [ ] 안정 원칙, 제품 사용, 도메인 방법, 개별 사실을 구분할 수 있다.
- [ ] 변동 주장에는 출처, 날짜, 범위, 담당자, 검토일, 상태가 있다.
- [ ] 영향 행렬이 장, Skill, Lab, 작업, 권한을 포함한다.
- [ ] 주장 상태와 내용 성숙도를 구분할 수 있다.
- [ ] 연습에 hash, diff, log, rollback, 미검증 항목이 있다.

제품 이름, 권한, 동작은 변합니다. 최신 공식 자료를 확인하십시오. 이 장은 `candidate`이며 실험은 운영 동작이나 팀 효과를 증명하지 않습니다.

## 게시 전 최소 update card

새 이름이나 페이지 screenshot을 보았다고 책 전체를 일괄 치환하지 않습니다. 먼저 rollback 가능한 card로 변경 범위를 좁힙니다. 무엇을 바꾸는지, 왜 그것만 바꾸는지, 아직 어떤 결론을 말할 수 없는지 다음 maintainer가 알 수 있게 합니다.

```yaml
update_id: update-22-example
trigger: "source에 접근할 수 없거나 scope가 현재 설명과 충돌함"
claim_status_before: disputed
affected_units: ["chapter", "lab", "skill", "permission-note", "task-set"]
safe_action: "단정 표현을 멈추고 temporary fixture의 status와 note만 변경"
validation: "관련 static check 또는 not_run"
unverified: ["실제 account behavior", "production permission", "learner effect"]
rollback_target: "temporary copy의 baseline hash"
release_decision: blocked
```

`release_decision: blocked`는 실패가 아닙니다. 두 번째 source, owner, evidence, rollback이 없을 때 추측이 공개 버전으로 들어가지 않게 하는 결정입니다. unverified 항목이 실제 evidence로 해소되어야 상태가 바뀔 수 있습니다.

## 작은 실험 추가: 전체 치환 거부하기

가상의 model 또는 tool 이름을 temporary fixture의 다섯 consumer에 둡니다. chapter, Lab, Skill, permission note, task set입니다. 이름을 바꾸기 전에 각 항목이 stable principle, product usage, domain method, instance fact 중 무엇인지 분류합니다.

1. source review 대기열에는 instance fact만 들어갑니다. stable principle은 제품 이름 변경 때문에 다시 쓰지 않습니다.
2. consumer마다 risk와 minimal action이 있어야 합니다. “전체 바꾸기”는 impact analysis가 아닙니다.
3. source, license record, rollback이 없는 consumer는 `blocked`로 남습니다. 다른 페이지의 pass가 이를 메우지 못합니다.
4. fixture 하나만 바꾸고 diff를 저장한 뒤 baseline을 복원하거나 temporary copy를 버립니다.

## 스스로 확인하기

- [ ] 어떤 변동 claim에도 trigger, 영향 범위, 최소 행동, unknown, rollback target을 적을 수 있다.
- [ ] source refresh, 파일 존재, 초록 CI를 runtime, learner effect, verified release로 바꾸어 말하지 않는다.
- [ ] “업데이트를 따라가기” 위한 전체 치환보다 release를 멈춰야 할 때를 안다.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="장 내비게이션">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-KO.md" aria-label="이전 장: 21장 · 21장: 팀 역량 시스템 만들기">← 이전<br><strong>21장 · 21장: 팀 역량 시스템 만들기</strong></a></td>
      <td align="right"></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
