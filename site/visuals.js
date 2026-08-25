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
      heroEyebrow: 'A picture should answer the next question.', heroTitle: 'See the method before you read the detail.', heroBody: "This guide turns the Playbook's core loop into a route you can inspect: understand, frame, act, inspect, repair, and transfer.", heroBoundary: 'The boards are orientation aids. The localized text and the source page remain the baseline explanation; a picture does not prove that a model acted or that a learner mastered a method.', goalEyebrow: 'Start from your question', goalTitle: 'Choose a reason, not a random page.', goalIntro: 'Pick the situation that brought you here. The map suggests one bounded next step and one visual explanation instead of sending you into the full catalogue.', goalAria: 'Four reasons to enter the Playbook', goalCenter: 'Your next question', goalCenterSub: 'choose one safe route', goalSelected: 'Selected reason', goalNext: 'Next question', goalOpen: 'Open this route', goalOpenVisual: 'Open the route visual', goalFallback: 'Read the four entry points as text', goalFallbackIntro: 'The same choices remain available as a short list when the map cannot run.', galleryMoreSummary: 'Open more teaching boards', galleryMoreIntro: 'These additional boards cover source checks, handoffs, stopping decisions, and the reading loop. They are optional references, not a second course route.',
      mapEyebrow: 'Dynamic route map', mapTitle: 'Choose a stage, then ask one question.', mapIntro: 'Select a node to see the action, the evidence boundary, and the next safe question. The ordered list below keeps the route available without interaction.', mapAria: 'Six stages in the reliable LLM work loop', mapCenter: 'Reliable LLM work', mapCenterSub: 'make the claim checkable', selected: 'Selected stage', nextQuestion: 'Next question', openStage: 'Open this part of the route', fallbackSummary: 'Read the six stages as text', fallbackIntro: 'Use this ordered route without the interactive map. Each stage names an action and the evidence boundary that follows it.',
      galleryEyebrow: 'Teaching boards', galleryTitle: 'Pictures that explain one decision at a time.', galleryIntro: 'Each board has a short explanation, localized alternative text, and a route into the matching lesson. Open the image for a printable view; use the text beside it for the exact boundary.', galleryBoundary: 'This is a focused selection from the project-authored teaching boards. It is not a quality score, benchmark, or proof of learning.',
      howEyebrow: 'Read the picture correctly', howTitle: 'Use a board without overtrusting it.', howIntro: 'The board gives you a shape to remember. Your own small attempt and record decide what you may claim.', howStepOneTitle: 'Start with the thesis', howStepOneBody: 'Name the relationship or decision the picture is meant to clarify.', howStepTwoTitle: 'Open the text fallback', howStepTwoBody: 'Read the labels and next question in ordinary text; do not rely on color or layout alone.', howStepThreeTitle: 'Try one bounded move', howStepThreeBody: 'Use the linked lesson to make one small, reversible attempt with a clear stop condition.', howStepFourTitle: 'Keep the boundary visible', howStepFourBody: 'Save the output or diff, compare it with evidence, and state what the picture still cannot establish.', openFirstLesson: 'Open the first lesson', openFullVisual: 'Open full-size visual', howFigureAlt: 'How to read one Prysai LLM Playbook page', howFigureCaption: 'Project-authored page anatomy: orient, name the concept, act, inspect, keep the boundary visible, and transfer the method.', footerBoundary: 'Source remains Markdown; this page is a visual reading aid.', invalidLocale: 'That language route is not registered; the visual guide is shown in English.', openLesson: 'Open the matching lesson', stage: 'Stage', visual: 'Visual',
    },
    zh: {
      title: '视觉导览', skip: '跳到正文', home: '首页', reader: '阅读课程', allBoards: '查看全部教学图', language: '语言',
      heroEyebrow: '图片应该回答下一个问题。', heroTitle: '先看懂方法，再读具体内容。', heroBody: '这份导览把 Playbook 的核心闭环变成一条可以检查的路线：理解、框定、行动、检查、修正和迁移。', heroBoundary: '图板只是定位辅助。真正的基线仍是本地化文字和来源页面；一张图不能证明模型已经行动，也不能证明学习者已经掌握方法。', goalEyebrow: '先从你的问题开始', goalTitle: '先选你要解决的事，不要随便点页面。', goalIntro: '选择你为什么来到这里。地图会给出一个有边界的下一步和一张解释图，而不是把你丢进完整目录。', goalAria: '进入 Playbook 的四种常见理由', goalCenter: '你下一个要回答的问题', goalCenterSub: '选择一条安全路线', goalSelected: '当前理由', goalNext: '下一个问题', goalOpen: '打开这条路线', goalOpenVisual: '打开路线图', goalFallback: '按文字阅读四个入口', goalFallbackIntro: '地图无法运行时，下面的短列表仍然保留同样的选择。', galleryMoreSummary: '打开更多教学图', galleryMoreIntro: '这些补充图覆盖来源检查、交接、停止判断和阅读闭环。它们是可选参考，不是第二条课程路线。',
      mapEyebrow: '动态路线图', mapTitle: '选择一个阶段，再问一个问题。', mapIntro: '选择节点即可看到行动、证据边界和下一道安全问题。下面的有序列表在无法交互时仍然保留同一条路线。', mapAria: '可靠 LLM 工作闭环的六个阶段', mapCenter: '可靠的 LLM 工作', mapCenterSub: '让结论可以检查', selected: '当前阶段', nextQuestion: '下一个问题', openStage: '打开这部分路线', fallbackSummary: '按文字阅读六个阶段', fallbackIntro: '不使用交互地图也可以按顺序阅读。每个阶段都说明一项行动，以及紧随其后的证据边界。',
      galleryEyebrow: '教学图板', galleryTitle: '一次解释一个决定。', galleryIntro: '每张图都配有简短说明、本地化替代文字，以及通往对应课程的路线。需要打印时打开图片；需要精确边界时阅读旁边的文字。', galleryBoundary: '这里展示的是项目原创教学图板中的重点选集，不是质量评分、基准测试或学习证明。',
      howEyebrow: '正确阅读图示', howTitle: '使用图板，但不要过度相信它。', howIntro: '图板帮你记住结构；你自己的小尝试和记录，才决定你能提出什么结论。', howStepOneTitle: '先看清主旨', howStepOneBody: '说清楚这张图要帮助你理解哪项关系或决定。', howStepTwoTitle: '打开文字回退', howStepTwoBody: '用普通文字阅读标签和下一个问题，不要只依赖颜色或布局。', howStepThreeTitle: '尝试一次有边界的行动', howStepThreeBody: '沿着链接进入课程，做一次范围小、可回退并且有停止条件的尝试。', howStepFourTitle: '保留边界', howStepFourBody: '保存输出或差异，用证据对照，并说明这张图仍然无法证明什么。', openFirstLesson: '打开第一课', openFullVisual: '打开完整尺寸图示', howFigureAlt: '如何阅读一页 Prysai LLM Playbook 内容', howFigureCaption: '项目原创页面结构图：定位问题、命名概念、采取行动、检查证据、保留边界，再迁移方法。', footerBoundary: '来源仍是 Markdown；本页是视觉阅读辅助。', invalidLocale: '该语言路线未注册；视觉导览暂以英文显示。', openLesson: '打开对应课程', stage: '阶段', visual: '图示',
    },
    es: {
      title: 'Guía visual', skip: 'Saltar al contenido', home: 'Inicio', reader: 'Leer la guía', allBoards: 'Ver todos los tableros', language: 'Idioma',
      heroEyebrow: 'Una imagen debería responder a la siguiente pregunta.', heroTitle: 'Mira el método antes de leer el detalle.', heroBody: 'Esta guía convierte el ciclo central del Playbook en un recorrido que puedes revisar: entender, delimitar, actuar, inspeccionar, reparar y transferir.', heroBoundary: 'Los tableros sirven para orientarse. El texto localizado y la página fuente siguen siendo la explicación de referencia; una imagen no demuestra que el modelo actuara ni que alguien dominara el método.', goalEyebrow: 'Empieza por tu pregunta', goalTitle: 'Elige tu motivo, no una página al azar.', goalIntro: 'Elige la situación que te ha traído aquí. El mapa propone un siguiente paso acotado y una imagen explicativa, en vez de enviarte al catálogo completo.', goalAria: 'Cuatro motivos para entrar en el Playbook', goalCenter: 'Tu siguiente pregunta', goalCenterSub: 'elige un recorrido seguro', goalSelected: 'Motivo seleccionado', goalNext: 'Siguiente pregunta', goalOpen: 'Abrir este recorrido', goalOpenVisual: 'Abrir el visual del recorrido', goalFallback: 'Leer los cuatro puntos de entrada como texto', goalFallbackIntro: 'Si el mapa no funciona, la misma elección queda disponible en esta lista breve.', galleryMoreSummary: 'Abrir más tableros didácticos', galleryMoreIntro: 'Estos tableros adicionales cubren comprobación de fuentes, entregas, decisiones de parada y el ciclo de lectura. Son referencias opcionales, no una segunda ruta del curso.',
      mapEyebrow: 'Mapa dinámico del recorrido', mapTitle: 'Elige una etapa y formula una pregunta.', mapIntro: 'Selecciona un nodo para ver la acción, el límite de evidencia y la siguiente pregunta segura. La lista ordenada conserva el recorrido sin interacción.', mapAria: 'Seis etapas del ciclo de trabajo fiable con LLM', mapCenter: 'Trabajo fiable con LLM', mapCenterSub: 'haz comprobable la afirmación', selected: 'Etapa seleccionada', nextQuestion: 'Siguiente pregunta', openStage: 'Abrir esta parte del recorrido', fallbackSummary: 'Leer las seis etapas como texto', fallbackIntro: 'Usa este recorrido ordenado sin el mapa interactivo. Cada etapa nombra una acción y el límite de evidencia que la sigue.',
      galleryEyebrow: 'Tableros didácticos', galleryTitle: 'Imágenes que explican una decisión cada vez.', galleryIntro: 'Cada tablero incluye una explicación breve, texto alternativo localizado y un enlace a la lección correspondiente. Abre la imagen para imprimirla; usa el texto para comprobar el límite exacto.', galleryBoundary: 'Es una selección centrada de los tableros originales del proyecto. No es una puntuación de calidad, un benchmark ni una prueba de aprendizaje.',
      howEyebrow: 'Lee bien la imagen', howTitle: 'Usa un tablero sin confiarte demasiado.', howIntro: 'El tablero te da una estructura que recordar. Tu propio intento pequeño y su registro deciden qué puedes afirmar.', howStepOneTitle: 'Empieza por la tesis', howStepOneBody: 'Nombra la relación o decisión que la imagen debe aclarar.', howStepTwoTitle: 'Abre la alternativa textual', howStepTwoBody: 'Lee las etiquetas y la siguiente pregunta en texto normal; no dependas solo del color o la disposición.', howStepThreeTitle: 'Prueba una acción acotada', howStepThreeBody: 'Sigue la lección enlazada para hacer un intento pequeño, reversible y con un punto de parada claro.', howStepFourTitle: 'Mantén visible el límite', howStepFourBody: 'Guarda la salida o el diff, compárala con la evidencia y di qué sigue sin demostrar la imagen.', openFirstLesson: 'Abrir la primera lección', openFullVisual: 'Abrir el visual completo', howFigureAlt: 'Cómo leer una página de Prysai LLM Playbook', howFigureCaption: 'Anatomía de página original del proyecto: orientarse, nombrar el concepto, actuar, inspeccionar, mantener visible el límite y transferir el método.', footerBoundary: 'La fuente sigue siendo Markdown; esta página ayuda a leer visualmente.', invalidLocale: 'Esa ruta de idioma no está registrada; la guía visual se muestra en inglés.', openLesson: 'Abrir la lección correspondiente', stage: 'Etapa', visual: 'Visual',
    },
    ja: {
      title: 'ビジュアルガイド', skip: '本文へ移動', home: 'ホーム', reader: 'ガイドを読む', allBoards: '教材ボードをすべて見る', language: '言語',
      heroEyebrow: '図は、次に考える問いを示すものです。', heroTitle: '細部を読む前に、方法の全体像を見る。', heroBody: 'このガイドでは、Playbook の中心となる流れを、確認できる道筋として示します。理解、枠決め、実行、確認、修正、転用の順です。', heroBoundary: 'ボードは位置づけの補助です。基準になるのはローカライズされた本文と原典ページです。図だけでモデルの実行や学習者の習得を証明することはできません。', goalEyebrow: '問いから始める', goalTitle: '理由を選び、ページを適当に開かない。', goalIntro: 'ここへ来たきっかけを選んでください。完全な目録に放り込む代わりに、範囲を区切った次の一歩と説明図を示します。', goalAria: 'Playbook に入る4つの理由', goalCenter: '次に考える問い', goalCenterSub: '安全なルートを1つ選ぶ', goalSelected: '選択した理由', goalNext: '次の問い', goalOpen: 'このルートを開く', goalOpenVisual: 'ルート図を開く', goalFallback: '4つの入口をテキストで読む', goalFallbackIntro: 'マップが動かない場合も、同じ選択肢を短いリストで利用できます。', galleryMoreSummary: '教材ボードをさらに見る', galleryMoreIntro: '追加のボードでは、出典確認、引き継ぎ、停止判断、読解ループを扱います。任意の参考資料であり、別のコース経路ではありません。',
      mapEyebrow: '動的なルートマップ', mapTitle: '段階を選び、問いを1つ立てる。', mapIntro: 'ノードを選ぶと、行動、証拠の境界、次に確認する安全な問いが表示されます。下の順序付きリストは、操作できない場合にも同じ道筋を残します。', mapAria: '信頼できる LLM 作業ループの6段階', mapCenter: '信頼できる LLM 作業', mapCenterSub: '主張を確認可能にする', selected: '選択中の段階', nextQuestion: '次の問い', openStage: 'このルートを開く', fallbackSummary: '6段階をテキストで読む', fallbackIntro: 'インタラクティブなマップを使わずに、順序どおりに読めます。各段階には行動と、その後に確認すべき証拠の境界があります。',
      galleryEyebrow: '教材ボード', galleryTitle: '一度に1つの判断を説明する図。', galleryIntro: '各ボードには短い説明、ローカライズされた代替テキスト、対応するレッスンへのリンクがあります。印刷するなら画像を、境界を正確に確認するなら横の文章を開いてください。', galleryBoundary: 'プロジェクトが作成した教材ボードから、目的を絞って選んでいます。品質スコア、ベンチマーク、学習の証明ではありません。',
      howEyebrow: '図を正しく読む', howTitle: 'ボードを使いながら、過信しない。', howIntro: 'ボードは覚えるための形を示します。何を主張できるかは、自分の小さな試行と記録で決まります。', howStepOneTitle: '主旨から始める', howStepOneBody: 'この図が明らかにしようとしている関係や判断を言葉にします。', howStepTwoTitle: 'テキストの代替を開く', howStepTwoBody: 'ラベルと次の問いを通常の文章で読み、色や配置だけに頼りません。', howStepThreeTitle: '範囲を区切った操作を試す', howStepThreeBody: 'リンク先のレッスンで、停止条件が明確な小さく可逆な試行を1つ行います。', howStepFourTitle: '境界を残す', howStepFourBody: '出力や差分を保存し、証拠と照合し、この図だけでは分からないことを明示します。', openFirstLesson: '最初のレッスンを開く', openFullVisual: '図を原寸で開く', howFigureAlt: 'Prysai LLM Playbook の1ページを読む方法', howFigureCaption: 'プロジェクト作成のページ構造図：問いを確認し、概念を言葉にし、行動し、証拠を確認し、境界を残して方法を転用します。', footerBoundary: '出典は Markdown のままです。このページは視覚的な読解補助です。', invalidLocale: 'その言語ルートは登録されていません。ビジュアルガイドを英語で表示します。', openLesson: '対応するレッスンを開く', stage: '段階', visual: '図',
    },
    ko: {
      title: '시각 안내서', skip: '본문으로 건너뛰기', home: '홈', reader: '가이드 읽기', allBoards: '교육 보드 모두 보기', language: '언어',
      heroEyebrow: '그림은 다음 질문에 답할 수 있어야 합니다.', heroTitle: '세부 내용을 읽기 전에 방법을 먼저 보세요.', heroBody: '이 안내서는 Playbook의 핵심 흐름을 확인 가능한 경로로 바꿔 보여 줍니다. 이해하고, 범위를 정하고, 실행하고, 점검하고, 고치고, 전이하는 순서입니다.', heroBoundary: '보드는 방향을 잡는 보조 자료입니다. 기준은 현지화된 본문과 원문 페이지입니다. 그림만으로 모델의 실행이나 학습자의 숙달을 증명할 수 없습니다.', goalEyebrow: '질문에서 시작하기', goalTitle: '이유를 고르고, 아무 페이지나 열지 마세요.', goalIntro: '여기까지 온 상황을 고르세요. 전체 목록으로 바로 보내지 않고, 범위가 분명한 다음 단계와 설명 그림 하나를 제안합니다.', goalAria: 'Playbook에 들어오는 네 가지 이유', goalCenter: '다음 질문', goalCenterSub: '안전한 경로 하나 고르기', goalSelected: '선택한 이유', goalNext: '다음 질문', goalOpen: '이 경로 열기', goalOpenVisual: '경로 그림 열기', goalFallback: '네 가지 진입점을 텍스트로 읽기', goalFallbackIntro: '지도가 작동하지 않아도 같은 선택지를 짧은 목록으로 볼 수 있습니다.', galleryMoreSummary: '교육 보드 더 보기', galleryMoreIntro: '추가 보드는 출처 확인, 인계, 중지 판단과 읽기 흐름을 다룹니다. 선택 참고 자료이지 두 번째 강의 경로가 아닙니다.',
      mapEyebrow: '대화형 경로 지도', mapTitle: '단계를 고르고 질문 하나를 세우세요.', mapIntro: '노드를 선택하면 행동, 증거의 경계와 다음에 확인할 안전한 질문이 나타납니다. 아래 순서 목록은 상호작용 없이도 같은 경로를 제공합니다.', mapAria: '신뢰할 수 있는 LLM 작업 루프의 여섯 단계', mapCenter: '신뢰할 수 있는 LLM 작업', mapCenterSub: '주장을 확인 가능하게 만들기', selected: '선택한 단계', nextQuestion: '다음 질문', openStage: '이 경로의 해당 부분 열기', fallbackSummary: '여섯 단계를 텍스트로 읽기', fallbackIntro: '대화형 지도 없이도 순서대로 읽을 수 있습니다. 각 단계는 행동과 이어지는 증거의 경계를 설명합니다.',
      galleryEyebrow: '교육 보드', galleryTitle: '한 번에 하나의 판단을 설명하는 그림.', galleryIntro: '각 보드에는 짧은 설명, 현지화된 대체 텍스트와 해당 수업으로 가는 링크가 있습니다. 인쇄하려면 그림을 열고, 정확한 경계는 옆의 글로 확인하세요.', galleryBoundary: '프로젝트가 만든 교육 보드 중 목적을 좁혀 고른 자료입니다. 품질 점수나 벤치마크, 학습 증거가 아닙니다.',
      howEyebrow: '그림을 정확히 읽기', howTitle: '보드를 활용하되 과신하지 마세요.', howIntro: '보드는 기억할 구조를 보여 줍니다. 무엇을 주장할 수 있는지는 자신의 작은 시도와 기록으로 결정합니다.', howStepOneTitle: '핵심 주장부터 보기', howStepOneBody: '그림이 설명하려는 관계나 판단을 먼저 말로 적습니다.', howStepTwoTitle: '텍스트 대체 설명 열기', howStepTwoBody: '색이나 배치에만 의존하지 말고 레이블과 다음 질문을 일반 텍스트로 읽습니다.', howStepThreeTitle: '범위 있는 행동 하나 시도하기', howStepThreeBody: '연결된 수업에서 중지 조건이 분명한 작고 되돌릴 수 있는 시도를 하나 합니다.', howStepFourTitle: '경계 남겨 두기', howStepFourBody: '출력이나 diff를 저장하고 증거와 대조한 뒤, 그림만으로 알 수 없는 것을 밝힙니다.', openFirstLesson: '첫 수업 열기', openFullVisual: '전체 크기 그림 열기', howFigureAlt: 'Prysai LLM Playbook 한 페이지를 읽는 방법', howFigureCaption: '프로젝트가 만든 페이지 구조도: 방향을 잡고 개념을 이름 붙인 뒤 행동하고 증거를 점검하며 경계를 남기고 방법을 전이합니다.', footerBoundary: '출처는 Markdown으로 유지됩니다. 이 페이지는 시각적 읽기 보조 자료입니다.', invalidLocale: '등록되지 않은 언어 경로입니다. 시각 안내서를 영어로 표시합니다.', openLesson: '해당 수업 열기', stage: '단계', visual: '그림',
    },
    de: {
      title: 'Visueller Leitfaden', skip: 'Zum Inhalt springen', home: 'Startseite', reader: 'Leitfaden lesen', allBoards: 'Alle Lehrtafeln ansehen', language: 'Sprache',
      heroEyebrow: 'Ein Bild sollte die nächste Frage klären.', heroTitle: 'Erst die Methode sehen, dann ins Detail gehen.', heroBody: 'Dieser Leitfaden macht aus dem Kernablauf des Playbooks einen prüfbaren Weg: verstehen, abgrenzen, handeln, prüfen, reparieren und übertragen.', heroBoundary: 'Die Tafeln dienen der Orientierung. Maßgeblich bleiben der lokalisierte Text und die Quellseite; ein Bild belegt weder eine Modellaktion noch die Beherrschung der Methode.', goalEyebrow: 'Mit deiner Frage beginnen', goalTitle: 'Wähle einen Anlass statt irgendeiner Seite.', goalIntro: 'Wähle die Situation, die dich hierhergeführt hat. Die Karte schlägt einen begrenzten nächsten Schritt und eine passende Erklärung vor, statt dich in den ganzen Katalog zu schicken.', goalAria: 'Vier Gründe, ins Playbook einzusteigen', goalCenter: 'Deine nächste Frage', goalCenterSub: 'einen sicheren Weg wählen', goalSelected: 'Ausgewählter Anlass', goalNext: 'Nächste Frage', goalOpen: 'Diesen Weg öffnen', goalOpenVisual: 'Routenvisualisierung öffnen', goalFallback: 'Die vier Einstiege als Text lesen', goalFallbackIntro: 'Wenn die Karte nicht läuft, bleibt dieselbe Auswahl als kurze Liste verfügbar.', galleryMoreSummary: 'Weitere Lehrtafeln öffnen', galleryMoreIntro: 'Diese zusätzlichen Tafeln behandeln Quellenprüfung, Übergaben, Stoppentscheidungen und den Lesekreislauf. Sie sind optionale Referenzen, keine zweite Kursroute.',
      mapEyebrow: 'Dynamische Routenkarte', mapTitle: 'Wähle eine Stufe und stelle eine Frage.', mapIntro: 'Wähle einen Knoten, um Handlung, Beleggrenze und die nächste sichere Frage zu sehen. Die geordnete Liste hält denselben Weg ohne Interaktion bereit.', mapAria: 'Sechs Stufen des zuverlässigen LLM-Arbeitszyklus', mapCenter: 'Zuverlässige LLM-Arbeit', mapCenterSub: 'die Aussage prüfbar machen', selected: 'Ausgewählte Stufe', nextQuestion: 'Nächste Frage', openStage: 'Diesen Teil des Wegs öffnen', fallbackSummary: 'Die sechs Stufen als Text lesen', fallbackIntro: 'Nutze diesen geordneten Weg ohne die interaktive Karte. Jede Stufe benennt eine Handlung und die anschließende Beleggrenze.',
      galleryEyebrow: 'Lehrtafeln', galleryTitle: 'Bilder, die jeweils eine Entscheidung erklären.', galleryIntro: 'Jede Tafel hat eine kurze Erklärung, lokalisierten Alternativtext und einen Weg zur passenden Lektion. Für die Druckansicht öffnest du das Bild; für die genaue Grenze liest du den Text daneben.', galleryBoundary: 'Dies ist eine gezielte Auswahl der projektbezogenen Lehrtafeln. Sie ist weder Qualitätswertung noch Benchmark oder Lernnachweis.',
      howEyebrow: 'Bilder richtig lesen', howTitle: 'Eine Tafel nutzen, ohne ihr zu viel zu glauben.', howIntro: 'Die Tafel gibt dir eine merkbare Struktur. Was du behaupten darfst, entscheiden dein eigener kleiner Versuch und sein Beleg.', howStepOneTitle: 'Mit der These beginnen', howStepOneBody: 'Benenne die Beziehung oder Entscheidung, die das Bild klären soll.', howStepTwoTitle: 'Textalternative öffnen', howStepTwoBody: 'Lies Beschriftungen und nächste Frage als normalen Text; verlasse dich nicht nur auf Farbe oder Anordnung.', howStepThreeTitle: 'Eine begrenzte Handlung testen', howStepThreeBody: 'Führe über die verknüpfte Lektion einen kleinen, umkehrbaren Versuch mit klarem Stopp aus.', howStepFourTitle: 'Die Grenze sichtbar halten', howStepFourBody: 'Speichere Ausgabe oder Diff, vergleiche mit Belegen und nenne, was das Bild weiterhin nicht belegt.', openFirstLesson: 'Erste Lektion öffnen', openFullVisual: 'Visualisierung in voller Größe öffnen', howFigureAlt: 'So liest du eine Seite des Prysai LLM Playbook', howFigureCaption: 'Projektbezogene Seitenstruktur: orientieren, Konzept benennen, handeln, Belege prüfen, die Grenze sichtbar halten und die Methode übertragen.', footerBoundary: 'Die Quelle bleibt Markdown; diese Seite ist eine visuelle Lesehilfe.', invalidLocale: 'Diese Sprachroute ist nicht registriert; der visuelle Leitfaden wird auf Englisch angezeigt.', openLesson: 'Passende Lektion öffnen', stage: 'Stufe', visual: 'Visualisierung',
    },
    'zh-tw': {
      title: '視覺導覽', skip: '跳到正文', home: '首頁', reader: '閱讀課程', allBoards: '查看全部教學圖', language: '語言',
      heroEyebrow: '圖片應該回答下一個問題。', heroTitle: '先看懂方法，再閱讀細節。', heroBody: '這份導覽把 Playbook 的核心閉環變成一條可以檢查的路線：理解、框定、行動、檢查、修正與遷移。', heroBoundary: '圖板只是定位輔助。真正的基線仍是本地化文字與來源頁面；一張圖不能證明模型已經行動，也不能證明學習者已經掌握方法。', goalEyebrow: '先從你的問題開始', goalTitle: '先選你要處理的事，不要隨意開頁面。', goalIntro: '選擇你來到這裡的情境。地圖會提供一個有界線的下一步與一張解釋圖，而不是把你直接丟進完整目錄。', goalAria: '進入 Playbook 的四種常見理由', goalCenter: '你接下來要回答的問題', goalCenterSub: '選擇一條安全路線', goalSelected: '目前理由', goalNext: '下一個問題', goalOpen: '開啟這條路線', goalOpenVisual: '開啟路線圖', goalFallback: '依文字閱讀四個入口', goalFallbackIntro: '地圖無法執行時，下面的短清單仍保留相同選擇。', galleryMoreSummary: '開啟更多教學圖', galleryMoreIntro: '這些補充圖涵蓋來源檢查、交接、停止判斷與閱讀閉環。它們是選用參考，不是第二條課程路線。',
      mapEyebrow: '動態路線圖', mapTitle: '選擇一個階段，再問一個問題。', mapIntro: '選取節點即可看到行動、證據界線與下一個安全問題。下方的有序清單在無法互動時仍保留相同路線。', mapAria: '可靠 LLM 工作閉環的六個階段', mapCenter: '可靠的 LLM 工作', mapCenterSub: '讓主張可以檢查', selected: '目前階段', nextQuestion: '下一個問題', openStage: '開啟這段路線', fallbackSummary: '用文字閱讀六個階段', fallbackIntro: '不使用互動地圖也能依序閱讀。每個階段都說明一項行動，以及接續的證據界線。',
      galleryEyebrow: '教學圖板', galleryTitle: '一次解釋一個判斷。', galleryIntro: '每張圖都附有簡短說明、本地化替代文字，以及通往對應課程的路線。需要列印時開啟圖片；需要精確界線時閱讀旁邊的文字。', galleryBoundary: '這裡展示專案原創教學圖板中的重點選集，不是品質評分、基準測試或學習證明。',
      howEyebrow: '正確閱讀圖示', howTitle: '使用圖板，但不要過度相信它。', howIntro: '圖板幫你記住結構；你自己的小型嘗試與紀錄，才決定你能提出什麼主張。', howStepOneTitle: '先看清主旨', howStepOneBody: '說清楚這張圖要協助你理解哪一項關係或判斷。', howStepTwoTitle: '開啟文字替代說明', howStepTwoBody: '用一般文字閱讀標籤與下一個問題，不要只依賴顏色或版面。', howStepThreeTitle: '嘗試一次有界線的行動', howStepThreeBody: '沿著連結進入課程，做一次範圍小、可復原且有停止條件的嘗試。', howStepFourTitle: '保留界線', howStepFourBody: '保存輸出或差異，用證據對照，並說明這張圖仍然無法證明什麼。', openFirstLesson: '開啟第一課', openFullVisual: '開啟完整尺寸圖示', howFigureAlt: '如何閱讀一頁 Prysai LLM Playbook 內容', howFigureCaption: '專案原創頁面結構圖：定位問題、命名概念、採取行動、檢查證據、保留界線，再遷移方法。', footerBoundary: '來源仍是 Markdown；本頁是視覺閱讀輔助。', invalidLocale: '這個語言路線尚未註冊；視覺導覽暫以英文顯示。', openLesson: '開啟對應課程', stage: '階段', visual: '圖示',
    },
    fr: {
      title: 'Guide visuel', skip: 'Aller au contenu', home: 'Accueil', reader: 'Lire le guide', allBoards: 'Voir tous les tableaux', language: 'Langue',
      heroEyebrow: 'Une image devrait éclairer la question suivante.', heroTitle: 'Voyez la méthode avant d’entrer dans le détail.', heroBody: 'Ce guide transforme la boucle centrale du Playbook en parcours vérifiable : comprendre, cadrer, agir, inspecter, corriger et transférer.', heroBoundary: 'Les tableaux servent à se repérer. Le texte localisé et la page source restent l’explication de référence ; une image ne prouve ni l’action du modèle ni la maîtrise d’une méthode.', goalEyebrow: 'Partir de votre question', goalTitle: 'Choisissez votre besoin, pas une page au hasard.', goalIntro: 'Choisissez la situation qui vous amène ici. La carte propose une prochaine étape délimitée et une explication visuelle, au lieu de vous envoyer vers tout le catalogue.', goalAria: 'Quatre raisons d’entrer dans le Playbook', goalCenter: 'Votre prochaine question', goalCenterSub: 'choisir un parcours sûr', goalSelected: 'Besoin sélectionné', goalNext: 'Question suivante', goalOpen: 'Ouvrir ce parcours', goalOpenVisual: 'Ouvrir le visuel du parcours', goalFallback: 'Lire les quatre entrées sous forme de texte', goalFallbackIntro: 'Si la carte ne fonctionne pas, les mêmes choix restent disponibles dans cette courte liste.', galleryMoreSummary: 'Ouvrir d’autres planches pédagogiques', galleryMoreIntro: 'Ces planches supplémentaires couvrent la vérification des sources, les transmissions, les décisions d’arrêt et la boucle de lecture. Ce sont des références facultatives, pas un second parcours.',
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

  const EVIDENCE_COPY = {
    en: { evidenceEyebrow: 'Evidence decision map', evidenceTitle: 'Let the record decide how far the claim can go.', evidenceIntro: 'This is the practical bridge between a plausible answer and a defensible conclusion: name the question, locate the source, observe what happened, choose a bounded decision, then stop when the next proof is missing.', evidenceAria: 'Five steps from a question to a bounded decision', evidenceCenter: 'Keep the claim checkable', evidenceCenterSub: 'one record at a time', evidenceSelected: 'Selected evidence step', evidenceNext: 'Next check', evidenceOpen: 'Open the evidence route', evidenceFallback: 'Read the evidence path as text', evidenceFallbackIntro: 'The same five steps remain available without the interactive map. Each step says what you can claim and what remains outside the record.', evidenceFigureAlt: 'Evidence path from a question to a source, an observation, a bounded decision, and a deliberate stop.', evidenceOpenVisual: 'Open the full evidence board', evidenceFigureCaption: 'Project-authored board; the interactive map and the ordered text carry the same meaning.', evidenceBoundary: 'The map is a reasoning aid. It does not prove that a source is correct, a tool ran, or a learner mastered the method.' },
    zh: { evidenceEyebrow: '证据决策图', evidenceTitle: '让记录决定结论能走多远。', evidenceIntro: '这条路线把“看起来合理的回答”和“可以站得住的结论”接起来：先说清问题，找到来源，观察实际发生了什么，再做有边界的决定；下一项证明缺失时就停下。', evidenceAria: '从问题到有边界决定的五个步骤', evidenceCenter: '让结论可以检查', evidenceCenterSub: '一次只看一份记录', evidenceSelected: '当前证据步骤', evidenceNext: '下一项检查', evidenceOpen: '打开证据路线', evidenceFallback: '按文字阅读证据路线', evidenceFallbackIntro: '不使用交互地图时，下面仍保留相同的五个步骤。每一步都说明可以提出什么结论，以及什么仍然超出记录范围。', evidenceFigureAlt: '从问题走向来源、观察结果、有边界的决定和有意停止的证据路线图。', evidenceOpenVisual: '打开完整证据图', evidenceFigureCaption: '项目原创图板；交互地图和下面的有序文字表达同一含义。', evidenceBoundary: '这张图是推理辅助，不证明来源正确、工具已经运行，或学习者已经掌握方法。' },
    es: { evidenceEyebrow: 'Mapa de decisión basada en pruebas', evidenceTitle: 'Deja que el registro marque hasta dónde llega la afirmación.', evidenceIntro: 'Este recorrido conecta una respuesta plausible con una conclusión defendible: formula la pregunta, localiza la fuente, observa lo ocurrido, toma una decisión acotada y detente cuando falte la siguiente prueba.', evidenceAria: 'Cinco pasos desde una pregunta hasta una decisión acotada', evidenceCenter: 'Mantén comprobable la afirmación', evidenceCenterSub: 'un registro cada vez', evidenceSelected: 'Paso de evidencia seleccionado', evidenceNext: 'Siguiente comprobación', evidenceOpen: 'Abrir el recorrido de evidencia', evidenceFallback: 'Leer el recorrido de evidencia como texto', evidenceFallbackIntro: 'Los mismos cinco pasos están disponibles sin el mapa interactivo. Cada uno indica qué puedes afirmar y qué queda fuera del registro.', evidenceFigureAlt: 'Recorrido de evidencia desde una pregunta hasta una fuente, una observación, una decisión acotada y una parada deliberada.', evidenceOpenVisual: 'Abrir el tablero completo de evidencia', evidenceFigureCaption: 'Tablero original del proyecto; el mapa interactivo y el texto ordenado expresan lo mismo.', evidenceBoundary: 'El mapa ayuda a razonar. No demuestra que una fuente sea correcta, que una herramienta se ejecutara ni que alguien dominara el método.' },
    ja: { evidenceEyebrow: '証拠から判断するマップ', evidenceTitle: '主張をどこまで広げられるかは、記録に決めてもらう。', evidenceIntro: 'もっともらしい回答を、根拠のある結論へつなぐ実践ルートです。問いを言葉にし、出典を特定し、実際に起きたことを観察し、範囲を区切って判断します。次の証拠がなければ停止します。', evidenceAria: '問いから範囲を区切った判断までの5段階', evidenceCenter: '主張を確認可能に保つ', evidenceCenterSub: '一度に1つの記録', evidenceSelected: '選択中の証拠段階', evidenceNext: '次の確認', evidenceOpen: '証拠のルートを開く', evidenceFallback: '証拠のルートをテキストで読む', evidenceFallbackIntro: 'インタラクティブなマップを使わなくても、同じ5段階を読めます。各段階で言えることと、記録の外に残ることを示します。', evidenceFigureAlt: '問いから出典、観察、範囲を区切った判断、意図した停止へ進む証拠ルート図。', evidenceOpenVisual: '証拠ボードを原寸で開く', evidenceFigureCaption: 'プロジェクト作成のボードです。インタラクティブなマップと順序付きテキストは同じ内容を示します。', evidenceBoundary: 'このマップは推論の補助です。出典の正しさ、ツールの実行、学習者の習得を証明するものではありません。' },
    ko: { evidenceEyebrow: '증거 기반 의사결정 지도', evidenceTitle: '주장이 어디까지 갈 수 있는지는 기록이 정하게 하세요.', evidenceIntro: '그럴듯한 답변을 근거 있는 결론으로 바꾸는 실전 경로입니다. 질문을 정하고, 출처를 찾고, 실제로 일어난 일을 관찰한 뒤 범위를 정한 결정을 내립니다. 다음 증거가 없으면 멈춥니다.', evidenceAria: '질문에서 범위가 정해진 결정까지의 다섯 단계', evidenceCenter: '주장을 확인 가능하게 유지하기', evidenceCenterSub: '한 번에 기록 하나', evidenceSelected: '선택한 증거 단계', evidenceNext: '다음 점검', evidenceOpen: '증거 경로 열기', evidenceFallback: '증거 경로를 텍스트로 읽기', evidenceFallbackIntro: '대화형 지도를 쓰지 않아도 같은 다섯 단계를 볼 수 있습니다. 각 단계에서 말할 수 있는 것과 기록 밖에 남는 것을 구분합니다.', evidenceFigureAlt: '질문에서 출처, 관찰, 범위가 정해진 결정과 의도적인 중지로 이어지는 증거 경로 그림.', evidenceOpenVisual: '전체 증거 보드 열기', evidenceFigureCaption: '프로젝트가 만든 보드입니다. 대화형 지도와 순서 목록은 같은 내용을 전달합니다.', evidenceBoundary: '이 지도는 추론을 돕는 자료입니다. 출처의 정확성, 도구 실행 또는 학습자의 숙련을 증명하지 않습니다.' },
    de: { evidenceEyebrow: 'Karte für belegte Entscheidungen', evidenceTitle: 'Lass den Beleg bestimmen, wie weit die Aussage reicht.', evidenceIntro: 'Diese Route verbindet eine plausible Antwort mit einer tragfähigen Aussage: Frage benennen, Quelle finden, Beobachtung prüfen, eine begrenzte Entscheidung treffen und anhalten, wenn der nächste Nachweis fehlt.', evidenceAria: 'Fünf Schritte von der Frage zur begrenzten Entscheidung', evidenceCenter: 'Die Aussage prüfbar halten', evidenceCenterSub: 'ein Beleg nach dem anderen', evidenceSelected: 'Ausgewählter Belegschritt', evidenceNext: 'Nächster Check', evidenceOpen: 'Belegroute öffnen', evidenceFallback: 'Die Belegroute als Text lesen', evidenceFallbackIntro: 'Ohne interaktive Karte bleiben dieselben fünf Schritte verfügbar. Jeder Schritt zeigt, was du behaupten kannst und was außerhalb des Belegs bleibt.', evidenceFigureAlt: 'Belegroute von einer Frage über Quelle und Beobachtung zu einer begrenzten Entscheidung und einem bewussten Stopp.', evidenceOpenVisual: 'Vollständige Belegtafel öffnen', evidenceFigureCaption: 'Projektbezogene Tafel; interaktive Karte und geordneter Text haben dieselbe Bedeutung.', evidenceBoundary: 'Die Karte unterstützt das Denken. Sie belegt weder die Richtigkeit einer Quelle noch eine Tool-Ausführung oder den Lernerfolg.' },
    'zh-tw': { evidenceEyebrow: '證據判斷圖', evidenceTitle: '讓紀錄決定主張可以走多遠。', evidenceIntro: '這條路線把「看起來合理的回答」接到「站得住腳的結論」：先說清楚問題，找到來源，觀察實際發生的事，再做有界線的判斷；下一項證據不足時就停止。', evidenceAria: '從問題到有界線判斷的五個步驟', evidenceCenter: '讓主張保持可檢查', evidenceCenterSub: '一次只看一份紀錄', evidenceSelected: '目前證據步驟', evidenceNext: '下一項檢查', evidenceOpen: '開啟證據路線', evidenceFallback: '依文字閱讀證據路線', evidenceFallbackIntro: '不使用互動地圖時，下面仍保留相同的五個步驟。每一步都說明可以提出什麼主張，以及哪些內容仍在紀錄之外。', evidenceFigureAlt: '從問題走向來源、觀察結果、有界線判斷與刻意停止的證據路線圖。', evidenceOpenVisual: '開啟完整證據圖', evidenceFigureCaption: '專案原創圖板；互動地圖與下方有序文字表達相同含義。', evidenceBoundary: '這張圖是推理輔助，不代表來源正確、工具已執行，或學習者已掌握方法。' },
    fr: { evidenceEyebrow: 'Carte de décision fondée sur les preuves', evidenceTitle: 'Laissez le relevé fixer la portée de l’affirmation.', evidenceIntro: 'Ce parcours relie une réponse plausible à une conclusion défendable : formuler la question, repérer la source, observer ce qui s’est réellement passé, prendre une décision délimitée, puis s’arrêter quand la preuve suivante manque.', evidenceAria: 'Cinq étapes, de la question à une décision délimitée', evidenceCenter: 'Garder l’affirmation vérifiable', evidenceCenterSub: 'un relevé à la fois', evidenceSelected: 'Étape de preuve sélectionnée', evidenceNext: 'Prochain contrôle', evidenceOpen: 'Ouvrir le parcours de preuve', evidenceFallback: 'Lire le parcours de preuve en texte', evidenceFallbackIntro: 'Les cinq mêmes étapes restent disponibles sans la carte interactive. Chacune précise ce que vous pouvez affirmer et ce qui reste hors du relevé.', evidenceFigureAlt: 'Parcours de preuve allant d’une question à une source, une observation, une décision délimitée et un arrêt délibéré.', evidenceOpenVisual: 'Ouvrir la planche complète des preuves', evidenceFigureCaption: 'Planche créée par le projet ; la carte interactive et la liste ordonnée portent le même sens.', evidenceBoundary: 'La carte aide à raisonner. Elle ne prouve ni la justesse d’une source, ni l’exécution d’un outil, ni l’apprentissage de la méthode.' },
  };
  Object.entries(EVIDENCE_COPY).forEach(([language, strings]) => Object.assign(COPY[language], strings));

  const JOURNEY_COPY = {
    en: { journeyEyebrow: 'Learning journey map', journeyTitle: 'See the whole Playbook before you choose a track.', journeyIntro: 'One map answers the first practical question: what should I do now, and what comes after the first checked result?', journeyAria: 'Four stages in the Playbook learning journey', journeyCenter: 'One checked route', journeyCenterSub: 'add the next layer only when useful', journeySelected: 'Selected stage', journeyNext: 'Next move', journeyOpen: 'Open this stage', journeyOpenVisual: 'Open the journey board', journeyFallback: 'Read the four stages as text', journeyFallbackIntro: 'Use this ordered list without the interactive map. Each stage names the work and the evidence boundary that follows it.', journeyBoundary: 'The map shows order, not mastery. Keep the artifact, evidence, limit, and next question.', journeyFigureAlt: 'Playbook learning journey from the Foundation Core to a first bounded task, an evidence loop, and optional tracks', journeyFigureCaption: 'Open the project-authored journey board for a printable view. The ordered list is the text explanation.' },
    zh: { journeyEyebrow: '完整学习旅程图', journeyTitle: '先看完整路线，再选择下一条实践路径。', journeyIntro: '这张地图回答第一个实际问题：现在该做什么，完成一次可检查的结果后又该去哪？', journeyAria: 'Playbook 学习旅程的四个阶段', journeyCenter: '一条可检查的路线', journeyCenterSub: '只有确实需要时才增加下一层', journeySelected: '当前阶段', journeyNext: '下一步', journeyOpen: '打开这一阶段', journeyOpenVisual: '打开旅程图', journeyFallback: '用文字阅读四个阶段', journeyFallbackIntro: '不使用交互地图也可以阅读这份有序列表。每个阶段都说明要做什么，以及接下来受什么证据边界约束。', journeyBoundary: '地图展示顺序，不代表掌握。请保留产物、证据、限制和下一个问题。', journeyFigureAlt: '从基础核心课到第一项有边界任务、证据闭环和可选路径的 Playbook 学习旅程图', journeyFigureCaption: '打开项目原创旅程图以查看适合打印的版本。有序列表才是文字解释。' },
    es: { journeyEyebrow: 'Mapa de la ruta de aprendizaje', journeyTitle: 'Mira el Playbook completo antes de elegir una ruta.', journeyIntro: 'Un mapa responde a la primera pregunta práctica: ¿qué hago ahora y qué viene después del primer resultado comprobado?', journeyAria: 'Las cuatro etapas de la ruta de aprendizaje del Playbook', journeyCenter: 'Un recorrido comprobable', journeyCenterSub: 'añade la siguiente capa solo si hace falta', journeySelected: 'Etapa seleccionada', journeyNext: 'Siguiente movimiento', journeyOpen: 'Abrir esta etapa', journeyOpenVisual: 'Abrir el mapa de aprendizaje', journeyFallback: 'Leer las cuatro etapas como texto', journeyFallbackIntro: 'Usa esta lista ordenada sin el mapa interactivo. Cada etapa nombra el trabajo y el límite de evidencia que le sigue.', journeyBoundary: 'El mapa muestra el orden, no el dominio. Conserva el artefacto, la evidencia, el límite y la siguiente pregunta.', journeyFigureAlt: 'Ruta de aprendizaje del Playbook: del núcleo de fundamentos a una tarea acotada, un ciclo de evidencia y rutas opcionales', journeyFigureCaption: 'Abre la tabla original del proyecto para verla en formato imprimible. La lista ordenada es la explicación textual.' },
    ja: { journeyEyebrow: '学習ルートマップ', journeyTitle: 'ルートを選ぶ前に、Playbook 全体の流れを見る。', journeyIntro: '最初の実用的な問い――今何をし、その後どこへ進むか――を1枚で確認できます。', journeyAria: 'Playbook 学習ルートの4段階', journeyCenter: '確認できる1本のルート', journeyCenterSub: '次の層は必要なときだけ加える', journeySelected: '選択中の段階', journeyNext: '次の一歩', journeyOpen: 'この段階を開く', journeyOpenVisual: '学習ルート図を開く', journeyFallback: '4段階をテキストで読む', journeyFallbackIntro: 'インタラクティブ表示なしでも、この順序付きリストを使えます。各段階で行うことと、その後の証拠の境界を示します。', journeyBoundary: '地図は順序を示すもので、習得を証明しません。成果物、証拠、限界、次の問いを残してください。', journeyFigureAlt: 'LLM 基礎コアから最初の範囲付きタスク、証拠のループ、任意の実践ルートへ進む Playbook 学習図', journeyFigureCaption: 'プロジェクト作成のルートボードを原寸で開けます。順序付きリストが文章による説明です。' },
    ko: { journeyEyebrow: '학습 여정 지도', journeyTitle: '경로를 고르기 전에 Playbook 전체 흐름을 보세요.', journeyIntro: '첫 번째 실용적인 질문인 “지금 무엇을 하고, 첫 점검 결과 다음에는 어디로 가는가?”를 한눈에 보여 줍니다.', journeyAria: 'Playbook 학습 여정의 네 단계', journeyCenter: '점검 가능한 하나의 경로', journeyCenterSub: '다음 계층은 필요할 때만 추가하기', journeySelected: '선택한 단계', journeyNext: '다음 단계', journeyOpen: '이 단계 열기', journeyOpenVisual: '학습 여정 보드 열기', journeyFallback: '네 단계를 텍스트로 읽기', journeyFallbackIntro: '대화형 지도 없이도 이 순서 목록을 사용할 수 있습니다. 각 단계에서 할 일과 이어지는 증거의 범위를 보여 줍니다.', journeyBoundary: '이 지도는 순서를 보여 줄 뿐 숙련을 증명하지 않습니다. 결과물, 증거, 한계와 다음 질문을 남기세요.', journeyFigureAlt: 'LLM 기초 코어에서 첫 번째 범위 있는 작업, 증거 루프와 선택 실습 경로로 이어지는 Playbook 학습 여정', journeyFigureCaption: '프로젝트가 만든 여정 보드를 인쇄용으로 열어 보세요. 순서 목록이 텍스트 설명입니다.' },
    de: { journeyEyebrow: 'Karte der Lernroute', journeyTitle: 'Sieh dir das ganze Playbook an, bevor du eine Route wählst.', journeyIntro: 'Eine Karte beantwortet die erste praktische Frage: Was mache ich jetzt, und was kommt nach dem ersten geprüften Ergebnis?', journeyAria: 'Die vier Stufen der Playbook-Lernroute', journeyCenter: 'Eine prüfbare Route', journeyCenterSub: 'die nächste Ebene nur bei Bedarf ergänzen', journeySelected: 'Ausgewählte Stufe', journeyNext: 'Nächster Schritt', journeyOpen: 'Diese Stufe öffnen', journeyOpenVisual: 'Lernrouten-Tafel öffnen', journeyFallback: 'Die vier Stufen als Text lesen', journeyFallbackIntro: 'Verwende diese geordnete Liste ohne die interaktive Karte. Jede Stufe nennt die Arbeit und die anschließende Beleggrenze.', journeyBoundary: 'Die Karte zeigt die Reihenfolge, nicht die Beherrschung. Bewahre Artefakt, Beleg, Grenze und nächste Frage auf.', journeyFigureAlt: 'Playbook-Lernroute vom LLM-Grundlagenkern über eine begrenzte Aufgabe und eine Belegschleife zu optionalen Routen', journeyFigureCaption: 'Öffne die projektbezogene Routentafel zum Drucken. Die geordnete Liste ist die Texterklärung.' },
    'zh-tw': { journeyEyebrow: '完整學習旅程圖', journeyTitle: '先看完整路線，再選擇下一條實踐路徑。', journeyIntro: '這張地圖回答第一個實際問題：現在該做什麼，完成一次可檢查的結果後又該去哪裡？', journeyAria: 'Playbook 學習旅程的四個階段', journeyCenter: '一條可檢查的路線', journeyCenterSub: '確實需要時才增加下一層', journeySelected: '目前階段', journeyNext: '下一步', journeyOpen: '開啟這個階段', journeyOpenVisual: '開啟學習旅程圖', journeyFallback: '用文字閱讀四個階段', journeyFallbackIntro: '不使用互動地圖也能閱讀這份有序清單。每個階段都說明要做什麼，以及接下來的證據界線。', journeyBoundary: '地圖展示順序，不代表掌握。請保留產物、證據、限制與下一個問題。', journeyFigureAlt: '從基礎核心課到第一項有界線任務、證據閉環與可選路徑的 Playbook 學習旅程圖', journeyFigureCaption: '開啟專案原創旅程圖以查看適合列印的版本。有序清單才是文字說明。' },
    fr: { journeyEyebrow: 'Carte du parcours d’apprentissage', journeyTitle: 'Voyez l’ensemble du Playbook avant de choisir une voie.', journeyIntro: 'Une seule carte répond à la première question pratique : que faire maintenant, puis où aller après le premier résultat vérifié ?', journeyAria: 'Les quatre étapes du parcours d’apprentissage du Playbook', journeyCenter: 'Un parcours vérifiable', journeyCenterSub: 'ajouter la couche suivante seulement si elle est utile', journeySelected: 'Étape sélectionnée', journeyNext: 'Prochaine étape', journeyOpen: 'Ouvrir cette étape', journeyOpenVisual: 'Ouvrir la carte du parcours', journeyFallback: 'Lire les quatre étapes en texte', journeyFallbackIntro: 'Utilisez cette liste ordonnée sans la carte interactive. Chaque étape indique le travail à faire et la limite de preuve qui suit.', journeyBoundary: 'La carte montre l’ordre, pas la maîtrise. Gardez l’artefact, les preuves, la limite et la prochaine question.', journeyFigureAlt: 'Parcours d’apprentissage du Playbook : du Foundation Core à une première tâche délimitée, une boucle de preuves et des parcours facultatifs', journeyFigureCaption: 'Ouvrez la planche originale du projet pour une version imprimable. La liste ordonnée est l’explication textuelle.' },
  };
  Object.entries(JOURNEY_COPY).forEach(([language, strings]) => Object.assign(COPY[language], strings));

  const CONCEPT_COPY = {
    en: { conceptEyebrow: 'Concept mind map', conceptTitle: 'Separate the six terms before you trust the answer.', conceptIntro: 'Token, context, context window, prompt, response, and tool or Agent are related, but they are not interchangeable. Select one term to see what it explains and what it still cannot prove.', conceptAria: 'Six LLM terms that lead to one checked result', conceptCenter: 'One checked result', conceptCenterSub: 'keep generation, action, and verification distinct', conceptSelected: 'Selected term', conceptNext: 'Next check', conceptOpenVisual: 'Open the full concept board', conceptFigureAlt: 'Six LLM terms leading to one checked result', conceptFigureCaption: 'Project-authored concept board. The selected term, ordered list, and source lesson carry the explanation; the image is an orientation aid.', conceptOpen: 'Open the foundation lesson', conceptFallback: 'Read the six terms as text', conceptFallbackIntro: 'The same six terms remain available as an ordered list. Use the list when the map or image is unavailable.', conceptBoundary: 'Response is not action, and action is not a verified result. Compare the result with a source, diff, test, log, or acceptance rule before claiming completion.' },
    zh: { conceptEyebrow: '概念思维导图', conceptTitle: '先分清六个术语，再判断回答能不能信。', conceptIntro: 'Token、上下文、上下文窗口、提示、回答，以及工具或 Agent 彼此相关，但不能互换。选择一个术语，查看它能解释什么，以及它仍然不能证明什么。', conceptAria: '通向一个可检查结果的六个 LLM 术语', conceptCenter: '一个可检查的结果', conceptCenterSub: '区分生成、行动与验证', conceptSelected: '当前术语', conceptNext: '下一项检查', conceptOpenVisual: '打开完整术语图', conceptFigureAlt: '六个 LLM 术语通向一个可检查的结果', conceptFigureCaption: '项目原创概念图。当前术语、有序列表和课程链接共同承担解释；图片本身只是定位辅助。', conceptOpen: '打开基础课程', conceptFallback: '按文字阅读六个术语', conceptFallbackIntro: '地图或图片无法使用时，下面的有序列表仍保留同样的六个术语。', conceptBoundary: '回答不等于行动，行动也不等于经过验证的结果。声称完成前，请用来源、差异、测试、日志或验收规则对照结果。' },
    es: { conceptEyebrow: 'Mapa conceptual', conceptTitle: 'Distingue los seis términos antes de fiarte de la respuesta.', conceptIntro: 'Token, contexto, ventana de contexto, prompt, respuesta y herramienta o agente están relacionados, pero no son intercambiables. Selecciona un término para ver qué explica y qué no puede demostrar por sí solo.', conceptAria: 'Seis términos de LLM que llevan a un resultado comprobado', conceptCenter: 'Un resultado comprobado', conceptCenterSub: 'separa generación, acción y verificación', conceptSelected: 'Término seleccionado', conceptNext: 'Siguiente comprobación', conceptOpenVisual: 'Abrir el mapa conceptual completo', conceptFigureAlt: 'Seis términos de LLM que llevan a un resultado comprobado', conceptFigureCaption: 'Mapa conceptual original del proyecto. El término seleccionado, la lista ordenada y la lección enlazada contienen la explicación; la imagen solo orienta.', conceptOpen: 'Abrir la lección de fundamentos', conceptFallback: 'Leer los seis términos como texto', conceptFallbackIntro: 'Si el mapa o la imagen no están disponibles, los mismos seis términos quedan en esta lista ordenada.', conceptBoundary: 'Una respuesta no es una acción, y una acción no es un resultado verificado. Antes de afirmar que terminaste, compara el resultado con una fuente, un diff, una prueba, un registro o un criterio de aceptación.' },
    ja: { conceptEyebrow: '概念マインドマップ', conceptTitle: '回答を信じる前に、6つの用語を切り分ける。', conceptIntro: 'Token、コンテキスト、コンテキストウィンドウ、プロンプト、応答、ツールまたは Agent は関係していますが、同じものではありません。用語を1つ選ぶと、何を説明でき、何をまだ証明できないかを確認できます。', conceptAria: '1つの確認できる結果につながる LLM の6用語', conceptCenter: '確認できる1つの結果', conceptCenterSub: '生成・操作・検証を分けて考える', conceptSelected: '選択中の用語', conceptNext: '次の確認', conceptOpenVisual: '概念図を原寸で開く', conceptFigureAlt: 'LLM の6用語から確認できる1つの結果へ進む図', conceptFigureCaption: 'プロジェクト作成の概念図です。選択中の用語、順序付きリスト、リンク先のレッスンが説明を担い、画像は位置づけを補助します。', conceptOpen: '基礎レッスンを開く', conceptFallback: '6つの用語をテキストで読む', conceptFallbackIntro: 'マップや画像が使えない場合も、同じ6つの用語を順序付きリストで読めます。', conceptBoundary: '応答は操作ではなく、操作は検証済みの結果ではありません。完了を主張する前に、出典、差分、テスト、ログ、受け入れ条件と結果を照合します。' },
    ko: { conceptEyebrow: '개념 마인드맵', conceptTitle: '답변을 믿기 전에 여섯 가지 용어부터 구분하세요.', conceptIntro: 'Token, 컨텍스트, 컨텍스트 창, 프롬프트, 응답, 도구 또는 Agent는 서로 관련 있지만 같은 뜻이 아닙니다. 용어 하나를 선택하면 무엇을 설명할 수 있고 무엇은 아직 증명할 수 없는지 확인할 수 있습니다.', conceptAria: '확인 가능한 결과 하나로 이어지는 LLM 여섯 용어', conceptCenter: '확인 가능한 결과 하나', conceptCenterSub: '생성·행동·검증을 구분하기', conceptSelected: '선택한 용어', conceptNext: '다음 점검', conceptOpenVisual: '전체 개념 보드 열기', conceptFigureAlt: 'LLM 여섯 용어에서 확인 가능한 결과 하나로 이어지는 그림', conceptFigureCaption: '프로젝트가 만든 개념 보드입니다. 선택한 용어, 순서 목록과 연결된 수업이 설명을 담당하고 그림은 방향을 잡는 데만 씁니다.', conceptOpen: '기초 수업 열기', conceptFallback: '여섯 용어를 텍스트로 읽기', conceptFallbackIntro: '지도나 그림을 사용할 수 없어도 같은 여섯 용어를 순서 목록으로 읽을 수 있습니다.', conceptBoundary: '응답은 행동이 아니며 행동도 검증된 결과가 아닙니다. 완료를 주장하기 전에 출처, diff, 테스트, 로그 또는 수용 기준과 결과를 비교하세요.' },
    de: { conceptEyebrow: 'Begriffs-Mindmap', conceptTitle: 'Trenne die sechs Begriffe, bevor du der Antwort vertraust.', conceptIntro: 'Token, Kontext, Kontextfenster, Prompt, Antwort und Tool oder Agent hängen zusammen, sind aber nicht austauschbar. Wähle einen Begriff, um zu sehen, was er erklärt und was er allein noch nicht belegen kann.', conceptAria: 'Sechs LLM-Begriffe führen zu einem geprüften Ergebnis', conceptCenter: 'Ein geprüftes Ergebnis', conceptCenterSub: 'Erzeugung, Handlung und Prüfung getrennt halten', conceptSelected: 'Ausgewählter Begriff', conceptNext: 'Nächster Check', conceptOpenVisual: 'Vollständige Begriffs-Mindmap öffnen', conceptFigureAlt: 'Sechs LLM-Begriffe führen zu einem geprüften Ergebnis', conceptFigureCaption: 'Projektbezogene Begriffs-Mindmap. Der ausgewählte Begriff, die geordnete Liste und die verknüpfte Lektion erklären den Inhalt; das Bild dient nur zur Orientierung.', conceptOpen: 'Grundlagenlektion öffnen', conceptFallback: 'Die sechs Begriffe als Text lesen', conceptFallbackIntro: 'Wenn Karte oder Bild nicht verfügbar sind, bleiben dieselben sechs Begriffe in dieser geordneten Liste erhalten.', conceptBoundary: 'Eine Antwort ist keine Handlung, und eine Handlung ist kein geprüftes Ergebnis. Vergleiche das Ergebnis vor einer Abschlussbehauptung mit Quelle, Diff, Test, Protokoll oder Abnahmeregel.' },
    'zh-tw': { conceptEyebrow: '概念心智圖', conceptTitle: '先分清六個術語，再判斷回應能不能信。', conceptIntro: 'Token、上下文、上下文視窗、提示、回應，以及工具或 Agent 彼此相關，但不能互換。選擇一個術語，查看它能解釋什麼，以及它仍然不能證明什麼。', conceptAria: '通往一個可檢查結果的六個 LLM 術語', conceptCenter: '一個可檢查的結果', conceptCenterSub: '區分生成、行動與驗證', conceptSelected: '目前術語', conceptNext: '下一項檢查', conceptOpenVisual: '開啟完整術語圖', conceptFigureAlt: '六個 LLM 術語通往一個可檢查的結果', conceptFigureCaption: '專案原創概念圖。目前術語、有序清單與課程連結共同承擔說明；圖片本身只是定位輔助。', conceptOpen: '開啟基礎課程', conceptFallback: '依文字閱讀六個術語', conceptFallbackIntro: '地圖或圖片無法使用時，下面的有序清單仍保留相同的六個術語。', conceptBoundary: '回應不等於行動，行動也不等於經過驗證的結果。聲稱完成前，請用來源、差異、測試、日誌或驗收規則對照結果。' },
    fr: { conceptEyebrow: 'Carte mentale des concepts', conceptTitle: 'Distinguez les six notions avant de faire confiance à la réponse.', conceptIntro: 'Token, contexte, fenêtre de contexte, prompt, réponse et outil ou Agent sont liés, mais ne sont pas interchangeables. Sélectionnez une notion pour voir ce qu’elle explique et ce qu’elle ne peut pas encore prouver seule.', conceptAria: 'Six notions LLM qui mènent à un résultat vérifié', conceptCenter: 'Un résultat vérifié', conceptCenterSub: 'séparer génération, action et vérification', conceptSelected: 'Notion sélectionnée', conceptNext: 'Prochain contrôle', conceptOpenVisual: 'Ouvrir la carte mentale complète', conceptFigureAlt: 'Six notions LLM menant à un résultat vérifié', conceptFigureCaption: 'Carte mentale créée par le projet. La notion sélectionnée, la liste ordonnée et la leçon liée portent l’explication ; l’image sert à se repérer.', conceptOpen: 'Ouvrir la leçon de base', conceptFallback: 'Lire les six notions en texte', conceptFallbackIntro: 'Si la carte ou l’image n’est pas disponible, les six mêmes notions restent accessibles dans cette liste ordonnée.', conceptBoundary: 'Une réponse n’est pas une action, et une action n’est pas un résultat vérifié. Avant de déclarer la tâche terminée, comparez le résultat à une source, un diff, un test, un journal ou un critère d’acceptation.' },
  };
  Object.entries(CONCEPT_COPY).forEach(([language, strings]) => Object.assign(COPY[language], strings));

  const ROUTE_COPY = {
    en: { routeEyebrow: 'A guided visual route', routeTitle: 'Know what each picture is for.', routeIntro: 'Follow the route from your purpose to a checked decision. Select a step to see what it explains, what to ask next, and where to continue.', routeAria: 'Eight steps in the visual route', routeSelected: 'Current visual step', routeNext: 'Next question', routeOpen: 'Jump to this section', routeFallback: 'Read the visual route as text', routeFallbackIntro: 'The same order remains available without JavaScript or pointer interaction.' },
    zh: { routeEyebrow: '视觉导览路线', routeTitle: '先知道每张图要解决什么问题。', routeIntro: '从你的目的走到一个可检查的决定。选择一个步骤，查看它解释什么、下一步该问什么，以及应该继续到哪里。', routeAria: '视觉导览路线的八个步骤', routeSelected: '当前视觉步骤', routeNext: '下一个问题', routeOpen: '跳到这部分', routeFallback: '按文字阅读视觉路线', routeFallbackIntro: '即使没有 JavaScript 或鼠标操作，也可以按同样顺序阅读。' },
    es: { routeEyebrow: 'Recorrido visual guiado', routeTitle: 'Entiende para qué sirve cada imagen.', routeIntro: 'Sigue el recorrido desde tu propósito hasta una decisión comprobable. Elige un paso para ver qué explica, qué preguntar después y dónde continuar.', routeAria: 'Ocho pasos del recorrido visual', routeSelected: 'Paso visual actual', routeNext: 'Siguiente pregunta', routeOpen: 'Ir a esta sección', routeFallback: 'Leer el recorrido visual como texto', routeFallbackIntro: 'El mismo orden está disponible sin JavaScript ni interacción con el puntero.' },
    ja: { routeEyebrow: '視覚ガイドの道筋', routeTitle: '各図が何のためにあるかを先に知る。', routeIntro: '目的から、確認できる判断までの道筋をたどります。段階を選ぶと、何を説明し、次に何を問い、どこへ進むかが分かります。', routeAria: '視覚ガイドの8段階', routeSelected: '現在の視覚ステップ', routeNext: '次の問い', routeOpen: 'このセクションへ移動', routeFallback: '視覚ルートをテキストで読む', routeFallbackIntro: 'JavaScript やポインター操作がなくても、同じ順序で読めます。' },
    ko: { routeEyebrow: '안내형 시각 경로', routeTitle: '각 그림이 무엇을 위한 것인지 먼저 확인하세요.', routeIntro: '목적에서 확인 가능한 결정까지 경로를 따라가세요. 단계를 선택하면 무엇을 설명하는지, 다음에 무엇을 물을지, 어디로 이어지는지 볼 수 있습니다.', routeAria: '시각 경로의 여덟 단계', routeSelected: '현재 시각 단계', routeNext: '다음 질문', routeOpen: '이 섹션으로 이동', routeFallback: '시각 경로를 텍스트로 읽기', routeFallbackIntro: 'JavaScript나 포인터 조작 없이도 같은 순서로 읽을 수 있습니다.' },
    de: { routeEyebrow: 'Geführte visuelle Route', routeTitle: 'Verstehe zuerst, wofür jedes Bild da ist.', routeIntro: 'Folge dem Weg von deinem Zweck zu einer prüfbaren Entscheidung. Wähle eine Stufe, um Erklärung, nächste Frage und Anschluss zu sehen.', routeAria: 'Acht Schritte der visuellen Route', routeSelected: 'Aktueller visueller Schritt', routeNext: 'Nächste Frage', routeOpen: 'Zu diesem Abschnitt springen', routeFallback: 'Die visuelle Route als Text lesen', routeFallbackIntro: 'Dieselbe Reihenfolge bleibt ohne JavaScript und Zeigerbedienung verfügbar.' },
    'zh-tw': { routeEyebrow: '視覺導覽路線', routeTitle: '先了解每張圖要解決什麼問題。', routeIntro: '從你的目的走到一個可檢查的判斷。選擇一個步驟，查看它說明什麼、下一步要問什麼，以及應該繼續到哪裡。', routeAria: '視覺導覽路線的八個步驟', routeSelected: '目前視覺步驟', routeNext: '下一個問題', routeOpen: '跳到這個區段', routeFallback: '依文字閱讀視覺路線', routeFallbackIntro: '即使沒有 JavaScript 或指標操作，也能依相同順序閱讀。' },
    fr: { routeEyebrow: 'Parcours visuel guidé', routeTitle: 'Sachez à quoi sert chaque image.', routeIntro: 'Suivez le parcours, de votre objectif jusqu’à une décision vérifiable. Sélectionnez une étape pour voir ce qu’elle explique, la question suivante et la suite du parcours.', routeAria: 'Huit étapes du parcours visuel', routeSelected: 'Étape visuelle actuelle', routeNext: 'Question suivante', routeOpen: 'Aller à cette section', routeFallback: 'Lire le parcours visuel en texte', routeFallbackIntro: 'Le même ordre reste disponible sans JavaScript ni interaction avec le pointeur.' },
  };
  Object.entries(ROUTE_COPY).forEach(([language, strings]) => Object.assign(COPY[language], strings));

  const BOUNDARY_COPY = {
    en: { boundaryEyebrow: 'Action boundary map', boundaryTitle: 'A proposal is not proof that an action happened.', boundaryIntro: 'Follow one request through the layers that can be checked: a model proposes words, the host decides authority, a tool may run, a person reads the result, and evidence sets the claim limit.', boundaryAria: 'Five layers between a model proposal and a checked claim', boundaryCenter: 'Keep layers separate', boundaryCenterSub: 'proposal is not execution', boundarySelected: 'Selected boundary', boundaryNext: 'Next check', boundaryOpen: 'Open the action-boundary lesson', boundaryFallback: 'Read the five boundary layers as text', boundaryFallbackIntro: 'Use the ordered list if the interaction is unavailable. Each layer names what can be observed and what it still cannot prove.', boundaryOpenVisual: 'Open the full action-boundary board', boundaryFigureAlt: 'Action boundary board separating model proposal, host authorization, tool execution and human read-back', boundaryFigureCaption: 'The project-authored board names four observable layers. This route makes the final evidence check explicit; neither view proves a runtime event.', boundaryBoundary: "If a receipt is missing, keep the claim small. A model's wording cannot establish host permission, tool execution, or correctness." },
    zh: { boundaryEyebrow: '行动边界图', boundaryTitle: '模型提出行动，不等于行动真的发生。', boundaryIntro: '沿着一次请求走过几个可检查的层次：模型提出文字，主机决定权限，工具可能执行，人读取结果，证据决定结论能走多远。', boundaryAria: '从模型提议到可检查结论之间的五个层次', boundaryCenter: '分开这些层次', boundaryCenterSub: '提议不等于执行', boundarySelected: '当前边界层', boundaryNext: '下一项检查', boundaryOpen: '打开行动边界课程', boundaryFallback: '按文字阅读五个边界层次', boundaryFallbackIntro: '如果交互不可用，就按下面的有序列表阅读。每一层都说明可以观察什么，以及仍然不能证明什么。', boundaryOpenVisual: '打开完整的行动边界图', boundaryFigureAlt: '区分模型提议、主机授权、工具执行和人工回读的行动边界教学图', boundaryFigureCaption: '项目原创图板呈现四个可观察层次；这条路线把最后的证据检查单独写出来。两者都不能证明运行时事件确实发生。', boundaryBoundary: '没有回执时，把结论说小。模型的措辞不能证明主机授权、工具执行或结果正确。' },
    es: { boundaryEyebrow: 'Mapa de límites de acción', boundaryTitle: 'Que el modelo proponga una acción no significa que haya ocurrido.', boundaryIntro: 'Sigue una petición por las capas que se pueden comprobar: el modelo propone palabras, el entorno anfitrión decide la autorización, una herramienta puede ejecutarse, una persona lee el resultado y la evidencia limita la afirmación.', boundaryAria: 'Cinco capas entre una propuesta del modelo y una afirmación comprobada', boundaryCenter: 'Mantén separadas las capas', boundaryCenterSub: 'propuesta no es ejecución', boundarySelected: 'Límite seleccionado', boundaryNext: 'Siguiente comprobación', boundaryOpen: 'Abrir la lección sobre límites de acción', boundaryFallback: 'Leer las cinco capas del límite como texto', boundaryFallbackIntro: 'Si la interacción no está disponible, usa la lista ordenada. Cada capa indica qué se puede observar y qué no demuestra por sí sola.', boundaryOpenVisual: 'Abrir el tablero completo de límites de acción', boundaryFigureAlt: 'Tablero de límites de acción que separa la propuesta del modelo, la autorización del entorno, la ejecución de la herramienta y la comprobación humana', boundaryFigureCaption: 'El tablero original del proyecto nombra cuatro capas observables. Este recorrido hace explícita la comprobación final de la evidencia; ninguna de las dos vistas demuestra un evento de ejecución.', boundaryBoundary: 'Si falta el registro, limita la afirmación. Las palabras del modelo no demuestran autorización del entorno, ejecución de la herramienta ni corrección.' },
    ja: { boundaryEyebrow: 'アクション境界マップ', boundaryTitle: 'モデルが行動を提案しても、実行されたとは限らない。', boundaryIntro: '1つの依頼を、確認できる層に分けて追います。モデルは言葉を提案し、ホストが権限を決め、ツールが動くことがあり、人が結果を読み返し、証拠が主張の範囲を決めます。', boundaryAria: 'モデルの提案から確認可能な主張までの5つの層', boundaryCenter: '層を混同しない', boundaryCenterSub: '提案は実行ではない', boundarySelected: '選択中の境界', boundaryNext: '次の確認', boundaryOpen: 'アクション境界のレッスンを開く', boundaryFallback: '5つの境界をテキストで読む', boundaryFallbackIntro: '操作できない場合は、順序付きリストを使ってください。各層で確認できることと、それだけでは証明できないことを示します。', boundaryOpenVisual: 'アクション境界ボードを原寸で開く', boundaryFigureAlt: 'モデルの提案、ホストの権限、ツールの実行、人による読み返しを分けるアクション境界ボード', boundaryFigureCaption: 'プロジェクト作成のボードは、観察できる4つの層を示します。このルートでは最後の証拠確認を明示しています。どちらも実行イベントそのものを証明するものではありません。', boundaryBoundary: '記録がなければ、主張を小さく保ちます。モデルの文言だけでは、ホストの権限、ツールの実行、結果の正しさは確認できません。' },
    ko: { boundaryEyebrow: '행동 경계 지도', boundaryTitle: '모델이 행동을 제안했다고 해서 실제로 실행된 것은 아닙니다.', boundaryIntro: '하나의 요청을 확인 가능한 층으로 나눠 따라갑니다. 모델은 문장을 제안하고, 호스트가 권한을 정하고, 도구가 실행될 수 있으며, 사람이 결과를 다시 읽고, 증거가 주장의 범위를 제한합니다.', boundaryAria: '모델 제안과 확인 가능한 주장 사이의 다섯 단계', boundaryCenter: '각 단계를 분리하기', boundaryCenterSub: '제안은 실행이 아닙니다', boundarySelected: '선택한 경계', boundaryNext: '다음 점검', boundaryOpen: '행동 경계 수업 열기', boundaryFallback: '다섯 경계를 텍스트로 읽기', boundaryFallbackIntro: '상호작용을 사용할 수 없으면 순서 목록을 읽으세요. 각 단계는 관찰할 수 있는 것과 그 단계만으로 증명할 수 없는 것을 구분합니다.', boundaryOpenVisual: '행동 경계 보드 전체 열기', boundaryFigureAlt: '모델 제안, 호스트 권한, 도구 실행과 사람의 결과 확인을 분리한 행동 경계 보드', boundaryFigureCaption: '프로젝트가 만든 보드는 관찰 가능한 네 단계를 보여 줍니다. 이 경로는 마지막 증거 점검을 별도로 드러냅니다. 어느 쪽도 런타임 이벤트 자체를 증명하지는 않습니다.', boundaryBoundary: '기록이 없으면 주장을 작게 유지하세요. 모델의 문장만으로 호스트 권한, 도구 실행 또는 결과의 정확성을 증명할 수 없습니다.' },
    de: { boundaryEyebrow: 'Landkarte der Aktionsgrenzen', boundaryTitle: 'Ein Handlungsvorschlag des Modells bedeutet nicht, dass die Handlung ausgeführt wurde.', boundaryIntro: 'Verfolge eine Anfrage durch prüfbare Ebenen: Das Modell schlägt Worte vor, der Host entscheidet über die Berechtigung, ein Tool kann laufen, ein Mensch liest das Ergebnis zurück, und die Belege begrenzen die Aussage.', boundaryAria: 'Fünf Ebenen zwischen einem Modellvorschlag und einer prüfbaren Aussage', boundaryCenter: 'Ebenen getrennt halten', boundaryCenterSub: 'Vorschlag ist keine Ausführung', boundarySelected: 'Ausgewählte Grenze', boundaryNext: 'Nächster Check', boundaryOpen: 'Lektion zu Aktionsgrenzen öffnen', boundaryFallback: 'Die fünf Ebenen als Text lesen', boundaryFallbackIntro: 'Wenn die Interaktion nicht verfügbar ist, nutze die geordnete Liste. Jede Ebene zeigt, was beobachtbar ist und was sie allein nicht belegen kann.', boundaryOpenVisual: 'Die vollständige Karte der Aktionsgrenzen öffnen', boundaryFigureAlt: 'Karte der Aktionsgrenzen: Modellvorschlag, Host-Berechtigung, Tool-Ausführung und menschliches Zurücklesen getrennt', boundaryFigureCaption: 'Die vom Projekt erstellte Tafel zeigt vier beobachtbare Ebenen. Dieser Weg macht die abschließende Belegprüfung ausdrücklich. Keine der beiden Ansichten beweist ein Laufzeitereignis.', boundaryBoundary: 'Wenn ein Beleg fehlt, halte die Aussage klein. Modellworte belegen weder Host-Berechtigung noch Tool-Ausführung oder Korrektheit.' },
    'zh-tw': { boundaryEyebrow: '行動界線圖', boundaryTitle: '模型提出行動，不代表行動真的發生。', boundaryIntro: '沿著一個請求，逐層檢查：模型提出文字，主機決定權限，工具可能執行，人重新核對結果，證據則限制主張能走多遠。', boundaryAria: '從模型提議到可檢查主張之間的五個層次', boundaryCenter: '把各層分開', boundaryCenterSub: '提議不等於執行', boundarySelected: '目前界線層', boundaryNext: '下一項檢查', boundaryOpen: '開啟行動界線課程', boundaryFallback: '依文字閱讀五個界線層次', boundaryFallbackIntro: '如果互動功能無法使用，請閱讀下面的有序清單。每一層都說明能觀察到什麼，以及單靠它仍不能證明什麼。', boundaryOpenVisual: '開啟完整的行動界線圖', boundaryFigureAlt: '區分模型提議、主機授權、工具執行與人工核對結果的行動界線教學圖', boundaryFigureCaption: '專案原創圖板呈現四個可觀察層次；這條路線把最後的證據檢查明確分開。兩者都不能證明執行事件確實發生。', boundaryBoundary: '沒有紀錄時，把主張說小。模型的措辭不能證明主機授權、工具執行或結果正確。' },
    fr: { boundaryEyebrow: 'Carte des limites d’action', boundaryTitle: 'Une action proposée par le modèle n’est pas une action exécutée.', boundaryIntro: 'Suivez une demande à travers les couches que l’on peut vérifier : le modèle propose des mots, l’hôte décide de l’autorité, un outil peut s’exécuter, une personne relit le résultat et les preuves limitent la portée de l’affirmation.', boundaryAria: 'Cinq couches entre une proposition du modèle et une affirmation vérifiable', boundaryCenter: 'Garder les couches séparées', boundaryCenterSub: 'une proposition n’est pas une exécution', boundarySelected: 'Limite sélectionnée', boundaryNext: 'Prochain contrôle', boundaryOpen: 'Ouvrir la leçon sur les limites d’action', boundaryFallback: 'Lire les cinq couches en texte', boundaryFallbackIntro: 'Si l’interaction n’est pas disponible, utilisez la liste ordonnée. Chaque couche précise ce qui est observable et ce qu’elle ne peut pas prouver à elle seule.', boundaryOpenVisual: 'Ouvrir la planche complète sur les limites d’action', boundaryFigureAlt: 'Planche sur les limites d’action séparant la proposition du modèle, l’autorisation de l’hôte, l’exécution de l’outil et la relecture humaine', boundaryFigureCaption: 'La planche créée par le projet nomme quatre couches observables. Ce parcours rend explicite le contrôle final des preuves ; aucune des deux vues ne prouve un événement d’exécution.', boundaryBoundary: 'S’il manque un relevé, limitez l’affirmation. Les mots du modèle ne prouvent ni l’autorisation de l’hôte, ni l’exécution de l’outil, ni la justesse du résultat.' },
  };
  Object.entries(BOUNDARY_COPY).forEach(([language, strings]) => Object.assign(COPY[language], strings));

  const READING_LOOP_COPY = {
    en: {
      readingEyebrow: 'Page-to-practice loop', readingTitle: 'Turn one page into one checked attempt.', readingIntro: 'Use the page in order: name the problem, find the concept, try one bounded action, inspect the record, state the boundary, and transfer the method to a changed task.', readingAria: 'Six steps from a page to a checked attempt', readingCenter: 'One page, one attempt', readingCenterSub: 'read → try → check', readingSelected: 'Selected reading step', readingNext: 'Next question', readingOpen: 'Open the matching lesson', readingFallback: 'Read the page-to-practice loop as text', readingFallbackIntro: 'The same six steps remain available as an ordered list. Follow the links only after you can name the next question.', readingOpenVisual: 'Open the page-to-practice board', readingFigureAlt: 'Six-stage page-to-practice reading loop: problem, concept, action, evidence, boundary, transfer', readingFigureCaption: 'Project-authored reading loop. The board is a memory aid; the page text and your own record remain the basis for any claim.', readingBoundary: 'A completed reading loop is not proof of mastery. Keep the attempt, result, and unknowns visible.'
    },
    zh: {
      readingEyebrow: '从页面到实践的闭环', readingTitle: '把一页内容变成一次可检查的尝试。', readingIntro: '按顺序使用页面：说清问题，找到概念，做一次有边界的行动，检查记录，说明边界，再把方法迁移到变化后的任务。', readingAria: '从一页内容到一次可检查尝试的六个步骤', readingCenter: '一页，一次尝试', readingCenterSub: '阅读 → 尝试 → 检查', readingSelected: '当前阅读步骤', readingNext: '下一个问题', readingOpen: '打开对应课程', readingFallback: '按文字阅读从页面到实践的闭环', readingFallbackIntro: '无法交互时，下面的有序列表仍保留同样的六步。先说清下一个问题，再打开链接。', readingOpenVisual: '打开页面到实践图', readingFigureAlt: '从页面到实践的六步阅读闭环：问题、概念、行动、证据、边界、迁移', readingFigureCaption: '项目原创阅读闭环图。图示帮助记忆结构；真正支撑结论的仍是页面文字和你自己的记录。', readingBoundary: '走完阅读闭环不等于已经掌握方法。请保留尝试、结果和未知项。'
    },
    es: {
      readingEyebrow: 'Del texto a la práctica', readingTitle: 'Convierte una página en un intento comprobable.', readingIntro: 'Lee la página en orden: nombra el problema, encuentra el concepto, prueba una acción acotada, inspecciona el registro, declara el límite y transfiere el método a una tarea distinta.', readingAria: 'Seis pasos desde una página hasta un intento comprobable', readingCenter: 'Una página, un intento', readingCenterSub: 'leer → probar → comprobar', readingSelected: 'Paso de lectura seleccionado', readingNext: 'Siguiente pregunta', readingOpen: 'Abrir la lección correspondiente', readingFallback: 'Leer como texto el ciclo del texto a la práctica', readingFallbackIntro: 'Los mismos seis pasos quedan disponibles en una lista ordenada. Abre los enlaces solo después de formular la siguiente pregunta.', readingOpenVisual: 'Abrir el tablero del texto a la práctica', readingFigureAlt: 'Ciclo de lectura en seis etapas: problema, concepto, acción, evidencia, límite y transferencia', readingFigureCaption: 'Ciclo de lectura original del proyecto. El tablero ayuda a recordar; la página y tu propio registro sustentan cualquier afirmación.', readingBoundary: 'Completar el ciclo no demuestra dominio. Conserva el intento, el resultado y lo que sigue sin saberse.'
    },
    ja: {
      readingEyebrow: 'ページから実践へ', readingTitle: '1ページを、確認できる1回の試行に変える。', readingIntro: 'ページを順に使います。問題を言葉にし、概念を見つけ、範囲を区切って行動し、記録を確認し、境界を示し、条件を変えた課題へ方法を転用します。', readingAria: '1ページから確認できる試行までの6段階', readingCenter: '1ページ、1回の試行', readingCenterSub: '読む → 試す → 確認する', readingSelected: '選択中の読解ステップ', readingNext: '次の問い', readingOpen: '対応するレッスンを開く', readingFallback: 'ページから実践への流れをテキストで読む', readingFallbackIntro: '操作できない場合も、同じ6段階を順序付きリストで読めます。次の問いを言葉にしてからリンクを開いてください。', readingOpenVisual: 'ページから実践へのボードを開く', readingFigureAlt: '問題、概念、行動、証拠、境界、転用からなる6段階の読解ループ', readingFigureCaption: 'プロジェクト作成の読解ループです。ボードは記憶の補助であり、主張の根拠は本文と自分の記録です。', readingBoundary: '読解ループを完了しても、習得の証明にはなりません。試行、結果、不明点を残してください。'
    },
    ko: {
      readingEyebrow: '페이지에서 실천까지', readingTitle: '페이지 하나를 확인 가능한 시도 하나로 바꾸세요.', readingIntro: '페이지를 순서대로 사용하세요. 문제를 정하고, 개념을 찾고, 범위가 분명한 행동을 하나 시도하고, 기록을 점검하고, 한계를 밝힌 뒤, 조건을 바꾼 작업에 방법을 전이합니다.', readingAria: '페이지에서 확인 가능한 시도까지의 여섯 단계', readingCenter: '페이지 하나, 시도 하나', readingCenterSub: '읽기 → 시도 → 점검', readingSelected: '선택한 읽기 단계', readingNext: '다음 질문', readingOpen: '해당 수업 열기', readingFallback: '페이지에서 실천까지의 흐름을 텍스트로 읽기', readingFallbackIntro: '상호작용이 없어도 같은 여섯 단계를 순서 목록으로 볼 수 있습니다. 다음 질문을 먼저 정한 뒤 링크를 여세요.', readingOpenVisual: '페이지에서 실천까지의 보드 열기', readingFigureAlt: '문제, 개념, 행동, 증거, 한계와 전이로 이루어진 여섯 단계 읽기 루프', readingFigureCaption: '프로젝트가 만든 읽기 루프입니다. 보드는 기억을 돕는 자료이고, 주장의 근거는 본문과 직접 남긴 기록입니다.', readingBoundary: '읽기 루프를 끝냈다고 숙련이 증명되는 것은 아닙니다. 시도, 결과와 미확인 사항을 남기세요.'
    },
    de: {
      readingEyebrow: 'Von der Seite zur Praxis', readingTitle: 'Mach aus einer Seite einen prüfbaren Versuch.', readingIntro: 'Arbeite die Seite in dieser Reihenfolge durch: Problem benennen, Begriff finden, eine begrenzte Handlung testen, den Beleg prüfen, die Grenze nennen und die Methode auf eine veränderte Aufgabe übertragen.', readingAria: 'Sechs Schritte von einer Seite zu einem prüfbaren Versuch', readingCenter: 'Eine Seite, ein Versuch', readingCenterSub: 'lesen → testen → prüfen', readingSelected: 'Ausgewählter Leseschritt', readingNext: 'Nächste Frage', readingOpen: 'Passende Lektion öffnen', readingFallback: 'Den Weg von der Seite zur Praxis als Text lesen', readingFallbackIntro: 'Dieselben sechs Schritte stehen als geordnete Liste bereit. Öffne die Links erst, wenn du die nächste Frage formuliert hast.', readingOpenVisual: 'Die Tafel von der Seite zur Praxis öffnen', readingFigureAlt: 'Sechsstufige Leseschleife: Problem, Begriff, Handlung, Beleg, Grenze und Übertragung', readingFigureCaption: 'Vom Projekt erstellte Leseschleife. Die Tafel dient als Merkhilfe; Text und eigener Beleg tragen die Aussage.', readingBoundary: 'Eine abgeschlossene Leseschleife beweist keine Beherrschung. Bewahre Versuch, Ergebnis und offene Fragen.'
    },
    'zh-tw': {
      readingEyebrow: '從頁面到實踐的閉環', readingTitle: '把一頁內容變成一次可檢查的嘗試。', readingIntro: '依序使用頁面：說清楚問題，找出概念，做一次有界線的行動，檢查紀錄，說明界線，再把方法遷移到有所變化的任務。', readingAria: '從一頁內容到一次可檢查嘗試的六個步驟', readingCenter: '一頁，一次嘗試', readingCenterSub: '閱讀 → 嘗試 → 檢查', readingSelected: '目前閱讀步驟', readingNext: '下一個問題', readingOpen: '開啟對應課程', readingFallback: '依文字閱讀從頁面到實踐的閉環', readingFallbackIntro: '無法互動時，下面的有序清單仍保留相同的六步。先說清楚下一個問題，再開啟連結。', readingOpenVisual: '開啟頁面到實踐圖', readingFigureAlt: '從頁面到實踐的六步閱讀閉環：問題、概念、行動、證據、界線、遷移', readingFigureCaption: '專案原創的閱讀閉環圖。圖示只協助記憶結構；真正支撐主張的仍是頁面文字與你自己的紀錄。', readingBoundary: '走完閱讀閉環不等於已經掌握方法。請保留嘗試、結果與未知項目。'
    },
    fr: {
      readingEyebrow: 'De la page à la pratique', readingTitle: 'Transformer une page en un essai vérifiable.', readingIntro: 'Suivez la page dans l’ordre : nommer le problème, trouver le concept, tenter une action délimitée, inspecter le relevé, énoncer la limite, puis transférer la méthode à une tâche différente.', readingAria: 'Six étapes pour passer d’une page à un essai vérifiable', readingCenter: 'Une page, un essai', readingCenterSub: 'lire → essayer → vérifier', readingSelected: 'Étape de lecture sélectionnée', readingNext: 'Prochaine question', readingOpen: 'Ouvrir la leçon correspondante', readingFallback: 'Lire en texte le parcours de la page à la pratique', readingFallbackIntro: 'Les six mêmes étapes restent disponibles dans une liste ordonnée. Ouvrez les liens seulement après avoir formulé la prochaine question.', readingOpenVisual: 'Ouvrir la planche de la page à la pratique', readingFigureAlt: 'Boucle de lecture en six étapes : problème, concept, action, preuves, limite et transfert', readingFigureCaption: 'Boucle de lecture créée par le projet. La planche aide à mémoriser ; le texte et votre propre relevé fondent toute affirmation.', readingBoundary: 'Terminer la boucle de lecture ne prouve pas la maîtrise. Conservez l’essai, le résultat et les points inconnus.'
    },
  };
  Object.entries(READING_LOOP_COPY).forEach(([language, strings]) => Object.assign(COPY[language], strings));

  const VISUAL_ROUTE_STEPS = [
    { id: 'purpose', section: 'visual-goal', labels: { en: 'Choose a purpose', zh: '选择一个目的', es: 'Elegir un propósito', ja: '目的を選ぶ', ko: '목적 고르기', de: 'Einen Zweck wählen', 'zh-tw': '選擇一個目的', fr: 'Choisir un objectif' }, bodies: { en: 'Start with why you came: a safe first task, an uncertain result, a claim to verify, or a method to reuse.', zh: '先说清楚你为什么来：安全的第一项任务、不确定的结果、需要核验的结论，或想复用的方法。', es: 'Empieza por tu motivo: una primera tarea segura, un resultado incierto, una afirmación que comprobar o un método que reutilizar.', ja: 'まず来た理由を選びます。安全な最初のタスク、不確かな結果、確認したい主張、再利用したい方法のいずれかです。', ko: '왜 왔는지부터 고르세요. 안전한 첫 작업, 불확실한 결과, 확인할 주장 또는 재사용할 방법 중 하나입니다.', de: 'Beginne mit deinem Anlass: eine sichere erste Aufgabe, ein unsicheres Ergebnis, eine zu prüfende Aussage oder eine wiederverwendbare Methode.', 'zh-tw': '先說清楚你為什麼來：安全的第一項任務、不確定的結果、需要核對的主張，或想重複使用的方法。', fr: 'Commencez par votre besoin : une première tâche sûre, un résultat incertain, une affirmation à vérifier ou une méthode à réutiliser.' }, next: { en: 'Which small outcome do I need?', zh: '我需要哪项小结果？', es: '¿Qué resultado pequeño necesito?', ja: '必要な小さな結果は何か？', ko: '어떤 작은 결과가 필요한가?', de: 'Welches kleine Ergebnis brauche ich?', 'zh-tw': '我需要哪個小結果？', fr: 'De quel petit résultat ai-je besoin ?' } },
    { id: 'order', section: 'visual-journey', labels: { en: 'See the order', zh: '看清顺序', es: 'Ver el orden', ja: '順序を見る', ko: '순서 보기', de: 'Die Reihenfolge sehen', 'zh-tw': '看清順序', fr: 'Voir l’ordre' }, bodies: { en: 'The foundation comes first. Platform tracks are optional layers added after a checked first route, not competing starting points.', zh: '基础核心先开始。平台路径是完成第一条可检查路线后再增加的可选层，不是互相竞争的起点。', es: 'El núcleo de fundamentos va primero. Las rutas de plataforma son capas opcionales después de un primer recorrido comprobado, no puntos de partida rivales.', ja: '最初は基礎コアです。プラットフォーム別のルートは、最初の確認できる道筋の後に必要に応じて加える層であり、競合する入口ではありません。', ko: '기초 코어가 먼저입니다. 플랫폼 경로는 첫 번째 확인 가능한 경로 뒤에 필요할 때 추가하는 선택 계층이지, 서로 경쟁하는 시작점이 아닙니다.', de: 'Der Grundlagenkern kommt zuerst. Plattformrouten sind optionale Ebenen nach einer geprüften ersten Route, keine konkurrierenden Einstiege.', 'zh-tw': '先從基礎核心開始。平台路線是在完成第一條可檢查路線後才增加的選用層，不是彼此競爭的起點。', fr: 'Le Foundation Core vient d’abord. Les parcours de plateforme sont des couches facultatives après une première route vérifiée, pas des points de départ concurrents.' }, next: { en: 'Am I still on the foundation route?', zh: '我还在基础路线中吗？', es: '¿Sigo en el recorrido de fundamentos?', ja: 'まだ基礎ルートにいるか？', ko: '아직 기초 경로에 있는가?', de: 'Bin ich noch auf der Grundlagenroute?', 'zh-tw': '我還在基礎路線中嗎？', fr: 'Suis-je encore sur le parcours de base ?' } },
    { id: 'terms', section: 'visual-concept', labels: { en: 'Separate the terms', zh: '分清术语', es: 'Separar los términos', ja: '用語を分ける', ko: '용어 구분하기', de: 'Begriffe trennen', 'zh-tw': '分清術語', fr: 'Distinguer les notions' }, bodies: { en: 'Token, context, prompt, response, and tool authority describe different things. Fluency does not turn one into another.', zh: 'Token、上下文、提示、回答和工具权限分别描述不同的事。语言流畅不会把其中一个变成另一个。', es: 'Token, contexto, prompt, respuesta y autoridad de herramienta describen cosas distintas. La fluidez no convierte una en otra.', ja: 'Token、コンテキスト、プロンプト、応答、ツール権限は別のものです。流暢さだけで、それらが同じになるわけではありません。', ko: 'Token, 컨텍스트, 프롬프트, 응답과 도구 권한은 서로 다른 것을 설명합니다. 유창하다고 같은 것이 되지는 않습니다.', de: 'Token, Kontext, Prompt, Antwort und Tool-Berechtigung bezeichnen Verschiedenes. Sprachliche Glätte macht daraus nicht dasselbe.', 'zh-tw': 'Token、上下文、提示、回應與工具權限分別描述不同的事。語句流暢不會讓其中一項變成另一項。', fr: 'Token, contexte, prompt, réponse et autorité de l’outil désignent des choses différentes. La fluidité ne les rend pas interchangeables.' }, next: { en: 'What can this term actually establish?', zh: '这个术语实际上能证明什么？', es: '¿Qué puede establecer realmente este término?', ja: 'この用語だけで何を確認できるか？', ko: '이 용어만으로 무엇을 확인할 수 있는가?', de: 'Was kann dieser Begriff tatsächlich belegen?', 'zh-tw': '這個術語實際能證明什麼？', fr: 'Que peut réellement établir cette notion ?' } },
    { id: 'boundary', section: 'visual-action-boundary', labels: { en: 'Check the action boundary', zh: '检查行动边界', es: 'Comprobar el límite de acción', ja: 'アクションの境界を確認する', ko: '행동 경계 확인하기', de: 'Die Aktionsgrenze prüfen', 'zh-tw': '檢查行動界線', fr: 'Vérifier la limite d’action' }, bodies: { en: 'Separate a model proposal, host authority, tool execution, human read-back, and evidence before claiming that anything happened.', zh: '在说某件事已经发生前，分开模型提议、主机权限、工具执行、人工回读和证据。', es: 'Antes de afirmar que algo ocurrió, separa la propuesta del modelo, la autoridad del entorno, la ejecución de la herramienta, la comprobación humana y la evidencia.', ja: '何かが起きたと主張する前に、モデルの提案、ホストの権限、ツールの実行、人による読み返し、証拠を分けます。', ko: '무언가 실행됐다고 말하기 전에 모델 제안, 호스트 권한, 도구 실행, 사람의 결과 확인과 증거를 분리합니다.', de: 'Bevor du behauptest, dass etwas passiert ist, trenne Modellvorschlag, Host-Berechtigung, Tool-Ausführung, menschliches Zurücklesen und Belege.', 'zh-tw': '在主張某件事已經發生前，分開模型提議、主機權限、工具執行、人工核對與證據。', fr: 'Avant d’affirmer qu’une action a eu lieu, séparez la proposition du modèle, l’autorité de l’hôte, l’exécution de l’outil, la relecture humaine et les preuves.' }, next: { en: 'Which layer can I actually observe?', zh: '我实际能观察到哪一层？', es: '¿Qué capa puedo observar realmente?', ja: '実際に観察できる層はどれか？', ko: '실제로 관찰할 수 있는 단계는 무엇인가?', de: 'Welche Ebene kann ich tatsächlich beobachten?', 'zh-tw': '我實際能觀察到哪一層？', fr: 'Quelle couche puis-je réellement observer ?' } },
    { id: 'loop', section: 'visual-map', labels: { en: 'Follow the work loop', zh: '跟着工作闭环走', es: 'Seguir el ciclo de trabajo', ja: '作業ループをたどる', ko: '작업 루프 따라가기', de: 'Der Arbeitsschleife folgen', 'zh-tw': '跟著工作閉環走', fr: 'Suivre la boucle de travail' }, bodies: { en: 'Understand, frame, act, inspect, repair, and transfer. Each stage has a different question and evidence boundary.', zh: '理解、框定、行动、检查、修正和迁移。每个阶段都有不同的问题和证据边界。', es: 'Entender, delimitar, actuar, inspeccionar, reparar y transferir. Cada etapa tiene una pregunta y un límite de evidencia distintos.', ja: '理解、枠決め、実行、確認、修正、転用の順に進みます。各段階には別の問いと証拠の境界があります。', ko: '이해하고, 범위를 정하고, 실행하고, 점검하고, 고치고, 전이합니다. 각 단계에는 다른 질문과 증거의 경계가 있습니다.', de: 'Verstehen, abgrenzen, handeln, prüfen, reparieren und übertragen. Jede Stufe hat eine eigene Frage und Beleggrenze.', 'zh-tw': '理解、框定、行動、檢查、修正與遷移。每個階段都有不同的問題與證據界線。', fr: 'Comprendre, délimiter, agir, inspecter, réparer et transférer. Chaque étape a sa propre question et sa limite de preuve.' }, next: { en: 'What evidence follows this action?', zh: '这项行动之后有什么证据？', es: '¿Qué evidencia sigue a esta acción?', ja: 'この行動の後にどんな証拠が残るか？', ko: '이 행동 뒤에 어떤 증거가 남는가?', de: 'Welcher Beleg folgt auf diese Handlung?', 'zh-tw': '這項行動之後有什麼證據？', fr: 'Quelle preuve suit cette action ?' } },
    { id: 'decision', section: 'visual-evidence', labels: { en: 'Decide from the record', zh: '根据记录作决定', es: 'Decidir a partir del registro', ja: '記録から判断する', ko: '기록으로 판단하기', de: 'Aus dem Beleg entscheiden', 'zh-tw': '根據紀錄作判斷', fr: 'Décider à partir du relevé' }, bodies: { en: 'Name the question, locate the source, observe the result, choose a bounded decision, and stop when the next proof is missing.', zh: '说清问题，找到来源，观察结果，做出有边界的决定；下一项证明缺失时就停止。', es: 'Formula la pregunta, localiza la fuente, observa el resultado, toma una decisión acotada y detente si falta la prueba siguiente.', ja: '問いを定め、出典を特定し、結果を観察し、範囲を区切って判断します。次の証拠がなければ止まります。', ko: '질문을 정하고 출처를 찾고 결과를 관찰한 뒤 범위가 정해진 결정을 내립니다. 다음 증거가 없으면 멈춥니다.', de: 'Frage benennen, Quelle finden, Ergebnis beobachten, begrenzt entscheiden und anhalten, wenn der nächste Nachweis fehlt.', 'zh-tw': '說清楚問題，找到來源，觀察結果，做出有界線的判斷；下一項證據不足時就停止。', fr: 'Formulez la question, repérez la source, observez le résultat, prenez une décision délimitée et arrêtez-vous si la preuve suivante manque.' }, next: { en: 'What does the record actually support?', zh: '这份记录实际支持什么？', es: '¿Qué respalda realmente el registro?', ja: '記録は実際に何を支えているか？', ko: '이 기록이 실제로 뒷받침하는 것은 무엇인가?', de: 'Was stützt der Beleg tatsächlich?', 'zh-tw': '這份紀錄實際支持什麼？', fr: 'Que soutient réellement le relevé ?' } },
    { id: 'examples', section: 'visual-gallery', labels: { en: 'Browse one decision', zh: '查看一个决定', es: 'Ver una decisión', ja: '1つの判断を見る', ko: '결정 하나 살펴보기', de: 'Eine Entscheidung ansehen', 'zh-tw': '查看一個判斷', fr: 'Voir une décision' }, bodies: { en: 'Open one teaching board and its matching lesson. The gallery is a set of examples, not a second catalogue to wander through.', zh: '打开一张教学图和对应课程。图库是一组示例，不是另一份让你漫游的目录。', es: 'Abre un tablero y su lección correspondiente. La galería reúne ejemplos; no es un segundo catálogo para recorrer sin rumbo.', ja: '教材ボードと対応するレッスンを1つ開きます。ギャラリーは例の集まりであり、目的なく巡る別のカタログではありません。', ko: '교육 보드 하나와 연결된 수업을 여세요. 갤러리는 예시 모음이지 목적 없이 돌아다니는 두 번째 목록이 아닙니다.', de: 'Öffne eine Lehrtafel und die passende Lektion. Die Galerie ist eine Beispielsammlung, kein zweiter Katalog zum ziellosen Stöbern.', 'zh-tw': '開啟一張教學圖與對應課程。圖庫是一組範例，不是另一份讓你漫無目的瀏覽的目錄。', fr: 'Ouvrez une planche et la leçon correspondante. La galerie rassemble des exemples ; ce n’est pas un second catalogue où se perdre.' }, next: { en: 'Which decision does this board clarify?', zh: '这张图解释哪项决定？', es: '¿Qué decisión aclara este tablero?', ja: 'このボードはどの判断を明らかにするか？', ko: '이 보드는 어떤 결정을 설명하는가?', de: 'Welche Entscheidung klärt diese Tafel?', 'zh-tw': '這張圖說明哪個判斷？', fr: 'Quelle décision cette planche clarifie-t-elle ?' } },
    { id: 'read', section: 'visual-how', labels: { en: 'Read the board correctly', zh: '正确阅读图板', es: 'Leer bien el tablero', ja: 'ボードを正しく読む', ko: '보드 올바르게 읽기', de: 'Die Tafel richtig lesen', 'zh-tw': '正確閱讀圖板', fr: 'Lire correctement la planche' }, bodies: { en: 'Start with the thesis, use the text fallback, make one bounded move, and keep what the picture cannot prove visible.', zh: '先看主旨，打开文字回退，做一次有边界的行动，并保留这张图无法证明的部分。', es: 'Empieza por la tesis, abre la alternativa textual, haz un movimiento acotado y mantén visible lo que la imagen no puede demostrar.', ja: '主旨を確認し、テキストの代替を読み、範囲を区切った操作を1つ行い、図だけでは証明できないことを残します。', ko: '핵심을 먼저 보고 텍스트 대체 설명을 연 다음 범위 있는 행동을 하나 시도하고 그림만으로 증명할 수 없는 것을 남겨 두세요.', de: 'Beginne mit der These, öffne die Textalternative, mache eine begrenzte Handlung und halte sichtbar, was das Bild nicht belegen kann.', 'zh-tw': '先看主旨，開啟文字替代說明，做一次有界線的行動，並保留這張圖無法證明的部分。', fr: 'Commencez par la thèse, lisez l’alternative textuelle, faites une action délimitée et gardez visible ce que l’image ne peut pas prouver.' }, next: { en: 'What does the picture still not prove?', zh: '这张图仍然不能证明什么？', es: '¿Qué no demuestra todavía la imagen?', ja: 'この図だけでは何が証明できないか？', ko: '이 그림만으로 아직 증명할 수 없는 것은 무엇인가?', de: 'Was belegt das Bild weiterhin nicht?', 'zh-tw': '這張圖仍然不能證明什麼？', fr: 'Que l’image ne prouve-t-elle toujours pas ?' } },
    { id: 'practice', section: 'visual-reading-loop', labels: { en: 'Read one page into practice', zh: '把一页内容读到实践', es: 'Llevar una página a la práctica', ja: '1ページを実践につなげる', ko: '페이지 하나를 실천으로 옮기기', de: 'Eine Seite in die Praxis bringen', 'zh-tw': '把一頁內容讀到實踐', fr: 'Passer d’une page à la pratique' }, bodies: { en: 'Move through problem, concept, action, evidence, boundary, and transfer so the page gives you one checked attempt instead of another random click.', zh: '按问题、概念、行动、证据、边界和迁移走完一遍，让页面带来一次可检查的尝试，而不是又一次无目的点击。', es: 'Pasa por problema, concepto, acción, evidencia, límite y transferencia para que la página produzca un intento comprobable, no otro clic al azar.', ja: '問題、概念、行動、証拠、境界、転用を順にたどり、目的のないクリックではなく、確認できる1回の試行につなげます。', ko: '문제, 개념, 행동, 증거, 한계와 전이를 차례로 거쳐 무작위 클릭이 아니라 확인 가능한 시도 하나를 만드세요.', de: 'Gehe über Problem, Begriff, Handlung, Beleg, Grenze und Übertragung, damit die Seite zu einem prüfbaren Versuch statt zu einem weiteren ziellosen Klick führt.', 'zh-tw': '依序走過問題、概念、行動、證據、界線與遷移，讓頁面帶來一次可檢查的嘗試，而不是又一次無目的的點擊。', fr: 'Parcourez le problème, le concept, l’action, les preuves, la limite et le transfert pour obtenir un essai vérifiable plutôt qu’un clic de plus au hasard.' }, next: { en: 'What is the smallest attempt I can keep and inspect?', zh: '我能保留并检查的最小尝试是什么？', es: '¿Cuál es el intento más pequeño que puedo conservar e inspeccionar?', ja: '残して確認できる最小の試行は何か？', ko: '보존하고 점검할 수 있는 가장 작은 시도는 무엇인가?', de: 'Welchen kleinsten Versuch kann ich aufbewahren und prüfen?', 'zh-tw': '我能保留並檢查的最小嘗試是什麼？', fr: 'Quel est le plus petit essai que je puisse conserver et inspecter ?' } },
  ];

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

  const JOURNEY_STAGES = [
    {
      id: 'foundation', path: 'book/routes/universal-core-foundations',
      labels: { en: 'Foundation Core', zh: '基础核心课', es: 'Núcleo de fundamentos', ja: 'LLM 基礎コア', ko: 'LLM 기초 코어', de: 'LLM-Grundlagenkern', 'zh-tw': '基礎核心課', fr: 'Foundation Core' },
      bodies: { en: 'Understand the model, make one request, recognize visible failures, repair, and try a new task.', zh: '理解模型，提出一次请求，识别看得见的失败，修正结果，再在新任务上重做。', es: 'Entiende el modelo, haz una petición, reconoce fallos visibles, repara el resultado y repite en una tarea nueva.', ja: 'モデルを理解し、1つ依頼し、目に見える失敗を見つけ、修正して、新しい課題で試します。', ko: '모델을 이해하고 요청 하나를 만든 뒤, 눈에 보이는 실패를 찾아 고치고 새 작업에서 다시 시도합니다.', de: 'Verstehe das Modell, stelle eine Anfrage, erkenne sichtbare Fehler, repariere das Ergebnis und probiere eine neue Aufgabe.', 'zh-tw': '理解模型、提出一次請求、辨識看得見的失敗、修正結果，再在新任務上重做。', fr: 'Comprendre le modèle, formuler une demande, repérer les erreurs visibles, corriger, puis essayer une nouvelle tâche.' },
      next: { en: 'Finish the foundation before adding a platform-specific layer.', zh: '在增加平台专属层之前，先完成基础核心课。', es: 'Completa el núcleo antes de añadir una capa específica de plataforma.', ja: 'プラットフォーム固有の層を加える前に、まず基礎コアを終える。', ko: '플랫폼별 계층을 추가하기 전에 기초 코어를 먼저 끝내세요.', de: 'Schließe den Grundlagenkern ab, bevor du eine plattformspezifische Ebene ergänzt.', 'zh-tw': '在增加平台專屬層之前，先完成基礎核心課。', fr: 'Terminez le Foundation Core avant d’ajouter une couche propre à une plateforme.' },
    },
    {
      id: 'task', path: 'book/chapters/02-first-safe-task',
      labels: { en: 'First bounded task', zh: '第一项有边界任务', es: 'Primera tarea acotada', ja: '最初の範囲付きタスク', ko: '첫 번째 범위 있는 작업', de: 'Erste begrenzte Aufgabe', 'zh-tw': '第一項有界線的任務', fr: 'Première tâche délimitée' },
      bodies: { en: 'Name the result, context, allowed help, limits, check, and stop condition.', zh: '写清结果、上下文、允许的帮助、限制、检查方式和停止条件。', es: 'Nombra el resultado, el contexto, la ayuda permitida, los límites, la comprobación y la condición de parada.', ja: '結果、コンテキスト、許可する支援、制約、確認方法、停止条件を明示します。', ko: '결과, 맥락, 허용된 도움, 제한, 점검 방법과 중지 조건을 적습니다.', de: 'Benenne Ergebnis, Kontext, erlaubte Hilfe, Grenzen, Prüfung und Stop-Bedingung.', 'zh-tw': '寫清楚結果、上下文、允許的協助、限制、檢查方式與停止條件。', fr: 'Nommer le résultat, le contexte, l’aide autorisée, les limites, la vérification et la condition d’arrêt.' },
      next: { en: 'Make the request bounded before choosing tools or permissions.', zh: '在选择工具或权限之前，先把请求限定清楚。', es: 'Delimita la petición antes de elegir herramientas o permisos.', ja: 'ツールや権限を選ぶ前に、依頼の範囲を決める。', ko: '도구나 권한을 고르기 전에 요청 범위를 정하세요.', de: 'Begrenze die Anfrage, bevor du Tools oder Berechtigungen auswählst.', 'zh-tw': '在選擇工具或權限之前，先把請求限定清楚。', fr: 'Délimitez la demande avant de choisir des outils ou des autorisations.' },
    },
    {
      id: 'evidence', path: 'book/chapters/09-verification-and-recovery',
      labels: { en: 'Evidence loop', zh: '证据闭环', es: 'Ciclo de evidencia', ja: '証拠のループ', ko: '증거 루프', de: 'Belegschleife', 'zh-tw': '證據閉環', fr: 'Boucle de preuves' },
      bodies: { en: 'Compare what changed with a source, test, log, or acceptance rule; stop when proof is missing.', zh: '用来源、测试、日志或验收规则对照变化；缺少下一项证明时就停止。', es: 'Compara el cambio con una fuente, prueba, registro o regla de aceptación; detente si falta la siguiente prueba.', ja: '変更を出典、テスト、ログ、受け入れ条件と照合し、次の証拠がなければ止まります。', ko: '변경 사항을 출처, 테스트, 로그 또는 수용 기준과 비교하고 다음 증거가 없으면 멈춥니다.', de: 'Vergleiche die Änderung mit Quelle, Test, Log oder Abnahmeregel; stoppe, wenn der nächste Beleg fehlt.', 'zh-tw': '用來源、測試、日誌或驗收規則對照變化；缺少下一項證明時就停止。', fr: 'Comparer le changement à une source, un test, un journal ou un critère d’acceptation ; s’arrêter si la prochaine preuve manque.' },
      next: { en: 'Keep the claim within the evidence; stop if the next proof is missing.', zh: '让结论留在证据范围内；缺少下一项证明时就停止。', es: 'Mantén la afirmación dentro de la evidencia; detente si falta la siguiente prueba.', ja: '主張を証拠の範囲に保ち、次の根拠がなければ止まる。', ko: '주장을 증거의 범위 안에 두고, 다음 증거가 없으면 멈추세요.', de: 'Halte die Aussage innerhalb des Belegs; fehlt der nächste Beleg, halte an.', 'zh-tw': '讓主張留在證據範圍內；缺少下一項證明時就停止。', fr: 'Gardez l’affirmation dans les limites des preuves ; s’il manque la preuve suivante, arrêtez-vous.' },
    },
    {
      id: 'tracks', path: 'book/chapters/05-choose-the-codex-surface',
      labels: { en: 'Optional tracks', zh: '可选实践路径', es: 'Rutas opcionales', ja: '任意の実践ルート', ko: '선택 실습 경로', de: 'Optionale Routen', 'zh-tw': '可選實踐路徑', fr: 'Parcours facultatifs' },
      bodies: { en: 'Choose Codex, tools, Skills, Agents, research, engineering, or team practice only when the next layer is useful.', zh: '只有在确实需要下一层时，才选择 Codex、工具、Skill、Agent、研究、工程或团队实践。', es: 'Elige Codex, herramientas, Skills, agentes, investigación, ingeniería o práctica de equipo solo cuando la siguiente capa te sea útil.', ja: '次の層が必要なときだけ、Codex、ツール、Skill、Agent、調査、開発、チーム実践を選びます。', ko: '다음 층이 필요할 때만 Codex, 도구, Skill, Agent, 조사, 엔지니어링 또는 팀 실습을 고르세요.', de: 'Wähle Codex, Tools, Skills, Agents, Recherche, Engineering oder Teampraxis erst, wenn die nächste Ebene nützlich ist.', 'zh-tw': '只有在確實需要下一層時，才選擇 Codex、工具、Skill、Agent、研究、工程或團隊實踐。', fr: 'Choisir Codex, les outils, les Skills, les Agents, la recherche, l’ingénierie ou le travail d’équipe seulement si l’étape suivante est utile.' },
      next: { en: 'Choose an optional track only when a concrete next task needs it.', zh: '只有具体的下一项任务确实需要时，才选择可选路径。', es: 'Elige una ruta opcional solo cuando una tarea concreta la necesite.', ja: '具体的な次の課題に必要なときだけ、任意のルートを選ぶ。', ko: '구체적인 다음 작업에 필요할 때만 선택 실습 경로를 고르세요.', de: 'Wähle eine optionale Route erst, wenn eine konkrete nächste Aufgabe sie braucht.', 'zh-tw': '只有具體的下一項任務確實需要時，才選擇可選路徑。', fr: 'Choisissez un parcours facultatif seulement si une tâche concrète en a besoin.' },
    },
  ];

  const EVIDENCE_STEPS = [
    {
      id: 'question', path: 'book/chapters/15-research-track',
      labels: { en: 'Question', zh: '问题', es: 'Pregunta', ja: '問い', ko: '질문', de: 'Frage', 'zh-tw': '問題', fr: 'Question' },
      bodies: { en: 'Name the decision before you search. A broad topic is not yet a checkable question.', zh: '先说清楚要做什么决定。宽泛主题还不是一个可以检查的问题。', es: 'Nombra la decisión antes de buscar. Un tema amplio todavía no es una pregunta comprobable.', ja: '検索する前に、どの判断をするのかを言葉にします。広いテーマだけでは確認できる問いになりません。', ko: '검색하기 전에 어떤 결정을 내릴지 정하세요. 넓은 주제만으로는 확인 가능한 질문이 되지 않습니다.', de: 'Benenne die Entscheidung vor der Suche. Ein breites Thema ist noch keine prüfbare Frage.', 'zh-tw': '搜尋前先說清楚要做什麼判斷。寬泛主題還不是可以檢查的問題。', fr: 'Formulez la décision avant de chercher. Un thème général ne constitue pas encore une question vérifiable.' },
      next: { en: 'What decision would this evidence change?', zh: '哪项决定会被这条证据改变？', es: '¿Qué decisión cambiaría con esta evidencia?', ja: 'この証拠でどの判断が変わるか？', ko: '이 증거로 어떤 결정이 달라지는가?', de: 'Welche Entscheidung würde dieser Beleg ändern?', 'zh-tw': '哪一項判斷會被這份證據改變？', fr: 'Quelle décision cette preuve pourrait-elle changer ?' },
    },
    {
      id: 'source', path: 'book/labs/lab-008-research-question',
      labels: { en: 'Source', zh: '来源', es: 'Fuente', ja: '出典', ko: '출처', de: 'Quelle', 'zh-tw': '來源', fr: 'Source' },
      bodies: { en: 'Name the owner, location, date, version, and boundary of the source before relying on it.', zh: '依赖来源前，写清负责人、位置、日期、版本和来源边界。', es: 'Antes de apoyarte en ella, anota responsable, ubicación, fecha, versión y límites de la fuente.', ja: '頼る前に、出典の責任者、場所、日付、版、適用範囲を記録します。', ko: '출처를 근거로 삼기 전에 담당자, 위치, 날짜, 버전과 범위를 적습니다.', de: 'Halte Eigentümer, Fundort, Datum, Version und Grenze der Quelle fest, bevor du dich darauf stützt.', 'zh-tw': '依賴來源前，寫清楚負責人、位置、日期、版本與來源界線。', fr: 'Notez le responsable, l’emplacement, la date, la version et la limite de la source avant de vous y fier.' },
      next: { en: 'Can I locate the exact passage?', zh: '我能定位到原文的具体位置吗？', es: '¿Puedo localizar el pasaje exacto?', ja: '該当箇所を特定できるか？', ko: '정확한 문장을 찾을 수 있는가?', de: 'Kann ich die genaue Stelle finden?', 'zh-tw': '我能定位到原文的具體位置嗎？', fr: 'Puis-je localiser le passage exact ?' },
    },
    {
      id: 'observe', path: 'book/chapters/09-verification-and-recovery',
      labels: { en: 'Observe', zh: '观察', es: 'Observación', ja: '観察', ko: '관찰', de: 'Beobachtung', 'zh-tw': '觀察', fr: 'Observation' },
      bodies: { en: 'Read the page, diff, test, log, or response. Do not infer an event you did not observe.', zh: '读取页面、差异、测试、日志或回答。没有观察到的事件，不能靠推测补出来。', es: 'Lee la página, el diff, la prueba, el registro o la respuesta. No infieras un evento que no hayas observado.', ja: 'ページ、差分、テスト、ログ、回答を読みます。観察していない出来事を推測で補いません。', ko: '페이지, diff, 테스트, 로그 또는 응답을 읽으세요. 관찰하지 않은 사건을 추정하지 마세요.', de: 'Lies Seite, Diff, Test, Protokoll oder Antwort. Schließe nicht auf ein Ereignis, das du nicht beobachtet hast.', 'zh-tw': '讀取頁面、差異、測試、日誌或回應。沒有觀察到的事件，不能靠推測補出來。', fr: 'Lisez la page, le diff, le test, le journal ou la réponse. N’inférez pas un événement que vous n’avez pas observé.' },
      next: { en: 'What happened in the record, not in the story?', zh: '记录里实际发生了什么，而不是故事里说了什么？', es: '¿Qué ocurrió en el registro, más allá del relato?', ja: '物語ではなく、記録には何が残っているか？', ko: '설명이 아니라 기록에서 실제로 무엇이 일어났는가?', de: 'Was steht im Beleg, nicht in der Erzählung?', 'zh-tw': '紀錄裡實際發生了什麼，而不是故事裡說了什麼？', fr: 'Que montre le relevé, plutôt que le récit ?' },
    },
    {
      id: 'decide', path: 'book/labs/lab-015-evidence-delivery',
      labels: { en: 'Decide', zh: '决定', es: 'Decisión', ja: '判断', ko: '판단', de: 'Entscheidung', 'zh-tw': '判斷', fr: 'Décision' },
      bodies: { en: 'Keep the claim supported when the check matches; otherwise mark it candidate, unknown, or out of scope.', zh: '检查匹配时保留有证据支持的结论；否则标为 candidate、unknown 或超出范围。', es: 'Mantén la afirmación como respaldada si la comprobación encaja; si no, márcala como candidate, unknown o fuera de alcance.', ja: '確認結果が一致するなら根拠ありとして残し、そうでなければ candidate、unknown、範囲外に分けます。', ko: '점검 결과가 맞으면 근거 있는 주장으로 남기고, 아니면 candidate, unknown 또는 범위 밖으로 표시하세요.', de: 'Lass die Aussage bei passender Prüfung belegt; sonst kennzeichne sie als candidate, unknown oder außerhalb des Umfangs.', 'zh-tw': '檢查相符時保留有證據支持的主張；否則標為 candidate、unknown 或超出範圍。', fr: 'Gardez l’affirmation étayée si le contrôle concorde ; sinon, classez-la candidate, unknown ou hors périmètre.' },
      next: { en: 'What is the strongest label the record permits?', zh: '这份记录允许的最强标签是什么？', es: '¿Cuál es la etiqueta más fuerte que permite el registro?', ja: 'この記録で許される最も強いラベルは何か？', ko: '이 기록이 허용하는 가장 강한 상태 표시는 무엇인가?', de: 'Welche stärkste Einstufung erlaubt der Beleg?', 'zh-tw': '這份紀錄允許的最強標籤是什麼？', fr: 'Quelle est la qualification la plus forte permise par le relevé ?' },
    },
    {
      id: 'stop', path: 'book/chapters/12-agent-loop-and-stop',
      labels: { en: 'Stop', zh: '停止', es: 'Parada', ja: '停止', ko: '중지', de: 'Stopp', 'zh-tw': '停止', fr: 'Arrêt' },
      bodies: { en: 'When the next proof is missing, stop and record the smallest safe next check. Preserve the unknown.', zh: '下一项证明缺失时，停下并记录最小的安全检查，同时保留未知项。', es: 'Si falta la siguiente prueba, detente y registra la comprobación segura más pequeña. Conserva lo desconocido.', ja: '次の証拠がなければ停止し、最小限で安全な次の確認を記録します。不明点を残します。', ko: '다음 증거가 없으면 멈추고 가장 작고 안전한 다음 점검을 기록하세요. 모르는 부분을 남기세요.', de: 'Wenn der nächste Nachweis fehlt, halte an und notiere den kleinsten sicheren nächsten Check. Bewahre das Unbekannte.', 'zh-tw': '下一項證據不足時，停下並記錄最小且安全的下一項檢查，同時保留未知之處。', fr: 'Quand la preuve suivante manque, arrêtez-vous et notez le plus petit contrôle sûr à faire ensuite. Préservez l’inconnu.' },
      next: { en: 'What remains unknown, and who can authorize the next step?', zh: '什么仍然未知，谁能授权下一步？', es: '¿Qué sigue sin saberse y quién puede autorizar la siguiente etapa?', ja: '何が不明で、次の段階を誰が承認できるか？', ko: '무엇이 여전히 미확인이고 다음 단계를 승인할 수 있는 사람은 누구인가?', de: 'Was bleibt unbekannt, und wer darf den nächsten Schritt freigeben?', 'zh-tw': '什麼仍然未知，誰能授權下一步？', fr: 'Qu’est-ce qui reste inconnu et qui peut autoriser la suite ?' },
    },
  ];

  const READING_LOOP_STEPS = [
    {
      id: 'problem', path: 'book/guides/llm-fundamentals',
      labels: { en: 'Name the problem', zh: '说清问题', es: 'Nombrar el problema', ja: '問題を言葉にする', ko: '문제 정하기', de: 'Das Problem benennen', 'zh-tw': '說清楚問題', fr: 'Nommer le problème' },
      bodies: { en: 'Write the concrete question before you browse or ask for a solution.', zh: '在浏览或寻求解决方案前，先写下具体问题。', es: 'Escribe la pregunta concreta antes de navegar o pedir una solución.', ja: '調べたり解決策を求めたりする前に、具体的な問いを書きます。', ko: '찾아보거나 해결책을 요청하기 전에 구체적인 질문을 적으세요.', de: 'Schreibe die konkrete Frage auf, bevor du suchst oder nach einer Lösung fragst.', 'zh-tw': '在瀏覽或尋求解決方案前，先寫下具體問題。', fr: 'Écrivez la question concrète avant de chercher ou de demander une solution.' },
      next: { en: 'What would count as a small, observable result?', zh: '什么算是一个小而可观察的结果？', es: '¿Qué sería un resultado pequeño y observable?', ja: '小さく、観察できる結果とは何か？', ko: '작고 관찰 가능한 결과란 무엇인가?', de: 'Was wäre ein kleines, beobachtbares Ergebnis?', 'zh-tw': '什麼算是一個小而可觀察的結果？', fr: 'Qu’est-ce qui constituerait un petit résultat observable ?' },
    },
    {
      id: 'concept', path: 'book/chapters/01-gpt-and-codex',
      labels: { en: 'Find the concept', zh: '找到概念', es: 'Encontrar el concepto', ja: '概念を見つける', ko: '개념 찾기', de: 'Den Begriff finden', 'zh-tw': '找出概念', fr: 'Trouver le concept' },
      bodies: { en: 'Locate the distinction or rule that explains the problem; do not skip straight to a tool.', zh: '找到能解释问题的区别或规则；不要直接跳到工具。', es: 'Localiza la distinción o regla que explica el problema; no saltes directamente a una herramienta.', ja: '問題を説明する区別やルールを見つけます。すぐにツールへ飛ばしません。', ko: '문제를 설명하는 구분이나 규칙을 찾으세요. 곧바로 도구로 넘어가지 마세요.', de: 'Finde die Unterscheidung oder Regel, die das Problem erklärt; springe nicht direkt zu einem Tool.', 'zh-tw': '找出能解釋問題的區別或規則；不要直接跳到工具。', fr: 'Repérez la distinction ou la règle qui explique le problème ; ne passez pas directement à un outil.' },
      next: { en: 'Which idea changes what I will do?', zh: '哪个概念会改变我的行动？', es: '¿Qué idea cambia lo que voy a hacer?', ja: 'どの考え方が行動を変えるか？', ko: '어떤 개념이 내 행동을 바꾸는가?', de: 'Welche Idee verändert mein Vorgehen?', 'zh-tw': '哪個概念會改變我的行動？', fr: 'Quelle idée change ce que je vais faire ?' },
    },
    {
      id: 'action', path: 'book/chapters/03-task-protocol',
      labels: { en: 'Try one bounded move', zh: '尝试一次有边界的行动', es: 'Probar una acción acotada', ja: '範囲を区切って試す', ko: '범위가 정해진 행동 하나 시도하기', de: 'Eine begrenzte Handlung testen', 'zh-tw': '嘗試一次有界線的行動', fr: 'Tenter une action délimitée' },
      bodies: { en: 'Make the smallest reversible attempt with a clear input, permission, and stop condition.', zh: '用明确的输入、权限和停止条件，做一次最小且可回退的尝试。', es: 'Haz el intento reversible más pequeño, con una entrada, una autorización y una condición de parada claras.', ja: '入力、権限、停止条件を明確にして、最小限で元に戻せる試行を行います。', ko: '입력, 권한과 중지 조건을 분명히 하고 가장 작고 되돌릴 수 있는 시도를 하세요.', de: 'Mache den kleinsten reversiblen Versuch mit klarer Eingabe, Berechtigung und Stop-Bedingung.', 'zh-tw': '用明確的輸入、權限與停止條件，做一次最小且可復原的嘗試。', fr: 'Faites le plus petit essai réversible possible, avec une entrée, une autorisation et une condition d’arrêt claires.' },
      next: { en: 'What exactly will I change or leave untouched?', zh: '我究竟会改变什么，又会保持什么不变？', es: '¿Qué voy a cambiar exactamente y que voy a dejar intacto?', ja: '何を変え、何を変えずに残すのか？', ko: '정확히 무엇을 바꾸고 무엇을 그대로 둘 것인가?', de: 'Was ändere ich genau, und was bleibt unberührt?', 'zh-tw': '我究竟會改變什麼，又會保持什麼不變？', fr: 'Qu’est-ce que je vais changer exactement, et qu’est-ce qui reste intact ?' },
    },
    {
      id: 'evidence', path: 'book/chapters/09-verification-and-recovery',
      labels: { en: 'Inspect the record', zh: '检查记录', es: 'Inspeccionar el registro', ja: '記録を確認する', ko: '기록 점검하기', de: 'Den Beleg prüfen', 'zh-tw': '檢查紀錄', fr: 'Inspecter le relevé' },
      bodies: { en: 'Read the output, diff, source, test, or log; separate what you saw from what you inferred.', zh: '读取输出、差异、来源、测试或日志；分开你看到的内容和你推断的内容。', es: 'Lee la salida, el diff, la fuente, la prueba o el registro; separa lo observado de lo inferido.', ja: '出力、差分、出典、テスト、ログを読み、見たことと推測したことを分けます。', ko: '출력, diff, 출처, 테스트 또는 로그를 읽고 본 것과 추정한 것을 분리하세요.', de: 'Lies Ausgabe, Diff, Quelle, Test oder Protokoll; trenne Beobachtung und Schlussfolgerung.', 'zh-tw': '讀取輸出、差異、來源、測試或日誌；分開你看到的內容與你推斷的內容。', fr: 'Lisez la sortie, le diff, la source, le test ou le journal ; séparez ce que vous avez vu de ce que vous avez inféré.' },
      next: { en: 'What does the record support?', zh: '这份记录支持什么？', es: '¿Qué respalda el registro?', ja: '記録は何を支えるか？', ko: '이 기록이 뒷받침하는 것은 무엇인가?', de: 'Was stützt der Beleg?', 'zh-tw': '這份紀錄支持什麼？', fr: 'Que permet d’établir le relevé ?' },
    },
    {
      id: 'boundary', path: 'book/chapters/13-action-boundaries',
      labels: { en: 'State the boundary', zh: '说明边界', es: 'Declarar el límite', ja: '境界を示す', ko: '한계 밝히기', de: 'Die Grenze nennen', 'zh-tw': '說明界線', fr: 'Énoncer la limite' },
      bodies: { en: 'Name what remains unknown, unauthorized, unobserved, or outside the task.', zh: '说清什么仍然未知、未经授权、没有观察到，或超出了任务范围。', es: 'Indica qué sigue siendo desconocido, no autorizado, no observado o queda fuera de la tarea.', ja: '不明、未承認、未観察、または課題の範囲外に残るものを明示します。', ko: '무엇이 여전히 미확인·미승인·미관찰 상태이거나 작업 범위를 벗어나는지 밝히세요.', de: 'Benenne, was unbekannt, nicht autorisiert, unbeobachtet oder außerhalb der Aufgabe bleibt.', 'zh-tw': '說清楚什麼仍然未知、未獲授權、沒有觀察到，或超出任務範圍。', fr: 'Nommez ce qui reste inconnu, non autorisé, non observé ou hors du périmètre.' },
      next: { en: 'What is the smallest safe next check?', zh: '下一项最小的安全检查是什么？', es: '¿Cuál es la siguiente comprobación segura más pequeña?', ja: '次にできる最小限で安全な確認は何か？', ko: '다음으로 할 수 있는 가장 작고 안전한 점검은 무엇인가?', de: 'Was ist der kleinste sichere nächste Check?', 'zh-tw': '下一項最小且安全的檢查是什麼？', fr: 'Quel est le plus petit contrôle sûr à faire ensuite ?' },
    },
    {
      id: 'transfer', path: 'book/chapters/20-personal-codex-work-system',
      labels: { en: 'Try a changed task', zh: '在变化后的任务上尝试', es: 'Probar una tarea distinta', ja: '条件を変えた課題で試す', ko: '조건을 바꾼 작업에서 시도하기', de: 'Eine veränderte Aufgabe testen', 'zh-tw': '在變化後的任務上嘗試', fr: 'Essayer sur une tâche différente' },
      bodies: { en: 'Vary one condition and repeat the method without claiming mastery from one success.', zh: '改变一个条件，重复这套方法，不要因为一次成功就宣称已经掌握。', es: 'Cambia una condición y repite el método sin afirmar dominio por un solo éxito.', ja: '条件を1つ変えて方法を繰り返し、1回の成功だけで習得を主張しません。', ko: '조건 하나를 바꿔 방법을 반복하고 한 번의 성공만으로 숙련을 주장하지 마세요.', de: 'Verändere eine Bedingung und wiederhole die Methode, ohne aus einem Erfolg Beherrschung abzuleiten.', 'zh-tw': '改變一個條件，重複這套方法，不要因為一次成功就宣稱已經掌握。', fr: 'Changez une condition et répétez la méthode sans conclure à la maîtrise après un seul succès.' },
      next: { en: 'What changed, and did the method still hold?', zh: '什么变了，这套方法还成立吗？', es: '¿Qué cambió y el método sigue funcionando?', ja: '何が変わり、方法はまだ成り立つか？', ko: '무엇이 바뀌었고 방법은 여전히 통하는가?', de: 'Was hat sich geändert, und trägt die Methode noch?', 'zh-tw': '什麼改變了，這套方法仍然成立嗎？', fr: 'Qu’est-ce qui a changé, et la méthode tient-elle toujours ?' },
    },
  ];

  const CONCEPTS = [
    {
      id: 'token', path: 'book/chapters/01-gpt-and-codex',
      labels: { en: 'Token', zh: 'Token（词元）', es: 'Token', ja: 'Token（トークン）', ko: 'Token（토큰）', de: 'Token', 'zh-tw': 'Token（詞元）', fr: 'Token' },
      bodies: { en: 'A unit of text processed by the model; it is not a fact or a permission.', zh: '模型处理的文字单位；它不是事实，也不代表权限。', es: 'Unidad de texto que procesa el modelo; no es un hecho ni concede permisos.', ja: 'モデルが処理するテキストの単位です。事実でも権限でもありません。', ko: '모델이 처리하는 텍스트 단위입니다. 사실도 아니고 권한도 아닙니다.', de: 'Eine vom Modell verarbeitete Texteinheit; sie ist weder eine Tatsache noch eine Berechtigung.', 'zh-tw': '模型處理的文字單位；它不是事實，也不代表權限。', fr: 'Unité de texte traitée par le modèle ; ce n’est ni un fait ni une autorisation.' },
      next: { en: 'What material is actually present?', zh: '实际有哪些材料在场？', es: '¿Qué material está realmente presente?', ja: '実際に何が入力されているか？', ko: '실제로 어떤 자료가 들어와 있는가?', de: 'Welches Material ist tatsächlich vorhanden?', 'zh-tw': '實際有哪些資料在場？', fr: 'Quel contenu est réellement présent ?' },
    },
    {
      id: 'context', path: 'book/chapters/01-gpt-and-codex',
      labels: { en: 'Context', zh: 'Context（上下文）', es: 'Contexto', ja: 'Context（コンテキスト）', ko: 'Context（컨텍스트）', de: 'Kontext', 'zh-tw': 'Context（上下文）', fr: 'Contexte' },
      bodies: { en: 'Material available in this turn, such as a prompt, supplied text, or tool data.', zh: '这一轮可用的材料，例如提示、提供的文字或工具数据。', es: 'Material disponible en este turno, como el prompt, texto aportado o datos de una herramienta.', ja: 'このターンで利用できる材料です。プロンプト、提供された文章、ツールのデータなどが含まれます。', ko: '이번 턴에서 사용할 수 있는 자료입니다. 프롬프트, 제공된 텍스트 또는 도구 데이터가 여기에 포함됩니다.', de: 'Material, das in diesem Durchlauf verfügbar ist, etwa Prompt, bereitgestellter Text oder Tool-Daten.', 'zh-tw': '這一輪可用的資料，例如提示、提供的文字或工具資料。', fr: 'Contenu disponible dans ce tour : prompt, texte fourni ou données d’un outil, par exemple.' },
      next: { en: 'What is missing and still unknown?', zh: '什么缺失，什么仍然未知？', es: '¿Qué falta y sigue sin saberse?', ja: '何が欠けていて、まだ不明なのか？', ko: '무엇이 빠져 있고 여전히 모르는가?', de: 'Was fehlt und bleibt unbekannt?', 'zh-tw': '什麼缺少，什麼仍然未知？', fr: 'Qu’est-ce qui manque et reste inconnu ?' },
    },
    {
      id: 'window', path: 'book/chapters/01-gpt-and-codex',
      labels: { en: 'Context window', zh: 'Context window（上下文窗口）', es: 'Ventana de contexto', ja: 'Context window（コンテキストウィンドウ）', ko: 'Context window（컨텍스트 창）', de: 'Kontextfenster', 'zh-tw': 'Context window（上下文視窗）', fr: 'Fenêtre de contexte' },
      bodies: { en: 'The amount of material that fits in one turn; the exact limit depends on the product.', zh: '一轮能容纳的材料总量；具体上限取决于产品。', es: 'Cantidad de material que cabe en un turno; el límite exacto depende del producto.', ja: '1つのターンに収まる材料の量です。正確な上限は製品によって異なります。', ko: '한 턴에 들어갈 수 있는 자료의 양입니다. 정확한 한도는 제품마다 다릅니다.', de: 'Die Materialmenge, die in einen Durchlauf passt; das genaue Limit hängt vom Produkt ab.', 'zh-tw': '一輪能容納的資料總量；具體上限取決於產品。', fr: 'Quantité de contenu qui tient dans un tour ; la limite exacte dépend du produit.' },
      next: { en: 'Which limit is documented for this surface?', zh: '这个产品界面记录了什么限制？', es: '¿Qué límite documenta esta interfaz?', ja: 'この環境に記載された上限は何か？', ko: '이 환경에 문서로 남은 한도는 무엇인가?', de: 'Welches Limit ist für diese Oberfläche dokumentiert?', 'zh-tw': '這個產品介面記錄了什麼限制？', fr: 'Quelle limite est documentée pour cette interface ?' },
    },
    {
      id: 'prompt', path: 'book/chapters/03-task-protocol',
      labels: { en: 'Prompt', zh: 'Prompt（提示）', es: 'Prompt', ja: 'Prompt（プロンプト）', ko: 'Prompt（프롬프트）', de: 'Prompt', 'zh-tw': 'Prompt（提示）', fr: 'Prompt' },
      bodies: { en: 'The goal, context, constraints, and requested answer shape; it frames work but grants no access.', zh: '目标、上下文、约束和所要求的回答形式；它能框定工作，但不会自动授予访问权限。', es: 'Objetivo, contexto, restricciones y forma de respuesta solicitada; encuadra el trabajo, pero no concede acceso.', ja: '目的、コンテキスト、制約、求める回答の形です。作業の枠は決めますが、アクセス権は与えません。', ko: '목표, 맥락, 제약과 원하는 답변 형식입니다. 작업 범위는 정하지만 접근 권한을 주지는 않습니다.', de: 'Ziel, Kontext, Einschränkungen und gewünschte Antwortform; der Prompt grenzt die Arbeit ein, gewährt aber keinen Zugriff.', 'zh-tw': '目標、上下文、限制與要求的回應形式；它能框定工作，但不會自動授予存取權限。', fr: 'Objectif, contexte, contraintes et forme de réponse demandée ; il cadre le travail, mais n’accorde aucun accès.' },
      next: { en: 'What is allowed before the request starts?', zh: '请求开始前，什么是允许的？', es: '¿Qué está permitido antes de empezar?', ja: '依頼を始める前に何が許可されているか？', ko: '요청을 시작하기 전에 무엇이 허용되는가?', de: 'Was ist vor Beginn der Anfrage erlaubt?', 'zh-tw': '請求開始前，什麼是允許的？', fr: 'Qu’est-ce qui est autorisé avant de commencer ?' },
    },
    {
      id: 'response', path: 'book/chapters/09-verification-and-recovery',
      labels: { en: 'Response', zh: 'Response（回答）', es: 'Respuesta', ja: 'Response（応答）', ko: 'Response（응답）', de: 'Antwort', 'zh-tw': 'Response（回應）', fr: 'Réponse' },
      bodies: { en: 'Text proposed for inspection; fluent wording can still make an error sound certain.', zh: '等待检查的文字建议；表达流畅，仍可能把错误说得像确定事实。', es: 'Texto propuesto para inspección; una redacción fluida puede hacer que un error parezca seguro.', ja: '確認するために提示された文章です。流暢でも、誤りを確実そうに見せることがあります。', ko: '점검해야 할 텍스트 제안입니다. 표현이 매끄러워도 오류를 확실한 사실처럼 보이게 할 수 있습니다.', de: 'Zur Prüfung vorgeschlagener Text; flüssige Formulierungen können einen Fehler trotzdem sicher klingen lassen.', 'zh-tw': '等待檢查的文字建議；表達流暢，仍可能把錯誤說得像確定事實。', fr: 'Texte proposé à l’inspection ; une formulation fluide peut donner à une erreur un air de certitude.' },
      next: { en: 'What record can I compare with the response?', zh: '我能用哪份记录对照回答？', es: '¿Con qué registro puedo comparar la respuesta?', ja: '応答と照合できる記録は何か？', ko: '응답과 비교할 기록은 무엇인가?', de: 'Mit welchem Beleg kann ich die Antwort vergleichen?', 'zh-tw': '我能用哪份紀錄對照回應？', fr: 'Avec quel relevé puis-je comparer la réponse ?' },
    },
    {
      id: 'tool', path: 'book/chapters/13-action-boundaries',
      labels: { en: 'Tool / Agent', zh: 'Tool / Agent（工具 / Agent）', es: 'Herramienta / agente', ja: 'Tool / Agent（ツール / Agent）', ko: 'Tool / Agent（도구 / Agent）', de: 'Tool / Agent', 'zh-tw': 'Tool / Agent（工具 / Agent）', fr: 'Outil / Agent' },
      bodies: { en: 'A product may add reading, action, or coordination; runtime permission and evidence decide what happened.', zh: '产品可能增加读取、行动或协作能力；运行时权限和证据才能决定实际发生了什么。', es: 'Un producto puede añadir lectura, acción o coordinación; los permisos en tiempo de ejecución y la evidencia determinan lo ocurrido.', ja: '製品によって読み取り、操作、調整が加わります。実行時の権限と証拠で、実際に起きたことを判断します。', ko: '제품은 읽기, 행동 또는 조정 기능을 추가할 수 있습니다. 실제로 무슨 일이 일어났는지는 실행 권한과 증거로 판단합니다.', de: 'Ein Produkt kann Lesen, Handeln oder Koordination ergänzen; Laufzeitberechtigung und Belege entscheiden, was passiert ist.', 'zh-tw': '產品可能增加讀取、行動或協作能力；執行時權限與證據才能判斷實際發生了什麼。', fr: 'Un produit peut ajouter lecture, action ou coordination ; les autorisations d’exécution et les preuves déterminent ce qui s’est passé.' },
      next: { en: 'What action receipt or log exists?', zh: '留下了什么行动回执或日志？', es: '¿Qué comprobante o registro de acción existe?', ja: 'どの操作記録やログが残っているか？', ko: '어떤 행동 기록이나 로그가 남아 있는가?', de: 'Welcher Aktionsbeleg oder welches Protokoll existiert?', 'zh-tw': '留下了什麼行動紀錄或日誌？', fr: 'Quel relevé d’action ou quel journal existe ?' },
    },
  ];

  const ACTION_BOUNDARY_STEPS = [
    {
      id: 'proposal', path: 'book/chapters/13-action-boundaries',
      labels: { en: 'Model proposes', zh: '模型提议', es: 'El modelo propone', ja: 'モデルが提案する', ko: '모델이 제안하기', de: 'Das Modell schlägt vor', 'zh-tw': '模型提議', fr: 'Le modèle propose' },
      bodies: { en: 'Words can name an action, but a plan or tool call is still a proposal. It does not change the host by itself.', zh: '文字可以描述一项行动，但计划或工具调用仍然只是提议。它不会自行改变主机。', es: 'Las palabras pueden nombrar una acción, pero un plan o una llamada de herramienta sigue siendo una propuesta. Por sí solo no cambia el entorno.', ja: '言葉で行動を示せても、計画やツール呼び出しはまだ提案です。それだけでホストが変わるわけではありません。', ko: '문장으로 행동을 말할 수는 있지만 계획이나 도구 호출은 여전히 제안입니다. 그 자체로 호스트를 바꾸지는 않습니다.', de: 'Worte können eine Handlung benennen, aber ein Plan oder Tool-Aufruf bleibt ein Vorschlag. Er verändert den Host nicht von selbst.', 'zh-tw': '文字可以描述一項行動，但計畫或工具呼叫仍然只是提議。它不會自行改變主機。', fr: 'Les mots peuvent nommer une action, mais un plan ou un appel d’outil reste une proposition. Il ne modifie pas l’hôte à lui seul.' },
      next: { en: 'What did the model actually propose?', zh: '模型实际提出了什么？', es: '¿Qué propuso realmente el modelo?', ja: 'モデルは実際に何を提案したか？', ko: '모델이 실제로 제안한 것은 무엇인가?', de: 'Was hat das Modell tatsächlich vorgeschlagen?', 'zh-tw': '模型實際提出了什麼？', fr: 'Qu’a réellement proposé le modèle ?' },
    },
    {
      id: 'authority', path: 'book/chapters/13-action-boundaries',
      labels: { en: 'Host decides authority', zh: '主机决定权限', es: 'El entorno decide la autorización', ja: 'ホストが権限を決める', ko: '호스트가 권한을 정하기', de: 'Der Host entscheidet über die Berechtigung', 'zh-tw': '主機決定權限', fr: 'L’hôte décide de l’autorité' },
      bodies: { en: 'The host and a person set the target, permission, and stop boundary. A prompt does not grant access on its own.', zh: '主机和人共同确定目标、权限与停止边界。提示不会自行授予访问权。', es: 'El entorno y una persona fijan el objetivo, la autorización y el límite de parada. Un prompt no concede acceso por sí solo.', ja: 'ホストと人が対象、権限、停止の境界を決めます。プロンプトだけでアクセス権が生まれるわけではありません。', ko: '호스트와 사람이 대상, 권한과 중지 경계를 정합니다. 프롬프트만으로 접근 권한이 생기지는 않습니다.', de: 'Host und Mensch legen Ziel, Berechtigung und Stoppgrenze fest. Ein Prompt gewährt nicht allein Zugriff.', 'zh-tw': '主機與人共同設定目標、權限與停止界線。提示不會自行授予存取權。', fr: 'L’hôte et une personne fixent la cible, l’autorisation et la limite d’arrêt. Un prompt n’accorde pas l’accès à lui seul.' },
      next: { en: 'What authority was granted?', zh: '实际授予了什么权限？', es: '¿Qué autorización se concedió?', ja: 'どの権限が与えられたか？', ko: '어떤 권한이 부여됐는가?', de: 'Welche Berechtigung wurde erteilt?', 'zh-tw': '實際授予了什麼權限？', fr: 'Quelle autorisation a été accordée ?' },
    },
    {
      id: 'execution', path: 'book/chapters/13-action-boundaries',
      labels: { en: 'Tool executes', zh: '工具实际执行', es: 'La herramienta se ejecuta', ja: 'ツールが実際に動く', ko: '도구가 실제로 실행되기', de: 'Das Tool wird ausgeführt', 'zh-tw': '工具實際執行', fr: 'L’outil s’exécute' },
      bodies: { en: 'Look for the actual event and returned data. Do not infer a run from fluent text, a button label, or a plan.', zh: '寻找实际事件和返回数据。不要从流畅文字、按钮标签或计划推断工具已经运行。', es: 'Busca el evento real y los datos devueltos. No deduzcas una ejecución por un texto fluido, una etiqueta o un plan.', ja: '実際のイベントと返されたデータを探します。流暢な文章、ボタンの表示、計画だけで実行を推測しません。', ko: '실제 이벤트와 반환된 데이터를 확인하세요. 매끄러운 문장, 버튼 라벨이나 계획만으로 실행됐다고 추정하지 마세요.', de: 'Suche das tatsächliche Ereignis und die zurückgegebenen Daten. Schließe nicht aus flüssigem Text, einer Schaltfläche oder einem Plan auf eine Ausführung.', 'zh-tw': '尋找實際事件與回傳資料。不要從流暢文字、按鈕標籤或計畫推斷工具已經執行。', fr: 'Cherchez l’événement réel et les données retournées. N’inférez pas une exécution à partir d’un texte fluide, d’un libellé ou d’un plan.' },
      next: { en: 'What event or receipt is visible?', zh: '能看到什么事件或回执？', es: '¿Qué evento o registro es visible?', ja: 'どのイベントや記録が見えているか？', ko: '어떤 이벤트나 기록이 보이는가?', de: 'Welches Ereignis oder welcher Beleg ist sichtbar?', 'zh-tw': '能看到什麼事件或紀錄？', fr: 'Quel événement ou relevé est visible ?' },
    },
    {
      id: 'readback', path: 'book/chapters/13-action-boundaries',
      labels: { en: 'Person reads back', zh: '人读取结果', es: 'Una persona comprueba el resultado', ja: '人が結果を読み返す', ko: '사람이 결과를 다시 확인하기', de: 'Ein Mensch liest das Ergebnis zurück', 'zh-tw': '人重新核對結果', fr: 'Une personne relit le résultat' },
      bodies: { en: 'Compare the result with a diff, log, source, test, or acceptance rule. A returned value is not automatically correct.', zh: '将结果与差异、日志、来源、测试或验收规则对照。返回值不会自动变成正确答案。', es: 'Compara el resultado con un diff, un registro, una fuente, una prueba o una regla de aceptación. Un valor devuelto no es correcto automáticamente.', ja: '結果を差分、ログ、出典、テスト、受け入れ条件と照合します。返された値が自動的に正しいとは限りません。', ko: '결과를 diff, 로그, 출처, 테스트 또는 승인 규칙과 대조하세요. 반환된 값이 자동으로 올바른 것은 아닙니다.', de: 'Vergleiche das Ergebnis mit Diff, Protokoll, Quelle, Test oder Abnahmeregel. Ein zurückgegebener Wert ist nicht automatisch richtig.', 'zh-tw': '把結果與差異、日誌、來源、測試或驗收規則對照。回傳值不會自動變成正確答案。', fr: 'Comparez le résultat avec un diff, un journal, une source, un test ou une règle d’acceptation. Une valeur retournée n’est pas automatiquement correcte.' },
      next: { en: 'What did the read-back confirm?', zh: '人工核对确认了什么？', es: '¿Qué confirmó la comprobación?', ja: '読み返しで何を確認できたか？', ko: '결과 확인으로 무엇을 검증했는가?', de: 'Was hat das Zurücklesen bestätigt?', 'zh-tw': '人工核對確認了什麼？', fr: 'Qu’a confirmé la relecture ?' },
    },
    {
      id: 'evidence', path: 'book/chapters/13-action-boundaries',
      labels: { en: 'Evidence limits the claim', zh: '证据限定结论', es: 'La evidencia limita la afirmación', ja: '証拠が主張の範囲を決める', ko: '증거가 주장의 범위를 제한하기', de: 'Belege begrenzen die Aussage', 'zh-tw': '證據限定主張', fr: 'Les preuves limitent l’affirmation' },
      bodies: { en: 'Keep the claim inside the receipt. If proof is missing, stop, preserve the unknown, and use a smaller label.', zh: '让结论保持在回执范围内。如果缺少证明，就停止、保留未知，并使用更小的状态标签。', es: 'Mantén la afirmación dentro del registro. Si falta la prueba, detente, conserva lo desconocido y usa una etiqueta más limitada.', ja: '主張を記録の範囲内に保ちます。証拠がなければ止まり、不明点を残し、より小さなラベルを使います。', ko: '주장을 기록의 범위 안에 두세요. 증거가 없으면 멈추고 모르는 것을 그대로 남기며 더 작은 상태 라벨을 사용합니다.', de: 'Halte die Aussage innerhalb des Belegs. Fehlt der Nachweis, stoppe, bewahre das Unbekannte und wähle eine kleinere Statusbezeichnung.', 'zh-tw': '讓主張留在紀錄範圍內。如果缺少證據，就停止、保留未知，並使用更小的狀態標籤。', fr: 'Gardez l’affirmation dans les limites du relevé. S’il manque une preuve, arrêtez-vous, conservez l’inconnu et utilisez une étiquette plus prudente.' },
      next: { en: 'What is the strongest label the record permits?', zh: '这份记录允许使用的最强标签是什么？', es: '¿Cuál es la etiqueta más fuerte que permite el registro?', ja: '記録が許す最も強いラベルは何か？', ko: '이 기록이 허용하는 가장 강한 상태 라벨은 무엇인가?', de: 'Welche stärkste Bezeichnung erlaubt der Beleg?', 'zh-tw': '這份紀錄允許使用的最強標籤是什麼？', fr: 'Quelle est l’étiquette la plus forte permise par le relevé ?' },
    },
  ];

  const INTENTS = [
    {
      id: 'start', asset: 'foundation-first-visit-route-red-black.svg', path: 'book/chapters/02-first-safe-task',
      labels: { en: 'I need a first safe task', zh: '我想先完成一次安全任务', es: 'Quiero empezar con una tarea segura', ja: 'まず安全なタスクを試したい', ko: '안전한 작업 하나부터 시작하고 싶다', de: 'Mit einer sicheren Aufgabe beginnen', 'zh-tw': '我想先完成一次安全任務', fr: 'Commencer par une tâche sûre' },
      bodies: { en: 'Use a fictional, offline task and keep the first response as your baseline.', zh: '使用虚构的离线任务，并保留第一次回答作为基线。', es: 'Usa una tarea ficticia y sin conexión; conserva la primera respuesta como línea de base.', ja: '架空のオフライン課題で試し、最初の回答を基準として残します。', ko: '가상의 오프라인 작업으로 시도하고 첫 응답을 기준 기록으로 남깁니다.', de: 'Verwende eine fiktive Offline-Aufgabe und bewahre die erste Antwort als Ausgangspunkt auf.', 'zh-tw': '使用虛構的離線任務，並保留第一次回答作為基線。', fr: 'Utilisez une tâche fictive hors ligne et conservez la première réponse comme point de départ.' },
      next: { en: 'What is the smallest result I can check?', zh: '我能检查的最小结果是什么？', es: '¿Cuál es el resultado más pequeño que puedo comprobar?', ja: '確認できる最小の結果は何か？', ko: '확인할 수 있는 가장 작은 결과는 무엇인가?', de: 'Welches kleinste Ergebnis kann ich prüfen?', 'zh-tw': '我能檢查的最小結果是什麼？', fr: 'Quel est le plus petit résultat que je puisse vérifier ?' },
      imageAlt: { en: 'A route from a first safe task to one checked result.', zh: '从第一次安全任务走到一个可检查结果的路线图。', es: 'Recorrido desde una primera tarea segura hasta un resultado comprobado.', ja: '安全な最初のタスクから、確認できる1つの結果までのルート図。', ko: '첫 안전 작업에서 점검된 결과 하나로 이어지는 경로 그림.', de: 'Routenbild von einer ersten sicheren Aufgabe zu einem geprüften Ergebnis.', 'zh-tw': '從第一次安全任務走到一個可檢查結果的路線圖。', fr: 'Parcours allant d’une première tâche sûre à un résultat vérifié.' },
      caption: { en: 'A project-authored first-visit route. The localized text is the explanation; the board only helps you choose a starting point.', zh: '项目原创的首次访问路线图。本地化文字才是解释，图板只帮助你选择起点。', es: 'Recorrido original para la primera visita. El texto localizado explica; el tablero solo ayuda a elegir un punto de partida.', ja: 'プロジェクト作成の初回ルート図です。説明はローカライズされた本文であり、ボードは出発点選びを補助します。', ko: '프로젝트가 만든 첫 방문 경로입니다. 설명은 현지화된 글에 있고, 보드는 시작점을 고르는 데만 도움을 줍니다.', de: 'Projektbezogene Route für den ersten Besuch. Die Erklärung steht im lokalisierten Text; die Tafel hilft nur bei der Wahl des Ausgangspunkts.', 'zh-tw': '專案原創的首次造訪路線圖。本地化文字才是說明，圖板只協助你選擇起點。', fr: 'Parcours original pour une première visite. L’explication reste dans le texte localisé ; la planche aide seulement à choisir le point de départ.' },
    },
    {
      id: 'uncertain', asset: 'recovery-decision-tree-red-black.svg', path: 'book/chapters/09-verification-and-recovery',
      labels: { en: 'I am not sure what the result proves', zh: '我不确定结果能证明什么', es: 'No sé qué demuestra el resultado', ja: 'この結果で何が言えるか分からない', ko: '이 결과가 무엇을 증명하는지 모르겠다', de: 'Ich weiß nicht, was dieses Ergebnis belegt', 'zh-tw': '我不確定結果能證明什麼', fr: 'Je ne sais pas ce que ce résultat prouve' },
      bodies: { en: 'Preserve the output and trace, compare the smallest available evidence, and stop when the proof is missing.', zh: '保留输出和轨迹，用手头最小的证据对照；缺少证明时就停止。', es: 'Conserva la salida y el rastro, compáralos con la evidencia mínima disponible y detente si falta la prueba.', ja: '出力と記録を残し、手元にある最小限の証拠と照合します。証明がなければ止まります。', ko: '출력과 추적 기록을 보존하고 가장 작은 증거와 대조합니다. 증명이 없으면 멈춥니다.', de: 'Bewahre Ausgabe und Spur, vergleiche den kleinsten verfügbaren Beleg und stoppe, wenn der Nachweis fehlt.', 'zh-tw': '保留輸出與軌跡，用手邊最小的證據對照；缺少證明時就停止。', fr: 'Conservez la sortie et la trace, comparez-les au plus petit élément de preuve disponible et arrêtez-vous s’il manque.' },
      next: { en: 'What did I actually observe?', zh: '我实际观察到了什么？', es: '¿Qué observé realmente?', ja: '実際に何を観察したか？', ko: '실제로 무엇을 관찰했는가?', de: 'Was habe ich tatsächlich beobachtet?', 'zh-tw': '我實際觀察到了什麼？', fr: 'Qu’ai-je réellement observé ?' },
      imageAlt: { en: 'A recovery decision tree for preserving evidence, checking authority, and stopping when the proof is missing.', zh: '一张恢复决策树：保留证据、检查权限，并在缺少证明时停止。', es: 'Árbol de recuperación para conservar pruebas, comprobar la autorización y detenerse si falta la prueba.', ja: '証拠を残し、権限を確認し、証明がなければ止まる復旧判断ツリー。', ko: '증거를 보존하고 권한을 확인하며 증명이 없으면 멈추는 복구 의사결정 트리.', de: 'Entscheidungsbaum zur Wiederherstellung: Belege bewahren, Berechtigung prüfen und bei fehlendem Nachweis stoppen.', 'zh-tw': '一張復原決策樹：保留證據、檢查權限，並在缺少證明時停止。', fr: 'Arbre de décision pour conserver les preuves, vérifier l’autorisation et s’arrêter quand le justificatif manque.' },
      caption: { en: 'A project-authored recovery board. It explains a bounded decision sequence; it does not prove that a retry succeeded.', zh: '项目原创的恢复图板。它解释一条有边界的决策顺序，但不证明重试成功。', es: 'Tablero original de recuperación. Explica una secuencia de decisiones acotada; no demuestra que el reintento funcionara.', ja: 'プロジェクト作成の復旧ボードです。範囲を区切った判断の順序を示しますが、再試行の成功は証明しません。', ko: '프로젝트가 만든 복구 보드입니다. 범위가 정해진 판단 순서를 설명할 뿐 재시도 성공을 증명하지 않습니다.', de: 'Projektbezogene Wiederherstellungstafel. Sie erklärt eine begrenzte Entscheidungsfolge, belegt aber keinen erfolgreichen neuen Versuch.', 'zh-tw': '專案原創的復原圖板。它解釋一段有界線的判斷順序，但不代表重試成功。', fr: 'Planche originale de récupération. Elle explique une suite de décisions délimitée ; elle ne prouve pas la réussite d’une nouvelle tentative.' },
    },
    {
      id: 'verify', asset: 'research-question-to-source-record-red-black.svg', path: 'book/chapters/15-research-track',
      labels: { en: 'I need to verify a claim', zh: '我需要核对一个结论', es: 'Necesito comprobar una afirmación', ja: '主張を確かめたい', ko: '주장을 확인하고 싶다', de: 'Eine Aussage überprüfen', 'zh-tw': '我需要核對一項主張', fr: 'Vérifier une affirmation' },
      bodies: { en: 'Turn the question into a bounded claim, identify the source, run the smallest check, and keep the scope visible.', zh: '把问题变成有边界的结论，找出来源，执行最小检查，并保留范围。', es: 'Convierte la pregunta en una afirmación acotada, identifica la fuente, haz la comprobación mínima y conserva el alcance.', ja: '問いを範囲を区切った主張に変え、出典を特定し、最小限の確認を行って範囲を残します。', ko: '질문을 범위가 정해진 주장으로 바꾸고 출처를 찾은 뒤 가장 작은 점검을 수행하며 범위를 남깁니다.', de: 'Forme die Frage in eine begrenzte Aussage um, bestimme die Quelle, prüfe so klein wie möglich und halte den Umfang fest.', 'zh-tw': '把問題變成有界線的主張，找出來源，執行最小檢查，並保留範圍。', fr: 'Transformez la question en affirmation délimitée, identifiez la source, faites le plus petit contrôle et gardez le périmètre visible.' },
      next: { en: 'Which source and check could change my claim?', zh: '哪一个来源和检查可能改变我的结论？', es: '¿Qué fuente y qué comprobación podrían cambiar mi afirmación?', ja: 'どの出典と確認なら主張が変わり得るか？', ko: '어떤 출처와 점검이 주장을 바꿀 수 있는가?', de: 'Welche Quelle und welcher Check könnten meine Aussage ändern?', 'zh-tw': '哪個來源與檢查可能改變我的主張？', fr: 'Quelle source et quel contrôle pourraient modifier mon affirmation ?' },
      imageAlt: { en: 'A route from a research question to a source record and a bounded claim.', zh: '从研究问题走到来源记录和有边界结论的路线图。', es: 'Recorrido desde una pregunta de investigación hasta un registro de fuente y una afirmación acotada.', ja: 'リサーチの問いから出典記録と範囲を区切った主張までのルート図。', ko: '연구 질문에서 출처 기록과 범위 있는 주장으로 이어지는 경로 그림.', de: 'Routenbild von einer Forschungsfrage zu einem Quellenprotokoll und einer begrenzten Aussage.', 'zh-tw': '從研究問題走到來源紀錄與有界線主張的路線圖。', fr: 'Parcours allant d’une question de recherche à un relevé de source et une affirmation délimitée.' },
      caption: { en: 'A project-authored research route. The source record carries the claim; the picture only shows the order of work.', zh: '项目原创的研究路线图。来源记录承载结论，图板只展示工作顺序。', es: 'Recorrido de investigación original. El registro de la fuente sostiene la afirmación; la imagen solo muestra el orden de trabajo.', ja: 'プロジェクト作成のリサーチルートです。主張を支えるのは出典記録であり、図は作業順を示すだけです。', ko: '프로젝트가 만든 연구 경로입니다. 주장을 뒷받침하는 것은 출처 기록이고 그림은 작업 순서만 보여 줍니다.', de: 'Projektbezogener Forschungsweg. Das Quellenprotokoll trägt die Aussage; das Bild zeigt nur die Arbeitsreihenfolge.', 'zh-tw': '專案原創的研究路線圖。主張由來源紀錄支撐，圖板只呈現工作順序。', fr: 'Parcours de recherche créé par le projet. Le relevé de source porte l’affirmation ; la planche ne montre que l’ordre du travail.' },
    },
    {
      id: 'reuse', asset: 'understanding-to-transfer-red-black.svg', path: 'book/chapters/20-personal-codex-work-system',
      labels: { en: 'I want to reuse the method', zh: '我想把方法用到别的任务', es: 'Quiero reutilizar el método', ja: '方法を別の課題でも使いたい', ko: '방법을 다른 작업에도 쓰고 싶다', de: 'Die Methode weiterverwenden', 'zh-tw': '我想把方法用在其他任務', fr: 'Réutiliser la méthode' },
      bodies: { en: 'Repeat the method on a new task, change one condition, and keep a receipt instead of claiming mastery.', zh: '在新任务上重复方法，改变一个条件，并保留记录，不要直接宣称掌握。', es: 'Repite el método en una tarea nueva, cambia una condición y conserva un registro en vez de afirmar dominio.', ja: '新しい課題で方法を繰り返し、条件を1つ変えて、習得を主張せず記録を残します。', ko: '새 작업에서 방법을 반복하고 조건 하나를 바꾼 뒤 숙련을 주장하지 말고 기록을 남깁니다.', de: 'Wiederhole die Methode an einer neuen Aufgabe, ändere eine Bedingung und bewahre einen Beleg statt Beherrschung zu behaupten.', 'zh-tw': '在新任務上重複方法，改變一個條件，並保留紀錄，不要直接宣稱掌握。', fr: 'Répétez la méthode sur une nouvelle tâche, changez une condition et gardez un relevé au lieu de proclamer la maîtrise.' },
      next: { en: 'What changed in the new task, and what stayed stable?', zh: '新任务变了什么，什么保持不变？', es: '¿Qué cambió en la nueva tarea y quÉ se mantuvo estable?', ja: '新しい課題で何が変わり、何が保たれたか？', ko: '새 작업에서 무엇이 바뀌었고 무엇이 유지되었는가?', de: 'Was hat sich in der neuen Aufgabe geändert, was blieb gleich?', 'zh-tw': '新任務改變了什麼，什麼維持不變？', fr: 'Qu’est-ce qui a changé dans la nouvelle tâche et qu’est-ce qui est resté stable ?' },
      imageAlt: { en: 'A loop from understanding a boundary to a bounded attempt, inspection, repair, and transfer.', zh: '从理解边界到有边界尝试、检查、修正和迁移的闭环图。', es: 'Ciclo desde entender un límite hasta intentar, inspeccionar, reparar y transferir con un alcance acotado.', ja: '境界の理解から、範囲を区切った試行、確認、修正、転用へ進むループ図。', ko: '경계를 이해하고 범위 있는 시도, 점검, 수정과 전이로 이어지는 루프 그림.', de: 'Kreislauf von einer verstandenen Grenze über begrenzten Versuch, Prüfung und Reparatur zur Übertragung.', 'zh-tw': '從理解界線到有界線嘗試、檢查、修正與遷移的閉環圖。', fr: 'Boucle allant de la compréhension d’une limite à un essai délimité, une vérification, une correction et un transfert.' },
      caption: { en: 'A project-authored transfer loop. Repeating the loop is practice, not evidence of mastery.', zh: '项目原创的迁移闭环。重复闭环是练习，不是掌握证明。', es: 'Ciclo de transferencia original. Repetirlo es práctica, no una prueba de dominio.', ja: 'プロジェクト作成の転用ループです。繰り返すことは練習であり、習得の証拠ではありません。', ko: '프로젝트가 만든 전이 루프입니다. 반복은 연습이지 숙련의 증거가 아닙니다.', de: 'Projektbezogener Übertragungskreislauf. Die Wiederholung ist Übung, kein Nachweis der Beherrschung.', 'zh-tw': '專案原創的遷移閉環。重複這個閉環是練習，不是掌握的證明。', fr: 'Boucle de transfert créée par le projet. La répéter est un entraînement, pas une preuve de maîtrise.' },
    },
  ];

  const CARDS = [
    {
      stage: 'understand',
      asset: 'reader-route-compass-red-black.svg',
      path: 'book/guides/llm-fundamentals',
      titles: {
        en: 'Read one page as a four-step route',
        zh: '把一页内容读成四步路线',
        es: 'Lee una página como un recorrido de cuatro pasos',
        ja: '1ページを4つの手順で読む',
        ko: '한 페이지를 네 단계 경로로 읽기',
        de: 'Eine Seite als Weg in vier Schritten lesen',
        'zh-tw': '把一頁內容讀成四步路線',
        fr: 'Lire une page en quatre étapes',
      },
      bodies: {
        en: 'Name the question, try one bounded action, keep and check the record, then transfer or stop.',
        zh: '先说清问题，尝试一次有边界的行动，保留并检查记录，然后迁移方法或停止。',
        es: 'Formula la pregunta, prueba una acción acotada, conserva y comprueba el registro, y después transfiere el método o detente.',
        ja: '問いを言葉にし、範囲を区切った行動を1つ試し、記録を残して確認したら、応用するか止まります。',
        ko: '질문을 정하고, 범위가 정해진 행동 하나를 시도하고, 기록을 남겨 점검한 뒤 전이하거나 멈춥니다.',
        de: 'Formuliere die Frage, probiere eine begrenzte Handlung, bewahre und prüfe den Beleg und übertrage die Methode oder stoppe.',
        'zh-tw': '先說清楚問題，嘗試一次有界線的行動，保留並檢查紀錄，然後遷移方法或停止。',
        fr: 'Formulez la question, essayez une action délimitée, conservez et vérifiez le relevé, puis transférez la méthode ou arrêtez-vous.',
      },
    },
    { stage: 'understand', asset: 'llm-six-terms-to-one-check.svg', path: 'book/chapters/01-gpt-and-codex', titles: { en: 'Six terms, one checked result', zh: '六个术语，一个可检查结果', es: 'Seis términos, un resultado comprobado', ja: '6つの用語、1つの確認できる結果', ko: '여섯 용어, 하나의 점검된 결과', de: 'Sechs Begriffe, ein geprüftes Ergebnis', 'zh-tw': '六個術語，一個可檢查結果', fr: 'Six termes, un résultat vérifié' }, bodies: { en: 'Separate token, context, prompt, response, and tool authority before you trust the answer.', zh: '在相信回答前，分开 token、上下文、提示、响应和工具权限。', es: 'Separa token, contexto, prompt, respuesta y autoridad de la herramienta antes de confiar en la respuesta.', ja: '回答を信じる前に、トークン、コンテキスト、プロンプト、応答、ツールの権限を分けます。', ko: '답변을 믿기 전에 토큰, 맥락, 프롬프트, 응답과 도구 권한을 분리합니다.', de: 'Trenne Token, Kontext, Prompt, Antwort und Tool-Berechtigung, bevor du der Antwort vertraust.', 'zh-tw': '在相信回答前，分開 token、上下文、提示、回應與工具權限。', fr: 'Séparez token, contexte, prompt, réponse et autorité de l’outil avant de faire confiance à la réponse.' } },
    { stage: 'understand', asset: 'goal-entry-decision-map-red-black.svg', path: 'book/routes/universal-core-foundations', titles: { en: 'Choose a goal before the catalogue', zh: '先选目标，再看完整目录', es: 'Elige un objetivo antes del catálogo', ja: 'カタログより先に目的を選ぶ', ko: '카탈로그보다 목표부터 고르기', de: 'Ein Ziel vor dem Katalog wählen', 'zh-tw': '先選目標，再看完整目錄', fr: 'Choisir un objectif avant le catalogue' }, bodies: { en: 'Start with a safe task, uncertain result, claim, or transfer question; do not browse without a purpose.', zh: '从安全任务、不确定结果、结论核验或方法迁移中选一个理由，不要漫无目的地浏览。', es: 'Elige entre una tarea segura, un resultado incierto, una afirmación o una transferencia; no navegues sin propósito.', ja: '安全なタスク、曖昧な結果、主張の確認、方法の転用のどれかを選び、目的なく閲覧しません。', ko: '안전한 작업, 불확실한 결과, 주장 확인과 방법 전이 중 하나를 고르고 목적 없이 둘러보지 않습니다.', de: 'Wähle sichere Aufgabe, unsicheres Ergebnis, Aussageprüfung oder Übertragung; blättere nicht ohne Zweck.', 'zh-tw': '從安全任務、不確定結果、主張核對或方法遷移中選一項理由，不要漫無目的地瀏覽。', fr: 'Choisissez entre tâche sûre, résultat incertain, vérification d’affirmation ou transfert ; ne parcourez pas le catalogue sans but.' } },
    { stage: 'understand', asset: 'model-choice-is-a-test.svg', path: 'book/chapters/01-gpt-and-codex', titles: { en: 'Model choice is a bounded comparison', zh: '模型选择是一项有边界的比较', es: 'Elegir modelo es una comparación acotada', ja: 'モデル選択は範囲を区切った比較', ko: '모델 선택은 범위가 있는 비교입니다', de: 'Modellauswahl ist ein begrenzter Vergleich', 'zh-tw': '模型選擇是一項有界線的比較', fr: 'Choisir un modèle est une comparaison délimitée' }, bodies: { en: 'Hold the task contract steady, compare working conditions, and record what the test cannot show.', zh: '保持任务契约不变，比较工作条件，并记录测试无法说明的部分。', es: 'Mantén estable el contrato de tarea, compara las condiciones y registra lo que la prueba no puede mostrar.', ja: 'タスク契約を固定し、動作条件を比べ、テストで分からないことを記録します。', ko: '작업 계약을 고정하고 실행 조건을 비교하며 테스트로 알 수 없는 것을 기록합니다.', de: 'Halte den Aufgabenvertrag fest, vergleiche die Bedingungen und notiere, was der Test nicht zeigen kann.', 'zh-tw': '維持任務契約不變，比較工作條件，並記下測試無法說明的部分。', fr: 'Gardez le contrat de tâche fixe, comparez les conditions et notez ce que le test ne montre pas.' } },
    { stage: 'frame', asset: 'prompt-contract-six-fields-red-black.svg', path: 'book/chapters/03-task-protocol', titles: { en: 'A prompt is a small contract', zh: '提示词是一份小型契约', es: 'Un prompt es un pequeño contrato', ja: 'プロンプトは小さな契約', ko: '프롬프트는 작은 계약입니다', de: 'Ein Prompt ist ein kleiner Vertrag', 'zh-tw': '提示是一份小型契約', fr: 'Un prompt est un petit contrat' }, bodies: { en: 'Make result, context, allowed help, limits, check, and stop visible before the request starts.', zh: '在发出请求前，让结果、上下文、允许的帮助、限制、检查和停止条件都可见。', es: 'Haz visibles el resultado, el contexto, la ayuda permitida, los límites, la comprobación y la parada antes de empezar.', ja: '依頼を始める前に、結果、コンテキスト、許可する支援、制約、確認、停止を見える形にします。', ko: '요청을 시작하기 전에 결과, 맥락, 허용된 도움, 제한, 점검과 중지를 분명히 합니다.', de: 'Mache Ergebnis, Kontext, erlaubte Hilfe, Grenzen, Prüfung und Stopp vor der Anfrage sichtbar.', 'zh-tw': '在提出請求前，讓結果、上下文、允許的協助、限制、檢查與停止條件都清楚可見。', fr: 'Rendez visibles le résultat, le contexte, l’aide autorisée, les limites, le contrôle et l’arrêt avant la demande.' } },
    { stage: 'frame', asset: 'first-turn-contract-card.svg', path: 'book/chapters/03-task-protocol', titles: { en: 'Six fields for a bounded first request', zh: '有边界的第一次请求需要六个字段', es: 'Seis campos para una primera petición acotada', ja: '範囲を区切った最初の依頼に必要な6項目', ko: '범위 있는 첫 요청의 여섯 필드', de: 'Sechs Felder für eine begrenzte erste Anfrage', 'zh-tw': '有界線的第一次請求需要六個欄位', fr: 'Six champs pour une première demande délimitée' }, bodies: { en: 'Use one observable outcome, supplied context, response shape, limits, a check, and a receipt.', zh: '写下一个可观察结果、已提供的上下文、回答形式、限制、检查方式和回执。', es: 'Especifica un resultado observable, el contexto aportado, la forma de respuesta, los límites, una comprobación y un registro.', ja: '観察できる結果、与えたコンテキスト、回答形式、制約、確認、記録を指定します。', ko: '관찰 가능한 결과, 제공한 맥락, 답변 형식, 제한, 점검과 기록을 지정합니다.', de: 'Lege ein beobachtbares Ergebnis, gelieferten Kontext, Antwortform, Grenzen, Prüfung und Beleg fest.', 'zh-tw': '指定一個可觀察結果、已提供的上下文、回應形式、限制、檢查方式與紀錄。', fr: 'Précisez un résultat observable, le contexte fourni, la forme de réponse, les limites, un contrôle et un relevé.' } },
    { stage: 'act', asset: 'conversation-safety-card-red-black.svg', path: 'book/chapters/13-action-boundaries', titles: { en: 'A model proposal is not a tool receipt', zh: '模型提议不是工具回执', es: 'Una propuesta del modelo no es un comprobante de herramienta', ja: 'モデルの提案はツールの記録ではない', ko: '모델 제안은 도구 기록이 아닙니다', de: 'Ein Modellvorschlag ist kein Tool-Beleg', 'zh-tw': '模型提議不是工具紀錄', fr: 'Une proposition du modèle n’est pas un relevé d’outil' }, bodies: { en: 'Separate what may enter, leave, change, and support a completion claim.', zh: '分开什么可以进入、离开、改变，以及什么能支持完成结论。', es: 'Separa lo que puede entrar, salir, cambiar y respaldar una afirmación de finalización.', ja: '何を入力でき、外へ出せ、変更でき、完了の主張を支えるかを分けます。', ko: '무엇이 들어오고 나가며 바뀌고 완료 주장을 뒷받침하는지 분리합니다.', de: 'Trenne, was eingehen, hinausgehen, geändert werden und eine Fertigmeldung stützen darf.', 'zh-tw': '分開什麼可以進入、離開、改變，以及什麼能支持完成主張。', fr: 'Séparez ce qui peut entrer, sortir, changer et étayer une affirmation d’achèvement.' } },
    { stage: 'act', asset: 'side-effect-boundary-decision-map.svg', path: 'book/chapters/13-action-boundaries', titles: { en: 'Side-effect boundary decision map', zh: '副作用边界决策图', es: 'Mapa de decisión de los efectos externos', ja: '副作用の境界を決めるマップ', ko: '부작용 경계를 정하는 의사결정 지도', de: 'Entscheidungskarte für Außenwirkungen', 'zh-tw': '副作用界線判斷圖', fr: 'Carte de décision des effets externes' }, bodies: { en: 'Reading and local reversible work stay narrow; external effects require stronger authority and recovery evidence.', zh: '阅读和本地可回退工作保持狭窄范围；外部影响需要更强的权限和恢复证据。', es: 'La lectura y el trabajo local reversible se mantienen acotados; los efectos externos exigen más autoridad y pruebas de recuperación.', ja: '読み取りとローカルの可逆操作は狭く保ち、外部への影響には強い権限と復旧の証拠を求めます。', ko: '읽기와 로컬 되돌리기 작업은 좁게 유지하고 외부 효과에는 더 강한 권한과 복구 증거를 요구합니다.', de: 'Lesen und lokale reversible Arbeit bleiben eng begrenzt; Außenwirkungen brauchen stärkere Berechtigung und Wiederherstellungsbelege.', 'zh-tw': '讀取與本機可復原工作維持狹窄範圍；外部影響需要更強的權限與復原證據。', fr: 'La lecture et le travail local réversible restent limités ; les effets externes exigent une autorité et des preuves de reprise plus fortes.' } },
    { stage: 'inspect', asset: 'task-to-evidence-red-black.svg', path: 'book/chapters/09-verification-and-recovery', titles: { en: 'A claim can travel only as far as its evidence', zh: '结论只能走到证据允许的地方', es: 'Una afirmación solo llega hasta donde llega su evidencia', ja: '主張は証拠の届く範囲までしか進めない', ko: '주장은 증거가 닿는 곳까지만 갈 수 있습니다', de: 'Eine Aussage reicht nur so weit wie ihr Beleg', 'zh-tw': '主張只能走到證據允許的地方', fr: 'Une affirmation ne va pas au-delà de ses preuves' }, bodies: { en: 'Move from request to scope, action, observation, and a claim that stays inside the record.', zh: '从请求走到范围、行动、观察，再提出不超出记录范围的结论。', es: 'Pasa de la petición al alcance, la acción y la observación, y formula una afirmación dentro del registro.', ja: '依頼から範囲、行動、観察へ進み、記録の中に収まる主張にします。', ko: '요청에서 범위, 행동과 관찰로 이어 가며 기록 안에 머무는 주장을 만듭니다.', de: 'Gehe von Anfrage über Umfang, Handlung und Beobachtung zu einer Aussage innerhalb des Protokolls.', 'zh-tw': '從請求走到範圍、行動與觀察，再提出不超出紀錄範圍的主張。', fr: 'Passez de la demande au périmètre, à l’action et à l’observation, puis formulez une affirmation limitée au relevé.' } },
    { stage: 'inspect', asset: 'claim-to-evidence-audit-red-black.svg', path: 'book/chapters/15-research-track', titles: { en: 'Claim to evidence audit', zh: '从结论到证据的审计', es: 'Auditar la afirmación y la evidencia', ja: '主張から証拠への監査', ko: '주장에서 증거까지 점검하기', de: 'Aussage und Beleg prüfen', 'zh-tw': '從主張到證據的稽核', fr: 'Auditer l’affirmation et les preuves' }, bodies: { en: 'State the claim, bound its scope, name the source owner, run the smallest check, and keep the limit.', zh: '写清结论，限定范围，标出来源负责人，执行最小检查，并保留限制。', es: 'Formula la afirmación, limita su alcance, nombra al responsable de la fuente, haz la comprobación mínima y conserva el límite.', ja: '主張を書き、範囲を限定し、出典の責任者を記録し、最小限の確認を行い、限界を残します。', ko: '주장을 적고 범위를 정하며 출처 책임자를 밝히고 가장 작은 점검을 수행한 뒤 한계를 남깁니다.', de: 'Formuliere die Aussage, begrenze den Umfang, nenne den Quellenverantwortlichen, prüfe klein und bewahre die Grenze.', 'zh-tw': '寫清楚主張，限定範圍，標出來源負責人，執行最小檢查，並保留界線。', fr: 'Formulez l’affirmation, délimitez-la, nommez le responsable de la source, effectuez le plus petit contrôle et gardez la limite.' } },
    { stage: 'inspect', asset: 'source-check-before-belief-red-black.svg', path: 'book/chapters/14-discover-and-audit-skills', titles: { en: 'Check the source before trusting the claim', zh: '先查来源，再决定是否相信', es: 'Comprueba la fuente antes de darlo por cierto', ja: '信じる前に出典を確かめる', ko: '믿기 전에 출처 확인하기', de: 'Prüfe die Quelle, bevor du der Aussage vertraust', 'zh-tw': '先查來源，再決定是否相信', fr: 'Vérifier la source avant de faire confiance à l’affirmation' }, bodies: { en: 'Open the source, locate the exact passage, compare scope and date, and record what remains unverified.', zh: '打开来源，定位原文，比较范围和日期，并记录仍未核实的部分。', es: 'Abre la fuente, localiza el pasaje exacto, compara el alcance y la fecha, y registra lo que siga sin verificar.', ja: '出典を開き、該当箇所を特定し、範囲と日付を比べ、未確認の点を記録します。', ko: '출처를 열어 정확한 부분을 찾고 범위와 날짜를 대조한 뒤 아직 확인하지 못한 점을 기록합니다.', de: 'Öffne die Quelle, finde die genaue Stelle, vergleiche Umfang und Datum und halte fest, was ungeprüft bleibt.', 'zh-tw': '開啟來源，定位原文，對照範圍與日期，並記下仍未核實的部分。', fr: 'Ouvrez la source, repérez le passage exact, comparez le périmètre et la date, puis notez ce qui reste invérifié.' } },
    { stage: 'inspect', asset: 'evidence-to-decision-stop-map-red-black.svg', path: 'book/chapters/09-verification-and-recovery', titles: { en: 'From evidence to a decision — and a stop', zh: '从证据走到决定，再决定是否停止', es: 'De la evidencia a la decisión y la parada', ja: '証拠から判断し、必要なら止まる', ko: '증거를 결정으로 잇고, 필요하면 멈추기', de: 'Vom Beleg zur Entscheidung — und zum Stopp', 'zh-tw': '從證據走到判斷，再決定是否停止', fr: 'Passer des preuves à la décision, puis s’arrêter' }, bodies: { en: 'Compare the record with the claim; choose a bounded action, downgrade the claim, or stop when evidence or authority is missing.', zh: '把记录与结论对照；证据或权限不足时，选择有边界的行动、降级结论，或停止。', es: 'Compara el registro con la afirmación; elige una acción acotada, rebaja la afirmación o detente si faltan pruebas o autorización.', ja: '記録と主張を照合し、範囲を区切った行動を選ぶか、証拠や権限が足りなければ主張を下げて止まります。', ko: '기록과 주장을 대조해 범위가 정해진 행동을 선택하고, 증거나 권한이 부족하면 주장을 낮추거나 멈춥니다.', de: 'Vergleiche Protokoll und Aussage; wähle eine begrenzte Handlung, stufe die Aussage zurück oder stoppe, wenn Beleg oder Berechtigung fehlen.', 'zh-tw': '把紀錄與主張對照；證據或權限不足時，選擇有界線的行動、降低主張強度，或停止。', fr: 'Comparez le relevé à l’affirmation ; choisissez une action délimitée, reclassez l’affirmation ou arrêtez-vous si la preuve ou l’autorisation manque.' } },
    { stage: 'repair', asset: 'failed-interaction-recovery-red-black.svg', path: 'book/chapters/12-agent-loop-and-stop', titles: { en: 'Failed interaction recovery', zh: '失败交互的恢复', es: 'Recuperar una interacción fallida', ja: '失敗したやり取りからの復旧', ko: '실패한 상호작용 복구', de: 'Fehlerhafte Interaktion wiederherstellen', 'zh-tw': '失敗互動的復原', fr: 'Récupérer une interaction qui a échoué' }, bodies: { en: 'Preserve the inputs and trace, classify the first mismatch, change one condition, and keep the result bounded.', zh: '保留输入和轨迹，分类第一个不匹配，只改变一个条件，并让结论保持有边界。', es: 'Conserva las entradas y el rastro, clasifica el primer desajuste, cambia una condición y mantén acotado el resultado.', ja: '入力と記録を残し、最初の不一致を分類し、条件を1つだけ変えて、結果の範囲を保ちます。', ko: '입력과 추적 기록을 보존하고 첫 불일치를 분류한 뒤 조건 하나만 바꾸며 결과의 범위를 제한합니다.', de: 'Bewahre Eingaben und Spur, klassifiziere die erste Abweichung, ändere eine Bedingung und halte das Ergebnis begrenzt.', 'zh-tw': '保留輸入與軌跡，分類第一個不相符，只改變一個條件，並讓結果保持有界線。', fr: 'Conservez les entrées et la trace, classez le premier écart, ne changez qu’une condition et gardez le résultat délimité.' } },
    { stage: 'repair', asset: 'recovery-decision-tree-red-black.svg', path: 'book/chapters/12-agent-loop-and-stop', titles: { en: 'Recovery decision tree', zh: '恢复决策树', es: 'Árbol de decisión para recuperar', ja: '復旧の判断ツリー', ko: '복구 의사결정 트리', de: 'Entscheidungsbaum für die Wiederherstellung', 'zh-tw': '復原決策樹', fr: 'Arbre de décision pour la reprise' }, bodies: { en: 'Preserve the trace, find the first mismatch, check authority, run one safe check, or stop with a small claim.', zh: '保留轨迹，找到第一个不匹配，检查权限，执行一次安全检查；否则停下并缩小结论。', es: 'Conserva el rastro, encuentra el primer desajuste, comprueba la autoridad, haz una verificación segura o detente con una afirmación pequeña.', ja: '記録を保存し、最初の不一致を見つけ、権限を確認し、安全な確認を1つ行うか、小さな主張で止まります。', ko: '기록을 보존하고 첫 불일치를 찾은 뒤 권한을 확인합니다. 안전한 점검 하나를 하거나 작은 주장으로 멈춥니다.', de: 'Bewahre die Spur, finde die erste Abweichung, prüfe die Berechtigung, führe einen sicheren Check aus oder stoppe mit einer kleinen Aussage.', 'zh-tw': '保留軌跡，找出第一個不相符，檢查權限，執行一次安全檢查；否則停下並縮小主張。', fr: 'Conservez la trace, trouvez le premier écart, vérifiez l’autorité, faites un contrôle sûr ou arrêtez-vous avec une affirmation limitée.' } },
    { stage: 'transfer', asset: 'understanding-to-transfer-red-black.svg', path: 'book/chapters/20-personal-codex-work-system', titles: { en: 'From understanding to transfer', zh: '从理解到迁移', es: 'De entender a transferir', ja: '理解から転用へ', ko: '이해에서 전이까지', de: 'Vom Verstehen zur Übertragung', 'zh-tw': '從理解到遷移', fr: 'De la compréhension au transfert' }, bodies: { en: 'Understand the boundary, make a bounded attempt, inspect it, repair one mismatch, vary one condition, and repeat.', zh: '理解边界，做一次有边界的尝试，检查结果，修正一个不匹配，改变一个条件，再重复方法。', es: 'Entiende el límite, haz un intento acotado, inspecciónalo, repara un desajuste, cambia una condición y repite.', ja: '境界を理解し、範囲を区切って試し、確認し、不一致を1つ直し、条件を1つ変えて繰り返します。', ko: '경계를 이해하고 범위 있는 시도를 한 뒤 점검하며 불일치 하나를 고치고 조건 하나를 바꿔 반복합니다.', de: 'Verstehe die Grenze, mache einen begrenzten Versuch, prüfe ihn, repariere eine Abweichung, ändere eine Bedingung und wiederhole.', 'zh-tw': '理解界線，做一次有界線的嘗試，檢查結果，修正一個不相符，改變一個條件，再重複方法。', fr: 'Comprenez la limite, faites un essai délimité, inspectez-le, corrigez un écart, changez une condition et recommencez.' } },
    { stage: 'transfer', asset: 'beginner-practice-loop-red-black.svg', path: 'book/chapters/20-personal-codex-work-system', titles: { en: 'Beginner practice loop', zh: '初学者练习闭环', es: 'Ciclo de práctica para principiantes', ja: '初心者の練習ループ', ko: '초보자 연습 루프', de: 'Übungszyklus für Einsteiger', 'zh-tw': '初學者練習閉環', fr: 'Boucle de pratique pour débutants' }, bodies: { en: 'Make an unaided attempt, correct one point, vary the case, and keep a bounded receipt instead of claiming mastery.', zh: '先独立尝试，修正一个要点，改变案例，再保留有边界的记录，不要直接宣称掌握。', es: 'Haz un intento sin ayuda, corrige un punto, cambia el caso y conserva un registro acotado en vez de afirmar dominio.', ja: '自力で試し、1点を直し、条件を変えて、習得を主張する代わりに範囲のある記録を残します。', ko: '도움 없이 시도하고 한 가지를 고친 뒤 사례를 바꿔 보며 숙련을 주장하는 대신 범위 있는 기록을 남깁니다.', de: 'Versuche es ohne Hilfe, korrigiere einen Punkt, verändere den Fall und bewahre einen begrenzten Beleg statt Beherrschung zu behaupten.', 'zh-tw': '先獨立嘗試，修正一個要點，改變案例，再保留有界線的紀錄，不要直接宣稱掌握。', fr: 'Essayez sans aide, corrigez un point, changez le cas et gardez un relevé limité au lieu de proclamer la maîtrise.' } },
  ];

  const params = new URLSearchParams(window.location.search);
  const requestedLocale = params.get('lang');
  let locale = Object.prototype.hasOwnProperty.call(LOCALES, requestedLocale) ? requestedLocale : 'en';
  const invalidLocale = Boolean(requestedLocale) && !Object.prototype.hasOwnProperty.call(LOCALES, requestedLocale);
  let activeIntentId = 'start';
  let activeJourneyId = 'foundation';
  let activeStageId = 'understand';
  let activeEvidenceId = 'question';
  let activeReadingLoopId = 'problem';
  let activeConceptId = 'token';
  let activeBoundaryId = 'proposal';
  let activeRouteId = 'purpose';

  const query = (selector) => document.querySelector(selector);
  const queryAll = (selector) => [...document.querySelectorAll(selector)];
  const copy = () => COPY[locale] || COPY.en;
  const localized = (values) => values[locale] || values.en;

  function readerHref(base) {
    const file = `${base}-${LOCALES[locale].suffix}.md`;
    return `reader.html?path=${encodeURIComponent(file)}&lang=${encodeURIComponent(locale)}`;
  }

  function assetHref(asset) { return `../assets/teaching/${asset}`; }

  function renderVisualRoute() {
    const nodes = query('[data-visual-route-nodes]');
    const fallback = query('[data-visual-route-fallback]');
    if (!nodes || !fallback) return;
    const strings = copy();
    nodes.replaceChildren();
    fallback.replaceChildren();
    VISUAL_ROUTE_STEPS.forEach((step, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'visual-route-node';
      button.dataset.visualRoute = step.id;
      button.setAttribute('aria-pressed', String(step.id === activeRouteId));
      button.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${localized(step.labels)}`);
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = localized(step.labels);
      button.append(number, label);
      button.addEventListener('click', () => {
        activeRouteId = step.id;
        renderVisualRoute();
        document.getElementById(step.section)?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
      });
      if (step.id === activeRouteId) button.classList.add('is-selected');
      item.append(button);
      nodes.append(item);

      const fallbackItem = document.createElement('li');
      const fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = `${String(index + 1).padStart(2, '0')} · ${localized(step.labels)}`;
      const fallbackBody = document.createElement('span');
      fallbackBody.textContent = localized(step.bodies);
      const fallbackNext = document.createElement('em');
      fallbackNext.textContent = `${strings.routeNext}: ${localized(step.next)}`;
      const fallbackLink = document.createElement('a');
      fallbackLink.className = 'visual-action-link';
      fallbackLink.href = `#${step.section}`;
      fallbackLink.textContent = `${strings.routeOpen} ↘`;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackNext, fallbackLink);
      fallback.append(fallbackItem);
    });
    const step = VISUAL_ROUTE_STEPS.find((candidate) => candidate.id === activeRouteId) || VISUAL_ROUTE_STEPS[0];
    const detailTitle = query('[data-visual-route-title]');
    const detailBody = query('[data-visual-route-body]');
    const detailNext = query('[data-visual-route-next]');
    const detailLink = query('[data-visual-route-link]');
    if (detailTitle) detailTitle.textContent = localized(step.labels);
    if (detailBody) detailBody.textContent = localized(step.bodies);
    if (detailNext) detailNext.textContent = localized(step.next);
    if (detailLink) detailLink.href = `#${step.section}`;
  }

  function renderIntentMap() {
    const nodes = query('[data-visual-goal-nodes]');
    const fallback = query('[data-visual-goal-fallback]');
    if (!nodes || !fallback) return;
    const strings = copy();
    nodes.replaceChildren();
    fallback.replaceChildren();
    INTENTS.forEach((intent, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'visual-goal-node';
      button.dataset.intent = intent.id;
      button.setAttribute('aria-pressed', String(intent.id === activeIntentId));
      button.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${localized(intent.labels)}`);
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = localized(intent.labels);
      button.append(number, label);
      button.addEventListener('click', () => { activeIntentId = intent.id; renderIntentMap(); });
      if (intent.id === activeIntentId) button.classList.add('is-selected');
      item.append(button);
      nodes.append(item);

      const fallbackItem = document.createElement('li');
      const fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = `${String(index + 1).padStart(2, '0')} · ${localized(intent.labels)}`;
      const fallbackBody = document.createElement('span');
      fallbackBody.textContent = localized(intent.bodies);
      const fallbackLink = document.createElement('a');
      fallbackLink.className = 'visual-action-link';
      fallbackLink.href = readerHref(intent.path);
      fallbackLink.textContent = `${strings.goalOpen} ↗`;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackLink);
      fallback.append(fallbackItem);
    });
    const intent = INTENTS.find((candidate) => candidate.id === activeIntentId) || INTENTS[0];
    const detailTitle = query('[data-visual-goal-title]');
    const detailBody = query('[data-visual-goal-body]');
    const detailNext = query('[data-visual-goal-next]');
    const detailLink = query('[data-visual-goal-link]');
    const image = query('[data-visual-goal-image]');
    const imageLink = query('[data-visual-goal-image-link]');
    const caption = query('[data-visual-goal-caption]');
    if (detailTitle) detailTitle.textContent = localized(intent.labels);
    if (detailBody) detailBody.textContent = localized(intent.bodies);
    if (detailNext) detailNext.textContent = localized(intent.next);
    if (detailLink) detailLink.href = readerHref(intent.path);
    if (image) image.alt = localized(intent.imageAlt);
    if (imageLink) imageLink.href = assetHref(intent.asset);
    if (imageLink) imageLink.setAttribute('aria-label', `${strings.goalOpenVisual}: ${localized(intent.labels)}`);
    if (caption) caption.textContent = localized(intent.caption);
  }

  function renderJourney() {
    const nodes = query('[data-visual-journey-nodes]');
    const fallback = query('[data-visual-journey-fallback]');
    if (!nodes || !fallback) return;
    const strings = copy();
    nodes.replaceChildren();
    fallback.replaceChildren();
    JOURNEY_STAGES.forEach((stage, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'visual-journey-node';
      button.dataset.journey = stage.id;
      button.setAttribute('aria-pressed', String(stage.id === activeJourneyId));
      button.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${localized(stage.labels)}`);
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = localized(stage.labels);
      button.append(number, label);
      button.addEventListener('click', () => { activeJourneyId = stage.id; renderJourney(); });
      if (stage.id === activeJourneyId) button.classList.add('is-selected');
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
      fallbackLink.textContent = `${strings.journeyOpen} ↗`;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackLink);
      fallback.append(fallbackItem);
    });
    const stage = JOURNEY_STAGES.find((candidate) => candidate.id === activeJourneyId) || JOURNEY_STAGES[0];
    const detailTitle = query('[data-visual-journey-title]');
    const detailBody = query('[data-visual-journey-body]');
    const detailNext = query('[data-visual-journey-next]');
    const detailLink = query('[data-visual-journey-link]');
    const image = query('[data-visual-journey-image]');
    const imageLink = query('[data-visual-journey-image-link]');
    if (detailTitle) detailTitle.textContent = localized(stage.labels);
    if (detailBody) detailBody.textContent = localized(stage.bodies);
    if (detailNext) detailNext.textContent = localized(stage.next);
    if (detailLink) detailLink.href = readerHref(stage.path);
    if (image) image.alt = strings.journeyFigureAlt;
    if (imageLink) imageLink.setAttribute('aria-label', `${strings.journeyOpenVisual}: ${localized(stage.labels)}`);
  }

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

  function renderEvidenceMap() {
    const nodes = query('[data-visual-evidence-nodes]');
    const fallback = query('[data-visual-evidence-fallback]');
    if (!nodes || !fallback) return;
    const strings = copy();
    nodes.replaceChildren();
    fallback.replaceChildren();
    EVIDENCE_STEPS.forEach((step, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'visual-evidence-node';
      button.dataset.evidence = step.id;
      button.setAttribute('aria-pressed', String(step.id === activeEvidenceId));
      button.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${localized(step.labels)}`);
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = localized(step.labels);
      button.append(number, label);
      button.addEventListener('click', () => { activeEvidenceId = step.id; renderEvidenceMap(); });
      if (step.id === activeEvidenceId) button.classList.add('is-selected');
      item.append(button);
      nodes.append(item);

      const fallbackItem = document.createElement('li');
      const fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = `${String(index + 1).padStart(2, '0')} · ${localized(step.labels)}`;
      const fallbackBody = document.createElement('span');
      fallbackBody.textContent = localized(step.bodies);
      const fallbackNext = document.createElement('em');
      fallbackNext.textContent = `${strings.evidenceNext}: ${localized(step.next)}`;
      const fallbackLink = document.createElement('a');
      fallbackLink.className = 'visual-action-link';
      fallbackLink.href = readerHref(step.path);
      fallbackLink.textContent = `${strings.evidenceOpen} ↗`;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackNext, fallbackLink);
      fallback.append(fallbackItem);
    });
    const step = EVIDENCE_STEPS.find((candidate) => candidate.id === activeEvidenceId) || EVIDENCE_STEPS[0];
    const detailTitle = query('[data-visual-evidence-title]');
    const detailBody = query('[data-visual-evidence-body]');
    const detailNext = query('[data-visual-evidence-next]');
    const detailLink = query('[data-visual-evidence-link]');
    const image = query('[data-visual-evidence-image]');
    const imageLink = query('[data-visual-evidence-image-link]');
    if (detailTitle) detailTitle.textContent = localized(step.labels);
    if (detailBody) detailBody.textContent = localized(step.bodies);
    if (detailNext) detailNext.textContent = localized(step.next);
    if (detailLink) detailLink.href = readerHref(step.path);
    if (image) image.alt = strings.evidenceFigureAlt;
    if (imageLink) imageLink.setAttribute('aria-label', `${strings.evidenceOpenVisual}: ${localized(step.labels)}`);
  }

  function renderReadingLoop() {
    const nodes = query('[data-visual-reading-loop-nodes]');
    const fallback = query('[data-visual-reading-loop-fallback]');
    if (!nodes || !fallback) return;
    const strings = copy();
    nodes.replaceChildren();
    fallback.replaceChildren();
    READING_LOOP_STEPS.forEach((step, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'visual-reading-loop-node';
      button.dataset.readingLoop = step.id;
      button.setAttribute('aria-pressed', String(step.id === activeReadingLoopId));
      button.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${localized(step.labels)}`);
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = localized(step.labels);
      button.append(number, label);
      button.addEventListener('click', () => { activeReadingLoopId = step.id; renderReadingLoop(); });
      if (step.id === activeReadingLoopId) button.classList.add('is-selected');
      item.append(button);
      nodes.append(item);

      const fallbackItem = document.createElement('li');
      const fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = `${String(index + 1).padStart(2, '0')} · ${localized(step.labels)}`;
      const fallbackBody = document.createElement('span');
      fallbackBody.textContent = localized(step.bodies);
      const fallbackNext = document.createElement('em');
      fallbackNext.textContent = `${strings.readingNext}: ${localized(step.next)}`;
      const fallbackLink = document.createElement('a');
      fallbackLink.className = 'visual-action-link';
      fallbackLink.href = readerHref(step.path);
      fallbackLink.textContent = `${strings.readingOpen} ↗`;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackNext, fallbackLink);
      fallback.append(fallbackItem);
    });
    const step = READING_LOOP_STEPS.find((candidate) => candidate.id === activeReadingLoopId) || READING_LOOP_STEPS[0];
    const detailTitle = query('[data-visual-reading-loop-title]');
    const detailBody = query('[data-visual-reading-loop-body]');
    const detailNext = query('[data-visual-reading-loop-next]');
    const detailLink = query('[data-visual-reading-loop-link]');
    const image = query('[data-visual-reading-loop-image]');
    const imageLink = query('[data-visual-reading-loop-image-link]');
    if (detailTitle) detailTitle.textContent = localized(step.labels);
    if (detailBody) detailBody.textContent = localized(step.bodies);
    if (detailNext) detailNext.textContent = localized(step.next);
    if (detailLink) detailLink.href = readerHref(step.path);
    if (image) image.alt = strings.readingFigureAlt;
    if (imageLink) imageLink.setAttribute('aria-label', `${strings.readingOpenVisual}: ${localized(step.labels)}`);
  }

  function renderConceptMap() {
    const nodes = query('[data-visual-concept-nodes]');
    const fallback = query('[data-visual-concept-fallback]');
    if (!nodes || !fallback) return;
    const strings = copy();
    nodes.replaceChildren();
    fallback.replaceChildren();
    CONCEPTS.forEach((concept, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'visual-concept-node';
      button.dataset.concept = concept.id;
      button.setAttribute('aria-pressed', String(concept.id === activeConceptId));
      button.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${localized(concept.labels)}`);
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = localized(concept.labels);
      button.append(number, label);
      button.addEventListener('click', () => { activeConceptId = concept.id; renderConceptMap(); });
      if (concept.id === activeConceptId) button.classList.add('is-selected');
      item.append(button);
      nodes.append(item);

      const fallbackItem = document.createElement('li');
      const fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = `${String(index + 1).padStart(2, '0')} · ${localized(concept.labels)}`;
      const fallbackBody = document.createElement('span');
      fallbackBody.textContent = localized(concept.bodies);
      const fallbackNext = document.createElement('em');
      fallbackNext.textContent = `${strings.conceptNext}: ${localized(concept.next)}`;
      const fallbackLink = document.createElement('a');
      fallbackLink.className = 'visual-action-link';
      fallbackLink.href = readerHref(concept.path);
      fallbackLink.textContent = `${strings.conceptOpen} ↗`;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackNext, fallbackLink);
      fallback.append(fallbackItem);
    });
    const concept = CONCEPTS.find((candidate) => candidate.id === activeConceptId) || CONCEPTS[0];
    const detailTitle = query('[data-visual-concept-title]');
    const detailBody = query('[data-visual-concept-body]');
    const detailNext = query('[data-visual-concept-next]');
    const detailLink = query('[data-visual-concept-link]');
    const image = query('[data-visual-concept-image]');
    const imageLink = query('[data-visual-concept-image-link]');
    if (detailTitle) detailTitle.textContent = localized(concept.labels);
    if (detailBody) detailBody.textContent = localized(concept.bodies);
    if (detailNext) detailNext.textContent = localized(concept.next);
    if (detailLink) detailLink.href = readerHref(concept.path);
    if (image) image.alt = strings.conceptFigureAlt;
    if (imageLink) imageLink.setAttribute('aria-label', `${strings.conceptOpenVisual}: ${localized(concept.labels)}`);
  }

  function renderActionBoundaryMap() {
    const nodes = query('[data-visual-action-boundary-nodes]');
    const fallback = query('[data-visual-action-boundary-fallback]');
    if (!nodes || !fallback) return;
    const strings = copy();
    nodes.replaceChildren();
    fallback.replaceChildren();
    ACTION_BOUNDARY_STEPS.forEach((step, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'visual-action-boundary-node';
      button.dataset.boundary = step.id;
      button.setAttribute('aria-pressed', String(step.id === activeBoundaryId));
      button.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${localized(step.labels)}`);
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('strong');
      label.textContent = localized(step.labels);
      button.append(number, label);
      button.addEventListener('click', () => { activeBoundaryId = step.id; renderActionBoundaryMap(); });
      if (step.id === activeBoundaryId) button.classList.add('is-selected');
      item.append(button);
      nodes.append(item);

      const fallbackItem = document.createElement('li');
      const fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = `${String(index + 1).padStart(2, '0')} · ${localized(step.labels)}`;
      const fallbackBody = document.createElement('span');
      fallbackBody.textContent = localized(step.bodies);
      const fallbackNext = document.createElement('em');
      fallbackNext.textContent = `${strings.boundaryNext}: ${localized(step.next)}`;
      const fallbackLink = document.createElement('a');
      fallbackLink.className = 'visual-action-link';
      fallbackLink.href = readerHref(step.path);
      fallbackLink.textContent = `${strings.boundaryOpen} ↗`;
      fallbackItem.append(fallbackTitle, fallbackBody, fallbackNext, fallbackLink);
      fallback.append(fallbackItem);
    });
    const step = ACTION_BOUNDARY_STEPS.find((candidate) => candidate.id === activeBoundaryId) || ACTION_BOUNDARY_STEPS[0];
    const detailTitle = query('[data-visual-action-boundary-title]');
    const detailBody = query('[data-visual-action-boundary-body]');
    const detailNext = query('[data-visual-action-boundary-next]');
    const detailLink = query('[data-visual-action-boundary-link]');
    const image = query('[data-visual-action-boundary-image]');
    const imageLink = query('[data-visual-action-boundary-image-link]');
    if (detailTitle) detailTitle.textContent = localized(step.labels);
    if (detailBody) detailBody.textContent = localized(step.bodies);
    if (detailNext) detailNext.textContent = localized(step.next);
    if (detailLink) detailLink.href = readerHref(step.path);
    if (image) image.alt = strings.boundaryFigureAlt;
    if (imageLink) imageLink.setAttribute('aria-label', `${strings.boundaryOpenVisual}: ${localized(step.labels)}`);
  }

  function renderGallery() {
    const gallery = query('[data-visual-gallery]');
    if (!gallery) return;
    const strings = copy();
    gallery.replaceChildren();
    const renderCards = (target, cards) => cards.forEach((card) => {
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
      target.append(article);
    });
    renderCards(gallery, CARDS.slice(0, 9));
    const moreGallery = query('[data-visual-gallery-more]');
    if (moreGallery) {
      moreGallery.replaceChildren();
      renderCards(moreGallery, CARDS.slice(9));
    }
    const moreSummary = query('.visual-gallery-more summary');
    const moreIntro = query('.visual-gallery-more > p');
    if (moreSummary) moreSummary.textContent = strings.galleryMoreSummary;
    if (moreIntro) moreIntro.textContent = strings.galleryMoreIntro;
  }

  function setLocale(nextLocale, updateUrl = true) {
    if (!Object.prototype.hasOwnProperty.call(LOCALES, nextLocale)) return;
    locale = nextLocale;
    setText();
    renderVisualRoute();
    renderIntentMap();
    renderJourney();
    renderConceptMap();
    renderActionBoundaryMap();
    renderMap();
    renderEvidenceMap();
    renderReadingLoop();
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
  renderVisualRoute();
  renderIntentMap();
  renderJourney();
  renderConceptMap();
  renderActionBoundaryMap();
  renderMap();
  renderEvidenceMap();
  renderReadingLoop();
  renderGallery();
})();
