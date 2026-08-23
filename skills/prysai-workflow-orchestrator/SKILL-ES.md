<!-- content_id: prysai-workflow-orchestrator | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# Orquestador de flujos de trabajo

Mantén un ciclo de vida finito y auditable. Este Skill coordina etapas; no
concede permisos, no sustituye el criterio de dominio y no declara terminada
una etapa que no haya verificado.

## Límite de activación y derivación

Asume la tarea cuando el trabajo tiene al menos dos etapas dependientes o
necesita puntos de control, recuperación, varios artefactos o coordinación
entre dominios.

Deriva cuando:

- se nombra explícitamente un `$skill` para una subtarea acotada; regístralo
  como una etapa y conserva su alcance;
- la petición es una sola acción poco clara: primero Task Protocol;
- se trata solo de enseñar: Codex Coach;
- se trata solo de revisar evidencia: Evidence Review;
- se trata solo de descubrir o sintetizar fuentes: Research Router;
- se trata solo de elegir Skills: Skill Selector;
- se trata solo de crear un contexto compartido de posicionamiento: Product Context.

El único bucle interno permitido es `orchestrator -> task protocol -> one
domain route -> evidence review -> orchestrator checkpoint`. No llames al
orquestador desde una etapa ni reinicies una etapa terminada sin un hallazgo
nuevo o un cambio de alcance.

## Entradas necesarias y qué hacer si falta algo

Exige `outcome`, `non_goals`, `stages`, `dependencies`, `allowed_actions`,
`acceptance_evidence`, `checkpoints`, `rollback` y `owner`. Si las etapas o sus
dependencias no están claras, devuelve un plan propuesto con campos
`blocked_on`. El contrato también debe nombrar un `decision_owner`, un
`delivery_target` exacto y el significado de cualquier paso `commit`: un
commit local, un push, un pull request y una publicación son acciones
distintas y tienen compuertas de confirmación distintas. Haz solo la pregunta
más pequeña que cambie la ruta o el riesgo.

Antes de marcar una etapa como `in-progress`, registra para ella:

```yaml
owner: "rol o responsable designado"
input_and_action: "entrada fija y acción permitida"
exit_evidence: "archivo, registro, comando, revisión o URL observable"
checkpoint: "quién puede aprobar la siguiente etapa y qué se comprueba"
rollback: "diff, copia, rama o destino exacto que se restaurará"
risk: "R0 | R1 | R2 | R3"
confirmation: "required | not_required; indicar el punto de decisión"
```

La falta de `delivery_target`, responsable, evidencia de aceptación o
reversión bloquea la ejecución; no es permiso para adivinar el destino.

## Ciclo de vida y puntos de control

1. Define el resultado, los usuarios, los objetivos excluidos, los riesgos y la aceptación.
2. Crea o valida una vez el protocolo de tarea.
3. Divide el trabajo en etapas verticales, reversibles, con responsable y evidencia.
4. Ejecuta una etapa a la vez y conserva los diffs, registros e identificadores de ejecución.
5. Verifica cada afirmación con la evidencia adecuada: prueba, ejecución, revisión, navegador, seguridad o fuente.
6. Revisa alcance, supuestos, mantenibilidad y rutas de fallo.
7. Entrega por separado lo completo, incompleto, inferido y bloqueado, además del siguiente paso.
8. Registra mantenimiento, actualización de fuentes, migración y reversión.

El destino de entrega forma parte del grafo de etapas. Un commit local, un
push a una rama compartida, un pull request y una publicación deben figurar
como etapas separadas cuando se solicite más de una de esas acciones.

## Riesgo, efectos secundarios y confirmación

Clasifica cada etapa como `R0` (solo lectura), `R1` (local y reversible), `R2`
(compartida o externa) o `R3` (producción, irreversible o con secretos). Pausa
justo antes de ampliar permisos, acceder a un secreto, enviar un mensaje
externo, hacer commit/push/publicar, cambiar producción o realizar una acción
irreversible. La persona usuaria debe confirmar la etapa exacta, el destino y
el efecto secundario; la orquestación no hereda la aprobación de una petición
anterior sin relación.

## Paradas firmes y recuperación

Detente con `blocked` si no están resueltos el responsable, la aceptación, el
destino seguro, una instrucción en conflicto, la reversión o la evidencia, o si
el mismo fallo se repite sin una hipótesis nueva. Conserva el fallo, reduce el
alcance, haz un cambio respaldado por evidencia y vuelve a ejecutar solo la
comprobación pertinente. Nunca amplíes permisos ni reintentes sin límite.

## Salida fija

Devuelve exactamente:

1. `outcome_and_scope`
2. `stage_graph_and_current_stage`
3. `checkpoint_log`
4. `actions_and_permissions`
5. `evidence_by_stage`
6. `failures_recovery_and_rollback`
7. `completed_incomplete_inferred_blocked`
8. `handoffs`
9. `risks_and_unknowns`
10. `content_status`

## Evidencia y correspondencia de estados

Usa para las etapas los estados `not-started`, `in-progress`, `blocked`,
`verified` o `accepted`. Usa `practice` para la exploración general,
`candidate` cuando el flujo esté estructurado y pase las comprobaciones
básicas, `verified` cuando todas las etapas y casos límite declarados tengan
evidencia, y `production-ready` solo después de superar las compuertas de
publicación, seguridad, propiedad, mantenimiento y reversión.

## Registro de mantenimiento

- `source`: `docs/book-architecture.md`; `docs/charter.md`; `docs/quality/skill-quality-standard.md`
- `license`: reescritura original; el material externo sigue siendo solo de referencia según `docs/sources/asset-register.md`
- `owner`: workflow-systems maintainer
- `version`: `0.2.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
