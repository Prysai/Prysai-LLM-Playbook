<!-- content_id: lab-008-research-question | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-008-research-question
title: "Reducir un tema a una pregunta de investigación respondible"
level: L3
domain: research
goal: "Convertir un tema amplio en una pregunta delimitada cuyas afirmaciones puedan apoyarse, limitarse o quedar sin resolver con fuentes inspeccionables"
setup: "Un tema público y de bajo riesgo, una fuente primaria accesible, una fuente de autoridad incierta y una tabla de afirmación-evidencia vacía"
task: "Escribir preguntas candidatas, elegir una con alcance explícito, planificar fuentes, mapear afirmaciones a evidencia y no rellenar huecos con una fuente no verificable"
status: draft
last_verified: "Maintainer reference run accepted 2026-08-13; learner run not run"
---

# Lab 008: reducir un tema a una pregunta de investigación respondible

## Objetivo de aprendizaje

La calidad de una investigación se decide antes de redactar. Un tema amplio invita a resumir; una pregunta útil nombra población u objeto, ventana temporal, decisión y evidencia aceptable con suficiente precisión para que otra persona pueda cuestionarla.

## Preparación

Elige un tema público de bajo riesgo. Excluye datos personales y consejos jurídicos, médicos o financieros. Prepara una fuente primaria o autorizada que puedas abrir hoy y una candidata cuya autoridad o acceso sea incierto. Registra URL y fecha de acceso antes de tomar notas.

## Tarea y experimento

Escribe tres preguntas candidatas. Para cada una registra:

```text
decisión que informa:
objeto o población:
ventana temporal:
incluido / excluido:
clase de fuente requerida:
forma de la respuesta:
condición de parada:
```

Elige una y explica por qué las otras son demasiado amplias, vagas o imposibles de responder con la evidencia permitida. Haz un plan de fuentes antes de redactar. Prefiere fuentes primarias para comportamiento de producto, políticas, normas y estadísticas; usa fuentes secundarias para localizar o comparar, no para sustituir sin aviso el registro primario.

Crea esta tabla:

| Afirmación | Fuente | Fecha de acceso | Apoyo directo | Inferencia | Límite | Estado |
|---|---|---|---|---|---|---|

Los estados son `supported`, `partial`, `disputed`, `unknown` u `out_of_scope`. Redacta solo cuando cada oración material tenga una fila o esté etiquetada claramente como análisis. Termina con la fuente o experimento más pequeño que reduciría la incertidumbre importante.

## Escribe una tarjeta de pregunta antes de buscar o usar el modelo

Imagina que quieres saber si un LLM sirve para ordenar materiales. Aún no puedes buscar «cuál es mejor», ni preguntárselo directamente al modelo. Primero redúcelo a una tarjeta:

```text
Decisión: para material público de un club de lectura, ¿probamos un modelo para crear primero un índice de títulos y puntos?
Objeto: un documento Markdown ya público, sin datos personales.
Tiempo: solo documentación oficial accesible hoy; no comparar precio ni calidad a largo plazo.
Fuentes: una página oficial del producto y un debate público etiquetado como experiencia de usuario.
Excluir: no inferir privacidad, exactitud ni eficiencia de equipo; no usar snippets como evidencia.
Parada: si la fuente oficial no abre o las dos fuentes no hablan de la misma superficie, la conclusión queda en unknown.
```

Solo entonces pide una tarea limitada al modelo: **«Con esta tarjeta, enumera la evidencia que falta y coloca cada posible afirmación en apoyo, inferencia o desconocido; no busques, cites ni concluyas por mí».** Su respuesta es un borrador de plan, no una fuente. Abre tú las fuentes, registra ubicación y fecha, y después decide el estado de la tabla.

Así «usar IA para investigar» se vuelve colaboración comprobable: el modelo ayuda a descubrir preguntas y huecos, las fuentes sostienen hechos y tú delimitas la conclusión.

## Evidencia y caso de fallo

Conserva tema original, tres preguntas, razón de selección, plan de fuentes, fragmentos o ubicaciones precisas, fechas de acceso, tabla de afirmaciones, borrador y límites. Una URL sola no prueba qué decía una fuente en esa fecha.

El proyecto incluye un fixture congelado y sin red: una fuente actual, otra obsoleta que entra en conflicto dentro del alcance, un registro inaccesible y una cita fabricada. El primer informe exagera apoyo y debe fallar; el corregido estrecha la decisión, conserva desacuerdo y desconocidos, rechaza fuentes no elegibles y deja un recibo de parada. Es evidencia determinista de mantenimiento con entradas sintéticas: no usó un modelo, navegación, aprendices ni demostró transferencia o calidad de investigación real.

Añade una fuente que no abre, trata otra población o hace una afirmación fuerte sin método. La respuesta correcta es marcar la afirmación `unknown`, `partial` u `out_of_scope`, reducir la conclusión y nombrar un reemplazo comprobable. No reconstruyas hechos desde título, fragmento de buscador ni prosa segura.

## Aceptación, reflexión y transferencia

- [ ] La pregunta final nombra alcance, decisión, clase de evidencia y condición de parada.
- [ ] Cada afirmación material apunta a una ubicación precisa y fecha de acceso.
- [ ] Apoyo directo, inferencia, desacuerdo y desconocidos siguen separados.
- [ ] Una fuente débil reduce confianza, no produce soporte inventado.
- [ ] No hubo datos privados, contacto no autorizado, compra, envío ni publicación.
- [ ] La conclusión dice qué evidencia podría cambiarla.

Repite el protocolo en otro dominio. ¿Qué restricción mejoró más la pregunta? ¿Qué fuente parecía útil pero no apoyaba la afirmación? ¿Qué sigue siendo hipótesis en vez de hallazgo?

## Límite

Las fuentes públicas accesibles pueden seguir incompletas, obsoletas, sesgadas o ser inadecuadas para decisiones jurídicas, médicas, financieras u organizativas. Este Lab continúa `draft / not_run` hasta que existan ejecuciones de aprendices y revisión independiente.
