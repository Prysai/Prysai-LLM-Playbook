<!-- content_id: prysai-platform-fact-watch | locale: ES | language: es | default_locale: EN | translation_status: candidate | translated_from: EN | source_revision: b4d1303 | source_license: project-owned CC-BY-4.0 -->

# Vigilancia de hechos de plataforma

Convierte «esta plataforma puede haber cambiado» en una decisión de mantenimiento
pequeña y documentada. Este Skill inventaría las afirmaciones existentes y su
alcance potencial. No navega, no ejecuta un producto, no publica una versión ni
sustituye una revisión de fuentes.

## Empieza con una ficha de afirmación

Exige una plataforma concreta, una afirmación respaldada por una fuente o un
`claim_id`, su ubicación actual de cara a quien lee, el responsable y la URL de
la fuente, la fecha de la última comprobación, el alcance, la persona responsable,
la próxima revisión y el motivo de la revisión. Si falta un campo, marca la ficha
como `unreviewed`; no lo trates como un espacio inocuo.

Mantén la afirmación acotada. «Claude Code tiene un modo de permisos» y «Grok
Build tiene una ruta de API» son fichas distintas. El nombre de una plataforma,
una etiqueta de función o una respuesta HTTP no sustituyen a una afirmación.

## Clasifica la señal de cambio

Elige un solo estado sin inferir el comportamiento actual del producto:

- `review_due`: ha llegado la fecha de revisión programada o la fuente no se ha
  comprobado dentro del intervalo declarado;
- `source_changed`: una revisión fechada de una fuente oficial de primera mano
  informa de una diferencia material respecto de la afirmación registrada;
- `source_unavailable`: la fuente citada no permite respaldar la afirmación en
  este momento;
- `scope_changed`: la afirmación quizá ya no sea válida para la superficie,
  cuenta, región, versión o límite de permisos indicado;
- `no_change_recorded`: una revisión fechada de primera mano encontró la misma
  afirmación dentro del alcance registrado;
- `unreviewed`: no hay una revisión adecuada de primera mano.

No elijas `no_change_recorded` basándote en la memoria, una URL redirigida, un
fragmento de resultados, una publicación de la comunidad o un inicio de sesión
correcto. Una comprobación de fuente confirma una afirmación solo para la fecha
y el alcance registrados.

## Mapea la superficie didáctica afectada

Enumera cada unidad canónica afectada e indica su función:

```text
claim_id:
platform / surface:
source owner / URL:
last_checked / next_review:
change_status:
affected_units:
  - path | role: stable_core | adapter_fact | task_step | Lab | Skill | route | generated_page
reader_risk: none | clarification | pause_named_step | remove_current_claim
safe_interim_text:
owner:
next_action:
```

Los principios del núcleo estable —como autoridad explícita, evidencia,
recuperación y el mínimo efecto secundario— normalmente siguen siendo válidos.
Un comando de producto, una ruta de interfaz, un valor predeterminado de
permisos, un precio, una prestación, una integración o la disponibilidad de un
modelo son hechos del adaptador y requieren una revisión de la fuente. No
conviertas un cambio de fuente en la afirmación de que todo el curso ha dejado
de servir.

## Elige la acción segura más pequeña

- `no_change_recorded`: conserva la redacción acotada y actualiza solo el
  comprobante de revisión; no afirmes una vigencia más amplia.
- `review_due` o `unreviewed`: conserva el núcleo universal, marca el paso
  indicado para revisión y deriva el hecho actual a
  `prysai-source-investigator`.
- `source_changed`, `source_unavailable` o `scope_changed`: pausa o retira el
  paso didáctico indicado hasta que una revisión de fuentes establezca una
  redacción sustituta. Conserva el registro anterior como evidencia histórica.
- si el cambio pone en duda la fuente, la ejecución, la autoridad o el registro
  de fallos del adaptador, deriva la decisión de admisión a
  `prysai-platform-adapter-review`;
- si una afirmación pública, una página generada o una nota de versión ya
  presenta el hecho antiguo, deriva el paquete de artefactos a
  `prysai-evidence-review` antes de publicar una corrección.

Nunca reescribas en silencio un procedimiento de producto basándote en la
memoria. No clasifiques un adaptador como admitido, seguro, equivalente o
`production-ready` a partir de un comprobante de vigencia.

## Devuelve un comprobante de mantenimiento

Devuelve exactamente un registro que contenga la ficha de afirmación, el estado
del cambio, las unidades afectadas, el riesgo para quien lee, el texto provisional
seguro, la derivación para revisar la fuente, cualquier derivación de revisión del
adaptador o de auditoría de la afirmación, la persona responsable, la próxima
revisión y los elementos desconocidos.

Termina con este límite: `This receipt manages the freshness boundary of one named
platform claim. It does not prove current product behavior, account access,
permission safety, runtime success, adapter admission, model quality, learner
outcome, or cross-platform equivalence.`

## Registro de mantenimiento

- `source`: método original de mantenimiento de Prysai Lab derivado de ADR-0025,
  el ciclo de vida del contenido, el registro de impacto de hechos y el registro
  de admisión de adaptadores con fuentes acotadas
- `license`: reescritura original; la documentación de plataformas de primera
  mano y los informes públicos siguen siendo material de referencia según
  `docs/sources/asset-register.md`
- `owner`: facts-maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
