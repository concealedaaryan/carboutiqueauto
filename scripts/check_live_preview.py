from __future__ import annotations

import sys
from collections import deque
from urllib.parse import urldefrag, urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = sys.argv[1].rstrip('/')
TIMEOUT = 15
session = requests.Session()
session.headers.update({'User-Agent': 'Crest-live-preview-link-audit/1.0'})

queue = deque([BASE + '/'])
seen_pages: set[str] = set()
seen_links: set[str] = set()
failures: list[tuple[str, int | str]] = []
external: set[str] = set()

while queue:
    page = queue.popleft()
    page, _ = urldefrag(page)
    if page in seen_pages:
        continue
    seen_pages.add(page)
    try:
        response = session.get(page, timeout=TIMEOUT, allow_redirects=True)
    except requests.RequestException as exc:
        failures.append((page, type(exc).__name__ + ': ' + str(exc)))
        continue
    if response.status_code >= 400:
        failures.append((page, response.status_code))
        continue
    if 'text/html' not in response.headers.get('content-type', ''):
        continue
    soup = BeautifulSoup(response.text, 'html.parser')
    for tag in soup.select('[href]'):
        href = tag.get('href', '').strip()
        if not href or href.startswith(('#', 'mailto:', 'tel:', 'javascript:')):
            continue
        target = urldefrag(urljoin(page, href))[0]
        if target in seen_links:
            continue
        seen_links.add(target)
        parsed = urlparse(target)
        if parsed.netloc == urlparse(BASE).netloc:
            if parsed.path.startswith('/'):
                queue.append(target)
        else:
            external.add(target)

print(f'pages_checked={len(seen_pages)}')
print(f'internal_links_checked={len(seen_links) - len(external)}')
print(f'external_links_found={len(external)}')
print(f'failures={len(failures)}')
for url, status in failures:
    print(f'BROKEN\t{status}\t{url}')

if failures:
    raise SystemExit(1)
