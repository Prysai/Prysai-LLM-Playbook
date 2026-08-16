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

## Por qué importa

Tras una interrupción, una nueva instrucción puede hacer parecer activa una tarea aunque el destino, el worktree o un efecto anterior sigan siendo inciertos. Antes de continuar, concilia el estado; no tomes una conversación reanudada como prueba de continuidad.

## Preparación y tarea

Usa una copia desechable con dos archivos de texto. Crea un checkpoint con objetivo, ruta destino, rama, última acción, acción pendiente, permisos y evidencia. Simula interrupción creando una segunda tarea o sustituyendo el checkpoint por uno antiguo. No uses credenciales, red, producción ni comandos irreversibles.

1. Registra directorio actual, raíz de repositorio, rama, archivo objetivo, hash o fecha de modificación y diff.
2. Compáralos con el checkpoint.
3. Marca cada campo como `matched`, `changed` o `not_observed`.
4. Continúa solo si objetivo, destino, permiso y estado de efectos están conciliados. Si no, crea checkpoint nuevo y detente.

## Fallo, evidencia y aceptación

Haz coincidir el nombre visible de tarea pero cambia raíz o archivo objetivo. Detente antes de editar e identifica el primer campo sin conciliar. No arregles el checkout equivocado solo porque permite escribir. Conserva checkpoint, comandos, salidas, diff, tabla y decisión breve.

- [ ] Capturé ruta, repositorio, rama, objetivo y diff reales.
- [ ] Comparé estado vivo y checkpoint nombrado.
- [ ] Separé cambiado de no observado.
- [ ] Me detuve si destino o efecto eran inciertos.
- [ ] No llamé a un prompt reanudado prueba de continuidad.

Transfiere el sobre a navegador o MCP sin escribir: identifica solicitud confirmada, cuenta o recurso, aprobación y riesgo de que una llamada previa haya cambiado el estado remoto. El Lab sigue `draft / not_run`; el fixture no prueba continuidad real.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-013-l3-vertical-slice-ES.md">← Anterior<br><strong>Lab 013 · corte vertical auditable</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-ES.md">Siguiente pendiente →<br><strong>Ver disponibilidad del Lab 015</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
