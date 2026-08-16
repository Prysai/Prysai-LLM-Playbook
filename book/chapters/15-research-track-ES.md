<!-- content_id: chapter-15-research-track | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 15: ruta de investigación, de la pregunta al conocimiento auditable

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Este capítulo enseña disciplina de investigación; sus casos públicos son entradas didácticas, no reproducciones locales ni dictámenes oficiales.

## El problema

«Investiga esto» puede querer decir hallar hechos, comparar opciones, revisar bibliografía, formular una pregunta, escribir un informe o auditar un borrador. Sin acotar primero, un Agent puede convertir fragmentos de búsqueda en conclusiones, tratar una URL inaccesible como leída o obedecer una instrucción escondida en un documento externo.

> La capacidad no es producir una revisión más larga. Es dejar una cadena en la que cada afirmación importante se pueda rastrear hasta una pregunta, fuente, ubicación, nivel de evidencia y revisión humana.

## Convierte el tema en una pregunta respondible

Define objeto, relación o comparación, alcance, tiempo, audiencia y finalidad de salida. «Investiga problemas de inicio de sesión» no basta. Una pregunta útil además define inclusión, exclusión, fuentes prioritarias, punto de corte y formato: tabla de hechos, comparación, brief o borrador citado.

Busca síntomas antes que causas. Prepara grupos de consultas por síntoma, límite y entorno. No conviertas una causa sospechada en tu única consulta. Registra términos, fecha y zona horaria, alcance de fuente, enlaces originales, exclusiones y condiciones de parada. Un snippet, un agregador o una lista generada son pistas, no evidencia.

Detente cuando las afirmaciones importantes tengan ruta de evidencia, hayas usado al menos una consulta inversa, dos rondas distintas no añadan entorno ni contraejemplo, llegue la fecha de corte, el alcance no permita generalizar o una fuente pida secretos, permisos mayores o scripts desconocidos.

## Construye una cadena de artefactos

```text
intención → pregunta → plan de fuentes → recuperación y lectura
→ extracción → conflictos y huecos → síntesis → citas → revisión → entrega versionada
```

| Etapa | Artefacto | Condición de salida |
|---|---|---|
| Acotar | Pregunta, alcance y paradas | Se ve si la respuesta exagera |
| Planificar | Prioridades, consultas, fechas y acceso | Las afirmaciones importantes tienen ruta |
| Extraer | Tabla de evidencia y ubicación | Cada afirmación vuelve a una fuente |
| Sintetizar | Conflictos, desconocidos y fuerza | Un informe no se vuelve conclusión universal |
| Entregar | Borrador, citas, revisión y versión | Otra persona puede volver a comprobar |

Una fila de evidencia contiene una afirmación atómica, URL original y final, autor u organización, fecha de publicación, acceso y corte, versión, plataforma, alcance, ubicación, tipo de fuente, relación con la afirmación, hecho observado frente a hipótesis, conflicto, auditoría de cita, tono, revisor y siguiente acción.

## Fuentes inaccesibles, conflictos y foros

Un resultado de búsqueda, un `200` o una redirección no prueban lectura. Guarda URL original, estado, destino final, identidad de página, fecha y resultado de lectura. Una página de login, límite de tasa, timeout o error se registra como inaccesible; no se rellena con memoria, título o snippet.

Cuando dos fuentes oficiales difieran, primero compara objeto, fecha, versión, superficie, cuenta, región y definición. Si el conflicto sigue, conserva ambos lados, estrecha el texto y deja el resultado `candidate`. En un foro, separa «la persona observó», «alguien sugirió», «se sospechó» y «un mantenedor confirmó». Muchos votos, un cierre o una respuesta aceptada no sustituyen confirmación ni reproducción.

Una cita pulida generada por IA tampoco es evidencia. Abre la fuente, localiza el pasaje, comprueba título, fecha, versión y alcance; divide la frase si solo respalda una parte. Si una cita clave no se puede localizar, marca `citation_unverified` y reduce o elimina la conclusión.

## Práctica y límite

Parte de una pregunta amplia, prepara una fuente oficial, un informe de campo con URL y fecha, y un elemento inaccesible o conflictivo. Pide primero tres preguntas candidatas, elige una y define alcance, corte, zona horaria y paradas. Diseña consultas por síntoma, límite y entorno; crea plan de fuentes, tabla de evidencia, registro de acceso, conflicto y auditoría de citas. No subas logs, cookies, tokens ni contactos.

Entrega `candidate` si falta evidencia clave: hechos conocidos, desconocidos, conflictos, alcance, motivo de parada y siguiente paso de bajo riesgo. El ejercicio no demuestra investigación completa hasta que las fuentes clave se abran, localicen y revisen independientemente.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="14-discover-and-audit-skills-ES.md">← Anterior<br><strong>Capítulo 14 · descubrir, instalar y auditar Skills externos</strong></a></td><td align="right"><a data-chapter-nav="next" href="16-engineering-track-ES.md">Siguiente →<br><strong>Capítulo 16 · ruta de ingeniería, de la idea al software fiable</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
