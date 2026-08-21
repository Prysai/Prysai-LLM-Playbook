<!-- content_id: book-preface | locale: ES | language: es | default_locale: EN | content_status: candidate | translation_status: in-progress | reader_runtime_status: not_run | translated_from: EN | source_revision: dd08a68 -->

# Prefacio: esto no es una colección de prompts

Cuando muchas personas conocen GPT por primera vez, la pregunta más natural
es: «¿Qué debería decirle?»

Es una pregunta importante, pero no basta. Lo que realmente determina si una
tarea de Codex se completa de forma estable suele ser otro conjunto de
preguntas: ¿qué entendió?, ¿qué archivos y reglas forman parte del contexto?,
¿qué acciones puede realizar?, ¿qué Skill puede reducir las omisiones?, ¿por
qué el Agent continúa, reintenta, pausa o se detiene?, y ¿qué evidencia me
permite confiar en que terminó?

Prysai LLM Playbook estudia precisamente ese conjunto de
relaciones.

## Qué aprenderás

El proyecto avanza en dos direcciones al mismo tiempo.

Una es la ruta de comprensión: parte de GPT y los modelos, explica cómo Codex
conecta el modelo con el proyecto, los archivos, el terminal, el navegador,
GitHub y los servicios externos, y después muestra cómo el contexto, las
herramientas, las Skills, los Plugins, los Connectors, MCP, los Agents y los
permisos cambian juntos el espacio de acción.

La otra es la ruta de capacidad: comienza con una tarea pequeña y de bajo
riesgo, practica la expresión de tareas, la selección del contexto, la
planificación, la ejecución, la verificación, la revisión y la entrega; luego
enseña a elegir y diseñar Skills, evaluar modelos y flujos de trabajo, crear
un sistema de trabajo personal y, por último, convertir el método en
paquetes de capacidad que un equipo pueda compartir, revisar y actualizar.

Estas dos rutas no pueden separarse. Entender los principios sin practicar
deja al lector atrapado en los términos; saber llamar a las herramientas sin
entender los límites hace que un éxito accidental parezca una capacidad
fiable.

## Cómo leer

Puedes leer en orden o entrar desde una tarea real. Cada capítulo sigue el
mismo ciclo:

```text
Problema → concepto → decisión → acción → evidencia → fallo → retrospectiva → transferencia
```

Los «experimentos» del capítulo no sustituyen a un vídeo demostrativo: son
tareas mínimas que el lector debe completar personalmente. Los experimentos
te pedirán conservar resultados, diferencias, registros, fuentes, capturas o
una retrospectiva; solo así la lectura se convierte en capacidad.

## Cómo saber si realmente has aprendido

Este proyecto no usa «la salida se ve bonita» como criterio de dominio. Una
capacidad necesita al menos cuatro tipos de evidencia:

- puedes explicar con tus propias palabras el concepto y sus límites;
- puedes completar la operación en un entorno real o de bajo riesgo;
- puedes explicar por qué elegiste ese modelo, herramienta, Skill o permiso;
- puedes detectar errores, riesgos, alucinaciones, elementos incompletos o
  hechos desactualizados.

Si solo puedes mostrar el resultado, pero no explicar el proceso ni la
evidencia, quizá hayas terminado un ejercicio, pero todavía no dominas el
método.

Los estados declarados de trabajo se conservan como identificadores
interoperables: `candidate`, `draft` y `not_run`. Un capítulo puede estar en
`draft`, una Skill en `candidate` y una evaluación en `not_run` al mismo
tiempo. Ninguno de esos estados equivale a `verified` o
`production-ready`; la traducción española tampoco se presenta como
verificada solo porque el archivo exista.

## Sobre Luna

GPT-5.6 Luna es uno de los modelos que el proyecto evalúa de forma prioritaria.
La documentación oficial de OpenAI lo presenta como un modelo rápido, de
menor coste y adecuado para tareas claras y repetibles. Esa descripción puede
convertirse en una hipótesis que merezca verificación, pero no permite
concluir directamente que sea «la mejor relación calidad-precio» para todas
las tareas.

El proyecto te enseñará a fijar el conjunto de tareas, el contexto, las
herramientas, los permisos, el presupuesto de tiempo, el número de
repeticiones y los criterios de éxito, y después a comparar la tasa de primer
éxito, el retrabajo, el tiempo, el coste, la integridad de la evidencia y la
corrección de la detención. Las conclusiones solo serán válidas para el
conjunto de tareas, el entorno y la fecha declarados.

## Un principio de seguridad importante

Cuanto mayor sea la capacidad, más claros deben ser los límites. Que Codex
pueda acceder a archivos, al terminal, al navegador, a GitHub o a servicios
externos no significa que debas abrir todos los permisos de una vez. Empieza
con tareas de solo lectura, de bajo riesgo y reversibles; aumenta la
capacidad por capas únicamente cuando la evidencia demuestre que hace falta.

Que este libro te dé algo más que una colección misteriosa de «instrucciones
universales»: la meta es una forma de trabajo que puedas explicar, comprobar,
mejorar y enseñar.

## Empieza por un problema real

Si no quieres leer en orden, elige un capítulo desde el [índice del libro en
español](table-of-contents-ES.md) y entra después
en los casos de problemas reales, la especificación de fixtures de evaluación
y el archivo de investigación que ese capítulo enumera. Los 22 capítulos están
en estado `candidate`; los 18 Labs siguen en `draft / not_run`, y los recorridos
de evaluación sin registros también permanecen en `not_run`. Estos enlaces
sirven para localizar ejercicios y evidencia; no significan que el capítulo,
la traducción o la evaluación ya hayan sido verificados.

Para volver a la guía del manuscrito en español, usa la [entrada del libro en
español](README-ES.md). Los materiales compartidos que no son páginas de lectura
—por ejemplo, fuentes, fixtures y registros de gobernanza— conservan su idioma
original y se presentan como evidencia, no como una traducción silenciosa.
