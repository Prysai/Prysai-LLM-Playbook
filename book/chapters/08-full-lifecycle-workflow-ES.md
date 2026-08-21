<!-- content_id: chapter-08-full-lifecycle-workflow | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 8: de la definición a la entrega

**Estado:** `candidate`. Este capítulo presenta un flujo que conserva la evidencia y define reglas de recuperación. El experimento comparativo sigue `not_run`: aquí se enseña un método; no se documenta una ejecución real de Codex, de un cliente ni un lanzamiento.

## El problema que resuelve este capítulo

Pedirle a un modelo que empiece a escribir es fácil. Terminar un trabajo útil es otra cosa. Un resultado puede parecer correcto aunque el objetivo siga siendo impreciso, las comprobaciones apunten al archivo equivocado o nadie sepa cuál fue el último cambio aceptado.

Usa una ruta con salidas explícitas:

```text
definir → planificar → construir → verificar → revisar → entregar → mantener
```

Cada flecha exige una decisión. Una fase no termina porque la interfaz avance o el Agent diga «hecho», sino cuando existe evidencia que otra persona puede revisar.

## Objetivos de aprendizaje

Al terminar podrás:

- escribir una definición con alcance, exclusiones, aceptación, autoridad y recuperación antes de editar;
- convertir una petición grande en un corte vertical que produzca evidencia cuanto antes;
- conservar el último estado bueno y reintentar solo bajo una condición definida;
- distinguir evidencia de compilación, ejecución, aspecto visual, fuentes, seguridad y aceptación de usuarios; y
- entregar un resumen que diga tanto lo realizado como lo no realizado.

## Problemas reales: el flujo puede fallar entre dos éxitos visibles

Un inicio de sesión, un selector de modelo o una comprobación en curso pueden parecer progreso aunque todavía falte el siguiente estado necesario. Los síntomas públicos que aparecen más abajo no diagnostican un producto ni reproducen esta ejecución. Sirven para escoger la primera observación segura: revisar la ruta y el diff después de una interrupción, separar el intercambio del cliente tras el inicio de sesión del navegador o pedir una nueva autorización antes de una modificación persistente.

## 1. Las fases transportan evidencia

| Fase | Pregunta | Evidencia de salida | Detente cuando |
|---|---|---|---|
| Definir | ¿Qué resultado se busca y dentro de qué límite? | Protocolo de tarea y aceptación | Falta un dato que cambia alcance, riesgo o autorización |
| Planificar | ¿Cuál es el orden mínimo útil? | Plan ordenado, corte y comprobaciones | Solo hay capas horizontales sin resultado comprobable |
| Construir | ¿Qué cambió dentro del alcance? | Diff, archivos cambiados y punto de control | El diff sale del alcance o no hay vuelta atrás clara |
| Verificar | ¿Se comporta como se espera bajo las comprobaciones pertinentes? | Comando, código de salida, salida y entorno | El comando se queda bloqueado, prueba el objetivo equivocado o no deja evidencia |
| Revisar | ¿Las afirmaciones coinciden con la evidencia? | Tabla afirmación-evidencia y riesgos abiertos | Una afirmación es más amplia que su evidencia |
| Entregar | ¿Otra persona puede usar e inspeccionar el resultado? | Resumen y rutas exactas | El estado se exageraría como publicado o activo |
| Mantener | ¿Qué debe vigilarse o revertirse? | Responsable, revisión y punto de reversión | Nadie posee la actualización o no hay reversión practicable |

Si falta una condición de salida, usa `blocked` o `unverified`. Añadir más pasos no sustituye un permiso, un archivo o una prueba que no existen.

### Una etiqueta no es una comprobación

| Afirmación | Evidencia mínima | No demuestra |
|---|---|---|
| «Cambió el código fuente» | Diff en una ruta indicada | Que el cambio sea correcto |
| «Se ejecutó la comprobación» | Orden, directorio, salida y código de salida | Que el producto funcione |
| «La aplicación funciona» | Observación de ejecución con entrada y entorno definidos | Que funcione para toda cuenta o sistema |
| «La página se ve bien» | Inspección renderizada con viewport y criterios visuales | Demanda, accesibilidad completa o despliegue |
| «La función está publicada» | Estado del repositorio o despliegue y revisión posterior | Que todo usuario o caché la vea |

Una compilación correcta es útil, pero por sí sola no demuestra que la aplicación se ejecute bien, sea segura, tenga un diseño visual adecuado o sea aceptada por sus usuarios.

## 2. Define antes de actuar

Convierte el deseo en un contrato breve:

```text
owner: content-maintainer
target: docs/guide.md
goal: hacer coherentes los pasos, enlaces y notas de aceptación
allowed_scope: leer reglas; editar el archivo objetivo; ejecutar comprobaciones locales existentes
inputs: archivo, reglas, lista de defectos y comprobador de enlaces
non_goals: sin dependencias, commit, push, publicación ni cambios de sistema
acceptance: defectos nombrados corregidos y comprobaciones permitidas registradas
evidence: diff, archivos cambiados, salida de comandos y lista no verificada
stop_when: falta alcance, autoridad, objetivo o fuente de recuperación
rollback: restaurar la copia anterior o el punto limpio registrado
```

Las exclusiones protegen contra la expansión accidental del alcance. «Comprueba la página» no autoriza a reinstalar herramientas, cambiar políticas ni publicar resultados. La reversión debe señalar una fuente real de recuperación, no solo un hash.

Empieza con una inspección de solo lectura. Añade escritura únicamente para el objetivo indicado; la red, la autenticación, la instalación, el reinicio, el despliegue o los mensajes externos requieren una necesidad y una autorización explícitas.

## 3. Planifica cortes verticales

Un plan horizontal deja la integración para el final:

```text
todos los datos → toda la API → toda la interfaz → integración → pruebas
```

Un corte vertical recorre una cadena pequeña y comprobable:

```text
una entrada → cambio mínimo → acción observable → comprobación enfocada
```

Por ejemplo: que una persona pueda abrir un capítulo desde el índice, encontrar un experimento y volver al índice. El corte puede requerir un archivo, un enlace, una comprobación local y una revisión de los límites de estado. Es pequeño, pero recorre el camino completo.

## 4. Construye con puntos de control

Un punto de control describe un estado que se puede recuperar; no es una fecha. Debe permitir decidir el siguiente paso sin depender del historial del chat.

```text
CP0: línea base, estado, hash objetivo y fuente de recuperación
CP1: definición aceptada; plan y permisos fijados; sin edición
CP2: primer corte cambiado; diff y lista de archivos guardados
CP3: comprobaciones terminadas o detenidas; salida y pendientes guardados
CP4: revisión independiente; estado de entrega y próxima revisión
```

En cada punto pregunta: ¿qué es lo último que sabemos que funcionó?, ¿qué pudo cambiar?, ¿qué evidencia falta?, ¿cuál es la acción segura más pequeña? y ¿qué obliga a hacer una pausa?

### Reintenta solo cuando conozcas el estado

```text
failed_stage: verify
failure_class: timeout / capacidad / desconocido
last_accepted_checkpoint: CP2
changes_since_checkpoint: ninguno conocido; diff revisado
retry_condition: misma orden y objetivo, un intento acotado
fallback: detener y entregar si sigue sin salida o cambia el alcance
```

«Continúa» no es un plan de recuperación: no identifica el último estado aceptado ni evita duplicar efectos secundarios.

## 5. Verifica por capas

Elige comprobaciones que correspondan a la afirmación prevista. Conserva una tabla como esta mientras trabajas:

```text
afirmación: El capítulo 8 se abre desde el índice español
evidencia: enlace en table-of-contents-ES.md; comprobador local de enlaces con salida 0
alcance: árbol de trabajo del repositorio en el commit registrado
no probado: render de GitHub, comprensión lectora, calidad de traducción
```

Si un comando queda en `Working`, el silencio es una observación, no un éxito. Antes de iniciarlo, define la salida esperada, un tiempo de espera razonable y una interrupción permitida. Cuando se agote la espera, guarda el comando, el directorio, el tiempo y la salida disponible; inspecciona el diff y el último punto de control; después clasifica el resultado como completo, parcial, fallido o desconocido.

## 6. Revisa y entrega con honestidad

Quien produjo un cambio no debe ser la única persona que decida si está terminado. Revísalo con contexto nuevo:

1. ¿El diff resuelve el problema declarado?
2. ¿Cambió algo fuera del alcance?
3. ¿Cada afirmación de finalización tiene evidencia del mismo alcance?
4. ¿Qué necesitará quien mantenga, reproduzca o revierta este cambio?

Un resumen útil puede ser breve:

```text
status: ready_for_local_review
scope: docs/guide.md only
actions_done: inspección; edición; diff; comprobaciones locales
actions_not_done: commit; push; publicación; revisión visual
evidence: CP0, CP2, CP3 y notas de revisión
unverified: utilidad para lectores y aspecto renderizado
permission_boundary: edición local reversible y comprobaciones de lectura
```

La entrega no termina el ciclo. Si el resultado depende de un modelo, permiso, comando o servicio que puede cambiar, registra la fuente oficial, la fecha de consulta, el alcance, la persona responsable y la próxima revisión.

## Patrones de recuperación ante interrupciones reales

Los informes públicos de usuarios pueden mostrar un síntoma útil, pero no sustituyen
una explicación oficial de la causa ni una reproducción local. Úsalos para elegir la primera comprobación
segura, no para adivinar qué ocurrió dentro del producto.

### Capacidad o disponibilidad interrumpida

**Síntoma observado:** el modelo elegido deja de estar disponible y la tarea se detiene.

**Primer paso seguro:** congela las peticiones que dependían de esa tarea, guarda el diff,
la salida y el último punto de control aceptado, y comprueba si el artefacto objetivo quedó
parcialmente modificado. Después decide entre un único reintento acotado, otra superficie permitida o un
handoff.

**No concluyas:** que una tarea en cola terminó, que el modelo fue la única causa, o que
repetir «continúa» recuperó evidencia que no existe.

### Una comprobación permanece en `Working`

**Síntoma observado:** un formateador, prueba o análisis no produce señal de terminación.

**Primer paso seguro:** aplica el tiempo de espera y la regla de interrupción acordados; conserva
el comando, el directorio, el tiempo, la salida y el estado del proceso; revisa el diff antes de clasificar
el resultado como completo, parcial, fallido o desconocido.

**No concluyas:** que el silencio significa aprobación, ni que no ver un error demuestra
que terminó un subproceso.

### La página de acceso funciona, pero el cliente falla después

**Síntoma observado:** el navegador muestra éxito al iniciar sesión y el cliente falla al
intercambiar un token o hacer su primera petición.

**Primer paso seguro:** registra por separado la página de autorización, el callback, el intercambio
del cliente y la primera petición correcta. Comprueba únicamente el siguiente estado que falte.

**No concluyas:** que el navegador prueba autenticación del cliente, permiso de cuenta,
aprobación de un conector o disponibilidad de una herramienta.

### Verificar propone un cambio persistente

**Síntoma observado:** el Agent propone reinstalar, reiniciar o modificar el entorno para
hacer pasar una comprobación.

**Primer paso seguro:** detente y nombra el efecto propuesto, su destino, el artefacto que
lo motivó y la recuperación disponible. Separa la edición local, la prueba, la instalación, el reinicio,
el despliegue y la verificación en vivo; pide una nueva decisión antes de cualquier cambio
persistente.

**No concluyas:** que «asegúrate de que funciona» autoriza una instalación, una escritura en
red o una publicación.

## Completa primero un corte pequeño y entero

No hace falta empezar con un sitio, código o publicación. Elige un texto corto que puedas revisar, un README local o un conjunto de fuentes públicas ya autorizadas. La meta no es que el modelo «haga mucho», sino cerrar un recorrido visible desde la definición hasta la entrega.

```text
Resultado: que una explicación de menos de 120 palabras permita a una persona nueva encontrar el primer paso.
Entrada: texto original, lector previsto y un problema conocido.
Permitido: leer el texto; proponer plan; tras confirmación editar solo ese texto.
No permitido: red, inicio de sesión, instalación, envío, publicación ni otros archivos.
Comprobación: guardar antes/después; pedir una revisión de «¿encuentra el primer paso?».
Entrega: qué cambió, qué no cambió, resultado de comprobación y qué sigue siendo desconocido.
```

Recorre las siete etapas: define lector y resultado, planifica un cambio, guarda el original como punto de control, edita, compara, revisa con una mirada nueva y entrega el resultado a otra persona o a tu yo de mañana. Si necesitas más material o una acción externa, detente en `blocked`; no amplíes permisos para aparentar que has cerrado el ciclo.

### Cuándo dos intentos son comparables

Para comparar «pide al modelo que edite» con «escribe primero el protocolo», mantén fijos el texto, el objetivo, las acciones permitidas, el tiempo y la regla de comprobación. Guarda la primera salida, el tiempo real, el retrabajo, el diff, el resultado y las incógnitas. Si cambia el texto, el modelo, la herramienta, el permiso o el entorno, escribe `not_comparable`; un resultado más rápido o agradable en una sola ocasión no demuestra una eficiencia general ni que un modelo sea superior.

## Experimento y caso de fallo

### Preparación

En una carpeta desechable, sin remoto, secretos ni datos de clientes, guarda un texto inicial, una pregunta de aceptación y un punto de control local. Acordad de antemano un límite de espera y una forma segura de interrumpir. No instales nada, no inicies sesión ni envíes nada a terceros.

### Tarea

Elige una tarea de documentación pequeña. Ejecuta dos variantes: una petición directa y otra con el contrato, los puntos de control y una comprobación elegida. Guarda ambos primeros intentos, los diffs, los comandos, los códigos de salida, la duración real y cualquier corrección. No inventes tiempos o costes ausentes: escribe `unavailable`.

Provoca un timeout, una entrada cambiada, un permiso bloqueado o un resultado de escritura local desconocido. Conserva el intento interrumpido, revisa el destino antes de repetir y marca la comparación `not_comparable` si cambiaron las condiciones fijadas. Un éxito posterior no repara retroactivamente la comparabilidad.

Tres tareas pequeñas no prueban eficiencia general, calidad universal ni superioridad de un modelo. Un enlace que se resuelve tampoco prueba aprendizaje, publicación o adopción.

### Evidencia

Conserva para cada intento la entrada y aceptación congeladas, acciones permitidas, número de checkpoint, petición o protocolo, rutas cambiadas, diff, orden con directorio y código de salida, nota de revisión y observaciones ausentes. Si no se ejecutó una variante, registra `not_run`; una respuesta fluida no reconstruye una ejecución ausente.

### Reflexión

- ¿En qué checkpoint se conocía realmente el estado y cuál solo se suponía?
- ¿Qué afirmación apoyaba un diff y cuál exigía una ejecución o una persona lectora?
- ¿Qué efecto secundario habría exigido una autorización nueva y acotada?

## Tarea de transferencia

Aplica el mismo recorrido a una tarea no técnica: mejora un texto propio, revisa una lista pequeña de fuentes o planifica una práctica de idioma. Conserva el objetivo, las entradas permitidas, los efectos prohibidos, los puntos de control y la entrega. Cambia solo la aceptación específica: claridad para una lectora, fuente e incertidumbre para una investigación, o recuperación diferida sin ayuda para una práctica de idioma. Escribe también lo que la práctica no demuestra.

## Lista de aceptación

- [ ] Puedo definir alcance, exclusiones, aceptación, autoridad y reversión antes de editar.
- [ ] Puedo convertir una petición grande en un corte vertical con evidencia temprana.
- [ ] Puedo nombrar el último punto aceptado antes de reintentar.
- [ ] Puedo separar compilación, ejecución, visual, fuente, seguridad y aceptación de usuarios.
- [ ] Puedo detener una instalación, reinicio, despliegue o escritura externa no solicitados.
- [ ] Puedo entregar lo completado, lo no realizado, lo bloqueado y lo no verificado.

## Fuentes y límite de mantenimiento

La secuencia del flujo, los puntos de control y la separación entre afirmación y evidencia son el método estable de este proyecto. Las superficies de producto, el comportamiento de las cuentas y las herramientas, la disponibilidad de los modelos y los síntomas de la comunidad son hechos cambiantes. Revisa las [tarjetas oficiales](../evidence-library-ES.md#source-notes) y el [índice de problemas de campo](../evidence-library-ES.md#source-notes) antes de formular una afirmación actual sobre un producto. Esas fuentes no sustituyen una ejecución local ni una observación independiente del aprendizaje.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="07-skills-plugins-and-tools-ES.md" aria-label="Capítulo anterior: Capítulo 7 · cómo se reparten el trabajo los Skills, los Plugins, MCP y las herramientas">← Anterior<br><strong>Capítulo 7 · cómo se reparten el trabajo los Skills, los Plugins, MCP y las herramientas</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="09-verification-and-recovery-ES.md" aria-label="Capítulo siguiente: Capítulo 9 · verificación, duda y recuperación">Siguiente →<br><strong>Capítulo 9 · verificación, duda y recuperación</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
