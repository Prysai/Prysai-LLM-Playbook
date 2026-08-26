<!-- content_id: lab-014-resume-reconciliation | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-014-resume-reconciliation
title: "Conciliar una tarea reanudada antes de continuar"
level: L3
domain: general
goal: "Conciliar puntero de tarea, destino, rama, permisos y efectos antes de seguir"
setup: "Carpeta o repositorio local desechable con checkpoint y dos archivos de texto; sin credenciales, red, producción ni comandos irreversibles"
task: "Registrar estado vivo, compararlo con checkpoint, clasificar cada campo y continuar solo cuando objetivo, destino, permiso y efectos coincidan"
evidence: ["Checkpoint, observaciones, comandos, salidas, diff, tabla de clasificación y decisión", "Registro de campos coincidentes, cambiados y no observados"]
failure_variant: "Hacer coincidir nombre de tarea, pero no raíz del repositorio o archivo objetivo; detenerse antes de editar"
reflection: "¿Qué campo fue más fácil suponer y qué observación cambió la decisión de continuar o parar?"
status: draft
last_verified: "not run"
transfer_task: "Aplicar el sobre de conciliación a navegador o MCP sin escritura remota"
transfer_domain: "navegador, investigación, ingeniería o traspaso de contenido"
transfer_evidence: "Solicitud anterior, destino, aprobación, riesgo de estado remoto y nuevo checkpoint"
transfer_limitations: "El fixture desechable no prueba continuidad de cuenta, recurso remoto ni tarea de producción"
---

# Lab 014: conciliar una tarea reanudada antes de continuar

## Por qué existe este Lab

Los informes públicos de campo describen agentes que vuelven a una tarea
antigua después de una compactación del contexto, una interrupción de capacidad
o una reanudación. Un prompt nuevo puede hacer que la ejecución parezca activa
aunque el puntero de la tarea, el árbol de trabajo o el estado de los efectos
externos siga siendo incierto. Este Lab enseña a conciliar el estado antes de
continuar.

## Preparación

Usa una copia temporal de un repositorio pequeño o una carpeta con dos archivos
de texto. Crea un checkpoint que nombre el objetivo, la ruta de destino, la
rama, la última acción completada, la acción pendiente, el estado de los
permisos y la evidencia disponible. Simula una interrupción iniciando una
segunda tarea o sustituyendo el checkpoint por una copia antigua. No uses
credenciales, red, archivos de producción ni comandos irreversibles.

## Tarea

1. Registra el directorio de trabajo actual, la raíz del repositorio, la rama,
   el archivo de destino, su hash o fecha de modificación y el diff actual.
2. Compara esas observaciones con el checkpoint.
3. Clasifica cada campo como `matched`, `changed` o `not_observed`.
4. Continúa solo si el objetivo, el destino, el permiso y el estado de los
   efectos externos están conciliados. Si no, crea un checkpoint nuevo y
   detente.

## Evidencia

Conserva el checkpoint, los comandos y sus salidas, el diff, la tabla de
clasificación y una decisión breve. Un registro de práctica satisfactorio solo
demuestra que seguiste el procedimiento de conciliación en el fixture temporal.

## Variante de fallo

Haz que coincida el nombre visible de la tarea, pero cambia la raíz del
repositorio o el archivo de destino. El resultado correcto es detenerse antes
de editar e identificar el primer campo que no se pudo conciliar. No corrijas el
checkout equivocado solo porque permite escribir.

## Transferencia

Aplica el mismo marco a una sesión de navegador o MCP: identifica la última
solicitud confirmada, la cuenta o el recurso de destino, el estado de la
aprobación y si una llamada anterior pudo haber cambiado el estado remoto.

## Lista de aceptación

- [ ] Capturé la ruta, el repositorio, la rama, el destino y el diff reales.
- [ ] Comparé el estado vivo con un checkpoint identificado.
- [ ] Separé `changed` de `not_observed`.
- [ ] Me detuve cuando el destino o el estado de los efectos era incierto.
- [ ] No traté un prompt reanudado como prueba de continuidad.

## Reflexión

Anota qué campo era más fácil dar por supuesto, qué observación cambió la
decisión y qué parte sigue siendo `not_observed`.

## Fuentes

- [Problemas de campo y patrones de prompts — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-01 a FP2-04 y FP2-08.
- [Capítulo 10: planificación y cortes verticales](../chapters/10-planning-and-slicing-ES.md).
- [Capítulo 12: bucle, estado y condiciones de parada del Agent](../chapters/12-agent-loop-and-stop-ES.md).

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-ES.md">← Anterior<br><strong>Lab 013 · corte vertical auditable</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-015-evidence-delivery-ES.md">Siguiente →<br><strong>Lab 015 · entrega con evidencia</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
