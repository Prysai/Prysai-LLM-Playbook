<!-- content_id: chapter-06-model-selection | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 6: Elegir un modelo no es venerar un modelo

**Estado:** `candidate`. El protocolo de comparación está escrito y delimitado por fuentes, pero este repositorio no ha ejecutado su conjunto fijo de tareas. Rendimiento, coste, latencia, capacidad, estabilidad y clasificación siguen en `not_run`.

## El problema

«Usa el mejor modelo» no es una decisión de trabajo. La pregunta útil es:

> Para esta tarea, en esta superficie, con este proveedor, contexto, conjunto de herramientas, límite de permisos, tiempo y rúbrica de aceptación, ¿qué candidato cumple el mínimo y qué evidencia justifica ampliar la prueba?

Si un candidato no está disponible en la superficie elegida, o si las dos ejecuciones usan entradas, herramientas, permisos o ajustes distintos, no hay comparación limpia. Una demostración atractiva solo muestra que una configuración produjo un resultado una vez; no establece un ranking general.

## Objetivos de aprendizaje

- elegir tarea y superficie antes que el modelo;
- verificar disponibilidad en cuenta, espacio, proveedor y sesión reales;
- separar modelo, proveedor, esfuerzo de razonamiento, contexto, herramientas, permisos y aceptación;
- ejecutar una comparación de bajo riesgo con tres tareas sin cambiar condiciones para rescatar a un candidato;
- conservar fallos de capacidad, proveedor y espera como evidencia; y
- decir qué prueba el experimento, qué no y cuándo detenerse.

## Informes públicos: síntomas, no soluciones mágicas

La [investigación de campo de Codex](../evidence-library-ES.md#source-notes) recoge Issues y debates públicos. Son síntomas, no diagnósticos oficiales ni reproducciones locales.

| Síntoma | Observación | No demuestra | Respuesta segura |
|---|---|---|---|
| El selector cambia `model` pero conserva otro `model_provider` | Modelo visible y proveedor efectivo pueden formar un par inválido | Que selector, proveedor o modelo estén rotos en general | Lee ambos valores, conserva diff de configuración redactado y corrige el par |
| El modelo está a capacidad | La tarea se detiene antes de terminar y el siguiente intento puede heredar estado parcial | Baja calidad del modelo o que reintentar signifique que el primer intento acabó | Guarda checkpoint, diff, logs y pruebas; clasifica el estado antes de continuar |
| Un comando queda en `Working` | La interfaz muestra actividad sin salida comprobable | Que formateador, Agent o modelo sigan trabajando bien | Aplica límite de tiempo, interrumpe con seguridad, inspecciona worktree y ejecuta solo una comprobación acotada |

El registro de [selección de modelos](../evidence-library-ES.md#source-notes) contiene enlaces, fechas y límites. Para cada informe separa: lo que dijo una persona, si hay informe independiente, confirmación oficial y lo que este Playbook reprodujo. Un informe sin reproducción no se convierte en una solución garantizada.

## 1. Elegir modelo es elegir configuración

### La disponibilidad viene antes que la calidad

~~~
documentación oficial → autorización de cuenta / espacio / organización
→ superficie y proveedor objetivo → modelo visible en la sesión
→ petición inocua funciona → herramienta requerida es invocable
→ resultado de tarea verificado
~~~

Cada flecha es una afirmación distinta. Una página oficial, una entrada de catálogo o un modelo visible en un selector no prueban que pueda atender esta tarea con los archivos, terminal, navegador o conector que necesita.

Usa una tarjeta de candidato:

~~~
candidate_id:
model_id:
provider:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | API | other
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:
model_visible_evidence:
harmless_request_evidence:
~~~

`not_observed` es un resultado válido: es más seguro que rellenar una suposición.

### La posición del producto es una hipótesis inicial

Las páginas oficiales pueden describir modelos para trabajo abierto complejo, trabajo diario pragmático o transformación repetible de alto volumen. Esa descripción sirve para elegir qué probar, no para afirmar que uno gana. Esfuerzo de razonamiento alto puede aportar análisis a cambio de más tiempo y tokens; empieza con el menor ajuste que cumpla la rúbrica. Si un modo añade tiempo de razonamiento o subagentes, cambia el flujo y el presupuesto: ya no es una comparación solo de modelo.

### Modelo, proveedor y superficie forman una tupla

~~~
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
~~~

Si cambia un miembro principal, compara otro flujo o marca la fila `not_comparable` y repite ambos lados bajo el nuevo contrato. Un archivo de configuración solo prueba configuración; lee de vuelta proveedor y modelo efectivos y realiza una petición inocua antes de considerarlos activos.

## 2. Decide en el orden correcto

~~~
define tarea y riesgo → elige Local / Worktree / Cloud → elige entrada y proveedor
→ verifica acceso y disponibilidad → congela contexto, herramientas, permisos,
esfuerzo y aceptación → ejecuta el mismo conjunto → revisa filas comparables
→ amplía, detente o recoge más evidencia
~~~

Clasifica primero la tarea: extraer, transformar, planificar, programar con herramientas, investigar/revisar o crear/diseñar. Un candidato que extrae bien puede ser inadecuado para reparar varios archivos o revisar evidencia de alto riesgo. La rúbrica debe coincidir con la clase.

Elige la superficie mínima que deje la evidencia necesaria. Mantén entradas sintéticas o redactadas en local cuando no haga falta ejecución remota; usa Worktree desechable para aislar trabajo sin commit; usa Cloud solo con repositorio, entorno, red, secretos y ruta de revisión aprobados y observables. El modelo no compensa un archivo ausente, conector no disponible, checkout erróneo o escritura no autorizada.

## 3. Tarjeta antes de ejecutar

~~~
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
~~~

Antes de la primera ejecución congela entradas y versión, superficie, entrada, proveedor, modelo, esfuerzo, contexto, versiones de herramientas, permisos, rúbrica, revisor, límite de tiempo, reintentos y base de coste. No mejores el prompt, contexto, herramienta, esfuerzo o permiso solo para un lado. Si cambia el contrato, aumenta la versión y repite ambos lados.

## 4. Experimento: comparación de tres tareas

**Estado del experimento:** `not_run`. Es un protocolo de práctica, no evidencia de que este repositorio haya comparado modelos.

Elige dos candidatos con `surface_available: yes` en la misma superficie. Usa el fixture offline y versionado [`three-task-smoke-v1`](../../evals/candidates/three-task-smoke-v1/README-ES.md), con entradas sintéticas y validador local; no contiene ejecuciones de modelo. No uses datos de producción, secretos, escrituras externas, publicación, push, despliegue ni conectores de pago. Ejecuta cada tarea una vez y permite como máximo una revisión controlada, declarada de antemano y con el mismo formato.

Las tareas fijas son `extract-01`, `markdown-02` y `gap-review-03`: extracción estructurada, transformación Markdown bajo restricciones y revisión de huecos de evidencia. No cambies una tarea por una demostración más vistosa para un candidato. Si cambian entrada, instrucción, esquema o aceptación, crea versión nueva y repite ambos lados.

1. Completa y guarda ambas tarjetas antes de invocar candidatos.
2. Verifica disponibilidad y registra la ubicación de la evidencia.
3. Ejecuta A y B con mismo orden, entradas y rúbrica.
4. Guarda salida cruda antes de editar; registra eventos, duración, coste y error.
5. Ante fallo solo permite la revisión controlada; no conviertas reintentos ciegos en métrica de éxito.
6. Revisa toda fila `not_comparable` antes de resumir.
7. Concluye únicamente `worth expanding`, `do not expand yet` o `insufficient evidence` y registra límites.

~~~
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence | reasoning_effort_or_config
context_fingerprint | tools_and_versions | permission_profile | first_pass
rework_count | duration | cost_basis | cost_observed | error_type
reviewer_score | comparable | not_comparable_reason | raw_evidence
~~~

## 5. Fallo, recuperación y transferencia

| Fallo | Tratamiento |
|---|---|
| Candidato no visible o invocable | Registra `no` o `not_observed`; no puntúes indisponibilidad como calidad |
| Selector y proveedor no coinciden | Conserva diff redactado; corrige la tupla o declara prueba de proveedor/flujo |
| Capacidad interrumpe una ejecución | Guarda error y checkpoint; marca `blocked` o `not_comparable`; solo repite ambos bajo condición declarada |
| Una orden espera sin evento verificable | Aplica regla de tiempo, interrumpe, inspecciona diff/estado y registra verificación ausente |
| Un lado recibe contexto, esfuerzo o herramienta extra | Marca `not_comparable` y repite con contrato congelado |
| Una demo anuncia ganador total | Vuelve a `candidate` o `insufficient evidence` |

Traslada los mismos campos a un modelo en Local frente a Worktree, conversión de documento con esquema estricto, conciliación de fuentes con citas y columna de incógnitas, o inspección de código con herramientas de solo lectura. Nunca copies el resultado a otro dominio sin nuevo conjunto y rúbrica.

## Límite de evidencia y fuentes

La entrega prevista son dos tarjetas, conjunto y rúbrica congelados, ejecuciones crudas, tabla, errores tipados y decisión de ampliar/detener. Hasta que existan, todo sigue `not_run`; la posición oficial y una sola demo no sustituyen evaluación.

| Límite | Fuente | Consulta |
|---|---|---|
| Posicionamiento, razonamiento y límites de modelos | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 |
| Flujo CLI y repositorio local | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 |
| Entorno y revisión Cloud | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 |
| Síntomas públicos de modelo/proveedor/capacidad | [Registro de campo](../evidence-library-ES.md#source-notes) | 2026-08-11 |

ID de modelos, precios, capacidad, soporte de proveedor, sintaxis y controles pueden cambiar. Actualiza primero fuentes de primera parte y conserva en frases separadas posición oficial, síntoma de usuario y evidencia local.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-ES.md" aria-label="Capítulo anterior: Capítulo 5 · Elegir la superficie de trabajo adecuada de Codex">← Anterior<br><strong>Capítulo 5 · Elegir la superficie de trabajo adecuada de Codex</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-ES.md" aria-label="Capítulo siguiente: Capítulo 7 · Skills, Plugins, MCP y herramientas">Siguiente →<br><strong>Capítulo 7 · Skills, Plugins, MCP y herramientas</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
