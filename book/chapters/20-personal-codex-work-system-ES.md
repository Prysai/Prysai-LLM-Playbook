<!-- content_id: chapter-20-personal-codex-work-system | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 20: construir un sistema personal de trabajo con Codex

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Este capítulo presenta un método transferible; no supone que memoria, carga automática o puntos de entrada de un producto sean permanentes.

## El problema

Muchas personas vuelven a explicar proyecto, objetivo, términos, límites y aceptación desde cero. Aparecen contexto inconsistente, decisiones sin rastro, comandos obsoletos reutilizados y experiencia que no llega a la siguiente tarea. Un riesgo mayor es usar una nota de conveniencia como almacén de tokens, contraseñas, cookies, texto de clientes o conclusiones no confirmadas.

## Cinco activos, cinco trabajos

| Activo | Pregunta | Ciclo | Excluir |
|---|---|---|---|
| Reglas de proyecto | ¿Qué debe obedecer siempre? | Versionado y revisado | Suposiciones temporales y secretos |
| Contexto de tarea | ¿Qué hay que hacer ahora? | Nace y se archiva por tarea | Historia no relacionada |
| Estado actual | ¿Qué se leyó, cambió, verificó o bloqueó? | Se actualiza en checkpoints | Planes presentados como resultados |
| Plantilla | ¿Cómo comienza y se entrega trabajo parecido? | Se extrae tras práctica repetida | Conclusiones permanentes no verificadas |
| Reflexión | ¿Qué funcionó, falló o cambia después? | Solo lecciones transferibles | Tokens, cookies, texto de cliente y datos innecesarios |

Más contexto no siempre ayuda: importan relevancia, fiabilidad, sensibilidad y frescura.

## ¿Crear Skill o conservar protocolo?

| Observación | Decisión | Evidencia necesaria |
|---|---|---|
| Trabajo único o entradas/salidas inestables | Mantener protocolo de tarea | Entrada, límites, decisiones y entrega de un trabajo |
| Entradas, decisiones y salidas estables con ejemplos positivos y de fallo | Crear candidato de Skill | Al menos tres ejecuciones, fallos y transferencia |
| Método útil pero trigger o efectos inciertos | Seguir observando o bloquear | Registro de brecha, riesgo y validación pendiente |
| Secretos, escritura externa o release sin autorización/rollback claros | Bloquear | Matriz de permisos, confirmación humana y rollback |

Una coincidencia afortunada no justifica un Skill. Registra ID de decisión, tarea recurrente, activo candidato, entradas estables, fallos, evidencia, propietario, revisión y acción.

## El paquete personal mínimo

Empieza con mapa de proyecto, protocolo de tarea, log de estado, índice de evidencia y reflexión. Al iniciar, inspecciona reglas, rama, estado y permisos. Durante la ejecución solo lleva contexto necesario; al entregar separa verificado de abierto; al reflexionar extrae una regla que otra persona pueda entender y comprobar.

Una entrega nombra cambios, comandos que realmente corrieron, resultados y códigos de salida, elementos no verificados o fuera de alcance, riesgos, recuperación y siguiente responsable. No conviertas hábito personal en promesa de producto: comprueba documentación actual y superficie autorizada.

## Práctica y límite

En una copia temporal clasifica cuatro avisos fijos: desborde móvil con captura pero sin arreglo; build que pasa sin aceptación; autenticación sin versión, entrada o log; y copia sin audiencia ni fuente. Compara A, solo tarea e input, con B, los cinco registros. Restaura mismo input y baseline para dos ejecuciones de cada camino; guarda hash, `run_id`, rondas de aclaración, cambios reales, validación, seis piezas de evidencia, retrabajo, elementos no verificados y estado.

Añade un comando viejo y un directorio antiguo como fixture. El resultado correcto es marcarlos obsoletos y detener su reutilización. El experimento solo pasa con cuatro logs completos, sin secretos ni efectos externos y con aceptación revisada; aun así no verifica el Skill ni un comportamiento real de memoria.

## Convertir un hábito personal en una entrega comprobable

Un sistema personal no consiste en anotarlo todo. Debe permitir que la siguiente tarea responda pronto: ¿qué hay que entregar?, ¿qué hechos se comprobaron? y ¿dónde hay que detenerse para preguntar a una persona? Si un registro no ayuda a responder esas preguntas, redúcelo; no lo sigas acumulando.

```yaml
handoff_id: personal-system-20-example
goal: "Decidir si cuatro reportes pueden avanzar con seguridad"
read: ["reglas del proyecto", "entrada de tarea", "estado actual"]
changed: []
verified: ["hash de entrada", "rama actual", "sin escritura externa"]
not_verified: ["entrada real de inicio de sesión", "aceptación del build por usuario"]
blocked_by: ["faltan versión, entrada y log de error"]
next_owner_action: "completar entrada y clasificar de nuevo"
recovery: "borrar registros temporales y restaurar la copia limpia"
```

En `verified` solo van comprobaciones reales. Planes, predicciones y «funcionó antes» pertenecen a `not_verified` o `blocked_by`; así nadie confunde la entrega con una declaración de finalización.

## Empieza en diez minutos: deja una tarjeta para la próxima tarea

No necesitas construir primero un «segundo cerebro». Antes de pedir al modelo que edite documentación, ordene fuentes o revise código, dedica tres minutos a esta tarjeta y dos más al terminar. Es más fácil de revisar y de entregar que un historial de chat interminable.

```text
Objetivo: ¿qué resultado concreto necesito?
Entrada: ¿qué archivos, textos o enlaces están permitidos?
Límites: ¿qué no puede cambiarse y qué requiere preguntar antes?
Aceptación: ¿qué archivo, prueba, página o registro lo comprobará?
Resultado: ¿qué cambió realmente, qué comandos corrieron y qué evidencia falta?
Siguiente paso: ¿quién continúa y bajo qué condición?
```

«Mejora el README» aún no es una tarea transferible. Cámbialo por «reescribe solo los tres primeros párrafos de `README.md`; no cambies licencia, enlaces ni afirmaciones factuales; comprueba enlaces locales; deja los hechos de producto sin revisar como pendientes». Así cualquiera sabe qué puede hacer el modelo, qué no y qué debe quedar al final. Las sugerencias del modelo van primero a «por verificar», no directamente a «resultado».

## Extensión: detectar primero información obsoleta

Antes de una ejecución A/B, añade al `project-map` un comando antiguo y un directorio que ya no existe, sin ejecutarlos. Pide anotar fuente, última fecha de confirmación, estado actual y forma segura de comprobarlo. La respuesta correcta no es «probar otra vez»: inspecciona el estado autorizado, marca `stale` y conserva la incertidumbre.

1. Si no puedes confirmar el estado actual, usa `blocked`; no supongas que el comando sigue siendo válido.
2. Si el directorio existe pero su propósito no está claro, registra la observación y no lo trates como destino escribible.
3. Si hace falta cuenta, red o escritura externa, detente y pide autorización explícita.
4. En la reflexión conserva una regla transferible —«comprueba fuente y fecha al empezar»—, no el comando viejo como plantilla permanente.

## Comprobación propia

- [ ] Una persona nueva encuentra objetivo, evidencia y bloqueo sin explicación oral.
- [ ] Puedo explicar por qué un record es `stale` y cuál es la acción mínima para volver al hecho actual.
- [ ] No convierto notas personales en almacén secreto, promesa de memoria de producto ni Skill verificado.
- [ ] Distingo entre falta de entrada, ejecución posible y confirmación humana necesaria.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="19-evaluate-models-and-workflows-ES.md" aria-label="Capítulo anterior: Capítulo 19 · evaluar modelos y flujos de trabajo, de impresiones a evidencia">← Anterior<br><strong>Capítulo 19 · evaluar modelos y flujos de trabajo, de impresiones a evidencia</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="21-team-capability-system-ES.md" aria-label="Capítulo siguiente: Capítulo 21 · construir un sistema de capacidades para el equipo">Siguiente →<br><strong>Capítulo 21 · construir un sistema de capacidades para el equipo</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
