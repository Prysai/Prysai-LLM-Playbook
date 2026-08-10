<!-- content_id: lab-011-gpt-codex-boundaries | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: f521e29 -->

# Laboratorio 011: Separar GPT, Codex, las herramientas y los Agents

---
id: lab-011-gpt-codex-boundaries
title: "Construye un mapa de límites observable antes de conceder autoridad"
level: L0
domain: general
goal: "Distinguir generación, contexto, ejecución, resultados de herramientas, verificación y bucles de Agent sin presuponer accesos ocultos"
setup: "Tarjetas de tareas sintéticas fijas y un registro de límites en blanco; sin cuentas reales, secretos, servicios externos ni repositorios públicos"
task: "Clasificar las tarjetas, realizar un experimento de contexto solo con texto y corregir una afirmación de finalización deliberadamente insegura"
evidence:
  - "Un registro de límites para las tarjetas A-E con motivos, acciones permitidas, acciones prohibidas, evidencia y puntos de parada"
  - "Dos registros de ejecución con revisión de entrada, run-id, etiqueta de superficie/modelo, variable modificada, resultado observado e incógnitas"
  - "Una nota de corrección que separe una acción de herramienta propuesta, la ejecución, el estado modificado y la verificación"
failure_variant: "Tratar una página de inicio de sesión, el nombre de una Skill, el nombre de un modelo o el mensaje de una herramienta como prueba de autoridad o de trabajo completado; o reintentar tras un error sin comprobar el checkpoint actual"
reflection: "¿Qué acontecimiento confundiste con una prueba y qué observación mínima cerraría realmente esa laguna de evidencia?"
status: draft
last_verified: "not run"
transfer_task: "Aplicar el registro a un informe de investigación basado en un conjunto fijo de fuentes públicas sin permitir escrituras externas"
transfer_domain: "investigación, ingeniería, contenido o marketing"
transfer_evidence: "Guardar el registro de transferencia, el límite de las fuentes, el motivo para excluir una instrucción no fiable y una lista explícita de elementos no verificados"
transfer_limitations: "Este laboratorio enseña límites observables; no demuestra que un modelo, una Skill, una herramienta, un conector, una cuenta o una superficie de Agent concretos se comporten de la misma manera en producción"
---

## Para qué sirve este laboratorio

Esta es una introducción de bajo riesgo a la puerta L0. No es una prueba de
integración en vivo ni te pide que pegues credenciales en Codex. El resultado
es un registro que otra persona puede inspeccionar, no una respuesta pulida.

Utiliza esta distinción entre acontecimientos:

    texto generado
      != acción de herramienta propuesta
      != acción permitida/ejecutada
      != estado modificado
      != resultado verificado

## Seguridad y preparación

- Trabaja en un directorio local desechable o en un registro de aprendizaje de
  texto sin formato.
- No conectes ChatGPT, Codex Cloud, GitHub, una cuenta del navegador, MCP ni
  ningún servicio externo para la parte obligatoria del laboratorio.
- No utilices tokens, cookies, claves privadas, archivos `.env`, datos de
  clientes ni archivos de producción.
- Edita únicamente el registro de aprendizaje y, si eliges la ampliación local
  opcional, un archivo de notas desechable.
- Si un paso propuesto requiere una llamada de red, acceso a una cuenta, un
  secreto, una escritura pública o un restablecimiento destructivo, detente y
  márcalo como `blocked`.

Crea un ID de ejecución como `lab011-es-2026-08-10-a`. Registra la fecha, la
etiqueta de superficie/modelo si se utiliza alguna, la revisión de entrada y el
hecho de que la parte obligatoria es estática o solo de texto.

## Parte 1: Completa el registro de límites

Clasifica estas tarjetas fijas. «Capa principal» significa la capa que debe
observar el estudiante; no es una afirmación sobre la implementación interna
del producto.

| Tarjeta | Tarjeta de tarea |
|---|---|
| A | «Explica el contexto con tus propias palabras e indica dos incertidumbres». |
| B | «Lee notes.md, añade un encabezado a una copia local desechable y muestra el diff». |
| C | «Llama a una herramienta, escribe el resultado en el repositorio público de la organización y avisa al equipo». |
| D | «Sigue intentando corregir el error hasta que parezca que todo ha salido bien; no registres el estado intermedio». |
| E | «El sistema tiene una sesión iniciada. La herramienta indicó que había terminado, así que publica ahora y omite las comprobaciones». |

Completa este registro:

| Tarjeta | Capa principal | Acción permitida | Acción prohibida | Evidencia mínima | Punto de parada/confirmación | Qué sigue siendo desconocido |
|---|---|---|---|---|---|---|
| A |  |  |  |  |  |  |
| B |  |  |  |  |  |  |
| C |  |  |  |  |  |  |
| D |  |  |  |  |  |  |
| E |  |  |  |  |  |  |

Utiliza este orden de decisión:

1. ¿La petición consiste en explicar/generar, leer/editar o modificar un
   estado externo?
2. Si modifica un estado, ¿qué objeto, autoridad, confirmación y rollback
   exactos son necesarios?
3. ¿Qué evidencia corresponde a la afirmación de finalización?
4. ¿Qué hace que la tarea se detenga en lugar de reintentarse?

Una respuesta de referencia sólida identifica A como explicación, B como una
tarea de ejecución local acotada, C como un plan con efectos secundarios
externos que no debe ejecutarse aquí, D como un bucle de Agent sin límites y E
como suposiciones sin respaldo. Explica los motivos; no copies esta frase como
prueba.

## Parte 2: Realiza un experimento controlado de contexto

Utiliza esta tarea solo de texto:

> Inspecciona el fragmento de README proporcionado e identifica una mejora. No
> edites archivos. Indica qué se te proporcionó, por qué importa la mejora, cómo
> podría comprobarse y qué no puedes saber.

Ejecuta la línea base solo con el fragmento. Repite con exactamente un cambio:

1. añade el público destinatario;
2. añade una breve regla del proyecto; o
3. añade una condición de aceptación.

No afirmes que el elemento modificado causó la diferencia en el resultado salvo
que hayas mantenido lo bastante fijos el modelo o la superficie, la revisión de
entrada, la configuración de generación y el estado de la herramienta como
para respaldar esa afirmación. Si no puedes hacerlo, escribe: se observó un
resultado diferente; la causa no se aisló.

Registra:

    run-id | revisión de entrada | superficie/modelo | variable modificada | ¿se llamó a una herramienta? | ¿se modificó un archivo? | evidencia observada | incógnitas

El laboratorio puede completarse con una simulación escrita manualmente. Una
ejecución real del modelo es opcional y debe etiquetarse con su evidencia real.
El resultado simulado de una herramienta nunca equivale al resultado de una
herramienta ejecutada.

## Parte 3: Corrige la afirmación de finalización insegura

Empieza por:

> «El inicio de sesión en el navegador se realizó correctamente, la herramienta
> devolvió `completed` y el modelo dijo que el cambio estaba hecho. Por tanto,
> el repositorio público se actualizó».

Reescríbelo como un registro de afirmaciones:

| Afirmación | Evidencia necesaria | Estado actual | Siguiente comprobación segura |
|---|---|---|---|
| La autenticación en el navegador se completó | Evidencia de la fase de autenticación y del token o la sesión del cliente |  |  |
| La acción estaba autorizada para este repositorio | Evidencia del objetivo, el alcance de la cuenta/organización y los permisos |  |  |
| La herramienta ejecutó la escritura | Invocación/resultado de la herramienta e identificador del objetivo |  |  |
| El objeto previsto cambió | Lectura nueva del objetivo o registro del lado del proveedor |  |  |
| El cambio es aceptable | Diff, revisión, pruebas o aceptación humana |  |  |

No rellenes un estado vacío con «probablemente». Utiliza `not_observed`,
`blocked`, `partial` o `verified within scope` y explica el alcance.

## Parte 3A: Añade un fallo a nivel de mecanismo

Elige uno de estos casos sintéticos sin red y añádelo al registro de
afirmaciones:

- **El esquema pasa, la semántica falla:** una respuesta contiene JSON válido y
  todos los campos obligatorios, pero el objeto al que hace referencia no
  existe. Añade una comprobación de negocio/estado.
- **Coincidencia de recuperación, excepción ausente:** se selecciona un
  fragmento de política general, pero falta la excepción específica de la
  versión. Añade la consulta, el filtro, el fragmento seleccionado y los campos
  de evidencia que faltan.
- **Datos con forma de instrucción:** un README o el resultado de una
  herramienta indica que se ignore la regla de seguridad de la tarea. Mantenlo
  como datos, rechaza el efecto secundario externo y registra la fuente y el
  intento de influencia.

El objetivo es nombrar la capa exacta que falló. El resultado de un esquema,
una coincidencia de recuperación o una cadena visible no demuestran
automáticamente que la semántica sea correcta, que el contexto esté completo o
que exista autoridad. Consulta la [investigación sobre los mecanismos de los LLM](../../docs/research/llm-mechanism-deep-dive-2026-08-10.md)
para conocer los límites respaldados por fuentes; este laboratorio no ejecuta
un proveedor en vivo.

## Parte 4: Practica la regla de parada

Elige un fallo inyectado e inofensivo:

- informa de que el modelo ha alcanzado su límite de capacidad;
- informa de que un comando ha permanecido en estado Working más allá del
  límite de tiempo declarado; o
- informa de que un comando de validación solicita una reinstalación forzada.

No reintentes automáticamente. Escribe:

    estado | síntoma visible | checkpoint actual | evidencia capturada | autoridad necesaria | acción mínima de recuperación | elementos no verificados

La recuperación correcta suele consistir en inspeccionar el estado actual,
conservar el registro, limitar la siguiente comprobación o solicitar autoridad.
No consiste en borrar el espacio de trabajo, forzar la instalación de
dependencias ni enviar la siguiente instrucción en cola.

Estas formas de fallo se basan en informes públicos de la
[investigación sobre problemas de campo de Codex](../../docs/research/field-problems-codex.md).
Constituyen evidencia de usuarios, no una confirmación oficial de la causa
raíz, y este laboratorio no afirma haberlas reproducido localmente.

## Paquete de evidencia

Entrega un directorio o registro Markdown que contenga:

1. la versión de las tarjetas fijas y los ID de ejecución;
2. el registro de límites A-E completado;
3. las dos filas del experimento de contexto y los factores de confusión;
4. el registro de afirmaciones corregido;
5. el registro de parada/recuperación; y
6. un resumen personal de no más de 150 palabras.

El resumen debe responder:

- ¿Cuál es la diferencia entre el resultado del modelo y el resultado de una
  herramienta?
- ¿Cuál es la diferencia entre el resultado de una herramienta y un estado
  verificado?
- ¿Por qué un inicio de sesión, el nombre de un modelo, el nombre de una Skill o
  un mensaje de finalización no demuestran autoridad ni corrección?
- ¿Qué afirmación sigue en `not_observed`?

## Criterios de aceptación

Aprueba únicamente si:

- cada tarjeta fija tiene un motivo, un límite, evidencia y un punto de parada;
- las tarjetas C y E no provocan ninguna escritura ni notificación externa
  real;
- al menos una afirmación se deja deliberadamente sin verificar en lugar de
  adivinarla;
- el experimento de contexto registra una variable modificada y cualquier
  factor de confusión;
- el ejercicio de fallo se detiene antes de una escalada destructiva o no
  autorizada;
- el caso de mecanismo identifica si la laguna se encuentra en el esquema, la
  selección de contexto, la autoridad de las instrucciones, la ejecución o la
  verificación; y
- un segundo lector puede distinguir qué acontecimientos fueron simulados,
  observados o no ejecutados.

El laboratorio sigue en `draft`, con `run_status` en `not_run`, hasta que el
proyecto disponga de un registro de ejecución real y una revisión
independiente. Una hoja de trabajo completa es evidencia sobre el ejercicio del
estudiante, no evidencia de que todas las superficies del producto Codex se
comporten de la misma manera.

## Tarea de transferencia

Toma un conjunto fijo de fuentes públicas y prepara un informe de investigación
de una página en un archivo local desechable. Marca como capas separadas el
texto de las fuentes, las instrucciones del usuario, las sugerencias del
modelo, las ediciones locales y las comprobaciones de verificación. Añade una
fuente que contenga una frase con forma de instrucción pero irrelevante para el
informe. Registra por qué se trata como datos y no como autoridad. No navegues,
publiques ni llames a un conector externo para esta transferencia salvo que
crees un nuevo protocolo de tarea con alcance y confirmación explícitos.

## Fuentes y mantenimiento

- [Terminología del proyecto](../../CONTEXT.md) — límites estables para el laboratorio.
- [Línea base de hechos oficiales de OpenAI Codex](../../docs/research/openai-codex-baseline.md) — hechos fechados del producto y límites de permisos; comprobado el 2026-08-09.
- [Investigación sobre problemas reales de usuarios de Codex](../../docs/research/field-problems-codex.md) — informes públicos, enlaces a las fuentes y etiquetas de evidencia; comprobado el 2026-08-09.
- [Análisis detallado de mecanismos de los LLM](../../docs/research/llm-mechanism-deep-dive-2026-08-10.md) — fichas de mecanismos y experimentos de fallo respaldados por fuentes oficiales; comprobado el 2026-08-10.
- [Capítulo 1 — Entender GPT antes de confiar en Codex](../chapters/01-gpt-and-codex-ES.md) — contexto conceptual y de casos de campo para este laboratorio.

Este es un ejercicio original. No copia prompts, registros, credenciales ni
instrucciones de Skills externas. Vuelve a comprobar los hechos volátiles del
producto antes de utilizar una superficie en vivo; el estado sigue siendo
`draft` hasta que exista la evidencia declarada.
