<!-- content_id: prysai-llm-comparison-protocol | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# Protocolo de comparación de LLM

Convierte «¿cuál es mejor?» en una decisión inspeccionable. Este Skill
planifica o revisa una comparación; no ejecuta modelos, gasta presupuesto,
expone entradas privadas ni convierte un resultado pequeño en una tabla de
clasificación.

## Congela la decisión

Exige un ID y un responsable de decisión; exactamente dos fichas de
candidatos; una variable modificada; conjunto de tareas, entradas, orden,
rúbrica, repeticiones y responsable de puntuación fijos; además de una huella
de contexto, herramientas y versiones, permisos, presupuesto o base de
costes, ventana de disponibilidad, ubicación de registros, límite de
retención, condición de parada y condición de no comparabilidad.

Devuelve `blocked` si falta un candidato, una regla de aceptación, el límite
de permisos, la base de costes o el responsable. No normalices en silencio
las diferencias de cuenta, plan, región, límite de solicitudes, herramientas,
contexto del sistema ni formato de salida.

Deriva los comandos, permisos o comportamientos de un producto nombrado a
`prysai-platform-adapter-review`. Deriva los precios, disponibilidad o hechos
actuales a `prysai-source-investigator`. Deriva la auditoría de una afirmación
de comparación terminada a `prysai-evidence-review`.

## Usa una superficie fija

Usa el paquete del proyecto `evals/candidates/three-task-smoke-v1/` cuando sus
entradas sintéticas encajen con la decisión. Ejecuta su validador local antes
de cualquier ejecución externa. El paquete aporta entradas congeladas, hashes,
la forma de salida esperada y una plantilla de registro; no contiene
resultados de modelos ni hace afirmaciones de benchmark.

Si el paquete no encaja, define un contrato de tareas nuevo antes de ejecutar
cualquiera de los dos candidatos. No cambies las entradas, la rúbrica, el
contexto, las herramientas, el nivel de permisos, el presupuesto ni la regla
de parada después de ver un resultado. Una condición cambiada es una
comparación nueva, no un reintento bajo la decisión anterior.

## Conserva un registro honesto

La planificación y las comprobaciones estáticas del fixture son `R0`. Una
ejecución local reversible y autorizada es `R1`. Usar un proveedor, una cuenta,
la red, una API de pago, un repositorio compartido o un servicio externo es
`R2` y exige destino exacto, límites de datos, presupuesto, responsable,
reversión o limpieza y confirmación.

Para cada candidato y tarea conserva un ID de ejecución, ID de intento, ID de
candidato, ID de tarea, hash de entrada, huella de contexto, herramientas y
versiones, permisos, base de costes, evento de disponibilidad, ubicación de la
salida bruta, validación, puntuación humana, estado, motivo de no
comparabilidad y limitación. Mantén la salida inicial inmutable. Una revisión
controlada recibe otro ID de intento.

Un error de capacidad, una superficie no disponible, un permiso incompatible,
un hash de entrada cambiado, una versión de herramienta cambiada o una salida
bruta ausente son evidencias que deben conservarse, no celdas vacías que haya
que ocultar.

## Limita la conclusión

Clasifica cada fila como comparable, no-comparable o not-run. Después devuelve
una sola decisión:

- `worth-expanding`: la evidencia declarada a nivel de tarea respalda planificar una comparación mayor por separado;
- `do-not-expand-yet`: la evidencia observada no supera la compuerta declarada o mantiene un fallo relevante;
- `insufficient-evidence`: faltan entradas, condiciones, evidencia, puntuación o comparabilidad.

No nombres un ganador universal, publiques una clasificación general,
infieras capacidad por disponibilidad, fiabilidad por un único éxito,
compares costes incompatibles ni conviertas un protocolo no ejecutado en
evidencia de rendimiento.

## Devuelve el comprobante de comparación

Devuelve el ID de decisión, el responsable, la variable comparada, las fichas
de candidatos, las condiciones congeladas, el conjunto de tareas y hashes de
entrada, la aceptación y puntuación, el estado de ejecución, las filas
comparables y no comparables, la decisión, la evidencia, los desconocidos, la
derivación, el riesgo y el estado del contenido. Incluye este límite: decisión
candidata acotada a las tareas; no es una clasificación de producto, benchmark,
garantía de ejecución, resultado de aprendizaje ni recomendación de producción.

## Registro de mantenimiento

- `source`: método original de Prysai Lab derivado del fixture fijo `three-task-smoke` y de los Capítulos 6 y 19
- `license`: reescritura original; la documentación de modelos/productos y los registros de ejecución siguen siendo solo de referencia según `docs/sources/asset-register.md`
- `owner`: evaluation-maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
