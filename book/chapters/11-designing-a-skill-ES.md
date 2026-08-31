<!-- content_id: chapter-11-designing-a-skill | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-20 -->

# Capítulo 11: diseñar una Skill que merezca su lugar

**Estado:** `candidate`. **Experimento:** `not_run`. Este capítulo propone un método de diseño; no demuestra que un host concreto descubra, cargue o ejecute una Skill.

## El problema que resuelve este capítulo

Una sesión llamativa no basta para convertir un prompt en una Skill. El prompt puede depender de hechos no documentados, pedir permisos innecesarios, dar por disponible una credencial o activarse solo porque aparece una palabra de moda. Una Skill útil es un paquete de método versionado para una clase de trabajo repetible, con acciones limitadas y evidencia que otra persona pueda inspeccionar.

## Objetivos de aprendizaje

Podrás decidir si una tarea repetida realmente necesita una Skill, escribir un contrato con disparadores y no disparadores, separar método, datos y ejecución, y revisar una candidata con casos positivo, de límite, de fallo y de transferencia. Que exista un `SKILL.md` o que haya una sola ejecución no demuestra fiabilidad en todos los hosts, modelos o personas.

## Una Skill en una frase

Usa esta definición durante todo el capítulo:

> Una Skill es un paquete de método que se puede descubrir y reutilizar, y que asigna una clase de tarea acotada a acciones acotadas y a evidencia comprobable.

Cuatro palabras marcan sus límites:

| Palabra | Qué significa en la práctica | Qué descarta |
|---|---|---|
| **Descubrible** | El host puede identificar el paquete en la superficie de trabajo prevista, o existe un procedimiento manual documentado | Que el archivo esté en un repositorio no demuestra que la sesión actual pueda verlo |
| **Reutilizable** | El método funciona con distintas instancias; los hechos del proyecto llegan como entrada | Incrustar un brief de cliente o una ruta absoluta en la Skill |
| **Acotada** | La tarea, la autoridad, los datos y los efectos secundarios tienen límites explícitos | «Úsala para todo lo relacionado con marketing» |
| **Comprobable** | Otra persona puede revisar entradas, acciones, salidas y afirmaciones no respaldadas | «El modelo dijo que siguió el proceso» |

Una Skill no se convierte en modelo, herramienta, permiso, conector ni sustituto de la aprobación humana. Describe un método; el host y la autorización de la persona usuaria determinan qué acciones están disponibles y permitidas.

## Un problema real: una Skill puede fallar antes de que empiece su método

El fallo práctico suele ser una decisión ausente: el host no descubre la Skill, el activador no encaja, falta una entrada, la licencia es incierta o la tarea pide un efecto más amplio que el autorizado. Por eso revisa el archivo, el descubrimiento, la selección, la carga, la acción y la salida por separado. Detente antes de presentar una candidata externa como capacidad propia.

## Escribe el contrato antes de la prosa

```yaml
skill_id: revision-de-limites
version: "0.1.0"
owner: equipo-o-persona
review_date: "AAAA-MM-DD"
purpose: "Revisar un artefacto suministrado contra un límite de evidencia indicado."
trigger:
  - "Se solicita una revisión de límites de evidencia."
  - "Hay artefacto, objetivo y aceptación suministrados."
non_trigger:
  - "Se solicita una reescritura sin límite."
  - "Faltan fuentes para afirmaciones importantes."
  - "Otro método nombrado posee la tarea."
required_inputs:
  - ruta o artefacto pegado
  - objetivo, exclusiones y aceptación
  - procedencia de afirmaciones materiales
allowed_actions: "leer los archivos indicados; escribir un informe temporal; ejecutar comprobaciones reversibles con nombre"
forbidden_actions: "leer o imprimir secretos; publicar, enviar, borrar, instalar o usar la red sin autorización"
output: "informe de afirmación → evidencia → alcance no cubierto"
stop_when: "falta entrada, autoridad, fuente o destino recuperable"
```

Un disparador debe incluir intención, entradas necesarias, propiedad del método y riesgo aceptable. Una coincidencia de palabra no basta. Definir en qué situaciones no debe activarse evita que la Skill se apropie de una tarea vecina.

### Leer y revisar cada campo del contrato

`purpose` debe nombrar una decisión repetible. `trigger` y `non_trigger`
delimitan la responsabilidad del método; `required_inputs` impide completar
vacíos con suposiciones. `allowed_actions` separa lectura, escritura,
ejecución y red. `stop_when` convierte la duda en una parada observable, y
`output` y `evidence` indican qué puede comprobar el siguiente revisor. Añade
siempre una persona responsable, una versión y una fecha o condición de
revisión: sin dueño, una Skill se vuelve obsoleta sin que nadie lo note.

No mezcles el encargo actual con el método reutilizable:

```text
tarea actual   → objetivo, audiencia, plazo y alcance de este encargo
reglas estables → vocabulario, licencia y política del proyecto
Skill          → decisiones, comprobaciones, paradas y formato reutilizable
herramientas   → acciones realmente disponibles en esta sesión
evidencia      → lo que ocurrió en esta ejecución y lo que sigue incierto
```

Una ruta absoluta, un brief de cliente o una conclusión de esta sesión son
datos de entrada, no contenido permanente de la Skill.

## Divide método, datos y ejecución

- `SKILL.md` guarda propósito, límites, pasos, parada y evidencia que siempre aplican.
- `references/` solo guarda material que se carga en una rama específica.
- `scripts/` solo contienen comprobaciones deterministas, con dependencias, red, escritura y salidas declaradas.
- `assets/` solo contienen recursos estáticos declarados.

No ocultes reglas de seguridad críticas en una referencia opcional. Un archivo existente tampoco prueba descubrimiento; descubrimiento no prueba carga; carga no prueba adopción; adopción no prueba comportamiento.

## Carga progresiva y límites de recursos

```text
metadatos / descripción
        ↓ si la solicitud encaja
SKILL.md → contrato, método, límites, salida y paradas
        ↓ solo si la rama lo necesita
references/ → hechos extensos y versiones
scripts/    → comprobaciones deterministas
assets/     → recursos estáticos declarados y licenciados
```

Las reglas esenciales de seguridad y parada permanecen en `SKILL.md`; una
referencia opcional no puede ampliar permisos. Cada recurso debe declarar su
propósito, condición de carga, entradas, salidas y respuesta ante fallos. Si
dos fuentes discrepan, conserva ambas observaciones y detén la adopción hasta
identificar cuál tiene autoridad.

## Fronteras de entrada, permisos y secretos

Clasifica cada entrada como `provided`, `readable`, `inferred` o `unknown`.
Distingue lectura, escritura temporal, escritura permanente, red, instalación,
transferencia, publicación y borrado. «Puede modificar archivos» no es un
permiso suficientemente preciso. No guardes tokens, cookies, contraseñas,
claves, `.env` ni datos personales en el paquete, fixtures, capturas o logs.

| Acción | Evidencia mínima previa |
|---|---|
| Leer | ruta exacta y alcance autorizado |
| Escribir una copia temporal | destino desechable y línea base |
| Escribir un archivo existente | aprobación y diff revisable |
| Red, instalación o publicación | alcance, responsable y rollback explícitos |

## Ejemplo trabajado: contexto de producto sintético

Imagina una página ficticia de alquiler de viviendas. La necesidad no es
«hacer marketing con IA», sino convertir hechos suministrados (zona, precio,
audiencia, restricciones y fuentes) en un contexto versionado para la persona
que redactará después. La Skill verifica campos y señala incógnitas; no
investiga el mercado, promete disponibilidad ni publica la página. Su salida
mínima es un borrador con mapa `afirmación → fuente`, supuestos, campos
faltantes y handoff.

## Evalúa cuatro casos

| Caso | Debe ocurrir | No debe ocurrir |
|---|---|---|
| Positivo | El método se activa y deja un artefacto revisable | Declarar éxito sin evidencia |
| Límite | Cede a otro método o formula una pregunta precisa | Activarse por una etiqueta parecida |
| Fallo | Se detiene antes de una escritura insegura y conserva el primer punto ausente | Inventar entrada, permiso o resultado |
| Transferencia | Cambia hechos de dominio y vuelve a revisar supuestos | Sustituir nombres mecánicamente |

Incluye un fallo intencional que cambie una sola variable y deje una señal visible. Define el objetivo, la línea base, los pasos de recuperación y una lectura posterior para comprobar el resultado: «deshacer» por sí solo no basta.

## Experimento y límites

### Preparación

Elige una tarea local y no sensible que hayas hecho al menos dos veces. Define una entrada temporal, criterios de aceptación claros y un límite de solo lectura. No uses credenciales, instalaciones, red ni contenido ajeno de una Skill cuya licencia no esté clara.

### Tarea

Elige un método de bajo riesgo realizado al menos dos veces, como revisar enlaces de Markdown, comprobar fuentes de un informe o preparar una entrega. Diseña contrato, un caso positivo, un caso cercano que no debe activarse, una entrada ausente, una falla visible y una comprobación de restauración (rollback). Conserva una tabla de qué prueba cada artefacto y qué queda desconocido.

### Evidencia

Conserva contrato, versión, entrada no sensible, salida esperada y real, punto de parada, recursos cargados y la observación exacta de host/superficie. Marca cada capa no observada como `not_observed`; una carpeta no es una prueba de ejecución.

Hasta registrar esos casos en un entorno declarado y revisarlos de forma independiente, el Skill es `candidate`; no afirmes descubrimiento, carga, ejecución ni impacto de negocio.

## Un flujo de diseño que se puede observar

Probemos el método con una tarea de bajo riesgo: revisar enlaces Markdown locales. No requiere red, cuenta ni datos de una persona. Tampoco demuestra que un host descubra automáticamente este Skill.

### Reduce la tarea a un alcance comprobable

«Revisa la calidad de la documentación» no basta. Escribe el acuerdo de esta tarea antes de invocar el método:

```text
Objetivo: encontrar enlaces Markdown relativos rotos en docs/quickstart.md.
Permitido: leer ese archivo; escribir candidatos en un informe temporal;
ejecutar una comprobación local de solo lectura.
Prohibido: editar el texto, usar red, instalar dependencias, borrar o publicar.
Aceptación: el informe muestra texto de enlace, destino, resultado y motivo de lo desconocido.
Parada: falta el archivo, la base de resolución no está clara o hace falta una acción no autorizada.
```

El acuerdo pertenece a esta ocasión. El Skill solo contiene el método reutilizable. Si se mezclan, el siguiente encargo hereda nombres de archivo, permisos y conclusiones que ya no corresponden.

### Diseña activadores y reglas para ceder la tarea

Un activador no es una frase publicitaria. Debe permitir decidir si este método debe hacerse cargo de la tarea.

| Elemento | Ejemplo para revisión de enlaces |
|---|---|
| Aplica | Se solicita revisar enlaces locales de un archivo Markdown nombrado, con objetivo y aceptación |
| No aplica | Se pide reescribir, comprobar un sitio remoto, reparar todo el repositorio o falta el archivo objetivo |
| Preguntar antes | ¿Los enlaces se resuelven desde el archivo, la raíz del repositorio o la salida del sitio? |
| Detener | Haría falta red, credenciales, escritura protegida o cambiar una publicación sin permiso explícito |

Que aparezcan «enlace» y «revisión» no basta. La intención, las entradas, la propiedad del método y el riesgo aceptable forman la decisión.

### Empareja cada acción con su evidencia

| Etapa | Acción permitida | Evidencia que queda | Lo que todavía no prueba |
|---|---|---|---|
| Entrada | Leer archivo y acuerdo | Ruta, versión base, entradas ausentes | Que el enlace esté roto |
| Exploración | Extraer enlaces relativos | Tabla de candidatos y regla de análisis | Que el destino exista |
| Comprobación | Resolver rutas en solo lectura | Resultado existe/no existe/desconocido | Que una URL remota funcione |
| Entrega | Escribir un informe temporal | Informe, comando y estado de salida | Que el problema se arregló |
| Revisión | Leer casos de riesgo o desconocidos | Decisión y alcance no cubierto | Que funcione en todo repositorio |

Un estado de salida cero solo prueba que la comprobación terminó según su propia definición. No prueba formatos ignorados, reescrituras de compilación ni destinos remotos.

## Mínimo no significa pocas palabras

Un Skill mínimo conserva todos los juicios que siempre hacen falta. Puede tener una entrada breve, pero no puede esconder límites esenciales:

```markdown
---
name: revision-de-enlaces-locales
description: Revisa enlaces Markdown locales de un archivo nombrado cuando se
aportan objetivo, aceptación y alcance de solo lectura. No sirve para reescribir,
red ni reparaciones masivas.
---

1. Confirma destino, base de enlace, alcance permitido y aceptación.
2. Detente y pregunta si falta cualquiera de ellos.
3. Extrae solo enlaces relativos locales; conserva el texto original.
4. Ejecuta la comprobación declarada y registra versión y salida.
5. Separa resultados candidatos, confirmados y desconocidos.
6. No edites, publiques, instales ni uses red sin una nueva autorización.
```

Las reglas de análisis pueden vivir en `references/` y un comprobador determinista en `scripts/`. Pero «detente sin objetivo» y «no uses red ni escritura» deben permanecer en la entrada, no en un archivo opcional.

## Provoca un fallo para comprobar la parada

Copia el ejemplo a un archivo temporal y cambia una sola variable: apunta un enlace a una ruta que no existe. El resultado esperado es una señal concreta, no una promesa de inteligencia:

```text
ROTO: [Guía de instalación] (guides/install.md)
resuelto: docs/guides/install.md
comprobación: la ruta no existe
alcance: solo rutas relativas locales; no se comprobó la red
```

Después usa un caso límite con un enlace `https://`: debe quedar como fuera de alcance o desconocido, sin conectarse. Con una base de resolución ausente, la respuesta correcta es preguntar o detenerse, no adivinar la estructura.

Antes de recuperar un fallo, conserva `run_id`, revisión, archivos, comando,
primer fallo y último checkpoint. El rollback solo puede actuar sobre el destino
y la línea base registrados; después vuelve a leer y compara con esa línea
base. Que el comando termine con código cero no demuestra que el estado original
se haya restaurado.

## Experimento pequeño y límite

1. Elige un Markdown que puedas leer con seguridad; no entregues secretos ni material privado al modelo.
2. Completa el acuerdo de tarea con objetivo, alcance y aceptación.
3. Ejecuta un control de solo lectura y conserva entorno, fecha, entrada y salida original.
4. Introduce un enlace roto temporal, repite y confirma una señal de fallo sin acción correctiva.
5. Descarta el ejemplo temporal o restaura la línea; vuelve a leer archivo e informe para comprobar que no hubo cambios no autorizados.
6. Pide a otra persona que, solo con el acuerdo y el informe, diga qué se comprobó y qué quedó desconocido.

El resultado solo describe el entorno registrado. No demuestra descubrimiento, selección, carga ni ejecución idénticos en otros hosts, versiones o modelos.

## Errores comunes

- Convertir una descripción en garantía: «asegura publicaciones» no define límites ni aceptación.
- Confundir script y Skill: el script comprueba algo determinado; el Skill decide cuándo usarlo y cómo interpretar el resultado.
- Confundir descubrimiento con fiabilidad: verifica por separado metadatos, selección, carga, acciones y evidencia.
- Ocultar desconocidos: «no se revisó la red» también es un resultado útil.

## Registro de incorporación: que el archivo exista no basta

Antes de llevar una Skill a una tarea real, deja un registro de incorporación. Evita
confundir «veo una carpeta» con «puedo depender de ella» y dice a la siguiente
persona en qué capa debe empezar la revisión:

```text
nombre y versión del Skill:
brecha de la tarea: qué decisión concreta aporta, no «hacer mejor la IA»
origen y licencia: original / fuente revisada; licencia y fecha de revisión
host y superficie de esta prueba: producto, versión y ruta que realmente se usaron
observado: archivo / descubrimiento / selección / carga / acción / salida
no observado: cada capa que no se ejecutó, leyó de vuelta o revisó de forma independiente
alcance permitido: lectura, escritura temporal, red, instalación y publicación por separado
siguiente comprobación segura: verificar solo una capa no observada
parada: falta entrada, autorización, destino de recuperación o evidencia
```

Un `SKILL.md` presente solo prueba que el archivo está presente; no prueba que
el host lo descubriera ni que el método se ejecutara. Un informe correcto una
vez solo habla de esa tarea y entorno registrado, no de todos los modelos,
carpetas o personas usuarias. El registro convierte «creo que funciona» en una
decisión que se puede revisar.

## Revisa el origen antes de adoptar un método externo

Trata las instrucciones, scripts y ejemplos de un Skill externo como material
para revisar. No los copies al curso ni los ejecutes con datos reales solo
porque el repositorio sea popular o el nombre parezca conocido. Confirma:

1. enlace original, revisión concreta, responsable y fecha de consulta;
2. que la licencia superior cubre código, scripts, recursos y dependencias que necesitas;
3. qué puede leer, escribir, instalar, conectar o enviar;
4. que la brecha de la tarea realmente lo requiere, frente a un método propio más pequeño; y
5. qué se comprobó en un ejemplo temporal no sensible y qué no se ejecutó.

Si falta una respuesta, conserva el enlace y el registro de investigación; no
copies el material como Skill propio ni lo presentes como capacidad adoptada.

## Práctica guiada: convierte una comprobación repetible en un Skill

Elige una tarea pequeña que hayas hecho al menos dos veces: revisar enlaces
locales de un archivo Markdown, comprobar que un informe nombra fuente y fecha,
o preparar una entrega con diff y comando de prueba. No elijas «hacerlo mejor»:
no es una decisión que otra persona pueda repetir.

Primero trabaja una vez sin Skill y guarda solo estos datos: objetivo, archivo
de entrada, acciones permitidas, resultado, evidencia y punto de parada. Después
subraya la parte que seguiría siendo necesaria en otra tarea. Esa parte, no los
nombres de archivos ni una respuesta bonita, es la candidata a convertirse en
Skill.

```text
cuándo usarlo: se nombró un archivo Markdown y se pide revisar enlaces locales
no usarlo: reescritura, enlaces web, publicación o reparación masiva
debe recibir: archivo, base de los enlaces, alcance de solo lectura y aceptación
debe devolver: enlaces confirmados, candidatos y desconocidos por separado
debe parar: falta el archivo o la base; se pide red, instalación o escritura
```

Pide al modelo que critique este contrato antes de escribir un `SKILL.md`: ¿qué
entrada inventaría?, ¿qué solicitud cercana debe ceder a otro método?, ¿qué
evidencia permitiría a un revisor comprobar el resultado? No aceptes «el Skill
automatiza todo» como respuesta: una regla útil nombra una decisión, un límite y
una señal revisable.

## Reflexión

¿Qué decisión es reutilizable dentro del Skill y cuál pertenece solo a este archivo o host? ¿Qué petición debe rechazar de forma explícita? ¿Qué evidencia comprobaría la siguiente capa no observada sin ampliar permisos ni alcance?

## Tarea de transferencia

Lleva el contrato a aprendizaje o investigación. Un Skill de aprendizaje puede organizar ciclos de práctica y recuperación posterior, pero no afirmar fluidez ni dominio. Uno de investigación puede ordenar fuentes e incertidumbre, pero no presentar un enlace encontrado como hecho comprobado. Conserva activador, no activador, regla de parada y límite de evidencia.

## Lista de aceptación

- [ ] El candidato resuelve una decisión repetida nombrada, no «hacer la IA mejor».
- [ ] Se nombran activador, no activador, entradas, acciones permitidas, parada y salida comprobable.
- [ ] Método, datos específicos de proyecto y ejecución determinista están separados.
- [ ] Casos positivo, límite, fallo y transferencia tienen resultado esperado o `not_run` honesto.
- [ ] El material externo solo se adopta tras revisar origen, licencia y efectos.

## Fuentes y límite de mantenimiento

El método de decisión de Skills es interno al proyecto. Comportamiento de host, descubrimiento, Plugins, MCP, permisos y candidatos externos cambian. Contrasta una afirmación actual con las [tarjetas oficiales](../evidence-library-ES.md#source-notes), el [registro de candidatos](../evidence-library-ES.md#source-notes) y la [fuente concreta de licencia](../../docs/sources/licensing.md). Ninguna sustituye una ejecución en el host documentado.

## Cuatro casos antes de adoptar

Prepara un conjunto mínimo, sin credenciales ni red:

| Caso | Entrada | Resultado correcto |
|---|---|---|
| Positivo | Un archivo y base claros | Informe de enlaces locales y evidencia de lectura |
| Límite | Una petición de pulir el texto | No se activa; explica que no es auditoría de enlaces |
| Fallo | Falta el archivo o la base | Pregunta o `blocked`; no adivina la ruta |
| Transferencia | Otro informe local con distinta estructura | Conserva el método, vuelve a decidir la base y aceptación |

Conserva la versión del Skill, la entrada no sensible, los recursos cargados,
la salida y el primer punto de detención. Que un archivo aparezca en una carpeta
no prueba descubrimiento, carga ni ejecución en un host. Este capítulo sigue
siendo `candidate` y el experimento `not_run` hasta que esos registros existan.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="10-planning-and-slicing-ES.md" aria-label="Capítulo anterior: Capítulo 10 · planificación y cortes verticales">← Anterior<br><strong>Capítulo 10 · planificación y cortes verticales</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="12-agent-loop-and-stop-ES.md" aria-label="Capítulo siguiente: Capítulo 12 · el ciclo, el estado y las condiciones de parada del Agent">Siguiente →<br><strong>Capítulo 12 · el ciclo, el estado y las condiciones de parada del Agent</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
