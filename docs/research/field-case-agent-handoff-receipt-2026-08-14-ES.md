<!-- content_id: field-case-agent-handoff-receipt-2026-08-14 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: field-case-agent-handoff-receipt-2026-08-14.md | source_revision: 2026-08-23 -->

# Caso de campo: crear un subagente no equivale a tener un recibo de la tarea

## Empieza por nombrar el punto de control que falta

Ver aparecer un subagente en una lista de tareas no demuestra que haya recibido el trabajo. Antes de delegar una tarea real, separa estos puntos de control:

1. se creó la solicitud de entrega;
2. se inició o despertó al agente receptor;
3. el agente receptor puede mostrar el recibo de la tarea inocua;
4. el agente receptor terminó la acción indicada; y
5. el padre recibió un resultado que se puede comprobar.

Solo el tercer punto demuestra que la entrega llegó. Si falta, marca la entrega como `blocked`, deja de enviar trabajo real por esa vía y usa un agente único o una entrega humana. Esta página es una ayuda de decisión offline: no crea agentes, no envía mensajes, no inspecciona sesiones ni diagnostica productos.

![Cinco puntos de control: creado, iniciado, recibo, ejecución y resultado devuelto. El recibo es la puerta de entrega.](../../assets/teaching/agent-handoff-receipt-checkpoints-red-black.svg)

## Identidad del caso

- `case_id`: `FC-HANDOFF-01`
- `title`: Crear un subagente no equivale a tener un recibo de la tarea
- `problem`: el flujo principal parece crear un subagente, pero el texto de la tarea puede no ser visible en el extremo receptor.
- `audience`: principiantes y revisores que trabajan en entornos de programación con herramientas y varios pasos
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: Capítulo 10; Capítulo 12
- `related_labs`: Lab 013
- `related_skills`: Task Protocol; Evidence Review
- `related_evaluations`: ninguna asignada

## Registro de fuentes

- `source_type`: `github_issue`
- `source_url`: https://github.com/openai/codex/issues/37822
- `source_title`: informe público sobre una entrega que aparece como creada pero no muestra un recibo de tarea
- `source_author_or_publisher`: persona que publicó el informe en GitHub
- `accessed_at`: 2026-08-14
- `source_license_or_usage_boundary`: informe público solo como referencia; este caso usa un resumen original y un fixture offline ficticio
- `quotation_policy`: no se copia texto de la Issue, comandos, registros, capturas, adjuntos, cuentas, rutas de proyecto, ajustes del proveedor ni archivos de reproducción
- `source_scope`: al consultar la fuente, los metadatos mostraban un informe público abierto. Solo permite atribuir a una persona el relato y la expectativa en los entornos indicados. No demuestra la causa, el comportamiento actual, la frecuencia, una solución admitida ni el comportamiento en otra cuenta, versión, proveedor, flujo o plataforma.

## Situación reportada

- `user_report_summary`: una persona describió una entrega del padre al subagente en la que el hijo parecía iniciar, pero respondió como si no hubiera recibido ninguna asignación. El informe menciona el síntoma en más de una superficie y configuración concreta.
- `observed_symptom`: la tarea hija aparecía visible o activa, pero la respuesta no demostraba que hubiera recibido el texto previsto.
- `expected_behavior`: la persona esperaba que el hijo recibiera el mensaje del padre y actuara en consecuencia.
- `official_boundary`: `unknown`. Este caso no explica mecanismos internos, compatibilidad actual, configuración ni correcciones.
- `product_surface`: se mencionan escritorio y CLI; aquí no se reproduce ninguno.
- `product_version`: las versiones y ajustes de la fuente no se verifican de forma independiente.
- `operating_system`: la fuente menciona una plataforma; el proyecto no la inspeccionó.
- `model_or_provider`: se describió un proveedor personalizado; no se comparan proveedores.
- `network_or_auth_context`: no se inspeccionó; no se usaron cuentas, credenciales, proveedor ni red.
- `input_shape`: comprobación con una frase fija y ficticia; sin tarea, repositorio, archivo, secreto ni contenido real de usuario.
- `risk_level`: `medium` si un flujo real delega una acción irreversible o contenido sensible antes de confirmar el recibo

## Tabla de afirmaciones y evidencias

| Afirmación | Clase de evidencia | Fuente o artefacto | Fecha | Alcance | Límite | Estado |
|---|---|---|---|---|---|---|
| La Issue pública #37822 existía y estaba abierta al consultarla. | `direct` | [GitHub Issue #37822](https://github.com/openai/codex/issues/37822) | 2026-08-14 | Metadatos públicos | El estado abierto no prueba un fallo activo, prioridad, reproducción ni causa sin resolver. | candidate |
| Una persona describió un hijo creado o despertado sin recibo visible. | `reported` | La misma Issue pública | 2026-08-14 | Entornos y observaciones de un autor | No es una reproducción independiente ni una afirmación general. | candidate |
| El mensaje se perdió por un campo interno o una ruta de descifrado concreta. | `not_observed` | Ninguna fuente local, ejecución ni revisión independiente | 2026-08-14 | Mecanismo interno y diagnóstico | La hipótesis del informe no se adopta como hecho del proyecto. | unverified |
| Crear, despertar, recibir, ejecutar y devolver son afirmaciones que conviene separar. | `project_inference` | Este caso; capítulos 10 y 12; Lab 013 | 2026-08-14 | Enseñanza prudente de flujos con varios pasos | No garantiza la implementación, detectar todos los fallos ni la seguridad de un agente. | candidate |

## Estado de reproducción

- `reproduction_status`: `not_run`
- `reproduction_scope`: el proyecto no llamó a ninguna herramienta de entrega, no creó subagentes, no inspeccionó registros o sesiones, no usó un proveedor ni ejecutó el entorno descrito.
- `fixed_input_or_fixture`: tarjeta de recibo offline original de **Conversión didáctica**.
- `logs_or_artifacts`: tarjeta ficticia completada y recibo de decisión acotado si se aprueba una ejecución autorizada
- `independent_reviewer`: pendiente
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## Ruta mínima de diagnóstico seguro

| Paso | Comprobación de solo lectura o acción de bajo riesgo | Observación esperada | Regla de parada |
|---|---|---|---|
| 1 | Lee la tarjeta ficticia y etiqueta cada punto observado: creado, iniciado, recibo, ejecución, devolución. | El estado visible no se convierte silenciosamente en recibo de tarea. | Para si aparece una tarea real, contenido privado, herramienta, cuenta o configuración. |
| 2 | Marca `not_observed` en el recibo cuando la tarjeta solo muestra creación y una respuesta genérica. | La entrega queda `blocked`; no se acepta ningún resultado. | No infieras un defecto, un permiso ausente ni una condición segura para reintentar. |
| 3 | Elige un respaldo: tarea acotada con un solo agente o entrega legible para una persona. | El siguiente paso tiene responsable y no depende de una suposición oculta de entrega. | Para antes de crear agentes, enviar mensajes, cambiar ajustes o repetir un efecto real. |

- `allowed_actions`: leer el registro ficticio, clasificar observaciones, escribir un recibo local y elegir un respaldo sin delegación
- `forbidden_actions`: crear o despertar agentes, enviar una tarea, exponer secretos, leer registros o sesiones, cambiar proveedor o interruptor, repetir efectos, instalar, hacer commit, push, publicar o usar una cuenta
- `minimal_safe_probe`: tarjeta de cinco puntos completada con la frase fija `RECEIPT-OK`
- `stop_condition`: sustituir la frase fija por una tarea real, no nombrar responsable del respaldo o introducir un efecto externo no revisado
- `rollback_or_cleanup`: elimina el recibo temporal si no contiene una decisión útil; deja intacto el fixture ficticio

## Conversión didáctica

- `learner_problem`: un panel indica que existe un ayudante, pero el alumno no puede saber si recibió la asignación.
- `core_concept`: la visibilidad del ciclo de vida no es la entrega del mensaje. Una entrega fiable necesita un recibo antes de confiar en la ejecución.
- `decision_to_teach`: usa una sonda de recibo inocua antes de una tarea aprobada, o deja el trabajo en manos de un único agente o de una persona si falta el recibo. La primera opción añade un control; la segunda puede ser más lenta. Ninguna inventa evidencia de entrega.
- `smallest_experiment`: trabaja solo con esta tarjeta offline:

  ```text
  handoff_id: demo-01
  parent_request: "Devuelve exactamente: RECEIPT-OK"
  visible_status: child created; child started
  child_reply: "Esperando una asignación."
  receipt_observed: no
  execution_observed: no
  result_returned: no usable task result
  ```

  Sin ejecutar herramientas, completa este recibo acotado:

  ```text
  created: observed
  started: observed
  receipt: not_observed
  execution: not_observed
  returned_result: not_accepted
  decision: blocked — usar un agente único o una entrega humana
  external_actions: not_run
  ```

- `intentional_failure`: tratar `created` como prueba de entrega, pedir al hijo que adivine la tarea, enviar trabajo real sin recibo o llamar al informe un defecto confirmado.
- `required_artifact`: recibo completado, una frase que nombre el punto no observado y un respaldo con responsable
- `acceptance`: distingue los cinco puntos; marca el recibo como no observado; no inventa causa ni configuración; rechaza el trabajo real; nombra el respaldo; y registra `external_actions: not_run`.
- `transfer`: aplica la tarjeta a un worker de cola, webhook, sistema de aprobación, pipeline de compilación o ticket de equipo. El principio estable es que un evento visible del ciclo de vida no prueba que el contenido esperado llegara al siguiente actor.
- `forbidden_claims`: defecto actual de Codex, mecanismo interno, configuración compatible, reintento seguro, resultado ejecutado, garantía de capacidad, competencia del alumno, transferencia lograda, eficacia de seguridad o preparación para producción

## Ubicación del contenido

- `primary_chapter`: [Capítulo 10 — Planificación y cortes](../../book/chapters/10-planning-and-slicing-ES.md)
- `supporting_chapters`: [Capítulo 12 — Bucle y parada del agente](../../book/chapters/12-agent-loop-and-stop-ES.md); [Capítulo 9 — Verificación y recuperación](../../book/chapters/09-verification-and-recovery-ES.md)
- `primary_lab`: [Lab 013 — Corte vertical](../../book/labs/lab-013-l3-vertical-slice-ES.md)
- `supporting_labs`: [Lab 007 — Límites de acción](../../book/labs/lab-007-action-boundaries-ES.md); [Lab 016 — Límite de efectos secundarios](../../book/labs/lab-016-side-effect-boundary-ES.md)
- `related_skill`: [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`: ninguno
- `update_registry_entry`: revisar si cambia la fuente, se reconoce un límite oficial, se propone una reproducción local controlada o se solicita un ejercicio ejecutable

Este caso hace consultable una señal pública antigua y le da una forma didáctica segura. No cambia la madurez de capítulos, labs, Skills o evaluaciones relacionados.

## Privacidad, permisos y mantenimiento

- `personal_data_removed`: sí; ejercicio ficticio sin identidad de la fuente
- `secrets_removed`: sí; no se usan cuenta, proveedor, ruta, carga de tarea ni contenido de sesión
- `private_paths_removed`: sí
- `copyrighted_material_boundary`: solo resumen y tarjeta ficticia originales; no se copia prosa, comando, registro, adjunto, captura ni respuesta de la Issue
- `asset_register_entry`: S89 en `docs/sources/asset-register.md`
- `volatile_facts`: estado de la Issue, compatibilidad del producto, comportamiento de la entrega, versiones, proveedores, permisos y detalles de implementación
- `next_review`: 2026-09-14, o antes de cualquier afirmación de producto, runtime, configuración o publicación
- `change_trigger`: cambio de la fuente, admisión de documentación oficial, propuesta de ejercicio online o solicitud de una entrega ejecutable
- `owner`: research-maintainer

## Límites de las afirmaciones

- `what_can_be_claimed`: un informe público antiguo queda representado como caso acotado con fuente, síntoma, clases de evidencia, estado de reproducción, ruta offline y condición de parada.
- `what_must_not_be_claimed`: que el informe siga vigente o sea reproducible, que todas las entregas estén afectadas, que se conozca la causa, que un ajuste lo arregle, que el hijo recibiera un mensaje oculto, que la tarjeta detecte todos los fallos o que un alumno haya hecho una delegación real.
- `next_smallest_check`: ejecución consentida y revisada de forma independiente de la sonda fija en un entorno nombrado, con una frase inocua, sin recoger sesión, repositorio, secreto, cuenta, tarea privada ni datos personales, y deteniéndose antes de cualquier efecto.
- `current_status`: `candidate`
