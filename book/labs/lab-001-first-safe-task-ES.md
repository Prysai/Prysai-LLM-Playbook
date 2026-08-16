<!-- content_id: lab-001-first-safe-task | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

---
id: lab-001-first-safe-task
title: "Completa un cambio acotado de README y demuestra qué ocurrió"
level: L1
domain: general
goal: "Practicar inspección antes de editar, mínima autoridad, revisión de diff, verificación enfocada y recuperación honesta"
setup: "Un proyecto Git descartable o no productivo con README y una fuente real de comando local; sin secretos, datos de clientes, archivos de producción ni escrituras externas"
task: "Pide a Codex que inspeccione primero, espera confirmación, edita solo README.md y registra el diff real y el check enfocado"
evidence:
  - "Una tarjeta de tarea con objetivo, entradas, acciones permitidas y prohibidas, aceptación, condición de parada y formato de entrega"
  - "Línea base previa, plan de Codex, diff real y fuente del comando usada para verificar"
  - "Registro que separe acciones hechas, no hechas, resultado de verificación, incógnitas y siguiente check"
failure_variant: "Haz que el nombre de script discrepe del README, interrumpe un check de solo lectura incompleto o deja inaccesible la ruta permitida; observa si el aprendiz se detiene, conserva estado y evita ampliar autoridad"
reflection: "¿Qué punto de confirmación redujo más riesgo, qué probó el diff y qué quedó sin verificar tras el check?"
status: draft
last_verified: "not run"
transfer_task: "Reutiliza el protocolo para un informe de investigación con fuentes fijas o una edición estática de texto sin escrituras externas"
transfer_domain: "research, engineering, content, design, or marketing"
transfer_evidence: "Guarda ambos protocolos, los campos de evidencia cambiados, un registro de fallo y la lista explícita de no verificado"
transfer_limitations: "Este Lab enseña un límite local de bajo riesgo; no prueba autoridad de cuenta, seguridad de producción, publicación externa ni comportamiento de cada superficie de Codex"
---

# Lab 001: Haz un cambio seguro de README

## Para qué sirve este Lab

Este Lab es el puente L1 entre el mapa de límites estático del Capítulo 1 y un
cambio de archivo real pero controlado. No es una prueba de despliegue, de
conector ni una demostración de que una etiqueta actual de permiso de Codex sea
efectiva en todas partes.

La ejecución obligatoria debe permanecer en un proyecto descartable o no
productivo. No pegues credenciales, tokens, cookies, claves privadas, archivos
`.env`, registros de clientes ni configuración de producción en la tarea.

## Preparación

1. Si no tienes un proyecto descartable, comienza con
   [Primer cambio seguro](../routes/first-safe-change-ES.md). Es el sandbox
   predeterminado para novatos y no necesita Git, cuenta, instalación ni red.
   De lo contrario, elige una copia Git descartable que puedas abandonar.
2. Registra la ruta absoluta y, si es un proyecto Git, el `git status` actual.
   Para el fixture registra `not a Git sandbox`; no inventes una identidad de
   repositorio.
3. Guarda el `README.md` original o crea un checkpoint limpio.
4. Identifica el archivo real que define los comandos locales. No inventes un
   comando desde la memoria ni desde un resultado de búsqueda.
5. Escribe la única edición permitida: `README.md`.
6. Confirma que esta ejecución no incluye instalación, red, commit, push,
   publicación, mensaje externo, lectura de secretos ni acción de producción.

Si algo no está claro, detente y marca el Lab como `blocked`; no «pruebes
primero». Crea un ID como `lab001-readme-2026-08-15-a`: identifica el registro,
no es evidencia por sí mismo.

## Cuatro respuestas antes de la primera acción

### Problema

Una carpeta, una etiqueta de permiso o un mensaje seguro de finalización pueden
parecer un inicio seguro sin nombrar el archivo modificable ni la evidencia que
se guardará. Ninguna de esas señales sustituye aquí una tarea acotada.

### Concepto

Esta es una comprobación de límites escrita, no una prueba de capacidad de un
producto. Una tarea de archivo necesita cuatro respuestas independientes: su
sandbox local efectivo, el único objetivo editable, las acciones permitidas y
el recibo. Una respuesta vacía o `unknown` es señal de parada, no un hueco que
deba rellenarse adivinando.

### Decisión y acción

Escribe estas cuatro líneas en el registro antes de enviar la tarea. Solo el
fixture Primer cambio seguro puede usar `not a Git sandbox`; un proyecto real
sigue necesitando su identidad Git observada.

| Pregunta | Registrar | Continúa solo si | Detente si |
| --- | --- | --- | --- |
| ¿Dónde se ejecutará? | Sandbox declarado, directorio actual observado y raíz/branch/`HEAD` del repositorio, o `not a Git sandbox` para el fixture | El directorio observado está dentro del sandbox y cada identidad describe la misma copia local | Falta, es ambigua, queda fuera o discrepa una identidad necesaria |
| ¿Qué puede cambiar? | Solo `README.md` | El objetivo es un archivo existente dentro del sandbox | Hace falta otra ruta o no se identifica el objetivo |
| ¿Qué está permitido? | Inspeccionar, informar plan y editar solo tras aprobación; mantener exclusiones de preparación | Es reversible y no requiere autoridad nueva | Requiere secreto, instalación, red, commit, push, publicación, borrado u otra escritura externa |
| ¿Cuál es el recibo? | Línea base, diff exacto, fuente de comando, salida de check e incógnitas | Puedes inspeccionar y conservar cada elemento | Solo habría una frase de estado o respuesta no revisable |

No inicies la tarea hasta que cada respuesta sea concreta. Si no dispones de
archivos locales, usa el First Win público de solo texto: es otro ejercicio
ficticio y no sustituye a un sandbox de proyecto.

### Evidencia, fallo y reflexión

Guarda las cuatro respuestas con la línea base. En Git, registra directorio,
raíz, branch o `HEAD` y sandbox declarado antes de editar. Para el fixture,
registra su ruta copiada y `not a Git sandbox`. Si una identidad cambia durante
la tarea, detente, actualiza la tarjeta y pide una decisión nueva y estrecha.
Completar esta comprobación solo muestra que elegiste un inicio limitado: no
prueba que Codex ejecute la tarea, que el Lab pase o que hayas aprendido.

## Tarea

Entrega a Codex una solicitud limitada como esta, sustituyendo los campos entre
ángulos por hechos del sandbox:

```text
ID de ejecución: lab001-readme-<fecha>-<sufijo>
Objetivo: añadir una sección local correcta a <ruta-absoluta>/README.md.
Sandbox: <ruta-absoluta>; el único archivo editable es README.md.
Leer primero: README.md, el manifiesto package/build y el archivo de script.
Edición permitida: solo README.md.
No hacer: instalar, red, modificar código, commit, push, publicar, enviar
mensajes, leer secretos ni usar datos de producción.
Recibo: línea base, plan, diff exacto, fuente de comando, salida del check y
lista explícita de elementos no verificados.
Antes de editar: informar directorio actual, raíz y branch o HEAD cuando
corresponda (si no, `not a Git sandbox`), sandbox declarado, línea base,
plan, fuente de comando y check de aceptación.
Después de editar: mostrar el diff exacto y ejecutar solo checks aprobados.
Si ruta, comando, permiso o recuperación no está claro: detenerse y preguntar.
```

Lo importante es el contrato, no la frase exacta. Antes de editar, confirma que
se entendieron objetivo, línea base, ruta permitida, acciones prohibidas y
prueba de aceptación. Corrige el plan antes de permitir la edición.

## Evidencia que debes guardar

Conserva un registro con estos campos:

```text
run_id:
checkpoint_before:
preflight_sandbox:
preflight_observed_directory:
preflight_repository_root:
preflight_branch_or_head:
preflight_edit_target:
preflight_allowed_actions:
preflight_receipt:
scope:
inputs_read:
assumptions:
actions_done:
actions_not_done:
diff_scope:
verification_command:
verification_result:
unverified:
blocked_on:
next_check:
permission_boundary:
status: passed | failed | stopped
```

Un registro que pasa dice únicamente que cambió `README.md`, que el comando
documentado tiene soporte en la fuente real del proyecto, que no ocurrió una
escritura externa y que cualquier aplicación no ejecutada o checker no
disponible se nombra explícitamente.

La evidencia debe distinguir un plan de una acción, un comando propuesto de un
comando ejecutado, un diff de un check aprobado y un check interrumpido de uno
correcto.

## Sonda de capacidad segura

Si la tarea depende de un directorio o espacio de trabajo declarado, añade una
sonda inocua antes de editar:

1. confirma la ruta absoluta y que está dentro del sandbox aprobado;
2. escribe un archivo centinela temporal no secreto exactamente en la ruta
   permitida;
3. léelo de vuelta y registra el resultado; y
4. elimínalo solo si la limpieza también está dentro del alcance aprobado.

La sonda no lee credenciales, cambia permisos, instala paquetes, usa red ni
toca otro repositorio. Una escritura correcta prueba una operación inocua en
una ejecución, no acceso amplio a herramientas o producción. Si ruta o
limpieza no están claras, registra `blocked` o `unverified` y detente.

## Variantes de fallo y límite

Úsalas solo en una copia descartable.

### Variante A: fuentes de verdad en conflicto

Cambia temporalmente el nombre de script en el manifiesto copiado para que no
coincida con el comando solicitado en README. Pide completar la tarea. El
resultado seguro es identificar el conflicto y detenerse para aclararlo, no
elegir el comando que «parece más probable».

### Variante B: verificación incompleta

Haz que un check inocuo de solo lectura espere o devuelva salida incompleta;
detenlo con el control seguro disponible y registra el último evento. Inspecciona
diff y estado. El resultado seguro es `stopped` o `unverified`, no `passed`.

### Variante C: límite de autoridad

Añade una petición de instalar dependencia, leer secreto, usar red o hacer
push. La respuesta correcta es una decisión nueva y estrecha o un registro
bloqueado. No amplíes acceso para que el ejercicio parezca terminado.

### Variante D: capacidad no coincidente

Declara un directorio, pero deja la ruta centinela fuera del sandbox o ausente.
El resultado seguro es comunicar la discrepancia y detenerse antes de editar;
no buscar otra ruta ni pedir acceso amplio.

## Lista de aceptación

- [ ] La tarjeta nombra un archivo objetivo y una única ruta editable.
- [ ] Sandbox declarado, directorio observado, raíz Git, branch/`HEAD`,
      objetivo, acciones permitidas y recibo están escritos antes de actuar.
- [ ] Directorio, raíz y branch/`HEAD` describen la misma copia local.
- [ ] Existe línea base y se identifican cambios previos.
- [ ] Codex inspeccionó antes de editar y expresó un plan limitado.
- [ ] El diff real se limita al archivo autorizado.
- [ ] El comando de verificación viene de configuración real.
- [ ] Hay salida real o se declara explícitamente `not run`/`stopped`.
- [ ] Las variantes de fallo conservan estado y no amplían permisos.
- [ ] El relevo enumera cambios, no cambios y alcance no verificado.

## Reflexión

Responde en tu registro:

1. ¿Qué punto de confirmación evitó el mayor error posible?
2. ¿Qué demostró el diff y qué no demostró?
3. Si un check se atascó, ¿qué siguió sin saberse tras interrumpirlo?
4. ¿Qué campo único añadirías a la tarjeta antes de repetirla?
5. ¿Cuál de las cuatro respuestas previas costó más concretar y cambió el
   límite de la tarea?

## Tarea de transferencia

Reescribe la tarjeta para un informe de investigación de fuentes fijas, un
cambio estático de marketing, un inventario de contenido o una revisión de
diseño con captura/registro guardado. Conserva objetivo, entradas, límites,
acciones permitidas, aceptación, fallo y entrega; añade límites de fuentes,
privacidad, muestreo, revisión humana o evidencia visual propios del dominio.

## Estado y límites

Este Lab es `draft` y `not_run`. La validación estructural no afirma que lo
completó una persona. No prueba que una cuenta, modelo, Skill, herramienta,
conector o superficie concreta pueda hacer la misma tarea.

Lee el [Capítulo 2](../chapters/02-first-safe-task-ES.md), la línea base
oficial, el estudio de problemas y el registro de fricción de los primeros
cinco minutos antes de adaptar este Lab a una tarea de mayor riesgo. Esas
fuentes aportan contexto acotado; no son evidencia de que el Lab, una superficie
de producto o un aprendiz hayan funcionado correctamente.
