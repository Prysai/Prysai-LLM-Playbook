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
El reintento continuó, pero el informe no estableció causa de servicio ni que
cada reintento fuera seguro. Conserva cronología, checkpoint, archivos
cambiados y efectos externos antes de reintentar; reintenta solo una acción
idempotente cuyo estado entiendas.

### CH2-02: un comando iniciado no es una validación aprobada

Un informe de CLI describió formato o análisis en `Working` durante 10–20
minutos sin salida clara. Una espera visible no prueba que el formateador haya
terminado. Define un umbral, interrumpe con el control seguro disponible,
guarda la última salida y compara estado antes y después.

### CH2-03: permiso para verificar no es permiso para instalar

Una petición de check puede requerir una herramienta ausente. «Instala lo que
haga falta» amplía autoridad, versión, red y posibles cambios persistentes. La
respuesta segura es declarar `verification tool unavailable`, conservar el
estado y pedir autorización separada o una comprobación manual acotada.

### CH2-04: configuración no equivale a capacidad probada

Un directorio, conector o perfil puede aparecer configurado y aun así no ser
accesible en esta tarea. Antes de editar, usa la sonda inocua más pequeña:
confirma ruta absoluta dentro del sandbox, crea y relee un centinela no secreto
solo en la ruta aprobada y elimínalo únicamente si la limpieza está autorizada.
Eso prueba una operación inocua de una ejecución, no acceso general.

### CH2-05: «completado» en la interfaz no es entrega revisada

Una respuesta segura puede describir un plan en vez de una acción, una acción
sin diff o un check sin salida. El receptor debe poder inspeccionar evidencia
objetivo. Si no puede, la entrega queda `unverified` aunque la interfaz muestre
una palabra tranquilizadora.

## Recuperación cuando la tarea se atasca o falla

| Señal | Primera acción | Lo que todavía no puedes afirmar |
| --- | --- | --- |
| Espera larga o sin salida | Conserva escena, interrumpe de forma segura, inspecciona estado/diff/última salida | Que el comando tuvo éxito o el check pasó |
| Diff parcial tras interrupción | Guarda el diff, busca desvío de alcance y reevalúa desde un checkpoint limpio | Entrega completa |
| Falta archivo, ruta o permiso | Detente y enumera el dato o decisión faltante | Una ruta adivinada o autoridad ampliada |
| Validación fallida | Clasifica y reduce el check | Que la implementación esté mal o que haga falta acceso total |
| Falta checker o dependencia | Registra herramienta no disponible y pide una decisión | Que un check no ejecutado pasó |
| Resumen de éxito sin evidencia | Haz la inspección específica más pequeña | Que se cumplió el objetivo |

## Evidencia: tres capas son el mínimo

Conserva tres capas distintas: una línea base que muestra qué existía antes,
un diff que muestra qué cambió dentro del alcance y un check enfocado o una
declaración explícita de que no se ejecutó. Añade el resumen de entrega solo
después de esas capas; no sustituye ninguna de ellas.

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

### Evidencia, fallo y reflexión

Guarda un registro con `run_id`, checkpoint previo, alcance, entradas leídas,
supuestos, acciones hechas y no hechas, alcance del diff, comando y resultado
de verificación, elementos no verificados, bloqueo, siguiente check, límite de
permiso y estado `passed | failed | stopped`.

En una copia descartable, ensaya un conflicto entre README y manifiesto, un
check de solo lectura incompleto, una restricción «no modificar código», la
ausencia de aceptación y una petición de red, instalación, secreto o push. La
respuesta correcta es preservar estado y pedir aclaración; no rescatar el
experimento ampliando autoridad.

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
