<!-- content_id: llm-fundamentals-guide | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 0: ¿Qué es un modelo de lenguaje grande?

**Tiempo de lectura:** unos 20 minutos. Empieza con un modelo mental de una frase y después prueba sus límites con un ejercicio de chat de cinco minutos.

Esta es la primera lección del Playbook. Si no tienes claro qué es en realidad
un «modelo de lenguaje grande» (LLM), más allá de la publicidad, empieza aquí.
Construiremos un modelo mental, capa por capa, como un profesor presentaría
una materia nueva: primero la esencia, después la maquinaria y, por último,
los límites honestos. Todo lo que contiene esta lección es una versión en
lenguaje llano de las fuentes públicas que aparecen al final; no es una copia
de ningún documento concreto.

## 0.1 Una frase, luego una imagen

**Un LLM es una máquina que predice el siguiente fragmento de texto,
entrenada con una cantidad enorme de escritos humanos y ajustada después para
seguir instrucciones.**

La imagen que lo hace concreto: imagina el autocompletado de tu teléfono, pero
entrenado con una biblioteca de millones de libros, artículos, repositorios de
código y conversaciones, y ampliado de forma descomunal. El autocompletado
sugiere una palabra; un LLM puede continuar un párrafo, responder una
pregunta, traducir, esbozar, depurar código o mantener una conversación —
porque todas esas tareas pueden reformularse como «dado el texto hasta ahora,
¿qué viene después?».

Esa única idea explica más de lo que cabría esperar:

- por qué un LLM puede escribir con fluidez sobre casi cualquier tema (ha
  visto cantidades enormes de texto);
- por qué a veces inventa hechos (un modelo base predice texto plausible; no
  busca hechos por sí solo);
- por qué un producto de chat puede hacer más que el modelo base (puede añadir
  búsqueda, archivos, memoria, recuperación o herramientas, cada una con sus
  propios límites de datos y permisos);
- por qué cambia cuando se actualizan los modelos (cambia el texto de
  entrenamiento).

La explicación moderna más intuitiva de la maquinaria es la serie animada de
Grant Sanderson (3Blue1Brown) sobre GPT y la atención; está enlazada en las
fuentes. Si solo vas a ver una cosa, mira esa.

## 0.2 De dónde vienen los LLM: un atajo de treinta años

Un modelo de lenguaje no es una idea nueva. El linaje:

- **Décadas de 1950 a 1980 — reglas y estadística.** Los primeros sistemas
  usaban reglas gramaticales escritas a mano o estadísticas simples de
  frecuencia de palabras («si la palabra `bank` sigue a `river`,
  probablemente significa la orilla del río»).
- **1990–2010 — modelos estadísticos de lenguaje.** Los investigadores
  construyeron modelos que asignan una probabilidad a la siguiente palabra
  dadas las pocas anteriores. Estos impulsaron los primeros teclados de
  teléfono y la traducción automática. Su debilidad: solo podían ver una
  ventana corta de contexto.
- **2017 — el Transformer.** Un artículo de investigación titulado *Attention
  Is All You Need* introdujo una arquitectura en la que los tokens pueden
  atender a otros tokens del contexto disponible. Facilitó modelar y escalar
  relaciones lejanas, pero no eliminó los límites de contexto: los modelos
  prácticos siguen teniendo una ventana de contexto finita.
- **2018–2022 — escala y el truco del «siguiente token».** Las empresas
  entrenaron modelos Transformer con corpus enormes y un único objetivo:
  predecir el siguiente token (un token es, a grandes rasgos, un fragmento de
  palabra). Con suficientes datos y cómputo, los modelos empezaron a responder
  preguntas, escribir código y seguir instrucciones sin estar programados
  explícitamente para cada tarea.
- **2022–hoy — ajuste por instrucciones y alineación.** Los modelos crudos de
  predicción de tokens son buenos continuando texto, pero no siguiendo
  peticiones. Los proveedores entrenan entonces a los modelos para seguir
  instrucciones (ajuste por instrucciones) y para preferir respuestas útiles e
  inofensivas (alineación, a menudo mediante retroalimentación humana o de
  IA). Esta es la diferencia entre «un modelo que puede completar una frase» y
  «un chatbot que hace lo que le pides».

El corazón técnico — la atención — se explica visualmente en la lección
*Transformer attention* de 3Blue1Brown y en texto llano en la documentación
oficial de modelos de OpenAI, Anthropic y Google. No necesitamos las
matemáticas para usar bien los LLM, pero saber que el núcleo es «predecir el
siguiente token y luego alinear el comportamiento» explica casi todo lo que
sigue.

## 0.3 Cómo se construye un LLM moderno: entrenar, alinear, servir

Piensa en tres etapas:

1. **Preentrenamiento.** El modelo lee un corpus enorme y aprende a predecir
   el siguiente token. Aquí es donde se almacena la mayor parte del
   «conocimiento» (como patrones estadísticos). También es donde se fijan los
   puntos ciegos del modelo: si el corpus termina en 2025, el modelo no sabe
   nada de los acontecimientos de 2026.
2. **Alineación / ajuste por instrucciones.** El modelo se entrena además para
   seguir peticiones, rechazar las dañinas y ajustarse a las preferencias
   humanas. Por eso dos modelos con un preentrenamiento similar pueden
   sentirse muy distintos en una conversación.
3. **Servicio y capas de seguridad.** Cuando escribes en una ventana de chat,
   tu texto se tokeniza, pasa por el modelo y el proveedor puede añadir
   filtros, indicaciones de sistema, recuperación o acceso a herramientas a su
   alrededor. Lo que experimentas es el modelo más esas capas.

Tres consecuencias prácticas:

- **Una versión concreta del modelo tiene una fecha de corte de entrenamiento.**
  El producto puede actualizarla después o añadir recuperación, búsqueda,
  archivos, memoria o herramientas. Para una respuesta sensible al tiempo,
  comprueba la documentación actual, la fuente usada y la fecha; no te bases
  solo en la fecha de corte.
- **Cada petición cuesta tokens.** Cuentan tanto la entrada que proporcionas
  como la salida generada. El contexto largo es útil, pero no gratis.
- **El mismo modelo puede comportarse de forma distinta** según las
  indicaciones de sistema, la configuración (temperatura) y las herramientas
  que lo rodean. Un cambio de comportamiento no es automáticamente un cambio
  de modelo.

## 0.4 Cuatro conceptos que verás en todas partes

**Token.** La unidad que el modelo lee y escribe. Un token suele ser un
fragmento de palabra, no una palabra completa: «ChatGPT» puede ser dos o tres
tokens. Los precios, los límites de contexto y la velocidad se miden en
tokens. A grandes rasgos, 100 tokens ≈ 75 palabras en inglés.

**Ventana de contexto.** La cantidad máxima de texto que el modelo puede
considerar a la vez — tus instrucciones más cualquier conversación o documento
que pegues. Es una medida de memoria de trabajo, no de inteligencia. Una
ventana más grande te permite pegar documentos más largos, pero el modelo
sigue tratando toda la ventana como «cosas a las que prestar atención», no
como hechos verificados.

**Temperatura (y muestreo).** Un ajuste que controla lo aleatoria que es la
salida. Temperatura baja → salida más predecible y repetitiva; temperatura
alta → más variada, a veces más creativa. Para datos y código, prefiere baja;
para lluvia de ideas, una más alta puede ayudar.

**Parámetros y escala.** «Miles de millones de parámetros» describe el tamaño
del modelo. El tamaño se correlaciona con la capacidad, pero no garantiza
calidad en tu tarea; un modelo más pequeño puede ganar a uno más grande en un
trabajo estrecho y bien definido. Juzga los modelos por los resultados en tus
propias tareas, no por el número de parámetros.

## 0.5 En qué son realmente buenos los LLM

Según cómo se usan y describen estos sistemas en la documentación oficial y en
el material didáctico, los puntos fuertes fiables son:

- **Reescribir y resumir** texto que tú proporcionas, con un tono, una
  extensión o un público especificados;
- **Explicar y dar clases particulares**: descomponer un concepto en pasos,
  dar ejemplos, responder preguntas de seguimiento con otras palabras;
- **Redactar borradores**: esquemas, correos, planes, esqueletos de código y
  primeras versiones que luego editas;
- **Traducir y practicar idiomas** entre lenguas principales con un nivel de
  calidad útil;
- **Estructurar información**: convertir notas en tablas, listas o resúmenes;
  extraer campos de un texto;
- **Generar código y depurarlo contigo**: escribir funciones pequeñas,
  explicar errores y revisar fragmentos — siempre contra tus pruebas;
- **Planificar y comparar**: enumerar opciones y criterios, siempre que tú
  aportes los datos y tomes la decisión.

El hilo común: los LLM son más fuertes cuando la tarea es **texto entra, texto
sale, con un objetivo claro que puedes comprobar**. Son más débiles cuando la
tarea depende en secreto de hechos, de precisión matemática o de acciones en
el mundo real.

## 0.6 Lo que los LLM no pueden hacer (la lista honesta)

Toda fuente seria — desde los fundamentos de LLM de Microsoft hasta el
glosario de Anthropic y el material didáctico independiente — coincide en los
mismos límites. Un modelo:

- **no busca hechos por sí solo.** Un modelo base genera texto *coherente con*
  sus datos de entrenamiento. Un producto puede añadir búsqueda, recuperación,
  archivos, memoria o herramientas; son superficies distintas, con límites de
  datos y permisos propios. El material devuelto aún puede estar desactualizado,
  incompleto o equivocado: comprueba la fuente original y la fecha.
- **no conoce automáticamente el presente ni tus datos privados.** Tiene una
  fecha de corte y solo recibe lo que le proporcionen tú, un producto conectado,
  la memoria de la cuenta, un sistema de recuperación, un archivo o una
  herramienta. Antes de pegar, subir o activar una conexión, comprueba qué puede
  salir de la superficie actual y quién lo autorizó.
- **no puede hacer aritmética de forma fiable.** Los modelos grandes resuelven
  problemas con palabras por patrones, no por cálculo; las matemáticas largas
  o delicadas necesitan una calculadora, código o una herramienta.
- **no puede verificar.** Un modelo no puede decirte si una cita es real, si
  un sitio web existe o si una afirmación es cierta. Solo tú (o una
  herramienta que actúe por ti) puedes comprobarlo.
- **no puede actuar solo sobre el mundo.** Un modelo de chat no tiene
  archivos, cuentas ni permisos a menos que una capa de herramientas se los
  proporcione explícitamente. Un inicio de sesión, un botón o un resumen de un
  agente no demuestran que una acción haya ocurrido.
- **no tiene memoria inherente de ti.** Un producto puede conservar el historial
  del chat o memoria de cuenta; su privacidad, conservación y borrado dependen
  del producto y de su configuración. No supongas que un chat es privado o que
  se recordará: lee la política aplicable.
- **no es, por sí solo, un buscador, una calculadora, una base de datos ni una
  persona.** Un producto puede conectar esas capacidades, pero esa conexión no
  vuelve cada respuesta actual, correcta, autorizada ni privada.

Un modelo mental útil: **un LLM base es un becario brillante y muy leído que
puede redactar, pero tiende a rellenar huecos con confianza. Un producto de
chat puede además darle resultados de búsqueda, archivos, calculadora, memoria
o herramientas.** Tú sigues decidiendo qué puede leer o enviar, comprobando la
fuente y el resultado, y no publicarías un dictamen legal sin revisarlo. Así
es como hay que usar un LLM.

## 0.7 Cómo cambia esto la forma de usarlo

El método del Playbook se deduce directamente de las secciones 0.5 y 0.6:

1. **Define la tarea en texto** — qué resultado, con qué entrada y con qué
   restricciones (el capítulo 3 enseña el contrato completo).
2. **Aporta el contexto** — pega el material, nombra el público, indica los
   límites. El modelo trabaja con lo que le des.
3. **Pide una forma comprobable** — una tabla, un diff, una lista, un párrafo
   reescrito; algo que puedas inspeccionar.
4. **Verifica tú mismo** — contrasta los datos con las fuentes, ejecuta las
   pruebas sobre el código, lee el diff antes de aceptarlo.
5. **Mantén la frontera** — no dejes que una respuesta plausible se convierta
   en una acción, un pago, una publicación o una creencia sin pruebas.

### Comprobación de límites en cinco minutos

Antes de continuar, usa cualquier chat de texto con esta afirmación ficticia.
No actives búsqueda, no subas un archivo ni aportes información privada.

```text
Recibí esta afirmación: «La biblioteca municipal cerrará hoy a las 18:00».
Antes de que respondas, señalaré qué puede y qué no puede establecer un modelo solo de texto.

Pídeme primero mis etiquetas. Después señala solo un límite que omití: generación,
hechos actuales, comprobación de fuentes o una acción en el mundo real.
No busques información ni inventes una fuente.
```

Guarda tus primeras etiquetas y la única corrección. El objetivo no es aprender
un prompt mágico ni demostrar que el modelo es exacto; es observar la diferencia
entre producir una frase plausible y comprobar una afirmación actual.

Después continúa con el
[Capítulo 1: Entiende GPT antes de confiar en Codex](../chapters/01-gpt-and-codex-ES.md).

## 0.8 Fuentes y alcance

Esta lección es una versión original en lenguaje llano. Las fuentes públicas
subyacentes (consultadas el 2026-08-16) son:

- **Microsoft Learn — LLM Fundamentals** (ruta de aprendizaje del marco de
  agentes):
  https://learn.microsoft.com/en-gb/agent-framework/journey/llm-fundamentals —
  describe qué son los LLM, los tokens, el contexto y con qué tienen
  dificultades los LLM.
- **3Blue1Brown — How large language models work** (serie animada):
  https://www.3blue1brown.com/lessons/attention — la explicación visual más
  clara de la predicción de tokens y la atención.
- **Claude Platform Docs — Glosario**:
  https://platform.claude.com/docs/en/about-claude/glossary — definiciones
  oficiales de modelo, ventana de contexto, token y términos relacionados.
- **Educative — Limitaciones de los modelos de lenguaje grandes**:
  https://www.educative.io/blog/limitations-of-llms — un resumen legible de la
  alucinación, la desactualización y los límites matemáticos.
- **Attention Is All You Need** (Vaswani et al., 2017): el artículo original
  del Transformer, enlazado para la sección de historia.

Las fechas de acceso, las versiones de los modelos y los datos de producto
cambian; trata cualquier contenido específico de producto de esta lección como
`stale after 2026-11-09` hasta que se actualice contra las fuentes oficiales.
La lección no afirma que ningún modelo, proveedor o resultado de referencia
sea el mejor, el más rápido o el más seguro. Es una lección candidata: se han
revisado las fuentes y la estructura, pero todavía no se han medido resultados
de aprendizaje.
