# McGowan Lettings — Website Redesign Research

## Client Info
- **Client:** David McGowan
- **Business:** McGowan Lettings (letting agency)
- **Current site:** mcgowanlettings.co.uk (WordPress, WP Estate theme, built ~2014-2016)
- **Budget:** £4,000 (Option 2 — Premium site)
- **Payment:** 50% deposit after mockup approval, 50% on completion
- **Areas covered:** Bolton, Bury, Manchester, Rossendale + ~20 neighbourhoods
- **Properties:** ~18 currently listed
- **No property management software** — adds properties manually
- **Has archived properties** — reactivates when tenants vacate
- **Syndication:** Zoopla + PrimeLocation
- **Accreditations:** TDS, SafeAgent, TPO
- **WhatsApp contact:** Active
- **IT company:** Manages his PC/website/domain — David is informing them about the redesign
- **CMP/TPO/Complaints:** Link to PDF certificates, not pages

## Current Site Structure
- Home — hero slider, intro text, gallery, services, accreditation logos, Google Map, footer
- Properties — paginated listings (10/page), sidebar filters (status, type, city, area), map
- Tenants — FAQ-style page (move-in costs, references, deposits, responsibilities, fees)
- Landlords — Fully Managed vs Let-Only services, marketing methods
- Contact — form (name, email, phone, subject, message), WhatsApp button, map
- CMP / TPO / Complaints — PDF certificate links

## Current Site Problems
- Design is 10+ years old (WP Estate theme, WPBakery builder)
- Tiny property thumbnails (220x160px), stacked list layout
- Rotating hero slider (dated pattern)
- Bland typography, no brand personality
- Yellow-green accent (#bdd601) feels random
- No on-site testimonials/reviews
- Mortgage calculator on a lettings-only site
- Mentions newspaper advertising (dated)
- Not mobile-first
- Slow WordPress stack

## Current Site Colours
- Header/footer: near-black (#1f1f1f)
- Page background: light grey (#f2f2f2)
- Content areas: white (#ffffff)
- Body text: muted grey (#a0a5a8)
- Headings: dark charcoal (#1a171b)
- Accent: yellow-green (#bdd601)

## What Works on Current Site (Keep)
- Solid content on Tenants and Landlords pages
- Complete property data (photos, features, council tax, availability)
- Google Maps with property pins
- Property filters by area and type
- Accreditation logos displayed
- WhatsApp contact button
- Zoopla/PrimeLocation syndication badges

---

## Competitor Research — Best UK Letting Agent Sites

### Top References
| Site | URL | Style |
|------|-----|-------|
| Winkworth | winkworth.co.uk | Dark navy + gold on cream — most premium feel |
| Dexters | dexters.co.uk | Navy + white, serif headings, classic meets modern |
| Benham & Reeves | benhams.com | Clean, professional — best model for medium agency |
| Foxtons | foxtons.co.uk | Teal + yellow, modern and energetic |
| Knight Frank | knightfrank.co.uk | Neutral black/white/grey, photography-led |
| Chestertons | chestertons.com | Dark backgrounds, sophisticated |
| Hamptons | hamptons.co.uk | Dark blue + coral, MyHamptons portal |

### Design Patterns That Work
- **Colour:** Dark navy + warm accent (gold/copper) on cream/off-white backgrounds
- **Typography:** Serif headings (Playfair Display, Lora) for trust + sans-serif body for readability
- **Layout:** Full-width hero with search bar overlay, 3-4 column property card grid
- **Whitespace:** Generous padding — cheapest way to look expensive
- **Accent:** One colour used sparingly
- **Backgrounds:** Cream/warm white instead of pure white = more premium feel
- **Cards:** Large image, price prominent, beds/baths icons, hover effects (scale/shadow)
- **Navigation:** Sticky header, clear paths for landlords vs tenants

### Must-Have Features
- Property card grid with large images, price, beds/baths
- Property search with filters (area, price range, bedrooms, property type)
- Activate/deactivate toggle for David to manage listings
- Separate Landlord and Tenant pages
- Testimonials / Google review integration
- Regulatory badges in footer (TDS, SafeAgent, TPO)
- Mobile-first responsive design
- Contact form + WhatsApp button
- Free Property Valuation CTA (main lead generation)

### Good-to-Have Features
- Area guides for Bolton, Bury, Manchester, Rossendale (SEO value)
- Property detail pages with full-width image galleries
- Similar properties suggestions
- Landlord dashboard (activate/deactivate, view status)

### Skip at This Budget
- Interactive maps with property markers
- Video tour infrastructure
- In-house magazine/editorial
- Complex CRM integrations
- Currency/language selectors

---

## Received from David (4 April 2026)
- Logo — PDF attached via email (green/blue gradient icon + "mcgowan" text)
- Wording — happy for Viktor to draft based on current site content, David will add extras
- Hero image — wants aerial shot of Manchester (like Modern Facade's London aerial)
- Design reference — loves Modern Facade (modern-facade.co.uk) look: "professional and user friendly, exactly what I am after"
- More website references coming tomorrow (5 April 2026)

## Still Needed
- Brand colours (extract from logo or confirm with David)
- Photos (team, office, properties) — not sent yet
- Additional website references (coming tomorrow)

## Tech Stack
- **Framework:** Next.js (App Router)
- **Database:** Supabase
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Domain:** Transfer or point from current provider
