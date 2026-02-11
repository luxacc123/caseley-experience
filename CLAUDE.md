# Caseley Experience — Rebuild Rules (Plan Mode)

## Doel

Bouw een nieuwe Nederlandse website voor Caseley Experience (wegtransport binnen & buiten Europa).
De website moet "miljardenbedrijf" ogen (premium, high-trust, conversiegericht), maar mag **geen nieuwe diensten, claims, certificeringen of garanties verzinnen**.

## Bron van waarheid (Content Policy)

- Alle inhoud moet herleidbaar zijn tot de huidige site: https://caseleyexperience.nl/
- We mogen copy herschrijven (helderder, strakker), maar:
  - geen nieuwe beloftes
  - geen nieuwe prijzen
  - geen nieuwe klanten/logos/reviews
  - geen nieuwe locaties/dekkingsgebieden
- Contactgegevens moeten exact overgenomen worden.

## Projectmodus

- Werk in **PLAN MODE**: eerst plan/structuur/copy-outline, daarna pas implementeren.
- Elke grotere stap: eerst een plan + checklist, daarna uitvoeren.

## Documentatie

- `/docs/CONTENT_SOURCE.md` — Alle feiten uit de huidige site (bron van waarheid)
- `/docs/SITE_PLAN.md` — Pagina-architectuur, secties, koppen, CTA's
- `/docs/COMPONENTS.md` — Componentenlijst met props en plaatsing

## Site-architectuur

| URL | Pagina | Inhoud |
|-----|--------|--------|
| `/` | Home | Hero, USP-balk, diensten-overzicht, proces, over, CTA |
| `/diensten` | Diensten | 7 diensten met anchor-links (#complete-ladingen, etc.) |
| `/werkwijze` | Werkwijze | Processtappen, checklist, offerte-formulier |
| `/over` | Over | Marc Caseley, kernwaarden, belofte |
| `/contact` | Contact | Formulier, contactgegevens, bedrijfsgegevens |

## UX/Conversie richtlijnen

- Primary CTA: Offerte aanvragen / Bel direct
- Op mobiel: sticky belknop + snelle offerte CTA
- Offerteformulier vraagt alleen data die in "Werkwijze" staat:
  - laad/losdag, laad/losadres, goederen + afmetingen/gewicht, faciliteiten

## Tech richtlijnen (voor implementatiefase)

- Next.js + Tailwind
- Content-first: teksten in /content (md/json) zodat niets "hardcoded" verdwijnt
- SEO: titles/meta/OG, sitemap, robots, schema.org LocalBusiness
- Telefoonlinks: `tel:+31614385060` met event tracking
- E-maillinks: `mailto:info@caseleyexperience.nl`
- Formuliervelden: exact zoals beschreven in `/docs/COMPONENTS.md` (QuoteForm)
- Schema.org: LocalBusiness JSON-LD op homepage

## Definition of Done

- Alle pagina's staan en zijn responsive
- Alle inhoud matcht de bron (geen verzinsels)
- Duidelijke CTA's en offerte flow
- Lighthouse/Pagespeed "netjes" (basis)
