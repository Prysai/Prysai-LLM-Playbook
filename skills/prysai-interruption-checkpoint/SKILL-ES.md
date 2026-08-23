<!-- content_id: prysai-interruption-checkpoint | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# Punto de control tras una interrupción

Ocúpate del primer minuto seguro después de una interrupción. Conserva lo que
se puede ver, deja como `unknown` lo que no se puede ver y detente antes de que
una acción nueva convierta una tarea poco clara en una historia imposible de
revisar.

## Enruta solo la interrupción

Usa este Skill cuando una tarea pueda estar incompleta y una interrupción
visible deje poco clara la siguiente acción. Ejemplos: mensaje de modelo no
disponible, tiempo agotado, sesión perdida, herramienta ausente o derivación
desconectada.

Deriva en cambio cuando:

- una petición, respuesta y resultado esperado conservados necesitan reparar la comunicación: Communication Failure Triage;
- una afirmación de finalización, fiabilidad o publicación necesita revisión de evidencia: Evidence Review;
- un hecho actual de una plataforma nombrada necesita comprobación: Source Investigator;
- una tarea nueva o modificada necesita contrato de acción y permisos: Task Protocol.

No diagnostiques al proveedor, infieras una causa raíz, compares modelos,
expliques el estado de una cuenta ni crees un procedimiento general de
recuperación a partir de una sola interrupción.

## Conserva el paquete mínimo de evidencia

Recoge solo lo que la persona solicitante ya puede observar:

1. `goal`: resultado previsto en una frase;
2. `observed_event`: interrupción visible, sin afirmar su causa;
3. `last_inspectable_artifact`: diff, resultado de prueba, vista de archivo, nota o `none_observed`;
4. `acceptance_evidence`: comprobación que demostraría la finalización, o `unknown`; y
5. `external_actions`: todo lo enviado, cambiado, cargado, gastado, confirmado o publicado, o `not_observed`.

Nunca rellenes un campo ausente con una explicación plausible. No pidas
secretos, tokens, contraseñas, cookies, registros privados, capturas de una
cuenta ni contexto ajeno a la tarea.

## Clasifica sin cerrar la historia

Usa un solo estado:

- `complete` solo cuando la evidencia de aceptación declarada ya sea inspeccionable;
- `partial` cuando exista un artefacto visible pero no demuestre la comprobación de aceptación; o
- `unknown` cuando falte el artefacto, su significado o la evidencia de aceptación.

Un mensaje de interrupción no es un diagnóstico ni evidencia de la tarea. Un
prompt nuevo no hereda pruebas de finalización de una tarea anterior.

## Elige una sola decisión acotada

El valor predeterminado es `hold` en `R0`: conserva el comprobante y no hagas
nada.

Ofrece `inspect_local` en `R1` solo si la persona nombra un objetivo local,
reversible, una observación exacta y el hecho de que la inspección no puede
demostrar por sí sola que la tarea anterior terminó. Este Skill registra la
decisión; no ejecuta la inspección.

Para una tarea nueva, reintento, herramienta, cambio de modelo, ajuste,
inspección de cuenta, solicitud de red, carga, gasto, commit, push,
publicación o despliegue, detente y deriva a Task Protocol. Allí deben
establecerse por separado el permiso, el punto de control, la reversión y la
aceptación.

## Condiciones de parada

Devuelve `blocked` cuando falten el objetivo, el último artefacto
inspeccionable, el significado de aceptación o la autoridad para el siguiente
efecto externo. Nunca:

- reintentes automáticamente ni envíes «continúa donde lo dejaste»;
- cambies de modelo, cuenta, plan, configuración o proveedor;
- trates un informe de fuente como causa de la interrupción;
- inspecciones una cuenta o servicio externo; ni
- declares completa una tarea por un artefacto parcial o una respuesta tranquilizadora.

## Entrega el comprobante

Devuelve exactamente:

```text
checkpoint_status: ready_for_one_bounded_next_decision | blocked_on_<field>
goal:
observed_event:
last_inspectable_artifact:
acceptance_evidence:
state_classification: complete | partial | unknown
knowns:
unknowns:
external_actions:
next_decision: hold | inspect_local | handoff
handoff:
risk_and_permission_boundary:
```

Acepta el comprobante solo cuando conserve `unknown` de forma explícita,
separe la interrupción de la finalización, no nombre una acción externa no
aprobada y asigne como máximo una decisión siguiente. Es un método candidato,
no evidencia de que la tarea pueda recuperarse, un servicio esté disponible o
la persona pueda usarlo correctamente.

## Registro de mantenimiento

- `source`: método original de Prysai Lab derivado del caso de interrupción acotado por fuentes, Task Protocol y los límites de Evidence Review
- `license`: reescritura original; el informe público de capacidad y la documentación de API siguen siendo solo de referencia según `docs/sources/asset-register.md`
- `owner`: reliability-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
