# Product Context → 첫 구매자 안내서

이 일회용 로컬 sandbox는 `prysai-product-context` Skill의 범위가 제한된 연결을 보여 줍니다.

```text
합성 브리프 → 컨텍스트 초안 → 디자인 인계 → 정적 구매자 안내서 → 브라우저 화면
```

이것은 부동산 매물, 고객 납품물, 시장 조사, 조언 서비스 또는 리드 생성 페이지가 아닙니다. 실제 재고, 인물, 고객 인용, 시장 통계, 분석, 양식, 외부 이미지, 웹 글꼴, CDN, API, 계정 연결이 없습니다.

초기 버전은 흔한 라이프스타일 장식과 가상의 매물 카드를 사용해 시각 검토에서 거절되었습니다. 실제 증거나 자산이 없을 때는 분위기를 꾸며내지 말고 유용한 의사 결정 지원을 제공한다는 원칙을 따릅니다.

## 로컬 실행

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py -m http.server 4182
```

`http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/`를 여세요.

## 확인할 파일

- `brief.md`: 가상 입력.
- `context-draft.md`: 비권위적 컨텍스트 출력, 인계, 거절된 패턴.
- `index.html`, `styles.css`: 하위 안내서.
- `scripts/capture_case_screenshots.mjs`: 재현 가능한 Edge 화면.
- `assets/cases/`와 사례 기록: 증거 및 비주장 경계.

초안은 게시나 정식 제품 컨텍스트 쓰기를 승인하지 않습니다. 여전히 `candidate` 교육 자료입니다.
