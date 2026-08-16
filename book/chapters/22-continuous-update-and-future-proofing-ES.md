<!-- content_id: chapter-22-continuous-update-and-future-proofing | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 22: actualización continua y preparación para el futuro

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Solo trabaja en una copia temporal o rama aislada: no usa credenciales reales, producción, push, release ni reemplazos masivos externos.

## El problema

Los modelos, entradas de Codex, permisos, Skills y servicios cambian. Un flujo útil hoy puede inducir a error meses después si no tiene fuente, alcance, fecha de revisión, plan de migración y rollback. Mantener no significa adoptar cada novedad: significa decidir qué es estable, qué debe verificarse y cuándo retener, bloquear, migrar o retirar una práctica.

## Cuatro capas y cuatro ritmos

| Capa | Ejemplos | Mantenimiento |
|---|---|---|
| Principios estables | El contexto afecta la comprensión; las herramientas cambian el espacio de acción; la evidencia sostiene una afirmación | Enseñanza, experimentos y revisión de límites |
| Uso del producto | Entradas de Codex, invocación de Skills, permisos, configuración | Revisar la página oficial específica |
| Método de dominio | Ingeniería, investigación, marketing, documentación y datos | Práctica y revisión humana |
| Hechos concretos | ID de modelo, precio, cuota, parámetro y API externa | Fuente fechada; migrar o eliminar si cambia |

No confundas estados: la madurez de contenido es `draft | candidate | verified | production-ready`; una afirmación cambiante es `current | stale | disputed | removed`; una observación de ejecución es `planned | authorized | executed | verified | not_run`. Que una fuente esté vigente no vuelve verificado al capítulo.

## Decidir: conservar, actualizar, bloquear o retirar

| Situación | Acción | Salida necesaria |
|---|---|---|
| La fuente autorizada sigue disponible y el alcance coincide | `current`; conservar o ajustar | Fuente, revisión y consumidores afectados registrados |
| Las fuentes discrepan o el comportamiento observado entra en conflicto | `disputed`; suspender afirmación firme | Incógnita y responsable de revisión |
| La fuente ya no está y no hay reemplazo | `stale`; advertir o bloquear | No presentar lo anterior como actual |
| Licencia o seguridad ya no permiten la capacidad | `removed`; retirar | Nota de migración y recuperación |
| Existe sustituto compatible y la migración se evalúa | `current`; publicar migración | Alcance anterior, ruta, evidencia y próxima revisión |

Un cambio sin responsable, evidencia o rollback está `blocked`.

## Acción: registros de afirmación y matriz de impacto

```yaml
claim: "La afirmación concreta"
source: "URL oficial o autorizada"
checked_at: "YYYY-MM-DD"
applies_to: "Producto, versión, región o alcance de cuenta"
owner: "Rol responsable"
next_review: "YYYY-MM-DD"
claim_status: "current | stale | disputed | removed"
```

El flujo es: descubrir cambio → clasificar impacto y riesgo → localizar capítulos, Skills, Labs, tareas y permisos afectados → leer fuente o recopilar evidencia limitada → hacer el cambio mínimo seguro → volver a ejecutar los controles pertinentes → revisión con contexto nuevo → conservar, migrar, bloquear, retirar o publicar.

Para migrar un modelo o Skill, vuelve a revisar primer intento, errores, contexto, herramientas, permisos, triggers, formato, licencia, responsable y recuperación. Actualizar una fuente no prueba acceso de cuenta, ejecución, despliegue ni efecto de equipo.

## Experimento: procesar un cambio hipotético

En una copia temporal crea `update-impact-demo-v1` con una afirmación ficticia y discutida sobre `https://example.invalid/public-doc`. Ese dominio está deliberadamente inaccesible: no lo visites ni lo trates como evidencia. Guarda hash de base, inventario, diff previo y `run_id`.

Supón que la descripción pública cambió pero no hay segunda fuente fiable. Mantén `disputed`, suspende enseñanza definitiva y crea una matriz con filas para capítulo, Skill, Lab, nota de permisos y conjunto de tareas. En cada fila registra consumidor, riesgo, acción mínima, evidencia, responsable y estado. Cambia únicamente el fixture, ejecuta solo comprobaciones relevantes y guarda comando, salida o `not_run`, diff, elementos sin verificar y rollback. La tarjeta debe nombrar `decision_owner`, `delivery_target` temporal, `reviewer` y `rollback_target`; sin uno de ellos queda `blocked`.

El paquete de evidencia contiene afirmación, fuente o registro de ausencia, alcance, responsable, revisión, hashes o diff, matriz, log y lista de incógnitas. El rollback debe restaurar el hash temporal o descartar la copia; «parece restaurado» no es prueba.

## Fallo, transferencia y aceptación

Falla deliberadamente sustituyendo un nombre de modelo en todo el material sin revisar tareas, fuentes, permisos o licencia. Detén el enfoque, conserva el diff fallido en la copia, restaura la base y añade consumidores omitidos. Para un Skill externo real pero anonimizado, decide solo `blocked` o candidato de adaptación hasta revisar licencia, dependencias, triggers, permisos, riesgos, responsable y evaluación.

- [ ] Distingo principios, uso de producto, método de dominio y hechos concretos.
- [ ] Toda afirmación cambiante tiene fuente, fecha, alcance, responsable, revisión y estado.
- [ ] La matriz cubre capítulos, Skills, Labs, tareas y permisos.
- [ ] Diferencio estado de afirmación y madurez de contenido.
- [ ] El ensayo conserva hash, diff, log, rollback e incógnitas.

Los nombres, permisos y comportamientos de producto son hechos cambiantes: revisa fuentes oficiales actuales. El capítulo sigue siendo `candidate`; este ejercicio no prueba comportamiento de producción ni impacto de equipo.

## Tarjeta mínima de actualización antes de publicar

No reemplaces todo el libro porque aparezca un nombre nuevo o una captura de una página. Primero limita el cambio con una tarjeta reversible: deja claro qué cambia, por qué solo eso y qué conclusiones aún no se pueden afirmar.

```yaml
update_id: update-22-example
trigger: "la fuente ya no es accesible o su alcance contradice la explicación actual"
claim_status_before: disputed
affected_units: ["chapter", "lab", "skill", "permission-note", "task-set"]
safe_action: "suspender formulación definitiva; cambiar solo estado y nota del fixture temporal"
validation: "checks estáticos pertinentes o not_run"
unverified: ["comportamiento de cuenta real", "permisos de producción", "efecto en estudiantes"]
rollback_target: "hash base de la copia temporal"
release_decision: blocked
```

`release_decision: blocked` no es fracaso: evita que una conjetura llegue a la versión pública cuando falta segunda fuente, responsable, evidencia o rollback. El estado solo cambia cuando se cierran con evidencia real los puntos no verificados.

## Extensión: rechazar el reemplazo global

Coloca un nombre ficticio de modelo o herramienta en cinco consumidores de un fixture temporal: capítulo, Lab, Skill, nota de permisos y task set. Antes de cambiarlo, clasifica cada aparición como principio estable, uso de producto, método de dominio o hecho concreto.

1. Solo los hechos concretos entran en la cola de revisión de fuentes; un principio estable no se reescribe por cambio de nombre.
2. Cada consumidor necesita riesgo y acción mínima propios; «reemplazar todo» no es análisis de impacto.
3. Si un consumidor no tiene fuente, registro de licencia o rollback, sigue `blocked`; el pase de otras páginas no lo compensa.
4. Cambia un solo fixture, guarda el diff y al final restaura base o descarta la copia temporal.

## Comprobación propia

- [ ] Puedo indicar trigger, alcance, acción mínima, incógnitas y rollback para cualquier afirmación cambiante.
- [ ] No convierto fuente actualizada, archivo existente o CI verde en comportamiento real, efecto en usuarios o release verificado.
- [ ] Sé cuándo detener un release en vez de hacer reemplazo global para «seguir actualizado».

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="21-team-capability-system-ES.md" aria-label="Capítulo anterior: Capítulo 21 · construir un sistema de capacidades para el equipo">← Anterior<br><strong>Capítulo 21 · construir un sistema de capacidades para el equipo</strong></a></td>
      <td align="right"></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
