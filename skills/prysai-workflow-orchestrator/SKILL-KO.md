<!-- content_id: prysai-workflow-orchestrator | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 워크플로 오케스트레이터

정의, 작업 프로토콜, 계획, 단계별 실행, 검증, 검토, 전달, 유지보수에 걸친 복잡한
Codex 작업을 조율합니다. 여러 단계·파일·도구·영역·체크포인트가 있거나 처음부터 끝까지
전달해야 할 때 사용합니다. 단일 범위 작업, 학습 설명, 단독 증거 감사, 일회성 연구 질문에는
사용하지 않습니다.

## 발동 경계와 인계

두 개 이상의 의존 단계, 체크포인트, 복구, 여러 산출물 또는 분야 간 조정이 필요할 때
담당합니다.

다음 경우에는 넘깁니다.

- 제한된 하위 작업에 `$skill`이 명시됨: 한 단계로 기록하고 범위를 보존;
- 단일 모호한 행동: 먼저 Task Protocol;
- 가르치는 일만 요청됨: Codex Coach;
- 증거만 검토함: Evidence Review;
- 출처 발견·종합만 요청됨: Research Router;
- Skill 선택만 요청됨: Skill Selector;
- 공유 제품 맥락만 작성함: Product Context.

허용되는 내부 인계 고리는 `orchestrator -> task protocol -> one domain route -> evidence
review -> orchestrator checkpoint`뿐입니다. 단계에서 오케스트레이터를 다시 부르거나,
새 발견이나 범위 변경 없이 끝난 단계를 다시 시작하지 않습니다.

## 필수 입력과 누락 처리

`outcome`, `non_goals`, `stages`, `dependencies`, `allowed_actions`, `acceptance_evidence`,
`checkpoints`, `rollback`, `owner`를 요구합니다. 단계나 의존성이 불분명하면 `blocked_on`
필드를 포함한 제안 계획을 반환합니다. 계약에는 `decision_owner`, 정확한 `delivery_target`,
그리고 각 `commit`이 로컬 커밋·푸시·풀 리퀘스트·공개 중 무엇인지도 적습니다. 경로나 위험을
바꾸는 최소 질문만 합니다.

단계를 `in-progress`로 표시하기 전에 다음을 기록합니다.

```yaml
owner: "role or named maintainer"
input_and_action: "fixed input and allowed action"
exit_evidence: "observable file, log, command, review, or URL"
checkpoint: "who may approve the next stage and what is checked"
rollback: "exact diff, copy, branch, or target to restore"
risk: "R0 | R1 | R2 | R3"
confirmation: "required | not_required; state the decision point"
```

`delivery_target`, 담당자, 수용 증거 또는 롤백 중 하나라도 없으면 실행을 차단합니다.
대상을 추측하지 않습니다.

## 수명 주기와 체크포인트

1. 결과, 사용자, 비목표, 위험, 수용 기준을 정의한다.
2. 작업 프로토콜을 한 번 작성하거나 검증한다.
3. 담당자와 증거가 있는 되돌릴 수 있는 세로 단계로 나눈다.
4. 한 번에 한 단계만 실행하고 diff, 로그, 실행 ID를 보존한다.
5. 모든 주장을 적절한 테스트·런타임·브라우저·출처·보안·시각·사람의 증거로 검증한다.
6. 범위, 가정, 유지보수성, 실패 경로를 검토한다.
7. 완료·미완료·추론·차단·다음 단계를 구분해 전달한다.
8. 유지보수, 출처 갱신, 마이그레이션, 롤백 메모를 기록한다.

전달 대상은 단계 그래프의 일부입니다. 로컬 커밋, 공유 브랜치 푸시, 풀 리퀘스트, 공개를
둘 이상 요청받으면 각각 별도 단계로 등록합니다.

## 위험, 부작용, 확인

각 단계를 `R0` 읽기 전용, `R1` 되돌릴 수 있는 로컬, `R2` 공유·외부, `R3` 운영·비가역·
비밀·광범위 권한으로 분류합니다. 권한 확대, 비밀 접근, 외부 메시지, 커밋·푸시·공개,
운영 변경 또는 비가역 행동 직전에 멈춥니다. 오케스트레이션은 이전의 무관한 승인을
상속하지 않습니다. 사용자는 정확한 단계·대상·부작용을 확인해야 합니다.

## 강제 중단과 복구

소유권이 없거나, 수용 기준이 없거나, 안전하지 않은 대상이거나, 지시가 충돌하거나,
롤백이 실패하거나, 증거가 사라지거나, 새 가설 없이 반복 실패하면 `blocked`로 멈춥니다.
실패를 보존하고 범위를 줄인 뒤 증거 기반 변경 하나만 적용하고 관련 검사만 다시 합니다.
권한을 넓히거나 무한히 재시도하지 않습니다.

## 고정 출력

1. `outcome_and_scope`
2. `stage_graph_and_current_stage`
3. `checkpoint_log`
4. `actions_and_permissions`
5. `evidence_by_stage`
6. `failures_recovery_and_rollback`
7. `completed_incomplete_inferred_blocked`
8. `handoffs`
9. `risks_and_unknowns`
10. `content_status`

## 증거와 상태 매핑

단계 상태에는 `not-started`, `in-progress`, `blocked`, `verified`, `accepted`를 사용합니다.
전체 상태는 탐색이면 `practice`, 구조와 기본 검사를 통과하면 `candidate`, 선언한 모든
단계와 경계 사례에 증거가 있으면 `verified`, 릴리스·보안·소유권·유지보수·롤백 게이트까지
통과하면 `production-ready`입니다.

## 유지보수 기록

- `source`: `docs/book-architecture.md`, `docs/charter.md`, `docs/quality/skill-quality-standard.md`
- `license`: 오리지널 재작성. 외부 자료는 계속 참고용입니다.
- `owner`: workflow-systems maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
