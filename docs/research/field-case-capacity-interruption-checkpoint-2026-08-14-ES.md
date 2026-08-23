<!-- content_id: field-case-capacity-interruption-checkpoint-2026-08-14 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: field-case-capacity-interruption-checkpoint-2026-08-14.md | source_revision: 2026-08-23 -->

# Caso de campo: pausa antes de reintentar una tarea interrumpida

## Empieza aquí: no hagas invisible la interrupción

Cuando el modelo elegido deja de estar disponible, es tentador enviar el siguiente prompt, cambiar algo o dar por hecho que la tarea casi terminó. Haz una pausa. Antes de iniciar otro intento, crea un pequeño punto de control que separe lo que sabes de lo que esperas que haya ocurrido:

1. escribe el objetivo en una frase;
2. conserva el último artefacto que realmente puedes revisar: un diff, un resultado de prueba, una nota o la ausencia explícita de artefacto;
3. marca cada resultado que falta como `unknown`, sin rellenar el hueco con una historia tranquilizadora;
4. elige un solo siguiente paso acotado después de clasificar la tarea anterior como completa, parcial o desconocida.

Esta página es un ejercicio de decisión offline. No envía prompts, no reintenta ni cambia modelos, no inspecciona cuentas y no establece cómo se comportará un proveedor. Su objetivo es más sencillo: una interrupción debe dejar un registro revisable antes de convertirse en otra tarea.

![Punto de control de interrupción: pausa antes de un nuevo prompt, registra lo conocido y lo desconocido y elige una decisión acotada.](../../assets/teaching/interruption-checkpoint-card-red-black.svg)

## Identidad del caso

- `case_id`: `FC-CAPACITY-01`
- `title`: Pausa antes de reintentar una tarea interrumpida
- `problem`: una tarea se interrumpe con un mensaje de modelo no disponible y la persona debe evitar tratar un resultado no observado como una tarea terminada.
- `audience`: principiantes y revisores que usan una superficie asistida por modelos
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: Capítulo 6; Capítulo 9; Capítulo 19
- `related_labs`: Lab 001; Lab 013
- `related_skills`: Interruption Checkpoint; Task Protocol; Evidence Review; LLM Comparison Protocol
- `related_evaluations`: `three-task-smoke-v1`, en estado `not_run`

## Registro de fuentes

- `source_type`: `github_issue`
- `source_url`: https://github.com/openai/codex/issues/33865
- `source_title`: informe público sobre un modelo elegido que dejó de estar disponible
- `source_author_or_publisher`: autor público de una Issue de GitHub
- `accessed_at`: 2026-08-14, según la [señal de campo sobre capacidad](field-signal-model-capacity-budget-2026-08-14.md)
- `source_license_or_usage_boundary`: informe público solo como referencia; este caso usa un resumen original y un fixture offline ficticio
- `quotation_policy`: no se copia texto de la Issue, comentarios, logs, datos de cuenta, nombres de modelos, detalles de máquina, salidas, soluciones, capturas ni cargas de tareas
- `source_scope`: la Issue solo demuestra que una persona publicó en una fecha un informe sobre un modelo elegido no disponible. No demuestra causa, frecuencia, disponibilidad actual, comportamiento de reintento, política del servicio, semántica de cola, solución ni comportamiento en otra superficie, cuenta, modelo o proveedor. La señal relacionada también cita una guía oficial de límites de API; esa guía describe la API y no explica por sí sola el informe de Codex.

## Situación reportada

- `user_report_summary`: una autora o autor de una Issue pública describió un mensaje relacionado con la capacidad que impedía usar el modelo elegido en un contexto concreto.
- `observed_symptom`: la fuente indica que el modelo dejó de estar disponible antes de obtener un resultado completo.
- `expected_behavior`: esperaba que el modelo elegido estuviera disponible para la tarea; no es una promesa del proveedor.
- `official_boundary`: `unknown` para el evento de Codex descrito. La documentación API vinculada solo describe su propio límite de solicitudes.
- `product_surface`: CLI, según el informe; no se reproduce aquí
- `product_version`: no se trata como un hecho verificado
- `operating_system`: no se trata como un hecho verificado
- `model_or_provider`: se omite deliberadamente; esto no es una comparación de modelos
- `network_or_auth_context`: no se inspeccionó; no se usaron cuenta ni permisos
- `input_shape`: tarea local acotada con una comprobación de aceptación explícita
- `risk_level`: `medium` si los prompts posteriores pudieran actuar sobre un estado local confuso

## Tabla de afirmaciones y evidencias

| Afirmación | Clase de evidencia | Fuente o artefacto | Fecha | Alcance | Límite | Estado |
|---|---|---|---|---|---|---|
| Una persona informó públicamente de un modelo no disponible en un contexto de Codex. | `reported` | [GitHub Issue #33865](https://github.com/openai/codex/issues/33865) | 2026-08-14 | Un informe público fechado | No es reproducción, diagnóstico, medida de frecuencia ni garantía de soporte | candidate |
| La documentación de la API de OpenAI describe límites de solicitudes y cabeceras de respuesta de su API. | `official` | [Rate limits](https://platform.openai.com/docs/guides/rate-limits), acotado por la [señal de campo](field-signal-model-capacity-budget-2026-08-14.md) | 2026-08-14 | Solo documentación de API | No identifica la causa del informe ni define el comportamiento de Codex | candidate |
| La tarea interrumpida terminó, quedó parcial o puede reanudarse sin riesgo. | `not_observed` | No se inspeccionaron tarea local, reintento, cuenta, modelo ni artefacto | 2026-08-14 | Este repositorio | La falta de evidencia no prueba que no ocurriera trabajo | unverified |
| Hay que conservar un punto de control explícito antes de enviar otro prompt. | `project_inference` | Este caso offline; capítulos 6 y 9; `three-task-smoke-v1` | 2026-08-14 | Método de aprendizaje conservador | No garantiza recuperación, conservación del contexto ni prevención de interrupciones | candidate |

## Estado de reproducción

- `reproduction_status`: `not_run`
- `reproduction_scope`: el proyecto no eligió un modelo, no envió una tarea, no inspeccionó una cuenta, no reintentó una solicitud, no cambió ajustes ni obtuvo telemetría del servicio.
- `fixed_input_or_fixture`: registro ficticio original de **Conversión didáctica**
- `logs_or_artifacts`: recibo de punto de control creado por un alumno solo si se aprueba una ejecución offline revisada de forma independiente
- `independent_reviewer`: pendiente
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## Ruta mínima de diagnóstico seguro

| Paso | Comprobación de solo lectura o acción de bajo riesgo | Observación esperada | Regla de parada |
|---|---|---|---|
| 1 | Detén la tarea ficticia y copia objetivo, último artefacto visible y aceptación en un recibo local. | El objetivo queda separado de cualquier resultado no observado. | Para si no conoces objetivo, tipo de artefacto o aceptación; no envíes otro prompt. |
| 2 | Clasifica el estado anterior como `complete`, `partial` o `unknown` usando solo el artefacto listado. | La evidencia ausente sigue visible. | No marques `complete` sin la evidencia de aceptación indicada. |
| 3 | Elige una sola decisión: inspección acotada de solo lectura, tarea nueva con el recibo, o pausa para la ayuda/estado oficial actual. | El siguiente paso tiene su propia evidencia y no hereda la de la tarea interrumpida. | Para antes de reintentar, cambiar modelo o ajustes, gastar créditos, subir contexto o afirmar que se reanudó. |

- `allowed_actions`: leer este caso ficticio, escribir un punto de control local, clasificar evidencia y nombrar una decisión futura
- `forbidden_actions`: enviar prompts, reintentar, cambiar modelo o configuración, mirar una cuenta, gastar créditos, subir archivos, llamar a una API, hacer commit, push, publicar o usar secretos
- `minimal_safe_probe`: recibo local de cinco líneas sin datos reales del producto
- `stop_condition`: falta el artefacto final, el significado de aceptación o la autoridad para la siguiente acción externa
- `rollback_or_cleanup`: eliminar un recibo ficticio local innecesario; no se cambió ningún sistema, cuenta ni repositorio

## Conversión didáctica

- `learner_problem`: aparece un mensaje de modelo no disponible mientras un principiante redacta un cambio pequeño y quiere enviar «continúa desde donde lo dejaste».
- `core_concept`: una interrupción visible, un artefacto y una tarea completada son cosas distintas. Un nuevo intento no hereda la evidencia anterior.
- `decision_to_teach`: conserva un recibo y realiza una inspección acotada antes de una tarea nueva, o pausa y utiliza la ruta oficial de ayuda/estado. La primera opción aclara la evidencia local; la segunda evita añadir actividad cuando falta autoridad o evidencia. Ninguna garantiza capacidad, recuperación o finalización.
- `smallest_experiment`: trabaja solo con este registro ficticio:

  ```text
  goal: añadir una línea a la lista de aceptación de una página local
  last_visible_event: apareció un mensaje de modelo no disponible
  artifact_available: no se ha inspeccionado resumen de finalización, diff ni resultado de prueba
  tempting_next_action: enviar «continúa desde donde lo dejaste»
  ```

  Sin abrir ninguna herramienta, crea este punto de control:

  ```text
  goal: añadir una línea a la lista de aceptación
  last_accepted_evidence: unknown
  state_classification: unknown
  missing_evidence: diff o vista del archivo, y resultado de la lista
  next_decision: blocked — conservar este recibo antes de una tarea nueva
  external_actions: not_run
  ```

- `intentional_failure`: decir que la línea ya se añadió, que el reintento continuará sin riesgo, que el modelo es malo o que el evento lo causó un límite de API.
- `required_artifact`: punto de control de seis líneas y una frase que explique por qué un nuevo prompt no demuestra que la tarea anterior terminó
- `acceptance`: el recibo nombra el objetivo; conserva `unknown` sin artefacto; separa evento y finalización; no afirma causa ni proveedor; registra `external actions: not_run`.
- `transfer`: aplica el mismo punto tras un timeout, una sesión de navegador perdida, una herramienta ausente, una entrega desconectada o cualquier interrupción. Lo constante es que el siguiente paso necesita evidencia nueva; cambian el artefacto observable y el límite seguro.
- `forbidden_claims`: disponibilidad actual, causa raíz, comportamiento de cola, reintento exitoso, calidad del modelo, equivalencia de plataformas, facturación, finalización, eficacia de seguridad, competencia, transferencia exitosa o preparación para producción

## Ubicación del contenido

- `primary_chapter`: [Capítulo 9 — Verificación, duda y recuperación](../../book/chapters/09-verification-and-recovery-ES.md)
- `supporting_chapters`: [Capítulo 6 — Selección de modelos](../../book/chapters/06-model-selection-ES.md); [Capítulo 19 — Evaluar modelos y flujos](../../book/chapters/19-evaluate-models-and-workflows-ES.md)
- `primary_lab`: [Lab 013 — Corte vertical auditable](../../book/labs/lab-013-l3-vertical-slice-ES.md)
- `supporting_labs`: [Lab 001 — Primera tarea segura](../../book/labs/lab-001-first-safe-task-ES.md)
- `related_skill`: [Interruption Checkpoint](../../skills/prysai-interruption-checkpoint/SKILL.md); [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md); [LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md)
- `evaluation_fixture`: [three-task-smoke-v1](../../evals/candidates/three-task-smoke-v1/README.md), `not_run`
- `update_registry_entry`: revisar si cambia el informe, se admite una guía oficial de Codex, se propone una ejecución real o se pide una receta de recuperación específica

Este caso hace enseñable una señal pública existente sin elevar la madurez del capítulo, lab, Skill, evaluación ni la afirmación sobre la plataforma.

## Privacidad, permisos y mantenimiento

- `personal_data_removed`: sí; no se reutiliza identidad, cuenta ni detalle del entorno
- `secrets_removed`: sí; no se incluyen credenciales, tokens, planes, identificadores de modelo, rutas, cargas de tarea ni logs
- `private_paths_removed`: sí
- `copyrighted_material_boundary`: solo resumen original y fixture ficticio; no se copia texto, comentario, solución ni documentación de la Issue
- `asset_register_entry`: S103 en `docs/sources/asset-register.md`
- `volatile_facts`: estado y metadatos de la Issue, disponibilidad, límites de API, controles, rutas de ayuda y comportamiento de la plataforma
- `next_review`: 2026-09-14, o antes de cualquier afirmación sobre recuperación, capacidad o producto
- `change_trigger`: cambio de fuente, incorporación de documentación oficial de Codex, ejecución propuesta o solicitud de enseñar reintentos/configuración
- `owner`: research-maintainer

## Límites de las afirmaciones

- `what_can_be_claimed`: un informe público fechado queda representado como caso candidato acotado, con fuente, clases de evidencia, estado de reproducción, ejercicio offline y condición de parada.
- `what_must_not_be_claimed`: que el informe sea frecuente, actual, reproducible o causado por un límite de API; que una interrupción pueda reanudarse sin riesgo; que un proveedor sea mejor; que el ejercicio evite pérdidas; o que exista evidencia de aprendizaje, runtime, release o producción.
- `next_smallest_check`: ejercicio offline del punto de control ficticio, consentido y revisado de forma independiente, sin recopilar cuenta, modelo, tarea, prompt, proyecto, uso, datos personales ni servicio externo.
- `current_status`: `candidate`
