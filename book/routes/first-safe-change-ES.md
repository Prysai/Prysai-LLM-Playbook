<!-- content_id: first-safe-change-route | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: first-safe-change-EN.md | source_revision: worktree-2026-08-14 -->

# Primer cambio seguro: una práctica sin conexión antes del Lab 001

**Estado del contenido:** ruta suplementaria `candidate`. **Ejecución por
aprendices:** `not_run`.
**Estado de traducción:** borrador completo en español; falta una revisión
lingüística independiente.

Esta es la zona de pruebas inicial entre el Capítulo 2 y el Lab 001. Te da un
README deliberadamente incompleto, un único cambio local permitido y una
comprobación muy limitada antes de que trabajes en tu propio proyecto. No es
un Capítulo 23, una Skill nueva, un ejercicio de Git ni evidencia de que un
modelo haya terminado nada.

Si es la primera vez que abres una carpeta de proyecto o ejecutas una
comprobación, precisamente por eso existe esta ruta. No necesitas instalar
nada, crear una cuenta ni arriesgar un proyecto real. El objetivo es lo bastante
pequeño como para ver todos los archivos relevantes y decidir si la
comprobación responde realmente a la pregunta.

## Problema

El Lab 001 pide un proyecto descartable, una fuente real de comandos y un
cambio acotado de README. Esas condiciones son adecuadas cuando ya trabajas
con un proyecto, pero el primer paso práctico puede sentirse circular: quien
empieza todavía no tiene un proyecto seguro ni sabe qué fuente de comandos
debe creer.

## Concepto

Un fixture separa la *práctica del método* de la búsqueda de un proyecto
adecuado. Es sintético, local y descartable. El único cambio previsto es una
corrección del README; el comprobador solo lee ese archivo y comunica un
resultado pequeño. Así puedes ver una condición de aceptación sin necesitar
una cuenta, red, instalación, Git, commit, push, publicación ni datos
personales.

## Decisión

Cuando todavía no tengas un proyecto local descartable, usa el
[fixture Primer cambio seguro](../../examples/lab-001-v1/README.md) que
incluye este proyecto. Copia toda la carpeta del fixture en `.work/` o en otra
ubicación temporal para que su error inicial siga disponible para la siguiente
persona. No edites el fixture original del repositorio.

## Acción

Primero crea una copia de trabajo privada. En el gestor de archivos, copia la
carpeta completa `examples/lab-001-v1` a una ubicación que puedas descartar y
llama a la copia `first-safe-change`.

Después elige una de estas dos comprobaciones:

1. **Comprobación sin ejecutar programas (predeterminada).** Abre
   `seed/README.md` y `expected/acceptance.json` dentro de la copia. Antes de
   editar, al README le faltan dos detalles de vista previa obligatorios.
   Después del único cambio permitido, comprueba que el README contiene las
   tres cadenas indicadas en `required_readme_strings` del archivo de
   aceptación.
2. **Comprobador local opcional.** Úsalo solo si Python 3 ya funciona en tu
   equipo. Abre una terminal en la carpeta copiada y ejecuta:

```powershell
python .\seed\verify_readme.py
```

El primer resultado opcional debe ser `FIRST_SAFE_CHANGE_FAILED`. Es el punto
de partida intencional, no una instalación rota. Lee la tarjeta de tarea del
README del fixture, inspecciona `seed/README.md` y propone el cambio más
pequeño. Modifica **solo** ese README después de aprobar el plan. Repite la
misma comprobación manual u opcional. El resultado opcional de paso es
`FIRST_SAFE_CHANGE_OK`.

Si Python no está disponible, no instales un runtime ni sustituyas otro
comando solo para esta ruta. Usa la comprobación manual y registra
`check: manual required_readme_strings 3/3`. Si tampoco puedes crear una copia
local descartable, detente y usa el First Win de solo texto; no presentes la
vista web de GitHub como si fuera una zona de pruebas local.

## Evidencia

Conserva únicamente este recibo breve:

```text
sandbox: <ruta de la copia de trabajo>
baseline: FIRST_SAFE_CHANGE_FAILED
allowed_change: seed/README.md only
diff: <diferencia de README revisada>
check: manual required_readme_strings 3/3 | FIRST_SAFE_CHANGE_OK
external_actions: none
unverified:
  - learner completion
  - model behavior
  - transfer
```

El comprobador solo puede establecer que, en un momento concreto, este README
sintético contiene las cadenas declaradas. Un paso no prueba una operación de
Git, un navegador, permisos de cuenta, una revisión de seguridad ni que hayas
aprendido el método.

## Fallo y caso límite

No modifiques el comprobador, el archivo de aceptación ni otra ruta para
obtener un paso. Si el arreglo propuesto requiere una instalación, una llamada
de red, un secreto, una cuenta, una operación de repositorio o un segundo
archivo, detente. Es una decisión nueva, no parte de este fixture.

## Reflexión

1. ¿Qué parte de la condición de aceptación era observable antes de editar?
2. ¿Qué prueba la diferencia final que no prueba un mensaje seguro de “hecho”?
3. ¿Qué hecho de un proyecto real tendrás que establecer antes de repetir este
   patrón en el Lab 001?

## Continuar

El siguiente elemento registrado es [Lab 001: realizar un cambio seguro de
README](../labs/lab-001-first-safe-task-ES.md). Su traducción española todavía se está preparando y sigue en estado
`draft / not_run`. Esta ruta contiene una práctica completa por sí misma; no
te enviará silenciosamente a otra lengua ni presentará una fuente inglesa como
una traducción terminada.

## Estado y límites

Esta ruta sigue siendo `candidate / not_run` para aprendices. Las pruebas del
repositorio solo comprueban la forma del fixture y el comportamiento de paso o
fallo declarado por el comprobador. No observan a un aprendiz, no invocan
Codex ni otro modelo, no comparan productos, no prueban transferencia y no
validan un comando de proyecto real.
