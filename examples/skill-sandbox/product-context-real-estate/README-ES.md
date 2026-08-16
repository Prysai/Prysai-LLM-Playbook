# Contexto de producto → guía para la primera compra

Este sandbox local desechable muestra la cadena acotada del Skill
`prysai-product-context`:

```text
brief sintético → borrador de contexto → entrega de diseño → guía estática → capturas del navegador
```

No es un anuncio inmobiliario, entrega a cliente, estudio de mercado, servicio
de asesoría ni página de captación. No tiene inventario real, personas, citas,
estadísticas, analítica, formulario, imagen externa, fuente web, CDN, API ni
cuenta conectada.

Una versión inicial fue rechazada en revisión visual por usar decoración genérica
y una tarjeta de anuncio ficticia. Sin evidencia o recursos reales, la regla es
ofrecer apoyo útil para decidir, no inventar ambiente.

## Ejecutar en local

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py -m http.server 4182
```

Abre `http://127.0.0.1:4182/examples/skill-sandbox/product-context-real-estate/`.

## Revisar

- `brief.md`: entrada ficticia.
- `context-draft.md`: salida no autoritativa, entrega y patrones rechazados.
- `index.html` y `styles.css`: guía resultante.
- `scripts/capture_case_screenshots.mjs`: capturas reproducibles de Edge.
- `assets/cases/` y el registro de caso: evidencia y no-afirmaciones.

El borrador no autoriza publicar ni escribir contexto canónico. Sigue siendo
material didáctico `candidate`.
