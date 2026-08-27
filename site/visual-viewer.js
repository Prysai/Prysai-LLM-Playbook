(() => {
  'use strict';

  const LOCALES = ['en', 'zh', 'es', 'ja', 'ko', 'de', 'zh-tw', 'fr'];
  const ASSETS = new Set([
    'agent-handoff-receipt-checkpoints-red-black.svg', 'beginner-practice-loop-red-black.svg',
    'beginner-safety-stop-card.svg', 'capability-ladder-red-black.svg', 'claim-to-evidence-audit-red-black.svg',
    'conversation-safety-card-red-black.svg', 'evidence-maturity-ladder-red-black.svg', 'evidence-recovery-ladder.svg',
    'evidence-to-decision-stop-map-red-black.svg', 'failed-interaction-recovery-red-black.svg',
    'field-signal-to-safe-degradation-red-black.svg', 'first-attempt-evidence-receipt-red-black.svg', 'first-task-evidence-bridge-red-black.svg',
    'first-turn-contract-card.svg', 'foundation-first-visit-route-red-black.svg', 'foundation-route-map-red-black.svg',
    'four-evidence-lenses-red-black.svg', 'goal-entry-decision-map-red-black.svg', 'interruption-checkpoint-card-red-black.svg',
    'lifecycle-checkpoints.svg', 'llm-foundation-core-path-red-black.svg', 'llm-six-terms-to-one-check.svg',
    'model-choice-is-a-test.svg', 'observable-action-boundary-red-black.svg', 'playbook-learning-journey-red-black.svg',
    'practice-target-to-first-attempt-red-black.svg', 'project-evidence-snapshot-red-black.svg',
    'prompt-contract-six-fields-red-black.svg', 'public-interest-safety-research-red-black.svg',
    'reader-page-anatomy-red-black.svg', 'reader-page-reading-loop-red-black.svg', 'reader-route-compass-red-black.svg',
    'recovery-decision-tree-red-black.svg', 'reliable-llm-work-loop-red-black.svg', 'research-question-to-source-record-red-black.svg',
    'response-claim-triage-red-black.svg', 'side-effect-boundary-decision-map.svg', 'skill-to-observable-output.svg',
    'source-check-before-belief-red-black.svg', 'task-to-evidence-red-black.svg', 'understanding-to-transfer-red-black.svg',
    'universal-seams-red-black.svg',
  ]);

  const COPY = {
    en: { skip: 'Skip to visual', language: 'Language', languageAria: 'Choose visual language', back: 'Back to visual guide', eyebrow: 'Project teaching visual', intro: 'Read the visual at a comfortable size. The surrounding lesson and the text alternative remain the explanation; the image is an orientation aid.', toolbarAria: 'Visual controls', canvasAria: 'Scrollable visual area', zoomOut: 'Zoom out', zoomIn: 'Zoom in', zoomReset: 'Reset', openRaw: 'Open this SVG', localizedStatus: 'This visual uses the selected language.', fallbackStatus: 'This visual is shown in English because a reviewed {language} version is not available yet.', boundary: 'The visual explains a relationship. It does not prove that a model acted, that a learner understood the method, or that a result is production-ready.', errorTitle: 'This visual could not be opened.', errorBody: 'The requested file is not an approved project teaching visual.' },
    zh: { skip: '跳到图示', language: '语言', languageAria: '选择图示语言', back: '返回视觉导览', eyebrow: '项目教学图示', intro: '用合适的大小阅读这张图。旁边的课程和文字说明才是解释基线；图片只是定位辅助。', toolbarAria: '图示控制', canvasAria: '可滚动的图示区域', zoomOut: '缩小', zoomIn: '放大', zoomReset: '重置', openRaw: '打开这张 SVG', localizedStatus: '这张图使用当前选择的语言。', fallbackStatus: '这张图暂时以英文显示，因为还没有经过审校的 {language} 版本。', boundary: '图示解释一种关系，但不能证明模型已经行动、学习者已经理解方法，或结果已经达到生产就绪。', errorTitle: '无法打开这张图。', errorBody: '请求的文件不是项目批准的教学图示。' },
    es: { skip: 'Saltar al visual', language: 'Idioma', languageAria: 'Elegir idioma del visual', back: 'Volver a la guía visual', eyebrow: 'Visual didáctico del proyecto', intro: 'Lee la imagen a un tamaño cómodo. La lección y la alternativa textual siguen siendo la explicación; la imagen solo ayuda a orientarse.', toolbarAria: 'Controles del visual', canvasAria: 'Área visual desplazable', zoomOut: 'Alejar', zoomIn: 'Acercar', zoomReset: 'Restablecer', openRaw: 'Abrir este SVG', localizedStatus: 'Este visual usa el idioma elegido.', fallbackStatus: 'Este visual se muestra en inglés porque aún no hay una versión {language} revisada.', boundary: 'El visual explica una relación. No demuestra que el modelo actuara, que un aprendiz entendiera el método ni que el resultado esté listo para producción.', errorTitle: 'No se pudo abrir este visual.', errorBody: 'El archivo solicitado no es un visual didáctico aprobado por el proyecto.' },
    ja: { skip: '図へ移動', language: '言語', languageAria: '図の言語を選択', back: 'ビジュアルガイドに戻る', eyebrow: 'プロジェクトの教材図', intro: '読みやすい大きさで図を確認してください。説明の基準は周囲のレッスンとテキスト代替であり、図は位置づけの補助です。', toolbarAria: '図の操作', canvasAria: 'スクロールできる図の領域', zoomOut: '縮小', zoomIn: '拡大', zoomReset: 'リセット', openRaw: 'この SVG を開く', localizedStatus: 'この図は選択した言語で表示されています。', fallbackStatus: 'この図は、レビュー済みの{language}版がまだないため、英語で表示しています。', boundary: '図は関係を説明しますが、モデルの実行、学習者の理解、結果の本番投入を証明するものではありません。', errorTitle: 'この図を開けませんでした。', errorBody: '指定されたファイルは、プロジェクトが承認した教材図ではありません。' },
    ko: { skip: '그림으로 이동', language: '언어', languageAria: '그림 언어 선택', back: '시각 안내서로 돌아가기', eyebrow: '프로젝트 교육 그림', intro: '읽기 편한 크기로 그림을 확인하세요. 설명의 기준은 주변 수업과 텍스트 대체 설명이며, 그림은 이해를 돕는 보조 자료입니다.', toolbarAria: '그림 제어', canvasAria: '스크롤 가능한 그림 영역', zoomOut: '축소', zoomIn: '확대', zoomReset: '초기화', openRaw: '이 SVG 열기', localizedStatus: '이 그림은 선택한 언어로 표시됩니다.', fallbackStatus: '검토된 {language} 버전이 아직 없어 이 그림은 영어로 표시됩니다.', boundary: '그림은 관계를 설명할 뿐 모델 실행, 학습자의 이해 또는 결과의 운영 준비를 증명하지 않습니다.', errorTitle: '그림을 열 수 없습니다.', errorBody: '요청한 파일은 프로젝트가 승인한 교육 그림이 아닙니다.' },
    de: { skip: 'Zum Visual springen', language: 'Sprache', languageAria: 'Sprache des Visuals wählen', back: 'Zur visuellen Übersicht', eyebrow: 'Lehrvisual des Projekts', intro: 'Lies das Visual in einer passenden Größe. Die umgebende Lektion und die Textalternative bleiben die Erklärung; das Bild dient der Orientierung.', toolbarAria: 'Visual-Steuerung', canvasAria: 'Scrollbarer Visual-Bereich', zoomOut: 'Verkleinern', zoomIn: 'Vergrößern', zoomReset: 'Zurücksetzen', openRaw: 'Dieses SVG öffnen', localizedStatus: 'Dieses Visual verwendet die ausgewählte Sprache.', fallbackStatus: 'Dieses Visual wird auf Englisch angezeigt, weil noch keine geprüfte {language}-Version verfügbar ist.', boundary: 'Das Visual erklärt eine Beziehung. Es belegt weder eine Handlung des Modells noch das Verständnis einer lernenden Person oder Produktionsreife.', errorTitle: 'Dieses Visual konnte nicht geöffnet werden.', errorBody: 'Die angeforderte Datei ist kein freigegebenes Lehrvisual des Projekts.' },
    'zh-tw': { skip: '跳到圖示', language: '語言', languageAria: '選擇圖示語言', back: '返回視覺導覽', eyebrow: '專案教學圖示', intro: '請用合適的大小閱讀這張圖。旁邊的課程與文字說明才是解釋基線；圖片只是定位輔助。', toolbarAria: '圖示控制', canvasAria: '可捲動的圖示區域', zoomOut: '縮小', zoomIn: '放大', zoomReset: '重設', openRaw: '開啟這張 SVG', localizedStatus: '這張圖使用目前選擇的語言。', fallbackStatus: '這張圖目前以英文顯示，因為尚未提供經過審校的{language}版本。', boundary: '圖示用來解釋一種關係，但不能證明模型已經行動、學習者已經理解方法，或結果已達到可投入生產的程度。', errorTitle: '無法開啟這張圖。', errorBody: '要求的檔案不是專案核准的教學圖示。' },
    fr: { skip: 'Aller au visuel', language: 'Langue', languageAria: 'Choisir la langue du visuel', back: 'Retour au guide visuel', eyebrow: 'Visuel pédagogique du projet', intro: 'Lisez le visuel à une taille confortable. La leçon et l’alternative textuelle restent l’explication de référence ; l’image sert à se repérer.', toolbarAria: 'Commandes du visuel', canvasAria: 'Zone visuelle défilable', zoomOut: 'Réduire', zoomIn: 'Agrandir', zoomReset: 'Réinitialiser', openRaw: 'Ouvrir ce SVG', localizedStatus: 'Ce visuel utilise la langue sélectionnée.', fallbackStatus: 'Ce visuel est affiché en anglais car aucune version {language} révisée n’est encore disponible.', boundary: 'Le visuel explique une relation. Il ne prouve ni une action du modèle, ni la compréhension de la méthode par un apprenant, ni la préparation à la production.', errorTitle: 'Impossible d’ouvrir ce visuel.', errorBody: 'Le fichier demandé n’est pas un visuel pédagogique approuvé par le projet.' },
  };

  const params = new URLSearchParams(window.location.search);
  let locale = LOCALES.includes(params.get('lang')) ? params.get('lang') : 'en';
  const asset = params.get('asset') || '';
  const label = params.get('label') || '';
  const image = document.querySelector('[data-viewer-image]');
  const title = document.querySelector('[data-viewer-title]');
  const caption = document.querySelector('[data-viewer-caption]');
  const assetStatus = document.querySelector('[data-viewer-asset-status]');
  const rawLink = document.querySelector('[data-viewer-raw]');
  const error = document.querySelector('[data-viewer-error]');
  const stage = document.querySelector('.viewer-stage');
  const canvas = document.querySelector('[data-viewer-canvas]');
  const zoomValue = document.querySelector('[data-viewer-zoom-value]');
  let zoom = 1;

  const strings = () => COPY[locale] || COPY.en;
  const resolvedAsset = () => window.PRYSAI_VISUAL_ASSETS?.resolve(asset, locale) || {
    path: `../assets/teaching/${encodeURIComponent(asset)}`,
    sourcePath: `../assets/teaching/${encodeURIComponent(asset)}`,
    status: 'english-fallback',
  };

  function setText() {
    const copy = strings();
    document.documentElement.lang = locale;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (copy[key]) node.textContent = copy[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((node) => {
      node.getAttribute('data-i18n-attr').split(';').forEach((entry) => {
        const [attribute, key] = entry.split(':');
        if (attribute && key && copy[key]) node.setAttribute(attribute, copy[key]);
      });
    });
    document.querySelectorAll('[data-viewer-home]').forEach((link) => {
      link.href = `visuals.html?lang=${encodeURIComponent(locale)}`;
    });
    const visual = resolvedAsset();
    if (image && ASSETS.has(asset)) {
      image.src = visual.path;
      image.dataset.visualLocale = locale;
      image.dataset.visualLocaleStatus = visual.status;
    }
    if (rawLink && ASSETS.has(asset)) {
      rawLink.href = visual.path;
      rawLink.dataset.visualLocaleStatus = visual.status;
    }
    if (assetStatus && ASSETS.has(asset)) {
      const languageName = document.querySelector(`#viewer-language option[value="${CSS.escape(locale)}"]`)?.textContent || locale;
      assetStatus.textContent = visual.localized
        ? copy.localizedStatus
        : copy.fallbackStatus.replace('{language}', languageName);
      assetStatus.dataset.visualLocaleStatus = visual.status;
    }
    if (title && ASSETS.has(asset)) title.textContent = label || copy.eyebrow;
    if (caption && ASSETS.has(asset)) caption.textContent = `${label || copy.eyebrow}. ${copy.boundary}`;
    if (image && ASSETS.has(asset)) image.alt = `${label || copy.eyebrow}. ${copy.boundary}`;
    const language = document.querySelector('#viewer-language');
    if (language) language.value = locale;
    updateZoomLabel();
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('lang', locale);
    window.history.replaceState({}, '', nextUrl);
  }

  function updateZoomLabel() {
    if (zoomValue) zoomValue.textContent = `${Math.round(zoom * 100)}%`;
    if (image) image.style.transform = `scale(${zoom})`;
  }

  function setZoom(next) {
    zoom = Math.min(2.5, Math.max(.5, next));
    updateZoomLabel();
  }

  function showError() {
    if (stage) stage.hidden = true;
    if (error) error.hidden = false;
  }

  if (!ASSETS.has(asset)) {
    showError();
  } else {
    setText();
    document.querySelector('[data-viewer-zoom-out]')?.addEventListener('click', () => setZoom(zoom - .25));
    document.querySelector('[data-viewer-zoom-in]')?.addEventListener('click', () => setZoom(zoom + .25));
    document.querySelector('[data-viewer-zoom-reset]')?.addEventListener('click', () => setZoom(1));
    document.querySelector('#viewer-language')?.addEventListener('change', (event) => {
      locale = LOCALES.includes(event.target.value) ? event.target.value : 'en';
      setText();
    });
    canvas?.addEventListener('keydown', (event) => {
      if (event.key === '+' || event.key === '=') { event.preventDefault(); setZoom(zoom + .25); }
      if (event.key === '-') { event.preventDefault(); setZoom(zoom - .25); }
      if (event.key === '0') { event.preventDefault(); setZoom(1); }
    });
  }
})();
