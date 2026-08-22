from pathlib import Path
import json

report_dir = Path('/home/ubuntu/crest-automotive-astro/lighthouse-reports/final')
out = ['# Final Lighthouse summary\n']
for path in sorted(report_dir.glob('*.json')):
    data = json.loads(path.read_text())
    out.append(f'## {path.stem}\n')
    for key in ('performance', 'accessibility', 'best-practices', 'seo'):
        score = data.get('categories', {}).get(key, {}).get('score')
        out.append(f'- {key}: {score * 100:.0f}' if score is not None else f'- {key}: unavailable')
    failed = []
    for audit_id, audit in data.get('audits', {}).items():
        if audit.get('score') is not None and audit.get('score') < 1 and audit.get('scoreDisplayMode') not in {'notApplicable', 'manual', 'informative'}:
            failed.append((audit_id, audit.get('title', audit_id), audit.get('score')))
    if failed:
        out.append('\nPotential follow-ups:')
        for audit_id, title, score in sorted(failed, key=lambda item: item[2]):
            out.append(f'- `{audit_id}` — {title} ({score})')
    else:
        out.append('\nNo failing Lighthouse audits in the selected categories.')
    out.append('')
Path('/home/ubuntu/crest-automotive-astro/lighthouse-reports/final/summary.md').write_text('\n'.join(out))
print('\n'.join(out))
