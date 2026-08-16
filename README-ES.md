# Prysai LLM Playbook — From First Task to Reliable Work

> Manual práctico de LLM: de la primera tarea al trabajo fiable.

<!-- language-switcher:start -->
**Idiomas:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

## Empieza con una práctica segura, no con una instalación

¿Es tu primera vez con una carpeta de proyecto? Abre
[Primer cambio seguro](book/routes/first-safe-change-ES.md). Es una práctica
local y descartable con un README, un cambio permitido y una comprobación
visible; no pide una cuenta, red, instalación ni un proyecto real. Es una
traducción `in-progress`, no una revisión lingüística independiente ni
evidencia de aprendizaje.

Prysai LLM Playbook no es un directorio que se limite a
enumerar skills ni un manual que solo explique pasos de instalación. Es un
sistema de aprendizaje y práctica de Codex GPT, organizado como libro,
curso y laboratorio: primero ayuda al lector a entender la relación entre
GPT, los modelos, Codex, el contexto, las herramientas, las Skills y los
Agents; después convierte esa comprensión en acción mediante experimentos;
por último, transforma los métodos personales en capacidades de equipo que
se pueden evaluar, reutilizar y actualizar.

La ruta acompaña a cualquier persona desde «he oído hablar de GPT» hasta el
uso seguro de Codex, la ejecución estable de tareas reales, la comprensión de
por qué un Agent actúa de cierta manera, la elección y el diseño de Skills
adecuadas y la creación de un sistema de trabajo propio que pueda compartir
con un equipo.

## Qué problema resolvemos

Muchas personas consiguen que la IA genere algo que parece correcto, pero no
logran que complete una tarea real de forma estable. El problema normalmente
no es «no saber escribir un prompt», sino no tener un sistema de trabajo
completo:

- no distinguen GPT, Codex, el modelo, el contexto, las herramientas y las
  Skills;
- no saben cuándo conviene preguntar, cuándo entregar archivos y cuándo
  pedirle a Codex que inspeccione primero;
- no saben convertir un objetivo impreciso en tareas ejecutables;
- no saben controlar permisos, verificar resultados ni responder a un fallo;
- han instalado muchas Skills, pero no saben por qué son útiles, cuándo
  combinarlas ni cuándo no deberían usarlas;
- pueden tener éxito en una prueba personal, pero no convertir el método en
  un proceso reutilizable, revisable y mantenible para un equipo.

Esta ruta de aprendizaje aborda esos problemas en una línea continua:

```text
Conocer GPT → conocer Codex → prepararse con seguridad → expresar la tarea
       → gestionar el contexto → usar herramientas → elegir y combinar Skills
       → entender la lógica del Agent → planificar/ejecutar/verificar/entregar
       → practicar en dominios profesionales → colaborar a escala organizativa
```

La ruta avanza por dos ejes a la vez:

- **Eje de comprensión:** entender cómo funcionan GPT y los modelos, y cómo
  el contexto, las herramientas, las Skills, los Agents, los permisos y la
  verificación cambian el resultado.
- **Eje de capacidad:** empezar con experimentos pequeños y practicar de
  forma gradual la expresión de tareas, el diseño de flujos de trabajo, la
  selección de Skills, la revisión de resultados y la gobernanza del equipo.

## Forma del proyecto

| Capa | Producto | Función |
|---|---|---|
| Libro | `book/` | Construir conceptos, métodos y criterio mediante capítulos conectados |
| Curso | Objetivos y recorrido de cada capítulo | Indicar qué aprender primero y por qué |
| Laboratorio | `book/labs/` | Practicar con tareas reales y producir evidencia comprobable |
| Paquetes de capacidad | `skills/` | Convertir métodos maduros en instrucciones de trabajo ejecutables por Codex |
| Evaluación | `docs/quality/` | Determinar si el contenido, las Skills y el aprendizaje funcionan de verdad |
| Normas de organización | `docs/governance/` | Gestionar permisos, fuentes, versiones, actualizaciones y contribuciones |

## Cómo decide el sistema que alguien ha aprendido

El estudiante no puede limitarse a entregar un resultado que parezca terminado.
Cada capacidad importante necesita evidencia de explicación, de operación, de
criterio y de revisión; cada Skill necesita activación, límites, fallos,
fuentes y una comprobación de contexto fresco. El número de directorios o de
instalaciones no demuestra dominio.

## Estado actual

El proyecto se encuentra en la fase de base de producto v0.1: se ha completado
la auditoría a nivel de catálogo de seis fuentes de entrada, y ya existen una
estructura de 22 capítulos, 17 experimentos, investigación de problemas
reales, 7 Skills candidatas y 40 fixtures de evaluación. El texto principal
del libro se está desarrollando actualmente en chino simplificado; la página
pública de presentación tiene el inglés como idioma predeterminado y ofrece
un cambio al chino. Los capítulos 19–22, todas las Skills candidatas y las
evaluaciones de modelos y flujos de trabajo todavía necesitan una prueba
previa con contexto fresco y registros de ejecución. Los materiales externos
no entran en la ruta principal sin revisar antes su fuente, licencia y
contenido.

Los identificadores de estado `candidate`, `draft` y `not_run` se mantienen
sin traducir para que sigan siendo inequívocos en los archivos y validadores.
No deben interpretarse como `verified` ni como `production-ready`: describen
el estado declarado de trabajo, no una garantía de funcionamiento, calidad de
traducción o verificación en navegador.

## Límites importantes

- El contenido original de los mantenedores y las fuentes externas se
  registran por separado; la información de propiedad y gobernanza está en
  el registro de fuentes.
- Los nombres de modelos, precios, puntos de entrada, cuotas y funciones
  concretas son hechos volátiles: deben incluir una fuente autorizada, la
  fecha de acceso, el alcance y la próxima revisión.
- «GPT-5.6 Luna ofrece la mejor relación calidad-precio» es actualmente una
  hipótesis de producto que requiere una evaluación reproducible; no es una
  conclusión permanente.
- No se incorpora directamente a la distribución ningún material cuyo
  permiso o licencia no esté claro.
- Aprender a usar Codex no significa instalar muchas Skills; significa
  producir resultados estables y verificables dentro de límites claros.
- Este proyecto de aprendizaje y práctica es independiente. No es
  documentación oficial de OpenAI ni una página oficial del producto.

## Entradas de documentación

- [Vocabulario del dominio (migración ES en curso; fuente actual)](CONTEXT.md)
- [Carta del producto (migración ES en curso; fuente actual)](docs/charter.md)
- [Arquitectura del libro (migración ES en curso; fuente actual)](docs/book-architecture.md)
- [Modelo de aprendizaje (migración ES en curso; fuente actual)](docs/learning-model.md)
- [Registro de fuentes y licencias (migración ES en curso; fuente actual)](docs/sources/asset-register.md)
- [Ciclo de vida y revisión del contenido (migración ES en curso; fuente actual)](docs/governance/content-lifecycle.md)
- [Fuente del estado actual (migración ES en curso; fuente actual)](docs/governance/content-status.yaml)
- [Revisión del estado actual (migración ES en curso; fuente actual)](docs/quality/current-state-review-2026-08-09.md)
- [Estándar de calidad de Skills (migración ES en curso; fuente actual)](docs/quality/skill-quality-standard.md)
- [Marco de evaluación de aprendizaje y ejecución (migración ES en curso; fuente actual)](docs/quality/evaluation-framework.md)
- [Conjunto de tareas de evaluación v1 (migración ES en curso; fuente actual)](evals/task-set-v1.yaml)
- [Investigación de problemas reales (migración ES en curso; fuente actual)](docs/research/field-problems-codex.md)
- [Índice del libro en español](book/table-of-contents-ES.md)
- [Prefacio en español](book/preface-ES.md)
- [Guía de lectura del libro en español](book/README-ES.md)
- [Codex Coach (migración ES en curso; fuente actual)](skills/prysai-codex-coach/SKILL.md)
- [Catálogo de Skills externas candidatas (migración ES en curso; fuente actual)](docs/sources/skill-candidate-catalog.md)
- [Página pública de presentación (migración ES en curso; fuente actual)](site/README.md)

Los destinos marcados como «migración ES en curso» son rutas locales
compartidas que todavía no tienen una variante `-ES`; se enlazan aquí de forma
explícita para que el lector no confunda la fuente actual con una traducción
terminada. Las páginas españolas existentes enlazan primero con sus destinos
`-ES`.

## Nota sobre el nombre

El nombre externo previsto actualmente es `Prysai LLM Playbook — From First
Task to Reliable Work`, con el nombre chino «Prysai 大模型实战手册：从第一个任务到可靠交付». La ruta del
repositorio de GitHub conserva por ahora su slug actual; el nombre de los
metadatos del repositorio y la migración de enlaces antiguos se tratarán
cuando se confirme el nombre definitivo. La organización propietaria, la
responsabilidad de mantenimiento y las puertas de publicación están
registradas en los documentos de gobernanza y fuentes, no en el título del
producto.
