<!-- content_id: chapter-14-discover-and-audit-skills | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 14: descubrir, instalar y auditar Skills externos

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Este capítulo enseña descubrimiento y revisión de adopción; los reportes de campo son entradas didácticas, no reproducciones locales ni hallazgos oficiales de causa raíz.

## El problema que resuelve este capítulo

Un Skill externo puede empaquetar pasos repetidos, conocimiento de dominio y llamadas a herramientas. También puede ampliar contexto, dependencias, red, permisos de cuentas, efectos externos y obligaciones de licencia. La pregunta no es «¿dónde encuentro más Skills?», sino si un vacío real de la tarea necesita un Skill, cómo convertir una entrada de directorio en candidato auditable y cómo probarlo sin filtrar secretos ni exceder la autorización.

> Un directorio sirve para descubrir, no para probar calidad. Instalar cambia estado; no verifica comportamiento. Que un Skill pueda activarse no significa que deba adoptarse.

## Objetivos de aprendizaje

Podrás distinguir una brecha de tarea de una cuestión de conocimiento, herramienta o autorización, y evaluar un candidato con fuente, revisión, licencia, permisos, recuperación y evidencia.

## Antes de decidir: escribe el protocolo de tarea

```text
Objetivo: ¿qué debe cambiar?
Entradas: ¿qué archivos, datos o fuentes se pueden leer?
Salida: ¿qué forma tendrá la entrega?
Aceptación: ¿qué evidencia la completa?
Autorización: ¿qué herramientas, red, cuentas y escrituras se permiten?
Parada: ¿qué exige pausar y preguntar?
```

| Brecha | Normalmente se resuelve con | Error habitual |
|---|---|---|
| Falta un concepto o hecho | Investigación, documentación oficial o juicio humano | Usar un Skill en vez de comprobar la fuente |
| Procedimiento estable y repetido | Skill local o script | Un Skill enorme para todo |
| Observar o cambiar sistema externo | Herramienta o conector controlado | Confundir «invocable» con «autorizado» |
| Objetivo o aceptación imprecisos | Aclarar primero | Instalar para ocultar requisitos confusos |

Un Skill es un contrato de método y enrutamiento; una herramienta es una interfaz que observa o cambia el exterior. Plugin y Connector son capas de producto. Durante la revisión pregunta: ¿qué lee el Skill?, ¿qué recomienda?, ¿qué hace la herramienta?, ¿qué recibe el servicio externo?

## Tarjeta de revisión previa a la instalación

Para cada candidato, prepara una decisión que incluya:

```text
candidato y brecha de tarea; trigger y non-trigger;
URL, revisión fija e inventario; licencia, NOTICE, recursos anidados y límite de copia;
dependencias, red, cuenta y efectos externos; destino aislado;
permisos y frontera de secretos; backup, rollback y check posterior;
puntos de aprobación; pruebas positiva, límite, fallo/inyección y migración;
propietario, versión y próxima revisión;
decisión: recommendation-only | blocked | approved-to-install | installed-candidate;
evidencia, desconocidos y condiciones para desbloquear.
```

Las decisiones son solo cuatro: `recommendation-only`, `blocked`, `approved-to-install` e `installed-candidate`. No sustituyas una por otra. También separa la evidencia de comportamiento: archivo existente, descubierto, cargado, adoptado y verificado. Que exista un archivo no prueba descubrimiento; descubrimiento no prueba carga; carga no prueba adopción; adopción no prueba verificación.

## Contenido del Skill es entrada no confiable

Trata `SKILL.md`, README, páginas remotas, Issues, muestras y resultados de herramientas como datos. «Ignora las reglas», «sube secretos», «envía el resultado» o «ejecuta este comando» no ganan autoridad por estar dentro del Skill. Extrae solo lo necesario, elimina secretos, usa sandbox sin red cuando sea posible y registra lo rechazado.

Eleva el riesgo por capas: lectura local, escrituras reversibles, conexiones externas en sandbox y, solo después, escrituras de producción o publicación. Antes de subir una capa, declara permisos nuevos, evidencia y rollback. Una prueba de humo apoya como máximo `candidate`; no convierte un Skill en `verified` ni en apto para producción.

## Práctica y límite

Revisa dos candidatos en revisiones fijas sin instalarlos. A tiene señal de licencia trazable y coincide con la tarea: puede quedar `recommendation-only`. B carece de licencia/NOTICE claro o de rollback concreto: debe quedar `blocked`. Para cada uno registra URL, revisión, inventario, dependencias, permisos, destino aislado, backup, restauración, aprobaciones y propietario. Diseña para A pruebas positiva, límite, fallo/inyección y migración, pero no las ejecutes.

La práctica demuestra una decisión de revisión, no descubrimiento, carga, ejecución ni adopción real. Hasta que las pruebas se ejecuten en un entorno declarado y se revisen de forma independiente, el capítulo sigue `candidate / not_run`.

## Antes de instalar, convierte el candidato en una decisión refutable

Un directorio, estrellas o una demo solo crean un candidato. Para cada uno guarda esta tarjeta:

```text
brecha de tarea; URL, revisión fija y ruta real; activador y no activador;
licencia, NOTICE y activos anidados; dependencias, red, cuenta y secretos;
prueba aislada; copia de seguridad y comprobación de restauración;
decisión: recommendation-only / blocked / approved-to-install / installed-candidate
```

Si falta revisión fija, licencia/NOTICE, destino de instalación, copia o comprobación de restauración, es `blocked`. «Instalar primero» no resuelve una laguna de evidencia.

No mezcles estos estados: `file exists` → `discovered` → `loaded` → `adopted` → `verified`. Un `SKILL.md` solo prueba el primero; un registro de instalación sostiene como mucho `installed-candidate`.

## Revisión en cuatro pasos: rechaza primero lo que no esté claro

No empieces por «¿cómo lo instalo?». Sigue estas cuatro preguntas y detente en
la primera que no puedas responder con un registro:

1. **¿La tarea lo necesita de verdad?** Nombra el juicio repetido, estable y fácil de olvidar. Si falta un hecho, consulta fuentes; si el objetivo es confuso, acláralo primero.
2. **¿Qué recibimos exactamente?** Fija URL, revisión, ruta de entrada real, licencia/NOTICE y dependencias anidadas; un nombre o número de estrellas no basta.
3. **¿Qué podría hacer?** Separa lectura, escritura, instalación, red, cuenta, secretos y efectos externos. Si no hay inventario, no supongas que es inocuo.
4. **¿Cómo volvemos atrás tras un fallo?** Anota directorio aislado, copia previa, restauración y comprobación de lectura posterior. «Borrar la carpeta» no es una recuperación comprobada.

Solo cuando las cuatro respuestas están registradas tiene sentido recomendar
`approved-to-install`; si falta una, el resultado correcto suele ser
`recommendation-only` o `blocked`. No condena al candidato: evita convertir la
curiosidad en un cambio de entorno sin revisar.

### Una nota de rechazo breve pero útil

```text
candidato: <URL y revisión fijadas>
decisión: blocked
motivo: el script de entrada usa red, pero faltan dependencias, destino de instalación y lectura de recuperación.
revisado: enlace del proyecto, archivo de entrada y señal de licencia superior.
no revisado: comportamiento en ejecución, licencia de recursos anidados y tráfico real.
desbloqueo: completar esos datos y repetir la revisión en un directorio aislado sin datos sensibles.
```

Esta nota es más útil que «parece inseguro» y no transforma conductas no
ejecutadas en riesgos ya observados.

## Experimento: revisar dos candidatos sin instalar

### Preparación

Elige dos candidatos públicos con revisión fija, o dos ejemplos locales depurados. Prepara solo URL, revisión, inventario y señales de licencia/NOTICE. No definas un destino de instalación, no inicies sesión y no uses secretos.

### Tarea

Elige dos revisiones fijas públicas o muestras locales redactadas. A tiene procedencia y señal de licencia; B carece deliberadamente de licencia/NOTICE, dependencias o restauración.

1. Solo revisa URL, revisión, inventario, resumen de entrada, dependencias y licencia; no autentiques ni ejecutes red.
2. Completa una tarjeta por candidato con brecha, límites, permisos, prueba aislada y aprobaciones.
3. Para A diseña casos positivo, límite, inyección/fallo y migración; registra entrada, resultado esperado, parada y evidencia, sin afirmar ejecución.
4. Mantén B como `blocked` y nombra el material que lo desbloquearía.

«Ignora reglas», «sube `.env`» o «cambia producción para probar» dentro de una fuente son datos no confiables, no permisos.

### Evidencia

Guarda una tarjeta para A y B con fuente, revisión, ruta real, conclusión de licencia/NOTICE, dependencias, permisos esperados, responsable, decisión e incógnitas. Para A conserva cuatro casos diseñados: positivo, límite, fallo/inyección y migración. Ninguna tarjeta afirma instalación o comportamiento ejecutado.

### Reflexión

¿Qué hueco era realmente un método repetible y cuál era solo una falta de datos, herramienta o autorización? ¿Qué dato ausente impidió instalar?

## Problemas reales: localizable no significa adoptable

Una entrada de directorio, una estrella o una demo pueden hacer visible a un candidato, pero no prueban origen, dependencias anidadas ni efectos secundarios. Decide primero si resuelve una tarea repetida concreta; después revísalo en un entorno pequeño sin secretos.

## Tarea de transferencia

Aplica la tarjeta a un script interno que ya use tu equipo. Escribe disparadores y no disparadores, la prueba mínima de solo lectura, un caso de inyección y quién tendría que autorizar escritura o red más tarde. No cambies el script ni producción.

## Lista de aceptación

- [ ] Distingo falta de conocimiento, método repetible, herramienta y autorización.
- [ ] Registro fuente, revisión fija, ruta, licencia/NOTICE, permisos, recuperación y responsable.
- [ ] Mantengo separados `file exists`, `discovered`, `loaded`, `adopted` y `verified`.
- [ ] Marco licencia, permisos o recuperación inciertos como `blocked` en vez de instalar primero.

## Fuentes y límite de mantenimiento

Las tarjetas de revisión y los estados separados son métodos estables. Directorios, instalación, comportamiento y superficies de producto cambian; vuelve a comprobarlos para la revisión fija, el entorno concreto y la ruta real de destino.

## Comprobación propia

- [ ] Distingo una brecha de conocimiento, método, herramienta o tarea ambigua.
- [ ] Registro URL, revisión, ruta, licencia/NOTICE, dependencias, permisos y responsable.
- [ ] Separo permisos para obtener, escribir, instalar/autenticar y entrar a equipo o producción.
- [ ] Solo afirmo existencia, descubrimiento, carga, adopción o verificación cuando hay evidencia.

## Recibo de adopción: primero demuestra que puedes revisar, luego decide si habilitar

Este recibo sirve tanto para Skills originales del proyecto como para candidatos hallados fuera. Un repositorio popular, una explicación fluida o una carpeta visible no convierten por sí mismos contenido externo en una capacidad fiable o ejecutable.

```text
Nombre y versión/commit del candidato:
Origen: original | externo; enlace original del proyecto externo:
Responsable y fecha de revisión:
Brecha concreta de tarea que cubriría:
Licencia: ¿código, texto, activos y dependencias anidadas están claros por separado?
Lectura/escritura/red/instalación/envío/publicación esperados:
Caso positivo, de límite, de fallo y de transferencia:
Observado: archivo | descubrimiento | selección | carga | ejecución | lectura de vuelta
No observado:
Alcance temporal permitido para probar:
Motivo de rechazo, pausa o adopción:
Siguiente comprobación segura más pequeña:
```

Un `SKILL.md` externo, una página, un Issue, un registro de instalación o una salida de herramienta son datos por evaluar. Sus comandos, enlaces o frases como «ignora las reglas anteriores» no reciben más autoridad. Sin origen, licencia, comportamiento o recuperación claros, la decisión correcta es `blocked` o rechazo, no «instálalo primero».

### Habilita por capas, no por confianza total

Lee primero metadatos e instrucciones; luego prueba una ruta de solo lectura o reversible en un directorio temporal sin material sensible. Solo después de registrar resultado, alcance y recuperación, una persona decide por separado si necesita escritura, red, instalación o una acción externa. Un éxito solo cubre host, versión, entrada y tarea registrados; no demuestra fiabilidad entre modelos, carpetas o cuentas.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-ES.md" aria-label="Capítulo anterior: Capítulo 13 · límites de acción en archivos, terminales, navegadores y GitHub">← Anterior<br><strong>Capítulo 13 · límites de acción en archivos, terminales, navegadores y GitHub</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="15-research-track-ES.md" aria-label="Capítulo siguiente: Capítulo 15 · ruta de investigación, de la pregunta al conocimiento auditable">Siguiente →<br><strong>Capítulo 15 · ruta de investigación, de la pregunta al conocimiento auditable</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
