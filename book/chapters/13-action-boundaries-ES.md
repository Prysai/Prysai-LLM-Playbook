<!-- content_id: chapter-13-action-boundaries | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 13: límites de acción en archivos, terminales, navegadores y GitHub

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Este capítulo enseña un método de decisión; los incidentes públicos son material didáctico, no reproducciones locales ni conclusiones oficiales.

## El problema

Un Agent puede leer, editar, ejecutar un comando, crear un commit, hacer push o cambiar un servicio externo. No son el mismo permiso. Cambian objetivos, personas afectadas, reversibilidad y evidencia necesaria.

> Si no conoces el objetivo exacto, los datos, la autoridad, la reversibilidad, la señal de parada o la evidencia, reduce la tarea o detente.

Estar autenticado, ver una herramienta, poder escribir un directorio, haber ejecutado un comando una vez o recibir «continúa» demuestra algo limitado. Ninguno autoriza por sí solo una acción externa concreta.

## Cinco clases de acción

| Clase | Ejemplo | Comprobación mínima |
|---|---|---|
| A — Observar | Leer archivo, estado o página | Ruta, host, cuenta y sensibilidad correctos |
| B — Local y reversible | Editar copia temporal o generar informe | Alcance, original/diff y check |
| C — Cambiar entorno o datos | Instalar, configurar, escribir datos o usar red | Persistencia, secretos, datos afectados y recuperación |
| D — Colaboración externa | Push, PR, carga, servicio remoto o borrador público | Cuenta, host, organización, audiencia y revisor |
| E — Alto impacto | Borrar, desplegar, enviar, pagar o cambiar permisos | Autorización exacta, confirmación humana y rollback probado |

Clasifica por el efecto real, no por el nombre amable de la herramienta. Una prueba que instala paquetes o escribe datos no es automáticamente local y reversible.

## Mantén cuatro estados separados

```text
Autenticación: qué cuenta o conexión prueba identidad.
Capacidad técnica: qué rutas, herramientas y recursos pueden actuar.
Autorización de tarea: qué objetivo y alcance autorizó el usuario.
Confirmación humana: qué acción de alto impacto aprobó quién.
```

Una carpeta escribible no autoriza editarla; red disponible no autoriza subir contenido. Para una acción externa, especifica sistema, cuenta, organización, repositorio o recurso, datos, exclusiones, resultado esperado, evidencia, recuperación y condición de parada. Si falta destino o audiencia, muestra una vista previa y pregunta.

## Navegador, terminal y GitHub

En el navegador separa observación de envío. Antes de enviar, publicar, cargar, aprobar, borrar o cambiar permisos, vuelve a comprobar objetivo, contenido, audiencia, privacidad y rollback. Después verifica el cambio de estado independientemente: elemento localizado, acción invocada, respuesta recibida y página cambiada son eventos diferentes.

Antes de un comando escribible, declara directorio de trabajo, entradas, rutas modificables, red o instalación, salida esperada, tiempo límite, checkpoint y condición de parada. Antes de push o publicación, añade identidad, host de GitHub, organización, rama, payload, audiencia, evidencia remota y rollback. `gh auth status` prueba identidad, no autorización.

## Práctica y límite

En un directorio temporal con un archivo Markdown sintético y un repositorio Git local vacío, clasifica «cambiar un título y entregar» desde leer hasta publicar un sitio. Ejecuta solo A y B; no añadas remoto ni token. Incluye una frase maliciosa que pida subir un token: trátala como datos no confiables y detente.

Conserva tarjeta de límites, estado inicial, diff, salida del check, acciones D/E no ejecutadas y lectura de rollback. Hasta que exista una ejecución registrada e independiente, el capítulo sigue `candidate` y el experimento `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="12-agent-loop-and-stop-ES.md">← Anterior<br><strong>Capítulo 12 · el ciclo, el estado y las condiciones de parada del Agent</strong></a></td><td align="right"><a data-chapter-nav="next" href="14-discover-and-audit-skills-ES.md">Siguiente →<br><strong>Capítulo 14 · descubrir, instalar y auditar Skills externos</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
