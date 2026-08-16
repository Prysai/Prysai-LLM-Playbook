<!-- content_id: lab-004-skill-selection | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-004-skill-selection
title: "Elegir la capacidad mínima útil"
level: L4
domain: general
goal: "Elegir un Skill o una herramienta según la tarea, el riesgo, la licencia y el coste de verificación"
setup: "Una tarea local de bajo riesgo y candidatos de capacidad con revisión fija"
task: "Comparar protocolo solo, protocolo más Skill y protocolo más Skill más herramienta sin instalar ni autenticar"
evidence:
  - "Tres registros de enfoque con ajuste a la tarea, dependencias, permisos y coste de verificación"
  - "Notas sobre fuente, revisión, licencia, activos anidados y reversión de cada candidato"
  - "Una decisión solo de recomendación y una decisión bloqueada"
failure_variant: "Elegir un candidato visible con licencia o reversión poco claras y añadir capacidades irrelevantes a una tarea sencilla"
reflection: "¿Qué capacidad se ganó su lugar? ¿Qué dependencia añadió más coste de mantenimiento? ¿Qué se puede quitar?"
status: draft
last_verified: "Not run"
transfer_task: "Repetir la comparación con una tarea de investigación o contenido de bajo riesgo"
transfer_domain: "investigación, ingeniería, marketing o documentación"
transfer_evidence: "Conservar la brecha de tarea, la tabla comparativa, los registros de adopción y los comentarios de revisión"
transfer_limitations: "Una comparación solo de recomendación no prueba instalación, comportamiento en ejecución ni valor de mantenimiento a largo plazo"
---

# Lab 004: Elegir la capacidad mínima útil

## Objetivo de aprendizaje

Elegir una capacidad porque resuelve una brecha concreta de la tarea, no porque
sea popular, abundante o fácil de instalar.

## Preparación

Elige una tarea local y de bajo riesgo. Después compara tres maneras de
abordarla:

1. solo un protocolo de tarea escrito;
2. el protocolo más un Skill relevante;
3. el protocolo, un Skill y una herramienta o conector externo.

Fija la revisión de cada candidato. Anota fuente, licencia, dependencias,
alcance de instalación previsto, permisos, efectos secundarios, responsable,
fecha de revisión y reversión. No instales ni te autentiques salvo que una tarea
posterior lo autorice de forma expresa.

## Registro de decisión

Para cada candidato crea un registro breve:

```text
task_gap:
trigger / non_trigger:
source / revision:
license / notice / nested_assets:
dependencies / permissions / side_effects:
isolated_trial:
rollback / recovery_check:
positive / boundary / failure / transfer tests:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unknowns / unblock_conditions:
```

En este Lab la decisión por defecto es `recommendation-only` o `blocked`.
Descubrir, instalar, cargar, invocar, observar un efecto y verificar un
resultado son estados distintos: regístralos por separado.

## Caso de fallo

Escoge un candidato cuya carpeta exista, pero cuya licencia, activos anidados,
revisión fija o procedimiento de reversión no estén claros. La decisión correcta
es `blocked`. Que se pueda encontrar no significa que exista permiso para usarlo;
que esté instalado tampoco demuestra su comportamiento.

Después añade varias capacidades irrelevantes a una tarea de texto sencilla.
Rechaza cualquier capacidad cuyo coste de permisos, dependencias o verificación
supere el valor específico que aporta a la tarea.

## Lista de aceptación

- [ ] La brecha de la tarea está escrita antes de comparar candidatos.
- [ ] Al menos un candidato se rechaza con una razón concreta.
- [ ] La incertidumbre sobre licencia y activos anidados queda visible.
- [ ] Los permisos y efectos externos no superan lo que la tarea necesita.
- [ ] Instalación y comportamiento no se tratan como el mismo estado.
- [ ] Una persona mantenedora puede seguir la reversión sin depender del historial de chat.

## Evidencia que conservar

Conserva la entrada de tarea sin modificar, los tres registros de enfoque, los
identificadores de revisión, las notas de licencia, la tabla de decisión y los
comentarios de revisión. Este Lab no demuestra que un Skill externo se haya
instalado ni que funcione de forma fiable.

## Reflexión y transferencia

Repite la comparación con una tarea de investigación o contenido. ¿Qué nueva
dependencia creó el mayor coste de mantenimiento? ¿Qué podrías eliminar sin
reducir la calidad de la evidencia final?

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-003-evidence-review-ES.md" aria-label="Lab anterior: Lab 003 · Auditar una declaración de finalización">← Anterior<br><strong>Lab 003 · Auditar una declaración de finalización</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-005-design-a-skill-ES.md" aria-label="Siguiente Lab: Lab 005 · Convertir un método repetido en un Skill acotado">Siguiente →<br><strong>Lab 005 · Convertir un método repetido en un Skill acotado</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
