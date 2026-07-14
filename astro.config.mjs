import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://albertodimaria.com',
  // Old indexed /it/ URLs → new IT root (static meta-refresh page)
  redirects: {
    '/it/': '/',
  },
  integrations: [sitemap(), react()],
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});