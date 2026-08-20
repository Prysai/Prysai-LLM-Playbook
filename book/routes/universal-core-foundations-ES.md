<!-- content_id: universal-core-foundations-route | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# Colaboración universal con LLM: una primera tarea segura y cuatro fundamentos

**Estado:** `candidate`. **Estado de ejecución:** `not_run`.

Empieza aquí si quieres usar un chat de texto normal y todavía no necesitas configurar un producto concreto. Puedes hacer el primer intento de abajo sin tratar ChatGPT, Claude, Grok, Gemini, Codex u otro producto como si fueran lo mismo. Esta ruta se centra en unas pocas decisiones que se repiten en cualquier plataforma: definir la tarea, limitar el material, dejar visible cómo la vas a comprobar y fijar un punto de parada. No afirma que las plataformas compartan herramientas, permisos, memoria, cuentas, precios ni comportamiento de Agent.

## Haz ahora una primera tarea segura

Usa solo el aviso ficticio de abajo. No pegues mensajes privados, material de clientes, credenciales, trabajo sin publicar ni archivos reales. En este intento no navegues, no uses herramientas, no subas archivos, no cambies la cuenta y no envíes ni publiques nada.

Copia esta petición en el chat de texto que hayas elegido:

```text
Resultado: reescribe este aviso ficticio de un club para miembros nuevos.
Material: "El club se reúne el martes a las 6. Trae un cuaderno. La sala se confirmará más tarde."
Formato de respuesta: escribe dos frases. Conserva todos los hechos indicados. Pon cualquier detalle que falte entre [corchetes]. Después enumera los hechos que conservaste.
Comprobación: compara el texto fuente y la reescritura. No puede aparecer una hora, sala, cuota, contacto ni promesa nuevos.
Parada: no navegues, envíes, publiques ni supongas un detalle desconocido.
```

Después comprueba por tu cuenta tres cosas:

1. ¿Puedes localizar en el aviso original el respaldo de cada afirmación de la reescritura?
2. ¿La respuesta respeta el límite de dos frases y enumera los hechos que conservó?
3. ¿Añade algún detalle que debería seguir siendo `[desconocido]`?

Si la respuesta a la última pregunta es sí, elimina el detalle añadido o pide una única corrección. Si el chat propone buscar, enviar, publicar o usar una herramienta, o pide más material del que necesita este ejercicio, detente. Una respuesta bien redactada no demuestra que sus hechos sean verdaderos ni que el método funcione en todos los productos.

Este es un ejercicio en estado candidato, no una fórmula universal para escribir prompts ni una afirmación de resultados. No hay evidencia de ejecuciones entre modelos, de aprendizaje ni de efectividad.

## Construye la base a partir de esa primera tarea

Después de intentarlo una vez, usa las cuatro unidades siguientes para entender por qué incluso una petición pequeña necesita un resultado, material, comprobación y punto de parada. Estas decisiones son aún más importantes cuando la tarea deja de ser un intercambio solo de texto.

1. [**Convierte una intención en un contrato de tarea**](../chapters/03-task-protocol-ES.md#core-task-contract): define el resultado, el contexto pertinente, el límite de acción, la aceptación, la regla de parada y la entrega.
2. [**Relaciona las afirmaciones con la evidencia y recupérate dentro de un límite**](../chapters/09-verification-and-recovery-ES.md#core-evidence-recovery): comprueba la afirmación más acotada y detente en la primera capa que no tenga respaldo.
3. [**Planifica una porción pequeña que deje evidencia**](../chapters/10-planning-and-slicing-ES.md#core-evidence-bearing-slice): elige el resultado más pequeño que otra persona pueda inspeccionar y continuar.
4. [**Separa capacidad, autorización, confirmación y evidencia**](../chapters/13-action-boundaries-ES.md#core-action-boundary): distingue lo que se puede hacer de lo que está permitido y de lo que realmente se hizo o se verificó.

Las instrucciones de un producto concreto pertenecen a un adaptador de plataforma; los ejercicios de dominio pertenecen a rutas de aplicación.

## Practica un punto de conexión antes de elegir plataforma

El [ejercicio de puntos de conexión universales](../../examples/universal-seam-v1/README-ES.md) contiene cuatro registros ficticios: una solicitud más reciente que no coincide, un destino equivocado, un comprobante de ejecución de herramienta ausente y un valor estructurado que ha cambiado. En cada caso, indica qué no demuestra el texto visible, elige la comprobación segura más pequeña y detente antes de que un comportamiento real requiera un adaptador. La explicación está en español; los datos fijos siguen siendo material ficticio y compartido.

![Cuatro enlaces de evidencia: identidad de tarea, identidad de destino, recibo de ejecución y recorrido de ida y vuelta estructurado; cada uno termina en una comprobación o una parada.](../../assets/teaching/universal-seams-red-black.svg)

Su verificador comprueba únicamente la coherencia de los registros ficticios fijos: `verified_in_fixture` no es una ejecución de producto, `not_run` no es evidencia de ejecución y `inferred` necesita un adaptador antes de un diagnóstico real. El ejercicio no añade capítulos, Labs, Skills, evaluaciones de modelos ni afirmaciones de compatibilidad.

## Lo que demuestra esta ruta

El mapa demuestra únicamente una titularidad canónica, anclas estables, referencias válidas, dependencias sin ciclos y una proyección compacta. El verificador del ejercicio demuestra únicamente su contrato de datos. Ninguno demuestra el comportamiento de una plataforma, evidencia de aprendizaje o transferencia, resultados de seguridad ni una ejecución de producto en vivo.
