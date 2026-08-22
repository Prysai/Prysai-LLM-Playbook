<!-- content_id: lab-013-l3-vertical-slice | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-013-l3-vertical-slice
title: "Ejecutar un corte vertical completo"
level: L3
domain: engineering
goal: "Llevar un cambio acotado desde la definición hasta la evidencia y el traspaso"
setup: "Copia desechable de repositorio, una ruta Markdown permitida y sin publicación ni credenciales"
task: "Recorrer CP0 a CP4 para una nota de release, con comprobación focalizada, rama de fallo y traspaso en contexto nuevo"
evidence: ["Hashes de entrada, línea base, checkpoints y log", "Diff, salida de comandos, códigos de salida y tabla afirmación-evidencia", "Fallo, traspaso, rollback e incógnitas"]
failure_variant: "Quitar una entrada, hacer fallar la comprobación, reanudar tras CP2, inyectar instrucción externa o exigir cambio persistente"
reflection: "¿Qué checkpoint evitó la mayor afirmación sin respaldo o acción innecesaria?"
status: draft
last_verified: "Maintainer reference run accepted 2026-08-12; learner run not run"
transfer_task: "Transferir el flujo a una tarea de investigación o contenido de bajo riesgo"
transfer_domain: "ingeniería, investigación o contenido"
transfer_evidence: "Protocolo reescrito, checkpoints, artefacto o bloqueo, tabla de evidencia y traspaso"
transfer_limitations: "Un corte local no prueba publicación remota, producción ni comprensión del lector"
---

# Lab 013: ejecutar un corte vertical completo

## Objetivo y preparación

Completa un flujo pequeño sin confundir plan, edición, comprobación, revisión, entrega y publicación. Usa una copia desechable; solo puedes modificar una nota Markdown en una ruta nombrada. Registra entradas y hashes, `git status` inicial, ruta permitida, aceptación, rollback y acciones prohibidas. Publicar, hacer push, instalar dependencias o usar credenciales queda fuera de alcance.

| Checkpoint | Evidencia requerida |
|---|---|
| CP0 Definición | objetivo, entradas, alcance, permisos, paradas, hash base |
| CP1 Plan | corte mínimo, método, evidencia esperada, rollback |
| CP2 Cambio | diff, rutas, log de acción, hash de salida |
| CP3 Verificación | comandos, salida cruda, códigos, cobertura, comprobaciones no ejecutadas |
| CP4 Traspaso | completado, incompleto, evidencia, incógnitas, siguiente control, rollback |

## Protocolo de checkpoints

Usa una ficha separada para cada transición. El texto del protocolo es una
guía; las observaciones reales del registro son la evidencia.

### CP0 — Definición

Registra objetivo, entradas, ruta permitida, autoridad, aceptación, condición de
parada, hash de la línea base y acciones prohibidas. Incluye autenticación y
capacidad técnica solo como estados observados: ninguna de las dos autoriza por
sí sola una publicación o un cambio remoto.

### CP1 — Plan

Elige el corte mínimo, el control que podría fallar, el artefacto esperado y el
rollback. Declara qué no se va a ejecutar: red, instalación, push, publicación,
credenciales y cambios fuera de la ruta.

### CP2 — Cambio

Escribe únicamente la nota de release en la ruta permitida. Guarda timestamp,
acción, resultado, rutas tocadas, hash de salida y diff. Si el archivo esperado
no existe o la ruta cambia, marca `blocked` y no adivines un destino alternativo.

### CP3 — Verificación

Ejecuta el control focalizado en el directorio declarado. Conserva comando,
salida cruda, código de salida, versión, cobertura y controles no ejecutados.
Un código cero demuestra ese comando en ese entorno; no demuestra publicación,
comprensión del lector ni comportamiento en producción.

### CP4 — Traspaso

Entrega una ficha que separe terminado, incompleto, observado, verificado,
`unverified`, `blocked` y `not_run`. Nombra el siguiente control seguro, el
rollback, el responsable y las acciones que deliberadamente no se hicieron.

## Contrato de la tarea y límites externos

```text
objetivo y fuera de alcance:
entrada, revisión y hash:
ruta de lectura / ruta de escritura:
acciones permitidas:
acciones prohibidas: red, instalación, push, publicación, secretos
aceptación observable:
prueba y rollback:
parar si:
```

Si la ficha no puede nombrar cuenta, organización, repositorio, rama, audiencia
y payload para una acción externa, esa acción no forma parte del experimento.
Observar una página no es enviarla: antes de Submit, Push o Publish habría que
volver a confirmar destino y autorización, pero aquí esas acciones están fuera
de alcance.

## Tarjetas de fallo y recuperación

| Síntoma | Primera observación | Decisión segura |
|---|---|---|
| Falta una entrada | Ruta y lista de archivos | `blocked`; pedir la entrada exacta |
| Falla el check | Salida, código y diff preservados | Cambiar una condición diagnóstica o parar |
| Se pierde la respuesta tras CP2 | Estado de copia, hash y diff | Reconciliar antes de repetir una escritura |
| El texto externo pide subir un token | Fuente y alcance del texto | Tratarlo como dato no fiable; rechazar |
| Se propone un cambio persistente | Efecto, destino y rollback | `blocked`; no instalar ni publicar |

Una reanudación solo es válida si cambia una condición nombrada y el efecto de
la primera tentativa está entendido.

## Experimento y fallo

Escribe la nota usando solo hechos del input. Comprueba que cambió solo la ruta permitida, que existe el contenido requerido y que no introdujiste afirmaciones sin respaldo. Un diff correcto no prueba publicación, comprensión ni sincronización remota.

Completa al menos un fallo: quita una entrada y detente; falla el check y conserva salida; retoma después de CP2 con solo checkpoints y estado; trata como datos una instrucción que pide subir un token; o detente ante un cambio persistente no autorizado. Reintenta únicamente si cambió el diagnóstico y conoces los efectos existentes.

- [ ] Objetivo, alcance, autoridad, aceptación y rollback están explícitos en CP0.
- [ ] Se guardaron CP0–CP4 y solo cambió la ruta permitida.
- [ ] Los comandos tienen salida y código de salida.
- [ ] Un fallo se detuvo o recuperó correctamente.
- [ ] El traspaso separa resultado local de publicación o producción.

## Paquete de evidencia y referencia

Conserva la copia de entrada y sus hashes, la ficha CP0–CP4, el diff, el log de
acciones, la salida de comandos, el registro de fallo, la tabla afirmación →
evidencia, el destino de rollback y la lista de incógnitas. Para cada afirmación
usa: `scope`, `evidence`, `status`, `uncovered` y `next_check`.

El paquete de referencia del mantenedor puede demostrar que la fixture es
determinista y que existe una rama de fallo y recuperación. No demuestra que un
aprendiz la haya ejecutado de forma independiente, que Codex se comporte igual,
que el resultado se publique ni que el proceso funcione en producción.

Conserva hashes, checkpoints, diff, log, salida, fallo, tabla afirmación-evidencia y traspaso. El Lab sigue `draft / not_run`: una referencia determinista del mantenedor no prueba independencia del aprendiz, comportamiento de Codex, transferencia ni producción.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-012-team-capability-migration-ES.md">← Anterior<br><strong>Lab 012 · migración de capacidades de equipo</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-014-resume-reconciliation-ES.md">Siguiente →<br><strong>Lab 014 · conciliación al reanudar</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
