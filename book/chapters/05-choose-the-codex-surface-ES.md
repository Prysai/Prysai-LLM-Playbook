<!-- content_id: chapter-05-choose-the-codex-surface | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# Capítulo 5: Elige la superficie de trabajo adecuada de Codex

**Estado:** `candidate`. Este capítulo propone un método de decisión estructurado
y límites de producto respaldados por fuentes, pero aún no ha superado una
prueba previa con aprendices independientes. No permite inferir capacidad de
cuenta, una ejecución en Cloud ni una comparación de modelos.

## El problema que resuelve este capítulo

Un mismo objetivo puede empezar en la app de escritorio, la CLI, una extensión
del IDE o un flujo web. Puede ejecutarse localmente, en un worktree de Git o en
un entorno Cloud. Son decisiones distintas.

Es fácil comprimir varios pasos en una sola frase:

~~~
«El inicio de sesión del navegador funcionó, el modelo aparece en el selector y
la preparación terminó; por tanto, la tarea está lista.»
~~~

Esa frase puede ser falsa de varias maneras independientes. Quizá no se puede
leer el repositorio objetivo; quizá el modelo no está disponible en esa
superficie; quizá falta la terminal, el navegador, el conector o la herramienta
de archivos. Un script de preparación de Cloud puede tener red cuando la fase
posterior del Agent no la tiene. Una etiqueta de worktree puede estar visible
mientras la consola o el IDE siguen apuntando a otra copia.

Usa este orden, que es más útil:

~~~
elige la superficie de trabajo
→ elige el punto de entrada
→ comprueba objetivo y límite de cuenta
→ comprueba modelo y herramientas
→ realiza la acción más pequeña
→ revisa evidencia antes de entregar
~~~

Una *superficie* es el lugar donde se ejecuta el trabajo y donde terminan sus
cambios. Un *punto de entrada* es la forma de iniciar y revisar ese trabajo.
CLI, IDE, escritorio y web no son otros nombres de Local, Worktree y Cloud.

## Objetivos de aprendizaje

Al terminar podrás:

- elegir entre `Local`, `Worktree` y `Cloud` según contexto, límite de datos,
  efectos secundarios, evidencia y recuperación;
- distinguir una superficie de trabajo de un punto de entrada de escritorio,
  CLI, IDE o web;
- comprobar acceso al recurso objetivo, disponibilidad de modelo y de
  herramientas como afirmaciones separadas;
- registrar por separado la evidencia de `setup` y de `agent` en Cloud,
  incluida la red y la vida de los secretos;
- producir un `surface-decision.md` que conserve opciones rechazadas y no
  observadas, no solo la opción elegida; y
- detenerte de forma segura cuando la siguiente prueba exija más autoridad de
  la que la tarea justifica.

## Una entrada de la vida real: la etapa da la pista

La investigación de campo del proyecto reúne informes públicos de GitHub
Issues, Stack Exchange y otros debates. Son informes de síntomas, no
reproducciones locales, causas oficiales ni soluciones garantizadas. Sirven
para detectar qué afirmaciones suelen confundirse.

| Categoría del informe público | Lo que se observó | Lo que **no** demuestra | Primera comprobación segura |
|---|---|---|---|
| OAuth termina, pero falla el intercambio del token | Se completa la autorización en el navegador, pero el cliente no acaba el intercambio | Que la sesión CLI, el host objetivo o el repositorio sean utilizables | Registra autorización, callback, intercambio y primera lectura inocua como cuatro etapas |
| Un proveedor personalizado solo expone una herramienta | La configuración se acepta, pero faltan shell, archivos o navegador | Que el modelo o proveedor pueda hacer la acción ausente | Guarda el inventario real; prueba por separado registro e invocación |
| Worktree y copia no coinciden | La interfaz dice Worktree, pero `cwd`, raíz del IDE, destino del parche y metadatos Git difieren | Que el proceso que edita esté aislado | Lee ruta absoluta, forma de `.git`, raíz del espacio y `git status`; no escribas si discrepan |
| Cloud prepara dependencias, pero la tarea no usa secreto o red | Se instala una dependencia o aparece una marca de setup, luego el Agent no llega al servicio | Que red y secretos de setup y Agent sean la misma capacidad | Registra por separado logs de setup y Agent, fase de red, vida del secreto y diff |
| Un allowlist bloquea GitHub u otro host | La petición falla bajo proxy, sandbox o política empresarial | Que abrir toda la red sea correcto o esté aprobado | Separa hipótesis de sandbox, allowlist, DNS/TLS y firewall antes de pedir un cambio acotado |

Consulta el [índice de problemas de campo](../../docs/research/field-problems-index-2026-08-10.md),
la [investigación sobre superficies](../../docs/research/field-problems-surface-2026-08-10.md)
y la [investigación de foros](../../docs/research/field-problems-forums-2026-08-10.md)
para ver enlaces y fechas originales. El registro explica deliberadamente qué
no reprodujo este proyecto.

### Caso de campo: verifica el objetivo antes de la primera escritura

![Señales de campo y la respuesta segura más pequeña](../../assets/teaching/field-signal-to-safe-degradation-red-black.svg)

El caso acotado [FC-WORKTREE-01](../../docs/research/field-case-worktree-target-mismatch-2026-08-12.md)
convierte un informe fechado sobre un worktree en un ejercicio de identidad del
objetivo. La instantánea de investigación del 2026-08-12 no encontró una
confirmación pública de causa raíz por parte de mantenedores, y este proyecto
no reprodujo el informe. La lección es más limitada: después de pasar de Local
a Worktree, compara la copia prevista con `cwd` de la shell, nivel superior de
Git, lista de worktrees, rama/HEAD y raíces escribibles antes de editar, crear
una rama, compilar o probar. Si una señal no coincide, el resultado seguro es
detener la escritura, no adivinar qué superficie manda.

## 1. Las tres capas que solemos confundir

### Superficie de trabajo: dónde se ejecuta y dónde cambia algo

La documentación oficial del entorno describe tres superficies de chat de
Codex:

| Superficie | Dónde corre la tarea | Para qué resulta útil | Lo que no demuestra |
|---|---|---|---|
| `Local` | Directorio actual del proyecto en tu máquina | Inspección rápida, ediciones locales pequeñas y trabajo que debe permanecer en la copia actual | Que el directorio sea seguro, esté limpio o sea el objetivo correcto |
| `Worktree` | Worktree Git separado en tu máquina | Aislar un cambio de la copia principal y revisar un diff focalizado | Que todos los procesos hayan cambiado al mismo worktree, ni que cambien red o permisos de cuenta |
| `Cloud` | Entorno remoto configurado | Trabajo largo o paralelo cuando encajan un runtime aislado y una copia remota | Que cuenta, repositorio, herramientas, red, secretos o diff final estén disponibles ahora |

`Local` y `Worktree` siguen siendo ejecución local. Un worktree es un mecanismo
de aislamiento de Git, no una frontera de seguridad universal. Cloud es una
frontera de ejecución, no una prueba de que setup, runtime del Agent o
conexiones externas ya estén listos.

### Punto de entrada: cómo inicias y revisas

Un punto de entrada cambia el patrón de interacción, no de forma automática la
frontera de ejecución:

| Punto de entrada | Ventaja | Evidencia de revisión habitual |
|---|---|---|
| App de escritorio | Estado visible de tarea, elección de entorno y revisión interactiva | Etiqueta del entorno, eventos, resumen, diff y confirmación manual |
| CLI | Rutas, comandos y scripts explícitos; trabajo local repetible | `cwd`, salida, código de salida, estado Git, diff y logs guardados |
| Extensión del IDE | Contexto del editor, archivos elegidos y diff cercano | Raíz del espacio, contexto seleccionado, parche y diff focalizado |
| Flujo web / Cloud | Preparación remota, ejecución larga y revisión de relevo | Repositorio/rama, evidencia de setup y Agent, resumen y diff |

Una CLI puede ejecutarse en Local o en un Worktree. Un IDE puede estar unido a
un Worktree mientras otra shell permanece en la copia original. «Usé la CLI»
no responde a «¿dónde ocurrió la edición?».

## 2. La capacidad es una cadena, no una insignia de inicio de sesión

Trata la disponibilidad como esta secuencia de afirmaciones:

~~~
soporte oficial del producto
→ autorización de la cuenta, espacio u organización actuales
→ el recurso objetivo se puede leer
→ el modelo candidato está disponible en esta superficie
→ la herramienta necesaria está registrada
→ la herramienta se puede invocar en esta fase
→ termina una acción concreta
→ el resultado está verificado
~~~

Cada flecha exige su propia evidencia. Un éxito anterior no sustituye una
comprobación posterior.

| Observación | Puede respaldar | No respalda por sí sola |
|---|---|---|
| Terminó la página de autorización del navegador | La página llegó a éxito | Intercambio de token, acceso al host objetivo o al repositorio |
| El modelo aparece en un selector | Era visible al elegirlo | Disponibilidad en otra superficie, acceso a herramientas o calidad de tarea |
| Un directorio permite escribir | Pasó una sonda de escritura para esa ruta y ese momento | Repositorio correcto, autorización remota o entrega segura |
| Aparece el nombre de una herramienta | Se anunció o registró una capacidad | Que se pueda ejecutar, tenga credenciales o pueda causar el efecto deseado |
| Cloud setup instaló una dependencia | Setup llegó a ese paso | Red del Agent, acceso a secretos, finalización o diff verificado |
| La interfaz muestra `Completed` | Se mostró un estado del producto | Revisión, pruebas, despliegue, push o aceptación de usuario |

Cuando la cadena se rompa, nombra la etapa rota. No hagas más fuerte una
afirmación cambiando «esta tarea» por «el producto lo admite en general».

## 3. Elige la superficie con cinco puertas

Evalúa las candidatas en este orden. Impide que un punto de entrada cómodo o un
modelo preferido decida antes que la seguridad del entorno.

### Puerta 1: contexto

¿Puede la superficie leer las reglas exactas del proyecto, los archivos
objetivo, la versión y las entradas de aceptación? Si no lo sabes, no lo
deduzcas del nombre de un repositorio ni de un inicio de sesión correcto.

### Puerta 2: límite de datos y aislamiento

¿Los datos deben quedarse en la máquina, en un worktree desechable o en un
entorno remoto aprobado? ¿Hay secretos, datos de clientes, código privado o
trabajo sin commit que no deba cruzar una frontera? Una superficie remota debe
ganarse la transferencia; una local también necesita una línea base recuperable.

### Puerta 3: acción y efecto secundario

¿La tarea es solo lectura, edición local, cambio de rama, push, llamada API o
acción de producción? Elige la superficie más pequeña que permita lo necesario.
No concedas red ni escritura remota solo porque simplifica un diagnóstico.

### Puerta 4: evidencia

¿Otra persona puede inspeccionar el material que corresponde a la afirmación?
Por ejemplo: eco de ruta, lectura de objetivo, inventario de herramientas,
salida de comando, diff, prueba, log de Cloud o aprobación humana. Una
superficie que permite actuar, pero no deja evidencia revisable, es mala opción
para una tarea de alto riesgo.

### Puerta 5: recuperación

Si falla la autenticación, desaparece la red, falta una dependencia o el Agent
deja un cambio parcial, ¿puedes conservar el estado y retomar desde un punto
conocido? Si no, rechaza la superficie o reduce la tarea a una sonda de solo
lectura.

### Tabla práctica de selección

| Forma de la tarea | Candidata probable | Por qué | Prueba necesaria antes de actuar |
|---|---|---|---|
| Leer documentación pública y escribir una nota local | `Local` | No hace falta escritura remota ni aislamiento especial | Copia correcta, lista de fuentes y ruta de salida |
| Editar un repositorio compartido protegiendo trabajo sin commit | `Worktree` | Separa línea base y diff | Ruta del worktree, rama/commit, forma de `.git` y estado Git |
| Ejecutar un cambio largo y paralelo sobre repositorio aprobado | `Cloud` | Puede encajar un runtime remoto aislado y relevo | Repositorio conectado, entorno, fases setup/Agent, logs y diff final |
| Enviar datos de clientes a un conector externo | Ninguna elección automática | Propietario, destino, autorización y retención requieren revisión | Payload exacto, cuenta destino, aprobación, reversión/compensación y evidencia |
| Diagnosticar una herramienta o ruta inaccesible | Primero superficie actual en solo lectura | Conserva la frontera del fallo | Inventario, ruta absoluta, fuente de configuración y error |

La tabla propone candidatas, no permisos automáticos. Una tarea puede quedar
`blocked` aunque una superficie sea normalmente adecuada.

## 4. Escribe la tarjeta de decisión antes de actuar

Para una tarea que supere la explicación de solo lectura, crea
`surface-decision.md`. Conserva las tarjetas rechazadas: explican por qué no se
eligió una opción plausible.

~~~
task_id:
task_goal:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | other
decision: selected | rejected | blocked | not_observed

required_context:
context_readable: yes | no | not_observed
context_evidence:
data_boundary:
allowed_side_effects:
isolation_and_git_delivery:

account_authorized: yes | no | not_observed
authorization_evidence:
target_resource_readable: yes | no | not_observed
resource_read_evidence:

model_id:
surface_available: yes | no | not_observed
availability_evidence:
required_tools:
tools_available: yes | no | not_observed
tool_evidence:

setup_action: not_applicable | concrete action
setup_evidence:
agent_action: not_applicable | concrete action
agent_evidence:
network_phase: local_policy | setup | agent | not_observed
secret_lifetime: none | setup_only | full_task_env | not_observed
result_review:

recovery_path:
rejection_or_block_reason:
checked_at:
reviewer:
~~~

Usa `not_observed` cuando la tarea no se ejecutó o no se recogió evidencia. No
rellenes una ausencia con `yes` o `no` solo para completar el formulario.

## 5. Cloud tiene fase de setup y fase de Agent

La documentación oficial de Cloud trata setup y ejecución del Agent como
partes distintas del ciclo. Setup puede instalar dependencias con acceso a red.
Después, la fase Agent suele estar desconectada salvo configuración contraria.
Los secretos del entorno pueden estar disponibles en setup y eliminarse antes
del Agent.

Registra por separado:

~~~
setup_action / setup_evidence
agent_action / agent_evidence
network_phase
secret_lifetime
result_review
~~~

«El script de setup instaló el paquete» solo es evidencia de setup. No prueba
que el Agent pueda llegar al servicio del paquete. «El secreto aparece en la
configuración» no prueba que el runtime de tarea pueda leerlo. Detén las
llamadas externas hasta demostrar fase actual y ruta de datos.

## 6. Experimento observable pequeño: la misma tarea, tres tarjetas

**Estado del experimento:** `not_run`. El protocolo siguiente es un diseño de
ejercicio, no un registro de que este repositorio haya usado Local, Worktree o
Cloud.

### Preparación

Prepara un archivo Markdown desechable, una lista corta de aceptación y un
repositorio Git temporal sin remoto. No uses secretos, datos privados,
mensajes externos, instalación, publicación, push ni destino de producción.

### Tarea

La tarea fija es:

> Lee `brief.md`, cambia una frase indicada en `draft.md`, ejecuta una
> comprobación de formato de solo lectura e informa el diff. No cambies ningún
> otro archivo.

### Procedimiento

1. Rellena tarjetas Local, Worktree y Cloud antes de ejecutar.
2. Aplica las cinco puertas a cada tarjeta.
3. Para cada candidata registra ruta absoluta, lectura del objetivo, inventario
   de herramientas, visibilidad de modelo y efectos permitidos.
4. Elige como máximo una tarjeta con evidencia suficiente para la edición
   inocua. Marca las demás `rejected`, `blocked` o `not_observed` y explica por
   qué.
5. Guarda el diff, salida de comprobación, run-id y superficie/entrada exactas.
6. Si cambian evidencia de ruta, herramienta, objetivo o fase, detente y
   conserva el punto de control en vez de ampliar autoridad.

### Evidencia mínima

~~~
run_id | surface | entry | checkout_or_environment
target_read | model_visible | tools_available
setup_status | agent_status | network_phase | secret_lifetime
decision | diff_path | check_output | reviewer
~~~

Un registro que pasa muestra más que un archivo cambiado. Muestra por qué se
eligió una superficie, por qué se rechazó otra y qué evidencia apoya la
afirmación final. Si no se ejecutó Cloud, su tarjeta debe decir `not_observed`.

### Evidencia que conservar

Conserva tarjetas, rutas absolutas, resultado de lectura, inventario, modelo
visible, estados de fase, diff, salida y registro de revisión. Mantén las
observaciones ausentes como `not_observed`, no las completes desde una etiqueta
de interfaz.

## 7. Patrones de fallo y degradaciones seguras

| Fallo | Interpretación correcta | Degradación segura |
|---|---|---|
| El login funciona, pero falla la lectura del objetivo | Identidad y acceso al recurso son etapas distintas | Detente en la evidencia de lectura y deja la tarea `blocked` |
| El modelo se ve, pero falta herramienta | Selección de modelo y registro de herramienta son distintos | Sigue con plan de solo texto o una superficie compatible conocida; no amplíes permisos a ciegas |
| Se eligió Worktree, pero las rutas difieren | Metadatos de aislamiento y directorio de proceso no coinciden | No escribas; muestra rutas, revisa Git y pide confirmación humana |
| Setup de Cloud pasó, Agent falló | La evidencia de setup no cubre Agent | Conserva setup como `passed`, Agent como `failed` o `not_observed`, y tarea `blocked` |
| Se bloquea una petición de red | Puede ser sandbox, proxy, DNS/TLS o política empresarial | Acota la petición y conserva el error; no cambies a red sin restricciones |
| Espera larga sin evento nuevo | No hay evidencia para llamar a la tarea activa o terminada | Detén/cancela según política y conserva el último punto de control |

Son estados de diagnóstico, no diagnósticos universales del producto. Un truco
de comunidad sigue siendo hipótesis hasta comprobar comportamiento oficial y
runtime relevante.

## Reflexión

Responde desde las tarjetas y la evidencia, no desde memoria:

- ¿Qué puerta cambió la selección: contexto, datos, acción, evidencia o recuperación?
- ¿Qué éxito anterior fue más tentador sobreafirmar?
- ¿El punto de entrada ayudó a ejecutar, a revisar o a ambas cosas?
- ¿Qué observación adicional distinguiría superficie errónea de falta de permiso o herramienta?
- Si hubiera datos privados de clientes, ¿qué cambiaría en límite de datos y aprobación?

## Tarea de transferencia

Lleva el método a una investigación que use navegador para fuentes públicas,
shell local para evidencia redactada y un entorno aislado para archivos
sensibles. Rellena de nuevo las tarjetas: no copies la elección de superficie
de este capítulo.

## Lista de aceptación

Estás listo para continuar cuando puedas:

- explicar la diferencia entre `Local`, `Worktree` y `Cloud`;
- explicar por qué escritorio, CLI, IDE y web son puntos de entrada, no la misma categoría;
- producir tres tarjetas con una opción elegida y razones explícitas de rechazo o ausencia;
- separar autorización de cuenta, lectura del recurso, visibilidad de modelo, registro e invocación de herramienta, acción y revisión;
- registrar por separado setup, Agent, fase de red y vida del secreto en Cloud; y
- detenerte o degradar cuando la siguiente prueba exija más autoridad que la tarea.

## Fuentes y límite de actualización

El método de decisión es estable. Superficies de producto, matrices de modelo,
modos de permiso, ciclo de Cloud, disponibilidad de herramientas y puntos de
entrada son hechos cambiantes. Consulta los registros fechados antes de hacer
una afirmación actual.

| Hecho cambiante | Fuente primaria | Consulta | Límite de alcance |
|---|---|---|---|
| Las superficies de chat incluyen Local, Worktree y Cloud | https://learn.chatgpt.com/docs/environments/modes.md | 2026-08-09 | Descripción oficial; no prueba que esta cuenta o tarea pueda usar cada una |
| Setup y Agent de Cloud son fases distintas | https://learn.chatgpt.com/docs/environments/cloud-environment.md | 2026-08-09 | Ciclo oficial de Cloud; no prueba una tarea Cloud aquí |
| Red de setup, red de Agent y vida de secreto tienen límites separados | https://learn.chatgpt.com/docs/environments/cloud-environment.md; https://learn.chatgpt.com/docs/cloud/internet-access.md | 2026-08-09 | La política de organización y evidencia de runtime siguen importando |
| Permisos locales y aprobaciones son capas distintas | https://learn.chatgpt.com/docs/agent-approvals-security.md | 2026-08-09 | Modelo de seguridad oficial; no prueba configuración efectiva de esta sesión |
| CLI, IDE, Cloud y soporte de modelos difieren por superficie | https://learn.chatgpt.com/docs/codex/cli.md; https://learn.chatgpt.com/docs/codex/ide.md; https://learn.chatgpt.com/docs/cloud.md; https://learn.chatgpt.com/docs/models.md | 2026-08-09 | Cuenta, espacio, despliegue y versión pueden cambiar disponibilidad |

Las [tarjetas de hechos oficiales](../../docs/research/openai-codex-facts-refresh-2026-08-09.md)
recogen los resúmenes fechados y límites del proyecto. La
[investigación de problemas de campo](../../docs/research/field-problems-codex.md)
y los registros relacionados aportan informes públicos. Ninguno sustituye una
observación actual de cuenta o runtime.

## Límite de evidencia del capítulo

Este capítulo es un artefacto de contenido `candidate` y su ejercicio está
`not_run`. El repositorio no ha creado un entorno Cloud, ejecutado la tarea de
tres tarjetas, validado una matriz de modelos ni reproducido cada informe
público como parte de este capítulo. Una verificación futura debe guardar
run-id, entorno, entradas exactas, inventario de herramientas, diff, salida y
revisor antes de cambiar esas afirmaciones.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="04-context-permissions-and-agent-ES.md" aria-label="Capítulo anterior: Capítulo 4 · Contexto, permisos y límites de acción del Agent">← Anterior<br><strong>Capítulo 4 · Contexto, permisos y límites de acción del Agent</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="06-model-selection-ES.md" aria-label="Capítulo siguiente: Capítulo 6 · Elegir un modelo no es venerar un modelo">Siguiente →<br><strong>Capítulo 6 · Elegir un modelo no es venerar un modelo</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
