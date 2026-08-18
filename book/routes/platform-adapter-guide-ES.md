<!-- content_id: platform-adapter-guide-route | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Elige tu plataforma de LLM: el mismo núcleo y un adaptador a la vez

**Estado:** `candidate`. **Estado de ejecución:** `not_run`.

ChatGPT, Claude, Gemini, DeepSeek, Grok y Codex te hablan en
conversación, pero no son el mismo producto. Esta ruta conserva el
núcleo transferible de la
[Universal Core Foundations route](universal-core-foundations-ES.md) y añade
un adaptador honesto a la vez: qué es lo que realmente difiere, qué puedes
probar con seguridad hoy en cada plataforma y qué debes comprobar en fuentes
oficiales antes de confiar en una afirmación específica de una plataforma.

La ruta insignia de práctica del Playbook es Codex, pero el método no está
atado a un solo proveedor. Cada plataforma nombrada abajo es un **adaptador candidato**: el
núcleo universal se aplica, y los controles específicos de cada
plataforma necesitan su propia fuente de primera parte con fecha antes de
convertirse en hechos de enseñanza.

## Regla cero: nunca deduzcas equivalencia a partir de un nombre

Un nombre de modelo, un inicio de sesión o un botón familiar no demuestran que
dos plataformas compartan herramientas, permisos, memoria, cuentas, precios,
controles de datos ni comportamiento de Agent. Antes de repetir una afirmación
sobre una plataforma, hazte tres preguntas:

1. **¿Qué superficie de producto exactamente** (chat web, app, CLI, IDE, API, agente)?
2. **¿Qué fuente de primera parte, comprobada cuándo**, dice que esto es cierto hoy?
3. **¿Qué cambiaría de forma visible** si la afirmación fuera falsa?

Si no puedes responder a las tres, deja la afirmación como `unknown` y anota la
siguiente comprobación. Consulta la
Platform Adapter Review Skill
y Platform Fact Watch para
conocer el método de mantenimiento que hay detrás de esta regla.

## El mapa de plataformas en una página

| Plataforma | Superficies habituales | Lo que suele diferir del núcleo | Primer paso seguro en esta página |
|---|---|---|---|
| ChatGPT | chat web, app, API | alcance de cuenta, ajustes de memoria, carga de archivos, conmutador de navegación, enlaces de uso compartido | [Primera tarea en ChatGPT](#chatgpt-first-task) |
| Claude / Claude Code | chat web, agente CLI, IDE | agente de terminal y archivos, avisos de permisos, memoria de proyecto CLAUDE.md | [Primera tarea en Claude Code](#claude-code-first-task) |
| Gemini | chat web, app, API | alcance de cuenta de Google, integración con Google Workspace, extensión de app | [Primera tarea en Gemini](#gemini-first-task) |
| DeepSeek | chat web, app, API | la elección de modelo y la ventana de contexto varían según la versión; consulta la página oficial del modelo | [Primera tarea en DeepSeek](#deepseek-first-task) |
| Grok | chat web, app | integración con la cuenta de X, acceso a publicaciones en tiempo real, cadencia de lanzamiento de modelos | [Primera tarea en Grok](#grok-first-task) |
| Codex | escritorio, CLI, IDE, nube, API | la ruta insignia del Playbook: archivos, herramientas, Skills, Agents, permisos | [Ruta de Codex](../routes/first-safe-change-ES.md) |

Esta tabla es orientación, no equivalencia. Cada fila necesita también su propia
fuente actual antes de que una lección dependa de ella. La disponibilidad de
superficies, los precios y los valores por defecto de permisos cambian con
frecuencia; trátalos como hechos volátiles.

## La primera tarea segura en cualquier plataforma

Copia esta petición en la plataforma que hayas elegido. Usa material ficticio,
sin herramientas y sin datos de cuenta: la misma tarea funciona en todas
partes, que es exactamente el punto del núcleo.

```text
Resultado: reescribe este aviso ficticio de un club para miembros nuevos.
Material: "El club se reúne el martes a las 6. Trae un cuaderno. La sala se
confirmará más tarde."
Formato de respuesta: escribe dos frases. Conserva todos los hechos indicados. Pon cualquier detalle
que falte entre [corchetes]. Después enumera los hechos que conservaste.
Comprobación: compara la fuente y la reescritura. No puede aparecer una hora, sala, cuota, contacto ni
promesa nuevos.
Parada: no navegues, envíes, publiques ni supongas un detalle desconocido.
```

Después comprueba tres cosas por ti mismo:

1. ¿Puedes señalar cada afirmación de la reescritura en el aviso facilitado?
2. ¿La respuesta respetó el límite de dos frases y mostró qué conservó?
3. ¿Añadió un detalle que debería seguir siendo `[unknown]`?

Si el chat ofrece buscar, enviar, publicar, usar una herramienta o pide más
material del que necesita este pequeño ejercicio, detente. La plataforma puede
ser capaz de esas acciones; la capacidad no es una instrucción para usarlas.

<span id="chatgpt-first-task"></span>

<span id="chatgpt-first-task"></span>

## Primera tarea en ChatGPT

Abre cualquier superficie de ChatGPT y ejecuta la primera tarea segura de
arriba. Después anota una diferencia de plataforma que puedas observar de
verdad: ¿la respuesta menciona la navegación, la memoria o un enlace de uso
compartido? Registra lo que viste, no lo que supongas. Para una comprobación
respaldada por fuentes de una afirmación sobre ChatGPT, usa la
Source Investigator Skill
con las páginas de ayuda oficiales de OpenAI como propietarias de los hechos
del producto.

<span id="claude-code-first-task"></span>

<span id="claude-code-first-task"></span>

## Primera tarea en Claude Code

Claude Code es un agente de terminal: puede leer y editar archivos en el
proyecto en el que lo inicias. Antes de ejecutar nada, crea una carpeta
desechable y ejecuta la primera tarea segura allí. Observa el aviso de
permisos: ¿pide permiso antes de editar archivos o ejecutar comandos? Ese aviso
es la diferencia entre chat y agente; también es el punto en el que eliges.
Para la memoria de proyecto, Claude Code lee un archivo `CLAUDE.md`; trata
cualquier cosa escrita allí como instrucciones que un modelo puede seguir, así
que revísalo como cualquier regla del proyecto. No inicies Claude Code en un
repositorio real con credenciales, datos de producción o comandos destructivos
hasta que hayas completado la disciplina de la
[First Safe Change route](first-safe-change-ES.md).

<span id="gemini-first-task"></span>

<span id="gemini-first-task"></span>

## Primera tarea en Gemini

Ejecuta la primera tarea segura en la superficie de chat de Gemini. Anota qué
alcance de cuenta está activo y si se ofrecen extensiones de app (Google
Workspace, YouTube, Maps) en la interfaz. Una extensión es un efecto externo:
puede leer o escribir en tu nombre, así que una lección de Gemini sobre
extensiones es un tema de adaptador de plataforma, no un tema del núcleo. No
actives extensiones para una tarea de práctica solo de texto.

<span id="deepseek-first-task"></span>

## Primera tarea en DeepSeek

Ejecuta la primera tarea segura en la superficie de chat o app de DeepSeek. El
nombre del modelo, la ventana de contexto y la disponibilidad cambian entre
versiones; la página oficial del modelo es la propietaria de esos hechos.
Registra el nombre del modelo que usaste realmente y la fecha, para que la
ejecución siga siendo reproducible. No pegues claves de API, código privado ni
documentos internos en un chat web.

<span id="grok-first-task"></span>

## Primera tarea en Grok

Ejecuta la primera tarea segura en la superficie de chat de Grok. Si tu cuenta
está vinculada a X, ten en cuenta que las publicaciones y el contenido en
tiempo real pueden estar dentro del alcance de la conversación; eso es una
diferencia de plataforma y también una decisión de privacidad. No pegues
mensajes privados ni borradores en una conversación que pueda alcanzar un grafo
social. Una respuesta de Grok que cita publicaciones actuales es una afirmación
sobre el comportamiento de recuperación de la plataforma: compruébala contra
las páginas de ayuda oficiales de X/Grok antes de repetirla.

## Primera tarea en Codex

Codex es la ruta insignia del Playbook porque expone el bucle completo:
contexto, herramientas, permisos, Skills, Agents y verificación. Empieza con la
[First Safe Change route](first-safe-change-ES.md) y
[Lab 001](../labs/lab-001-first-safe-task-ES.md) en un proyecto desechable.
No saltes a una superficie en la nube ni a un repositorio real hasta que el
hábito de inspeccionar antes de editar te resulte cómodo.

## Después de la primera tarea: ¿qué ruta deberías seguir?

- Quieres una práctica inicial solo de texto: [Beginner Practice Pack](../communication-clinic-ES.md).
- Quieres la ruta insignia en profundidad con archivos y herramientas: [First Safe Change](first-safe-change-ES.md).
- Quieres primero la base neutral de plataforma: [Universal Core Foundations](universal-core-foundations-ES.md).
- Quieres comparar dos plataformas de forma justa: LLM Comparison Protocol.
- Quieres saber si una lección de plataforma pertenece al plan de estudios:
  Platform Adapter Review.

## Estado de la evidencia y límite

Esta ruta es `candidate / not_run`: la estructura y las comprobaciones existen,
pero no hay ningún intento de aprendiz, ninguna ejecución entre plataformas ni
ninguna revisión independiente registrada. Las descripciones por plataforma de
arriba son orientación derivada de documentación de primera parte y recibos de
investigación con fecha
(cross-LLM beginner prompting source receipt,
platform teaching boundary card).
No son evidencia de que ninguna plataforma se comporte de forma idéntica, de
que una tarea vaya a tener éxito en todas partes ni de que las funciones de los
productos sean equivalentes. Los comandos, permisos, precios y disponibilidad
específicos de cada plataforma son hechos volátiles: comprueba la fuente
oficial con una fecha de acceso antes de confiar en ellos.

- [ ] Usé solo texto ficticio, público o autorizado.
- [ ] Registré la superficie exacta, el nombre del modelo si era visible y la fecha de mi ejecución.
- [ ] No traté el comportamiento de una plataforma como prueba del de otra.
- [ ] No pegué secretos, mensajes privados ni archivos sin publicar.
- [ ] Me detuve cuando se ofreció una herramienta, navegación, carga, envío o publicación.
