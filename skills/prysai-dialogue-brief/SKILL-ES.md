<!-- content_id: prysai-dialogue-brief | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: dea08a5 | source_license: project-owned CC-BY-4.0 -->

# Brief de diálogo

Convierte una petición nueva y de bajo riesgo en un primer mensaje breve, listo para copiar y enviar. Este Skill trabaja en el punto anterior a una respuesta sustantiva, una acción con herramientas, una búsqueda o un ciclo de aprendizaje. No ejecuta la petición ni evalúa la respuesta.

## Comprueba primero si corresponde usarlo

Úsalo solo cuando se cumplan todas estas condiciones:

- la persona aún no ha enviado la petición y no hay una respuesta fallida que reparar;
- se busca una primera conversación de texto y bajo riesgo;
- no hacen falta archivos, herramientas, cuentas, navegación, registros privados, publicación ni acciones externas;
- la persona quiere expresar una petición acotada, no practicar una habilidad ni investigar un hecho.

Si el aprendizaje requiere una línea base, comentarios, corrección o transferencia, deriva a `prysai-learning-coach`. Si la petición trata sobre Codex, herramientas, Skills o Agents, deriva a `prysai-codex-coach`. Si incluye archivos, permisos, cuentas, herramientas o una entrega real, deriva a `prysai-task-protocol`. Para hechos actuales, fuentes o conclusiones documentadas, deriva a `prysai-source-investigator` o `prysai-research-router`. Si ya existen la petición y una respuesta insatisfactoria, usa `prysai-communication-failure-triage`; para comprobar si una afirmación está respaldada, usa `prysai-evidence-review`.

No pidas secretos, datos personales sensibles, registros no publicados, credenciales, estado de una cuenta ni prompts privados. Preparar un brief no autoriza ninguna acción posterior.

## Recoge solo lo necesario para el primer turno

Conserva las palabras de la persona siempre que sea posible y reúne estos campos:

```text
outcome: un resultado observable que debe producir la primera respuesta
audience: quién usará o leerá el resultado
supplied_inputs: texto o hechos seguros disponibles en este turno
constraints: hechos, límites, tono, exclusiones o reglas de ayuda que deben conservarse
output_shape: forma y extensión solicitadas
acceptance_check: qué comprobará la persona antes de aceptar el resultado
stop_boundary: qué no debe ocurrir o qué dato ausente obliga a parar
```

Si falta un campo y su ausencia cambiaría materialmente el resultado, devuelve el recibo `needs_clarification` que aparece abajo con una sola pregunta clara. No redactes un brief parcial, no inventes audiencia ni detalles, y no hagas varias preguntas solo para que parezca más completo. Si después de esa aclaración no puede definirse un resultado observable, devuelve `blocked: outcome_not_observable` y señala la decisión mínima que falta.

## Redacta el brief del primer turno

Devuelve un brief de 120–180 palabras y, después, un mensaje de primer turno listo para copiar. Mantén el alcance en una sola intervención. Usa un lenguaje directo y normal; no añadas personajes, presión emocional, peticiones de razonamiento oculto, promesas de rendimiento ni relleno genérico.

El mensaje copiable debe incluir estos elementos con etiquetas claras y en prosa natural:

```text
Outcome
Audience
Supplied inputs
Constraints
Output shape
Acceptance check
Stop boundary
```

Si falta un hecho necesario, pide al modelo receptor que lo marque como `unknown` en vez de inventarlo. Si hacen falta fuentes, pide un plan de fuentes o detente; no solicites una respuesta factual segura sin evidencia.

## Devuelve un recibo compacto

Si falta un campo importante, devuelve exactamente:

```text
brief_status: needs_clarification
clarifying_question:
known_inputs:
risk: R0
content_status: candidate
handoff:
```

Cuando los campos sean suficientes, devuelve exactamente:

```text
brief_status: ready_to_copy | blocked
dialogue_brief: 120–180 words
first_turn: copy-ready text
inputs_preserved:
unknowns:
acceptance_check:
stop_boundary_or_blocker:
risk: R0
evidence: selected brief revision only
content_status: candidate
handoff:
```

Acepta el resultado solo si conserva los hechos proporcionados, contiene una comprobación observable, prohíbe ampliar por cuenta propia los datos o las acciones y dirige el trabajo fuera del primer turno. `ready_to_copy` solo indica que el brief está presente; no demuestra el comportamiento del modelo, la calidad de la respuesta, el aprendizaje, la exactitud factual, la satisfacción de la persona ni la finalización de la tarea.

## Registro de mantenimiento

- `source`: método original de Prysai Lab, reorganizado a partir de los contratos de communication-clinic, task, evidence y routing
- `license`: reescritura original; el material externo sigue siendo referencia en `docs/sources/asset-register.md`
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
