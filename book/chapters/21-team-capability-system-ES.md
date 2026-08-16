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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="20-personal-codex-work-system-ES.md">← Anterior<br><strong>Capítulo 20 · construir un sistema personal de trabajo con Codex</strong></a></td><td align="right"><a data-chapter-nav="next" href="../table-of-contents-ES.md">Siguiente pendiente →<br><strong>Ver disponibilidad del Capítulo 22</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
