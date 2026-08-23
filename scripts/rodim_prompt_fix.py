from pathlib import Path

ROOT = Path('/home/ubuntu/repo-audit-cargoutiqueauto')
rodim_table = '''| Film | Warranty | Small / Medium / Large | Coverage |
|---|---|---|---|
| BASF Rodim TPU (German) R4 Pro | 15 years | ₹2,90,000 / ₹3,15,000 / ₹3,30,000 | Cracking & yellowing |
| BASF Rodim TPU (German) R3 Pro | 10 years | ₹1,60,000 / ₹1,80,000 / ₹2,00,000 | Cracking & yellowing |
| BASF Rodim TPU PPF (German) R + Black Shield | 7 years | ₹1,50,000 / ₹1,65,000 / ₹1,85,000 | Cracking & yellowing |
| BASF Rodim TPU PPF (German) R2 Matt | 8 years | ₹1,45,000 / ₹1,60,000 / ₹1,75,000 | Cracking & yellowing |
| BASF Rodim TPU PPF (German) R2 | 8 years | ₹1,35,000 / ₹1,45,000 / ₹1,60,000 | Cracking & yellowing |
| BASF Rodim TPU PPF (German) R1 | 7 years | ₹1,10,000 / ₹1,25,000 / ₹1,30,000 | Cracking & yellowing |
| BASF Rodim TPU (German) R Star | 5 years | ₹85,000 / ₹1,00,000 / ₹1,20,000 | Cracking & yellowing |'''

for filename in ['api/crest-system-prompt.js', 'groq-system-prompt.md']:
    path = ROOT / filename
    text = path.read_text()
    start = text.find('| Film | Warranty | Small / Medium / Large | Coverage |')
    if start == -1:
        continue
    end = text.find('\n\nDo not combine', start)
    if end == -1:
        end = text.find('\n\nDo not combine a PPF', start)
    if end == -1:
        raise RuntimeError(f'Could not find PPF table end in {filename}')
    text = text[:start] + rodim_table + text[end:]
    path.write_text(text)

replacements = {
    'PPF installation': 'Rodim PPF installation',
    'PPF film': 'Rodim PPF film',
    'PPF choice': 'Rodim PPF choice',
    'PPF and coatings': 'Rodim PPF and coatings',
    'PPF, ceramic, graphene': 'Rodim PPF, ceramic, graphene',
    'PPF, warranties': 'Rodim PPF, warranties',
    'PPF options': 'Rodim PPF options',
    'PPF catalogue': 'Rodim PPF catalogue',
    'PPF page': 'Rodim PPF page',
    'PPF · ${size.value}': 'Rodim PPF · ${size.value}',
}
for filename in ['src/components/BookingCalculator.astro', 'src/components/Chatbot.astro', 'src/pages/contact.astro', 'src/pages/estimate.astro', 'src/pages/privacy-policy.astro', 'src/pages/terms-of-service.astro', 'src/pages/index.astro']:
    path = ROOT / filename
    text = path.read_text()
    for old, new in replacements.items():
        text = text.replace(old, new)
    path.write_text(text)

faq = ROOT / 'src/data/catalog.ts'
text = faq.read_text()
text = text.replace('Do you also offer PPF and insurance assistance?', 'Do you also offer Rodim PPF and insurance assistance?')
text = text.replace('Yes. Crest also supports paint protection film installation, ceramic add-ons for PPF,', 'Yes. Crest also supports Rodim paint protection film installation, ceramic add-ons for Rodim PPF,')
faq.write_text(text)
