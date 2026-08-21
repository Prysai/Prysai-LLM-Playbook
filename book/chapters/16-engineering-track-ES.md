<!-- content_id: chapter-16-engineering-track | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 16: Ruta de ingeniería: de la idea a un software fiable

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Este capítulo enseña un ciclo de trabajo de ingeniería; los informes de campo no son reproducciones locales ni confirmaciones de causa raíz para todas las versiones.

## El problema que resuelve este capítulo

Las tareas de ingeniería invitan a escribir código antes de aclarar requisitos, decisiones de arquitectura, diseño de pruebas, comportamiento en ejecución y cómo volver atrás. Un parche puede compilar y pasar las pruebas unitarias sin que funcionen el recorrido del usuario, el manejo de errores, las versiones de dependencias, el despliegue o la recuperación.

> Que el build termine, que pasen las pruebas unitarias y de integración, que el programa se comporte bien en ejecución, que las personas usuarias lo acepten y que esté listo para producción son afirmaciones distintas.

Un Skill de ingeniería debe guiar un ciclo respaldado por evidencia: cada etapa tiene una condición de entrada, un incremento mínimo, rutas de fallo y un comprobante de salida.

## El ciclo de ingeniería

```text
definir el problema → especificar y fijar la aceptación → planificar incrementos
→ implementar de forma incremental → comprobaciones y pruebas
→ verificar en ejecución → revisar y simplificar
→ publicar y poder revertir → mantener y probar regresiones
```

| Etapa | Entrada | Evidencia mínima de salida |
|---|---|---|
| Definición | Problema y alcance | Enunciado repetible |
| Especificación | Límites, entradas, salidas y errores | Criterios de aceptación y no objetivos |
| Plan | Dependencias y riesgos | Incrementos que se puedan verificar por separado |
| Implementación | Incremento actual y línea base | Diff pequeño y explicable |
| Pruebas | Se pueden ejercitar comportamiento y fallos | Comandos, resultados y explicación |
| Ejecución | Entorno arrancable y datos representativos | Versión, logs, respuesta o pantalla |
| Release | Revisión y rollback disponibles | Registro, monitorización y ensayo de rollback |

## Especifica antes de implementar

Para «añade exportación», pregunta por el formato, el rango de datos, los permisos, el comportamiento con archivos parciales, la política de sobrescritura y los criterios finales de aceptación. Una tarea debe indicar la acción de la persona usuaria, las restricciones de entrada, las salidas de éxito y error, los límites, los no objetivos, las condiciones de rendimiento y seguridad, las señales observables y cómo se comprobará. Un Skill no puede sustituir una decisión por un valor predeterminado silencioso.

Trabaja guiado por fuentes, dudas e incrementos: documentación oficial, tipos, código actual o resultado reproducible son autoridad para APIs y versiones; los blogs y memoria del modelo son pistas. Comprueba lo que tipos y pruebas unitarias no prueban: red, base de datos, navegador, permisos, concurrencia, zonas horarias y despliegue. Cambia un corte explicable cada vez y conserva diff y punto de rollback.

## Ejecución, parada y recuperación

El comprobante del build dice que se puede compilar; el de las pruebas, que pasaron unas aserciones concretas; el de ejecución necesita el comando de arranque, las versiones, los valores del entorno, las entradas reales, las respuestas o pantallas, los logs y las rutas de error. La preparación para producción añade seguridad, rendimiento, migración, monitorización, reversión y aceptación de las personas usuarias.

Si no hay salida hasta que vence el tiempo de espera, falta una dependencia de prueba, el estado del worktree es desconocido, se piden credenciales reales o se propone un cambio persistente, publicar, desplegar o reiniciar, detente y revisa el alcance. No fuerces reinstalaciones ni amplíes permisos para obtener un verde; si no hay autorización, usa un entorno aislado, un doble de prueba o una comprobación estática.

## Práctica y límites

Elige una función de bajo riesgo, por ejemplo deduplicar una lista local y escribir JSON. Prepara registros normales, entrada vacía, duplicados e inválidos. Compara una ronda con solo objetivo frente a una ronda con problema, aceptación, no objetivos, cortes y matriz de pruebas. En ambas, ejecuta checks estáticos, unit tests, una ejecución local, entrada vacía e inválida; conserva contratos, diffs, comandos, códigos de salida, logs, versión, entradas y puntos de rollback.

Simula una interrupción: detente, inspecciona worktree, diff, logs y estado de pruebas antes de seguir. El ejercicio sigue `candidate / not_run` hasta que haya registros reales e independientes; no instales, publiques, despliegues ni reinicies sin autorización específica.

## Convierte una petición en una tarjeta de ingeniería

«Añade exportación» no permite empezar a programar. Escribe una tarjeta y deja lo desconocido como pregunta:

```text
Acción de usuario; resultado visible de éxito; salida para permiso, vacío,
entrada inválida y fallo de escritura; no objetivos; rutas y permisos;
tests, una ejecución local e inspección humana; estado original y recuperación.
```

Solo cuando otra persona puede repetir objetivo y no objetivo eliges el primer corte. Si formato, sobrescritura o permiso son desconocidos, el corte puede ser una vista previa de lectura, no una escritura silenciosa.

| Evidencia | Permite afirmar | No permite afirmar |
|---|---|---|
| Build verde | Compila o empaqueta con esa configuración | Flujo de usuario o despliegue |
| Tests verdes | Esas aserciones pasan en ese entorno | Errores, navegador, permisos o entradas no cubiertas |
| Ejecución local | Ese input dio ese resultado observado | Producción, todas las cuentas o rendimiento |
| Remoto leído | Aparece la revisión o registro indicado | Aceptación, monitorización o rollback seguro |

## Web coding: llevar un resultado visible a un navegador real

«Construye un sitio completo» mezcla audiencia, estados, archivos fuente, runtime,
revisión en navegador y rollback. Empieza en una copia descartable de la
`examples/skill-sandbox/product-context-real-estate`: lee README e `index.html`,
cambia solo una frase visible de `index.html` y no añadas framework, imagen,
formulario, API ni red. Si Python 3 ya está disponible, ejecuta desde la copia
`python -m http.server 4182`, abre `http://127.0.0.1:4182/` y comprueba título,
frase nueva, encabezado conservado, enlaces, consola y viewport de 390px.

Guarda directorio, archivo permitido, URL, observación visible, diff y lo que no
se verificó (despliegue, accesibilidad, otros navegadores y aceptación). El diff
no muestra si cargó CSS, si una ruta relativa falla, si el móvil se corta o si hay
un error de runtime; un render local no es un sitio desplegado.

## Experimento: un corte vertical JSON

En un directorio desechable, lee una lista de cadenas de `input.json`, elimina duplicados y escribe `output.json`. Solo se lee y escribe allí; no hay red, instalación, login, commit, push ni publicación.

1. Escribe tarjeta y línea base: lista normal, vacía, duplicada, campo ausente o JSON inválido.
2. Implementa primero normal y duplicado; conserva diff y salida.
3. Añade vacío e inválido, cambiando un punto explicable cada vez y ejecutando los checks declarados.
4. Lee `output.json` con un comando independiente; registra versión, entrada, salida, código y alcance.
5. Simula interrupción: antes de continuar, lee estado, diff, logs y salida; no añadas otra petición a un estado desconocido.

Si no hay salida, falta una dependencia o se propone cambiar PATH, reinstalar, subir logs, desplegar o reiniciar, detente y declara autorización y recuperación faltantes.

## Comprobación propia

- [ ] Escribo acción, éxito/fallo, no objetivos, alcance, aceptación y recuperación.
- [ ] Guardo diff, comando, salida, entradas y desconocidos por corte.
- [ ] No confundo build, tests, ejecución, remoto o aceptación de usuario.
- [ ] Tras interrupción inspecciono estado antes de reintentar.

## Tarjeta de ingeniería: un cambio mínimo que se puede aceptar

Esta tarjeta sirve para una copia descartable de un proyecto propio o autorizado. Primero limita el problema y después deja que cualquier LLM ayude a leer, planear o editar; no autoriza instalar, usar red, confirmar cambios, publicar ni tocar datos de producción.

```text
Objetivo: tras [una acción concreta], ¿qué resultado comprobable verá la persona?
Alcance: leer [rutas]; tras confirmar, editar solo [rutas]; no tocar [rutas].
Línea base: rama/commit actual, cambios previos y resultado original de pruebas o comandos.
Fuente de verdad: ¿qué especificación, comportamiento, prueba, interfaz o diseño posee este hecho?
Corte mínimo: ¿qué único comportamiento observable cambia ahora?
Aceptación: ¿qué comprueban por separado el alcance de archivos, el check dirigido, la ejecución y la lectura humana?
Acciones prohibidas: instalar, red, borrar, commit, push, publicar, mensajes externos, leer secretos.
Parada: pausar si ruta, especificación, autorización, recuperación o regla de aceptación no están claras.
Entrega: diff, comandos y salidas reales, aprobado/fallido/no ejecutado, incógnitas y siguiente paso mínimo.
```

### Cuatro luces verdes son cuatro conclusiones distintas

| Señal | Como máximo demuestra | Aún no demuestra |
|---|---|---|
| diff pequeño | el texto cambió poco en el rango comparado | requisito satisfecho o ejecución correcta |
| check estático aprobado | ese check pasó en el entorno registrado | todas las rutas y personas funcionan |
| ejecución local aprobada | un escenario concreto fue observable | despliegue, rendimiento, seguridad o integración externa |
| aceptación humana | una persona vio el resultado con la regla indicada | mantenimiento, transferencia o adopción general |

Si falta una luz, conserva `not_run`, `blocked` o `unknown` en la entrega. No amplíes permisos, sustituyas el entorno ni reescribas la especificación para obtener verde.

## Objetivos de aprendizaje

Podrás dividir un requisito en un corte pequeño verificable y separar build, test, ejecución local, publicación y aceptación de usuario como afirmaciones de evidencia distintas.

## Problemas reales: un test verde no termina en la tarea del usuario

Un parche puede compilar y aun así ignorar una entrada vacía, una ruta equivocada o recuperación. Importa que los checks cubran la acción concreta del usuario y su fallo.

### Preparación

Usa una carpeta desechable con `input.json`, sin red, credenciales, remoto ni instalación. Registra el archivo inicial y las rutas que pueden cambiar.

### Tarea

Elimina solo duplicados de una lista de cadenas y escribe `output.json` localmente. Comprueba entrada normal, vacía, duplicada e inválida; cambia un punto explicable cada vez.

### Evidencia

Guarda tarjeta, diff, comandos, salida, entrada, salida leída aparte y acciones no ejecutadas. Un test sin este registro no prueba publicación ni aceptación.

### Reflexión

¿Qué afirmación respalda cada check? ¿Qué fallo sigue desconocido y cuál es la siguiente comprobación mínima?

## Tarea de transferencia

Aplica la tarjeta a corregir un ejemplo de aprendizaje sin cambiar enlaces, navegación ni publicación. Nombra efecto, archivos, check y recuperación.

## Lista de aceptación

- [ ] Indico acción, éxito, error, no objetivos, alcance y recuperación.
- [ ] Entrego diff, comando, resultado y afirmación no comprobada por separado.
- [ ] Me detengo ante ruta, secreto, red o efecto persistente desconocidos.

## Fuentes y límite de mantenimiento

El ciclo y la separación de evidencia son métodos estables. Frameworks, comandos, ejecución y despliegue cambian por proyecto.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="15-research-track-ES.md" aria-label="Capítulo anterior: Capítulo 15 · ruta de investigación, de la pregunta al conocimiento auditable">← Anterior<br><strong>Capítulo 15 · ruta de investigación, de la pregunta al conocimiento auditable</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="17-marketing-track-ES.md" aria-label="Capítulo siguiente: Capítulo 17 · ruta de marketing, de entender el producto a experimentar con crecimiento">Siguiente →<br><strong>Capítulo 17 · ruta de marketing, de entender el producto a experimentar con crecimiento</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
