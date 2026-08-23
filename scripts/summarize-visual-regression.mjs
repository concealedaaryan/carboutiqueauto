import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('visual-regression-desktop.json', 'utf8'));
const bad = data.filter((x) => x.overflowX || x.consoleErrors.length || x.headings.some((h) => !h.copyBelowHeading || h.hasDecorativeLine));
console.log(JSON.stringify({
  checks: data.length,
  problematic: bad.length,
  findings: bad.map((x) => ({ width: x.width, route: x.route, overflowX: x.overflowX, consoleErrors: x.consoleErrors, headings: x.headings }))
}, null, 2));
