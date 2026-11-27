// @ts-check
import { defineConfig } from 'astro/config';

// User site (repo "antony-moreira.github.io") → served at the domain root, no `base`.
// With a custom domain, change `site` and add public/CNAME.
export default defineConfig({
  site: 'https://antony-moreira.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: { prefixDefaultLocale: false }, // English at "/", pt-BR at "/pt-br/"
  },
});
