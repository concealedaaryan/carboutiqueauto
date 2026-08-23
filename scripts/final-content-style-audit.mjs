import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (full.endsWith('.astro')) files.push(full);
  }
};
walk(root);
const findings = [];
const counts = { astroFiles: files.length, dividerMarkup: 0, sideHeadingGridRules: 0, headingAccentColorRules: 0, desktopOverflowRules: 0 };
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file);
  const lines = text.split(/\n/);
  lines.forEach((line, index) => {
    if (/<span class="eyebrow"><i><\/i>|page-title-line/.test(line)) { counts.dividerMarkup += 1; findings.push({ file: rel, line: index + 1, type: 'decorative-divider-markup', text: line.trim().slice(0, 180) }); }
    if (/section-heading[^\n]*grid-template-columns|grid-template-columns[^\n]*section-heading/.test(line)) { counts.sideHeadingGridRules += 1; findings.push({ file: rel, line: index + 1, type: 'section-heading-grid-rule', text: line.trim().slice(0, 180) }); }
    if (/(h[1-6].*(em|span)|em\s*\{)[^\n]*(gold|amber|blue|electric|gold-soft)/i.test(line)) { counts.headingAccentColorRules += 1; findings.push({ file: rel, line: index + 1, type: 'colored-heading-accent-rule', text: line.trim().slice(0, 180) }); }
    if (/width:\s*(?:calc\(100vw|100vw)|left:\s*-|right:\s*-/.test(line)) { counts.desktopOverflowRules += 1; }
  });
}
console.log(JSON.stringify({ counts, findings }, null, 2));
