from pathlib import Path
import json

path = Path('/home/ubuntu/crest-automotive-astro/lighthouse-reports/final/home-desktop.json')
data = json.loads(path.read_text())
audit = data['audits'].get('link-text', {})
print(audit.get('title'))
print(audit.get('description'))
for group in audit.get('details', {}).get('items', []):
    print(group)
