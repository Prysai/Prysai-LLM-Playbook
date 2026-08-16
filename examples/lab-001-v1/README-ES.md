# Lab 001 v1 — Fixture del primer cambio seguro

Este fixture sintético pequeño acompaña al [Lab 001](../../book/labs/lab-001-first-safe-task-ES.md). No contiene proyecto real, historial Git, credenciales, red, instalación, cuenta, llamada al modelo ni efecto externo.

## Qué cambiarás

Copia **todo** este directorio en un lugar desechable. En la copia, revisa `seed/README.md` y modifica solo ese archivo. No edites `verify_readme.py` ni `expected/acceptance.json`.

El contrato de aceptación muestra la corrección: el comando de vista previa debe indicar el puerto `8080` y el README debe nombrar la URL local. Compara evidencia local fija; no adivines a partir de una respuesta de modelo.

## Cómo hacerlo

Abre en paralelo `seed/README.md` y `expected/acceptance.json` dentro de la copia.

1. Observa que faltan el puerto y la URL local.
2. Haz la única corrección permitida del README.
3. Confirma todos los `required_readme_strings`: comprobación manual `3/3`.

Si Python 3 ya está disponible, puedes ejecutar `python .\seed\verify_readme.py`. Al inicio debe aparecer `FIRST_SAFE_CHANGE_FAILED`; después, `FIRST_SAFE_CHANGE_OK`. No instales Python solo por esta señal.

## Tarjeta acotada

```text
Objetivo: Corregir las instrucciones de vista previa en seed/README.md.
Leer primero: seed/README.md y expected/acceptance.json.
Edición permitida: solo seed/README.md, después de mostrar un plan.
No: editar verificador o aceptación; instalar; usar red; leer secretos; commit, push o publicación.
Recibo: línea base, plan, diff exacto, segundo resultado y lista no verificada.
Parada: falta la copia local, el destino o la fuente de aceptación.
```

Un aprobado solo cubre este verificador sintético fijo; no prueba finalización, conducta de modelo, un comando real ni transferencia.
