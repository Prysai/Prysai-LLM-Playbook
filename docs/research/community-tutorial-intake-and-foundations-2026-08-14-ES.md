<!-- content_id: community-tutorial-intake-and-foundations-2026-08-14 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: community-tutorial-intake-and-foundations-2026-08-14.md | source_revision: 2026-08-23 -->

# Incorporación de un tutorial comunitario: una mejor apertura para principiantes, no una fuente del producto

**Estado:** registro de investigación `candidate`.  
**Decisión:** conservar el tutorial comunitario proporcionado como señal `reference-only`; no incrustar su reproductor, copiar su transcripción, reutilizar sus capturas ni usarlo como autoridad sobre el comportamiento actual del producto.

## La decisión que respalda este registro

El material de Bilibili/BibiGPT tiene una fortaleza editorial útil: empieza con un nombre conocido, ofrece a quien llega una razón para seguir y avanza por un proyecto concreto, en vez de listar controles aislados. Es un patrón didáctico, no una licencia para reutilizar su expresión ni una base para afirmar hechos actuales del producto.

Este registro responde a una pregunta limitada: **¿qué puede aprender esta guía de ese patrón de enseñanza sin dejar de ser honesta con su propia redacción, sus fuentes y sus pruebas?**

La respuesta es empezar con una pregunta observable antes de cualquier recorrido por funciones:

> Cuando una herramienta de modelos de lenguaje dice que ha terminado, ¿qué puedes inspeccionar antes de confiar en el resultado?

La pregunta sirve para Codex, Claude Code y otras superficies de trabajo asistidas por modelos, sin afirmar que sus controles, permisos, persistencia o comportamiento de Agent sean equivalentes.

## Qué puede aportar la fuente pública y qué no

| Material de la fuente proporcionada | Tratamiento en este proyecto | Motivo |
| --- | --- | --- |
| Su progresión de un nombre conocido a un proyecto sencillo | **Conservar como patrón didáctico y reescribir desde cero** | El principiante necesita un motivo concreto para continuar, pero no nos corresponde copiar la redacción ni la presentación. |
| Nombres de productos, planes, cuotas, atajos y etiquetas de interfaz | **No enseñar a partir de esta fuente** | Son afirmaciones volátiles y dependientes de la cuenta y de la superficie; el material no es documentación del propietario. |
| Modos de permisos y comportamiento de aprobación | **Enseñar solo el principio sandbox frente a aprobación, con una fuente primaria fechada** | Los modos y valores predeterminados pueden cambiar. Un revisor de aprobación no amplía por sí solo el límite de runtime. |
| Flujo visual de señalización/anotación | **Enseñar el principio duradero, no el control con nombre** | Cuando importa el contexto visual, señala el área y pide el resultado; no prometas la misma UI en todas las superficies. |
| Historia de fallo de vista previa/almacenamiento | **Excluir de las instrucciones del producto** | Es una sola presentación de un síntoma. Este proyecto no lo reprodujo ni tiene una causa raíz confirmada. |
| Checkpoints de Git, tareas acotadas, comprobaciones independientes y condiciones de parada | **Enseñar como métodos neutrales al producto** | Son prácticas útiles cuyo valor no depende de copiar un flujo de proveedor. |
| Skills, plugins y herramientas externas | **Usar la documentación del propietario para las definiciones y conservar límites de acción y datos** | Un Skill no concede autorización, y listar un plugin no prueba que una acción externa haya ocurrido. |
| Edición, bifurcación o archivo de hilos, automatizaciones, control del ordenador o uso móvil | **Excluir hasta que exista un registro de adaptación actual para una superficie concreta** | La fuente no aporta un contrato actual, primario y ejecutable para esas afirmaciones. |

## Comprobación del límite oficial actual

Las siguientes fuentes eran accesibles el 2026-08-14. Sus páginas están controladas por OpenAI; sus afirmaciones solo cubren las superficies indicadas y deben revisarse antes de cualquier publicación que dependa de ellas.

| Afirmación suficientemente segura para enseñar | Fuente primaria | Lo que aún no demuestra |
| --- | --- | --- |
| La terminología de Codex abarca varias superficies, mientras que las capacidades concretas de cada una tienen un alcance definido. | [Glosario de OpenAI](https://learn.chatgpt.com/docs/glossary.md) | La cuenta, versión instalada, permisos o ejecución correcta de un alumno. |
| Una petición útil hace visibles objetivo, contexto, salida y límites; el trabajo visual se beneficia de señalar el área pertinente. | [Guía de prompting de OpenAI](https://learn.chatgpt.com/docs/prompting.md) | Que una petición vaya a funcionar o que todo cliente exponga un control de anotación con ese nombre. |
| El sandbox controla archivos/recursos de red accesibles; las aprobaciones controlan cuándo se pausa el runtime. Cambiar de revisor no amplía el sandbox. | [Permisos de OpenAI](https://learn.chatgpt.com/docs/permission-modes.md) | Un valor predeterminado actual, una política de organización o una autorización para un destino concreto. |
| Un Skill empaqueta instrucciones y recursos reutilizables para una tarea; un Plugin puede agrupar Skills y conectores. | [Skills y Plugins de OpenAI](https://learn.chatgpt.com/docs/skills-and-plugins.md) | Que un Skill se haya seleccionado, un conector esté autenticado o una acción externa haya terminado. |
| En la aplicación de escritorio, Local y Worktree son ubicaciones de ejecución distintas; Worktree aísla cambios en un worktree de Git. | [Entornos de OpenAI Codex](https://learn.chatgpt.com/docs/environments/modes.md) | Que el aislamiento baste para una tarea concurrente concreta o que otra plataforma use el mismo modelo. |

Son comprobaciones de fuentes, no ejecuciones locales del producto. Por eso la guía conserva el estado `candidate` y no afirma nada actual sobre la interfaz del vídeo, los planes, la disponibilidad, la vista previa, el flujo móvil ni etiquetas de funciones concretas.

## Una apertura original para el curso general

Esta es la dirección orientada al lector que se usa ahora al principio del Capítulo 1. Es redacción original del proyecto, no una transcripción ni una traducción:

> Puede que hayas oído nombres como Codex y Claude Code. Son ejemplos de un cambio mayor: un modelo de lenguaje puede trabajar con una tarea, contexto y, a veces, herramientas, en lugar de limitarse a devolver una respuesta de chat. Antes de recorrer controles, aprende la pregunta que facilita todo lo demás: cuando la herramienta dice que ha terminado, ¿qué puedes comprobar realmente?
>
> En esta primera lección no necesitas memorizar productos. Separarás una acción sugerida de una acción permitida, un mensaje de herramienta de un cambio en el objetivo y una respuesta plausible de una evidencia. Aquí Codex es la ruta práctica principal. El método es más amplio; cada plataforma nombrada debe ganarse su propio adaptador antes de que enseñemos sus botones como hechos.

Esta apertura invita al principiante, le da un modelo mental útil y promete un beneficio claro sin afirmaciones no respaldadas como «el producto central», «la mejor opción» o «el equivalente directo de otro producto».

## Los primeros diez minutos: una promesa, un límite

Una lección básica no debería empezar pidiendo elegir modelo, plan de pago, plugin o modo de permisos. Debe hacer una promesa pequeña:

1. **Nombrar un resultado.** Por ejemplo, reescribir un mensaje ficticio sin añadir hechos o inspeccionar un cambio en un solo archivo.
2. **Mostrar el material inicial.** La persona ve el texto, archivo o fixture exacto antes de pedir una acción al modelo.
3. **Decir el límite de acción.** Aclarar si es texto, solo lectura o un único cambio reversible. Sin secretos ni cuentas externas.
4. **Mostrar la comprobación.** La persona nombra qué debe permanecer, qué debe cambiar y qué sigue siendo desconocido.
5. **Hacer seguro detenerse.** Si el objetivo, la autoridad o la evidencia no están claros, detenerse y registrar la siguiente comprobación mínima en vez de ampliar el acceso.

El calentamiento opcional existente sigue este patrón con un mensaje fuente ficticio. La apertura del Capítulo 1 explica ahora por qué ese primer resultado modesto vale más que una lista larga de funciones.

## Implicación del nombre: método general y ruta insignia explícita

El contenido debe describirse en dos capas:

- **método general:** definir el resultado, elegir solo el contexto necesario, fijar un límite de acción, inspeccionar la evidencia, recuperarse y conservar un registro;
- **ruta práctica insignia:** enseñar Codex en profundidad allí donde existan fuentes primarias actuales, ejecuciones acotadas, pruebas de fallo y fechas de revisión.

Claude Code y otros sistemas nombrados son candidatos para comparación o adaptación, no sustitutos intercambiables. La recomendación pendiente sobre nombres y la migración gradual están en la [nota de transición de nombres](../strategy/naming-and-positioning-transition-2026-08-14.md).

## Registro de fuente y derechos

| Campo | Registro |
| --- | --- |
| Fuente | Referencia al reproductor de Bilibili `BV1c9EK6KEW4` y texto chino generado por BibiGPT proporcionado al proyecto el 2026-08-14. |
| Clase de evidencia | Sugerencia comunitaria / referencia editorial. |
| Tratamiento de derechos | No se proporcionó ni estableció de forma independiente ninguna licencia o permiso de reutilización. No se copian prosa, capturas, URL de imágenes, iframe, código ni tratamiento de marca. |
| Reproducción local | Ninguna. El proyecto no ejecutó el tutorial, no usó su proyecto, no probó sus funciones ni inspeccionó sus recursos enlazados. |
| Decisión | `reference-only`; puede orientar un esquema original de temas, nunca un hecho actual del producto ni un elemento incrustado para lectores. |
| Responsable y revisión | Responsable del currículo; reevaluar solo si una fuente con licencia separada y relevancia primaria cambia una decisión editorial. |

## Lo que este registro no demuestra

Esta incorporación no demuestra que el autor, el servicio de transcripción, los planes, permisos, controles, vista previa, flujo del proyecto, automatización, control del ordenador, uso móvil o resultados de la fuente sean exactos, actuales, licenciados para reutilización, representativos, seguros o equivalentes a otra plataforma. Tampoco demuestra que una apertura revisada mejore comprensión, finalización, retención, transferencia o adopción. Eso requiere un estudio acotado con aprendices.
