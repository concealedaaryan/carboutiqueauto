import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('visual-regression-mobile.json', 'utf8'));
for (const x of data) {
  const headingOk = x.headings.every((h) => h.copyBelowHeading && h.alignedLeft);
  const proofOk = x.proof?.display === 'grid' && x.proofItems.every((item) => item.textAlign === 'center');
  const ctaOk = x.ctaContact?.display === 'grid' && x.ctaContact?.columns === `${x.ctaContact.rect.width}px`;
  console.log(JSON.stringify({ width: x.width, overflowX: x.overflowX, consoleErrors: x.consoleErrors.length, proofColumns: x.proof?.columns, proofItems: x.proofItems.length, proofOk, headingOk, ctaColumns: x.ctaContact?.columns, ctaOk }));
}
