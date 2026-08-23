<!-- content_id: prysai-interruption-checkpoint | locale: KO | language: ko | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# 중단 체크포인트

LLM 보조 작업이 중단된 뒤 관찰 가능한 상태를 보존하고 안전한 다음 판단 하나를 고릅니다.
모델을 사용할 수 없거나, 타임아웃·세션 손실·도구 누락이 있거나, 수용 증거가 보이기 전에
인계가 끊겼을 때 사용합니다. 재시도, 보존된 상호작용 진단, 기존 주장 감사, 플랫폼 동작
추론에는 사용하지 않습니다.

## 중단 경계만 맡기

작업이 일부만 끝났을 수 있고 눈에 보이는 중단 뒤 다음 단계가 불분명할 때 사용합니다. 모델
사용 불가 메시지, 타임아웃, 세션 손실, 도구 누락, 끊긴 인계가 예입니다.

다음 경우에는 넘깁니다.

- 보존된 요청·답변·기대 결과의 커뮤니케이션 수리: Communication Failure Triage;
- 완료·신뢰성·릴리스 주장 증거 감사: Evidence Review;
- 현재 이름 있는 플랫폼 사실 확인: Source Investigator;
- 새 작업·변경 작업의 행동·권한 계약: Task Protocol.

제공자 진단, 근본 원인 추론, 모델 비교, 계정 상태 설명, 한 번의 중단에서 일반 복구 절차 만들기는 하지 않습니다.

## 최소 증거 패킷 보존

요청자가 이미 볼 수 있는 것만 수집합니다.

1. `goal` — 의도한 결과 한 문장;
2. `observed_event` — 원인 없이 눈에 보인 중단;
3. `last_inspectable_artifact` — diff·테스트 결과·파일·메모 또는 `none_observed`;
4. `acceptance_evidence` — 완료를 증명할 검사 또는 `unknown`;
5. `external_actions` — 이미 보내거나 바꾸거나 업로드·지출·커밋·공개한 모든 것 또는 `not_observed`.

누락 필드를 그럴듯한 계정으로 채우지 않고 비밀·토큰·비밀번호·쿠키·개인 로그·계정 스크린샷·무관한
맥락을 요구하지 않습니다.

## 이야기를 완성하지 않고 분류

상태 하나만 사용합니다.

- `complete`: 선언된 수용 증거가 이미 확인 가능함;
- `partial`: 확인 가능한 산출물은 있지만 수용 검사를 증명하지 못함;
- `unknown`: 산출물·의미·수용 증거가 없음.

중단 메시지는 진단도 작업 증거도 아닙니다. 새 프롬프트가 이전 작업의 완료 증거를 상속하지도 않습니다.

## 경계 있는 다음 판단 하나 선택

기본은 `R0`의 `hold`: 영수증을 보존하고 아무 행동도 하지 않습니다.

요청자가 하나의 로컬·가역 검사 대상, 확인할 내용, 그 검사가 이전 작업 완료를 자체로 증명하지 못한다는
사실을 지정한 경우에만 `R1`의 `inspect_local`을 제안합니다. 이 Skill은 판단을 기록할 뿐 검사를 실행하지 않습니다.

새 작업·재시도·도구 사용·모델 전환·설정 변경·계정 검사·네트워크·업로드·지출·커밋·푸시·공개·배포는
Task Protocol로 넘깁니다. 별도의 권한 범위·체크포인트·롤백·수용 검사가 필요합니다.

## 중단 조건

목표, 마지막 확인 가능 산출물, 수용 의미, 다음 외부 행동 권한이 없으면 `blocked`입니다. 자동 재시도나
“중단한 곳에서 계속” 메시지를 보내지 않고, 모델·계정·플랜·제공자를 바꾸지 않고, 계정·외부 서비스를
검사하지 않으며, 부분 산출물이나 안심시키는 답변으로 완료를 선언하지 않습니다.

## 체크포인트 영수증

```text
checkpoint_status: ready_for_one_bounded_next_decision | blocked_on_<field>
goal:
observed_event:
last_inspectable_artifact:
acceptance_evidence:
state_classification: complete | partial | unknown
knowns:
unknowns:
external_actions:
next_decision: hold | inspect_local | handoff
handoff:
risk_and_permission_boundary:
```

`unknown`을 명시하고 중단과 완료를 분리하며 승인되지 않은 외부 행동을 이름 붙이지 않고 다음 결정을
최대 하나만 할당하면 수용합니다. 이 방법은 후보일 뿐 작업 복구·서비스 가용성·학습자 사용 능력을 증명하지 않습니다.

## 유지보수 기록

- `source`: 출처 경계를 둔 중단 사례, Task Protocol, Evidence Review 경계에서 도출한 Prysai Lab 오리지널 방법
- `license`: 오리지널 재작성. 공개 용량 보고서와 API 문서는 참고 자료로만 취급합니다.
- `owner`: reliability-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
