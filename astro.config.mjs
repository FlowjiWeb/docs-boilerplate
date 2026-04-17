import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import pagePlugin from '@pelagornis/page';
import { siteConfig } from './src/site.config.ts';

export default defineConfig({
  site: siteConfig.siteUrl,
  integrations: [
    starlight({
      plugins: [pagePlugin()],
      components: {
        Head: './src/overrides/Head.astro',
        TwoColumnContent: './src/overrides/TwoColumnContent.astro',
        Header: './src/overrides/Header.astro',
      },
      title: siteConfig.name,
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      favicon: './public/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
      },
      customCss: ['./src/styles/custom.css'],

      // Search (built-in Pagefind — no extra config needed)
      // Enabled by default in Starlight

      // Social links in header
      social: [
        { icon: 'github', label: 'GitHub', href: `https://github.com/${siteConfig.githubOrg}/${siteConfig.githubRepo}` },
      ],

      sidebar: [
        {
          label: 'Developer docs',
          items: [
            {
              label: 'Global',
              autogenerate: { directory: 'dev/global' },
            },
            {
              label: 'Website 1',
              autogenerate: { directory: 'dev/website-1' },
            },
            {
              label: 'Website 2',
              autogenerate: { directory: 'dev/website-2' },
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
            {
              label: 'Website 1',
              autogenerate: { directory: 'team/website-1' },
            },
            {
              label: 'Website 2',
              autogenerate: { directory: 'team/website-2' },
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
