<!-- content_id: first-safe-change-route | locale: KO | language: ko | default_locale: EN | translation_status: in-progress | translated_from: first-safe-change-EN.md | source_revision: worktree-2026-08-14 -->

# 첫 번째 안전한 변경: Lab 001 전에 하는 오프라인 연습

**콘텐츠 상태:** 보조 경로 `candidate`. **학습자 실행:** `not_run`.
**번역 상태:** 한국어 전체 초안이며, 독립적인 언어 검토는 아직입니다.

이 경로는 2장과 Lab 001 사이에 놓인 초보자용 기본 샌드박스입니다. 의도적으로
불완전한 README 하나, 허용된 로컬 변경 하나, 그리고 범위를 좁힌 검사 하나를 제공한 뒤
자신의 프로젝트에서 작업하게 합니다. 23장도, 새 Skill도, Git 연습도 아니며,
모델이 어떤 일을 완료했다는 증거도 아닙니다.

프로젝트 폴더를 처음 열거나 검사를 처음 실행한다면, 바로 그 이유로 이 경로가
있습니다. 새 도구를 설치하거나 계정을 만들거나 실제 프로젝트를 위험에 빠뜨릴
필요가 없습니다. 관련 파일을 모두 보고, 검사가 정말 질문에 답하는지 스스로
판단할 수 있을 만큼만 범위를 작게 유지합니다.

## 문제

Lab 001에서는 폐기 가능한 프로젝트를 사용하고, 실제로 사용할 명령어의 출처를 확인한 뒤, 범위가 제한된 README만
변경합니다. 실제 프로젝트에서는 좋은 조건이지만, 첫 실습에서는 순환처럼
느껴질 수 있습니다. 처음 온 독자는 아직 안전한 프로젝트가 없고 어떤 명령
출처를 믿어야 하는지도 모르기 때문입니다.

## 개념

fixture는 *방법을 연습하는 일*과 *적절한 프로젝트를 찾는 일*을 분리합니다.
이것은 연습용으로 만든 합성 자료이며 로컬에서 다룰 수 있고 버릴 수 있습니다. 예상되는 콘텐츠 변경은
README 수정뿐이고, 검사기는 그 파일만 읽어 간단한 결과를 출력합니다. 따라서
계정, 네트워크, 설치, Git, commit, push, 게시, 개인 데이터 없이도 수용 조건을
볼 수 있습니다.

## 결정

아직 버릴 수 있는 로컬 프로젝트가 없다면 프로젝트가 제공하는
[첫 번째 안전한 변경 fixture](../../examples/lab-001-v1/README-KO.md)를 사용합니다.
fixture 폴더 전체를 `.work/` 또는 다른 임시 위치로 복사하세요. 원본 fixture를
수정하면 다음 학습자를 위해 심어 둔 오류가 사라집니다.

## 실행

먼저 개인 작업 복사본을 만듭니다. 파일 관리자에서 `examples/lab-001-v1` 폴더
전체를 언제든 버릴 수 있는 위치로 복사하고, 복사본 이름을 `first-safe-change`로
정합니다.

그다음 아래 두 검사 중 하나를 고릅니다.

1. **프로그램을 실행하지 않는 검사(기본값).** 복사한 폴더 안에서
   `seed/README.md`와 `expected/acceptance.json`을 엽니다. 수정 전 README에는
필수 미리보기 세부 정보 두 개가 없습니다. README를 한 번만 수정한 뒤,
   수용 파일의 `required_readme_strings`에 적힌 세 문자열이 모두 README에
   보이는지 확인합니다.
2. **선택적 로컬 검사기.** 컴퓨터에 Python 3가 이미 동작할 때만 사용합니다.
   복사한 폴더에서 터미널을 열고 다음을 실행합니다.

```powershell
python .\seed\verify_readme.py
```

처음 실행한 선택적 검사 결과는 `FIRST_SAFE_CHANGE_FAILED`여야 합니다. 이는 의도된 시작
상태이지 설치가 깨졌다는 뜻이 아닙니다. fixture README의 작업 카드를 따라
`seed/README.md`를 살펴보고 가장 작은 변경을 제안하세요. 스스로 계획을 승인한
뒤 **그 README만** 수정합니다. 같은 수동 검사나 선택적 명령을 다시 실행합니다.
선택적 검사기의 통과 결과는 `FIRST_SAFE_CHANGE_OK`입니다.

Python을 사용할 수 없다면 이 경로만을 위해 실행 환경을 설치하거나 다른 명령으로
대체하지 마세요. 프로그램을 실행하지 않는 검사를 사용하고
`check: manual required_readme_strings 3/3`을 기록합니다. 버릴 수 있는 로컬
복사본조차 만들 수 없다면 멈추고 텍스트 전용 First Win을 사용하세요. GitHub 웹
보기를 로컬 샌드박스인 것처럼 취급하지 마세요.

## Web coding 연결: 실제 브라우저에서 보이는 변경 하나 확인하기

다음 목표가 Web coding이라도 “완성된 웹사이트를 만들어 줘”로 시작하지 마세요.
프로젝트의 [Product Context sandbox](../../examples/skill-sandbox/product-context-real-estate/README-KO.md)를
버릴 수 있는 정적 페이지로 사용합니다. 가상의 문구만 있으며 실제 매물, 폼, 분석,
API, 외부 이미지는 없습니다.

1. `examples/skill-sandbox/product-context-real-estate` 폴더 전체를 임시 위치에 복사하고
   README와 `index.html`을 읽습니다.
2. **`index.html`만** 수정합니다. 같은 가상 독자를 대상으로 하는, 화면에 보이는 문장 하나를 바꿉니다.
   CSS, 프레임워크, 이미지, 폼을 추가하지 않습니다.
3. Python 3가 이미 실행되는 경우에만 복사한 폴더에서 문서에 적힌 로컬 서버를 실행합니다.

```powershell
python -m http.server 4182
```

브라우저에서 `http://127.0.0.1:4182/`를 엽니다. 제목, 바뀐 문장, 유지된 헤딩,
링크 대상, 콘솔, 390px 너비 뷰포트를 확인합니다. 명령, 대상 파일, 브라우저 결과가
분명하지 않으면 중지하고, 이 연습을 위해 런타임을 설치하지 않습니다.

짧은 기록을 남깁니다.

```text
sandbox: <복사한 디렉터리>
allowed_change: index.html only
url: http://127.0.0.1:4182/
browser_check: 새 문장 한 번; 헤딩과 링크 유지; 콘솔 관찰
diff: <검토한 diff>
unverified: 배포, 접근성 검토, 다른 브라우저, 사용자 수용
```

이는 한 뷰포트에서 한 번 렌더링된 로컬 상태만 증명합니다. 프로덕션 빌드, 모든
반응형 상태, 접근성, 보안, 성능, 제품 가치는 증명하지 않습니다. 전체 엔지니어링
수명주기는 [16장](../chapters/16-engineering-track-KO.md)으로 이어가세요.

## 증거

다음의 짧은 기록만 보관합니다.

```text
sandbox: <작업 복사본 경로>
baseline: FIRST_SAFE_CHANGE_FAILED
allowed_change: seed/README.md only
diff: <검토한 README 차이>
check: manual required_readme_strings 3/3 | FIRST_SAFE_CHANGE_OK
external_actions: none
unverified:
  - learner completion
  - model behavior
  - transfer
```

검사기는 특정 시점에 이 고정된 연습용 README가 선언된 문자열과 일치한다는 것만
말할 수 있습니다. 검사기가 통과했다고 해서 Git 작업, 브라우저, 계정 권한, 보안 검토,
또는 방법을 배웠다는 사실이 증명되지는 않습니다.

## 실패와 경계 사례

통과하기 위해 검사기, 수용 파일 또는 다른 경로를 수정하지 마세요. 제안한 수정에
설치, 네트워크 요청, 비밀 정보, 계정, 저장소 작업 또는 두 번째 파일이 필요하면
중지합니다. 이는 fixture의 범위가 아니라 새로운 결정입니다.

## 회고

1. 수정 전에 수용 조건의 어느 부분을 관찰할 수 있었나요?
2. 최종 차이는 무엇을 증명하며, 자신 있는 “완료” 메시지는 무엇을 증명하지
   못하나요?
3. 실제 프로젝트에서 Lab 001에 이 패턴을 반복하기 전에 어떤 사실을 먼저
   확인해야 하나요?

## 계속하기

다음 학습 단위는 [Lab 001: 안전한 README 변경 하나 만들기](../labs/lab-001-first-safe-task-KO.md)입니다. 이 Lab의 한국어판은
후보 상태이며 여전히 `draft / not_run`입니다. 이 경로는 자체로 완결된
연습이며, 독자를 조용히 다른 언어로 보내거나 영어 원본을 한국어 번역 완료처럼
보여 주지 않습니다.

## 상태와 한계

학습자용으로 이 경로는 여전히 `candidate / not_run`입니다. 저장소의 테스트는
fixture의 형태와 검사기가 선언한 통과/실패 동작만 검사합니다. 학습자를 관찰하지
않고, Codex나 다른 모델을 호출하지 않으며, 제품을 비교하거나 전이를 증명하지
않고, 실제 프로젝트 명령도 검증하지 않습니다.
