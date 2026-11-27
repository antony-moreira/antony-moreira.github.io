// @ts-check
import { defineConfig } from 'astro/config';

// User site (repo "antony-moreira.github.io") → served at the domain root, no `base`.
// With a custom domain, change `site` and add public/CNAME.
export default defineConfig({
  site: 'https://antony-moreira.github.io',
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
    routing: { prefixDefaultLocale: false }, // pt-BR at "/", English at "/en/"
  },
});
