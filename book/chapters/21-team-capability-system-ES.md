<!-- content_id: chapter-21-team-capability-system | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 21: construir un sistema de capacidades para el equipo

**Estado:** `candidate`. **Experimento:** `draft / not_run`. La práctica es una simulación estática: no autoriza conexiones, envíos, escrituras, pushes, publicaciones ni demuestra que un servicio funcione en producción.

## El problema

Una persona puede guiar una tarea con experiencia propia. Un equipo necesita algo que sobreviva a esa persona: lenguaje común, método, evidencia y responsables. Sin ello, las buenas costumbres se transmiten oralmente, los permisos se amplían sin revisión y nadie sabe qué retirar cuando una fuente o un proceso queda obsoleto.

## Cuatro capas de un paquete de capacidad

```text
Reglas y lenguaje compartidos
            ↓
Método reutilizable y Skill
            ↓
Experimentos, tareas y estándar de evidencia
            ↓
Permisos, revisión, versiones y responsables
```

El método no basta. La evidencia delimita lo que puede afirmarse; la gobernanza decide quién puede usar, cambiar, liberar o revocar el paquete.

## Decisión: permiso no equivale a autorización

| Acción | Alcance seguro | Aprobación | Evidencia y recuperación |
|---|---|---|---|
| Análisis | Copia anonimizada y solo lectura | Propietario de tarea | Fuentes y registro; descartar copia |
| Borrador | Rama aislada y archivos nombrados | Propietario y revisor | Hash inicial, diff y validación; restaurar diff |
| Comprobación | Datos de prueba y comandos nombrados | Responsable de ejecución | Log y código de salida; detener proceso |
| Push o release | Repositorio o destino de borrador nombrado | Revisor o responsable de release | Vista previa, aceptación y rollback; revertir versión |
| Permisos o secretos | Mínimo, temporal y revocable | Autorizador nombrado; doble revisión si aplica | Alcance, caducidad y auditoría; revocar de inmediato |

Tener acceso no es una aprobación de tarea. Si objetivo, aprobador o rollback no están claros, el estado correcto es `blocked`.

## Acción: contrato mínimo del paquete

```text
capability-pack/
├─ README.md                  # propósito, alcance, reproducción y límites
├─ manifest.yaml              # id, versión, responsable, estado y revisión
├─ context/project-context.md # términos, límites y fuentes confiables
├─ protocol/task-protocol.md  # entrada, decisiones, acciones y paradas
├─ examples/                  # caso positivo y caso de fallo
├─ eval/                      # aceptación e índice de evidencia
└─ governance/                # permisos, responsabilidades y rollback
```

El manifiesto debe nombrar `id`, `version`, `owner`, `status`, fuente y licencia, `next_review`, alcance permitido y rollback. Una versión identifica un cambio; no demuestra comportamiento verificado.

## Experimento: entregar y reproducir un paquete

En un repositorio temporal, dos personas usan la tarea fija «revisión de documento antes de release» o «orientación de un nuevo miembro». El input incluye elementos terminados, elementos sin verificar, un comando obsoleto y un permiso que exige confirmación. A ejecuta el protocolo y guarda hash y log; B recibe solo el paquete y el input, trabaja en otra copia y registra lo leído, acciones, paradas, diff, validación y lagunas de conocimiento implícito. A modifica una sola capa, cambia `0.1.0` a `0.1.1` y B repite.

No conectes cuentas, subas datos, envíes mensajes, hagas push ni guardes secretos duraderos.

Cada ejecución debe guardar `run_id`, miembro, versión, hash de entrada, cambios reales, comandos y códigos de salida, revisor, elementos no verificados y estado. El pase candidato exige que A y B alcancen 8/10 en comprensión, contexto, límites de acción, evidencia y parada ante fallos, sin acciones no autorizadas ni ayuda oral. Sin registro independiente, matriz de permisos, hash o rollback, sigue siendo `candidate` o `blocked`.

## Fallo y reflexión

Quita `owner` y `version`: el revisor debe rechazarlo. Marca en una lista estática todas las capacidades externas como `requested`: eso no es permiso real; hay que detenerse y pedir alcance, objetivo, aprobador, caducidad y rollback. Clasifica cada laguna como lenguaje, método, evidencia o gobernanza. «Lo entiendo» no sustituye un log, un diff ni una reproducción independiente.

## Lista de aceptación

- [ ] Distingo experiencia personal de lenguaje, método, evidencia y gobernanza compartidos.
- [ ] El paquete tiene versión, responsable, fuente, permisos y rollback.
- [ ] Otra persona reproduce el flujo clave sin explicación oral.
- [ ] Cada ejecución conserva hash, log, diff, validación y elementos no verificados.
- [ ] Puedo bloquear permisos o releases de alcance excesivo.

Los permisos, conectores y superficies de producto son hechos cambiantes: comprueba la documentación oficial vigente. Este capítulo continúa siendo `candidate`; la simulación no prueba impacto de equipo ni conectividad de producción.

## Enviar contribuciones que se puedan revisar rápido

El equipo no necesita convertir cada idea en un cambio enorme. Un PR de prueba o contenido fácil de revisar resuelve un solo problema y permite localizar fuente, cambio, validación e incertidumbre en pocos minutos.

```yaml
contribution_type: "test-case | content-correction | translation | skill-candidate"
problem: "una afirmación concreta que corregir o comprobar"
scope: "archivos permitidos y lo que no cambia"
source_or_fixture: "URL oficial o fixture mínimo que se puede compartir"
expected_result: "salida, fallo o condición de bloqueo comprobable"
evidence: "comando, log, diff, captura o ubicación de puntuación"
license: "original o registro de licencia en el inventario de activos"
reviewer_questions: ["¿hay fuente para el hecho?", "¿cambia permiso o alcance?", "¿qué ocurre si falla?"]
```

No pegues secretos, datos reales de clientes, salidas no autorizadas ni material que no se pueda redistribuir. Si una prueba exige cuenta, pago, red, escritura o permiso específico de plataforma, márcala primero `requested` o `blocked`; ni CI ni el mantenedor deben adivinar la autorización.

### Ruta mínima para una fusión rápida

1. Un PR contiene un cambio revisable por sí mismo; separa reformatos de cambios de contenido.
2. Una prueba aporta input fijo, resultado esperado, condición de fallo y comando mínimo; si no se ejecutó, dice `not_run`.
3. Un cambio de contenido aporta afirmación, fuente, fecha de acceso, alcance y fecha de revisión; una traducción indica además fuente inglesa y estado de revisión.
4. El mantenedor revisa primero licencia, datos, permisos y rollback; después enlaces, estructura y pruebas pertinentes.
5. Solo los cambios de alcance claro, evidencia localizable, checks aprobados y sin ampliación de permisos son candidatos a fusión rápida; los demás piden aclaración o siguen `candidate`.

### Un PR de prueba que puedes imitar

Supón que una lección llama «función terminada» a un build que pasa. No envíes una objeción vaga ni cambies diez capítulos a la vez. Abre un PR pequeño: añade un input sintético y público cuya salida esperada conserva «build que pasa» como evidencia de build y «aceptación de usuario» como no verificada. Si falla, el mantenedor sabe qué límite se rompió; si pasa, solo demuestra que esa regla sigue comprobándose.

```text
Título: test: keep build success separate from user acceptance
Alcance: un fixture y su aserción; sin hechos de producto ni permisos nuevos
Reproducción: <comando mínimo>
Esperado: build = verified; aceptación de usuario = unverified
Material: texto sintético original; sin cuentas, clientes, secretos ni capturas restringidas
```

No se fusiona rápido solo por ser pequeño, sino porque se pueden comprobar alcance, licencia, fallo esperado y comando en minutos. Si no puedes aportar esos datos, abre una discusión o usa `blocked`; no dejes que el mantenedor complete tus supuestos.

## Comprobación propia

- [ ] Puedo convertir una propuesta en problema único, input fijo y resultado comprobable, no «hazlo mejor».
- [ ] Sé qué no puede entrar en un PR y no sustituyo autorización o revisión independiente por CI verde.
- [ ] Puedo explicar por qué un cambio se fusiona rápido o debe quedar `blocked` / `candidate`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-ES.md" aria-label="Capítulo anterior: Capítulo 20 · construir un sistema personal de trabajo con Codex">← Anterior<br><strong>Capítulo 20 · construir un sistema personal de trabajo con Codex</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="22-continuous-update-and-future-proofing-ES.md" aria-label="Capítulo siguiente: Capítulo 22 · actualización continua y preparación para el futuro">Siguiente →<br><strong>Capítulo 22 · actualización continua y preparación para el futuro</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
