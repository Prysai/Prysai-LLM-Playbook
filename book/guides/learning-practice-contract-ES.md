<!-- content_id: learning-practice-contract | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# Contrato de práctica de aprendizaje

**Estado:** `draft` | **Evidencia de ejecución:** `not_run` | **Plataforma:** línea base de chat de texto universal; el comportamiento específico de un producto requiere un adaptador con fuentes.

## Problema

Una respuesta pulida puede ocultar que se filtró la respuesta correcta. Una lección terminada puede ocultar dependencia de pistas. Una nota alta puede ocultar familiaridad con la prueba. Si durante la práctica cambian el objetivo, las ayudas, las tareas, la rúbrica o los artefactos, ni quien aprende ni quien revisa puede saber qué se demostró.

## Concepto

El contrato fija la capacidad y las reglas de evidencia antes de empezar a guiar. Separa la ayuda formativa de la evidencia de resultado:

```text
línea base → recuperación → ayuda gradual → corrección del aprendiz
           → comprobación inmediata modificada → comprobación diferida → transferencia no vista
```

El modelo puede hacer preguntas, ofrecer pistas graduales, explicar errores y ordenar la evidencia. Su ánimo o su propia puntuación no son prueba independiente de aprendizaje.

## Decisión

Escribe el contrato con resolución observable:

```text
Dado [entrada/contexto], el aprendiz realizará [acción observable]
en [tiempo], con [ayudas permitidas], hasta [umbral de rúbrica].
```

No uses «entender», «saber», «aprender» o «dominar» como regla de aceptación. Antes de la línea base, fija estos campos:

| Campo | Decisión necesaria |
|---|---|
| Capacidad objetivo | Acción observable, condiciones, tiempo y umbral de calidad |
| Ayudas permitidas | Referencias, herramientas, diccionarios, notas nombrados o ninguna |
| Filtración de respuestas | Qué puede revelar el tutor, en qué orden y cuándo |
| Línea base | Revisión fija de tarea, instrucciones, tiempo, ayudas y rúbrica |
| Intentos | Guardar intentos original, corregido, inmediato, diferido y de transferencia |
| Registro de corrección | Error, nivel de pista, corrección del aprendiz, regla y asunto pendiente |
| Caso inmediato cambiado | Misma capacidad, detalles superficiales materialmente distintos |
| Comprobación diferida | Demora declarada, sin repetición inmediata y tarea nueva |
| Transferencia no vista | Material con una variación nueva, no una copia cercana |
| Persona que puntúa | Rúbrica fija; revisión determinista o independiente cuando corresponda |

Usa solo estas formas de estado calibradas:

- `template_selected`: se eligió y guardó el contrato o mensaje.
- `practised`: se completaron el ejercicio y su registro de ayuda/corrección.
- `demonstrated_on_this_task`: la comprobación fija alcanzó su rúbrica bajo condiciones registradas.
- `retained_at_[delay]`: la comprobación diferida alcanzó la rúbrica tras la demora indicada.
- `transferred_to_[variation]`: una tarea modificada y no vista alcanzó la rúbrica.

Ninguna implica dominio amplio, fluidez, pericia, retención permanente ni rendimiento probable en condiciones no evaluadas. Aplica cada etiqueta por separado: superar una transferencia hoy no crea evidencia de retención diferida.

## Acción

1. Escribe objetivo, condiciones, exclusiones, ayudas, política de filtración y rúbrica.
2. Presenta la línea base fija antes de ejemplos, explicaciones, opciones o pistas.
3. Conserva la línea base y pide recuperación antes de ayudar.
4. Sube la ayuda de un nivel en uno: ubica el error, da una pista parcial y luego muestra un fragmento resuelto. Anota el nivel máximo usado.
5. Exige una corrección escrita por el aprendiz; no sustituyas la respuesta en silencio.
6. Haz una tarea inmediata que cambie los detalles, pero conserve capacidad y rúbrica.
7. Prepara —sin afirmar que está programada— una comprobación diferida y una transferencia distinta. Registra sus revisiones antes de usarlas si es posible.
8. Puntúa cada artefacto con la rúbrica fija. Conserva desacuerdos e incógnitas en vez de promediarlos.
9. Emite solo el estado más estrecho que sostenga la evidencia guardada.

El ejercicio requerido debe ser de bajo riesgo y reversible: usa material sintético o público en un registro local desechable. No uses credenciales, datos privados, trabajo real de clientes, contacto externo, sistemas de producción, compras, publicación ni acciones destructivas. Si una tarea requiere alguno de ellos, detente y crea un protocolo autorizado por separado.

## Evidencia

Conserva un paquete:

```text
contract_revision | task_revisions | date | surface/model label
target | conditions | allowed_aids | leakage_policy | rubric | scorer
baseline_attempt | hints_used | correction_ledger | corrected_attempt
immediate_changed_attempt | delayed_attempt | transfer_attempt
scores | scorer_disagreement | unknowns | status_claim | claim_limit
```

Una respuesta corregida de inmediato respalda práctica, no retención. Una comprobación fija superada puede respaldar `demonstrated_on_this_task`; una superada tras demora, `retained_at_[delay]`; una variación no vista superada, `transferred_to_[variation]`. Si falta evidencia, conserva `not_run` o no hagas la afirmación.

## Fallos

Ejecuta deliberadamente estos límites:

- Pide la respuesta ideal antes de la línea base. El tutor debe conservar la regla de no filtración o marcar la línea base como contaminada.
- Repite una frase de la lección como tarea de «transferencia». La persona revisora debe rechazarla como copia cercana y pedir un caso materialmente distinto.
- Pide al mismo modelo que enseñó la lección que declare dominio. Debe negarse o limitar la afirmación y revelar la dependencia del puntuador.
- Pierde la fecha diferida. Registra `not_run`; no rellenes la retención con el resultado inmediato.

## Reflexión

¿Qué resultado dependió más de las pistas? ¿Qué variación fue realmente nueva? ¿Qué cuestionaría una persona puntuadora independiente? ¿Cuál es la comprobación posterior más pequeña que podría reforzar —o refutar— la afirmación actual?

## Lista de aceptación

- [ ] El objetivo es una acción observable con condiciones y umbral.
- [ ] Las ayudas permitidas y la regla de filtración están fijas antes de la línea base.
- [ ] Se conservan intentos originales, pistas, correcciones, puntuaciones e incógnitas.
- [ ] La tarea inmediata cambia el caso sin cambiar la capacidad.
- [ ] Las tareas diferida y de transferencia no vista son distintas y usan la rúbrica declarada.
- [ ] La persona que puntúa y cualquier dependencia o desacuerdo son visibles.
- [ ] El vocabulario de estado coincide con la evidencia disponible.
- [ ] Ningún estado implica dominio amplio, fluidez o pericia.
- [ ] La ruta obligatoria no usa secretos, efectos externos ni producción.

## Fuentes y mantenimiento

- Registro de investigación sobre aprendizaje asistido por LLM duradero: síntesis candidata de recuperación, retroalimentación, espaciado, retención, transferencia y límites de afirmación; consultado el 2026-08-12.
- Terminología del proyecto: distinciones estables entre modelos, herramientas, Skills, Agents, evidencia y rutas de aprendizaje.
- Paquete de práctica para principiantes: materiales de lectura que aplican este contrato a rutas de idioma e investigación.

Esta guía es material original del proyecto. El registro de investigación remite a la guía práctica del IES y a fuentes académicas, y explica qué no prueban. Vuelve a comprobar las guías del producto alojado antes de añadir acciones específicas de plataforma. Este borrador no tiene ejecución de aprendices, comprobación diferida, resultado de transferencia ni puntuación independiente.
