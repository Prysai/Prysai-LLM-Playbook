<!-- content_id: chapter-11-designing-a-skill | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 11: diseñar un Skill que se gane su lugar

**Estado:** `candidate`. **Experimento:** `not_run`. Este capítulo especifica un método de diseño; no demuestra que un host descubra, cargue o ejecute un Skill concreto.

## El problema

Una sesión llamativa no basta para convertir un prompt en Skill. Puede depender de hechos no escritos, pedir permisos innecesarios, asumir una credencial o activarse por una palabra de moda. Un Skill útil es un paquete de método versionado para una clase de trabajo repetible, con acciones limitadas y evidencia inspeccionable.

> Un Skill es un paquete descubrible y reutilizable que asigna una clase de tarea acotada a acciones acotadas y evidencia comprobable.

No es un modelo, una herramienta, permiso, conector ni sustituto de aprobación humana.

## Escribe el contrato antes de la prosa

```yaml
skill_id: revision-de-limites
version: "0.1.0"
owner: equipo-o-persona
review_date: "AAAA-MM-DD"
purpose: "Revisar un artefacto suministrado contra un límite de evidencia indicado."
trigger:
  - "Se solicita una revisión de límites de evidencia."
  - "Hay artefacto, objetivo y aceptación suministrados."
non_trigger:
  - "Se solicita una reescritura sin límite."
  - "Faltan fuentes para afirmaciones importantes."
  - "Otro método nombrado posee la tarea."
required_inputs:
  - ruta o artefacto pegado
  - objetivo, exclusiones y aceptación
  - procedencia de afirmaciones materiales
allowed_actions: "leer objetivos; escribir informe en salida desechable; ejecutar checks reversibles nombrados"
forbidden_actions: "secretos, publicación, envío, borrado, instalación o red sin autorización"
output: "informe de afirmación → evidencia → alcance no cubierto"
stop_when: "falta entrada, autoridad, fuente o destino recuperable"
```

Un disparador debe incluir intención, entradas necesarias, propiedad del método y riesgo aceptable. Una coincidencia de palabra no basta. Los no disparadores evitan que el Skill secuestre una tarea vecina.

## Divide método, datos y ejecución

- `SKILL.md` guarda propósito, límites, pasos, parada y evidencia que siempre aplican.
- `references/` solo guarda material que se carga en una rama específica.
- `scripts/` solo contienen comprobaciones deterministas, con dependencias, red, escritura y salidas declaradas.
- `assets/` solo contienen recursos estáticos declarados.

No ocultes reglas de seguridad críticas en una referencia opcional. Un archivo existente tampoco prueba descubrimiento; descubrimiento no prueba carga; carga no prueba adopción; adopción no prueba comportamiento.

## Evalúa cuatro casos

| Caso | Debe ocurrir | No debe ocurrir |
|---|---|---|
| Positivo | El método se activa y deja un artefacto revisable | Declarar éxito sin evidencia |
| Límite | Cede a otro método o formula una pregunta precisa | Activarse por una etiqueta parecida |
| Fallo | Se detiene antes de una escritura insegura y conserva el primer punto ausente | Inventar entrada, permiso o resultado |
| Transferencia | Cambia hechos de dominio y vuelve a revisar supuestos | Sustituir nombres mecánicamente |

Incluye una falla intencional que cambie una sola variable y tenga señal visible. Define destino, línea base, pasos de rollback y una lectura posterior: «deshacer» no es suficiente.

## Práctica y límite

Elige un método de bajo riesgo realizado al menos dos veces, como revisar enlaces de Markdown, comprobar fuentes de un informe o preparar una entrega. Diseña contrato, un caso positivo, un caso cercano que no debe activar, una entrada ausente, una falla visible y una comprobación de rollback. Conserva una tabla de qué prueba cada artefacto y qué queda desconocido.

Hasta registrar esos casos en un entorno declarado y revisarlos de forma independiente, el Skill es `candidate`; no afirmes descubrimiento, carga, ejecución ni impacto de negocio.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos"><table role="presentation" width="100%"><tr><td align="left"><a data-chapter-nav="previous" href="10-planning-and-slicing-ES.md">← Anterior<br><strong>Capítulo 10 · planificación y cortes verticales</strong></a></td><td align="right"><a data-chapter-nav="next" href="12-agent-loop-and-stop-ES.md">Siguiente →<br><strong>Capítulo 12 · el ciclo, el estado y las condiciones de parada del Agent</strong></a></td></tr></table></nav>
<!-- chapter-navigation:end -->
