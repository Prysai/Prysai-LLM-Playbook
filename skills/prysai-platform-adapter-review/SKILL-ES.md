<!-- content_id: prysai-platform-adapter-review | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: skill-registry | source_license: project-owned CC-BY-4.0 -->

# Revisión de adaptadores de plataforma

Decide si un tutorial o flujo para una plataforma concreta aporta una diferencia real, documentada, ejecutable y mantenible. Cambiar el nombre del proveedor en una lista de funciones no constituye una adaptación.

## Congela la afirmación

Registra la plataforma, la superficie, los límites de cuenta o plan, la versión y la fecha, el resultado para la persona lectora, el prerrequisito del núcleo universal, el estado propuesto y las afirmaciones exactas que se revisan. Separa las afirmaciones mezcladas de varias plataformas salvo que una tarea de comparación fija y una rúbrica común las hagan comparables de verdad.

## Inspecciona el contrato del adaptador

Exige respuestas explícitas para:

1. `surface`: chat, escritorio, CLI, IDE, web, API u otra entrada;
2. `context_injection`: archivos, reglas, estado conversacional, recuperación o materiales de la persona;
3. `actions`: qué puede observar o cambiar esa superficie;
4. `authority`: permisos, confirmaciones, sandbox, cuenta, facturación y efectos externos;
5. `persistence`: qué sobrevive a un turno, una sesión, una tarea o un proyecto;
6. `control_loop`: planificación observable, uso de herramientas, comentarios, reintentos y delegación;
7. `verification_surface`: diferencias, registros, citas, vistas previas, pruebas, trazas o estado externo;
8. `failure_modes`: malentendidos y degradaciones propios del producto;
9. `volatile_facts`: URL autorizada, fecha de acceso, alcance, responsable y próxima revisión;
10. `transfer_lab`: entradas fijas, acciones seguras, aceptación, limpieza, fallo y límite de evidencia.

Marca `not_applicable` solo si explicas por qué. Marca `unknown` cuando ninguna fuente actual ni ejecución respalde la respuesta.

## Aplica las puertas de evidencia

Separa tres clases de evidencia (usa `official` para el hecho oficial):

- hecho oficial: documentación o fuente primaria actual propiedad de la plataforma;
- comportamiento observado: una ejecución conservada con su configuración y acciones visibles;
- señal de campo: un informe público que solo establece un síntoma o una necesidad.

Las publicaciones de la comunidad no satisfacen la puerta de hecho oficial. La documentación no demuestra el estado de una cuenta, el entorno de ejecución ni el resultado de una persona. Una sola ejecución correcta no demuestra comportamiento universal, fiabilidad, superioridad ni transferencia del aprendizaje.

Rechaza equivalencias sin respaldo. Que varios productos usen etiquetas como Agent, herramienta, memoria, proyecto, Skill o búsqueda no demuestra semánticas idénticas. Compara únicamente una tarea fija con las mismas entradas, criterios de aceptación, límite de riesgo y rúbrica de revisión; conserva las diferencias de configuración y anota `not_comparable`.

## Decide la disposición

Devuelve uno de estos estados:

- `admit_candidate`: existen todas las diferencias, fuentes, ejecuciones, fallos, responsables, fechas de revisión y límites de evidencia necesarios;
- `draft_source_gap`: una afirmación volátil importante carece de respaldo de primera mano;
- `draft_run_gap`: el contrato tiene fuentes, pero no una ejecución acotada;
- `merge_into_core`: no queda una diferencia de plataforma significativa;
- `quarantine`: la licencia, la seguridad, la privacidad o la procedencia no están claras;
- `retire`: el adaptador está obsoleto, no tiene responsable, está duplicado o ya no resulta útil.

No eleves el estado porque el inicio de sesión funcione, exista un comando o el texto parezca completo. Un adaptador `candidate` no equivale a transferencia de aprendizaje verificada ni a guía de producción.

## Entrega la revisión

Empieza por la disposición y su razón principal. Después incluye la matriz del contrato, las afirmaciones sin respaldo, las lagunas de fuente, ejecución o licencia, la duplicación con el núcleo universal, el siguiente experimento, el responsable, la próxima revisión y lo que aun pasando no quedaría demostrado. Ajusta el formato al número de afirmaciones; no impongas títulos ceremoniales a una revisión de una sola afirmación.

## Registro de mantenimiento

- `source`: método original de Prysai Lab que implementa ADR-0025 y el límite de admisión de contenido de referencia
- `license`: reescritura original; la documentación de proveedores y los informes comunitarios siguen siendo referencias salvo licencia independiente
- `owner`: platform-adapter maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
