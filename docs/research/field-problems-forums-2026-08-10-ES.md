<!-- content_id: field-problems-forums-2026-08-10 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: field-problems-forums-2026-08-10.md | source_revision: 2026-08-23 -->

# Problemas reales de las superficies de Codex / agentes de código: investigación de foros e Issues públicas

**Fecha de investigación:** 2026-08-10  
**Estado:** `candidate` (fuentes consultadas y resumidas; sin reproducción local y sin convertir sugerencias del foro en conclusiones oficiales)  
**Alcance:** permisos, Windows, VS Code, red del sandbox y acceso a directorios.  
**Límite de ejecución:** lectura de la API de Stack Exchange, enlaces de Stack Overflow e Issues públicas de `openai/codex`; no se ejecutaron comandos de las publicaciones, no se leyeron secretos, no se hizo commit ni push.

## Cómo leer estos registros

- **Informe de usuario:** entorno, síntoma o relato de reproducción del autor.
- **Sugerencia de quien responde:** workaround de la comunidad; no es una promesa del producto.
- **Confirmación oficial:** documentación oficial, respuesta explícita de un mantenedor o código/notas oficiales. Un autor común de una Issue no cuenta como confirmación.
- **Reproducción local:** no se hizo en esta investigación.
- **Hipótesis:** juicio del autor o de quien responde sobre la causa; conserva la incertidumbre.

Las marcas de tiempo proceden de los sitios de origen. El archivo solo afirma que eran accesibles el 2026-08-10; no convierte esas marcas en una cronología local verificada.

## Casos que se pueden enseñar

### 1. GitHub bloqueado por una allowlist de red dentro del sandbox

- **Fuente:** [Stack Overflow #79970154](https://stackoverflow.com/questions/79970154/how-to-allow-codex-cli-to-execute-shell-commands-with-internet-access-from-within-the-sandbox)
- **Síntoma:** Codex CLI con `sandbox_mode = "workspace-write"`; `curl -I https://github.com` falla con un error de proxy parecido a `blocked-by-allowlist`.
- **Límite:** informe, sugerencias e hipótesis; sin reproducción ni confirmación oficial.
- **Acción segura:** separar bloqueo del sandbox, allowlist del proxy, DNS/TLS y firewall; registrar URL, estado HTTP, error del proxy y permisos efectivos; probar sin secretos solo el dominio necesario.
- **No afirmar:** que `workspace-write` incluya Internet, que activar la red conecte todos los CLI, ni que la configuración de una respuesta sea sintaxis oficial actual; no elegir full access para evitar una aprobación.

### 2. Windows: ¿está demostrado el soporte nativo de Codex CLI?

- **Fuente:** [Stack Overflow #79887792](https://stackoverflow.com/questions/79887792/openai-codex-cli-isnt-available-on-windows-yet-is-there-any-other-way-i-can-hav)
- **Síntoma:** Windows 11, PowerShell/Command Prompt y WSL2; la documentación no distingue claramente entre falta de soporte y falta de documentación.
- **Límite:** consejos de comunidad en conflicto (WSL2 frente a Windows nativo), sin confirmación oficial ni reproducción.
- **Acción segura:** registrar versión, origen de instalación, resolución `where`/PATH, shell, distribución WSL y sistema de archivos del proyecto; empezar con una comprobación de versión y una sonda de solo lectura.
- **No afirmar:** soporte o falta de soporte nativo, ni equivalencia entre WSL2 y Windows.

### 3. Extensión de VS Code `spawn UNKNOWN`, aunque el CLI arranca manualmente

- **Fuente:** [Stack Overflow #79923404](https://stackoverflow.com/questions/79923404/vs-code-codex-extension-fails-with-spawn-unknown-on-windows-even-though-codex)
- **Síntoma:** entorno Windows gestionado, VS Code estable y PowerShell Constrained Language Mode; el CLI funciona pero el extension host falla con `spawn UNKNOWN`.
- **Acción segura:** separar versiones de VS Code, extensión y CLI, resultados de `where.exe`, logs del extension host, política del shell y shims `.exe`/`.cmd`. “CLI ejecutable” y “extensión capaz de hacer spawn” son criterios distintos.
- **No afirmar:** PATH correcto = extensión disponible, causa única de PATH, ni permiso para saltarse la política corporativa.

### 4. `approval_policy = "on-failure"` sigue preguntando por cada archivo

- **Fuente:** [Stack Overflow #79891423](https://stackoverflow.com/questions/79891423/how-to-stop-codex-from-always-asking-for-approval)
- **Síntoma y límite:** VS Code, Windows/WSL, workspace trusted; cada cambio pide aprobación. La respuesta aceptada usa otra versión y entorno.
- **Acción segura:** separar “pregunta aprobación” de “el sandbox permite”, verificar ubicación efectiva de configuración, sesión, workspace y writable roots, y probar un cambio pequeño y reversible.
- **No afirmar:** que `never` sea acceso total o que workspace-write permita todos los archivos.

### 5. Símbolos ilegibles en Windows Terminal

- **Fuente:** [Stack Overflow #79880150](https://stackoverflow.com/questions/79880150/gibberish-symbols-in-codex-under-windows-cmd-in-windows-terminal)
- **Síntoma:** aparecen símbolos extra y desaparecen temporalmente al redimensionar la ventana.
- **Acción segura:** registrar terminal, shell, fuente, tamaño, página de códigos y versión; comparar ventana nueva, redibujado, otros terminales y salida de texto.
- **No afirmar:** que `chcp 65001` lo arregle siempre, que sea necesariamente UTF-8 o que redimensionar sea un workaround permanente.

### 6. Intentar impedir que el sandbox lea un directorio privado

- **Fuente:** [Stack Overflow #79959031](https://stackoverflow.com/questions/79959031/how-to-prevent-codex-cli-from-reading-certain-files-or-directories-via-sandbox)
- **Síntoma:** Codex CLI con ejemplo Linux `~/private`; se busca una frontera impuesta por el kernel, no solo por el prompt.
- **Acción segura:** aislar con permisos del sistema y sacar datos privados del workspace; comprobar profile, ruta absoluta, cwd, writable roots y helper con un archivo no sensible.
- **No afirmar:** que las reglas deny sean iguales en todas las plataformas, que el sandbox frene toda exfiltración o que “el modelo dice que no puede leer” sea evidencia del kernel.

### 7. Fallo al descargar dependencias de Maven

- **Fuente:** [Stack Overflow #79636395](https://stackoverflow.com/questions/79636395/codex-unable-to-access-java-maven-repository)
- **Síntoma:** Java/Spring Boot, `./mvnw clean test`, aparece `Network is unreachable` y después faltan versiones de dependencias.
- **Acción segura:** separar red inaccesible de error de POM/versión; registrar settings de Maven, proxy, dominio y caché; preferir proxy aprobado o caché de dependencias preparado.
- **No afirmar:** recomendar proxies públicos desconocidos ni deducir que llegar a OpenAI permite llegar a Maven Central, GitHub o cualquier dominio.

### 8. Computer Use en Windows no puede enumerar ventanas

- **Fuente:** [openai/codex Issue #37306](https://github.com/openai/codex/issues/37306)
- **Síntoma y límite:** `EnumWindows failed` y fallan las llamadas de enumeración; una etiqueta pública de bug no es confirmación del mantenedor.
- **Acción segura:** comprobar primero aplicaciones normales y separar API de ventanas, ruta/instalación del helper y permisos/escritorio activo; conservar códigos y acciones intentadas.
- **No afirmar:** disponibilidad general o control validado solo porque el helper arranque.

### 9. Ventana de consola que parpadea durante el trabajo de Windows Desktop

- **Fuente:** [openai/codex Issue #37153](https://github.com/openai/codex/issues/37153)
- **Síntoma:** aparece brevemente una consola en primer plano y un hijo `conhost.exe`; el usuario teme actividad no autorizada.
- **Acción segura:** registrar árbol de procesos, rutas, firmas, momento y versión; comparar reposo y ejecución; enviar solo un paquete mínimo si hace falta.
- **No afirmar:** exfiltración o malware por un solo parpadeo, ni generalizar una versión alpha.

### 10. Posible contradicción entre writable root y cwd

- **Fuente:** [openai/codex Issue #37655](https://github.com/openai/codex/issues/37655)
- **Síntoma:** el texto dice que cwd se puede editar, pero `apply_patch` pide aprobación mientras solo otro root es writable.
- **Acción segura:** tomar como referencia el rechazo/aprobación real; registrar cwd, roots, profile efectivo, prompt generado y destino; probar destino dentro de cwd, dentro del root permitido y fuera.
- **No afirmar:** que la explicación de permisos equivalga al enforcement del sistema, que `workspace-write` haga escribible cwd o que esté arreglado sin revisar código/pruebas de la versión.

## Tarjeta mínima común

1. Separar prompt, política de aprobación, enforcement del sandbox, permisos del sistema, proxy de red y herramienta.
2. Recoger versión, plataforma, origen de instalación, shell/terminal, cwd, configuración efectiva, error exacto, árbol de procesos y URL fallida.
3. Hacer pruebas sin secretos, reversibles y de un archivo o dominio; no ejecutar directamente scripts, proxys ni comandos que amplíen permisos.
4. Confirmar la configuración efectiva: el archivo editado puede no ser el de la sesión, extensión o aplicación activa.
5. Aceptar por separado arranque, lectura, escritura, red, integración de VS Code y control de Computer Use.

## Fuentes, licencia y límites de uso

Stack Overflow marca CC BY-SA 4.0; este archivo solo resume hechos y enlaza fuentes, sin copiar largos pasajes, código ni comandos. Las Issues de GitHub son informes públicos, no confirmación de OpenAI. No se copiaron imágenes, código ni instrucciones de Skills externas; no hace falta un registro de activos nuevo.

## Bloqueos y elementos no comprobados

- Las URL oficiales de Codex redirigieron en esta pasada; no se obtuvo de forma fiable el texto final y no se presenta como confirmado.
- La API REST de GitHub alcanzó el límite anónimo al pedir detalles/comentarios; solo se usan páginas, búsquedas y resúmenes accesibles.
- Reddit, GitHub Discussions y páginas que no se podían citar de forma fiable quedan fuera.
- No se reprodujo localmente ningún problema del foro; todos siguen sin verificar.
- El contenido del foro, las versiones, la sintaxis y la matriz de soporte cambian: volver a visitar las URL y añadir fuente primaria, fecha y alcance de versión antes de publicar.
