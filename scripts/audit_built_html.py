from pathlib import Path
from bs4 import BeautifulSoup
import json
import re

ROOT = Path('/home/ubuntu/repo-audit-cargoutiqueauto/dist')
for html_path in sorted(ROOT.rglob('*.html')):
    soup = BeautifulSoup(html_path.read_text(errors='ignore'), 'html.parser')
    rel = html_path.relative_to(ROOT)
    title = soup.title.get_text(' ', strip=True) if soup.title else ''
    desc = soup.find('meta', attrs={'name': 'description'})
    canonical = soup.find('link', rel='canonical')
    h1s = soup.find_all('h1')
    images = soup.find_all('img')
    missing_alt = [str(img)[:160] for img in images if not img.get('alt')]
    iframes_missing_title = [str(frame)[:160] for frame in soup.find_all('iframe') if not frame.get('title')]
    jsonld = []
    for script in soup.find_all('script', attrs={'type': 'application/ld+json'}):
        try: jsonld.append(json.loads(script.string or script.get_text()))
        except Exception: jsonld.append({'parse_error': True})
    visible_text = soup.get_text(' ', strip=True)
    print('PAGE', rel)
    print('  title_len=', len(title), 'description_len=', len(desc.get('content','')) if desc else 0, 'canonical=', canonical.get('href') if canonical else '')
    print('  h1_count=', len(h1s), 'images=', len(images), 'missing_alt=', len(missing_alt), 'iframes=', len(soup.find_all('iframe')), 'iframe_missing_title=', len(iframes_missing_title), 'jsonld=', len(jsonld))
    if title.lower().find('your-domain.example') >= 0 or 'your-domain.example' in visible_text: print('  PLACEHOLDER_DOMAIN_IN_PAGE')
    if missing_alt: print('  MISSING_ALT', missing_alt)
    if iframes_missing_title: print('  MISSING_IFRAME_TITLE', iframes_missing_title)

robots = ROOT / 'robots.txt'
sitemap = ROOT / 'sitemap.xml'
print('ROBOTS_EXISTS', robots.exists())
if robots.exists(): print('ROBOTS_TEXT', robots.read_text(errors='ignore').replace('\n',' | '))
print('SITEMAP_EXISTS', sitemap.exists())
if sitemap.exists():
    text = sitemap.read_text(errors='ignore')
    print('SITEMAP_URL_COUNT', text.count('<loc>'))
    print('SITEMAP_PLACEHOLDER', 'your-domain.example' in text)
