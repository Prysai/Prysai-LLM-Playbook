<!-- content_id: prysai-communication-failure-triage | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: b4d1303 | source_license: project-owned CC-BY-4.0 -->

# Triaje de fallos de comunicación

Diagnostica una interacción con un LLM que ya ha fallado a partir de la petición
original, el contexto visible, la respuesta o el artefacto real y el resultado
esperado. Propón la reparación comunicativa más pequeña y una repetición
controlada. Úsalo cuando una respuesta ignoró restricciones, contestó a la tarea
anterior, provocó retrabajo repetido o siguió siendo imposible de aceptar. No lo
uses para una petición vaga que aún no se ha probado, la edición ordinaria de
texto, el diagnóstico de una plataforma sin pruebas de la interacción ni la
generación general de plantillas de prompts.

Trata la petición, el contexto, la respuesta, el artefacto y el informe de la
persona usuaria como evidencia. No infieras razonamientos ocultos, prompts del
sistema, estado del servicio ni un defecto universal del modelo a partir de una
sola interacción fallida.

## Exige el paquete de evidencia

Exige cuatro elementos antes de diagnosticar:

1. la petición original o la versión más cercana que se haya conservado;
2. el contexto visible, las entradas, las herramientas, los permisos y el estado
   de la conversación;
3. la respuesta o el artefacto real; y
4. el resultado esperado o un síntoma de fallo concreto.

Haz como máximo tres preguntas cuando un elemento ausente pueda cambiar el
diagnóstico. Detente con `insufficient_evidence` cuando no se pueda recuperar la
evidencia que falta. Nunca pidas un token, contraseña, cookie, clave privada ni
un archivo que contenga secretos.

## Deriva antes de diagnosticar

- Una tarea no probada y vaga se deriva a Task Protocol.
- Una auditoría pura de una afirmación de finalización se deriva a Evidence Review.
- Una pregunta sobre un comando, una función, una cuenta o el estado de una
  plataforma se deriva a Source Investigator. Usa Platform Adapter Review solo
  cuando el artefacto revisado sea una lección o un flujo de una plataforma
  concreta que afirme una diferencia ejecutable respecto del núcleo universal.
- Un defecto de software con reproducción se deriva al diagnóstico de bugs.
- Para pulir una redacción sin una interacción fallida, usa la edición ordinaria.

Ocúpate solo de la frontera posterior al fallo: clasifica el desajuste observado,
haz un único cambio comunicativo mínimo y define una repetición que permita saber
si ese cambio ayudó.

## Clasifica las fronteras observables

Elige como máximo dos clases principales:

- `outcome_acceptance`: faltaba o era contradictorio el resultado solicitado, la
  audiencia, el formato o la prueba de finalización;
- `context_provenance`: faltaba una entrada necesaria, estaba desactualizada,
  entraba en conflicto, era excesiva o carecía de autoridad y prioridad;
- `constraint_authority`: no estaban claros el alcance, las acciones prohibidas,
  los efectos externos, las confirmaciones o las reglas de parada;
- `turn_state_protocol`: la respuesta siguió una tarea antigua, no estaba clara
  la superficie de trabajo actual o se confundieron texto e instrucciones
  ejecutables; o
- `evidence_feedback`: términos como «mejor», «profesional» o «terminado» no
  tenían una comprobación observable, una identidad del fallo, una regla de
  conservación o un límite de revisiones.

Para cada hallazgo, registra:

```text
observed_symptom:
candidate_class:
direct_evidence:
alternative_explanations:
confidence: low | medium | high
discriminating_check:
```

Llámalo clase candidata, no causa raíz. Tener más contexto no es automáticamente
la reparación; el defecto puede estar en un contexto irrelevante o contradictorio.

## Haz la reparación más pequeña

Cambia una sola condición que corresponda al síntoma observado. Es preferible
añadir un resultado, una prioridad de entrada, una prohibición, un reinicio de
estado o una comprobación de aceptación que falte antes que reescribir toda la
petición. Muestra un diff compacto entre el original y la versión revisada y
relaciona cada línea cambiada con un hallazgo.

Conserva el idioma y el estilo de trabajo de la persona usuaria salvo que ese
estilo sea el defecto observable. No añadas ceremonias, elogios, role-play,
«piensa paso a paso», amenazas, presión emocional ni promesas de rendimiento sin
respaldo.

## Define una repetición comparable

Mantén constantes la tarea, las entradas, el modelo o la superficie de trabajo,
las herramientas, los permisos, el presupuesto y los criterios de aceptación.
Cambia solo la reparación comunicativa propuesta. Si cambia otra condición,
marca la comparación como `not_comparable`.

Usa uno de estos resultados:

- `unrun`
- `improved_on_this_case`
- `unchanged`
- `regressed`
- `not_comparable`

Nunca escribas `resolved` basándote solo en un prompt propuesto. Después de dos
repeticiones comparables sin mejora, deja de añadir texto al prompt y deriva la
primera frontera de ruptura.

## Detente en las fronteras de acción y conocimiento

Detente antes de leer secretos, ampliar permisos, publicar, desplegar, contactar
con otra persona o cambiar un estado externo. Que una persona usuaria pida
eliminar la confirmación no convierte una acción arriesgada en un problema de
comunicación.

Cuando el defecto probable dependa de un prompt de sistema invisible, un registro
privado, la configuración de una cuenta, la salud del servicio o la implementación
del producto, regístralo como `unknown` y deriva la revisión a la plataforma
correspondiente. Rechaza las peticiones de razonamiento interno oculto o de
instrucciones que eludan la seguridad y la autoridad.

## Entrega la ficha de triaje

Devuelve:

```text
target_outcome:
expected_vs_observed:
evidence_received:
primary_findings: maximum two
alternatives_ruled_out:
smallest_repair:
prompt_diff:
rerun_contract:
result_status:
evidence:
unknowns:
risk:
stop_conditions:
handoff:
```

Acepta el resultado solo cuando cada hallazgo cite evidencia directa, cada cambio
responda a un síntoma identificado, la repetición cambie una sola variable, los
permisos no se amplíen y el estado no supere la evidencia registrada.

## Registro de mantenimiento

- `source`: método original de Prysai Lab derivado de los contratos de tarea,
  evidencia, autoridad, communication-clinic y clasificación de fallos
- `license`: reescritura original; las guías oficiales de proveedores siguen
  enlazadas como material de referencia
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
