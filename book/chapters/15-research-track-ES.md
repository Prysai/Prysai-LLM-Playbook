<!-- content_id: chapter-15-research-track | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 15: ruta de investigación, de la pregunta al conocimiento auditable

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Este capítulo enseña disciplina de investigación; sus casos públicos son entradas didácticas, no reproducciones locales ni dictámenes oficiales.

## El problema que resuelve este capítulo

«Investiga esto» puede querer decir hallar hechos, comparar opciones, revisar bibliografía, formular una pregunta, escribir un informe o auditar un borrador. Sin acotar primero, un Agent puede convertir fragmentos de búsqueda en conclusiones, tratar una URL inaccesible como leída o obedecer una instrucción escondida en un documento externo.

> La capacidad no es producir una revisión más larga. Es dejar una cadena en la que cada afirmación importante se pueda rastrear hasta una pregunta, fuente, ubicación, nivel de evidencia y revisión humana.

## Objetivos de aprendizaje

Podrás formular una pregunta acotada, registrar fuentes accesibles y límites, y entregar conclusiones solo dentro del alcance que el texto localizado respalda.

## Convierte el tema en una pregunta respondible

Define objeto, relación o comparación, alcance, tiempo, audiencia y finalidad de salida. «Investiga problemas de inicio de sesión» no basta. Una pregunta útil además define inclusión, exclusión, fuentes prioritarias, punto de corte y formato: tabla de hechos, comparación, brief o borrador citado.

Busca síntomas antes que causas. Prepara grupos de consultas por síntoma, límite y entorno. No conviertas una causa sospechada en tu única consulta. Registra términos, fecha y zona horaria, alcance de fuente, enlaces originales, exclusiones y condiciones de parada. Un snippet, un agregador o una lista generada son pistas, no evidencia.

Detente cuando las afirmaciones importantes tengan ruta de evidencia, hayas usado al menos una consulta inversa, dos rondas distintas no añadan entorno ni contraejemplo, llegue la fecha de corte, el alcance no permita generalizar o una fuente pida secretos, permisos mayores o scripts desconocidos.

## Construye una cadena de artefactos

```text
intención → pregunta → plan de fuentes → recuperación y lectura
→ extracción → conflictos y huecos → síntesis → citas → revisión → entrega versionada
```

| Etapa | Artefacto | Condición de salida |
|---|---|---|
| Acotar | Pregunta, alcance y paradas | Se ve si la respuesta exagera |
| Planificar | Prioridades, consultas, fechas y acceso | Las afirmaciones importantes tienen ruta |
| Extraer | Tabla de evidencia y ubicación | Cada afirmación vuelve a una fuente |
| Sintetizar | Conflictos, desconocidos y fuerza | Un informe no se vuelve conclusión universal |
| Entregar | Borrador, citas, revisión y versión | Otra persona puede volver a comprobar |

Una fila de evidencia contiene una afirmación atómica, URL original y final, autor u organización, fecha de publicación, acceso y corte, versión, plataforma, alcance, ubicación, tipo de fuente, relación con la afirmación, hecho observado frente a hipótesis, conflicto, auditoría de cita, tono, revisor y siguiente acción.

## Fuentes inaccesibles, conflictos y foros

Un resultado de búsqueda, un `200` o una redirección no prueban lectura. Guarda URL original, estado, destino final, identidad de página, fecha y resultado de lectura. Una página de login, límite de tasa, timeout o error se registra como inaccesible; no se rellena con memoria, título o snippet.

Cuando dos fuentes oficiales difieran, primero compara objeto, fecha, versión, superficie, cuenta, región y definición. Si el conflicto sigue, conserva ambos lados, estrecha el texto y deja el resultado `candidate`. En un foro, separa «la persona observó», «alguien sugirió», «se sospechó» y «un mantenedor confirmó». Muchos votos, un cierre o una respuesta aceptada no sustituyen confirmación ni reproducción.

Una cita pulida generada por IA tampoco es evidencia. Abre la fuente, localiza el pasaje, comprueba título, fecha, versión y alcance; divide la frase si solo respalda una parte. Si una cita clave no se puede localizar, marca `citation_unverified` y reduce o elimina la conclusión.

## Práctica y límite

Parte de una pregunta amplia, prepara una fuente oficial, un informe de campo con URL y fecha, y un elemento inaccesible o conflictivo. Pide primero tres preguntas candidatas, elige una y define alcance, corte, zona horaria y paradas. Diseña consultas por síntoma, límite y entorno; crea plan de fuentes, tabla de evidencia, registro de acceso, conflicto y auditoría de citas. No subas logs, cookies, tokens ni contactos.

Entrega `candidate` si falta evidencia clave: hechos conocidos, desconocidos, conflictos, alcance, motivo de parada y siguiente paso de bajo riesgo. El ejercicio no demuestra investigación completa hasta que las fuentes clave se abran, localicen y revisen independientemente.

## De un tema amplio a una entrega auditable

«¿Qué LLM es mejor para mi equipo?» no se puede responder aún: faltan tareas, cuenta, presupuesto, fecha y aceptación. Reescríbelo así:

```text
Pregunta: a fecha de <fecha y zona horaria>, para <tres tareas nombradas>,
¿qué fuentes públicas primarias describen capacidades declaradas, límites e
incógnitas de cuenta o región de <productos candidatos>?
No responde: cuál es “mejor”, precios no publicados ni rendimiento no probado.
Entrega: tabla afirmación → fuente → alcance → desconocido, sin ranking total.
Parada: página clave inaccesible, alcance incierto o necesidad de cuenta/datos privados/pago.
```

Prepara consultas de tarea o síntoma, límite y entorno. No busques solo el producto que esperas que gane más «best». Cada fila conserva consulta, fecha, zona, alcance de fuente, inclusión y exclusión; snippets y enlaces del modelo son pistas.

| Campo | Forma segura |
|---|---|
| Afirmación | «La página X describía Y el día de acceso» |
| Evidencia | URL original/final, título, ubicación y fecha |
| Alcance | Superficie, versión, región y cuenta; o desconocido |
| Nivel | Oficial / mantenedor / informe de usuario / pista |
| No implica | Disponibilidad en mi cuenta, éxito de tarea o mejor elección |

## Experimento: paquete conflictivo e inaccesible

### Preparación

Reúne una página oficial accesible, un informe de usuario fechado y un enlace deliberadamente inaccesible o conflictivo. No uses cookies, tokens, registros privados ni contactos.

### Tarea

Usa una página oficial accesible, un informe de usuario fechado y un enlace que redirige, exige login o falla. No subas logs, cookies, tokens, contactos ni archivos privados.

1. Escribe tres preguntas candidatas, elige una y fija alcance, corte, zona, inclusión y parada.
2. Registra URL original/final, resultado de acceso, organización, fecha y ubicación; una página inaccesible queda `inaccessible`, no se completa con snippet.
3. Haz una consulta inversa para cada afirmación clave: busca límites, otro entorno o contraejemplo. No encontrarlo no confirma.
4. Si dos páginas chocan, compara versión, superficie, cuenta, región y definición; conserva ambas y limita la entrega si no se resuelve.
5. Entrega una página `candidate`: conocido, desconocido, conflicto, no afirmado, parada y siguiente paso seguro.

### Evidencia

Guarda pregunta, fecha de corte con zona horaria, consultas, URL original y final, resultado de acceso, ubicación leída y una tabla de afirmaciones atómicas. Un título o snippet sin texto localizado sigue siendo una pista, no una cita.

### Reflexión

¿Qué afirmación tuvo que reducirse al separar fuente, fecha y alcance? ¿Cuál es la siguiente comprobación mínima que no exige datos privados ni permisos nuevos?

## Problemas reales: una respuesta fluida sin fuente comprobable

Al elegir un modelo, método de estudio o herramienta, un resumen puede mezclar enlaces, versiones e informes. La decisión útil no es qué frase parece convincente, sino qué afirmación tiene respaldo para la tarea, fecha y entorno declarados.

## Tarea de transferencia

Usa la tarjeta para «qué recursos apoyan mi práctica de español la próxima semana». Define tarea, plazo, fuentes permitidas y una afirmación que no harás: no prometer dominio en siete días ni competencia garantizada.

## Lista de aceptación

- [ ] Mi pregunta declara tarea, alcance, fecha y condición de parada.
- [ ] Cada afirmación clave tiene fuente, ubicación, acceso y límite.
- [ ] Distingo informe, hipótesis, declaración oficial e incógnita.
- [ ] Con conflicto o fuente inaccesible entrego `candidate`, no certeza inventada.

## Fuentes y límite de mantenimiento

Las preguntas, cadenas de evidencia y registros de conflicto son métodos estables. Páginas, hechos de producto, foros y búsquedas cambian; registra fecha de acceso, alcance y próxima comprobación.

## Comprobación propia

- [ ] Convierto «cuál es mejor» en una pregunta con tarea, alcance, fecha, fuentes y entrega.
- [ ] Conservo URLs, acceso y ubicación; no trato un snippet como lectura.
- [ ] Busco límites o contraejemplos y anoto lo que no prueban.
- [ ] No comprimo conflicto oficial, cuenta, región e informe de usuario en una regla universal.

## Una tarjeta de investigación real y de bajo riesgo

No empieces con «¿qué modelo es mejor?». Convierte la pregunta en algo que se
pueda revisar y también rechazar:

```text
pregunta: a fecha de [día y zona horaria], ¿cómo describen fuentes públicas
primarias las capacidades declaradas, límites y desconocidos de [dos modelos]
para [una tarea concreta, por ejemplo convertir un texto no sensible en tareas claras]?
no responde: ranking general, éxito no probado, acceso de mi cuenta ni precios ocultos.
fuentes prioritarias: páginas oficiales, notas de versión, documentación pública.
entrega: claim → URL → ubicación → fecha de acceso → alcance → unknown.
parar: página clave inaccesible, login/pago/dato privado necesario o conflicto sin explicación.
```

Pide al modelo sugerencias de fuentes y búsquedas, pero trata cada enlace como
una pista. Al abrirlo, conserva título, URL original y final, ubicación legible,
resultado de acceso y alcance declarado. Si el modelo dice «oficialmente admite»
pero no puedes localizar el texto, baja la frase a `citation_unverified`; una
bibliografía convincente no rellena un hueco.

## Una comprobación inversa por afirmación

Para cada conclusión importante añade una pregunta que podría limitarla. Tras
«la página declara X», busca límites, diferencias de cuenta o región, requisitos
de versión y contraejemplos públicos. No hallar un contraejemplo no prueba una
regla universal; solo registra que no apareció en el alcance declarado.

| Afirmación | Fuente directa | Check inverso | Puede sostener | Sigue desconocido |
|---|---|---|---|---|
| La página describía X ese día | URL y ubicación | búsqueda de límite/región/versión | expresión pública de esa página | cuenta propia, éxito real, mejor elección |

Entrega una página `candidate` con conocido, desconocido, conflicto, no afirmado,
motivo de parada y siguiente acción de bajo riesgo. No es un benchmark, estudio
de usuarios ni consejo de compra; capítulo y experimento siguen `candidate` y
`not_run`.

## Recibo de investigación de diez minutos: registra antes de concluir

Al empezar no necesitas fingir un informe completo. Elige una pregunta estrecha
y rellena este recibo durante diez minutos. Su fin es dejar un siguiente paso
revisable, no declarar ya «el mejor modelo» o «la única causa».

```text
pregunta: <una tarea, fecha y alcance>
no responde: <ranking, eficacia, acceso de cuenta u otro dato sin evidencia>
posible fuente: <URL original; un fragmento de búsqueda no es el cuerpo>
acceso real: <éxito / redirect / login / timeout / no leído>
contenido localizable: <título, fecha, párrafo o Issue; none si no existe>
esta fuente respalda: <un hecho atómico>
esta fuente no respalda: <causa, generalidad, mi cuenta o resultado real>
control inverso: <una consulta o fuente que podría limitar la conclusión>
estado actual: official / user_report / lead / inaccessible / citation_unverified
siguiente acción segura: <leer una fuente, comparar alcance o parar>
```

«La página X describía Y el día de acceso» y «mi equipo puede usar Y ahora»
son afirmaciones distintas. La primera puede tener una página pública; la
segunda necesita evidencia de cuenta, organización, región y superficie real.
Un enlace no sustituye dos evidencias.

### Cuándo rebajar una frase

| Frase inicial | Qué falta | Forma más honesta |
|---|---|---|
| «El modelo A es el mejor para investigar.» | Tarea, muestra, comparación y puntuación | «Una página pública describe una capacidad de A; su adecuación a esta tarea no se evaluó.» |
| «X causa este problema.» | Reproducción o confirmación de mantenimiento | «Una persona informó el síntoma y propuso X como causa posible.» |
| «Tiene soporte oficial.» | Texto oficial localizable y alcance | «En la fecha de acceso, una página oficial describe la función dentro de su alcance declarado.» |

Rebajar no debilita la investigación: evita que la existencia de una fuente se
confunda con una conclusión demostrada.

## Tarjeta de decisión de investigación: de la pregunta al recibo de parada

Ante «investiga esto», empieza por una pregunta que pueda cambiar una decisión concreta. Esta tarjeta sirve para material público o autorizado que tú puedas abrir y revisar; no prueba que una página sea cierta, no navega toda la web ni decide asuntos de salud, derecho, empleo o dinero.

### Fija la decisión y la pregunta
```text
Decisión: ¿qué debo decidir antes de [fecha] para [persona o grupo]?
Pregunta: ¿qué pregunta respondible cambiaría esa decisión?
Alcance: ¿qué entra, qué queda fuera y cuál es el límite de fecha, hora y lugar?
Parada: ¿qué fuente, autorización o definición faltante obliga a pausar?
```
### Asigna un responsable de fuente a cada afirmación

| Afirmación | Propietario probable | Apoyo directo | Conflicto o desconocido | Siguiente comprobación permitida |
|---|---|---|---|---|
| [una frase comprobable] | página oficial / estudio primario / ley o política / datos propios / institución identificada | cita o pasaje | parte no apoyada o versión distinta | una comprobación pequeña |

La experiencia de un foro puede ayudar a descubrir síntomas y preguntas, pero no prueba por sí sola una causa ni que todos tendrán el mismo problema. Los enlaces, títulos, fechas y citas generados por IA también se deben comprobar contra el material original.

### Haz una comprobación inversa antes de concluir

Para cada frase prevista, pregunta: ¿el material la dice directamente o la infiero? ¿hay una revisión más nueva, excepción o fuente en conflicto? ¿la fecha de acceso sigue dentro del horizonte de la decisión? ¿otra persona encontraría el mismo apoyo con el registro? Si una respuesta falta, reduce la frase o marca `unknown`; no rellenes el hueco con seguridad retórica.

### Recibo de parada de diez minutos
```text
Decisión y pregunta:
Material abierto y comprobable:
Apoyo directo:
Interpretación o inferencia:
Conflictos y desconocidos:
Fechas de acceso y alcance:
Siguiente comprobación más pequeña:
Motivo de parada:
Estado: research_plan | scope_checked_for_supplied_list | blocked | not_run
```

El recibo solo registra lo ocurrido dentro de su alcance; no significa «investigación terminada», hechos actuales, recuperación correcta por un modelo ni autorización para actuar.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="14-discover-and-audit-skills-ES.md" aria-label="Capítulo anterior: Capítulo 14 · descubrir, instalar y auditar Skills externos">← Anterior<br><strong>Capítulo 14 · descubrir, instalar y auditar Skills externos</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="16-engineering-track-ES.md" aria-label="Capítulo siguiente: Capítulo 16 · ruta de ingeniería, de la idea al software fiable">Siguiente →<br><strong>Capítulo 16 · ruta de ingeniería, de la idea al software fiable</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
