# docs-boilerplate

Template for spinning up a new isolated docs environment (Starlight + Cloudflare Pages + Decap CMS).

## Spinning up a new env

### 1. Clone this repo

```bash
git clone https://github.com/your-org/docs-boilerplate new-env-docs
cd new-env-docs
```

### 2. Find and replace ENV_NAME

Replace every instance of `ENV_NAME` with your env name (e.g. `holmgren`):

```bash
# macOS / Linux
grep -rl 'ENV_NAME' . --exclude-dir=node_modules --exclude-dir=.git \
  | xargs sed -i '' 's/ENV_NAME/holmgren/g'
```

Files that contain `ENV_NAME`:
- `astro.config.mjs` — site title, URL, GitHub repo name
- `src/assets/logo.svg` — logo text label
- `public/admin/config.yml` — Decap CMS repo + site URL
- `.github/workflows/deploy.yml` — Cloudflare Pages project name
- `package.json` — package name
- `src/content/docs/dev/global/index.md` — welcome text
- `src/content/docs/team/global/index.md` — welcome text
- `src/content/docs/index.mdx` — homepage

### 3. Install dependencies

```bash
npm install
```

### 4. Add your logo

Replace `src/assets/logo.svg` with your actual logo file.
Replace `public/favicon.svg` with your actual favicon.

### 5. Push to GitHub

```bash
git remote set-url origin https://github.com/your-org/holmgren-docs
git push -u origin main
```

### 6. Commit the lock file

The boilerplate gitignores `package-lock.json` but deployed projects need it for CI:

```bash
# Remove this line from .gitignore:
# package-lock.json
git add package-lock.json .gitignore
git commit -m "Track package-lock.json for CI"
git push
```

### 7. Create Cloudflare Pages project

**Do not** use the Git integration — deploy via GitHub Actions instead:

1. Cloudflare dashboard → Workers & Pages → Create → **Pages** → **Direct Upload**
2. Name it exactly `your-env-docs` (must match `wrangler.toml` and `deploy.yml`)
3. Upload any placeholder file to complete creation

### 8. Create a Cloudflare API token

One token per Cloudflare account covers all projects in that account:

1. Cloudflare → **My Profile → API Tokens → Create Token → Custom token**
2. Name: `your-env-docs deploy`
3. Permission: `Cloudflare Pages — Edit` (Account level) — nothing else
4. Save and copy the token

### 9. Add secrets to GitHub repo

**Settings → Secrets and variables → Actions → New repository secret:**

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | token from step 8 |
| `CLOUDFLARE_ACCOUNT_ID` | visible in Cloudflare dashboard URL: `dash.cloudflare.com/ACCOUNT_ID/...` |

### 10. Test the deploy

GitHub → **Actions → Deploy to Cloudflare Pages → Run workflow**

### 11. Custom domain (optional)

1. Cloudflare Pages project → **Custom domains** → add `docs.yourproject.com`
2. Copy the CNAME record Cloudflare shows you
3. Add it at your DNS provider (`docs` → `your-env-docs.pages.dev`)

### 12. Set up Decap CMS OAuth

Decap CMS needs a GitHub OAuth app to handle editor login.

1. **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**

| Field | Value |
|---|---|
| Application name | `ENV_NAME Docs CMS` |
| Homepage URL | `https://ENV_NAME-docs.pages.dev` |
| Authorization callback URL | `https://ENV_NAME-docs.pages.dev/api/callback` |

2. Add secrets to **Cloudflare Pages → Settings → Variables and secrets** (type: Secret, name typed manually — no copy-paste to avoid invisible characters):

| Secret | Value |
|---|---|
| `GITHUB_CLIENT_ID` | Client ID from the OAuth app |
| `GITHUB_CLIENT_SECRET` | Client Secret from the OAuth app |

3. The OAuth proxy is already in `functions/api/` — no extra setup needed.

### 13. Set up Cloudflare Zero Trust (access control)

1. Cloudflare → Zero Trust → Access → Applications
2. Add application → select the Pages project
3. Policy: allow GitHub login, restrict to your team's GitHub accounts or org

### 14. Add service repos

For each service repo that should sync dev docs into this env:

1. Copy `.github/workflows/sync-from-service-repo.yml` into the service repo
2. Update `destination-repository-name` and `target-directory` for that repo
3. Add a `DOCS_REPO_TOKEN` secret to the service repo (GitHub PAT with write access to this docs repo)
4. Add the repo's folder to `astro.config.mjs` sidebar and `public/admin/config.yml`

---

## Adding a new repo to an existing env

1. Add sidebar entry in `astro.config.mjs`:
```js
{ label: 'Repo A', autogenerate: { directory: 'dev/repo-a' } }
```

2. Add CMS collection in `public/admin/config.yml` (for team docs):
```yaml
- name: team-repo-a
  label: "Team docs — Repo A"
  folder: src/content/team/repo-a
  ...
```

3. Add sync workflow to the service repo (copy `sync-from-service-repo.yml`, update paths)

---

## Local development

```bash
npm run dev       # start dev server at localhost:4321
npm run build     # build for production
npm run preview   # preview production build locally
```

Decap CMS admin is available at `localhost:4321/admin` in local dev
(requires GitHub OAuth app for local auth — see Decap docs).
