<!-- content_id: chapter-18-content-design-data-automation | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 18: ruta de contenido, diseño, datos y automatización

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Esta ruta enseña cómo verificar entregables; no documenta una ejecución de producción.

## El problema

Cuantas más herramientas contiene un flujo, más fácil es confundir «existe el archivo», «corrió el script» o «conectó la API» con un entregable terminado. También pueden fallar diseño, estados vacíos, accesibilidad, licencia, fórmulas, privacidad, permisos, escrituras duplicadas y recuperación.

> Define primero la forma final y su audiencia. Después habilita capacidades por riesgo e inspecciona el resultado renderizado, entradas y salidas, permisos, recuperación y estado de publicación.

## Elige por entregable, no por marca

| Entregable | Checks de forma final | Riesgos habituales |
|---|---|---|
| Documento o PDF | Paginación, índice, enlaces, fuentes, lectura e impresión | Reflujo, fuentes ausentes, citas o licencia |
| Sitio web | Render de navegador, respuesta, interacción, vacíos/errores, teclado y móvil | Fuente correcta pero interfaz inutilizable |
| Imagen o vídeo | Dimensiones, claridad, texto, derechos, captions/alt y edición | Error factual, licencia incierta, medio inaccesible |
| Presentación | Tamaño de proyección, jerarquía, contraste, orden y notas | Desborde, contraste bajo, guion desigual |
| Hoja o informe | Fórmulas, filtros, unidades, vacíos, exportación y recálculo | Números desplazados, denominador cambiante, fórmula sobrescrita |
| Automatización | Esquema, logs, reintentos, idempotencia, permisos, rollback y salida | Escrituras dobles, fuga de datos, final parcial |

Un diff de fuente no sustituye evidencia de forma final. Cuando la forma real importa, renderiza PDF/PNG, abre el sitio en navegador, recalcula la hoja o ejecuta un flujo controlado en cuenta de prueba. Comprueba jerarquía, lectura, estados vacíos y de error, accesibilidad, exactitud, licencia y editabilidad.

## Automatización reversible y repetible

```text
Esquema de entrada y muestra; campos sensibles y uso permitido;
transformaciones y versiones; llamadas externas, destino y permisos mínimos;
timeout, retry, backoff e idempotency key; logs, trace ID y categorías de error;
esquema y validación de salida; estado parcial, compensación y rollback;
aprobación humana y condición de parada.
```

«La API conectó» solo prueba conectividad; no prueba mapeo de campos, completitud, duplicados, alcance de permiso ni corrección posterior. Antes de escribir en producción usa cuenta de prueba, sandbox o simulación local; conserva hashes de entrada/salida e ID de lote cuando corresponda.

Hay cuatro niveles: lectura local de bajo riesgo; trabajo de proyecto reversible; conexión externa controlada con aprobación y logs; y escritura de producción o release público con autorización explícita, revisión de privacidad/licencia, preview, rollback y verificación en línea. Subir de nivel requiere nueva razón, permiso, riesgo, evidencia y recuperación.

## Práctica y límite

Usa un contexto sintético de informe de producto, datos estructurados desidentificados y audiencia inventada. Diseña A: documento; B: documento más análisis; C: documento más gráfico renderizado; D: documento más distribución externa. Incluye datos vacíos, columna ausente, valor extremo y entrada malformada. Ejecuta A, B y C en local; D solo con cuenta de prueba o endpoint de borrador, con preview, batch ID, idempotency key, logs, aprobación y sin publicar.

Conserva tabla A–D, render final, diccionario de datos, validación, respuestas a entradas inválidas, logs, permisos, registros de retry, estado sandbox y evidencia explícita de que no hubo release público. Si hay timeout tras una escritura simulada, conserva trace, consulta estado parcial y no repitas una acción no idempotente. Hasta tener evidencia real de forma final y revisión independiente, el capítulo sigue `candidate / not_run`.

## Contrato de automatización: datos antes que acciones

Ejemplo offline: convertir conteos agregados en un informe de una página. Solo lee JSON sintético y escribe un directorio desechable; no usa red, login ni envío.

```text
Entrada: report-input.json con date, category, count; count entero no negativo.
Límite: sin nombre, email, IP, chat, token ni ID externo.
Transformación: sumar por category y guardar versión de entrada y script.
Salida: report.md con ventana, denominador, campos ausentes y estado vacío.
Validación: releer salida y comprobar totales, categorías, hash y casos vacío/erróneo.
Retry: solo con la misma idempotency key y salida leíble; una escritura desconocida se consulta antes.
Parada: esquema inválido, dato sensible, directorio incierto u overwrite sin confirmar.
```

Un código 0 solo muestra que el script terminó según su definición; no prueba mapeo, etiquetas, audiencia ni sistema externo.

| Entregable | Revisar al abrir | Fallo olvidado |
|---|---|---|
| Documento/PDF | Jerarquía, páginas, enlaces, vacío, texto seleccionable | Exportación rota |
| Sitio | 390px/escritorio, teclado, vacío/error, enlaces | Botón o idioma incorrecto |
| Gráfico | Unidad, denominador, etiquetas, contraste, alt, derechos | Bonito pero engañoso |
| Hoja | Fórmulas, filtros, vacíos, unidades, recálculo | Fórmula sobrescrita |
| Flujo | Esquemas, logs, lote, clave, lectura posterior | Duplicado tras timeout |

## Experimento: informe offline y dos fallos

1. Prepara datos sintéticos normales, vacíos, sin `count`, negativos y extremos; no uses datos reales.
2. Genera Markdown, revisa ventana, total, categorías y vacío; si renderizas PDF/PNG, revisa forma final.
3. Conserva hash, versión, ruta, salida, log y lectura posterior por ejecución.
4. Simula timeout tras escritura: antes de repetir, lee con el mismo lote si existe informe parcial; si es desconocido, entrega `unverified` y para.
5. Con columna ausente o datos malos, explica el bloqueo; no inventes ceros, gráfico ni éxito.

Enviar a correo, CRM, nube o web sería otra acción externa con cuenta de prueba o borrador, destino/audiencia, aprobación, lote, retirada y lectura en línea; este ejercicio no la autoriza.

## Comprobación propia

- [ ] Defino campos, límite sensible, versión, salida, validación, retry y parada.
- [ ] Abro la forma final y reviso vacío/error/acceso, no solo script.
- [ ] Ante timeout consulto lote y salida antes de repetir posible escritura.
- [ ] Distingo generado local, borrador, enviado, publicado y leído en línea.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="17-marketing-track-ES.md">← Anterior<br><strong>Capítulo 17 · ruta de marketing, de entender el producto a experimentar con crecimiento</strong></a></td><td align="right"><a data-chapter-nav="next" href="19-evaluate-models-and-workflows-ES.md">Siguiente →<br><strong>Capítulo 19 · evaluar modelos y flujos de trabajo, de impresiones a evidencia</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
