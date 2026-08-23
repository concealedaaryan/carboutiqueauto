from pathlib import Path

ROOT = Path('/home/ubuntu/repo-audit-cargoutiqueauto')

# Every customer-facing PPF mention should be unambiguously Rodim PPF.
for filename in ['src/pages/why-crest.astro', 'src/components/Chatbot.astro', 'src/pages/terms-of-service.astro', 'README.md']:
    path = ROOT / filename
    text = path.read_text()
    text = text.replace('with PPF, coatings', 'with Rodim PPF, coatings')
    text = text.replace('Ask me about services, packages, PPF, coatings', 'Ask me about services, packages, Rodim PPF, coatings')
    text = text.replace('coatings, PPF, glass treatment', 'coatings, Rodim PPF, glass treatment')
    text = text.replace('contains ceramic, graphene, PPF, warranties', 'contains ceramic, graphene, Rodim PPF, warranties')
    text = text.replace('PPF film and size selection', 'Rodim PPF film and size selection')
    text = text.replace('PPF options, protection add-ons', 'Rodim PPF options, protection add-ons')
    text = text.replace('the PPF catalogue', 'the Rodim PPF catalogue')
    text = text.replace('PPF catalogue', 'Rodim PPF catalogue')
    path.write_text(text)

# Add a background image to the Protection hero and preserve readable text with a layered overlay.
protection = ROOT / 'src/pages/protection.astro'
text = protection.read_text()
needle = '  .hero-image { min-height: 450px; display: flex; flex-direction: column; justify-content: end; padding: 24px; border: 1px solid var(--line); background-size: cover; background-position: center; }'
replacement = needle + "\n  .rodim-hero-image { background-image: linear-gradient(180deg, rgba(14,14,16,.12), rgba(14,14,16,.88)), url('/images/generated/crest-ppf-precision.jpg'); background-position: center; background-size: cover; }"
if needle in text and '.rodim-hero-image' not in text:
    text = text.replace(needle, replacement)
protection.write_text(text)

# Site-wide image-backed hero treatment for routes that have a named hero section.
layout = ROOT / 'src/layouts/SiteLayout.astro'
text = layout.read_text()
addition = '''
<style is="global">
  .protection-hero, .services-hero, .packages-hero, .why-hero, .location-hero, .contact-hero, .estimate-hero {
    position: relative;
    isolation: isolate;
    background-position: center;
    background-size: cover;
  }
  .protection-hero::before, .services-hero::before, .packages-hero::before, .why-hero::before, .location-hero::before, .contact-hero::before, .estimate-hero::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(90deg, rgba(14,14,16,.96) 0%, rgba(14,14,16,.82) 50%, rgba(14,14,16,.42) 100%);
  }
  .protection-hero { background-image: url('/images/generated/crest-ppf-precision.jpg'); }
  .services-hero { background-image: url('/images/generated/crest-detailing-process.jpg'); }
  .packages-hero { background-image: url('/images/generated/crest-studio-wide.jpg'); }
  .why-hero { background-image: url('/images/generated/crest-detailing-process.jpg'); }
  .location-hero { background-image: url('/images/generated/crest-studio-wide.jpg'); }
  .contact-hero { background-image: url('/images/generated/crest-studio-wide.jpg'); }
  .estimate-hero { background-image: url('/images/generated/crest-ppf-precision.jpg'); }
  .ppf-section { background-image: linear-gradient(90deg, rgba(14,14,16,.96), rgba(27,27,29,.78)), url('/images/generated/crest-ppf-precision.jpg'); background-position:center; background-size:cover; }
  .addons-section { background-image: linear-gradient(90deg, rgba(14,14,16,.94), rgba(27,27,29,.82)), url('/images/generated/crest-ceramic-beading.jpg'); background-position:center; background-size:cover; }
</style>
'''
if '.services-hero::before' not in text:
    text += addition
layout.write_text(text)
