# Respuestas de LLM que parecen tener fuentes: una comprobación antes de creerlas

**Estado:** registro de investigación candidato. Es un diseño fechado y acotado por fuentes; todavía no se ha realizado ninguna sesión con aprendices, ejecución de un modelo, tarea de navegación, verificación de citas, prueba de seguridad del producto ni evaluación de la calidad de las fuentes.

## Pregunta

¿Cuál es la primera acción segura y más pequeña cuando una persona principiante recibe una respuesta de un LLM que *parece documentada*, pero no muestra un registro de fuentes que se pueda comprobar?

## Alcance y método

Este registro es más estrecho que un flujo completo de investigación. No dice si una afirmación es verdadera. Enseña a distinguir un marcador que parece una cita del registro necesario para investigar una afirmación importante: la afirmación, quién responde por la fuente, una ubicación que se pueda abrir, la fecha de acceso y el material que la respalda en contexto.

La actividad es un ejercicio fijo y ficticio, solo de texto. Prohíbe navegar, recuperar fuentes, compartir datos y realizar acciones externas. Si hace falta confirmar un hecho actual, la persona debe pasar a las rutas existentes Source Investigator y Research Router.

## Mapa de evidencia

| ID | Clase de evidencia | Fuente y acceso | Qué respalda | Qué no demuestra |
| --- | --- | --- | --- | --- |
| O1 | orientación oficial | [Buenas prácticas de seguridad de la API de OpenAI](https://platform.openai.com/docs/guides/safety-best-practices), consultada el 2026-08-14 | OpenAI recomienda revisar las salidas antes de usarlas, especialmente en ámbitos de alto riesgo, y conservar el material original necesario para verificarlas. | La verdad de una respuesta concreta, una auditoría independiente, una propiedad de seguridad del producto o que esta tarjeta cambie la conducta de quien aprende. |
| O2 | orientación técnica oficial | [NIST AI 600-1: perfil de IA generativa](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), consultada el 2026-08-14 | NIST identifica la confabulación: el contenido puede ser erróneo y, aun así, sonar plausible o seguro. Esto justifica tratar las justificaciones generadas como algo que hay que revisar. | La tasa de citas erróneas, el comportamiento de un modelo concreto o la corrección de una fuente concreta. |
| R1 | informe público de una persona usuaria | [OpenAI Developer Community: informe sobre URL y títulos inventados](https://community.openai.com/t/critical-hallucinated-urls-fake-article-titles-in-web-mode-despite-verification-requests/1253893), consultado el 2026-08-13 | Una persona describió títulos y URL aparentemente fabricados en una interacción con la web activada; es una señal de fallo útil para una comprobación del registro de fuentes. | Un incidente reproducido, la causa, la frecuencia, el comportamiento actual del producto o una mitigación validada. |

## Decisión curricular

La inferencia del proyecto es deliberadamente modesta: **un marcador de cita todavía no es un registro de fuente comprobable**. Para una afirmación importante, conserva la afirmación, la persona u organización responsable de la fuente, la URL u otra ubicación resoluble, la fecha de acceso y el pasaje o dato que la respalda directamente. Si falta un campo, el primer estado honesto es `unverified`, no «probablemente correcto».

Es una regla editorial y de manejo de evidencia derivada de O1 y O2. No es una norma formal, una obligación legal, una garantía de que un registro completo sea correcto ni un sustituto de una revisión cualificada.

## Implicación didáctica de bajo riesgo

Usa una respuesta ficticia con una afirmación y un marcador entre corchetes, pero sin responsable de la fuente, URL, fecha ni pasaje de apoyo. Pide que se conserven los campos ausentes, en vez de rellenarlos con una suposición verosímil. El recibo esperado es:

```text
claim: [quoted from the fictional answer]
source record: missing
status: unverified — source record missing
next allowed check: locate the source owner and the supporting material
stop: do not invent a source, browse, publish, or act on the claim here
```

Esto produce un pequeño artefacto de decisión, pero no verifica la fuente ni la afirmación. Una pregunta sobre un hecho actual comienza solo cuando la persona nombra la afirmación y quién responde por la fuente en Source Investigator; una pregunta con varias fuentes comienza en Research Router.

## Fallo y límite de parada

El ejercicio falla si la persona o el modelo aporta una fuente, fecha, pasaje, puntuación de confianza o conclusión que la tarjeta ficticia no contenía. Conserva ese añadido como artefacto de fallo y marca como ausente el registro de fuentes. No navegues para rescatar el ejemplo, no lo conviertas en una afirmación sobre una política real y no uses el resultado para justificar una acción externa.

Detente si la afirmación puede afectar a la salud, la ley, el empleo, la educación, el dinero, la seguridad, una persona privada o un sistema compartido. Esta tarjeta no es adecuada para esa decisión.

## Afirmaciones que no se hacen

Este registro y su tarjeta asociada no demuestran:

- que una cita de un LLM sea inventada o fiable;
- que un registro completo haga que una afirmación sea correcta, actual, imparcial o adecuada para decidir;
- que una persona pueda evaluar fuentes, detectar desinformación, resistir una inyección de instrucciones o investigar de forma independiente;
- el comportamiento, la seguridad, la privacidad, el cumplimiento, el aprendizaje, la retención, la transferencia, la preparación para una beta pública o la preparación para producción de un producto.

## Fuentes y licencias

Las explicaciones, el contenido ficticio, los campos del recibo y el SVG enlazado para lectores son material original de Prysai Lab. O1 y O2 solo se enlazan y para referencia; su contenido subyacente sigue sujeto a las condiciones de sus propietarios. R1 sigue siendo un informe público individual y no se copia ni se presenta como un hecho oficial. El registro de activos del repositorio documenta este límite de distribución.

## Cuándo revisar

Revisa el registro antes de cambiar la afirmación de la tarjeta, sus campos de fuente, la orientación de producto enlazada o el alcance de seguridad. También revísalo si OpenAI o NIST modifican de forma sustancial la orientación citada, o después de la primera observación autorizada de un aprendiz.
