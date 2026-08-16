<!-- content_id: chapter-08-full-lifecycle-workflow | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 8: de la definición a la entrega

**Estado:** `candidate`. Este capítulo describe un flujo que conserva evidencia y reglas de recuperación. El experimento comparativo sigue `not_run`: el material enseña un método, no registra una ejecución real de Codex, un cliente ni una publicación.

## El problema

Pedir a un modelo que empiece a escribir es fácil. Terminar un trabajo útil es otra tarea. Un resultado puede parecer sano mientras el objetivo sigue siendo vago, las comprobaciones apuntan al archivo equivocado o nadie sabe cuál fue el último cambio aceptado.

Usa una ruta con salidas explícitas:

```text
definir → planificar → construir → verificar → revisar → entregar → mantener
```

Cada flecha pide una decisión. Una fase no termina porque la interfaz avanzó o el Agent dijo «hecho», sino porque existe evidencia que otra persona puede inspeccionar.

## Objetivos de aprendizaje

Al terminar podrás:

- escribir una definición con alcance, exclusiones, aceptación, autoridad y recuperación antes de editar;
- convertir una petición grande en un corte vertical que produzca evidencia pronto;
- conservar el último estado bueno y reintentar solo bajo una condición definida;
- distinguir evidencia de compilación, ejecución, aspecto visual, fuentes, seguridad y aceptación de usuarios; y
- entregar un resumen que diga tanto lo realizado como lo no realizado.

## 1. Las fases transportan evidencia

| Fase | Pregunta | Evidencia de salida | Detente cuando |
|---|---|---|---|
| Definir | ¿Qué resultado se busca y dentro de qué límite? | Protocolo de tarea y aceptación | Falta un dato que cambia alcance, riesgo o autorización |
| Planificar | ¿Cuál es el orden mínimo útil? | Plan ordenado, corte y comprobaciones | Solo hay capas horizontales sin resultado comprobable |
| Construir | ¿Qué cambió dentro del alcance? | Diff, archivos cambiados y punto de control | El diff sale del alcance o no hay vuelta atrás clara |
| Verificar | ¿Se comporta bajo las comprobaciones pertinentes? | Comando, código de salida, salida y entorno | La orden cuelga, prueba el objetivo incorrecto o no deja evidencia |
| Revisar | ¿Las afirmaciones coinciden con la evidencia? | Tabla afirmación-evidencia y riesgos abiertos | Una afirmación es más amplia que su evidencia |
| Entregar | ¿Otra persona puede usar e inspeccionar el resultado? | Resumen y rutas exactas | El estado se exageraría como publicado o activo |
| Mantener | ¿Qué debe vigilarse o revertirse? | Responsable, revisión y punto de reversión | Nadie posee la actualización o no hay reversión practicable |

Cuando falte una salida, usa `blocked` o `unverified`. Añadir más pasos no sustituye un permiso, un archivo o una prueba que no existen.

### Una etiqueta no es una comprobación

| Afirmación | Evidencia mínima | No demuestra |
|---|---|---|
| «Cambió el código fuente» | Diff en una ruta indicada | Que el cambio sea correcto |
| «Se ejecutó la comprobación» | Orden, directorio, salida y código de salida | Que el producto funcione |
| «La aplicación funciona» | Observación de ejecución con entrada y entorno definidos | Que funcione para toda cuenta o sistema |
| «La página se ve bien» | Inspección renderizada con viewport y criterios visuales | Demanda, accesibilidad completa o despliegue |
| «La función está publicada» | Estado del repositorio o despliegue y revisión posterior | Que todo usuario o caché la vea |

Una compilación que pasa es útil, pero no se convierte por sí sola en evidencia de ejecución, seguridad, diseño visual o aceptación.

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

Las exclusiones protegen contra expansión accidental. «Comprueba la página» no autoriza a reinstalar herramientas, cambiar políticas o publicar resultados. La vuelta atrás debe señalar una fuente real de recuperación, no solo un hash.

Empieza en lectura. Añade escritura solo para el objetivo indicado; red, autenticación, instalación, reinicio, despliegue o mensajes externos requieren necesidad y autorización explícitas.

## 3. Planifica cortes verticales

Un plan horizontal deja la integración para el final:

```text
todos los datos → toda la API → toda la interfaz → integración → pruebas
```

Un corte vertical entrega una pequeña cadena comprobable:

```text
una entrada → cambio mínimo → acción observable → comprobación enfocada
```

Por ejemplo, que una persona pueda abrir un capítulo desde el índice, encontrar un experimento y volver al índice. El corte puede requerir un archivo, un enlace, una comprobación local y una revisión del límite de estado. Es pequeño, pero recorre el camino completo.

## 4. Construye con puntos de control

Un punto de control es una descripción recuperable del estado, no una fecha. Debe permitir decidir el siguiente paso sin confiar en el historial del chat.

```text
CP0: línea base, estado, hash objetivo y fuente de recuperación
CP1: definición aceptada; plan y permisos fijados; sin edición
CP2: primer corte cambiado; diff y lista de archivos guardados
CP3: comprobaciones terminadas o detenidas; salida y pendientes guardados
CP4: revisión independiente; estado de entrega y próxima revisión
```

En cada punto pregunta: ¿qué es lo último que sabemos que funcionó?, ¿qué pudo cambiar?, ¿qué evidencia falta?, ¿cuál es la acción segura más pequeña?, ¿qué obliga a pausar?

### Reintenta solo cuando conozcas el estado

```text
failed_stage: verify
failure_class: timeout / capacidad / desconocido
last_accepted_checkpoint: CP2
changes_since_checkpoint: ninguno conocido; diff revisado
retry_condition: misma orden y objetivo, un intento acotado
fallback: detener y entregar si sigue sin salida o cambia el alcance
```

«Continúa» no es un plan de recuperación: no identifica el último estado aceptado ni evita efectos duplicados.

## 5. Verifica por capas

Elige comprobaciones que correspondan a la afirmación prevista. Conserva una tabla como esta mientras trabajas:

```text
afirmación: El capítulo 8 se abre desde el índice español
evidencia: enlace en table-of-contents-ES.md; comprobador local de enlaces con salida 0
alcance: árbol de trabajo del repositorio en el commit registrado
no probado: render de GitHub, comprensión lectora, calidad de traducción
```

Si una orden queda en `Working`, el silencio es una observación, no un éxito. Antes de iniciarla define salida esperada, espera razonable e interrupción permitida. Cuando se agote la espera, guarda orden, directorio, tiempo y salida disponible; inspecciona diff y último punto de control; después clasifica el resultado como completo, parcial, fallido o desconocido.

## 6. Revisa y entrega con honestidad

Quien produjo un cambio no debe ser la única persona que decide si está terminado. Revisa en contexto nuevo:

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

Entregar no termina el ciclo. Si el resultado depende de un modelo, permiso, comando o servicio cambiante, registra fuente oficial, fecha de consulta, alcance, responsable y próxima revisión.

## Patrones de recuperación ante interrupciones reales

Los informes públicos de usuarios pueden mostrar un síntoma útil, pero no sustituyen
una causa oficial ni una reproducción local. Úsalos para elegir la primera comprobación
segura, no para adivinar qué ocurrió dentro del producto.

### Capacidad o disponibilidad interrumpida

**Síntoma observado:** el modelo elegido deja de estar disponible y la tarea se detiene.

**Primer paso seguro:** congela las peticiones que dependían de esa tarea, guarda el diff,
la salida y el último checkpoint aceptado, y comprueba si el artefacto objetivo quedó
parcial. Después decide entre un único reintento acotado, otra superficie permitida o un
handoff.

**No concluyas:** que una tarea en cola terminó, que el modelo fue la única causa, o que
repetir «continúa» recuperó evidencia que no existe.

### Una comprobación permanece en `Working`

**Síntoma observado:** un formateador, prueba o análisis no produce señal de terminación.

**Primer paso seguro:** aplica la espera y la regla de interrupción acordadas; conserva
comando, directorio, tiempo, salida y estado del proceso; revisa el diff antes de clasificar
el resultado como completo, parcial, fallido o desconocido.

**No concluyas:** que el silencio significa aprobación, ni que no ver un error demuestra
que terminó un subproceso.

### La página de acceso funciona, pero el cliente falla después

**Síntoma observado:** el navegador muestra éxito al iniciar sesión y el cliente falla al
intercambiar un token o hacer su primera petición.

**Primer paso seguro:** registra por separado página de autorización, callback, intercambio
del cliente y primera petición correcta. Comprueba solo el siguiente estado que falte.

**No concluyas:** que el navegador prueba autenticación del cliente, permiso de cuenta,
aprobación de un conector o disponibilidad de una herramienta.

### Verificar propone un cambio persistente

**Síntoma observado:** el Agent propone reinstalar, reiniciar o modificar el entorno para
hacer pasar una comprobación.

**Primer paso seguro:** detente y nombra el efecto propuesto, su destino, el artefacto que
lo motivó y la recuperación disponible. Separa edición local, prueba, instalación, reinicio,
despliegue y verificación en vivo; pide una decisión nueva antes de cualquier cambio
persistente.

**No concluyas:** que «asegúrate de que funciona» autoriza una instalación, una escritura en
red o una publicación.

## Completa primero un corte pequeño y entero

No hace falta empezar con un sitio, código o publicación. Elige un texto corto que puedas revisar, un README local o un conjunto de fuentes públicas ya autorizadas. La meta no es que el modelo «haga mucho», sino completar una vuelta visible desde definición hasta entrega.

```text
Resultado: que una explicación de menos de 120 palabras permita a una persona nueva encontrar el primer paso.
Entrada: texto original, lector previsto y un problema conocido.
Permitido: leer el texto; proponer plan; tras confirmación editar solo ese texto.
No permitido: red, inicio de sesión, instalación, envío, publicación ni otros archivos.
Comprobación: guardar antes/después; pedir una revisión de «¿encuentra el primer paso?».
Entrega: qué cambió, qué no cambió, resultado de comprobación y qué sigue siendo desconocido.
```

Recorre las siete etapas: define lector y resultado; planifica un cambio; guarda el original como checkpoint; edita; compara; revisa con mirada nueva; entrega a otra persona o a tu yo de mañana. Si necesitas más material o una acción externa, detente en `blocked`; no amplíes permisos para aparentar que cerraste el ciclo.

### Cuándo dos intentos son comparables

Para comparar «pide al modelo que edite» con «escribe primero el protocolo», congela texto, objetivo, acciones permitidas, tiempo y regla de comprobación. Guarda primera salida, tiempo real, retrabajo, diff, resultado y desconocidos. Si cambia texto, modelo, herramienta, permiso o entorno, escribe `not_comparable`; un resultado más rápido o agradable una vez no demuestra eficiencia general ni un modelo superior.

## Experimento y caso de fallo

En una carpeta desechable, toma una tarea de documentación pequeña. Ejecuta dos variantes: una petición directa y otra con el contrato, los puntos de control y una comprobación elegida. Guarda ambos primeros intentos, diffs, órdenes, códigos de salida, duración real y cualquier corrección. No inventes tiempos o costes ausentes: escribe `unavailable`.

Provoca un timeout, una entrada cambiada, un permiso bloqueado o una salida de escritura local desconocida. Conserva el intento interrumpido, revisa el destino antes de repetir y marca la comparación `not_comparable` si cambiaron condiciones congeladas. Un éxito posterior no repara retroactivamente la comparabilidad.

Tres tareas pequeñas no prueban eficiencia general, calidad universal ni superioridad de un modelo. Un enlace que se resuelve tampoco prueba aprendizaje, publicación o adopción.

## Lista de aceptación

- [ ] Puedo definir alcance, exclusiones, aceptación, autoridad y reversión antes de editar.
- [ ] Puedo convertir una petición grande en un corte vertical con evidencia temprana.
- [ ] Puedo nombrar el último punto aceptado antes de reintentar.
- [ ] Puedo separar compilación, ejecución, visual, fuente, seguridad y aceptación de usuarios.
- [ ] Puedo detener una instalación, reinicio, despliegue o escritura externa no solicitados.
- [ ] Puedo entregar lo completado, lo no realizado, lo bloqueado y lo no verificado.

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
