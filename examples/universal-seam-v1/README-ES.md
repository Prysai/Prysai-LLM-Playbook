# Ejercicio de uniones universales v1

Este ejercicio breve, ficticio y sin conexión acompaña la primera ruta del
núcleo universal. Su regla es clara: una respuesta visible, una etiqueta de
rama, un bloque con aspecto de herramienta o un análisis correcto **no
demuestran por sí solos** la tarea, el destino, la acción ni el estado pedido.

No hay cuenta, llamada al modelo, red, credencial, repositorio real, cambio de
archivo, comando, commit, push, publicación ni efecto externo. Los registros
son material ficticio original del proyecto, no logs de un proveedor.

## Qué hacer

Para cada registro de `cases.json`, señala el desajuste exacto y escribe la
comprobación segura más pequeña. Conserva el sentido limitado del estado:

| Estado | Significado en este ejercicio fijo |
| --- | --- |
| `verified_in_fixture` | Los valores locales dados prueban directamente el desajuste indicado. |
| `blocked` | La evidencia sobre destino o autoridad entra en conflicto; hay que detenerse. |
| `not_run` | No hay recibo de ejecución; no se ha demostrado una acción. |
| `inferred` | Hay una diferencia, pero un diagnóstico real requiere un adaptador. |

Desde la raíz del repositorio ejecuta:

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py scripts\validate_universal_seam_fixture.py
& $py scripts\test_universal_seam_fixture.py
```

Los comandos revisan un contrato fijo y sus pruebas de límite. No contactan un
modelo ni un servicio.

## Ficha acotada

```text
Tarea: Clasificar una unión en un registro ficticio dado.
Leer primero: cases.json y expected/acceptance.json.
Permitido: Comparar valores fijos y redactar una nota local.
No usar: red, cuenta, secreto, repositorio real, herramienta activa, comando,
commit, push ni destino de publicación.
Aceptación: Indicar desajuste, inferencia no justificada, comprobación mínima,
condición de parada y estado limitado dado.
Recibo: ID del caso, campos observados, decisión, lista no verificada y si
hará falta un futuro adaptador.
Parada: Hace falta comportamiento, permiso, esquema o estado externo real.
```

## Lo que un aprobado no demuestra

Solo muestra que los registros ficticios fijos cumplen su contrato; no prueba
un problema externo, conducta de plataforma, acción ejecutada, transferencia,
seguridad, portabilidad ni preparación para publicar.
