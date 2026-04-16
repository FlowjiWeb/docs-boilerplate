import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// ─────────────────────────────────────────
// ENV CONFIG — update these when cloning
// ─────────────────────────────────────────
const ENV_NAME = 'ENV_NAME';           // e.g. holmgren, flowji, happybees
const GITHUB_ORG = 'your-org';
const GITHUB_REPO = `${ENV_NAME}-docs`;
const SITE_URL = `https://docs.${ENV_NAME}.com`;
// ─────────────────────────────────────────

export default defineConfig({
  site: SITE_URL,
  integrations: [
    starlight({
      title: `${ENV_NAME} docs`,
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      favicon: './public/favicon.svg',
      defaultLocale: 'en',
      locales: {
        en: { label: 'English' },
      },
      customCss: ['./src/styles/custom.css'],

      // Edit this page button — points to the correct env repo
      editLink: {
        baseUrl: `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}/edit/main/`,
      },

      // Search (built-in Pagefind — no extra config needed)
      // Enabled by default in Starlight

      // Social links in header
      social: [
        { icon: 'github', label: 'GitHub', href: `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}` },
      ],

      sidebar: [
        {
          label: 'Developer docs',
          items: [
            {
              label: 'Global',
              autogenerate: { directory: 'dev/global' },
            },
            // ── Add one block per repo synced into this env ──
            // {
            //   label: 'Repo A',
            //   autogenerate: { directory: 'dev/repo-a' },
            // },
          ],
        },
        {
          label: 'Team docs',
          items: [
            {
              label: 'Global',
              autogenerate: { directory: 'team/global' },
            },
            // ── Add one block per repo ──
            // {
            //   label: 'Repo A',
            //   autogenerate: { directory: 'team/repo-a' },
            // },
          ],
        },
      ],

      // Versioning — add new versions here as the project grows
      // Each version maps to a base path
      // See: https://starlight.astro.build/guides/sidebar/
      // Uncomment and expand when you're ready to version
      // versions: [
      //   { label: 'v1', slug: 'v1' },
      //   { label: 'v2 (latest)', slug: 'v2' },
      // ],
    }),
  ],
});
