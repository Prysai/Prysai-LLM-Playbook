<!-- content_id: chapter-17-marketing-track | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 17: ruta de marketing, de entender el producto a experimentar con crecimiento

**Estado:** `candidate`. **Experimento:** `draft / not_run`. Esta ruta enseña decisiones de marketing revisables; no aporta clientes, resultados de campaña ni causalidad demostrada.

## El problema que resuelve este capítulo

El marketing se vuelve vago cuando faltan producto, audiencia, posicionamiento, prueba y acción deseada. También se vuelve riesgoso si se recolectan datos personales o se publica automáticamente antes de decidir qué debe cambiar el dato.

> Primero crea un contexto de producto versionado, después formula una hipótesis, mide lo mínimo útil y solo entonces prepara contenido o una acción con límites de privacidad y autorización.

## Contexto de producto y decisión

Registra producto y versión, no objetivos, audiencia incluida y excluida, problema y situación de uso, alternativas, diferenciación y prueba disponible, objeciones, lenguaje anonimizado, voz, expresiones prohibidas, acción deseada, canal, región, fecha, propietario y revisión. Una afirmación sin prueba sigue siendo hipótesis o se elimina.

Antes de elegir métricas, escribe la decisión, hipótesis, pregunta mínima, evento y métrica, denominador, muestra, ventana, segmentos, duplicados, faltantes, retrasos, consentimiento, retención, acceso, regla de parada y siguiente acción. «La variante B tuvo más clics» no significa nada sin exposición, denominador, población y ventana.

| Grupo de capacidad | Salida | Límite |
|---|---|---|
| Contexto de producto | Contexto y registro de afirmaciones | Hechos, hipótesis, propietario, revisión |
| Posicionamiento | Variantes para audiencia y objeciones | Prueba, voz y afirmaciones prohibidas |
| Experimento | Hipótesis, exposición y parada | Muestra, denominador, consentimiento |
| Distribución | Borrador o lote sandbox | Canal, aprobación y rollback |
| Medición | Informe agregado y límites | Esquema de eventos, calidad y causalidad |

## Privacidad, atribución y autorización

Un Agent puede organizar contexto, redactar variantes, revisar nombres de eventos y describir resultados. No puede inferir causalidad, esconder sesgo de muestra ni publicar en anuncios, CRM, correo o red social sin acción separada: cuenta de prueba o sandbox, aprobación humana, ID de lote y retirada o rollback.

No uses por defecto nombres, correo completo, IP completa, conversaciones privadas ni identificadores entre contextos. Prefiere agregados, datos desidentificados, retención corta y acceso limitado. Cuenta duplicados, faltantes, zona horaria, retrasos, bots y deriva del denominador. Un gráfico bonito no convierte datos débiles en evidencia.

Acceso a una cuenta tampoco autoriza usar datos de una organización concreta. Confirma host, organización, instalación, audiencia y alcance antes de cada experimento externo.

## Práctica y límite

Usa un producto sintético con tres objeciones, sin testimonios, inventario ni rendimiento, y una tabla local de solo conteos. Compara «escribe una introducción atractiva» con una solicitud que incluye contexto, prueba ausente, acción deseada, hipótesis, métrica, denominador, muestra y próxima decisión. Marca toda afirmación no respaldada. Diseña dos variantes, pero no declares ganadora ni causalidad.

Conserva solicitudes, versión de contexto, variantes, tabla de hipótesis, métricas, notas de muestra, diccionario de datos desidentificado, decisiones de privacidad y siguiente decisión. El ejercicio queda `candidate / not_run` hasta contar con datos autorizados, calidad revisada y revisión humana.

## De borrador a decisión medible: tarjeta de experimento

Pregunta primero «¿qué decisión cambiará este dato?». Para una página local sintética:

```text
Decisión: seguir probando el mensaje sobre no perder entregas, o volver al coste de configuración.
Hipótesis: con misma audiencia y posición, explicar el problema de entrega anima a pedir la muestra.
Único cambio: título y primer párrafo; no precio, canal, audiencia ni CTA.
Métrica: solicitudes de muestra / exposiciones desduplicadas.
Alcance: conteos sintéticos o autorizados, agregados y de ventana corta; sin nombre, email completo, IP ni chat.
Parada: muestra pequeña, variantes mezcladas, evento ausente, consentimiento o destino incierto.
Siguiente paso: describir diferencia y límites, sin causalidad ni ganador.
```

| Tipo | Forma permitida | No convertir en |
|---|---|---|
| Hecho confirmado | «Este ejercicio usa una tarea local sintética» | «Muchos equipos ya lo adoptan» |
| Hipótesis | «Estamos comprobando si resulta más claro» | «Ya mejora eficiencia» |
| Voz de audiencia | Frase autorizada, desidentificada y trazable | Testimonio inventado |
| Sin prueba | Eliminar o marcar como hipótesis | «Líder» o «más popular» |

## Experimento: dos borradores, sin publicación

1. Redacta dos introducciones desde contexto sintético y nombra audiencia, problema, acción y prueba ausente.
2. Asigna etiquetas anónimas y un diccionario local de conteos agregados con denominador, deduplicación, ventana y retención.
3. Etiqueta cada frase como hecho, hipótesis o sin prueba; elimina la última.
4. Haz una revisión local con una persona de prueba: registra solo feedback autorizado, no resultado de mercado.
5. Un canal real requiere host, organización, cuenta, audiencia, consentimiento, lote, aprobación y retirada de nuevo.

## Comprobación propia

- [ ] Antes de escribir fijé decisión, cambio único, denominador y parada.
- [ ] No convierto conteos descriptivos en causalidad, eficiencia o aceptación.
- [ ] Cada claim es hecho, hipótesis, feedback autorizado o eliminación.
- [ ] Sin evidencia de clientes no invento testimonios, escala, adopción ni urgencia.

## Objetivos de aprendizaje

Podrás formular una hipótesis comprobable, separar hechos de supuestos y preparar variantes sin recopilar datos personales ni publicar.

## Problemas reales: palabras buenas no son prueba de mercado

Una introducción clara puede ayudar, pero no demuestra demanda ni causalidad. Solo una audiencia definida, un cambio único y una medición declarada permiten decidir qué puede cambiar el resultado.

### Preparación

Usa solo contexto sintético y una tabla local de conteos agregados. No incluyas nombres, correo, IP, cuentas, canales reales ni listas de clientes.

### Tarea

Redacta dos introducciones con igual audiencia y acción. Marca cada frase como hecho, hipótesis o sin prueba; elimina la última categoría. Escribe denominador, ventana, parada y decisión si la muestra no basta.

### Evidencia

Guarda versión de contexto, variantes, registro de claims, tarjeta de hipótesis, diccionario de datos y la decisión «no publicado». Conteos agregados y una prueba local de comprensión no prueban aceptación ni causalidad.

### Reflexión

¿Qué frase sonaba convincente sin evidencia? ¿Qué datos serían necesarios antes de pedir un canal real?

## Tarea de transferencia

Aplica la tarjeta a la portada del curso: crea dos descripciones locales de la primera acción segura. No afirmes popularidad ni resultados; prueba solo si una persona nombrada entiende el siguiente paso.

## Lista de aceptación

- [ ] Documento decisión, un cambio, denominador, límite y parada.
- [ ] Separo hechos, hipótesis y falta de prueba.
- [ ] No publico ni recopilo datos personales sin nueva autorización explícita.

## Fuentes y límite de mantenimiento

Los límites de decisión y evidencia son estables. Canales, consentimiento, medición y datos de producto cambian y requieren revisión actual y específica.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="16-engineering-track-ES.md" aria-label="Capítulo anterior: Capítulo 16 · ruta de ingeniería, de la idea al software fiable">← Anterior<br><strong>Capítulo 16 · ruta de ingeniería, de la idea al software fiable</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="18-content-design-data-automation-ES.md" aria-label="Capítulo siguiente: Capítulo 18 · ruta de contenido, diseño, datos y automatización">Siguiente →<br><strong>Capítulo 18 · ruta de contenido, diseño, datos y automatización</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
