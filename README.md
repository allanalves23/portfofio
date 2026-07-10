# Portfolio - Allan Wanderley Alves

Template Freelancer - Start Bootstrap, maintained for Start Bootstrap LLC.

**Access:**
[https://allanalves23.dev](https://allanalves23.dev)

## Develop

Install dependencies

```bash
npm i
```

____

Start Local Http Server

```bash
npm start
```

Open _index.html_ file and enjoy.

## Internationalization (i18n)

The site supports **English (default)** and **Brazilian Portuguese (pt-BR)**.

- The language is auto-detected from the visitor's browser (`navigator.language`): any `pt*` locale gets pt-BR, everything else falls back to English.
- A language dropdown in the navbar shows the active language and lets you switch to the other one; the choice overrides detection and is persisted in `localStorage` under the `portfolio-lang` key. Below the `lg` breakpoint the dropdown is skipped in favor of a direct tap-to-toggle, since the navbar itself is already a collapsed menu there.
- All translatable elements in `index.html` are tagged with `data-i18n="<key>"` (or `data-i18n-placeholder` for input placeholders), and the dictionaries for both languages live in [js/i18n.js](js/i18n.js).
- To add or change text: edit the English text in `index.html`, then update the same key in **both** the `en` and `pt-BR` dictionaries in `js/i18n.js`.

## Deploy

Deployment is automated by [.github/workflows/deploy.yml](.github/workflows/deploy.yml) on every push to `master` (or manually via "Run workflow"):

1. Injects the Formspree contact-form endpoint into `index.html`, replacing the `__action__` placeholder with `${{ secrets.FORMSPREE_URL }}${{ secrets.FORMSPREE_TOKEN }}` — the source file always ships with the placeholder, never the real endpoint.
2. Builds the [Dockerfile](Dockerfile) (nginx serving the static site) and pushes it to Docker Hub as [`allanalves23/portfolio:latest`](https://hub.docker.com/r/allanalves23/portfolio).
3. Logs into Azure via OIDC (no stored client secret) and runs `az containerapp update` against the `portfolio-allan` Container App (resource group `portfolio-allan`, Brazil South), forcing a new revision with `--revision-suffix` so the `:latest` image is always re-pulled.

**Required GitHub repo secrets:**

| Secret | Purpose |
|---|---|
| `FORMSPREE_URL` / `FORMSPREE_TOKEN` | Concatenated to form the contact form's POST endpoint |
| `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN` | Docker Hub push access |
| `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_SUBSCRIPTION_ID` | OIDC federated login scoped to an app registration with Container Apps Contributor on the `portfolio-allan` resource group |

___

**Template Used:**
[https://startbootstrap.com/theme/freelancer](https://startbootstrap.com/theme/freelancer)

