<!-- content_id: chapter-09-verification-and-recovery | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 9: verificación, duda y recuperación

**Estado:** `candidate`. **Experimento:** `not_run`. Este capítulo enseña a comparar una afirmación con su evidencia y a recuperar un flujo incierto; no es una reproducción local ni una prueba de producción.

## El problema

Un Agent puede redactar un resumen convincente sobre un resultado equivocado, fuera de alcance, nunca ejecutado o revisado en el entorno incorrecto. La respuesta no es confianza ciega ni sospecha permanente: separa el resumen en afirmaciones y asigna a cada una la evidencia mínima que pueda sostenerla en el alcance declarado.

| Afirmación | Evidencia mínima | No demuestra |
|---|---|---|
| Un archivo cambió | Diff, ruta o hash | Que sea correcto o completo |
| Una comprobación pasó | Orden, directorio, código de salida y salida relevante | Igual comportamiento en otro entorno |
| La aplicación se ejecuta | Inicio real y observación de ruta crítica | Valor de usuario, seguridad o producción |
| La página se ve correcta | Revisión renderizada con viewport registrado | Accesibilidad completa, backend o conversión |
| Un hecho es oficial | URL autorizada, fecha, alcance y responsable | Acceso de esta cuenta o configuración local |

Una prueba débil no puede sustituir a todas las demás. Un build correcto no prueba ejecución; una captura no prueba demanda; un enlace oficial no prueba acceso.

## Localiza la primera ruptura

```text
solicitud → autorización → herramienta visible → acción → resultado → revisión
```

Marca la primera flecha que no puedas observar. Una sesión disponible no prueba que una herramienta esté registrada; recuperar el control de una ejecución no prueba el resultado deseado.

| Estado | Significa |
|---|---|
| `verified` | La evidencia declarada sostiene la afirmación en ese alcance |
| `unverified` | Falta evidencia necesaria; no concluye que sea falso |
| `unknown` | No hay observación suficiente para clasificar |
| `partial` | Una parte concreta está respaldada y otra no |
| `not_observed` | El proyecto no registró la observación |
| `error` | Hay evidencia de fallo para la operación declarada |

## Recupera con una sola comprobación segura

Ante capacidad agotada, una orden que sigue en `Working`, una herramienta ausente o una propuesta de reinstalación, conserva primero diff, salida, registro y último checkpoint aceptado. Después elige una acción acotada: inspeccionar el destino, repetir una orden idéntica con límite, pedir una entrada o detenerte. Un check no autoriza instalación, reinicio, despliegue o escritura fuera del alcance.

```text
claim: Todas las pruebas pasaron
evidence: falta la salida de pruebas
status: unverified
next_check: ejecutar solo la orden aprobada en el directorio y revisión fijados
```

## Experimento y límite

Prepara un resumen redactado, un diff, salida de pruebas, enlaces de fuente y una pieza de evidencia ausente. Con el Lab 003 crea una tabla de afirmación, alcance, evidencia, estado y siguiente paso. Añade deliberadamente «todas las pruebas pasaron» sin salida y recházala aunque el tono sea seguro.

Guarda la tabla, las rutas de evidencia y el plan de recuperación. Incluye una afirmación factual, una de ejecución y una de efecto en usuarios; explica por qué no comparten una prueba débil. No conectes servicios de producción ni modifiques sistemas externos. La recuperación puede volver observable el estado, pero no lo mejora automáticamente a `verified`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="08-full-lifecycle-workflow-ES.md">← Anterior<br><strong>Capítulo 8 · de la definición a la entrega</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-ES.md">Siguiente pendiente →<br><strong>Ver disponibilidad del Capítulo 10</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
