(() => {
  'use strict';

  const manifest = window.CODEX_LOCALE_MANIFEST || { default_locale: 'en', locales: {}, contents: {}, path_index: {} };
  const locales = manifest.locales || {};
  // Reader source requests are built only from the generated manifest. A URL
  // query may choose one of these registered Markdown sources, but it must not
  // choose an arbitrary same-origin path.
  const readerSourceHrefByPath = new Map(
    Object.keys(manifest.path_index || {})
      .filter((path) => path.endsWith('.md'))
      .map((path) => [path, `../${path}`]),
  );
  const validLocales = Object.keys(locales);
  const params = new URLSearchParams(window.location.search);
  const requestedLocale = validLocales.includes(params.get('lang')) ? params.get('lang') : null;
  const requestedPath = normalizeRepoPath(params.get('path') || 'book/routes/llm-foundation-core-v1-EN.md');
  let activeLocale = requestedLocale;
  const article = document.querySelector('[data-reader-article]');
  // Set the document language before the asynchronous source fetch starts.
  // Otherwise a slow localized Reader briefly exposes the English shell to
  // assistive technology and to users who can see the loading state.
  const initialLocale = requestedLocale || manifest.default_locale || 'en';
  const initialHtmlLanguage = locales[initialLocale]?.html_lang || initialLocale;
  document.documentElement.lang = initialHtmlLanguage;
  if (article) article.lang = initialHtmlLanguage;
  const banner = document.querySelector('[data-reader-banner]');
  const readerAside = document.querySelector('.reader-aside');
  const languageSelect = document.querySelector('[data-reader-language]');
  const sourcePathNode = document.querySelector('[data-reader-path]');
  const contentIdNode = document.querySelector('[data-reader-content-id]');
  const sourceLink = document.querySelector('[data-reader-source]');
  const toc = document.querySelector('[data-reader-toc]');
  const tocList = document.querySelector('[data-reader-toc-list]');
  const bookNav = document.querySelector('[data-reader-book-nav]');
  const bookProgress = document.querySelector('[data-reader-book-progress]');
  const chapterList = document.querySelector('[data-reader-chapter-list]');
  const orientation = document.querySelector('[data-reader-orientation]');
  const orientationSummary = orientation?.querySelector('summary');
  const mobileProgress = document.querySelector('[data-reader-mobile-progress]');
  const mobilePrevious = document.querySelector('[data-reader-mobile-previous]');
  const mobileNext = document.querySelector('[data-reader-mobile-next]');
  const mobilePageToc = document.querySelector('[data-reader-mobile-page-toc]');
  const mobilePageTocList = document.querySelector('[data-reader-mobile-page-toc-list]');
  const chapterCard = document.querySelector('[data-reader-chapter-card]');
  const chapterLabel = document.querySelector('[data-reader-chapter-label]');
  const chapterStatus = document.querySelector('[data-reader-chapter-status]');
  const coreCard = document.querySelector('[data-reader-core-card]');
  const coreCurrentTitle = document.querySelector('[data-reader-core-current-title]');
  const coreProgress = document.querySelector('[data-reader-core-progress]');
  const coreUnitsList = document.querySelector('[data-reader-core-units]');
  const coreNext = document.querySelector('[data-reader-core-next]');
  const coreNextTitle = document.querySelector('[data-reader-core-next-title]');
  const coreNextBody = document.querySelector('[data-reader-core-next-body]');
  const coreNextLink = document.querySelector('[data-reader-core-next-link]');
  const coreNextLinkLabel = document.querySelector('[data-reader-core-next-link-label]');
  const coreForm = document.querySelector('[data-reader-core-form]');
  const coreAttempted = document.querySelector('[data-reader-core-attempted]');
  const coreArtifact = document.querySelector('[data-reader-core-artifact]');
  const coreLimit = document.querySelector('[data-reader-core-limit]');
  const coreSave = document.querySelector('[data-reader-core-save]');
  const coreCopy = document.querySelector('[data-reader-core-copy]');
  const coreClear = document.querySelector('[data-reader-core-clear]');
  const coreStatus = document.querySelector('[data-reader-core-status]');
  const trustCard = document.querySelector('[data-reader-trust-card]');
  const trustScope = document.querySelector('[data-reader-trust-scope]');
  const trustReviewed = document.querySelector('[data-reader-trust-reviewed]');
  const trustReview = document.querySelector('[data-reader-trust-review]');
  const trustLimitations = document.querySelector('[data-reader-trust-limitations]');
  const pagination = document.querySelector('[data-reader-pagination]');
  const previousLink = document.querySelector('[data-reader-previous]');
  const previousTitle = document.querySelector('[data-reader-previous-title]');
  const nextLink = document.querySelector('[data-reader-next]');
  const nextTitle = document.querySelector('[data-reader-next-title]');
  const bookNavigation = manifest.book_navigation || { parts: [], chapters: [] };
  const labNavigation = manifest.lab_navigation || { labs: [] };
  const readerCopy = {
    en: {
      skip: 'Skip to content', back: 'Back to overview', githubBadge: 'GitHub', githubBadgeAria: 'View project on GitHub', language: 'Language', languageAria: 'Choose reading language', detailsAria: 'Page details', bookChaptersAria: 'Chapters in this part', bookChapters: 'Chapters in this part', chapterList: 'Chapter list', labSequence: 'Lab sequence', skillMethod: 'Skill method', fieldNote: 'Field note', projectDocument: 'Project document', pageDetails: 'Page details', trustRecord: 'Evidence note for this page', trustScope: 'Declared scope', trustReviewed: 'Last evidence review', trustReview: 'Next scheduled review', trustLimitations: 'One declared limitation', trustBoundary: 'A scheduled review is not a freshness guarantee. This note is not a complete risk assessment.', scopeUniversal: 'General method', scopePlatform: 'Product-specific guidance', scopeMixed: 'General method with product examples', trustUnavailable: 'unavailable', trustUnavailableDetail: 'The evidence registry could not be loaded. This is a data failure, not evidence that the page has no record.', chapterNavigationAria: 'Chapter navigation', labNavigationAria: 'Lab catalog navigation', previousChapter: 'Previous chapter', nextChapter: 'Next chapter', previousLab: 'Previous Lab', nextLab: 'Next Lab', onThisPageAria: 'On this page', onThisPage: 'On this page', readingRoute: 'Content type', sourcePath: 'Source path', contentIdentity: 'Content identity', openSource: 'Open source file ↗', footer: 'Source remains Markdown; this page is a static reading view', loading: 'Loading the source page…', copyPrompt: 'Copy prompt', copiedPrompt: 'Prompt copied', copyFailed: 'Copy failed', openVisual: 'Open full-size visual', wideTable: 'Wide table: swipe sideways to read every column.', wideTableAria: (columns) => `${columns}-column table. Scroll horizontally to read every column.`,
      chapterProgress: (number, total, partNumber, partLabel) => `Chapter ${number} of ${total} · Editorial order · Part ${partNumber} · ${partLabel}`.trim(), labProgress: (number, total) => `Lab ${number} of ${total} · Catalog order, not a prerequisite chain`, chapterCard: (number, label) => `Chapter ${number} · ${label}`, labCard: (number, title) => `Lab ${number} · ${title}`, catalogOrderOnly: 'catalog order only', contentStatus: { source: 'source', candidate: 'candidate', 'in-progress': 'in progress', verified: 'verified', 'unindexed source': 'unindexed source' }, fallbackSourceShown: (name) => `${name} source shown`,
      missingTranslation: (name) => `${name} is not available for this page yet. The Reader will not switch you to another language; return to the overview and choose an available unit.`, invalidPath: 'This reader URL does not name an allowed project source file. Return to the overview and choose a page from the guide.', loadError: (status) => `The source page could not be loaded (${status}).`, loadTimeout: 'The source page took too long to respond.', loadNetwork: 'The source page could not be reached.', retry: 'Try loading again'
    },
    zh: {
      skip: '跳到正文', back: '返回总览', githubBadge: 'GitHub', githubBadgeAria: '在 GitHub 上查看项目', language: '语言', languageAria: '选择阅读语言', detailsAria: '页面详情', bookChaptersAria: '本部分章节', bookChapters: '本部分章节', chapterList: '章节列表', labSequence: '实验编号导航', skillMethod: 'Skill 方法', fieldNote: '现场研究记录', projectDocument: '项目文档', pageDetails: '页面详情', trustRecord: '本页证据说明', trustScope: '声明范围', trustReviewed: '最近一次证据复核', trustReview: '下次计划复核', trustLimitations: '一项已声明的限制', trustBoundary: '计划复核日期不保证内容目前仍然有效。这不是完整的风险评估。', scopeUniversal: '通用方法', scopePlatform: '特定产品说明', scopeMixed: '通用方法与产品示例', trustUnavailable: '不可用', trustUnavailableDetail: '证据登记表加载失败。这是数据故障，不代表本页没有登记记录。', chapterNavigationAria: '章节导航', labNavigationAria: '实验目录导航', previousChapter: '上一章', nextChapter: '下一章', previousLab: '上一个实验', nextLab: '下一个实验', onThisPageAria: '本页目录', onThisPage: '本页目录', readingRoute: '内容类型', sourcePath: '源文件路径', contentIdentity: '内容身份', openSource: '打开源文件 ↗', footer: '源文件仍是 Markdown；此页面是静态阅读视图', loading: '正在加载源文件……', copyPrompt: '复制提示词', copiedPrompt: '提示词已复制', copyFailed: '复制失败', openVisual: '打开完整尺寸图示', wideTable: '宽表格：左右滑动以阅读所有列。', wideTableAria: (columns) => `${columns}列表格。请水平滚动以阅读所有列。`,
      chapterProgress: (number, total, partNumber, partLabel) => `第 ${number} 章 / 共 ${total} 章 · 编辑顺序 · 第 ${partNumber} 部分 · ${partLabel}`.trim(), labProgress: (number, total) => `实验 ${number} / 共 ${total} 个 · 按目录编号浏览，不代表先修顺序`, chapterCard: (number, label) => `第 ${number} 章 · ${label}`, labCard: (number, title) => `实验 ${number} · ${title}`, catalogOrderOnly: '编号仅用于目录浏览', contentStatus: { source: '原文', candidate: '候选', 'in-progress': '翻译进行中', verified: '已复核', 'unindexed source': '未索引原文' }, fallbackSourceShown: (name) => `正在显示 ${name} 原文`,
      missingTranslation: (name) => `此页面暂时没有${name}版本。阅读器不会自动切换到其他语言；请返回总览并选择已提供的单元。`, invalidPath: '这个阅读链接没有指向允许的项目源文件。请返回总览，从指南中选择页面。', loadError: (status) => `源文件加载失败（${status}）。`, loadTimeout: '源文件响应时间过长。', loadNetwork: '无法连接到源文件。', retry: '重新加载'
    }
  };

  Object.assign(readerCopy.en, {
    translationInProgress: (name) => `${name} translation is available as a candidate and is awaiting independent language review. It is not a verified translation.`,
  });
  Object.assign(readerCopy.zh, {
    translationInProgress: (name) => `${name}候选译文已可阅读，仍待独立语言审校；它不是已验证译文。`,
  });
  // Keep the Reader's controls in the language the reader selected. Course
  // coverage may still be partial, but an available candidate translation
  // should not be surrounded by an English-only shell.
  readerCopy.es = Object.assign({}, readerCopy.en, {
    skip: 'Saltar al contenido', back: 'Volver a la vista general', githubBadgeAria: 'Ver proyecto en GitHub', language: 'Idioma', languageAria: 'Elegir idioma de lectura', detailsAria: 'Detalles de la página', bookChaptersAria: 'Capítulos de esta parte', bookChapters: 'Capítulos de esta parte', chapterList: 'Lista de capítulos', labSequence: 'Secuencia de prácticas', skillMethod: 'Método reutilizable', fieldNote: 'Nota de campo', projectDocument: 'Documento del proyecto', pageDetails: 'Detalles de la página', trustRecord: 'Nota de evidencia de esta página', trustScope: 'Alcance declarado', trustReviewed: 'Última revisión de evidencia', trustReview: 'Próxima revisión programada', trustLimitations: 'Una limitación declarada', trustBoundary: 'Una revisión programada no garantiza que el contenido siga actualizado. Esta nota no es una evaluación de riesgos completa.', scopeUniversal: 'Método general', scopePlatform: 'Guía específica del producto', scopeMixed: 'Método general con ejemplos de producto', trustUnavailable: 'no disponible', trustUnavailableDetail: 'No se pudo cargar el registro de evidencia. Es un fallo de datos, no evidencia de que la página no tenga registro.', chapterNavigationAria: 'Navegación por capítulos', labNavigationAria: 'Navegación del catálogo de prácticas', previousChapter: 'Capítulo anterior', nextChapter: 'Capítulo siguiente', previousLab: 'Práctica anterior', nextLab: 'Práctica siguiente', onThisPageAria: 'En esta página', onThisPage: 'En esta página', readingRoute: 'Tipo de contenido', sourcePath: 'Ruta del archivo fuente', contentIdentity: 'Identidad del contenido', openSource: 'Abrir archivo fuente ↗', footer: 'La fuente sigue siendo Markdown; esta página es una vista de lectura estática', loading: 'Cargando la página fuente…', copyPrompt: 'Copiar indicación', copiedPrompt: 'Indicación copiada', copyFailed: 'No se pudo copiar', openVisual: 'Abrir visual a tamaño completo', wideTable: 'Tabla ancha: desliza lateralmente para leer todas las columnas.', wideTableAria: (columns) => `Tabla de ${columns} columnas. Desplázate horizontalmente para leer todas las columnas.`, chapterProgress: (number, total, partNumber, partLabel) => `Capítulo ${number} de ${total} · Orden editorial · Parte ${partNumber} · ${partLabel}`.trim(), labProgress: (number, total) => `Práctica ${number} de ${total} · Orden de catálogo, no una cadena de requisitos previos`, chapterCard: (number, label) => `Capítulo ${number} · ${label}`, labCard: (number, title) => `Práctica ${number} · ${title}`, catalogOrderOnly: 'solo para navegar por el catálogo', contentStatus: { source: 'original', candidate: 'candidata', 'in-progress': 'traducción en curso', verified: 'revisada', 'unindexed source': 'original sin indexar' }, fallbackSourceShown: (name) => `se muestra la fuente en ${name}`, missingTranslation: (name) => `${name} todavía no está disponible para esta página. El lector no cambiará a otro idioma; vuelve a la vista general y elige una unidad disponible.`, invalidPath: 'La URL del lector no indica un archivo fuente permitido. Vuelve a la vista general y elige una página de la guía.', loadError: (status) => `No se pudo cargar la página fuente (${status}).`, loadTimeout: 'La página fuente tardó demasiado en responder.', loadNetwork: 'No se pudo acceder a la página fuente.', retry: 'Intentar cargar de nuevo', translationInProgress: () => 'La traducción al español está disponible como candidata y espera una revisión lingüística independiente. No es una traducción verificada.',
  });
  readerCopy.ja = Object.assign({}, readerCopy.en, {
    skip: '本文へ移動', back: '概要に戻る', githubBadgeAria: 'GitHub でプロジェクトを見る', language: '言語', languageAria: '閲覧言語を選択', detailsAria: 'ページの詳細', bookChaptersAria: 'この部の章', bookChapters: 'この部の章', chapterList: '章の一覧', labSequence: '練習の順序', skillMethod: '再利用できる方法', fieldNote: 'フィールドノート', projectDocument: 'プロジェクト文書', pageDetails: 'ページの詳細', trustRecord: 'このページの根拠メモ', trustScope: '宣言された範囲', trustReviewed: '根拠の最終レビュー', trustReview: '次回レビュー予定', trustLimitations: '宣言された制限事項', trustBoundary: 'レビュー予定日は鮮度を保証しません。このメモは完全なリスク評価ではありません。', scopeUniversal: '一般的な方法', scopePlatform: '製品固有のガイダンス', scopeMixed: '製品例を含む一般的な方法', trustUnavailable: '利用不可', trustUnavailableDetail: '根拠の記録を読み込めませんでした。これはデータの障害であり、このページに記録がない証拠ではありません。', chapterNavigationAria: '章のナビゲーション', labNavigationAria: '練習カタログのナビゲーション', previousChapter: '前の章', nextChapter: '次の章', previousLab: '前の練習', nextLab: '次の練習', onThisPageAria: 'このページの目次', onThisPage: 'このページの目次', readingRoute: 'コンテンツ種別', sourcePath: 'ソースのパス', contentIdentity: 'コンテンツ識別子', openSource: 'ソースファイルを開く ↗', footer: 'ソースは Markdown のままです。このページは静的な閲覧表示です', loading: 'ソースページを読み込んでいます…', copyPrompt: '指示文をコピー', copiedPrompt: '指示文をコピーしました', copyFailed: 'コピーできませんでした', openVisual: '原寸の図を開く', wideTable: '横に広い表：すべての列を読むには横へスクロールしてください。', wideTableAria: (columns) => `${columns}列の表です。すべての列を読むには横へスクロールしてください。`, chapterProgress: (number, total, partNumber, partLabel) => `第${number}章 / 全${total}章 · 編集順 · 第${partNumber}部 · ${partLabel}`.trim(), labProgress: (number, total) => `練習 ${number} / ${total} · カタログ順であり、前提条件の連鎖ではありません`, chapterCard: (number, label) => `第${number}章 · ${label}`, labCard: (number, title) => `練習 ${number} · ${title}`, catalogOrderOnly: 'カタログ閲覧用の番号です', contentStatus: { source: '原文', candidate: '候補', 'in-progress': '翻訳中', verified: 'レビュー済み', 'unindexed source': '未登録の原文' }, fallbackSourceShown: (name) => `${name}の原文を表示中`, missingTranslation: (name) => `このページでは${name}版はまだ利用できません。リーダーが別の言語へ自動的に切り替えることはありません。概要に戻り、利用可能なユニットを選んでください。`, invalidPath: 'この閲覧用 URL は許可されたプロジェクトのソースファイルを指定していません。概要に戻り、ガイドからページを選んでください。', loadError: (status) => `ソースページを読み込めませんでした（${status}）。`, loadTimeout: 'ソースページの応答に時間がかかりすぎています。', loadNetwork: 'ソースページに接続できませんでした。', retry: 'もう一度読み込む', translationInProgress: () => '日本語訳は候補として利用できますが、独立した言語レビュー待ちです。検証済みの翻訳ではありません。',
  });
  readerCopy.ko = Object.assign({}, readerCopy.en, {
    skip: '본문으로 건너뛰기', back: '개요로 돌아가기', githubBadgeAria: 'GitHub에서 프로젝트 보기', language: '언어', languageAria: '읽기 언어 선택', detailsAria: '페이지 세부 정보', bookChaptersAria: '이 부분의 장', bookChapters: '이 부분의 장', chapterList: '장 목록', labSequence: '연습 순서', skillMethod: '재사용 가능한 방법', fieldNote: '현장 기록', projectDocument: '프로젝트 문서', pageDetails: '페이지 세부 정보', trustRecord: '이 페이지의 근거 메모', trustScope: '명시된 범위', trustReviewed: '마지막 근거 검토', trustReview: '다음 예정 검토', trustLimitations: '명시된 한 가지 한계', trustBoundary: '예정된 검토일이 최신성을 보장하지는 않습니다. 이 메모는 완전한 위험 평가가 아닙니다.', scopeUniversal: '일반 방법', scopePlatform: '제품별 안내', scopeMixed: '제품 예시가 포함된 일반 방법', trustUnavailable: '사용할 수 없음', trustUnavailableDetail: '근거 기록을 불러오지 못했습니다. 이는 데이터 오류이며 이 페이지에 기록이 없다는 근거가 아닙니다.', chapterNavigationAria: '장 탐색', labNavigationAria: '연습 카탈로그 탐색', previousChapter: '이전 장', nextChapter: '다음 장', previousLab: '이전 연습', nextLab: '다음 연습', onThisPageAria: '이 페이지의 목차', onThisPage: '이 페이지의 목차', readingRoute: '콘텐츠 유형', sourcePath: '원본 경로', contentIdentity: '콘텐츠 식별자', openSource: '원본 파일 열기 ↗', footer: '원본은 Markdown으로 유지되며 이 페이지는 정적 읽기 보기입니다', loading: '원본 페이지를 불러오는 중…', copyPrompt: '지시문 복사', copiedPrompt: '지시문을 복사했습니다', copyFailed: '복사하지 못했습니다', openVisual: '원본 크기 시각 자료 열기', wideTable: '넓은 표: 모든 열을 읽으려면 가로로 스크롤하세요.', wideTableAria: (columns) => `${columns}열 표입니다. 모든 열을 읽으려면 가로로 스크롤하세요.`, chapterProgress: (number, total, partNumber, partLabel) => `제${number}장 / 전체 ${total}장 · 편집 순서 · ${partNumber}부 · ${partLabel}`.trim(), labProgress: (number, total) => `연습 ${number} / ${total} · 카탈로그 순서이며 선수 조건 체인이 아닙니다`, chapterCard: (number, label) => `제${number}장 · ${label}`, labCard: (number, title) => `연습 ${number} · ${title}`, catalogOrderOnly: '카탈로그 탐색용 번호', contentStatus: { source: '원문', candidate: '후보', 'in-progress': '번역 진행 중', verified: '검토됨', 'unindexed source': '색인 없는 원문' }, fallbackSourceShown: (name) => `${name} 원문을 표시 중`, missingTranslation: (name) => `이 페이지에서는 ${name} 버전을 아직 사용할 수 없습니다. 리더는 다른 언어로 자동 전환하지 않습니다. 개요로 돌아가 사용 가능한 단위를 선택하세요.`, invalidPath: '이 Reader URL은 허용된 프로젝트 원본 파일을 가리키지 않습니다. 개요로 돌아가 안내에서 페이지를 선택하세요.', loadError: (status) => `원본 페이지를 불러오지 못했습니다(${status}).`, loadTimeout: '원본 페이지 응답 시간이 너무 깁니다.', loadNetwork: '원본 페이지에 연결할 수 없습니다.', retry: '다시 불러오기', translationInProgress: () => '한국어 번역은 후보 상태로 제공되며 독립 언어 검토를 기다리고 있습니다. 검증된 번역이 아닙니다.',
  });
  readerCopy.de = Object.assign({}, readerCopy.en, {
    skip: 'Zum Inhalt springen', back: 'Zur Übersicht', githubBadgeAria: 'Projekt auf GitHub ansehen', language: 'Sprache', languageAria: 'Lesesprache wählen', detailsAria: 'Seitendetails', bookChaptersAria: 'Kapitel in diesem Teil', bookChapters: 'Kapitel in diesem Teil', chapterList: 'Kapitelliste', labSequence: 'Übungsreihenfolge', skillMethod: 'Wiederverwendbare Methode', fieldNote: 'Feldnotiz', projectDocument: 'Projektdokument', pageDetails: 'Seitendetails', trustRecord: 'Evidenzhinweis für diese Seite', trustScope: 'Erklärter Geltungsbereich', trustReviewed: 'Letzte Evidenzprüfung', trustReview: 'Nächste geplante Prüfung', trustLimitations: 'Eine erklärte Einschränkung', trustBoundary: 'Ein geplanter Prüfungstermin ist keine Aktualitätsgarantie. Dieser Hinweis ist keine vollständige Risikobewertung.', scopeUniversal: 'Allgemeine Methode', scopePlatform: 'Produktspezifische Anleitung', scopeMixed: 'Allgemeine Methode mit Produktbeispielen', trustUnavailable: 'nicht verfügbar', trustUnavailableDetail: 'Das Evidenzregister konnte nicht geladen werden. Dies ist ein Datenfehler und kein Beleg dafür, dass die Seite keinen Eintrag hat.', chapterNavigationAria: 'Kapitelnavigation', labNavigationAria: 'Übungskatalognavigation', previousChapter: 'Vorheriges Kapitel', nextChapter: 'Nächstes Kapitel', previousLab: 'Vorherige Übung', nextLab: 'Nächste Übung', onThisPageAria: 'Auf dieser Seite', onThisPage: 'Auf dieser Seite', readingRoute: 'Inhaltstyp', sourcePath: 'Quellpfad', contentIdentity: 'Inhaltskennung', openSource: 'Quelldatei öffnen ↗', footer: 'Die Quelle bleibt Markdown; diese Seite ist eine statische Leseansicht', loading: 'Quellseite wird geladen…', copyPrompt: 'Anweisung kopieren', copiedPrompt: 'Anweisung kopiert', copyFailed: 'Kopieren fehlgeschlagen', openVisual: 'Visualisierung in voller Größe öffnen', wideTable: 'Breite Tabelle: Horizontal scrollen, um alle Spalten zu lesen.', wideTableAria: (columns) => `${columns}-spaltige Tabelle. Horizontal scrollen, um alle Spalten zu lesen.`, chapterProgress: (number, total, partNumber, partLabel) => `Kapitel ${number} von ${total} · Redaktionsreihenfolge · Teil ${partNumber} · ${partLabel}`.trim(), labProgress: (number, total) => `Übung ${number} von ${total} · Katalogreihenfolge, keine Voraussetzungskette`, chapterCard: (number, label) => `Kapitel ${number} · ${label}`, labCard: (number, title) => `Übung ${number} · ${title}`, catalogOrderOnly: 'nur Katalogreihenfolge', contentStatus: { source: 'Original', candidate: 'Kandidat', 'in-progress': 'Übersetzung in Arbeit', verified: 'geprüft', 'unindexed source': 'nicht indexiertes Original' }, fallbackSourceShown: (name) => `${name}-Quelle wird angezeigt`, missingTranslation: (name) => `${name} ist für diese Seite noch nicht verfügbar. Der Reader wechselt nicht automatisch in eine andere Sprache. Kehre zur Übersicht zurück und wähle eine verfügbare Einheit.`, invalidPath: 'Diese Reader-URL verweist nicht auf eine erlaubte Projektquelldatei. Kehre zur Übersicht zurück und wähle eine Seite aus dem Leitfaden.', loadError: (status) => `Die Quellseite konnte nicht geladen werden (${status}).`, loadTimeout: 'Die Quellseite hat zu lange nicht geantwortet.', loadNetwork: 'Die Quellseite konnte nicht erreicht werden.', retry: 'Erneut laden', translationInProgress: () => 'Die deutsche Übersetzung ist als Kandidat verfügbar und wartet auf eine unabhängige Sprachprüfung. Sie ist keine verifizierte Übersetzung.',
  });
  readerCopy['zh-tw'] = typeof window.PRYSAI_TRADITIONALIZE === 'function'
    ? window.PRYSAI_TRADITIONALIZE(readerCopy.zh)
    : Object.assign({}, readerCopy.zh);
  Object.assign(readerCopy['zh-tw'], {
    skip: '跳至正文', back: '返回總覽', githubBadgeAria: '在 GitHub 上查看專案', language: '語言', languageAria: '選擇閱讀語言', detailsAria: '頁面詳細資訊', bookChaptersAria: '本部分章節', bookChapters: '本部分章節', chapterList: '章節列表', labSequence: '實驗順序', skillMethod: '可重複使用的方法', fieldNote: '現場筆記', projectDocument: '專案文件', pageDetails: '頁面詳細資訊', trustRecord: '本頁證據備註', trustScope: '聲明範圍', trustReviewed: '最近一次證據審查', trustReview: '下一次預定審查', trustLimitations: '一項已聲明的限制', trustBoundary: '預定審查日期不保證內容仍然最新。此備註不是完整的風險評估。', scopeUniversal: '通用方法', scopePlatform: '產品專屬指引', scopeMixed: '含產品範例的通用方法', trustUnavailable: '無法使用', trustUnavailableDetail: '無法載入證據登記表。這是資料故障，不代表本頁沒有紀錄。', chapterNavigationAria: '章節導覽', labNavigationAria: '實驗目錄導覽', previousChapter: '上一章', nextChapter: '下一章', previousLab: '上一個實驗', nextLab: '下一個實驗', onThisPageAria: '本頁目錄', onThisPage: '本頁目錄', readingRoute: '內容類型', sourcePath: '來源路徑', contentIdentity: '內容識別碼', openSource: '開啟來源檔案 ↗', footer: '來源仍是 Markdown；此頁是靜態閱讀檢視', loading: '正在載入來源頁面……', copyPrompt: '複製提示詞', copiedPrompt: '提示詞已複製', copyFailed: '複製失敗', openVisual: '開啟完整尺寸圖示', wideTable: '寬表格：左右滑動以閱讀所有欄位。', wideTableAria: (columns) => `${columns} 欄表格。請水平捲動以閱讀所有欄位。`, chapterProgress: (number, total, partNumber, partLabel) => `第 ${number} 章 / 共 ${total} 章 · 編輯順序 · 第 ${partNumber} 部分 · ${partLabel}`.trim(), labProgress: (number, total) => `實驗 ${number} / 共 ${total} 個 · 依目錄編號瀏覽，不代表先修鏈`, chapterCard: (number, label) => `第 ${number} 章 · ${label}`, labCard: (number, title) => `實驗 ${number} · ${title}`, catalogOrderOnly: '僅供目錄瀏覽', contentStatus: { source: '原文', candidate: '候選', 'in-progress': '翻譯進行中', verified: '已審查', 'unindexed source': '未索引原文' }, fallbackSourceShown: (name) => `正在顯示 ${name} 原文`, missingTranslation: (name) => `此頁面暫時沒有${name}版本。閱讀器不會自動切換到其他語言；請返回總覽並選擇可用單元。`, invalidPath: '此閱讀連結沒有指向允許的專案來源檔案。請返回總覽並從指南中選擇頁面。', loadError: (status) => `來源頁面載入失敗（${status}）。`, loadTimeout: '來源頁面回應時間過長。', loadNetwork: '無法連線到來源頁面。', retry: '重新載入', translationInProgress: () => '繁體中文譯文目前可作為候選版本閱讀，仍待獨立語言審查；它不是已驗證的翻譯。'
  });
  readerCopy.fr = Object.assign({}, readerCopy.en, {
    skip: 'Aller au contenu', back: 'Retour à l’aperçu', githubBadgeAria: 'Voir le projet sur GitHub', language: 'Langue', languageAria: 'Choisir la langue de lecture', detailsAria: 'Détails de la page', bookChaptersAria: 'Chapitres de cette partie', bookChapters: 'Chapitres de cette partie', chapterList: 'Liste des chapitres', labSequence: 'Parcours des labs', skillMethod: 'Méthode réutilisable', fieldNote: 'Note de terrain', projectDocument: 'Document du projet', pageDetails: 'Détails de la page', trustRecord: 'Note de preuve pour cette page', trustScope: 'Périmètre déclaré', trustReviewed: 'Dernière revue des preuves', trustReview: 'Prochaine revue prévue', trustLimitations: 'Une limite déclarée', trustBoundary: 'Une revue prévue ne garantit pas la fraîcheur du contenu. Cette note ne constitue pas une évaluation complète des risques.', scopeUniversal: 'Méthode générale', scopePlatform: 'Guide propre au produit', scopeMixed: 'Méthode générale avec exemples de produit', trustUnavailable: 'indisponible', trustUnavailableDetail: 'Le registre des preuves n’a pas pu être chargé. Il s’agit d’un problème de données, pas d’une preuve que cette page n’a aucun registre.', chapterNavigationAria: 'Navigation entre les chapitres', labNavigationAria: 'Navigation du catalogue des labs', previousChapter: 'Chapitre précédent', nextChapter: 'Chapitre suivant', previousLab: 'Lab précédent', nextLab: 'Lab suivant', onThisPageAria: 'Sur cette page', onThisPage: 'Sur cette page', readingRoute: 'Type de contenu', sourcePath: 'Chemin du fichier source', contentIdentity: 'Identité du contenu', openSource: 'Ouvrir le fichier source ↗', footer: 'La source reste en Markdown ; cette page est une vue de lecture statique', loading: 'Chargement de la page source…', copyPrompt: 'Copier le prompt', copiedPrompt: 'Prompt copié', copyFailed: 'Échec de la copie', openVisual: 'Ouvrir le visuel en taille réelle', wideTable: 'Tableau large : faites défiler horizontalement pour lire toutes les colonnes.', wideTableAria: (columns) => `Tableau de ${columns} colonnes. Faites défiler horizontalement pour lire toutes les colonnes.`, chapterProgress: (number, total, partNumber, partLabel) => `Chapitre ${number} sur ${total} · ordre éditorial · partie ${partNumber} · ${partLabel}`.trim(), labProgress: (number, total) => `Lab ${number} sur ${total} · ordre du catalogue, pas une chaîne de prérequis`, chapterCard: (number, label) => `Chapitre ${number} · ${label}`, labCard: (number, title) => `Lab ${number} · ${title}`, catalogOrderOnly: 'ordre du catalogue uniquement', contentStatus: { source: 'source', candidate: 'candidat', 'in-progress': 'traduction en cours', verified: 'vérifié', 'unindexed source': 'source non indexée' }, fallbackSourceShown: (name) => `source ${name} affichée`, missingTranslation: (name) => `Cette page n’est pas encore disponible en ${name}. Le Reader ne basculera pas vers une autre langue ; revenez à l’aperçu et choisissez une unité disponible.`, invalidPath: 'Cette URL du Reader ne désigne pas un fichier source autorisé du projet. Revenez à l’aperçu et choisissez une page du guide.', loadError: (status) => `La page source n’a pas pu être chargée (${status}).`, loadTimeout: 'La page source met trop de temps à répondre.', loadNetwork: 'La page source est inaccessible.', retry: 'Réessayer', translationInProgress: (name) => `La traduction ${name} est disponible à titre de candidate et attend une relecture linguistique indépendante. Elle n’est pas vérifiée.`
  });
  const coreReaderCopy = {
    en: {
      coreCourseLabel: 'LLM Foundation Core v1', coreCourseIntro: 'Local-only progress. Saving a check record does not mark learning complete.', coreNextLabel: 'Next step', coreNextCurrent: (artifact) => `Read this unit, make its bounded attempt, and keep: ${artifact}.`, coreNextContinue: (artifact) => `After saving this attempt, continue to the next unit. Keep: ${artifact}.`, coreNextFinal: 'You reached the last unit. Review the check record and its limits; this panel does not certify completion.', coreArtifactHint: 'the result named in this page', coreNextOpen: 'Open this unit', coreNextContinueLink: 'Continue to the next unit', coreProgress: (done, total) => `${done} of ${total} units marked attempted locally`, coreAttemptedLabel: 'I made an attempt on this unit', coreArtifactLabel: 'What I kept (non-sensitive)', coreArtifactPlaceholder: 'Example: task card and first response saved locally', coreLimitLabel: 'Help or limit to remember', coreLimitPlaceholder: 'Example: no source check; transfer not observed', coreSave: 'Save local check record', coreCopy: 'Copy check record', coreClear: 'Clear local check record', coreSaved: 'Saved locally. This is not a completion claim.', coreCopied: 'Check record copied. Review it before sharing.', coreCopyFailed: 'Copy failed. Select the check record text manually.', coreCleared: 'Local check record cleared.', corePrivacy: 'Do not paste private data. Nothing is uploaded.', coreStatusAttempted: 'attempt recorded locally', coreStatusNotStarted: 'no local attempt recorded', coreReceiptHeader: 'LLM Foundation Core v1 local check record', coreReceiptStatus: 'Status', coreReceiptStatusValue: 'candidate / not_run', coreReceiptBoundary: 'Local self-report only; not a completion, learning, retention, transfer, or safety claim.', coreReceiptUpdated: 'Updated', coreReceiptNoData: 'No unit has a local check record.', coreStorageError: 'This browser did not allow local storage; nothing was saved.'
    },
    zh: {
      coreCourseLabel: 'LLM 基础核心 v1', coreCourseIntro: '进度只保存在本地。保存记录不代表完成学习。', coreNextLabel: '下一步', coreNextCurrent: (artifact) => `先读完这个单元，完成其中有边界的尝试，并保留：${artifact}。`, coreNextContinue: (artifact) => `保存这次尝试后，继续下一个单元。请保留：${artifact}。`, coreNextFinal: '你已到达最后一个单元。请检查记录和限制；此面板不代表课程完成。', coreArtifactHint: '本页写明的产物', coreNextOpen: '打开这个单元', coreNextContinueLink: '继续下一个单元', coreProgress: (done, total) => `${total} 个单元中有 ${done} 个已在本地记录尝试`, coreAttemptedLabel: '我已尝试这个单元', coreArtifactLabel: '我保留了什么（不要写敏感信息）', coreArtifactPlaceholder: '例如：任务卡和第一次回答已保存在本地', coreLimitLabel: '使用的帮助或仍有限制', coreLimitPlaceholder: '例如：没有做来源检查；尚未观察迁移', coreSave: '保存本地记录', coreCopy: '复制记录', coreClear: '清除本地记录', coreSaved: '已保存在本地。这不是完成声明。', coreCopied: '记录已复制。分享前请自行检查。', coreCopyFailed: '复制失败，请手动选择记录文本。', coreCleared: '本地记录已清除。', corePrivacy: '不要粘贴私密数据。任何内容都不会上传。', coreStatusAttempted: '已在本地记录尝试', coreStatusNotStarted: '尚未记录本地尝试', coreReceiptHeader: 'LLM 基础核心 v1 本地记录', coreReceiptStatus: '状态', coreReceiptStatusValue: 'candidate / not_run', coreReceiptBoundary: '仅是本地自我记录；不代表完成、学习、保持、迁移或安全性声明。', coreReceiptUpdated: '更新时间', coreReceiptNoData: '还没有单元保存本地记录。', coreStorageError: '此浏览器不允许本地存储；没有保存任何内容。'
    },
    es: {
      coreCourseLabel: 'Núcleo de fundamentos LLM v1', coreCourseIntro: 'El progreso solo se guarda localmente. Guardar un registro de comprobación no marca el aprendizaje como completado.', coreNextLabel: 'Siguiente paso', coreNextCurrent: (artifact) => `Lee esta unidad, realiza su intento acotado y conserva: ${artifact}.`, coreNextContinue: (artifact) => `Después de guardar este intento, continúa con la unidad siguiente. Conserva: ${artifact}.`, coreNextFinal: 'Has llegado a la última unidad. Revisa el registro de comprobación y sus límites; este panel no certifica la finalización.', coreArtifactHint: 'el resultado indicado en esta página', coreNextOpen: 'Abrir esta unidad', coreNextContinueLink: 'Continuar con la unidad siguiente', coreProgress: (done, total) => `${done} de ${total} unidades tienen un intento local`, coreAttemptedLabel: 'Hice un intento en esta unidad', coreArtifactLabel: 'Qué conservé (sin datos sensibles)', coreArtifactPlaceholder: 'Ejemplo: guardé localmente la tarjeta y la primera respuesta', coreLimitLabel: 'Ayuda usada o límite pendiente', coreLimitPlaceholder: 'Ejemplo: no comprobé fuentes; la transferencia no se observó', coreSave: 'Guardar registro de comprobación', coreCopy: 'Copiar registro de comprobación', coreClear: 'Borrar registro de comprobación', coreSaved: 'Guardado localmente. No es una declaración de finalización.', coreCopied: 'Registro de comprobación copiado. Revísalo antes de compartirlo.', coreCopyFailed: 'No se pudo copiar; selecciona el texto manualmente.', coreCleared: 'Registro de comprobación borrado.', corePrivacy: 'No pegues datos privados. Nada se sube.', coreStatusAttempted: 'intento registrado localmente', coreStatusNotStarted: 'sin intento local registrado', coreReceiptHeader: 'Registro local de comprobación del núcleo de fundamentos LLM v1', coreReceiptStatus: 'Estado', coreReceiptStatusValue: 'candidate / not_run', coreReceiptBoundary: 'Solo es un registro personal local; no declara finalización, aprendizaje, retención, transferencia ni seguridad.', coreReceiptUpdated: 'Actualizado', coreReceiptNoData: 'Ninguna unidad tiene un registro de comprobación local.', coreStorageError: 'Este navegador no permitió el almacenamiento local; no se guardó nada.'
    },
    ja: {
      coreCourseLabel: 'LLM 基礎コア v1', coreCourseIntro: '進捗はこのブラウザー内だけに保存されます。確認記録を保存しても、学習完了を意味しません。', coreNextLabel: '次のステップ', coreNextCurrent: (artifact) => `このユニットを読み、範囲を決めた試行を行い、次を残します：${artifact}。`, coreNextContinue: (artifact) => `この試行を保存したら、次のユニットへ進みます。残すもの：${artifact}。`, coreNextFinal: '最後のユニットまで来ました。確認記録と限界を確認してください。このパネルは完了を証明しません。', coreArtifactHint: 'このページに示された成果物', coreNextOpen: 'このユニットを開く', coreNextContinueLink: '次のユニットへ進む', coreProgress: (done, total) => `${total}ユニット中${done}ユニットでローカルに試行を記録`, coreAttemptedLabel: 'このユニットを試した', coreArtifactLabel: '残したもの（機密情報なし）', coreArtifactPlaceholder: '例：タスクカードと最初の回答をローカルに保存', coreLimitLabel: '使った助け、または残る限界', coreLimitPlaceholder: '例：出典確認なし、転移は未観察', coreSave: 'ローカル確認記録を保存', coreCopy: '確認記録をコピー', coreClear: 'ローカル確認記録を消去', coreSaved: 'ローカルに保存しました。完了の主張ではありません。', coreCopied: '確認記録をコピーしました。共有前に確認してください。', coreCopyFailed: 'コピーできません。確認記録を手動で選択してください。', coreCleared: 'ローカル確認記録を消去しました。', corePrivacy: '個人情報を貼り付けないでください。アップロードは行いません。', coreStatusAttempted: 'ローカルに試行を記録済み', coreStatusNotStarted: 'ローカルの試行記録なし', coreReceiptHeader: 'LLM 基礎コア v1 ローカル確認記録', coreReceiptStatus: 'ステータス', coreReceiptStatusValue: 'candidate / not_run', coreReceiptBoundary: 'ローカルの自己記録にすぎません。完了、学習、保持、転移、安全性を主張するものではありません。', coreReceiptUpdated: '更新', coreReceiptNoData: '確認記録があるユニットはありません。', coreStorageError: 'このブラウザーはローカル保存を許可しませんでした。何も保存していません。'
    },
    ko: {
      coreCourseLabel: 'LLM 기초 코어 v1', coreCourseIntro: '진행 상태는 이 브라우저에만 저장됩니다. 점검 기록을 저장해도 학습 완료를 의미하지 않습니다.', coreNextLabel: '다음 단계', coreNextCurrent: (artifact) => `이 단원을 읽고 범위가 정해진 시도를 한 뒤 다음을 남기세요: ${artifact}.`, coreNextContinue: (artifact) => `이 시도를 저장한 뒤 다음 단원으로 가세요. 남길 것: ${artifact}.`, coreNextFinal: '마지막 단원까지 왔습니다. 점검 기록과 한계를 확인하세요. 이 패널은 완료를 증명하지 않습니다.', coreArtifactHint: '이 페이지에 적힌 결과물', coreNextOpen: '이 단원 열기', coreNextContinueLink: '다음 단원으로 계속', coreProgress: (done, total) => `${total}개 단원 중 ${done}개에 로컬 시도가 기록됨`, coreAttemptedLabel: '이 단원을 시도했습니다', coreArtifactLabel: '남긴 것 (민감 정보 제외)', coreArtifactPlaceholder: '예: 작업 카드와 첫 응답을 로컬에 저장', coreLimitLabel: '사용한 도움 또는 남은 한계', coreLimitPlaceholder: '예: 출처 확인 없음; 전이는 관찰하지 않음', coreSave: '로컬 점검 기록 저장', coreCopy: '점검 기록 복사', coreClear: '로컬 점검 기록 지우기', coreSaved: '로컬에 저장했습니다. 완료를 주장하는 기록이 아닙니다.', coreCopied: '점검 기록을 복사했습니다. 공유하기 전에 확인하세요.', coreCopyFailed: '복사하지 못했습니다. 점검 기록을 직접 선택하세요.', coreCleared: '로컬 점검 기록을 지웠습니다.', corePrivacy: '개인 정보를 붙여넣지 마세요. 업로드되지 않습니다.', coreStatusAttempted: '로컬 시도 기록 있음', coreStatusNotStarted: '로컬 시도 기록 없음', coreReceiptHeader: 'LLM 기초 코어 v1 로컬 점검 기록', coreReceiptStatus: '상태', coreReceiptStatusValue: 'candidate / not_run', coreReceiptBoundary: '로컬 자기 기록일 뿐이며 완료, 학습, 유지, 전이 또는 안전성 주장이 아닙니다.', coreReceiptUpdated: '업데이트', coreReceiptNoData: '점검 기록이 있는 단원이 없습니다.', coreStorageError: '이 브라우저는 로컬 저장을 허용하지 않았습니다. 아무것도 저장하지 않았습니다.'
    },
    de: {
      coreCourseLabel: 'LLM-Grundlagenkern v1', coreCourseIntro: 'Der Fortschritt bleibt lokal. Ein gespeichertes Prüfprotokoll markiert das Lernen nicht als abgeschlossen.', coreNextLabel: 'Nächster Schritt', coreNextCurrent: (artifact) => `Lies diese Einheit, führe den begrenzten Versuch durch und behalte: ${artifact}.`, coreNextContinue: (artifact) => `Speichere diesen Versuch und gehe dann zur nächsten Einheit. Behalte: ${artifact}.`, coreNextFinal: 'Du bist bei der letzten Einheit. Prüfe das Prüfprotokoll und seine Grenzen; dieses Panel bestätigt keinen Abschluss.', coreArtifactHint: 'das auf dieser Seite genannte Ergebnis', coreNextOpen: 'Diese Einheit öffnen', coreNextContinueLink: 'Mit der nächsten Einheit fortfahren', coreProgress: (done, total) => `${done} von ${total} Einheiten lokal als versucht markiert`, coreAttemptedLabel: 'Ich habe diese Einheit versucht', coreArtifactLabel: 'Was ich behalten habe (keine sensiblen Daten)', coreArtifactPlaceholder: 'Beispiel: Aufgabenkarte und erste Antwort lokal gespeichert', coreLimitLabel: 'Verwendete Hilfe oder offene Grenze', coreLimitPlaceholder: 'Beispiel: keine Quellenprüfung; Transfer nicht beobachtet', coreSave: 'Lokales Prüfprotokoll speichern', coreCopy: 'Prüfprotokoll kopieren', coreClear: 'Lokales Prüfprotokoll löschen', coreSaved: 'Lokal gespeichert. Dies ist keine Abschlussbehauptung.', coreCopied: 'Prüfprotokoll kopiert. Vor dem Teilen prüfen.', coreCopyFailed: 'Kopieren fehlgeschlagen; Prüfprotokoll manuell auswählen.', coreCleared: 'Lokales Prüfprotokoll gelöscht.', corePrivacy: 'Keine privaten Daten einfügen. Es wird nichts hochgeladen.', coreStatusAttempted: 'Versuch lokal erfasst', coreStatusNotStarted: 'kein lokaler Versuch erfasst', coreReceiptHeader: 'Lokales Prüfprotokoll für den LLM-Grundlagenkern v1', coreReceiptStatus: 'Status', coreReceiptStatusValue: 'candidate / not_run', coreReceiptBoundary: 'Nur ein lokaler Selbstbericht; keine Aussage über Abschluss, Lernen, Behalten, Transfer oder Sicherheit.', coreReceiptUpdated: 'Aktualisiert', coreReceiptNoData: 'Für keine Einheit gibt es ein lokales Prüfprotokoll.', coreStorageError: 'Dieser Browser erlaubt keine lokale Speicherung; nichts wurde gespeichert.'
    },
    'zh-tw': {
      coreCourseLabel: 'LLM 基礎核心 v1', coreCourseIntro: '進度只會儲存在本機。儲存核對紀錄不代表完成學習。', coreNextLabel: '下一步', coreNextCurrent: (artifact) => `先閱讀這個單元，完成有明確範圍的嘗試，並保留：${artifact}。`, coreNextContinue: (artifact) => `儲存這次嘗試後，繼續下一個單元。請保留：${artifact}。`, coreNextFinal: '你已到達最後一個單元。請檢查核對紀錄與限制；此面板不代表課程完成。', coreArtifactHint: '本頁寫明的成果物', coreNextOpen: '開啟這個單元', coreNextContinueLink: '繼續下一個單元', coreProgress: (done, total) => `${total} 個單元中有 ${done} 個已在本機記錄嘗試`, coreAttemptedLabel: '我已嘗試這個單元', coreArtifactLabel: '我保留了什麼（不要寫入敏感資料）', coreArtifactPlaceholder: '例如：將任務卡與第一次回答儲存在本機', coreLimitLabel: '使用的協助或仍存在的限制', coreLimitPlaceholder: '例如：未檢查來源；尚未觀察遷移', coreSave: '儲存本機核對紀錄', coreCopy: '複製核對紀錄', coreClear: '清除本機核對紀錄', coreSaved: '已儲存在本機。這不是完成聲明。', coreCopied: '核對紀錄已複製。分享前請自行檢查。', coreCopyFailed: '複製失敗，請手動選取核對紀錄文字。', coreCleared: '本機核對紀錄已清除。', corePrivacy: '不要貼上私人資料。任何內容都不會上傳。', coreStatusAttempted: '已在本機記錄嘗試', coreStatusNotStarted: '尚未記錄本機嘗試', coreReceiptHeader: 'LLM 基礎核心 v1 本機核對紀錄', coreReceiptStatus: '狀態', coreReceiptStatusValue: 'candidate / not_run', coreReceiptBoundary: '僅是本機自我記錄；不代表完成、學習、保留、遷移或安全性聲明。', coreReceiptUpdated: '更新時間', coreReceiptNoData: '尚無單元儲存本機核對紀錄。', coreStorageError: '此瀏覽器不允許本機儲存；沒有儲存任何內容。'
    },
    fr: {
      coreCourseLabel: 'Parcours fondamental LLM v1', coreCourseIntro: 'La progression reste dans ce navigateur. Enregistrer une vérification ne signifie pas que l’apprentissage est terminé.', coreNextLabel: 'Étape suivante', coreNextCurrent: (artifact) => `Lisez cette unité, faites l’essai délimité demandé et conservez : ${artifact}.`, coreNextContinue: (artifact) => `Après avoir enregistré cet essai, passez à l’unité suivante. Conservez : ${artifact}.`, coreNextFinal: 'Vous avez atteint la dernière unité. Relisez la fiche de vérification et ses limites ; ce panneau ne certifie pas la fin du parcours.', coreArtifactHint: 'le résultat indiqué sur cette page', coreNextOpen: 'Ouvrir cette unité', coreNextContinueLink: 'Passer à l’unité suivante', coreProgress: (done, total) => `${done} unité(s) sur ${total} marquée(s) comme tentée(s) localement`, coreAttemptedLabel: 'J’ai essayé cette unité', coreArtifactLabel: 'Ce que j’ai conservé (sans données sensibles)', coreArtifactPlaceholder: 'Exemple : carte de tâche et première réponse enregistrées localement', coreLimitLabel: 'Aide utilisée ou limite à retenir', coreLimitPlaceholder: 'Exemple : sources non vérifiées ; transfert non observé', coreSave: 'Enregistrer la vérification locale', coreCopy: 'Copier la vérification', coreClear: 'Effacer la vérification locale', coreSaved: 'Enregistré localement. Ce n’est pas une déclaration de réussite.', coreCopied: 'Vérification copiée. Relisez-la avant de la partager.', coreCopyFailed: 'Échec de la copie ; sélectionnez le texte manuellement.', coreCleared: 'Vérification locale effacée.', corePrivacy: 'Ne collez pas de données privées. Rien n’est envoyé.', coreStatusAttempted: 'essai enregistré localement', coreStatusNotStarted: 'aucun essai local enregistré', coreReceiptHeader: 'Fiche de vérification locale du parcours fondamental LLM v1', coreReceiptStatus: 'Statut', coreReceiptStatusValue: 'candidate / not_run', coreReceiptBoundary: 'Auto-déclaration locale uniquement ; elle ne prouve ni la fin du parcours, ni l’apprentissage, ni la rétention, ni le transfert, ni la sécurité.', coreReceiptUpdated: 'Mise à jour', coreReceiptNoData: 'Aucune unité ne possède encore de fiche locale.', coreStorageError: 'Ce navigateur n’autorise pas le stockage local ; rien n’a été enregistré.'
    },
  };
  Object.entries(coreReaderCopy).forEach(([locale, copy]) => Object.assign(readerCopy[locale], copy));

  const coreUnits = [
    { id: 'core-first-success', contentId: 'llm-foundation-core-v1', path: 'book/routes/llm-foundation-core-v1-EN.md', titles: { en: 'Start with one safe attempt', zh: '从一次安全尝试开始', es: 'Empieza con un intento seguro', ja: '安全な試行から始める', ko: '안전한 시도 하나로 시작하기', de: 'Mit einem sicheren Versuch beginnen', 'zh-tw': '從一次安全嘗試開始', fr: 'Commencer par un essai sûr' } },
    { id: 'core-first-generation', contentId: 'llm-core-first-generation', path: 'book/routes/llm-core-first-generation-EN.md', titles: { en: 'Context, instruction, and a first generation', zh: '上下文、指令与第一次生成', es: 'Contexto, instrucción y primera generación', ja: 'コンテキスト、指示、最初の生成', ko: '맥락, 지시, 첫 생성', de: 'Kontext, Anweisung und erste Ausgabe', 'zh-tw': '上下文、指令與第一次生成', fr: 'Contexte, consigne et première réponse' } },
    { id: 'core-visible-failures', contentId: 'llm-core-visible-failures', path: 'book/routes/llm-core-visible-failures-EN.md', titles: { en: 'Recognize visible failure modes', zh: '识别可见的失败模式', es: 'Reconocer fallos visibles', ja: '見える失敗パターンを認識する', ko: '눈에 보이는 실패 유형 알아보기', de: 'Sichtbare Fehlerarten erkennen', 'zh-tw': '辨識看得見的失敗模式', fr: 'Repérer les erreurs visibles' } },
    { id: 'core-check-repair', contentId: 'llm-core-check-repair', path: 'book/routes/llm-core-check-repair-EN.md', titles: { en: 'Check, repair, and state limits', zh: '检查、修正并说明限制', es: 'Comprobar, reparar y declarar límites', ja: '確認、修正、限界の明示', ko: '확인하고 고치며 한계 밝히기', de: 'Prüfen, reparieren und Grenzen nennen', 'zh-tw': '檢查、修正並說明限制', fr: 'Vérifier, corriger et dire les limites' } },
    { id: 'core-unseen-transfer', contentId: 'llm-core-unseen-transfer', path: 'book/routes/llm-core-unseen-transfer-EN.md', titles: { en: 'Repeat the method on an unseen task', zh: '在未见任务上重复方法', es: 'Repetir el método en una tarea nueva', ja: '未知の課題で方法を繰り返す', ko: '새 과제에서 방법 반복하기', de: 'Die Methode auf eine neue Aufgabe übertragen', 'zh-tw': '在未見任務上重複這套方法', fr: 'Réutiliser la méthode sur une nouvelle tâche' } },
  ];
  const coreUnitArtifacts = {
    en: ['an explanation card and three-observation table', 'a four-field task card and first output', 'four labeled failures with source quotes', 'a check table, minimal difference, and limit', 'an independent task check record'],
    zh: ['一张解释卡和三项观察表', '一张四字段任务卡和第一次输出', '四个带来源引文的失败标记', '一张检查表、最小差异和一项限制', '一份独立任务检查记录'],
    es: ['una tarjeta de explicación y una tabla de tres observaciones', 'una tarjeta de tarea de cuatro campos y la primera salida', 'cuatro fallos etiquetados con citas de la fuente', 'una tabla de comprobación, una diferencia mínima y un límite', 'un registro de comprobación de la tarea'],
    ja: ['説明カードと3観察の表', '4項目のタスクカードと最初の出力', '出典の引用付きで分類した4つの失敗', '確認表、最小差分、1つの限界', '独立したタスク確認記録'],
    ko: ['설명 카드와 세 가지 관찰 표', '네 필드 작업 카드와 첫 출력', '출처 인용이 붙은 네 가지 실패 표시', '확인 표, 최소 차이, 한 가지 한계', '독립 작업 기록'],
    de: ['eine Erklärungskarte und eine Tabelle mit drei Beobachtungen', 'eine Aufgabenkarte mit vier Feldern und die erste Ausgabe', 'vier markierte Fehler mit Quellenzitaten', 'eine Prüftabelle, die kleinste Änderung und eine Grenze', 'einen unabhängigen Aufgabenbeleg'],
    'zh-tw': ['一張解釋卡與三項觀察表', '一張四欄位任務卡與第一次輸出', '四個附來源引文的失敗標記', '一張檢查表、最小差異與一項限制', '一份獨立任務核對紀錄'],
    fr: ['une fiche d’explication et un tableau de trois observations', 'une carte de tâche à quatre champs et la première réponse', 'quatre erreurs repérées avec leurs citations sources', 'un tableau de vérification, une différence minimale et une limite', 'une fiche indépendante de vérification de tâche'],
  };
  const coreStorageKey = 'prysai-llm-foundation-core-receipt-v1';
  const coreReceiptVersion = 1;
  let coreStorageAvailable = true;
  let coreReceipts = {};
  let coreCurrentUnitId = null;

  function sanitizeCoreText(value) {
    return typeof value === 'string' ? value.trim().slice(0, 500) : '';
  }

  function sanitizeCoreEntry(entry) {
    if (!entry || typeof entry !== 'object') return null;
    const updatedAt = typeof entry.updatedAt === 'string' && !Number.isNaN(Date.parse(entry.updatedAt))
      ? entry.updatedAt
      : '';
    return {
      attempted: entry.attempted === true,
      artifact: sanitizeCoreText(entry.artifact),
      limit: sanitizeCoreText(entry.limit),
      updatedAt,
    };
  }

  function readCoreReceipts() {
    let raw = null;
    try {
      if (!window.localStorage) throw new Error('local storage unavailable');
      raw = window.localStorage.getItem(coreStorageKey);
    } catch (_) {
      coreStorageAvailable = false;
      return {};
    }
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.version !== coreReceiptVersion || !parsed.units || typeof parsed.units !== 'object') return {};
      return Object.fromEntries(coreUnits
        .map((unit) => [unit.id, sanitizeCoreEntry(parsed.units[unit.id])])
        .filter(([, entry]) => entry));
    } catch (_) {
      return {};
    }
  }

  function writeCoreReceipts() {
    try {
      if (!window.localStorage) throw new Error('local storage unavailable');
      window.localStorage.setItem(coreStorageKey, JSON.stringify({ version: coreReceiptVersion, units: coreReceipts }));
      coreStorageAvailable = true;
      return true;
    } catch (_) {
      coreStorageAvailable = false;
      return false;
    }
  }

  function clearCoreReceipts() {
    try {
      if (!window.localStorage) throw new Error('local storage unavailable');
      window.localStorage.removeItem(coreStorageKey);
      coreReceipts = {};
      coreStorageAvailable = true;
      return true;
    } catch (_) {
      coreStorageAvailable = false;
      return false;
    }
  }

  function coreUnitTitle(unit) {
    return unit.titles?.[uiLanguage()] || unit.titles?.en || unit.id;
  }

  function coreReceiptText() {
    const strings = currentReaderCopy();
    const lines = [
      strings.coreReceiptHeader,
      `${strings.coreReceiptStatus}: ${strings.coreReceiptStatusValue}`,
      strings.coreReceiptBoundary,
      `${strings.coreReceiptUpdated}: ${new Date().toISOString()}`,
      '',
    ];
    coreUnits.forEach((unit, index) => {
      const entry = coreReceipts[unit.id];
      lines.push(`${index + 1}. ${coreUnitTitle(unit)} — ${entry?.attempted ? strings.coreStatusAttempted : strings.coreStatusNotStarted}`);
      if (entry?.artifact) lines.push(`   ${strings.coreArtifactLabel}: ${entry.artifact}`);
      if (entry?.limit) lines.push(`   ${strings.coreLimitLabel}: ${entry.limit}`);
    });
    if (Object.keys(coreReceipts).length === 0) lines.push('', strings.coreReceiptNoData);
    return lines.join('\n');
  }

  function coreArtifactLabel(index) {
    const labels = coreUnitArtifacts[uiLanguage()] || coreUnitArtifacts.en;
    return labels[index] || coreUnitArtifacts.en[index] || '';
  }

  function renderCoreTracker(selection) {
    if (!coreCard || !coreUnitsList || !coreForm) return;
    const currentUnit = coreUnits.find((unit) => unit.contentId === selection?.contentId);
    if (!currentUnit) {
      coreCurrentUnitId = null;
      coreCard.hidden = true;
      return;
    }
    coreCurrentUnitId = currentUnit.id;
    const strings = currentReaderCopy();
    coreCard.hidden = false;
    coreCurrentTitle.textContent = coreUnitTitle(currentUnit);
    const attemptedCount = coreUnits.filter((unit) => coreReceipts[unit.id]?.attempted === true).length;
    coreProgress.textContent = strings.coreProgress(attemptedCount, coreUnits.length);
    coreUnitsList.replaceChildren();
    coreUnits.forEach((unit, index) => {
      const item = document.createElement('li');
      item.className = unit.id === currentUnit.id ? 'is-current' : '';
      const link = document.createElement('a');
      link.href = readerHref(unit.path, '', activeLocale);
      link.textContent = `${index + 1}. ${coreUnitTitle(unit)}`;
      if (unit.id === currentUnit.id) link.setAttribute('aria-current', 'page');
      const status = document.createElement('span');
      status.textContent = coreReceipts[unit.id]?.attempted === true
        ? strings.coreStatusAttempted
        : strings.coreStatusNotStarted;
      item.append(link, status);
      coreUnitsList.append(item);
    });
    const currentIndex = coreUnits.indexOf(currentUnit);
    const currentAttempted = coreReceipts[currentUnit.id]?.attempted === true;
    const nextUnit = currentAttempted ? coreUnits[currentIndex + 1] : currentUnit;
    const nextIndex = nextUnit ? coreUnits.indexOf(nextUnit) : -1;
    if (coreNext && coreNextTitle && coreNextBody && coreNextLink && coreNextLinkLabel) {
      coreNext.hidden = false;
      if (!nextUnit) {
        coreNextTitle.textContent = currentUnit.titles?.[uiLanguage()] || currentUnit.titles?.en || currentUnit.id;
        coreNextBody.textContent = strings.coreNextFinal;
        coreNextLink.hidden = true;
      } else {
        coreNextTitle.textContent = coreUnitTitle(nextUnit);
        coreNextBody.textContent = currentAttempted
          ? strings.coreNextContinue(coreArtifactLabel(nextIndex))
          : strings.coreNextCurrent(coreArtifactLabel(nextIndex));
        coreNextLink.hidden = false;
        coreNextLink.href = readerHref(nextUnit.path, '', activeLocale);
        coreNextLinkLabel.textContent = currentAttempted ? strings.coreNextContinueLink : strings.coreNextOpen;
        coreNextLink.setAttribute('aria-label', coreNextLinkLabel.textContent);
      }
    }
    const entry = coreReceipts[currentUnit.id] || {};
    coreAttempted.checked = entry.attempted === true;
    coreArtifact.value = entry.artifact || '';
    coreLimit.value = entry.limit || '';
    coreStatus.textContent = coreStorageAvailable ? '' : strings.coreStorageError;
  }

  coreReceipts = readCoreReceipts();
  const uiLanguage = () => readerCopy[activeLocale || requestedLocale] ? activeLocale || requestedLocale : 'en';
  const currentReaderCopy = () => readerCopy[uiLanguage()];
  const applyReaderChrome = () => {
    const strings = currentReaderCopy();
    document.querySelectorAll('[data-reader-i18n]').forEach((element) => {
      const key = element.dataset.readerI18n;
      if (strings[key]) element.textContent = strings[key];
    });
    document.querySelectorAll('[data-reader-i18n-attr]').forEach((element) => {
      element.dataset.readerI18nAttr.split(';').forEach((entry) => {
        const [attribute, key] = entry.split(':');
        if (attribute && key && strings[key]) element.setAttribute(attribute, strings[key]);
      });
    });
    const loading = document.querySelector('[data-reader-loading]');
    if (loading) loading.textContent = strings.loading;
  const optionLabels = {
      en: { en: 'English', zh: 'Simplified Chinese', es: 'Spanish', ja: 'Japanese', ko: 'Korean', de: 'German', 'zh-tw': 'Traditional Chinese' },
      zh: { en: '英语', zh: '简体中文', es: '西班牙语', ja: '日语', ko: '韩语', de: '德语', 'zh-tw': '繁体中文' },
      es: { en: 'Inglés', zh: 'Chino simplificado', es: 'Español', ja: 'Japonés', ko: 'Coreano', de: 'Alemán', 'zh-tw': 'Chino tradicional' },
      ja: { en: '英語', zh: '簡体字中国語', es: 'スペイン語', ja: '日本語', ko: '韓国語', de: 'ドイツ語', 'zh-tw': '繁体字中国語' },
      ko: { en: '영어', zh: '중국어 간체', es: '스페인어', ja: '일본어', ko: '한국어', de: '독일어', 'zh-tw': '중국어 번체' },
      de: { en: 'Englisch', zh: 'Vereinfachtes Chinesisch', es: 'Spanisch', ja: 'Japanisch', ko: 'Koreanisch', de: 'Deutsch', 'zh-tw': 'Traditionelles Chinesisch' },
      'zh-tw': { en: 'English', zh: '簡體中文', es: '西班牙文', ja: '日文', ko: '韓文', de: '德文', 'zh-tw': '繁體中文' },
      fr: { en: 'anglais', zh: 'chinois simplifié', es: 'espagnol', ja: 'japonais', ko: 'coréen', de: 'allemand', 'zh-tw': 'chinois traditionnel', fr: 'français' },
    }[uiLanguage()] || {};
    document.querySelectorAll('[data-reader-language] option').forEach((option) => {
      option.textContent = optionLabels[option.value] || option.textContent;
    });
  };
  const setReaderStatus = (message, { assertive = false } = {}) => {
    banner.textContent = message;
    banner.setAttribute('role', assertive ? 'alert' : 'status');
    banner.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
    banner.hidden = !message;
  };
  const fetchTimeoutMs = Number.isFinite(window.CODEX_READER_FETCH_TIMEOUT_MS)
    ? Math.max(100, window.CODEX_READER_FETCH_TIMEOUT_MS)
    : 8_000;

  async function fetchWithTimeout(url, consume = null, requestOptions = {}) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), fetchTimeoutMs);
    try {
      const response = await fetch(url, { ...requestOptions, signal: controller.signal });
      return consume ? await consume(response) : response;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  applyReaderChrome();

  function normalizeRepoPath(value) {
    const output = [];
    for (const segment of String(value).replace(/\\/g, '/').split('/')) {
      if (!segment || segment === '.') continue;
      if (segment === '..') output.pop();
      else output.push(segment);
    }
    return output.join('/');
  }

  function escapeText(value) {
    return String(value).replace(/\s+$/, '');
  }

  function stripQueryAndHash(value) {
    return String(value).split('#', 1)[0].split('?', 1)[0];
  }

  function splitDestination(value) {
    const match = String(value).match(/^\s*(\S+?)(?:\s+["']([^"']*)["'])?\s*$/);
    return { target: match?.[1] || '', title: match?.[2] || '' };
  }

  function sourceDirectory(path) {
    const parts = path.split('/');
    parts.pop();
    return parts.join('/');
  }

  function resolveSourcePath(path, target) {
    if (!target || target.startsWith('#') || /^(?:https?:|mailto:|data:|javascript:)/i.test(target)) return null;
    const raw = stripQueryAndHash(target).replace(/^\//, '');
    return normalizeRepoPath(`${sourceDirectory(path)}/${raw}`);
  }

  function hashFrom(value) {
    const marker = String(value).indexOf('#');
    return marker === -1 ? '' : String(value).slice(marker);
  }

  function readerHref(path, hash = '', locale = activeLocale) {
    const localeQuery = validLocales.includes(locale) ? `&lang=${encodeURIComponent(locale)}` : '';
    return `reader.html?path=${encodeURIComponent(path)}${localeQuery}${hash}`;
  }

function chapterTitle(chapter) {
    const locale = uiLanguage();
    return chapter[`title_${locale}`] || chapter.title?.[locale] || chapter.title_en || chapter.title?.en || '';
}

function canonicalChapterTitle(chapter) {
    const locale = uiLanguage();
    return chapter[`canonical_title_${locale}`] || chapter.canonical_title?.[locale] || chapter.canonical_title_en || chapter.canonical_title?.en || '';
}

  function chapterPath(chapter) {
    const record = manifest.contents?.[chapter.content_id];
    const requested = record?.locales?.[activeLocale];
    return requested?.path || chapter.legacy_path || chapter.english_path;
  }

  function chapterLink(chapter) {
    return readerHref(chapterPath(chapter), '', activeLocale);
  }

  function chapterForSelection(selection) {
    return bookNavigation.chapters.find((chapter) => chapter.content_id === selection.contentId) || null;
  }

  function labForSelection(selection) {
    return labNavigation.labs.find((lab) => lab.content_id === selection.contentId) || null;
  }

  function labPath(lab) {
    const record = manifest.contents?.[lab.content_id];
    const requested = record?.locales?.[activeLocale];
    return requested?.path || lab.path;
  }

  function localizedLabTitle(lab) {
    const record = manifest.contents?.[lab.content_id];
    const title = record?.locales?.[activeLocale]?.title;
    if (typeof title === 'string' && title.trim()) {
      if (uiLanguage() === 'zh') return title.replace(/^实验\s+\d+\s*[：:·.-]\s*/, '').trim();
      return title.trim();
    }
    const localized = lab?.['title_' + uiLanguage()];
    if (typeof localized === 'string' && localized.trim()) return localized.trim();
    return '';
  }

  function labNavigationTitle(lab) {
    const number = String(lab.number).padStart(3, '0');
    const title = localizedLabTitle(lab);
    if (title) {
      switch (uiLanguage()) {
        case 'zh': return `实验 ${number} · ${title}`;
        case 'es': return `Práctica ${number} · ${title}`;
        case 'ja': return `練習 ${number} · ${title}`;
        case 'ko': return `연습 ${number} · ${title}`;
        case 'de': return `Übung ${number} · ${title}`;
        case 'fr': return `Lab ${number} · ${title}`;
        default: return `Lab ${number} · ${title}`;
      }
    }
    return `Lab ${number} · ${lab.title}`;
  }

  function labProgressLabel(lab) {
    return currentReaderCopy().labProgress(String(lab.number).padStart(3, '0'), labNavigation.labs.length);
  }

  function partForChapter(chapter) {
    return bookNavigation.parts.find((part) => part.id === chapter?.part) || null;
  }

  function chapterProgressLabel(chapter, index) {
    const part = partForChapter(chapter);
    const partLabel = part?.['title_' + uiLanguage()] || part?.title_en || '';
    return currentReaderCopy().chapterProgress(chapter.number, bookNavigation.chapters.length, part?.number || '', partLabel || '');
  }

  function renderBookNavigation(selection) {
    if (!pagination) return;
    const current = chapterForSelection(selection);
    const currentLab = labForSelection(selection);
    if (!current && !currentLab) {
      if (bookNav) bookNav.hidden = true;
      pagination.hidden = true;
      if (orientation) orientation.hidden = true;
      return;
    }
    if (currentLab) {
      const index = labNavigation.labs.indexOf(currentLab);
      const previous = labNavigation.labs[index - 1];
      const next = labNavigation.labs[index + 1];
      const strings = currentReaderCopy();
      if (bookNav) bookNav.hidden = true;
      if (orientation) {
        orientation.hidden = false;
        if (orientationSummary) orientationSummary.textContent = strings.labSequence;
        if (mobileProgress) mobileProgress.textContent = labProgressLabel(currentLab);
        orientation.querySelector('nav')?.setAttribute('aria-label', strings.labNavigationAria);
      }
      const updateLabLink = (link, lab, direction) => {
        if (!link) return;
        if (!lab) { link.hidden = true; link.href = '#'; link.textContent = ''; return; }
        link.hidden = false;
        link.href = readerHref(labPath(lab), '', activeLocale);
        link.textContent = `${direction === 'previous' ? '←' : '→'} ${labNavigationTitle(lab)}`;
        link.setAttribute('aria-label', direction === 'previous' ? strings.previousLab : strings.nextLab);
      };
      updateLabLink(mobilePrevious, previous, 'previous');
      updateLabLink(mobileNext, next, 'next');
      const updateLabPagination = (link, titleNode, lab, direction) => {
        if (!lab) { link.hidden = true; return; }
        link.hidden = false;
        link.href = readerHref(labPath(lab), '', activeLocale);
        link.querySelector('.reader-pagination-kicker').textContent = direction === 'previous' ? strings.previousLab : strings.nextLab;
        titleNode.textContent = labNavigationTitle(lab);
      };
      updateLabPagination(previousLink, previousTitle, previous, 'previous');
      updateLabPagination(nextLink, nextTitle, next, 'next');
      pagination.setAttribute('aria-label', strings.labNavigationAria);
      pagination.hidden = !previous && !next;
      return;
    }
    if (!bookNav || !bookProgress || !chapterList) {
      pagination.hidden = true;
      if (orientation) orientation.hidden = true;
      return;
    }
    if (orientationSummary) orientationSummary.textContent = currentReaderCopy().bookChapters;
    orientation?.querySelector('nav')?.setAttribute('aria-label', currentReaderCopy().chapterNavigationAria);
    pagination.setAttribute('aria-label', currentReaderCopy().chapterNavigationAria);
    const index = bookNavigation.chapters.indexOf(current);
    const part = partForChapter(current);
    const partChapters = bookNavigation.chapters.filter((chapter) => chapter.part === current.part);
    bookProgress.textContent = chapterProgressLabel(current, index);
    chapterList.replaceChildren();
    partChapters.forEach((chapter) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = chapterLink(chapter);
      link.textContent = `${chapter.number}. ${chapterTitle(chapter)}`;
      if (chapter.content_id === current.content_id) {
        link.setAttribute('aria-current', 'page');
        link.className = 'is-current';
      }
      item.append(link);
      chapterList.append(item);
    });
    bookNav.hidden = false;
    if (orientation) {
      if (mobileProgress) mobileProgress.textContent = `${part?.number || ''} · ${chapterProgressLabel(current, index)}`;
      orientation.hidden = false;
    }
    const previous = bookNavigation.chapters[index - 1];
    const next = bookNavigation.chapters[index + 1];
    const updateMobileLink = (link, chapter, direction) => {
      if (!link) return;
      if (!chapter) {
        link.hidden = true;
        link.href = '#';
        link.textContent = '';
        return;
      }
      link.hidden = false;
      link.href = readerHref(chapterPath(chapter), '', activeLocale);
      link.textContent = `${direction === 'previous' ? '←' : '→'} ${canonicalChapterTitle(chapter)}`;
    };
    updateMobileLink(mobilePrevious, previous, 'previous');
    updateMobileLink(mobileNext, next, 'next');
    const updatePaginationLink = (link, titleNode, chapter) => {
      if (!chapter) { link.hidden = true; return; }
      link.hidden = false;
      link.href = chapterLink(chapter);
      titleNode.textContent = `${chapter.number}. ${chapterTitle(chapter)}`;
    };
    updatePaginationLink(previousLink, previousTitle, previous);
    updatePaginationLink(nextLink, nextTitle, next);
    pagination.hidden = !previous && !next;
  }

  async function restoreHashPosition() {
    const rawHash = window.location.hash.slice(1);
    if (!rawHash) return;
    const target = document.getElementById(decodeURIComponent(rawHash));
    if (!target) return;
    const scrollToTarget = () => new Promise((resolve) => window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' });
      resolve();
    }));
    await scrollToTarget();
    const imageLayout = [...article.querySelectorAll('img')].map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    });
    await Promise.race([
      Promise.all(imageLayout),
      new Promise((resolve) => window.setTimeout(resolve, 600)),
    ]);
    if (document.fonts?.ready) await document.fonts.ready;
    await scrollToTarget();
  }

  function headingHref(id) {
    return `#${encodeURIComponent(id)}`;
  }

  function directHref(path) {
    return `../${path}`;
  }

  function isExternal(value) {
    return /^(?:https?:|mailto:)/i.test(value);
  }

  function isExternalImage(value) {
    return /^https?:/i.test(value);
  }

  function isSafeDestination(value, path, { image = false } = {}) {
    const target = String(value || '').trim();
    if (!target) return false;
    if (target.startsWith('#')) return !image;
    if (resolveSourcePath(path, target)) return true;
    return image ? isExternalImage(target) : isExternal(target);
  }

  function appendInline(parent, value, path) {
    const pattern = /(<(?:a|span)\s+id="[a-z][a-z0-9-]*"\s*><\/(?:a|span)>|<mark\b[^>]*>.*?<\/mark>|!?\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\)|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|<https?:\/\/[^>]+>|https?:\/\/[^\s<]+)/gi;
    let cursor = 0;
    for (const match of String(value).matchAll(pattern)) {
      if (match.index > cursor) parent.append(document.createTextNode(value.slice(cursor, match.index)));
      const token = match[0];
      const emptyInlineAnchor = token.match(/^<(?:a|span)\s+id="([a-z][a-z0-9-]*)"\s*><\/(?:a|span)>$/i);
      const highlight = token.match(/^<mark\b([^>]*)>(.*?)<\/mark>$/i);
      const image = token.match(/^!\[([^\]]*)\]\((.*)\)$/);
      const link = token.match(/^\[([^\]]+)\]\((.*)\)$/);
      if (emptyInlineAnchor) {
        const anchor = document.createElement('span');
        anchor.id = emptyInlineAnchor[1];
        anchor.className = 'reader-anchor';
        anchor.setAttribute('aria-hidden', 'true');
        parent.append(anchor);
      } else if (highlight) {
        const element = document.createElement('mark');
        const variant = highlight[1].match(/\bhighlight-(lime|yellow|pink|cyan|orange)\b/i)?.[1]?.toLowerCase() || 'lime';
        element.className = `highlight-text highlight-${variant}`;
        element.textContent = highlight[2];
        parent.append(element);
      } else if (image || link) {
        const label = image ? image[1] : link[1];
        const destination = splitDestination(image ? image[2] : link[2]);
        const resolved = resolveSourcePath(path, destination.target);
        const hash = hashFrom(destination.target);
        if (image) {
          const visualLink = document.createElement('a');
          visualLink.className = 'reader-image-link';
          visualLink.target = '_blank';
          visualLink.rel = 'noreferrer';
          visualLink.setAttribute('aria-label', `${currentReaderCopy().openVisual}: ${label}`);
          const denseVisual = Boolean(resolved && (
            resolved.startsWith('assets/teaching/')
            || resolved.startsWith('docs/quality/verification-stability-')
          ));
          if (denseVisual) visualLink.classList.add('reader-teaching-visual');
          if (denseVisual) {
            const thesis = document.createElement('span');
            thesis.className = 'reader-visual-thesis';
            thesis.textContent = label;
            visualLink.append(thesis);
          }
          const element = document.createElement('img');
          element.alt = label;
          element.loading = 'lazy';
          if (resolved && !isExternal(destination.target)) {
            element.src = directHref(resolved);
            visualLink.href = directHref(resolved);
          } else if (isExternalImage(destination.target)) {
            element.src = destination.target;
            visualLink.href = destination.target;
          }
          else element.alt = `${label} (image unavailable)`;
          if (destination.title) element.title = destination.title;
          visualLink.append(element);
          const linkLabel = document.createElement('span');
          linkLabel.className = 'reader-image-link-label';
          linkLabel.textContent = currentReaderCopy().openVisual;
          visualLink.append(linkLabel);
          parent.append(visualLink);
        } else {
          const element = document.createElement('a');
          element.textContent = label;
          element.title = destination.title;
          if (destination.target.startsWith('#')) element.href = destination.target;
          else if (resolved && resolved.endsWith('.md')) element.href = readerHref(resolved, hash);
          else if (resolved && !isExternal(destination.target)) element.href = directHref(resolved) + hash;
          else if (isSafeDestination(destination.target, path)) element.href = destination.target;
          if (isExternal(destination.target)) { element.target = '_blank'; element.rel = 'noreferrer'; }
          parent.append(element);
        }
      } else if (token.startsWith('`')) {
        const element = document.createElement('code');
        element.textContent = token.slice(1, -1);
        parent.append(element);
      } else if (token.startsWith('**') || token.startsWith('__')) {
        const element = document.createElement('strong');
        element.textContent = token.slice(2, -2);
        parent.append(element);
      } else if (token.startsWith('*') || token.startsWith('_')) {
        const element = document.createElement('em');
        element.textContent = token.slice(1, -1);
        parent.append(element);
      } else {
        const element = document.createElement('a');
        const target = token.replace(/^<|>$/g, '');
        element.href = target;
        element.textContent = target;
        element.target = '_blank';
        element.rel = 'noreferrer';
        parent.append(element);
      }
      cursor = match.index + token.length;
    }
    if (cursor < String(value).length) parent.append(document.createTextNode(String(value).slice(cursor)));
  }

  function addInline(parent, value, path) {
    appendInline(parent, escapeText(value), path);
  }

  function slug(value, used) {
    const base = String(value).toLowerCase().replace(/[`*_~]/g, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section';
    const count = (used.get(base) || 0) + 1;
    used.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  }

  function splitTableRow(line) {
    let value = line.trim();
    if (value.startsWith('|')) value = value.slice(1);
    if (value.endsWith('|')) value = value.slice(0, -1);
    return value.split('|').map((cell) => cell.trim());
  }

  function isTableSeparator(line) {
    return splitTableRow(line).length > 0 && splitTableRow(line).every((cell) => /^:?-{3,}:?$/.test(cell));
  }

  function isSpecial(line, next) {
    return /^#{1,6}\s+/.test(line) || /^```|^~~~/.test(line) || /^>\s?/.test(line) || /^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line) || /^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line) || (line.includes('|') && isTableSeparator(next || '')) || /^<(?:div|table|details|summary|figure|section|nav|hr|p|h[1-6]|ul|ol|dl|img)\b/i.test(line);
  }

  function sanitizeHtml(raw, path) {
    const parsed = new DOMParser().parseFromString(`<body>${raw}</body>`, 'text/html');
    const allowed = new Set(['a', 'br', 'code', 'details', 'dd', 'div', 'dl', 'dt', 'em', 'figcaption', 'figure', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'img', 'li', 'mark', 'nav', 'ol', 'p', 'pre', 'section', 'small', 'span', 'strong', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul']);
    const allowedAttributes = new Set(['align', 'alt', 'aria-label', 'class', 'data-chapter-nav', 'href', 'id', 'loading', 'rel', 'src', 'target', 'title', 'width']);
    const clean = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.COMMENT_NODE) { child.remove(); return; }
        if (child.nodeType !== Node.ELEMENT_NODE) return;
        if (!allowed.has(child.tagName.toLowerCase())) { child.replaceWith(...child.childNodes); return; }
        [...child.attributes].forEach((attribute) => {
          if (!allowedAttributes.has(attribute.name.toLowerCase())) child.removeAttribute(attribute.name);
        });
        if (child.hasAttribute('href')) {
          const href = child.getAttribute('href') || '';
          const resolved = href.startsWith('#') ? null : resolveSourcePath(path, href);
          if (href.startsWith('#')) child.setAttribute('href', href);
          else if (resolved && resolved.endsWith('.md')) child.setAttribute('href', readerHref(resolved, hashFrom(href)));
          else if (resolved) child.setAttribute('href', directHref(resolved) + hashFrom(href));
          else if (!isExternal(href)) child.removeAttribute('href');
          else { child.setAttribute('target', '_blank'); child.setAttribute('rel', 'noreferrer'); }
        }
        if (child.hasAttribute('src')) {
          const src = child.getAttribute('src') || '';
          const resolved = resolveSourcePath(path, src);
          if (resolved && !isExternal(src)) child.setAttribute('src', directHref(resolved));
          else if (!isExternalImage(src)) child.removeAttribute('src');
        }
        clean(child);
      });
    };
    clean(parsed.body);
    return [...parsed.body.childNodes];
  }

  function renderBlocks(text, path) {
    const fragment = document.createDocumentFragment();
    const lines = String(text).replace(/^\uFEFF/, '').split(/\r?\n/);
    let index = 0;
    let frontMatter = false;
    let frontMatterSeen = false;
    const usedSlugs = new Map();
    const usedIds = new Set();
    const uniqueHeadingId = (value) => {
      let id = slug(value, usedSlugs);
      while (usedIds.has(id)) id = slug(value, usedSlugs);
      usedIds.add(id);
      return id;
    };
    const addParagraph = (items) => {
      const content = items.join('\n').replace(/\n/g, ' ');
      if (!content.trim()) return;
      const paragraph = document.createElement('p');
      addInline(paragraph, content, path);
      fragment.append(paragraph);
    };
    while (index < lines.length) {
      const line = lines[index];
      const h1BeforeFrontMatter = fragment.childNodes.length === 1 && fragment.firstChild?.tagName === 'H1';
      if (!frontMatterSeen && line.trim() === '---' && (fragment.childNodes.length === 0 || h1BeforeFrontMatter)) {
        frontMatter = true;
        frontMatterSeen = true;
        index += 1;
        continue;
      }
      if (frontMatter) { if (line.trim() === '---') frontMatter = false; index += 1; continue; }
      if (!line.trim()) { index += 1; continue; }
      const generatedBlockStart = line.trim().match(/^<!--\s*(chapter-navigation|lab-navigation|language-switcher):start\s*-->$/i);
      if (generatedBlockStart) {
        const generatedBlockKind = generatedBlockStart[1];
        index += 1;
        while (index < lines.length && !new RegExp(`^<!--\\s*${generatedBlockKind}:end\\s*-->$`, 'i').test(lines[index].trim())) {
          index += 1;
        }
        if (index < lines.length) index += 1;
        continue;
      }
      if (/^<!--/.test(line.trim())) { index += 1; continue; }
      const emptyAnchor = line.trim().match(/^<(?:a|span)\s+id="([a-z][a-z0-9-]*)"\s*><\/(?:a|span)>$/i);
      if (emptyAnchor) {
        const id = emptyAnchor[1];
        if (!usedIds.has(id)) {
          const anchor = document.createElement('span');
          anchor.id = id;
          anchor.className = 'reader-anchor';
          anchor.setAttribute('aria-hidden', 'true');
          fragment.append(anchor);
          usedIds.add(id);
        }
        index += 1;
        continue;
      }
      if (/^```|^~~~/.test(line)) {
        const fence = line.trim().slice(0, 3);
        const language = line.trim().slice(3).trim();
        index += 1;
        const code = [];
        while (index < lines.length && !lines[index].trim().startsWith(fence)) { code.push(lines[index]); index += 1; }
        index += 1;
        const pre = document.createElement('pre');
        const codeNode = document.createElement('code');
        if (language) codeNode.className = `language-${language}`;
        codeNode.textContent = code.join('\n');
        pre.append(codeNode);
        fragment.append(pre);
        continue;
      }
      if (/^<(?:div|table|details|summary|figure|section|nav|hr|p|h[1-6]|ul|ol|dl|img)\b/i.test(line.trim())) {
        const raw = [];
        let depth = 0;
        do {
          raw.push(lines[index]);
          const opens = (lines[index].match(/<(div|table|details|figure|section|nav|ul|ol|dl)\b/gi) || []).length;
          const closes = (lines[index].match(/<\/(div|table|details|figure|section|nav|ul|ol|dl)>/gi) || []).length;
          depth += opens - closes;
          index += 1;
        } while (index < lines.length && depth > 0);
        sanitizeHtml(raw.join('\n'), path).forEach((node) => fragment.append(node));
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
      if (heading) {
        const element = document.createElement(`h${heading[1].length}`);
        addInline(element, heading[2], path);
        element.id = uniqueHeadingId(heading[2]);
        fragment.append(element);
        index += 1;
        continue;
      }
      if (line.includes('|') && isTableSeparator(lines[index + 1] || '')) {
        const header = splitTableRow(line);
        index += 2;
        const rows = [];
        while (index < lines.length && lines[index].trim() && lines[index].includes('|')) { rows.push(splitTableRow(lines[index])); index += 1; }
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        header.forEach((cell) => { const th = document.createElement('th'); addInline(th, cell, path); headerRow.append(th); });
        thead.append(headerRow); table.append(thead);
        const tbody = document.createElement('tbody');
        rows.forEach((row) => { const tr = document.createElement('tr'); header.forEach((_, cellIndex) => { const td = document.createElement('td'); addInline(td, row[cellIndex] || '', path); tr.append(td); }); tbody.append(tr); });
        table.append(tbody);
        const tableWrap = document.createElement('div');
        tableWrap.className = 'reader-table-wrap';
        if (header.length >= 3) {
          tableWrap.classList.add('reader-table-wide');
          tableWrap.tabIndex = 0;
          tableWrap.setAttribute('role', 'region');
          tableWrap.setAttribute('aria-label', currentReaderCopy().wideTableAria(header.length));
          const hint = document.createElement('p');
          hint.className = 'reader-table-hint';
          hint.textContent = currentReaderCopy().wideTable;
          tableWrap.append(hint);
        }
        tableWrap.append(table);
        fragment.append(tableWrap);
        continue;
      }
      if (/^>\s?/.test(line)) {
        const quote = [];
        while (index < lines.length && /^>\s?/.test(lines[index])) { quote.push(lines[index].replace(/^>\s?/, '')); index += 1; }
        const blockquote = document.createElement('blockquote');
        blockquote.append(renderBlocks(quote.join('\n'), path));
        fragment.append(blockquote);
        continue;
      }
      if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
        const ordered = /^\s*\d+[.)]\s+/.test(line);
        const markerPattern = ordered ? /^(\s*)\d+[.)]\s+(.+)$/ : /^(\s*)[-*+]\s+(.+)$/;
        const firstMatch = line.match(markerPattern);
        const baseIndent = firstMatch?.[1].length || 0;
        const list = document.createElement(ordered ? 'ol' : 'ul');
        while (index < lines.length) {
          const match = lines[index].match(markerPattern);
          if (!match || match[1].length !== baseIndent) break;
          const itemLines = [match[2]];
          index += 1;
          while (index < lines.length && lines[index].trim()) {
            const nextLine = lines[index];
            const nextItem = nextLine.match(markerPattern);
            if (nextItem && nextItem[1].length <= baseIndent) break;
            if (isSpecial(nextLine, lines[index + 1]) && !/^\s{2,}\S/.test(nextLine)) break;
            itemLines.push(nextLine.trim());
            index += 1;
          }
          const item = document.createElement('li');
          addInline(item, itemLines.join(' '), path);
          list.append(item);
        }
        fragment.append(list);
        continue;
      }
      if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line)) { fragment.append(document.createElement('hr')); index += 1; continue; }
      const paragraph = [line];
      index += 1;
      while (index < lines.length && lines[index].trim() && !isSpecial(lines[index], lines[index + 1])) { paragraph.push(lines[index]); index += 1; }
      addParagraph(paragraph);
    }
    return fragment;
  }

  function addPromptCopyControls(path) {
    if (path !== 'book/communication-clinic-EN.md') return;
    article.querySelectorAll('pre').forEach((pre) => {
      const code = pre.querySelector(':scope > code');
      if (!code || !code.textContent.trim()) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'reader-prompt-block';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'reader-copy-prompt';
      button.textContent = currentReaderCopy().copyPrompt;
      const status = document.createElement('span');
      status.className = 'reader-copy-status';
      status.setAttribute('aria-live', 'polite');
      pre.before(wrapper);
      wrapper.append(button, pre, status);
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.textContent);
          status.textContent = currentReaderCopy().copiedPrompt;
        } catch (_) {
          status.textContent = currentReaderCopy().copyFailed;
        }
      });
    });
  }

  function contentRecord(path) {
    const contentId = manifest.path_index?.[path] || null;
    return { contentId, content: contentId ? manifest.contents?.[contentId] : null };
  }

  function chapterAliasFor(contentId) {
    return Object.entries(manifest.aliases || {})
      .find(([alias, target]) => target === contentId && /^chapter-\d+$/.test(alias))?.[0] || null;
  }

  function chapterStatusFor(selection) {
    const strings = currentReaderCopy();
    const record = selection.contentId ? manifest.contents?.[selection.contentId] : null;
    const localeRecord = record?.locales?.[selection.requested] || record?.locales?.[selection.effective];
    const status = localeRecord?.content_status || 'unindexed source';
    const localizedStatus = strings.contentStatus?.[status] || status;
    if (selection.fallback && selection.requested !== selection.effective) {
      return `${localizedStatus} · ${strings.fallbackSourceShown(locales[selection.effective]?.display_name || selection.effective)}`;
    }
    return localizedStatus;
  }

  function buildTableOfContents() {
    if (!toc || !tocList) return;
    const headings = [...article.querySelectorAll('h2, h3')].filter((heading) => heading.textContent.trim());
    tocList.replaceChildren();
    headings.forEach((heading) => {
      if (!heading.id) return;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = headingHref(heading.id);
      link.dataset.level = heading.tagName === 'H3' ? '3' : '2';
      link.textContent = heading.textContent.trim();
      link.dataset.tocTarget = heading.id;
      item.append(link);
      tocList.append(item);
    });
    toc.hidden = tocList.children.length === 0;
    if (mobilePageToc && mobilePageTocList) {
      mobilePageTocList.replaceChildren(...[...tocList.querySelectorAll('li')].map((item) => item.cloneNode(true)));
      mobilePageToc.hidden = mobilePageTocList.children.length === 0;
      mobilePageTocList.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        mobilePageToc.open = false;
        window.requestAnimationFrame(() => {
          if (!target) return;
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: 'start' });
        });
      }));
    }
    observeHeadings(headings);
  }

  function observeHeadings(headings) {
    if (!('IntersectionObserver' in window) || !tocList) return;
    const links = [...tocList.querySelectorAll('a[data-toc-target]'), ...document.querySelectorAll('[data-reader-mobile-page-toc-list] a[data-toc-target]')];
    const setCurrent = (id) => links.forEach((link) => {
      const current = link.dataset.tocTarget === id;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setCurrent(visible[0].target.id);
    }, { rootMargin: '-86px 0px -68% 0px', threshold: [0, 1] });
    headings.forEach((heading) => observer.observe(heading));
  }

  function updateChapterRail(selection, title) {
    if (!chapterCard || !chapterLabel || !chapterStatus) return;
    const alias = chapterAliasFor(selection.contentId);
    if (!alias) {
      const lab = labForSelection(selection);
      if (!lab) {
        const strings = currentReaderCopy();
        const labels = {
          skill: strings.skillMethod,
          'field-note': strings.fieldNote,
          'project-document': strings.projectDocument
        };
        chapterLabel.textContent = labels[selection.readerType] || strings.projectDocument;
        chapterStatus.textContent = title;
        chapterCard.hidden = false;
        return;
      }
      chapterLabel.textContent = selection.effective !== 'en'
        ? title
        : currentReaderCopy().labCard(String(lab.number).padStart(3, '0'), lab.title);
      chapterStatus.textContent = `${chapterStatusFor(selection)} · ${currentReaderCopy().catalogOrderOnly}`;
      chapterCard.hidden = false;
      return;
    }
    const number = alias.slice('chapter-'.length);
    const current = chapterForSelection(selection);
    const label = current ? chapterTitle(current) : title;
    chapterLabel.textContent = currentReaderCopy().chapterCard(number, label);
    chapterStatus.textContent = chapterStatusFor(selection);
    chapterCard.hidden = false;
  }

  function ready(record) {
    // A readable candidate translation and an independently reviewed
    // translation are separate facts. Do not hide an existing candidate file
    // behind a different-language fallback, and do not label it verified.
    return Boolean(record?.exists && ['source', 'candidate', 'in-progress', 'verified'].includes(record.translation_status));
  }

  function translationReviewPending(record) {
    return Boolean(record?.exists && ['candidate', 'in-progress'].includes(record.translation_status));
  }

  function hasRequestedLocaleSource(path, locale) {
    // The locale manifest registers course units, but research, governance,
    // and other Reader pages can also be linked from a localized source.
    // A locale-suffixed file is an explicit localized source; an unsuffixed
    // Markdown file is not. Do not render that English source under a
    // non-English Reader shell merely because it is reachable from a link.
    const suffix = String(path).match(/-([A-Z]{2})\.md$/)?.[1];
    return suffix === String(locale).toUpperCase();
  }

  function choosePath(path, locale) {
    const record = contentRecord(path);
    const readerType = record.content?.reader_type || 'project-document';
    const overviewTarget = record.content?.overview_target || 'index.html';
    if (!record.content) {
      const isNonEnglish = locale !== (manifest.default_locale || 'en');
      if (isNonEnglish && !hasRequestedLocaleSource(path, locale)) {
        return {
          path,
          contentId: null,
          readerType,
          overviewTarget,
          missingTranslation: true,
          requested: locale,
          effective: locale,
        };
      }
      return { path, contentId: null, readerType, overviewTarget, requested: locale, effective: locale, missingTranslation: false };
    }
    const requested = record.content.locales?.[locale];
    if (ready(requested)) return {
      path: requested.path,
      contentId: record.contentId,
      readerType,
      overviewTarget,
      fallback: false,
      requested: locale,
      effective: locale,
      translationStatus: requested.translation_status,
      translationReviewPending: translationReviewPending(requested),
    };
    return {
      path: requested?.path || path,
      contentId: record.contentId,
      readerType,
      overviewTarget,
      missingTranslation: true,
      requested: locale,
      effective: locale,
    };
  }

  function updateOverviewLinks(selection) {
    const target = selection.overviewTarget || 'index.html';
    document.querySelectorAll('[data-reader-overview]').forEach((link) => {
      link.href = window.CODEX_PAGES_ARTIFACT ? `../${target}` : target;
    });
  }

  function overviewHref() {
    const locale = validLocales.includes(activeLocale || requestedLocale) ? activeLocale || requestedLocale : '';
    const language = locale ? `?lang=${encodeURIComponent(locale)}` : '';
    return `index.html${language}`;
  }

  function showError(message, { retry = false } = {}) {
    const errorLocale = validLocales.includes(activeLocale)
      ? activeLocale
      : validLocales.includes(requestedLocale)
        ? requestedLocale
        : manifest.default_locale || 'en';
    activeLocale = errorLocale;
    applyReaderChrome();
    languageSelect.value = errorLocale;
    document.documentElement.lang = locales[errorLocale]?.html_lang || errorLocale;
    article.lang = locales[errorLocale]?.html_lang || errorLocale;
    article.dataset.readerRequestedLocale = errorLocale;
    article.dataset.readerEffectiveLocale = errorLocale;
    article.dataset.readerFallback = 'false';
    article.replaceChildren();
    if (readerAside) readerAside.hidden = true;
    if (coreCard) coreCard.hidden = true;
    coreCurrentUnitId = null;
    if (orientation) orientation.hidden = true;
    if (mobilePageToc) mobilePageToc.hidden = true;
    if (pagination) pagination.hidden = true;
    const box = document.createElement('div');
    box.className = 'reader-error';
    box.setAttribute('role', 'alert');
    box.setAttribute('aria-live', 'assertive');
    const explanation = document.createElement('p');
    explanation.textContent = message;
    box.append(explanation);
    const actions = document.createElement('div');
    actions.className = 'reader-error-actions';
    const overview = document.createElement('a');
    overview.className = 'reader-error-action';
    overview.href = overviewHref();
    overview.textContent = currentReaderCopy().back;
    actions.append(overview);
    article.append(box);
    if (retry) {
      const retryButton = document.createElement('button');
      retryButton.className = 'reader-retry';
      retryButton.type = 'button';
      retryButton.textContent = currentReaderCopy().retry;
      retryButton.addEventListener('click', () => { void load(); }, { once: true });
      actions.append(retryButton);
    }
    box.append(actions);
    article.setAttribute('aria-busy', 'false');
    setReaderStatus('');
  }

  async function loadTrustRecord(contentId) {
    try {
      const { response, registry } = await fetchWithTimeout(
        directHref('docs/governance/page-trust-registry.yaml'),
        async (result) => ({ response: result, registry: result.ok ? await result.json() : null }),
      );
      if (!response.ok) return { unavailable: true };
      const records = [
        ...(Array.isArray(registry.records) ? registry.records : []),
        ...((registry.families || []).flatMap((family) => {
          if (!Array.isArray(family.records)) return [];
          const defaults = family.defaults && typeof family.defaults === 'object' ? family.defaults : {};
          return family.records.map((record) => ({
            ...defaults,
            ...(record.overrides && typeof record.overrides === 'object' ? record.overrides : {}),
            ...record,
          }));
        })),
      ];
      return records.find((record) => record.content_id === contentId) || null;
    } catch (_) {
      return { unavailable: true };
    }
  }

  function renderTrustRecord(record) {
    if (!trustCard || !trustScope || !trustReviewed || !trustReview || !trustLimitations) return;
    if (!record) {
      trustCard.hidden = true;
      return;
    }
    if (record.unavailable) {
      trustScope.textContent = currentReaderCopy().trustUnavailable;
      trustReviewed.removeAttribute('datetime');
      trustReviewed.textContent = '—';
      trustReview.removeAttribute('datetime');
      trustReview.textContent = '—';
      trustLimitations.textContent = currentReaderCopy().trustUnavailableDetail;
      trustCard.hidden = false;
      return;
    }
    const strings = currentReaderCopy();
    const scopeLabels = { universal_core: strings.scopeUniversal, platform_adapter: strings.scopePlatform, mixed: strings.scopeMixed };
    trustScope.textContent = `${record.content_status} · ${scopeLabels[record.curriculum_scope] || record.curriculum_scope}`;
    trustReviewed.dateTime = record.reviewed_at;
    trustReviewed.textContent = record.reviewed_at;
    trustReview.dateTime = record.next_review;
    trustReview.textContent = record.next_review;
    trustLimitations.textContent = record.known_limitations?.[0] || '';
    trustCard.hidden = false;
  }

  async function load() {
    if (!requestedPath || requestedPath.includes('..') || !readerSourceHrefByPath.has(requestedPath)) {
      showError(currentReaderCopy().invalidPath);
      return;
    }
    // A URL is the source of truth. Reading an old browser preference here
    // can turn an English link into another language and makes shared links
    // non-deterministic.
    const locale = validLocales.includes(requestedLocale) ? requestedLocale : manifest.default_locale || 'en';
    const selection = choosePath(requestedPath, locale);
    activeLocale = locale;
    applyReaderChrome();
    if (selection.missingTranslation) {
      showError(currentReaderCopy().missingTranslation(locales[locale]?.display_name || locale));
      return;
    }
    if (readerAside) readerAside.hidden = false;
    article.replaceChildren();
    const loading = document.createElement('p');
    loading.className = 'reader-loading';
    loading.setAttribute('role', 'status');
    loading.textContent = currentReaderCopy().loading;
    article.append(loading);
    article.setAttribute('aria-busy', 'true');
    setReaderStatus('');
    const sourceHref = readerSourceHrefByPath.get(selection.path);
    if (!sourceHref) {
      showError(currentReaderCopy().invalidPath);
      return;
    }
    let response;
    try {
      response = await fetchWithTimeout(
        sourceHref,
        async (result) => ({ response: result, source: result.ok ? await result.text() : '' }),
        // A reader must show the current Markdown after a repository/site update.
        // Source: https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
        { cache: 'no-store' },
      );
    } catch (error) {
      showError(error?.name === 'AbortError' ? currentReaderCopy().loadTimeout : currentReaderCopy().loadNetwork, { retry: true });
      return;
    }
    if (!response.response.ok) { showError(currentReaderCopy().loadError(response.response.status), { retry: true }); return; }
    const source = response.source;
    const chapter = chapterForSelection(selection);
    const lab = labForSelection(selection);
    article.replaceChildren();
    if (chapter) {
      const context = document.createElement('div');
      context.className = 'reader-article-context';
      context.textContent = chapterProgressLabel(chapter, bookNavigation.chapters.indexOf(chapter));
      article.append(context);
    } else if (lab) {
      const context = document.createElement('div');
      context.className = 'reader-article-context';
      context.textContent = labProgressLabel(lab);
      article.append(context);
    }
    article.append(renderBlocks(source, selection.path));
    const articleHeading = article.querySelector('h1');
    if (chapter && articleHeading) articleHeading.textContent = articleHeading.textContent.replace(/^Chapter\s+\d+\s*:\s*/i, '');
    const openingParagraph = article.querySelector(':scope > p');
    (openingParagraph || articleHeading)?.after(orientation, mobilePageToc);
    addPromptCopyControls(selection.path);
    article.setAttribute('aria-busy', 'false');
    const effectiveLocale = selection.effective || locale;
    const renderedTitle = article.querySelector('h1')?.textContent?.trim();
    const title = effectiveLocale !== 'en' && renderedTitle
      ? renderedTitle
      : chapter
        ? canonicalChapterTitle(chapter)
        : lab
          ? `Lab ${String(lab.number).padStart(3, '0')}: ${lab.title}`
          : renderedTitle || selection.path;
    buildTableOfContents();
    updateChapterRail(selection, title);
    updateOverviewLinks(selection);
    renderBookNavigation(selection);
    renderTrustRecord(null);
    if (selection.contentId) void loadTrustRecord(selection.contentId).then(renderTrustRecord);
    document.title = `${title} · Prysai LLM Playbook`;
    document.querySelector('meta[name="description"]').setAttribute('content', `Read ${title} with source-aware navigation and explicit evidence limits.`);
    document.documentElement.lang = locales[effectiveLocale]?.html_lang || effectiveLocale;
    article.lang = locales[effectiveLocale]?.html_lang || effectiveLocale;
    article.dataset.readerRequestedLocale = selection.requested;
    article.dataset.readerEffectiveLocale = effectiveLocale;
    article.dataset.readerFallback = selection.fallback ? 'true' : 'false';
    article.dataset.readerTranslationStatus = selection.translationStatus || 'source';
    article.setAttribute('data-reader-requested-locale', selection.requested);
    article.setAttribute('data-reader-effective-locale', effectiveLocale);
    article.setAttribute('data-reader-fallback', selection.fallback ? 'true' : 'false');
    article.setAttribute('data-reader-translation-status', selection.translationStatus || 'source');
    sourcePathNode.textContent = selection.path;
    contentIdNode.textContent = selection.contentId || 'unindexed source';
    sourceLink.href = directHref(selection.path);
    languageSelect.value = locale;
    renderCoreTracker(selection);
    if (selection.translationReviewPending) {
      setReaderStatus(currentReaderCopy().translationInProgress(locales[locale]?.display_name || locale));
    } else setReaderStatus('');
    await restoreHashPosition();
    if (selection.contentId) {
      languageSelect.disabled = false;
      languageSelect.dataset.contentId = selection.contentId;
    }
  }

  languageSelect.addEventListener('change', () => {
    const locale = languageSelect.value;
    const current = contentRecord(requestedPath);
    const content = current.content;
    const requested = content?.locales?.[locale];
    const target = requested?.path || requestedPath;
    window.location.href = readerHref(target, window.location.hash, locale);
  });

  coreSave?.addEventListener('click', () => {
    const unit = coreUnits.find((candidate) => candidate.id === coreCurrentUnitId);
    if (!unit) return;
    coreReceipts[unit.id] = {
      attempted: coreAttempted.checked === true,
      artifact: sanitizeCoreText(coreArtifact.value),
      limit: sanitizeCoreText(coreLimit.value),
      updatedAt: new Date().toISOString(),
    };
    if (!writeCoreReceipts()) {
      coreStatus.textContent = currentReaderCopy().coreStorageError;
      return;
    }
    renderCoreTracker({ contentId: unit.contentId });
    coreStatus.textContent = currentReaderCopy().coreSaved;
  });

  coreCopy?.addEventListener('click', async () => {
    const strings = currentReaderCopy();
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(coreReceiptText());
      coreStatus.textContent = strings.coreCopied;
    } catch (_) {
      coreStatus.textContent = strings.coreCopyFailed;
    }
  });

  coreClear?.addEventListener('click', () => {
    if (!clearCoreReceipts()) {
      coreStatus.textContent = currentReaderCopy().coreStorageError;
      return;
    }
    const currentUnit = coreUnits.find((unit) => unit.id === coreCurrentUnitId);
    if (currentUnit) renderCoreTracker({ contentId: currentUnit.contentId });
    coreStatus.textContent = currentReaderCopy().coreCleared;
  });

  load().catch((error) => showError(`The source page could not be rendered: ${error.message}`));
})();
