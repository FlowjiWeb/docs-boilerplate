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

### 6. Connect to Cloudflare Pages

1. Cloudflare dashboard → Pages → Create application
2. Connect to GitHub → select `holmgren-docs`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

### 7. Add secrets to GitHub repo

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare → right sidebar on any page |

### 8. Set up Cloudflare Zero Trust (access control)

1. Cloudflare → Zero Trust → Access → Applications
2. Add application → select the Pages project
3. Policy: allow GitHub login, restrict to your team's GitHub accounts or org

### 9. Add service repos

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
