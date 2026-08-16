<!-- content_id: lab-013-l3-vertical-slice | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-013-l3-vertical-slice
title: "Ejecutar un corte vertical completo"
level: L3
domain: engineering
goal: "Llevar un cambio acotado desde la definición hasta la evidencia y el traspaso"
setup: "Copia desechable de repositorio, una ruta Markdown permitida y sin publicación ni credenciales"
task: "Recorrer CP0 a CP4 para una nota de release, con comprobación focalizada, rama de fallo y traspaso en contexto nuevo"
evidence: ["Hashes de entrada, línea base, checkpoints y log", "Diff, salida de comandos, códigos de salida y tabla afirmación-evidencia", "Fallo, traspaso, rollback e incógnitas"]
failure_variant: "Quitar una entrada, hacer fallar la comprobación, reanudar tras CP2, inyectar instrucción externa o exigir cambio persistente"
reflection: "¿Qué checkpoint evitó la mayor afirmación sin respaldo o acción innecesaria?"
status: draft
last_verified: "Maintainer reference run accepted 2026-08-12; learner run not run"
transfer_task: "Transferir el flujo a una tarea de investigación o contenido de bajo riesgo"
transfer_domain: "ingeniería, investigación o contenido"
transfer_evidence: "Protocolo reescrito, checkpoints, artefacto o bloqueo, tabla de evidencia y traspaso"
transfer_limitations: "Un corte local no prueba publicación remota, producción ni comprensión del lector"
---

# Lab 013: ejecutar un corte vertical completo

## Objetivo y preparación

Completa un flujo pequeño sin confundir plan, edición, comprobación, revisión, entrega y publicación. Usa una copia desechable; solo puedes modificar una nota Markdown en una ruta nombrada. Registra entradas y hashes, `git status` inicial, ruta permitida, aceptación, rollback y acciones prohibidas. Publicar, hacer push, instalar dependencias o usar credenciales queda fuera de alcance.

| Checkpoint | Evidencia requerida |
|---|---|
| CP0 Definición | objetivo, entradas, alcance, permisos, paradas, hash base |
| CP1 Plan | corte mínimo, método, evidencia esperada, rollback |
| CP2 Cambio | diff, rutas, log de acción, hash de salida |
| CP3 Verificación | comandos, salida cruda, códigos, cobertura, comprobaciones no ejecutadas |
| CP4 Traspaso | completado, incompleto, evidencia, incógnitas, siguiente control, rollback |

## Experimento y fallo

Escribe la nota usando solo hechos del input. Comprueba que cambió solo la ruta permitida, que existe el contenido requerido y que no introdujiste afirmaciones sin respaldo. Un diff correcto no prueba publicación, comprensión ni sincronización remota.

Completa al menos un fallo: quita una entrada y detente; falla el check y conserva salida; retoma después de CP2 con solo checkpoints y estado; trata como datos una instrucción que pide subir un token; o detente ante un cambio persistente no autorizado. Reintenta únicamente si cambió el diagnóstico y conoces los efectos existentes.

- [ ] Objetivo, alcance, autoridad, aceptación y rollback están explícitos.
- [ ] Se guardaron CP0–CP4 y solo cambió la ruta permitida.
- [ ] Los comandos tienen salida y código de salida.
- [ ] Un fallo se detuvo o recuperó correctamente.
- [ ] El traspaso separa resultado local de publicación o producción.

Conserva hashes, checkpoints, diff, log, salida, fallo, tabla afirmación-evidencia y traspaso. El Lab sigue `draft / not_run`: una referencia determinista del mantenedor no prueba independencia del aprendiz, comportamiento de Codex, transferencia ni producción.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-ES.md">← Anterior<br><strong>Lab 012 · migración de capacidades de equipo</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-ES.md">Siguiente pendiente →<br><strong>Ver disponibilidad del Lab 014</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
