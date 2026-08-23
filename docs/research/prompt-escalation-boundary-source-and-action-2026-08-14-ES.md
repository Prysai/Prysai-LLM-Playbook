<!-- content_id: prompt-escalation-boundary-source-and-action-2026-08-14 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: prompt-escalation-boundary-source-and-action-2026-08-14.md | source_revision: 2026-08-23 -->

# Cuando un prompt sencillo no basta: límite entre fuente y acción

**Estado:** candidato de investigación / `not_run`

**Acceso:** 2026-08-14 (America/Los_Angeles)

**Responsable:** curriculum-maintainer

**Próxima revisión:** 2026-11-14, o antes de convertir este límite en una tarjeta para alumnos, evaluarlo con alumnos o usarlo para afirmar algo sobre un producto concreto.

## Pregunta y alcance

¿Cuál es la decisión mínima que permite a un principiante separar un prompt de texto normal de un trabajo que necesita investigación respaldada por fuentes o un protocolo de tarea auditable? Este registro cubre solo la primera elección de ruta entre: transformar o comentar texto que el lector ya proporcionó; hacer una afirmación material sobre el mundo exterior; y cambiar un archivo, cuenta, sistema compartido, publicación u otro estado externo.

No prescribe un formato universal, no compara modelos, no verifica fuentes, no ejecuta tareas ni evalúa al alumno. Es un límite de enrutamiento del núcleo de colaboración con LLM, no un adaptador de una plataforma.

## Método y selección de fuentes

Solo se conservaron fuentes primarias: documentación actual para desarrolladores de OpenAI y una publicación del NIST. La página de OpenAI es específica del producto y puede cambiar; la publicación del NIST es un perfil de riesgos, no una guía de prompts ni una prueba de modelos. Solo se leyeron. No se ejecutaron cuentas, llamadas API, intercambios con modelos, sesiones de alumnos, búsquedas de fuentes ni tareas.

La inferencia del proyecto es conservadora: usa un prompt sencillo solo cuando el lector puede revisar el resultado contra el material proporcionado y no necesita una afirmación externa actual ni una acción externa. Si falla cualquiera de las condiciones, escala. Es una decisión didáctica, no una afirmación de que un prompt largo sea inseguro o de que escalar garantice la corrección.

## Mapa de evidencias

| ID | Afirmación | Clase | Apoyo principal y alcance | Límite |
|---|---|---|---|---|
| O1 | OpenAI muestra un prompt sencillo para generar un texto breve y ficticio. | hecho oficial | Ejemplo de cuento para dormir de una frase en la guía de prompts. | No demuestra que los prompts sencillos sirvan para hechos, consecuencias o trabajo entre productos. |
| O2 | OpenAI dice que el comportamiento de los prompts no es determinista y recomienda pruebas y suites de evaluación cuando aumentan la complejidad o cambian los modelos. | hecho oficial | Sección «Prompt engineering» de la misma guía. | Es orientación para la API, no prueba de un fallo concreto, aprendizaje o regla universal. |
| O3 | El perfil de IA generativa del NIST identifica la confabulación como riesgo y hace depender la gestión del contexto. | hecho oficial | NIST AI 600-1. | No clasifica como seguro o inseguro ningún prompt, fuente o tarea de este repositorio. |
| P1 | Un principiante puede preguntar: «¿El resultado introducirá un hecho externo importante o cambiará algo fuera de esta conversación?». | inferencia del proyecto | Prueba creada a partir de O1–O3 y los contratos existentes. | No hay datos de alumnos, modelos, revisión independiente ni finalización. |
| L1 | No se verificó ninguna fuente, no se ejecutó ningún flujo ni se observó a ningún alumno. | reproducción local | `not_run`; revisión de fuentes y contratos. | No permite afirmar fiabilidad, usabilidad ni efecto educativo. |

## El problema inicial, en pequeño

«¿Esta política sigue vigente? Resúmela y actualiza nuestra página pública de ayuda». La petición mezcla una afirmación externa actual y una acción de publicación. Una respuesta fluida puede ocultar la fuente responsable, la fecha, el permiso, el destino y la evidencia de aceptación. No hay encuesta ni muestra de usuarios; es un escenario de enseñanza definido por el proyecto, no una medida de frecuencia.

## Mapa de escalada

| Petición | Primera acción segura | Respaldo | Parada | Ruta existente | Lo que no se afirma |
|---|---|---|---|---|---|
| «Reescribe mi párrafo para un público amable; no añadas hechos». | Nombra el texto, público, forma de salida y comprobación de conservación. | Dialogue Brief o First-Turn Check. | Para si hace falta un hecho, fuente, cuenta, archivo o acción nuevos. | `prysai-dialogue-brief` / `prysai-first-turn-check` | Un prompt claro no prueba que el texto sea adecuado, completo o verdadero. |
| «¿Este hecho de producto o política actual es cierto?». | Fija una afirmación, decisión, fecha límite, responsable de fuente y condición de cambio. | Si no se puede acotar, conviértelo en pregunta abierta. | Marca `unresolved` si no se puede comprobar al responsable, el alcance es ambiguo o la evidencia no basta. | `prysai-source-investigator` | Una búsqueda con fuentes no demuestra respuesta correcta, integridad de fuentes, validez futura ni resultado de decisión. |
| «Compara varias opciones y dime qué concluye la investigación». | Declara decisión, candidatos, criterios, clases de fuentes, fecha límite y entrega. | Reduce a una búsqueda acotada si solo queda un hecho decisivo. | Para si no puedes fijar la pregunta, evidencia o conjunto sin adivinar. | `prysai-research-router` | Un plan o lista de citas no es una revisión completa, validación independiente ni recomendación. |
| «Usa la respuesta para actualizar, enviar, publicar, comprar, conectar o cambiar algo». | Separa búsqueda y cambio; define destino, acciones, responsable, aceptación, checkpoint y restauración. | Conserva un borrador sin enviar o un plan de solo lectura. | Para si falta autoridad, destino, límite de datos, evidencia o confirmación. | `prysai-task-protocol` | Un protocolo completo no autoriza ni demuestra ejecución, seguridad, despliegue o restauración. |

## Prueba de ruta compacta

Antes de la primera petición, responde: (1) ¿puedo juzgar el resultado solo con el texto y los hechos que proporcioné? (2) ¿necesita una afirmación externa actual o cambiará algo fuera de la conversación? Si la primera es sí y la segunda no, un prompt de texto puede ser un inicio. Un hecho material va a la ruta de fuentes; una acción externa también pasa por el contrato de tarea. Si aparecen ambos, mantén separadas la búsqueda de fuentes y la autoridad para actuar. Las preguntas médicas, legales, financieras, laborales, educativas, de vivienda, inmigración, seguros o seguridad personal requieren revisión humana o experta; este registro no la proporciona.

## Límite de fallo y evidencia de aceptación

Fallo: pedir en un solo turno «confirma la regla actual y envía la actualización». El modelo devuelve un párrafo seguro y un enlace, pero no se puede identificar responsable, fecha, ubicación de apoyo, destino de publicación ni permiso para enviar.

Recuperación mínima: conserva el borrador sin enviar, separa pregunta de fuente y acción propuesta y detente en la regla de entrada que falta. No pidas al modelo que invente autoridad ni uses una página inaccesible como prueba.

Aceptación candidata: el lector puede señalar el resultado solicitado, si el hecho externo es material, si se propone una acción, la ruta seleccionada y la condición de parada. Solo comprueba que la decisión de ruta está escrita; no verifica fuente, salida, acción ni aprendizaje.

## Límite frente al material existente

Este registro no sustituye los contratos de first-turn, research, source o task. Añade una distinción pequeña: un prompt sencillo transforma o comenta texto proporcionado; Source Investigator atiende una pregunta actual acotada; Research Router diseña investigación no resuelta o de varias fuentes; Task Protocol trata autoridad, efectos secundarios, aceptación y recuperación. No se propone ningún Skill, tarjeta, capítulo, Lab, registro, fixture ni afirmación nueva para lectores.

## Fuentes principales

| ID | URL autorizada | Responsable | Fecha | Alcance y mantenimiento |
|---|---|---|---|---|
| O1, O2 | [Documentación de OpenAI: Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering.md) | OpenAI | 2026-08-14 | Orientación de desarrolladores específica del producto; revisar antes de citar una API, modelo, evaluación o conducta concreta. |
| O3 | [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | National Institute of Standards and Technology | 2026-08-14 | Guía de perfil de riesgos; revisar antes de afirmar cumplimiento, conformidad, incidente o riesgo de un sistema. |

## Límites, divulgación y siguiente evidencia

El texto es original de Prysai. Las fuentes se enlazan como evidencia; no se copia ningún prompt, código o material didáctico externo. Este registro no demuestra que los principiantes reconozcan el límite, que un modelo enrute correctamente, que las citas sean válidas ni que las rutas mejoren la seguridad o el éxito.

Antes de convertirlo en contenido para lectores, realiza una observación de alumnos, de bajo riesgo y predefinida. Conserva petición inicial, ruta elegida, motivo, campos sin resolver, tiempo transcurrido y si el participante confundió un plan o una cita con evidencia de ejecución. Mantén `candidate` hasta que la observación permita una afirmación más estrecha.
