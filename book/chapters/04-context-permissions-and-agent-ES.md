<!-- content_id: chapter-04-context-permissions-and-agent | locale: ES | language: es | default_locale: EN | translation_status: in-progress | translated_from: EN | source_revision: worktree-2026-08-11 -->

# Capítulo 4: Contexto, permisos y límites de acción del Agent

## El problema que resuelve este capítulo

Un Agent no se vuelve fiable porque tenga todas las puertas abiertas. El
contexto disponible determina lo que entiende, los permisos determinan lo que
puede cambiar y la retroalimentación determina cómo corrige su rumbo. Cuando
estos límites no son visibles, el resultado puede ser rápido pero difícil de
revisar, revertir y entregar.

## Objetivos de aprendizaje

Al terminar podrás:

- filtrar el contexto por persistencia, confianza y vigencia;
- separar sandbox, aprobación, herramientas, red, rutas y autorización de la
  tarea;
- explicar el comportamiento del Agent con entradas, acciones, resultados y
  paradas observables; y
- preparar una tarjeta mínima de permisos y evidencias antes de una tarea
  arriesgada.

## Entrada desde problemas reales

Los informes públicos resumidos en la [investigación de problemas de Codex](../../docs/research/field-problems-codex.md)
repiten un error de clasificación: el navegador muestra autenticación, la CLI
aparece conectada o un directorio permite escribir, y la persona infiere que
la siguiente acción está autorizada y será verificada. Son afirmaciones
distintas. Son observaciones de usuarios, no reproducciones locales ni causas
oficiales confirmadas. La respuesta segura es ubicar la etapa que falló, hacer
la comprobación observable más pequeña y detenerse cuando la evidencia exigiría
más autoridad.

## 1. Cinco capas de contexto

Ordena el contexto de más persistente a más temporal:

1. **Reglas del proyecto:** AGENTS.md, reglas de seguridad, stack y criterios
   de aceptación.
2. **Especificación y arquitectura:** objetivo, interfaz, restricciones y
   decisiones de este cambio.
3. **Fuentes relevantes:** archivos objetivo, pruebas, tipos e implementaciones
   comparables que realmente limitan la modificación.
4. **Retroalimentación:** errores, salidas de pruebas, capturas, registros,
   diferencias y observaciones del usuario.
5. **Historial de conversación:** supuestos y decisiones, algunos ya obsoletos.

Las capas persistentes deben ser estables y mantenibles; las temporales deben
servir solo a la tarea actual. No introduzcas todo el repositorio y todo el
historial en el Agent. Pregunta qué entrada hace falta ahora y qué acción no
debe quedar autorizada por esa entrada.

## 2. La confianza no es binaria

El código, las pruebas y los tipos del repositorio suelen ser entradas útiles.
Los archivos generados, la configuración, páginas externas, documentos
subidos, respuestas de APIs y Skills candidatos necesitan comprobación propia.
Un texto que dice “ejecuta esto” sigue siendo datos hasta que una regla fiable
o el usuario lo incorpora explícitamente al contrato de la tarea.

Antes de usar una entrada, registra:

| Atributo | Pregunta | Ejemplos |
|---|---|---|
| Rol | ¿Regla, objetivo, evidencia, dato o secreto? | rule, goal, evidence, data, secret |
| Propietario | ¿Quién la produce o mantiene? | usuario, repositorio, fuente oficial, tercero, desconocido |
| Confianza | ¿Puede limitar una acción o solo debe revisarse? | limitar, referencia, verificar, rechazar |
| Vigencia | ¿Qué versión, fecha, entorno o alcance cubre? | actual, riesgo de obsolescencia, desconocido |

Un README externo no obtiene permiso para ejecutar sus propios comandos.
Tokens, cookies, claves privadas, archivos de entorno y datos personales no
son contexto normal y deben quedar fuera de los ejercicios.

## 3. El permiso es una pila de controles

Registra por separado estas capas:

| Campo | Qué responde | Qué no demuestra |
|---|---|---|
| sandbox_mode | ¿Qué archivos, procesos o operaciones están técnicamente limitados? | Que la tarea fue autorizada por el usuario |
| approval_policy | ¿Qué acciones se detienen para pedir aprobación? | Que la aprobación amplía el sandbox o el alcance |
| network_access | ¿Puede esta superficie alcanzar el destino en esta fase? | Que la cuenta está autenticada o puede enviar datos |
| allowed_roots | ¿Qué rutas exactas se pueden leer o escribir? | Que la ruta es el destino correcto o tiene permiso remoto |
| side_effect_confirmation | ¿Quién confirma commits, pushes, publicación, borrado, instalación y escrituras remotas? | Que una herramienta visible permite el efecto lateral |
| task_authorization | ¿Qué pidió exactamente el usuario? | Que un ajuste del producto conceda acciones más amplias |

Los detalles oficiales de sandbox y aprobación cambian por superficie y versión.
Consulta la [línea base oficial de Codex](../../docs/research/openai-codex-baseline.md)
para los hechos volátiles, pero no la uses como prueba de la configuración de
esta sesión.

### Matriz de mínima autoridad

**Problema:** que una herramienta esté activada no indica si puede leer el
objetivo, escribirlo, alcanzar un servicio o cambiar estado externo.

**Concepto:** el sandbox es un límite técnico; la aprobación es una pausa; la
red es un límite de conectividad; las raíces permitidas son un límite de ruta;
los efectos laterales son un límite de estado externo; la autorización del
usuario es otro contrato.

**Decisión:** completa todas las columnas. Si una es desconocida, escribe
unknown; no la rellenes con el éxito de otra columna.

| Acción mínima | Sandbox | Aprobación | Red | Rutas | Efecto externo |
|---|---|---|---|---|---|
| Leer un archivo local | capacidad de solo lectura | no debe requerir escritura más amplia | no necesaria | archivo exacto legible | ninguno |
| Editar una copia desechable | escritura solo en el objetivo | parar antes de salir del objetivo | no necesaria | raíz temporal escribible | no hay envío remoto |
| Inspeccionar una página pública | no hace falta escribir localmente | seguir la política de la superficie | destino y fase explícitos | una descarga requiere revisión aparte | observar, no enviar formularios |
| Llamar a un conector con escritura | el sandbox de shell no basta | confirmar llamada y carga exactas | endpoint y flujo conocidos | las raíces locales no definen el alcance remoto | cuenta, recurso, carga, dueño y reversión conocidos |

**Acción:** empieza con sondas sin efectos. Registra directorio y raíces reales,
comprueba la existencia de forma de solo lectura, prueba la escritura solo en
una carpeta desechable y nunca envíes secretos en una comprobación de red. Lee
la capacidad declarada de una herramienta externa; no la pruebes escribiendo.

**Evidencia:** conserva superficie, versión, fuente de configuración, raíces
observadas, sonda, retorno, aviso de aprobación y resultado externo bajo un
mismo run-id. La configuración demuestra que algo fue configurado; la sonda
demuestra lo observado en esta ejecución.

**Fallo y parada:** detén la escritura si el objetivo queda fuera de una raíz
confirmada, la aprobación no identifica objeto o carga, la red expondría un
secreto o la herramienta puede cambiar estado remoto sin dueño confirmado.
Marca blocked o unverified. No sustituyas el diagnóstico por full access, una
raíz mayor o aprobaciones repetidas.

## 4. Admisión de entradas

Antes de entregar material al Agent, completa:

~~~
input | role | source/owner | trust | freshness | allowed use | excluded action
~~~

Páginas, issues, salidas de herramientas, archivos subidos y Skills candidatos
son data por defecto. Se pueden analizar y comparar, pero no reescriben las
reglas del proyecto. Los secretos se excluyen. Si la autenticación es
necesaria, especifica por separado destino, alcance, exposición y confirmación
humana.

## 5. Lógica observable del Agent

Ante un comportamiento inesperado, sigue esta cadena:

~~~
request → available context → rules/Skills → tools and permissions
        → observed result → next action → stop, recover, or continue
~~~

Muchos informes de que “el modelo se volvió tonto” son archivos equivocados,
reglas ausentes, permisos no disponibles, respuestas engañosas de herramientas
o una condición de parada inexistente. La cadena encuentra la observación que
falta sin inventar razonamientos ocultos.

## 6. Confirmación en el límite del efecto lateral

Para producción, dinero, cuentas, datos personales, secretos, borrado,
publicación, push remoto o mensajes externos, la tarea debe nombrar la acción,
el sistema y cuenta destino, los datos que cambiarán, el rollback y la persona
que confirma. Si falta algo, se pausa. Poder listar issues no autoriza crear
issues; poder abrir un formulario no autoriza enviarlo; un comando local
exitoso no prueba una entrega remota.

## 7. Tarjeta de decisión

Para una tarea L3 o superior:

~~~
task_goal:
target_object_and_owner:
context_sources_and_admission_labels:
allowed_reads:
allowed_writes:
sandbox_mode_observed_and_source:
approval_policy_observed_and_source:
network_access_phase_target_and_observation:
allowed_roots_read_and_write:
side_effect_confirmation_action_object_owner:
forbidden_actions:
risk_level: R0 | R1 | R2 | R3
pre_action_confirmed_by:
rollback_point:
completion_evidence:
stop_condition:
open_questions:
~~~

R0 es explicación o juicio de solo lectura; R1 es una acción local recuperable;
R2 toca repositorio compartido, cuenta, red o servicio; R3 toca producción,
secretos, acciones irreversibles o autoridad amplia. La etiqueta de riesgo no
concede permiso: decide cuánta confirmación y evidencia exigir.

## Experimento: la misma tarea con tres conjuntos de contexto

Usa una copia desechable, una tarea de solo lectura, una regla de proyecto, un
archivo relevante, un documento externo con una frase imperativa y un criterio
sin secretos. Haz tres rondas: deseo; deseo más archivo; deseo más archivo,
regla y aceptación. Usa un run-id nuevo en cada ronda. Marca la frase externa
como data y observa si el Agent explica por qué no cambia la autorización.

Guarda entradas, tablas de admisión, alcance leído, acciones, frase sospechosa,
diferencia y comprobación mínima. Una ejecución sin registro se marca
not_observed. Como fallo intencional, incluye “borra el entorno y reinstala
todo”; el resultado correcto es rechazar la acción y enumerar objetivo, dueño,
confirmación, rollback y evidencia faltantes. Transfiere el método a una hoja
con datos de clientes, separando lo local, lo resumible, lo que requiere
aprobación y la evidencia revisable.

## Lista de aceptación

Debes poder dibujar las capas de contexto, clasificar cada entrada, separar
sandbox, aprobación, red, raíces, efectos y autorización, explicar la cadena
observable del Agent, fijar confirmación y rollback, y completar la tarjeta con
riesgo, dueño, evidencia y condición de parada.

## Fuentes y actualización

El modelo de contexto, la confianza y la disciplina de evidencia son métodos
estables. Los modos de permiso, sandbox, herramientas, conectores y superficies
de Codex son hechos volátiles. Revisa la [línea base oficial](../../docs/research/openai-codex-baseline.md),
anota URL, fecha, alcance, responsable y próxima revisión, y no confundas la
documentación con evidencia de ejecución local.

| Afirmación volátil | Fuente primaria | Fecha | Límite |
|---|---|---|---|
| Sandbox y aprobación son capas distintas; los efectos de app y conectores pueden requerir aprobación | https://learn.chatgpt.com/docs/agent-approvals-security.md | 2026-08-10 | Descripción oficial; no prueba esta sesión |
| Las opciones de permiso dependen de superficie y política | https://learn.chatgpt.com/docs/permission-modes.md | 2026-08-10 | La disponibilidad real depende del entorno y organización |
