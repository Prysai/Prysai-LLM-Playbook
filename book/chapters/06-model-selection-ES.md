<!-- content_id: chapter-06-model-selection | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 6: Elegir un modelo no es venerar un modelo

**Estado:** `candidate`. El protocolo de comparación que sigue está escrito y
delimitado por fuentes, pero este repositorio no ha ejecutado su conjunto fijo
de tareas. El rendimiento, el coste, la latencia, la capacidad, la estabilidad
y la clasificación general de los modelos siguen en `not_run`.

## El problema que resuelve este capítulo

La elección de modelo suele sustituirse por un eslogan: «Usa el mejor modelo».
El trabajo real necesita una pregunta más acotada:

> Para esta tarea, en esta superficie, con este proveedor, contexto, conjunto de
> herramientas, límite de permisos, presupuesto de tiempo y rúbrica de
> aceptación, ¿qué candidato cumple el requisito mínimo y hay suficiente
> evidencia para ampliar la prueba?

Si un candidato no está disponible en la superficie elegida, o si dos ejecuciones
usan entradas, herramientas, permisos o ajustes de razonamiento distintos, no
existe una comparación limpia de modelos. Una demostración atractiva puede
mostrar que una configuración produjo un resultado. No puede establecer una
clasificación universal ni un valor global.

## Objetivos de aprendizaje

Al terminar este capítulo, deberías ser capaz de:

- elegir la tarea y la superficie de trabajo antes de elegir el modelo;
- verificar la disponibilidad del modelo en la cuenta, el espacio de trabajo, el
  proveedor y la sesión reales, en lugar de inferirla de un catálogo o un
  selector;
- separar el ID del modelo, el proveedor, el esfuerzo de razonamiento, el
  contexto, las herramientas, los permisos y los criterios de aceptación como
  variables de comparación distintas;
- ejecutar una comparación de humo de bajo riesgo con tres tareas sin cambiar las
  condiciones para rescatar a un candidato;
- conservar los fallos de capacidad, de desajuste de proveedor y de espera
  prolongada como evidencia; y
- decir qué prueba el experimento, qué no prueba y cuándo detenerse.

## Un punto de entrada real: la elección de modelo falla de maneras ordinarias

La [investigación de campo de Codex](../evidence-library-ES.md#source-notes)
del proyecto recoge Issues públicos de GitHub y otros debates públicos. Estos
informes son síntomas, no diagnósticos oficiales ni reproducciones locales. Son
valiosos porque exponen las suposiciones que la gente hace cuando una elección de
modelo sale mal.

| Síntoma público | Qué observó quien informó | Qué **no** demuestra | Primera respuesta segura |
|---|---|---|---|
| Un selector de modelos cambia `model` pero deja un `model_provider` personalizado | El modelo visible y el proveedor efectivo pueden formar un par inválido | Que el selector, el proveedor o el modelo estén rotos universalmente | Lee `model` y `model_provider` efectivos juntos; conserva un diff de configuración redactado antes de corregirlo |
| El modelo seleccionado está a capacidad | Una tarea se detiene antes de un resultado completo, y los prompts posteriores pueden encontrarse con un estado parcial | Que el modelo sea de baja calidad, o que reintentar signifique que el primer intento terminó | Guarda el checkpoint, el diff, los logs y las pruebas; clasifica el estado antes de continuar |
| Un comando de Windows sigue en `Working` | La interfaz muestra actividad pero no llega ninguna salida verificable | Que el formateador, el Agent o el modelo sigan haciendo progreso útil | Aplica la regla de tiempo de espera, interrumpe con seguridad, inspecciona el worktree y vuelve a ejecutar solo una comprobación acotada |

Los enlaces originales, las fechas, las versiones, los niveles de evidencia y
las notas de incertidumbre están en el
[registro de investigación sobre selección de modelos](../evidence-library-ES.md#source-notes).
El proyecto no ejecutó los comandos ni los workarounds de esos informes.

### Cómo usar un informe real sin convertirlo en folklore

Para cada síntoma, mantén cuatro etiquetas separadas:

1. **Informe de usuario:** lo que una persona dice que ocurrió en un entorno
   con nombre.
2. **Informe independiente:** si otra persona describe un síntoma parecido.
3. **Confirmación oficial:** una respuesta de mantenimiento, documentación
   oficial, nota de versión u otra evidencia de primera parte.
4. **Evidencia del Playbook:** lo que este proyecto reprodujo de verdad.

En los tres ejemplos anteriores pueden estar presentes las dos primeras
etiquetas, pero este proyecto no tiene reproducción local ni confirmación
oficial de causa raíz que las eleve a una solución garantizada. Eso cambia la
acción: conservar la evidencia y acotar la siguiente comprobación en lugar de
prometer un ajuste mágico.

## 1. La elección de modelo es una decisión de configuración

### La disponibilidad viene antes que la calidad

Usa dos compuertas separadas:

```text
documentación oficial del producto
→ autorización real de cuenta / espacio de trabajo / organización
→ superficie y proveedor objetivo
→ modelo visible en esta sesión
→ una petición inocua tiene éxito
→ la herramienta requerida es invocable
→ el resultado de la tarea está verificado
```

Cada flecha plantea una afirmación distinta. Un modelo puede estar descrito en
una página oficial y seguir sin estar disponible para una cuenta. Puede
aparecer en un selector y fallar igualmente cuando el proveedor recibe la
petición. Una respuesta de texto satisfactoria puede seguir sin demostrar que
el archivo, la terminal, el navegador o el conector que la tarea necesita están
disponibles.

Usa estos campos en una tarjeta de candidato:

```text
candidate_id:
model_id:
provider:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | API | other
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:
model_visible_evidence:
harmless_request_evidence:
```

`not_observed` es un resultado válido. Significa que la comprobación no se
realizó o no dejó evidencia utilizable. Es más seguro que rellenar la ficha con
una suposición.

### El posicionamiento del producto es una hipótesis inicial

En la comprobación de fuentes del 2026-08-11, la página oficial de modelos de
Codex describe las opciones recomendadas de GPT-5.6 más o menos así:

| Posicionamiento oficial | Una hipótesis inicial razonable | Qué sigue pendiente de probar |
|---|---|---|
| Sol: trabajo complejo y abierto con análisis y pulido extra | Pruébalo cuando dominen la ambigüedad, el juicio o la revisión de alto valor | Tasa de acierto al primer intento, duración, coste, estabilidad y comportamiento de las herramientas en tu conjunto de tareas |
| Terra: caballo de batalla pragmático para el día a día | Pruébalo para el trabajo ordinario que necesita razonamiento sólido y uso de herramientas | Si supera tu umbral de aceptación bajo tus restricciones reales |
| Luna: trabajo claro, repetible y de alto volumen | Pruébalo para extracción, clasificación, transformación y resúmenes estructurados | Si su resultado sigue siendo aceptable una vez incluidos los costes de contexto, proveedor, esfuerzo y revisión |

Estas son descripciones de producto, no resultados de benchmark del Playbook.
La página oficial también advierte de que un mayor esfuerzo de razonamiento
puede mejorar el trabajo complejo a costa de tardar más y usar más tokens.
Empieza con el esfuerzo más bajo que cumpla la rúbrica de aceptación y súbelo
solo cuando la tarea necesite más planificación, análisis o comprobación.
Registra el ajuste como parte de la ejecución.

`Max` y `Ultra` no son etiquetas de calidad gratuitas. La página oficial
describe Max como una opción que da a una tarea más tiempo de razonamiento y
Ultra como una que usa subagentes para trabajo complejo separable. Cambian el
flujo de trabajo y el presupuesto de recursos, así que una ejecución con Ultra
no es una comparación solo de modelo con una ejecución de un solo agente.

### Modelo, proveedor y superficie forman una tupla

No escribas un candidato solo como `model = ...`. Una identidad de comparación
útil es:

```text
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
```

Si cambia cualquier miembro central, o comparas un flujo de trabajo distinto o
marcas la ejecución como `not_comparable` y repites ambos lados bajo el nuevo
contrato.

La documentación oficial describe una ruta compartida de `config.toml` para los
valores por defecto del escritorio local, la CLI y el IDE, mientras que los
chats de Cloud tienen un límite de modelo por defecto distinto. Un archivo de
configuración es solo evidencia de configuración. Lee de vuelta el proveedor y
el modelo efectivos y, después, haz una petición inocua antes de tratar la
tupla como activa.

## 2. Decide en el orden correcto

No empieces con un modelo favorito. Usa esta secuencia:

```text
define la tarea y el riesgo
→ elige Local / Worktree / Cloud
→ elige el punto de entrada y el proveedor
→ verifica el acceso al objetivo y la disponibilidad del modelo
→ congela contexto, herramientas, permisos, esfuerzo y aceptación
→ ejecuta el mismo conjunto de tareas
→ inspecciona las filas comparables / not_comparable
→ amplía, detente o recoge más evidencia
```

### Clasifica la tarea primero

La clase de tarea te dice qué significa «suficientemente bueno»:

- **Entender y extraer:** encontrar valores estructurados en el material;
- **Transformar y generar:** reescribir, resumir, clasificar o formatear bajo un
  esquema fijo;
- **Planificar y juzgar:** manejar restricciones, compensaciones e
  incertidumbre;
- **Programar y usar herramientas:** inspeccionar, editar, ejecutar y reparar un
  repositorio;
- **Investigar y revisar:** encontrar fuentes, conciliar afirmaciones y exponer
  huecos; y
- **Crear y diseñar:** conservar un estilo a lo largo de rondas de
  retroalimentación.

Un candidato que supera la extracción puede seguir siendo la elección
equivocada para una reparación de varios archivos o una revisión de evidencia
de alto riesgo. La rúbrica de aceptación debe coincidir con la clase de tarea.

### Fija la superficie y el límite de riesgo

Elige el entorno más pequeño que pueda aportar la evidencia requerida. Mantén
las entradas sintéticas o redactadas en local cuando la tarea no necesite
ejecución remota. Usa un Worktree desechable cuando haya que aislar trabajo sin
confirmar. Usa Cloud solo cuando el repositorio, el entorno, la red, los
secretos y la ruta de revisión estén aprobados y sean observables.

La elección de modelo no puede compensar un archivo que falta, un conector no
disponible, un checkout incorrecto o una escritura no autorizada. Si el entorno
es incorrecto, detente en la decisión de superficie en lugar de «probar» el
modelo en condiciones desiguales.

## 3. Escribe una tarjeta de candidato antes de ejecutar

Usa una tarjeta por candidato o flujo de trabajo:

```text
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:

reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
known_capacity_or_network_issue:

not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
```

Antes de la primera ejecución, congela:

- las entradas exactas de la tarea y su versión;
- la superficie, el punto de entrada, el proveedor, el modelo y el ajuste de
  esfuerzo;
- el contexto relevante y las versiones de las herramientas;
- los permisos y los efectos secundarios permitidos;
- la rúbrica de aceptación y quien la revisa;
- el límite de tiempo y el presupuesto de reintentos; y
- la base de medición del coste.

No cambies un prompt, añadas contexto, concedas una herramienta, subas el
esfuerzo ni amplíes un permiso solo para un candidato. Si cambia el contrato de
la tarea, incrementa la versión y vuelve a ejecutar ambos candidatos.

## 4. Experimento: prueba de humo de tres tareas

**Estado del experimento:** `not_run`. Es un protocolo de ejercicio, no
evidencia de que este repositorio haya ejecutado una comparación de modelos.

### Preparación

Elige dos candidatos que tengan `surface_available: yes` en la misma
superficie. Usa el fixture versionado y offline
[`three-task-smoke-v1`](../../evals/candidates/three-task-smoke-v1/README-ES.md)
en lugar de recrear las entradas de memoria. Contiene entradas sintéticas y no
sensibles más un validador local; no contiene ejecuciones de modelos. No uses
datos de producción, secretos reales, escrituras externas, publicación, push,
despliegue ni un conector de pago. Ejecuta cada tarea una vez inicialmente y
permite como máximo una repetición predeclarada con el mismo formato.

Congela `task_set_version: three-task-smoke-v1`, ambas tarjetas de candidato,
una rúbrica de aceptación, las ubicaciones de las salidas crudas, las
ubicaciones de los logs y una condición de parada para la indisponibilidad, la
interrupción por capacidad, el desajuste de permisos, la deriva de las entradas
o la deriva de la versión de las herramientas.

### Tareas fijas

Los IDs canónicos de las tareas son `extract-01`, `markdown-02` y
`gap-review-03`. Cubren extracción estructurada, transformación de Markdown con
restricciones y revisión de huecos de evidencia. Cada directorio de tarea
contiene una instrucción, una entrada congelada, una salida esperada y un
validador. El paquete publica los valores SHA-256 exactos de las entradas en
`fixture.json` para que quien revise pueda detectar deriva.

No sustituyas una tarea por una demostración más vistosa para un candidato. Si
deben cambiar una entrada, una instrucción, el esquema de salida o una regla de
aceptación, crea una nueva versión del conjunto de tareas y vuelve a ejecutar
ambos lados.

### Tarea

1. Completa y conserva ambas tarjetas de candidato antes de invocar a
   cualquiera de los candidatos.
2. Verifica la disponibilidad en la superficie elegida y registra la ubicación
   de la evidencia.
3. Ejecuta a los candidatos A y B en el mismo orden de tareas, con las mismas
   entradas y la misma rúbrica de aceptación.
4. Guarda las salidas crudas antes de cualquier edición humana. Registra
   eventos, duración, base de coste y categoría de error.
5. Si una ejecución falla, permite solo la repetición controlada predeclarada.
   No conviertas reintentos ciegos repetidos en una métrica oculta de éxito.
6. Revisa cada fila `not_comparable` antes de calcular cualquier resumen.
7. Termina solo con `worth expanding`, `do not expand yet` o `insufficient
   evidence`, además de los límites y las condiciones de la siguiente
   ejecución.

### Evidencia

El registro de la comparación debe contener al menos:

```text
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence
reasoning_effort_or_config | context_fingerprint | tools_and_versions
permission_profile | first_pass | rework_count | duration
cost_basis | cost_observed | error_type | reviewer_score
comparable | not_comparable_reason | raw_evidence
```

Otra persona revisora debería poder reconstruir las tres entradas, las
condiciones y los criterios de aceptación. No uses una celda vacía, una
estimación ni la salida del otro candidato para rellenar una ejecución
interrumpida. Los recuentos de tokens no son moneda a menos que la base de
coste elegida defina explícitamente esa conversión.

## 5. Variantes de fallo y recuperación segura

| Variante de fallo | Por qué el resultado no es comparable | Manejo seguro |
|---|---|---|
| El candidato no es visible ni invocable en la superficie elegida | No hay ejecución en la misma superficie con la que comparar | Registra `surface_available: no` o `not_observed`; detén ese candidato y no puntúes la indisponibilidad como calidad del modelo |
| El selector de modelos y el proveedor no coinciden | La petición puede no haber usado el modelo previsto | Conserva un diff redactado de la configuración efectiva; corrige la tupla o convierte la comparación en una prueba de proveedor/flujo de trabajo |
| Un error de capacidad interrumpe una ejecución | La salida y la duración están incompletas, y el siguiente intento puede empezar desde un estado parcial | Guarda el error y el checkpoint; clasifícalo como `blocked` o `not_comparable`; repite ambos lados solo bajo una condición declarada |
| Un comando espera sin un evento verificable | Una etiqueta de `Working` no es un resultado | Aplica la regla de tiempo de espera, interrumpe, inspecciona el diff y el estado del proceso, y registra la verificación como ausente |
| Un lado recibe contexto extra, más esfuerzo o una herramienta nueva | La variable independiente ya no es solo el modelo | Marca `not_comparable`, conserva ambos registros y repite con el contrato congelado |
| Se usa una demo atractiva para anunciar un ganador general | El tamaño de la muestra y el alcance de la conclusión no coinciden | Vuelve a `candidate` o `insufficient evidence`; amplía las clases de tarea y las repeticiones antes de ensanchar la afirmación |

La respuesta realista a un fallo de capacidad o de espera prolongada no es
«seguir haciendo clic hasta que funcione». Es: conservar el último estado
conocido, identificar si la tarea estaba completa, parcial o en estado
desconocido y, después, elegir una recuperación acotada. Una conversación nueva
puede ser una superficie de recuperación, pero no hereda la prueba de la
conversación anterior.

## Reflexión

Responde desde las tarjetas y la evidencia cruda, no de memoria:

- ¿Qué tarea cambió la decisión de ampliar o detener?
- ¿Qué diferencia podría venir del modelo y cuál de la superficie, el
  proveedor, el contexto, la herramienta, el permiso, la capacidad o quien
  revisa?
- ¿Dónde fallaría la rúbrica de aceptación una salida más rápida o más barata?
- ¿Qué frases son posicionamiento oficial de producto y cuáles observaciones de
  esta prueba de humo?
- Si solo tienes una demo atractiva, ¿qué impide exactamente una clasificación
  general?

## Transferencia

Lleva los mismos campos de comparación a una de estas tareas:

- el mismo modelo en Local y en Worktree;
- conversión de documentos con un esquema de salida estricto;
- conciliación de fuentes de investigación con citas y una columna de
  incógnitas; o
- una inspección de código de bajo riesgo con un límite de herramientas de solo
  lectura.

Congela una versión nueva del conjunto de tareas y una rúbrica de aceptación
específica del dominio. No copies la elección de modelo ni el resultado de las
tres tareas al nuevo dominio. Indica qué conclusiones siguen siendo específicas
de la tarea y qué afirmaciones deben descartarse.

## Evidencia del capítulo

La entrega prevista son dos tarjetas de candidato, un conjunto de tareas y una
rúbrica congelados, las ejecuciones crudas iniciales y cualquier repetición
controlada, una tabla de comparación, registros de errores tipados y una
decisión de ampliar/detener. Hasta que existan esos registros, el capítulo debe
conservar `not_run`; el posicionamiento oficial y una sola demo no pueden
sustituir a la evidencia de evaluación.

## Fuentes y límite de mantenimiento

| Límite de hecho o método | Fuente | Consultada | Aplica a | Responsable / próxima revisión |
|---|---|---:|---|---|
| Posicionamiento oficial de modelos, guía de razonamiento, valores por defecto locales, límite de modelos en Cloud y avisos de deprecación | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 | La documentación oficial en la fecha de consulta; no es prueba a nivel de cuenta ni un benchmark | `facts-maintainer` / 2026-09-11 |
| Superficie CLI y flujo de trabajo con repositorio local | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 | Documentación oficial de la CLI; no la configuración efectiva de esta sesión | `facts-maintainer` / 2026-09-11 |
| Entorno Cloud, configuración, logs y límites de revisión | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | Documentación oficial de Cloud; la configuración no es la finalización de la etapa del Agent | `facts-maintainer` / 2026-09-11 |
| Síntomas públicos de modelo/proveedor, capacidad y esperas prolongadas | [Registro de problemas de campo](../evidence-library-ES.md#source-notes) | 2026-08-11 | Informes de usuarios y guía del proyecto; sin reproducción local ni afirmación oficial de causa raíz | `curriculum-maintainer` / 2026-09-11 |
| Método de comparación de tareas fijas | [Capítulo de evaluación](19-evaluate-models-and-workflows-ES.md) y el [fixture versionado](../../evals/candidates/three-task-smoke-v1/README-ES.md) | 2026-08-14 | Método del Playbook y validador local del fixture; aún sin ejecuciones de modelos completadas | `evaluation-maintainer` / 2026-09-11 |

Los IDs de los modelos, las matrices de superficies, los precios, la capacidad,
la sintaxis de configuración, el soporte de los proveedores, los controles de
esfuerzo y los avisos de deprecación pueden cambiar. Cuando cambien, refresca
las fuentes de primera parte y actualiza después el registro de impacto de
hechos, el registro de investigación, este capítulo, los fixtures de evaluación
afectados y la fuente de estado. Mantén el posicionamiento oficial, los
síntomas de los usuarios y la evidencia local de ejecución en frases separadas.

## Lista de verificación de aceptación

- [ ] Puedo definir la tarea, el riesgo, la superficie, el proveedor y la
      rúbrica de aceptación antes de nombrar un modelo.
- [ ] Puedo registrar evidencia real de disponibilidad en lugar de inferir el
      acceso de un catálogo de modelos, un valor de configuración o la etiqueta
      de un selector.
- [ ] Puedo rellenar dos tarjetas de candidato con modelo, proveedor, esfuerzo,
      contexto, herramientas, permisos, base de coste y versión del conjunto de
      tareas.
- [ ] Puedo ejecutar o bloquear correctamente las seis ejecuciones iniciales de
      `three-task-smoke-v1` sin cambiar las condiciones de un lado.
- [ ] Puedo conservar la evidencia de desajuste de proveedor, capacidad y espera
      prolongada, y distinguir la recuperación de la verificación.
- [ ] Puedo informar solo observaciones acotadas a la tarea y explicar por qué
      una demo no puede probar una clasificación general ni una afirmación de
      valor por dinero.
- [ ] Puedo afirmar que este capítulo sigue en `candidate` y que su experimento
      y la evaluación de modelos siguen en `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-ES.md" aria-label="Capítulo anterior: Capítulo 5 · Elige la superficie de trabajo adecuada de Codex">← Anterior<br><strong>Capítulo 5 · Elige la superficie de trabajo adecuada de Codex</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-ES.md" aria-label="Capítulo siguiente: Capítulo 7 · cómo se reparten el trabajo los Skills, los Plugins, MCP y las herramientas">Siguiente →<br><strong>Capítulo 7 · cómo se reparten el trabajo los Skills, los Plugins, MCP y las herramientas</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
