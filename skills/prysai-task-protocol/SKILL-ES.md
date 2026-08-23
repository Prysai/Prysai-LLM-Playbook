<!-- content_id: prysai-task-protocol | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: b4d1303 | source_license: project-owned CC-BY-4.0 -->

# Protocolo de tareas

Crea el contrato más pequeño que permita ejecutar una tarea y auditarla. Este
Skill define los límites; no ejecuta la tarea.

## Límite de activación y derivación

Asume la tarea cuando aparecen verbos vagos como «mejorar», «crear», «investigar»
o «conectar», o cuando no están claros el alcance, la autoridad, la aceptación o
los efectos secundarios.

Deriva cuando:

- se nombra explícitamente un `$skill`; conserva esa ruta y añade solo las
  preguntas de seguridad obligatorias;
- ya se proporciona un protocolo completo y la persona usuaria quiere ejecutarlo:
  deriva a Workflow Orchestrator o a la ruta de dominio correspondiente;
- se pregunta si un resultado existente es verdadero: Evidence Review;
- el trabajo pendiente es descubrir fuentes: Research Router;
- el trabajo pendiente es el posicionamiento del producto: Product Context;
- el trabajo pendiente es elegir o instalar una Skill: Skill Selector.

Nunca se llame a sí mismo. Puede indicar una derivación, pero no reconstruye
recursivamente el protocolo después de que otra Skill vuelva, salvo que la persona
usuaria cambie el alcance.

## Entradas obligatorias y qué hacer si faltan

Recoge `goal`, `background`, `inputs`, `constraints`, `allowed_actions`,
`acceptance_evidence`, `failure_handling` y `delivery_format`. Clasifica también
`risk` como `R0`, `R1`, `R2` o `R3`, y registra `owner`, `checkpoint`, `rollback` y
`confirmation` cuando la tarea pueda cambiar un estado compartido o externo.
Marca lo desconocido como `missing`, no como una suposición. Inspecciona una
entrada local de bajo riesgo antes de preguntar por ella; formula solo preguntas
que cambien el alcance, el riesgo, la elección de implementación o la aceptación.
Para una carencia externa, con secretos, de producción, irreversible o sensible
a la propiedad, devuelve `blocked on <field>` y no ejecutes.

Aplica esta compuerta mínima de riesgo antes de declarar listo el protocolo:

| Riesgo | Contrato requerido | Acción predeterminada |
|---|---|---|
| `R0` | alcance exacto de lectura, entradas, comprobación de aceptación y prohibición de escritura | solo explicación o inspección de solo lectura |
| `R1` | objetivo local exacto, conjunto permitido de escrituras/comandos, checkpoint, objetivo de rollback y comprobación reversible | solo acción local reversible |
| `R2` | objetivo compartido/externo exacto, exposición de datos, responsable, confirmación por acción, checkpoint, rollback y responsable de la evidencia | bloqueado hasta registrar la confirmación indicada |
| `R3` | todos los campos de `R2`, además de propósito acotado, comprobación independiente y confirmación explícita justo antes de la acción irreversible, de producción, con secretos o de permisos amplios | parada firme; este protocolo por sí solo no autoriza la ejecución |

Registra `read`, `edit`, `run`, `network`, `commit`, `push`, `publish`, `deploy`,
`restart` y el acceso a `secret` como acciones separadas con estado `allowed`,
`not_allowed` o `confirmation_required`. Un permiso amplio, un token, un inicio
de sesión o una aprobación anterior no autorizan una acción que no esté listada.
Si la persona usuaria pide varias acciones, sepáralas en etapas con riesgo,
objetivo, confirmación, checkpoint, rollback y evidencia de aceptación propios.

## Orden de construcción

1. Expón el resultado y quién se beneficia.
2. Delimita archivos, sistemas, cuentas, versiones y periodo.
3. Separa lecturas, escrituras, comandos, llamadas de red, commits, pushes y
   publicaciones permitidos; no los agrupes bajo un permiso indiferenciado.
4. Asigna el nivel de riesgo y define el objetivo exacto, el responsable, el punto
   de confirmación, el checkpoint, el rollback y la evidencia observable de
   aceptación.
5. Marca las suposiciones y los elementos desconocidos, y define la siguiente
   derivación.

Para cada afirmación de aceptación, nombra el artefacto observable o la salida de
un comando que la demostraría y el límite que no puede demostrar. Un protocolo no
es evidencia de ejecución. No marques una acción como completa porque se pidió,
se planificó, se inició o devolvió un texto plausible.

## Riesgo, efectos secundarios y confirmación

Clasifica `R0` como explicación o solo lectura, `R1` como cambio local reversible,
`R2` como cambio en un servicio externo o repositorio compartido, y `R3` como
acción de producción, irreversible, con secretos o con permisos amplios. El
protocolo puede describir un efecto secundario, pero la ejecución requiere
autorización explícita para el objetivo y la acción exactos. La confirmación para
«todos los permisos» no sustituye a un objetivo acotado. Nunca incluyas secretos
en el protocolo. En `R2`/`R3`, la confirmación debe producirse después de fijar el
objetivo y la acción, no antes. Una compilación, un inicio de sesión o un ensayo
en seco correctos no confirman una escritura, push, publicación, despliegue o
reinicio posterior.

## Paradas firmes

Devuelve `blocked` cuando falte el beneficiario o el resultado, no esté clara la
propiedad, no pueda observarse la aceptación, vaya a exponerse un secreto, el
objetivo sea ambiguo, falte confirmación para una acción irreversible o una regla
del proyecto entre en conflicto con la petición. Conserva la condición fallida y
el motivo de la parada. Solo se permite repetir cuando cambia una condición
declarada y se nombra la nueva comprobación; de lo contrario devuelve `blocked` o
`unverified` en vez de reintentar indefinidamente.
No conviertas un campo ausente en un valor predeterminado inventado cuando cambie
el riesgo o el alcance.

## Salida fija

Devuelve exactamente:

1. `protocol_status` (`ready_to_execute` o `blocked_on`)
2. `goal`
3. `background`
4. `inputs_and_unknowns`
5. `constraints`
6. `allowed_actions_and_permissions` — registros de acción separados con estado,
   objetivo, riesgo, exposición de datos y requisito de confirmación
7. `acceptance_evidence`
8. `failure_handling`
9. `delivery_format`
10. `handoff`
11. `risk`
12. `owner_and_confirmation` — responsable exacto de la decisión, punto de
    confirmación y acciones no confirmadas
13. `checkpoint_and_rollback` — artefacto observable, objetivo de restauración y
    decisión de recuperación
14. `content_status`

## Evidencia y estados

El protocolo es `draft` hasta que estén presentes todos los campos, `candidate`
cuando el contrato supera una comprobación local de integridad pero aún no se ha
ejercitado, `verified` solo después de observar la evidencia de aceptación indicada
y `production-ready` únicamente después de superar las compuertas de producción,
rollback, mantenimiento y propiedad. Verifica el protocolo cotejando los campos
obligatorios con la compuerta de riesgo, comparando cada acción con el objetivo y
el estado de permisos exactos, y siguiendo cada afirmación de aceptación hasta
una comprobación observable. En `R2` y `R3`, verifica por separado el punto de
confirmación, el checkpoint, el rollback y el registro de exposición de datos.
No marques la tarea como completa por el mero hecho de que el protocolo esté
listo.

## Registro de mantenimiento

- `source`: `CONTEXT.md`; `docs/charter.md`; `docs/quality/skill-quality-standard.md`
- `license`: reescritura original; el material externo sigue siendo de referencia
  según `docs/sources/asset-register.md`
- `owner`: task-systems maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
