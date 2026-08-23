<!-- content_id: prysai-product-context | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: e7c3d8f | source_license: project-owned CC-BY-4.0 -->

# Contexto del producto

Crea un contexto canónico y compacto que el trabajo posterior pueda
reutilizar. Separa los hechos observados, el lenguaje atribuido a clientes,
las decisiones y las hipótesis.

## Límite de activación y derivación

Asume la tarea cuando falta un artefacto compartido de producto, audiencia,
posicionamiento, mensaje, marca, conversión o medición.

Deriva cuando:

- se nombra explícitamente un `$skill`; respétalo y aporta contexto solo si se solicita;
- hace falta recopilar hechos externos: Research Router;
- hay que auditar las afirmaciones de un contexto existente: Evidence Review;
- se pide ejecutar cambios de contenido o lanzamiento: Task Protocol o Workflow Orchestrator;
- se quiere aprender el método de posicionamiento: Codex Coach.

No te conviertas en ejecutor de marketing, sistema de analítica ni sustituto
de la investigación de clientes. No vuelvas a llamar a Product Context para un
entregable posterior salvo que aparezca una brecha material de contexto.

## Entradas necesarias y qué hacer si falta algo

Exige `product_or_project`, `current_goal`, `known_audience`,
`available_sources`, `decision_to_support` y `canonical_location`. Exige
también `decision_owner`, `context_version` y `version_baseline`; la versión
de mantenimiento del Skill no es la versión del contexto del producto.
Inspecciona el contexto existente, su versión o hash actual y su registro de
cambios antes de proponer una modificación. Marca como `hypothesis` o
`unknown` la ausencia de evidencia de clientes, métricas, testimonios, hechos
competitivos y preferencias; formula preguntas concretas para las brechas de
alto impacto.

Por defecto, devuelve un borrador no autoritativo o un diff propuesto. Explicar
o pulir un contexto existente no autoriza a reconstruirlo ni a escribir el
archivo canónico. Antes de escribirlo, exige la ruta exacta, la versión/hash
actual, el alcance de campos modificados, la clasificación de privacidad y la
decisión sobre PII, el responsable, una copia reversible o destino de
reversión, y una confirmación explícita justo antes de escribir. La
confirmación debe nombrar el destino y la acción; iniciar sesión, disponer de
un token o decir «tengo acceso total» no es suficiente. Si falta algún campo,
devuelve `blocked` con `blocked_on` en vez de escribir o crear una entrada en
el registro de cambios. Nunca sobrescribas un contexto existente si no puedes
hacer coincidir el destino, la línea base y el alcance de escritura.

## Captura y versionado

Captura el resumen en una línea, categoría, tipo, objetivo, usuarios y
decisores, trabajos por hacer, anti-personas, problemas, alternativas,
objeciones, diferenciación, puntos de prueba, lenguaje de clientes, palabras
que se deben usar o evitar, glosario, tono, restricciones, acción de
conversión y decisiones de medición. Por cada cambio material, incrementa la
versión y añade una entrada fechada al registro de cambios. Indica al trabajo
posterior qué ubicación y versión son autoritativas.

La entrada del registro debe identificar la versión anterior y la nueva, las
afirmaciones modificadas, la evidencia utilizada, el responsable de la
decisión, los artefactos posteriores afectados, el destino y la reversión. Un
contexto de borrador no es autoritativo hasta que el responsable acepte esa
entrada. Mantén separados el borrador, la escritura confirmada y el cambio
publicado; completar uno no implica los demás.

## Entrega de diseño para el trabajo posterior

Product Context limita el diseño posterior; no escoge un estilo visual por
gusto, no genera una interfaz final ni verifica la calidad visual. Cuando el
artefacto posterior sea una página web, aplicación, presentación, informe u
otro entregable visual, proporciona un `design_handoff` que indique:

- la tarea real del usuario y la decisión que el artefacto debe facilitar;
- la jerarquía de información necesaria y la densidad mínima útil;
- los patrones habituales que los usuarios puedan reconocer sin explicación;
- las señales de confianza, fuentes, avisos, propiedad y contacto requeridos;
- qué fotografías, inventario, datos, lenguaje de clientes, testimonios y activos de marca aprobados existen realmente;
- qué patrones visuales o de texto están prohibidos porque inventarían evidencia o sugerirían una autoridad no respaldada; y
- las vistas objetivo, condiciones de accesibilidad, responsable de la revisión y comprobaciones de aceptación.

Si faltan fotografías reales, inventario, lenguaje de clientes, testimonios o
un sistema de marca aprobado, no rellenes el vacío con texto de estilo de vida,
listados sintéticos, ilustraciones decorativas de propiedades, tipografía serif
editorial sobredimensionada, manchas de gradiente suave, tarjetas flotantes o
exceso de esquinas redondeadas. Prefiere una guía del comprador, explicación
del servicio, lista de comprobación, comparación o herramienta de decisión
cuyo valor no dependa de evidencia inventada. Un artefacto visualmente pulido
sigue sin verificarse hasta renderizarlo y revisarlo en las condiciones
declaradas.

## Riesgo, efectos secundarios y confirmación

Redactar a partir de fuentes suministradas es `R0` o `R1`. Escribir el archivo
canónico es `R1` solo cuando consten el destino local exacto, la línea base, la
copia, la decisión de privacidad, la reversión, el responsable y la
confirmación inmediata. Publicar, cambiar un sitio activo, recopilar datos
personales, enviar mensajes o modificar analítica es `R2` o superior y exige
derivarlo a Task Protocol o Workflow Orchestrator con destino, alcance,
responsable y confirmación exactos. Mantén fuera la información que identifica
a una persona salvo que sea necesaria y esté autorizada; no copies registros
brutos de clientes a un contexto solo porque se hayan proporcionado.

## Paradas firmes

Detente con `blocked` si no están claros la identidad del producto, el
responsable de la decisión, la ubicación canónica, la procedencia, la
privacidad, la línea base, el estado actual, la copia, la reversión o la
confirmación de escritura. Detente también si el cambio sobrescribiría una
decisión no revisada, expondría PII o excedería el alcance solicitado. Nunca
conviertas una suposición en prueba, un borrador en afirmación de cliente ni
una actualización de contexto en permiso de publicación.

## Salida fija

Devuelve exactamente:

1. `context_scope_and_owner`
2. `authoritative_version_and_location`
3. `observed_facts`
4. `hypotheses_and_unknowns`
5. `audience_and_jobs`
6. `positioning_and_message_constraints`
7. `proof_points_and_evidence_gaps`
8. `changelog_entry`
9. `downstream_handoff`
10. `design_handoff`
11. `risk_and_permissions`: incluye `risk`, `action_state` (`draft_only`, `write_blocked`, `write_confirmed` o `handoff_required`), destino exacto, decisión de privacidad, responsable, confirmación, copia/reversión y condiciones de parada
12. `content_status`

## Evidencia y correspondencia de estados

Etiqueta cada afirmación como `observed`, `attributed`, `hypothesis`,
`decision` o `unknown`. Verifica una propuesta comprobando cada afirmación
material contra su fuente, comparando sus campos con la línea base, revisando
la clasificación de privacidad y el alcance modificado, y confirmando que el
responsable pueda inspeccionar el diff. Esto verifica la propuesta, no el
impacto en clientes ni la ejecución posterior. Usa `draft` antes de revisar
fuentes y propiedad, `candidate` cuando exista un contexto versionado pero
falten comprobaciones nuevas de partes interesadas o fuentes, `verified`
cuando pase la evidencia y la revisión declaradas, y `production-ready` solo
tras superar privacidad, publicación, mantenimiento y reversión. Verificar el
contexto no verifica las afirmaciones posteriores.

## Registro de mantenimiento

- `source`: `docs/charter.md`; `CONTEXT.md`; `docs/quality/skill-quality-standard.md`
- `license`: reescritura original; el material de clientes o externo sigue sujeto al permiso de su fuente
- `owner`: product-context maintainer
- `version`: `0.3.0`
- `review_date`: `2026-09-09`
- `content_status`: `candidate`
