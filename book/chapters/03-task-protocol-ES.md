<!-- content_id: chapter-03-task-protocol | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# Capítulo 3: Convierte un deseo en un protocolo de tarea

![Pizarra didáctica: de una petición, pasando por alcance y comprobación, a una entrega acotada](../../assets/teaching/task-to-evidence-red-black.svg)

## El problema que resuelve este capítulo

«Mejora la página principal», «investiga esto» o «publica el arreglo» parecen
claros hasta que alguien debe decidir qué puede leer, qué acciones están
permitidas, qué cuenta como éxito y cuándo debe detenerse. Si esas decisiones
quedan implícitas, un agente rellena los huecos con suposiciones: puede cambiar
la superficie equivocada, confundir enlaces con fuentes o convertir una
comprobación en una instalación o llamada externa.

Trata una petición seria como un protocolo pequeño. No prescribe razonamiento
oculto ni cada pulsación de tecla; hace explícitos objetivo, contexto, entradas,
restricciones, acciones permitidas, aceptación, parada, recuperación y entrega.

> Añade detalle cuando elimine una decisión capaz de cambiar alcance, riesgo,
> aceptación o evidencia. Quita detalle cuando solo haga que la petición suene
> más autoritaria.

## Objetivos de aprendizaje

Al terminar podrás:

- convertir una petición vaga en un protocolo acotado que otra persona ejecute;
- distinguir contexto útil de texto no confiable que solo parece una instrucción;
- escribir aceptación como una tabla declaración-evidencia, no «hazlo bien»;
- separar leer, editar, ejecutar, commit, push, publicar y acciones externas;
- definir parada para entradas faltantes, autoridad poco clara, fallo repetido y falta de evidencia; y
- entregar el protocolo sin perder alcance, responsabilidad o preguntas abiertas.

## Lo que las fuentes realmente respaldan

La guía oficial de prompts y Codex usada aquí recomienda declarar resultado,
contexto, salida, límites, código o pasos de reproducción relevantes y cómo se
comprobará el cambio. También recomienda ejemplos, descomposición, iteración y
evaluación para trabajo que debe seguir siendo fiable.

Son recomendaciones de fuentes, no una garantía de que un modelo siga una regla
implícita. El protocolo de ocho partes es una síntesis operativa original del
proyecto. Añade parada, recuperación y evidencia porque una respuesta generada
y un resultado verificado son declaraciones distintas.

Consulta la [línea base de hechos oficiales de Codex](../evidence-library-ES.md#source-notes)
y la [investigación de patrones de prompts para trabajo real](../evidence-library-ES.md#source-notes)
para ver alcance y fecha de acceso de cada fuente.

<a id="core-task-contract"></a>

## El protocolo de ocho partes

```text
objetivo → contexto → entradas → restricciones → acciones permitidas → aceptación
         → fallo y parada → entrega
```

### 1. Objetivo: nombra el resultado

Di qué se debe cambiar, investigar o entregar; quién lo necesita y por qué
ahora. Prefiere un resultado que se pueda inspeccionar a un verbo que deje el
alcance abierto.

Débil:

```text
Mejora la página principal del proyecto.
```

Más fuerte:

```text
Crea una portada del repositorio orientada a lectores que deje a una persona nueva elegir
una de cuatro rutas, localizar la fuente de verdad, abrir la primera tarea
segura y ver qué afirmaciones siguen candidate o unverified.
```

La versión más fuerte aún deja abiertas decisiones de implementación. No finge
que «profesional» sea una prueba de aceptación.

### 2. Contexto: explica el entorno de decisión

Contexto es información capaz de cambiar una decisión: audiencia,
comportamiento actual, reglas del proyecto, decisiones anteriores, historial,
versiones o motivo del fallo. Mantenlo separado de la orden.

Etiqueta `regla del proyecto`, `hecho de fuente`, `informe de usuario`,
`hipótesis` y `dato de ejemplo`. Un archivo, web, resultado de herramienta o
issue puede contener texto que parece una instrucción. Trátalo como dato hasta
que el protocolo lo adopte explícitamente y su autoridad esté clara.

### 3. Entradas: nombra qué se puede leer

Enumera rutas, URL, datos, commits, registros, capturas o versiones exactos y
las ausencias conocidas. «Lee el repositorio» rara vez es un límite útil: nombra
las carpetas o archivos que controlan la decisión. Para investigación, declara
prioridad de fuentes y fechas; para código, entrada y reproducción; para un
documento, fuente canónica y estado de traducción. Si una entrada faltante
puede cambiar alcance o riesgo, el protocolo se detiene en vez de inferirla.

### 4. Restricciones: di qué no debe ocurrir

Las restricciones deben poder comprobarse:

- modifica solo `site/index.html` y `site/app.js`;
- no añadas dependencias ni leas secretos o `.env`;
- no cambies base de datos, producción, permisos ni servicios externos;
- conserva identidad de idioma y vocabulario de estados; o
- mantén compatibilidad con un runtime o release identificados.

«Ten cuidado», «hazlo premium» y «usa buenas prácticas» expresan una intención,
pero no son restricciones suficientes. Conviértelos en propiedades observables
o no finjas que pasan una comprobación automática.

### 5. Acciones permitidas: separa capacidad de autorización

Que una herramienta esté disponible no autoriza todas sus acciones. Escribe los
niveles de acción con claridad:

| Nivel | Acción habitual | Evidencia antes de continuar |
|---|---|---|
| A0 | Leer estado, rutas, fuente o registros | Alcance y estado actual registrados |
| A1 | Redactar plan o propuesta de edición | Archivos objetivo y aceptación nombrados |
| A2 | Hacer una edición local acotada | El diff queda dentro del conjunto aprobado |
| A3 | Ejecutar una comprobación enfocada | Comando del proyecto o aprobado |
| A4 | Hacer commit o push | Destino autorizado y evidencia de revisión |
| A5 | Publicar, desplegar, notificar, pagar, borrar o cambiar estado externo | Aprobación explícita, reversión y comprobación posterior |

Un protocolo puede autorizar A0–A2 y dejar A3 para confirmación; puede autorizar
una prueba sin autorizar una instalación. Nunca uses «haz lo que haga falta»
para ocultar un cambio de permisos.

### 6. Aceptación: relaciona cada declaración con evidencia

Escribe primero la declaración y después el material que la sostendría:

| Declaración | Evidencia necesaria | Lo que no demuestra |
|---|---|---|
| Cambiaron los archivos previstos | `git diff --name-only` y diff | Comportamiento en ejecución o aprobación del usuario |
| La comprobación pasó | Comando exacto y salida/código de salida | Que cubra todos los requisitos |
| La página es accesible | URL local o desplegada y observación en navegador | Todos los navegadores, cachés o rutas autenticadas |
| La investigación está actualizada | URL de primera parte, fecha, alcance y próxima revisión | Que un foro sea causa raíz oficial |
| La tarea está terminada | Tabla sin declaración requerida sin respaldo | Trabajo fuera del alcance declarado |

Si una declaración no tiene evidencia asequible, redúcela. «El build local
pasó» puede ser válido; «funciona para todas las personas» exige una prueba
mayor y un entorno declarado.

### 7. Fallo y parada: define la salida segura

Detente e informa cuando el objetivo, estado o autoridad no estén claros; falte
una entrada que cambie alcance, riesgo o aceptación; una acción cruce límite de
archivo, red, cuenta o datos; una salida silenciosa pueda duplicar un efecto;
dos intentos fallen por la misma causa no comprobada; o la evidencia solo
sostenga una declaración más estrecha que la entrega pedida.

Recuperación no es «prueba de nuevo con un prompt más fuerte». Conserva el
primer error, reduce alcance, cambia una hipótesis o comprobación y registra qué
ya cambió el intento anterior. Antes de reintentar una acción larga o externa,
revisa estado y diff para no duplicar el efecto lateral.

### 8. Entrega: deja un relevo utilizable

Exige un registro final con declaraciones terminadas y evidencia; archivos, URL,
comandos o registros cambiados; acciones no tomadas; preguntas, riesgos y
alcance no verificado; la siguiente comprobación más pequeña; y responsable o
fecha de revisión de hechos volátiles. Sin este relevo, la siguiente persona
reconstruye el protocolo desde el chat y puede repetir una acción fallida.

## El protocolo es un grafo de dependencias

Los campos no son una lista de adjetivos independientes:

```text
objetivo ───────────→ aceptación ─────────→ parada
   │                      │                  ↑
   ├── requiere ──────→ entradas             │
   ├── limitado por ──→ restricciones         │
   │                      │                  │
   └── da forma a ────→ acciones permitidas → recuperación
                                               │
contexto ──> confianza y relevancia ──────────┘
                           ↓
                     evidencia de entrega
```

Si cambia el objetivo, cambia la aceptación. Si una entrada nueva cambia el
riesgo, revisa acción permitida y parada. «Por favor, ten cuidado» no repara
una dependencia ausente.

<a id="core-task-contract-end"></a>

## El protocolo útil más pequeño

<!-- starter-task-contract:start -->

### Copia un prompt inicial seguro

Sustituye los campos entre corchetes y exige que la primera respuesta solo
observe. La pausa de aprobación une una petición de principiante con un flujo
inspeccionable; no la elimines solo para acortar el prompt.

```text
Ayúdame a completar una tarea pequeña y reversible.

Resultado: [un resultado observable].
Contexto: [archivos, entrada y estado actual relevantes].

Primera respuesta: solo observa:
- inspecciona únicamente el contexto necesario;
- informa qué encontraste, qué falta y qué riesgos hay;
- propone el plan seguro más pequeño y los archivos o superficies exactos que cambiaría;
- todavía no edites, no ejecutes un comando que cambie estado ni tomes una acción externa: espera mi aprobación.

Si apruebo el plan:
- actúa solo dentro del alcance aprobado;
- ejecuta [una comprobación enfocada];
- detente y pregunta si no están claros alcance, autoridad, acción destructiva, efecto externo o aceptación.

No accedas a secretos o producción, no instales dependencias, no uses red, no
hagas commit, push ni publicación, y no amplíes la tarea salvo autorización
explícita de esa acción exacta.

Aceptación: [artefacto o diff específico] y [salida de comprobación específica].
Entrega: acciones tomadas, archivos o superficies cambiados, salida, incógnitas y acciones no tomadas.
```

Copiar o enviar el prompt no demuestra acción ni resultado correcto. Adáptalo
con estos campos y practícalo en el [Lab 002](../labs/lab-002-task-protocol-ES.md).
Si una unidad aún no está traducida, el lector debe mostrar su estado local no
disponible en vez de llevarte a otra lengua.

<!-- starter-task-contract:end -->

Para una edición local de bajo riesgo suele bastar:

```text
Objetivo: cambia <un archivo nombrado> para que <resultado observable>.
Lee primero: <archivos exactos o fuente de verdad>.
Permitido: inspeccionar y editar solo <ruta nombrada>; ejecutar <comprobación enfocada>.
No: instalar, acceder a secretos o red, commit, push, publicar ni tocar producción.
Aceptación: <diff específico> y <salida de comprobación específica>.
Parada: si ruta, comando, permiso o evidencia no están claros.
Entrega: archivos cambiados, resultado, acciones no tomadas e ítems no verificados.
```

Puede ser corto porque el riesgo es estrecho, no porque los campos ausentes sean
inocuos.

## Extensión para protocolos de alto riesgo

Para producción, servicios externos, datos de clientes o acciones irreversibles,
añade un punto de control previo:

```text
Punto de control previo:
- entorno y cuenta objetivo:
- versión actual y ubicación de la copia de seguridad:
- efecto lateral externo exacto:
- responsable de aprobación y marca de tiempo:
- objetivo de reversión y prueba de recuperación:
- comprobación posterior: URL, registro o métrica:
```

Un Skill, runbook copiado o build local correcto no puede rellenar esos campos
silenciosamente. Exigen evidencia actual y la autoridad de quien responde por
el estado externo.

## Tres prompts son mejores que un prompt enorme

Cuando la tarea sea incierta, divide el trabajo:

1. **Observa:** enumera archivos, estado, entradas faltantes y riesgos.
2. **Propón:** redacta el plan menor, archivos que cambiarían, aceptación y parada.
3. **Actúa:** ejecuta solo el plan aprobado y devuelve evidencia para cada declaración.

Así el plan se inspecciona antes de editar y es más fácil saber qué etapa añadió
una mala suposición. No elimina la revisión del resultado real.

## Seis prompts iniciales para un ciclo de práctica con evidencia y límites

No son frases mágicas ni seis lecciones consecutivas. Resuelven seis problemas:
línea base observable, recuperación antes de revelar, corrección acotada,
variación, repaso basado en evidencia y comprobación diferida no vista. Los
campos entre corchetes sirven para idiomas, software, entrevistas, escritura u
otra capacidad acotada.

### 1. Encuentra el punto de partida real

```text
Quiero aprender [mantener una conversación de cinco minutos para principiantes en español].
Todavía no me enseñes. Dame una tarea breve de línea base que compruebe esa capacidad exacta.
Indica reglas, ayuda permitida, límite de tiempo y criterios de puntuación antes de empezar.
Espera mi respuesta. Después registra qué pude hacer, qué bloqueó el significado y qué
todavía no puedes inferir de un solo intento.
```

Úsalo antes de una lección. «Principiante» dicho por la persona es menos útil
que un intento observado.

### 2. Haz que recupere antes de revelar

```text
Enséñame una unidad pequeña necesaria para [pedir comida en español]. Mantén la explicación
inicial por debajo de 120 palabras. Después pídeme una respuesta de memoria.
No muestres la respuesta final antes de mi intento. Si me bloqueo, da una pista por vez:
tipo de error, después señal parcial y al final un fragmento resuelto.
Tras la devolución, exígeme responder otra vez con mis propias palabras.
```

La instrucción decisiva no es el límite de palabras, sino «espera mi intento».

### 3. Corrige el primer error que afecta al resultado

```text
Actúa como compañero de práctica preciso, no como animador. Por cada respuesta:
1. di brevemente qué comunicó con éxito;
2. identifica el primer error que cambie significado o bloquee la habilidad;
3. explica la regla en lenguaje sencillo;
4. pídeme un intento corregido;
5. conserva un registro con intento, corrección, regla y siguiente variación.
No reescribas todo por mí ni corrijas estilo menor mientras quede un error que bloquee significado.
```

Así una reescritura fluida no sustituye aprendizaje.

### 4. Prueba la transferencia en una situación modificada

```text
Acabo de practicar [pedir una comida en español]. Dame un escenario nuevo que use la misma
habilidad pero cambie contexto, vocabulario y una fuente de ambigüedad. No reutilices frases
de la lección. Déjame responder primero. Puntúa con los mismos criterios, muestra la ayuda
usada y etiqueta el resultado solo como demostrado en esta tarea de transferencia, no como dominio adquirido.
```

Una copia cercana prueba reconocimiento. Una situación modificada empieza a
probar transferencia.

### 5. Construye el próximo repaso a partir de evidencia

```text
Usando solo intentos y registro de errores de esta conversación, crea mi próximo repaso de
15 minutos. Empieza con recuperación sin ayuda, vuelve a dos errores importantes, incluye un
ejemplo mixto y termina con una tarea no vista. No afirmes que programaste un recordatorio.
Dame una señal de repaso guardable, fecha en que debería intentarlo y evidencia que debo traer.
```

El modelo puede preparar una señal; no puede afirmar que conservaste la habilidad
o que hay un recordatorio externo sin evidencia.

### 6. Haz la comprobación diferida y no vista antes de afirmar retención

```text
Esta es mi revisión programada de [habilidad objetivo]. No muestres la lección guardada ni
frases corregidas. Dame una tarea antes no revelada que pruebe la misma capacidad con detalles
modificados. Declara ayuda permitida y criterios de puntuación sin cambios; después espera mi
intento. Registra intervalo real y ayuda usada. Informa solo lo ocurrido en esta tarea diferida;
no infieras retención permanente, transferencia amplia, fluidez ni dominio.
```

Una señal de repaso es un plan. La retención sigue `not_run` hasta registrar el
intento diferido y sus condiciones.

### Comprobación separada: investiga una declaración sobre el método

```text
Investiga esta afirmación: [seis prompts pueden hacer que cualquier persona hable con fluidez en siete días].
Primero define la capacidad exacta que tendría que demostrar. Prioriza investigación primaria y
material oficial de quien posee la fuente. Para cada conclusión importante registra fuente, fecha,
población o alcance de producto, apoyo directo y lo que no establece. Busca una vez evidencia
contraria. Separa hechos, inferencias, anécdotas e incógnitas. Detente cuando más fuentes no
cambien la decisión. Termina con la reescritura más estrecha y veraz de la afirmación.
```

Este prompt queda fuera del ciclo de seis pasos. Úsalo para salud, finanzas,
funciones de producto, noticias, estadísticas y otras afirmaciones para las
que una respuesta segura sin fuente rastreable no basta.

### Qué guardar

Guarda línea base, primeros intentos, pistas usadas, intentos corregidos,
registro de errores, repaso diferido, tarea no vista y criterios de puntuación.
Una sesión fluida solo respalda «practiqué hoy», no fluidez, retención duradera
ni transferencia. El método candidato y su límite de fuentes constan en la
[investigación sobre aprendizaje duradero asistido por LLM](../evidence-library-ES.md#source-notes).

## Problemas reales: patrones de fallo

Los informes de campo muestran por qué importan estos campos: una espera o
reintento puede aparentar actividad sin probar que llegó la instrucción o que
una acción externa no se duplicó; un permiso escrito en configuración puede no
aplicar al runtime actual; un inicio de sesión visible no prueba la autorización
de cuenta, organización, repositorio o conector; y una solución comunitaria
puede ser insegura o inválida en otra versión o plataforma.

Son informes de usuarios, no causas raíz universales. Usa el [índice de problemas de campo](../evidence-library-ES.md#source-notes)
y el [informe de casos de agentes de programación](../evidence-library-ES.md#source-notes):
registra síntoma y entorno, haz la comprobación segura más pequeña, detente en
el límite y declara solo lo que sostenga la evidencia.

## Varios agentes: el relevo es otro protocolo

Delegar no elimina responsabilidad del agente principal. Da a cada trabajador
una tarea separada y una forma fija:

```text
Rol: inspeccionar la matriz de idiomas; no editar archivos fuente.
Entradas: <dos archivos nombrados>.
Salida: hallazgos, rutas de evidencia, bloqueos y una comprobación siguiente recomendada.
Prohibido: ediciones, mensajes externos, credenciales y conclusiones fuera de los archivos declarados.
```

La coordinación combina hechos solo tras comprobar fuente, alcance y evidencia.
Un resumen de otro agente es una pista, no una declaración verificada. Si dos
trabajadores discrepan, conserva ambos informes y resuelve contra la fuente de
verdad.

## Experimento: tres versiones fijas de una petición

### Preparación

Usa el [Lab 002 complementario](../labs/lab-002-task-protocol-ES.md) con un
proyecto descartable. Mantén fijo el deseo y crea:

- `v1`: solo el deseo;
- `v2`: deseo más objetivo, audiencia, entradas permitidas y acciones prohibidas;
- `v3`: la misma petición más aceptación, parada, recuperación y entrega.

### Tarea

Pide a Codex solo aclaraciones y un borrador de protocolo. No dejes que el
experimento edite, instale, haga commit, push, publique ni contacte servicios
externos. Compara preguntas, supuestos, acciones permitidas y evidencia pedida.
Si no hay ejecución de Codex, etiqueta el registro como revisión estática; no
lo llames evidencia de ejecución.

## Variante de fallo intencional

Di «haz que se vea profesional» y «arregla los problemas que encuentres», pero
omite archivos objetivo, aceptación, permiso y parada. Una respuesta aprobada
identifica las decisiones ausentes o se limita a una propuesta de solo lectura.
Falla si inventa objetivo, instala dependencia, amplía edición o informa
finalización sin evidencia.

Sustituye después palabras vagas por criterios observables, por ejemplo:

- «el README del repositorio tiene un selector visible con seis idiomas registrados»; y
- «la comprobación local de enlaces informa cero enlaces de repositorio rotos».

Todavía hacen falta el validador real y el alcance de revisión. Son ejemplos de
lenguaje comprobable, no prueba de que se hayan ejecutado comprobaciones.

### Reflexión

Registra qué campo ausente causó el mayor cambio de alcance, riesgo o aceptación.
Anota si otra persona podría ejecutar el protocolo sin adivinar y nombra una
declaración que aún requiera evidencia de runtime.

## Lista de aceptación

- [ ] El objetivo nombra resultado, audiencia y alcance.
- [ ] El contexto distingue reglas, hechos, informes, hipótesis y datos de ejemplo.
- [ ] Las entradas identifican archivos, fuentes, versiones y ausencias conocidas.
- [ ] Las restricciones incluyen archivos prohibidos, secretos, dependencias y efectos externos.
- [ ] Las acciones permitidas separan leer, redactar, editar, ejecutar, commit, push y publicar.
- [ ] Cada declaración requerida tiene evidencia correspondiente.
- [ ] La parada cubre autoridad faltante, alcance cambiado, fallo repetido, silencio y declaraciones sin respaldo.
- [ ] La recuperación conserva el primer error y revisa estado antes de reintentar.
- [ ] La entrega enumera acciones tomadas y no tomadas, evidencia, incógnitas y siguiente comprobación.
- [ ] Una segunda persona o agente puede ejecutar el protocolo sin adivinar.

## Tarea de transferencia

Reescribe una petición para: ingeniería (regresión reproducible sin cambiar API
pública), investigación (fuentes de primera parte y desacuerdos), contenido
(README localizado con enlaces del mismo idioma), publicación (copia, reversión
y comprobación en vivo) y colaboración con agentes (dos auditorías de solo
lectura con archivos distintos y tabla de evidencia). Marca qué campos se
reutilizan y cuáles exigen evidencia del ámbito. Un protocolo que se lee bien
pero no sabe dónde detenerse no está completo.

## Fuentes y límite de mantenimiento

El método estable es síntesis original. Comportamiento de producto, permisos,
controles de interfaz, sintaxis de comandos, modelos y servicios externos son
volátiles: vuelve a comprobar las fuentes de primera parte antes de una tarea
actual.

- [Línea base oficial de OpenAI/Codex](../evidence-library-ES.md#source-notes)
- [Patrones de prompts para trabajo real](../evidence-library-ES.md#source-notes)
- [Casos de agentes de programación](../evidence-library-ES.md#source-notes)
- [Índice de problemas del mundo real](../evidence-library-ES.md#source-notes)

**Estado:** `candidate`. Estructura y registros de fuentes existen; el Lab
complementario y una ejecución independiente por lectores siguen
`draft`/`not_run`. Elige la siguiente unidad disponible desde el [índice en español](../table-of-contents-ES.md), no desde una página en otra lengua.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="02-first-safe-task-ES.md" aria-label="Capítulo anterior: Capítulo 2 · Completa tu primera tarea segura y verificable">← Anterior<br><strong>Capítulo 2 · Completa tu primera tarea segura y verificable</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="04-context-permissions-and-agent-ES.md" aria-label="Capítulo siguiente: Capítulo 4 · Contexto, permisos y límites de acción del Agent">Siguiente →<br><strong>Capítulo 4 · Contexto, permisos y límites de acción del Agent</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
