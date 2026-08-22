import fs from 'node:fs';
import path from 'node:path';

const dir = '/home/ubuntu/crest-automotive-astro/lighthouse-reports';
const files = fs.readdirSync(dir).filter((file) => file.endsWith('.json') && file !== 'summary.json' && file !== 'summary-output.json').sort();
const rows = [];
const auditFindings = new Map();

for (const file of files) {
  const report = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const scores = Object.fromEntries(Object.entries(report.categories || {}).map(([key, value]) => [key, value.score == null ? null : Math.round(value.score * 100)]));
  const metrics = Object.fromEntries(['first-contentful-paint','largest-contentful-paint','speed-index','total-blocking-time','cumulative-layout-shift','interactive'].map((id) => [id, report.audits?.[id]?.displayValue || report.audits?.[id]?.numericValue || null]));
  rows.push({ file, scores, metrics });
  for (const [id, audit] of Object.entries(report.audits || {})) {
    const isRelevant = ['accessibility','seo','best-practices','performance'].some((category) => report.categories?.[category]?.auditRefs?.some((ref) => ref.id === id));
    if (!isRelevant || audit.score == null || audit.score >= 0.9 || audit.scoreDisplayMode === 'notApplicable' || audit.scoreDisplayMode === 'informative') continue;
    if (!auditFindings.has(id)) auditFindings.set(id, { title: audit.title, description: audit.description, routes: [] });
    auditFindings.get(id).routes.push({ file, score: audit.score, displayValue: audit.displayValue || '', details: audit.details?.items?.slice?.(0, 3) || [] });
  }
}

const summary = { generatedAt: new Date().toISOString(), reports: rows, findings: Object.fromEntries(auditFindings) };
fs.writeFileSync(path.join(dir, 'summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
