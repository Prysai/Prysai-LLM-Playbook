# Prysai LLM Playbook: manuscrito del libro

<!-- language-switcher:start -->
**Idiomas:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

## Dos primeros pasos localizados

Si todavía no tienes un proyecto ni quieres que la IA actúe fuera del chat,
empieza con la [primera tarea universal de LLM](routes/universal-core-foundations-ES.md):
reescribirás un aviso ficticio con una comprobación visible y un punto de
parada. Es un ejercicio `candidate / not_run`; no prueba resultados de
aprendizaje ni que las plataformas se comporten igual.

Antes de buscar una instalación o usar un proyecto propio, completa
[Primer cambio seguro](routes/first-safe-change-ES.md): una copia local
descartable, una sola edición permitida y una condición de aceptación visible.
La ruta está en traducción `in-progress`; no afirma revisión lingüística
independiente ni ejecución de aprendices.

Cuando termines esa práctica, continúa con el Capítulo 2: primera tarea
segura y verificable (versión en español aún no disponible) y el Lab 001:
primera tarea segura (versión en español aún no disponible). Ambos son cortes
españoles completos en estado `candidate` / `draft`: su revisión lingüística
independiente y sus datos de ejecución por aprendices siguen pendientes.

Este directorio contiene el manuscrito original de la ruta principal de
Prysai LLM Playbook. El manuscrito no es una combinación de
seis proyectos externos: es un sistema de contenidos reordenado según la
progresión real del aprendizaje.

Cada capítulo debe incluir:

- un objetivo de aprendizaje;
- conceptos clave;
- un experimento mínimo ejecutable;
- un experimento de fallo intencional;
- una tarea de transferencia;
- evidencia de aceptación;
- hechos actuales y sus fuentes;
- el estado de actualización.

Antes de entrar en la ruta principal, cada borrador de capítulo debe superar
el umbral mínimo de `docs/quality/evaluation-framework.md` (documento
compartido; migración ES en curso).

## Entrada de lectura actual

Los capítulos 19–22 ya tienen borradores; su estado común es `draft`: el texto
está escrito, pero todavía espera una prueba previa. Desde el [índice del
libro en español](table-of-contents-ES.md) se puede
entrar en los casos de problemas reales, las especificaciones de fixtures de
evaluación y los archivos de investigación de cada capítulo. El archivo
`evals/task-set-v1.yaml` contiene 40 fixtures fijos que cubren 16 recorridos,
pero todavía no existen registros de ejecución de modelos; por tanto, esas
evaluaciones siguen en `not_run` y no deben leerse como evaluaciones
terminadas.

El ejercicio transversal de L3 empieza con el Experimento 013: corte vertical
auditable (migración ES en curso; fuente actual) (versión en español aún no disponible).
Reúne protocolo, línea base, checkpoints, verificación, fallo intencional y
transferencia en una misma ruta de bajo riesgo.

Entrada rápida: [prefacio en español](preface-ES.md) · [índice del libro
en español](table-of-contents-ES.md) · [marco de
evaluación (migración ES en curso; fuente actual)](../docs/quality/evaluation-framework.md)
· [evaluación de Luna (migración ES en curso; fuente actual)](../docs/model-evaluation-luna.md)
· [archivo de investigación de referencia de OpenAI Codex (migración ES en
curso; fuente actual)](../docs/research/openai-codex-baseline.md)

El índice del libro ya tiene una entrada `-ES`. Los capítulos, laboratorios y
documentos compartidos que todavía no tienen una variante `-ES` mantienen el
enlace a su fuente actual con una etiqueta visible de migración; así no se
presenta un documento no traducido como si ya fuera una versión española. Los
enlaces entre las páginas españolas existentes conservan el idioma mediante
sus destinos `-ES`.
