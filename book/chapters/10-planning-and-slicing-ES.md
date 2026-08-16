<!-- content_id: chapter-10-planning-and-slicing | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 10: planificación y cortes verticales

**Estado:** `candidate`. El plan y los ejemplos son material de enseñanza. No prueban que un Agent haya ejecutado el trabajo ni que un corte funcione en todos los repositorios.

## El problema que resuelve este capítulo

Un plan puede sonar detallado y aun así ocultar que nadie puede comprobar un resultado hasta el final. Terminar primero todos los datos, luego toda la API y después toda la interfaz retrasa el descubrimiento de una suposición equivocada. Un corte vertical busca un resultado pequeño que atraviese el camino completo.

```text
una entrada → cambio mínimo → acción observable → comprobación enfocada → evidencia
```

No es una excusa para cambiar todo a la vez. Es una forma de descubrir pronto el riesgo más caro con un alcance que se pueda revisar y revertir.

## Objetivos de aprendizaje

Podrás traducir un proyecto grande a un corte pequeño y observable, registrar sus dependencias y puntos de parada antes de editar y entregar un intento fallido sin que otra persona tenga que adivinar alcance o permisos. El ejercicio no mide velocidad general, calidad de modelo ni aprendizaje duradero.

## Problemas reales: un plan detallado no siempre produce un resultado comprobable

Un plan puede enumerar muchos archivos, fases y herramientas y aun así no dar un primer estado que alguien pueda comprobar. El riesgo real es una cadena larga de supuestos: un archivo ausente, un permiso desconocido o una aceptación ambigua aparecen después de acumular trabajo no comprobable. Un corte vertical prueba primero la dependencia que bloquea el siguiente paso visible.

## Diseña el corte antes de editar

| Campo | Pregunta que responde |
|---|---|
| Resultado | ¿Qué persona puede observar al final? |
| Entrada | ¿Qué archivo, dato o decisión está fijado? |
| Límite | ¿Qué archivos, permisos y efectos están permitidos? |
| Cambio mínimo | ¿Cuál es la menor modificación que crea el resultado? |
| Comprobación | ¿Qué orden, inspección o lectura podría rechazarlo? |
| Evidencia | ¿Qué diff, salida, captura o revisión se conserva? |
| No demostrado | ¿Qué sigue fuera del alcance? |
| Recuperación | ¿Cómo se vuelve al último estado aceptado? |

Un buen corte responde a una decisión. «Migrar toda la navegación» no lo hace. «Una persona abre un capítulo local desde el índice, encuentra la práctica y vuelve por una ruta registrada» sí puede hacerlo.

## Planifica por dependencias, no por entusiasmo

1. Escribe el resultado y la aceptación antes de proponer herramientas.
2. Enumera entradas, dependencias, permisos y hechos que aún no conoces.
3. Pon primero el desconocido que podría bloquear el resultado.
4. Elige un corte que deje evidencia aunque falle.
5. Fija el orden de checks y el punto de parada.
6. Después de cada corte, revisa diff, alcance, evidencia y siguiente decisión.

No conviertas una lista de tareas en una promesa. Las tareas pueden ejecutarse y aun así no producir el resultado. Un plan debe dejar visibles sus supuestos, no esconderlos en lenguaje seguro.

## El experimento

### Preparación

Prepara una copia local desechable sin remoto, secretos ni cuentas externas. Elige un texto inicial pequeño, un cambio conocido y una pregunta de aceptación fija. Guarda la revisión base y fija una regla de parada antes de empezar; no instales, publiques ni envíes nada.

### Tarea

En una copia desechable, compara dos planes para el mismo cambio pequeño: uno horizontal y uno vertical. Conserva el plan inicial, la revisión de base, las órdenes, los diffs, los checks y los puntos donde cambió una decisión. Introduce una dependencia ausente o una aceptación ambigua. El plan vertical pasa si expone el bloqueo antes de acumular cambios no comprobables.

No midas velocidad o calidad general a partir de una tarea. Marca tiempos, costes y resultados que no hayas observado como `unavailable`, `unknown` o `not_run`.

### Evidencia

Conserva ambos planes, la entrada fija, el corte elegido, supuestos de dependencias y permisos, diff, salida de check, punto de parada y tarjeta de entrega. Si un intento no se ejecutó, sigue siendo `not_run`; un plan plausible no sustituye un resultado.

## Hoja de tres planes: elige por la primera evidencia

Para una misma petición, escribe tres alternativas antes de abrir el editor.
No necesitas ejecutar las tres; la comparación sirve para detectar dónde cada
una esconde el primer resultado útil.

| Forma | Primer paso típico | Primera evidencia útil | Señal para no seguir |
|---|---|---|---|
| Horizontal | «Prepara todos los datos, después toda la interfaz» | Normalmente llega tarde, tras varias capas | No hay una persona, entrada ni comprobación que pueda revisar hoy |
| Orden de archivos | «Edita estos archivos en este orden» | Un diff local y revisable | El orden de archivos no explica qué resultado verá alguien |
| Vertical | «Con una entrada fija, muestra un resultado y compruébalo» | Un recorrido pequeño, un check y un registro | El primer recorrido exige publicar, instalar o cambiar varios sistemas |

Elige el plan vertical cuando necesites aprender pronto si la idea merece el
siguiente paso. Elige una sonda de solo lectura cuando todavía no sepas si una
dependencia, permiso o archivo existe. Una sonda responde «¿podemos continuar?»;
no cuenta como una función terminada.

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

Si no puedes nombrar una única acción siguiente, el corte sigue siendo demasiado
grande. Divide la pregunta antes de volver a pedir «continúa».

## Haz tu primer corte completo

No empieces por «mejora todo el curso». Elige un texto local de un máximo de
120 palabras que una persona nueva deba entender. El resultado de este corte es
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

Después recorre: definir → pedir un plan de tres pasos → comprobar el alcance
antes de editar → hacer un cambio pequeño → comparar antes y después → leer las
dos secciones → dejar una entrega honesta. Si el modelo propone ampliar el
trabajo, vuelve a la tarjeta; ampliar alcance no es «ser más útil» sin una nueva
decisión.

## Compara dos formas de pedir ayuda, sin inventar una métrica

Puedes probar una vez el pedido directo («hazlo más claro») y una vez la tarjeta
anterior. Congela texto, modelo, herramienta, tiempo disponible y criterio de
lectura. Conserva ambos prompts, versiones, preguntas del lector y cualquier
error. Si una variable cambia, registra `not_comparable`; una respuesta más
rápida o más bonita no demuestra productividad general ni superioridad de un
modelo. El valor del ejercicio es observar qué información faltaba antes de
editar y si el resultado se puede revisar.

## Fallo seguro y límite

Quita deliberadamente **Cómo comprobarlo** o usa un archivo que no existe. El
primer fallo debe decirte si falta contenido o si la entrada es equivocada. No
añadas dependencias ni abras permisos para ocultarlo. Escribe qué viste, qué
parte sigue sin demostrar y cuál es la única acción segura siguiente. El capítulo
sigue en `candidate`: este ejercicio no mide por sí mismo eficacia, velocidad ni
aprendizaje duradero.

## Reflexión

¿Qué dependencia habrías descubierto al final en el plan horizontal? ¿Qué evidencia hizo comprobable el corte vertical y qué afirmación siguió fuera de alcance incluso después del check?

## Tarea de transferencia

Planifica el mismo corte para investigación, práctica de idioma o revisión de contenido. Conserva resultado, entrada fija, acciones permitidas y prohibidas, check y recuperación. Para idioma, la aceptación debe incluir una recuperación posterior y no vista sin ayuda, no solo una respuesta asistida fluida. Escribe qué no demuestra el nuevo ejercicio.

## Lista de aceptación

- [ ] El resultado, la entrada, el alcance y la aceptación son observables.
- [ ] El corte tiene una comprobación, una regla de parada y una fuente de recuperación definidas.
- [ ] La evidencia permite revisar incluso un intento fallido.
- [ ] Los efectos externos siguen fuera del alcance salvo autorización explícita.
- [ ] El resumen diferencia cambio realizado, verificado, bloqueado y no demostrado.

## Fuentes y límite de mantenimiento

Los cortes verticales, el orden de dependencias y los puntos de parada son el método estable de este proyecto. Las funciones de producto, permisos, disponibilidad de modelos y síntomas comunitarios cambian. Contrasta una afirmación actual con las [tarjetas oficiales](../evidence-library-ES.md#source-notes) y el [índice de problemas de campo](../evidence-library-ES.md#source-notes). No sustituyen una ejecución local ni una observación independiente de aprendizaje.

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
