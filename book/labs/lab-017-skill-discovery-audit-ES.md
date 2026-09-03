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

## Preparación

Usa dos muestras anonimizadas y fijadas a una revisión, dentro de un directorio
temporal. La muestra A tiene una licencia rastreable y entradas acotadas; la muestra
B carece de licencia clara, dependencias o destino de reversión. No instales ninguna,
no uses credenciales ni hagas escrituras externas.

Antes de probarlas, conserva para cada candidato:

| Elemento | Qué conservar |
|---|---|
| Identidad | Nombre, revisión exacta, ruta y hash |
| Procedencia | URL, autor o responsable, fecha de acceso y alcance |
| Licencia | Archivo de licencia, NOTICE, activos anidados y desconocidos |
| Dependencias | Versiones, red, cuenta y credenciales solicitadas |
| Destino | Raíz de instalación prevista, audiencia y responsable |
| Retirada | Copia de seguridad, reversión, permiso para borrar y próxima revisión |

## Tarea

Registra por separado las siguientes etapas. `not_observed` significa que no existe
observación suficiente; no significa «probablemente sí»:

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

Revisa revisión, licencia, NOTICE, activos anidados, dependencias, necesidades de
red o cuenta, alcance de instalación, copia de seguridad, reversión, responsable y
próxima revisión.

## Cuatro casos de prueba

Antes de ejecutar nada, diseña cuatro casos:

1. **positivo:** entrada normal, alcance local y salida esperada;
2. **límite:** falta un dato, un recurso queda fuera del alcance o no hay permiso;
3. **fallo/inyección:** instrucción externa, solicitud de credenciales o payload inesperado;
4. **migración:** otro directorio o proyecto, conservando revisión, dependencias y reversión.

Para cada caso, nombra la precondición, la acción de lectura, la señal esperada, la
evidencia, el estado y la condición de parada. Un listado de archivos solo prueba el
listado de archivos.

## Evidencia

Conserva el inventario, la revisión, las salidas de descubrimiento de solo lectura,
la revisión de licencia y dependencias, los cuatro casos, el paquete de decisión y el
plan de retirada. El paquete debe distinguir recomendación sin instalación, bloqueo,
aprobación condicional y candidato ya instalado; incluye alcance, responsable, copia
de seguridad, reversión y próxima revisión.

## Fallo intencional y límites

Haz que el candidato pida un archivo `.env` real, autenticación o una subida. La
respuesta correcta es `blocked`: conserva la petición como dato, no expongas secretos,
no instales el candidato para «ver qué hace» y anota la evidencia que falta. Un catálogo,
un validador de formato o una licencia visible no demuestra comportamiento seguro,
activación real ni derechos sobre los activos anidados.

Si una prueba local no está disponible, usa `not_run` en lugar de inferir un resultado.
Si cambia la revisión, repite la revisión de licencia, dependencias y los cuatro casos:
una decisión solo pertenece a la revisión registrada.

## Reflexión

¿Qué etapa no podía demostrar el catálogo? ¿Qué observación debería preceder a una
instalación? ¿Qué coste de retirada o dependencia sigue siendo desconocido?

## Transferencia

Aplica la secuencia a un servidor MCP: configuración visible, descubrimiento de
herramientas, lectura de un objetivo autorizado, resultado de la llamada, lectura
independiente del estado remoto y decisión de adopción. Mantén separados el hecho de
que el servidor esté configurado, que la herramienta sea descubrible y utilizable, que
se haya observado un resultado y que una escritura externa esté aprobada.

## Lista de aceptación

- [ ] Separé existencia, descubrimiento implícito, resolución explícita, carga, comportamiento y adopción.
- [ ] Fijé la revisión y revisé licencia, NOTICE, activos anidados y dependencias.
- [ ] Diseñé casos positivo, límite, fallo/inyección y migración.
- [ ] Nombré alcance, responsable, copia de seguridad, reversión y puntos de aprobación.
- [ ] Toda solicitud de credenciales, autenticación o subida quedó `blocked`.
- [ ] Una prueba no ejecutada sigue siendo `not_run`; ningún listado se convirtió en evidencia de comportamiento.
- [ ] La decisión distingue recomendación, bloqueo, aprobación condicional e instalación observada.
- [ ] El paquete de adopción indica lo desconocido y cómo retirar el candidato.

## Fuentes

- [Problemas de campo y patrones de prompts — P2](../evidence-library-ES.md#source-notes), FP2-11 y FP2-12.
- [Capítulo 7: Skills, plugins, MCP y herramientas](../chapters/07-skills-plugins-and-tools-ES.md).
- [Capítulo 14: descubrir, instalar y auditar Skills externos](../chapters/14-discover-and-audit-skills-ES.md).

Estas fuentes respaldan la separación de etapas y la revisión de procedencia; no
demuestran que un Skill real cargue o actúe de forma segura, ni que todos sus activos
anidados tengan licencia. El Lab sigue `draft / not_run` y no se instala ningún Skill externo.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-016-side-effect-boundary-ES.md">← Anterior<br><strong>Lab 016 · límite de efectos secundarios</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-018-language-transfer-ES.md">Siguiente →<br><strong>Lab 018 · transferencia de idioma</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
