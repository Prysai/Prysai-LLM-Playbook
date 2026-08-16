<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 19: evaluar modelos y flujos de trabajo, de impresiones a evidencia

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Los fixtures de evaluación no contienen logs de ejecuciones de modelos; este capítulo no prueba que un modelo sea mejor.

## El problema

«Este modelo es más inteligente», «este Skill es fiable» o «la tarea acabó rápido» pueden ser observaciones, pero no bastan para elegir. Modelo, prompt, contexto, herramientas, permisos, dificultad y revisión humana afectan el resultado. Si cambia una condición, quizá la comparación deja de responder la misma pregunta.

> La unidad de evaluación no es una respuesta pulida: es entrada fija, acción observable, regla de aceptación, paquete de evidencia y alcance declarado.

## Separa el objeto de decisión

| Objeto | Pregunta | Evidencia mínima |
|---|---|---|
| Modelo por defecto | ¿Qué candidato supera calidad y seguridad en tareas fijadas? | Tareas fijas, repeticiones, puntuación y errores |
| Skill | ¿Reduce omisiones o retrabajo con la misma entrada? | Diferencia baseline/candidato y registro de trigger |
| Flujo | ¿Planificar y verificar justifican el coste extra? | Etapas, diff, validación y retrabajo |
| Permiso | ¿El espacio de acción nuevo aporta beneficio autorizado medible? | Tabla de permisos, efectos y coste de recuperación |

Antes de ejecutar, crea una tarjeta: pregunta acotada, propietario, candidatos reales, versión de tareas, calidad mínima, líneas rojas —sin secretos, escrituras externas no autorizadas ni evidencia inventada—, límite de coste, ubicación de logs, acción, alcance, incógnitas y próxima revisión. Un candidato no ejecutable es `not_run`, no una predicción.

## Congela las condiciones

Un conjunto reutilizable incluye normal, entrada ausente o conflicto, fallo, transferencia y al menos una tarea de juicio humano. Cada tarea tiene ID, versión, input, acciones permitidas, evidencia esperada, comportamiento prohibido y criterio de aprobación.

Fija texto, input redactado, contexto, model ID, surface, herramientas, red, permisos, presupuesto de tiempo, repeticiones, formato, rúbrica, revisor, hashes y recuperación. No elimines una tarea porque un candidato rinda mal: crea versión nueva y explica por qué. Si una condición cambia, registra una nueva decisión o marca `not_comparable`.

Cada intento requiere `run_id`, `attempt_id`, candidato, tarea, surface, modelo, workflow, tiempo, hash de entrada, permisos, versiones de herramientas, cronología, diff, validación, revisor, primer pase, retrabajo, coste y base de coste, categoría de error, comparabilidad y estado. Una repetición exitosa no puede sobrescribir el primer intento.

## Práctica: comparación de humo de tres tareas

En una copia temporal usa tres inputs sintéticos congelados: extraer afirmación/estado/evidencia; convertirlas a Markdown sin cambiar hechos; y señalar por qué código y build no prueban que una función esté completa. Compara A con solo tarea e input frente a B con protocolo, contexto mínimo y reglas de evidencia. Mantén mismo surface, herramientas, permisos, red, tiempo y revisor; cambia solo una variable.

Puntúa cinco dimensiones de 0–2: exactitud factual, campos completos, cumplimiento de alcance, correspondencia de evidencia y parada segura. Un pase necesita al menos 8/10 y al menos 1 en alcance y parada segura. Si ocurre cambio de hash, permiso, versión de herramienta, capacidad o condición, conserva la cronología y marca `not_comparable`; no rellenes con un retry ni con el resultado del otro candidato.

El resultado de seis registros incompletos solo permite `continue_test`, `blocked` o `not_run`. Incluso un smoke test que pasa solo dice «vale la pena ampliar», no «es el mejor modelo» ni «mejora productividad».

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-ES.md">← Anterior<br><strong>Capítulo 18 · ruta de contenido, diseño, datos y automatización</strong></a></td><td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-ES.md">Siguiente →<br><strong>Capítulo 20 · construir un sistema personal de trabajo con Codex</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
