(() => {
  'use strict';

  const LOCALES = {
    en: { suffix: 'EN' },
    zh: { suffix: 'ZH' },
    es: { suffix: 'ES' },
    ja: { suffix: 'JA' },
    ko: { suffix: 'KO' },
    de: { suffix: 'DE' },
    'zh-tw': { suffix: 'ZHTW' },
    fr: { suffix: 'FR' },
  };

  const COPY = {
    en: {
      title: 'Visual guide', skip: 'Skip to content', home: 'Home', reader: 'Read the guide', allBoards: 'All teaching boards', language: 'Language',
      heroEyebrow: 'A picture should answer the next question.', heroTitle: 'See the method before you read the detail.', heroBody: "This guide turns the Playbook's core loop into a route you can inspect: understand, frame, act, inspect, repair, and transfer.", heroBoundary: 'The boards are orientation aids. The localized text and the source page remain the baseline explanation; a picture does not prove that a model acted or that a learner mastered a method.',
      mapEyebrow: 'Dynamic route map', mapTitle: 'Choose a stage, then ask one question.', mapIntro: 'Select a node to see the action, the evidence boundary, and the next safe question. The ordered list below keeps the route available without interaction.', mapAria: 'Six stages in the reliable LLM work loop', mapCenter: 'Reliable LLM work', mapCenterSub: 'make the claim checkable', selected: 'Selected stage', nextQuestion: 'Next question', openStage: 'Open this part of the route', fallbackSummary: 'Read the six stages as text', fallbackIntro: 'Use this ordered route without the interactive map. Each stage names an action and the evidence boundary that follows it.',
      galleryEyebrow: 'Teaching boards', galleryTitle: 'Pictures that explain one decision at a time.', galleryIntro: 'Each board has a short explanation, localized alternative text, and a route into the matching lesson. Open the image for a printable view; use the text beside it for the exact boundary.', galleryBoundary: 'This is a focused selection from the project-authored teaching boards. It is not a quality score, benchmark, or proof of learning.',
      howEyebrow: 'Read the picture correctly', howTitle: 'Use a board without overtrusting it.', howIntro: 'The board gives you a shape to remember. Your own small attempt and record decide what you may claim.', howStepOneTitle: 'Start with the thesis', howStepOneBody: 'Name the relationship or decision the picture is meant to clarify.', howStepTwoTitle: 'Open the text fallback', howStepTwoBody: 'Read the labels and next question in ordinary text; do not rely on color or layout alone.', howStepThreeTitle: 'Try one bounded move', howStepThreeBody: 'Use the linked lesson to make one small, reversible attempt with a clear stop condition.', howStepFourTitle: 'Keep the boundary visible', howStepFourBody: 'Save the output or diff, compare it with evidence, and state what the picture still cannot establish.', openFirstLesson: 'Open the first lesson', openFullVisual: 'Open full-size visual', howFigureAlt: 'How to read one Prysai LLM Playbook page', howFigureCaption: 'Project-authored page anatomy: orient, name the concept, act, inspect, keep the boundary visible, and transfer the method.', footerBoundary: 'Source remains Markdown; this page is a visual reading aid.', invalidLocale: 'That language route is not registered; the visual guide is shown in English.', openLesson: 'Open the matching lesson', stage: 'Stage', visual: 'Visual',
    },
    zh: {
      title: '视觉导览', skip: '跳到正文', home: '首页', reader: '阅读课程', allBoards: '查看全部教学图', language: '语言',
      heroEyebrow: '图片应该回答下一个问题。', heroTitle: '先看懂方法，再读具体内容。', heroBody: '这份导览把 Playbook 的核心闭环变成一条可以检查的路线：理解、框定、行动、检查、修正和迁移。', heroBoundary: '图板只是定位辅助。真正的基线仍是本地化文字和来源页面；一张图不能证明模型已经行动，也不能证明学习者已经掌握方法。',
      mapEyebrow: '动态路线图', mapTitle: '选择一个阶段，再问一个问题。', mapIntro: '选择节点即可看到行动、证据边界和下一道安全问题。下面的有序列表在无法交互时仍然保留同一条路线。', mapAria: '可靠 LLM 工作闭环的六个阶段', mapCenter: '可靠的 LLM 工作', mapCenterSub: '让结论可以检查', selected: '当前阶段', nextQuestion: '下一个问题', openStage: '打开这部分路线', fallbackSummary: '按文字阅读六个阶段', fallbackIntro: '不使用交互地图也可以按顺序阅读。每个阶段都说明一项行动，以及紧随其后的证据边界。',
      galleryEyebrow: '教学图板', galleryTitle: '一次解释一个决定。', galleryIntro: '每张图都配有简短说明、本地化替代文字，以及通往对应课程的路线。需要打印时打开图片；需要精确边界时阅读旁边的文字。', galleryBoundary: '这里展示的是项目原创教学图板中的重点选集，不是质量评分、基准测试或学习证明。',
      howEyebrow: '正确阅读图示', howTitle: '使用图板，但不要过度相信它。', howIntro: '图板帮你记住结构；你自己的小尝试和记录，才决定你能提出什么结论。', howStepOneTitle: '先看清主旨', howStepOneBody: '说清楚这张图要帮助你理解哪项关系或决定。', howStepTwoTitle: '打开文字回退', howStepTwoBody: '用普通文字阅读标签和下一个问题，不要只依赖颜色或布局。', howStepThreeTitle: '尝试一次有边界的行动', howStepThreeBody: '沿着链接进入课程，做一次范围小、可回退并且有停止条件的尝试。', howStepFourTitle: '保留边界', howStepFourBody: '保存输出或差异，用证据对照，并说明这张图仍然无法证明什么。', openFirstLesson: '打开第一课', openFullVisual: '打开完整尺寸图示', howFigureAlt: '如何阅读一页 Prysai LLM Playbook 内容', howFigureCaption: '项目原创页面结构图：定位问题、命名概念、采取行动、检查证据、保留边界，再迁移方法。', footerBoundary: '来源仍是 Markdown；本页是视觉阅读辅助。', invalidLocale: '该语言路线未注册；视觉导览暂以英文显示。', openLesson: '打开对应课程', stage: '阶段', visual: '图示',
    },
    es: {
      title: 'Guía visual', skip: 'Saltar al contenido', home: 'Inicio', reader: 'Leer la guía', allBoards: 'Ver todos los tableros', language: 'Idioma',
      heroEyebrow: 'Una imagen debería responder a la siguiente pregunta.', heroTitle: 'Mira el método antes de leer el detalle.', heroBody: 'Esta guía convierte el ciclo central del Playbook en un recorrido que puedes revisar: entender, delimitar, actuar, inspeccionar, reparar y transferir.', heroBoundary: 'Los tableros sirven para orientarse. El texto localizado y la página fuente siguen siendo la explicación de referencia; una imagen no demuestra que el modelo actuara ni que alguien dominara el método.',
      mapEyebrow: 'Mapa dinámico del recorrido', mapTitle: 'Elige una etapa y formula una pregunta.', mapIntro: 'Selecciona un nodo para ver la acción, el límite de evidencia y la siguiente pregunta segura. La lista ordenada conserva el recorrido sin interacción.', mapAria: 'Seis etapas del ciclo de trabajo fiable con LLM', mapCenter: 'Trabajo fiable con LLM', mapCenterSub: 'haz comprobable la afirmación', selected: 'Etapa seleccionada', nextQuestion: 'Siguiente pregunta', openStage: 'Abrir esta parte del recorrido', fallbackSummary: 'Leer las seis etapas como texto', fallbackIntro: 'Usa este recorrido ordenado sin el mapa interactivo. Cada etapa nombra una acción y el límite de evidencia que la sigue.',
      galleryEyebrow: 'Tableros didácticos', galleryTitle: 'Imágenes que explican una decisión cada vez.', galleryIntro: 'Cada tablero incluye una explicación breve, texto alternativo localizado y un enlace a la lección correspondiente. Abre la imagen para imprimirla; usa el texto para comprobar el límite exacto.', galleryBoundary: 'Es una selección centrada de los tableros originales del proyecto. No es una puntuación de calidad, un benchmark ni una prueba de aprendizaje.',
      howEyebrow: 'Lee bien la imagen', howTitle: 'Usa un tablero sin confiarte demasiado.', howIntro: 'El tablero te da una estructura que recordar. Tu propio intento pequeño y su registro deciden qué puedes afirmar.', howStepOneTitle: 'Empieza por la tesis', howStepOneBody: 'Nombra la relación o decisión que la imagen debe aclarar.', howStepTwoTitle: 'Abre la alternativa textual', howStepTwoBody: 'Lee las etiquetas y la siguiente pregunta en texto normal; no dependas solo del color o la disposición.', howStepThreeTitle: 'Prueba una acción acotada', howStepThreeBody: 'Sigue la lección enlazada para hacer un intento pequeño, reversible y con un punto de parada claro.', howStepFourTitle: 'Mantén visible el límite', howStepFourBody: 'Guarda la salida o el diff, compárala con la evidencia y di qué sigue sin demostrar la imagen.', openFirstLesson: 'Abrir la primera lección', openFullVisual: 'Abrir el visual completo', howFigureAlt: 'Cómo leer una página de Prysai LLM Playbook', howFigureCaption: 'Anatomía de página original del proyecto: orientarse, nombrar el concepto, actuar, inspeccionar, mantener visible el límite y transferir el método.', footerBoundary: 'La fuente sigue siendo Markdown; esta página ayuda a leer visualmente.', invalidLocale: 'Esa ruta de idioma no está registrada; la guía visual se muestra en inglés.', openLesson: 'Abrir la lección correspondiente', stage: 'Etapa', visual: 'Visual',
    },
    ja: {
      title: 'ビジュアルガイド', skip: '本文へ移動', home: 'ホーム', reader: 'ガイドを読む', allBoards: '教材ボードをすべて見る', language: '言語',
      heroEyebrow: '図は、次に考える問いを示すものです。', heroTitle: '細部を読む前に、方法の全体像を見る。', heroBody: 'このガイドでは、Playbook の中心となる流れを、確認できる道筋として示します。理解、枠決め、実行、確認、修正、転用の順です。', heroBoundary: 'ボードは位置づけの補助です。基準になるのはローカライズされた本文と原典ページです。図だけでモデルの実行や学習者の習得を証明することはできません。',
      mapEyebrow: '動的なルートマップ', mapTitle: '段階を選び、問いを1つ立てる。', mapIntro: 'ノードを選ぶと、行動、証拠の境界、次に確認する安全な問いが表示されます。下の順序付きリストは、操作できない場合にも同じ道筋を残します。', mapAria: '信頼できる LLM 作業ループの6段階', mapCenter: '信頼できる LLM 作業', mapCenterSub: '主張を確認可能にする', selected: '選択中の段階', nextQuestion: '次の問い', openStage: 'このルートを開く', fallbackSummary: '6段階をテキストで読む', fallbackIntro: 'インタラクティブなマップを使わずに、順序どおりに読めます。各段階には行動と、その後に確認すべき証拠の境界があります。',
      galleryEyebrow: '教材ボード', galleryTitle: '一度に1つの判断を説明する図。', galleryIntro: '各ボードには短い説明、ローカライズされた代替テキスト、対応するレッスンへのリンクがあります。印刷するなら画像を、境界を正確に確認するなら横の文章を開いてください。', galleryBoundary: 'プロジェクトが作成した教材ボードから、目的を絞って選んでいます。品質スコア、ベンチマーク、学習の証明ではありません。',
      howEyebrow: '図を正しく読む', howTitle: 'ボードを使いながら、過信しない。', howIntro: 'ボードは覚えるための形を示します。何を主張できるかは、自分の小さな試行と記録で決まります。', howStepOneTitle: '主旨から始める', howStepOneBody: 'この図が明らかにしようとしている関係や判断を言葉にします。', howStepTwoTitle: 'テキストの代替を開く', howStepTwoBody: 'ラベルと次の問いを通常の文章で読み、色や配置だけに頼りません。', howStepThreeTitle: '範囲を区切った操作を試す', howStepThreeBody: 'リンク先のレッスンで、停止条件が明確な小さく可逆な試行を1つ行います。', howStepFourTitle: '境界を残す', howStepFourBody: '出力や差分を保存し、証拠と照合し、この図だけでは分からないことを明示します。', openFirstLesson: '最初のレッスンを開く', openFullVisual: '図を原寸で開く', howFigureAlt: 'Prysai LLM Playbook の1ページを読む方法', howFigureCaption: 'プロジェクト作成のページ構造図：問いを確認し、概念を言葉にし、行動し、証拠を確認し、境界を残して方法を転用します。', footerBoundary: '出典は Markdown のままです。このページは視覚的な読解補助です。', invalidLocale: 'その言語ルートは登録されていません。ビジュアルガイドを英語で表示します。', openLesson: '対応するレッスンを開く', stage: '段階', visual: '図',
    },
    ko: {
      title: '시각 안내서', skip: '본문으로 건너뛰기', home: '홈', reader: '가이드 읽기', allBoards: '교육 보드 모두 보기', language: '언어',
      heroEyebrow: '그림은 다음 질문에 답할 수 있어야 합니다.', heroTitle: '세부 내용을 읽기 전에 방법을 먼저 보세요.', heroBody: '이 안내서는 Playbook의 핵심 흐름을 확인 가능한 경로로 바꿔 보여 줍니다. 이해하고, 범위를 정하고, 실행하고, 점검하고, 고치고, 전이하는 순서입니다.', heroBoundary: '보드는 방향을 잡는 보조 자료입니다. 기준은 현지화된 본문과 원문 페이지입니다. 그림만으로 모델의 실행이나 학습자의 숙달을 증명할 수 없습니다.',
      mapEyebrow: '대화형 경로 지도', mapTitle: '단계를 고르고 질문 하나를 세우세요.', mapIntro: '노드를 선택하면 행동, 증거의 경계와 다음에 확인할 안전한 질문이 나타납니다. 아래 순서 목록은 상호작용 없이도 같은 경로를 제공합니다.', mapAria: '신뢰할 수 있는 LLM 작업 루프의 여섯 단계', mapCenter: '신뢰할 수 있는 LLM 작업', mapCenterSub: '주장을 확인 가능하게 만들기', selected: '선택한 단계', nextQuestion: '다음 질문', openStage: '이 경로의 해당 부분 열기', fallbackSummary: '여섯 단계를 텍스트로 읽기', fallbackIntro: '대화형 지도 없이도 순서대로 읽을 수 있습니다. 각 단계는 행동과 이어지는 증거의 경계를 설명합니다.',
      galleryEyebrow: '교육 보드', galleryTitle: '한 번에 하나의 판단을 설명하는 그림.', galleryIntro: '각 보드에는 짧은 설명, 현지화된 대체 텍스트와 해당 수업으로 가는 링크가 있습니다. 인쇄하려면 그림을 열고, 정확한 경계는 옆의 글로 확인하세요.', galleryBoundary: '프로젝트가 만든 교육 보드 중 목적을 좁혀 고른 자료입니다. 품질 점수나 벤치마크, 학습 증거가 아닙니다.',
      howEyebrow: '그림을 정확히 읽기', howTitle: '보드를 활용하되 과신하지 마세요.', howIntro: '보드는 기억할 구조를 보여 줍니다. 무엇을 주장할 수 있는지는 자신의 작은 시도와 기록으로 결정합니다.', howStepOneTitle: '핵심 주장부터 보기', howStepOneBody: '그림이 설명하려는 관계나 판단을 먼저 말로 적습니다.', howStepTwoTitle: '텍스트 대체 설명 열기', howStepTwoBody: '색이나 배치에만 의존하지 말고 레이블과 다음 질문을 일반 텍스트로 읽습니다.', howStepThreeTitle: '범위 있는 행동 하나 시도하기', howStepThreeBody: '연결된 수업에서 중지 조건이 분명한 작고 되돌릴 수 있는 시도를 하나 합니다.', howStepFourTitle: '경계 남겨 두기', howStepFourBody: '출력이나 diff를 저장하고 증거와 대조한 뒤, 그림만으로 알 수 없는 것을 밝힙니다.', openFirstLesson: '첫 수업 열기', openFullVisual: '전체 크기 그림 열기', howFigureAlt: 'Prysai LLM Playbook 한 페이지를 읽는 방법', howFigureCaption: '프로젝트가 만든 페이지 구조도: 방향을 잡고 개념을 이름 붙인 뒤 행동하고 증거를 점검하며 경계를 남기고 방법을 전이합니다.', footerBoundary: '출처는 Markdown으로 유지됩니다. 이 페이지는 시각적 읽기 보조 자료입니다.', invalidLocale: '등록되지 않은 언어 경로입니다. 시각 안내서를 영어로 표시합니다.', openLesson: '해당 수업 열기', stage: '단계', visual: '그림',
    },
    de: {
      title: 'Visueller Leitfaden', skip: 'Zum Inhalt springen', home: 'Startseite', reader: 'Leitfaden lesen', allBoards: 'Alle Lehrtafeln ansehen', language: 'Sprache',
      heroEyebrow: 'Ein Bild sollte die nächste Frage klären.', heroTitle: 'Erst die Methode sehen, dann ins Detail gehen.', heroBody: 'Dieser Leitfaden macht aus dem Kernablauf des Playbooks einen prüfbaren Weg: verstehen, abgrenzen, handeln, prüfen, reparieren und übertragen.', heroBoundary: 'Die Tafeln dienen der Orientierung. Maßgeblich bleiben der lokalisierte Text und die Quellseite; ein Bild belegt weder eine Modellaktion noch die Beherrschung der Methode.',
      mapEyebrow: 'Dynamische Routenkarte', mapTitle: 'Wähle eine Stufe und stelle eine Frage.', mapIntro: 'Wähle einen Knoten, um Handlung, Beleggrenze und die nächste sichere Frage zu sehen. Die geordnete Liste hält denselben Weg ohne Interaktion bereit.', mapAria: 'Sechs Stufen des zuverlässigen LLM-Arbeitszyklus', mapCenter: 'Zuverlässige LLM-Arbeit', mapCenterSub: 'die Aussage prüfbar machen', selected: 'Ausgewählte Stufe', nextQuestion: 'Nächste Frage', openStage: 'Diesen Teil des Wegs öffnen', fallbackSummary: 'Die sechs Stufen als Text lesen', fallbackIntro: 'Nutze diesen geordneten Weg ohne die interaktive Karte. Jede Stufe benennt eine Handlung und die anschließende Beleggrenze.',
      galleryEyebrow: 'Lehrtafeln', galleryTitle: 'Bilder, die jeweils eine Entscheidung erklären.', galleryIntro: 'Jede Tafel hat eine kurze Erklärung, lokalisierten Alternativtext und einen Weg zur passenden Lektion. Für die Druckansicht öffnest du das Bild; für die genaue Grenze liest du den Text daneben.', galleryBoundary: 'Dies ist eine gezielte Auswahl der projektbezogenen Lehrtafeln. Sie ist weder Qualitätswertung noch Benchmark oder Lernnachweis.',
      howEyebrow: 'Bilder richtig lesen', howTitle: 'Eine Tafel nutzen, ohne ihr zu viel zu glauben.', howIntro: 'Die Tafel gibt dir eine merkbare Struktur. Was du behaupten darfst, entscheiden dein eigener kleiner Versuch und sein Beleg.', howStepOneTitle: 'Mit der These beginnen', howStepOneBody: 'Benenne die Beziehung oder Entscheidung, die das Bild klären soll.', howStepTwoTitle: 'Textalternative öffnen', howStepTwoBody: 'Lies Beschriftungen und nächste Frage als normalen Text; verlasse dich nicht nur auf Farbe oder Anordnung.', howStepThreeTitle: 'Eine begrenzte Handlung testen', howStepThreeBody: 'Führe über die verknüpfte Lektion einen kleinen, umkehrbaren Versuch mit klarem Stopp aus.', howStepFourTitle: 'Die Grenze sichtbar halten', howStepFourBody: 'Speichere Ausgabe oder Diff, vergleiche mit Belegen und nenne, was das Bild weiterhin nicht belegt.', openFirstLesson: 'Erste Lektion öffnen', openFullVisual: 'Visualisierung in voller Größe öffnen', howFigureAlt: 'So liest du eine Seite des Prysai LLM Playbook', howFigureCaption: 'Projektbezogene Seitenstruktur: orientieren, Konzept benennen, handeln, Belege prüfen, die Grenze sichtbar halten und die Methode übertragen.', footerBoundary: 'Die Quelle bleibt Markdown; diese Seite ist eine visuelle Lesehilfe.', invalidLocale: 'Diese Sprachroute ist nicht registriert; der visuelle Leitfaden wird auf Englisch angezeigt.', openLesson: 'Passende Lektion öffnen', stage: 'Stufe', visual: 'Visualisierung',
    },
    'zh-tw': {
      title: '視覺導覽', skip: '跳到正文', home: '首頁', reader: '閱讀課程', allBoards: '查看全部教學圖', language: '語言',
      heroEyebrow: '圖片應該回答下一個問題。', heroTitle: '先看懂方法，再閱讀細節。', heroBody: '這份導覽把 Playbook 的核心閉環變成一條可以檢查的路線：理解、框定、行動、檢查、修正與遷移。', heroBoundary: '圖板只是定位輔助。真正的基線仍是本地化文字與來源頁面；一張圖不能證明模型已經行動，也不能證明學習者已經掌握方法。',
      mapEyebrow: '動態路線圖', mapTitle: '選擇一個階段，再問一個問題。', mapIntro: '選取節點即可看到行動、證據界線與下一個安全問題。下方的有序清單在無法互動時仍保留相同路線。', mapAria: '可靠 LLM 工作閉環的六個階段', mapCenter: '可靠的 LLM 工作', mapCenterSub: '讓主張可以檢查', selected: '目前階段', nextQuestion: '下一個問題', openStage: '開啟這段路線', fallbackSummary: '用文字閱讀六個階段', fallbackIntro: '不使用互動地圖也能依序閱讀。每個階段都說明一項行動，以及接續的證據界線。',
      galleryEyebrow: '教學圖板', galleryTitle: '一次解釋一個判斷。', galleryIntro: '每張圖都附有簡短說明、本地化替代文字，以及通往對應課程的路線。需要列印時開啟圖片；需要精確界線時閱讀旁邊的文字。', galleryBoundary: '這裡展示專案原創教學圖板中的重點選集，不是品質評分、基準測試或學習證明。',
      howEyebrow: '正確閱讀圖示', howTitle: '使用圖板，但不要過度相信它。', howIntro: '圖板幫你記住結構；你自己的小型嘗試與紀錄，才決定你能提出什麼主張。', howStepOneTitle: '先看清主旨', howStepOneBody: '說清楚這張圖要協助你理解哪一項關係或判斷。', howStepTwoTitle: '開啟文字替代說明', howStepTwoBody: '用一般文字閱讀標籤與下一個問題，不要只依賴顏色或版面。', howStepThreeTitle: '嘗試一次有界線的行動', howStepThreeBody: '沿著連結進入課程，做一次範圍小、可復原且有停止條件的嘗試。', howStepFourTitle: '保留界線', howStepFourBody: '保存輸出或差異，用證據對照，並說明這張圖仍然無法證明什麼。', openFirstLesson: '開啟第一課', openFullVisual: '開啟完整尺寸圖示', howFigureAlt: '如何閱讀一頁 Prysai LLM Playbook 內容', howFigureCaption: '專案原創頁面結構圖：定位問題、命名概念、採取行動、檢查證據、保留界線，再遷移方法。', footerBoundary: '來源仍是 Markdown；本頁是視覺閱讀輔助。', invalidLocale: '這個語言路線尚未註冊；視覺導覽暫以英文顯示。', openLesson: '開啟對應課程', stage: '階段', visual: '圖示',
    },
    fr: {
      title: 'Guide visuel', skip: 'Aller au contenu', home: 'Accueil', reader: 'Lire le guide', allBoards: 'Voir tous les tableaux', language: 'Langue',
      heroEyebrow: 'Une image devrait éclairer la question suivante.', heroTitle: 'Voyez la méthode avant d’entrer dans le détail.', heroBody: 'Ce guide transforme la boucle centrale du Playbook en parcours vérifiable : comprendre, cadrer, agir, inspecter, corriger et transférer.', heroBoundary: 'Les tableaux servent à se repérer. Le texte localisé et la page source restent l’explication de référence ; une image ne prouve ni l’action du modèle ni la maîtrise d’une méthode.',
      mapEyebrow: 'Carte dynamique du parcours', mapTitle: 'Choisissez une étape, puis posez une question.', mapIntro: 'Sélectionnez un nœud pour voir l’action, la limite de preuve et la prochaine question sûre. La liste ordonnée conserve le parcours sans interaction.', mapAria: 'Six étapes de la boucle de travail LLM fiable', mapCenter: 'Travail LLM fiable', mapCenterSub: 'rendre l’affirmation vérifiable', selected: 'Étape sélectionnée', nextQuestion: 'Question suivante', openStage: 'Ouvrir cette partie du parcours', fallbackSummary: 'Lire les six étapes en texte', fallbackIntro: 'Utilisez ce parcours ordonné sans la carte interactive. Chaque étape nomme une action et la limite de preuve qui la suit.',
      galleryEyebrow: 'Tableaux pédagogiques', galleryTitle: 'Des images pour éclairer une décision à la fois.', galleryIntro: 'Chaque tableau propose une explication courte, un texte alternatif localisé et un lien vers la leçon correspondante. Ouvrez l’image pour l’imprimer ; lisez le texte voisin pour vérifier la limite exacte.', galleryBoundary: 'Cette sélection ciblée provient des tableaux originaux du projet. Elle ne constitue ni une note de qualité, ni un benchmark, ni une preuve d’apprentissage.',
      howEyebrow: 'Lire l’image correctement', howTitle: 'Utilisez un tableau sans lui faire trop confiance.', howIntro: 'Le tableau donne une forme à retenir. Ce que vous pouvez affirmer dépend de votre propre essai limité et du relevé conservé.', howStepOneTitle: 'Commencer par la thèse', howStepOneBody: 'Formulez la relation ou la décision que l’image doit clarifier.', howStepTwoTitle: 'Ouvrir l’alternative textuelle', howStepTwoBody: 'Lisez les libellés et la prochaine question en texte ordinaire ; ne vous fiez pas uniquement aux couleurs ou à la mise en page.', howStepThreeTitle: 'Essayer une action délimitée', howStepThreeBody: 'Suivez la leçon liée pour réaliser un petit essai réversible, avec un point d’arrêt explicite.', howStepFourTitle: 'Garder la limite visible', howStepFourBody: 'Conservez la sortie ou le diff, comparez-les aux preuves et dites ce que l’image ne permet toujours pas d’établir.', openFirstLesson: 'Ouvrir la première leçon', openFullVisual: 'Ouvrir le visuel en taille réelle', howFigureAlt: 'Comment lire une page du Prysai LLM Playbook', howFigureCaption: 'Anatomie de page créée par le projet : se repérer, nommer le concept, agir, inspecter, garder la limite visible et transférer la méthode.', footerBoundary: 'La source reste en Markdown ; cette page sert d’aide visuelle à la lecture.', invalidLocale: 'Cette langue n’est pas enregistrée ; le guide visuel s’affiche en anglais.', openLesson: 'Ouvrir la leçon correspondante', stage: 'Étape', visual: 'Visuel',
    },
  };

  const ACCESSIBILITY_COPY = {
    en: { brandAria: 'Prysai LLM Playbook home', navAria: 'Visual guide navigation', languageAria: 'Choose visual guide language', metaDescription: 'A visual guide to the Prysai LLM Playbook learning loop, with accessible text fallbacks and project-authored teaching boards.' },
    zh: { brandAria: 'Prysai LLM Playbook 首页', navAria: '视觉导览导航', languageAria: '选择视觉导览语言', metaDescription: 'Prysai LLM Playbook 学习闭环的视觉导览，提供可访问的文字回退和项目原创教学图板。' },
    es: { brandAria: 'Inicio de Prysai LLM Playbook', navAria: 'Navegación de la guía visual', languageAria: 'Elegir el idioma de la guía visual', metaDescription: 'Guía visual del ciclo de aprendizaje de Prysai LLM Playbook, con alternativas textuales accesibles y tableros didácticos originales del proyecto.' },
    ja: { brandAria: 'Prysai LLM Playbook のホーム', navAria: 'ビジュアルガイドのナビゲーション', languageAria: 'ビジュアルガイドの言語を選択', metaDescription: 'Prysai LLM Playbook の学習ループを視覚的に案内します。アクセシブルなテキスト代替とプロジェクト作成の教材ボードを備えています。' },
    ko: { brandAria: 'Prysai LLM Playbook 홈', navAria: '시각 안내서 탐색', languageAria: '시각 안내서 언어 선택', metaDescription: '접근 가능한 텍스트 대체 설명과 프로젝트가 만든 교육 보드를 함께 제공하는 Prysai LLM Playbook 학습 루프 시각 안내서입니다.' },
    de: { brandAria: 'Startseite des Prysai LLM Playbook', navAria: 'Navigation des visuellen Leitfadens', languageAria: 'Sprache des visuellen Leitfadens wählen', metaDescription: 'Visueller Leitfaden zum Lernablauf des Prysai LLM Playbook mit zugänglichen Textalternativen und projektbezogenen Lehrtafeln.' },
    'zh-tw': { brandAria: 'Prysai LLM Playbook 首頁', navAria: '視覺導覽導覽列', languageAria: '選擇視覺導覽語言', metaDescription: 'Prysai LLM Playbook 學習閉環的視覺導覽，提供可存取的文字替代說明與專案原創教學圖板。' },
    fr: { brandAria: 'Accueil du Prysai LLM Playbook', navAria: 'Navigation du guide visuel', languageAria: 'Choisir la langue du guide visuel', metaDescription: 'Guide visuel de la boucle d’apprentissage du Prysai LLM Playbook, avec des alternatives textuelles accessibles et des tableaux pédagogiques créés par le projet.' },
  };
  Object.entries(ACCESSIBILITY_COPY).forEach(([language, strings]) => Object.assign(COPY[language], strings));

  const STAGES = [
    {
      id: 'understand', path: 'book/guides/llm-fundamentals',
      labels: { en: 'Understand', zh: '理解', es: 'Entender', ja: '理解する', ko: '이해하기', de: 'Verstehen', 'zh-tw': '理解', fr: 'Comprendre' },
      bodies: {
        en: 'Separate a model proposal from what the available evidence can establish.', zh: '把模型提出的文字与现有证据能够证明的内容分开。', es: 'Separa lo que propone el modelo de lo que la evidencia disponible puede establecer.', ja: 'モデルが提案した文章と、手元の証拠から確認できることを分けます。', ko: '모델이 제안한 내용과 현재 증거로 확인할 수 있는 내용을 분리합니다.', de: 'Trenne den Vorschlag des Modells von dem, was die vorhandenen Belege belegen können.', 'zh-tw': '把模型提出的文字，與現有證據能夠證明的內容分開。', fr: 'Séparez la proposition du modèle de ce que les preuves disponibles permettent d’établir.'
      },
      next: { en: 'What result can I check?', zh: '我能检查哪项结果？', es: '¿Qué resultado puedo comprobar?', ja: '何を確認できるか？', ko: '어떤 결과를 점검할 수 있는가?', de: 'Welches Ergebnis kann ich prüfen?', 'zh-tw': '我能檢查哪個結果？', fr: 'Quel résultat puis-je vérifier ?' },
    },
    {
      id: 'frame', path: 'book/chapters/03-task-protocol',
      labels: { en: 'Frame', zh: '框定', es: 'Delimitar', ja: '枠を決める', ko: '범위 정하기', de: 'Abgrenzen', 'zh-tw': '框定', fr: 'Cadrer' },
      bodies: {
        en: 'State the goal, relevant context, allowed help, limits, check, and stop condition.', zh: '写清目标、相关上下文、允许的帮助、限制、检查方式和停止条件。', es: 'Expón el objetivo, el contexto relevante, la ayuda permitida, los límites, la comprobación y la condición de parada.', ja: '目的、必要なコンテキスト、許可する支援、制約、確認方法、停止条件を明示します。', ko: '목표, 필요한 맥락, 허용된 도움, 제한, 점검 방법과 중지 조건을 적습니다.', de: 'Halte Ziel, relevanten Kontext, erlaubte Hilfe, Grenzen, Prüfung und Stoppbedingung fest.', 'zh-tw': '寫清楚目標、相關上下文、允許的協助、限制、檢查方式與停止條件。', fr: 'Énoncez l’objectif, le contexte utile, l’aide autorisée, les limites, le contrôle et le point d’arrêt.'
      },
      next: { en: 'What is the smallest safe request?', zh: '最小的安全请求是什么？', es: '¿Cuál es la petición segura más pequeña?', ja: '最小限で安全な依頼は何か？', ko: '가장 작고 안전한 요청은 무엇인가?', de: 'Was ist die kleinste sichere Anfrage?', 'zh-tw': '最小且安全的請求是什麼？', fr: 'Quelle est la plus petite demande sûre ?' },
    },
    {
      id: 'act', path: 'book/chapters/13-action-boundaries',
      labels: { en: 'Act', zh: '行动', es: 'Actuar', ja: '行動する', ko: '행동하기', de: 'Handeln', 'zh-tw': '行動', fr: 'Agir' },
      bodies: {
        en: 'Allow only the smallest reversible action and pause before an external effect.', zh: '只允许最小、可回退的行动；在产生外部影响前先暂停。', es: 'Permite solo la acción reversible más pequeña y detente antes de cualquier efecto externo.', ja: '最小限で元に戻せる操作だけを許可し、外部への影響が出る前に止まります。', ko: '가장 작고 되돌릴 수 있는 행동만 허용하고 외부 효과가 생기기 전에 멈춥니다.', de: 'Erlaube nur die kleinste reversible Handlung und halte vor einer Außenwirkung an.', 'zh-tw': '只允許最小且可復原的行動；產生外部影響前先暫停。', fr: 'N’autorisez que la plus petite action réversible et faites une pause avant tout effet externe.'
      },
      next: { en: 'What authority and receipt will I have?', zh: '我有什么权限和回执？', es: '¿Qué autoridad y qué comprobante tendré?', ja: 'どの権限と記録が残るか？', ko: '어떤 권한과 기록을 남길 것인가?', de: 'Welche Berechtigung und welcher Beleg bleiben?', 'zh-tw': '我會有什麼權限與紀錄？', fr: 'Quelle autorisation et quel relevé conserverai-je ?' },
    },
    {
      id: 'inspect', path: 'book/chapters/09-verification-and-recovery',
      labels: { en: 'Inspect', zh: '检查', es: 'Inspeccionar', ja: '確認する', ko: '점검하기', de: 'Prüfen', 'zh-tw': '檢查', fr: 'Inspecter' },
      bodies: {
        en: 'Compare the output or diff with a source, test, log, or acceptance rule.', zh: '用来源、测试、日志或验收规则对照输出或差异。', es: 'Compara la salida o el diff con una fuente, una prueba, un registro o una regla de aceptación.', ja: '出力や差分を、出典、テスト、ログ、受け入れ条件と照合します。', ko: '출력이나 diff를 출처, 테스트, 로그 또는 수용 기준과 비교합니다.', de: 'Vergleiche Ausgabe oder Diff mit Quelle, Test, Protokoll oder Abnahmeregel.', 'zh-tw': '用來源、測試、紀錄或驗收規則對照輸出或差異。', fr: 'Comparez la sortie ou le diff avec une source, un test, un journal ou une règle d’acceptation.'
      },
      next: { en: 'What did I actually observe?', zh: '我实际观察到了什么？', es: '¿Qué observé realmente?', ja: '実際に何を観察したか？', ko: '실제로 무엇을 관찰했는가?', de: 'Was habe ich tatsächlich beobachtet?', 'zh-tw': '我實際觀察到了什麼？', fr: 'Qu’ai-je réellement observé ?' },
    },
    {
      id: 'repair', path: 'book/chapters/12-agent-loop-and-stop',
      labels: { en: 'Repair', zh: '修正', es: 'Reparar', ja: '修正する', ko: '고치기', de: 'Reparieren', 'zh-tw': '修正', fr: 'Corriger' },
      bodies: {
        en: 'Name one mismatch, preserve the failed receipt, and change one condition before retrying.', zh: '指出一个不匹配，保留失败回执，重试前只改变一个条件。', es: 'Nombra un desajuste, conserva el registro fallido y cambia una sola condición antes de reintentar.', ja: '不一致を1つ言葉にし、失敗した記録を残してから、条件を1つだけ変えて再試行します。', ko: '불일치 하나를 적고 실패 기록을 보존한 뒤 조건 하나만 바꿔 다시 시도합니다.', de: 'Benenne eine Abweichung, bewahre den Fehlbeleg und ändere vor dem Versuch genau eine Bedingung.', 'zh-tw': '指出一個不相符之處，保留失敗紀錄，重試前只改變一個條件。', fr: 'Nommez un écart, conservez le relevé de l’échec et ne changez qu’une condition avant de réessayer.'
      },
      next: { en: 'What changed, and what remains unknown?', zh: '什么变了，什么仍然未知？', es: '¿Qué cambió y qué sigue sin saberse?', ja: '何が変わり、何がまだ不明か？', ko: '무엇이 바뀌었고 무엇이 여전히 미확인인가?', de: 'Was hat sich geändert und was bleibt unbekannt?', 'zh-tw': '什麼改變了，什麼仍然未知？', fr: 'Qu’est-ce qui a changé et qu’est-ce qui reste inconnu ?' },
    },
    {
      id: 'transfer', path: 'book/chapters/20-personal-codex-work-system',
      labels: { en: 'Transfer', zh: '迁移', es: 'Transferir', ja: '転用する', ko: '전이하기', de: 'Übertragen', 'zh-tw': '遷移', fr: 'Transférer' },
      bodies: {
        en: 'Repeat the method on an unseen task; one successful attempt is not mastery.', zh: '在未见任务上重复方法；一次成功尝试不等于掌握。', es: 'Repite el método en una tarea nueva; un intento acertado no demuestra dominio.', ja: '見たことのない課題で方法を繰り返します。1回の成功は習得の証明ではありません。', ko: '새 작업에서 방법을 반복하세요. 한 번의 성공은 숙련의 증거가 아닙니다.', de: 'Wiederhole die Methode an einer neuen Aufgabe; ein erfolgreicher Versuch ist kein Beherrschungsnachweis.', 'zh-tw': '在未見任務上重複方法；一次成功嘗試不等於掌握。', fr: 'Répétez la méthode sur une nouvelle tâche ; un essai réussi ne prouve pas la maîtrise.'
      },
      next: { en: 'Can I transfer this, or should I stop?', zh: '我可以迁移，还是应该停止？', es: '¿Puedo transferirlo o debo parar?', ja: '応用できるか、それとも止めるか？', ko: '전이할 수 있는가, 아니면 멈춰야 하는가?', de: 'Kann ich das übertragen oder sollte ich stoppen?', 'zh-tw': '可以遷移，還是應該停止？', fr: 'Puis-je transférer la méthode ou dois-je m’arrêter ?' },
    },
  ];

  const CARDS = [
    { stage: 'understand', asset: 'llm-six-terms-to-one-check.svg', path: 'book/chapters/01-gpt-and-codex', titles: { en: 'Six terms, one checked result', zh: '六个术语，一个可检查结果', es: 'Seis términos, un resultado comprobado', ja: '6つの用語、1つの確認できる結果', ko: '여섯 용어, 하나의 점검된 결과', de: 'Sechs Begriffe, ein geprüftes Ergebnis', 'zh-tw': '六個術語，一個可檢查結果', fr: 'Six termes, un résultat vérifié' }, bodies: { en: 'Separate token, context, prompt, response, and tool authority before you trust the answer.', zh: '在相信回答前，分开 token、上下文、提示、响应和工具权限。', es: 'Separa token, contexto, prompt, respuesta y autoridad de la herramienta antes de confiar en la respuesta.', ja: '回答を信じる前に、トークン、コンテキスト、プロンプト、応答、ツールの権限を分けます。', ko: '답변을 믿기 전에 토큰, 맥락, 프롬프트, 응답과 도구 권한을 분리합니다.', de: 'Trenne Token, Kontext, Prompt, Antwort und Tool-Berechtigung, bevor du der Antwort vertraust.', 'zh-tw': '在相信回答前，分開 token、上下文、提示、回應與工具權限。', fr: 'Séparez token, contexte, prompt, réponse et autorité de l’outil avant de faire confiance à la réponse.' } },
    { stage: 'understand', asset: 'model-choice-is-a-test.svg', path: 'book/chapters/01-gpt-and-codex', titles: { en: 'Model choice is a bounded comparison', zh: '模型选择是一项有边界的比较', es: 'Elegir modelo es una comparación acotada', ja: 'モデル選択は範囲を区切った比較', ko: '모델 선택은 범위가 있는 비교입니다', de: 'Modellauswahl ist ein begrenzter Vergleich', 'zh-tw': '模型選擇是一項有界線的比較', fr: 'Choisir un modèle est une comparaison délimitée' }, bodies: { en: 'Hold the task contract steady, compare working conditions, and record what the test cannot show.', zh: '保持任务契约不变，比较工作条件，并记录测试无法说明的部分。', es: 'Mantén estable el contrato de tarea, compara las condiciones y registra lo que la prueba no puede mostrar.', ja: 'タスク契約を固定し、動作条件を比べ、テストで分からないことを記録します。', ko: '작업 계약을 고정하고 실행 조건을 비교하며 테스트로 알 수 없는 것을 기록합니다.', de: 'Halte den Aufgabenvertrag fest, vergleiche die Bedingungen und notiere, was der Test nicht zeigen kann.', 'zh-tw': '維持任務契約不變，比較工作條件，並記下測試無法說明的部分。', fr: 'Gardez le contrat de tâche fixe, comparez les conditions et notez ce que le test ne montre pas.' } },
    { stage: 'frame', asset: 'prompt-contract-six-fields-red-black.svg', path: 'book/chapters/03-task-protocol', titles: { en: 'A prompt is a small contract', zh: '提示词是一份小型契约', es: 'Un prompt es un pequeño contrato', ja: 'プロンプトは小さな契約', ko: '프롬프트는 작은 계약입니다', de: 'Ein Prompt ist ein kleiner Vertrag', 'zh-tw': '提示是一份小型契約', fr: 'Un prompt est un petit contrat' }, bodies: { en: 'Make result, context, allowed help, limits, check, and stop visible before the request starts.', zh: '在发出请求前，让结果、上下文、允许的帮助、限制、检查和停止条件都可见。', es: 'Haz visibles el resultado, el contexto, la ayuda permitida, los límites, la comprobación y la parada antes de empezar.', ja: '依頼を始める前に、結果、コンテキスト、許可する支援、制約、確認、停止を見える形にします。', ko: '요청을 시작하기 전에 결과, 맥락, 허용된 도움, 제한, 점검과 중지를 분명히 합니다.', de: 'Mache Ergebnis, Kontext, erlaubte Hilfe, Grenzen, Prüfung und Stopp vor der Anfrage sichtbar.', 'zh-tw': '在提出請求前，讓結果、上下文、允許的協助、限制、檢查與停止條件都清楚可見。', fr: 'Rendez visibles le résultat, le contexte, l’aide autorisée, les limites, le contrôle et l’arrêt avant la demande.' } },
    { stage: 'frame', asset: 'first-turn-contract-card.svg', path: 'book/chapters/03-task-protocol', titles: { en: 'Six fields for a bounded first request', zh: '有边界的第一次请求需要六个字段', es: 'Seis campos para una primera petición acotada', ja: '範囲を区切った最初の依頼に必要な6項目', ko: '범위 있는 첫 요청의 여섯 필드', de: 'Sechs Felder für eine begrenzte erste Anfrage', 'zh-tw': '有界線的第一次請求需要六個欄位', fr: 'Six champs pour une première demande délimitée' }, bodies: { en: 'Use one observable outcome, supplied context, response shape, limits, a check, and a receipt.', zh: '写下一个可观察结果、已提供的上下文、回答形式、限制、检查方式和回执。', es: 'Especifica un resultado observable, el contexto aportado, la forma de respuesta, los límites, una comprobación y un registro.', ja: '観察できる結果、与えたコンテキスト、回答形式、制約、確認、記録を指定します。', ko: '관찰 가능한 결과, 제공한 맥락, 답변 형식, 제한, 점검과 기록을 지정합니다.', de: 'Lege ein beobachtbares Ergebnis, gelieferten Kontext, Antwortform, Grenzen, Prüfung und Beleg fest.', 'zh-tw': '指定一個可觀察結果、已提供的上下文、回應形式、限制、檢查方式與紀錄。', fr: 'Précisez un résultat observable, le contexte fourni, la forme de réponse, les limites, un contrôle et un relevé.' } },
    { stage: 'act', asset: 'conversation-safety-card-red-black.svg', path: 'book/chapters/13-action-boundaries', titles: { en: 'A model proposal is not a tool receipt', zh: '模型提议不是工具回执', es: 'Una propuesta del modelo no es un comprobante de herramienta', ja: 'モデルの提案はツールの記録ではない', ko: '모델 제안은 도구 기록이 아닙니다', de: 'Ein Modellvorschlag ist kein Tool-Beleg', 'zh-tw': '模型提議不是工具紀錄', fr: 'Une proposition du modèle n’est pas un relevé d’outil' }, bodies: { en: 'Separate what may enter, leave, change, and support a completion claim.', zh: '分开什么可以进入、离开、改变，以及什么能支持完成结论。', es: 'Separa lo que puede entrar, salir, cambiar y respaldar una afirmación de finalización.', ja: '何を入力でき、外へ出せ、変更でき、完了の主張を支えるかを分けます。', ko: '무엇이 들어오고 나가며 바뀌고 완료 주장을 뒷받침하는지 분리합니다.', de: 'Trenne, was eingehen, hinausgehen, geändert werden und eine Fertigmeldung stützen darf.', 'zh-tw': '分開什麼可以進入、離開、改變，以及什麼能支持完成主張。', fr: 'Séparez ce qui peut entrer, sortir, changer et étayer une affirmation d’achèvement.' } },
    { stage: 'act', asset: 'side-effect-boundary-decision-map.svg', path: 'book/chapters/13-action-boundaries', titles: { en: 'Side-effect boundary decision map', zh: '副作用边界决策图', es: 'Mapa de decisión de los efectos externos', ja: '副作用の境界を決めるマップ', ko: '부작용 경계를 정하는 의사결정 지도', de: 'Entscheidungskarte für Außenwirkungen', 'zh-tw': '副作用界線判斷圖', fr: 'Carte de décision des effets externes' }, bodies: { en: 'Reading and local reversible work stay narrow; external effects require stronger authority and recovery evidence.', zh: '阅读和本地可回退工作保持狭窄范围；外部影响需要更强的权限和恢复证据。', es: 'La lectura y el trabajo local reversible se mantienen acotados; los efectos externos exigen más autoridad y pruebas de recuperación.', ja: '読み取りとローカルの可逆操作は狭く保ち、外部への影響には強い権限と復旧の証拠を求めます。', ko: '읽기와 로컬 되돌리기 작업은 좁게 유지하고 외부 효과에는 더 강한 권한과 복구 증거를 요구합니다.', de: 'Lesen und lokale reversible Arbeit bleiben eng begrenzt; Außenwirkungen brauchen stärkere Berechtigung und Wiederherstellungsbelege.', 'zh-tw': '讀取與本機可復原工作維持狹窄範圍；外部影響需要更強的權限與復原證據。', fr: 'La lecture et le travail local réversible restent limités ; les effets externes exigent une autorité et des preuves de reprise plus fortes.' } },
    { stage: 'inspect', asset: 'task-to-evidence-red-black.svg', path: 'book/chapters/09-verification-and-recovery', titles: { en: 'A claim can travel only as far as its evidence', zh: '结论只能走到证据允许的地方', es: 'Una afirmación solo llega hasta donde llega su evidencia', ja: '主張は証拠の届く範囲までしか進めない', ko: '주장은 증거가 닿는 곳까지만 갈 수 있습니다', de: 'Eine Aussage reicht nur so weit wie ihr Beleg', 'zh-tw': '主張只能走到證據允許的地方', fr: 'Une affirmation ne va pas au-delà de ses preuves' }, bodies: { en: 'Move from request to scope, action, observation, and a claim that stays inside the record.', zh: '从请求走到范围、行动、观察，再提出不超出记录范围的结论。', es: 'Pasa de la petición al alcance, la acción y la observación, y formula una afirmación dentro del registro.', ja: '依頼から範囲、行動、観察へ進み、記録の中に収まる主張にします。', ko: '요청에서 범위, 행동과 관찰로 이어 가며 기록 안에 머무는 주장을 만듭니다.', de: 'Gehe von Anfrage über Umfang, Handlung und Beobachtung zu einer Aussage innerhalb des Protokolls.', 'zh-tw': '從請求走到範圍、行動與觀察，再提出不超出紀錄範圍的主張。', fr: 'Passez de la demande au périmètre, à l’action et à l’observation, puis formulez une affirmation limitée au relevé.' } },
    { stage: 'inspect', asset: 'claim-to-evidence-audit-red-black.svg', path: 'book/chapters/15-research-track', titles: { en: 'Claim to evidence audit', zh: '从结论到证据的审计', es: 'Auditar la afirmación y la evidencia', ja: '主張から証拠への監査', ko: '주장에서 증거까지 점검하기', de: 'Aussage und Beleg prüfen', 'zh-tw': '從主張到證據的稽核', fr: 'Auditer l’affirmation et les preuves' }, bodies: { en: 'State the claim, bound its scope, name the source owner, run the smallest check, and keep the limit.', zh: '写清结论，限定范围，标出来源负责人，执行最小检查，并保留限制。', es: 'Formula la afirmación, limita su alcance, nombra al responsable de la fuente, haz la comprobación mínima y conserva el límite.', ja: '主張を書き、範囲を限定し、出典の責任者を記録し、最小限の確認を行い、限界を残します。', ko: '주장을 적고 범위를 정하며 출처 책임자를 밝히고 가장 작은 점검을 수행한 뒤 한계를 남깁니다.', de: 'Formuliere die Aussage, begrenze den Umfang, nenne den Quellenverantwortlichen, prüfe klein und bewahre die Grenze.', 'zh-tw': '寫清楚主張，限定範圍，標出來源負責人，執行最小檢查，並保留界線。', fr: 'Formulez l’affirmation, délimitez-la, nommez le responsable de la source, effectuez le plus petit contrôle et gardez la limite.' } },
    { stage: 'repair', asset: 'failed-interaction-recovery-red-black.svg', path: 'book/chapters/12-agent-loop-and-stop', titles: { en: 'Failed interaction recovery', zh: '失败交互的恢复', es: 'Recuperar una interacción fallida', ja: '失敗したやり取りからの復旧', ko: '실패한 상호작용 복구', de: 'Fehlerhafte Interaktion wiederherstellen', 'zh-tw': '失敗互動的復原', fr: 'Récupérer une interaction qui a échoué' }, bodies: { en: 'Preserve the inputs and trace, classify the first mismatch, change one condition, and keep the result bounded.', zh: '保留输入和轨迹，分类第一个不匹配，只改变一个条件，并让结论保持有边界。', es: 'Conserva las entradas y el rastro, clasifica el primer desajuste, cambia una condición y mantén acotado el resultado.', ja: '入力と記録を残し、最初の不一致を分類し、条件を1つだけ変えて、結果の範囲を保ちます。', ko: '입력과 추적 기록을 보존하고 첫 불일치를 분류한 뒤 조건 하나만 바꾸며 결과의 범위를 제한합니다.', de: 'Bewahre Eingaben und Spur, klassifiziere die erste Abweichung, ändere eine Bedingung und halte das Ergebnis begrenzt.', 'zh-tw': '保留輸入與軌跡，分類第一個不相符，只改變一個條件，並讓結果保持有界線。', fr: 'Conservez les entrées et la trace, classez le premier écart, ne changez qu’une condition et gardez le résultat délimité.' } },
    { stage: 'repair', asset: 'recovery-decision-tree-red-black.svg', path: 'book/chapters/12-agent-loop-and-stop', titles: { en: 'Recovery decision tree', zh: '恢复决策树', es: 'Árbol de decisión para recuperar', ja: '復旧の判断ツリー', ko: '복구 의사결정 트리', de: 'Entscheidungsbaum für die Wiederherstellung', 'zh-tw': '復原決策樹', fr: 'Arbre de décision pour la reprise' }, bodies: { en: 'Preserve the trace, find the first mismatch, check authority, run one safe check, or stop with a small claim.', zh: '保留轨迹，找到第一个不匹配，检查权限，执行一次安全检查；否则停下并缩小结论。', es: 'Conserva el rastro, encuentra el primer desajuste, comprueba la autoridad, haz una verificación segura o detente con una afirmación pequeña.', ja: '記録を保存し、最初の不一致を見つけ、権限を確認し、安全な確認を1つ行うか、小さな主張で止まります。', ko: '기록을 보존하고 첫 불일치를 찾은 뒤 권한을 확인합니다. 안전한 점검 하나를 하거나 작은 주장으로 멈춥니다.', de: 'Bewahre die Spur, finde die erste Abweichung, prüfe die Berechtigung, führe einen sicheren Check aus oder stoppe mit einer kleinen Aussage.', 'zh-tw': '保留軌跡，找出第一個不相符，檢查權限，執行一次安全檢查；否則停下並縮小主張。', fr: 'Conservez la trace, trouvez le premier écart, vérifiez l’autorité, faites un contrôle sûr ou arrêtez-vous avec une affirmation limitée.' } },
    { stage: 'transfer', asset: 'understanding-to-transfer-red-black.svg', path: 'book/chapters/20-personal-codex-work-system', titles: { en: 'From understanding to transfer', zh: '从理解到迁移', es: 'De entender a transferir', ja: '理解から転用へ', ko: '이해에서 전이까지', de: 'Vom Verstehen zur Übertragung', 'zh-tw': '從理解到遷移', fr: 'De la compréhension au transfert' }, bodies: { en: 'Understand the boundary, make a bounded attempt, inspect it, repair one mismatch, vary one condition, and repeat.', zh: '理解边界，做一次有边界的尝试，检查结果，修正一个不匹配，改变一个条件，再重复方法。', es: 'Entiende el límite, haz un intento acotado, inspecciónalo, repara un desajuste, cambia una condición y repite.', ja: '境界を理解し、範囲を区切って試し、確認し、不一致を1つ直し、条件を1つ変えて繰り返します。', ko: '경계를 이해하고 범위 있는 시도를 한 뒤 점검하며 불일치 하나를 고치고 조건 하나를 바꿔 반복합니다.', de: 'Verstehe die Grenze, mache einen begrenzten Versuch, prüfe ihn, repariere eine Abweichung, ändere eine Bedingung und wiederhole.', 'zh-tw': '理解界線，做一次有界線的嘗試，檢查結果，修正一個不相符，改變一個條件，再重複方法。', fr: 'Comprenez la limite, faites un essai délimité, inspectez-le, corrigez un écart, changez une condition et recommencez.' } },
    { stage: 'transfer', asset: 'beginner-practice-loop-red-black.svg', path: 'book/chapters/20-personal-codex-work-system', titles: { en: 'Beginner practice loop', zh: '初学者练习闭环', es: 'Ciclo de práctica para principiantes', ja: '初心者の練習ループ', ko: '초보자 연습 루프', de: 'Übungszyklus für Einsteiger', 'zh-tw': '初學者練習閉環', fr: 'Boucle de pratique pour débutants' }, bodies: { en: 'Make an unaided attempt, correct one point, vary the case, and keep a bounded receipt instead of claiming mastery.', zh: '先独立尝试，修正一个要点，改变案例，再保留有边界的记录，不要直接宣称掌握。', es: 'Haz un intento sin ayuda, corrige un punto, cambia el caso y conserva un registro acotado en vez de afirmar dominio.', ja: '自力で試し、1点を直し、条件を変えて、習得を主張する代わりに範囲のある記録を残します。', ko: '도움 없이 시도하고 한 가지를 고친 뒤 사례를 바꿔 보며 숙련을 주장하는 대신 범위 있는 기록을 남깁니다.', de: 'Versuche es ohne Hilfe, korrigiere einen Punkt, verändere den Fall und bewahre einen begrenzten Beleg statt Beherrschung zu behaupten.', 'zh-tw': '先獨立嘗試，修正一個要點，改變案例，再保留有界線的紀錄，不要直接宣稱掌握。', fr: 'Essayez sans aide, corrigez un point, changez le cas et gardez un relevé limité au lieu de proclamer la maîtrise.' } },
  ];

  const params = new URLSearchParams(window.location.search);
  const requestedLocale = params.get('lang');
  let locale = Object.prototype.hasOwnProperty.call(LOCALES, requestedLocale) ? requestedLocale : 'en';
  const invalidLocale = Boolean(requestedLocale) && !Object.prototype.hasOwnProperty.call(LOCALES, requestedLocale);
  let activeStageId = 'understand';

  const query = (selector) => document.querySelector(selector);
  const queryAll = (selector) => [...document.querySelectorAll(selector)];
  const copy = () => COPY[locale] || COPY.en;
  const localized = (values) => values[locale] || values.en;

  function readerHref(base) {
    const file = `${base}-${LOCALES[locale].suffix}.md`;
    return `reader.html?path=${encodeURIComponent(file)}&lang=${encodeURIComponent(locale)}`;
  }

  function assetHref(asset) { return `../assets/teaching/${asset}`; }

  function setText() {
    const strings = copy();
    queryAll('[data-i18n]').forEach((element) => {
      const value = strings[element.dataset.i18n];
      if (typeof value === 'string') element.textContent = value;
    });
    queryAll('[data-i18n-attr]').forEach((element) => {
      element.dataset.i18nAttr.split(';').forEach((entry) => {
        const [attribute, key] = entry.split(':');
        if (attribute && key && typeof strings[key] === 'string') element.setAttribute(attribute, strings[key]);
      });
    });
    queryAll('[data-visual-home]').forEach((link) => { link.href = `index.html?lang=${encodeURIComponent(locale)}`; });
    queryAll('[data-visual-reader]').forEach((link) => { link.href = readerHref('book/guides/llm-fundamentals'); });
    const anatomyImage = query('[data-visual-anatomy-image]');
    if (anatomyImage) anatomyImage.alt = strings.howFigureAlt;
    const anatomyLink = query('[data-visual-anatomy-link]');
    if (anatomyLink) anatomyLink.setAttribute('aria-label', strings.openFullVisual);
    document.documentElement.lang = locale;
    document.title = `${strings.title} — Prysai LLM Playbook`;
    const banner = query('[data-visual-banner]');
    if (banner) {
      banner.hidden = !invalidLocale;
      banner.textContent = invalidLocale ? strings.invalidLocale : '';
    }
    const language = query('#visual-language');
    if (language) language.value = locale;
  }

  function renderMap() {
    const strings = copy();
    const nodes = query('[data-visual-map-nodes]');
    const fallback = query('[data-visual-map-fallback]');
    if (!nodes || !fallback) return;
    nodes.replaceChildren();
    fallback.replaceChildren();
    STAGES.forEach((stage, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'visual-map-node';
      button.dataset.stage = stage.id;
      button.setAttribute('aria-pressed', String(stage.id === activeStageId));
      button.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${localized(stage.labels)}`);
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = localized(stage.labels);
      button.append(number, label);
      button.addEventListener('click', () => { activeStageId = stage.id; renderMap(); });
      if (stage.id === activeStageId) button.classList.add('is-selected');
      item.append(button);
      nodes.append(item);

      const fallbackItem = document.createElement('li');
      const fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = `${String(index + 1).padStart(2, '0')} · ${localized(stage.labels)}`;
      const fallbackBody = document.createElement('span');
      fallbackBody.textContent = localized(stage.bodies);
      const fallbackLink = document.createElement('a');
      fallbackLink.className = 'visual-action-link';
      fallbackLink.href = readerHref(stage.path);
      fallbackLink.textContent = `${strings.openStage} ↗`;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackLink);
      fallback.append(fallbackItem);
    });
    const stage = STAGES.find((candidate) => candidate.id === activeStageId) || STAGES[0];
    const detailTitle = query('[data-visual-map-title]');
    const detailBody = query('[data-visual-map-body]');
    const detailNext = query('[data-visual-map-next]');
    const detailLink = query('[data-visual-map-link]');
    if (detailTitle) detailTitle.textContent = localized(stage.labels);
    if (detailBody) detailBody.textContent = localized(stage.bodies);
    if (detailNext) detailNext.textContent = localized(stage.next);
    if (detailLink) detailLink.href = readerHref(stage.path);
  }

  function renderGallery() {
    const gallery = query('[data-visual-gallery]');
    if (!gallery) return;
    const strings = copy();
    gallery.replaceChildren();
    CARDS.forEach((card) => {
      const stage = STAGES.find((candidate) => candidate.id === card.stage) || STAGES[0];
      const article = document.createElement('article');
      article.className = 'visual-card';
      const link = document.createElement('a');
      link.className = 'visual-card-link';
      link.href = assetHref(card.asset);
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.setAttribute('aria-label', `${strings.openFullVisual}: ${localized(card.titles)}`);
      const image = document.createElement('img');
      image.src = assetHref(card.asset);
      image.loading = 'lazy';
      image.alt = `${localized(card.titles)} — ${localized(card.bodies)}`;
      link.append(image);
      const stageLabel = document.createElement('span');
      stageLabel.className = 'visual-card-stage';
      stageLabel.textContent = `${strings.stage} · ${localized(stage.labels)}`;
      const title = document.createElement('h3');
      title.textContent = localized(card.titles);
      const body = document.createElement('p');
      body.textContent = localized(card.bodies);
      const lesson = document.createElement('a');
      lesson.className = 'visual-action-link';
      lesson.href = readerHref(card.path);
      lesson.textContent = `${strings.openLesson} ↗`;
      article.append(link, stageLabel, title, body, lesson);
      gallery.append(article);
    });
  }

  function setLocale(nextLocale, updateUrl = true) {
    if (!Object.prototype.hasOwnProperty.call(LOCALES, nextLocale)) return;
    locale = nextLocale;
    setText();
    renderMap();
    renderGallery();
    if (updateUrl) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set('lang', locale);
      window.history.replaceState({}, '', nextUrl);
    }
  }

  const language = query('#visual-language');
  language?.addEventListener('change', (event) => setLocale(event.target.value));
  setText();
  renderMap();
  renderGallery();
})();
