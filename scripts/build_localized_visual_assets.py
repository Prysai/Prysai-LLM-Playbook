"""Build reviewed locale variants for the teaching-board SVGs."""

from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "teaching"
OUTPUT_DIR = SOURCE_DIR / "locales"
LOCALES = ("zh", "es", "ja", "ko", "de", "zh-tw", "fr")

TITLE_RE = re.compile(r"(<title\b[^>]*>)(.*?)(</title>)", re.I | re.S)
DESC_RE = re.compile(r"(<desc\b[^>]*>)(.*?)(</desc>)", re.I | re.S)
TEXT_RE = re.compile(r"(<text\b[^>]*>)(.*?)(</text>)", re.I | re.S)
VIEWBOX_RE = re.compile(r'<svg\b[^>]*\bviewBox\s*=\s*"([^"]+)"', re.I)

STABLE = {
    "LLM", "Codex", "Skill", "Agent", "PRYSAI LAB", "diff", "log",
    "candidate", "blocked", "unknown", "TOKEN", "CONTEXT", "WINDOW",
    "PROMPT", "RESPONSE", "TOOL / AGENT", "MATERIAL", "02 / MATERIAL", "04 / DIRECTION",
}


def spec(title, desc, nodes):
    """Return one reviewed SVG translation contract.

    The source SVGs deliberately use one ``<text>`` element per visual line.
    Keep that structure stable even when a target language would normally wrap
    a sentence differently; the fixed geometry is part of the asset contract.
    """
    if isinstance(nodes, str):
        nodes = nodes.splitlines()
    return {"title": title, "desc": desc, "nodes": list(nodes)}


def replace_nodes(source, nodes):
    matches = list(TEXT_RE.finditer(source))
    if len(matches) != len(nodes):
        raise ValueError("text-node count changed: source={} replacements={}".format(len(matches), len(nodes)))
    chunks = []
    cursor = 0
    for match, value in zip(matches, nodes):
        chunks.append(source[cursor:match.start(2)])
        chunks.append(html.escape(value.strip(), quote=False))
        cursor = match.end(2)
    chunks.append(source[cursor:])
    return "".join(chunks)


def replace_one(source, pattern, value, label):
    if not pattern.search(source):
        raise ValueError("missing SVG {}".format(label))
    return pattern.sub(lambda m: "{}{}{}".format(m.group(1), html.escape(value, quote=False), m.group(3)), source, count=1)


def source_label_may_stay(source):
    """Allow numbered wayfinding labels whose wording is locale-neutral.

    A label such as ``02 / MATERIAL`` can be a real cognate in a target
    language.  The visible explanatory lines remain subject to the strict
    untranslated-text check below; this exception is limited to short,
    numbered wayfinding labels and the explicit technical allow-list.
    """
    return bool(re.match(r"^\d{2}\s*/", source))


TRANSLATIONS = {}


def add(asset, locale, title, desc, nodes):
    TRANSLATIONS.setdefault(asset, {})[locale] = spec(title, desc, nodes)


def add_nodes(asset, locale, title, desc, nodes):
    add(asset, locale, title, desc, nodes)


add("llm-six-terms-to-one-check.svg", "zh", "六个 LLM 术语，一个可检查的结果", "这张横向教学图分开令牌、上下文、上下文窗口、提示词、回答，以及工具或 Agent。红色边界提醒：回答只有和来源或验收规则核对过，才算可继续使用的候选结果。", """LLM 基础 / 一次请求
六个术语。
一次检查。
在相信回答前，先分开各层
01 / 单位
令牌
模型处理的
一小段
文字。
它不是事实。
02 / 材料
上下文
本轮可用的
上下文
材料。
缺少的上下文仍是未知。
03 / 容量
窗口
本轮能容纳的
内容
上限。
文字更多不一定更好。
04 / 方向
提示词
你的目标、
限制条件和
输出形式。
提示词用于框定任务；不会授予访问权限。
05 / 候选
回答
模型提出的
待检查
文字。
流畅不等于证据。
06 / 额外行动
工具 / Agent
产品可能
读取或行动，
并拥有额外权限。
执行仍需要许可。
检查 / 不要跳过这一步
回答 ≠ 行动 ≠ 已验证结果
在声称完成前，把结果与来源、差异、测试、日志或验收规则对照。
PRYSAI LAB / 原创教学图 / 先分清各层""")
add("llm-six-terms-to-one-check.svg", "es", "Seis términos de LLM, un resultado comprobable", "Esta lámina horizontal separa token, contexto, ventana de contexto, prompt, respuesta y herramienta o agente. El límite rojo recuerda que la respuesta sigue siendo candidata hasta contrastarla con una fuente o un criterio de aceptación.", """FUNDAMENTOS LLM / UNA PETICIÓN
SEIS TÉRMINOS.
UNA COMPROBACIÓN.
separa las capas antes de confiar en la respuesta
01 / UNIDAD
TOKEN
Una pequeña
pieza de texto que
procesa el modelo.
No es un hecho.
02 / MATERIAL
CONTEXTO
Material
disponible
en este turno.
Lo que falta sigue siendo desconocido.
03 / CAPACIDAD
VENTANA
Límite de lo
que cabe
en el turno.
Más texto no siempre es mejor.
04 / DIRECCIÓN
PROMPT
Tu objetivo,
tus límites
y la forma de salida.
El prompt encuadra; no concede acceso.
05 / CANDIDATA
RESPUESTA
Texto propuesto
por el modelo
para que lo compruebes.
La fluidez no es evidencia.
06 / ACCIÓN EXTRA
HERRAMIENTA / AGENTE
Un producto puede
leer o actuar
con más autoridad.
La ejecución aún necesita permiso.
COMPROBACIÓN / NO TE SALTES ESTA LÍNEA
RESPUESTA ≠ ACCIÓN ≠ RESULTADO VERIFICADO
Antes de afirmar que terminaste, compara el resultado con una fuente, un diff, una prueba, un registro o un criterio de aceptación.
PRYSAI LAB / TABLERO ORIGINAL / EMPIEZA POR LAS CAPAS""")
add("llm-six-terms-to-one-check.svg", "ja", "LLM の6つの用語、1つの確認できる結果", "この横長の教材図は、トークン、コンテキスト、コンテキストウィンドウ、プロンプト、応答、ツールまたは Agent を分けて示します。赤い境界は、応答を出典や受け入れ条件と照合するまで候補にとどめることを示します。", """LLM の基礎 / 1つの依頼
6つの用語。
1つの確認。
答えを信じる前に層を分ける
01 / 単位
トークン
モデルが処理する
小さな
文字のかたまり。
事実そのものではない。
02 / 材料
コンテキスト
このターンで
利用できる
材料。
不足したコンテキストは不明のまま。
03 / 容量
ウィンドウ
1ターンに
収まる
量の上限。
文章を増やせばよいとは限らない。
04 / 方向づけ
プロンプト
目的、
制約、
出力の形。
プロンプトは枠を決めるが、アクセス権は与えない。
05 / 候補
応答
モデルが
提案した
確認するための文章。
流暢さは証拠ではない。
06 / 追加の操作
ツール / Agent
製品によっては
読み取りや操作を
追加の権限で行える。
実行には許可が必要。
確認 / この行を飛ばさない
応答 ≠ 操作 ≠ 確認済みの結果
完了と言う前に、出典、差分、テスト、ログ、受け入れ条件と結果を照合する。
PRYSAI LAB / オリジナル教材図 / まず層を分ける""")
add("llm-six-terms-to-one-check.svg", "ko", "LLM 핵심 용어 여섯 가지, 확인 가능한 결과 하나", "이 가로형 교육 그림은 토큰, 맥락, 맥락 창, 프롬프트, 답변, 도구 또는 Agent를 나누어 보여 줍니다. 빨간 경계는 답변을 출처나 수용 기준과 대조하기 전까지 후보로 남겨야 함을 뜻합니다.", """LLM 기초 / 하나의 요청
용어 여섯 가지.
점검 하나.
답변을 믿기 전에 층위를 나누세요
01 / 단위
토큰
모델이 처리하는
작은
텍스트 조각입니다.
사실은 아닙니다.
02 / 자료
맥락
이 턴에서
사용할 수 있는
자료입니다.
빠진 맥락은 여전히 알 수 없습니다.
03 / 용량
창
한 턴에 담을 수 있는
내용의
한도입니다.
텍스트가 많다고 늘 좋은 것은 아닙니다.
04 / 방향
프롬프트
목표,
제약,
출력 형식입니다.
프롬프트는 범위를 정하지만 접근 권한을 주지는 않습니다.
05 / 후보
답변
모델이 제안한
확인할
텍스트입니다.
유창함은 증거가 아닙니다.
06 / 추가 행동
도구 / Agent
제품은 추가 권한으로
읽거나 행동할 수
있습니다.
실행에는 여전히 허가가 필요합니다.
점검 / 이 줄을 건너뛰지 마세요
답변 ≠ 행동 ≠ 검증된 결과
완료라고 말하기 전에 결과를 출처, diff, 테스트, 로그 또는 수용 기준과 대조하세요.
PRYSAI LAB / 프로젝트 원본 교육 그림 / 층위를 먼저 나누기""")
add("llm-six-terms-to-one-check.svg", "de", "Sechs LLM-Begriffe, ein prüfbares Ergebnis", "Die waagerechte Lehrgrafik trennt Token, Kontext, Kontextfenster, Prompt, Antwort und Tool oder Agent. Die rote Grenze sagt: Eine Antwort bleibt Kandidat, bis eine Person sie mit Quelle oder Abnahmeregel vergleicht.", """LLM-GRUNDLAGEN / EINE ANFRAGE
SECHS BEGRIFFE.
EINE PRÜFUNG.
Trenne die Ebenen, bevor du der Antwort vertraust
01 / EINHEIT
TOKEN
Ein kleines
Textstück, das das
Modell verarbeitet.
Es ist keine Tatsache.
02 / MATERIAL
KONTEXT
Material, das
in diesem
Durchlauf verfügbar ist.
Fehlender Kontext bleibt unbekannt.
03 / KAPAZITÄT
FENSTER
Die Grenze für
das, was in
den Durchlauf passt.
Mehr Text ist nicht immer besser.
04 / RICHTUNG
PROMPT
Dein Ziel,
deine Grenzen
und das Ausgabeformat.
Ein Prompt steckt den Rahmen ab; er erteilt keinen Zugriff.
05 / KANDIDAT
ANTWORT
Vom Modell
vorgeschlagener
Text zur Prüfung.
Flüssige Sprache ist kein Beleg.
06 / ZUSATZAKTION
TOOL / AGENT
Ein Produkt kann
mit zusätzlicher
Berechtigung lesen oder handeln.
Auch die Ausführung braucht eine Erlaubnis.
PRÜFUNG / DIESE ZEILE NICHT ÜBERSPRINGEN
ANTWORT ≠ AKTION ≠ VERIFIZIERTES ERGEBNIS
Vergleiche das Ergebnis mit Quelle, Diff, Test, Log oder Abnahmeregel, bevor du die Aufgabe als erledigt bezeichnest.
PRYSAI LAB / ORIGINALE LEHRGRAFIK / BEGINNE MIT DEN EBENEN""")
add("llm-six-terms-to-one-check.svg", "zh-tw", "六個 LLM 術語，一個可檢查的結果", "這張橫向教學圖分開詞元、上下文、上下文視窗、提示、回應，以及工具或 Agent。紅色界線提醒：回應必須先和來源或驗收規則核對，才能繼續使用。", """LLM 基礎／一次請求
六個術語。
一次檢查。
相信回應前，先分開各層
01／單位
詞元
模型處理的
一小段
文字。
它不是事實。
02／材料
上下文
本回合可用的
上下文
材料。
缺少的上下文仍是未知。
03／容量
視窗
一個回合能容納的
內容
上限。
文字越多不一定越好。
04／方向
提示
你的目標、
限制條件和
輸出形式。
提示用來界定工作，不會授予存取權限。
05／候選
回應
模型提出的
等待檢查的
文字。
流暢不等於證據。
06／額外行動
工具／Agent
產品可能
讀取或執行，
並擁有額外權限。
執行仍需要許可。
檢查／不要跳過這一行
回應 ≠ 行動 ≠ 已驗證結果
宣稱完成前，請把結果和來源、差異、測試、紀錄或驗收規則對照。
PRYSAI LAB／原創教學圖／先分清各層""")
add("llm-six-terms-to-one-check.svg", "fr", "Six termes LLM, un résultat vérifiable", "Cette carte pédagogique horizontale sépare le token, le contexte, la fenêtre de contexte, le prompt, la réponse et l’outil ou l’Agent. La limite rouge rappelle qu’une réponse reste candidate tant qu’une personne ne l’a pas comparée à une source ou à un critère d’acceptation.", """BASES LLM / UNE DEMANDE
SIX TERMES.
UN CONTRÔLE.
séparez les couches avant de faire confiance à la réponse
01 / UNITÉ
TOKEN
Une petite unité
de texte que
le modèle traite.
Ce n’est pas un fait.
02 / MATIÈRE
CONTEXTE
La matière
disponible
pour ce tour.
Ce qui manque reste inconnu.
03 / CAPACITÉ
FENÊTRE
La limite de ce
qui peut tenir
dans le tour.
Plus de texte n’est pas toujours mieux.
04 / DIRECTION
PROMPT
Votre objectif,
vos contraintes
et la forme de sortie.
Un prompt cadre le travail ; il n’accorde pas d’accès.
05 / CANDIDATE
RÉPONSE
Texte proposé
par le modèle
à vérifier.
La fluidité n’est pas une preuve.
06 / ACTION SUPPLÉMENTAIRE
OUTIL / AGENT
Un produit peut
lire ou agir
avec une autorité supplémentaire.
L’exécution demande toujours une autorisation.
CONTRÔLE / NE SAUTEZ PAS CETTE LIGNE
RÉPONSE ≠ ACTION ≠ RÉSULTAT VÉRIFIÉ
Avant de déclarer la tâche terminée, comparez le résultat à une source, un diff, un test, un journal ou un critère d’acceptation.
PRYSAI LAB / CARTE ORIGINALE / COMMENCEZ PAR LES COUCHES""")


def add_asset_locales(asset, entries):
    """Register the reviewed locale strings for one fixed-geometry board."""
    for locale, (title, desc, nodes) in entries.items():
        add(asset, locale, title, desc, nodes)


add_asset_locales("foundation-first-visit-route-red-black.svg", {
    "zh": (
        "第一次造访路线：完成一个可检查的 LLM 任务",
        "这张五步教学图带你完成第一次造访：选定一个目标，打开 LLM 基础核心，做一次安全尝试，检查记录，然后继续下一条路线，或让未知保持可见并停下。",
        [
            "起点／第一次造访", "一条安全路线。", "先于完整目录。", "选一个目标，做一次小尝试，并保留记录。",
            "01", "选择", "说清一个结果。", "只理解、练习或检查一件小事。", "02", "打开", "从基础核心开始。", "先了解模型边界，再选择平台。",
            "03", "尝试", "做一次安全尝试。", "使用虚构或本地的非敏感材料。", "04", "检查", "阅读实际记录。", "对照回答、差异、来源、测试或日志。",
            "05", "继续／停止", "选择下一条有边界的路线。", "下一项证明缺失时，让未知保持可见。", "边界", "目录是一组选择，不是第一项任务。",
            "这条路线帮助访客定位；不能证明学习或掌握。", "PRYSAI LAB／原创教学图／从小处开始，检查重要之处",
        ],
    ),
    "es": (
        "Recorrido de primera visita para una tarea LLM comprobable",
        "Esta lámina de cinco pasos guía la primera visita: elige un objetivo, abre el LLM Foundation Core, haz un intento seguro, revisa el registro y continúa por otra ruta o detente dejando visible lo que se desconoce.",
        [
            "INICIO / PRIMERA VISITA", "UN RECORRIDO SEGURO.", "ANTES DEL CATÁLOGO.", "Elige un objetivo, haz un intento pequeño y conserva el registro.",
            "01", "ELEGIR", "Nombra un resultado.", "Entiende, practica o comprueba una sola cosa pequeña.", "02", "ABRIR", "Empieza por el LLM Foundation Core.", "Conoce el límite del modelo antes de elegir plataforma.",
            "03", "PROBAR", "Haz un intento seguro.", "Usa material ficticio o local, sin datos sensibles.", "04", "COMPROBAR", "Lee el registro real.", "Compara la respuesta, el diff, la fuente, la prueba o el registro.",
            "05", "CONTINUAR / PARAR", "Elige el siguiente recorrido acotado.", "Si falta la próxima prueba, deja visible lo que no sabes.", "LÍMITE", "El catálogo ofrece opciones; no es la primera tarea.",
            "Este recorrido orienta al visitante; no demuestra aprendizaje ni dominio.", "PRYSAI LAB / TABLERO ORIGINAL / EMPIEZA PEQUEÑO, COMPRUEBA LO IMPORTANTE",
        ],
    ),
    "ja": (
        "初回訪問で確認できる LLM タスクへ進むルート",
        "5段階の教材図です。目的を1つ選び、LLM Foundation Coreを開き、安全な試行を1回行い、記録を確認します。その後は次のルートへ進むか、不明点を見えるまま止まります。",
        [
            "スタート / 初回訪問", "安全なルートを1つ。", "カタログを見る前に。", "目的を1つ決め、小さく試して、記録を残す。",
            "01", "選ぶ", "結果を1つ言葉にする。", "小さな1点を理解・練習・確認する。", "02", "開く", "LLM Foundation Coreから始める。", "プラットフォームを選ぶ前に、モデルの境界を知る。",
            "03", "試す", "安全な試行を1回行う。", "架空またはローカルの非機密データを使う。", "04", "確認", "実際の記録を読む。", "応答、差分、出典、テスト、ログを照合する。",
            "05", "続ける / 止める", "次の範囲を区切ったルートを選ぶ。", "次の証拠がなければ、不明点を見えるままにする。", "境界", "カタログは選択肢であり、最初の課題ではない。",
            "このルートは訪問者を案内するだけで、学習や習得を証明しない。", "PRYSAI LAB / オリジナル教材図 / 小さく始め、重要な点を確認する",
        ],
    ),
    "ko": (
        "확인 가능한 LLM 작업으로 이어지는 첫 방문 경로",
        "이 다섯 단계 교육 그림은 첫 방문의 순서를 보여 줍니다. 목표를 하나 정하고 LLM Foundation Core를 연 뒤 안전하게 한 번 시도하고 기록을 확인하세요. 다음 경로로 가거나 모르는 점을 드러낸 채 멈춥니다.",
        [
            "시작 / 첫 방문", "안전한 경로 하나.", "카탈로그보다 먼저.", "목표를 하나 정하고 작게 시도한 뒤 기록을 남기세요.",
            "01", "선택", "결과를 하나로 정하세요.", "작은 한 가지를 이해하거나 연습하거나 점검하세요.", "02", "열기", "LLM Foundation Core부터 시작하세요.", "플랫폼을 고르기 전에 모델의 경계를 알아보세요.",
            "03", "시도", "안전하게 한 번 시도하세요.", "허구 또는 로컬의 민감하지 않은 자료를 사용하세요.", "04", "점검", "실제 기록을 읽으세요.", "답변, diff, 출처, 테스트 또는 로그를 대조하세요.",
            "05", "계속 / 중지", "다음 범위가 분명한 경로를 고르세요.", "다음 증거가 없으면 모르는 점을 그대로 보이게 하세요.", "경계", "카탈로그는 선택지 모음이지 첫 작업이 아닙니다.",
            "이 경로는 방문자의 방향을 잡아 주지만 학습이나 숙련을 증명하지 않습니다.", "PRYSAI LAB / 프로젝트 원본 교육 그림 / 작게 시작하고 중요한 것을 점검하기",
        ],
    ),
    "de": (
        "Erster Besuch: eine prüfbare LLM-Aufgabe beginnen",
        "Diese Lehrtafel mit fünf Schritten führt durch den ersten Besuch: Wähle ein Ziel, öffne den LLM Foundation Core, mache einen sicheren Versuch, lies das Protokoll und gehe weiter oder halte mit sichtbarer Ungewissheit an.",
        [
            "START / ERSTER BESUCH", "EIN SICHERER WEG.", "VOR DEM KATALOG.", "Wähle ein Ziel, mache einen kleinen Versuch und bewahre das Protokoll auf.",
            "01", "WÄHLEN", "Benenne ein Ergebnis.", "Verstehe, übe oder prüfe genau eine kleine Sache.", "02", "ÖFFNEN", "Beginne mit dem LLM Foundation Core.", "Lerne die Modellgrenze kennen, bevor du eine Plattform wählst.",
            "03", "VERSUCH", "Mache einen sicheren Versuch.", "Nutze fiktives oder lokales, nicht sensibles Material.", "04", "PRÜFEN", "Lies das tatsächliche Protokoll.", "Vergleiche Antwort, Diff, Quelle, Test oder Log.",
            "05", "WEITER / STOPP", "Wähle den nächsten begrenzten Weg.", "Fehlt der nächste Beleg, lass die Ungewissheit sichtbar.", "GRENZE", "Der Katalog bietet Optionen; er ist nicht die erste Aufgabe.",
            "Dieser Weg orientiert Besucher; er beweist weder Lernen noch Beherrschung.", "PRYSAI LAB / ORIGINALE LEHRGRAFIK / KLEIN ANFANGEN, DAS WICHTIGE PRÜFEN",
        ],
    ),
    "zh-tw": (
        "第一次造訪路線：完成一項可檢查的 LLM 任務",
        "這張五步教學圖帶你完成第一次造訪：選定一個目標，開啟 LLM 基礎核心，做一次安全嘗試，檢查紀錄，接著前往下一條路線；如果缺少證明，就讓未知保持可見並停下。",
        [
            "起點／第一次造訪", "一條安全路線。", "先別急著看完整目錄。", "選一個目標，做一次小嘗試，並留下紀錄。",
            "01", "選擇", "說清楚一個結果。", "只理解、練習或檢查一件小事。", "02", "開啟", "從 LLM 基礎核心開始。", "先了解模型界線，再選擇平台。",
            "03", "嘗試", "做一次安全嘗試。", "使用虛構或本機的非敏感資料。", "04", "檢查", "閱讀實際紀錄。", "對照回應、差異、來源、測試或紀錄檔。",
            "05", "繼續／停止", "選擇下一條有界線的路線。", "下一項證明缺失時，讓未知保持可見。", "界線", "目錄是一組選項，不是第一項任務。",
            "這條路線只能幫訪客找到方向，不能證明學習或熟練。", "PRYSAI LAB／原創教學圖／從小處開始，檢查重要之處",
        ],
    ),
    "fr": (
        "Parcours de première visite vers une tâche LLM vérifiable",
        "Cette planche en cinq étapes guide la première visite : choisir un objectif, ouvrir le LLM Foundation Core, faire un essai sûr, lire le relevé, puis poursuivre vers un autre parcours ou s’arrêter en laissant l’inconnu visible.",
        [
            "DÉPART / PREMIÈRE VISITE", "UN PARCOURS SÛR.", "AVANT LE CATALOGUE.", "Choisissez un objectif, faites un petit essai et gardez le relevé.",
            "01", "CHOISIR", "Nommez un résultat.", "Comprenez, pratiquez ou vérifiez une seule petite chose.", "02", "OUVRIR", "Commencez par le LLM Foundation Core.", "Apprenez la limite du modèle avant de choisir une plateforme.",
            "03", "ESSAYER", "Faites un essai sûr.", "Utilisez un contenu fictif ou local, non sensible.", "04", "VÉRIFIER", "Lisez le relevé réel.", "Comparez la réponse, le diff, la source, le test ou le journal.",
            "05", "CONTINUER / ARRÊTER", "Choisissez le prochain parcours délimité.", "Si la preuve suivante manque, laissez l’inconnu visible.", "LIMITE", "Le catalogue propose des options ; ce n’est pas la première tâche.",
            "Ce parcours oriente le visiteur ; il ne prouve ni l’apprentissage ni la maîtrise.", "PRYSAI LAB / CARTE ORIGINALE / COMMENCEZ PETIT, VÉRIFIEZ L’ESSENTIEL",
        ],
    ),
})


add_asset_locales("llm-foundation-core-path-red-black.svg", {
    "zh": (
        "LLM 基础核心：五个单元",
        "这条五单元学习路线从一次安全尝试开始，让上下文和指令可见，识别可见失败，检查并修正结果，最后把方法重复到未见过的任务上。",
        """基础核心／五个单元
先学会方法
再选择平台
尝试／观察／命名／修正／迁移
01／尝试
先做一次安全尝试。
使用虚构的离线任务，并保留第一次回答。
02／框定
让上下文和指令可见。
分开已提供事实、缺失事实、限制条件和回答形式。
03／识别
识别可见的失败模式。
标出遗漏、编造、强行制造的歧义和过度自信。
04／修正
检查、修正，并说明限制。
用证据对照，只改变一个条件，并保留缺口。
05／迁移
在未见过的任务上重复方法。
保存路线只是练习；新任务仍需单独检查。
边界／候选路线
一次尝试不等于掌握。
保留产物、限制和下一个问题。
PRYSAI LAB／原创教学图／先练习，再下结论""",
    ),
    "es": (
        "Ruta LLM Foundation Core de cinco unidades",
        "Esta ruta de cinco unidades empieza con un intento seguro, hace visibles el contexto y las instrucciones, reconoce fallos observables, comprueba y repara el resultado, y repite el método en una tarea nueva.",
        """NÚCLEO FUNDAMENTAL LLM / CINCO UNIDADES
APRENDE EL MÉTODO
ANTES DE ELEGIR PLATAFORMA.
probar / observar / nombrar / reparar / transferir
01 / PROBAR
Empieza con un intento seguro.
Usa una tarea ficticia y sin conexión; conserva la primera respuesta.
02 / DELIMITAR
Haz visibles el contexto y la instrucción.
Separa los hechos dados, los que faltan, los límites y la forma de respuesta.
03 / DETECTAR
Reconoce los fallos que pueden verse.
Marca omisiones, invenciones, ambigüedad forzada y exceso de seguridad.
04 / REPARAR
Comprueba, repara y declara los límites.
Compara con la evidencia, cambia una sola condición y conserva la brecha.
05 / TRANSFERIR
Repítelo en una tarea que no hayas visto.
Guardar la ruta es práctica; una tarea nueva necesita su propia comprobación.
LÍMITE / RUTA CANDIDATA
UN SOLO INTENTO NO ES DOMINIO.
Conserva el artefacto, el límite y la siguiente pregunta.
PRYSAI LAB / TABLERO ORIGINAL / PRACTICA ANTES DE AFIRMAR""",
    ),
    "ja": (
        "LLM Foundation Core：5つのユニット",
        "5つのユニットで学ぶルートです。安全な試行から始め、コンテキストと指示を見えるようにし、目に見える失敗を捉え、結果を確認・修正して、初めての課題で方法を転用します。",
        """FOUNDATION CORE / 5つのユニット
方法を学ぶ
プラットフォームを選ぶ前に
試す / 観察する / 言葉にする / 修正する / 転用する
01 / 試す
安全な試行を1回行う。
架空のオフライン課題を使い、最初の応答を残す。
02 / 枠を決める
コンテキストと指示を見えるようにする。
与えられた事実、不足している事実、制約、回答の形を分ける。
03 / 気づく
目に見える失敗の型を捉える。
抜け、作り話、無理な曖昧さ、過信を印づける。
04 / 修正する
確認し、修正し、限界を示す。
証拠と照合し、条件を1つだけ変え、残る不足を記録する。
05 / 転用する
未経験の課題で繰り返す。
保存したルートは練習にすぎない。新しい課題には別の確認が要る。
境界 / 候補ルート
1回の試行は習得ではない。
成果物、限界、次の問いを残す。
PRYSAI LAB / オリジナル教材図 / 主張する前に練習する""",
    ),
    "ko": (
        "LLM Foundation Core 5단계 학습 경로",
        "이 다섯 단계 경로는 안전한 한 번의 시도에서 시작해 맥락과 지시를 드러내고, 눈에 보이는 실패를 알아차리고, 결과를 점검·수정한 뒤 처음 보는 작업에 방법을 적용합니다.",
        """LLM FOUNDATION CORE / 다섯 단계
방법부터 배우기
플랫폼을 고르기 전에
시도 / 관찰 / 이름 붙이기 / 수정 / 전이
01 / 시도
안전하게 한 번 시도하세요.
허구의 오프라인 작업을 사용하고 첫 답변을 남기세요.
02 / 틀 잡기
맥락과 지시를 보이게 하세요.
제공된 사실, 빠진 사실, 한계와 답변 형식을 나누세요.
03 / 알아차리기
눈에 보이는 실패 유형을 알아보세요.
누락, 꾸며 낸 내용, 억지로 만든 모호함과 과도한 확신을 표시하세요.
04 / 수정하기
점검하고 수정한 뒤 한계를 밝히세요.
증거와 대조하고 조건 하나만 바꾼 뒤 남은 빈틈을 기록하세요.
05 / 전이
처음 보는 작업에 반복 적용하세요.
저장한 경로는 연습일 뿐입니다. 새 작업에는 별도 점검이 필요합니다.
경계 / 후보 경로
한 번의 시도가 숙련을 뜻하지는 않습니다.
산출물, 한계와 다음 질문을 남기세요.
PRYSAI LAB / 프로젝트 원본 교육 그림 / 주장하기 전에 연습하기""",
    ),
    "de": (
        "Der LLM Foundation Core in fünf Einheiten",
        "Dieser Lernweg beginnt mit einem sicheren Versuch, macht Kontext und Anweisung sichtbar, erkennt beobachtbare Fehler, prüft und repariert das Ergebnis und überträgt die Methode anschließend auf eine unbekannte Aufgabe.",
        """FOUNDATION CORE / FÜNF EINHEITEN
DIE METHODE LERNEN
VOR DER PLATTFORMWAHL.
versuchen / beobachten / benennen / reparieren / übertragen
01 / VERSUCH
Beginne mit einem sicheren Versuch.
Nutze eine fiktive Offline-Aufgabe und bewahre die erste Antwort auf.
02 / RAHMEN
Mache Kontext und Anweisung sichtbar.
Trenne gegebene Fakten, fehlende Fakten, Grenzen und Antwortform.
03 / ERKENNEN
Erkenne sichtbare Fehlermuster.
Markiere Auslassungen, Erfindungen, erzwungene Mehrdeutigkeit und übertriebene Sicherheit.
04 / REPARIEREN
Prüfe, repariere und nenne die Grenzen.
Vergleiche mit Belegen, ändere eine Bedingung und halte die Lücke fest.
05 / ÜBERTRAGEN
Wiederhole die Methode bei einer unbekannten Aufgabe.
Ein gespeicherter Weg ist Übung; eine neue Aufgabe braucht ihren eigenen Check.
GRENZE / KANDIDATENWEG
EIN VERSUCH IST NOCH KEINE BEHERRSCHUNG.
Bewahre Artefakt, Grenze und nächste Frage auf.
PRYSAI LAB / ORIGINALE LEHRGRAFIK / ERST ÜBEN, DANN BEHAUPTEN""",
    ),
    "zh-tw": (
        "LLM 基礎核心：五個單元",
        "這條五單元學習路線從一次安全嘗試開始，讓上下文與指示變得可見，辨識看得見的失敗，檢查並修正結果，最後把方法套用到沒看過的任務。",
        """基礎核心／五個單元
先學會方法
再選擇平台
嘗試／觀察／命名／修正／遷移
01／嘗試
先做一次安全嘗試。
使用虛構的離線任務，並保留第一次回應。
02／框定
讓上下文與指示變得可見。
分開已提供的事實、缺少的事實、限制與回應形式。
03／辨識
辨識看得見的失敗模式。
標出遺漏、捏造、被迫產生的模糊處與過度自信。
04／修正
檢查、修正，並說明限制。
和證據對照，只改變一個條件，並保留缺口。
05／遷移
在沒看過的任務上重複方法。
保存路線只是練習；新的任務仍需要自己的檢查。
界線／候選路線
一次嘗試不等於熟練。
保留產出、界線與下一個問題。
PRYSAI LAB／原創教學圖／先練習，再下結論""",
    ),
    "fr": (
        "Le LLM Foundation Core en cinq unités",
        "Ce parcours en cinq unités commence par un essai sûr, rend le contexte et les consignes visibles, repère les échecs observables, vérifie et répare le résultat, puis réutilise la méthode sur une tâche inconnue.",
        """FOUNDATION CORE / CINQ UNITÉS
APPRENDRE LA MÉTHODE
AVANT DE CHOISIR LA PLATEFORME.
essayer / observer / nommer / réparer / transférer
01 / ESSAYER
Commencez par un essai sûr.
Utilisez une tâche fictive hors ligne et gardez la première réponse.
02 / CADRER
Rendez le contexte et la consigne visibles.
Séparez les faits fournis, les faits manquants, les limites et la forme de réponse.
03 / REPÉRER
Reconnaissez les formes d’échec visibles.
Signalez les omissions, les inventions, l’ambiguïté forcée et l’assurance excessive.
04 / RÉPARER
Vérifiez, réparez et énoncez les limites.
Comparez aux preuves, ne changez qu’une condition et gardez le manque visible.
05 / TRANSFÉRER
Répétez sur une tâche inconnue.
Un parcours conservé est un entraînement ; une nouvelle tâche exige son propre contrôle.
LIMITE / PARCOURS CANDIDAT
UN SEUL ESSAI NE SUFFIT PAS À MAÎTRISER.
Gardez l’artefact, la limite et la prochaine question.
PRYSAI LAB / CARTE ORIGINALE / PRATIQUEZ AVANT D’AFFIRMER""",
    ),
})


add_asset_locales("playbook-learning-journey-red-black.svg", {
    "zh": (
        "Prysai LLM Playbook 学习旅程",
        "这段四阶段学习旅程先完成五单元的 LLM 基础核心，再做一项有边界的首任务，把结果变成证据并有意识地停止或做决定，最后选择可选的 Codex、工具、Skill 或团队路线。",
        """PRYSAI LLM PLAYBOOK／学习旅程
先学会方法。
再选择平台。
基础／首任务／证据／可选练习
01／基础核心
理解 → 开始 → 识别 → 修正 → 迁移
五个单元让模型、请求、可见失败、检查和未见任务都变得清楚。
在 Codex、工具、Agent 或 Skill 之前，从这里开始。
02／有边界的首任务
先说清结果，再提出请求。
写出目标、已有上下文、允许的帮助、限制、回答形式和停止条件。
使用虚构或可丢弃的任务；保留第一次请求和第一次回答。
03／证据闭环
观察发生了什么变化，保留仍然未知的部分。
用来源、测试、日志或验收规则对照回答或差异。
只有下一项证明存在时才继续；否则记录最小的安全停止。
04／可选路线
选择下一个最有用的最小层级。
Codex · 工具 · Skill · Agent · 研究 · 工程 · 团队练习
每条路线都保留自己的来源、权限、证据、失败案例和限制。
边界／候选路线
地图显示顺序，不证明掌握。
保留产物、证据、限制和下一个问题。
PRYSAI LAB／原创教学图／先练习，再下结论""",
    ),
    "es": (
        "Recorrido de aprendizaje de Prysai LLM Playbook",
        "Este recorrido de cuatro etapas completa primero las cinco unidades del LLM Foundation Core, convierte una primera tarea acotada en evidencia y una parada o decisión deliberada, y después ofrece prácticas opcionales con Codex, herramientas, Skills o equipos.",
        """PRYSAI LLM PLAYBOOK / RECORRIDO DE APRENDIZAJE
APRENDE EL MÉTODO.
DESPUÉS ELIGE LA PLATAFORMA.
fundamentos / primera tarea / evidencia / práctica opcional
01 / LLM FOUNDATION CORE
Entender → iniciar → identificar → reparar → transferir
Las cinco unidades hacen explícitos el modelo, la petición, los fallos visibles, la comprobación y la tarea nueva.
Empieza aquí, antes de Codex, las herramientas, los Agents o los Skills.
02 / PRIMERA TAREA ACOTADA
Nombra el resultado antes de pedirlo.
Indica el objetivo, el contexto disponible, la ayuda permitida, los límites, la forma de respuesta y cuándo parar.
Usa una tarea ficticia o desechable; conserva la primera petición y la primera respuesta.
03 / CICLO DE EVIDENCIA
Observa qué cambió y conserva lo que aún no sabes.
Compara la respuesta o el diff con una fuente, una prueba, un registro o un criterio de aceptación.
Continúa solo si existe la siguiente prueba; si no, registra la parada segura más pequeña.
04 / RECORRIDOS OPCIONALES
Elige la siguiente capa útil más pequeña.
Codex · herramientas · Skills · Agents · investigación · ingeniería · práctica de equipo
Cada recorrido conserva sus propias fuentes, permisos, evidencias, fallos y límites.
LÍMITE / RECORRIDO CANDIDATO
EL MAPA MUESTRA EL ORDEN, NO EL DOMINIO.
Conserva el artefacto, la evidencia, el límite y la siguiente pregunta.
PRYSAI LAB / TABLERO ORIGINAL / PRACTICA ANTES DE AFIRMAR""",
    ),
    "ja": (
        "Prysai LLM Playbook の学習ルート",
        "4段階の学習ルートです。まず LLM Foundation Core の5ユニットを終え、範囲を区切った最初の課題を証拠と意図的な停止または判断につなげます。その後、Codex、ツール、Skill、チーム向けの任意ルートを選びます。",
        """PRYSAI LLM PLAYBOOK / 学習ルート
方法を学ぶ。
そのあとでプラットフォームを選ぶ。
基礎 / 最初の課題 / 証拠 / 任意の実践
01 / FOUNDATION CORE
理解 → 始める → 気づく → 修正する → 転用する
5つのユニットで、モデル、依頼、見える失敗、確認、未知の課題を明確にする。
Codex、ツール、Agent、Skillを選ぶ前に、ここから始める。
02 / 最初の範囲を区切った課題
依頼する前に、結果を言葉にする。
目的、与えられたコンテキスト、許される支援、制約、回答の形、停止条件を書く。
架空または使い捨ての課題を使い、最初の依頼と応答を残す。
03 / 証拠のループ
何が変わったかを観察し、不明点を残す。
応答や差分を出典、テスト、ログ、受け入れ条件と照合する。
次の証拠があるときだけ続け、なければ最小限の安全な停止を記録する。
04 / 任意のルート
次に役立つ最小限の層を選ぶ。
Codex · ツール · Skill · Agent · 調査 · エンジニアリング · チーム練習
各ルートで、出典、権限、証拠、失敗例、限界を別々に保つ。
境界 / 候補ルート
地図は順序を示すが、習得を証明しない。
成果物、証拠、限界、次の問いを残す。
PRYSAI LAB / オリジナル教材図 / 主張する前に練習する""",
    ),
    "ko": (
        "Prysai LLM Playbook 학습 여정",
        "이 네 단계 여정은 먼저 LLM Foundation Core의 다섯 단계를 끝내고, 범위가 분명한 첫 작업을 증거와 의도적인 중지 또는 판단으로 연결한 뒤 Codex·도구·Skill·팀 연습 중 필요한 경로를 고르게 합니다.",
        """PRYSAI LLM PLAYBOOK / 학습 여정
방법부터 배우세요.
그다음 플랫폼을 고르세요.
기초 / 첫 작업 / 증거 / 선택 연습
01 / FOUNDATION CORE
이해 → 시작 → 식별 → 수정 → 전이
다섯 단계에서 모델, 요청, 눈에 보이는 실패, 점검과 처음 보는 작업을 분명히 합니다.
Codex, 도구, Agent 또는 Skill보다 먼저 여기서 시작하세요.
02 / 범위가 분명한 첫 작업
요청하기 전에 결과를 정하세요.
목표, 제공된 맥락, 허용된 도움, 한계, 답변 형식과 중지 조건을 적으세요.
허구 또는 폐기 가능한 작업을 사용하고 첫 요청과 첫 답변을 남기세요.
03 / 증거 루프
무엇이 바뀌었는지 관찰하고 아직 모르는 것을 남기세요.
답변이나 diff를 출처, 테스트, 로그 또는 수용 기준과 대조하세요.
다음 증거가 있을 때만 계속하고, 없으면 가장 작고 안전한 중지를 기록하세요.
04 / 선택 경로
다음에 필요한 가장 작은 층을 고르세요.
Codex · 도구 · Skill · Agent · 연구 · 엔지니어링 · 팀 연습
각 경로는 고유한 출처, 권한, 증거, 실패 사례와 한계를 따로 보존합니다.
경계 / 후보 경로
지도는 순서를 보여 줄 뿐 숙련을 증명하지 않습니다.
산출물, 증거, 한계와 다음 질문을 남기세요.
PRYSAI LAB / 프로젝트 원본 교육 그림 / 주장하기 전에 연습하기""",
    ),
    "de": (
        "Die Lernreise des Prysai LLM Playbook",
        "Diese Reise in vier Phasen führt zuerst durch die fünf Einheiten des LLM Foundation Core. Danach wird eine begrenzte erste Aufgabe zu Belegen und einem bewussten Stopp oder einer Entscheidung; anschließend folgen optionale Wege mit Codex, Tools, Skills oder im Team.",
        """PRYSAI LLM PLAYBOOK / LERNREISE
LERN DIE METHODE.
DANN WÄHLE DIE PLATTFORM.
Grundlagen / erste Aufgabe / Belege / optionale Praxis
01 / FOUNDATION CORE
Verstehen → beginnen → erkennen → reparieren → übertragen
Fünf Einheiten machen Modell, Anfrage, sichtbare Fehler, Prüfung und unbekannte Aufgabe ausdrücklich.
Beginne hier, bevor du Codex, Tools, Agents oder Skills wählst.
02 / ERSTE BEGRENZTE AUFGABE
Benenne das Ergebnis, bevor du fragst.
Halte Ziel, vorhandenen Kontext, erlaubte Hilfe, Grenzen, Antwortform und Stoppbedingung fest.
Nutze eine fiktive oder wegwerfbare Aufgabe; bewahre erste Anfrage und erste Antwort auf.
03 / BELEG-SCHLEIFE
Beobachte, was sich geändert hat, und halte Unbekanntes fest.
Vergleiche Antwort oder Diff mit Quelle, Test, Log oder Abnahmeregel.
Mach nur weiter, wenn der nächste Beleg vorhanden ist; sonst notiere den kleinsten sicheren Stopp.
04 / OPTIONALE WEGE
Wähle die kleinste nützliche nächste Ebene.
Codex · Tools · Skills · Agents · Recherche · Engineering · Teampraxis
Jeder Weg bewahrt eigene Quellen, Berechtigungen, Belege, Fehlerfälle und Grenzen.
GRENZE / KANDIDATENWEG
DIE KARTE ZEIGT DIE REIHENFOLGE, NICHT DIE BEHERRSCHUNG.
Bewahre Artefakt, Beleg, Grenze und nächste Frage auf.
PRYSAI LAB / ORIGINALE LEHRGRAFIK / ERST ÜBEN, DANN BEHAUPTEN""",
    ),
    "zh-tw": (
        "Prysai LLM Playbook 學習旅程",
        "這段四階段學習旅程先完成五個單元的 LLM 基礎核心，再做一項有界線的首項任務，將結果整理成證據並做出有意識的停止或判斷，最後選擇 Codex、工具、Skill 或團隊路線。",
        """PRYSAI LLM PLAYBOOK／學習旅程
先學會方法。
再選擇平台。
基礎／首項任務／證據／選擇性練習
01／基礎核心
理解 → 開始 → 辨識 → 修正 → 遷移
五個單元讓模型、請求、看得見的失敗、檢查與沒看過的任務都變得清楚。
在 Codex、工具、Agent 或 Skill 之前，先從這裡開始。
02／有界線的首項任務
提出請求前，先說清楚結果。
寫下目標、已提供的上下文、允許的協助、限制、回應形式與停止條件。
使用虛構或可丟棄的任務；保留第一次請求與第一次回應。
03／證據閉環
觀察發生了什麼變化，保留仍然未知的部分。
把回應或差異和來源、測試、紀錄檔或驗收規則對照。
只有下一項證明存在時才繼續；否則記下最小且安全的停止。
04／選擇性路線
選擇下一個最有用的最小層次。
Codex · 工具 · Skill · Agent · 研究 · 工程 · 團隊練習
每條路線都保留自己的來源、權限、證據、失敗案例與限制。
界線／候選路線
地圖只顯示順序，不代表已經熟練。
保留產出、證據、界線與下一個問題。
PRYSAI LAB／原創教學圖／先練習，再下結論""",
    ),
    "fr": (
        "Parcours d’apprentissage du Prysai LLM Playbook",
        "Ce parcours en quatre étapes commence par les cinq unités du LLM Foundation Core, transforme une première tâche délimitée en preuves et en arrêt ou décision volontaire, puis propose des parcours facultatifs avec Codex, des outils, des Skills ou une équipe.",
        """PRYSAI LLM PLAYBOOK / PARCOURS D’APPRENTISSAGE
APPRENDRE LA MÉTHODE.
CHOISIR ENSUITE LA PLATEFORME.
fondamentaux / première tâche / preuves / pratique facultative
01 / FOUNDATION CORE
Comprendre → commencer → repérer → réparer → transférer
Les cinq unités rendent explicites le modèle, la demande, les échecs visibles, le contrôle et la tâche inconnue.
Commencez ici avant Codex, les outils, les Agents ou les Skills.
02 / PREMIÈRE TÂCHE DÉLIMITÉE
Nommez le résultat avant de demander.
Indiquez l’objectif, le contexte fourni, l’aide autorisée, les limites, la forme de réponse et la condition d’arrêt.
Utilisez une tâche fictive ou jetable ; gardez la première demande et la première réponse.
03 / BOUCLE DES PREUVES
Observez ce qui a changé et gardez ce qui reste inconnu.
Comparez la réponse ou le diff à une source, un test, un journal ou un critère d’acceptation.
Continuez seulement si la preuve suivante existe ; sinon notez l’arrêt sûr le plus petit.
04 / PARCOURS FACULTATIFS
Choisissez la prochaine couche utile la plus petite.
Codex · outils · Skills · Agents · recherche · ingénierie · pratique d’équipe
Chaque parcours garde ses sources, autorisations, preuves, échecs et limites propres.
LIMITE / PARCOURS CANDIDAT
LA CARTE MONTRE L’ORDRE, PAS LA MAÎTRISE.
Gardez l’artefact, les preuves, la limite et la prochaine question.
PRYSAI LAB / CARTE ORIGINALE / PRATIQUEZ AVANT D’AFFIRMER""",
    ),
})


add_asset_locales("reader-page-reading-loop-red-black.svg", {
    "zh": (
        "从页面阅读到实践的闭环",
        "六个编号阶段把页面的问题、概念、行动、证据、边界和迁移问题连起来。最后一步指向新的任务，而不是宣称已经完成。",
        [
            "读者／从页面到实践", "读懂页面，", "然后做一个动作。", "每个阶段都有一个问题、一个小动作，以及一份要保留的记录。",
            "01", "问题", "这页要解决什么情境？", "02", "概念", "哪个区分会改变下一步？", "03", "行动", "最小的安全动作是什么？",
            "04", "证据", "哪份记录能让我检查结果？", "05", "边界", "这页不能证明什么？", "06", "迁移", "下一项任务会有什么变化？",
            "边界／路线不是结果",
        ],
    ),
    "es": (
        "Ciclo de lectura: de la página a la práctica",
        "Seis etapas numeradas conectan el problema, el concepto, la acción, la evidencia, el límite y la pregunta de transferencia de una página. La última etapa vuelve a una tarea nueva; no declara que todo esté terminado.",
        [
            "LECTOR / DE LA PÁGINA A LA PRÁCTICA", "LEE LA PÁGINA,", "Y HAZ UN MOVIMIENTO.", "Cada etapa tiene una pregunta, una acción pequeña y un registro que conservar.",
            "01", "PROBLEMA", "¿Qué situación resuelve esta página?", "02", "CONCEPTO", "¿Qué distinción cambia el siguiente paso?", "03", "ACCIÓN", "¿Cuál es el movimiento seguro más pequeño?",
            "04", "EVIDENCIA", "¿Qué registro me permite comprobar el resultado?", "05", "LÍMITE", "¿Qué no puede demostrar esta página?", "06", "TRANSFERENCIA", "¿Qué cambia en la siguiente tarea?",
            "LÍMITE / UN RECORRIDO NO ES UN RESULTADO",
        ],
    ),
    "ja": (
        "ページを読んで実践するためのループ",
        "6つの段階で、ページの問題、概念、行動、証拠、境界、転用の問いをつなぎます。最後は完了を宣言するのではなく、新しい課題へ戻ります。",
        [
            "リーダー / ページから実践へ", "ページを読み、", "次に1つ動く。", "各段階には問い、小さな行動、残す記録があります。",
            "01", "問題", "このページはどんな状況を解決する？", "02", "概念", "どの区別が次の一手を変える？", "03", "行動", "最も小さく安全な一手は？",
            "04", "証拠", "結果を確認できる記録はどれ？", "05", "境界", "このページだけでは何を証明できない？", "06", "転用", "次の課題では何が変わる？",
            "境界 / ルートは結果ではない",
        ],
    ),
    "ko": (
        "페이지를 읽고 실천으로 옮기는 루프",
        "번호가 붙은 여섯 단계가 한 페이지의 문제, 개념, 행동, 증거, 경계와 전이 질문을 연결합니다. 마지막 단계는 완료를 선언하지 않고 새로운 작업으로 돌아갑니다.",
        [
            "리더 / 페이지에서 실천으로", "페이지를 읽고", "그다음 한 가지를 움직이세요.", "각 단계에는 질문, 작은 행동과 남겨 둘 기록이 있습니다.",
            "01", "문제", "이 페이지는 어떤 상황을 해결하나요?", "02", "개념", "어떤 구분이 다음 행동을 바꾸나요?", "03", "행동", "가장 작고 안전한 행동은 무엇인가요?",
            "04", "증거", "결과를 점검할 수 있는 기록은 무엇인가요?", "05", "경계", "이 페이지가 증명하지 못하는 것은 무엇인가요?", "06", "전이", "다음 작업에서는 무엇이 달라지나요?",
            "경계 / 경로는 결과가 아닙니다",
        ],
    ),
    "de": (
        "Leseschleife: von der Seite zur Praxis",
        "Sechs nummerierte Schritte verbinden Problem, Konzept, Handlung, Beleg, Grenze und Transferfrage einer Seite. Der letzte Schritt führt zu einer neuen Aufgabe zurück, statt den Abschluss zu behaupten.",
        [
            "LESER / VON DER SEITE ZUR PRAXIS", "LIES DIE SEITE", "UND MACH EINEN SCHRITT.", "Jede Stufe hat eine Frage, eine kleine Handlung und ein Protokoll zum Aufbewahren.",
            "01", "AUSGANGSLAGE", "Welche Situation löst diese Seite?", "02", "KONZEPT", "Welche Unterscheidung verändert den nächsten Schritt?", "03", "HANDLUNG", "Was ist der kleinste sichere Schritt?",
            "04", "BELEG", "Welches Protokoll lässt mich das Ergebnis prüfen?", "05", "GRENZE", "Was kann diese Seite nicht belegen?", "06", "ÜBERTRAGUNG", "Was ändert sich bei der nächsten Aufgabe?",
            "GRENZE / EIN WEG IST KEIN ERGEBNIS",
        ],
    ),
    "zh-tw": (
        "從頁面閱讀到實作的循環",
        "六個編號階段把頁面的問題、概念、行動、證據、界線與遷移問題串起來。最後一個階段會回到新的任務，而不是宣稱已經完成。",
        [
            "讀者／從頁面到實作", "讀懂頁面，", "接著做一個動作。", "每個階段都有一個問題、一個小動作，以及一份要保留的紀錄。",
            "01", "問題", "這個頁面要解決什麼情境？", "02", "概念", "哪個區分會改變下一步？", "03", "行動", "最小的安全動作是什麼？",
            "04", "證據", "哪份紀錄能讓我檢查結果？", "05", "界線", "這個頁面無法證明什麼？", "06", "遷移", "下一項任務會有什麼變化？",
            "界線／路線不是結果",
        ],
    ),
    "fr": (
        "Boucle de lecture : de la page à la pratique",
        "Six étapes numérotées relient le problème, le concept, l’action, la preuve, la limite et la question de transfert d’une page. La dernière étape revient vers une nouvelle tâche au lieu de déclarer la réussite.",
        [
            "LECTEUR / DE LA PAGE À LA PRATIQUE", "LISEZ LA PAGE,", "PUIS FAITES UN PAS.", "Chaque étape comporte une question, une petite action et un relevé à conserver.",
            "01", "PROBLÈME", "Quelle situation cette page résout-elle ?", "02", "NOTION", "Quelle distinction change l’étape suivante ?", "03", "DÉMARCHE", "Quel est le plus petit geste sûr ?",
            "04", "PREUVE", "Quel relevé me permet de vérifier le résultat ?", "05", "LIMITE", "Que ne peut pas prouver cette page ?", "06", "TRANSFERT", "Qu’est-ce qui change à la prochaine tâche ?",
            "LIMITE / UN PARCOURS N’EST PAS UN RÉSULTAT",
        ],
    ),
})


add_asset_locales("first-task-evidence-bridge-red-black.svg", {
    "zh": (
        "从第一次任务到可使用的证据",
        "这座五步桥从选择一个可观察结果开始，经过安全边界和实际尝试，走到一次聚焦检查与交接记录。最后一格提醒：缺少记录，就必须缩小结论。",
        [
            "第一次任务／证据桥", "让一个小", "任务可以检查。", "只有别人能够检查这条路径，结果才真正有用。",
            "01", "结果", "选择一个可观察的结果。", "“帮我处理这个”还不是可检查的结果。", "02", "边界", "让输入和停止条件保持可见。", "使用安全的测试材料；说明哪些内容不放入，以及何时暂停。",
            "03", "尝试", "保存实际发生的内容。", "保留输入、回答、编辑、退出或回传资料，不要只留下计划。", "04", "检查", "对照一个重要细节。", "使用来源、差异、测试、日志或验收规则。",
            "05", "记录", "交接结果、限制和下一步。", "一份精简记录能让别人检查同一次尝试。", "边界", "没有记录，就不要扩大结论。", "小而明确的停止，好过没有记录却自信满满的故事。",
        ],
    ),
    "es": (
        "De la primera tarea a una evidencia utilizable",
        "Este puente de cinco pasos va de elegir un resultado observable, pasando por un límite seguro y un intento real, hasta una comprobación concreta y un registro de entrega. El último panel recuerda que, sin registro, la afirmación debe ser más pequeña.",
        [
            "PRIMERA TAREA / PUENTE DE EVIDENCIA", "HAZ COMPROBABLE", "UNA TAREA PEQUEÑA.", "Un resultado solo sirve cuando otra persona puede inspeccionar el recorrido.",
            "01", "RESULTADO", "ELIGE UN RESULTADO OBSERVABLE.", "«Ayúdame con esto» todavía no es un resultado comprobable.", "02", "LÍMITE", "MANTÉN VISIBLES LA ENTRADA Y LA PARADA.", "Usa un juego de prueba seguro; indica qué queda fuera y cuándo parar.",
            "03", "INTENTO", "GUARDA LO QUE OCURRIÓ DE VERDAD.", "Conserva la entrada, la respuesta, la edición, la salida o los datos devueltos; no solo el plan.", "04", "COMPROBAR", "COMPARA UN DETALLE IMPORTANTE.", "Usa una fuente, un diff, una prueba, un registro o un criterio de aceptación.",
            "05", "REGISTRO", "ENTREGA RESULTADO, LÍMITE Y SIGUIENTE PASO.", "Un registro breve permite inspeccionar el mismo intento.", "LÍMITE", "¿NO HAY REGISTRO? NO AMPLÍES LA AFIRMACIÓN.", "Una parada pequeña es mejor que una historia segura de sí misma sin registro.",
        ],
    ),
    "ja": (
        "最初の課題を使える証拠につなげる",
        "5段階の橋です。観察できる結果を1つ選び、安全な境界と実際の試行を経て、焦点を絞った確認と引き継ぎの記録につなげます。最後の枠は、記録がなければ主張を広げられないと伝えます。",
        [
            "最初の課題 / 証拠の橋", "小さな", "課題を確認できる形にする。", "別の人が経路を確認できて初めて、結果は役に立ちます。",
            "01", "結果", "観察できる結果を1つ選ぶ。", "「これを手伝って」だけでは、まだ確認できる結果ではない。", "02", "境界", "入力と停止を見えるようにする。", "安全なテストデータを使い、含めないものと止める時点を決める。",
            "03", "試行", "実際に起きたことを保存する。", "入力、応答、編集、終了、返されたデータを残す。計画だけでは足りない。", "04", "確認", "重要な点を1つ照合する。", "出典、差分、テスト、ログ、受け入れ条件のいずれかを使う。",
            "05", "記録", "結果、限界、次の一手を引き継ぐ。", "短い記録があれば、別の人も同じ試行を確認できます。", "境界", "記録がないなら、主張を広げない。", "記録のない自信満々の物語より、小さく止める方がよい。",
        ],
    ),
    "ko": (
        "첫 작업에서 활용 가능한 증거까지",
        "관찰 가능한 결과 하나를 고르는 일에서 시작해 안전한 경계와 실제 시도를 거쳐 집중 점검과 인계 기록으로 이어지는 다섯 단계의 다리입니다. 마지막 칸은 기록이 없으면 주장을 좁혀야 한다고 말합니다.",
        [
            "첫 작업 / 증거 다리", "작은", "작업 하나를 점검 가능하게 만드세요.", "다른 사람이 경로를 살펴볼 수 있을 때만 결과를 제대로 활용할 수 있습니다.",
            "01", "결과", "관찰 가능한 결과 하나를 고르세요.", "‘이 일을 도와주세요’만으로는 아직 점검 가능한 결과가 아닙니다.", "02", "경계", "입력과 중지 조건을 보이게 하세요.", "안전한 테스트 자료를 사용하고 무엇을 제외할지, 언제 멈출지 적으세요.",
            "03", "시도", "실제로 일어난 일을 저장하세요.", "입력, 답변, 편집, 종료 또는 반환된 자료를 남기세요. 계획만 남기지 마세요.", "04", "점검", "중요한 세부 사항 하나를 대조하세요.", "출처, diff, 테스트, 로그 또는 수용 기준을 사용하세요.",
            "05", "기록", "결과, 한계와 다음 단계를 인계하세요.", "간결한 기록이 있으면 다른 사람도 같은 시도를 점검할 수 있습니다.", "경계", "기록이 없으면 주장을 넓히지 마세요.", "기록 없는 자신만만한 이야기보다 작게 멈추는 편이 낫습니다.",
        ],
    ),
    "de": (
        "Von der ersten Aufgabe zum nutzbaren Beleg",
        "Diese Brücke mit fünf Schritten führt von einem beobachtbaren Ergebnis über eine sichere Grenze und einen tatsächlichen Versuch zu einer gezielten Prüfung und einem Übergabeprotokoll. Das letzte Feld sagt: Ohne Protokoll bleibt die Aussage klein.",
        [
            "ERSTE AUFGABE / BELEG-BRÜCKE", "MACH EINE KLEINE", "AUFGABE PRÜFBAR.", "Ein Ergebnis ist erst nützlich, wenn eine andere Person den Weg prüfen kann.",
            "01", "ERGEBNIS", "WÄHLE EIN BEOBACHTBARES ERGEBNIS.", "„Hilf mir damit“ ist noch kein prüfbares Ergebnis.", "02", "GRENZE", "HALTE EINGABE UND STOPP SICHTBAR.", "Nutze ein sicheres Testmaterial; nenne, was draußen bleibt und wann du pausierst.",
            "03", "VERSUCH", "SICHERE, WAS TATSÄCHLICH PASSIERT IST.", "Bewahre Eingabe, Antwort, Bearbeitung, Ende oder zurückgegebene Daten auf – nicht nur den Plan.", "04", "PRÜFEN", "VERGLEICHE EIN WICHTIGES DETAIL.", "Nutze Quelle, Diff, Test, Log oder Abnahmeregel.",
            "05", "PROTOKOLL", "ÜBERGIB ERGEBNIS, GRENZE UND NÄCHSTEN SCHRITT.", "Ein kurzes Protokoll lässt andere denselben Versuch prüfen.", "GRENZE", "KEIN PROTOKOLL? KEINE GRÖSSERE AUSSAGE.", "Ein kleiner Stopp ist besser als eine selbstsichere Geschichte ohne Protokoll.",
        ],
    ),
    "zh-tw": (
        "從第一項任務到可使用的證據",
        "這座五步驟的橋從選擇一個可觀察的結果開始，經過安全界線與實際嘗試，走到聚焦檢查與交接紀錄。最後一格提醒：沒有紀錄，就必須縮小主張。",
        [
            "第一項任務／證據橋", "讓一項小小的", "任務變得可檢查。", "只有別人能檢查這條路徑，結果才真正有用。",
            "01", "結果", "選擇一個可觀察的結果。", "「請幫我處理這件事」還不是可檢查的結果。", "02", "界線", "讓輸入與停止條件保持可見。", "使用安全的測試資料；說明哪些內容不納入，以及何時暫停。",
            "03", "嘗試", "保存實際發生的內容。", "保留輸入、回應、編輯、結束或回傳的資料，不要只留下計畫。", "04", "檢查", "對照一個重要細節。", "使用來源、差異、測試、紀錄檔或驗收規則。",
            "05", "紀錄", "交接結果、限制與下一步。", "一份精簡紀錄能讓別人檢查同一次嘗試。", "界線", "沒有紀錄，就不要擴大主張。", "小而清楚的停止，好過沒有紀錄卻自信滿滿的故事。",
        ],
    ),
    "fr": (
        "De la première tâche à une preuve utilisable",
        "Ce pont en cinq étapes part d’un résultat observable, passe par une limite sûre et un essai réel, puis arrive à un contrôle ciblé et à une fiche de transmission. Le dernier panneau rappelle que l’absence de relevé limite l’affirmation.",
        [
            "PREMIÈRE TÂCHE / PONT DES PREUVES", "RENDEZ UNE PETITE", "TÂCHE VÉRIFIABLE.", "Un résultat n’est utile que si une autre personne peut examiner le chemin parcouru.",
            "01", "RÉSULTAT", "CHOISISSEZ UN RÉSULTAT OBSERVABLE.", "« Aidez-moi avec ça » ne décrit pas encore un résultat vérifiable.", "02", "LIMITE", "GARDEZ L’ENTRÉE ET L’ARRÊT VISIBLES.", "Utilisez un jeu de test sûr ; indiquez ce qui reste hors périmètre et quand vous arrêter.",
            "03", "ESSAI", "CONSERVEZ CE QUI S’EST VRAIMENT PASSÉ.", "Gardez l’entrée, la réponse, la modification, la sortie ou les données renvoyées — pas seulement le plan.", "04", "CONTRÔLE", "COMPAREZ UN DÉTAIL IMPORTANT.", "Utilisez une source, un diff, un test, un journal ou un critère d’acceptation.",
            "05", "RELEVÉ", "TRANSMETTEZ LE RÉSULTAT, LA LIMITE ET LA SUITE.", "Un relevé court permet à une autre personne d’examiner le même essai.", "LIMITE", "PAS DE RELEVÉ ? PAS D’AFFIRMATION PLUS LARGE.", "Un petit arrêt vaut mieux qu’une histoire assurée sans relevé.",
        ],
    ),
})


add_asset_locales("recovery-decision-tree-red-black.svg", {
    "zh": (
        "恢复决策树",
        "这是一棵恢复决策树：保留请求和观察到的轨迹，找到第一个不匹配，检查权限；获准后做一次有边界的检查，如果证据仍然不足，就以候选或未知结果停下。",
        [
            "恢复／决策树", "让下一次", "检查更小。", "保留这次失配，核对权限，并让结论留在记录范围内。",
            "01", "保留", "保留请求和轨迹。", "保存原文、输入、输出、差异、状态和上一个检查点。", "02", "分类", "说清第一个不匹配。", "分开缺少输入、范围错误、行动失败和证据薄弱。", "03", "权限", "下一次检查获准了吗？", "如果范围、许可或输入缺失，不要扩大行动。",
            "是／已获准", "执行一次安全检查。", "改变一个条件并进行对照。", "保留原始记录", "否／未获准", "停下并记录缺口。", "标记为 candidate、blocked 或 unknown。", "不要编造成功",
            "检查之后", "得到有支持的结果、缩小的结论，或有意识地停下。", "更好的重跑结果只为这次运行提供证据，不是普遍修复。", "边界", "没有权限或没有证据？保留未知并停下。",
        ],
    ),
    "es": (
        "Árbol de decisión para recuperar el control",
        "Un árbol de recuperación: conserva la petición y el rastro observado, encuentra el primer desajuste, comprueba la autoridad y haz una comprobación acotada si está permitida. Si aún falta evidencia, detente con un resultado candidato o desconocido.",
        [
            "RECUPERACIÓN / ÁRBOL DE DECISIÓN", "HAZ MÁS PEQUEÑA", "LA PRÓXIMA COMPROBACIÓN.", "Conserva el fallo, verifica la autoridad y mantén la afirmación dentro del registro.",
            "01", "CONSERVAR", "GUARDA LA PETICIÓN Y EL RASTRO.", "Guarda el texto, las entradas, la salida, el diff, el estado y el último punto de control.", "02", "CLASIFICAR", "NOMBRA EL PRIMER DESAJUSTE.", "Separa la entrada que falta, el alcance incorrecto, la acción fallida y la prueba débil.", "03", "AUTORIDAD", "¿Está permitida la próxima comprobación?", "Si falta alcance, permiso o entrada, no amplíes la acción.",
            "SÍ / PERMITIDA", "Haz una comprobación segura.", "Cambia una condición y compara.", "CONSERVA EL REGISTRO ORIGINAL", "NO / NO PERMITIDA", "Detente y registra la brecha.", "Marca candidate, blocked o unknown.", "NO INVENTES UN ÉXITO",
            "DESPUÉS DE COMPROBAR", "Resultado respaldado, afirmación más estrecha o parada deliberada.", "Una repetición mejor es evidencia de ese intento, no una solución universal.", "LÍMITE", "¿Sin autoridad o sin prueba? Detente sin borrar lo desconocido.",
        ],
    ),
    "ja": (
        "復旧の判断ツリー",
        "復旧の判断ツリーです。依頼と観察できた記録を残し、最初の不一致を見つけ、権限を確認します。許可があれば範囲を区切った確認を1つ行い、証拠が足りなければ候補または不明のまま止まります。",
        [
            "復旧 / 判断ツリー", "次の確認を", "もっと小さくする。", "失敗を残し、権限を確認し、主張を記録の範囲に収める。",
            "01", "残す", "依頼と記録を残す。", "文面、入力、出力、差分、状態、最後のチェックポイントを保存する。", "02", "分類", "最初の不一致を言葉にする。", "不足した入力、範囲違い、行動の失敗、弱い証拠を分ける。", "03", "権限", "次の確認は許可されている？", "範囲、許可、入力のどれかが足りなければ、行動を広げない。",
            "はい / 許可あり", "安全な確認を1つ行う。", "条件を1つ変えて比較する。", "元の記録を残す", "いいえ / 許可なし", "止まって不足を記録する。", "candidate、blocked、unknown のいずれかを付ける。", "成功を作らない",
            "確認のあと", "裏付けのある結果、狭めた主張、または意図した停止。", "改善した再実行はその実行の証拠であり、万能な修正ではない。", "境界", "権限も証拠もない？ 不明点を残したまま止まる。",
        ],
    ),
    "ko": (
        "복구 의사결정 트리",
        "복구 의사결정 트리입니다. 요청과 관찰한 기록을 보존하고 첫 불일치를 찾은 뒤 권한을 확인합니다. 허용되면 범위를 제한한 점검 하나를 수행하고, 증거가 여전히 부족하면 candidate 또는 unknown으로 멈춥니다.",
        [
            "복구 / 의사결정 트리", "다음 점검을", "더 작게 만드세요.", "실패를 보존하고 권한을 확인하며 주장을 기록 안에 두세요.",
            "01", "보존", "요청과 기록을 남기세요.", "문구, 입력, 출력, diff, 상태와 마지막 체크포인트를 저장하세요.", "02", "분류", "첫 불일치를 이름 붙이세요.", "빠진 입력, 잘못된 범위, 실패한 행동과 약한 증거를 구분하세요.", "03", "권한", "다음 점검이 허용되었나요?", "범위, 허가 또는 입력이 없으면 행동을 넓히지 마세요.",
            "예 / 허용됨", "안전한 점검 하나를 수행하세요.", "조건 하나를 바꾸고 비교하세요.", "원래 기록을 보존하세요", "아니요 / 허용되지 않음", "멈추고 빈틈을 기록하세요.", "candidate, blocked 또는 unknown으로 표시하세요.", "성공을 꾸며 내지 마세요",
            "점검 후", "근거 있는 결과, 더 좁은 주장 또는 의도적인 중지.", "더 나은 재실행은 그 실행의 증거이지 만능 해결책이 아닙니다.", "경계", "권한이나 증거가 없나요? unknown을 그대로 둔 채 멈추세요.",
        ],
    ),
    "de": (
        "Entscheidungsbaum für die Wiederherstellung",
        "Ein Entscheidungsbaum für die Wiederherstellung: Bewahre Anfrage und beobachtete Spur auf, finde die erste Abweichung, prüfe die Berechtigung und führe bei Erlaubnis einen begrenzten Check aus. Fehlt der Beleg weiterhin, stoppe mit einem Kandidaten- oder unbekannten Ergebnis.",
        [
            "WIEDERHERSTELLUNG / ENTSCHEIDUNGSBAUM", "MACH DEN NÄCHSTEN", "CHECK KLEINER.", "Bewahre den Fehlschlag auf, prüfe die Berechtigung und halte die Aussage im Protokoll.",
            "01", "BEWAHREN", "BEHALTE ANFRAGE UND SPUR.", "Sichere Wortlaut, Eingaben, Ausgabe, Diff, Zustand und den letzten Prüfpunkt.", "02", "EINORDNEN", "BENENNE DIE ERSTE ABWEICHUNG.", "Trenne fehlende Eingabe, falschen Umfang, fehlgeschlagene Handlung und schwachen Beleg.", "03", "BERECHTIGUNG", "Ist der nächste Check erlaubt?", "Fehlt Umfang, Erlaubnis oder Eingabe, erweitere die Handlung nicht.",
            "JA / ERLAUBT", "Führe einen sicheren Check aus.", "Ändere eine Bedingung und vergleiche.", "ORIGINALPROTOKOLL BEWAHREN", "NEIN / NICHT ERLAUBT", "Stoppe und notiere die Lücke.", "Markiere candidate, blocked oder unknown.", "KEINEN ERFOLG ERFINDEN",
            "NACH DEM CHECK", "Belegtes Ergebnis, engere Aussage oder bewusster Stopp.", "Ein besserer erneuter Lauf belegt diesen Lauf, nicht eine universelle Lösung.", "GRENZE", "Keine Berechtigung oder kein Beleg? Stoppe, ohne das Unbekannte zu verdecken.",
        ],
    ),
    "zh-tw": (
        "復原決策樹",
        "這是一棵復原決策樹：保留請求與觀察到的軌跡，找出第一個不相符，檢查權限；獲得許可後執行一次有界線的檢查。若證據仍不足，就以 candidate 或 unknown 結果停下。",
        [
            "復原／決策樹", "讓下一次", "檢查更小。", "保留這次失配，確認權限，並讓主張留在紀錄範圍內。",
            "01", "保留", "保留請求與軌跡。", "保存原文、輸入、輸出、差異、狀態與上一個檢查點。", "02", "分類", "說清楚第一個不相符。", "分開缺少輸入、範圍錯誤、行動失敗與證據薄弱。", "03", "權限", "下一次檢查獲准了嗎？", "如果缺少範圍、許可或輸入，不要擴大行動。",
            "是／已獲准", "執行一次安全檢查。", "改變一個條件並比較。", "保留原始紀錄", "否／未獲准", "停下並記下缺口。", "標記為 candidate、blocked 或 unknown。", "不要捏造成功",
            "檢查之後", "有證據支持的結果、縮小的主張，或有意識的停止。", "更好的重新執行只證明那一次執行，不是通用修正。", "界線", "沒有權限或沒有證據？保留未知並停下。",
        ],
    ),
    "fr": (
        "Arbre de décision pour la reprise",
        "Cet arbre de reprise conserve la demande et la trace observée, repère le premier écart, vérifie l’autorité et lance un contrôle délimité si cela est permis. Si la preuve manque encore, arrêtez-vous avec un résultat candidate ou unknown.",
        [
            "REPRISE / ARBRE DE DÉCISION", "RENDEZ LE PROCHAIN", "CONTRÔLE PLUS PETIT.", "Conservez l’échec, vérifiez l’autorité et gardez l’affirmation dans le relevé.",
            "01", "CONSERVER", "GARDEZ LA DEMANDE ET LA TRACE.", "Conservez le texte, les entrées, la sortie, le diff, l’état et le dernier point de contrôle.", "02", "CLASSER", "NOMMEZ LE PREMIER ÉCART.", "Séparez l’entrée manquante, le périmètre erroné, l’action échouée et la preuve faible.", "03", "AUTORITÉ", "Le prochain contrôle est-il autorisé ?", "S’il manque le périmètre, l’autorisation ou l’entrée, n’élargissez pas l’action.",
            "OUI / AUTORISÉ", "Faites un contrôle sûr.", "Changez une condition et comparez.", "GARDEZ LE RELEVÉ ORIGINAL", "NON / NON AUTORISÉ", "Arrêtez-vous et notez le manque.", "Marquez candidate, blocked ou unknown.", "N’INVENTEZ PAS UNE RÉUSSITE",
            "APRÈS LE CONTRÔLE", "Résultat étayé, affirmation plus étroite ou arrêt volontaire.", "Une meilleure reprise fournit une preuve pour cette exécution, pas une solution universelle.", "LIMITE", "Pas d’autorité ou pas de preuve ? Arrêtez-vous en gardant l’inconnu intact.",
        ],
    ),
})


add_asset_locales("skill-trigger-boundary-decision-map.svg", {
    "zh": (
        "Skill 触发与边界决策图",
        "这张五步决策图说明可复用的 Skill 如何工作：说清任务、检查输入、确认权限、查看实际运行，然后让结论留在证据范围内；不匹配时就让出并停下。",
        [
            "SKILL／边界", "触发不等于", "权限。", "可复用的方法要在匹配条件或证据缺失时安全让出，才能证明自己值得保留。",
            "01", "触发", "说清范围狭窄的任务。", "匹配良好就把任务路由过来；匹配不足就让出。", "02", "输入关卡", "检查实际存在的内容。", "已提供／可读取／推断／未知·缺少输入→停下。", "03", "权限", "把能力和许可分开。", "允许／禁止／可逆／需批准·发生副作用前暂停。",
            "04", "运行／检查", "寻找实际发生的事件。", "记录·输出·差异·日志·测试·人工复核。", "05", "证据边界", "只声明记录支持的内容。", "正面／边界／失败／迁移·证据缺失时使用 candidate 或停下。",
            "两个诚实结果", "路由：匹配、权限和证据都可见。", "让出：说清缺少的事实，并保持结论很小。", "Skill 契约说明何时行动、何时不行动，以及别人可以检查什么。",
        ],
    ),
    "es": (
        "Mapa de decisión sobre activación y límites de un Skill",
        "Este mapa de cinco pasos describe un Skill reutilizable: nombra el trabajo, comprueba la entrada, verifica la autoridad, inspecciona la ejecución real y mantiene la afirmación dentro de la evidencia; si falta el encaje, cede y se detiene.",
        [
            "SKILL / LÍMITE", "ACTIVAR NO ES", "DAR PERMISO.", "Un método reutilizable demuestra su valor al ceder de forma segura cuando faltan encaje o evidencia.",
            "01", "ACTIVACIÓN", "Nombra un trabajo acotado.", "Un buen encaje dirige la tarea; un encaje débil cede.", "02", "FILTRO DE ENTRADA", "Comprueba qué está realmente presente.", "Proporcionada / legible / inferida / desconocida · falta entrada → parar.", "03", "AUTORIDAD", "Separa capacidad y permiso.", "Permitido / prohibido / reversible / aprobación · pausa antes de un efecto externo.",
            "04", "EJECUTAR / INSPECCIONAR", "Busca el evento real.", "Registro · salida · diff · log · prueba · comprobación humana.", "05", "LÍMITE DE EVIDENCIA", "Afirma solo lo que respalda el registro.", "Positivo / límite / fallo / transferencia · candidate o parada si falta prueba.",
            "DOS RESULTADOS HONESTOS", "DIRIGIR: se ven el encaje, la autoridad y la evidencia.", "CEDER: se nombra el hecho que falta y la afirmación sigue siendo pequeña.", "El contrato de un Skill explica cuándo actuar, cuándo no hacerlo y qué puede inspeccionar otra persona.",
        ],
    ),
    "ja": (
        "Skill のトリガーと境界を決めるマップ",
        "再利用できる Skill の5段階を示します。仕事を定め、入力を確認し、権限を確かめ、実際の実行を調べます。証拠が支える範囲だけを主張し、合わなければ譲って止まります。",
        [
            "SKILL / 境界", "トリガーは", "権限ではない。", "再利用できる方法は、適合や証拠が足りないときに安全に譲ってこそ、残す価値を示します。",
            "01", "トリガー", "狭い仕事を言葉にする。", "適合すれば課題を案内し、適合しなければ譲る。", "02", "入力ゲート", "実際にあるものを確認する。", "提供済み / 読み取り可能 / 推定 / 不明 · 入力不足 → 停止。", "03", "権限", "能力と許可を分ける。", "許可 / 禁止 / 可逆 / 承認 · 影響が出る前に一時停止。",
            "04", "実行 / 確認", "実際のイベントを探す。", "記録 · 出力 · 差分 · ログ · テスト · 人による読み返し。", "05", "証拠の境界", "記録が支えることだけを主張する。", "肯定 / 境界 / 失敗 / 転用 · 証拠がなければ candidate または停止。",
            "正直な2つの結果", "案内：適合、権限、証拠が見えている。", "譲る：足りない事実を示し、主張を小さく保つ。", "Skill の契約は、いつ行動し、いつ行動せず、何を別の人が確認できるかを説明します。",
        ],
    ),
    "ko": (
        "Skill 트리거와 경계 의사결정 지도",
        "재사용 가능한 Skill의 다섯 단계를 보여 줍니다. 작업을 정하고 입력을 확인하며 권한을 검증한 뒤 실제 실행을 살펴보세요. 증거가 뒷받침하는 만큼만 주장하고 맞지 않으면 양보하고 멈춥니다.",
        [
            "SKILL / 경계", "트리거는", "권한이 아닙니다.", "재사용 가능한 방법은 조건이나 증거가 부족할 때 안전하게 양보할 수 있어야 쓸모를 증명합니다.",
            "01", "트리거", "범위가 좁은 작업을 정하세요.", "잘 맞으면 작업을 연결하고, 맞지 않으면 양보합니다.", "02", "입력 관문", "실제로 있는 것을 확인하세요.", "제공됨 / 읽을 수 있음 / 추정됨 / unknown · 입력이 없으면 중지.", "03", "권한", "능력과 허가를 분리하세요.", "허용 / 금지 / 되돌릴 수 있음 / 승인 · 부작용 전에 멈추세요.",
            "04", "실행 / 점검", "실제 이벤트를 찾으세요.", "기록 · 출력 · diff · 로그 · 테스트 · 사람이 다시 확인한 내용.", "05", "증거 경계", "기록이 뒷받침하는 만큼만 주장하세요.", "긍정 / 경계 / 실패 / 전이 · 증거가 없으면 candidate 또는 중지.",
            "정직한 두 가지 결과", "연결: 적합성, 권한과 증거가 보입니다.", "양보: 부족한 사실을 밝히고 주장을 작게 유지합니다.", "Skill 계약은 언제 행동하고 언제 행동하지 않으며 다른 사람이 무엇을 점검할 수 있는지 설명합니다.",
        ],
    ),
    "de": (
        "Entscheidungskarte für Skill-Trigger und Grenzen",
        "Diese Karte mit fünf Schritten beschreibt einen wiederverwendbaren Skill: Aufgabe benennen, Eingabe prüfen, Berechtigung bestätigen, den tatsächlichen Lauf inspizieren und die Aussage auf den Beleg begrenzen; fehlt die Passung, gibt der Skill ab und stoppt.",
        [
            "SKILL / GRENZE", "TRIGGER IST KEINE", "BERECHTIGUNG.", "Eine wiederverwendbare Methode verdient ihren Platz, wenn sie bei fehlender Passung oder Evidenz sicher abgibt.",
            "01", "AUSLÖSER", "Benenne die eng begrenzte Aufgabe.", "Gute Passung leitet die Aufgabe weiter; schwache Passung gibt ab.", "02", "EINGABEPRÜFUNG", "Prüfe, was tatsächlich vorhanden ist.", "Gegeben / lesbar / erschlossen / unbekannt · fehlende Eingabe → Stopp.", "03", "BERECHTIGUNG", "Trenne Fähigkeit und Erlaubnis.", "Erlaubt / verboten / umkehrbar / Freigabe · vor Nebenwirkungen pausieren.",
            "04", "LAUF / PRÜFEN", "Suche das tatsächliche Ereignis.", "Protokoll · Ausgabe · Diff · Log · Test · menschlicher Rückcheck.", "05", "BELEG-GRENZE", "Behaupte nur, was das Protokoll trägt.", "Positiv / Grenze / Fehler / Transfer · candidate oder Stopp, wenn der Beleg fehlt.",
            "ZWEI EHRLICHE ERGEBNISSE", "WEITERLEITEN: Passung, Berechtigung und Beleg sind sichtbar.", "ABGEBEN: Die fehlende Tatsache ist benannt und die Aussage bleibt klein.", "Ein Skill-Vertrag erklärt, wann gehandelt wird, wann nicht und was eine andere Person prüfen kann.",
        ],
    ),
    "zh-tw": (
        "Skill 觸發與界線決策圖",
        "這張五步驟決策圖說明可重複使用的 Skill 如何運作：說清楚工作、檢查輸入、確認權限、檢視實際執行，並讓主張留在證據範圍內；不符合時就讓出並停下。",
        [
            "SKILL／界線", "觸發不等於", "權限。", "可重複使用的方法，必須在條件或證據不足時安全讓出，才能證明自己值得保留。",
            "01", "觸發", "說清楚範圍狹窄的工作。", "符合就把任務導向這裡；不符合就讓出。", "02", "輸入關卡", "檢查實際存在的內容。", "已提供／可讀取／推測／未知・缺少輸入 → 停止。", "03", "權限", "分開能力與許可。", "允許／禁止／可復原／需核准・產生副作用前暫停。",
            "04", "執行／檢查", "尋找實際發生的事件。", "紀錄・輸出・差異・紀錄檔・測試・人工複核。", "05", "證據界線", "只主張紀錄支持的內容。", "正面／界線／失敗／遷移・證據不足時使用 candidate 或停止。",
            "兩個誠實結果", "導向：符合度、權限與證據都可見。", "讓出：說明缺少的事實，讓主張保持精簡。", "Skill 契約說明何時行動、何時不行動，以及別人可以檢查什麼。",
        ],
    ),
    "fr": (
        "Carte de décision des déclencheurs et limites d’un Skill",
        "Cette carte en cinq étapes décrit un Skill réutilisable : nommer le travail, vérifier l’entrée, confirmer l’autorité, examiner l’exécution réelle, puis limiter l’affirmation à la preuve ; si l’ajustement manque, le Skill cède et s’arrête.",
        [
            "SKILL / LIMITE", "UN DÉCLENCHEUR N’EST PAS", "UNE AUTORISATION.", "Une méthode réutilisable mérite sa place lorsqu’elle cède sans danger si l’adéquation ou la preuve manque.",
            "01", "DÉCLENCHEUR", "Nommez le travail étroit.", "Une bonne adéquation oriente la tâche ; une mauvaise adéquation cède.", "02", "FILTRE D’ENTRÉE", "Vérifiez ce qui est réellement présent.", "Fourni / lisible / inféré / inconnu · entrée manquante → arrêt.", "03", "AUTORITÉ", "Séparez capacité et autorisation.", "Autorisé / interdit / réversible / approbation · pause avant tout effet secondaire.",
            "04", "EXÉCUTER / INSPECTER", "Cherchez l’événement réel.", "Relevé · sortie · diff · journal · test · relecture humaine.", "05", "LIMITE DE LA PREUVE", "N’affirmez que ce que le relevé étaye.", "Positif / limite / échec / transfert · candidate ou arrêt si la preuve manque.",
            "DEUX RÉSULTATS HONNÊTES", "ORIENTER : l’adéquation, l’autorité et la preuve sont visibles.", "CÉDER : le fait manquant est nommé et l’affirmation reste limitée.", "Le contrat d’un Skill explique quand agir, quand s’abstenir et ce qu’une autre personne peut examiner.",
        ],
    ),
})


add_asset_locales("skill-to-observable-output.svg", {
    "zh": (
        "Skill 契约如何留下可检查的产出",
        "这张红黑教学图把 Skill 的四个决定连到可检查的产出：触发、输入关卡、有边界的方法和可观察回执。下方验证轨道要求正面、边界、失败和迁移四类案例。",
        [
            "SKILL 契约 → 可观察产出", "方法 / 不是魔法", "四个决定。一个可检查的结果。", "问题决定范围；每次交接都要看得见权限。",
            "01 / 触发", "说清任务。", "这个方法何时", "最适合这项工作？", "产出：路由或让出",
            "02 / 输入关卡", "先检查。", "必须有什么？", "缺少哪项事实就要停下？", "缺少输入 → 停下",
            "03 / 有边界的方法", "分开各项行动。", "允许 / 禁止 / 可回退", "目标 / 负责人 / 停止 / 回滚", "能力 ≠ 权限",
            "04 / 可观察产出", "留下别人可以", "检查的证据。", "文件 · 差异 · 日志 · 截图", "产出 + 限制 + 状态",
            "验证轨道", "正面", "边界", "失败", "迁移", "适用于指定任务", "超出范围时让出", "诚实地停止或恢复", "面对变式仍然有效",
            "项目原创图形 · 不含外部媒体", "PRYSAI LAB / 候选",
        ],
    ),
    "es": (
        "Un Skill convierte un contrato en un resultado comprobable",
        "Esta lámina roja y negra conecta cuatro decisiones de un Skill con un resultado comprobable: activación, filtro de entrada, método acotado y comprobante observable. El carril inferior exige casos positivos, de límite, de fallo y de transferencia.",
        [
            "CONTRATO DE SKILL → RESULTADO COMPROBABLE", "MÉTODO / NO MAGIA", "Cuatro decisiones. Un resultado inspeccionable.", "El alcance sigue a la pregunta; la autoridad queda visible en cada entrega.",
            "01 / ACTIVACIÓN", "Di la tarea.", "¿Cuándo encaja", "mejor este método?", "SALIDA: DIRIGIR O CEDER",
            "02 / FILTRO DE ENTRADA", "Comprueba primero.", "¿Qué debe estar presente?", "¿Qué falta lo detiene?", "ENTRADA AUSENTE → PARAR",
            "03 / MÉTODO ACOTADO", "Separa las acciones.", "Permitido / prohibido / reversible", "Meta / dueño / parar / revertir", "CAPACIDAD ≠ AUTORIDAD",
            "04 / RESULTADO INSPECCIONABLE", "Deja una prueba", "que otra persona revise.", "Archivo · diff · registro · captura", "RESULTADO + LÍMITE + ESTADO",
            "CARRIL DE VERIFICACIÓN", "POSITIVO", "LÍMITE", "FALLO", "TRANSFERENCIA", "funciona en el trabajo nombrado", "cede fuera de su alcance", "se detiene o recupera con honestidad", "resiste un ejemplo distinto",
            "PROYECTO ORIGINAL · SIN MEDIOS EXTERNOS", "PRYSAI LAB / CANDIDATO",
        ],
    ),
    "ja": (
        "Skill の契約を確認できる成果物につなぐ",
        "この赤と黒の教材図は、Skill の4つの判断を確認できる成果物へつなぎます。トリガー、入力ゲート、範囲を区切った方法、確認できる成果物を示し、下の検証レールで肯定・境界・失敗・転用の4ケースを求めます。",
        [
            "SKILL の契約 → 確認できる成果物", "方法 / 魔法ではない", "4つの判断。1つの確認できる結果。", "問いに合わせて範囲を決め、引き継ぎごとに権限を見えるようにする。",
            "01 / トリガー", "仕事を決める。", "この方法が", "最も合うのはいつ？", "出力：案内または譲る",
            "02 / 入力ゲート", "まず確認する。", "何がそろっていればよい？", "何が足りないと止める？", "入力不足 → 停止",
            "03 / 範囲を区切った方法", "行動を分ける。", "許可 / 禁止 / 元に戻せる", "対象 / 担当 / 停止 / 復旧", "能力 ≠ 権限",
            "04 / 確認できる成果物", "別の人が確認できる", "証拠を残す。", "ファイル・差分・ログ・スクリーンショット", "成果物 + 限界 + 状態",
            "検証レール", "肯定", "境界", "失敗", "転用", "指定した仕事で機能する", "範囲外では譲る", "正直に停止または復旧する", "変えた例でも持ちこたえる",
            "プロジェクト作成 · 外部メディアなし", "PRYSAI LAB / candidate",
        ],
    ),
    "ko": (
        "Skill 계약에서 확인 가능한 산출물로",
        "이 빨강·검정 교육 그림은 Skill의 네 가지 결정을 확인 가능한 산출물로 연결합니다. 트리거, 입력 관문, 범위가 정해진 방법과 확인 가능한 산출물을 보여 주고, 아래 검증 레일에서 긍정·경계·실패·전이 네 가지 사례를 요구합니다.",
        [
            "SKILL 계약 → 확인 가능한 산출물", "방법 / 마법이 아닙니다", "네 가지 결정. 하나의 점검 가능한 결과.", "질문에 맞춰 범위를 정하고 인계할 때마다 권한을 드러냅니다.",
            "01 / 트리거", "작업 정하기.", "이 방법이", "언제 가장 잘 맞나요?", "출력: 연결 또는 양보",
            "02 / 입력 관문", "먼저 확인하세요.", "무엇이 있어야 하나요?", "무엇이 없으면 멈추나요?", "입력 누락 → 중지",
            "03 / 범위가 정해진 방법", "행동을 분리하세요.", "허용 / 금지 / 되돌릴 수 있음", "대상 / 담당자 / 중지 / 복구", "능력 ≠ 권한",
            "04 / 확인 가능한 산출물", "다른 사람이 확인할", "증거를 남기세요.", "파일 · diff · 로그 · 스크린샷", "산출물 + 한계 + 상태",
            "검증 레일", "긍정", "경계", "실패", "전이", "지정한 작업에서 작동", "범위를 벗어나면 양보", "정직하게 중지하거나 복구", "바뀐 예에서도 견딤",
            "프로젝트 원본 도형 · 외부 미디어 없음", "PRYSAI LAB / candidate",
        ],
    ),
    "de": (
        "Ein Skill-Vertrag führt zu einem prüfbaren Ergebnis",
        "Diese Lehrgrafik in Rot und Schwarz verbindet vier Entscheidungen eines Skills mit einem prüfbaren Ergebnis: Auslöser, Eingabeprüfung, begrenzte Methode und prüfbarer Beleg. Die untere Prüfschiene verlangt positive, begrenzte, fehlerhafte und übertragene Fälle.",
        [
            "SKILL-VERTRAG → PRÜFBARES ERGEBNIS", "METHODE / KEINE MAGIE", "Vier Entscheidungen. Ein prüfbares Ergebnis.", "Die Frage bestimmt den Umfang; bei jeder Übergabe bleibt die Berechtigung sichtbar.",
            "01 / AUSLÖSER", "Nenne sie.", "Wann passt diese", "Methode am engsten?", "AUSGABE: WEITER ODER ABGEBEN",
            "02 / EINGABEPRÜFUNG", "Zuerst prüfen.", "Was muss vorhanden sein?", "Welche Lücke stoppt sie?", "EINGABE FEHLT → STOPP",
            "03 / BEGRENZTE METHODE", "Trenne die Aktionen.", "Erlaubt / verboten / umkehrbar", "Ziel / Verantwortung / Stopp / Rückweg", "FÄHIGKEIT ≠ BERECHTIGUNG",
            "04 / PRÜFBARES ERGEBNIS", "Lass einen Beleg da,", "den andere prüfen können.", "Datei · Diff · Log · Screenshot", "ERGEBNIS + GRENZE + STATUS",
            "PRÜFRAIL", "POSITIV", "GRENZE", "FEHLER", "ÜBERTRAGUNG", "funktioniert bei der benannten Aufgabe", "gibt außerhalb des Umfangs ab", "stoppt oder stellt ehrlich wieder her", "hält ein verändertes Beispiel aus",
            "PROJEKTEIGENE GRAFIK · KEINE EXTERNEN MEDIEN", "PRYSAI LAB / KANDIDAT",
        ],
    ),
    "zh-tw": (
        "Skill 契約如何留下可檢查的產出",
        "這張紅黑教學圖把 Skill 的四個決定連到可檢查的產出：觸發、輸入關卡、有界線的方法和可觀察紀錄。下方驗證軌道要求正面、界線、失敗和遷移四類案例。",
        [
            "SKILL 契約 → 可觀察產出", "方法／不是魔法", "四個決定。一個可檢查的結果。", "問題決定範圍；每次交接都要讓權限保持可見。",
            "01／觸發", "說清楚工作。", "這個方法何時", "最適合這項工作？", "產出：導向或讓出",
            "02／輸入關卡", "先檢查。", "必須具備什麼？", "缺少哪個事實就要停下？", "缺少輸入 → 停止",
            "03／有界線的方法", "分開各項行動。", "允許／禁止／可復原", "目標／負責人／停止／回滾", "能力 ≠ 權限",
            "04／可觀察產出", "留下別人可以", "檢查的證據。", "檔案・差異・紀錄・截圖", "產出＋限制＋狀態",
            "驗證軌道", "正面", "界線", "失敗", "遷移", "適用於指定工作", "超出範圍時讓出", "誠實地停止或復原", "面對變式仍然有效",
            "專案原創圖形・不含外部媒體", "PRYSAI LAB／候選",
        ],
    ),
    "fr": (
        "Un contrat de Skill mène à un résultat vérifiable",
        "Cette planche rouge et noire relie quatre décisions d’un Skill à un résultat vérifiable : déclencheur, filtre d’entrée, méthode délimitée et résultat observable. Le rail inférieur exige quatre cas : positif, limite, échec et transfert.",
        [
            "CONTRAT DE SKILL → RÉSULTAT VÉRIFIABLE", "MÉTHODE / PAS DE MAGIE", "Quatre décisions. Un résultat vérifiable.", "La question fixe le périmètre ; l’autorité reste visible à chaque transmission.",
            "01 / DÉCLENCHEUR", "Nommez-la.", "Quand cette méthode", "est-elle la plus adaptée ?", "SORTIE : ORIENTER OU CÉDER",
            "02 / FILTRE D’ENTRÉE", "Vérifiez d’abord.", "Que faut-il avoir ?", "Quelle absence l’arrête ?", "ENTRÉE MANQUANTE → ARRÊT",
            "03 / MÉTHODE DÉLIMITÉE", "Séparez les actions.", "Autorisé / interdit / réversible", "Cible / responsable / arrêt / reprise", "CAPACITÉ ≠ AUTORITÉ",
            "04 / RÉSULTAT VÉRIFIABLE", "Laissez une preuve", "qu’un tiers puisse vérifier.", "Fichier · diff · journal · capture", "RÉSULTAT + LIMITE + STATUT",
            "RAIL DE VÉRIFICATION", "POSITIF", "LIMITE", "ÉCHEC", "TRANSFERT", "fonctionne pour le travail nommé", "cède hors de son périmètre", "s’arrête ou reprend honnêtement", "résiste à un exemple différent",
            "GRAPHIQUE ORIGINAL DU PROJET · SANS MÉDIA EXTERNE", "PRYSAI LAB / CANDIDAT",
        ],
    ),
})


add_asset_locales("lifecycle-checkpoints.svg", {
    "zh": (
        "工作流通过可检查的出口逐步前进",
        "这张七阶段教学图把工作流分成两条阅读带，每个阶段都标出出口证据。缺少出口时，路径会明确分支到停止与恢复。",
        [
            "工作流控制／07 个阶段／08", "没有出口证据，就不能前进。", "Agent 继续行动不等于检查点；可检查的产出才是。", "A 区／框定与制作",
            "01", "定义", "目标／范围／非目标", "出口／验收＋停止", "02", "计划", "切片／依赖／风险", "出口／有序检查点", "03", "构建", "有范围的差异／变更文件", "出口／可回退的变更", "04", "验证", "命令／退出／运行时／限制", "出口／与声明匹配的证明",
            "B 区／判断、交接、保持现状", "05", "审查", "声明图／独立阅读／风险", "出口／接受、修改、拒绝", "06", "交付", "差异／日志／缺口／交接", "出口／有边界的回执", "07", "维护", "负责人／审查／回滚", "出口／标注下一次检查日期", "缺少出口？", "停止", "恢复", "保留最后状态",
            "教学模型／每个出口都有声明范围／单张截图不能证明工作流已经运行",
        ],
    ),
    "es": (
        "Un flujo de trabajo avanza mediante salidas comprobables",
        "Esta lámina de siete etapas divide el flujo en dos bandas de lectura y nombra la evidencia de salida de cada etapa. Si falta una salida, muestra una rama clara hacia parar y recuperar.",
        [
            "CONTROL DEL FLUJO / 07 ETAPAS / 08", "SIN EVIDENCIA DE SALIDA, NO AVANCES.", "Que el Agent siga adelante no es un punto de control; lo es un artefacto inspeccionable.", "BANDA A / ENCUADRAR Y HACER",
            "01", "DEFINIR", "objetivo / alcance / no objetivos", "SALIDA / ACEPTACIÓN + PARADA", "02", "PLANIFICAR", "cortes / dependencias / riesgos", "SALIDA / PUNTOS DE CONTROL ORDENADOS", "03", "CONSTRUIR", "diff acotado / archivos modificados", "SALIDA / CAMBIO REVERSIBLE", "04", "VERIFICAR", "comando / salida / ejecución / límites", "SALIDA / PRUEBA AJUSTADA A LA AFIRMACIÓN",
            "BANDA B / JUZGAR, ENTREGAR, MANTENER EL ESTADO", "05", "REVISAR", "mapa de afirmaciones / lectura independiente / riesgos", "SALIDA / ACEPTAR, CORREGIR, RECHAZAR", "06", "ENTREGAR", "diff / registros / brechas / entrega", "SALIDA / REGISTRO ACOTADO", "07", "MANTENER", "responsable / revisión / reversión", "SALIDA / PRÓXIMA COMPROBACIÓN FECHADA", "¿FALTA UNA SALIDA?", "PARA", "RECUPERA", "CONSERVA EL ÚLTIMO ESTADO",
            "MODELO DIDÁCTICO / CADA SALIDA TIENE SU ALCANCE DE AFIRMACIÓN / UNA CAPTURA SOLA NO DEMUESTRA QUE EL FLUJO SE HAYA EJECUTADO",
        ],
    ),
    "ja": (
        "ワークフローは確認できる出口を通って進む",
        "7段階の教材図です。ワークフローを2つの読み取り帯に分け、各段階の出口に必要な証拠を示します。出口がなければ、停止と復旧への分岐が見える形で現れます。",
        [
            "ワークフロー管理 / 07段階 / 08", "出口の証拠がなければ、先へ進まない。", "Agent が先へ進んでもチェックポイントではない。確認できる成果物がチェックポイントだ。", "A帯 / 枠を決めて作る",
            "01", "定義", "目標 / 範囲 / 対象外", "出口 / 受け入れ + 停止", "02", "計画", "スライス / 依存関係 / リスク", "出口 / 順序付きチェックポイント", "03", "構築", "範囲内の差分 / 変更ファイル", "出口 / 元に戻せる変更", "04", "検証", "コマンド / 終了 / 実行時 / 制限", "出口 / 主張に対応する証拠",
            "B帯 / 判断、引き継ぎ、現状維持", "05", "レビュー", "主張マップ / 独立した読み返し / リスク", "出口 / 受け入れ、修正、却下", "06", "引き渡し", "差分 / ログ / 抜け / 引き継ぎ", "出口 / 範囲を区切った記録", "07", "保守", "担当者 / レビュー / 復元", "出口 / 次の確認日を記す", "出口がない？", "止まる", "復旧する", "最後の状態を残す",
            "教材モデル / 各出口には主張の範囲がある / 1枚のスクリーンショットだけではワークフローの実行を証明できない",
        ],
    ),
    "ko": (
        "워크플로는 확인 가능한 종료 지점을 거쳐 나아갑니다",
        "이 일곱 단계 교육 그림은 워크플로를 두 개의 읽기 구간으로 나누고 각 단계의 종료 증거를 보여 줍니다. 종료 지점이 없으면 멈춤과 복구로 가는 분기가 드러납니다.",
        [
            "워크플로 제어 / 07단계 / 08", "종료 증거가 없으면 앞으로 나아가지 마세요.", "Agent가 계속 진행하는 것은 체크포인트가 아닙니다. 확인할 수 있는 산출물이 체크포인트입니다.", "A 구간 / 틀을 잡고 만들기",
            "01", "정의", "목표 / 범위 / 제외할 것", "종료 / 수용 + 중지", "02", "계획", "슬라이스 / 의존성 / 위험", "종료 / 순서가 있는 체크포인트", "03", "구축", "범위가 정해진 diff / 변경 파일", "종료 / 되돌릴 수 있는 변경", "04", "검증", "명령 / 종료 / 실행 시점 / 한계", "종료 / 주장에 맞춘 증거",
            "B 구간 / 판단, 인계, 현재 상태 유지", "05", "검토", "주장 지도 / 독립적인 재검토 / 위험", "종료 / 수용, 수정, 거부", "06", "전달", "diff / 로그 / 빈틈 / 인계", "종료 / 범위가 제한된 기록", "07", "유지보수", "담당자 / 검토 / 복구", "종료 / 다음 점검 날짜를 기록", "종료 지점이 없나요?", "멈추세요", "복구하세요", "마지막 상태를 보존하세요",
            "교육 모델 / 각 종료 지점에는 주장의 범위가 있습니다 / 스크린샷 한 장만으로는 워크플로 실행을 증명할 수 없습니다",
        ],
    ),
    "de": (
        "Ein Workflow geht über prüfbare Ausstiege weiter",
        "Diese Lehrgrafik mit sieben Stufen teilt den Workflow in zwei Lesebänder und benennt den Ausstiegsbeleg jeder Stufe. Fehlt ein Ausstieg, führt eine sichtbare Verzweigung zu Stopp und Wiederherstellung.",
        [
            "WORKFLOW-STEUERUNG / 07 STUFEN / 08", "OHNE AUSSTIEGSBELEG KEIN WEITER.", "Dass der Agent weitergeht, ist kein Checkpoint; ein prüfbares Artefakt ist es.", "BAND A / ABGRENZEN UND MACHEN",
            "01", "DEFINIEREN", "Ziel / Umfang / Nicht-Ziele", "AUSSTIEG / ABNAHME + STOPP", "02", "PLANEN", "Slices / Abhängigkeiten / Risiken", "AUSSTIEG / CHECKPOINT-REIHE", "03", "BAUEN", "begrenzter Diff / Dateien", "AUSSTIEG / UMKEHRBAR", "04", "PRÜFEN", "Befehl / Exit / Laufzeit / Grenzen", "AUSSTIEG / AUSSAGE-BELEG",
            "BAND B / BEURTEILEN, ÜBERGEBEN, STATUS HALTEN", "05", "BEGUTACHTEN", "AUSSAGEN / SELBST PRÜFEN / RISIKEN", "AUSSTIEG / ANNEHMEN / ÄNDERN / ABLEHNEN", "06", "ÜBERGEBEN", "Diff / Logs / Lücken / Übergabe", "AUSSTIEG / BEGRENZTES PROTOKOLL", "07", "PFLEGEN", "Verantwortung / Prüfung / Rückweg", "AUSSTIEG / NÄCHSTE PRÜFUNG", "AUSSTIEG FEHLT?", "STOPP", "BEHEBEN", "STATUS SICHERN",
            "LEHRMODELL / JEDER AUSSTIEG HAT EINEN AUSSAGENUMFANG / EIN EINZELNER SCREENSHOT BEWEIST NICHT, DASS DER WORKFLOW GELAUFEN IST",
        ],
    ),
    "zh-tw": (
        "工作流程透過可檢查的出口逐步前進",
        "這張七階段教學圖把工作流程分成兩條閱讀帶，每個階段都標出出口證據。缺少出口時，路徑會清楚分支到停止與復原。",
        [
            "工作流程控制／07 個階段／08", "沒有出口證據，就不能前進。", "Agent 繼續往下走不等於檢查點；可供檢查的產出才是。", "A 區／框定與製作",
            "01", "定義", "目標／範圍／非目標", "出口／驗收＋停止", "02", "計畫", "切片／相依性／風險", "出口／有序檢查點", "03", "建置", "有界線的差異／變更檔案", "出口／可復原的變更", "04", "驗證", "命令／結束／執行期／限制", "出口／與主張相符的證據",
            "B 區／判斷、交接、維持現狀", "05", "審查", "主張圖／獨立閱讀／風險", "出口／接受、修訂、拒絕", "06", "交付", "差異／紀錄檔／缺口／交接", "出口／有界線的紀錄", "07", "維護", "負責人／審查／復原", "出口／標記下次檢查日期", "缺少出口？", "停止", "復原", "保留最後狀態",
            "教學模型／每個出口都有主張範圍／單張螢幕截圖不能證明工作流程已執行",
        ],
    ),
    "fr": (
        "Un flux de travail avance par des sorties vérifiables",
        "Cette planche en sept étapes divise le flux en deux bandes de lecture et nomme la preuve de sortie de chaque étape. Si une sortie manque, une branche visible mène à l’arrêt et à la reprise.",
        [
            "PILOTAGE DU FLUX / 07 ÉTAPES / 08", "SANS PREUVE DE SORTIE, N’AVANCEZ PAS.", "Le fait que l’Agent continue n’est pas un point de contrôle ; un artefact vérifiable, oui.", "BANDE A / CADRER ET PRODUIRE",
            "01", "DÉFINIR", "objectif / périmètre / exclusions", "SORTIE / ACCEPTATION + ARRÊT", "02", "PLANIFIER", "découpage / dépendances / risques", "SORTIE / CONTRÔLES ORDONNÉS", "03", "CONSTRUIRE", "diff délimité / fichiers", "SORTIE / MODIFICATION RÉVERSIBLE", "04", "VÉRIFIER", "commande / fin / exécution / limites", "SORTIE / PREUVE LIÉE",
            "BANDE B / JUGER, TRANSMETTRE, MAINTENIR L’ÉTAT", "05", "RELIRE", "carte / revue autonome / risques", "SORTIE / ACCEPTER, RÉVISER, REJETER", "06", "LIVRER", "diff / journaux / écarts / transmission", "SORTIE / RELEVÉ DÉLIMITÉ", "07", "MAINTENIR", "responsable / revue / retour", "SORTIE / CONTRÔLE DATÉ", "SORTIE ABSENTE ?", "ARRÊTEZ", "RÉTABLIR", "CONSERVER L’ÉTAT",
            "MODÈLE PÉDAGOGIQUE / CHAQUE SORTIE A UN PÉRIMÈTRE D’AFFIRMATION / UNE SIMPLE CAPTURE D’ÉCRAN NE PROUVE PAS QUE LE FLUX A ÉTÉ EXÉCUTÉ",
        ],
    ),
})


def build() -> int:
    built = 0
    for asset, locale_specs in TRANSLATIONS.items():
        source_path = SOURCE_DIR / asset
        source = source_path.read_text(encoding="utf-8")
        source_nodes = [re.sub(r"\s+", " ", html.unescape(m.group(2))).strip() for m in TEXT_RE.finditer(source)]
        source_viewbox = VIEWBOX_RE.search(source)
        if not source_viewbox:
            raise ValueError("{}: source has no viewBox".format(asset))
        for locale in LOCALES:
            spec_value = locale_specs.get(locale)
            if not spec_value:
                raise ValueError("{}: missing reviewed locale {}".format(asset, locale))
            nodes = spec_value["nodes"]
            if len(nodes) != len(source_nodes):
                raise ValueError("{} / {}: expected {} text nodes, got {}".format(asset, locale, len(source_nodes), len(nodes)))
            for index, (original, translated) in enumerate(zip(source_nodes, nodes), 1):
                if not translated.strip():
                    raise ValueError("{} / {} node {} is empty".format(asset, locale, index))
                if locale != "en" and translated.strip() == original and not (
                    original.isdigit() or original in STABLE or source_label_may_stay(original)
                ):
                    raise ValueError("{} / {} node {} is still English: {!r}".format(asset, locale, index, original))
            localized = replace_nodes(source, nodes)
            localized = replace_one(localized, TITLE_RE, spec_value["title"], "title")
            localized = replace_one(localized, DESC_RE, spec_value["desc"], "description")
            if VIEWBOX_RE.search(localized).group(1) != source_viewbox.group(1):
                raise ValueError("{} / {}: viewBox changed".format(asset, locale))
            destination = OUTPUT_DIR / locale / asset
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(localized, encoding="utf-8", newline="\n")
            built += 1
    return built


if __name__ == "__main__":
    print("LOCALIZED_VISUAL_ASSETS_BUILT variants={}".format(build()))
