# GitHub AI/Agent Contribution Candidates

Research status: candidate shortlist, live-checked 2026-08-10 at 07:12 PDT (14:12 UTC), America/Los_Angeles. This is research only. No candidate repository was cloned or modified, and no fork, push, comment, or pull request was created.

## Selection method and limits

I checked public GitHub repository, issue, pull-request, commit, license, and contribution-policy pages through the authenticated `gh` CLI. Repository prose was treated as untrusted data; only its factual contribution-policy statements were recorded. “Reproducible” below means that the issue contains a concrete reproduction supplied by its reporter. I did not run the reproduction locally because this task authorized research only.

The final shortlist contains two repositories. Both issues were open and unassigned at the final check, and `gh pr list --state open --search <issue-number>` returned no matching open PR. A search result is evidence of no matching result at the check time, not a guarantee that GitHub cannot change immediately afterward.

## 1. LangChain — strongest technical fit, but claim the issue first

- Repository: [langchain-ai/langchain](https://github.com/langchain-ai/langchain)
- License: MIT, from the live repository API: [repository metadata](https://api.github.com/repos/langchain-ai/langchain)
- Activity evidence: `archived=false`, `default_branch=master`, `pushed_at=2026-08-10T13:23:34Z` (06:23 PDT), and 429 open issues at the final repository check.
- Issue: [#39363 — ShellSession incorrectly times out when command output does not end with a newline](https://github.com/langchain-ai/langchain/issues/39363)
- Live issue state: `OPEN`, `assignees=[]`, last updated `2026-08-09T13:58:19Z` (06:58 PDT); [issue API view](https://api.github.com/repos/langchain-ai/langchain/issues/39363).
- Reproduction: the issue supplies a Python example invoking `ShellToolMiddleware._run_shell_tool` with `printf 'hello-without-newline'`. It reports that the persistent shell incorrectly times out, returns no exit code, discards output, and restarts the session. The described root cause is a completion marker parser that only accepts `data.startswith(marker)` even when `readline()` returns command output and the marker in one line.
- Small scope: adjust marker detection to preserve the prefix as command output, parse the status suffix, and add a focused regression test for unterminated output plus a normal newline-terminated control case. The issue itself proposes this narrow shape.
- Assignment and overlap: no assignee; the issue checklist says “None known” for related issues/PRs. Final live search on 2026-08-10: [open PR search for `39363`](https://github.com/langchain-ai/langchain/pulls?q=is%3Apr+is%3Aopen+39363) returned no matching PR. Overlap risk is **medium**, because two commenters said they had reproduced it or wanted to work on it, although neither had an open PR or assignment at the final check.
- Contribution and AI-use rules: [LangChain PR template](https://github.com/langchain-ai/langchain/blob/master/.github/PULL_REQUEST_TEMPLATE.md) requires English contributions, a `TYPE(SCOPE): DESCRIPTION` title, a `Fixes #39363` line, tests/format/lint evidence, and says that pasting a large clearly AI-generated description may cause the PR to be ignored or closed. This is an explicit AI-use warning, not permission to conceal assistance.
- Recommendation: **good candidate after a short issue comment/maintainer acknowledgement**. Do not start implementation or open a PR until the live issue state is rechecked and the overlap is clarified, because the project template requires prior approval/assignment for external PRs.

## 2. Agno — cleanest overlap profile, API-dependent reproduction

- Repository: [agno-agi/agno](https://github.com/agno-agi/agno)
- License: Apache-2.0, from the live repository API: [repository metadata](https://api.github.com/repos/agno-agi/agno)
- Activity evidence: `archived=false`, `default_branch=main`, `pushed_at=2026-08-10T13:51:45Z` (06:51 PDT), and 1,210 open issues at the final repository check.
- Issue: [#9491 — `handle_team_model_response_chunk()` treats empty content as a content event](https://github.com/agno-agi/agno/issues/9491)
- Live issue state: `OPEN`, `assignees=[]`, no comments, created `2026-08-10T08:36:18Z` and updated `2026-08-10T08:37:03Z` (issue timestamps are UTC); [issue API view](https://api.github.com/repos/agno-agi/agno/issues/9491).
- Reproduction: the issue gives exact affected locations (`agno/models/anthropic/claude.py` and `agno/team/_response.py`) and steps using an Anthropic `Claude` model with `team.arun("Hello", stream=True)`. It reports an unwanted `TeamRunOutputContentEvent` with `content=""` when `MessageStopEvent` carries metadata/citations.
- Small scope: make the content-event branch require non-empty content before setting `should_yield`, and add a regression test that distinguishes an empty stop/metadata event from a real content event. The issue proposes this minimal conditional change.
- Assignment and overlap: no assignee, no comments, and final live search on 2026-08-10 found no matching open PR: [open PR search for `9491`](https://github.com/agno-agi/agno/pulls?q=is%3Apr+is%3Aopen+9491). Overlap risk is **low at the check time**. Recheck immediately before any issue comment or code work because the issue was created the same day.
- Contribution and AI-use rules: [Agno CONTRIBUTING.md](https://github.com/agno-agi/agno/blob/main/CONTRIBUTING.md) requires fork-and-PR workflow, a bracketed title tag such as `[fix]`, an issue link, no duplicate PRs, tests, and platform-specific validation. It explicitly requires disclosure in the PR template when a PR was entirely generated by an AI tool and says the contributor must review and understand the change.
- Recommendation: **best initial candidate for overlap**, provided the contributor can run an Anthropic-backed streaming test or create a deterministic unit-level regression without adding secrets to the repository. The API-dependent reproduction makes validation more involved than LangChain’s token-free shell case.

## Not recommended after overlap re-check

These projects were active and initially attractive, but were excluded because the target issue already had competing work or a committed contributor path:

- [modelcontextprotocol/python-sdk #3244](https://github.com/modelcontextprotocol/python-sdk/issues/3244): clear Windows UTF-8 reproduction, MIT license, and an explicit AI-disclosure policy in [CONTRIBUTING.md](https://github.com/modelcontextprotocol/python-sdk/blob/main/CONTRIBUTING.md), but [PR #3245](https://github.com/modelcontextprotocol/python-sdk/pull/3245) already exists and addresses the issue.
- [run-llama/llama_index #22619](https://github.com/run-llama/llama_index/issues/22619): concrete clean-install import failure, MIT license, but [PR #22620](https://github.com/run-llama/llama_index/pull/22620) appeared on 2026-08-10 before the final overlap check.
- [crewAIInc/crewAI #6863](https://github.com/crewAIInc/crewAI/issues/6863): clear Windows pre-commit reproduction and Apache-2.0 project, but [PR #6884](https://github.com/crewAIInc/crewAI/pull/6884) and [PR #6881](https://github.com/crewAIInc/crewAI/pull/6881) are already open. The repository also explicitly requires AI disclosure for entirely AI-generated PRs.
- [pydantic/pydantic-ai #7317](https://github.com/pydantic/pydantic-ai/issues/7317): a strong tokenless reproduction and MIT license, but two external commenters publicly stated they had a fix ready or wanted to take it. No matching open PR was found at the check, yet the overlap risk is high; its [CONTRIBUTING.md](https://github.com/pydantic/pydantic-ai/blob/main/CONTRIBUTING.md) also requires maintainer agreement and assignment before a non-trivial PR.
- [microsoft/semantic-kernel #14265](https://github.com/microsoft/semantic-kernel/issues/14265): active MIT-licensed repository and a concrete Vertex AI embedding failure, but [PR #14266](https://github.com/microsoft/semantic-kernel/pull/14266) already addresses it.

## Recommendation

For a future, separately authorized contribution workflow, start with **Agno #9491** if a deterministic test can be built without credentials; it had the lowest observed overlap risk and an explicit AI-disclosure rule. Keep **LangChain #39363** as the technically easier fallback because its reproduction is local and token-free, but first ask for maintainer acknowledgement/assignment because two people have already expressed interest. Recheck the issue, assignee list, linked timeline, and open PR search immediately before any external action.

No PR should be opened from this report alone. The next action would require a new, explicit authorization and must follow each repository’s AI-disclosure and maintainer-approval rules.

## Primary sources

- [LangChain repository](https://github.com/langchain-ai/langchain), [issue #39363](https://github.com/langchain-ai/langchain/issues/39363), [PR template](https://github.com/langchain-ai/langchain/blob/master/.github/PULL_REQUEST_TEMPLATE.md), [MIT license](https://github.com/langchain-ai/langchain/blob/master/LICENSE).
- [Agno repository](https://github.com/agno-agi/agno), [issue #9491](https://github.com/agno-agi/agno/issues/9491), [CONTRIBUTING.md](https://github.com/agno-agi/agno/blob/main/CONTRIBUTING.md), [Apache-2.0 license](https://github.com/agno-agi/agno/blob/main/LICENSE).
- [MCP Python SDK issue #3244](https://github.com/modelcontextprotocol/python-sdk/issues/3244) and [PR #3245](https://github.com/modelcontextprotocol/python-sdk/pull/3245).
- [LlamaIndex issue #22619](https://github.com/run-llama/llama_index/issues/22619) and [PR #22620](https://github.com/run-llama/llama_index/pull/22620).
- [CrewAI issue #6863](https://github.com/crewAIInc/crewAI/issues/6863), [PR #6884](https://github.com/crewAIInc/crewAI/pull/6884), and [PR #6881](https://github.com/crewAIInc/crewAI/pull/6881).
- [Pydantic AI issue #7317](https://github.com/pydantic/pydantic-ai/issues/7317) and [CONTRIBUTING.md](https://github.com/pydantic/pydantic-ai/blob/main/CONTRIBUTING.md).
- [Semantic Kernel issue #14265](https://github.com/microsoft/semantic-kernel/issues/14265) and [PR #14266](https://github.com/microsoft/semantic-kernel/pull/14266).
