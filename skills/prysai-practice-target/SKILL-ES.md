<!-- content_id: prysai-practice-target | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# Objetivo de práctica

Convierte un deseo amplio en algo pequeño, honesto y listo para usar en un
prompt. Conserva las palabras de la persona, pero cambia etiquetas generales
como «fluido», «experto» y «mejor» por un desempeño concreto en una situación.

## Asume solo el momento de fijar el objetivo

Usa este Skill antes de una sesión de práctica guiada por un LLM cuando hay un
objetivo pero todavía no existe un primer intento acotado. Prepara la
derivación; no enseña, corrige, califica ni crea un plan de curso largo.

Deriva en vez de ampliar el objetivo:

- ya existe un intento y se busca retroalimentación, corrección o práctica con un caso modificado: `prysai-learning-coach`;
- se necesita redactar una petición textual no enviada: `prysai-dialogue-brief`;
- se quiere inspeccionar una primera petición existente: `prysai-first-turn-check`;
- el objetivo depende de hechos, fuentes o una conclusión «mejor»: `prysai-source-investigator` o `prysai-research-router`;
- entran archivos, herramientas, cuentas, una persona real, un examen, una publicación, un pago u otro efecto externo: `prysai-task-protocol`.

No solicites registros privados, diagnósticos, credenciales, datos de empresa o
escuela ni respuestas de un examen. Fijar un objetivo no concede autoridad
para ninguna acción posterior.

## Pregunta por la decisión más pequeña

Empieza con el objetivo ya expresado. Si falta una decisión, haz exactamente
una pregunta sencilla. Prefiere «¿Qué situación quieres resolver primero?» a
«¿Cuál es tu nivel?».

Establece solo estos campos:

```text
practice_target: algo que la persona dirá, escribirá, elegirá, explicará o hará
situation: un contexto cotidiano donde importe
baseline: un intento diminuto sin ayuda, o not_run
session_budget: un límite de tiempo o turnos
allowed_help: ninguna, una pista, un límite de consulta o material suministrado
visible_check: lo que el lector pueda inspeccionar en el intento
fallback: la versión más pequeña si el primer intento resulta demasiado difícil
```

Rechaza un plazo fijo como objetivo. «Francés en siete días» puede convertirse
en «pedir la hora de un tren y resolver una respuesta de sí/no en un intercambio
escrito de cuatro turnos en francés». No puede convertirse en una afirmación
de fluidez, nivel, conversación oral ni resultado de siete días.

## Devuelve una sola derivación utilizable

Cuando los campos sean suficientes, devuelve exactamente:

```text
target_status: ready_for_first_attempt | needs_one_answer | out_of_scope | blocked
practice_target:
situation:
baseline:
session_budget:
allowed_help:
visible_check:
fallback:
copy_ready_next_message:
handoff:
claim_limit: a selected target is not evidence of learning, retention, transfer, proficiency, or model quality
content_status: candidate
```

Haz que `copy_ready_next_message` sea breve y natural. Debe pedir al modelo
receptor que espere la primera respuesta, conserve el intento y no entregue
una respuesta pulida antes de que la persona lo intente. No conviertas el
comprobante en una evaluación, nota, personaje, promesa ni plan de doce pasos.

Para un objetivo sin resolver, devuelve `needs_one_answer` con una sola
pregunta y ningún plan inventado. Para un objetivo de alto riesgo, crítico
para la seguridad o restringido por un examen, devuelve `blocked` y nombra la
siguiente ruta cualificada o autorizada.

## Comprueba antes de derivar

Acepta el resultado solo cuando nombre un desempeño observable, un contexto,
un primer intento limitado, una regla de ayuda, un control visible y una
alternativa menor. Mantén visibles todos los desconocidos. El objetivo está
listo solo para comenzar la práctica; no demuestra que la persona esté lista.

## Registro de mantenimiento

- `source`: método original de Prysai Lab derivado del registro de práctica candidato de seis etapas, Beginner Practice Pack y límite de Learning Coach
- `license`: reescritura original; las fuentes enlazadas siguen siendo solo de referencia según `docs/sources/asset-register.md`
- `owner`: learning-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-11-14`
- `content_status`: `candidate`
