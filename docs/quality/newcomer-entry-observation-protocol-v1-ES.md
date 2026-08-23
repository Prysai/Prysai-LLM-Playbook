<!-- content_id: newcomer-entry-observation-protocol-v1 | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: newcomer-entry-observation-protocol-v1.md | source_revision: 2026-08-23 -->

# Protocolo v1 de observación de entrada para principiantes

**Estado:** protocolo `candidate`. No se ha hecho reclutamiento, sesión con participantes ni registro de resultados.

## Qué puede aclarar esta observación

¿Una persona adulta que nunca ha enviado un prompt a un modelo de chat generativo puede identificar la ruta inicial adecuada, llegar a la comprobación sin configuración y hacer un intento de bajo riesgo, solo con texto, sin añadir material privado ni autoridad no prevista?

Esta es una observación de usabilidad de entrada, no un estudio de eficacia. Puede orientar las etiquetas, el orden de las rutas y el lenguaje de parada de esta revisión candidata concreta. No puede demostrar aprendizaje, retención, transferencia, calidad del modelo, demanda de mercado, eficacia de seguridad ni que todo el currículo funcione para principiantes.

## Quién cuenta como principiante

Recluta a 5–8 adultos que consientan participar y respondan **no** a esta pregunta de selección:

> Antes de hoy, ¿habías enviado un prompt a un modelo de chat generativo?

Registra solo `no`, `yes` o `unsure`; no recojas el nombre del producto, de la cuenta, del empleador, del centro educativo ni una explicación. Las respuestas `yes` y `unsure` no son observaciones de principiantes. Pueden participar en una observación separada y etiquetada de lectores con experiencia, pero nunca se mezclan con el resultado de principiantes.

No reclutes menores, personas que dependan directamente de quien modera, estudiantes cuya calificación pueda verse afectada ni a nadie para quien rechazar la participación pueda acarrear una penalización.

## Condiciones de entrada fijas

Antes de la primera sesión, fija sin usar nombres personales:

- un SHA de commit candidato inmutable y una URL de entrada;
- los roles de moderación, privacidad y revisión independiente;
- navegador, viewport, idioma y superficie de chat disponible;
- fecha final de conservación y responsable de borrado; y
- el mensaje fuente ficticio y la revisión del prompt.

Mantén fijos en la ronda la revisión de la página, las etiquetas de ruta, la fuente ficticia y el formulario de observación. Si cambia cualquiera, detén la ronda y empieza otra. El [protocolo piloto First Win v2](first-win-pilot-protocol-v2.md) sigue siendo el estudio separado y más profundo sobre fidelidad de fuentes para usuarios experimentados de modelos de chat.

## Flujo de la sesión

### 1. Elegir una ruta sin ayuda

Abre la página de entrada candidata. No expliques Codex, el calentamiento ni el fixture. Pregunta solo:

> No tienes proyecto ni código que editar y quieres hacer un primer intento seguro. ¿Qué abrirías ahora y por qué?

Registra la primera ruta elegida y si la persona llega a la comprobación LLM sin configuración. La elección correcta es la ruta de texto sin configuración. Puede detenerse en vez de elegir; regístralo como `stopped_by_reader`, no como respuesta incorrecta.

### 2. Hacer un intento acotado

Muestra el mensaje fuente ficticio fijo que ya usa la comprobación pública sin configuración:

> Hola, el taller ha cambiado. Empieza el viernes a las 10. Trae el borrador. Dime si no puedes venir.

La persona puede usar una cuenta de modelo de chat que controle, o detenerse si no hay una superficie segura. Copia únicamente el prompt de texto proporcionado, sin añadir archivos, acceso al navegador, extensiones, credenciales, datos personales ni acciones externas. La persona moderadora puede explicar cómo cerrar la página o detenerse, pero no qué ruta ni qué respuesta elegir.

### 3. Registrar la comprobación del límite

Pide que marque si la respuesta conserva la hora y el borrador, mantiene la petición de respuesta y evita añadir detalles. No recojas la respuesta del modelo, identificadores de cuenta, capturas, historial de conversación ni contenido del portapapeles. Registra solo las tres marcas, el tiempo transcurrido, la ayuda usada y si decidió detenerse.

### 4. Reflexión breve

Haz dos preguntas neutrales:

1. ¿Qué te pedía comprobar por tu cuenta este ejercicio?
2. ¿Qué te haría detenerte antes de enviar otra petición?

Guarda una nota breve y saneada solo si no contiene información personal, de cuenta o del lugar de trabajo. De lo contrario, registra `reflection_not_retained`.

## Registro mínimo

Usa una fila desidentificada por sesión:

```text
session_code | newcomer_screen | candidate_sha | entry_route_first_selected
no_setup_reached | attempt_started | attempt_completed | time_seconds
check_time_and_draft | check_reply_request | check_no_added_details
help_used | stopped_by_reader | safety_stop | retained_reflection_note
reviewer_route_assessment | reviewer_disagreement
```

Los valores permitidos para `help_used` son `none`, `navigation_only`, `stop_or_close_help` y `other_recorded`. No infieras habilidad a partir del tiempo transcurrido ni de una respuesta correcta del modelo. La persona revisora evalúa solo si la primera ruta elegida encaja con la condición indicada; las marcas registran el juicio de la persona, no prueban que sea correcto.

## Reglas de parada y privacidad

Detén la sesión de inmediato si se introduce material privado, del empleador, de salud, financiero o de cuenta; si la persona cree que es una evaluación; si pide elegir una acción del mundo real; o si muestra malestar. Retira el material de la vista y registra solo `safety_stop` y un código de motivo no identificable.

No conserves una grabación de pantalla, la transcripción del modelo, una dirección de correo, una IP, el nombre de una cuenta, un prompt privado ni la salida de chat sin procesar. La persona responsable de privacidad borra los registros desidentificados al terminar el plazo declarado, salvo que antes se registre una nueva decisión de conservación autorizada por separado.

## Qué informar

Publica como máximo un agregado desidentificado: personas examinadas, elegibles, que empezaron, que completaron, que se detuvieron, distribución de rutas, llegadas a la comprobación sin configuración, ayudas usadas, paradas de seguridad y desacuerdos de revisión. Con 5–8 participantes, informa de recuentos y de cualquier cambio del instrumento; no calcules significancia ni afirmes una tasa de finalización para una población mayor.

## Límite de la evidencia

Escribir, validar o ejecutar este protocolo no cierra por sí solo Q-001, Q-002 ni Q-013. Una sesión solo puede mostrar si la experiencia de entrada indicada era observable para esta cohorte pequeña y fija y esta revisión candidata. Toda afirmación sobre currículo, Skill, seguridad, plataforma, aprendizaje o publicación conserva el estado registrado por separado.
