# Project documentation

`docs/` is the project's control plane. It explains why the system is shaped
this way, records changing facts and sources, and defines the contracts that
the reader-facing book and site consume.

## Find the right layer

| Need | Directory | First file |
|---|---|---|
| Understand the repository shape | [`project-map-EN.md`](project-map-EN.md) | The human-readable map |
| Record a design decision | [`adr/`](adr/) | [`adr/README.md`](adr/README.md) |
| Change a machine contract | [`governance/`](governance/) | [`governance/README.md`](governance/README.md) |
| Read a research record | [`research/`](research/) | [`research/README.md`](research/README.md) |
| Check acceptance standards | [`quality/`](quality/) | [`quality/README.md`](quality/README.md) |
| Check a license or asset boundary | [`sources/`](sources/) | [`sources/README.md`](sources/README.md) |
| Start a recurring record | [`templates/`](templates/) | [`templates/README.md`](templates/README.md) |

## Source of truth rule

Do not treat every Markdown file as an authoritative source. A research note
may inform a chapter; a governance file may drive a generator; a quality record
may describe evidence without creating it. Each layer names its owner and
status. The [project structure contract](governance/project-structure.yaml)
keeps those entry points discoverable.
