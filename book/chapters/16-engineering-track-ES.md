<!-- content_id: chapter-16-engineering-track | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 16: ruta de ingeniería, de la idea al software fiable

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Este capítulo enseña un ciclo de ingeniería; los informes de campo no son reproducciones locales ni confirmaciones universales de causa raíz.

## El problema

Las tareas de ingeniería invitan a escribir código antes de aclarar requisitos, decisiones de arquitectura, pruebas, comportamiento en ejecución y rollback. Un parche puede compilar y pasar pruebas unitarias sin que funcione el camino de usuario, el manejo de errores, las versiones de dependencias, el despliegue o la recuperación.

> Construir, pasar unit tests, pasar integración, comportarse bien en ejecución, ser aceptado por usuarios y estar listo para producción son afirmaciones distintas.

Un Skill de ingeniería debe ser un ciclo con evidencia: cada etapa tiene condición de entrada, corte mínimo, rutas de fallo y evidencia de salida.

## El ciclo de ingeniería

```text
definir problema → especificar y aceptar → planificar cortes
→ implementar de forma incremental → checks y pruebas
→ verificar en ejecución → revisar y simplificar
→ liberar y recuperar → mantener y probar regresiones
```

| Etapa | Entrada | Evidencia mínima de salida |
|---|---|---|
| Definición | Problema y alcance | Enunciado repetible |
| Especificación | Límites, entradas, salidas y errores | Aceptación y no objetivos |
| Plan | Dependencias y riesgos | Cortes verificables por separado |
| Implementación | Corte actual y línea base | Diff pequeño y explicable |
| Pruebas | Se pueden ejercitar comportamiento y fallos | Comandos, resultados y explicación |
| Ejecución | Entorno arrancable y datos representativos | Versión, logs, respuesta o pantalla |
| Release | Revisión y rollback disponibles | Registro, monitorización y ensayo de rollback |

## Especifica antes de implementar

Para «añade exportación», pregunta formato, rango de datos, permiso, comportamiento de archivo parcial, política de sobrescritura y aceptación final. Una tarea debe indicar acción de usuario, restricciones de entrada, éxito, error, límites, no objetivos, rendimiento y seguridad, señales observables y método de aceptación. Un Skill no puede sustituir una decisión con un valor por defecto silencioso.

Trabaja guiado por fuentes, dudas e incrementos: documentación oficial, tipos, código actual o resultado reproducible son autoridad para APIs y versiones; los blogs y memoria del modelo son pistas. Comprueba lo que tipos y pruebas unitarias no prueban: red, base de datos, navegador, permisos, concurrencia, zonas horarias y despliegue. Cambia un corte explicable cada vez y conserva diff y punto de rollback.

## Ejecución, parada y recuperación

La evidencia de build dice que se puede compilar; la de prueba dice que pasaron aserciones; la de ejecución necesita comando de inicio, versiones, valores de entorno, entradas reales, respuestas o pantallas, logs y rutas de error. Producción añade seguridad, rendimiento, migración, monitorización, rollback y aceptación de usuarios.

Sin salida hasta el timeout, dependencia de prueba ausente, worktree desconocido, solicitud de credenciales reales, cambio persistente, publicación, despliegue o reinicio son señales de parar y revisar alcance. No fuerces reinstalaciones ni amplíes permisos para obtener un verde; usa entorno aislado, doble de prueba o check estático si no hay autorización.

## Práctica y límite

Elige una función de bajo riesgo, por ejemplo deduplicar una lista local y escribir JSON. Prepara registros normales, entrada vacía, duplicados e inválidos. Compara una ronda con solo objetivo frente a una ronda con problema, aceptación, no objetivos, cortes y matriz de pruebas. En ambas, ejecuta checks estáticos, unit tests, una ejecución local, entrada vacía e inválida; conserva contratos, diffs, comandos, códigos de salida, logs, versión, entradas y puntos de rollback.

Simula una interrupción: detente, inspecciona worktree, diff, logs y estado de pruebas antes de seguir. El ejercicio sigue `candidate / not_run` hasta que haya registros reales e independientes; no instales, publiques, despliegues ni reinicies sin autorización específica.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="15-research-track-ES.md">← Anterior<br><strong>Capítulo 15 · ruta de investigación, de la pregunta al conocimiento auditable</strong></a></td><td align="right"><a data-chapter-nav="next" href="17-marketing-track-ES.md">Siguiente →<br><strong>Capítulo 17 · ruta de marketing, de entender el producto a experimentar con crecimiento</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
