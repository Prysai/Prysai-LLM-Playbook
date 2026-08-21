<!-- content_id: chapter-10-planning-and-slicing | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 10: planificación y cortes verticales

**Estado:** `candidate`. El plan y los ejemplos son material didáctico. No demuestran que un Agent haya ejecutado el trabajo ni que este método funcione en todos los repositorios.

## El problema que resuelve este capítulo

Un plan puede sonar detallado y, aun así, ocultar que nadie podrá comprobar un resultado hasta el final. Si terminas primero todos los datos, luego toda la API y después toda la interfaz, tardarás en descubrir una suposición equivocada. Un corte vertical busca un resultado pequeño que recorra el camino completo.

```text
una entrada → cambio mínimo → acción observable → comprobación enfocada → evidencia
```

No es una excusa para cambiarlo todo de una vez. Es una forma de descubrir pronto el riesgo más costoso, dentro de un alcance que se pueda revisar y deshacer.

## Objetivos de aprendizaje

Al terminar, podrás convertir un proyecto grande en un corte pequeño y observable, registrar sus dependencias y puntos de parada antes de editar, y dejar un intento fallido para que otra persona pueda retomarlo sin adivinar el alcance ni los permisos. El ejercicio no mide la velocidad general, la calidad de un modelo ni el aprendizaje a largo plazo.

## Problemas reales: un plan detallado no siempre produce un resultado comprobable

Un plan puede enumerar muchos archivos, fases y herramientas y aun así no ofrecer un primer estado que alguien pueda comprobar. El riesgo real es una cadena larga de supuestos: un archivo que no existe, un permiso desconocido o un criterio de aceptación ambiguo aparecen después de acumular trabajo imposible de revisar. Un corte vertical comprueba primero la dependencia que podría bloquear el siguiente paso visible.

## Diseña el corte antes de editar

| Campo | Pregunta que responde |
|---|---|
| Resultado | ¿Qué podrá observar alguien al final? |
| Entrada | ¿Qué archivo, dato o decisión queda fijado? |
| Límite | ¿Qué archivos, permisos y efectos están permitidos? |
| Cambio mínimo | ¿Cuál es la modificación más pequeña que crea el resultado? |
| Comprobación | ¿Qué comando, inspección o lectura podría rechazarlo? |
| Evidencia | ¿Qué diff, salida, captura o revisión se conservará? |
| No demostrado | ¿Qué queda fuera del alcance? |
| Recuperación | ¿Cómo se vuelve al último estado aceptado? |

Un buen corte permite tomar una decisión. «Migrar toda la navegación» no basta. «Una persona abre un capítulo local desde el índice, encuentra la práctica y vuelve por una ruta registrada» sí se puede comprobar.

## Planifica por dependencias, no por entusiasmo

1. Escribe el resultado y los criterios de aceptación antes de proponer herramientas.
2. Enumera entradas, dependencias, permisos y hechos que aún no conoces.
3. Pon primero la incógnita que podría bloquear el resultado.
4. Elige un corte que deje evidencia incluso si falla.
5. Fija el orden de comprobación y el punto de parada.
6. Después de cada corte, revisa el diff, el alcance, la evidencia y la siguiente decisión.

No conviertas una lista de tareas en una promesa. Las tareas pueden ejecutarse y aun así no producir el resultado. Un plan debe hacer visibles sus supuestos, no esconderlos detrás de un tono de seguridad.

## El experimento

### Preparación

Prepara una copia local desechable, sin remoto, secretos ni cuentas externas. Elige un texto inicial pequeño, un cambio conocido y una pregunta de aceptación fija. Guarda la revisión base y define una regla de parada antes de empezar; no instales, publiques ni envíes nada.

### Tarea

En una copia desechable, compara dos planes para el mismo cambio pequeño: uno horizontal y otro vertical. Conserva el plan inicial, la revisión base, los comandos, los diffs, las comprobaciones y los puntos en los que cambió una decisión. Introduce una dependencia ausente o un criterio de aceptación ambiguo. El plan vertical cumple si hace visible el bloqueo antes de acumular cambios imposibles de comprobar.

No midas la velocidad ni la calidad general a partir de una sola tarea. Marca como `unavailable`, `unknown` o `not_run` los tiempos, costes y resultados que no hayas observado.

### Evidencia

Conserva ambos planes, la entrada fija, el corte elegido, los supuestos sobre dependencias y permisos, el diff, la salida de la comprobación, el punto de parada y la tarjeta de entrega. Si un intento no se ejecutó, sigue siendo `not_run`; un plan plausible no sustituye un resultado.

## Hoja de tres planes: elige por la primera evidencia útil

Para una misma petición, escribe tres alternativas antes de abrir el editor.
No tienes que ejecutar las tres; la comparación sirve para detectar dónde cada
una oculta el primer resultado útil.

| Forma | Primer paso típico | Primera evidencia útil | Señal para no seguir |
|---|---|---|---|
| Horizontal | «Prepara todos los datos y después toda la interfaz» | Suele llegar tarde, tras completar varias capas | No hay una persona, entrada ni comprobación que se pueda revisar hoy |
| Orden de archivos | «Edita estos archivos en este orden» | Un diff local que se puede revisar | El orden de los archivos no explica qué resultado verá alguien |
| Vertical | «Con una entrada fija, muestra un resultado y compruébalo» | Un recorrido pequeño, una comprobación y un registro | El primer recorrido exige publicar, instalar o cambiar varios sistemas |

Elige el plan vertical cuando necesites saber pronto si la idea merece el
siguiente paso. Elige una sonda de solo lectura cuando todavía no sepas si existe
una dependencia, un permiso o un archivo. Una sonda responde «¿podemos continuar?»;
pero no cuenta como una función terminada.

## Tarjeta de parada y entrega

Una interrupción no borra el plan, pero tampoco autoriza a continuar. Antes de
cerrar la sesión o pedir ayuda, deja una tarjeta que otra persona pueda leer sin
conocer la conversación:

```text
slice: nombre de un único resultado observable
baseline: rama, revisión o copia que se comparó
hecho con evidencia: cambio y prueba que sí existen
bloqueo o incertidumbre: primera dependencia o comprobación que falta
estado del destino: sin cambio / parcial / desconocido
no hacer todavía: permisos, instalaciones, publicación o archivos excluidos
siguiente acción única: sonda de lectura o reintento idempotente
```

Si no puedes nombrar una sola acción siguiente, el corte sigue siendo demasiado
grande. Divide la pregunta antes de volver a pedir «continúa».

## Haz tu primer corte completo

No empieces por «mejora todo el curso». Elige un texto local de un máximo de
120 palabras que una persona nueva pueda entender. El resultado de este corte es
modesto: dos secciones visibles, **Qué cambió** y **Cómo comprobarlo**, sin
publicar, instalar ni editar otros archivos.

Primero pide al modelo que no edite todavía. Dale esta tarjeta:

```text
resultado: un lector ve qué cambió y cómo comprobarlo
entrada fija: un solo archivo local de hasta 120 palabras
permitido: proponer el texto y editar solo ese archivo tras confirmación
prohibido: publicar, instalar, cambiar enlaces o tocar otros archivos
aceptación: las dos secciones existen y una lectura humana puede encontrarlas
alto si: falta el archivo, el cambio exige otro archivo o la petición deja de ser clara
```

Después sigue este orden: definir → pedir un plan de tres pasos → comprobar el alcance
antes de editar → hacer un cambio pequeño → comparar el antes y el después → leer las
dos secciones → dejar una entrega honesta. Si el modelo propone ampliar el
trabajo, vuelve a la tarjeta; ampliar el alcance no es «ser más útil» sin una nueva
decisión.

## Compara dos formas de pedir ayuda sin inventar una métrica

Puedes probar una vez la petición directa («hazlo más claro») y una vez la tarjeta
anterior. Mantén constantes el texto, el modelo, la herramienta, el tiempo disponible
y el criterio de lectura. Conserva ambos prompts, las versiones, las preguntas del lector
y cualquier error. Si cambia una variable, registra `not_comparable`; una respuesta más
rápida o más bonita no demuestra productividad general ni superioridad de un modelo.
El ejercicio sirve para observar qué información faltaba antes de editar y si el resultado
se puede revisar.

## Fallo seguro y límite

Quita deliberadamente **Cómo comprobarlo** o usa un archivo que no existe. El
primer fallo debe mostrarte si falta contenido o si la entrada es incorrecta. No
añadas dependencias ni abras permisos para ocultarlo. Escribe qué viste, qué parte
sigue sin demostrarse y cuál es la única acción segura siguiente. El capítulo sigue
en `candidate`: este ejercicio no mide por sí solo eficacia, velocidad ni aprendizaje
duradero.

## Reflexión

¿Qué dependencia habrías descubierto al final con el plan horizontal? ¿Qué evidencia hizo comprobable el corte vertical y qué afirmación siguió fuera de alcance incluso después de la comprobación?

## Tarea de transferencia

Planifica el mismo corte para investigación, práctica de idiomas o revisión de contenido. Conserva el resultado, la entrada fija, las acciones permitidas y prohibidas, la comprobación y la recuperación. Para un idioma, la aceptación debe incluir recordar más tarde un contenido nuevo sin ayuda, no solo una respuesta fluida con asistencia. Escribe qué no demuestra el nuevo ejercicio.

## Lista de aceptación

- [ ] El resultado, la entrada, el alcance y la aceptación se pueden observar.
- [ ] El corte tiene una comprobación, una regla de parada y una fuente de recuperación definidas.
- [ ] La evidencia permite revisar incluso un intento fallido.
- [ ] Los efectos externos siguen fuera del alcance salvo que exista autorización explícita.
- [ ] El resumen diferencia lo cambiado, lo verificado, lo bloqueado y lo no demostrado.

## Fuentes y límite de mantenimiento

Los cortes verticales, el orden de las dependencias y los puntos de parada son el método estable de este proyecto. Las funciones del producto, los permisos, la disponibilidad de modelos y los síntomas descritos por la comunidad cambian. Contrasta cualquier afirmación actual con las [tarjetas oficiales](../evidence-library-ES.md#source-notes) y el [índice de problemas de campo](../evidence-library-ES.md#source-notes). Esas fuentes no sustituyen una ejecución local ni una observación independiente del aprendizaje.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="09-verification-and-recovery-ES.md" aria-label="Capítulo anterior: Capítulo 9 · verificación, duda y recuperación">← Anterior<br><strong>Capítulo 9 · verificación, duda y recuperación</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="11-designing-a-skill-ES.md" aria-label="Capítulo siguiente: Capítulo 11 · diseñar un Skill que se gane su lugar">Siguiente →<br><strong>Capítulo 11 · diseñar un Skill que se gane su lugar</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
