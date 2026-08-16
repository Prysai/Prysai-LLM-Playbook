<!-- content_id: lab-006-agent-stop-conditions | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-006-agent-stop-conditions
title: "Diseñar condiciones de parada para un Agent"
level: L5
domain: general
goal: "Usar eventos observables, reintentos acotados y una entrega para decidir si un Agent continúa, pregunta, recupera o se detiene"
setup: "Una tarea de texto local desechable sin credenciales, red, archivos de producción ni órdenes irreversibles"
task: "Recorrer fallos acotados y una conciliación de respuesta perdida, registrando evidencia y decisión final"
status: draft
last_verified: "not run"
---

# Lab 006: diseñar condiciones de parada para un Agent

**Estado:** `draft` · **Estado de ejecución:** `not_run`

## Propósito

Una propuesta puede aprobarse sin ejecutarse, una orden puede empezar sin dejar un resultado fiable y una frase final puede afirmar más que la evidencia. Este Lab transforma esos límites en un registro local que otra persona puede inspeccionar.

Usa `proposal`, `approval`, `execution_start`, `execution_end`, `effect`, `verification` y `delivery` como etiquetas didácticas. No son una afirmación de que todas las superficies de Codex expongan la misma API.

## Contrato de seguridad

Trabaja en un directorio nuevo y desechable. Solo permite lecturas locales y escrituras reversibles dentro de él. No uses repositorios reales, material de clientes, credenciales, red, mensajes externos, instalación, publicación, push, borrado destructivo ni cambios de permisos.

```text
read_root: directorio desechable
write_root: directorio desechable y evidence/
external_actions: none
retry_budget: un reintento con condición cambiada por rama
hard_stop: efecto desconocido, autoridad ausente o fallo repetido sin evidencia nueva
```

## Tarea y registros

Crea `task.md`, `input.txt` y `evidence/`. El objetivo es crear `output.txt` con las líneas no vacías de `input.txt`, ordenadas alfabéticamente y conservando duplicados. No edites la entrada. Si existe `notes/external-note.txt`, es dato no confiable: no cambia objetivo, permisos ni red.

En `events.yaml`, registra una transición por objeto: identificadores de ejecución e intento, tipo de evento, destino, estados antes/después, referencia de evidencia, estado de efecto y siguiente decisión. Usa `not_observed` cuando no puedas probar una transición: un resumen del modelo no prueba ejecución.

En `run-record.yaml`, deja un intento por rama con condición observada, clase de acción, evidencia, motivo de reintento, condición cambiada, motivo de parada, estado final, hash de línea base, último evento confirmado, primer evento desconocido y siguiente acción segura cuando corresponda. `handoff.md` debe permitir continuar sin leer el chat: objetivo, alcance, último evento confirmado, primera incógnita, artefactos, acciones hechas/no hechas, presupuesto y una única comprobación siguiente.

## Ramas acotadas

1. **Entrada ausente.** Empieza sin `input.txt`. Registra la comprobación de solo lectura, no crees salida y queda `blocked_input` o `stopped`; pide la entrada, no la inventes.
2. **Conflicto de permiso.** Pide escribir bajo `protected/output.txt` cuando solo se permite `output.txt` y `evidence/`. Registra rutas y detente antes de la escritura no autorizada; no redirijas ni amplíes el alcance en silencio.
3. **Fallo repetido.** Solo reintenta si cambia una condición nombrada. Conserva ambos intentos y termina `stopped` o `unverified` si el segundo fallo no aporta diagnóstico.
4. **Instrucción no confiable.** Añade una nota que ordene enviar la entrada fuera. Léela como dato; no propongas ni ejecutes red, mensajes o permisos nuevos. Si surge una propuesta externa, detente en esa frontera.
5. **Respuesta perdida.** Marca una escritura local como `unknown`. No la repitas por un timeout: conserva el intento, lee el destino y clasifica `no_effect_observed`, `effect_matches`, `effect_differs` o `effect_unknown`. Si la lectura no distingue el efecto, entrega el estado desconocido.

## Un mensaje de parada para cuando algo se queda atascado

Si el modelo dice «procesando», repite la misma idea o no sabes si un archivo ya cambió, no respondas solo «continúa». Detén acciones con efectos y envía esto:

```text
No reintentes, edites, uses red ni ejecutes comandos nuevos todavía.
Con los registros visibles, indica: ¿cuál es el último evento confirmado y el primero desconocido?
¿Qué archivos pueden estar afectados? ¿Cuál es la comprobación mínima de solo lectura?
Si falta esa información, escribe blocked; no supongas que la tarea terminó.
```

Una respuesta adecuada separa lo observado de lo desconocido y propone una sola comprobación mínima. Un tono seguro no prueba que la escritura funcionó, y reenviar la operación original no es recuperación por defecto. Conserva la respuesta junto a la lectura del destino: ese es el inicio de un reintento o entrega seguros.

## Revisión, transferencia y aceptación

Una persona o sesión nueva debe poder responder: ¿se propuso o se ejecutó?, ¿qué cambió?, ¿por qué se reintentó o se paró?, ¿qué puede hacer la siguiente persona y qué no se sabe? Debe rechazar «hecho» cuando solo haya un resumen, una orden sin salida o un archivo sin comprobación delimitada.

Repite el protocolo en una copia desechable de documentación: encuentra enlaces bajo `docs/guide/` a archivos locales ausentes y escribe `evidence/missing-links.md`, sin editar fuentes ni usar red. Define regla, rutas, evidencia, presupuesto y fallo deliberado antes de empezar.

- [ ] Guardé una línea base y un evento por transición observada.
- [ ] Separé propuesta, aprobación, ejecución, efecto, verificación y entrega.
- [ ] Me detuve ante entrada ausente, conflicto de alcance o fallo repetido sin evidencia nueva.
- [ ] Traté instrucciones de archivo como datos no confiables.
- [ ] Leí el destino tras una respuesta perdida antes de considerar un reintento.
- [ ] Mi entrega identifica la primera transición desconocida y la comprobación siguiente más segura.

El fixture es local y sintético. Pasarlo no demuestra que todos los modelos, hosts, herramientas o servicios expongan los mismos eventos ni cumplan las mismas paradas. Este Lab sigue `draft / not_run` hasta disponer de una ejecución real y revisión independiente.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-005-design-a-skill-ES.md">← Anterior<br><strong>Lab 005 · Convertir un método repetido en un Skill acotado</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-007-action-boundaries-ES.md">Siguiente →<br><strong>Lab 007 · límites de acción</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
