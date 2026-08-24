<!-- content_id: first-win-pilot-protocol-v2 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: first-win-pilot-protocol-v2.md | source_revision: 2026-08-23 -->

# Protocolo piloto First Win v2

**Estado:** protocolo candidato; no hay reclutamiento, sesión de participantes ni resultado registrado.

## Decisión que puede informar el piloto

¿Una persona que lee la guía por primera vez puede detectar un hecho de fuente omitido y otro añadido sin respaldo en un mensaje breve generado por un modelo, usar el método First Win y repetir la comprobación en un mensaje no visto?

El piloto puede mejorar tarea, rúbrica, redacción y orden de la ruta. No puede establecer eficacia docente, retención, capacidad general de escritura, fiabilidad del modelo, demanda, popularidad ni superioridad frente a otro curso.

## Constructo estrecho

El único constructo evaluado es:

> Identificar errores de fidelidad a la fuente en una respuesta breve del modelo y hacer la corrección mínima sin añadir información no respaldada.

No puntúes confianza, gusto, cortesía, sofisticación gramatical, longitud del prompt, preferencia de modelo ni capacidad de Codex.

## Participantes y autoridad

Recluta 5–8 adultos que hayan usado un modelo conversacional pero no esta guía. Es una muestra de principiantes con experiencia, no evidencia de una primera sesión. La primera ronda depura el instrumento, no estudia eficacia. Usa un commit fijo o un candidato Pages inmutable durante todo el turno.

Antes de reclutar, nombra canal de reclutamiento, responsable de privacidad, moderador, evaluador independiente, periodo de conservación y fecha de borrado. La participación debe ser voluntaria. No reclutes menores, subordinados directos, estudiantes cuyo resultado pueda verse afectado ni personas para quienes rechazar suponga presión.

No recojas nombres, contactos, chats en bruto, datos de cuenta, archivos privados, material del empleador, información de salud/finanzas ni grabaciones de pantalla. Conserva solo código aleatorio de sesión, banda general de experiencia, condiciones, artefactos puntuados, tiempo, ayuda usada, primer abandono y nota de observación saneada.

## Condiciones fijas

Registra antes de la primera sesión: revisión del protocolo y SHA candidato; URL de entrada y locale; navegador y viewport; modelo y superficie con ajustes visibles; moderador y evaluador independiente; revisión de rúbrica, fin de retención y responsable de borrado.

Mantén fijos modelo, prompts, orden, rúbrica y versión visible del sitio durante la ronda. Si algo cambia, detén la ronda y empieza otra revisión. Incluye sesiones abandonadas y excluidas en el agregado.

## Paquete del piloto ligado al commit

Antes de una sesión autorizada, genera un paquete solo local con el [contrato pilot-kit](../governance/first-win-pilot-kit.yaml). Copia la hoja fija del participante, guía del moderador, clave del evaluador, registros vacíos y plantilla agregada, y escribe los resúmenes exactos del commit. El generador rechaza commit inválido, directorio no vacío, alias mal formado, mismo alias para moderador/evaluador independiente, retención vencida o URL con credenciales, query o fragmento. Los dos evaluadores deben ser personas distintas; los alias hacen auditable la separación sin nombres. El generador no recluta, contacta ni recoge datos, y no demuestra aprobación.

Cuando autoridad, privacidad, retención y revisión independiente estén confirmadas, ejecuta desde la raíz:

```text
python scripts/first_win_pilot_kit.py \
  --candidate-sha <full-40-character-commit-sha> \
  --output-dir .work/first-win-pilot/<round-label> \
  --pilot-authorizer <role-alias> \
  --privacy-owner <role-alias> \
  --moderator <role-alias> \
  --independent-scorer <role-alias> \
  --deletion-owner <role-alias> \
  --recruitment-channel <approved-channel-alias> \
  --retention-end <YYYY-MM-DD> \
  --locale <locale> \
  --model-surface <surface-label> \
  --browser-os-viewport <environment-label>
```

Antes de la primera sesión ejecuta `python scripts/first_win_pilot_kit.py --validate-package <local-package-path>` y compara `manifest.json` con el commit. No guardes datos de participantes en el paquete; los CSV vacíos solo definen campos. La clave queda con moderador y evaluador, nunca con el participante. `prepared_no_recruitment_or_participant_run_recorded` sigue siendo preparación, no evidencia.

## Fase 1 — línea base sin ayuda

No muestres prompt, ejemplo, checks ni rescue prompt de First Win. Enseña esta fuente ficticia:

> La sesión informativa de voluntariado empieza el martes a las 3. Trae la lista impresa. Si no puedes asistir, envía un mensaje a la coordinación.

Y esta respuesta defectuosa:

> La sesión informativa empieza el martes a las 3 en la sala 204. Si no puedes asistir, envía un correo a la coordinación.

Pide marcar todos los problemas de fidelidad y escribir un mensaje corregido. No expliques cuántos ni qué tipos de defectos hay. La clave fija tiene tres hallazgos: se omitió `Bring the printed checklist`, se inventó `Room 204` y se cambió `message` por el método no respaldado `email`.

## Presentación del estudio

El calentamiento público opcional mantiene oculto el ejemplo aceptable hasta que se seleccionen los tres estados de comprobación. Esa compuerta pertenece a la superficie pública; la hoja de estudio debe ligar fuente, prompt, checks, rescue prompt, compuerta de comparación y límite a un commit. Registra URL y digest. No llames a sus resultados uso público sin ayuda.

Antes de la línea base, haz una observación pública separada y sin puntuación: si se distingue la ruta recomendada de Codex del calentamiento, se localiza la primera tarea local, se entiende que el ejemplo es ilustrativo y se llega a los checks. Mantén esta observación separada de las puntuaciones. Elegir el calentamiento no significa elegir ni completar la ruta local. No enseñes hoja, prompt, ejemplo, checks, rescate ni clave hasta terminarla.

## Fase 2 — instrucción First Win

Abre la hoja ligada al commit. El participante usa la fuente fija, copia el prompt y conserva la primera respuesta del modelo antes de reparar. Para cada check registra `PASS / FAIL / UNSURE` y las palabras exactas que lo sostienen; bloquea el juicio antes de revelar el ejemplo.

Si todo pasa, registra `not_observable_no_failure`, no éxito de recuperación. Después muestra la respuesta defectuosa y pide encontrar el primer check fallido y usar el mismo rescue prompt:

> El taller empieza el viernes a las 10 en el estudio B. Trae tus notas. Si no puedes asistir, envía un correo al organizador.

Si el ejemplo apareció antes del primer juicio, registra `example_exposed`, excluye la comparación puntuada de la fase 2 y continúa solo con la observación pública. No descartes automáticamente la línea base ni las retenciones posteriores.

Registra si la persona distingue hechos de fuente e información ausente, acepta `UNSURE`, encuentra el primer check fallido sin ayuda, cambia solo lo necesario y explica qué no demuestra el ejercicio.

## Fase 3 — transferencia inmediata no vista

No entregues el prompt del taller. Muestra esta fuente ficticia nueva:

> La cita de reparación es el lunes a las 8. Deja sin cerrar la puerta lateral. Llámanos si ya no te viene bien la hora.

La persona escribe una instrucción breve, revisa la respuesta y la corrige si hace falta. Conserva cinco registros: instrucción, primera respuesta, hallazgos marcados, respuesta final y diff antes/después. Una primera respuesta correcta no prueba que haya comprobado; puntúa detección solo con los hallazgos marcados. Usa `no_correction_needed` si no había corrección y registra toda ayuda, incluso reabrir First Win o copiar texto.

## Fase 4 — transferencia diferida no vista

Tras 48–72 horas, usa otro dominio sin prompt, checks, ejemplo ni texto de rescate originales:

> Las solicitudes cierran el jueves al mediodía. Adjunta una muestra de trabajo. Contacta con la oficina del programa si el formulario no se abre.

Pide instruir al modelo, inspeccionar y corregir errores de fidelidad. Conserva los mismos cinco registros. Anota si la persona vuelve; no sustituyas datos diferidos ausentes por la última puntuación.

## Registro de sesión

Una fila por fase, conservando ambas columnas de evaluador:

```text
session_code | phase | timer_start | timer_end | completed | first_answer
participant_instruction | marked_findings | check_1 | check_2 | check_3
help_code | recovery_branch | final_answer | before_after_diff | drop_off
example_exposed | scorer_a_dimensions | scorer_b_dimensions | disagreement
```

En la fase 2 inicia el cronómetro al mostrar la fuente y detenlo al bloquear los tres juicios y terminar la reparación o registrar `not_observable_no_failure`. Informa distribución de tiempos y cantidad igual o inferior a 15 minutos. La etiqueta de 15 minutos sigue siendo objetivo no verificado, no umbral de aprobación.

`help_code` permitido: `none`, `reopen_first_win`, `copy_text`, `moderator_clarification`, `other_recorded`. Recuperación permitida: `independent`, `seeded`, `not_observable_no_failure`, `not_attempted`, `stopped`. Una fase solo está completa con todos sus campos obligatorios; ausencia no equivale a cero.

## Rúbrica

Puntúa artefactos de línea base y transferencia sin conocer la fase cuando sea posible.

| Dimensión | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Hechos requeridos | faltan/cambian dos o más | falta/cambia uno | todos conservados |
| Hechos sin respaldo | dos o más añadidos | uno añadido | ninguno |
| Acción solicitada | ausente o cambiada | presente pero ambigua | clara y conservada |
| Alcance de corrección | introduce defecto | corrige y cambia de más | mínima suficiente |

Dos evaluadores puntúan cada artefacto por separado. Conserva ambas notas y el motivo de desacuerdo; informa acuerdo bruto y desacuerdos por dimensión, sin ocultarlos en un promedio. Si no aplican la rúbrica con consistencia, revísala.

## Parada y seguridad

Detén la sesión si se intenta usar material privado, se percibe como evaluación laboral/académica, hay malestar o se necesita acción externa. Elimina el material privado y registra solo una parada de seguridad.

Detén la ronda y revisa el instrumento si dos participantes interpretan el encargo de forma incompatible, la clave tiene una ambigüedad, la superficie no mantiene condiciones fijas, el ejemplo aparece antes del juicio inicial en dos sesiones o no se cumplen minimización y consentimiento.

## Informe agregado

Publica solo un agregado desidentificado: reclutamiento/exclusiones, completados/retornos, abandonos, desviaciones, desacuerdos de rúbrica, distribuciones basal/inmediata/diferida, tiempos de fase 2 y recuento de 15 minutos, recuperación independiente/sembrada, `not_observable_no_failure`, ayuda, incidentes y cambios del instrumento.

Con 5–8 participantes usa solo conteos y distribuciones descriptivas. No afirmes significación ni que la guía funciona. Un estudio posterior requeriría instrumento estable, resultado principal predeclarado, tamaño justificado, condición comparativa y decisión ética/privacidad adecuada.

## Límite de evidencia

Escribir o validar este protocolo no aporta evidencia de aprendizaje. Una ronda puede producir evidencia de usabilidad y medición para esta revisión exacta, pero no cierra Q-001 o Q-002 ni eleva el estado actual de curso, First Win, Labs o fixtures.
