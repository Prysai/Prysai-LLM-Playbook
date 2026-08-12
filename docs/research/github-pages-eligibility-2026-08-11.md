# GitHub Pages eligibility and Actions deployment

**Access date:** 2026-08-11  
**Scope:** Live checks for `Prysai/Codex-Field-Guide` report a private repository owned by the `Prysai` organization. The organization API reports a Free plan, and the Pages creation API rejected the repository with `Your current plan does not support GitHub Pages for this repository.`  
**Evidence class:** Official GitHub documentation plus the user-provided API result.  
**Status:** Verified against the cited documentation; repository deployment status is not verified.  
**Owner / next review:** Repository maintainer / re-check after any account-plan, repository-owner, visibility, or GitHub Pages policy change.

## Claims and evidence

1. GitHub’s current Pages documentation says Pages is available in public repositories on GitHub Free and in public and private repositories on GitHub Pro, Team, Enterprise Cloud, and Enterprise Server. That general plan table does not override the live organization-level response for this repository. [1]
2. GitHub’s plan overview also lists GitHub Pages among GitHub Pro’s private-repository features. However, it separately says that publishing a Pages site *privately* requires an organization account using GitHub Enterprise Cloud. Therefore, “private source repository” does not mean “private website”: a Pages site is publicly available on the internet even when its source repository is private. [2][3]
3. GitHub documents two Pages publishing paths: branch-based publishing, or a custom GitHub Actions workflow. For the Actions path, the documented flow checks out the repository, builds static files if needed, uploads a Pages artifact, and deploys it with `actions/deploy-pages`. The deploy job needs `pages: write` and `id-token: write`, and the workflow uses the `github-pages` environment. [3][4]
4. The live API response is repository/account-specific evidence that the attempted operation was rejected. The REST API documentation describes the Pages endpoints, required repository permissions, and possible responses, but does not establish why this particular organization/repository produced that plan-support message. A workflow file or token permission cannot be treated as proof that the Pages entitlement exists. [5]

## Evidence boundary

This record does not claim that the site is deployed or that a published URL exists. It records read-only API checks performed on 2026-08-11: repository visibility/owner metadata, organization plan metadata, the Pages creation response, and a failed workflow run at `actions/configure-pages`. The API result establishes the current rejection, but not whether GitHub Support, an account change, repository visibility change, or a different owner would resolve it. The plan and Pages statements are documentation claims as accessed on 2026-08-11.

## Practical options

- **If the repository should remain private,** first resolve the organization entitlement with GitHub settings or Support. The existing Actions workflow is ready for the documented Pages path, but a workflow cannot grant Pages eligibility. [3][4]
- **If the project can be public,** GitHub Free documents Pages for public repositories. Changing visibility would expose the source and requires an explicit decision; it is not an implementation detail. [1][2]
- **If the website itself must remain private,** GitHub’s documentation points to an organization on GitHub Enterprise Cloud as the requirement for private Pages publishing. That is a plan/account-structure decision, not something an Actions workflow can grant. [2]
- **If the API continues to reject the repository despite the documented facts,** use GitHub Support or the repository/account settings to resolve the entitlement before changing visibility or transferring ownership. Making the repository public would change the source-code privacy boundary and should be considered only after an explicit review; GitHub Free documents Pages for public repositories. [1][2]
- **If GitHub Pages is not the required host,** keep the repository private and evaluate a separate static-hosting provider. That alternative is outside this report’s official-GitHub-only source boundary and requires separate provider-specific research.

## Official sources

1. GitHub Docs, [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) — Pages availability by repository visibility and plan; site types.
2. GitHub Docs, [GitHub’s plans](https://docs.github.com/en/get-started/learning-about-github/githubs-plans) — GitHub Pro feature list and the Enterprise Cloud requirement for privately published Pages sites.
3. GitHub Docs, [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) — branch and Actions publishing; public-site warning for private source repositories.
4. GitHub Docs, [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) — `configure-pages`, `upload-pages-artifact`, `deploy-pages`, permissions, artifact, and environment requirements.
5. GitHub Docs, [REST API endpoints for GitHub Pages](https://docs.github.com/en/rest/pages/pages) — Pages endpoint permissions, creation parameters, and documented response codes.
