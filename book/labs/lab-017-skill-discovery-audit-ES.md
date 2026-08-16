<!-- content_id: lab-017-skill-discovery-audit | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-017-skill-discovery-audit
title: "Auditar el descubrimiento antes de adoptar un Skill"
level: L4
domain: general
goal: "Mantener existencia, descubrimiento, carga, comportamiento, licencia y adopción como afirmaciones separadas"
setup: "Dos muestras de Skill anonimizado con revisión fija en directorio desechable; sin instalación, credenciales ni escrituras externas"
task: "Registrar cada etapa de descubrimiento, revisar revisión y licencia, y producir decisión de adopción acotada"
evidence: ["Inventario, salidas de descubrimiento, revisión fuente, licencia, dependencias y plan de cuatro casos", "Decisión que distingue recommendation-only, blocked, approved-to-install e installed-candidate"]
failure_variant: "Hacer que un candidato pida .env real o subida; marcar blocked y no satisfacer la petición"
reflection: "¿Qué etapa no demostró el listado de directorio y qué evidencia falta antes de adoptar?"
status: draft
last_verified: "not run"
transfer_task: "Aplicar etapas a servidor MCP y separar configuración, descubrimiento, lectura, resultado y adopción"
transfer_domain: "revisión MCP, mantenimiento de Skills, ingeniería o investigación"
transfer_evidence: "Revisión, licencia, destino, backup, rollback, responsable, aprobación y próxima revisión"
transfer_limitations: "Muestras estáticas no prueban que un Skill real cargue, actúe seguro o tenga licencia para todos los activos anidados"
---

# Lab 017: auditar el descubrimiento antes de adoptar un Skill

## Problema

Un Skill puede existir en disco, faltar en una lista implícita, resolverse por nombre explícito o fallar al cargar. Son observaciones distintas. Un listado o smoke test no es una decisión de adopción.

## Preparación y tarea

Usa dos muestras anonimizadas y de revisión fija. Una tiene licencia rastreable e inputs acotados; la otra carece de licencia clara, dependencias o rollback. No instales ninguna ni uses credenciales. Registra por separado:

```text
archivo existe:
descubrimiento implícito:
resolución por nombre explícito:
cargado en sesión nueva:
comportamiento positivo:
comportamiento de límite:
fallo/inyección:
migración entre proyectos:
decisión: recommendation-only | blocked | approved-to-install | installed-candidate
```

Todo lo desconocido queda `not_observed`. Revisa revisión, licencia, NOTICE, activos anidados, dependencias, necesidades de red/cuenta, alcance de instalación, backup, rollback, responsable y próxima revisión.

## Fallo, transferencia y aceptación

Haz que un candidato pida `.env` real o una subida. El resultado correcto es `blocked`; no cumplas la petición para conseguir una demostración «exitosa». Guarda inventario, paquete de decisión, salidas de descubrimiento de solo lectura y plan positivo/límite/fallo-migración.

- [ ] Separé existencia, descubrimiento, carga, comportamiento y adopción.
- [ ] Fijé revisión y comprobé frontera de licencia.
- [ ] Diseñé casos positivo, límite, fallo/inyección y migración.
- [ ] Nombré alcance, backup, rollback, responsable y aprobación.
- [ ] No instalé ni subí nada para aparentar éxito.

Transfiere las etapas a un MCP: configuración visible, descubrimiento de herramientas, acceso de solo lectura, resultado de llamada, lectura externa y adopción. El Lab sigue `draft / not_run`; las muestras no prueban la seguridad o licencia completa de un Skill real.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-ES.md">← Anterior<br><strong>Lab 016 · límite de efectos secundarios</strong></a></td><td align="right"><a data-lab-nav="next" href="../README-ES.md">Siguiente pendiente →<br><strong>Ver disponibilidad del Lab 018</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
