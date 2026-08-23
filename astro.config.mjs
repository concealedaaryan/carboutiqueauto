import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  site: process.env.PUBLIC_SITE_URL || undefined,
  vite: {
    server: {
      // Permit temporary sandbox preview proxies during local inspection.
      allowedHosts: true,
    },
  },
});
