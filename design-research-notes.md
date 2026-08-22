# Crest Automotive redesign research notes

## Reference patterns observed

Royal Auto Detailing uses a very small top navigation—Home, Services, About—with a prominent booking action and repeated “Book Now” actions throughout the page. Its strongest pattern is immediate service clarity, high-quality vehicle photography, a simple booking path, and trust through product-quality references.

Atomic Auto Salon uses a clear service taxonomy in the header: Paint Protection Film, Ceramic Coatings, Window Tint, Windshield Protection, Detailing, Gallery, and Contact. It repeats a high-intent “Get a Free Quote” action, exposes phone/location details, and uses brand/product association as credibility. Its information architecture is more service-led than editorial.

Jobber’s curated auto-detailing examples emphasize a small menu, visible quote/estimate CTAs, high-quality work imagery, transparent pricing, service-specific pages, reviews, FAQs, service areas, direct contact methods, and local SEO language. These patterns fit Crest’s goal of being premium without making the customer decode the interface.

## Design direction for Crest

Use an editorial luxury-service system: one dominant action (“Build your care plan” / “Request an appointment”), a compact navigation grouped around Services, Protection, Packages, Studio, and Contact, large high-contrast photography, short plain-English explanations, and visible proof immediately before the first booking decision. Replace decorative overlays that compete with imagery with simple captions and clear labels. Use one page-level decision per section.

## SEO implementation targets

Implement descriptive unique titles and meta descriptions; canonical URLs; Open Graph/Twitter metadata; semantic headings; descriptive image alt text; `LocalBusiness`/`AutoWash`-appropriate JSON-LD with service area, phone, opening hours, and URL; `FAQPage` schema only for visible FAQ content; `sitemap-index.xml`; robots.txt; breadcrumb navigation; meaningful local phrases such as “premium car detailing in DLF Gurugram” and community names; optimized image dimensions and loading behavior; and stable layout dimensions to support Core Web Vitals.

## Sources

- Jobber, “Auto Detailing Websites: 9 Professional Examples to Follow”: https://www.getjobber.com/academy/auto-detailing/auto-detailing-websites/
- Royal Auto Detailing: https://www.royalautodetailingaspen.com/
- Atomic Auto Salon: https://www.atomicautosalon.com/
- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central, Local Business structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Search Central, Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google Search Central, Image SEO: https://developers.google.com/search/docs/appearance/google-images
