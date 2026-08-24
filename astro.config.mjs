import { defineConfig } from 'astro/config';

const configuredSiteUrl = process.env.PUBLIC_SITE_URL?.trim();
let publicSiteUrl;
if (configuredSiteUrl) {
  try {
    const parsed = new URL(configuredSiteUrl);
    const hasOnlyOrigin = parsed.pathname === '/' && !parsed.search && !parsed.hash && !parsed.username && !parsed.password;
    if (parsed.protocol === 'https:' && parsed.hostname && hasOnlyOrigin) publicSiteUrl = parsed.origin;
  } catch {
    publicSiteUrl = undefined;
  }
}
const isBuildCommand = process.env.npm_lifecycle_event === 'build' || process.argv.includes('build');
if (isBuildCommand && !publicSiteUrl) {
  throw new Error('PUBLIC_SITE_URL must be set to a clean HTTPS production origin before building.');
}

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  site: publicSiteUrl || undefined,
  vite: {
    server: {
      // Permit temporary sandbox preview proxies during local inspection.
      allowedHosts: true,
    },
  },
});
