from pathlib import Path

ROOT = Path('/home/ubuntu/repo-audit-cargoutiqueauto')

catalog = ROOT / 'src/data/catalog.ts'
text = catalog.read_text()
old_start = text.index('export const ppfOptions = [')
old_end = text.index('\n];', old_start) + 3
new = '''export const ppfOptions = [
  { name: 'BASF Rodim TPU (German) R4 Pro', warranty: '15 years', small: '₹2,90,000', medium: '₹3,15,000', large: '₹3,30,000', coverage: 'Cracking & yellowing' },
  { name: 'BASF Rodim TPU (German) R3 Pro', warranty: '10 years', small: '₹1,60,000', medium: '₹1,80,000', large: '₹2,00,000', coverage: 'Cracking & yellowing' },
  { name: 'BASF Rodim TPU PPF (German) R + Black Shield', warranty: '7 years', small: '₹1,50,000', medium: '₹1,65,000', large: '₹1,85,000', coverage: 'Cracking & yellowing' },
  { name: 'BASF Rodim TPU PPF (German) R2 Matt', warranty: '8 years', small: '₹1,45,000', medium: '₹1,60,000', large: '₹1,75,000', coverage: 'Cracking & yellowing' },
  { name: 'BASF Rodim TPU PPF (German) R2', warranty: '8 years', small: '₹1,35,000', medium: '₹1,45,000', large: '₹1,60,000', coverage: 'Cracking & yellowing' },
  { name: 'BASF Rodim TPU PPF (German) R1', warranty: '7 years', small: '₹1,10,000', medium: '₹1,25,000', large: '₹1,30,000', coverage: 'Cracking & yellowing' },
  { name: 'BASF Rodim TPU (German) R Star', warranty: '5 years', small: '₹85,000', medium: '₹1,00,000', large: '₹1,20,000', coverage: 'Cracking & yellowing' },
];'''
catalog.write_text(text[:old_start] + new + text[old_end:])

protection = ROOT / 'src/pages/protection.astro'
text = protection.read_text()
text = text.replace('Crest Automotive ceramic, graphene, PPF and surface-protection options.', 'Crest Automotive Rodim PPF, ceramic, graphene and surface-protection options.')
text = text.replace('Paint protection film', 'Rodim paint protection film')
text = text.replace('Thermoplastic protection against scratches, swirl marks, road debris and environmental wear. Options include anti-yellowing, self-healing and high-gloss films.', 'Rodim thermoplastic paint protection film helps defend against scratches, swirl marks, road debris and environmental wear. Choose the Rodim film finish and coverage size that suit your vehicle.')
text = text.replace('<section class="protection-hero"><div><span class="eyebrow">03 / Surface protection</span><h1>More gloss.<br /><em>More time.</em></h1><p>Protect the finish you invested in with ceramic, graphene and paint-protection-film systems designed for daily roads, weather and use.</p><a class="button button-gold" href="/estimate">Build a protection estimate <span>↗</span></a></div><div class="hero-image" style="background-image: linear-gradient(180deg, rgba(19,19,21,.05), rgba(19,19,21,.75)), url(\'/images/generated/crest-ceramic-beading.jpg\');"><span>HYDROPHOBIC FINISH</span><small>Water beading / coated paint detail</small></div></section>', '<section class="protection-hero"><div><span class="eyebrow">03 / Crest × Rodim PPF</span><h1>More gloss.<br /><em>More protection.</em></h1><p>Rodim paint protection film, installed by Crest Automotive in DLF Gurugram, for owners who want a cleaner finish and more confidence on daily roads.</p><a class="button button-gold" href="/estimate">Build a Rodim PPF estimate <span>↗</span></a></div><div class="hero-image rodim-hero-image"><span>RODIM PPF · SURFACE DEFENSE</span><small>Precision film installation / Crest private bay</small></div></section>')
text = text.replace('Choose your shield.', 'Choose your Rodim shield.')
text = text.replace('Add ceramic coverage to the surfaces that need it most, from PPF and glass to alloys, lights, grills, interiors and leather panels.', 'Complete the Rodim system with ceramic coverage for PPF, glass, alloys, lights, grills, interiors and leather panels.')
protection.write_text(text)

for filename in ['src/pages/contact.astro', 'src/pages/estimate.astro', 'src/pages/services.astro', 'src/pages/packages.astro', 'src/pages/why-crest.astro', 'src/pages/locations.astro']:
    path = ROOT / filename
    text = path.read_text()
    replacements = {
        '.contact-hero, .contact-bottom {': '.contact-hero, .contact-bottom { background-image: linear-gradient(90deg, rgba(14,14,16,.95), rgba(14,14,16,.68)), url(\'/images/generated/crest-studio-wide.jpg\'); background-position:center; background-size:cover; ',
        '.estimate-hero,.calculator-section,.estimate-disclaimer{': '.estimate-hero,.calculator-section,.estimate-disclaimer{ background-image: linear-gradient(90deg, rgba(14,14,16,.94), rgba(14,14,16,.72)), url(\'/images/generated/crest-ppf-precision.jpg\'); background-position:center; background-size:cover; ',
        '.catalogue-section { max-width: none; background: #1b1b1d; }': '.catalogue-section { max-width: none; background-image: linear-gradient(90deg, rgba(14,14,16,.96), rgba(27,27,29,.82)), url(\'/images/generated/crest-detailing-process.jpg\'); background-position:center; background-size:cover; }',
        '.package-grid-section { max-width: none; background: #1b1b1d; }': '.package-grid-section { max-width: none; background-image: linear-gradient(90deg, rgba(14,14,16,.96), rgba(27,27,29,.82)), url(\'/images/generated/crest-studio-wide.jpg\'); background-position:center; background-size:cover; }',
        '.reason-section { max-width: none; display: grid; grid-template-columns: .75fr 1.25fr; gap: 85px; background: #1b1b1d; }': '.reason-section { max-width: none; display: grid; grid-template-columns: .75fr 1.25fr; gap: 85px; background-image: linear-gradient(90deg, rgba(14,14,16,.95), rgba(27,27,29,.8)), url(\'/images/generated/crest-detailing-process.jpg\'); background-position:center; background-size:cover; }',
        '.locations-section { max-width: none; background: #1b1b1d; }': '.locations-section { max-width: none; background-image: linear-gradient(90deg, rgba(14,14,16,.95), rgba(27,27,29,.8)), url(\'/images/generated/crest-studio-wide.jpg\'); background-position:center; background-size:cover; }',
    }
    for old, new in replacements.items(): text = text.replace(old, new)
    path.write_text(text)

for filename in ['api/crest-system-prompt.js', 'groq-system-prompt.md', 'README.md']:
    path = ROOT / filename
    if not path.exists(): continue
    text = path.read_text()
    for old in ['Llumar Valor', 'Llumar Platinum', 'Proteq 3 Series', 'Garware Plus', 'Proteq Elite', 'Garware Protect', 'Carbins S-Series', 'Carbins E-Series']:
        text = text.replace(old, 'Rodim PPF range')
    text = text.replace('PPF options are priced by film and coverage size:', 'Rodim PPF options are priced by film and coverage size:')
    text = text.replace('Paint protection film installation', 'Rodim paint protection film installation')
    text = text.replace('PPF catalogue', 'Rodim PPF catalogue')
    path.write_text(text)
