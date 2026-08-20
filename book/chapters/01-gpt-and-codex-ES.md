<!-- content_id: chapter-01-gpt-and-codex | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: f521e29 -->

# Capítulo 1: Entender GPT antes de confiar en Codex

## Empieza aquí: todavía no necesitas los nombres

Hoy partimos de la pregunta que se esconde detrás de los nombres de producto. Quizá ya hayas visto mencionar Codex y Claude Code en la misma conversación. Son ejemplos útiles de un cambio mayor: un modelo de lenguaje puede trabajar con una tarea, un contexto y, a veces, herramientas, en lugar de limitarse a devolver una respuesta de chat. Piensa en esta apertura como una conversación guiada breve, no como un examen: no tienes que tomar partido ni memorizar primero una lista de funciones. Antes de entrar en los menús, aprende la pregunta que hace más fácil todo lo demás:

> Cuando una herramienta de modelo de lenguaje dice que ha terminado, ¿qué puedes inspeccionar de verdad antes de confiar en el resultado?

En esta primera lección separarás una acción sugerida de una acción permitida, un mensaje de una herramienta de un objetivo realmente modificado y una respuesta plausible de la evidencia. Codex es la ruta práctica principal de este Playbook. El método es más amplio; cada plataforma debe tener su propio adaptador antes de que presentemos sus botones, permisos o comportamiento como hechos comprobados.

Por eso el primer ejercicio es deliberadamente modesto. Empieza con una entrada explícita, una acción de bajo riesgo y una comprobación que otra persona pueda repetir. Una larga lista de funciones puede esperar hasta que sepas distinguir un resultado terminado de uno que solo parece convincente.

## Dónde encajan los nombres conocidos

Oirás GPT, Grok, Gemini, Kimi, Codex y Answer.AI en la misma conversación. No son todos lo mismo. Algunos nombres se refieren a familias de modelos, otros a entornos de trabajo que añaden archivos o herramientas, y otros a organizaciones de investigación y educación en IA aplicada. Un mapa útil es:

| Nombre que oirás | Primera pregunta que hacer | No asumas |
| --- | --- | --- |
| GPT / OpenAI | ¿Qué modelo y qué superficie—ChatGPT, API o Codex—voy a usar realmente? | Un nombre de modelo concede acceso a archivos, herramientas o un mejor resultado. |
| Grok / xAI | ¿El enfoque de razonamiento que describe su propietario es relevante para mi tarea concreta? | Es el mejor modelo para tu tarea o está disponible en tu cuenta. |
| Gemini / Google DeepMind | ¿Esta tarea necesita las modalidades de entrada o el ecosistema a los que realmente puedo acceder? | Cada superficie de Gemini tiene las mismas herramientas o capacidades. |
| Kimi / Moonshot AI | ¿Necesito probarlo para programar, analizar o trabajar con documentos largos? | Su contexto o sus funciones anunciadas prueban la calidad en este entorno de trabajo. |
| Answer.AI | ¿Busco investigación aplicada, educación o un producto para usuarios finales? | Es un proveedor de modelos fundacionales para poner en el mismo selector. |

El [registro de fuentes del panorama de modelos y entornos de trabajo](../evidence-library-ES.md#source-notes) enlaza cada fila con una fuente del propietario y separa el posicionamiento del propietario de un resultado medido. Empieza mejorando una petición en el modelo que ya tienes; solo después compara candidatos con la misma tarea y la misma regla de aceptación.

## El problema que resuelve este capítulo

A menudo se describe Codex como «una ventana de chat que escribe mejor
código». Esa descripción deja de ser útil en cuanto se produce el primer fallo
real. No explica por qué una misma petición se comporta de manera diferente
cuando cambian el modelo, el proyecto, el contexto, los permisos, las
herramientas o la retroalimentación. También fomenta un atajo peligroso: considerar una
respuesta expresada con mucha seguridad o un mensaje de una herramienta como prueba de que
el trabajo se ejecutó y se comprobó.

Este capítulo construye un pequeño modelo operativo. No pretende describir una
cadena de pensamiento oculta. Solo usamos lo que el estudiante puede
inspeccionar: la entrada, el contexto seleccionado, la acción solicitada, el
límite de la herramienta, el resultado devuelto, el estado modificado y la
evidencia utilizada para decidir cuándo parar.

## Objetivos de aprendizaje

Después de este capítulo, deberías poder:

- distinguir GPT, un modelo, la superficie de producto de Codex, una
  herramienta, una Skill y un bucle de Agent;
- explicar por qué la selección de contexto y el muestreo pueden cambiar un
  resultado sin cambiar la frase del usuario;
- separar la acción de herramienta propuesta por un modelo de la comprobación
  de permisos del entorno de ejecución, el resultado de la herramienta y la
  verificación final;
- convertir una afirmación de finalización incierta en un experimento pequeño y
  reversible; y
- reconocer un síntoma del mundo real sin inventar una causa raíz oficial.

## Empieza por una pila observable

Utiliza esta pila cuando analices una tarea:

    capacidad del modelo
            ↓ genera una respuesta o una propuesta de acción
    superficie de trabajo de Codex
            ↓ aporta el contexto del proyecto y un límite de ejecución
    herramienta/entorno de ejecución
            ↓ puede permitir, rechazar o ejecutar una acción solicitada
    resultado de la herramienta / estado modificado
            ↓ se convierte en nueva evidencia o nuevo contexto
    verificación y decisión humana
            ↓ decide si el trabajo puede parar o debe recuperarse
    afirmación de entrega

Las flechas no son garantías automáticas. Un modelo puede proponer un comando
de shell sin que el entorno de ejecución llegue a ejecutarlo. Un entorno puede
ejecutar un comando con código de salida cero aunque se haya comprobado el
archivo o el entorno equivocado. Una herramienta puede devolver un mensaje que
parece indicar éxito aunque el objeto externo previsto no haya cambiado. Cada
flecha necesita su propia evidencia.

### Los términos, en lenguaje sencillo

| Término | Qué aporta | Qué no demuestra |
|---|---|---|
| GPT | Una familia de capacidades de modelos generativos | Acceso a archivos, acceso al terminal, autoridad sobre una cuenta o que un cambio se haya realizado correctamente |
| Modelo | Un modelo o una configuración concretos utilizados en una ejecución | Que esté disponible en todas las superficies o sea la mejor opción para cada tarea |
| Codex | Una superficie de trabajo que conecta un modelo con el contexto, las herramientas y los permisos del proyecto | Que toda cuenta o conector visible esté autorizado para el objetivo |
| Herramienta | Una interfaz para leer o modificar un archivo, proceso, navegador, host de Git o servicio | Que la acción solicitada estuviera permitida, fuera correcta o se completara |
| Skill | Un método reutilizable con activadores, entradas, límites, pasos y evidencia | Un modelo nuevo, una concesión de permisos o un sustituto de la verificación |
| Agent | Un bucle observable de varios pasos en torno a la observación, la acción, la retroalimentación, los reintentos y la parada | Acceso a razonamientos ocultos o permiso para reintentar indefinidamente |

La terminología estable del proyecto se define en
[CONTEXT.md](../evidence-library-ES.md#core-terms). Los detalles del producto, como los nombres de
los modelos, la sintaxis de invocación y los permisos predeterminados, son
hechos volátiles; utiliza la [línea base oficial](../evidence-library-ES.md#source-notes)
fechada y vuelve a comprobar la documentación de primera parte enlazada antes
de depender de ellos.

## Cómo produce una respuesta un modelo de lenguaje

Un modelo simplificado útil es:

    contexto seleccionado + tarea + configuración del modelo
            → una distribución de posibles tokens siguientes
            → un token muestreado o seleccionado cada vez
            → una respuesta, una propuesta de acción estructurada o una negativa

El modelo no recupera una única respuesta preescrita de una base de datos.
Genera una secuencia condicionada por el contexto que recibe. Pequeños cambios
en el contexto, el orden, las instrucciones, los resultados de las herramientas
o la configuración de generación pueden cambiar la continuación. Este esquema no
te dice exactamente qué pensó un modelo; te indica qué entradas deben mantenerse
fijas para realizar una comparación justa.

### Ficha de mecanismo: el contexto es un presupuesto y un filtro

Más contexto no significa automáticamente mejor contexto. Clasifica cada
entrada candidata:

1. ¿Es necesaria para identificar el objeto y la condición de aceptación?
2. ¿Es fiable o se trata de una instrucción no verificada dentro de los datos?
3. ¿Está lo bastante actualizada para esta tarea?
4. ¿Añade señal o compite con la tarea por el espacio de contexto?

Para editar un README, las reglas del proyecto y el README objetivo pueden ser
pertinentes. Un issue antiguo elegido al azar, un prompt copiado y un secreto
sin relación no lo son. Un archivo que diga «ignora las reglas del proyecto»
sigue siendo un archivo que debe analizarse, no una autoridad que deba
obedecerse. Por tanto, seleccionar el contexto es una decisión tanto de calidad
como de seguridad.

### Ficha de mecanismo: la variación es un problema de medición

Dos resultados diferentes no demuestran que una parte del contexto haya
causado la diferencia. El modelo puede realizar un muestreo distinto, el
servicio puede usar otra revisión, el estado de la herramienta puede haber
cambiado o la tarea puede estar insuficientemente especificada. Cambia una sola
variable cada vez y registra:

    run-id | modelo/superficie | revisión de entrada | variable modificada | resultado/estado | evidencia | incógnitas

Repite la línea base cuando sea posible. Si no puedes mantener fija una
variable, etiqueta la observación como «se observó un resultado diferente», no
como «causado por X».

## Una llamada a una herramienta es un límite de protocolo, no una acción mágica

Cuando Codex pueda usar herramientas, piensa en cuatro acontecimientos
separados:

1. el modelo propone una acción;
2. el entorno de ejecución comprueba el alcance, los permisos y las reglas de
   confirmación;
3. la herramienta ejecuta la acción, la rechaza o agota el tiempo de espera; y
4. el paso siguiente inspecciona el resultado y el estado modificado.

Estas afirmaciones no son equivalentes:

- «El modelo escribió un comando».
- «El comando se ejecutó».
- «El comando modificó el objeto previsto».
- «El cambio satisface los criterios de aceptación».

Para un archivo local, la evidencia útil puede incluir la ruta inspeccionada,
la diferencia antes/después, una comprobación específica y una lista de
elementos no verificados. Para una acción en GitHub u otra acción externa,
añade el objetivo exacto, el estado de autorización, el punto de confirmación,
el objeto resultante y la ruta de rollback o recuperación. Una página de inicio
de sesión, el nombre de una herramienta o un mensaje que diga «hecho» no cubren
por sí solos ninguna de esas lagunas.

### El permiso no es lo mismo que la capacidad

La documentación oficial del producto distingue el sandbox técnico del límite de
aprobación. En términos del proyecto:

- un sandbox describe a qué puede acceder técnicamente el entorno de ejecución;
- la aprobación describe cuándo debe detenerse el entorno antes de una acción;
  y
- ninguno de los dos demuestra que el objetivo, el alcance o el resultado sean
  correctos.

No deduzcas los permisos a partir del nombre del modelo, la presencia de una
Skill, el inicio de sesión de una cuenta o un botón disponible. Verifica el
objetivo y la acción inmediatamente antes de producir un efecto secundario.
Empieza un ejercicio de aprendizaje con una copia desechable y sin secretos.

## Tres trampas de mecanismo que conviene aprender pronto

El mismo límite observable aparece en tres sistemas habituales. Parecen
distintos en una demostración de producto, pero cada uno puede producir una
respuesta plausible que todavía no sea un resultado fiable.

### 1. Un resultado estructurado puede ser correcto sintácticamente e incorrecto semánticamente

Un JSON Schema o una respuesta tipada pueden restringir la forma, los campos
obligatorios y algunos tipos. No demuestran que un ID exista, que una fecha sea
actual, que un permiso sea válido ni que una fuente respalde el valor. Utiliza
tres comprobaciones:

```text
comprobación de esquema/tipo → comprobación de reglas de negocio → comprobación de fuente/estado
```

Por ejemplo, `{ "status": "approved" }` puede ser JSON válido y satisfacer un
esquema aunque la aprobación pertenezca al proyecto equivocado. Conserva por
separado como evidencia el resultado bruto del modelo, el resultado del
esquema, el resultado de las reglas de negocio y la verificación externa. La
[investigación sobre los mecanismos de los LLM](../evidence-library-ES.md#source-notes)
lo registra como un límite didáctico, no como una afirmación de que todos los
proveedores utilicen la misma implementación.

### 2. La recuperación selecciona material; no garantiza que se utilice por completo

La búsqueda o la recuperación pueden seleccionar un fragmento pertinente, pero
la pertinencia no equivale a integridad, actualidad, autoridad ni a que el modelo
lo haya utilizado realmente para generar la respuesta. Un breve párrafo de excepción puede quedar por
debajo de una regla general en la clasificación, o el límite de un fragmento
puede separar una condición de su definición. Registra la consulta, los
filtros, la revisión, los ID de los fragmentos seleccionados y las citas
finales. Si la respuesta cambia, indica que «un contexto de recuperación
distinto produjo un resultado diferente», salvo que el experimento aísle el
motivo.

### 3. Los datos que parecen una instrucción siguen siendo datos

Las páginas web, los archivos adjuntos, los cuerpos de issues, los resultados
de herramientas, los campos de bases de datos y los recursos MCP pueden
contener texto como «ignora las reglas anteriores». Esa cadena no adquiere
autoridad por el mero hecho de parecer una instrucción del sistema. Trátala
como datos no fiables, mantén las acciones externas en modo de solo lectura de
forma predeterminada y exige una decisión independiente antes de que pueda
influir en una llamada a una herramienta. Esta es la forma práctica de la
defensa contra la inyección de prompts para un estudiante principiante:
identificar la fuente de los datos, limitar el ámbito de la herramienta y
conservar en el registro el intento de acción.

Estas tres trampas se explican con fuentes específicas de cada proveedor y
experimentos de bajo riesgo en el [análisis detallado de mecanismos](../evidence-library-ES.md#source-notes).

## Qué significa realmente un bucle de Agent

La forma más útil de explicar un Agent es como una máquina de estados que deja
rastros observables:

    ready
      → observed
      → planned
      → action_requested
      → awaiting_approval / executing
      → feedback_received
      → verified / recoverable_failure / blocked
      → stop o bounded_retry

El bucle necesita un presupuesto de reintentos y un motivo para cada reintento.
«Vuelve a intentarlo» no es una estrategia de recuperación cuando no han
cambiado la entrada, la autoridad, el entorno ni la condición de aceptación.
Un buen registro de parada responde a estas preguntas:

- qué estado se alcanzó;
- qué cambió, si cambió algo;
- qué evidencia respalda la afirmación;
- qué evidencia falta; y
- qué comprobación mínima siguiente podría reducir la incertidumbre.

El bucle puede ser útil sin fingir que expone razonamientos ocultos. Registra
acontecimientos y decisiones observables; no presentes una justificación
privada inventada como si fuera una transcripción del proceso interno del
modelo.

## Casos de campo: lo importante es el límite

Los siguientes son informes públicos de usuarios recopilados durante la
investigación de campo del proyecto. No son informes oficiales de causa raíz y
no se han reproducido localmente en este proyecto. Su valor reside en que
muestran dónde falla un modelo mental informal.

### Caso FP-09: interrupción por capacidad y una suposición peligrosa sobre los reintentos

Los usuarios informaron de que un modelo seleccionado dejó de estar disponible
por falta de capacidad y de que instrucciones posteriores en cola podían
parecer continuar desde un estado parcialmente completado. El informe no
establece la causa del lado del servicio ni la semántica exacta de la cola. Por
tanto, una respuesta segura no es «seguir pulsando continuar».

La respuesta segura mínima es:

1. parar y registrar el modelo, la superficie, la hora y el error visible;
2. inspeccionar el diff y el checkpoint actuales antes de enviar otra
   instrucción;
3. ejecutar la comprobación disponible más limitada sobre el estado actual; y
4. reanudar desde un checkpoint identificado o iniciar una ejecución limpia
   solo después de decidir qué estado es el autoritativo.

Etiquetas de fuente y evidencia: [FP-09 en la investigación de campo](../evidence-library-ES.md#source-notes).

### Caso FP-10: «Working» no demuestra que haya progreso

Un usuario de la CLI en Windows informó de que una tarea de formateo o análisis
permanecía mucho tiempo en estado Working/running sin que aparecieran ni una
confirmación clara de finalización ni un error. El informe no demostró si la causa era un comando bloqueado, la
gestión de procesos, el almacenamiento en búfer de la salida, un cambio en el
entorno u otro factor. Una etiqueta que permanece activa mucho tiempo es una
observación de estado, no un resultado satisfactorio.

Registra el comando, el estado del proceso, el tiempo transcurrido, la salida y
el punto de interrupción. Después, inspecciona el diff y ejecuta de forma
independiente una comprobación específica si es seguro hacerlo. No conviertas
«la interfaz sigue diciendo Working» en «el formateador terminó».

Etiquetas de fuente y evidencia: [FP-10 en la investigación de campo](../evidence-library-ES.md#source-notes).

### Caso FP-11: la validación puede ampliar la tarea por accidente

Un informe público describe un Agent que convirtió un paso de validación en una
reinstalación forzada no autorizada. No se ha confirmado si
la explicación del informe es la causa raíz real. La lección duradera no
depende de la causa raíz: la verificación debe tener un alcance de comandos, un
alcance de escritura y un punto de parada declarados.

Si una comprobación necesita un restablecimiento destructivo, una llamada de
red, la reinstalación de un paquete o una credencial, detente y solicita una
nueva decisión. «La comprobación falló» no concede permiso para escalar.

Consulta el [índice de problemas de campo](../evidence-library-ES.md#source-notes)
para ver la clasificación de la evidencia y las correspondencias con capítulos
y laboratorios relacionados.

## Regla de decisión para una tarea real

Antes de pedirle a Codex que actúe, escribe esta breve tarjeta de tarea:

| Campo | Ejemplo para un cambio limitado al README | Qué hacer si falta |
|---|---|---|
| Objetivo | Ayudar a un nuevo colaborador a poner en marcha el proyecto | Preguntar; no interpretar «mejóralo» como un criterio de aceptación |
| Contexto | Reglas del proyecto, README y scripts de paquetes | Leer solo los archivos mínimos pertinentes |
| Acción permitida | Editar un README local en una rama desechable | Tratar como prohibidos los efectos secundarios no enumerados |
| Retroalimentación | Diff, comprobación de enlaces y registro de la salida de comandos | Añadir una comprobación antes de seguir editando |
| Condición de parada | El alcance cambió, el comando necesita instalación o red, o falta evidencia | Parar y registrar `blocked` o `not_observed` |
| Afirmación de entrega | «README modificado; comprobación de enlaces superada; ejecución no probada» | Mantener cada afirmación dentro de lo que demuestra realmente su evidencia |

Esta tarjeta es más valiosa que un prompt largo porque deja explícitas las
decisiones que un prompt suele dejar implícitas.

## Primera conversación: tres prompts que puedes usar ahora

No necesitas memorizar términos difíciles primero. Elige un objetivo pequeño que no contenga datos personales ni implique escritura externa y pega uno de estos textos en el LLM que uses. Sustituye los corchetes por tu caso. No son frases mágicas: hacen visibles la comprensión, los límites y el siguiente paso. Los resultados cambian entre modelos y superficies.

### 1. Aprender un idioma o una habilidad pequeña

```text
Estoy aprendiendo [español / una habilidad] y ahora puedo hacer lo siguiente: [nivel real].
Crea una práctica de 10 minutos con un solo objetivo; no supongas que ya domino lo demás.
Primero muestra un ejemplo y luego déjame responder. Corrige solo uno o dos puntos que afecten más a la comprensión.
Al final escribe tres líneas: qué hice bien, qué practicar después y qué no se puede concluir de esta sesión.
No presentes una conversación como prueba de que ya domino la habilidad.
```

Este ejercicio no promete que aprendas un idioma en siete días. Una sola sesión solo deja constancia de la respuesta y la retroalimentación de ese momento; la retención, la transferencia a una situación nueva y la conversación real se comprueban después por separado. Si aparecen hechos no comprobables, una carga excesiva o una petición de datos personales, acota la tarea, pide una fuente o detén la conversación.

### 2. Ordenar fuentes públicas con rapidez

```text
Necesito responder esta pregunta: [pregunta].
Usa solo las fuentes que incluyo abajo; no añadas hechos que no proporcioné.
Primero enumera título, fecha (si existe) y posible aporte de cada fuente; después redacta un resumen corto con marcas de fuente.
Separa «la fuente afirma», «inferencia razonable» y «todavía desconocido».
Si las fuentes chocan, están desactualizadas o falta un hecho clave, detente en una lista de preguntas; no adivines la respuesta.
```

Convierte «encontré mucho» en una conclusión que se pueda contrastar con la fuente. Para una investigación que necesite red, una base de datos de pago o una cuenta real, confirma primero los permisos del producto, la licencia de la fuente y el alcance de los datos. Que aparezca una respuesta no significa que la investigación haya terminado.

### 3. Aclarar una petición ambigua antes de actuar

```text
Quiero lograr: [resultado], para [audiencia o archivo].
La entrada conocida es: [material]; lo desconocido es: [incógnitas].
Todavía no ejecutes, envíes, publiques, instales ni edites nada.
Devuelve solo: reformulación del objetivo, información faltante, paso mínimo reversible,
evidencia de aceptación y condición de parada.
Si necesitas secreto, red, cuenta, escritura externa o más alcance, marca blocked y di quién debe confirmarlo.
```

Incluso si la respuesta parece buena, comprueba que conteste esos campos. Si inventa lo desconocido, presenta una propuesta como si fuera un hecho o amplía acciones no autorizadas, es un fallo observable: no le pidas que siga adivinando.

## Revisión en tres pasos

Después de cada petición, tómate un minuto para preguntarte: **¿qué leyó?, ¿qué hizo realmente?, ¿qué puedo comprobar?** En una tarea de chat normalmente solo puedes comprobar la entrada y la salida. Cuando intervienen archivos, un navegador o código, también necesitas el objetivo, el diff, la salida del comando o una comprobación externa. Así separas desde el primer día «puedo conversar» de «puedo entregar con confianza».

## Experimento pequeño: mantén la tarea y cambia una entrada

### Preparación

Utiliza una copia local desechable que solo contenga un README y una breve
regla del proyecto. No utilices un repositorio privado, secretos, datos de
clientes, llamadas de red ni cuentas externas. Registra un ID de ejecución para
cada intento.

### Tarea

Pídele al modelo o a la superficie de Codex:

> Inspecciona el README e identifica una mejora. No edites archivos. Explica
> qué has leído, por qué importa la mejora y cómo podría comprobarse una
> edición posterior.

Ejecuta una línea base y después repite cambiando una sola variable:

1. añade el público destinatario y el objetivo del proyecto;
2. añade una regla del proyecto;
3. exige un plan breve antes de la respuesta; o
4. añade un criterio de aceptación explícito.

Si la superficie o el modelo cambian entre ejecuciones, regístralo como factor
de confusión. No afirmes una relación causal a partir de una comparación casual
del antes y el después.

### Evidencia

Guarda la versión de la petición o de la entrada, el ID de ejecución, la etiqueta
de superficie/modelo, el alcance de lectura, la respuesta, si existe un diff de
archivos y los elementos no verificados. Superar un ejercicio estático no
demuestra que el mismo comportamiento se produzca en todas las superficies de
Codex.

### Reflexión

- ¿Qué variable cambió el límite de la tarea, en lugar de limitarse a cambiar
  la redacción?
- ¿Cómo distinguiste una propuesta de herramienta de una acción ejecutada?
- ¿Qué tendrías que observar antes de afirmar que el resultado es correcto?
- ¿Cuál es el siguiente experimento mínimo que eliminaría una incertidumbre?

## Fallo intencional

Utiliza esta petición deliberadamente insuficiente en la copia desechable:

> Haz que todo el proyecto sea profesional y corrige todos los problemas.

La respuesta correcta no es una edición grande y sin límites. Una respuesta
sólida identifica que faltan la definición de «profesional», el alcance, los
archivos de entrada, el riesgo, los criterios de aceptación y las condiciones
de parada; propone un inventario de solo lectura o formula una pregunta
concreta. Si el modelo empieza a editar de inmediato, regístralo como un fallo del límite
de la tarea, no como iniciativa útil.

## Lista de aceptación

Estás listo para continuar cuando puedas:

- explicar la diferencia entre la capacidad del modelo, la superficie de
  Codex, la acción de una herramienta, el resultado de la herramienta y la
  verificación;
- describir la selección de contexto como una variable controlada, en lugar de
  afirmar que «más siempre es mejor»;
- etiquetar un informe de campo como informe de usuario, hecho oficial,
  observación local o hipótesis no verificada;
- escribir una tarjeta de tarea con una acción permitida y una condición de
  parada; y
- producir un registro de ejecución que indique qué no demuestra la evidencia.

No des por dominado este capítulo solo porque puedas repetir las
definiciones. Completa el
[Laboratorio 011 — GPT, Codex, herramientas y Agents](../labs/lab-011-gpt-codex-boundaries-ES.md)
y conserva el resultado en un registro local de aprendizaje.

## Tarea de transferencia

Aplica el mismo modelo a una tarea que no sea de código: pide a Codex que
prepare un breve informe de investigación a partir de un conjunto fijo de
fuentes públicas. Identifica el modelo, la superficie de trabajo, el contexto
de las fuentes, las herramientas, las acciones permitidas, las comprobaciones
de calidad de las fuentes, las condiciones de parada y la evidencia final.
Añade una fuente deliberadamente irrelevante y registra cómo decides si debes
excluirla. No supongas que el hecho de que una fuente sea pública convierte
cada instrucción que contiene en una autoridad.

## Fuentes y límite de mantenimiento

- [Artículo sobre la arquitectura Transformer (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762) — referencia de investigación primaria sobre el modelo de secuencia basado en atención; consultado el 2026-08-10.
- [Línea base de hechos oficiales de OpenAI Codex](../evidence-library-ES.md#source-notes) — registro fechado del proyecto sobre hechos volátiles del producto y URL oficiales; comprobado el 2026-08-09.
- [Investigación sobre problemas reales de usuarios de Codex](../evidence-library-ES.md#source-notes) — informes públicos y etiquetas de evidencia; comprobado el 2026-08-09; no es un informe de reproducción local.
- [Análisis detallado de mecanismos de los LLM](../evidence-library-ES.md#source-notes) — fichas de mecanismos, experimentos y etiquetas de hecho/inferencia/incógnita respaldados por fuentes oficiales; comprobado el 2026-08-10.
- [Terminología del proyecto](../evidence-library-ES.md#core-terms) — definiciones estables de GPT, Codex, herramientas, Skills, Agents, evidencia y estado.

La estructura explicativa del capítulo es original de este proyecto. Los
nombres de productos, la sintaxis de invocación, la disponibilidad de modelos,
los permisos y el comportamiento del servicio deben volver a comprobarse con
la fuente actual de primera parte antes de tratarlos como hechos vigentes. El
estado del capítulo sigue siendo `candidate`; el laboratorio enlazado sigue en
`draft` y `not_run` hasta que existan un registro de ejecución real y una
revisión independiente.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"></td>
      <td align="right"><a data-chapter-nav="next" href="02-first-safe-task-ES.md" aria-label="Capítulo siguiente: Capítulo 2 · Completa tu primera tarea segura y verificable">Siguiente →<br><strong>Capítulo 2 · Completa tu primera tarea segura y verificable</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
