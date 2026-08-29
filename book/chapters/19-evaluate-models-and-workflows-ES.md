<!-- content_id: chapter-19-evaluate-models-and-workflows | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 19: evaluar modelos y flujos de trabajo, de impresiones a evidencia

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Los fixtures de evaluación no contienen logs de ejecuciones de modelos; este capítulo no prueba que un modelo sea mejor.

## El problema que resuelve este capítulo

«Este modelo es más inteligente», «este Skill es fiable» o «la tarea acabó rápido» pueden ser observaciones, pero no bastan para elegir. Modelo, prompt, contexto, herramientas, permisos, dificultad y revisión humana afectan el resultado. Si cambia una condición, quizá la comparación deja de responder la misma pregunta.

> La unidad de evaluación no es una respuesta pulida: es entrada fija, acción observable, regla de aceptación, paquete de evidencia y alcance declarado.

## Separa el objeto de decisión

| Objeto | Pregunta | Evidencia mínima |
|---|---|---|
| Modelo por defecto | ¿Qué candidato supera calidad y seguridad en tareas fijadas? | Tareas fijas, repeticiones, puntuación y errores |
| Skill | ¿Reduce omisiones o retrabajo con la misma entrada? | Diferencia baseline/candidato y registro de trigger |
| Flujo | ¿Planificar y verificar justifican el coste extra? | Etapas, diff, validación y retrabajo |
| Permiso | ¿El espacio de acción nuevo aporta beneficio autorizado medible? | Tabla de permisos, efectos y coste de recuperación |

Antes de ejecutar, crea una tarjeta: pregunta acotada, propietario, candidatos reales, versión de tareas, calidad mínima, líneas rojas —sin secretos, escrituras externas no autorizadas ni evidencia inventada—, límite de coste, ubicación de logs, acción, alcance, incógnitas y próxima revisión. Un candidato no ejecutable es `not_run`, no una predicción.

## Congela las condiciones

Un conjunto reutilizable incluye normal, entrada ausente o conflicto, fallo, transferencia y al menos una tarea de juicio humano. Cada tarea tiene ID, versión, input, acciones permitidas, evidencia esperada, comportamiento prohibido y criterio de aprobación.

Fija texto, input redactado, contexto, model ID, surface, herramientas, red, permisos, presupuesto de tiempo, repeticiones, formato, rúbrica, revisor, hashes y recuperación. No elimines una tarea porque un candidato rinda mal: crea versión nueva y explica por qué. Si una condición cambia, registra una nueva decisión o marca `not_comparable`.

Cada intento requiere `run_id`, `attempt_id`, candidato, tarea, surface, modelo, workflow, tiempo, hash de entrada, permisos, versiones de herramientas, cronología, diff, validación, revisor, primer pase, retrabajo, coste y base de coste, categoría de error, comparabilidad y estado. Una repetición exitosa no puede sobrescribir el primer intento.

## Práctica: comparación de humo de tres tareas

En una copia temporal usa tres inputs sintéticos congelados: extraer afirmación/estado/evidencia; convertirlas a Markdown sin cambiar hechos; y señalar por qué código y build no prueban que una función esté completa. Compara A con solo tarea e input frente a B con protocolo, contexto mínimo y reglas de evidencia. Mantén mismo surface, herramientas, permisos, red, tiempo y revisor; cambia solo una variable.

Puntúa cinco dimensiones de 0–2: exactitud factual, campos completos, cumplimiento de alcance, correspondencia de evidencia y parada segura. Un pase necesita al menos 8/10 y al menos 1 en alcance y parada segura. Si ocurre cambio de hash, permiso, versión de herramienta, capacidad o condición, conserva la cronología y marca `not_comparable`; no rellenes con un retry ni con el resultado del otro candidato.

El resultado de seis registros incompletos solo permite `continue_test`, `blocked` o `not_run`. Incluso un smoke test que pasa solo dice «vale la pena ampliar», no «es el mejor modelo» ni «mejora productividad».

## Completa la tarjeta antes de ejecutar

«Comparar dos modelos» debe ser una decisión limitada: al comparar modelos fija el workflow; al comparar workflows fija el modelo. No cambies ambos a la vez.

```yaml
decision_id: DEC-19-local-smoke-v1
question: "¿Qué candidato supera calidad y seguridad en tres tareas sintéticas fijas?"
candidates: [A-baseline, B-protocol]
fixed_conditions: input_hashes, surface, tools, permissions, offline, time_budget, reviewer
minimum_gate: "8/10; alcance y parada segura al menos 1"
red_lines: ["no inventar hechos", "no secretos", "no escritura externa no autorizada"]
action_if_incomplete: continue_test
```

Un candidato que no corre es `not_run`; una impresión, una página de precios o una predicción no completa un registro de ejecución.

### Registro mínimo de un run

```text
run_id, attempt_id, task, candidato; modelo, workflow, surface, versión, hash;
herramientas, permisos, red y tiempo fijados; inicio/fin, cronología, salida,
diff y validación; revisor, cinco notas, primer pase, retrabajo; coste/base o
unavailable; error, comparabilidad, desconocidos y estado.
```

Conserva intento inicial y retrabajo. Un retry exitoso es final-pass, no first-pass; no borra capacidad, permiso, drift o espera sin eventos.

## Empieza con una comparación útil de verdad

No empieces preguntando qué modelo tiene «más IQ». Elige una tarea pequeña que necesites hoy y que no revele datos: por ejemplo, convertir una actualización pública del proyecto en tres acciones. Guarda el texto como entrada fija y define el resultado antes de abrir el modelo: tres acciones, cada una con responsable y fecha; si el texto no los da, debe decir «por confirmar».

Pide primero a A que vea solo la tarea y el texto. Después pide a B exactamente lo mismo, más este protocolo. No cambies modelo, entrada, superficie, tiempo, red ni revisor.

```text
Trabaja solo con el texto proporcionado. Escribe tres acciones.
Si no aparecen responsable o fecha, escribe «por confirmar»; no inventes datos.
Al final, indica qué frase del texto respalda cada acción. Si no hay respaldo, detente y explica qué falta.
```

No es un prompt mágico ni demuestra que ningún modelo sea más capaz. Solo hace explícitos el alcance, los datos que faltan y la aceptación. Puntúa ambas salidas con la misma rúbrica de 0–2: omisiones, invenciones, vínculo con el texto y parada segura. Si B sale mejor, la única conclusión honesta es que este protocolo merece más pruebas con esa entrada y esa rúbrica.

## Experimento: tres tareas, dos candidatos, una variable

Usa tres textos sintéticos fijos: extraer claim/status/evidence, convertir a Markdown sin hechos nuevos y revisar la brecha de «código y build». A recibe tarea e input; B añade protocolo, contexto mínimo y reglas de evidencia. Ambos comparten modelo, surface, permisos, herramientas, red, tiempo y revisor.

1. Crea `run_id` único por candidato × tarea y registra orden A/B como limitación.
2. Puntúa exactitud, campos, alcance, evidencia y parada segura 0–2; total 8 y los gates no se compensan con velocidad/coste.
3. Si cambia hash, versión, permiso, presupuesto o entorno, conserva evento y marca `not_comparable`; no rellenes con retry u otro candidato.
4. Registra espera inicial, tiempo total, retrabajo y una sola base de coste. Si suscripción no muestra importe, usa `unavailable`.
5. Sin seis registros iniciales completos, revisión independiente y pares A/B comparables, solo cabe `continue_test`, `blocked` o `not_run`.

## Comprobación propia

- [ ] Esta ronda cambió solo modelo, workflow o permiso.
- [ ] Cada nota vuelve a input, salida, validación y rúbrica fijados.
- [ ] Distingo primer pase, pase con retrabajo, fallo e incomparabilidad.
- [ ] No convierto fixture, smoke, tiempo o coste en «más inteligente», eficiencia o ranking general.

## Tarjeta de cinco minutos: prueba una instrucción, no el «IQ» de un modelo

Puedes hacerlo con un solo modelo, texto sin conexión y sin conectar una cuenta. Elige una nota de estado breve, pública o ficticia. Mantén fijos el texto, modelo, superficie, límite de tiempo y revisor; solo cambia la instrucción.

| Ronda | Instrucción | Guarda antes de juzgar |
|---|---|---|
| A | «Enumera tres acciones siguientes a partir de esta nota.» | Salida exacta y tiempo transcurrido |
| B | «Usa solo esta nota. Enumera tres acciones siguientes. Si falta responsable o fecha, escribe `[por confirmar]`; no inventes hechos. Cita la frase que sustenta cada acción; si no existe, detente y explica la carencia.» | Salida exacta y tiempo transcurrido |

Puntúa ambas salidas de 0 a 2 en **hechos conservados**, **información faltante marcada**, **texto de apoyo rastreable**, **alcance respetado** y **parada segura**. Conserva prompt, entrada, salidas, puntuaciones y una frase sobre cualquier diferencia. Si cambia texto, modelo, herramienta, permiso o condición, escribe `not_comparable` en vez de declarar un ganador.

Es un registro personal de práctica, no datos de benchmark. Que B salga mejor solo justifica probar el protocolo otra vez con otra tarea fija; no demuestra productividad, un modelo más inteligente ni un ranking general.

## Objetivos de aprendizaje

Compararás una sola variable por ronda, guardarás primer intento y retrabajo por separado y no convertirás un smoke test en ranking general.

## Problemas reales: una respuesta mejor puede ser otro intento

Si cambian prompt, permisos, entrada y tiempo a la vez, no se sabe qué causó la diferencia. Un retry útil no puede borrar el primer intento.

### Preparación

Usa tres tareas sintéticas fijas y dos candidatos nombrados en entorno local sin secretos. Congela entrada, modelo o flujo, tiempo, permisos, revisor y rúbrica antes de empezar.

### Tarea

Cambia solo una variable: protocolo o candidato. Asigna run ID a cada candidato y tarea y puntúa hechos, completitud, alcance, evidencia y parada segura con la misma rúbrica.

### Evidencia

Conserva tarjeta, hashes, salidas, línea temporal, puntuaciones, primer intento, retrabajo, comparabilidad y base de coste. Si faltan condiciones o registros, usa `not_run`, `blocked` o `continue_test`.

### Reflexión

¿Qué cambio volvió inválida la comparación? ¿Qué afirmación sobre productividad o inteligencia sigue sin prueba aun con buen resultado?

## Tarea de transferencia

Compara dos instrucciones para un diálogo breve de aprendizaje de idioma con el mismo texto sintético. Evalúa solo fidelidad, corrección visible y parada ante datos faltantes; no afirmes dominio.

## Lista de aceptación

- [ ] Cambio solo modelo, flujo o permiso por ronda.
- [ ] Mantengo separados primer pase, retry y `not_comparable`.
- [ ] Mi decisión nombra tarea, condiciones, alcance, incógnitas y próxima prueba.

## Fuentes y límite de mantenimiento

Las condiciones fijas y registros de evidencia son estables. Modelos, precios, límites, superficies y disponibilidad cambian y se registran en cada ejecución.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="18-content-design-data-automation-ES.md" aria-label="Capítulo anterior: Capítulo 18 · ruta de contenido, diseño, datos y automatización">← Anterior<br><strong>Capítulo 18 · ruta de contenido, diseño, datos y automatización</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="20-personal-codex-work-system-ES.md" aria-label="Capítulo siguiente: Capítulo 20 · construir un sistema personal de trabajo con Codex">Siguiente →<br><strong>Capítulo 20 · construir un sistema personal de trabajo con Codex</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
