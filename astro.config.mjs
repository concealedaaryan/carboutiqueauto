import { defineConfig } from 'astro/config';

const configuredSiteUrl = process.env.PUBLIC_SITE_URL?.trim();
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
const candidateSiteUrl = configuredSiteUrl || (vercelProductionUrl ? `https://${vercelProductionUrl}` : undefined);
let publicSiteUrl;
if (candidateSiteUrl) {
  try {
    const parsed = new URL(candidateSiteUrl);
    const hasOnlyOrigin = parsed.pathname === '/' && !parsed.search && !parsed.hash && !parsed.username && !parsed.password;
    if (parsed.protocol === 'https:' && parsed.hostname && hasOnlyOrigin) publicSiteUrl = parsed.origin;
  } catch {
    publicSiteUrl = undefined;
  }
}
const isBuildCommand = process.env.npm_lifecycle_event === 'build' || process.argv.includes('build');
if (isBuildCommand && !publicSiteUrl) {
  throw new Error('Set PUBLIC_SITE_URL to a clean HTTPS production origin, or enable Vercel system environment variables so the production URL fallback is available before building.');
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
