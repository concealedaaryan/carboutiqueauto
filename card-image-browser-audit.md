# Service and package card image audit

Previewed the built Astro site at `http://localhost:4330/services`.

The Services route still renders all 16 treatments and the full pricing matrix. The service rows now show photographic card surfaces with dark layered gradients. Text, prices, service numbers, and estimate links remain readable against the image treatment. The first visible rows showed distinct image tones and consistent overlay contrast.

The shared CSS assigns five existing automotive assets across the service rows and package cards using an nth-child image rotation, so every card receives a background image without changing the data model or markup contracts. The gradient is stronger on small screens to protect readability.
