<!-- content_id: lab-015-evidence-delivery | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-015-evidence-delivery
title: "Entregar evidencia, no una frase de finalización"
level: L5
domain: general
goal: "Separar afirmaciones de finalización en registros de evidencia con alcance y hallar la comprobación mínima siguiente"
setup: "Cambio de texto desechable, un check focalizado, otro omitido deliberadamente y traspaso anonimizado; sin servicio ni datos reales"
task: "Registrar fuente, check y afirmación de ejecución con alcance, comando u observación, resultado, salida guardada, estado y siguiente check"
evidence: ["Tabla afirmación-evidencia, salida cruda, diff y decisión de revisión", "Distinción explícita entre verified, partial, unverified, blocked y not_run"]
failure_variant: "Eliminar el archivo de salida y dejar el nombre del comando; marcar unverified o not_run"
reflection: "¿Qué afirmación fue más amplia que su evidencia y qué check pequeño cerraría la brecha?"
status: draft
last_verified: "not run"
transfer_task: "Aplicar la tabla a un sitio estático y separar fuente, build, navegador, captura y URL pública"
transfer_domain: "publicación web, documentación, investigación o ingeniería"
transfer_evidence: "Una fila por afirmación con alcance, comando u observación, resultado, ruta de salida y límite"
transfer_limitations: "Un check de fuente no prueba ejecución visual, aceptación del usuario ni URL pública"
---

# Lab 015: entregar evidencia, no una frase de finalización

## El problema

Un comando puede ejecutarse con salida oculta, truncada, en el directorio equivocado o demasiado débil para la afirmación. Convierte «hecho» en una tabla de afirmación y evidencia.

## Preparación y tarea

Crea un cambio de texto desechable, un check focalizado y otro omitido. Prepara un traspaso anonimizado con una afirmación de fuente, otra de check y otra de ejecución o efecto de usuario. No uses servicio ni datos reales. Para cada afirmación registra:

```text
afirmación:
alcance:
comando u observación:
directorio de trabajo:
código de salida / resultado:
salida guardada:
estado: verified | partial | unverified | blocked | not_run
siguiente comprobación mínima:
```

Pide a un segundo revisor —o sesión nueva— que rechace cualquier afirmación sin evidencia, fuera de alcance o inferida de otra fila.

## Fallo y práctica de campo

Elimina el archivo de salida pero deja el comando en el traspaso: el resultado es `unverified` o `not_run`, no «probablemente pasó». También puedes modelar sin red tres límites: texto que excede el terminal pero se guarda en archivo; cadenas BMP y no BMP cuya comparación debe hacerse antes de llamar herramientas; un nombre de archivo de prueba largo si el sistema lo permite. Un fixture local no reproduce automáticamente un fallo ajeno ni convierte un workaround de un informe público en arreglo oficial.

## Aceptación y transferencia

- [ ] Cada frase de finalización está dividida en afirmación con alcance.
- [ ] Los comandos incluyen ruta, salida y código.
- [ ] La evidencia faltante queda explícita.
- [ ] Un check posterior no reescribe una incertidumbre previa.
- [ ] El traspaso nombra siguiente check y condición de parada.

Transfiere la tabla a un sitio estático: distingue archivos fuente, artefacto construido, navegador renderizado, captura revisada y URL pública alcanzable. Este Lab sigue `draft / not_run`; un check de fuente no demuestra aceptación ni ejecución visual.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-ES.md">← Anterior<br><strong>Lab 014 · reconciliación al reanudar</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-ES.md">Siguiente →<br><strong>Lab 016 · detenerse en el límite de efectos externos</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
