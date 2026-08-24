# SEO & Google setup — G-DRIVE Bike Rental Bali

## Already configured in code

- Unique metadata per page (`app/page.tsx`, `app/tour-packages/`, tour slugs)
- Open Graph & Twitter cards (`lib/seo.ts` → `buildPageMetadata`)
- Canonical URLs per route
- `app/sitemap.ts` → `/sitemap.xml`
- `app/robots.ts` → `/robots.txt`
- `public/site.webmanifest` + `public/manifest.json`
- JSON-LD: LocalBusiness, FAQPage, BreadcrumbList, TouristTrip, TouristAttraction

## Environment variables

```env
NEXT_PUBLIC_SITE_URL=https://gdrivebikerentalbali.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=   # from Search Console HTML tag method
NEXT_PUBLIC_GTM_ID=                     # Google Tag Manager
NEXT_PUBLIC_GA4_ID=G-                   # optional, GA4 (prefer via GTM)
NEXT_PUBLIC_META_PIXEL_ID=              # Meta Pixel (prefer via GTM)
```

## Google Search Console

1. Add property for your live domain (`NEXT_PUBLIC_SITE_URL`).
2. Verify via HTML tag → paste code into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Submit sitemap: `https://your-domain.com/sitemap.xml`
4. Request indexing for `/` and `/tour-packages`.

## Google Business Profile

- Business name: **Gabet's Rental Bali** (alternate: G-DRIVE Bike Rental Bali)
- Category: Motorcycle rental / Vehicle rental
- Phone: +62 813 373 7779
- Website: production URL
- Service area: Bali (Canggu, Seminyak, Kuta, Ubud, Uluwatu, Sanur, Nusa Dua)
- Link Google Maps listing (Gabets Pub / pickup point)

## Google Analytics 4

1. Create GA4 property and web data stream.
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`.
3. Add Google tag in `app/layout.tsx` (see comment in layout file).

## Post-launch checks

- [ ] PageSpeed Insights (mobile + desktop)
- [ ] Rich Results Test for homepage and one tour URL
- [ ] Confirm one H1 per page
- [ ] Confirm `robots.txt` and `sitemap.xml` on production
