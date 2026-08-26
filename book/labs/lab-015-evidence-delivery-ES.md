<!-- content_id: lab-015-evidence-delivery | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

---
id: lab-015-evidence-delivery
title: "Entregar evidencia, no una frase de finalización"
level: L5
domain: general
goal: "Separar afirmaciones de finalización en registros de evidencia con alcance y hallar la comprobación mínima siguiente"
setup: "Cambio de texto desechable, un check focalizado, otro omitido deliberadamente y traspaso anonimizado; sin servicio ni datos reales"
task: "Registrar fuente, check y afirmación de ejecución con alcance, comando u observación, resultado, salida guardada, estado y siguiente check"
evidence: ["Tabla afirmación-evidencia, salida cruda, diff y decisión de revisión", "Distinción explícita entre verified, partial, unverified, blocked y not_run"]
failure_variant: "Eliminar el archivo de salida y dejar el nombre del comando; marcar unverified o not_run"
reflection: "¿Qué afirmación fue más amplia que su evidencia y qué check pequeño cerraría la brecha?"
status: draft
last_verified: "not run"
transfer_task: "Aplicar la tabla a un sitio estático y separar fuente, build, navegador, captura y URL pública"
transfer_domain: "publicación web, documentación, investigación o ingeniería"
transfer_evidence: "Una fila por afirmación con alcance, comando u observación, resultado, ruta de salida y límite"
transfer_limitations: "Un check de fuente no prueba ejecución visual, aceptación del usuario ni URL pública"
---

# Lab 015: entregar evidencia, no una frase de finalización

## Por qué existe este Lab

Un comando puede ejecutarse mientras su salida queda oculta, truncada, asociada al
directorio equivocado o resulta demasiado débil para la afirmación que se hace.
Este Lab convierte una frase pulida de «terminado» en un registro que une cada
afirmación con su evidencia.

## Preparación

Crea un cambio de texto temporal con una comprobación concreta y otra que falte de
forma deliberada. Prepara un traspaso anonimizado con tres afirmaciones: una sobre
la fuente, una sobre la comprobación y una sobre la ejecución o el efecto para el
usuario. No uses un servicio real ni datos de usuarios.

## Tarea

Para cada afirmación, registra:

```text
claim:
scope:
command or observation:
working directory:
exit code / result:
saved output:
status: verified | partial | unverified | blocked | not_run
smallest next check:
```

Pide a una segunda persona —o a una sesión nueva— que rechace cualquier afirmación
cuya evidencia falte, cuyo alcance sea más amplio que la prueba o que solo se
infiera de otra fila.

## Evidencia

Conserva la tabla de afirmaciones, la salida cruda de los comandos, el diff y la
decisión de revisión. El registro debe mostrar por qué una comprobación correcta
de la fuente no demuestra por sí sola que el tiempo de ejecución visual o la
aceptación del usuario hayan sido correctos.

## Variante de fallo

Elimina el archivo de salida, pero deja el nombre del comando en el traspaso. El
estado correcto es `unverified` o `not_run`, no «probablemente pasó».

## Variante de campo: tres fallos de evidencia en Windows

Usa como casos de referencia los tres informes públicos de [Capítulo 9](../chapters/09-verification-and-recovery-ES.md). No intentes reproducir un problema de un producto externo como parte de este Lab. En su lugar, crea fixtures locales inofensivos que modelen la frontera de evidencia:

1. Genera más texto del que cabe en la ventana del terminal, guarda el mismo
   contenido en un archivo y compara lo que quedó guardado con lo que se vio.
2. Coloca caracteres BMP y no BMP en un fixture de texto. Compara la cadena
   prevista con la recibida antes de cualquier llamada a una herramienta; marca
   el caso como `blocked` si difieren.
3. Crea un repositorio Git temporal con un nombre de archivo de prueba normal y
   deliberadamente largo, solo si el sistema de archivos lo permite. Registra la
   longitud y el resultado de Git; no crees ni borres referencias internas de
   Codex ni cambies la configuración del repositorio.

Añade una fila por caso a la tabla de afirmaciones:

```text
reported symptom:
local fixture:
source URL:
local reproduction: not_run | observed | blocked
last confirmed stage:
first unknown stage:
durable evidence:
safe next check:
stop condition:
```

La conclusión correcta puede ser `reference-only`, `not_run` o `blocked`. Un
fixture local que modela una frontera no reproduce el problema externo, y una
solución copiada de un informe público no se convierte en un arreglo oficial.

## Transferencia

Usa la misma tabla en un sitio estático: distingue los archivos fuente presentes,
el artefacto construido, el renderizado del navegador, la captura revisada y la
URL pública alcanzable.

## Lista de aceptación

- [ ] Dividí cada frase de finalización en una afirmación con alcance.
- [ ] Los comandos incluyen ruta, código de salida y salida guardada.
- [ ] La evidencia que falta queda marcada de forma explícita.
- [ ] Una comprobación posterior no reescribe un intento anterior desconocido.
- [ ] El traspaso nombra la comprobación mínima siguiente y la condición de parada.

## Reflexión

Identifica la afirmación cuyo alcance superaba su evidencia y nombra la
comprobación mínima que cerraría esa brecha.

## Fuentes

- [Problemas de campo y patrones de prompts — P2](../../docs/research/field-problems-and-prompt-patterns-p2-2026-08-11.md), FP2-05, FP2-06 y FP2-20.
- [Capítulo 9: verificación, duda y recuperación](../chapters/09-verification-and-recovery-ES.md).

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr><td align="left"><a data-lab-nav="previous" href="lab-014-resume-reconciliation-ES.md">← Anterior<br><strong>Lab 014 · reconciliación al reanudar</strong></a></td><td align="right"><a data-lab-nav="next" href="lab-016-side-effect-boundary-ES.md">Siguiente →<br><strong>Lab 016 · detenerse en el límite de efectos externos</strong></a></td></tr></table></nav>
<!-- lab-navigation:end -->
