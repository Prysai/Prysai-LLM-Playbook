<!-- content_id: chapter-09-verification-and-recovery | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 9: verificación, duda y recuperación

**Estado:** `candidate`. **Experimento:** `not_run`. Este capítulo enseña a contrastar una afirmación con sus evidencias y a recuperar un flujo de trabajo incierto; no es una reproducción local ni una prueba de producción.

## El problema que resuelve este capítulo

Un Agent puede redactar un resumen convincente sobre un resultado equivocado, fuera de alcance, nunca ejecutado o revisado en el entorno incorrecto. La respuesta no es confiar a ciegas ni sospechar de todo: separa el resumen en afirmaciones y asigna a cada una la evidencia mínima que pueda sostenerla dentro del alcance declarado.

| Afirmación | Evidencia mínima | No demuestra |
|---|---|---|
| Un archivo cambió | Diff, ruta o hash | Que sea correcto o completo |
| Una comprobación pasó | Comando, directorio, código de salida y salida relevante | Igual comportamiento en otro entorno |
| La aplicación funciona | Inicio real y observación de una ruta crítica | Valor para los usuarios, seguridad o preparación para producción |
| La página se ve correcta | Revisión renderizada con viewport registrado | Accesibilidad completa, backend o conversión |
| Un dato proviene de una fuente oficial | URL autorizada, fecha, alcance y responsable | Acceso de esta cuenta o configuración local |

Una sola prueba débil no puede sustituir a las demás. Un build correcto no prueba que algo se haya ejecutado; una captura no prueba que exista demanda; un enlace oficial no prueba que tengas acceso.

## Objetivos de aprendizaje

Podrás separar un resumen final en afirmaciones comprobables, nombrar la evidencia mínima adecuada para cada una, localizar el primer punto sin respaldo y escribir la siguiente comprobación segura o una entrega honesta. El ejercicio no demuestra la fiabilidad del producto ni el aprendizaje sin una ejecución y una revisión independientes.

## El problema real: un resumen convincente sin evidencia suficiente

Una respuesta puede decir «listo», «todas las pruebas pasaron» o «los lectores entienden» sin diff, salida de pruebas ni observación de lectores. No se trata de diagnosticar un modelo concreto. Es una razón para comprobar únicamente la primera etapa que falte entre solicitud, autorización, herramienta, acción, resultado y revisión.

## Encuentra el primer punto de ruptura

```text
solicitud → autorización → herramienta visible → acción → resultado → revisión
```

Marca la primera flecha que no puedas observar. Que una sesión esté disponible no prueba que una herramienta esté registrada; recuperar el control de una ejecución no prueba que el resultado sea el esperado.

| Estado | Significa |
|---|---|
| `verified` | La evidencia declarada sostiene la afirmación en ese alcance |
| `unverified` | Falta evidencia necesaria; no concluye que sea falso |
| `unknown` | No hay observación suficiente para clasificar |
| `partial` | Una parte concreta está respaldada y otra no |
| `not_observed` | El proyecto no registró la observación |
| `error` | Hay evidencia de fallo para la operación declarada |

## Recupera el control con una sola comprobación segura

Cuando se agote la capacidad disponible, un comando permanezca en `Working`, falte una herramienta o alguien proponga reinstalar, conserva primero el diff, la salida, el registro y el último checkpoint aceptado. Después elige una sola acción acotada: inspeccionar el destino, repetir una vez el mismo comando con un límite definido, pedir el dato que falta o detenerte. Una comprobación no autoriza a instalar, reiniciar, desplegar ni escribir fuera del alcance.

```text
claim: Todas las pruebas pasaron
evidence: falta la salida de pruebas
status: unverified
next_check: ejecutar solo la orden aprobada en el directorio y revisión fijados
```

### Una marca verde no es una conclusión

Una marca verde puede significar que **una** comprobación terminó sin errores en
un momento concreto. Antes de escribir «funciona», separa estas preguntas:

| Lo que viste | Aún debes comprobar | Forma pequeña y segura de hacerlo |
|---|---|---|
| El comando terminó con código 0 | ¿Era el comando, carpeta y revisión esperados? | Guarda la orden, la carpeta, la revisión y la salida relevante |
| Existe un diff | ¿El cambio respeta el encargo? | Lee el diff frente al objetivo y los límites acordados |
| Se abre una página | ¿La ruta importante responde a la entrada prevista? | Prueba una ruta concreta, con una entrada inocua y un viewport anotado |
| El modelo dijo «hecho» | ¿Qué observación independiente respalda cada frase? | Pide rutas, salida, diff o una limitación explícita |

No conviertas una comprobación correcta en una promesa sobre seguridad,
usuarios o producción. Si no existe la observación, mantén esa fila como
`unverified`; no la rellenes con confianza.

### Ficha de recuperación: permite que otra persona continúe

Cuando pares o recuperes un flujo, guarda una ficha breve. Sirve para no
reiniciar a ciegas y para que la siguiente persona sepa qué puede comprobar sin
ampliar permisos:

```text
objetivo y límite: qué debía ocurrir y qué no estaba autorizado
último punto confirmado: observación, ruta o salida que sí existe
primer punto no respaldado: la primera afirmación sin prueba
estado del destino: sin cambio / cambio parcial / desconocido
evidencia guardada: diff, registro, salida, captura o enlace concreto
siguiente comprobación segura: una acción de solo lectura o reversible
no hacer todavía: publicación, instalación, despliegue o nuevo alcance
```

Una ficha no arregla el resultado ni prueba una causa. Conserva el lugar exacto
desde el que se puede retomar sin convertir un «quizá» en un «listo».

## Experimento y límite

### Preparación

En una carpeta local desechable, prepara un resumen con los datos sensibles ocultos, un diff, una salida de pruebas, enlaces de fuentes y una única evidencia omitida deliberadamente. No uses secretos, producción, instalación, inicio de sesión ni cambios externos.

### Tarea

Prepara un resumen con los datos sensibles ocultos, un diff, la salida de pruebas, enlaces de fuentes y una evidencia omitida deliberadamente. Usa el Lab 003 para crear una tabla de afirmación, alcance, evidencia, estado y siguiente paso. Añade deliberadamente «todas las pruebas pasaron» sin salida y recházala aunque el texto suene seguro.

Guarda la tabla, las rutas de evidencia y el plan de recuperación. Incluye una afirmación factual, otra sobre la ejecución y otra sobre el efecto en los usuarios; explica por qué no pueden apoyarse en una única prueba débil. No conectes servicios de producción ni modifiques sistemas externos. La recuperación puede volver observable el estado, pero no lo convierte automáticamente en `verified`.

### Evidencia

Guarda la tabla de afirmaciones y evidencias, las rutas y salidas con nombre, el estado de cada fila, la primera ruptura y la siguiente comprobación segura. Si no hubo ejecución, escribe `not_run`; no inventes una salida de pruebas por el mero tono de seguridad.

## Práctica guiada: no des por válido un resumen solo porque suena seguro

Imagina que pides: «Revisa este texto de 90 palabras para que una persona nueva
entienda el primer paso. No cambies los hechos ni publiques nada». El modelo
responde: «Listo; el texto es claro y todas las comprobaciones pasaron».
Antes de darlo por bueno, pide evidencias que puedas comprobar:

1. ¿Qué archivo o texto exacto cambió? Pide el diff o ambas versiones.
2. ¿Qué comprobación concreta se ejecutó? Pide la orden, el directorio, el
   código de salida y la salida relevante.
3. ¿Qué no se comprobó? Por ejemplo, que una persona nueva lo entienda o que
   el resultado se vea bien en una web.
4. ¿Cuál es el siguiente check seguro? En este caso, comparar las dos versiones
   y pedir a una persona que señale el primer paso con sus propias palabras.

No necesitas llamar mentiroso al modelo. Basta con cambiar una frase amplia por
una tabla de afirmaciones. Si no hay salida de pruebas, «todas las comprobaciones
pasaron» queda como `unverified`; si solo se comparó el texto, la afirmación
honesta es «el texto tiene una revisión pendiente por parte de una persona».

## Tarjeta de recuperación para principiantes

Cuando el resultado no coincide con lo esperado, no añadas indicaciones al azar.
Copia esta tarjeta y rellena solo lo que hayas observado:

```text
objetivo: hacer el primer paso más claro, sin publicar
última observación confirmada: el borrador y el diff existen
primera ruptura: no hay evidencia de lectura por una persona nueva
acción segura siguiente: pedir una revisión con una sola pregunta
detente si: la respuesta requiere publicar, instalar o cambiar otro archivo
entrega honesta: revisión de texto disponible; comprensión de lectores no verificada
```

La tarjeta convierte «no funcionó» en un punto de partida concreto. No demuestra
que el modelo, el Skill o el curso sea eficaz. Solo deja claro qué se observó,
qué falta y qué acción sigue siendo segura.

## Fallo deliberado y límite

Redacta una versión de la entrega que diga «el lector ya entiende el texto» sin
haber hablado con ningún lector. Señala la afirmación que excede la evidencia y
reescríbela. Después explica: ¿qué evidencia mínima te permitiría cambiar el
estado?, ¿qué dato seguiría fuera de alcance? Guarda esa respuesta junto con el
diff. Este capítulo sigue siendo `candidate` y este ejercicio `not_run` hasta
que existan registros de ejecución y revisión.

## Reflexión

¿Qué frase de tu tabla era más tentadora de exagerar? ¿Qué comprobación mínima la sostendría con más precisión y qué afirmación importante seguiría abierta incluso después?

## Tarea de transferencia

Usa la misma tarjeta para practicar un idioma o investigar fuentes. En el primer caso, distingue una respuesta asistida de la recuperación posterior de lo aprendido, sin volver a ver la respuesta y sin ayuda. En investigación, separa un enlace encontrado de una afirmación comprobada. Conserva estados, evidencias y límites, pero no copies la afirmación de este capítulo.

## Lista de aceptación

- [ ] Cada afirmación final tiene alcance, evidencia o estado `unverified`.
- [ ] Distingo diff, salida de pruebas, observación de ejecución, revisión renderizada y observación de usuarios.
- [ ] Encontré la primera etapa sin respaldo y elegí solo un siguiente check seguro.
- [ ] Mi entrega nombra cambio, evidencia, incógnitas y efectos no ejecutados.

## Fuentes y límite de mantenimiento

La tarjeta afirmación-evidencia y el flujo de recuperación son métodos estables. Los estados de producto, herramientas, permisos y síntomas públicos cambian. Antes de una afirmación actual de producto, revisa las [tarjetas oficiales](../evidence-library-ES.md#source-notes) y el [índice de problemas de campo](../evidence-library-ES.md#source-notes). No sustituyen una ejecución local, una revisión independiente ni una observación de aprendizaje.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-ES.md" aria-label="Capítulo anterior: Capítulo 8 · de la definición a la entrega">← Anterior<br><strong>Capítulo 8 · de la definición a la entrega</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="10-planning-and-slicing-ES.md" aria-label="Capítulo siguiente: Capítulo 10 · planificación y cortes verticales">Siguiente →<br><strong>Capítulo 10 · planificación y cortes verticales</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
