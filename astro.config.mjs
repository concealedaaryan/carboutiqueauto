import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  site: process.env.PUBLIC_SITE_URL || undefined,
});
