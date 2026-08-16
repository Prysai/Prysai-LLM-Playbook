<!-- content_id: lab-012-team-capability-migration | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-012-team-capability-migration
title: "Convertir un método personal en capacidad de equipo"
level: L6
domain: team
goal: "Empaquetar un método para que dos personas puedan reproducirlo, revisarlo, actualizarlo y revertirlo"
setup: "Una tarea ficticia de informe semanal, dos roles anónimos y ningún sistema real de organización"
task: "Crear v0.1, hacer dos reproducciones con contexto nuevo, cambiar un requisito en v0.2 y revisar impacto y rollback"
evidence: ["Dos versiones con responsable, permisos y aceptación", "Dos registros independientes con hashes, salidas y puntuaciones", "Diff, matriz de impacto, resultado de rollback y lista de incógnitas"]
failure_variant: "Quitar responsable, fuente de entrada, límite de permiso o regla de aceptación; o cambiar audiencia sin cambiar aceptación"
reflection: "¿Qué conocimiento vivía solo en la memoria de una persona y qué haría inseguro heredar el paquete?"
status: draft
last_verified: "not run"
transfer_task: "Aplicar el formato a un flujo de ingeniería, investigación o contenido de bajo riesgo"
transfer_domain: "ingeniería, investigación u operaciones de contenido en equipo"
transfer_evidence: "Conservar versiones, matriz de permisos, ejecuciones independientes, diff, impacto, rollback y notas de revisión"
transfer_limitations: "Una simulación estática no prueba acceso de cuenta, integración de producción ni adopción organizativa"
---

# Lab 012: convertir un método personal en capacidad de equipo

## Objetivo

Sustituye intuición privada e historial de chat por un contrato versionado que otra persona pueda ejecutar con seguridad.

## Preparación

Usa una tarea ficticia de informe semanal y dos roles anónimos. No uses cuentas, nombres, datos de clientes, métricas internas, sistemas compartidos ni repositorios de producción. Crea `v0.1` con propósito y no objetivos, responsable y cadencia de revisión, esquema de entrada y salida, matriz de permisos y acciones prohibidas, procedimiento y paradas, ejemplos positivo/de límite/de fallo, aceptación y rollback.

## Reproducción independiente

A y B reciben el mismo paquete en contextos nuevos y no pueden consultar el historial del autor. Cada persona guarda hash de entrada, `run_id`, decisiones, salida, incertidumbres y puntuación. Compara sin reconciliar diferencias en silencio. Cambia un requisito real para crear `v0.2`; registra diff, consumidores afectados, decisión de migración, afirmación de compatibilidad y prueba de rollback.

## Fallo, aceptación y transferencia

Quita responsable, fuente de entrada, límite de permiso o regla de aceptación. La respuesta correcta es detener la migración y registrar el contrato ausente. Repite cambiando la audiencia de `v0.2` sin cambiar la aceptación: el revisor debe rechazar compatibilidad o pedir nueva evidencia.

- [ ] Dos personas reprodujeron desde contexto nuevo.
- [ ] Entrada, salida, permisos y responsable están explícitos.
- [ ] Las diferencias se explican, no se promedian.
- [ ] El cambio de versión tiene impacto y rollback.
- [ ] No se usó cuenta, producción ni información confidencial.

Conserva ambas versiones, hashes, permisos, registros, notas, diff, matriz, rollback e incógnitas. Hasta que existan, la capacidad L6 no está demostrada. Aplícala después a un flujo local de bajo riesgo y pregunta qué parte era memoria de una sola persona y qué sería inseguro heredar en seis meses.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-011-gpt-codex-boundaries-ES.md">← Anterior<br><strong>Lab 011 · separar GPT, Codex, herramientas y Agents</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-ES.md">Siguiente pendiente →<br><strong>Ver disponibilidad del Lab 013</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
