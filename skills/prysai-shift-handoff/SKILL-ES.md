<!-- content_id: prysai-shift-handoff | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# Traspaso de turno

Prepara el informe mínimo que hace visible un elemento de trabajo cambiante
sin fingir que un turno de chat, ejemplo, permiso o resultado anterior sigue
siendo válido. Este Skill prepara el traspaso; no envía prompts, inspecciona
sistemas ni ejecuta el trabajo.

## Ocúpate solo del trabajo recurrente

Usa este Skill cuando un flujo textual repetido ya tenga criterios duraderos
pero cambie un elemento: por ejemplo, clasificar la nota de feedback de hoy
con una taxonomía aprobada, revisar el breve de esta semana con un estilo
estable o convertir un nuevo registro de fuente en una forma de salida fija.

Deriva en cambio cuando:

- el contexto reutilizable de producto, audiencia, posicionamiento o medición necesita una decisión versionada: Product Context;
- el resultado, alcance, autoridad o aceptación aún no están claros: Task Protocol;
- una tarea anterior se detuvo antes de que la evidencia fuera visible: Interruption Checkpoint;
- una petición, respuesta y resultado esperado ya existen y necesitan reparación controlada: Communication Failure Triage;
- el elemento cambiante es un hecho actual que requiere una fuente: Source Investigator; o
- entran archivos, conjuntos de datos, herramientas, cuentas, red, sistema compartido o acción externa: deriva a Task Protocol antes de preparar el informe.

No conviertas un patrón de chats repetidos en una afirmación sobre memoria,
ventana de contexto, costes, persistencia, automatización o configuración de un
producto concreto.

## Exige una tarjeta estable y una actual

Recoge solo las entradas visibles. Marca como `missing` lo que no se proporcione;
no lo recuperes de otro turno ni lo infieras de un ejemplo anterior.

**Tarjeta estable**, reutilizable dentro de un flujo de trabajo nombrado:

1. `work_stream`: el trabajo recurrente en lenguaje claro;
2. `criteria_revision`: versión, fecha o referencia inmutable de las reglas;
3. `allowed_inputs`: material permitido para cada elemento;
4. `forbidden_assumptions`: hechos, fuentes, permisos o resultados anteriores que no se heredan; y
5. `response_shape`: forma obligatoria del resultado.

**Tarjeta actual**, verdadera solo para este elemento:

1. `item_id`: etiqueta local no sensible;
2. `item_input`: texto actual suministrado o resumen seguro mínimo;
3. `item_change`: lo nuevo o diferente de hoy;
4. `task_request`: único resultado solicitado ahora;
5. `acceptance_evidence`: regla o artefacto visible que se comprobará; y
6. `authority_and_risk`: preparación textual `R0` o `handoff_required`.

Rechaza el informe si el elemento contiene un secreto, registro privado, texto
sin licencia, afirmación no respaldada o acción no aprobada. No pidas historial
de conversaciones anterior que no sea necesario.

## Compara antes de escribir

1. Identifica qué campo pertenece a la tarjeta estable y cuál solo al elemento actual.
2. Conserva un ejemplo anterior solo como referencia etiquetada; nunca es un hecho ni una aceptación actual.
3. Marca como `missing` o `not_authorized` cada hecho, permiso, fuente, fecha, destino o comprobación de aceptación no suministrado de nuevo.
4. Detente si el elemento actual cambia los criterios estables. No modifiques la tarjeta en silencio; deriva a su responsable o a Product Context/Task Protocol.
5. Devuelve un informe listo para copiar solo para trabajo `R0` basado en texto suministrado. La acción posterior necesita su propio límite y evidencia.

## Devuelve un comprobante de traspaso

Devuelve exactamente:

```text
handoff_status: ready_for_text_only_current_item | blocked_on_<field> | handoff_required
work_stream:
criteria_revision:
stable_card:
current_item:
item_change:
allowed_inputs:
forbidden_inheritance:
requested_response_shape:
acceptance_evidence:
authority_and_risk:
unknowns_or_conflicts:
next_owner_or_action:
claim_limit:
```

Usa `ready_for_text_only_current_item` solo cuando las tarjetas estable y
actual, la petición, la forma de respuesta, la evidencia de aceptación y el
límite `R0` sean visibles. El comprobante delimita el contexto; no demuestra
que un modelo haya conservado las reglas, entendido el elemento, generado una
respuesta correcta o completado la tarea.

## Comprobaciones de fallo

Detente o deriva cuando:

- alguien diga «usa las mismas reglas que la vez pasada» sin nombrar la revisión de criterios o la comprobación actual;
- un ejemplo viejo se convierta en la fuente o verdad de hoy sin etiqueta;
- el elemento incluya archivos, credenciales, material privado, navegación, publicación, gasto, cambios de cuenta u otro efecto externo;
- el elemento cambie la rúbrica, el permiso, el destino o el contrato de salida estables; o
- una respuesta ya se trate como completa. Usa Evidence Review en vez de relabelarla como traspaso.

## Registro de mantenimiento

- `source`: método original de Prysai Lab derivado del registro de investigación del elemento recurrente acotado por fuentes, Task Protocol, Product Context e Interruption Checkpoint
- `license`: reescritura original; las guías oficiales y los informes públicos siguen siendo solo de referencia
- `owner`: workflow-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
