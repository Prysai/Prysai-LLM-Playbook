# Deployed six-locale entry smoke — 2026-08-17

**Status:** scoped production-browser observation  
**Artifact status:** candidate  
**Environment:** `https://docs.prysai.com/llm-playbook/`; in-app Chromium; no
account interaction and no credential, cookie, storage, or history inspection

## Question

Can a reader open the public front door in each supported UI locale and reach
the first three course entries without an obvious locale-routing failure or a
page-script error?

## Observed run

On 2026-08-17, fresh production URLs with `?lang=en`, `zh`, `es`, `ja`, `ko`,
and `de` were loaded. For every URL, the observation recorded the document
language, title, visible H1, the three hero reading-route destinations, and
the page's exposed error collection.

| Check | Result | Observation |
| --- | --- | --- |
| English entry | passed | English document language, English title/H1, and EN Chapter 0–2 destinations loaded without exposed page errors. |
| Simplified Chinese entry | passed | `zh-CN` document language, Chinese title/H1, and ZH Chapter 0–2 destinations loaded without exposed page errors. The Chapter 0 link opened the Chinese reader document. |
| Spanish entry | passed | Spanish document language, Spanish title/H1, and ES Chapter 0–2 destinations loaded without exposed page errors. |
| Japanese entry | passed | Japanese document language, Japanese title/H1, and JA Chapter 0–2 destinations loaded without exposed page errors. |
| Korean entry | passed | Korean document language, Korean title/H1, and KO Chapter 0–2 destinations loaded without exposed page errors. |
| German entry | passed | German document language, German title/H1, and DE Chapter 0–2 destinations loaded without exposed page errors. |
| First visible action | passed | On English, “Choose what you want to do today” reached the start section and rendered six goal choices: language practice, work update, research check, interview rehearsal, task contract, and Codex entry. |
| Desktop visual check | passed | The production first viewport presents the title, two labeled choices, a numbered reading route, and a five-minute example without observed overlap or unstyled asset failure. |

The hero links resolve under the deployed `/llm-playbook/site/reader.html`
base. This is the published artifact layout and not a broken extra directory.

## What this does not show

- It does not establish native-language quality, accessibility, small-screen
  behavior, all internal links, search relevance, or cross-browser behavior.
- It does not establish that translated course content is independently
  reviewed. Non-English course material remains candidate translation content
  pending that review.
- It does not measure whether readers understand the route, complete an
  exercise, retain the method, or obtain a useful outcome. The learner studies
  required by Q-013 remain open.
- It does not change the draft/not-run learner status of the Labs, evaluation
  evidence status, or operational release readiness.

## Recheck trigger

Repeat this smoke after changing the homepage, locale routing, reader routing,
generated locale manifest, deployed asset fingerprinting, or production
deployment configuration. Use the controlled first-reader and newcomer
protocols for any claim about activation or learning.
