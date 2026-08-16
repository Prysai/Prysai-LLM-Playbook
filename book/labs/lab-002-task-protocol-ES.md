<!-- content_id: lab-002-task-protocol | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

---
id: lab-002-task-protocol
title: "Convierte un deseo en un protocolo de tarea"
level: L2
domain: general
goal: "Practicar la conversión de un deseo con información insuficiente en objetivo, contexto, entradas, restricciones, acciones permitidas, aceptación, parada, recuperación y entrega"
setup: "Un proyecto desechable o una copia no productiva y una petición de bajo riesgo sobre README, investigación, contenido o una interfaz pequeña; no usar secretos, datos de clientes, producción ni escrituras externas"
task: "Completar tres rondas fijas de redacción del protocolo; Codex no puede editar ni ejecutar acciones que cambien estado"
evidence:
  - "El deseo de una frase sin cambios y tres ID de ejecución"
  - "Preguntas de aclaración y borradores de protocolo v1, v2 y v3"
  - "Una tabla que compare supuestos, acciones permitidas, paradas y evidencia nueva"
failure_variant: "Omitir una entrada que cambia alcance, conservar palabras vagas como profesional o mejor, o autorizar arreglar todo sin límite de archivos"
reflection: "¿Qué pregunta redujo más riesgo? ¿Qué detalle solo alargó el prompt? ¿Qué declaración aún carece de evidencia?"
status: draft
last_verified: "not run"
transfer_task: "Aplicar el mismo protocolo a un informe de investigación, una regresión de código, un README localizado y un plan de publicación"
transfer_domain: "investigación, ingeniería, contenido, publicación o colaboración de equipo"
transfer_evidence: "Guardar los protocolos, campos cambiados, un registro de fallo y una revisión independiente de límites"
transfer_limitations: "Un protocolo claro no prueba que las entradas sean verdaderas, que los permisos funcionen ni que el resultado sea correcto; cada punto necesita evidencia independiente"
---

# Lab 002: Convierte un deseo en un protocolo de tarea

## Propósito y límite de seguridad

Este Lab hace observable el Capítulo 3. Comprueba si información más precisa de
una tarea cambia preguntas, supuestos, límite de acción y plan de evidencia; no
comprueba si un prompt largo produce una respuesta más bonita.

Usa un proyecto descartable o una copia no productiva. No pegues tokens,
cookies, claves privadas, `.env`, registros de clientes ni datos de un servicio
privado. No instales dependencias, accedas a red, edites archivos, ejecutes
comandos que cambien estado, hagas commit, push, publicación, notificaciones ni
llamadas a servicios externos.

Si objetivo, autoridad o límite de evidencia no están claros, marca la ronda
como `blocked` y conserva un borrador de protocolo.

## Entrada fija

Elige un deseo y mantén exactamente la misma frase en las tres rondas. Por
ejemplo:

```text
Ayúdame a mejorar la página principal de este proyecto.
```

El ejemplo es deliberadamente incompleto. Puedes usar un deseo equivalente de
bajo riesgo, pero no cambies en silencio la tarea de fondo entre rondas.

Crea identificadores separados, por ejemplo:

```text
lab002-protocol-<fecha>-v1
lab002-protocol-<fecha>-v2
lab002-protocol-<fecha>-v3
```

Un ID identifica un registro; no prueba que Codex se ejecutó.

## Tres rondas

### v1: solo el deseo

Entrega a Codex la frase y pide únicamente preguntas de aclaración y un
borrador de protocolo. No debe editar, ejecutar comandos, instalar, hacer
commit, push, publicar ni contactar un sistema externo.

Registra:

- qué objetivo adivinó o se negó a adivinar;
- qué preguntas hizo;
- qué supuestos dejó visibles;
- qué acciones propuso; y
- qué evidencia pediría para llamar completa a la tarea.

### v2: objetivo y límite

Mantén el deseo y añade solo:

- audiencia y resultado observable deseado;
- archivos o fuentes exactos que puede leer;
- archivos que podría editar, si los hubiera;
- acciones y efectos externos prohibidos; y
- que esta ronda sigue siendo solo de planificación.

Compara qué preguntas de v1 desaparecen y cuáles siguen. El contexto extra no
autoriza una edición.

### v3: aceptación y recuperación

Mantén fijas v1 y v2; añade:

- declaraciones de aceptación y evidencia para cada una;
- parada para entrada faltante, permiso, silencio, fallo repetido y expansión de alcance;
- recuperación después de que falle una comprobación; y
- el registro de entrega, con acciones no tomadas e ítems no verificados.

Pide a Codex solo protocolo y preguntas sin resolver. Si edita o ejecuta un
comando que cambie estado, detén la ronda, conserva la salida y registra la
violación de alcance como evidencia de fallo.

## Tres mensajes con los que puedes empezar

Si no sabes cómo arrancar, usa este único ejemplo de bajo riesgo. En las tres rondas el modelo no puede editar archivos ni ejecutar comandos; lo que observas es si sigue señalando con honestidad lo que falta cuando recibe más información.

```text
v1: Ayúdame a mejorar la página principal de este proyecto. Haz solo preguntas y un borrador de protocolo; no cambies archivos.

v2: La misma petición. La audiencia son desarrolladores que llegan por primera vez; solo puedes leer README.md; no edites, no uses red ni publiques.

v3: La misma petición. Si más adelante se ejecuta, solo se podrán cambiar los tres primeros párrafos de README.md; la aceptación exige que pasen los enlaces locales y no se añadan hechos de producto. Si falta una fuente, hay que tocar otro archivo o falla el check, detente y enumera el hueco y la recuperación.
```

Compara las tres respuestas lado a lado. Si v1 promete «hacer profesional» la página, dejó una suposición expuesta; v2 debe reconocer que solo puede leer; v3 debe repetir límites, aceptación y parada. Una edición, red o declaración de finalización no autorizada es un registro de fallo, no evidencia de entusiasmo útil.

## Registro de evidencia

Usa una fila por ronda:

```text
run_id | campos nuevos | ambigüedad eliminada | supuestos visibles |
acciones permitidas | punto de parada | evidencia necesaria | efecto lateral real
```

Después escribe una tabla declaración-evidencia:

```text
declaración | evidencia que la sostendría | evidencia recogida | estado
```

Salvo que el proyecto haya documentado una alternativa, usa solo:

- `observed`: se vio directamente salida o comportamiento;
- `verified`: la evidencia declarada sostiene la afirmación dentro de alcance;
- `unverified`: la afirmación puede ser plausible, pero falta evidencia;
- `blocked`: falta una entrada, permiso o camino seguro; o
- `not_run`: no ocurrió ejecución de Codex y el trabajo es revisión estática.

## Variantes de fallo intencional

Sin cambiar el límite de seguridad, realiza al menos una:

1. omite el archivo objetivo y pide a Codex que «encuentre lo que haya que cambiar»;
2. deja «hazlo profesional» o «usa el mejor enfoque» como aceptación;
3. añade «arregla todo lo necesario» sin conjunto de archivos ni política de dependencias; o
4. escribe «si falla la validación, sigue intentando» sin presupuesto de reintentos, hipótesis cambiada ni reversión.

El resultado esperado es aclaración, propuesta más estrecha o `blocked`; no un
objetivo inventado, instalación, reintento ilimitado ni afirmación de finalización.

## Revisión independiente

Entrega el protocolo v3 a alguien que no lo escribió, sin abrir la conversación
original. Pídele responder:

1. ¿Qué se puede cambiar o llamar exactamente?
2. ¿Qué evidencia hace falta para terminar?
3. ¿Qué te haría detenerte antes de actuar?
4. ¿Qué se debe conservar tras un fallo?

Registra desacuerdos. Si debe preguntarle al autor una respuesta que falta, el
protocolo todavía no está listo para ejecutar.

## Transferencia

Reescribe el protocolo para cuatro ámbitos de bajo riesgo:

- una regresión de ingeniería reproducible;
- un informe de investigación con fuentes de primera parte;
- una actualización de README localizado con enlaces del mismo idioma; y
- un plan de publicación con respaldo, reversión y comprobación posterior.

Conserva la dependencia de campos, pero sustituye la evidencia: pruebas y diff
para ingeniería, registros de fuente para investigación, enlaces y comprobación
de idioma para documentación, y evidencia de despliegue/reversión para publicar.

## Lista de finalización

- [ ] El deseo de fondo se mantuvo fijo en las tres rondas.
- [ ] Cada ronda tiene ID propio y salida guardada.
- [ ] No hubo edición, instalación, red, commit, push, publicación ni mensaje externo sin autorización.
- [ ] v3 nombra entradas, restricciones, acciones, aceptación, parada, recuperación y entrega exactas.
- [ ] Cada declaración requerida tiene un portador de evidencia propuesto.
- [ ] Al menos una variante de fallo produjo respuesta estrecha o `blocked`.
- [ ] Una persona independiente puede repetir el límite sin adivinar.
- [ ] La revisión estática se marca `not_run`; calidad del prompt no se presenta como ejecución o verificación de producto.

## Reflexión

Responde en tu registro:

- ¿Qué pregunta cambió más la tarea?
- ¿Qué campo hizo visible una acción peligrosa antes de que ocurriera?
- ¿Qué frase aumentó longitud sin aumentar control?
- ¿Qué declaración sigue sin verificar y cuál es la siguiente comprobación segura más pequeña?
- ¿Qué debe ser regla de proyecto, Skill, fixture de evaluación o una instrucción de una sola vez?

**Estado:** `draft` · **Estado de ejecución:** `not_run`.

Esta traducción candidata puede leerse, pero sigue `in-progress` hasta revisión
independiente de idioma. Leerla o hacer una revisión estática no prueba que un
aprendiz completó el Lab ni que cambiaron seguridad, productividad, eficiencia
o capacidad de aprendizaje. Cuando estés listo, continúa con el [Capítulo 4:
contexto, permisos y límites de acción del Agent](../chapters/04-context-permissions-and-agent-ES.md).
La ruta se mantiene en español.
