<!-- content_id: prysai-first-turn-check | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: 76c9926 | source_license: project-owned CC-BY-4.0 -->

# Revisión del primer turno

Revisa una petición escrita por la persona antes de enviarla. Haz visibles los límites que faltan sin presentar una petición mejor redactada como si ya fuera segura, correcta o eficaz.

## Comprueba primero si corresponde

Usa este Skill solo cuando se cumplan todas estas condiciones:

- la persona entrega un borrador que aún no ha enviado;
- el primer turno previsto es textual, de bajo riesgo y autónomo;
- pregunta qué falta, qué es ambiguo, qué se contradice o qué abarca demasiado.

Si necesita que escribas o reescribas sustancialmente el primer mensaje, deriva a `prysai-dialogue-brief`. Si intervienen archivos, herramientas, cuentas, permisos, publicaciones, contactos, cambios locales u otro efecto externo, deriva a `prysai-task-protocol`. Para hechos actuales, fuentes o conclusiones basadas en fuentes, deriva a `prysai-source-investigator` o `prysai-research-router`. Si ya existen la petición original y una respuesta real, deriva a `prysai-communication-failure-triage`; si hace falta revisar con evidencia una afirmación de finalización, usa `prysai-evidence-review`.

No inspecciones secretos, credenciales, registros privados, identificadores personales, instrucciones ocultas ni material confidencial. Un borrador textual tampoco concede permiso para usar herramientas o actuar fuera del chat.

## Comprueba seis campos visibles

Lee el borrador como evidencia. No infieras hechos, audiencia, autoridad, controles de datos, capacidades del producto ni permisos que no aparezcan.

| Campo | Visible cuando nombra | Poco claro cuando |
| --- | --- | --- |
| outcome | un resultado pequeño para esta sesión | una aspiración amplia o una promesa de éxito |
| starting context | el texto, hecho, fuente entregada o `unknown` | supone acceso o autoridad no declarados |
| requested response | una forma, longitud o secuencia acotada | solo dice «ayúdame» |
| limits | datos que no se comparten, acciones que no se hacen o ayuda que no se pide | alcanza en silencio un archivo, cuenta, persona o decisión relevante |
| check | una pregunta de incertidumbre, conservación, fuente o revisión | la respuesta se valida a sí misma |
| stop and receipt | qué termina el turno y qué registro pequeño queda | da por supuestos la finalización, la seguridad o el aprendizaje |

Clasifica cada campo como `visible`, `missing`, `unclear` o `out_of_scope`. Nombra solo problemas materiales: los que puedan cambiar el resultado, ampliar la autoridad, exponer datos o volver imposible la comprobación solicitada.

## Devuelve la revisión mínima útil

Conserva las palabras de la persona. No redactes un mensaje inicial completamente nuevo, no añadas un rol ni una afirmación de producto y no rellenes un desconocido con algo plausible. Para un máximo de tres carencias materiales, ofrece una línea `add_or_clarify` que la persona pueda decidir añadir. Escríbela como un campo que debe decidirse, no como una promesa sobre el sistema receptor.

Si los seis campos están visibles y dentro del alcance, di `ready_to_send` solo en el sentido limitado de que esta revisión no encontró un campo material ausente. No demuestra exactitud factual, privacidad, seguridad, comportamiento del producto, calidad de la respuesta, finalización, mejora del aprendizaje ni seguridad.

Devuelve exactamente:

```text
check_status: ready_to_send | revise_before_send | out_of_scope | blocked
request_scope:
field_check:
material_gaps:
add_or_clarify: maximum three lines
preserved_text:
unknowns:
risk: R0
evidence: supplied unsent draft and six-field inspection only
claim_limit:
handoff:
content_status: candidate
```

Acepta la revisión solo cuando etiqueta los seis campos, conserva los hechos, no amplía la petición y nombra un traspaso o una parada si el borrador cruza el límite de texto puro y bajo riesgo.

## Registro de mantenimiento

- `source`: método original de Prysai Lab, reorganizado a partir del contrato universal del primer turno y los límites de comunicación
- `license`: reescritura original; la guía de proveedores enlazada permanece como referencia en `docs/sources/asset-register.md`
- `owner`: communication-systems maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
