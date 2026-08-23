import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('visual-regression-mobile.json', 'utf8'));
const problematic = data.filter((x) => x.overflowX || x.consoleErrors.length || x.proof?.display !== 'grid' || x.proofItems.some((item) => item.textAlign !== 'center') || x.headings.some((heading) => !heading.copyBelowHeading || !heading.alignedLeft) || (x.ctaContact && !x.ctaContact.columns.includes('1fr')));
console.log(JSON.stringify({
  checks: data.length,
  problematic: problematic.length,
  results: data.map((x) => ({ width: x.width, overflowX: x.overflowX, consoleErrors: x.consoleErrors, proof: x.proof, proofItems: x.proofItems, headings: x.headings, ctaContact: x.ctaContact })),
  findings: problematic.map((x) => ({ width: x.width, overflowX: x.overflowX, consoleErrors: x.consoleErrors, proof: x.proof, proofItems: x.proofItems, headings: x.headings, ctaContact: x.ctaContact }))
}, null, 2));
