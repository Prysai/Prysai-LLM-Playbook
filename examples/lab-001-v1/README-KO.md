# Lab 001 v1 — 첫 번째 안전한 변경 fixture

이 작은 합성 fixture는 [Lab 001](../../book/labs/lab-001-first-safe-task-KO.md)을 위한 것입니다. 실제 프로젝트, Git 기록, 자격 증명, 네트워크, 설치, 계정, 모델 호출, 외부 부작용은 없습니다.

## 바꿀 내용

이 **전체 디렉터리**를 버려도 되는 위치에 복사하세요. 복사본의 `seed/README.md`를 확인하고 그 파일만 수정합니다. `verify_readme.py`와 `expected/acceptance.json`은 수정하지 마세요.

수정 근거는 수용 계약에서 찾습니다. 미리보기 명령에는 포트 `8080`이, README에는 로컬 URL이 있어야 합니다. 모델 답변으로 추측하지 말고 고정된 로컬 증거를 비교하세요.

## 진행 방법

복사본에서 `seed/README.md`와 `expected/acceptance.json`을 나란히 여세요.

1. README에 포트와 로컬 URL이 없음을 확인합니다.
2. 허용된 한 번의 README 수정을 합니다.
3. 모든 `required_readme_strings`가 있는지 확인합니다. 수동 확인은 `3/3`입니다.

이미 Python 3가 있다면 `python .\seed\verify_readme.py`를 실행할 수 있습니다. 처음에는 `FIRST_SAFE_CHANGE_FAILED`, 수정 후에는 `FIRST_SAFE_CHANGE_OK`가 나와야 합니다. 이 신호만을 위해 Python을 설치하지 마세요.

## 범위를 제한한 작업 카드

```text
목표: seed/README.md의 로컬 미리보기 설명을 고칩니다.
먼저 읽기: seed/README.md와 expected/acceptance.json.
허용 편집: 계획을 보인 뒤 seed/README.md만.
금지: 검증기나 수용 파일 수정, 설치, 네트워크, 비밀 읽기, commit, push, 게시.
영수증: 기준 상태, 계획, 정확한 diff, 두 번째 결과, 미확인 목록.
중단: 로컬 복사본, 대상 또는 수용 소스가 없을 때.
```

통과는 이 고정 합성 검사기에만 해당합니다. 학습자 완료, 모델 동작, 실제 명령 또는 전이를 증명하지 않습니다.
