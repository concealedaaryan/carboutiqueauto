import fs from 'node:fs';
const files = ['home-mobile.json','estimate-mobile.json','terms-of-service-mobile.json'];
for (const file of files) {
  const report = JSON.parse(fs.readFileSync(`/home/ubuntu/crest-automotive-astro/lighthouse-reports/${file}`, 'utf8'));
  console.log(`\n## ${file}`);
  for (const id of ['aria-hidden-focus','label-content-name-mismatch','link-in-text-block','errors-in-console']) {
    const audit = report.audits[id];
    if (!audit || audit.score >= 1) continue;
    console.log(`\n${id}: ${audit.title}`);
    console.log(JSON.stringify({score:audit.score,displayValue:audit.displayValue,details:audit.details}, null, 2));
  }
}
