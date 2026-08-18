# Comparación rápida de tres tareas v1

**Estado:** paquete de fixture `candidate` · **Evidencia de ejecución:** `not_run`

Este paquete compartido y sin conexión sirve a los capítulos 6 y 19. Dos modelos o flujos candidatos reciben las mismas tres tareas pequeñas antes de decidir si una evaluación mayor justifica el coste.

Que pase el validador local solo indica que una entrega cumple el esquema y las reglas congeladas. **No demuestra** calidad, precio, seguridad, utilidad general, resultados de aprendizaje ni un ganador absoluto.

## Condiciones que no cambian

- IDs, instrucciones, entradas sintéticas, salidas esperadas y hashes de `fixture.json`;
- una sola variable por ronda: modelo, flujo o superficie;
- mismo contexto, herramientas, permisos, condición de red, tiempo y revisor; y
- como máximo una repetición controlada y declarada tras el primer intento.

Las entradas son material didáctico original y sintético, sin datos de clientes, credenciales, registros de producción ni texto externo.

## Ejecutar una tarea

1. Copia sin cambios la instrucción y entrada a cada candidato; guarda las respuestas en bruto antes de editarlas.
2. Guarda cada respuesta localmente con el nombre requerido.
3. Valídala en local; el validador no usa red ni llama a un modelo.

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py evals\candidates\three-task-smoke-v1\validate_submission.py `
  --task extract-01 `
  --submission <candidate-output>/candidate-a-extract-01.json
```

| Tarea | Entrega | Comprueba |
| --- | --- | --- |
| `extract-01` | matriz JSON | extracción estructurada sin inventar hechos |
| `markdown-02` | archivo Markdown | transformación limitada que conserva lo desconocido |
| `gap-review-03` | objeto JSON | revisión de brechas sin rebajar evidencia existente |

Para dos candidatos, conserva seis entregas independientes y registra condiciones y resultados en `run-record-template.yaml`. Sus campos `not_run` son marcadores, no resultados.

## Detente con honestidad

Usa `not_comparable` si una interrupción, un bloqueo de permiso, cambio de hash, versión de herramienta u otra condición congelada afecta a un lado. No sustituyas una respuesta interrumpida por un reintento exitoso. Seis respuestas comparables solo permiten una decisión limitada a estas tareas, nunca un ranking general.
