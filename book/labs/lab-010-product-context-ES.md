<!-- content_id: lab-010-product-context | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-010-product-context
title: "Crear un contexto de producto compartido que sirva para dos tareas"
level: L3
domain: marketing
goal: "Crear un registro pequeño y versionado del producto que reduzca explicaciones repetidas sin mezclar hechos, supuestos, decisiones de posicionamiento y evidencia ausente"
setup: "Un producto ficticio o saneado, dos tareas de marketing de bajo riesgo y un archivo de contexto versionado sin conexión con campañas reales"
task: "Construir el contexto mínimo, usarlo para explicar el producto y planificar una medición, cambiar una decisión de posicionamiento e inspeccionar las diferencias resultantes"
status: draft
last_verified: "not run"
---

# Lab 010: crear un contexto de producto compartido que sirva para dos tareas

## Objetivo de aprendizaje

Crea una fuente pequeña de verdad sobre el producto que puedan reutilizar dos tareas distintas. El objetivo es mantener coherencia sin ocultar la incertidumbre, no redactar un enorme manual de marca ni repetir un posicionamiento sin pruebas con más soltura.

## Preparación

Usa un producto ficticio o información pública saneada. No incluyas lista de clientes, investigación privada, ingresos internos, estrategia no publicada ni datos personales. Este ejercicio no se conecta con correo, publicidad, analítica, CRM, publicación ni sistemas web activos.

Crea `product-context-v1.md` con estos campos:

```text
product:
audience:
problem:
alternative:
difference:
proof:
objections:
customer_language:
voice:
target_action:
non_goals:
```

Para cada campo añade `source`, `status: fact | assumption | decision | unknown`, `confidence`, `owner` y `next_review`. Si falta evidencia, déjala vacía: no conviertas una suposición en una cita de cliente.

## Tarea y experimento

Usa el mismo contexto en dos tareas:

1. escribe una explicación breve del producto para el público indicado;
2. diseña un plan de medición para una decisión real, por ejemplo comprobar si el lector entiende el producto lo bastante como para elegir el siguiente paso.

Ambas salidas deben nombrar los campos de contexto usados, los supuestos y los hechos que aún necesitan validación. Para cada métrica registra acción objetivo, fuente de datos, ventana de observación, regla de decisión y límite. Una métrica propuesta es un plan, no un resultado medido.

Ahora cambia una decisión de posicionamiento, incrementa la versión del contexto, explica el motivo y vuelve a generar ambas salidas. Compara el diff de contexto con el de las salidas. Distingue qué cambios exige la decisión y cuáles son solo variación de redacción.

## Evidencia y caso de fallo

Conserva las dos versiones del contexto, procedencia de cada campo, motivo del cambio, las dos salidas de cada versión, diffs, mapa de métricas y campos sin resolver. Un prompt más corto no basta como evidencia: muestra qué hechos repetidos ya no hubo que volver a explicar y si la segunda tarea los utilizó correctamente.

Elimina `audience` o `target_action` y solicita de nuevo ambas salidas. El comportamiento correcto es señalar la decisión que falta, limitar la salida o pedir ese dato. Inventar un segmento, una cita de cliente, un evento de conversión o un resultado de mercado hace fallar el Lab aunque el texto suene convincente.

## Lista de aceptación

- [ ] Hechos, supuestos, decisiones e incógnitas aparecen separados.
- [ ] Cada campo importante tiene procedencia, responsable y estado de revisión.
- [ ] Las dos tareas reutilizan una revisión de contexto e indican los campos usados.
- [ ] La actualización de posicionamiento tiene motivo y un diff posterior inspeccionable.
- [ ] Las métricas se relacionan con una decisión y no se describen como resultados observados.
- [ ] No hubo publicación, contacto, seguimiento, gasto ni datos privados en directo.

## Reflexión y transferencia

¿Qué campos redujeron de verdad la explicación repetida? ¿Cuál produjo el cambio posterior de decisión más grande? Lleva el contexto a otro dominio, elimina el lenguaje exclusivo de marketing y registra qué se conserva y qué necesita otra persona responsable o una nueva fuente de evidencia. Un contexto compartido reduce repetición; no establece verdad factual, lenguaje real de clientes, respuesta de mercado, atribución ni aprobación estratégica.
