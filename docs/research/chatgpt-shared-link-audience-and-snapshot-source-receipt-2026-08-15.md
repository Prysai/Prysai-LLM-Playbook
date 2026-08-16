# Before sharing a ChatGPT conversation: audience and snapshot receipt

**Accessed:** 2026-08-15 (America/Los_Angeles)
**Status:** candidate research record / `not_run`
**Owner:** research-systems-maintainer
**Next review:** 2026-09-15, or before this record is used for a learner card,
named-product instruction, safety claim, or evaluation criterion.

## Research question

What small, first-time-user check can prevent a ChatGPT conversation from
being shared with a broader audience or a larger conversation scope than the
sender intended?

This record is limited to the documented ChatGPT shared-link surface. It does
not compare sharing controls across products, diagnose a user incident, or
recommend an account, privacy, or organization configuration.

## Existing-material check and narrow delta

The existing `docs/research/` records already cover broad data minimization,
action authority, citation checks, source selection, and external
instruction-like content. A search of that directory found no source receipt
for ChatGPT conversation shared links, their snapshot scope, link audience,
or the boundary between invalidating a link and recalling a viewer's imported
copy.

The narrow remaining gap is therefore not a general privacy lesson. It is a
pre-share decision: identify what the particular shared-link control exposes,
who can access a URL, and whether invalidating that URL would undo every copy.
This is a candidate teaching boundary, not a statement that a first-time user
will make this mistake or that it is frequent.

## Evidence classes

| Class | Meaning here | Does not establish |
| --- | --- | --- |
| `official fact` | The ChatGPT Help Center describes the shared-link surface at the cited URL. | Behavior in another OpenAI surface or another product, a policy guarantee, or an outcome. |
| `public user report` | One author made a dated request on the OpenAI Developer Community. | Prevalence, root cause, current behavior, or a verified remedy. |
| `project inference` | A deliberately limited pre-share check derived from the documented boundaries. | That a learner applies it, that it prevents disclosure, or that it is sufficient for a consequential decision. |
| `not_run` | No account action, shared-link creation, link opening, deletion, learner session, or independent review was performed. | A reproduction, product result, safety result, or learner outcome. |

## Direct evidence

### 1. A shared link is a URL-accessible snapshot, not a named-recipient permission

OpenAI's ChatGPT Shared Links FAQ says that a link created from the sidebar or
top-of-chat share control contains the conversation up to the point of sharing.
The FAQ separately says that a share action on an individual assistant response
is scoped to that response. It also says that anyone with access to a shared
link can view the linked conversation, that granular permissions and expiration
dates are not currently offered, and that the sender should not share sensitive
content [O1].

For this source only, the relevant first-user distinction is between selecting
a full conversation snapshot and selecting an individual response, then between
giving a URL to a person and relying on a named-recipient access control. The
source does not establish whether a particular recipient will forward, view, or
import a link.

### 2. Invalidating the link is not described as recalling an imported copy

The same FAQ says that deleting the original conversation or deleting a shared
link makes the conversation unavailable through that shared link. It also says
that a viewer who imported the conversation into their own chat history can
retain that imported copy after the sender deletes the link [O1].

This supports a narrow stopping boundary: do not describe link deletion as a
general recall mechanism. It does not establish how any particular recipient
used a link, whether an import occurred, or whether another data-retention
control applies.

### 3. The two dated forum signals describe scope and inventory concerns, not product facts

On 2024-12-09, one OpenAI Developer Community author requested an open-ended
sharing mode because they described the existing link type as not showing later
messages [U1]. On 2025-01-18, the same author requested a visual indicator and
filter for chats with sharing links [U2].

These are individual feature requests. They are useful only as dated signals
that a sender may need to distinguish a snapshot from an ongoing conversation
and keep track of which chats have links. They do not prove current product
behavior, a problem rate, a first-time-user experience, or a missing feature.

## Project inference: a pre-share audience and scope receipt

Before creating or copying a ChatGPT shared link, a future low-risk teaching
artifact could ask the sender to record only:

```text
item selected: full conversation snapshot | individual assistant response
intended audience: people who receive the URL, not a named-access group
visible scope checked: yes | no | unknown
sensitive or unnecessary detail present: no | yes | unknown
link-control boundary: deletion can remove access through this URL; imported
  viewer copies are outside that link control
stop: do not create the link when the needed control is named-recipient access,
  granular permission, expiry, or recall of a received copy
```

This is an original, decision-only schema. It does not ask a learner to create
a link, expose real material, inspect another person's chat, or use a specific
alternative sharing tool. If a field is `unknown`, the safe result is to stop
before sharing and obtain an authorized, separately scoped method.

## Smallest safe teaching implication

If this record is later admitted into reader-facing material, use a fictional
conversation with no personal, confidential, or real work information. The
exercise can ask a learner to decide whether a full snapshot, one response, or
no shared link is appropriate under a fictional requirement. Its only
inspectable artifact would be the completed fictional receipt and a stated stop
reason. No live ChatGPT action, account setting, link, recipient, external
message, or outcome claim is required.

## Explicit non-claims

This source receipt does **not** establish that:

- sharing links are publicly indexed, searchable, anonymous, private, safe, or
  appropriate for a particular kind of information;
- a named person, team, or organization cannot obtain access by any other
  product path;
- deleting a shared link removes screenshots, copied text, imports, downloads,
  or any recipient-held material beyond the FAQ's stated imported-copy boundary;
- the 2024 and 2025 forum posts describe an ongoing defect, a current feature
  set, a common failure, or any user's actual disclosure;
- this proposed receipt prevents unintended sharing, satisfies a privacy,
  legal, security, or records-retention requirement, or replaces organizational
  review;
- a learner, model, workflow, or team can use the receipt successfully; or
- this record supplies a product run, account check, user study, security
  assessment, learner observation, release decision, or production-readiness
  evidence.

## Source ledger and reuse boundary

| ID | Evidence class | Original source | Accessed | Scoped support and limit |
| --- | --- | --- | --- | --- |
| O1 | official fact | [OpenAI Help Center: ChatGPT Shared Links FAQ](https://help.openai.com/en/articles/7925741-chatgpt-shared-links-faq) | 2026-08-15 | Documents one current ChatGPT shared-link surface, including snapshot scope, URL access, missing granular permissions and expiry, deletion behavior, and the imported-copy limit. It is volatile and does not establish behavior elsewhere. |
| U1 | public user report | [OpenAI Developer Community: open-ended sharing links](https://community.openai.com/t/open-ended-sharing-links-in-addition-to-the-existing-sharing-link-type/1048533) — posted 2024-12-09 | 2026-08-15 | One author requested later messages be visible to people with a link. It is an individual feature request, not official product documentation or evidence of prevalence. |
| U2 | public user report | [OpenAI Developer Community: identify chats with sharing links](https://community.openai.com/t/filter-by-and-visually-indicate-which-chats-have-sharing-links/1094618) — posted 2025-01-18 | 2026-08-15 | One author requested an indicator and filter for chats with links. It is an individual feature request, not evidence of a current control or user outcome. |

This receipt and its decision schema are original Prysai Lab wording. They
link to the official page and public forum threads without copying source prose,
screenshots, product assets, account data, links created by a user, prompts,
credentials, or configuration. The sources remain reference-only under their
respective owners' terms; this record makes no license grant or permission to
reuse their expressive content. It adds no external asset or product dependency
to the Playbook.

## Review trigger

Review this record before asserting a shared-link control, teaching a named
product step, using it in a privacy or security claim, or adding a live
exercise. Recheck O1 when OpenAI changes shared-link scope, access, management,
expiration, or deletion wording. Keep U1 and U2 dated user reports rather than
evergreen product evidence.
