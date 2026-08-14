# Examples and sandboxes

`examples/` contains disposable, low-risk cases that make a method inspectable.
Examples are not production integrations and do not carry real customer data,
credentials, live inventory, or external write permissions.

## Start here

- [`lab-001-v1/`](lab-001-v1/) for the First Safe Change fixture: one seeded
  README mistake, one permitted local edit, and one standard-library checker.
- [`skill-sandbox/`](skill-sandbox/) for one-time local experiments.
- [`lab-008-v1/`](lab-008-v1/) for the frozen offline research fixture with a
  rejected overclaim and a bounded correction.
- [`lab-013-v1/`](lab-013-v1/) for the frozen deterministic CP0–CP4 reference
  fixture with a preserved failure and bounded recovery.
- [`universal-seam-v1/`](universal-seam-v1/) for four fictional, offline
  request/target/receipt/round-trip checks before a reader chooses a
  platform-specific adapter.
- [`skill-sandbox/product-context-real-estate/`](skill-sandbox/product-context-real-estate/)
  for the current fictional Product Context case.
- [Related case evidence](../assets/cases/README.md)

Each example should state its inputs, intended output, run conditions, failure
or boundary case, and what the resulting artifact cannot prove. The source and
license boundary is recorded in the [asset register](../docs/sources/asset-register.md).
