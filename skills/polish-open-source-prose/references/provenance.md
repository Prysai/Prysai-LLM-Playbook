# Text provenance, SynthID, and author identity

Use this guidance when a user asks whether prose can be made “not AI,” whether a
watermark can carry an identity, or how to prove that a public artifact came from a
particular GitHub account.

## Separate three different goals

| Goal | Appropriate method | What it does not prove |
| --- | --- | --- |
| Improve clarity and voice | Editorial revision with semantic checks | Whether a human or model wrote the text |
| Mark model output | A generation-time watermark such as SynthID Text | The real-world identity of the author |
| Prove control of an identity | A cryptographic signature or attestation | That no AI assisted the writing |

Do not collapse these goals into one detector score or “humanized” label.

## What SynthID Text can do

SynthID Text modifies token probabilities while a language model is generating text,
then detects the resulting statistical signal. It is applied during sampling rather
than as a normal post-processing edit.

The public reference implementation accepts watermark keys and requires a detector
trained for the chosen configuration. The key selects a watermarking scheme; it is not
an arbitrary text payload. A GitHub username therefore cannot simply be embedded and
read back as metadata.

Important limits:

- ordinary prose editing does not add a valid SynthID watermark after generation;
- quality-oriented editing is separate from watermark insertion or detection;
- translation or substantial rewriting can reduce detector confidence;
- factual or highly constrained outputs provide less room for a statistical signal;
- the public reference hash is not a cryptographic proof of identity;
- a public username-derived key could be copied and spoofed.

Treat a custom per-author SynthID configuration as an experimental marker, never as an
authentication system.

Primary references:

- [Google DeepMind: SynthID](https://deepmind.google/models/synthid/)
- [Nature: Scalable watermarking for identifying large language model outputs](https://www.nature.com/articles/s41586-024-08025-4)
- [Google DeepMind SynthID Text reference implementation](https://github.com/google-deepmind/synthid-text)
- [Hugging Face: SynthID Text](https://huggingface.co/blog/synthid-text)
- [Hugging Face generation utilities](https://huggingface.co/docs/transformers/internal/generation_utils)

## Recommended GitHub authorship path

### Repository files and technical articles

Put the canonical Markdown or source file in a repository and sign the commit or tag
with an SSH, GPG, or S/MIME key connected to the author's GitHub account. GitHub can
then display a `Verified` signature status.

GitHub's verification applies to signed commits and tags:

- [About commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)
- [Signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)

This proves that the signing key approved a specific repository state. It does not
prove that the prose was written without tools or collaborators.

### Standalone files

For a file distributed outside Git, publish a detached signature or Sigstore bundle
next to the file. `cosign sign-blob` can sign a normal file and record the signature,
certificate, and transparency-log evidence in a bundle:

- [Sigstore: Signing Blobs](https://docs.sigstore.dev/cosign/signing/signing_with_blobs/)

Keep the signed file byte-for-byte stable. Any edit produces a new digest and requires
a new signature.

### Issue and pull-request comments

Do not describe an invisible text watermark as proof that a comment belongs to a
GitHub username. For a statement that needs durable authorship evidence, publish the
canonical text in a signed commit or signed file and link it from the comment. The
comment remains the discussion surface; the signed artifact is the evidence.

## If prototyping a keyed text watermark

Keep the prototype outside this prose-editing skill. Use an open model that exposes
generation logits, a documented SynthID-compatible processor, a secret per-author
watermark key, and a registry that maps a key identifier to an account. Train and
evaluate a detector for each supported configuration.

Report it honestly:

- it is a probabilistic marker, not a username payload;
- it is not proof of legal authorship or exclusive control;
- it can weaken after edits, translation, or copying;
- false-positive and false-negative rates must be measured by language and genre;
- the secret key must never be derived only from a public username;
- a cryptographic signature should still protect the registry and canonical artifact.

## Editorial response

When asked to “remove AI”:

1. Ask what concrete quality problem matters: vagueness, hype, repetitive rhythm,
   wrong locale, or loss of author voice.
2. Edit that problem while preserving facts and protected content.
3. Do not optimize against a detector or promise that a watermark is gone.
4. If the real goal is attribution, recommend a signed canonical artifact.
