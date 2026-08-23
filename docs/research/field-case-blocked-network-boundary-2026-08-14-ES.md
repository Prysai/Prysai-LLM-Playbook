<!-- content_id: field-case-blocked-network-boundary-2026-08-14 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: field-case-blocked-network-boundary-2026-08-14.md | source_revision: 2026-08-23 -->

# Caso de campo: `FC-NETWORK-01` — Un bloqueo no amplía la autoridad

## Empieza aquí: conserva el límite

Una solicitud bloqueada significa que el camino actual no puede continuar. No significa que ya estén permitidos el acceso de red sin restricciones, un proxy o un permiso más amplio.

Antes de tocar una configuración, escribe tres cosas:

1. El único resultado externo que necesita la tarea, sin añadir un endpoint real ni un secreto.
2. La persona que puede aprobar una excepción mínima, o el artefacto offline aprobado que pueda sustituirla.
3. La sonda mínima y no sensible y la evidencia que conservarías si se aprobara la excepción.

Si algo de esto no está claro, detente y pide una decisión más acotada. Esta página es una ayuda de decisión offline, no una guía de configuración: no hace peticiones de red, no enseña a configurar un proxy y no registra comportamiento real de ningún producto.

## Identidad del caso

- `case_id`: `FC-NETWORK-01`
- `title`: Un bloqueo no amplía la autoridad
- `problem`: una petición de red está bloqueada y la persona debe decidir si solicita una excepción mínima y revisable o si amplía el acceso sin pruebas.
- `audience`: principiantes y revisores que usan un entorno de programación con herramientas
- `collected_at`: 2026-08-14
- `owner`: research-maintainer
- `content_status`: `candidate`
- `related_chapters`: Capítulo 4; Capítulo 9; Capítulo 13
- `related_labs`: Lab 001; Lab 007; Lab 016
- `related_skills`: Task Protocol; Evidence Review
- `related_evaluations`: ninguna asignada

## Registro de fuentes

- `source_type`: `forum`
- `source_url`: https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox
- `source_title`: pregunta pública sobre el acceso saliente desde una sesión de Codex CLI en sandbox
- `source_author_or_publisher`: contribuyente público de Stack Overflow
- `accessed_at`: 2026-08-10, según el conjunto de investigación `field-problems-forums-2026-08-10.md`
- `source_license_or_usage_boundary`: informe público de referencia; este caso usa un resumen original y un fixture offline ficticio
- `quotation_policy`: no se copia el texto de la publicación, fragmentos de configuración, logs, credenciales, URL de un entorno real ni comandos de solución
- `source_scope`: la pregunta solo establece que una persona describió una petición saliente bloqueada en un entorno concreto. No establece la sintaxis actual, un límite oficial, una solución segura, la causa raíz ni el comportamiento en otro entorno.

## Situación reportada

- `user_report_summary`: la persona que preguntó describió que necesitaba que un comando llegara a un host público sin perder el sandbox, pero la petición se bloqueó antes de completar la tarea.
- `observed_symptom`: informó de un bloqueo saliente parecido al de un proxy o una lista de permitidos.
- `expected_behavior`: esperaba que una ruta de red muy acotada pudiera convivir con el sandbox.
- `official_boundary`: `unknown` en este caso. No se enseña sintaxis de configuración actual ni una garantía de soporte.
- `product_surface`: CLI, según el informe
- `product_version`: no consta como hecho verificado
- `operating_system`: no consta como hecho verificado
- `model_or_provider`: no es relevante para la decisión didáctica
- `network_or_auth_context`: se informó de una ruta saliente restringida; no se examinó ninguna cuenta, proxy o credencial
- `input_shape`: un host público necesario para una tarea, con el host real omitido
- `risk_level`: `high` si una tarea real ampliara la red, expusiera el contexto del proyecto o añadiera un proxy

## Tabla de afirmaciones y evidencias

| Afirmación | Clase de evidencia | Fuente o artefacto | Fecha | Alcance | Limitación | Estado |
|---|---|---|---|---|---|---|
| Una persona informó de una petición saliente bloqueada mientras usaba una sesión de Codex CLI en sandbox | `reported` | [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox) | 2026-08-10 | Un entorno descrito | Una pregunta no es reproducción, diagnóstico ni garantía de soporte | candidate |
| El informe contiene una receta de configuración actual y segura | `not_observed` | No se copió, probó ni revisó de forma independiente ninguna configuración | 2026-08-14 | Configuración y despliegue | Fuera del alcance de este caso | unverified |
| Un bloqueo autoriza una red sin restricciones o cambiar el proxy | `not_observed` | No se proporcionó autorización del responsable ni tarea en vivo | 2026-08-14 | Autoridad para cambiar la política | Un bloqueo evidencia un límite, no permiso para quitarlo | unverified |
| La petición debe seguir bloqueada hasta que sean revisables el objetivo, el motivo, el alcance mínimo y la sonda segura | `project_inference` | Este caso, el Capítulo 13 y los Labs 007 y 016 | 2026-08-14 | Regla didáctica conservadora sobre efectos externos | No define la configuración de un proveedor ni garantiza una excepción segura | candidate |

## Estado de reproducción

- `reproduction_status`: `not_run`
- `reproduction_scope`: el proyecto no hizo peticiones de red, no inspeccionó un sandbox en vivo, no cambió un proxy, no añadió una lista de permitidos ni usó una cuenta.
- `fixed_input_or_fixture`: registro offline de la sección **Conversión didáctica**
- `logs_or_artifacts`: tarjeta de límites y breve recibo de decisión si se autoriza un ejercicio
- `independent_reviewer`: pendiente
- `last_checked_at`: 2026-08-14
- `root_cause_status`: `unknown`

## Diagnóstico seguro mínimo

| Paso | Comprobación de solo lectura o acción de bajo riesgo | Observación esperada | Regla de parada |
|---|---|---|---|
| 1 | Escribe en un fixture local el resultado, la categoría de host, la acción permitida, la evidencia y la condición de parada. | El efecto externo se distingue del objetivo de la tarea. | Detente si faltan host, motivo, responsable, clase de datos o efecto externo. |
| 2 | Registra el bloqueo sintético como `reported` y enumera la política efectiva, el destino, el alcance mínimo y la sonda que faltan. | El registro con forma de error sigue siendo evidencia de un límite, no un diagnóstico. | No infieras un cambio de configuración, un defecto del producto ni una solución exitosa. |
| 3 | Prepara para la persona responsable una petición de decisión: motivo del host, sonda mínima no sensible, evidencia que conservar y forma de deshacerlo. | La revisión puede aprobar, rechazar o reducir la excepción. | Detente antes de cualquier petición real, cambio de proxy, edición de política, instalación, subida o uso de credenciales. |

- `allowed_actions`: leer el registro ficticio, clasificar la evidencia, redactar una petición local de decisión e identificar una alternativa offline
- `forbidden_actions`: hacer una petición de red, editar la política, añadir un proxy, exponer secretos, instalar dependencias, cambiar permisos, hacer commit, push, publicar o usar una cuenta
- `minimal_safe_probe`: tarjeta de límites de cuatro líneas y una petición que nombre el alcance mínimo del host y una prueba no sensible
- `stop_condition`: falta la decisión del responsable, la clasificación de datos, el destino, el plan de evidencia o la reversión
- `rollback_or_cleanup`: borrar el recibo temporal si no hay nada que conservar; el fixture ficticio no cambia

## Conversión didáctica

- `learner_problem`: la tarea necesita una entrada externa, pero el primer intento se bloquea y la persona siente la tentación de quitar el límite.
- `core_concept`: una limitación técnica, la necesidad de la tarea y la autoridad para cambiar la limitación son hechos distintos. Un error no crea permiso nuevo.
- `decision_to_teach`: pausar y pedir una excepción mínima y revisable, o usar un artefacto offline aprobado o posponer la tarea. Ambas opciones son más honestas que ampliar el acceso en silencio.
- `smallest_experiment`: trabaja únicamente con este registro offline, sin hacer peticiones:

  ```text
  task: comprobar un checksum que aún no se ha descargado
  local record: la petición al host público necesario aparece bloqueada en el fixture
  proposed next action: activar acceso de red sin restricciones y reintentar
  ```

  Escribe este recibo:

  ```text
  observed: el fixture registra un bloqueo
  known need: la tarea del checksum necesita un host público de una categoría concreta
  missing evidence: política efectiva, aprobación del responsable, sonda mínima y reversión
  decision: blocked — solicitar una excepción mínima o un artefacto offline aprobado
  external actions: not_run
  ```

- `intentional_failure`: tratar el bloqueo como permiso para activar una red sin restricciones, afirmar que un proxy es seguro sin revisión o decir que el checksum se verificó sin un artefacto inspeccionable.
- `required_artifact`: recibo completo, una frase que separe objetivo de autoridad y una alternativa segura offline
- `acceptance`: el recibo registra el bloqueo sin diagnosticarlo; el host se nombra solo como categoría; se rechaza la propuesta sin límites; se indica una decisión del responsable o alternativa offline; y se registra `external actions: not_run`.
- `transfer`: aplicar el límite a una descarga de paquetes, API de investigación, webhook o envío desde el navegador. La invariancia es que una necesidad técnica no crea autoridad; cambian el destino y la sonda mínima.
- `forbidden_claims`: configuración actual de Codex, política de red oficial, defecto del producto, proxy seguro, petición exitosa, reproducción local, competencia, eficacia de seguridad, transferencia o preparación para producción

## Ubicación del contenido

- `primary_chapter`: [Capítulo 13 — Límites de acción](../../book/chapters/13-action-boundaries-ES.md)
- `supporting_chapters`: [Capítulo 4 — Contexto, permisos y límite de acción del agente](../../book/chapters/04-context-permissions-and-agent-ES.md); [Capítulo 9 — Verificación, duda y recuperación](../../book/chapters/09-verification-and-recovery-ES.md)
- `primary_lab`: [Lab 016 — Límite de efectos secundarios](../../book/labs/lab-016-side-effect-boundary-ES.md)
- `supporting_labs`: [Lab 001 — Primera tarea segura](../../book/labs/lab-001-first-safe-task-ES.md); [Lab 007 — Límites de acción](../../book/labs/lab-007-action-boundaries-ES.md)
- `related_skill`: [Task Protocol](../../skills/prysai-task-protocol/SKILL.md); [Evidence Review](../../skills/prysai-evidence-review/SKILL.md)
- `evaluation_fixture`: ninguno asignado
- `update_registry_entry`: revisar cuando cambie la fuente pública, se incorpore una política oficial, se proponga un ejercicio en vivo o se añada un ejemplo de configuración

El caso convierte una señal de campo anterior en un caso acotado y consultable. No cambia la madurez de ningún contenido relacionado.

## Privacidad, permisos y mantenimiento

- `personal_data_removed`: sí; el ejercicio es ficticio y no reutiliza identidad ni endpoint reales
- `secrets_removed`: sí; no contiene credenciales, proxy, cuenta, ruta privada ni URL real
- `private_paths_removed`: sí
- `copyrighted_material_boundary`: solo resumen y fixture originales; no se copia la publicación, configuración ni respuesta
- `asset_register_entry`: S88 en `docs/sources/asset-register.md`
- `volatile_facts`: estado de la fuente, configuración, valores por defecto, comportamiento del proxy y soporte del producto
- `next_review`: 2026-09-14, o antes de una afirmación de configuración, seguridad, ejecución o publicación
- `change_trigger`: cambio de fuente o documentación oficial, ejercicio en vivo propuesto o ejemplo de configuración nuevo
- `owner`: research-maintainer

## Límite de las afirmaciones

- `what_can_be_claimed`: un informe público anterior queda representado como un caso candidato con tipo de fuente, síntoma, clases de evidencia, estado de reproducción, diagnóstico de bajo riesgo y regla de parada.
- `what_must_not_be_claimed`: que el informe sea actual o reproducible, que se conozca la causa, que el acceso sin restricciones sea necesario o seguro, que un producto admita una configuración concreta, que el fixture pruebe un control de seguridad o que una persona haya completado la decisión.
- `next_smallest_check`: ejecución offline del registro fijo, revisada de forma independiente y consentida; no debe producir tráfico ni recoger credenciales, cuentas, proyectos, proxies o datos personales.
- `current_status`: `candidate`
