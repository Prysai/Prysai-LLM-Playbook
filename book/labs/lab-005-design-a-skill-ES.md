<!-- content_id: lab-005-design-a-skill | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-005-design-a-skill
title: "Convertir un método repetido en un Skill acotado"
level: L4
domain: general
goal: "Decidir si un flujo repetido merece un Skill y comprobar que el Skill acota el trabajo en vez de activarse en todas partes"
setup: "Un flujo de bajo riesgo completado al menos dos veces, un directorio de práctica separado, cuatro casos sin datos sensibles y el validador oficial de Skills"
task: "Extraer las decisiones estables, escribir el Skill útil más pequeño, probar casos positivo, límite, fallo y transferencia, y producir una decisión de adopción sin instalarlo"
evidence:
  - "Dos registros fuente y una tabla de decisiones estables frente a incidentales"
  - "Skill candidato, registro de fuente y licencia, salida del validador y cuatro pruebas"
failure_variant: "Incluir un detalle específico de proyecto o material sin permiso claro y dejar la decisión como blocked"
reflection: "¿Qué decisión es estable para codificar, qué permanece como contexto y el candidato reduce omisiones sin activar demasiado?"
status: draft
last_verified: "not run"
transfer_task: "Aplicar la extracción y cuatro pruebas a un flujo repetido de otro dominio"
transfer_domain: "investigación, ingeniería, marketing o revisión de contenido"
transfer_evidence: "Conservar comparación, revisión candidata, resultado del validador, pruebas y decisión"
transfer_limitations: "La validación estructural no demuestra fiabilidad de producción, adopción ni aprobación de licencia"
---

# Lab 005: convertir un método repetido en un Skill acotado

## Objetivo de aprendizaje

Crea un paquete reutilizable de instrucciones solo cuando el trabajo repetido tenga un
patrón estable de decisiones. Un Skill no es un almacén para una respuesta que salió
bien una vez, una lista específica de un proyecto ni todos los hechos de un dominio.

## Preparación

Elige un flujo inocuo que hayas completado al menos dos veces y conserva ambos
registros. Usa entradas depuradas y un directorio de práctica fuera de la raíz donde se
descubren los Skills. No uses credenciales, datos de producción, material no publicado
de clientes ni una fuente externa cuyas condiciones de reutilización no estén claras.

Crea `extraction.md` con cuatro columnas:

| Paso observado | Decisión estable | Detalle específico del proyecto | Evidencia en ambas ejecuciones |
|---|---|---|---|

Solo las decisiones estables pueden entrar en el Skill. Los nombres de archivo, datos
de clientes, soluciones temporales y destinos puntuales se quedan en el contexto del
proyecto.

## Tarea y experimento

Escribe el candidato más pequeño que incluya:

- una descripción que se active ante solicitudes pertinentes y ceda ante solicitudes cercanas;
- entradas, acciones permitidas, límites de permiso, manejo de secretos, salida y aceptación;
- un flujo breve; referencias o scripts detallados solo cuando se necesiten;
- un ejemplo positivo, uno de límite y uno de fallo;
- fuente, licencia, responsable, versión y próxima revisión.

Ejecuta el validador oficial. Después abre un contexto nuevo y prueba cuatro casos
fijos: positivo, límite, fallo y transferencia entre dominios. Anota si el candidato
fue encontrado, cargado, seleccionado, seguido y verificado en comportamiento. Son
cinco estados distintos: uno no demuestra el siguiente.

Termina con `skill-adoption-decision.md`:

```text
candidate_revision:
task_gap:
trigger_conditions / non_trigger_conditions:
source / license / notice:
dependencies:
permissions / external_side_effects:
positive / boundary / failure / transfer results:
target_install_scope:
backup / rollback / rollback_check:
owner / next_review:
decision: recommendation-only | blocked | approved-to-install
unverified / unblock_conditions:
```

Este Lab termina en una recomendación de adopción. Instalar cambia un estado compartido
y requiere autorización independiente.

## Evidencia que conservar

Conserva los dos registros del flujo original, `extraction.md`, el directorio completo
del candidato, su revisión o hash, la salida del validador, entradas y salidas de los
cuatro casos, notas del contexto nuevo y la decisión de adopción. Un ensayo que falla
se conserva como fallo; no se reemplaza por una ejecución posterior corregida.

## Caso de fallo

Primero fija en el Skill un nombre de archivo real o una regla propia de un cliente.
Ejecuta el caso de transferencia y comprueba que el candidato se activa mal o da una
instrucción irrelevante. Elimina el detalle incidental y repite con un identificador
de intento nuevo.

Después añade un fragmento externo sin registro claro de licencia o permiso. Aunque el
validador pase, la decisión correcta es `blocked`: una estructura de archivo válida no
resuelve la procedencia.

## Lista de aceptación

- [ ] Dos ejecuciones previas respaldan cada decisión estable codificada.
- [ ] Se probaron tanto las condiciones de activación como las de no activación.
- [ ] Los casos positivo, límite, fallo y transferencia guardan resultados sin alterar.
- [ ] Las fuentes y permisos de reutilización están anotados.
- [ ] No se instalaron Skills ni se usaron secretos, publicación o efectos externos.
- [ ] La decisión dice qué falta por verificar y quién revisará después.

## Reflexión y transferencia

Aplica el método a otro dominio. ¿Qué partes sobrevivieron al cambio? ¿Cuáles debían
quedarse en el contexto del proyecto? ¿El candidato eliminó una omisión repetida o
solo hizo más largas las instrucciones?

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-004-skill-selection-ES.md" aria-label="Lab anterior: Lab 004 · Elegir la capacidad útil más pequeña">← Anterior<br><strong>Lab 004 · Elegir la capacidad útil más pequeña</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="lab-006-agent-stop-conditions-ES.md" aria-label="Siguiente Lab: Lab 006 · Diseñar condiciones de parada para un Agent">Siguiente →<br><strong>Lab 006 · Diseñar condiciones de parada para un Agent</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
