# Developer Certificate of Origin

Prysai uses the Developer Certificate of Origin, version 1.1, for project-owned
contributions. The canonical DCO text is maintained at
<https://developercertificate.org/>. This project does not copy or modify that
text, and this file is not legal advice.

For pull requests created on or after the repository contract rollout, adding
the following trailer to every commit makes the certification described by the
DCO:

```text
Signed-off-by: Full Name <email@example.com>
```

Use `git commit -s` when creating or amending a commit. The repository's
`pull-request-contract` check reads every commit in new pull requests and
fails when a commit has no valid sign-off. A checked box in the pull request
body is not evidence by itself. Pull requests opened before the one-time
contract rollout cutoff (`2026-08-31T00:14:52Z`, when PR #66 was merged) use a
limited migration path that requires GitHub to report a valid cryptographic
signature on every commit; that exception does not certify or rewrite their
historical DCO trailers or commit messages.

The DCO sign-off is separate from a verified GitHub commit signature. A verified
SSH, GPG, or S/MIME signature proves control of a signing key; it does not
replace the DCO declaration. The DCO is also separate from a CLA and does not
transfer the contributor's copyright or grant trademark rights.

The contributor remains responsible for having the right to submit the work,
disclosing third-party restrictions, and following the repository's applicable
CC BY 4.0 content or Apache-2.0 code boundary.
