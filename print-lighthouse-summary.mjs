import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('/home/ubuntu/crest-automotive-astro/lighthouse-reports/summary.json', 'utf8'));
for (const report of data.reports) {
  console.log(`${report.file}\n  scores: ${JSON.stringify(report.scores)}\n  metrics: ${JSON.stringify(report.metrics)}`);
}
console.log('\nUnique findings:');
for (const [id, finding] of Object.entries(data.findings)) {
  const routes = finding.routes.map((route) => `${route.file} (${route.displayValue || route.score})`).join(', ');
  console.log(`- ${id}: ${finding.title} -> ${routes}`);
}
