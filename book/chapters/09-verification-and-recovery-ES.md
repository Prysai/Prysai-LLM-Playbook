<!-- content_id: chapter-09-verification-and-recovery | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 9: verificación, duda y recuperación

**Estado:** `candidate`. **Experimento:** `not_run`. Este capítulo enseña a comparar una afirmación con su evidencia y a recuperar un flujo incierto; no es una reproducción local ni una prueba de producción.

## El problema que resuelve este capítulo

Un Agent puede redactar un resumen convincente sobre un resultado equivocado, fuera de alcance, nunca ejecutado o revisado en el entorno incorrecto. La respuesta no es confianza ciega ni sospecha permanente: separa el resumen en afirmaciones y asigna a cada una la evidencia mínima que pueda sostenerla en el alcance declarado.

| Afirmación | Evidencia mínima | No demuestra |
|---|---|---|
| Un archivo cambió | Diff, ruta o hash | Que sea correcto o completo |
| Una comprobación pasó | Orden, directorio, código de salida y salida relevante | Igual comportamiento en otro entorno |
| La aplicación se ejecuta | Inicio real y observación de ruta crítica | Valor de usuario, seguridad o producción |
| La página se ve correcta | Revisión renderizada con viewport registrado | Accesibilidad completa, backend o conversión |
| Un hecho es oficial | URL autorizada, fecha, alcance y responsable | Acceso de esta cuenta o configuración local |

Una prueba débil no puede sustituir a todas las demás. Un build correcto no prueba ejecución; una captura no prueba demanda; un enlace oficial no prueba acceso.

## Objetivos de aprendizaje

Podrás separar un resumen final en afirmaciones comprobables, nombrar la evidencia mínima adecuada para cada una, localizar el primer salto no respaldado y escribir una comprobación siguiente segura o una entrega honesta. El ejercicio no prueba fiabilidad de producto ni aprendizaje sin una ejecución y revisión independientes.

## Problemas reales: un resumen convincente sin evidencia correspondiente

Una respuesta puede decir «listo», «todas las pruebas pasaron» o «los lectores entienden» sin diff, salida de pruebas ni observación de lectores. No es un diagnóstico de un modelo. Es una razón para comprobar solo la primera etapa ausente entre solicitud, autorización, herramienta, acción, resultado y revisión.

## Localiza la primera ruptura

```text
solicitud → autorización → herramienta visible → acción → resultado → revisión
```

Marca la primera flecha que no puedas observar. Una sesión disponible no prueba que una herramienta esté registrada; recuperar el control de una ejecución no prueba el resultado deseado.

| Estado | Significa |
|---|---|
| `verified` | La evidencia declarada sostiene la afirmación en ese alcance |
| `unverified` | Falta evidencia necesaria; no concluye que sea falso |
| `unknown` | No hay observación suficiente para clasificar |
| `partial` | Una parte concreta está respaldada y otra no |
| `not_observed` | El proyecto no registró la observación |
| `error` | Hay evidencia de fallo para la operación declarada |

## Recupera con una sola comprobación segura

Ante capacidad agotada, una orden que sigue en `Working`, una herramienta ausente o una propuesta de reinstalación, conserva primero diff, salida, registro y último checkpoint aceptado. Después elige una acción acotada: inspeccionar el destino, repetir una orden idéntica con límite, pedir una entrada o detenerte. Un check no autoriza instalación, reinicio, despliegue o escritura fuera del alcance.

```text
claim: Todas las pruebas pasaron
evidence: falta la salida de pruebas
status: unverified
next_check: ejecutar solo la orden aprobada en el directorio y revisión fijados
```

### Un estado verde no es una conclusión

Una marca verde puede significar que **una** comprobación terminó sin error en
un momento concreto. Antes de escribir «funciona», separa estas preguntas:

| Lo que viste | Aún debes comprobar | Forma pequeña y segura de hacerlo |
|---|---|---|
| El comando terminó con código 0 | ¿Era el comando, carpeta y revisión esperados? | Guarda la orden, la carpeta, la revisión y la salida relevante |
| Existe un diff | ¿El cambio respeta el encargo? | Lee el diff frente al objetivo y los límites acordados |
| Abre una página | ¿El recorrido importante responde con la entrada prevista? | Prueba una ruta concreta, con una entrada inocua y un viewport anotado |
| El modelo dijo «hecho» | ¿Qué observación independiente respalda cada frase? | Pide rutas, salida, diff o una limitación explícita |

No conviertas una comprobación correcta en una promesa sobre seguridad,
personas usuarias o producción. Si la observación no existe, deja esa fila como
`unverified`; no la rellenes con confianza.

### Recibo de recuperación: deja que otra persona continúe

Cuando pares o recuperes un flujo, guarda un recibo breve. Sirve para no
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

Un recibo no arregla el resultado ni prueba una causa. Conserva el lugar exacto
desde el que se puede retomar sin convertir un «quizá» en un «listo».

## Experimento y límite

### Preparación

En una carpeta local desechable, prepara un resumen redactado, un diff, una salida de pruebas, enlaces de fuente y una sola pieza de evidencia ausente a propósito. No uses secretos, producción, instalación, inicio de sesión ni cambios externos.

### Tarea

Prepara un resumen redactado, un diff, salida de pruebas, enlaces de fuente y una pieza de evidencia ausente. Con el Lab 003 crea una tabla de afirmación, alcance, evidencia, estado y siguiente paso. Añade deliberadamente «todas las pruebas pasaron» sin salida y recházala aunque el tono sea seguro.

Guarda la tabla, las rutas de evidencia y el plan de recuperación. Incluye una afirmación factual, una de ejecución y una de efecto en usuarios; explica por qué no comparten una prueba débil. No conectes servicios de producción ni modifiques sistemas externos. La recuperación puede volver observable el estado, pero no lo mejora automáticamente a `verified`.

### Evidencia

Guarda la tabla de afirmación-evidencia, rutas y salidas nombradas, el estado de cada fila, la primera ruptura y el siguiente check seguro. Si no hubo ejecución, escribe `not_run`; no inventes salida de pruebas a partir de un tono seguro.

## Práctica guiada: no aceptes un resumen por su seguridad

Imagina que pides: «Revisa este texto de 90 palabras para que una persona nueva
entienda el primer paso. No cambies los hechos ni publiques nada». El modelo
responde: «Listo; el texto es claro y todas las comprobaciones pasaron».
Antes de celebrar, pide una entrega comprobable:

1. ¿Qué archivo o texto exacto cambió? Pide el diff o ambas versiones.
2. ¿Qué comprobación concreta se ejecutó? Pide la orden, el directorio, el
   código de salida y la salida relevante.
3. ¿Qué no se comprobó? Por ejemplo, que una persona nueva lo entienda o que
   el resultado se vea bien en una web.
4. ¿Cuál es el siguiente check seguro? En este caso, comparar las dos versiones
   y pedir a una persona que señale el primer paso con sus propias palabras.

No necesitas llamar al modelo mentiroso. Basta con cambiar una frase amplia por
una tabla de afirmaciones. Si no hay salida de pruebas, «todas las comprobaciones
pasaron» queda como `unverified`; si solo se comparó el texto, la afirmación
honesta es «hay una revisión de texto pendiente de lectura humana».

## Tarjeta de recuperación para principiantes

Cuando el resultado no coincide con lo esperado, no añadas más indicaciones al
azar. Copia esta tarjeta y rellena solo lo que observaste:

```text
objetivo: hacer el primer paso más claro, sin publicar
última observación confirmada: el borrador y el diff existen
primera ruptura: no hay evidencia de lectura por una persona nueva
acción segura siguiente: pedir una revisión de una sola pregunta
alto si: la respuesta requiere publicar, instalar o cambiar otro archivo
entrega honesta: revisión de texto disponible; comprensión de lectores no verificada
```

La tarjeta convierte «no funcionó» en un punto de partida concreto. No demuestra
que el modelo, el Skill o el curso sea eficaz. Solo deja claro qué se observó,
qué falta y qué acción sigue siendo segura.

## Fallo deliberado y límite

Haz una versión de la entrega que diga «el lector ya entiende el texto» sin
haber hablado con ningún lector. Señala la afirmación que excede la evidencia y
reescríbela. Después explica: ¿qué evidencia mínima te permitiría cambiar el
estado?, ¿qué dato seguiría fuera de alcance? Guarda esa respuesta junto con el
diff. Este capítulo sigue siendo `candidate` y este ejercicio `not_run` hasta
que existan registros de ejecución y revisión.

## Reflexión

¿Qué frase de tu tabla era más tentadora de exagerar? ¿Qué comprobación mínima la sostendría con más precisión y qué afirmación importante seguiría abierta incluso después?

## Tarea de transferencia

Usa la misma tarjeta para práctica de idioma o investigación de fuentes. En idioma, distingue una respuesta asistida de una recuperación posterior y no vista sin ayuda. En investigación, separa un enlace encontrado de una afirmación comprobada. Conserva estados, evidencia y límites, pero no copies la afirmación de este capítulo.

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
