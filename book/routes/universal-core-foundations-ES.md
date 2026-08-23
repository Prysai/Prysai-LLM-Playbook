<!-- content_id: universal-core-foundations-route | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-15 -->

# Trabajar con LLM: una primera tarea segura y cuatro fundamentos

**Estado:** `candidate`. **Estado de ejecución:** `not_run`.

Empieza aquí si quieres usar un chat de texto normal y todavía no necesitas configurar un producto concreto. Puedes hacer el primer intento de abajo sin tratar ChatGPT, Claude, Grok, Gemini, Codex ni ningún otro producto como si fueran lo mismo. Esta ruta reúne cuatro decisiones que se repiten en muchas plataformas: definir la tarea, limitar el material, dejar claro cómo comprobarla y establecer un punto de parada. No afirma que las plataformas compartan herramientas, permisos, memoria, cuentas, precios ni comportamiento de Agent.

## Prueba ahora una primera tarea segura

Usa solo el aviso ficticio de abajo. No pegues mensajes privados, material de clientes, credenciales, trabajo sin publicar ni archivos reales. Durante esta prueba no navegues, no uses herramientas, no subas archivos, no cambies la cuenta ni envíes o publiques nada.

Copia esta petición en el chat de texto que hayas elegido:

```text
Resultado: reescribe este aviso ficticio de un club para miembros nuevos.
Material: "El club se reúne el martes a las 6. Trae un cuaderno. La sala se confirmará más tarde."
Formato de respuesta: escribe dos frases. Conserva todos los hechos indicados. Pon cualquier detalle que falte entre [corchetes]. Después enumera los hechos que conservaste.
Comprobación: compara el texto fuente con la reescritura. No añadas una hora, una sala, una cuota, un contacto ni una promesa que no estuvieran en el original.
Parada: no navegues, envíes, publiques ni supongas un detalle desconocido.
```

Después comprueba por tu cuenta tres cosas:

1. ¿Puedes señalar en el aviso original qué respalda cada afirmación de la reescritura?
2. ¿La respuesta respeta el límite de dos frases y enumera los hechos que conservó?
3. ¿Añade algún detalle que debería seguir siendo `[desconocido]`?

Si respondes que sí a la última pregunta, elimina el detalle añadido o pide una única corrección. Si el chat propone buscar, enviar, publicar o usar una herramienta, o solicita material que este ejercicio no necesita, detente. Una respuesta bien redactada no demuestra que sus hechos sean verdaderos ni que el método funcione en todos los productos.

Este es un ejercicio en estado candidato, no una fórmula universal para escribir prompts ni una afirmación de resultados. No hay datos de ejecuciones en varios modelos, de aprendizaje ni de efectividad.

## Construye la base a partir de esa primera tarea

Después de intentarlo una vez, usa las cuatro unidades siguientes para entender por qué incluso una petición pequeña necesita un resultado, material, comprobación y punto de parada. Estas decisiones son aún más importantes cuando la tarea deja de ser un intercambio exclusivamente textual.

1. [**Convierte una intención en un contrato de tarea**](../chapters/03-task-protocol-ES.md#core-task-contract): define el resultado, el contexto pertinente, el límite de acción, la aceptación, la regla de parada y la entrega.
2. [**Relaciona las afirmaciones con la evidencia y recupérate dentro de un límite**](../chapters/09-verification-and-recovery-ES.md#core-evidence-recovery): comprueba la afirmación más acotada y detente en la primera capa que no tenga respaldo.
3. [**Planifica un bloque pequeño que deje evidencia**](../chapters/10-planning-and-slicing-ES.md#core-evidence-bearing-slice): elige el resultado más pequeño que otra persona pueda inspeccionar y continuar.
4. [**Separa capacidad, autorización, confirmación y evidencia**](../chapters/13-action-boundaries-ES.md#core-action-boundary): distingue lo que se puede hacer de lo que está permitido y de lo que realmente se hizo o se verificó.

Las instrucciones de un producto concreto pertenecen a un adaptador de plataforma; los ejercicios de dominio pertenecen a rutas de aplicación.

## Prueba un límite antes de elegir una plataforma

El [ejercicio de fronteras universales](../../examples/universal-seam-v1/README-ES.md) contiene cuatro registros ficticios: una solicitud más reciente que no coincide, un destino equivocado, un comprobante de ejecución de herramienta ausente y un valor estructurado que ha cambiado. En cada caso, indica qué no demuestra el texto visible, elige la comprobación segura más pequeña y detente antes de que un comportamiento real requiera un adaptador. La explicación está en español; los datos fijos siguen siendo material ficticio y compartido.

![Cuatro enlaces de evidencia: identidad de tarea, identidad de destino, recibo de ejecución y recorrido de ida y vuelta estructurado; cada uno termina en una comprobación o una parada.](../../assets/teaching/universal-seams-red-black.svg)

Su verificador comprueba únicamente la coherencia de los registros ficticios fijos: `verified_in_fixture` no equivale a una ejecución de producto, `not_run` no es evidencia de ejecución y `inferred` necesita un adaptador antes de un diagnóstico real. El ejercicio no añade capítulos, Labs, Skills, evaluaciones de modelos ni afirmaciones de compatibilidad.

## Lo que demuestra esta ruta

El mapa demuestra únicamente qué contenido es canónico, que los anclajes son estables, que las referencias son válidas, que no hay ciclos de dependencia y que la proyección es compacta. El verificador del ejercicio demuestra únicamente su contrato de datos. Ninguno demuestra el comportamiento de una plataforma, evidencia de aprendizaje o transferencia, resultados de seguridad ni una ejecución de producto en vivo.
