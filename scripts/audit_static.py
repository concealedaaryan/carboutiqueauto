from pathlib import Path
import json
import re

ROOT = Path('/home/ubuntu/repo-audit-cargoutiqueauto')
src = ROOT / 'src'
print('AUDIT_ROOT', ROOT)

pkg = json.loads((ROOT / 'package.json').read_text())
all_deps = {**pkg.get('dependencies', {}), **pkg.get('devDependencies', {})}
framework_deps = {name: version for name, version in all_deps.items() if name.lower() in {'react', 'react-dom', 'vue', 'svelte', '@astrojs/react', '@astrojs/vue'}}
print('PACKAGE', pkg.get('name'))
print('SCRIPTS', ','.join(pkg.get('scripts', {}).keys()))
print('FRAMEWORK_DEPS', json.dumps(framework_deps, sort_keys=True))

pages = sorted((src / 'pages').glob('*'))
astro_routes = [p.name for p in pages if p.is_file()]
print('PAGE_FILES', len(astro_routes), ','.join(astro_routes))

astro_files = list(src.rglob('*.astro'))
react_files = list(ROOT.rglob('*.tsx')) + list(ROOT.rglob('*.jsx'))
vue_files = list(ROOT.rglob('*.vue'))
print('ASTRO_FILES', len(astro_files))
print('REACT_FILES', len(react_files))
print('VUE_FILES', len(vue_files))

for name in ['README.md', '.env.example', '.gitignore', '.vercelignore', 'vercel.json', 'astro.config.mjs', 'public/robots.txt']:
    p = ROOT / name
    print('EXISTS', name, p.exists())

secret_patterns = [
    re.compile(r'(?i)(api[_-]?key|secret|token|password)\s*[:=]\s*["\'][^"\']{12,}["\']'),
    re.compile(r'(?i)gsk_[A-Za-z0-9_-]{20,}'),
    re.compile(r'(?i)sk-[A-Za-z0-9_-]{20,}'),
]
ignore_parts = {'node_modules', 'dist', '.astro', '.git', 'test-results', 'playwright-report'}
secret_hits = []
for p in ROOT.rglob('*'):
    if not p.is_file() or any(part in ignore_parts for part in p.parts):
        continue
    if p.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.woff', '.woff2', '.lock'}:
        continue
    try:
        text = p.read_text(errors='ignore')
    except Exception:
        continue
    for i, line in enumerate(text.splitlines(), 1):
        if any(pattern.search(line) for pattern in secret_patterns):
            secret_hits.append(f'{p.relative_to(ROOT)}:{i}:{line.strip()[:180]}')
print('SECRET_HITS', len(secret_hits))
for hit in secret_hits[:40]: print(hit)

for p in sorted((src / 'pages').glob('*.astro')):
    text = p.read_text(errors='ignore')
    has_layout = 'SiteLayout' in text or 'LegalLayout' in text
    has_title = 'title=' in text
    has_description = 'description=' in text
    print('PAGE_SEMANTICS', p.name, json.dumps({'layout': has_layout, 'title_prop': has_title, 'description_prop': has_description}))

for p in [ROOT / 'api/chat.js', ROOT / 'src/components/Chatbot.astro']:
    if p.exists():
        text = p.read_text(errors='ignore')
        print('CHAT_SECRET_USAGE', p.relative_to(ROOT), 'GROQ_API_KEY' in text, 'client_secret_literal', bool(re.search(r'(?i)gsk_[A-Za-z0-9_-]{20,}', text)))

for p in [ROOT / 'public/robots.txt', ROOT / 'src/pages/robots.txt.ts', ROOT / 'src/pages/sitemap.xml.ts']:
    if p.exists():
        print('CRAWL_FILE', p.relative_to(ROOT), p.read_text(errors='ignore')[:500].replace('\n', ' | '))
