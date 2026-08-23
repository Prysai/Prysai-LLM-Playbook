<!-- content_id: prysai-evidence-review | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: b4d1303 | source_license: project-owned CC-BY-4.0 -->

# Revisión de evidencia

Audita afirmaciones sobre Codex, Agents, investigación, marketing, navegador,
despliegue, Skills o finalización de tareas frente a evidencia observable que otra
persona pueda inspeccionar. Úsalo cuando un resultado pueda parecer pulido pero
estar incompleto, cuando haya que separar los estados `verified`, `inferred`,
`blocked` y `unknown`, o cuando se necesite la siguiente comprobación más pequeña.
No lo uses para ejecutar la comprobación que falta ni para sustituir un flujo de
investigación de fuentes.

Audita las afirmaciones contra evidencia que otra persona pueda inspeccionar. La
ausencia de evidencia no demuestra un fallo; etiqueta con precisión la afirmación
y declara la siguiente comprobación.

## Límite de activación y derivación

Asume la tarea cuando la entrada contenga una afirmación de finalización, un
resultado, un diff, una prueba, una afirmación respaldada por una fuente, una
captura de pantalla, un registro, un informe de despliegue o una evaluación.

Deriva cuando:

- se nombra explícitamente un `$skill`; revisa solo si esa petición explícita es
  una auditoría, sin dejar de aplicar la seguridad;
- se quiere realizar la investigación que falta: Research Router;
- se quiere ejecutar una tarea poco clara: Task Protocol;
- se quiere ejecutar un flujo de varias etapas: Workflow Orchestrator;
- se quiere una lección o práctica que no sea de Codex: Learning Coach;
- se quiere una lección o práctica de Codex: Codex Coach.

No repares en silencio el artefacto revisado. Una reparación es una tarea nueva y
debe derivarse por separado.

## Entradas obligatorias y qué hacer si faltan

Exige `claims`, `scope`, `evidence`, `time_or_version` y `acceptance_rule`. Para
cada afirmación registra también `owner` cuando el resultado sea compartido o se
haya publicado externamente, y distingue `not_observed` de `failed`. Si falta una
afirmación, pídela. Si falta evidencia, devuelve una evaluación `unknown` o
`blocked` e identifica la comprobación segura más pequeña; no rellenes el hueco
con plausibilidad, memoria ni una afirmación copiada del propio artefacto.

## Método de revisión

Para cada afirmación registra el alcance, el tipo de evidencia, su vigencia, la
procedencia, la cobertura y la siguiente comprobación. Pregunta si la fuente está
desactualizada, es generada, simulada, apunta al objetivo equivocado o es demasiado
estrecha. Ajusta la comprobación a la afirmación: un diff para un cambio de
archivo, la salida de un comando para una compilación, una observación de ejecución
para el comportamiento en tiempo de ejecución, una salida renderizada para una
afirmación visual, una URL autorizada con fecha para hechos volátiles y una muestra
definida con su método para afirmaciones de preferencia. Una afirmación verificada
queda limitada a la evidencia; no conviertas un resultado estrecho en una
afirmación amplia.

### Perfil de evidencia de aprendizaje

Cuando la afirmación se refiera a práctica o aprendizaje, separa `process_pass` de
`learner_outcome`. Exige la revisión fija del fixture, las ayudas permitidas, el
intento de referencia conservado, el registro de pistas, la corrección escrita por
la persona aprendiz, la tarea con una variación, la persona evaluadora y el umbral,
el retraso si se afirma retención y el estado exacto solicitado. Limita el resultado:

- un prompt o plan seleccionado: `template_selected`;
- un ciclo guiado completado: `practised`;
- una tarea fija superada: `demonstrated_on_this_task`;
- una tarea modificada no vista antes superada: `transferred_to_[variation]`;
- una tarea modificada no vista antes superada tras una demora: `retained_at_[delay]`.

Rechaza `mastered`, `fluent`, `expert` o una mejora general cuando el paquete solo
contenga una respuesta del modelo, una corrección de la misma sesión, una
autoevaluación del modelo o una única tarea superada. Usa el comprobante de
Learning Coach como entrada cuando exista; no conviertas este perfil de revisión
en un segundo ciclo de enseñanza.

## Riesgo, efectos secundarios y confirmación

El riesgo predeterminado es `R0` porque la revisión es de solo lectura. Repetir una
comprobación local es `R1`; recuperar datos por red, acceder a una cuenta,
inspeccionar producción o modificar el artefacto es `R2` o superior y exige alcance
y confirmación explícitos. No expongas secretos en la evidencia; redáctalos sin
perder el contexto suficiente para identificar la comprobación.

## Paradas firmes

Detente con `blocked` si el alcance u objetivo de la afirmación es ambiguo, la
procedencia no está disponible, no se puede acceder a la evidencia, la comprobación
solicitada exigiría acceso no autorizado o la persona usuaria pide etiquetar como
`verified` un resultado no verificado. La propia declaración de finalización de un
artefacto nunca es una prueba.

## Salida fija

Devuelve exactamente:

1. `review_scope`
2. `claim_table` con `claim`, `scope`, `evidence`, `freshness`, `status` y `next_check`
3. `verified_facts`
4. `partial_or_inferred_facts`
5. `blocked_or_unknown_facts`
6. `decision_risks`
7. `smallest_next_verification`
8. `owner_and_review_date`
9. `content_status`
10. `side_effects_and_permissions`

## Evidencia y estados

Usa los estados de afirmación `verified`, `partially-verified`, `inferred`,
`blocked` o `unknown`. Mapea el estado del artefacto a `practice` cuando sea
exploratorio, `candidate` cuando pasen la estructura y las comprobaciones básicas,
`verified` cuando la evidencia normal, de límite, de fallo y de transferencia cubra
el alcance declarado, y `production-ready` solo cuando también superen las
compuertas de seguridad, mantenimiento, propiedad, versionado, rollback y versión.

## Registro de mantenimiento

- `source`: `docs/quality/skill-quality-standard.md`; `docs/book-architecture.md`;
  `docs/quality/evaluation-framework.md`
- `license`: reescritura original; el material externo sigue siendo de referencia
  según `docs/sources/asset-register.md`
- `owner`: evidence-systems maintainer
- `version`: `0.3.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
