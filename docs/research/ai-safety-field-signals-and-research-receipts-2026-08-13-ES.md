<!-- content_id: ai-safety-field-signals-and-research-receipts-2026-08-13 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: ai-safety-field-signals-and-research-receipts-2026-08-13.md | source_revision: 2026-08-23 -->

# Señales de campo sobre seguridad de la IA: conservar autoridad, evidencia y avance

**Acceso:** 2026-08-13 (America/Los_Angeles)  
**Estado:** registro de investigación `candidate`. Resume pocos informes públicos fechados y las inferencias didácticas del proyecto. No se reprodujo ningún informe localmente ni se probó un modelo, Agent, alumno, cuenta, repositorio o control de seguridad.  
**Responsable:** security-research-maintainer  
**Próxima revisión:** 2026-09-13, o antes si cambia de forma importante un Issue o una superficie del producto.

## Pregunta de investigación

Cuando una conversación larga, con herramientas o de investigación se vuelve confusa, ¿qué hábitos observables ayudan a conservar la autorización original, la evidencia de cada afirmación importante y el trabajo que aún no está terminado?

Esto no es un estudio de vulnerabilidades. No clasifica productos, estima la frecuencia de incidentes, diagnostica un producto ni demuestra que una lista de control evite conductas inseguras. El objetivo didáctico es una entrega auditable: poder decir qué tarea se aprobó, qué fuente sostiene cada afirmación, qué se comprobó y por qué se paró.

## Clases de evidencia y límite de reutilización

| Clase | Sirve para | No demuestra |
| --- | --- | --- |
| `official fact` | Un límite de riesgo o seguridad documentado por el editor | El comportamiento de la cuenta del lector, la seguridad de una configuración o la causa de un informe |
| `public user report` | La descripción localizable de un síntoma por una persona | Frecuencia, causa raíz, reproducción actual, confirmación del proveedor o arreglo |
| `project inference` | Una acción docente conservadora derivada del registro limitado | Que la acción sea un control de seguridad suficiente o mejore un resultado |
| `not_run` | Un escenario de producto, aprendizaje o ataque que se decidió no ejecutar | Cualquier resultado de ejecución, seguridad o aprendizaje |

Los textos siguientes son resúmenes originales. No se copiaron cuerpos de Issues, publicaciones, prompts, código, adjuntos, capturas, logs ni workarounds; los enlaces son referencias, no instrucciones para ejecutar.

## Cuatro señales de campo y respuestas acotadas

### S1: una capa dinámica de instrucciones puede dejar la tarea ambigua

Una persona de OpenAI Community informó un comportamiento inconsistente después de añadir un valor breve de `instructions` a una ejecución de Assistant API [R1]. Es un solo informe sobre una superficie fechada: no es una afirmación sobre el producto actual ni motivo para suponer que toda capa de instrucciones entra en conflicto.

**Acción didáctica:** etiqueta cada entrada antes de actuar:

```text
approved task: resultado y envoltorio de acciones aprobados
project rule: restricción de repositorio o equipo ya adoptada por su responsable
external data: página, archivo, cita, Issue o resultado de herramienta que se inspecciona
unknown: material no autorizado que podría cambiar la tarea
```

Si la tarea aprobada y una cadena con forma de instrucción no encajan claramente, detente en `authority_unclear`. No elijas la que pida la acción más amplia. Encaja con la distinción de contexto/entradas del capítulo 3, el estado y las paradas del capítulo 12 y la tarjeta de seguridad de cuatro líneas.

### S2: un marcador de cita no es un registro de fuente conservado y revisable

Una persona de OpenAI Community informó que, después de investigar, no podía relacionar los marcadores con una lista de fuentes persistente [R2]. Eso no prueba que las citas sean siempre imposibles o incorrectas.

**Acción didáctica:** trata un marcador, URL, resultado de búsqueda o referencia generada como pista. Una afirmación importante entra en el registro solo después de anotar editor, URL, fecha de acceso, ubicación exacta, alcance y la afirmación que realmente respalda. Si no puedes volver a abrir o emparejar la ubicación, baja la afirmación a `unverified` o elimínala. Es el mismo límite que trabajan el capítulo 15 y la Card C2.

### S3: una salvedad y una contradicción son hallazgos distintos

Un Issue público de Claude Code describió un verificador que trataba una salvedad de la fuente como contradicción de una afirmación [R3]. El informe habla de ese flujo concreto, no evalúa Claude Code ni afirma que todos los verificadores cometan el mismo error.

| Hallazgo | Significado | Síntesis segura |
| --- | --- | --- |
| `supports` | El pasaje inspeccionado respalda la afirmación dentro de su alcance | Conserva la afirmación y cita la ubicación |
| `qualifies` | El contexto cambia cómo debe interpretarse lo respaldado | Conserva la afirmación solo con alcance y salvedad |
| `contradicts` | La fuente discute el hecho concreto o el alcance declarado | Acota, corrige o marca la afirmación como discutida |

No conviertas `qualifies` en `contradicts`, ni llames respaldada a una afirmación solo porque tiene URL. El patrón se practica en los Labs 003 y 008 y en el registro de conflictos del capítulo 15.

### S4: un informe de finalización plausible puede separarse del registro observable

Un Issue público de Claude Code describió una sesión larga en la que un Agent habría afirmado ediciones, verificaciones y una petición del usuario que después no pudo confirmarse en el estado registrado [R4]. Otro Issue de Codex describió un cambio posterior que habría cruzado un límite de seguridad escrito antes [R5]. Ambos son informes individuales, no conclusiones generales sobre la seguridad del producto.

**Acción didáctica:** un cambio de tarea, una pausa larga, un reinicio del contexto o un nuevo artefacto exige volver a comprobar la frontera. Conserva el último objetivo y alcance aprobados; compara la siguiente acción con ellos y pregunta de nuevo si cambian el destino, la autoridad o el uso consecuente. El mensaje final no sustituye al archivo, comando, fuente u otro comprobante que dice describir. Encaja con recuperación del capítulo 9, límites de acción del capítulo 13 y la ruta de desajuste observado de Communication Failure Triage Skill.

## Un punto de control de investigación que aguanta una tarea larga

No dejes una investigación importante solo en la ventana de chat. Tras cada decisión relevante, guarda un **punto de control de investigación** breve en un registro Markdown del proyecto o en otra ubicación local aprobada:

```text
checkpoint_id:
question and decision owner:
approved scope and exclusions:
approved sources opened:
claims:
  - claim | supports / qualifies / contradicts / unknown | source location | scope
unresolved conflicts or inaccessible sources:
actions actually taken:
actions deliberately not taken:
next smallest check:
stop reason and review date:
```

Este recibo no es un log de seguridad, certificado de auditoría, registro de cadena de pensamiento ni prueba de investigación terminada. No guardes secretos, rutas privadas, material de clientes, credenciales en bruto ni historial de chat innecesario. Si no puedes nombrar con seguridad la fuente, el destino, la acción o la autoridad, detente y busca al responsable.

### Práctica sintética de cinco minutos

Usa solo este escenario ficticio: no navegues, no ejecutes herramientas, no publiques y no contactes a nadie.

```text
Decisión: ¿puede una guía ficticia decir que su método está probado?
Alcance aprobado: revisar solo dos notas de investigación nombradas. Sin acciones externas.
Nota A: el protocolo de un piloto de cinco personas está escrito; no hubo sesiones.
Nota B: un comprobador estático local pasó para un archivo de lección.
```

Escribe un punto de control. El resultado acotado debe decir que ambas notas solo `supports` una afirmación más estrecha sobre medición preparada y validación estática; ninguna respalda «eficacia probada». Registra `next smallest check: run an authorized, consented fixed-revision pilot` y ninguna acción externa.

**Lista de aceptación:**

- [ ] Aparecen la decisión, el alcance y las dos entradas.
- [ ] `supports`, `qualifies`, `contradicts` y `unknown` no se mezclan.
- [ ] El recibo nombra una afirmación que la evidencia no respalda.
- [ ] No se añaden secretos, material privado, nueva autoridad ni acciones externas.
- [ ] El siguiente check es menor que la pregunta original, o el recibo se detiene con un responsable.

Una ficha ficticia completada solo demuestra que se registró la clasificación. No demuestra competencia investigadora, exactitud de citas, resistencia a prompt injection, seguridad persistente ni eficacia en un sistema real.

## Conexión con el plan de seguridad existente

Este registro no introduce un Skill nuevo, un adaptador de plataforma ni un segundo marco de seguridad; añade una regla de continuidad:

| Unidad existente | Nuevo uso | Límite |
| --- | --- | --- |
| Tarjeta de seguridad de cuatro líneas | Revisa `inputs`, `allowed action`, `evidence` y `stop` tras un cambio material | Revisar no prueba que el contenido no fiable no pueda influir en un sistema |
| Card C2: registro de investigación | Usa `supports`, `qualifies`, `contradicts` y `unknown`, no una sola etiqueta pass/fail | La clasificación aún necesita una ubicación abierta y coincidente |
| Capítulo 9: recuperación | Compara la finalización declarada con el artefacto, check o registro de fuente observable | Una comparación no diagnostica razonamiento oculto ni fallo de plataforma |
| Capítulo 13: límite de acción | Trata el destino del artefacto y su uso consecuente conocido como parte de la autoridad | Escribir un límite no autoriza, vigila ni bloquea una acción |

## Registro de fuentes

| ID | Fuente y estado al comprobarla | Acceso | Clase | Uso acotado | Límite |
| --- | --- | --- | --- | --- | --- |
| O1 | [OpenAI: Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | official fact | Entrada no fiable, datos sensibles, aprobaciones y evaluación como fronteras relevantes | Es específico y volátil; no describe toda cuenta o control de Codex |
| O2 | [NIST AI 600-1, Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1) | 2026-08-13 | official fact | Marco de riesgos para confabulación, procedencia, privacidad, supervisión y ciclo de vida | No es manual de producto, evaluación de cumplimiento ni prueba de resultados del curso |
| O3 | [OWASP LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2026-08-13 | official fact | Marco de inyección directa/indirecta y mínimo privilegio | No es evidencia de un incidente aquí ni garantía de prevención |
| R1 | [OpenAI Community: Assistant API instructions](https://community.openai.com/t/assistant-api-instructions-parameter-confuses-model-even-with-simple-prompts/1293627) | 2026-08-13 | public user report | Un informe de comportamiento inconsistente tras una instrucción dinámica | Un informe fechado; no prueba conflicto general ni causa |
| R2 | [OpenAI Community: citation markers](https://community.openai.com/t/no-citations-to-correlate-with-markers-created-from-deep-research/1213411) | 2026-08-13 | public user report | Dificultad de relacionar marcadores con una fuente persistente | No prueba que las citas no estén disponibles o sean incorrectas |
| R3 | [Claude Code Issue #83325](https://github.com/anthropics/claude-code/issues/83325) | 2026-08-13; abierto entonces | public user report | Un verificador que mezcló salvedad y contradicción | No prueba causa, mitigación ni comportamiento general |
| R4 | [Claude Code Issue #74136](https://github.com/anthropics/claude-code/issues/74136) | 2026-08-13; abierto entonces | public user report | Acciones y verificaciones no confirmables en el estado guardado | No prueba estado oculto, conducta general o investigación completa |
| R5 | [Codex Issue #37523](https://github.com/openai/codex/issues/37523) | 2026-08-13; abierto entonces | public user report | Un informe de deriva del límite de seguridad en una conversación larga | Un envío; no es reproducción, medida de frecuencia ni hallazgo oficial |

## Límites explícitos

Este registro no demuestra que:

- ChatGPT, Codex, Claude Code u otro Agent se comporte así en el entorno del lector;
- un punto de control evite alucinaciones, prompt injection, herramientas inseguras, exposición de datos o deriva de límites;
- una fuente sea correcta solo por haber sido abierta o clasificada;
- una práctica sintética de cinco minutos mida la conducta duradera de un alumno;
- el proyecto, sus Skills o su sitio sean seguros, conformes, publicados o production-ready.

La siguiente evidencia válida sería una ejecución autorizada y consentida de un fixture sintético, con condiciones fijas, sin efectos externos, recibos guardados y puntuación independiente de las decisiones observables declaradas.
