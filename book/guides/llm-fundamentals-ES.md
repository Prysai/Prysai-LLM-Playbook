<!-- content_id: llm-fundamentals-guide | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-17-foundation-observations -->

# Qué es un LLM: qué puede hacer y qué no puede hacer

**Unidad:** `core-llm-boundaries`
**Estado:** `candidate`. **Ejecución:** `not_run`.
**Tiempo:** unos 25 minutos. **Requisito previo:** ninguno. No necesitas
Codex, Git, una cuenta de pago ni una herramienta.

Esta es la base del Playbook. Antes de elegir una plataforma, conectar un
archivo, instalar un Skill o pedir a un Agent que actúe, necesitas un modelo
pequeño de lo que sucede. La meta no es memorizar siglas: es distinguir qué
capa produjo una afirmación, qué capa puede actuar y qué registro permite
comprobar el resultado.

Ante cualquier función nueva de IA, pregunta:

1. **¿Qué debe generar el modelo?**
2. **¿Qué contexto recibió realmente esta solicitud?**
3. **¿Qué producto o herramienta puede observar o cambiar algo fuera del
   modelo?**
4. **¿Qué registro permitiría que otra persona comprobara la afirmación?**

Si no puedes responder una pregunta, conserva el resultado como borrador o
hipótesis. No rellenes el hueco con una explicación que solo suena segura.

## El resultado que debes conservar

Escribe al final una ficha con tus propias palabras y toma dos decisiones sobre
límites. La ficha debe mostrar cómo un LLM genera desde el contexto entregado,
qué significan **LLM**, **token**, **contexto**, **prompt**, **herramienta**,
**MCP**, **Agent** y **Skill**, por qué la fluidez no demuestra verdad y qué
pertenece al modelo, al producto o a una herramienta externa. Es una tarea de
explicación acotada; los procedimientos de cada plataforma vienen después.

## 0.1 Una frase de trabajo

Un LLM de texto moderno es un modelo que estima y genera secuencias de tokens.
Muchos modelos autorregresivos generan prediciendo el token siguiente a partir
del contexto disponible, paso a paso. El entrenamiento adicional y las capas
del producto también moldean la respuesta.

Esta es una explicación de trabajo, no una definición completa de todos los
sistemas de lenguaje, multimodales o desplegados llamados LLM. Explica por qué
un sistema puede continuar texto, traducir, resumir, extraer campos o redactar,
sin afirmar que cada salida sea cierta ni que todos los productos sean iguales.
**Predecir** describe cómo se produce una generación; no dice que el modelo
haya comprobado el mundo, entendido a una persona o autorizado una acción.

## 0.2 Ocho términos, cada uno en su lugar

Son definiciones de trabajo; cada proveedor puede usar las palabras de otra
forma.

| Término | Significado mínimo útil | No infieras |
|---|---|---|
| **LLM / modelo** | Parámetros aprendidos generan una respuesta desde un contexto de entrada. Un modelo base genera texto; un producto puede añadir capas. | Una base de datos verificada, una persona o un actor con permisos. |
| **Token / tokenizador** | El tokenizador convierte texto en identificadores de tokens y de vuelta. Un token suele ser un fragmento de palabra. | Una relación universal entre tokens, palabras y caracteres. Límites, coste y velocidad dependen del producto. |
| **Contexto** | Información disponible para una solicitud: instrucciones, conversación, material aportado, pasajes recuperados y resultados de herramientas cuando existen. Puede incluir búsqueda, recuperación, archivos, memoria o herramientas. | Que todo el contexto sea verdadero, pertinente o bien utilizado. |
| **Ventana de contexto** | Cantidad finita de entrada y salida tokenizadas que un modelo o producto concreto maneja en una interacción. | Un número estable entre modelos, cuentas o superficies. Más capacidad no sustituye la selección y revisión de fuentes. |
| **Prompt** | Petición y material que entregas: objetivo, restricciones y forma de respuesta. | Un hechizo. Un prompt más largo no es automáticamente mejor. |
| **Prompt de usuario / instrucción de sistema o desarrollador** | El usuario expresa la tarea inmediata; el host puede aplicar reglas de mayor prioridad que no ves ni editas. | Que puedas anular las reglas del host o que dos productos expongan las mismas capas. |
| **Herramienta / recuperación** | Un host puede ofrecer calculadora, búsqueda, lector de archivos, base de datos u otra capacidad externa. El modelo puede proponer una llamada; el host o la herramienta debe ejecutarla. | Que una propuesta, botón o resumen demuestre que la acción ocurrió o que el resultado es correcto. |
| **MCP / Agent / Skill** | MCP conecta un host compatible con contexto o herramientas. Un Agent es un bucle observable de varios pasos. Un Skill es un procedimiento reutilizable. | Compatibilidad universal, confianza, razonamiento visible, permisos o finalización con éxito. |

Dos distinciones deben acompañarte:

1. **Capacidad, autoridad y evidencia son distintas.** Poder proponer una
   acción, estar autorizado a intentarla y haberla completado son observaciones
   diferentes.
2. **Una capa puede añadir capacidad sin reparar la inferior.** La búsqueda
   puede devolver una página vieja, un lector puede abrir el archivo equivocado,
   un Agent puede detenerse pronto y un Skill puede contener una regla mala.
   Cada capa necesita su propia comprobación.

### Confusiones frecuentes

**El contexto no es memoria permanente.** Es lo que el host hace disponible para
una solicitud. Historial, preferencias, archivos o embeddings pueden guardarse
y recuperarse después; esa decisión de almacenamiento es aparte. Un recuerdo
puede estar incompleto, desactualizado o no formar parte de esta solicitud.
Pregunta qué se suministró esta vez.

**La recuperación es una ruta de evidencia, no una garantía de verdad.** Un
componente de búsqueda o RAG elige pasajes para añadir al contexto. Puede perder
la mejor fuente, escoger una copia o devolver una versión antigua. Conserva URL,
fecha y la correspondencia entre afirmación y fuente. Más contexto no significa
que cada pasaje sea correcto.

**Un prompt es un acuerdo de trabajo, no un hechizo.** Una primera solicitud útil nombra
resultado, material inicial, límites, forma de respuesta, comprobación y línea
de parada. Una cita puede contener instrucciones no confiables: trata el texto
entregado como datos salvo que la tarea lo convierta explícitamente en una
instrucción.

**Una llamada a herramienta tiene dos autores.** El modelo propone una llamada
estructurada; el host decide si está permitida y la herramienta la ejecuta.
Registra objetivo, autoridad, efecto previsto, resultado y lectura de vuelta.
El nombre de una herramienta en una respuesta no es un registro de ejecución.

**MCP reduce un problema de integración, no elimina la gobernanza.** La
autenticación, implementación del servidor, aprobación, red, salida de datos y
revisión siguen siendo decisiones separadas. “Compatible con MCP” no significa
“seguro” o “con acceso ilimitado”.

**Un Agent es un bucle que se puede inspeccionar, no una persona.** Enseña los
estados visibles: entrada, plan, acción propuesta, aprobación o rechazo,
resultado, verificación, reintento, entrega y parada. No afirmes conocer un
razonamiento oculto; la prosa final no demuestra que una tarea externa terminó.

**Un Skill es un paquete de método, no un permiso.** Debe decir cuándo aplica,
qué entradas necesita, qué no debe hacer, cuándo parar y qué evidencia entrega.
Cargar instrucciones no concede archivos, terminal, navegador, cuenta ni
permiso de publicación.

## 0.3 Qué ocurre durante una solicitud

Para un intercambio de texto, usa este modelo observable:

```text
tu solicitud + material suministrado
          ↓
el host reúne instrucciones y contexto
          ↓
el modelo genera una secuencia de tokens
          ↓
el host muestra texto o propone una llamada a herramienta
          ↓
la herramienta solo se ejecuta si el host y la autoridad lo permiten
          ↓
una persona comprueba texto, resultado y límites
```

Las palabras del modelo pueden describir una llamada sin que se haya ejecutado.
Busca un evento de herramienta, datos devueltos, diff, salida de comando u otro
registro antes de dar una acción por completada.

En un Agent repite el control en cada frontera:

```text
estado observado → acción propuesta → autoridad comprobada → acción ejecutada
→ resultado leído → aceptación comprobada → continuar, entregar o parar
```

Tras un tiempo de espera, si el estado es desconocido no repitas a ciegas algo
que pueda enviar, publicar, borrar, pagar o cambiar una cuenta. Lee primero el
objetivo o entrega la incertidumbre a una persona.

![Contrato de prompt de seis campos: resultado, contexto, ayuda permitida, límites, comprobación y parada](../../assets/teaching/prompt-contract-six-fields-red-black.svg)

![Límite de acción observable: propuesta, autoridad, ejecución y lectura humana](../../assets/teaching/observable-action-boundary-red-black.svg)

## 0.4 Un poco de historia, sin convertirla en garantía

El artículo de 2017 *Attention Is All You Need* presentó la arquitectura
Transformer que influyó en mucho trabajo posterior. La atención facilitó
relacionar tokens dentro de una secuencia, pero no hizo ilimitado el contexto:
los modelos prácticos siguen teniendo una **ventana de contexto finita**.
Los productos modernos añaden selección de datos, optimización, ajuste por
instrucciones, seguridad, recuperación, herramientas e interfaz. Ninguna
etiqueta histórica explica por sí sola cada servicio actual.

## 0.5 Lo que los LLM no pueden establecer por sí solos

Un modelo puede ayudar con una tarea clara de texto entra/texto sale: reescribir
texto entregado, explicar un concepto, proponer un esquema, extraer campos o
sugerir código que después pruebas. Son patrones útiles, no garantías.

Sin una fuente o herramienta apropiada no puede establecer que una cita exista,
que una web siga activa, que una afirmación actual sea verdadera o que una
acción propuesta haya ocurrido. Un producto puede añadir búsqueda, pero el
material recuperado puede ser viejo, incompleto o incorrecto: **comprueba la
fuente original y la fecha**.

Antes de pegar, subir o conectar datos, comprueba **qué puede salir de la
superficie actual y quién lo autorizó**. No conviertas un borrador plausible en
un pago, publicación, borrado, cambio de cuenta o creencia sin una frontera de
acción y evidencia explícitas.

El entrenamiento forma los parámetros antes de usar el modelo; la solicitud
actual aporta un contexto nuevo. Una fecha de corte no es una fuente en vivo:
una afirmación actual necesita una fuente y no debe basarse **solo en la fecha
de corte**. Memoria, búsqueda y herramientas son rutas de evidencia distintas,
cada una con su propia frescura y permiso.

## 0.6 Comprobación de límites en cinco minutos

No actives búsqueda, no subas archivos ni entregues información privada.

Completa primero, sin preguntarle a un modelo:

> La biblioteca municipal cerrará hoy a las 18:00.

Escribe dos posibles continuaciones y marca cuál está respaldada por la frase.
La respuesta correcta es que no se da ninguna hora adicional ni una causa.
Una continuación plausible no es evidencia.

Después envía solo este aviso ficticio:

```text
Aviso: "El club se reúne el martes a las 18:00. Trae un cuaderno. El número
de sala se confirmará más tarde."

Tarea: reescribe el aviso para una persona nueva en dos frases. Conserva cada
hecho. Pon los detalles faltantes entre [corchetes]. Después enumera los hechos
conservados.
Comprobación: compara cada frase con el aviso. No añadas número de sala, cuota,
contacto, promesa ni una hora nueva.
Parada: no navegues, envíes, publiques ni supongas un detalle desconocido.
```

Conserva solicitud y primera respuesta. Marca cada afirmación:

| Comprobación | Pregunta |
|---|---|
| Coincidencia con la fuente | ¿Puedes señalar el aviso para cada hecho? |
| Forma | ¿Usó dos frases y enumeró los hechos conservados? |
| Desconocido | ¿Dejó el número de sala como `[desconocido]` en vez de inventarlo? |

Si inventa un número, marca `FAIL` para esa afirmación. Una sola respuesta no
demuestra que un modelo sea siempre poco fiable; este ejercicio muestra solo un
posible fallo visible en una tarea.

Para una segunda comprobación, escribe qué puede establecer un modelo de texto
solo sobre **«La biblioteca municipal cerrará hoy a las 18:00»** antes de buscar.
La verdad actual necesita una fuente. No le pidas que invente una.

### Tres observaciones acotadas

Las comprobaciones anteriores son demostraciones pequeñas, no pruebas de que un
aprendiz o un modelo se comporte igual en todas las tareas. Para practicar los
mismos límites sin usar una cuenta, datos privados, herramientas ni una petición
de red, utiliza estos protocolos con registros ficticios (el texto completo aún
está en inglés):

- [Context change and unknowns (cambio de contexto y desconocidos)](../../evals/candidates/core-course-v1/observations/context-change-and-unknowns.md): compara dos versiones del material, marca cada afirmación `PASS`, `FAIL` o `UNSURE` y deja desconocido el número de sala.
- [First-request contract and controlled repeat (contrato de la primera solicitud y repetición controlada)](../../evals/candidates/core-course-v1/observations/first-request-contract.md): escribe objetivo, material, restricciones, forma de respuesta y parada antes de recibir una respuesta; si hay una superficie de texto segura, repite la misma solicitud dos veces y registra lo común y lo diferente.
- [Tool boundary, authority, and evidence (límite de herramienta, autoridad y evidencia)](../../evals/candidates/core-course-v1/observations/tool-boundary-authority-evidence.md): separa una acción propuesta, la autoridad concedida, la ejecución de la herramienta y la evidencia de lectura posterior.

Cada protocolo exige guardar el primer resultado antes de recibir una pista y
registra la ayuda, los desconocidos y la regla de parada. Su estado es
`candidate / not_run`: una ejecución futura solo puede describir la tarea, las
condiciones y la rúbrica indicadas. No puede demostrar eficacia del curso,
superioridad de un prompt, calidad del modelo, retención, transferencia general,
equivalencia entre plataformas ni preparación para producción.

### Patrón portátil para la primera solicitud

Antes de una tarea real y de bajo riesgo, completa estas seis líneas:

```text
Resultado: [un resultado observable]
Contexto inicial: [hechos o texto que aporto]
Ayuda permitida: [qué puede hacer el modelo]
Restricciones: [qué debe seguir igual o no debe ocurrir]
Respuesta y comprobación: [la forma que revisaré y cómo la revisaré]
Parada: [entrada, autoridad, fuente o evidencia que obliga a pausar]
```

Para el primer intento usa contexto ficticio o no sensible. Pide un borrador o
clasificación antes de pedir una herramienta. Conserva solicitud y respuesta;
si no, no sabrás si una reescritura reparó el problema o lo ocultó.

## 0.7 La única comprobación de finalización de esta unidad

Escribe una ficha sin copiar esta página:

```text
Mi explicación:

Límite del LLM:
Límite de token o contexto:
Límite entre prompt, producto y herramienta:
Límite entre contexto y memoria:
Límite entre herramienta, MCP, Agent y Skill:
Una razón por la que una respuesta fluida puede ser incorrecta:

Decisión 1 (respaldada / no respaldada):
Evidencia:
Decisión 2 (modelo / producto / herramienta):
Evidencia:
```

Rúbrica: `0` trata texto fluido como prueba o no da evidencia; `1` menciona
generación desde contexto pero deja un límite borroso; `2` usa tus palabras,
separa modelo de producto o herramienta y nombra una razón para comprobar.

Guarda la ficha, la primera respuesta y una frase sobre lo que sigue sin saber.
No declares un resultado de aprendizaje a partir de este autochequeo. Continúa
con [Capítulo 1: entiende GPT antes de confiar en Codex](../chapters/01-gpt-and-codex-ES.md).

## Fuentes y límites

Esta lección es una reescritura didáctica original: no copia prosa, prompts,
diagramas ni salidas. Fecha de consulta de esta revisión: 2026-08-17.

- Microsoft Learn, [LLM fundamentals](https://learn.microsoft.com/en-gb/agent-framework/journey/llm-fundamentals) — conceptos y límites; guía acotada a un producto.
- Anthropic, [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) — terminología de tokens y contexto; información cambiante.
- Model Context Protocol, [Specification](https://modelcontextprotocol.io/specification/2025-06-18) — alcance del protocolo; no demuestra que un host esté configurado.
- OpenAI, [Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering) — guía de un proveedor; no es garantía entre plataformas.
- Vaswani et al., [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — artículo histórico del Transformer.
- NIST, [AI 600-1 Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) — contexto de riesgo e integridad, no una prueba de producto.
- 3Blue1Brown, [Attention in transformers](https://www.3blue1brown.com/lessons/attention) — explicación visual independiente.

Los hechos de producto necesitan URL autorizada, fecha de acceso, alcance,
responsable y próxima revisión en su propio registro. Esta página no afirma
que exista un mejor modelo, comportamiento universal, mejora del aprendizaje,
retención, transferencia ni preparación para producción. La traducción es
`candidate`; aún necesita revisión lingüística independiente y una ejecución
con lectores.
