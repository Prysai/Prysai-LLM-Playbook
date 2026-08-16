<!-- content_id: chapter-14-discover-and-audit-skills | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 14: descubrir, instalar y auditar Skills externos

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Este capítulo enseña descubrimiento y revisión de adopción; los reportes de campo son entradas didácticas, no reproducciones locales ni hallazgos oficiales de causa raíz.

## El problema

Un Skill externo puede empaquetar pasos repetidos, conocimiento de dominio y llamadas a herramientas. También puede ampliar contexto, dependencias, red, permisos de cuentas, efectos externos y obligaciones de licencia. La pregunta no es «¿dónde encuentro más Skills?», sino si un vacío real de la tarea necesita un Skill, cómo convertir una entrada de directorio en candidato auditable y cómo probarlo sin filtrar secretos ni exceder la autorización.

> Un directorio sirve para descubrir, no para probar calidad. Instalar cambia estado; no verifica comportamiento. Que un Skill pueda activarse no significa que deba adoptarse.

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

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="13-action-boundaries-ES.md">← Anterior<br><strong>Capítulo 13 · límites de acción en archivos, terminales, navegadores y GitHub</strong></a></td><td align="right"><a data-chapter-nav="next" href="15-research-track-ES.md">Siguiente →<br><strong>Capítulo 15 · ruta de investigación, de la pregunta al conocimiento auditable</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
