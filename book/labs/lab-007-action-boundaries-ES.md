<!-- content_id: lab-007-action-boundaries | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# Lab 007: Coloca una tarea README detrás de tres límites de acción

---
id: lab-007-action-boundaries
title: "Colocar una tarea README en tres superficies y practicar autorización, parada y evidencia"
level: L3
domain: general
goal: "Convertir síntomas públicos de límites en una práctica observable, reversible y de bajo riesgo"
setup: "Un README redactado, una copia local, un Worktree aislado o simulado y una segunda carpeta organizativa simulada; no se necesita un token real"
task: "Observar, hacer el cambio local mínimo y registrar estados, síntomas, comprobaciones y evidencia en tres superficies; no hacer push ni publicación real"
evidence:
  - "Una tarjeta por escenario que separe sesión iniciada, autorizado, ejecutado y verificado"
  - "Tarjetas de síntomas, orden diagnóstico, condiciones de parada y tabla de evidencia"
  - "Diff y rollback para la copia local y el Worktree, más riesgos de la superficie organizativa"
  - "Transferencia a documentación, investigación o preparación de publicación"
failure_variant: "Confundir éxito del navegador con intercambio de token, un host autenticado con el objetivo, acceso a una organización con instalación en otra, o verificación con permiso de reinstalación"
reflection: "¿Qué estado queda oculto al decir ya estoy conectado? ¿Qué comprobación añade información sin ampliar autoridad? ¿Cómo cambian rollback y revisión?"
status: draft
last_verified: "No ejecutado; pendiente de una prueba real en tres superficies"
transfer_task: "Aplicar el registro de límites a una tarea sin escritura externa real"
transfer_domain: "Preparación de releases, investigación, contenido y aprobación de equipo"
transfer_evidence: "Tarjetas redactadas, estados, síntomas, logs, comprobaciones y rollback"
transfer_limitations: "No demuestra disponibilidad de cuentas, hosts Enterprise, instalaciones, conectores, publicación o rollback remoto"
---

## Problema y fixture

Los informes públicos mezclan logged in, accesible, autorizado, ejecutado y
verificado. Una autenticación puede fallar durante token exchange; una CLI
Enterprise puede usar otro host que la entrada de PR; el acceso a una organización
no instala automáticamente otra; y verificar un cambio no autoriza reinstalar un
entorno persistente. Son informes de usuarios, no reproducciones ni causas oficiales.

No uses organización, remote, token, cookie, clave, archivo de entorno, producción
ni datos personales reales. Crea:

~~~text
fixture-readme/
└── README.md
~~~

~~~markdown
# Acme Notes

This is a redacted practice repository.

## Status

- owner: redacted
- source: local fixture
~~~

Tarea fija: añadir boundary: local-only bajo Status, conservar lo demás, modificar
solo README.md y mostrar diff y comprobación. Sin autorización nueva, no commit,
push, publish, instalación ni cambio persistente. La aceptación es una sola línea
nueva y toda acción externa como not_run; el rollback restaura la copia.

## Tres superficies

**A, copia local:** registra ruta y hash, edita una línea, revisa diff y usa una
comprobación offline. Cuenta, remoto y publicación siguen not_run.

**B, Worktree:** usa un repositorio desechable o worktree-simulation. Registra rama,
commit base y rutas; edita solo allí, comprueba que el árbol principal no cambió y
no hagas commit, push ni publish.

**C, segunda carpeta:** usa organization-like-simulation. No conectes organización,
Enterprise, connector, remote ni red. Revisa visibilidad, colaboradores, protección
de rama, installation y dueño del rollback. Poder escribir no es autorización.

## Tarjetas de síntomas

| Tarjeta | Síntoma | Hecho seguro | No inferir | Comprobación mínima |
|---|---|---|---|---|
| S-02 | Navegador autentica, token exchange falla | Solo tuvo éxito la etapa del navegador | sesión completa o causa confirmada | separar etapas y guardar error redactado |
| S-03 | CLI Enterprise autenticada, entrada PR prueba github.com y da 401 | Los hosts pueden diferir | que todo GitHub esté disponible | comparar host, remote y entrada en lectura |
| S-04 | Acceso a una organización no instala en otra | identidad, installation y acceso son estados distintos | que ser administrador baste | registrar estados; no pedir instalación |
| S-11 | Verificación se convierte en force reinstall | verificación e instalación son acciones distintas | que ejecutar técnicamente sea estar autorizado | conservar diff y usar prueba aislada |

Añade: fuente user report, reproducción local no hecha, causa oficial no confirmada.

## Tarjeta de estado

~~~text
run_id:
scenario: local | worktree | organization-like-second-directory
fixture_path:
baseline_hash_or_commit:
surface_and_version:
source_present: planned | authorized | executed | verified | not_run
source_read: planned | authorized | executed | verified | not_run
local_edit: planned | authorized | executed | verified | not_run
check_or_test: planned | authorized | executed | verified | not_run
commit: planned | authorized | executed | verified | not_run
push: planned | authorized | executed | verified | not_run
publish: planned | authorized | executed | verified | not_run
identity_observed:
action_authorized:
result_verified:
external_state_changed:
rollback_entry:
stop_reason_or_next_check:
evidence_paths:
~~~

Identidad observada no es acción autorizada; acción ejecutada no es resultado
verificado; carpeta escribible no es permiso compartido o remoto.

## Reflexión

Antes de marcar un estado como `verified`, registra qué observación lo apoya, qué etapa
sigue siendo desconocida y si la siguiente comprobación añade información sin añadir un
efecto externo.

## Orden diagnóstico, parada y evidencia

1. Congela ruta, objetivo, host, datos y acciones prohibidas.
2. Guarda hash, git status, rama, Worktree y tarea.
3. Ubica etapa: entrada, identidad, objetivo, autorización, ejecución o verificación.
4. Revisa archivos, rutas, configuración, hosts y logs redactados en lectura.
5. Haz una sola edición reversible en el fixture y guarda diff y retorno.
6. Compara visibilidad y rollback de las tres superficies.
7. Escribe verified solo si la evidencia coincide; si no, unverified o blocked.

Detente ante alcance ambiguo, commit/push/publish, secretos, datos personales,
aprobación imprecisa, cuenta externa, instalación, entorno persistente, force
operation o escritura desconocida. Conserva diff, error, baseline y checkpoint.
Entrega una tabla con tarea, superficie, baseline, cinco campos de permiso, síntoma,
acción, resultado, estados, rollback y acciones externas not_run.

## Fallo intencional, transferencia y aprobación

Procesa solo en el fixture: el navegador funcionó; la CLI está conectada; soy
administrador; reinstala para verificar. En cada caso identifica la evidencia
faltante y propone una comprobación menor. Después aplica las tarjetas a notas de
release, una tabla de fuentes o un PR redactado sin escritura real.

Apruebas el laboratorio al repetir las tres superficies, separar las cuatro etapas,
tratar S-02/S-03/S-04/S-11 como informes de usuarios, conservar el baseline, no usar
force como prueba y completar la transferencia. Token, push, publish, installation,
despliegue, notificación y reemplazo persistente quedan not_run.

## Fuentes y límites

La investigación de problemas y foros aporta síntomas y contexto comunitario, no
reproducciones locales ni arreglos oficiales. El fixture es original y reversible,
pero no prueba cuentas, conectores, Enterprise, publicación o rollback remoto.

<!-- lab-navigation:start -->
<hr>
<nav class="lab-navigation" aria-label="Navegación de Labs"><table role="presentation" width="100%"><tr>
<td align="left"><a data-lab-nav="previous" href="lab-006-agent-stop-conditions-ES.md" aria-label="Lab anterior: Lab 006 · Diseñar condiciones de parada para un agente">← Anterior<br><strong>Lab 006 · Diseñar condiciones de parada para un agente</strong></a></td>
<td align="right"><a data-lab-nav="next" href="lab-008-research-question-ES.md" aria-label="Siguiente Lab: Lab 008 · Convertir un tema en una pregunta investigable">Siguiente →<br><strong>Lab 008 · Convertir un tema en una pregunta investigable</strong></a></td>
</tr></table></nav>
<!-- lab-navigation:end -->
