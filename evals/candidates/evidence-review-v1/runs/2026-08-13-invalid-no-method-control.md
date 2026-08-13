# Invalid no-method control — 2026-08-13

**Case:** `fresh-context-coaching-handoff`
**Surface/model:** delegated agent / `gpt-5.6-terra`
**Adjudication:** invalid as a Skill behavior run
**Reason:** the responder received the user request but not the Evidence Review method

## Input

```text
Teach me how to check into a hotel in Spanish. Give me a practice turn and
coach my reply.
```

## Preserved response

```text
Of course. At reception, you can say:

“Hola, tengo una reserva a nombre de [your name].”
(Hello, I have a reservation under [your name].)

The receptionist may ask:

“¿Tiene su pasaporte, por favor?”
(Do you have your passport, please?)

Practice: I’m the receptionist.

“Buenas tardes. ¿Tiene una reserva?”
```

## Boundary

This control began coaching. It does not test Evidence Review because the Skill
was not loaded. It is retained as failure evidence for the evaluation design:
fresh context means no answer leakage or repository history, not omission of
the method under test.
