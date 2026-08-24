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
  const routeMap = document.querySelector('[data-reader-route-map]');
  const routeMapSummary = document.querySelector('[data-reader-route-map-summary]');
  const routeMapIntro = document.querySelector('[data-reader-route-map-intro]');
  const routeMapNodes = document.querySelector('[data-reader-route-map-nodes]');
  const routeMapDetailLabel = document.querySelector('[data-reader-route-map-detail-label]');
  const routeMapDetailTitle = document.querySelector('[data-reader-route-map-detail-title]');
  const routeMapDetailBody = document.querySelector('[data-reader-route-map-detail-body]');
  const routeMapNextLabel = document.querySelector('[data-reader-route-map-next-label]');
  const routeMapDetailNext = document.querySelector('[data-reader-route-map-detail-next]');
  const routeMapDetailLink = document.querySelector('[data-reader-route-map-detail-link]');
  const routeMapOpen = document.querySelector('[data-reader-route-map-open]');
  const routeMapFallbackSummary = document.querySelector('[data-reader-route-map-fallback-summary]');
  const routeMapFallbackIntro = document.querySelector('[data-reader-route-map-fallback-intro]');
  const routeMapFallbackList = document.querySelector('[data-reader-route-map-fallback-list]');
  const routeMapFigureLink = document.querySelector('[data-reader-route-map-figure-link]');
  const routeMapImage = document.querySelector('[data-reader-route-map-image]');
  const routeMapFigureOpen = document.querySelector('[data-reader-route-map-figure-open]');
  const routeMapFigureCaption = document.querySelector('[data-reader-route-map-figure-caption]');
  const routeMapBoundary = document.querySelector('[data-reader-route-map-boundary]');
  const conceptMap = document.querySelector('[data-reader-concept-map]');
  const conceptMapSummary = document.querySelector('[data-reader-concept-map-summary]');
  const conceptMapIntro = document.querySelector('[data-reader-concept-map-intro]');
  const conceptMapGraph = document.querySelector('[data-reader-concept-map-graph]');
  const conceptMapRootLabel = document.querySelector('[data-reader-concept-map-root-label]');
  const conceptMapRoot = document.querySelector('[data-reader-concept-map-root]');
  const conceptMapBranches = document.querySelector('[data-reader-concept-map-branches]');
  const conceptMapFallback = document.querySelector('[data-reader-concept-map-fallback]');
  const conceptMapFallbackIntro = document.querySelector('[data-reader-concept-map-fallback-intro]');
  const conceptMapFallbackList = document.querySelector('[data-reader-concept-map-fallback-list]');
  const conceptMapBoundary = document.querySelector('[data-reader-concept-map-boundary]');
  const visualCompanion = document.querySelector('[data-reader-visual-companion]');
  const visualCompanionSummary = document.querySelector('[data-reader-visual-companion-summary]');
  const visualCompanionIntro = document.querySelector('[data-reader-visual-companion-intro]');
  const visualCompanionLink = document.querySelector('[data-reader-visual-companion-link]');
  const visualCompanionThesis = document.querySelector('[data-reader-visual-companion-thesis]');
  const visualCompanionImage = document.querySelector('[data-reader-visual-companion-image]');
  const visualCompanionOpen = document.querySelector('[data-reader-visual-companion-open]');
  const visualCompanionCaption = document.querySelector('[data-reader-visual-companion-caption]');
  const visualCompanionBoundary = document.querySelector('[data-reader-visual-companion-boundary]');
  const recoveryMap = document.querySelector('[data-reader-recovery-map]');
  const recoveryMapSummary = document.querySelector('[data-reader-recovery-map-summary]');
  const recoveryMapIntro = document.querySelector('[data-reader-recovery-map-intro]');
  const recoveryMapNodes = document.querySelector('[data-reader-recovery-map-nodes]');
  const recoveryMapDetailLabel = document.querySelector('[data-reader-recovery-map-detail-label]');
  const recoveryMapDetailTitle = document.querySelector('[data-reader-recovery-map-detail-title]');
  const recoveryMapDetailBody = document.querySelector('[data-reader-recovery-map-detail-body]');
  const recoveryMapNextLabel = document.querySelector('[data-reader-recovery-map-next-label]');
  const recoveryMapDetailNext = document.querySelector('[data-reader-recovery-map-detail-next]');
  const recoveryMapDetailLink = document.querySelector('[data-reader-recovery-map-detail-link]');
  const recoveryMapOpen = document.querySelector('[data-reader-recovery-map-open]');
  const recoveryMapFallbackSummary = document.querySelector('[data-reader-recovery-map-fallback-summary]');
  const recoveryMapFallbackIntro = document.querySelector('[data-reader-recovery-map-fallback-intro]');
  const recoveryMapFallbackList = document.querySelector('[data-reader-recovery-map-fallback-list]');
  const recoveryMapFigureLink = document.querySelector('[data-reader-recovery-map-figure-link]');
  const recoveryMapImage = document.querySelector('[data-reader-recovery-map-image]');
  const recoveryMapFigureOpen = document.querySelector('[data-reader-recovery-map-figure-open]');
  const recoveryMapFigureCaption = document.querySelector('[data-reader-recovery-map-figure-caption]');
  const recoveryMapBoundary = document.querySelector('[data-reader-recovery-map-boundary]');
  let conceptMapScrollHandler = null;
  let inlineConceptMapScrollHandler = null;
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
  // The brand link is shared markup, but its accessible name belongs to the
  // selected Reader language just like the visible controls do.  Add the
  // label after all locale dictionaries have been composed so no locale falls
  // back to an English-only name.
  const overviewAriaByLocale = {
    en: 'Prysai LLM Playbook overview',
    zh: 'Prysai LLM Playbook 总览',
    es: 'Vista general de Prysai LLM Playbook',
    ja: 'Prysai LLM Playbook の概要',
    ko: 'Prysai LLM Playbook 개요',
    de: 'Prysai LLM Playbook – Übersicht',
    'zh-tw': 'Prysai LLM Playbook 總覽',
    fr: 'Aperçu du Prysai LLM Playbook',
  };
  Object.entries(overviewAriaByLocale).forEach(([locale, label]) => {
    readerCopy[locale].overviewAria = label;
  });
  Object.assign(readerCopy.fr, {
    translationInProgress: () => 'La version française est proposée comme traduction candidate et attend une relecture linguistique indépendante. Elle n’est pas encore vérifiée.',
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

  // The Reader route map is a progressive enhancement: the ordered fallback
  // and the localized links remain useful even when this interaction is off.
  const readerRouteMapCopy = {
    en: {
      summary: 'Visual route map', intro: 'Use the six steps to place this page in the wider method. Select a step for its next question.', aria: 'Six steps in the reliable LLM work method', selected: 'Selected step', next: 'Next question', open: 'Open this part of the route', fallback: 'Read the route as text', fallbackIntro: 'This sequence carries the same meaning without the interactive controls or the image.', figureAlt: 'Six-step reliable LLM work loop: understand, frame, act, inspect, repair, and transfer.', figureOpen: 'Open full-size visual', figureCaption: 'Project-authored teaching board. The surrounding text is the accessible explanation; the board is an orientation aid.', boundary: 'A route map shows sequence, not completion. Keep the attempt, the check, the failure, and the remaining unknowns.', labels: ['Understand', 'Frame', 'Act', 'Inspect', 'Repair', 'Transfer'], bodies: ['Separate a model proposal from what the available evidence can establish.', 'State the goal, context, allowed help, limits, check, and stop condition.', 'Allow only the smallest reversible action and pause before an external effect.', 'Compare the output or diff with a source, test, log, or acceptance rule.', 'Name one mismatch, preserve the failed receipt, and change one condition before retrying.', 'Repeat the method on an unseen task; one successful attempt is not mastery.'], nextQuestions: ['What result can I check?', 'What is allowed, and what is not?', 'What is the smallest safe action?', 'What evidence would change my claim?', 'Which mismatch will I change first?', 'Can I repeat the method on a new task?']
    },
    zh: {
      summary: '视觉路线图', intro: '用这六个步骤定位当前页面在整套方法中的位置。选择一个步骤，查看下一道问题。', aria: '可靠 LLM 工作方法的六个步骤', selected: '当前步骤', next: '下一道问题', open: '打开这部分路线', fallback: '按文字顺序阅读路线', fallbackIntro: '即使不使用交互控件或图片，下面的顺序仍然表达相同内容。', figureAlt: '可靠 LLM 工作闭环六步图：理解、框定、行动、检查、修正和迁移。', figureOpen: '打开完整尺寸图示', figureCaption: '项目原创教学图。周围文字才是可访问的解释，图板只是路线提示。', boundary: '路线图展示的是顺序，不是完成证明。保留尝试、检查、失败记录和仍然未知的部分。', labels: ['理解', '框定任务', '采取行动', '检查结果', '修正问题', '迁移方法'], bodies: ['把模型提出的内容，与现有证据能够证明的内容分开。', '写清目标、上下文、允许的帮助、限制、检查方式和停止条件。', '只允许最小且可回退的行动；在产生外部影响前先暂停。', '把输出或差异与来源、测试、日志或验收规则对照。', '指出一个不匹配，保留失败记录，只改变一个条件后再试。', '在没有见过的新任务上重复方法；一次成功不等于掌握。'], nextQuestions: ['我能检查哪个结果？', '哪些事情允许做，哪些不允许？', '最小的安全行动是什么？', '什么证据会改变我的结论？', '我先修正哪一个不匹配？', '我能在新任务上重复这套方法吗？']
    },
    es: {
      summary: 'Mapa visual del recorrido', intro: 'Usa estos seis pasos para situar esta página dentro del método. Elige uno para ver la siguiente pregunta.', aria: 'Seis pasos del método de trabajo fiable con LLM', selected: 'Paso seleccionado', next: 'Siguiente pregunta', open: 'Abrir esta parte del recorrido', fallback: 'Leer el recorrido como texto', fallbackIntro: 'La secuencia conserva el mismo significado sin los controles interactivos ni la imagen.', figureAlt: 'Ciclo de trabajo fiable con LLM en seis pasos: entender, delimitar, actuar, inspeccionar, corregir y transferir.', figureOpen: 'Abrir el visual a tamaño completo', figureCaption: 'Tablero didáctico original del proyecto. El texto que lo rodea es la explicación accesible; el tablero solo orienta.', boundary: 'El mapa muestra una secuencia, no una finalización. Conserva el intento, la comprobación, el fallo y lo que aún no se sabe.', labels: ['Entender', 'Delimitar', 'Actuar', 'Inspeccionar', 'Corregir', 'Transferir'], bodies: ['Separa la propuesta del modelo de lo que pueden demostrar las pruebas disponibles.', 'Define objetivo, contexto, ayuda permitida, límites, comprobación y condición de parada.', 'Permite solo la acción reversible más pequeña y detente antes de cualquier efecto externo.', 'Compara la respuesta o el diff con una fuente, prueba, registro o criterio de aceptación.', 'Nombra un desajuste, conserva el registro del fallo y cambia una sola condición antes de reintentar.', 'Repite el método en una tarea nueva; un intento acertado no demuestra dominio.'], nextQuestions: ['¿Qué resultado puedo comprobar?', '¿Qué está permitido y qué queda fuera?', '¿Cuál es la acción segura más pequeña?', '¿Qué evidencia cambiaría mi conclusión?', '¿Qué desajuste corregiré primero?', '¿Puedo repetir el método en una tarea nueva?']
    },
    ja: {
      summary: '視覚的なルートマップ', intro: 'この6ステップで、今のページが方法全体のどこにあるかを確認します。ステップを選ぶと次の問いが表示されます。', aria: '信頼できるLLM作業方法の6ステップ', selected: '選択中のステップ', next: '次に確認する問い', open: 'この部分のルートを開く', fallback: 'ルートをテキストで読む', fallbackIntro: 'インタラクティブ操作や画像がなくても、同じ順序と意味を確認できます。', figureAlt: '信頼できるLLM作業ループの6ステップ図：理解、枠決め、実行、確認、修正、転用。', figureOpen: '原寸の図を開く', figureCaption: 'プロジェクト作成の教材ボードです。周囲のテキストがアクセシブルな説明で、ボードは位置づけのための補助です。', boundary: 'ルートマップは順序を示すもので、完了を証明しません。試行、確認、失敗の記録、まだ不明な点を残してください。', labels: ['理解する', '枠を決める', '実行する', '確認する', '修正する', '転用する'], bodies: ['モデルの提案と、手元の証拠で確かめられることを分けます。', '目的、文脈、許可する支援、制約、確認方法、停止条件を明記します。', '最小限で元に戻せる操作だけを許可し、外部に影響する前に止まります。', '出力や差分を、出典、テスト、ログ、受け入れ条件と照合します。', '不一致を1つ特定し、失敗の記録を残して、条件を1つだけ変えて再試行します。', '初めて扱う課題でも方法を繰り返します。1回の成功は習得の証拠ではありません。'], nextQuestions: ['どの結果なら確認できるか？', '何が許可され、何が対象外か？', '最小の安全な操作は何か？', 'どの証拠が主張を変えるか？', '最初にどの不一致を直すか？', '新しい課題でも方法を繰り返せるか？']
    },
    ko: {
      summary: '시각적 경로 지도', intro: '여섯 단계로 현재 페이지가 전체 방법에서 어디에 놓이는지 확인하세요. 단계를 선택하면 다음 질문이 표시됩니다.', aria: '신뢰할 수 있는 LLM 작업 방법의 여섯 단계', selected: '선택한 단계', next: '다음 질문', open: '이 경로의 해당 부분 열기', fallback: '경로를 텍스트 순서로 읽기', fallbackIntro: '대화형 조작이나 이미지 없이도 같은 순서와 의미를 확인할 수 있습니다.', figureAlt: '신뢰할 수 있는 LLM 작업 루프 여섯 단계 그림: 이해, 범위 설정, 행동, 점검, 수정, 전이.', figureOpen: '원본 크기 시각 자료 열기', figureCaption: '프로젝트가 만든 교육용 보드입니다. 주변 텍스트가 접근 가능한 설명이고 보드는 위치를 잡는 보조 자료입니다.', boundary: '경로 지도는 순서를 보여 줄 뿐 완료를 증명하지 않습니다. 시도, 점검, 실패 기록과 아직 모르는 내용을 남기세요.', labels: ['이해하기', '범위 정하기', '행동하기', '점검하기', '수정하기', '전이하기'], bodies: ['모델이 제안한 내용과 현재 증거로 확인할 수 있는 내용을 분리합니다.', '목표, 맥락, 허용된 도움, 제한, 점검 방법과 중지 조건을 적습니다.', '가장 작고 되돌릴 수 있는 행동만 허용하고 외부 효과가 생기기 전에 멈춥니다.', '출력이나 diff를 출처, 테스트, 로그 또는 수용 기준과 대조합니다.', '불일치 하나를 적고 실패 기록을 보존한 뒤 조건 하나만 바꾸어 다시 시도합니다.', '처음 보는 작업에서도 방법을 반복합니다. 한 번의 성공은 숙련의 증거가 아닙니다.'], nextQuestions: ['어떤 결과를 확인할 수 있는가?', '무엇을 허용하고 무엇을 제외할 것인가?', '가장 작은 안전한 행동은 무엇인가?', '어떤 증거가 내 판단을 바꿀 수 있는가?', '어떤 불일치부터 고칠 것인가?', '새 작업에서도 이 방법을 반복할 수 있는가?']
    },
    de: {
      summary: 'Visuelle Routenkarten', intro: 'Ordne diese Seite mit den sechs Schritten in die Gesamtmethode ein. Wähle einen Schritt für die nächste Frage.', aria: 'Sechs Schritte der verlässlichen LLM-Arbeitsmethode', selected: 'Ausgewählter Schritt', next: 'Nächste Frage', open: 'Diesen Teil des Lernwegs öffnen', fallback: 'Den Lernweg als Text lesen', fallbackIntro: 'Auch ohne interaktive Steuerelemente oder Bild bleibt dieselbe Reihenfolge verständlich.', figureAlt: 'Sechsstufiger verlässlicher LLM-Arbeitsablauf: verstehen, abgrenzen, handeln, prüfen, korrigieren und übertragen.', figureOpen: 'Visualisierung in voller Größe öffnen', figureCaption: 'Projektbezogene Lehrtafel. Der umgebende Text ist die zugängliche Erklärung; die Tafel dient nur der Orientierung.', boundary: 'Die Karte zeigt eine Reihenfolge, aber keinen Abschlussnachweis. Bewahre Versuch, Prüfung, Fehler und die verbleibenden Unbekannten auf.', labels: ['Verstehen', 'Abgrenzen', 'Handeln', 'Prüfen', 'Korrigieren', 'Übertragen'], bodies: ['Trenne den Vorschlag des Modells von dem, was die vorhandenen Belege tatsächlich zeigen können.', 'Benenne Ziel, Kontext, erlaubte Hilfe, Grenzen, Prüfung und Abbruchbedingung.', 'Erlaube nur die kleinste reversible Handlung und halte vor einer Außenwirkung an.', 'Vergleiche Ausgabe oder Diff mit Quelle, Test, Protokoll oder Abnahmeregel.', 'Benenne eine Abweichung, bewahre den Fehlerversuch auf und ändere genau eine Bedingung.', 'Wiederhole die Methode an einer unbekannten Aufgabe; ein gelungener Versuch ist noch keine Beherrschung.'], nextQuestions: ['Welches Ergebnis kann ich prüfen?', 'Was ist erlaubt, und was bleibt ausgeschlossen?', 'Was ist die kleinste sichere Handlung?', 'Welcher Beleg würde meine Aussage ändern?', 'Welche Abweichung korrigiere ich zuerst?', 'Kann ich die Methode an einer neuen Aufgabe wiederholen?']
    },
    'zh-tw': {
      summary: '視覺化路線圖', intro: '用這六個步驟定位目前頁面在整套方法中的位置。選取一個步驟，查看下一個問題。', aria: '可靠 LLM 工作方法的六個步驟', selected: '目前步驟', next: '下一個問題', open: '開啟這部分路線', fallback: '依文字順序閱讀路線', fallbackIntro: '即使不使用互動控制項或圖片，下方順序仍表達相同內容。', figureAlt: '可靠 LLM 工作迴圈六步圖：理解、框定、行動、檢查、修正與遷移。', figureOpen: '開啟完整尺寸圖示', figureCaption: '專案原創教學圖。周圍文字才是可存取的說明，圖板只是用來定位路線。', boundary: '路線圖呈現順序，不是完成證明。請保留嘗試、檢查、失敗紀錄與仍然未知的部分。', labels: ['理解', '框定任務', '採取行動', '檢查結果', '修正問題', '遷移方法'], bodies: ['把模型提出的內容，與現有證據能夠證明的內容分開。', '寫清楚目標、上下文、允許的協助、限制、檢查方式與停止條件。', '只允許最小且可復原的行動；在產生外部影響前先暫停。', '把輸出或差異與來源、測試、日誌或驗收規則對照。', '指出一個不一致，保留失敗紀錄，只改變一個條件後再試。', '在沒看過的新任務上重複方法；一次成功不等於掌握。'], nextQuestions: ['我能檢查哪個結果？', '哪些事情允許做，哪些不允許？', '最小的安全行動是什麼？', '什麼證據會改變我的結論？', '我先修正哪一個不一致？', '我能在新任務上重複這套方法嗎？']
    },
    fr: {
      summary: 'Carte visuelle du parcours', intro: 'Utilisez ces six étapes pour situer cette page dans la méthode générale. Sélectionnez-en une pour voir la question suivante.', aria: 'Six étapes de la méthode de travail fiable avec un LLM', selected: 'Étape sélectionnée', next: 'Question suivante', open: 'Ouvrir cette partie du parcours', fallback: 'Lire le parcours sous forme de texte', fallbackIntro: 'La séquence garde le même sens sans les commandes interactives ni l’image.', figureAlt: 'Boucle de travail fiable avec un LLM en six étapes : comprendre, cadrer, agir, vérifier, corriger et transférer.', figureOpen: 'Ouvrir le visuel en taille réelle', figureCaption: 'Planche pédagogique originale du projet. Le texte environnant constitue l’explication accessible ; la planche sert à se repérer.', boundary: 'La carte montre une séquence, pas une preuve de réussite. Conservez l’essai, le contrôle, l’échec et les inconnues restantes.', labels: ['Comprendre', 'Cadrer', 'Agir', 'Vérifier', 'Corriger', 'Transférer'], bodies: ['Séparez la proposition du modèle de ce que les preuves disponibles permettent réellement d’établir.', 'Indiquez le but, le contexte, l’aide autorisée, les limites, le contrôle et la condition d’arrêt.', 'N’autorisez que l’action réversible la plus petite et faites une pause avant tout effet externe.', 'Comparez la sortie ou le diff avec une source, un test, un journal ou une règle d’acceptation.', 'Nommez un écart, conservez la trace de l’échec et ne changez qu’une condition avant de réessayer.', 'Répétez la méthode sur une tâche inconnue ; un essai réussi ne prouve pas la maîtrise.'], nextQuestions: ['Quel résultat puis-je vérifier ?', 'Qu’est-ce qui est autorisé et qu’est-ce qui ne l’est pas ?', 'Quelle est la plus petite action sûre ?', 'Quelle preuve ferait évoluer mon affirmation ?', 'Quel écart vais-je corriger en premier ?', 'Puis-je répéter la méthode sur une nouvelle tâche ?']
    },
  };

  // These strings describe the progressive-enhancement layer around the
  // source page. Headings and visual labels still come from the selected
  // locale, so the map never replaces the localized lesson with an English
  // summary.
  const readerVisualCopy = {
    en: {
      conceptSummary: 'Page concept map', conceptIntro: 'See the current page as one main idea with the sections that move it forward.', conceptAria: 'Concept map for this page', conceptRoot: 'This page', conceptFallback: 'Read the map as text', conceptFallbackIntro: 'The same headings and links remain available in a simple ordered list.', conceptBoundary: 'This map is derived from headings. It helps you orient yourself; it does not prove that the page was understood or completed.', visualSummary: 'Teaching visual', visualIntro: 'Use one project-authored board to see the relationship this page is about before you read the detail.', visualOpen: 'Open full-size visual', visualCaptionPrefix: 'Project-authored teaching board for', visualBoundary: 'The board explains a relationship and a next question. It is an orientation aid, not evidence that a model acted or that learning occurred.', visualAltPrefix: 'Teaching diagram showing', conceptAnatomyOpen: 'Open the page anatomy board', conceptAnatomyCaption: 'Project-authored page anatomy board. The text sequence is the accessible explanation; the board is an orientation aid.', conceptAnatomyBoundary: 'The page anatomy describes a reading route, not proof of understanding, runtime success, or transfer.', recoverySummary: 'Recovery decision map', recoveryIntro: 'When a result is uncertain, follow the smallest permitted next decision.', recoveryAria: 'Five-step recovery decision map', recoveryRoot: 'Recovery decision', recoverySelected: 'Selected step', recoveryNext: 'Next decision', recoveryOpen: 'Open the recovery route', recoveryFallback: 'Read the recovery map as text', recoveryFallbackIntro: 'The same five decisions remain available as a simple ordered list.', recoveryFigureAlt: 'Recovery decision tree: preserve the trace, classify the first mismatch, check authority, run one safe check or stop, then keep the claim narrow.', recoveryFigureOpen: 'Open full-size recovery board', recoveryFigureCaption: 'Project-authored recovery decision board. The text sequence is the accessible explanation; the board is an orientation aid.', recoveryBoundary: 'A recovery map does not prove that a retry worked. Preserve the original gap and report only what the new record supports.', recoveryLabels: ['Preserve', 'Classify', 'Authority', 'Check', 'Stop'], recoveryBodies: ['Keep the request, inputs, output, diff, state, and last checkpoint before changing anything.', 'Name the first mismatch: missing input, wrong scope, failed action, or weak proof.', 'Ask whether the next check is permitted by the stated scope, permission, and available input.', 'If permitted, change one condition and compare one observable result with the original.', 'If proof or authority is missing, stop and keep the result candidate, blocked, or unknown.'], recoveryNextQuestions: ['What exact trace will I keep?', 'What failed first?', 'May I take this next action?', 'What changed in the new record?', 'What narrow claim can I support?'],
    },
    zh: {
      conceptSummary: '本页思维导图', conceptIntro: '把当前页面看成一个主问题，以及推动它向前的各个小节。', conceptAria: '本页概念图', conceptRoot: '当前页面', conceptFallback: '按文字阅读导图', conceptFallbackIntro: '相同的标题和链接也会以简单的有序列表提供。', conceptBoundary: '这张图根据页面标题生成，用于定位阅读位置；它不证明你已经理解或完成本页。', visualSummary: '配套教学图', visualIntro: '先用一张项目原创图看清本页讨论的关系，再阅读具体细节。', visualOpen: '打开完整尺寸图示', visualCaptionPrefix: '项目原创教学图，主题是', visualBoundary: '图示解释一种关系和下一道问题；它只是定位工具，不证明模型已经行动或学习已经发生。', visualAltPrefix: '展示以下关系的教学图', recoverySummary: '恢复决策图', recoveryIntro: '结果不确定时，沿着最小、获准的下一步行动判断。', recoveryAria: '五步恢复决策图', recoveryRoot: '恢复决策', recoverySelected: '当前步骤', recoveryNext: '下一项判断', recoveryOpen: '打开恢复路线', recoveryFallback: '按文字阅读恢复图', recoveryFallbackIntro: '相同的五项判断也会以简单的有序列表提供。', recoveryFigureAlt: '恢复决策树：保留轨迹、分类首个不匹配、检查授权，在获准时执行一次安全检查，否则停止并收窄声明。', recoveryFigureOpen: '打开完整恢复图板', recoveryFigureCaption: '项目原创恢复决策图。文字序列是无障碍解释；图板用于帮助定位。', recoveryBoundary: '恢复图不证明重试成功。保留原始缺口，只陈述新记录支持的范围。', recoveryLabels: ['保留', '分类', '授权', '检查', '停止'], recoveryBodies: ['先保留请求、输入、输出、差异、状态和最后检查点，再改变任何条件。', '指出首个不匹配：输入缺失、范围错误、行动失败或证据不足。', '确认下一项检查是否符合当前范围、权限和已有输入。', '如果获准，只改变一个条件，并把一个可观察结果与原记录对照。', '如果缺少证据或授权，就停止，并把结果标为 candidate、blocked 或 unknown。'], recoveryNextQuestions: ['要保留哪一条明确轨迹？', '最先失败的是什么？', '下一步行动是否获准？', '新记录具体改变了什么？', '我能支持哪一条窄声明？'],
    },
    es: {
      conceptSummary: 'Mapa conceptual de esta página', conceptIntro: 'Mira la página como una idea principal y las secciones que la hacen avanzar.', conceptAria: 'Mapa conceptual de esta página', conceptRoot: 'Esta página', conceptFallback: 'Leer el mapa como texto', conceptFallbackIntro: 'Los mismos títulos y enlaces están disponibles en una lista ordenada.', conceptBoundary: 'El mapa se genera a partir de los encabezados. Sirve para orientarse; no demuestra comprensión ni finalización.', visualSummary: 'Visual didáctico', visualIntro: 'Mira un tablero original del proyecto para entender la relación central antes de leer el detalle.', visualOpen: 'Abrir el visual a tamaño completo', visualCaptionPrefix: 'Tablero didáctico original del proyecto sobre', visualBoundary: 'El tablero explica una relación y una pregunta siguiente. Orienta, pero no demuestra que un modelo haya actuado ni que haya aprendizaje.', visualAltPrefix: 'Diagrama didáctico que muestra', recoverySummary: 'Mapa de decisión para recuperarse', recoveryIntro: 'Cuando el resultado es incierto, sigue la decisión siguiente más pequeña que esté permitida.', recoveryAria: 'Mapa de cinco pasos para recuperarse', recoveryRoot: 'Decisión de recuperación', recoverySelected: 'Paso seleccionado', recoveryNext: 'Siguiente decisión', recoveryOpen: 'Abrir la ruta de recuperación', recoveryFallback: 'Leer el mapa como texto', recoveryFallbackIntro: 'Las mismas cinco decisiones están disponibles en una lista ordenada.', recoveryFigureAlt: 'Árbol de decisión de recuperación: conservar el rastro, clasificar el primer desajuste, comprobar la autorización, hacer una comprobación segura o detenerse y limitar la afirmación.', recoveryFigureOpen: 'Abrir el tablero de recuperación completo', recoveryFigureCaption: 'Tablero original del proyecto. La secuencia textual es la explicación accesible; el tablero solo orienta.', recoveryBoundary: 'El mapa no demuestra que un reintento haya funcionado. Conserva el hueco original y afirma solo lo que permite el nuevo registro.', recoveryLabels: ['Conservar', 'Clasificar', 'Autorización', 'Comprobar', 'Detenerse'], recoveryBodies: ['Conserva la petición, las entradas, la salida, el diff, el estado y el último checkpoint antes de cambiar nada.', 'Nombra el primer desajuste: entrada ausente, alcance incorrecto, acción fallida o prueba débil.', 'Comprueba si la siguiente verificación está permitida por el alcance, la autorización y las entradas disponibles.', 'Si está permitida, cambia una sola condición y compara un resultado observable con el registro original.', 'Si falta prueba o autorización, detente y mantén el resultado como candidate, blocked o unknown.'], recoveryNextQuestions: ['¿Qué rastro exacto conservaré?', '¿Qué falló primero?', '¿Puedo hacer esta acción?', '¿Qué cambió en el nuevo registro?', '¿Qué afirmación acotada puedo sostener?'],
    },
    ja: {
      conceptSummary: 'このページの概念マップ', conceptIntro: 'このページを、中心となる考えと、それを前に進める各節として捉えます。', conceptAria: 'このページの概念マップ', conceptRoot: 'このページ', conceptFallback: 'マップを文字で読む', conceptFallbackIntro: '同じ見出しとリンクを、単純な順序付きリストでも確認できます。', conceptBoundary: 'このマップは見出しから生成されます。位置づけの補助であり、理解や完了の証明ではありません。', visualSummary: '教材図', visualIntro: '本文の細部に入る前に、このページの関係をプロジェクト作成の図でつかみます。', visualOpen: '原寸の図を開く', visualCaptionPrefix: 'プロジェクト作成の教材図：', visualBoundary: '図は関係と次の問いを説明する補助資料です。モデルの実行や学習が起きた証拠ではありません。', visualAltPrefix: '次の関係を示す教材図', recoverySummary: '復旧の判断マップ', recoveryIntro: '結果が不確かなときは、許可された最小の次の判断をたどります。', recoveryAria: '5段階の復旧判断マップ', recoveryRoot: '復旧の判断', recoverySelected: '選択中の段階', recoveryNext: '次の判断', recoveryOpen: '復旧ルートを開く', recoveryFallback: '復旧マップを文字で読む', recoveryFallbackIntro: '同じ5つの判断を、順序付きリストでも確認できます。', recoveryFigureAlt: '復旧判断ツリー：記録を残し、最初の不一致を分類し、権限を確認し、許可された安全な確認を1つ行うか停止して主張を狭める。', recoveryFigureOpen: '復旧ボードを原寸で開く', recoveryFigureCaption: 'プロジェクト作成の復旧判断ボード。文字の流れがアクセシブルな説明で、ボードは位置づけの補助です。', recoveryBoundary: 'このマップは再試行の成功を証明しません。元の不明点を残し、新しい記録が支える範囲だけを述べます。', recoveryLabels: ['保持', '分類', '権限', '確認', '停止'], recoveryBodies: ['依頼、入力、出力、差分、状態、最後のチェックポイントを、条件を変える前に残します。', '最初の不一致を、入力不足、範囲違い、操作失敗、証拠不足のいずれかに分けます。', '次の確認が、範囲・権限・手元の入力で許可されているかを確認します。', '許可されていれば条件を1つだけ変え、観測できる結果を元の記録と比較します。', '証拠または権限が足りなければ停止し、candidate、blocked、unknownのまま記録します。'], recoveryNextQuestions: ['何を記録として残すか？', '最初に失敗したのは何か？', '次の操作は許可されているか？', '新しい記録で何が変わったか？', 'どの範囲の主張なら支えられるか？'],
    },
    ko: {
      conceptSummary: '이 페이지의 개념 지도', conceptIntro: '현재 페이지를 핵심 생각 하나와 그것을 이어 가는 섹션으로 살펴보세요.', conceptAria: '이 페이지의 개념 지도', conceptRoot: '이 페이지', conceptFallback: '지도를 텍스트로 읽기', conceptFallbackIntro: '같은 제목과 링크를 간단한 순서 목록으로도 확인할 수 있습니다.', conceptBoundary: '이 지도는 제목에서 생성됩니다. 위치를 잡는 보조 자료이며 이해나 완료를 증명하지 않습니다.', visualSummary: '교육용 시각 자료', visualIntro: '세부 내용을 읽기 전에 이 페이지의 관계를 프로젝트가 만든 보드로 먼저 확인하세요.', visualOpen: '원본 크기 시각 자료 열기', visualCaptionPrefix: '프로젝트가 만든 교육 보드: ', visualBoundary: '보드는 관계와 다음 질문을 설명하는 보조 자료입니다. 모델 실행이나 학습이 일어났다는 증거가 아닙니다.', visualAltPrefix: '다음 관계를 보여 주는 교육용 그림', recoverySummary: '복구 의사결정 지도', recoveryIntro: '결과가 불확실할 때 허용된 가장 작은 다음 판단을 따라가세요.', recoveryAria: '5단계 복구 의사결정 지도', recoveryRoot: '복구 판단', recoverySelected: '선택한 단계', recoveryNext: '다음 판단', recoveryOpen: '복구 경로 열기', recoveryFallback: '복구 지도를 텍스트로 읽기', recoveryFallbackIntro: '같은 다섯 가지 판단을 간단한 순서 목록으로도 확인할 수 있습니다.', recoveryFigureAlt: '복구 의사결정 트리: 기록을 보존하고 첫 불일치를 분류한 뒤 권한을 확인하고, 허용되면 안전한 점검 하나를 실행하거나 중지하며 주장을 좁힌다.', recoveryFigureOpen: '전체 복구 보드 열기', recoveryFigureCaption: '프로젝트가 만든 복구 의사결정 보드입니다. 텍스트 순서가 접근 가능한 설명이고 보드는 방향을 잡는 보조 자료입니다.', recoveryBoundary: '이 지도는 재시도가 성공했다는 증거가 아닙니다. 원래의 공백을 보존하고 새 기록이 지지하는 범위만 말하세요.', recoveryLabels: ['보존', '분류', '권한', '점검', '중지'], recoveryBodies: ['조건을 바꾸기 전에 요청, 입력, 출력, diff, 상태, 마지막 체크포인트를 보존합니다.', '첫 불일치를 입력 누락, 범위 오류, 작업 실패, 증거 부족으로 구분합니다.', '다음 점검이 현재 범위·권한·입력으로 허용되는지 확인합니다.', '허용되면 조건 하나만 바꾸고 관찰 가능한 결과 하나를 원래 기록과 비교합니다.', '증거나 권한이 부족하면 중지하고 결과를 candidate, blocked, unknown으로 남깁니다.'], recoveryNextQuestions: ['어떤 기록을 그대로 남길까?', '무엇이 먼저 실패했나?', '다음 작업은 허용되었나?', '새 기록에서 무엇이 달라졌나?', '어떤 범위의 주장만 할 수 있나?'],
    },
    de: {
      conceptSummary: 'Begriffskarte dieser Seite', conceptIntro: 'Ordne die Seite als einen Hauptgedanken mit den Abschnitten ein, die ihn weiterführen.', conceptAria: 'Begriffskarte für diese Seite', conceptRoot: 'Diese Seite', conceptFallback: 'Die Karte als Text lesen', conceptFallbackIntro: 'Dieselben Überschriften und Links stehen auch als einfache geordnete Liste bereit.', conceptBoundary: 'Die Karte wird aus den Überschriften erzeugt. Sie dient der Orientierung und beweist weder Verständnis noch Abschluss.', visualSummary: 'Lehrtafel', visualIntro: 'Sieh dir zuerst eine projektbezogene Tafel an, um die zentrale Beziehung der Seite zu erfassen.', visualOpen: 'Visualisierung in voller Größe öffnen', visualCaptionPrefix: 'Projektbezogene Lehrtafel zu', visualBoundary: 'Die Tafel erklärt eine Beziehung und eine nächste Frage. Sie ist eine Orientierungshilfe, kein Beleg für eine Modellaktion oder einen Lernerfolg.', visualAltPrefix: 'Lehrdiagramm zu', recoverySummary: 'Entscheidungskarte für die Wiederherstellung', recoveryIntro: 'Wenn ein Ergebnis unsicher ist, folge der kleinsten zulässigen nächsten Entscheidung.', recoveryAria: 'Fünfstufige Entscheidungskarte für die Wiederherstellung', recoveryRoot: 'Wiederherstellungsentscheidung', recoverySelected: 'Ausgewählter Schritt', recoveryNext: 'Nächste Entscheidung', recoveryOpen: 'Wiederherstellungsroute öffnen', recoveryFallback: 'Karte als Text lesen', recoveryFallbackIntro: 'Dieselben fünf Entscheidungen stehen auch als einfache geordnete Liste bereit.', recoveryFigureAlt: 'Entscheidungsbaum zur Wiederherstellung: Spur sichern, erste Abweichung einordnen, Berechtigung prüfen, eine sichere Prüfung ausführen oder anhalten und die Aussage begrenzen.', recoveryFigureOpen: 'Wiederherstellungskarte in voller Größe öffnen', recoveryFigureCaption: 'Projektbezogene Entscheidungskarte. Die Textfolge ist die zugängliche Erklärung; die Karte dient der Orientierung.', recoveryBoundary: 'Die Karte beweist nicht, dass ein erneuter Versuch funktioniert hat. Bewahre die ursprüngliche Lücke und formuliere nur, was der neue Beleg trägt.', recoveryLabels: ['Sichern', 'Einordnen', 'Berechtigung', 'Prüfen', 'Stoppen'], recoveryBodies: ['Sichere Anfrage, Eingaben, Ausgabe, Diff, Zustand und letzten Checkpoint, bevor du etwas änderst.', 'Benenne die erste Abweichung: fehlende Eingabe, falscher Umfang, fehlgeschlagene Aktion oder schwacher Beleg.', 'Prüfe, ob die nächste Prüfung durch Umfang, Berechtigung und vorhandene Eingaben gedeckt ist.', 'Wenn sie zulässig ist, ändere nur eine Bedingung und vergleiche ein beobachtbares Ergebnis mit dem ursprünglichen Beleg.', 'Wenn Beleg oder Berechtigung fehlen, halte an und lasse das Ergebnis als candidate, blocked oder unknown stehen.'], recoveryNextQuestions: ['Welche Spur sichere ich genau?', 'Was ist zuerst fehlgeschlagen?', 'Darf ich diese Aktion ausführen?', 'Was hat sich im neuen Beleg geändert?', 'Welche begrenzte Aussage kann ich tragen?'],
    },
    'zh-tw': {
      conceptSummary: '本頁概念圖', conceptIntro: '把目前頁面看成一個核心問題，以及推動它前進的各個段落。', conceptAria: '本頁概念圖', conceptRoot: '目前頁面', conceptFallback: '依文字閱讀概念圖', conceptFallbackIntro: '相同的標題與連結也會以簡單的有序清單呈現。', conceptBoundary: '這張圖根據頁面標題產生，用來定位閱讀位置；不代表你已理解或完成本頁。', visualSummary: '配套教學圖', visualIntro: '先用一張專案原創圖看清本頁討論的關係，再閱讀細節。', visualOpen: '開啟完整尺寸圖示', visualCaptionPrefix: '專案原創教學圖，主題是', visualBoundary: '圖示解釋一種關係與下一個問題；它只是定位工具，不代表模型已採取行動或學習已經發生。', visualAltPrefix: '展示以下關係的教學圖', recoverySummary: '復原決策圖', recoveryIntro: '結果不確定時，沿著最小且獲准的下一步判斷。', recoveryAria: '五步復原決策圖', recoveryRoot: '復原決策', recoverySelected: '目前步驟', recoveryNext: '下一項判斷', recoveryOpen: '開啟復原路線', recoveryFallback: '依文字閱讀復原圖', recoveryFallbackIntro: '相同的五項判斷也會以簡單的有序清單呈現。', recoveryFigureAlt: '復原決策樹：保留軌跡、分類第一個不一致、檢查權限，在獲准時執行一次安全檢查，否則停止並縮小主張範圍。', recoveryFigureOpen: '開啟完整復原圖板', recoveryFigureCaption: '專案原創復原決策圖。文字序列是無障礙說明；圖板用來協助定位。', recoveryBoundary: '復原圖不代表重試成功。保留原始缺口，只陳述新紀錄能支持的範圍。', recoveryLabels: ['保留', '分類', '權限', '檢查', '停止'], recoveryBodies: ['先保留請求、輸入、輸出、差異、狀態與最後一個檢查點，再改變任何條件。', '指出第一個不一致：輸入缺失、範圍錯誤、行動失敗或證據不足。', '確認下一項檢查是否符合目前範圍、權限與現有輸入。', '如果獲准，只改變一個條件，並將一項可觀察結果與原始紀錄對照。', '如果缺少證據或權限，就停止，並把結果標為 candidate、blocked 或 unknown。'], recoveryNextQuestions: ['要保留哪一條明確軌跡？', '最先失敗的是什麼？', '下一步行動是否獲准？', '新紀錄具體改變了什麼？', '我能支持哪一項較窄的主張？'],
    },
    fr: {
      conceptSummary: 'Carte conceptuelle de cette page', conceptIntro: 'Lisez la page comme une idée centrale et les sections qui la font progresser.', conceptAria: 'Carte conceptuelle de cette page', conceptRoot: 'Cette page', conceptFallback: 'Lire la carte sous forme de texte', conceptFallbackIntro: 'Les mêmes titres et liens restent disponibles dans une liste ordonnée.', conceptBoundary: 'La carte est dérivée des titres. Elle aide à se repérer ; elle ne prouve ni la compréhension ni la fin de la page.', visualSummary: 'Visuel pédagogique', visualIntro: 'Regardez une planche originale du projet pour saisir la relation centrale avant les détails.', visualOpen: 'Ouvrir le visuel en taille réelle', visualCaptionPrefix: 'Planche pédagogique originale du projet :', visualBoundary: 'La planche explique une relation et une question suivante. Elle aide à se repérer, mais ne prouve ni une action du modèle ni un apprentissage.', visualAltPrefix: 'Diagramme pédagogique montrant', recoverySummary: 'Carte de décision pour récupérer', recoveryIntro: 'Quand le résultat est incertain, suivez la plus petite décision suivante qui reste autorisée.', recoveryAria: 'Carte de décision de récupération en cinq étapes', recoveryRoot: 'Décision de récupération', recoverySelected: 'Étape sélectionnée', recoveryNext: 'Décision suivante', recoveryOpen: 'Ouvrir le parcours de récupération', recoveryFallback: 'Lire la carte sous forme de texte', recoveryFallbackIntro: 'Les cinq mêmes décisions restent disponibles dans une liste ordonnée.', recoveryFigureAlt: 'Arbre de décision de récupération : conserver la trace, classer le premier écart, vérifier l’autorisation, effectuer une vérification sûre ou s’arrêter en limitant l’affirmation.', recoveryFigureOpen: 'Ouvrir la planche de récupération en taille réelle', recoveryFigureCaption: 'Planche originale du projet. La séquence textuelle est l’explication accessible ; la planche sert à se repérer.', recoveryBoundary: 'La carte ne prouve pas qu’une nouvelle tentative a réussi. Conservez le manque initial et ne formulez que ce que le nouveau relevé permet d’établir.', recoveryLabels: ['Conserver', 'Classer', 'Autorisation', 'Vérifier', 'S’arrêter'], recoveryBodies: ['Conservez la demande, les entrées, la sortie, le diff, l’état et le dernier checkpoint avant de modifier quoi que ce soit.', 'Nommez le premier écart : entrée manquante, périmètre incorrect, action échouée ou preuve insuffisante.', 'Vérifiez que la prochaine vérification est autorisée par le périmètre, les droits et les entrées disponibles.', 'Si elle est autorisée, ne changez qu’une condition et comparez un résultat observable avec le relevé initial.', 'S’il manque une preuve ou une autorisation, arrêtez-vous et gardez le résultat comme candidate, blocked ou unknown.'], recoveryNextQuestions: ['Quelle trace exacte vais-je conserver ?', 'Qu’est-ce qui a échoué en premier ?', 'Cette action est-elle autorisée ?', 'Qu’est-ce qui a changé dans le nouveau relevé ?', 'Quelle affirmation limitée puis-je soutenir ?'],
    },
  };

  // The page-anatomy board is a compact orientation layer. Keep its copy
  // separate from the large visual dictionary so each locale can be reviewed
  // as a short, assembled passage rather than as a key-by-key translation.
  Object.assign(readerVisualCopy.en, {
    conceptAnatomyOpen: 'Open the page anatomy board',
    conceptAnatomyCaption: 'Page anatomy: a compact route from the problem to a transferable check.',
    conceptAnatomyBoundary: 'This board explains how to read the page; it does not prove understanding, execution, or transfer.',
  });
  Object.assign(readerVisualCopy.zh, {
    conceptAnatomyOpen: '打开页面解剖图',
    conceptAnatomyCaption: '页面解剖图：从问题到可迁移检查的一条紧凑路线。',
    conceptAnatomyBoundary: '这张图说明如何阅读页面，不证明你已经理解、执行或迁移方法。',
  });
  Object.assign(readerVisualCopy.es, {
    conceptAnatomyOpen: 'Abrir el esquema de la página',
    conceptAnatomyCaption: 'Esquema de la página: un recorrido breve desde el problema hasta una comprobación reutilizable.',
    conceptAnatomyBoundary: 'El esquema explica cómo leer la página; no demuestra comprensión, ejecución ni transferencia.',
  });
  Object.assign(readerVisualCopy.ja, {
    conceptAnatomyOpen: 'ページの読み方ボードを開く',
    conceptAnatomyCaption: 'ページの読み方：問題を見つけ、再利用できる確認まで進む短いルート。',
    conceptAnatomyBoundary: 'このボードはページの読み方を示すだけで、理解・実行・応用を証明するものではありません。',
  });
  Object.assign(readerVisualCopy.ko, {
    conceptAnatomyOpen: '페이지 읽기 보드 열기',
    conceptAnatomyCaption: '페이지 읽기: 문제에서 다른 과제에도 적용할 수 있는 점검까지 이어지는 짧은 경로입니다.',
    conceptAnatomyBoundary: '이 보드는 페이지를 읽는 방법을 설명할 뿐, 이해했거나 실행했거나 다른 과제에 적용했다는 증거가 아닙니다.',
  });
  Object.assign(readerVisualCopy.de, {
    conceptAnatomyOpen: 'Seitenaufbau öffnen',
    conceptAnatomyCaption: 'Seitenaufbau: ein kurzer Weg vom Problem zu einer übertragbaren Prüfung.',
    conceptAnatomyBoundary: 'Die Tafel zeigt, wie die Seite gelesen werden kann; sie belegt weder Verständnis noch Ausführung oder Übertragung.',
  });
  Object.assign(readerVisualCopy['zh-tw'], {
    conceptAnatomyOpen: '開啟頁面閱讀圖',
    conceptAnatomyCaption: '頁面閱讀圖：從問題一路走到可重複使用的檢查。',
    conceptAnatomyBoundary: '這張圖說明如何閱讀頁面，不代表你已理解、執行或把方法套用到新任務。',
  });
  Object.assign(readerVisualCopy.fr, {
    conceptAnatomyOpen: 'Ouvrir le schéma de lecture de la page',
    conceptAnatomyCaption: 'Schéma de lecture : un parcours court, du problème à une vérification réutilisable.',
    conceptAnatomyBoundary: 'Ce schéma explique comment lire la page ; il ne prouve ni la compréhension, ni l’exécution, ni le transfert.',
  });

  const readerVisualMap = [
    { tokens: ['chapter-04-context-permissions-and-agent', 'lab-016-side-effect-boundary', 'conversation-safety-card'], path: 'assets/teaching/conversation-safety-card-red-black.svg', step: 2 },
    { tokens: ['chapter-05-choose-the-codex-surface', 'platform-adapter-guide', 'universal-seams'], path: 'assets/teaching/universal-seams-red-black.svg', step: 1 },
    { tokens: ['chapter-06-model-selection', 'model-choice-is-a-test', 'llm-comparison-protocol'], path: 'assets/teaching/model-choice-is-a-test.svg', step: 1 },
    { tokens: ['chapter-07-skills-plugins-and-tools', 'lab-004-skill-selection'], path: 'assets/teaching/skill-to-observable-output.svg', step: 1 },
    { tokens: ['chapter-08-full-lifecycle-workflow', 'lab-009-engineering-lifecycle', 'lifecycle-checkpoints'], path: 'assets/teaching/lifecycle-checkpoints.svg', step: 2 },
    { tokens: ['chapter-16-engineering-track'], path: 'assets/teaching/lifecycle-checkpoints.svg', step: 2 },
    { tokens: ['chapter-17-marketing-track'], path: 'assets/teaching/practice-target-to-first-attempt-red-black.svg', step: 1 },
    { tokens: ['chapter-18-content-design-data-automation'], path: 'assets/teaching/task-to-evidence-red-black.svg', step: 3 },
    { tokens: ['chapter-19-evaluate-models-and-workflows', 'four-evidence-lenses'], path: 'assets/teaching/four-evidence-lenses-red-black.svg', step: 3 },
    { tokens: ['chapter-20-personal-codex-work-system'], path: 'assets/teaching/beginner-practice-loop-red-black.svg', step: 5 },
    { tokens: ['chapter-21-team-capability-system', 'agent-handoff-receipt-checkpoints'], path: 'assets/teaching/agent-handoff-receipt-checkpoints-red-black.svg', step: 5 },
    { tokens: ['chapter-22-continuous-update-and-future-proofing', 'interruption-checkpoint'], path: 'assets/teaching/interruption-checkpoint-card-red-black.svg', step: 4 },
    { tokens: ['lab-001-first-safe-task', 'first-turn-contract'], path: 'assets/teaching/first-turn-contract-card.svg', step: 1 },
    { tokens: ['lab-002-task-protocol'], path: 'assets/teaching/prompt-contract-six-fields-red-black.svg', step: 1 },
    { tokens: ['lab-003-evidence-review'], path: 'assets/teaching/evidence-recovery-ladder.svg', step: 3 },
    { tokens: ['lab-005-design-a-skill'], path: 'assets/teaching/skill-to-observable-output.svg', step: 1 },
    { tokens: ['lab-010-product-context'], path: 'assets/teaching/practice-target-to-first-attempt-red-black.svg', step: 1 },
    { tokens: ['lab-011-gpt-codex-boundaries'], path: 'assets/teaching/llm-six-terms-to-one-check.svg', step: 0 },
    { tokens: ['lab-012-team-capability-migration'], path: 'assets/teaching/agent-handoff-receipt-checkpoints-red-black.svg', step: 5 },
    { tokens: ['lab-014-resume-reconciliation'], path: 'assets/teaching/interruption-checkpoint-card-red-black.svg', step: 4 },
    { tokens: ['lab-015-evidence-delivery', 'chapter-15-research-track'], path: 'assets/teaching/evidence-to-decision-stop-map-red-black.svg', step: 3 },
    { tokens: ['lab-017-skill-discovery-audit'], path: 'assets/teaching/source-check-before-belief-red-black.svg', step: 3 },
    { tokens: ['llm-fundamentals-guide', 'chapter-01-gpt-and-codex'], path: 'assets/teaching/llm-six-terms-to-one-check.svg', step: 0 },
    { tokens: ['llm-core-first-generation', 'chapter-02-first-safe-task', 'chapter-03-task-protocol'], path: 'assets/teaching/prompt-contract-six-fields-red-black.svg', step: 1 },
    { tokens: ['chapter-13-action-boundaries', 'lab-007-action-boundaries', 'side-effect-boundary-decision-map'], path: 'assets/teaching/side-effect-boundary-decision-map.svg', step: 2 },
    { tokens: ['observable-action-boundary'], path: 'assets/teaching/observable-action-boundary-red-black.svg', step: 2 },
    { tokens: ['chapter-09-verification-and-recovery', 'task-to-evidence'], path: 'assets/teaching/evidence-recovery-ladder.svg', step: 3 },
    { tokens: ['llm-core-visible-failures', 'llm-core-check-repair', 'chapter-12-agent-loop-and-stop', 'lab-006-agent-stop-conditions'], path: 'assets/teaching/failed-interaction-recovery-red-black.svg', step: 4 },
    { tokens: ['chapter-11-designing-a-skill', 'skill-to-observable-output'], path: 'assets/teaching/skill-to-observable-output.svg', step: 1 },
    { tokens: ['lab-008-research-question', 'research-question-to-source-record'], path: 'assets/teaching/research-question-to-source-record-red-black.svg', step: 3 },
    { tokens: ['chapter-10-planning-and-slicing', 'lab-013-l3-vertical-slice'], path: 'assets/teaching/task-to-evidence-red-black.svg', step: 3 },
    { tokens: ['lab-018-language-transfer', 'communication-clinic', 'language-partner', 'beginner-practice-loop'], path: 'assets/teaching/beginner-practice-loop-red-black.svg', step: 5 },
    { tokens: ['llm-core-unseen-transfer', 'understanding-to-transfer'], path: 'assets/teaching/understanding-to-transfer-red-black.svg', step: 5 },
    { tokens: ['chapter-14-discover-and-audit-skills', 'source-investigator', 'platform-fact-watch'], path: 'assets/teaching/source-check-before-belief-red-black.svg', step: 3 },
    { tokens: ['project-evidence-snapshot', 'content-status', 'release-readiness'], path: 'assets/teaching/project-evidence-snapshot-red-black.svg', step: 3 },
  ];

  const readerRecoveryMapSteps = [
    { id: 'preserve', contentId: 'chapter-09-verification-and-recovery', path: 'book/chapters/09-verification-and-recovery-EN.md' },
    { id: 'classify', contentId: 'chapter-12-agent-loop-and-stop', path: 'book/chapters/12-agent-loop-and-stop-EN.md' },
    { id: 'authority', contentId: 'chapter-13-action-boundaries', path: 'book/chapters/13-action-boundaries-EN.md' },
    { id: 'check', contentId: 'lab-003-evidence-review', path: 'book/labs/lab-003-evidence-review-EN.md' },
    { id: 'stop', contentId: 'lab-006-agent-stop-conditions', path: 'book/labs/lab-006-agent-stop-conditions-EN.md' },
  ];

  const readerRouteMapSteps = [
    { id: 'understand', contentId: 'llm-fundamentals-guide', path: 'book/guides/llm-fundamentals-EN.md' },
    { id: 'frame', contentId: 'llm-core-first-generation', path: 'book/routes/llm-core-first-generation-EN.md' },
    { id: 'act', contentId: 'chapter-13-action-boundaries', path: 'book/chapters/13-action-boundaries-EN.md' },
    { id: 'inspect', contentId: 'chapter-09-verification-and-recovery', path: 'book/chapters/09-verification-and-recovery-EN.md' },
    { id: 'repair', contentId: 'llm-core-check-repair', path: 'book/routes/llm-core-check-repair-EN.md' },
    { id: 'transfer', contentId: 'llm-core-unseen-transfer', path: 'book/routes/llm-core-unseen-transfer-EN.md' },
  ];

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
  const currentReaderRouteMapCopy = () => readerRouteMapCopy[uiLanguage()] || readerRouteMapCopy.en;
  const currentReaderRecoveryMapCopy = () => readerVisualCopy[uiLanguage()] || readerVisualCopy.en;
  const routeMapStepIndex = (contentId) => readerRouteMapSteps.findIndex((step) => step.contentId === contentId);
  const routeMapStepHref = (step) => {
    const record = manifest.contents?.[step.contentId];
    const localizedPath = record?.locales?.[activeLocale]?.path;
    return readerHref(localizedPath || step.path, '', activeLocale);
  };
  const renderReaderRouteMap = (selection = null) => {
    if (!routeMap || !routeMapNodes || !routeMapDetailTitle || !routeMapDetailBody || !routeMapDetailNext) return;
    if (!selection) {
      routeMap.hidden = true;
      return;
    }
    const strings = currentReaderRouteMapCopy();
    const selectedIndex = Math.max(0, routeMapStepIndex(selection.contentId));
    routeMap.hidden = false;
    routeMap.open = selection.contentId === 'llm-foundation-core-v1';
    routeMapSummary.textContent = strings.summary;
    routeMapSummary.setAttribute('aria-label', strings.aria);
    routeMapIntro.textContent = strings.intro;
    routeMapDetailLabel.textContent = strings.selected;
    routeMapNextLabel.textContent = strings.next;
    routeMapOpen.textContent = strings.open;
    routeMapFallbackSummary.textContent = strings.fallback;
    routeMapFallbackIntro.textContent = strings.fallbackIntro;
    routeMapFigureOpen.textContent = strings.figureOpen;
    routeMapFigureCaption.textContent = strings.figureCaption;
    routeMapBoundary.textContent = strings.boundary;
    routeMapImage.alt = strings.figureAlt;
    routeMapFigureLink.href = directHref('assets/teaching/reliable-llm-work-loop-red-black.svg');
    routeMapNodes.setAttribute('aria-label', strings.aria);

    const selectStep = (index) => {
      const step = readerRouteMapSteps[index];
      if (!step) return;
      routeMapNodes.querySelectorAll('[data-reader-route-map-step]').forEach((button) => {
        const active = Number(button.dataset.readerRouteMapStep) === index;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('is-current', active);
      });
      routeMapDetailTitle.textContent = strings.labels[index];
      routeMapDetailBody.textContent = strings.bodies[index];
      routeMapDetailNext.textContent = strings.nextQuestions[index];
      routeMapDetailLink.href = routeMapStepHref(step);
      routeMapDetailLink.setAttribute('aria-label', `${strings.open}: ${strings.labels[index]}`);
    };

    routeMapNodes.replaceChildren();
    routeMapFallbackList.replaceChildren();
    readerRouteMapSteps.forEach((step, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'reader-route-map-node';
      button.dataset.readerRouteMapStep = String(index);
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', `${strings.selected}: ${strings.labels[index]}`);
      const number = document.createElement('span');
      number.className = 'reader-route-map-node-number';
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = strings.labels[index];
      button.append(number, label);
      button.addEventListener('click', () => selectStep(index));
      item.append(button);
      routeMapNodes.append(item);

      const fallbackItem = document.createElement('li');
      const fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = strings.labels[index];
      const fallbackBody = document.createElement('span');
      fallbackBody.textContent = strings.bodies[index];
      const fallbackLink = document.createElement('a');
      fallbackLink.href = routeMapStepHref(step);
      fallbackLink.textContent = strings.open;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackLink);
      routeMapFallbackList.append(fallbackItem);
    });
    selectStep(selectedIndex);
  };
  const recoveryMapEligibleIds = new Set([
    'chapter-09-verification-and-recovery',
    'chapter-12-agent-loop-and-stop',
    'chapter-13-action-boundaries',
    'lab-003-evidence-review',
    'lab-006-agent-stop-conditions',
    'lab-014-resume-reconciliation',
    'lab-015-evidence-delivery',
  ]);
  const recoveryMapSelectionIndex = {
    'chapter-09-verification-and-recovery': 0,
    'chapter-12-agent-loop-and-stop': 1,
    'chapter-13-action-boundaries': 2,
    'lab-003-evidence-review': 3,
    'lab-006-agent-stop-conditions': 4,
    'lab-014-resume-reconciliation': 4,
    'lab-015-evidence-delivery': 3,
  };
  const recoveryMapStepHref = (step) => {
    const record = manifest.contents?.[step.contentId];
    const localizedPath = record?.locales?.[activeLocale]?.path;
    return readerHref(localizedPath || step.path, '', activeLocale);
  };
  const renderReaderRecoveryMap = (selection = null) => {
    if (!recoveryMap || !recoveryMapNodes || !recoveryMapFallbackList) return;
    if (!selection || !recoveryMapEligibleIds.has(selection.contentId)) {
      recoveryMap.hidden = true;
      recoveryMapNodes.replaceChildren();
      recoveryMapFallbackList.replaceChildren();
      return;
    }
    const strings = currentReaderRecoveryMapCopy();
    const selectedIndex = Math.max(0, Math.min(
      readerRecoveryMapSteps.length - 1,
      recoveryMapSelectionIndex[selection.contentId] ?? 0,
    ));
    recoveryMap.hidden = false;
    recoveryMap.open = false;
    recoveryMapSummary.textContent = strings.recoverySummary;
    recoveryMapSummary.setAttribute('aria-label', strings.recoveryAria);
    recoveryMapIntro.textContent = strings.recoveryIntro;
    recoveryMapDetailLabel.textContent = strings.recoverySelected;
    recoveryMapNextLabel.textContent = strings.recoveryNext;
    recoveryMapOpen.textContent = strings.recoveryOpen;
    recoveryMapFallbackSummary.textContent = strings.recoveryFallback;
    recoveryMapFallbackIntro.textContent = strings.recoveryFallbackIntro;
    recoveryMapFigureOpen.textContent = strings.recoveryFigureOpen;
    recoveryMapFigureCaption.textContent = strings.recoveryFigureCaption;
    recoveryMapBoundary.textContent = strings.recoveryBoundary;
    recoveryMapImage.alt = strings.recoveryFigureAlt;
    recoveryMapFigureLink.href = directHref('assets/teaching/recovery-decision-tree-red-black.svg');
    recoveryMapFigureLink.setAttribute('aria-label', strings.recoveryFigureOpen);
    recoveryMapNodes.setAttribute('aria-label', strings.recoveryAria);

    const selectStep = (index) => {
      const step = readerRecoveryMapSteps[index];
      if (!step) return;
      recoveryMapNodes.querySelectorAll('[data-reader-recovery-map-step]').forEach((button) => {
        const active = Number(button.dataset.readerRecoveryMapStep) === index;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('is-current', active);
      });
      recoveryMapDetailTitle.textContent = strings.recoveryLabels[index];
      recoveryMapDetailBody.textContent = strings.recoveryBodies[index];
      recoveryMapDetailNext.textContent = strings.recoveryNextQuestions[index];
      recoveryMapDetailLink.href = recoveryMapStepHref(step);
      recoveryMapDetailLink.setAttribute('aria-label', `${strings.recoveryOpen}: ${strings.recoveryLabels[index]}`);
    };

    recoveryMapNodes.replaceChildren();
    recoveryMapFallbackList.replaceChildren();
    readerRecoveryMapSteps.forEach((step, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'reader-recovery-map-node';
      button.dataset.readerRecoveryMapStep = String(index);
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', `${strings.recoverySelected}: ${strings.recoveryLabels[index]}`);
      const number = document.createElement('span');
      number.className = 'reader-recovery-map-node-number';
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = strings.recoveryLabels[index];
      button.append(number, label);
      button.addEventListener('click', () => selectStep(index));
      item.append(button);
      recoveryMapNodes.append(item);

      const fallbackItem = document.createElement('li');
      const fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = strings.recoveryLabels[index];
      const fallbackBody = document.createElement('span');
      fallbackBody.textContent = strings.recoveryBodies[index];
      const fallbackLink = document.createElement('a');
      fallbackLink.href = recoveryMapStepHref(step);
      fallbackLink.textContent = strings.recoveryOpen;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackLink);
      recoveryMapFallbackList.append(fallbackItem);
    });
    selectStep(selectedIndex);
  };
  const currentReaderVisualCopy = () => readerVisualCopy[uiLanguage()] || readerVisualCopy.en;
  const chooseReaderVisual = (selection) => {
    if (!selection?.path) return null;
    const haystack = `${selection.contentId || ''} ${selection.path}`.toLowerCase();
    const match = readerVisualMap.find((candidate) => candidate.tokens.some((token) => haystack.includes(token)));
    if (match) return match;
    if (/^(?:book|skills)\//i.test(selection.path)) {
      return { path: 'assets/teaching/reliable-llm-work-loop-red-black.svg', step: 0, fallback: true };
    }
    return null;
  };
  const renderReaderConceptMap = (selection, title, headings = []) => {
    if (!conceptMap || !conceptMapBranches || !conceptMapFallbackList) return;
    if (conceptMapScrollHandler) window.removeEventListener('scroll', conceptMapScrollHandler);
    conceptMapScrollHandler = null;
    const mappedHeadings = headings.filter((heading) => heading.id && heading.textContent.trim()).slice(0, 8);
    if (!selection || mappedHeadings.length === 0) {
      conceptMap.hidden = true;
      conceptMapBranches.replaceChildren();
      conceptMapFallbackList.replaceChildren();
      return;
    }
    const strings = currentReaderVisualCopy();
    conceptMap.hidden = false;
    conceptMap.open = false;
    conceptMapSummary.textContent = strings.conceptSummary;
    conceptMapSummary.setAttribute('aria-label', strings.conceptAria);
    conceptMapIntro.textContent = strings.conceptIntro;
    conceptMapGraph.setAttribute('aria-label', strings.conceptAria);
    conceptMapRootLabel.textContent = strings.conceptRoot;
    conceptMapRoot.textContent = title || article.querySelector('h1')?.textContent?.trim() || selection.path;
    conceptMapFallback.textContent = strings.conceptFallback;
    conceptMapFallbackIntro.textContent = strings.conceptFallbackIntro;
    conceptMapBoundary.textContent = strings.conceptBoundary;
    conceptMapBranches.replaceChildren();
    conceptMapFallbackList.replaceChildren();
    const nodesByHeadingId = new Map();
    const setActiveNode = (headingId) => {
      nodesByHeadingId.forEach((node, id) => {
        const active = id === headingId;
        node.classList.toggle('is-active', active);
        if (active) node.setAttribute('aria-current', 'location');
        else node.removeAttribute('aria-current');
      });
    };
    mappedHeadings.forEach((heading, index) => {
      const label = heading.textContent.trim();
      const href = headingHref(heading.id);
      const node = document.createElement('a');
      node.className = 'reader-concept-map-node';
      node.href = href;
      node.dataset.readerConceptMapNode = heading.id;
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const nodeLabel = document.createElement('strong');
      nodeLabel.textContent = label;
      node.append(number, nodeLabel);
      node.addEventListener('click', () => {
        setActiveNode(heading.id);
        window.requestAnimationFrame(() => {
          const target = document.getElementById(heading.id);
          if (!target) return;
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: 'start' });
        });
      });
      conceptMapBranches.append(node);
      nodesByHeadingId.set(heading.id, node);

      const item = document.createElement('li');
      const fallbackLink = document.createElement('a');
      fallbackLink.href = href;
      fallbackLink.textContent = `${index + 1}. ${label}`;
      item.append(fallbackLink);
      conceptMapFallbackList.append(item);
    });
    setActiveNode(mappedHeadings[0].id);
    const updateActiveHeading = () => {
      const candidates = mappedHeadings.filter((heading) => heading.getBoundingClientRect().top <= 220);
      setActiveNode((candidates[candidates.length - 1] || mappedHeadings[0]).id);
    };
    conceptMapScrollHandler = updateActiveHeading;
    window.addEventListener('scroll', conceptMapScrollHandler, { passive: true });
    updateActiveHeading();
  };
  const renderReaderInlineVisual = (selection, title) => {
    const visual = chooseReaderVisual(selection);
    if (!visual || visual.fallback || !article) return;
    const existing = article.querySelector('[data-reader-inline-visual]');
    existing?.remove();
    const strings = currentReaderVisualCopy();
    const routeStrings = currentReaderRouteMapCopy();
    const step = Math.max(0, Math.min(routeStrings.labels.length - 1, visual.step || 0));
    const label = routeStrings.labels[step];
    const body = routeStrings.bodies[step];
    const figure = document.createElement('figure');
    figure.className = 'reader-inline-visual';
    figure.dataset.readerInlineVisual = visual.path;
    const link = document.createElement('a');
    link.className = 'reader-image-link reader-teaching-visual';
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.href = directHref(visual.path);
    link.setAttribute('aria-label', `${strings.visualOpen}: ${label}`);
    const thesis = document.createElement('span');
    thesis.className = 'reader-visual-thesis';
    thesis.textContent = `${label} · ${routeStrings.nextQuestions[step]}`;
    const image = document.createElement('img');
    image.src = directHref(visual.path);
    image.alt = `${strings.visualAltPrefix} ${label.toLowerCase()}: ${body}`;
    // This is the one teaching image placed in the reading flow. Load it as
    // part of the page so a reader does not reach an empty card while the
    // browser is still deciding whether a lazy image is near the viewport.
    image.loading = 'eager';
    image.decoding = 'async';
    link.append(thesis, image);
    const openLabel = document.createElement('span');
    openLabel.className = 'reader-image-link-label';
    openLabel.textContent = strings.visualOpen;
    link.append(openLabel);
    const caption = document.createElement('figcaption');
    caption.textContent = `${strings.visualCaptionPrefix} ${title || label}. ${body}`;
    const boundary = document.createElement('p');
    boundary.className = 'reader-inline-visual-boundary';
    boundary.textContent = strings.visualBoundary;
    figure.append(link, caption, boundary);
    const openingParagraph = article.querySelector(':scope > p');
    const insertionAnchor = mobilePageToc?.parentElement === article
      ? mobilePageToc
      : openingParagraph || article.querySelector('h1');
    if (insertionAnchor) insertionAnchor.after(figure);
    else article.prepend(figure);
  };
  const renderReaderInlineConceptMap = (selection, title, headings = []) => {
    if (!article) return;
    if (inlineConceptMapScrollHandler) window.removeEventListener('scroll', inlineConceptMapScrollHandler);
    inlineConceptMapScrollHandler = null;
    const existing = article.querySelector('[data-reader-inline-concept-map]');
    existing?.remove();
    const mappedHeadings = headings.filter((heading) => heading.id && heading.textContent.trim()).slice(0, 6);
    if (!selection || mappedHeadings.length < 2) return;
    const strings = currentReaderVisualCopy();
    const details = document.createElement('details');
    details.className = 'reader-inline-concept-map';
    details.dataset.readerInlineConceptMap = 'true';
    const summary = document.createElement('summary');
    summary.textContent = strings.conceptSummary;
    summary.setAttribute('aria-label', strings.conceptAria);
    const intro = document.createElement('p');
    intro.className = 'reader-inline-concept-map-intro';
    intro.textContent = strings.conceptIntro;
    const root = document.createElement('div');
    root.className = 'reader-inline-concept-map-root';
    root.dataset.readerInlineConceptMapRoot = 'true';
    const rootLabel = document.createElement('span');
    rootLabel.className = 'reader-inline-concept-map-root-label';
    rootLabel.textContent = strings.conceptRoot;
    const rootTitle = document.createElement('strong');
    rootTitle.textContent = title || article.querySelector('h1')?.textContent?.trim() || selection.path;
    root.append(rootLabel, rootTitle);
    const list = document.createElement('ol');
    list.className = 'reader-inline-concept-map-list';
    list.id = 'reader-inline-concept-map-list';
    details.setAttribute('aria-controls', list.id);
    summary.setAttribute('aria-controls', list.id);
    const nodesByHeadingId = new Map();
    mappedHeadings.forEach((heading, index) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = headingHref(heading.id);
      link.dataset.readerInlineConceptMapNode = heading.id;
      link.textContent = `${String(index + 1).padStart(2, '0')} · ${heading.textContent.trim()}`;
      link.addEventListener('click', () => {
        window.requestAnimationFrame(() => {
          const target = document.getElementById(heading.id);
          if (!target) return;
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
          target.scrollIntoView({ block: 'start' });
        });
      });
      item.append(link);
      list.append(item);
      nodesByHeadingId.set(heading.id, link);
    });
    const boundary = document.createElement('p');
    boundary.className = 'reader-inline-concept-map-boundary';
    boundary.textContent = strings.conceptBoundary;
    details.append(summary, intro, root, list, boundary);
    const openingParagraph = article.querySelector(':scope > p');
    const anchor = article.querySelector('[data-reader-inline-visual]') || openingParagraph || article.querySelector('h1');
    if (anchor) anchor.after(details);
    else article.prepend(details);
    const setActiveNode = (headingId) => {
      nodesByHeadingId.forEach((node, id) => {
        const active = id === headingId;
        node.classList.toggle('is-active', active);
        if (active) node.setAttribute('aria-current', 'location');
        else node.removeAttribute('aria-current');
      });
    };
    const updateActiveHeading = () => {
      const candidates = mappedHeadings.filter((heading) => heading.getBoundingClientRect().top <= 220);
      setActiveNode((candidates[candidates.length - 1] || mappedHeadings[0]).id);
    };
    inlineConceptMapScrollHandler = updateActiveHeading;
    window.addEventListener('scroll', inlineConceptMapScrollHandler, { passive: true });
    updateActiveHeading();
  };
  const renderReaderPageAnatomy = (selection, title, headings = []) => {
    if (!article) return;
    const existing = article.querySelector('[data-reader-page-anatomy]');
    existing?.remove();
    if (!selection || !/^book\//i.test(selection.path) || headings.length < 3) return;
    // Pages with a dedicated teaching board already have a visual in the
    // reading flow. The anatomy board fills the remaining gap instead of
    // stacking two large diagrams on the same page.
    const dedicatedVisual = chooseReaderVisual(selection);
    if (dedicatedVisual && !dedicatedVisual.fallback) return;
    const strings = currentReaderVisualCopy();
    if (!strings.conceptAnatomyOpen) return;
    const details = document.createElement('details');
    details.className = 'reader-page-anatomy';
    details.dataset.readerPageAnatomy = 'true';
    const summary = document.createElement('summary');
    summary.textContent = strings.conceptAnatomyOpen;
    summary.setAttribute('aria-label', strings.conceptAnatomyOpen);
    const figure = document.createElement('figure');
    figure.className = 'reader-page-anatomy-figure';
    const link = document.createElement('a');
    link.className = 'reader-image-link reader-teaching-visual';
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.href = directHref('assets/teaching/reader-page-anatomy-red-black.svg');
    link.setAttribute('aria-label', strings.conceptAnatomyOpen);
    const image = document.createElement('img');
    image.src = link.href;
    image.width = 900;
    image.height = 1500;
    image.loading = 'lazy';
    image.alt = strings.conceptAnatomyCaption;
    const label = document.createElement('span');
    label.className = 'reader-image-link-label';
    label.textContent = strings.conceptAnatomyOpen;
    link.append(image, label);
    const caption = document.createElement('figcaption');
    caption.textContent = `${strings.conceptAnatomyCaption} ${title || ''}`.trim();
    const boundary = document.createElement('p');
    boundary.className = 'reader-page-anatomy-boundary';
    boundary.textContent = strings.conceptAnatomyBoundary;
    figure.append(link, caption, boundary);
    details.append(summary, figure);
    const concept = article.querySelector('[data-reader-inline-concept-map]');
    const anchor = concept || article.querySelector('[data-reader-inline-visual]') || article.querySelector(':scope > p') || article.querySelector('h1');
    if (anchor) anchor.after(details);
    else article.prepend(details);
  };
  const renderReaderVisualCompanion = (selection) => {
    if (!visualCompanion) return;
    const visual = chooseReaderVisual(selection);
    if (!visual) {
      visualCompanion.hidden = true;
      return;
    }
    const strings = currentReaderVisualCopy();
    const routeStrings = currentReaderRouteMapCopy();
    const step = Math.max(0, Math.min(routeStrings.labels.length - 1, visual.step || 0));
    const label = routeStrings.labels[step];
    const body = routeStrings.bodies[step];
    const imageHref = directHref(visual.path);
    visualCompanion.hidden = false;
    visualCompanion.open = false;
    visualCompanionSummary.textContent = strings.visualSummary;
    visualCompanionSummary.setAttribute('aria-label', `${strings.visualSummary}: ${label}`);
    visualCompanionIntro.textContent = strings.visualIntro;
    visualCompanionLink.href = imageHref;
    visualCompanionThesis.textContent = `${label} · ${routeStrings.nextQuestions[step]}`;
    visualCompanionImage.src = imageHref;
    visualCompanionImage.alt = `${strings.visualAltPrefix} ${label.toLowerCase()}: ${body}`;
    visualCompanionOpen.textContent = strings.visualOpen;
    visualCompanionCaption.textContent = `${strings.visualCaptionPrefix} ${label}. ${body}`;
    visualCompanionBoundary.textContent = strings.visualBoundary;
  };
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
      en: { en: 'English', zh: 'Simplified Chinese', es: 'Spanish', ja: 'Japanese', ko: 'Korean', de: 'German', 'zh-tw': 'Traditional Chinese', fr: 'French' },
      zh: { en: '英语', zh: '简体中文', es: '西班牙语', ja: '日语', ko: '韩语', de: '德语', 'zh-tw': '繁体中文', fr: '法语' },
      es: { en: 'Inglés', zh: 'Chino simplificado', es: 'Español', ja: 'Japonés', ko: 'Coreano', de: 'Alemán', 'zh-tw': 'Chino tradicional', fr: 'Francés' },
      ja: { en: '英語', zh: '簡体字中国語', es: 'スペイン語', ja: '日本語', ko: '韓国語', de: 'ドイツ語', 'zh-tw': '繁体字中国語', fr: 'フランス語' },
      ko: { en: '영어', zh: '중국어 간체', es: '스페인어', ja: '일본어', ko: '한국어', de: '독일어', 'zh-tw': '중국어 번체', fr: '프랑스어' },
      de: { en: 'Englisch', zh: 'Vereinfachtes Chinesisch', es: 'Spanisch', ja: 'Japanisch', ko: 'Koreanisch', de: 'Deutsch', 'zh-tw': 'Traditionelles Chinesisch', fr: 'Französisch' },
      'zh-tw': { en: 'English', zh: '簡體中文', es: '西班牙文', ja: '日文', ko: '韓文', de: '德文', 'zh-tw': '繁體中文', fr: '法文' },
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
    return headings;
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
    renderReaderRouteMap(null);
    if (coreCard) coreCard.hidden = true;
    coreCurrentUnitId = null;
    if (orientation) orientation.hidden = true;
    if (mobilePageToc) mobilePageToc.hidden = true;
    if (pagination) pagination.hidden = true;
    renderReaderConceptMap(null, '');
    renderReaderVisualCompanion(null);
    renderReaderRecoveryMap(null);
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
    const pageHeadings = buildTableOfContents();
    updateChapterRail(selection, title);
    updateOverviewLinks(selection);
    const routeMapEligible = selection.path.startsWith('book/chapters/')
      || selection.path.startsWith('book/labs/')
      || selection.contentId === 'llm-foundation-core-v1'
      || readerRouteMapSteps.some((step) => step.contentId === selection.contentId);
    renderReaderRouteMap(routeMapEligible ? selection : null);
    renderReaderConceptMap(selection, title, pageHeadings);
    renderReaderInlineConceptMap(selection, title, pageHeadings);
    renderReaderPageAnatomy(selection, title, pageHeadings);
    renderReaderInlineVisual(selection, title);
    renderReaderVisualCompanion(selection);
    renderReaderRecoveryMap(selection);
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
