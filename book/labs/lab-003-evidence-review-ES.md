<!-- content_id: lab-003-evidence-review | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

---
id: lab-003-evidence-review
title: "Auditar una declaración de finalización"
level: L3
domain: general
goal: "Separar afirmaciones, evidencia directa, inferencia y verificación ausente"
setup: "Tres resúmenes de entrega desinfectados, con la clave de respuestas fuera del contexto del aprendiz"
task: "Relacionar cada afirmación sustancial con su alcance, evidencia requerida, evidencia real, estado y siguiente comprobación más pequeña"
evidence:
  - "Los tres resúmenes fijos y la clave de respuestas"
  - "Una tabla de afirmación a evidencia completa"
  - "Notas de revisión y una lista explícita de elementos no verificados"
failure_variant: "Insertar una afirmación sin respaldo de que todas las pruebas pasaron y otra de que funciona en todos los dispositivos basada en un solo navegador"
reflection: "¿Qué evidencia probó existencia, corrección o preparación, y qué afirmación se debilitó al escribir su alcance?"
status: draft
last_verified: "Not run"
transfer_task: "Aplicar la tabla de auditoría a una entrega pequeña de ingeniería, investigación o publicación"
transfer_domain: "ingeniería, investigación o entrega de contenido"
transfer_evidence: "Conservar afirmaciones acotadas, evidencia directa, vacíos, notas de revisión y estado final"
transfer_limitations: "Una auditoría estática no puede probar que los artefactos citados sean auténticos o completos fuera del alcance inspeccionado"
---

# Lab 003: Auditar una declaración de finalización

## Objetivo de aprendizaje

Decidir si un resultado está terminado sin confiar en tono, seguridad ni
acabado visual.

## Preparación

Prepara tres resúmenes de entrega desinfectados: uno respaldado por evidencia
directa, uno parcialmente terminado pero presentado como acabado y uno pulido
sin registro de verificación. Mantén la clave de respuestas fuera del contexto
del aprendiz.

Solo se permiten inspección de lectura y solicitudes de evidencia más acotada.
No edites los resúmenes, inventes salidas ausentes, contactes servicios externos
ni uses registros de producción.

## Tarea y experimento

Para cada afirmación sustancial, registra:

| Afirmación | Alcance | Evidencia necesaria | Evidencia encontrada | Estado | Siguiente comprobación más pequeña |
|---|---|---|---|---|---|
| Ejemplo | archivo, entorno, versión, fecha | diff y comprobación focalizada | ruta exacta o `none` | verified / partial / inferred / blocked / unknown | una acción acotada |

Separa estas preguntas:

1. ¿Existe un artefacto?
2. ¿Es correcto dentro del alcance declarado?
3. ¿Está listo para el lector o entorno previstos?

Cada una necesita evidencia propia. Un diff demuestra un cambio, no
corrección. Una prueba unitaria que pasa demuestra su comportamiento cubierto,
no despliegue ni aceptación de usuario.

## Caso de fallo

Inserta «todas las pruebas pasaron» sin salida de comando, nombres de pruebas,
fecha, entorno ni código de salida. La respuesta correcta es rebajar la
afirmación y pedir evidencia; no deduzcas una ejecución real por el tono.

Repite con evidencia de un navegador cuando la afirmación diga «funciona en
todos los dispositivos». Reduce el alcance o exige evidencia de más dispositivos.

## Lista de aceptación

- [ ] Cada afirmación importante tiene alcance explícito.
- [ ] Evidencia directa e inferencia están en columnas distintas.
- [ ] Las afirmaciones sin respaldo no se marcan `verified`.
- [ ] La siguiente comprobación es menor que volver a ejecutar todo el proyecto.
- [ ] Se excluyeron secretos, datos de clientes y logs privados.
- [ ] El relevo final enumera lo que queda sin verificar.

## Evidencia que conservar

Conserva los tres resúmenes, la tabla terminada, comparación con clave,
notas del revisor y estado final. Hasta que se registren una ejecución de
aprendiz y una revisión independiente, este Lab sigue siendo `draft / not_run`.

## Reflexión y transferencia

Aplica la tabla a una entrega pequeña de ingeniería, una conclusión de
investigación o un borrador de publicación. ¿Qué evidencia prueba existencia,
corrección y preparación? ¿Qué afirmación se volvió más débil al delimitarla?

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-lab-nav="previous" href="lab-002-task-protocol-ES.md" aria-label="Lab anterior: Lab 002 · Convertir un deseo en un protocolo de tarea">← Anterior<br><strong>Lab 002 · Protocolo de tarea</strong></a></td>
      <td align="right"><a data-lab-nav="next" href="../table-of-contents-ES.md" aria-label="Volver al índice en español: el Lab 004 aún no está traducido">Siguiente pendiente →<br><strong>Ver disponibilidad del Lab 004</strong></a></td>
    </tr>
  </table>
</nav>
<!-- lab-navigation:end -->
