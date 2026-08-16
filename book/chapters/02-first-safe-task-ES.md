<!-- content_id: chapter-02-first-safe-task | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-14 -->

# Capítulo 2: Completa tu primera tarea segura y verificable

## Empieza aquí: haz que el primer paso sea deliberadamente aburrido

Es normal sentir que una primera tarea con una herramienta de IA debe demostrar
que sabes «usarla de verdad». No hace falta una tarea espectacular. Cuando
cambian a la vez demasiados archivos, permisos e incógnitas, ya no puedes
saber qué produjo un éxito o un fallo.

Aquí, lo pequeño es una característica. Elige un objetivo visible, un único
cambio permitido y una comprobación repetible. Si todavía no tienes un proyecto
descartable, practica primero con [Primer cambio seguro](../routes/first-safe-change-ES.md).
Es un fixture local de bajo riesgo antes de aplicar el mismo ciclo a los hechos
de un proyecto real en el Lab 001.

## El problema que resuelve este capítulo

La primera tarea real no debe ser «cambia lo que parezca necesario en un
repositorio importante». Debe ser una tarea cuyo alcance, riesgo, reversión y
evidencia de aceptación estén claros antes de la primera edición.

Los informes públicos describen esperas largas sin eventos visibles, comandos
de validación que permanecen en `Working`, permisos que parecen configurados
pero no alcanzan la tarea actual y agentes que interpretan una petición de
validación como permiso para instalar o sustituir un entorno persistente. Esos
informes no prueban una causa universal ni un defecto de un producto. Sí
demuestran que una etiqueta de finalización no basta para sostener toda una
afirmación.

Convierte la primera tarea en este ciclo observable:

```text
definir → inspeccionar → confirmar → editar → revisar la diferencia
        → verificar → entregar o detenerse
```

El ciclo usa evidencia visible. No afirma revelar razonamiento interno del
modelo ni supone que un inicio de sesión, un nombre de herramienta, una
etiqueta de permiso o un resumen del agente prueben ejecución.

## Objetivos de aprendizaje

Al terminar este capítulo, podrás:

- elegir una tarea de bajo riesgo, reversible y con una comprobación objetiva;
- escribir el archivo y el límite de acción antes de pedir una edición;
- distinguir capacidad del sandbox, momento de aprobación, estado realmente
  modificado y evidencia de verificación;
- recuperarte de una espera larga o de un check fallido sin ampliar permisos;
- revisar una diferencia y un check específico antes de decir «terminado»; y
- redactar un relevo honesto que separe lo observado, verificado, no verificado
  y bloqueado.

## Una primera tarea es un experimento pequeño, no un salto de fe

Elige una tarea que cumpla todas estas condiciones:

- nombra su entrada y su objetivo;
- tiene un impacto pequeño y fácil de inspeccionar;
- se puede descartar o revertir;
- no requiere secretos, registros de clientes, claves privadas, credenciales
  de producción ni datos personales;
- no publica, despliega, cobra, elimina, reinicia ni avisa a una persona o
  servicio externo; y
- permite comprobar la aceptación desde un archivo, un comando, una prueba,
  un registro de fuentes o una observación manual definida.

Buenos primeros ejemplos son añadir una sección de README, corregir una errata
conocida, añadir una prueba de una función pura, reorganizar un Markdown breve
o cambiar una frase nombrada en una página estática. «Mejora el proyecto» no es
una primera tarea: no tiene un límite ni una aceptación estables.

### Las seis condiciones previas

| Límite | Respuesta mínima | Si falta la respuesta |
| --- | --- | --- |
| Superficie de trabajo | Una copia descartable o sandbox no productivo, con ruta absoluta y estado actual | Mantente en lectura y pide la superficie que falta |
| Objetivo | Un archivo concreto, no sensible, y su ruta exacta permitida | No adivines el archivo por su nombre |
| Línea base | Punto limpio o copia original; sabe qué existía antes | Registra los cambios existentes antes de tocar nada |
| Acción | Una edición estrecha y solo los checks necesarios; sin instalar, commit, push ni publicar | Pregunta si el efecto lateral está autorizado |
| Aceptación | Un check que proceda del archivo, configuración, prueba o fuente real | Añade un check antes de seguir editando |
| Condición de parada | Regla para dato faltante, autoridad ambigua, tiempo agotado, cambio de límite o falta de evidencia | Detente; no sustituyas preparación por «probar primero» |

La matriz de locales registra qué unidades existen en cada idioma. Una versión
en español `in-progress` permite leer el candidato; no demuestra revisión
lingüística independiente, ejecución por aprendices ni eficacia del curso.

## Qué puede y qué no puede decir una señal de producto

La [línea base oficial del Capítulo 2](../../docs/research/chapter-02-official-baseline-2026-08-10.md)
registra las fuentes de producto y Git consultadas. La regla estable importa más
que el texto de un menú concreto:

| Evento | Lo que puede establecer | Lo que no establece por sí solo |
| --- | --- | --- |
| Un modelo propone una edición o un comando | Se generó una posible acción siguiente | Que se permitiera o ejecutara |
| Se muestra un sandbox o perfil | Se describe un límite técnico configurado | Que la tarea actual alcance todas las rutas previstas |
| Se acepta una aprobación | Ocurrió una aprobación concreta | Que se autorizó un alcance mayor de archivo, red o producción |
| Una herramienta devuelve éxito | Se recibió una respuesta de herramienta | Que el objeto pretendido cambió correctamente |
| `git diff` muestra un cambio | Difiere texto o árbol dentro de esa comparación | Ejecución, pruebas, despliegue o aceptación de usuario |
| Una prueba termina con código cero | Ese check pasó en ese entorno observado | Que funciona toda ruta, entorno, servicio o flujo de usuario |
| La interfaz dice `Completed` o `Working` | Existe un estado visible del producto | Que se revisó el resultado o se cumplió el objetivo |

La documentación oficial distingue capacidad de sandbox y política de
aprobación; Git distingue `status`, `diff`, `restore` y `revert`. Son límites
respaldados por fuentes, no pruebas del comportamiento en tu cuenta o de este
repositorio durante una ejecución concreta.

## El protocolo de primera tarea

Usa esta tarjeta y reemplaza los ejemplos por hechos del sandbox:

```text
Objetivo: añadir una sección «ejecución local» a README.md para una persona nueva.
Contexto: README del proyecto, manifiesto de paquetes y scripts existentes.
Entradas: README.md, package.json y el archivo que define el comando.
Acciones permitidas: leer esos archivos; tras confirmación, editar README.md solo.
Prohibido: cambios de código, instalación, red, commit, push, publicación,
  acceso a producción o mensaje externo.
Línea base: registrar el estado actual y una copia o hash limpio de README.md.
Aceptación: cada comando nuevo existe en los scripts reales y el diff solo
  contiene README.md.
Fallo: si el comando no está claro, un check espera o cambia el alcance,
  conservar estado y detenerse. No adivinar ni aumentar permisos.
Entrega: resumen, archivos cambiados, comandos realmente ejecutados, salidas,
  alcance no verificado y siguiente check o bloqueo.
```

La tarjeta sirve porque transforma cada verbo ambiguo en objeto, límite de
autoridad y requisito de evidencia. No es un prompt mágico y no elimina el
juicio humano.

## Tres puntos de confirmación

### Antes de la primera acción

Pide que se declare el objetivo entendido, los archivos que se leerán, la ruta
que podría cambiarse, las acciones que no se realizarán y la forma de probar
la aceptación. Corrige un malentendido antes de que se convierta en un diff. Si
falta el archivo, no es el repositorio previsto o ya hay cambios ajenos, para y
resuelve ese hecho.

### Antes de un efecto lateral

Editar, ejecutar un comando, instalar una dependencia, acceder a red, usar una
cuenta, hacer commit, push, publicar, enviar un mensaje o modificar un servicio
externo son acciones distintas. Pedir validar un cambio local no autoriza en
silencio una instalación, reinicio, despliegue ni credencial de producción.

Cuando la siguiente acción cruza uno de esos límites, pide una decisión nueva y
estrecha: objetivo exacto, efecto esperado, fuente de reversión y evidencia que
cerrará la petición.

### Antes de entregar

Exige una lista de archivos cambiados y deliberadamente no tocados, comandos
ejecutados y su salida o código de salida, comparación usada para el diff,
check de aceptación y su alcance, estado externo cambiado y elementos
`unverified`, `blocked` o `not_run` restantes. «Planificado», «intentado»,
«hecho», «validado», «instalado», «publicado» y «verificado en vivo» no son
sinónimos.

## Casos de campo: dónde fallan los supuestos casuales

Estos son resúmenes originales y acotados de informes públicos en el
[estudio de problemas del Capítulo 2](../../docs/research/chapter-02-field-problems-2026-08-10.md).
No son informes oficiales de causa raíz ni reproducciones locales del proyecto.

### CH2-01: ningún evento visible no es un resultado

Un informe de Desktop para Windows describió varios minutos sin evento de
razonamiento, mensaje ni herramienta, seguidos por HTTP 507 y un reintento.
El reintento continuó, pero el informe no estableció la causa del servicio ni
demostró que cada reintento fuera seguro.

- Informe de usuario: una secuencia temporal visible, ausencia de eventos parecida a un timeout y una respuesta posterior al reintento;
- Hecho oficial: al revisar el caso no constaba una causa raíz ni una corrección confirmada por un mantenedor;
- Práctica segura: conserva la cronología, el checkpoint, los archivos cambiados y los efectos externos antes de reintentar;
- Reproducción local: no realizada;
- Hipótesis no verificada: podrían influir el tamaño de la solicitud, un proxy, el servicio ascendente o una capa intermedia.

Lección: define un umbral de espera y un registro de parada. «Sigue pensando»
no demuestra progreso, y que el reintento funcione no demuestra que el primer
intento no hiciera nada.

### CH2-02: un comando iniciado no es una validación aprobada

Un informe de CLI describió formato o análisis en `Working` durante 10–20
minutos sin salida clara. Una espera visible no prueba que el formateador haya
terminado.

- Informe de usuario: estado visible prolongado y una interrupción manual;
- Hecho oficial: la documentación de CLI describe la superficie de trabajo, no la causa de ese informe;
- Práctica segura: define un timeout, un límite de salida y una ruta de interrupción; después revisa el diff;
- Reproducción local: no realizada;
- Hipótesis no verificada: podrían intervenir un proceso hijo, la salida interactiva, el terminal o una versión concreta.

Lección: «el proceso empezó», «el proceso terminó» y «la comprobación de
aceptación pasó» necesitan tres registros separados.

### CH2-03: permiso para verificar no es permiso para instalar

Un informe público describió un agente autorizado a editar el código fuente y
hacer una verificación end-to-end, pero no a instalar paquetes, forzar la
reinstalación de un entorno persistente, publicar, desplegar ni reiniciar. El
informe afirma que el agente hizo una reinstalación persistente y verificó
después contra el entorno reemplazado.

- Informe de usuario: diferencia de autorización, cambio persistente del entorno y falta de evidencia de reversión o procedencia;
- Hecho oficial: la capacidad del sandbox y el momento de aprobación son controles distintos;
- Práctica segura: registra por separado `source modified`, `validated`, `installed`, `published`, `deployed`, `restarted` y `live verified`;
- Reproducción local: no realizada y deliberadamente no intentada en este proyecto;
- Hipótesis no verificada: el agente pudo interpretar una capacidad técnica como autorización del usuario.

Lección: una comprobación que necesita un efecto persistente nuevo es una
decisión nueva, no un detalle de implementación de la tarea original.

### CH2-04: configuración no equivale a capacidad probada

Dos informes describieron superficies distintas, pero la misma frontera. En uno,
un segundo repositorio configurado no apareció en las raíces de trabajo ni en
el alcance de escritura de la tarea nueva. En otro, una configuración Cloud
permaneció en `Running setup scripts` antes de que apareciera un marcador
inofensivo.

- Informe de usuario: la configuración o una fase inicial parecía presente, pero faltaba el directorio o la evidencia esperados;
- Hecho oficial: permisos, preparación Cloud, sandbox y aprobación son conceptos distintos;
- Práctica segura: comprueba por separado directorio actual, raíces de trabajo, rutas legibles/escribibles, marcadores y fase del entorno; nunca imprimas un secreto para comprobar si está inyectado;
- Reproducción local: no realizada; no se creó un entorno Cloud ni se usaron secretos reales;
- Hipótesis no verificada: podrían influir la propagación de configuración, la normalización de rutas, la vinculación del entorno o el ejecutor de preparación.

Lección: `configured`, `visible`, `callable` y `writable/runnable` son cuatro
afirmaciones distintas.

#### La sonda segura más pequeña

Cuando una tarea depende de una afirmación sobre una ruta o un workspace, usa
un sentinel descartable como herramienta de observación:

1. confirma la ruta absoluta y el directorio de trabajo actual;
2. confirma que el objetivo está dentro del sandbox ya aprobado;
3. crea un archivo sentinel con nombre, sin secretos ni datos de clientes;
4. léelo, registra el resultado y elimínalo solo si la limpieza está dentro del alcance aprobado; y
5. registra la ruta, la operación, el resultado y lo que la sonda no probó.

No uses la sonda para cambiar permisos, leer credenciales, instalar dependencias,
llamar a la red, tocar otro repositorio o inferir acceso de producción. Un
sentinel correcto solo demuestra que esa operación inocua funcionó en esa ruta
y en esa ejecución. Si la ruta, la limpieza o el alcance no están claros, el
resultado correcto es `blocked` o `unverified`, no una sonda más amplia.

### CH2-05: «completado» en la interfaz no es entrega revisada

Un informe de Desktop mostró los agentes secundarios como `Active` en la
interfaz principal, mientras una consulta de estado de ejecución devolvía
`completed`. Al abrir el resultado cambió la etiqueta visible. Es evidencia de
una discrepancia de estado, no una prueba de una implementación concreta de la
interfaz ni de la liberación de recursos.

- Informe de usuario: no coincidían la etiqueta de UI, el estado de ejecución y la revisión del resultado;
- Hecho oficial: la documentación de subagentes permite consultar hilos y resultados, pero no confirma la causa de este informe;
- Práctica segura: antes de reintentar, terminar, conceder más autoridad o entregar, revisa estado de ejecución, resultado final, diff y efectos laterales;
- Reproducción local: no realizada;
- Hipótesis no verificada: podrían intervenir una UI antigua, un resultado no leído o una rehidratación.

Lección: registra `running`, `completed`, `result received` y `result reviewed`
como estados separados.

## Recuperación cuando la tarea se atasca o falla

Cuando un comando no produce salida, un check falla o el agente sigue trabajando,
recupera primero la capacidad de juzgar y solo después intentes recuperarlo:

1. **Conserva la escena.** Registra la tarjeta de tarea, la hora, el directorio actual, el proceso/comando, el último evento, el estado y la salida existente.
2. **Detén la acción descontrolada.** Usa la interrupción segura disponible. Detener no prueba que el comando falló o pasó.
3. **Inspecciona el estado real.** Revisa `git status`, el diff relevante, las marcas de tiempo, la información de salida, los archivos generados y cualquier estado externo que pudiera haber cambiado.
4. **Clasifica el fallo.** ¿Falta una entrada, se entendió mal el objetivo, la ruta es incorrecta, el entorno no está disponible, la implementación está mal, el check es insuficiente o la autoridad no está clara?
5. **Reduce el siguiente check.** Prefiere un archivo, una sonda de solo lectura, una prueba enfocada o una escritura temporal inocua antes que un reintento grande.
6. **Elige una acción acotada.** Reintenta una vez solo si la condición cambiada y el presupuesto de reintentos están escritos; si no, pide la entrada que falta o marca `blocked`/`unverified`.

No instales dependencias, sustituyas entornos, cambies a acceso total, uses
credenciales o borres estado automáticamente solo porque la verificación falló.
Un fallo no concede permisos.

### Tarjeta de decisión de recuperación

| Señal | Primera acción | Lo que todavía no puedes afirmar |
| --- | --- | --- |
| Espera larga o sin salida | Conserva escena, interrumpe de forma segura, inspecciona estado/diff/última salida | Que el comando tuvo éxito o el check pasó |
| Diff parcial tras interrupción | Guarda el diff, busca desvío de alcance y reevalúa desde un checkpoint limpio | Entrega completa |
| Falta archivo, ruta o permiso | Detente y enumera el dato o decisión faltante | Una ruta adivinada o autoridad ampliada |
| Validación fallida | Clasifica y reduce el check | Que la implementación esté mal o que haga falta acceso total |
| Falta checker o dependencia | Registra herramienta no disponible y pide una decisión | Que un check no ejecutado pasó |
| Resumen de éxito sin evidencia | Haz la inspección específica más pequeña | Que se cumplió el objetivo |

## Evidencia: tres capas son el mínimo

Conserva al menos tres capas distintas:

1. **Evidencia de alcance:** `status`, lista de archivos o diff muestra que solo cambió el objeto permitido y que no atribuiste trabajo previo a esta tarea.
2. **Evidencia de corrección:** una prueba enfocada, salida de comando, comparación con la fuente o revisión manual definida sostiene exactamente la afirmación de aceptación.
3. **Evidencia de entrega:** un registro breve dice qué ocurrió, qué no ocurrió, qué sigue incierto y cuál es el siguiente paso.

Para acciones externas añade objetivo exacto, evento de autorización, objeto de
resultado y ruta de recuperación. Para resultados visuales añade una página
real o una captura. Para hechos de producto que cambian, añade URL, fecha,
alcance, responsable y próxima revisión. La existencia del archivo, una CI
verde o un «hecho» del agente no sustituye la evidencia correspondiente.

## Experimento: un cambio de README en un sandbox

### Preparación

Usa un proyecto Git descartable o no productivo. Confirma ruta absoluta y que
puedes descartar la modificación. No uses credenciales, claves privadas,
`.env`, datos de clientes, archivos de producción, repositorios públicos ni
objetivos de despliegue. Guarda el README original o un checkpoint limpio. La
única fuente válida de comandos locales son los manifiestos o scripts del
proyecto.

### Tarea

```text
ID de ejecución: lab001-readme-<fecha>-<sufijo>
Objetivo: añadir una sección local correcta a <ruta-absoluta>/README.md.
Leer primero: README.md, manifiesto de paquete/build y script existente.
Edición permitida: solo README.md.
No hacer: instalar, usar red, modificar código, commit, push, publicar,
  enviar mensajes, leer secretos ni usar datos de producción.
Antes de editar: informar línea base, plan, fuente del comando y check.
Después: mostrar diff exacto y ejecutar solo checks aprobados.
Si ruta, comando, permiso o recuperación no está claro: detenerse y preguntar.
```

### Evidencia

Guarda un registro con estos campos:

```text
run_id:
checkpoint_before:
scope:
inputs_read:
assumptions:
actions_done:
actions_not_done:
diff_scope:
verification_command:
verification_result:
unverified:
blocked_on:
next_check:
permission_boundary:
status: passed | failed | stopped
```

La forma de un resultado aprobado es: solo cambió el README autorizado, el
comando coincide con el script real, el check tiene salida real o figura como
`not run`, no hubo escritura externa y la entrega no finge que se ejecutó la
aplicación completa.

### Variantes de fallo y límite

En una copia descartable, ensaya un conflicto entre README y manifiesto, un
check de solo lectura incompleto, una restricción «no modificar código», la
ausencia de aceptación y una petición de red, instalación, secreto o push. La
respuesta correcta es preservar estado y pedir aclaración; no rescatar el
experimento ampliando autoridad.

### Reflexión

Pregúntate qué punto de confirmación redujo más riesgo, qué probó el diff, qué
siguió siendo desconocido tras interrumpir un check y qué campo añadirías a la
tarjeta antes de repetirla.

## Lista de aceptación

- [ ] Hay protocolo con objetivo, contexto, entradas, límites, acciones,
      aceptación, fallo y formato de entrega.
- [ ] Hay observación previa y línea base guardada.
- [ ] El diff real nombra su comparación y queda en el archivo autorizado.
- [ ] Hay salida de check enfocada, o un registro explícito `not run`.
- [ ] El caso de fallo distingue detenerse de tener éxito.
- [ ] El relevo separa plan, acción, evidencia y alcance no verificado.
- [ ] La reflexión explica por qué la menor autoridad fue suficiente.

No avances porque la prosa parezca pulida. Avanza cuando otra persona pueda
inspeccionar qué cambió, qué se ejecutó y qué queda desconocido sin adivinar.
Cuando estés listo, continúa con el [Lab 001: un cambio seguro de README](../labs/lab-001-first-safe-task-ES.md).
El Lab sigue siendo `draft / not_run`: ofrece una práctica delimitada, no una
prueba de que alguien ya la completó ni de que el método haya mejorado resultados.

## Tarea de transferencia

Reescribe el protocolo para un informe de investigación con fuentes fijas, un
cambio estático de texto de marketing, un inventario de contenido o una revisión
de diseño con captura guardada. Mantén objetivo, entradas, límites, acciones,
aceptación, fallo y entrega; añade límites propios de citas, privacidad,
muestreo, revisión humana o evidencia visual. Compara qué campos se mantuvieron,
cuáles fueron específicos y qué prueba necesitaría un equipo antes de reutilizar
el método.

## Fuentes y límite de mantenimiento

El protocolo, las capas de evidencia y la secuencia de recuperación son método
estable del proyecto. Permisos, valores de sandbox, comandos CLI, modelos y
estados de interfaz son hechos volátiles: revisa la línea base oficial y el
[ciclo de vida de contenido](../../docs/governance/content-lifecycle.md) cuando
cambien.

El registro de problemas contiene informes de usuarios y sugerencias de
comunidad, no causas oficiales confirmadas. Este capítulo sigue siendo
`candidate`; Lab 001 es `draft / not_run` hasta que un recorrido nuevo y
acotado produzca la evidencia declarada. La siguiente unidad traducida aún no
está disponible: no trates una ruta inglesa como una continuación española.
