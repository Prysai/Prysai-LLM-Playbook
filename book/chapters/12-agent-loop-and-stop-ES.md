<!-- content_id: chapter-12-agent-loop-and-stop | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 12: el ciclo, el estado y las condiciones de parada del Agent

**Estado:** `candidate`. **Experimento:** `not_run`. Este capítulo explica un ciclo observable; no prueba el comportamiento de un host, modelo o herramienta concretos.

## El problema

«Deja que el Agent se ocupe» parece una sola acción. En realidad hay propuesta del modelo, decisión del host, ejecución o rechazo de una herramienta, observación, actualización de estado, verificación y una decisión de continuar o parar. Una conclusión segura no sustituye esos hechos.

> La salida de un modelo es una propuesta. El resultado de una herramienta es una observación. Una entrega verificada necesita evidencia del entorno objetivo.

## El ciclo observable

```text
contrato de tarea → leer estado → propuesta del modelo → autorización del host
→ ejecución de herramienta → observación → actualizar estado → comprobación
                                                     ↓
                                  entregar / preguntar / recuperar / detener
```

No confundas estas capas:

| Capa | Puede demostrar | No demuestra por sí sola |
|---|---|---|
| Propuesta | El modelo sugirió un paso | Que fue autorizado o ejecutado |
| Decisión del host | Se permitió, rechazó o pausó una acción | Que el resultado cambió como se esperaba |
| Efecto de herramienta | Hubo inicio, salida, error o diff | Que el cambio cumple el significado pedido |
| Verificación | Un check examinó una regla concreta | Afirmaciones fuera de su alcance |

«Actualizaré el archivo y ejecutaré pruebas» seguido de «hecho» es `unverified` si no hay autorización, comando, salida, diff y alcance de prueba. Registra el primer salto no sustentado en vez de atribuirlo vagamente a una alucinación.

## Escribe el estado

Un checkpoint breve hace que una interrupción sea recuperable:

```yaml
task: "ordenar líneas no vacías en un archivo desechable"
scope:
  read: ["sandbox/input.txt"]
  write: ["sandbox/output.txt", "sandbox/evidence/"]
completed: ["ruta confirmada", "protocolo leído"]
state: blocked_input
last_observation: "sandbox/input.txt no existe"
verification: not_run
retry: {used: 0, allowed: 1}
next_safe_action: "pedir el archivo de entrada"
```

Estados útiles: `ready`, `proposed`, `awaiting_approval`, `running`, `feedback_received`, `blocked_input`, `paused`, `unknown`, `verified` y `stopped`. Una respuesta final no convierte un estado desconocido en `verified`.

Registra eventos, no intenciones: propuesta, aprobación, inicio y fin de ejecución, efecto, verificación y entrega. Cuando un dato no se observó, escribe `not_observed`; no lo completes con lo que el modelo dijo que haría.

## Reintentar es una decisión limitada

Antes de reintentar, clasifica el fallo: entrada ausente, conflicto de alcance o autoridad, interpretación equivocada, error de herramienta o entorno, comprobación ambigua o cambio de condiciones. Repetir la misma acción con las mismas condiciones casi nunca diagnostica nada.

Fija presupuestos de intentos, tiempo, archivos que pueden cambiar, efectos externos, coste y incertidumbre. Tras una respuesta perdida, lee el objetivo y compara la postcondición antes de repetir una escritura: una escritura puede haber tenido éxito aunque el cliente no recibiera respuesta.

| Clase de acción | Primer paso tras un resultado incierto |
|---|---|
| Solo lectura | Repetir dentro del alcance de lectura autorizado |
| Idempotente | Leer el estado y comprobar la postcondición |
| Compensable | Confirmar el efecto y preparar una compensación limitada |
| No idempotente | Detenerse y reconciliar antes de repetir |

## Práctica y límite

En un directorio desechable, pide al Agent que informe enlaces que apuntan a archivos ausentes sin modificar las fuentes. Define raíz de lectura y escritura, qué cuenta como enlace ausente, el check, dos reintentos de solo lectura y un fallo deliberado —por ejemplo, una raíz equivocada—. Revisa propuesta, informe y comprobación por separado.

La práctica pasa si puedes explicar cada transición y entregar `verified`, `partial`, `blocked` o `unverified` con evidencia. Hasta guardar una ejecución real e independiente, este capítulo sigue siendo `candidate / not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="11-designing-a-skill-ES.md">← Anterior<br><strong>Capítulo 11 · diseñar un Skill que se gane su lugar</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-ES.md">Siguiente pendiente →<br><strong>Ver disponibilidad del Capítulo 13</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
