# ADR-0048: Verify the public Docs host after artifact publication

## Status

Accepted

## Context

The Pages workflow builds one bounded artifact, publishes that artifact over
the restricted Docs deployment channel, and can finish successfully when the
web server or an intermediary cache is still serving an older release. A
successful SSH command proves that the host accepted the bytes; it does not
prove that the public URL serves those same bytes. This gap is especially
visible in generated discovery files such as `sitemap.xml`, where a stale file
can make a newly published language route undiscoverable.

## Decision

After the atomic Docs publish, the protected deployment job runs a trusted
copy of `scripts/check_deployed_site.py` against the public
`https://docs.prysai.com/llm-playbook/` base URL. The check compares the
generated root, discovery files, all static locale entry pages, and every
versioned Reader/homepage asset with the downloaded artifact. The verifier is
packaged by the read-only build job as a separate, non-public artifact; the
secret-bearing deployment job does not check out repository source or rebuild
the site. Running publish and verification sequentially in one protected job
avoids cross-workflow concurrency races. A bounded retry window and build-SHA
query parameter reduce false negatives from normal propagation and cache
delay. A persistent HTTP error or byte mismatch fails the deployment workflow.

The check reports deployment-integrity evidence only. It does not establish
translation quality, learning outcomes, uptime, or release readiness.

## Alternatives considered

### Trust the SSH publish result

Rejected: it checks the host-side handoff, not the public response.

### Compare only a visible HTML marker

Rejected: a marker can remain unchanged while a sitemap, locale entry, or
Reader asset is stale.

### Poll indefinitely

Rejected: an unbounded workflow would hide an outage and consume runner time.

## Consequences

- A deployment can now fail when the public host does not match its artifact.
- The check adds a bounded propagation wait (at most three minutes with the
  current defaults) after publication.
- The versioned public-asset list must be kept in step with the artifact
  contract.
- Public verification remains separate from the quality workflow and from
  evidence about whether the course teaches effectively.
