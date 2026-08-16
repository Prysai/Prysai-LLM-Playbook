<!-- content_id: chapter-07-skills-plugins-and-tools | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-16 -->

# Capítulo 7: cómo se reparten el trabajo los Skills, los Plugins, MCP y las herramientas

**Estado:** `candidate`. **Comparación:** `not_run`. Estos casos enseñan un método;
no prueban que un Skill externo haya funcionado en este repositorio.

**Empieza aquí:** nombra primero la brecha de la tarea y elige después la capacidad
mínima que la cubra.

## El problema

«Necesito un Skill» no siempre es el diagnóstico correcto. Un Skill, Plugin,
servidor MCP, conector, script, plantilla y documento resuelven problemas distintos.
Tratarlos como etiquetas intercambiables lleva a instalar capacidad que la tarea no
necesita, ocultar dependencias y ampliar efectos externos sin advertirlo.

La pregunta útil no es «¿qué directorio tiene más Skills?», sino:

> ¿Qué le falta a esta tarea? ¿Qué capacidad mínima cubre esa brecha sin perder
> control sobre permisos, licencia, dependencias y evidencia?

## Objetivos de aprendizaje

- explicar la división entre método, conexión, ejecución y distribución;
- derivar una combinación mínima útil desde la tarea, no desde un directorio;
- revisar disparadores, dependencias, licencia, permisos, efectos y evidencia
  antes de adoptar un Skill, Plugin o conector; y
- distinguir archivo existente, capacidad descubierta, cargada, adoptada y
  comportamiento verificado.

## Un punto de entrada real: el descubrimiento falla antes de empezar

La [investigación de campo de Codex](../../docs/research/field-problems-codex.md)
registra informes públicos. Son síntomas, no una causa oficial ni reproducción local.

| Síntoma público | Qué observó la persona | Qué **no** demuestra | Primera respuesta segura |
|---|---|---|---|
| Un Skill funciona como archivo normal pero deja de descubrirse al ser enlace simbólico | La forma de representar el archivo cambia el resultado de descubrimiento | Que todo escáner de Skills, sistema operativo o versión tenga el mismo defecto | Conserva forma de archivo y superficie; compara archivo y enlace en una prueba aislada |
| Usar un Skill de forma explícita depende de una lista implícita disponible | Una petición explícita no es independiente del listado de la superficie | Una regla general de enrutamiento o una garantía oficial | Guarda lista visible, petición exacta, sesión y recursos cargados por separado |

Una ruta en el repositorio no significa que el host actual descubrió el Skill; un
nombre visible no significa que esta sesión lo cargó; y cargarlo no prueba que sus
dependencias o permisos externos funcionen.

## 1. Un modelo de capacidad de cuatro capas

Antes de elegir un paquete, nombra qué falta:

```text
capa de método       Skill            método repetible para una clase de tarea
capa de conexión     MCP/conector      datos, contexto o acciones externos
capa de ejecución    herramienta       leer, editar, ejecutar, navegar o llamar
capa de distribución Plugin           paquete que combina capacidades
```

Las capas pueden solaparse, pero responden a preguntas distintas.

| Capa | Qué aporta | Qué no concede por sí misma |
|---|---|---|
| Skill | Instrucciones y recursos para una tarea o flujo repetible | Permiso, acceso externo o prueba de que funciona aquí |
| Servidor MCP / conector | Puente hacia herramientas, recursos, contexto o acciones externos | Autenticación, aprobación de cada acción o límite seguro de datos |
| Herramienta | Acción observable: leer, editar, ejecutar o llamar una API | Un motivo para usarla, autorización o corrección del resultado |
| Plugin | Distribución y composición de varias capacidades | Autorización automática o garantía de disponibilidad |

Para lógica repetida que debe ejecutarse igual cada vez suele ser mejor un script.
Para una forma de salida estable, una plantilla. Para conocimiento que solo se
consulta en ciertos casos, documentación. Un Skill vale la pena cuando el método se
repite pero aún requiere juicio según el contexto.

## 2. Selecciona en un orden que limite el alcance

1. Decide si la tarea ya tiene un protocolo claro; si no, aclárala primero.
2. Si el mismo método se repite y se omiten pasos, considera un Skill.
3. Si hacen falta datos o acciones externas, pregunta si un conector o MCP es necesario.
4. Si la transformación es determinista, prefiere un script.
5. Si varias capacidades deben distribuirse juntas, considera un Plugin como distribución.
6. Solo entonces decide si instalar, autenticar o abrir permisos adicionales.

El orden es deliberadamente conservador. Un directorio grande puede aparentar más
capacidad y, a la vez, volver ilegible el grafo real de dependencias y permisos.

## 3. Empieza por la brecha, no por el nombre del Skill

Responde por escrito antes de adoptar un candidato:

- **Brecha de tarea:** ¿falta método estable, script determinista, conexión externa
  o la definición misma de la tarea?
- **Disparador y no disparador:** ¿qué entrada debe activarlo? ¿Qué petición similar
  no debe activarlo o debe ir a otro método? Compartir palabras no basta.
- **Fuente y revisión:** ¿otra persona puede comprobar URL, commit, versión o hash y
  fecha de inventario?
- **Licencia y dependencias:** ¿la licencia cubre archivos objetivo? ¿se inventariaron
  NOTICE, activos anidados y dependencias de ejecución?
- **Permisos y efectos:** ¿qué lee o escribe? ¿requiere red o cuenta? ¿puede enviar,
  publicar, borrar, modificar o alterar otro sistema?
- **Verificación y mantenimiento:** ¿una prueba aislada cubre positivo, límite, fallo
  y transferencia? ¿quién aprueba, mantiene, respalda, actualiza y practica reversión?

El número de entradas externas no es calidad. Cada candidato necesita una revisión
basada en su propia evidencia.

### Qué contiene un Plugin y dónde termina el soporte

La documentación oficial de [Plugins](https://learn.chatgpt.com/docs/plugins.md)
describe un Plugin como paquete instalable que puede incluir Skills, Connectors o
ambos. Un Connector puede estar respaldado por un servidor MCP y ofrecer herramientas,
información compartida o acciones en un sistema externo. Plugin es distribución y
composición, no autorización.

La documentación consultada el 2026-08-09 enumera Plugins para ChatGPT Chat/Work en
web, escritorio y móvil; Codex en la aplicación de escritorio de ChatGPT; y el
explorador de Plugins de Codex CLI. No enumera una extensión IDE. Que Chat/Work
funcione en móvil no implica la misma superficie de exploración o instalación que
escritorio.

Trata producto y conexión como una cadena de evidencias separadas:

```text
soporte del producto → autorización de cuenta u organización → instalación del Plugin
→ autenticación del conector → sesión nueva → Skill/herramienta visible
→ llamada real → resultado externo verificado
```

Cada flecha es una afirmación independiente. «Sign in with ChatGPT» no entrega
acceso automático a los datos de un Plugin ni aprueba acciones. Revisa `OF-015`,
`OF-016`, `UF-001`, `UF-003` y `LB-002` en el
[registro de impacto de hechos](../../docs/governance/fact-impact-registry.yaml)
antes de cambiar contenido afectado.

Los materiales oficiales consultados el 2026-08-10 distinguen coincidencia automática
de selección explícita: ChatGPT usa `@` y Codex `$`; también indican iniciar una
nueva conversación o sesión CLI tras instalar. Son hechos cambiantes de producto,
no permisos que acompañen a un Skill. Una comprobación local debe conservar
superficie, sesión, cadena de invocación, recursos cargados, salida y verificación.
Este repositorio no tiene tales registros: el estado sigue siendo `not_observed`.

## 4. El paquete de revisión antes de adoptar

Antes de instalar, prepara un `skill-adoption-decision.md`; no basta con «licencia
revisada».

```text
task_gap:
trigger_conditions:
non_trigger_conditions:
source_url / revision / inventory_date:
license / NOTICE / nested_assets:
dependencies:
target_install_scope:
permissions:
external_side_effects:
isolated_trial:
backup_and_restore_target:
rollback_steps_and_success_check:
approval_points:
behavior_tests: positive | boundary | failure | migration
owner / next_review:
decision: recommendation-only | blocked | approved-to-install | installed-candidate
evidence / unverified:
```

| Decisión | Significa | Puedes afirmar | No puedes afirmar |
|---|---|---|---|
| `recommendation-only` | Parece encajar; sigue revisión de solo lectura o prueba aislada | «vale la pena revisarlo» | «está aprobado para instalar» |
| `blocked` | Falta evidencia de licencia, NOTICE, revisión, dependencia, permiso o reversión | «no adoptar todavía» | «instálalo y completa el registro después» |
| `approved-to-install` | Revisión, alcance, respaldo, reversión y aprobaciones están definidos y aceptados | «puede instalarse en este alcance» | «ya está instalado» o «verificado» |
| `installed-candidate` | Destino e instalación son observables; conducta no se revisó por completo | «existe un candidato instalado aislado» | «el equipo lo adoptó» o «listo para producción» |

Los estados `draft`, `candidate`, `verified` y `production-ready` del proyecto son
distintos de estas decisiones. Una página GitHub accesible no aclara licencia; un
manifest no prueba una llamada de herramienta.

### Cinco estados fáciles de confundir

| Estado | Evidencia mínima | No demuestra |
|---|---|---|
| Archivo existente | Ruta, manifest, inventario o hash en revisión fija | Que la superficie actual lo descubra |
| Descubierto | Lista visible o resolución de nombre de la superficie actual | Que esta sesión lo cargó |
| Cargado | Recurso o instrucción en una sesión nueva | Que el equipo lo adoptó |
| Adoptado | Propietario y aprobación en el alcance declarado | Conducta verificada |
| Verificado | Positivo, límite, fallo y transferencia en entorno declarado | Igual conducta en otra cuenta, entrada o versión |

Instalar es también una acción observable. El destino y log pueden apoyar
`installed-candidate`, pero no sustituyen descubrimiento, carga, adopción ni
validación de comportamiento.

### Dos decisiones de adopción trabajadas

- **Recomendación:** `code-review-and-quality` de S05 es un candidato razonable
  `recommendation-only` para un diff con base definida. Proviene del archivo local
  de `https://github.com/addyosmani/agent-skills`, señal SHA-256
  `6EEDBE7D2EA3A82417781D879785BD501FBDE21275627F557DE4B76560BA1250` y señal MIT
  a nivel de repositorio. Dependencias anidadas, activos completos, permisos reales
  y reversión aún no se revisaron: sigue lectura o ensayo aislado, no instalación.
- **Variante bloqueada:** `webapp-testing` de S06 debe seguir `blocked`. Proviene del
  archivo local de `https://github.com/composio-community/awesome-codex-skills`,
  SHA-256 `D3DA83ED9D474690E7FF235351376114972840C78BC319CBCB8F89CBD704608E`.
  Hay señal Apache-2.0 en raíz, no evidencia de cobertura coherente de licencia y
  NOTICE para cada Skill, script y activo anidado. Sin revisión por activo y
  reversión practicable, tener `SKILL.md` no basta.

## 5. Compón capacidades; no las apiles

```text
protocolo de tarea → método de dominio → herramienta o conexión → revisión de evidencia
```

En un experimento de marketing de bajo riesgo, el protocolo define objetivo y
límites; un método de contexto de producto aporta público y posicionamiento; una
herramienta analítica registra datos; Evidence Review comprueba que el evento
ocurrió. Diez Skills solapados suelen ser menos comprensibles que un método y un
protocolo claros.

## 6. Entrega antes de componer

Cuando una capacidad entrega trabajo a otra, usa los mismos campos:

```text
status | owner | scope | inputs | assumptions | actions_done
actions_not_done | evidence | unverified | blocked_on | next_check
permission_boundary | next_review
```

Un Skill de dominio posee su método; Task Protocol el límite de ejecución; Evidence
Review revisa afirmaciones; Workflow Orchestrator mantiene fases y controles. Invocar
un Skill no le concede permisos de otro ni debe iniciar una orquestación completa de
forma recursiva.

## 7. Experimento: compara tres combinaciones

### Preparación y tarea

Elige una tarea local, reversible y de bajo riesgo. Prepara un protocolo, dos
candidatos Skill de revisión fija y una opción simulada que pediría conexión externa.
Uno debe poder seguir a revisión aislada; otro debe rechazarse por licencia, NOTICE
o reversión poco claros. No subas datos reales, envíes mensajes, escribas en terceros
ni autentiques cuentas. Asigna un `run-id` a cada combinación y conserva texto y
rúbrica de la tarea.

Diseña para la misma tarea: (1) solo protocolo, (2) protocolo y Skill de dominio,
(3) protocolo, Skill y conexión externa. Completa primero la revisión previa. Es un
experimento de solo lectura: no instales, autentiques ni habilites configuración de
equipo. Compara calidad de salida, tiempo, permisos, coste de verificación y efectos.

### Evidencia y reflexión

Conserva las tres rutas, sus `run-id`, dos decisiones de adopción, tabla de
dependencias/permisos, hallazgos de licencia, salida simulada o real, resultados de
verificación y una lista de acciones externas no ejecutadas. Una fila válida hace
comprobables fuente y revisión, apunta a archivos de licencia reales, nombra destino
de instalación/respaldo/reversión, responsable y aprobaciones, cubre positivo/límite/
fallo/transferencia y conserva la línea base sin conexión extra. Una llamada simulada
se llama simulada.

Explica qué evidencia movería `recommendation-only` o `blocked` al siguiente estado.
Para cada observación indica si prueba existencia, descubrimiento, carga, adopción o
validación; un estado temprano nunca sustituye a uno posterior.

## Fallo deliberado y límite

Ofrece tres Skills solapados; uno pide subida externa aunque solo hace falta ordenar
localmente. Añade un candidato con repositorio accesible y `SKILL.md`, pero licencia
o reversión inciertas. Se aprueba si se detecta el solapamiento, se rechaza permiso
innecesario, el candidato incierto queda `blocked` y se conserva la línea base.

## Transferencia

Aplica las cuatro capas a un flujo de investigación y a un informe de producto. En
cada uno identifica método, conexión y toda transformación determinista que debería
ser un script.

## Fuentes y límite de mantenimiento

| Hecho o límite | Fuente | Consulta | Aplicación |
|---|---|---:|---|
| Skills como instrucciones y recursos; selección explícita | [Skills and Plugins](https://learn.chatgpt.com/docs/skills-and-plugins.md) | 2026-08-09 | Descripción oficial; no prueba carga aquí |
| Plugins: composición, superficies, instalación, autenticación y aprobación | [Plugins](https://learn.chatgpt.com/docs/plugins.md) | 2026-08-09 | El acceso puede cambiar por cuenta u organización |
| Servidores MCP, herramientas/recursos/prompts y permitir/denegar | [MCP](https://learn.chatgpt.com/docs/extend/mcp.md) | 2026-08-09 | Autenticación, herramientas y política requieren revisión separada |
| Efectos de conectores o MCP y aprobación | [Agent approvals and security](https://learn.chatgpt.com/docs/agent-approvals-security.md) | 2026-08-09 | No es la configuración runtime de este repositorio |
| Síntomas de descubrimiento por enlace e invocación explícita | [Campo Codex](../../docs/research/field-problems-codex.md) | 2026-08-09 | Informes públicos, sin reproducción ni causa oficial |
| Inventario y señales de licencia de candidatos | [Catálogo de candidatos](../../docs/sources/skill-candidate-catalog.md) | 2026-08-09 | Inventario, no autorización de instalación |

Skills, Plugins, conectores, MCP, manifests, autenticación e invocación cambian.
Actualiza primero fuentes primarias y revisa registro de impacto, capítulo, Labs,
Skills, fixtures y rutas afectadas. No mezcles descripción oficial, síntoma comunitario
y evidencia local en una sola frase.

## Lista de aceptación

- [ ] Distingo Skill, Plugin, servidor MCP, conector, herramienta, script, plantilla y documento.
- [ ] Puedo describir brecha, disparadores, exclusiones, fuente, licencia, dependencias, permisos, efectos, responsable y reversión.
- [ ] Mantengo un candidato como `recommendation-only` y marco `blocked` si licencia o reversión no son claras.
- [ ] Distingo existencia, descubrimiento, carga, adopción y conducta verificada.
- [ ] Comparo la línea base de protocolo con una combinación bajo entrada, aceptación y evidencia fijas.
- [ ] Declaro qué acciones externas no ejecuté y qué exigiría antes de afirmar éxito runtime.
- [ ] Puedo informar que este capítulo sigue `candidate` y su comparación `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Navegación de capítulos">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="06-model-selection-ES.md" aria-label="Capítulo anterior: Capítulo 6 · Elegir un modelo no es venerar un modelo">← Anterior<br><strong>Capítulo 6 · Elegir un modelo no es venerar un modelo</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="../table-of-contents-ES.md" aria-label="Volver al índice en español: el Capítulo 8 aún no está traducido">Siguiente pendiente →<br><strong>Ver disponibilidad del Capítulo 8</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
