<!-- content_id: lab-009-engineering-lifecycle | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-009-engineering-lifecycle
title: "Comparar implementación directa con un ciclo completo de ingeniería"
level: L3
domain: engineering
goal: "Medir dónde definición, planificación, verificación, revisión y entrega reducen retrabajo sin fingir que un banco pequeño prueba superioridad universal"
setup: "Un repositorio local desechable, tres tareas congeladas de bajo riesgo, una revisión base y herramientas fijas sin efectos externos o de producción"
task: "Ejecutar las mismas tres tareas con flujo directo y de ciclo completo, conservar primeros intentos, clasificar deriva de condiciones y comparar evidencia y retrabajo"
evidence:
  - "Revisión base, tareas fijas, orden y hash de entrada para ambos caminos"
  - "Primer resultado, retrabajo controlado, diff, salida de check y recuento de retrabajo"
failure_variant: "No restaurar la base o llamar aceptación de usuario a un build aprobado; marcarlo not comparable o unverified"
reflection: "¿Qué fase evitó la mayor afirmación sin apoyo o retrabajo, y qué factores siguen confundiendo el resultado?"
status: draft
last_verified: "not run"
transfer_task: "Trasladar la comparación a un flujo pequeño de documentación o investigación con la misma base"
transfer_domain: "ingeniería, investigación o documentación"
transfer_evidence: "Conservar inputs, dos registros, diffs, checks, comparación y límites"
transfer_limitations: "Tres tareas locales no prueban superioridad general de modelo o proceso"
---

# Lab 009: comparar implementación directa con un ciclo completo de ingeniería

## Objetivo de aprendizaje

Prueba una afirmación estrecha: si definición explícita, planificación, verificación, revisión y entrega mejoran tres tareas fijas bajo una misma configuración. Es una prueba de humo de ingeniería, no una clasificación de modelos.

## Preparación

Crea un repositorio desechable con una línea base confirmada. Congela tres tareas pequeñas y sus comprobaciones de aceptación. Usa el mismo entorno, modelo, herramientas, permisos, red y presupuesto de tiempo para ambos flujos. Si cambia el modelo, mantén el flujo; si cambia el flujo, mantén el modelo. Restaura la base antes de cada tarea, fija el orden y declara el sesgo de orden como límite.

La persona candidata A recibe meta, entrada y aceptación congeladas. La B usa un protocolo escrito con `define`, `plan`, `build`, `verify`, `review` y `deliver`.

## Tarea y experimento

Usa tres fixtures inocuos:

1. extraer tres campos nombrados de un registro sintético de entrega;
2. convertirlo a Markdown separando trabajo terminado y no verificado;
3. revisar la afirmación sin soporte «el código existe y compila, por tanto la función está verificada».

Ejecuta A en las tres tareas y después B en las tres. Permite como máximo un retrabajo controlado por ejecución. Conserva el resultado inicial aunque el retrabajo funcione.

Registra valores reales, no estimaciones:

```yaml
run_id: lab-009-v1-A-extract-01
attempt_id: initial
candidate: A
task_id: extract-01
baseline_revision: actual-revision
input_hash: sha256:actual-hash
surface: actual-surface-and-version
model: actual-model-id
workflow: direct
tool_versions: actual-values
permissions: disposable-local-repository
network: offline
started_at: actual-timestamp
ended_at: actual-timestamp
first_pass: true
rework_count: 0
elapsed: actual-duration
cost_value: actual-value-or-unavailable
cost_basis: actual-basis-or-unavailable
error_category: none
comparability: comparable
validation: command-output-and-exit-code
status: pass
```

No inventes tiempo ni coste: usa `unavailable`. Un resultado que pasó tras retrabajo no pasa a ser éxito al primer intento.

## Una versión mínima, incluso sin experiencia de ingeniería

No hace falta empezar con un sitio real ni un repositorio complejo. Crea un archivo temporal `status.md` con solo estas tres líneas sintéticas:

```text
Comprobación de build: código de salida 0
Comprobación móvil: terminada
Aceptación de usuario: aún no ejecutada
```

Da a A solo «ordena este contenido como estado terminado». Da a B el mismo texto y añade: **«solo puedes cambiar `status.md`; conserva lo desconocido; enumera primero el plan; al final comprueba que siguen tres líneas; no llames terminada a la aceptación de usuario».** Ninguno usa red, hace commit ni toca otro archivo.

No compares cuál suena más bonito. Comprueba si conserva «aún no ejecutada», si explica el cambio real y si deja un resultado verificable. Aunque B sea más claro, solo diría que este protocolo merece más pruebas con este texto sintético; no demuestra eficiencia de un modelo, equipo o proyecto real.

## Evidencia, fallo y aceptación

Guarda seis salidas iniciales, retrabajos como intentos nuevos, diffs, órdenes, códigos de salida, resultados de comprobación, notas de revisión, entregas y una tabla 2×3. Declara `expand`, `do_not_expand` o `insufficient_evidence`.

Provoca en una ejecución un timeout, bloqueo de permiso, hash de entrada cambiado, versión de herramienta cambiada o escritura local desconocida. Conserva el intento interrumpido, inspecciona el destino antes de reintentar y marca `not_comparable` si cambiaron las condiciones congeladas. Un éxito posterior no repara esa comparabilidad.

- [ ] Ambos flujos usaron tareas congeladas iguales y restauraron la base.
- [ ] Seis intentos iniciales y cualquier retrabajo siguen inspeccionables por separado.
- [ ] Primer paso, tiempo, retrabajo, error y verificación tienen valores reales.
- [ ] Una rama de fallo registra conciliación o `not_comparable` sin ocultarlo.
- [ ] Compilar no se presenta como prueba de ejecución, despliegue o usuarios.
- [ ] La conclusión se limita a la prueba de tres tareas.

## Reflexión y transferencia

¿Qué etapa detectó primero un problema importante? ¿Cuál añadió ceremonia sin cambiar el resultado? Lleva solo los puntos de control útiles a otra tarea reversible e indica por qué es o no comparable. Tres tareas pequeñas no prueban coste, calidad ni clasificaciones generales de modelos; comprobaciones locales tampoco prueban despliegue o aceptación de usuarios.
