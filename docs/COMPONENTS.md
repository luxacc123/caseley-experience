# Components — Caseley Experience

> Componentenlijst voor de nieuwe website.
> Per component: doel, benodigde data/props, gedrag en op welke pagina('s) het verschijnt.

---

## 1. Header

**Doel:** Vaste navigatiebalk bovenaan elke pagina.

**Props / data:**

- `logo`: string of afbeelding — "Caseley Experience"
- `navItems`: array van `{ label, href }`
  - Diensten → /diensten
  - Werkwijze → /werkwijze
  - Over → /over
  - Contact → /contact
- `ctaLabel`: "Offerte aanvragen"
- `ctaHref`: "/contact"
- `phoneNumber`: "+31614385060"

**Gedrag:**

- Desktop: horizontale nav, CTA-knop rechts
- Mobiel: hamburger-menu, CTA zichtbaar in geopend menu
- Sticky bij scrollen

**Verschijnt op:** Alle pagina's

---

## 2. StickyCTA

**Doel:** Mobiele sticky balk onderaan het scherm. Altijd zichtbaar op mobiel.

**Props / data:**

- `phoneNumber`: "+31614385060"
- `phoneLabel`: "Bel direct"
- `ctaLabel`: "Offerte aanvragen"
- `ctaHref`: "/contact"

**Gedrag:**

- Alleen zichtbaar op viewports < 768px
- Fixed position onderaan viewport
- Z-index boven alle content
- Twee knoppen: "Bel direct" (tel-link) + "Offerte aanvragen"

**Verschijnt op:** Alle pagina's (alleen mobiel)

---

## 3. HeroSection

**Doel:** Boven-de-vouw sectie met hoofdkop, subtekst en CTA-knoppen.

**Props / data:**

- `headline`: string
- `subtext`: string
- `primaryCta`: `{ label, href }`
- `secondaryCta`: `{ label, href }` (optioneel)
- `backgroundType`: "image" | "gradient" | "solid"

**Gedrag:**

- Full-width, minimaal 60vh hoogte
- Responsive: kop en CTA's stapelen op mobiel

**Verschijnt op:** Alle pagina's (met pagina-specifieke content)

---

## 4. USPBar

**Doel:** Horizontale balk met 3-4 vertrouwensindicatoren.

**Props / data:**

- `items`: array van `{ icon, text }`
  - `{ icon: "clock", text: "24/7 bereikbaar" }`
  - `{ icon: "bolt", text: "Reactie binnen 30 min" }`
  - `{ icon: "shield", text: "20+ jaar ervaring" }`
  - `{ icon: "globe", text: "Netwerk door heel Europa" }`

**Gedrag:**

- Desktop: naast elkaar in een rij
- Mobiel: 2x2 grid of horizontaal scrollbaar

**Verschijnt op:** Home (onder hero), Contact (optioneel)

---

## 5. ServicesGrid

**Doel:** Overzichtsraster van alle 6 diensten als klikbare kaarten.

**Props / data:**

- `services`: array van `{ id, icon, name, shortDescription, href }`

**Data:**

```json
[
  { "id": "complete-ladingen", "name": "Complete ladingen", "shortDescription": "Hele vrachtwagen, direct geladen en doorgezet." },
  { "id": "deelpartijen", "name": "Deelpartijen", "shortDescription": "Geen complete vracht? Wij regelen deelpartijen via ons netwerk." },
  { "id": "koeriersdiensten", "name": "Koeriersdiensten", "shortDescription": "Groot of klein, direct weggereden." },
  { "id": "spoedzendingen", "name": "Spoedzendingen", "shortDescription": "Supersnelle service, doorgaans binnen 2 werkdagen." },
  { "id": "geconditioneerd", "name": "Geconditioneerd transport", "shortDescription": "Transport op temperatuur: +20 tot -8 graden." },
  { "id": "exceptioneel", "name": "Exceptioneel transport", "shortDescription": "Niet-standaard maten en gewichten." }
]
```

**Gedrag:**

- Desktop: 3- of 4-koloms grid
- Tablet: 2-koloms
- Mobiel: 1-kolom
- Hover-effect op kaarten
- Kaarten linken naar /diensten#[id]

**Verschijnt op:** Home (sectie 3)

---

## 6. ServiceDetail

**Doel:** Volledige beschrijving van één dienst op de Diensten-pagina.

**Props / data:**

- `id`: string (anchor)
- `name`: string
- `description`: string (2-3 zinnen)
- `ctaLabel`: string
- `ctaHref`: string
- `icon`: string (optioneel)

**Gedrag:**

- Elke dienst heeft een anchor-id voor deeplinking
- CTA-knop per dienst
- Afwisselende layout mogelijk (links/rechts)

**Verschijnt op:** Diensten (7x)

---

## 7. ProcessSteps

**Doel:** Visuele stap-voor-stap weergave van het werkproces.

**Props / data:**

- `steps`: array van `{ number, title, description }`
  - 1: "Deel uw transportbehoefte" / "Bel, mail, of vul het formulier in."
  - 2: "Wij zoeken de beste vervoerder" / "Direct contact met ons netwerk."
  - 3: "Offerte binnen 30 minuten" / "Scherp, betrouwbaar, passend."
  - 4: "Uw zending wordt opgepakt" / "Veilig en op de afgesproken datum."

**Gedrag:**

- Desktop: horizontale timeline of genummerde rij
- Mobiel: verticale timeline
- Optioneel: scroll-animatie

**Verschijnt op:** Home (verkort: 3 stappen), Werkwijze (volledig: 4 stappen)

---

## 8. ChecklistBlock

**Doel:** Overzicht van benodigde informatie voor een offerte-aanvraag.

**Props / data:**

- `title`: "Dit hebben wij nodig voor uw offerte"
- `items`: array van `{ label, description }`
  - "Gewenste laad- en losdag" / "Wanneer moet het opgehaald en afgeleverd worden?"
  - "Laadplaats en losplaats" / "Volledig adres van ophaal- en afleverlocatie"
  - "Goederenbeschrijving" / "Wat wordt er vervoerd? Afmetingen en gewicht"
  - "Faciliteiten" / "Laad- en losfaciliteiten. Is er een klep nodig?"

**Gedrag:**

- Checkmark-iconen of genummerde lijst
- Desktop: 2x2 grid
- Mobiel: verticale lijst

**Verschijnt op:** Werkwijze (sectie 3)

---

## 9. QuoteForm

**Doel:** Offerte-aanvraagformulier. Belangrijkste conversie-element.

**Props / data:**

- `mode`: "full" | "short"
- `submitLabel`: "Offerte aanvragen" (full) of "Verstuur" (short)
- `successMessage`: "Bedankt! U ontvangt binnen 30 minuten een reactie."
- `phoneNumber`: "+31614385060"

**Velden (full mode):**

| # | Veld | Type | Verplicht |
|---|------|------|-----------|
| 1 | Naam | text | Ja |
| 2 | E-mailadres | email | Ja |
| 3 | Telefoonnummer | tel | Ja |
| 4 | Gewenste laaddag | date | Ja |
| 5 | Gewenste losdag | date | Ja |
| 6 | Laadplaats (volledig adres) | textarea | Ja |
| 7 | Losplaats (volledig adres) | textarea | Ja |
| 8 | Goederenbeschrijving | textarea | Ja |
| 9 | Afmetingen en gewicht | text | Ja |
| 10 | Faciliteiten / klep nodig? | textarea | Nee |
| 11 | Type dienst | select (7 opties) | Nee |
| 12 | Opmerkingen | textarea | Nee |

**Velden (short mode):** Naam, E-mail, Telefoon, Bericht

**Gedrag:**

- Client-side validatie
- Submit: POST naar API-route of e-mail service
- Loading state, succes-state, fout-state
- "Of bel direct: +31 6 1438 5060" onder verzendknop

**Verschijnt op:** Werkwijze (sectie 5), Contact (sectie 2, met tab full/short)

---

## 10. ContactCard

**Doel:** Compacte kaart met alle contactgegevens.

**Props / data:**

- `phone`: "+31614385060"
- `phoneFormatted`: "+31 6 1438 5060"
- `email`: "info@caseleyexperience.nl"
- `address`: `{ street: "Oosthoutlaan 4", postal: "2171 TZ", city: "Sassenheim" }`
- `availability`: "24/7 bereikbaar"
- `responseTime`: "Reactie binnen 30 minuten"

**Gedrag:**

- Telefoon: clickable tel-link
- E-mail: clickable mailto-link
- Adres: optioneel clickable naar Google Maps
- Iconen bij elk gegeven

**Verschijnt op:** Contact (sectie 2), Footer (verkort)

---

## 11. BusinessDetails

**Doel:** Formele bedrijfsgegevens (KvK, BTW, etc.).

**Props / data:**

- `items`: array van `{ label, value }`
  - KvK: 72213388
  - BTW: NL002060699B85
  - IBAN: NL12RABO0331574551
  - BIC: RABONL2U

**Gedrag:**

- Eenvoudige tabel of definition list

**Verschijnt op:** Contact (sectie 3), Footer (optioneel)

---

## 12. Footer

**Doel:** Globale footer met navigatie, contact en bedrijfsinformatie.

**Props / data:**

- `logo`: string of afbeelding
- `tagline`: "Wegtransport door heel Europa"
- `navItems`: zelfde als Header
- `contact`: zelfde data als ContactCard
- `businessDetails`: zelfde data als BusinessDetails (verkort)
- `copyright`: "© 2025 Caseley Experience"

**Gedrag:**

- 3-4 kolommen desktop, gestapeld op mobiel
- Links navigeerbaar, telefoon/e-mail clickable

**Verschijnt op:** Alle pagina's

---

## 13. CTASection

**Doel:** Herbruikbare afsluitende sectie met kop, subtekst en CTA-knoppen.

**Props / data:**

- `headline`: string
- `subtext`: string
- `primaryCta`: `{ label, href }`
- `secondaryCta`: `{ label, href }` (optioneel)
- `variant`: "dark" | "light" | "accent"

**Gedrag:**

- Centreert kop en knoppen
- Opvallende achtergrondkleur
- Responsive

**Verschijnt op:** Home (sectie 6), Diensten (sectie 10), Werkwijze, Over (sectie 5)

---

## 14. SEOHead

**Doel:** Per-pagina SEO metadata in `<head>`.

**Props / data:**

- `title`: string
- `description`: string
- `canonical`: string (volledige URL)
- `ogImage`: string (pad naar OG-afbeelding)
- `structuredData`: object (JSON-LD, alleen op Home)

**Gedrag:**

- Rendert `<title>`, `<meta name="description">`, Open Graph tags, Twitter Card tags, canonical URL
- Op Home: LocalBusiness JSON-LD injectie

**Verschijnt op:** Alle pagina's (in `<head>`)

---

## Componentafhankelijkheden per pagina

| Component | Home | Diensten | Werkwijze | Over | Contact |
|-----------|:----:|:--------:|:---------:|:----:|:-------:|
| Header | ✓ | ✓ | ✓ | ✓ | ✓ |
| StickyCTA | ✓ | ✓ | ✓ | ✓ | ✓ |
| HeroSection | ✓ | ✓ | ✓ | ✓ | ✓ |
| USPBar | ✓ | — | — | — | opt. |
| ServicesGrid | ✓ | — | — | — | — |
| ServiceDetail | — | ✓ | — | — | — |
| ProcessSteps | ✓* | — | ✓ | — | — |
| ChecklistBlock | — | — | ✓ | — | — |
| QuoteForm | — | — | ✓ | — | ✓ |
| ContactCard | — | — | — | — | ✓ |
| BusinessDetails | — | — | — | — | ✓ |
| Footer | ✓ | ✓ | ✓ | ✓ | ✓ |
| CTASection | ✓ | ✓ | ✓ | ✓ | — |
| SEOHead | ✓ | ✓ | ✓ | ✓ | ✓ |

*\* Home toont een verkorte versie (3 stappen i.p.v. 4)*
