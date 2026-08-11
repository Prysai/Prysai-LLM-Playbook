<!-- content_id: book-table-of-contents | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: dd08a68 -->

# Codex: From First Task to Real Work — Índice del libro v0.2

> Índice en español (`ES`). Esta página es una migración basada en
> `book/table-of-contents.md`: conserva los 22 capítulos, los 13 experimentos,
> los límites de estado y las entradas de investigación sobre problemas reales.
> No afirma que el corpus de capítulos, experimentos o la verificación en
> ejecución ya estén traducidos a seis idiomas.

## Estado de migración y regla de enlaces

- `content_status` de esta página: `candidate`; revisión de origen: `dd08a68`.
- Se conservan 22 registros de capítulos y 13 archivos de experimentos reales.
- Los capítulos están en `candidate`; los experimentos están en `draft`, con
  `run_status: not_run`.
- El capítulo 6 tiene la afirmación volátil relacionada en
  `claim_status: disputed`; el capítulo 22 en `claim_status: current | disputed`.
- Las entradas ya existentes en español usan archivos `-ES`. El capítulo 1 y
  lab-011 ya tienen sus cortes `-ES`; los demás capítulos y experimentos siguen
  en migración y sus enlaces muestran explícitamente ese estado. Los documentos
  compartidos de gobernanza, evaluación e investigación están marcados como
  `locale-neutral`.
- Esta página no hace fallback silencioso a otro idioma. Cuando no existe el
  destino localizado, el propio texto del enlace muestra el estado de migración.

## Entradas de lectura

- [Entrada del proyecto — ES](../README-ES.md)
- [Guía del libro — ES](README-ES.md)
- [Prefacio — ES](preface-ES.md)
- [Contrato de la ruta de aprendizaje — locale-neutral](../docs/governance/learning-path.yaml)
- [Matriz de locales — locale-neutral](../docs/governance/locale-matrix.yaml)

## Parte I: De entender GPT al primer uso seguro

### Capítulo 1 — Entender GPT antes de entender cómo funciona Codex

Cómo generan los modelos a partir del contexto; cómo Codex conecta un modelo
con un entorno de trabajo; y cómo contexto, herramientas, Skills, permisos y
un bucle de Agent observable cambian el resultado. **content_status:** `candidate`

- Capítulo: [fuente ES del capítulo 1](chapters/01-gpt-and-codex-ES.md)
- Experimento: [fuente ES de lab-011](labs/lab-011-gpt-codex-boundaries-ES.md)

### Capítulo 2 — Completar una primera tarea segura y verificable

Elegir una tarea de bajo riesgo, escribir el protocolo inicial, fijar puntos de
confirmación y dejar evidencia de entrega. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/02-first-safe-task.md)
- Experimento: [lab-001 · migración en curso · ruta fuente actual](labs/lab-001-first-safe-task.md)

### Capítulo 3 — Convertir un deseo en un protocolo de tarea

Objetivo, contexto, entradas, restricciones, acciones permitidas, aceptación,
gestión del fallo y formato de entrega. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/03-task-protocol.md)
- Experimento: [lab-002 · migración en curso · ruta fuente actual](labs/lab-002-task-protocol.md)

### Capítulo 4 — Contexto, permisos y límites de acción del Agent

Capas de contexto, límites de confianza, sandbox, aprobaciones, efectos
externos y comportamiento observable. **content_status:** `candidate`

- Capítulo: [Capítulo 4 · fuente ES](chapters/04-context-permissions-and-agent-ES.md)
- Experimento: [Lab 007 · fuente ES](labs/lab-007-action-boundaries-ES.md)

### Capítulo 5 — Elegir la superficie correcta de Codex

Método para elegir entre la aplicación de escritorio, CLI, IDE, Cloud y Remote
según la tarea. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/05-choose-the-codex-surface.md)
- Experimento: [Lab 007 · fuente ES](labs/lab-007-action-boundaries-ES.md)

### Capítulo 6 — Elegir un modelo no es venerar un modelo

Comparar modelos con un conjunto de tareas, coste, velocidad, estabilidad y
verificación; probar las hipótesis sobre su posicionamiento. **content_status:**
`candidate` · afirmación volátil relacionada: `claim_status: disputed`

- Capítulo: [migración en curso · ruta fuente actual](chapters/06-model-selection.md)
- Investigación: [línea base de OpenAI/Codex — investigación locale-neutral](../docs/research/openai-codex-baseline.md)

## Parte II: Del usuario al diseñador de flujos de trabajo

### Capítulo 7 — Cómo se reparten el trabajo Skills, Plugins, MCP y herramientas

Comprender las capas de método, conexión, ejecución y distribución; elegir la
combinación mínima eficaz. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/07-skills-plugins-and-tools.md)
- Experimento: [lab-004 · migración en curso · ruta fuente actual](labs/lab-004-skill-selection.md)

### Capítulo 8 — El ciclo de vida completo, de la definición a la entrega

Definición, planificación, construcción, verificación, revisión, entrega y
mantenimiento mediante cortes verticales verificables. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/08-full-lifecycle-workflow.md)
- Experimento principal: [lab-013 · migración en curso · ruta fuente actual](labs/lab-013-l3-vertical-slice.md)
- Experimento de apoyo: [lab-009 · migración en curso · ruta fuente actual](labs/lab-009-engineering-lifecycle.md)

### Capítulo 9 — Verificación, duda y recuperación

Separar las afirmaciones de finalización de su evidencia; tratar la
incertidumbre, el fallo y la recuperación. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/09-verification-and-recovery.md)
- Experimento: [lab-003 · migración en curso · ruta fuente actual](labs/lab-003-evidence-review.md)

### Capítulo 10 — Planificación y cortes verticales

Dividir un objetivo grande en entregas con dependencias claras, pasos
ejecutables y comprobaciones inspeccionables. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/10-planning-and-slicing.md)
- Experimentos: [lab-002 · migración en curso · ruta fuente actual](labs/lab-002-task-protocol.md) · [lab-013 · migración en curso · ruta fuente actual](labs/lab-013-l3-vertical-slice.md)

### Capítulo 11 — Diseñar un Skill realmente útil

Límites de activación, divulgación progresiva, recursos, scripts, salidas,
fallos intencionales, evaluación y versiones. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/11-designing-a-skill.md)
- Experimento: [lab-005 · migración en curso · ruta fuente actual](labs/lab-005-design-a-skill.md)

### Capítulo 12 — El bucle, el estado y las condiciones de parada del Agent

Observar, planificar, actuar, recibir feedback, reintentar, confirmar y parar;
explicar la conducta sin inventar razonamientos ocultos. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/12-agent-loop-and-stop.md)
- Experimento: [lab-006 · migración en curso · ruta fuente actual](labs/lab-006-agent-stop-conditions.md)

### Capítulo 13 — Límites de acción para archivos, terminal, navegador y GitHub

Comprobaciones de solo lectura, edición, comandos, navegación, commits,
pushes, mensajes externos y rollback. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/13-action-boundaries.md)
- Experimento: [Lab 007 · fuente ES](labs/lab-007-action-boundaries-ES.md)

## Parte III: Skills, herramientas y práctica profesional

### Capítulo 14 — Descubrir, instalar y auditar Skills externos

De un índice a una capacidad confiable: origen, licencia, dependencias,
autenticación, activación y mantenimiento. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/14-discover-and-audit-skills.md)
- Experimentos: [lab-004 · migración en curso · ruta fuente actual](labs/lab-004-skill-selection.md) · [lab-005 · migración en curso · ruta fuente actual](labs/lab-005-design-a-skill.md)

### Capítulo 15 — Ruta de investigación: de la pregunta al conocimiento auditable

Concretar la pregunta de investigación y tratar fuentes, citas, método,
revisión, divulgación e integridad. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/15-research-track.md)
- Experimento: [lab-008 · migración en curso · ruta fuente actual](labs/lab-008-research-question.md)

### Capítulo 16 — Ruta de ingeniería: de la idea al software fiable

Requisitos, especificaciones, planificación, implementación incremental,
pruebas, depuración, revisión, lanzamiento y migración. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/16-engineering-track.md)
- Experimento: [lab-009 · migración en curso · ruta fuente actual](labs/lab-009-engineering-lifecycle.md)

### Capítulo 17 — Ruta de marketing: de entender el producto a experimentar con crecimiento

Contexto del producto, audiencia, posicionamiento, contenido, conversión,
medición y atribución. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/17-marketing-track.md)
- Experimento: [lab-010 · migración en curso · ruta fuente actual](labs/lab-010-product-context.md)

### Capítulo 18 — Ruta de contenido, diseño, datos y automatización

Usar el ecosistema externo por grupos de capacidades de tarea, en vez de
instalar todos los Skills sin criterio. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/18-content-design-data-automation.md)
- Experimento: [lab-004 · migración en curso · ruta fuente actual](labs/lab-004-skill-selection.md)

## Parte IV: Del uso competente a la organización

### Capítulo 19 — Evaluar modelos y flujos de trabajo

Crear conjuntos de tareas, repetir experimentos, puntuar con revisión humana y
clasificar errores. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/19-evaluate-models-and-workflows.md)
- Experimentos: [lab-003 · migración en curso · ruta fuente actual](labs/lab-003-evidence-review.md) · [lab-009 · migración en curso · ruta fuente actual](labs/lab-009-engineering-lifecycle.md)
- Marco de evaluación: [gobernanza locale-neutral](../docs/quality/evaluation-framework.md)

### Capítulo 20 — Construir un sistema personal de trabajo con Codex

Contexto del proyecto, memoria, plantillas, flujos habituales y retrospectivas.
**content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/20-personal-codex-work-system.md)
- Experimentos: [lab-001 · migración en curso · ruta fuente actual](labs/lab-001-first-safe-task.md) · [lab-010 · migración en curso · ruta fuente actual](labs/lab-010-product-context.md)

### Capítulo 21 — Construir un sistema de capacidades para el equipo

Skills compartidos, `AGENTS.md`, permisos, evaluación, revisión, contribución
y versiones. **content_status:** `candidate`

- Capítulo: [migración en curso · ruta fuente actual](chapters/21-team-capability-system.md)
- Experimento: [lab-012 · migración en curso · ruta fuente actual](labs/lab-012-team-capability-migration.md)

### Capítulo 22 — Actualización continua y preparación para el futuro

Identificar hechos volátiles, actualizar fuentes, migrar modelos, auditar
herramientas y retirar capacidades obsoletas. **content_status:** `candidate` ·
afirmación volátil relacionada: `claim_status: current | disputed`

- Capítulo: [migración en curso · ruta fuente actual](chapters/22-continuous-update-and-future-proofing.md)
- Experimentos: [lab-008 · migración en curso · ruta fuente actual](labs/lab-008-research-question.md) · [lab-010 · migración en curso · ruta fuente actual](labs/lab-010-product-context.md)

## Índice de experimentos y límites de estado

El repositorio contiene 13 archivos de experimentos reales. Todos siguen en
`draft` y `run_status: not_run`; un enlace del índice es una entrada de lectura,
no una prueba de que el experimento o el aprendizaje estén verificados.

| Experimento | Enfoque | Estado | Entrada |
|---|---|---|---|
| lab-001 | Primera tarea segura | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-001-first-safe-task.md) |
| lab-002 | Protocolo de tarea | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-002-task-protocol.md) |
| lab-003 | Revisión de evidencia | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-003-evidence-review.md) |
| lab-004 | Selección de Skills | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-004-skill-selection.md) |
| lab-005 | Diseño de Skills | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-005-design-a-skill.md) |
| lab-006 | Condiciones de parada del Agent | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-006-agent-stop-conditions.md) |
| lab-007 | Límites de acción | `draft` · `not_run` | [fuente ES](labs/lab-007-action-boundaries-ES.md) |
| lab-008 | Pregunta de investigación | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-008-research-question.md) |
| lab-009 | Ciclo de vida de ingeniería | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-009-engineering-lifecycle.md) |
| lab-010 | Contexto del producto | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-010-product-context.md) |
| lab-011 | GPT, Codex, herramientas y Agents | `draft` · `not_run` | [fuente ES](labs/lab-011-gpt-codex-boundaries-ES.md) |
| lab-012 | Migración de capacidades de equipo | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-012-team-capability-migration.md) |
| lab-013 | Corte vertical L3 auditable | `draft` · `not_run` | [migración en curso · fuente actual](labs/lab-013-l3-vertical-slice.md) |

## Evaluación, estados e investigación de problemas reales

- [Índice de experimentos — migración en curso · fuente actual](labs/README.md): 13 archivos reales, niveles, dominios, foco de migración y `lab_status`.
- [Matriz de integración de contenidos — gobernanza locale-neutral](../docs/content-matrix.md): mapas de capacidades y el aprendizaje adicional cuando se repiten temas.
- [Marco de evaluación — gobernanza locale-neutral](../docs/quality/evaluation-framework.md): umbrales de aceptación de contenido y capacidades.
- [Contrato de la ruta de aprendizaje — gobernanza locale-neutral](../docs/governance/learning-path.yaml): niveles, experimentos principales, experimentos de apoyo y condiciones de avance.
- [Investigación de problemas reales de usuarios de Codex — investigación locale-neutral](../docs/research/field-problems-codex.md): entradas de problemas públicos sin fingir causas oficiales.
- [Índice de investigación de problemas reales — investigación locale-neutral](../docs/research/field-problems-index-2026-08-10.md): mapea FP, FP-S, FUP, hallazgos de foros y ubicaciones en capítulos/experimentos.
- [Investigación de foros e issues públicos — investigación locale-neutral](../docs/research/field-problems-forums-2026-08-10.md): páginas/API fiables de Stack Overflow y resúmenes de issues de GitHub.
- [Archivo de investigación de la línea base oficial — investigación locale-neutral](../docs/research/openai-codex-baseline.md): límites de las fuentes para afirmaciones volátiles.

Los experimentos principales independientes de L0, L3 y L6 son [lab-011 · fuente ES](labs/lab-011-gpt-codex-boundaries-ES.md), [lab-013 · migración en curso](labs/lab-013-l3-vertical-slice.md) y [lab-012 · migración en curso](labs/lab-012-team-capability-migration.md).
