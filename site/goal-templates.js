/* Generated from the six-language goal wizard templates. Do not edit by hand. */
window.GOAL_TEMPLATES = {
 "schema_version": "1",
 "generator": "scripts build helper",
 "goals": {
  "en": {
   "language": {
    "fields": [
     {
      "key": "language",
      "label": "Language to practise",
      "placeholder": "e.g. Spanish, French, German"
     },
     {
      "key": "scene",
      "label": "One scene",
      "placeholder": "e.g. hotel check-in, café order, train station"
     }
    ],
    "template": "Run one typed four-turn {scene} in {language}. You play the other role and write first, one short question at a time. I will type one answer after each question.\n\nUse fictional details only. Do not request or accept real names, booking numbers, passports, addresses, contacts, or payment details. Before turn one, show this fixed check: four learner turns; the requested information communicated; one ambiguity resolved; understandable enough to continue. Do not translate, teach, or show a model answer before I reply. Preserve my first attempt. Correct only the first meaning-blocking error: name the error type, give a partial cue, then one worked fragment only if I still cannot continue. Keep both attempts and do not call one exchange fluency, spoken conversation, or listening/pronunciation evidence.",
    "path": "../book/communication-clinic-EN.md#language-practice-route"
   },
   "work": {
    "fields": [
     {
      "key": "audience",
      "label": "Who will read the update",
      "placeholder": "e.g. a teammate, a manager, a client"
     },
     {
      "key": "facts",
      "label": "Facts to use (one per line)",
      "placeholder": "e.g. draft is 60% complete\nreview is due Friday"
     }
    ],
    "template": "I need to turn the following notes into a short update for {audience}.\n\nRaw notes:\n{facts}\n\nRequirements:\n- first list the facts you can confirm from the raw notes;\n- do not add dates, commitments, completion status, or reasons;\n- give one version under 120 words and one more formal version;\n- end by listing two things I must confirm myself before sending.",
    "path": "../book/work-update-practice-loop-EN.md"
   },
   "research": {
    "fields": [
     {
      "key": "question",
      "label": "The claim you want to check",
      "placeholder": "e.g. This product changed its pricing in 2026"
     },
     {
      "key": "material",
      "label": "Material you can share",
      "placeholder": "URLs, titles, excerpts, or \"none\""
     }
    ],
    "template": "I want to check one claim before repeating it.\n\nQuestion: {question}\nMaterial I supplied: {material}\n\nDo not invent sources, and do not claim you opened anything you cannot access. Make a three-row table: possible claim, supplied source or \"missing\", and what still needs checking. Separate fact, report, and inference. If the material is missing, contradictory, personal, or high stakes, stop and tell me the smallest safe next step.",
    "path": "../book/research-check-practice-loop-EN.md"
   },
   "interview": {
    "fields": [
     {
      "key": "question",
      "label": "The interview question",
      "placeholder": "e.g. Tell me about a time you handled a conflict"
     },
     {
      "key": "time",
      "label": "Answer length",
      "placeholder": "e.g. 90 seconds"
     }
    ],
    "template": "I want to rehearse one interview answer.\n\nQuestion: {question}\nAnswer length: {time}\n\nAsk me to answer first, in my own words, within the time limit. Before I start, state the visible check: one concrete example, one decision, one result, clear structure. After my answer, name at most one material gap and give one partial cue. Then ask me to revise, and finally ask one changed question with the same check and no hints. Do not write a model answer, predict other interview questions, or promise an outcome.",
    "path": "../skills/prysai-interview-rehearsal/SKILL.md"
   },
   "task": {
    "fields": [
     {
      "key": "goal",
      "label": "What you want done",
      "placeholder": "e.g. Fix the broken link on the help page"
     },
     {
      "key": "context",
      "label": "Relevant context",
      "placeholder": "e.g. the file is docs/help.md; I can edit it locally"
     }
    ],
    "template": "I need to turn one task into a clear request.\n\nGoal: {goal}\nContext: {context}\n\nWrite a task contract with exactly these fields: goal, context, allowed actions, acceptance check, evidence, and stop condition. Do not act, browse, or use tools. Ask one question only if a missing field would change the risk or acceptance check. Keep the scope small and reversible.",
    "path": "../book/chapters/03-task-protocol-EN.md#core-task-contract"
   },
   "codex": {
    "fields": [],
    "template": "I am new to AI coding tools. Give me one safe first task: a fictional, text-only exercise with a clear result, supplied material, a response shape, a check I can run myself, and a stop rule. Do not assume I have files, tools, accounts, or permissions. Do not teach a feature list first. End by asking me to make my own first attempt.",
    "path": "../book/chapters/01-gpt-and-codex-EN.md"
   }
  },
  "zh": {
   "language": {
    "fields": [
     {
      "key": "language",
      "label": "要练习的语言",
      "placeholder": "例如：西班牙语、法语、德语"
     },
     {
      "key": "scene",
      "label": "一个场景",
      "placeholder": "例如：酒店入住、咖啡馆点单、火车站"
     }
    ],
    "template": "用 {language} 进行一次四轮打字对话，场景是{scene}。你扮演对方并先开口，一次只问一个短问题，我每轮回复一句。\n\n只使用虚构信息。不要索取或接受真实姓名、预订号、护照、地址、联系方式或支付信息。开始前先展示这份固定检查：四轮学习者回复；所需信息已传达；一处歧义已解决；表达足以让对话继续。在我回复前不要翻译、教学或展示参考答案。保留我的首次尝试。只纠正第一个阻碍理解的问题：说明错误类型，给一个部分提示，只有在我仍然无法继续时才给一个完整片段。保留两次尝试，不要把一次对话称为流利、口语会话或听说能力证据。",
    "path": "../book/communication-clinic-ZH.md#language-practice-route"
   },
   "work": {
    "fields": [
     {
      "key": "audience",
      "label": "谁会读这条更新",
      "placeholder": "例如：同事、主管、客户"
     },
     {
      "key": "facts",
      "label": "要使用的事实（每行一条）",
      "placeholder": "例如：草稿完成 60%\n周五截止评审"
     }
    ],
    "template": "我需要把下面的要点整理成一条发给{audience}的简短更新。\n\n原始要点：\n{facts}\n\n要求：\n- 先列出你能从原始要点中确认的事实；\n- 不要补充日期、承诺、完成状态或原因；\n- 给一个不超过 120 字的版本和一个更正式的版本；\n- 最后列出我发送前必须亲自确认的两件事。",
    "path": "../book/work-update-practice-loop-ZH.md"
   },
   "research": {
    "fields": [
     {
      "key": "question",
      "label": "你想核查的主张",
      "placeholder": "例如：这个产品在 2026 年改了定价"
     },
     {
      "key": "material",
      "label": "你可以分享的材料",
      "placeholder": "链接、标题、摘录，或“无”"
     }
    ],
    "template": "我想在重复一句主张之前先核查它。\n\n问题：{question}\n我提供的材料：{material}\n\n不要编造来源，也不要声称你打开过无法访问的内容。做一张三列表格：可能的主张、提供的来源或“缺失”、还需要核查什么。区分事实、报告与推断。如果材料缺失、互相矛盾、涉及个人或高风险，请停止并告诉我最小且安全的下一步。",
    "path": "../book/research-check-practice-loop-ZH.md"
   },
   "interview": {
    "fields": [
     {
      "key": "question",
      "label": "面试问题",
      "placeholder": "例如：讲一次你处理冲突的经历"
     },
     {
      "key": "time",
      "label": "回答时长",
      "placeholder": "例如：90 秒"
     }
    ],
    "template": "我想演练一个面试回答。\n\n问题：{question}\n回答时长：{time}\n\n先让我用自己的话在时限内回答。开始前先说明可见检查：一个具体例子、一个决定、一个结果、结构清晰。我的回答之后，最多指出一个关键缺口并给一个部分提示。然后让我修改，最后用同样的检查、不给提示地问一个变式问题。不要写参考答案、预测其他面试问题或承诺结果。",
    "path": "../skills/prysai-interview-rehearsal/SKILL.md"
   },
   "task": {
    "fields": [
     {
      "key": "goal",
      "label": "你想完成什么",
      "placeholder": "例如：修复帮助页面上的失效链接"
     },
     {
      "key": "context",
      "label": "相关上下文",
      "placeholder": "例如：文件是 docs/help.md；我可以在本地修改"
     }
    ],
    "template": "我需要把一个任务变成清晰的请求。\n\n目标：{goal}\n上下文：{context}\n\n请写一份任务协议，字段恰好包括：目标、上下文、允许行动、验收检查、证据、停止条件。不要行动、不要浏览、不要使用工具。只有当缺失字段会改变风险或验收检查时才问一个问题。保持范围小且可回滚。",
    "path": "../book/chapters/03-task-protocol-ZH.md#core-task-contract"
   },
   "codex": {
    "fields": [],
    "template": "我是 AI 编程工具的新手。给我一个安全的第一个任务：一个虚构的、纯文字练习，要有明确结果、提供的材料、回复形式、我可以自己运行的检查，以及停止规则。不要假设我有文件、工具、账号或权限。不要先教功能清单。最后请我做出自己的第一次尝试。",
    "path": "../book/chapters/01-gpt-and-codex-ZH.md"
   }
  },
  "es": {
   "language": {
    "fields": [
     {
      "key": "language",
      "label": "Idioma a practicar",
      "placeholder": "p. ej. español, francés, alemán"
     },
     {
      "key": "scene",
      "label": "Una escena",
      "placeholder": "p. ej. registro en el hotel, pedido en un café, estación de tren"
     }
    ],
    "template": "Desarrolla una {scene} escrita de cuatro turnos en {language}. Tú interpretas el otro papel y escribes primero, una pregunta corta cada vez. Yo escribiré una respuesta después de cada pregunta.\n\nUsa únicamente datos ficticios. No pidas ni aceptes nombres reales, números de reserva, pasaportes, direcciones, contactos ni datos de pago. Antes del primer turno, muestra esta comprobación fija: cuatro turnos de quien aprende; la información solicitada comunicada; una ambigüedad resuelta; suficientemente comprensible para continuar. No traduzcas, enseñes ni muestres una respuesta modelo antes de que yo responda. Conserva mi primer intento. Corrige solo el primer error que bloquee el significado: nombra el tipo de error, da una pista parcial y, solo si todavía no puedo continuar, un fragmento resuelto. Conserva ambos intentos y no califiques un único intercambio como fluidez, conversación oral ni evidencia de comprensión o pronunciación.",
    "path": "../book/communication-clinic-ES.md#language-practice-route"
   },
   "work": {
    "fields": [
     {
      "key": "audience",
      "label": "Quién leerá la actualización",
      "placeholder": "p. ej. un compañero, un responsable, un cliente"
     },
     {
      "key": "facts",
      "label": "Datos que usar (uno por línea)",
      "placeholder": "p. ej. el borrador está al 60 %\nla revisión vence el viernes"
     }
    ],
    "template": "Necesito convertir las siguientes notas en una actualización breve para {audience}.\n\nNotas en bruto:\n{facts}\n\nRequisitos:\n- primero, enumera los datos que puedas confirmar a partir de las notas en bruto;\n- no añadas fechas, compromisos, estado de finalización ni motivos;\n- da una versión de menos de 120 palabras y otra versión más formal;\n- termina enumerando dos cosas que debo confirmar yo mismo antes de enviar.",
    "path": "../book/work-update-practice-loop-ES.md"
   },
   "research": {
    "fields": [
     {
      "key": "question",
      "label": "La afirmación que quieres comprobar",
      "placeholder": "p. ej. Este producto cambió sus precios en 2026"
     },
     {
      "key": "material",
      "label": "Material que puedes compartir",
      "placeholder": "URLs, títulos, extractos o «ninguno»"
     }
    ],
    "template": "Quiero comprobar una afirmación antes de repetirla.\n\nPregunta: {question}\nMaterial que he facilitado: {material}\n\nNo inventes fuentes ni afirmes haber abierto algo que no puedes consultar. Haz una tabla de tres filas: afirmación posible, fuente facilitada o «missing», y qué queda por comprobar. Separa hecho, informe e inferencia. Si el material falta, es contradictorio, personal o de alto riesgo, detente y dime cuál es el siguiente paso seguro más pequeño.",
    "path": "../book/research-check-practice-loop-ES.md"
   },
   "interview": {
    "fields": [
     {
      "key": "question",
      "label": "La pregunta de la entrevista",
      "placeholder": "p. ej. Cuéntame una ocasión en la que gestionaste un conflicto"
     },
     {
      "key": "time",
      "label": "Duración de la respuesta",
      "placeholder": "p. ej. 90 segundos"
     }
    ],
    "template": "Quiero ensayar una respuesta de entrevista.\n\nPregunta: {question}\nDuración de la respuesta: {time}\n\nPídeme que responda primero, con mis propias palabras y dentro del límite de tiempo. Antes de que empiece, indica la comprobación visible: un ejemplo concreto, una decisión, un resultado y una estructura clara. Después de mi respuesta, nombra como máximo una carencia sustancial y da una pista parcial. Luego pídeme que la revise y, por último, hazme una pregunta distinta con la misma comprobación y sin pistas. No escribas una respuesta modelo, no predigas otras preguntas de entrevista ni prometas un resultado.",
    "path": "../skills/prysai-interview-rehearsal/SKILL.md"
   },
   "task": {
    "fields": [
     {
      "key": "goal",
      "label": "Qué quieres que se haga",
      "placeholder": "p. ej. Arregla el enlace roto de la página de ayuda"
     },
     {
      "key": "context",
      "label": "Contexto relevante",
      "placeholder": "p. ej. el file es docs/help.md; puedo editarlo localmente"
     }
    ],
    "template": "Necesito convertir una tarea en una solicitud clara.\n\nObjetivo: {goal}\nContexto: {context}\n\nRedacta un contrato de tarea con exactamente estos campos: objetivo, contexto, acciones permitidas, criterio de aceptación, evidencia y condición de parada. No actúes, navegues ni uses tools. Haz una sola pregunta solo si un campo que falte cambiaría el riesgo o el criterio de aceptación. Mantén el alcance pequeño y reversible.",
    "path": "../book/chapters/03-task-protocol-ES.md#core-task-contract"
   },
   "codex": {
    "fields": [],
    "template": "Soy nuevo en las AI coding tools. Dame una primera tarea segura: un ejercicio ficticio, solo de texto, con un resultado claro, material facilitado, un formato de respuesta, una comprobación que pueda ejecutar yo mismo y una regla de parada. No des por hecho que tengo files, tools, accounts ni permisos. No empieces enseñándome una lista de funciones. Termina pidiéndome que haga mi propio primer intento.",
    "path": "../book/chapters/01-gpt-and-codex-ES.md"
   }
  },
  "ja": {
   "language": {
    "fields": [
     {
      "key": "language",
      "label": "練習したい言語",
      "placeholder": "例：スペイン語、フランス語、ドイツ語"
     },
     {
      "key": "scene",
      "label": "ひとつの場面",
      "placeholder": "例：ホテルのチェックイン、カフェでの注文、駅"
     }
    ],
    "template": "{language}で、入力による4ターンの{scene}を1回実施してください。あなたは相手役を務め、最初に短い質問を1つずつ書き出してください。私は各質問の後に回答を1つ入力します。\n\n架空の詳細のみを使用してください。実在の名前、予約番号、パスポート、住所、連絡先、支払い情報を要求したり受け取ったりしないでください。ターン1の前に、以下の固定チェックを提示してください：学習者のターンが4つあること、要求された情報が伝えられたこと、曖昧さが1つ解消されたこと、続行できる程度に理解できたこと。私が返信する前に、翻訳、解説、模範解答の提示をしないでください。私の最初の回答を保持してください。意味の妨げになる最初の誤りだけを修正してください：誤りの種類を指摘し、部分的なヒントを与え、それでも私が続けられない場合にのみ、正しく直した断片を1つ示してください。両方の試みを保持し、1回のやり取りを流暢さ、口頭での会話、または聞き取り・発音の証拠と呼んではいけません。",
    "path": "../book/communication-clinic-JA.md#language-practice-route"
   },
   "work": {
    "fields": [
     {
      "key": "audience",
      "label": "更新内容を読む相手",
      "placeholder": "例：同僚、マネージャー、クライアント"
     },
     {
      "key": "facts",
      "label": "使用する事実（1行に1つ）",
      "placeholder": "例：下書きは60%完成している\nレビューは金曜日が期限"
     }
    ],
    "template": "{audience}向けの短い更新内容に、以下のメモをまとめる必要があります。\n\n元のメモ：\n{facts}\n\n要件：\n- まず、元のメモから確認できる事実を列挙してください。\n- 日付、約束、完了状況、理由を追加しないでください。\n- 120語未満のバージョンを1つと、より正式なバージョンを1つ提示してください。\n- 最後に、送信前に私自身が確認すべきことを2つ挙げてください。",
    "path": "../book/work-update-practice-loop-JA.md"
   },
   "research": {
    "fields": [
     {
      "key": "question",
      "label": "確認したい主張",
      "placeholder": "例：この製品は2026年に価格設定を変更した"
     },
     {
      "key": "material",
      "label": "共有できる資料",
      "placeholder": "URL、タイトル、抜粋、または「なし」"
     }
    ],
    "template": "この主張を繰り返す前に、1つの主張を確認したいです。\n\n質問：{question}\n私が提供した資料：{material}\n\n情報源をでっち上げず、アクセスできないものを開いたと主張しないでください。3行の表を作成してください：考えられる主張、提供された情報源または「欠落」、そしてまだ確認が必要なこと。事実、報告、推論を区別してください。資料が欠落している、矛盾している、個人的なものである、または影響が大きい場合は、一旦停止して、最も安全な次の小さな一歩を教えてください。",
    "path": "../book/research-check-practice-loop-JA.md"
   },
   "interview": {
    "fields": [
     {
      "key": "question",
      "label": "面接の質問",
      "placeholder": "例：対立に対処した経験について教えてください"
     },
     {
      "key": "time",
      "label": "回答時間",
      "placeholder": "例：90秒"
     }
    ],
    "template": "1つの面接回答を練習したいです。\n\n質問：{question}\n回答時間：{time}\n\nまず私に、自分の言葉で、制限時間内に回答するよう求めてください。開始する前に、目に見えるチェックを明示してください：具体的な例が1つ、意思決定が1つ、結果が1つ、明確な構成。回答の後、重要な欠落を最大1つ指摘し、部分的なヒントを1つ与えてください。次に私に修正を求め、最後に、同じチェックを適用し、ヒントなしで内容を変えた質問を1つしてください。模範解答を書かず、他の面接質問を予測せず、結果を約束しないでください。",
    "path": "../skills/prysai-interview-rehearsal/SKILL.md"
   },
   "task": {
    "fields": [
     {
      "key": "goal",
      "label": "やりたいこと",
      "placeholder": "例：ヘルプページの壊れたリンクを修正する"
     },
     {
      "key": "context",
      "label": "関連するコンテキスト",
      "placeholder": "例：file は docs/help.md；ローカルで編集できる"
     }
    ],
    "template": "1つのタスクを明確なリクエストに変換する必要があります。\n\nゴール：{goal}\nコンテキスト：{context}\n\n以下のフィールドを正確に含むタスク契約（task contract）を書いてください：ゴール、コンテキスト、許可されたアクション、受け入れチェック、エビデンス、停止条件。行動せず、ブラウズせず、ツールを使用しないでください。欠落しているフィールドがリスクや受け入れチェックを変える場合にのみ、質問を1つしてください。スコープを小さく、元に戻せる範囲に保ってください。",
    "path": "../book/chapters/03-task-protocol-JA.md#core-task-contract"
   },
   "codex": {
    "fields": [],
    "template": "私はAIコーディングツールに慣れていません。安全な最初のタスクを1つ与えてください：明確な結果、提供された資料、回答の形式、自分で実行できるチェック、停止ルールを備えた、架空のテキストのみの演習。私がfile、tool、account、権限を持っていると想定しないでください。最初に機能リストを教えないでください。最後に、私自身の最初の試みをするよう求めてください。",
    "path": "../book/chapters/01-gpt-and-codex-JA.md"
   }
  },
  "ko": {
   "language": {
    "fields": [
     {
      "key": "language",
      "label": "연습할 언어",
      "placeholder": "예: 스페인어, 프랑스어, 독일어"
     },
     {
      "key": "scene",
      "label": "하나의 장면",
      "placeholder": "예: 호텔 체크인, 카페 주문, 기차역"
     }
    ],
    "template": "{language}로 {scene}을(를) 타이핑으로 4턴 진행해 주세요. 당신은 상대 역할을 맡아 먼저 시작하며, 한 번에 짧은 질문을 하나씩 씁니다. 저는 질문마다 답을 하나씩 타이핑하겠습니다.\n\n가상의 정보만 사용하세요. 실제 이름, 예약 번호, 여권, 주소, 연락처, 결제 정보를 요청하거나 받지 마세요. 첫 턴 전에 다음 고정 확인 항목을 보여주세요: 학습자 턴 4회, 요청한 정보가 전달됨, 모호함 1건 해소됨, 계속 진행할 수 있을 만큼 이해 가능함. 제가 답하기 전에는 번역하거나 가르치거나 모범 답안을 보여주지 마세요. 제 첫 시도는 그대로 보존하세요. 의미 전달을 막는 첫 번째 오류만 수정하세요: 오류 유형을 짚어 주고, 부분 힌트를 하나 주되, 그래도 계속하지 못할 때만 완성된 조각 하나를 보여주세요. 두 시도를 모두 남기고, 단 한 번의 교류를 유창함, 말하기 대화, 듣기/발음 증거라고 부르지 마세요.",
    "path": "../book/communication-clinic-KO.md#language-practice-route"
   },
   "work": {
    "fields": [
     {
      "key": "audience",
      "label": "업데이트를 읽을 대상",
      "placeholder": "예: 동료, 매니저, 고객"
     },
     {
      "key": "facts",
      "label": "사용할 사실(줄마다 하나씩)",
      "placeholder": "예: 초안 60% 완성\n금요일까지 리뷰"
     }
    ],
    "template": "다음 메모를 {audience}에게 보낼 짧은 업데이트로 바꿔 주세요.\n\n원본 메모:\n{facts}\n\n요구사항:\n- 먼저 원본 메모에서 확인할 수 있는 사실을 나열하세요;\n- 날짜, 약속, 완료 여부, 이유를 추가하지 마세요;\n- 120단어 미만 버전 하나와 더 격식 있는 버전 하나를 작성하세요;\n- 마지막에 보내기 전에 제가 직접 확인해야 할 두 가지를 나열하세요.",
    "path": "../book/work-update-practice-loop-KO.md"
   },
   "research": {
    "fields": [
     {
      "key": "question",
      "label": "확인하고 싶은 주장",
      "placeholder": "예: 이 제품은 2026년에 가격 정책을 바꿨다"
     },
     {
      "key": "material",
      "label": "공유할 수 있는 자료",
      "placeholder": "URL, 제목, 발췌문, 또는 \"없음\""
     }
    ],
    "template": "한 가지 주장을 되풀이하기 전에 확인하고 싶습니다.\n\n질문: {question}\n제가 제공한 자료: {material}\n\n출처를 지어내지 말고, 접근할 수 없는 것을 열었다고 주장하지 마세요. 세 행으로 된 표를 만드세요: 가능한 주장, 제공된 출처 또는 \"없음\", 그리고 아직 확인할 것이 무엇인지. 사실, 보도, 추론을 구분하세요. 자료가 없거나, 모순되거나, 개인정보이거나, 결과가 중대한 경우에는 멈추고 가장 작고 안전한 다음 단계를 알려 주세요.",
    "path": "../book/research-check-practice-loop-KO.md"
   },
   "interview": {
    "fields": [
     {
      "key": "question",
      "label": "면접 질문",
      "placeholder": "예: 갈등을 처리했던 경험을 말해 주세요"
     },
     {
      "key": "time",
      "label": "답변 길이",
      "placeholder": "예: 90초"
     }
    ],
    "template": "면접 답변 하나를 연습하고 싶습니다.\n\n질문: {question}\n답변 길이: {time}\n\n먼저 제가 제 말로 시간 제한 안에 답하도록 요청하세요. 제가 시작하기 전에 확인 기준을 밝혀 주세요: 구체적인 사례 하나, 결정 하나, 결과 하나, 명확한 구조. 제 답변 후에는 중요한 공백을 최대 하나만 짚고 부분 힌트를 하나 주세요. 그런 다음 수정하도록 요청하고, 마지막에는 같은 기준으로 힌트 없이 바뀐 질문 하나를 던지세요. 모범 답안을 작성하거나, 다른 면접 질문을 예측하거나, 결과를 약속하지 마세요.",
    "path": "../skills/prysai-interview-rehearsal/SKILL.md"
   },
   "task": {
    "fields": [
     {
      "key": "goal",
      "label": "완료하고 싶은 작업",
      "placeholder": "예: 도움말 페이지의 깨진 링크 수정"
     },
     {
      "key": "context",
      "label": "관련 맥락",
      "placeholder": "예: 파일은 docs/help.md이고 로컬에서 수정할 수 있음"
     }
    ],
    "template": "하나의 작업을 명확한 요청으로 바꾸고 싶습니다.\n\n목표: {goal}\n맥락: {context}\n\n정확히 다음 필드로 task contract를 작성하세요: 목표, 맥락, 허용된 행동, 승인 기준, 증거, 중단 조건. 실행하거나, 검색하거나, tool을 사용하지 마세요. 누락된 필드가 위험이나 승인 기준을 바꿀 경우에만 질문을 하나 던지세요. 범위를 작고 되돌릴 수 있게 유지하세요.",
    "path": "../book/chapters/03-task-protocol-KO.md#core-task-contract"
   },
   "codex": {
    "fields": [],
    "template": "저는 AI 코딩 tool을 처음 사용합니다. 안전한 첫 과제를 하나 내주세요: 가상의 텍스트만 사용하는 연습으로, 명확한 결과물, 제공되는 자료, 응답 형식, 제가 직접 실행할 수 있는 확인 항목, 중단 규칙이 있어야 합니다. 제가 file, tool, account, 권한을 갖고 있다고 가정하지 마세요. 먼저 기능 목록을 가르쳐 주지 마세요. 마지막에는 제가 직접 첫 시도를 하도록 요청하세요.",
    "path": "../book/chapters/01-gpt-and-codex-KO.md"
   }
  },
  "de": {
   "language": {
    "fields": [
     {
      "key": "language",
      "label": "Zu übende Sprache",
      "placeholder": "z. B. Spanisch, Französisch, Deutsch"
     },
     {
      "key": "scene",
      "label": "Eine Szene",
      "placeholder": "z. B. Hotel-Check-in, Café-Bestellung, Bahnhof"
     }
    ],
    "template": "Führe in {language} eine getippte Szene mit vier Runden durch: {scene}. Du spielst die andere Rolle und schreibst zuerst, immer eine kurze Frage nach der anderen. Ich tippe nach jeder Frage eine Antwort ein.\n\nVerwende ausschließlich erfundene Angaben. Fordere keine echten Namen, Buchungsnummern, Pässe, Adressen, Kontaktdaten oder Zahlungsinformationen an und nimm sie nicht an. Zeige vor der ersten Runde diesen festen Check: vier Runden von mir; die angeforderte Information wurde übermittelt; eine Unklarheit wurde geklärt; verständlich genug, um fortzufahren. Übersetze nicht, unterrichte nicht und zeige keine Beispielantwort, bevor ich antworte. Mein erster Versuch bleibt erhalten. Korrigiere nur den ersten Fehler, der das Verstehen blockiert: Benenne die Fehlerart, gib einen Teilhinweis und liefere nur dann ein ausgearbeitetes Fragment, wenn ich immer noch nicht weitermachen kann. Behalte beide Versuche und bezeichne einen einzelnen Wortwechsel weder als fließend noch als gesprochene Konversation noch als Beleg für Hörverständnis oder Aussprache.",
    "path": "../book/communication-clinic-DE.md#language-practice-route"
   },
   "work": {
    "fields": [
     {
      "key": "audience",
      "label": "Wer das Update lesen wird",
      "placeholder": "z. B. ein Teammitglied, eine Führungskraft, ein Kunde"
     },
     {
      "key": "facts",
      "label": "Zu verwendende Fakten (eine pro Zeile)",
      "placeholder": "z. B. Entwurf ist zu 60 % fertig\nReview ist bis Freitag fällig"
     }
    ],
    "template": "Ich muss die folgenden Notizen in ein kurzes Update für {audience} verwandeln.\n\nRohe Notizen:\n{facts}\n\nAnforderungen:\n- liste zuerst die Fakten auf, die du aus den rohen Notizen bestätigen kannst;\n- ergänze keine Daten, keine Zusagen, keinen Abschlussstatus und keine Gründe;\n- gib eine Fassung mit höchstens 120 Wörtern und eine formellere Fassung;\n- schließe mit zwei Punkten ab, die ich vor dem Absenden selbst bestätigen muss.",
    "path": "../book/work-update-practice-loop-DE.md"
   },
   "research": {
    "fields": [
     {
      "key": "question",
      "label": "Die Behauptung, die du prüfen möchtest",
      "placeholder": "z. B. Dieses Produkt hat seine Preise 2026 geändert"
     },
     {
      "key": "material",
      "label": "Material, das du teilen kannst",
      "placeholder": "URLs, Titel, Auszüge oder „keine“"
     }
    ],
    "template": "Ich möchte eine Behauptung prüfen, bevor ich sie weitergebe.\n\nFrage: {question}\nBereitgestelltes Material: {material}\n\nErfinde keine Quellen und behaupte nicht, dass du etwas geöffnet hast, auf das du keinen Zugriff hast. Erstelle eine Tabelle mit drei Zeilen: mögliche Behauptung, bereitgestellte Quelle oder „fehlt“, und was noch geprüft werden muss. Trenne Tatsache, Bericht und Schlussfolgerung. Wenn das Material fehlt, widersprüchlich, personenbezogen oder heikel ist, halte inne und nenne mir den kleinsten sicheren nächsten Schritt.",
    "path": "../book/research-check-practice-loop-DE.md"
   },
   "interview": {
    "fields": [
     {
      "key": "question",
      "label": "Die Interviewfrage",
      "placeholder": "z. B. Erzähl mir von einer Situation, in der du einen Konflikt bewältigt hast"
     },
     {
      "key": "time",
      "label": "Antwortlänge",
      "placeholder": "z. B. 90 Sekunden"
     }
    ],
    "template": "Ich möchte eine Interviewantwort proben.\n\nFrage: {question}\nAntwortlänge: {time}\n\nBitte mich zuerst, in meinen eigenen Worten innerhalb der Zeitvorgabe zu antworten. Nenne mir vor meinem Start den sichtbaren Check: ein konkretes Beispiel, eine Entscheidung, ein Ergebnis, klare Struktur. Benenne nach meiner Antwort höchstens eine inhaltliche Lücke und gib einen Teilhinweis. Bitte mich dann um eine Überarbeitung und stelle schließlich eine geänderte Frage mit demselben Check und ohne Hinweise. Schreibe keine Beispielantwort, sage keine weiteren Interviewfragen voraus und versprich kein Ergebnis.",
    "path": "../skills/prysai-interview-rehearsal/SKILL.md"
   },
   "task": {
    "fields": [
     {
      "key": "goal",
      "label": "Was erledigt werden soll",
      "placeholder": "z. B. Den defekten Link auf der Hilfeseite reparieren"
     },
     {
      "key": "context",
      "label": "Relevanter Kontext",
      "placeholder": "z. B. die Datei liegt unter docs/help.md; ich kann sie lokal bearbeiten"
     }
    ],
    "template": "Ich muss eine Aufgabe in eine klare Anfrage verwandeln.\n\nZiel: {goal}\nKontext: {context}\n\nSchreibe einen Aufgabenvertrag mit genau diesen Feldern: Ziel, Kontext, erlaubte Aktionen, Abnahme-Check, Belege und Stopp-Bedingung. Führe keine Aktionen aus, surfe nicht und nutze keine Tools. Stelle nur dann eine Frage, wenn ein fehlendes Feld das Risiko oder den Abnahme-Check verändern würde. Halte den Umfang klein und reversibel.",
    "path": "../book/chapters/03-task-protocol-DE.md#core-task-contract"
   },
   "codex": {
    "fields": [],
    "template": "Ich bin neu bei KI-Programmier-Tools. Gib mir eine einzige sichere erste Aufgabe: eine fiktive, reine Textübung mit einem klaren Ergebnis, bereitgestelltem Material, einem Antwortformat, einem Check, den ich selbst durchführen kann, und einer Stopp-Regel. Geh nicht davon aus, dass ich Dateien, Tools, Konten oder Berechtigungen habe. Erkläre nicht zuerst eine Liste von Funktionen. Schließe damit ab, dass du mich um meinen eigenen ersten Versuch bittest.",
    "path": "../book/chapters/01-gpt-and-codex-DE.md"
   }
  }
 }
};
