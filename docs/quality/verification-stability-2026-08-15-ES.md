<!-- content_id: verification-stability-2026-08-15 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: verification-stability-2026-08-15.md | source_revision: 2026-08-15 -->

# Cinco ejecuciones locales de verificación repetidas

**Estado:** observación de ingeniería `candidate`

**Registrado:** 2026-08-15 (America/Los_Angeles)  
**Datos:** [tiempos de ejecución legibles por máquina](verification-stability-2026-08-15.json) · [gráfico](verification-stability-2026-08-15.svg)

## Lo que se observó

En el árbol de trabajo de Windows actual se ejecutaron, en el mismo orden, siete comprobaciones locales del repositorio durante cinco rondas consecutivas. Todas las rondas terminaron correctamente. El gráfico muestra la mediana de duración de cada comprobación; la tabla conserva los cinco tiempos brutos para que el resumen se pueda comprobar, no solo aceptar.

![Mediana de duración de cinco ejecuciones locales de verificación](verification-stability-2026-08-15.svg)

En un teléfono, usa la tabla para consultar los valores exactos. Reader presenta este gráfico denso como un enlace con nombre que se puede abrir a tamaño completo, en lugar de tratarlo como texto legible en una pantalla pequeña.

| Comprobación | Éxitos | Tiempos brutos (ms) | Mediana (ms) | Media (ms) |
| --- | ---: | --- | ---: | ---: |
| Línea base del proyecto | 5 / 5 | 48.9, 38.3, 36.1, 34.4, 35.1 | 36.1 | 38.6 |
| Estructura del proyecto | 5 / 5 | 43.2, 42.3, 40.5, 39.1, 39.5 | 40.5 | 40.9 |
| Integridad del contenido | 5 / 5 | 49.4, 47.5, 46.9, 47.0, 44.7 | 47.0 | 47.1 |
| Contrato de aprendizaje en inglés | 5 / 5 | 86.8, 83.8, 84.5, 83.1, 83.9 | 83.9 | 84.4 |
| Registro de Skills | 5 / 5 | 49.7, 47.4, 47.6, 48.2, 47.4 | 47.6 | 48.1 |
| Contrato de enrutamiento de Skills | 5 / 5 | 34.2, 35.2, 35.4, 34.0, 34.3 | 34.3 | 34.6 |
| Enlaces Markdown locales | 5 / 5 | 498.1, 496.1, 474.8, 473.9, 484.5 | 484.5 | 485.5 |

## Qué demuestra y qué no demuestra

Es una evidencia de ingeniería útil: las siete comprobaciones nombradas se mantuvieron estables durante cinco rondas locales consecutivas, y la auditoría de enlaces fue la más lenta de esta pequeña muestra. No es un benchmark del libro, de un modelo ni de un Skill.

En particular, estos números no demuestran que un lector aprenda más rápido, que un Skill mejore la productividad, que un modelo sea más seguro o preciso, ni que haya cambiado el IQ de nadie. El repositorio no tiene un instrumento psicométrico validado, un evaluador cualificado ni una base ética para afirmar eso; por tanto, el IQ no es una métrica operativa del proyecto.

El [protocolo piloto de Shift Handoff](shift-handoff-pilot-protocol-v1.md) define qué haría falta para observar un resultado de proceso mucho más concreto. Su estado inicial sigue siendo `candidate / not_run` hasta que existan registros autorizados y desidentificados y un evaluador independiente los haya revisado.

## Reproducir la observación de ingeniería

Usa el entorno documentado en [AGENTS.md](../../AGENTS.md), ejecuta cinco veces y en el mismo orden los siete comandos listados en el archivo JSON, y conserva la salida completa, el código de salida, la identidad del commit, el sistema operativo, el runtime y el estado del árbol de trabajo local. No compares tiempos entre máquinas como si fueran una puntuación de productividad. Una comparación con un checkout limpio o con CI sería una observación nueva, no una continuación de esta.

## Límite de la evidencia

La observación se limita a las comprobaciones estáticas y estructurales indicadas. Superarlas no demuestra comprensión del alumno, comportamiento de Skills en runtime, activación automática, semántica de fuentes, calidad de traducción, comportamiento del navegador, despliegue, seguridad, utilidad ni preparación para publicar.
