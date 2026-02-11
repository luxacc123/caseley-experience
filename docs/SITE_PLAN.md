# Site Plan — Caseley Experience

> Pagina-architectuur, secties, koppen en CTA-teksten voor de nieuwe website.
> Alle feiten komen uit `/docs/CONTENT_SOURCE.md`. Niets is verzonnen.

---

## Pagina-boom

```
/                → Home
/diensten        → Diensten (overzicht + alle 7 diensten)
/werkwijze       → Werkwijze (proces + offerte-formulier)
/over            → Over Caseley Experience
/contact         → Contact (formulier + gegevens)
```

Geen aparte landingpagina's per dienst. De huidige content ondersteunt geen
volledige pagina per dienst zonder content te verzinnen. Alle diensten staan
op `/diensten` met anchor-links.

---

## Globale elementen (alle pagina's)

### Header / Navigatie

- Logo: "Caseley Experience" (tekst of logo-afbeelding)
- Nav items: Diensten, Werkwijze, Over, Contact
- CTA-knop rechts: "Offerte aanvragen"
- Mobiel: hamburger menu + sticky balk onderaan

### Sticky CTA (mobiel)

- Twee knoppen naast elkaar:
  - "Bel direct" → tel:+31614385060
  - "Offerte aanvragen" → /contact of #offerte-formulier

### Footer

- Kolom 1: Logo + tagline
- Kolom 2: Navigatie-links
- Kolom 3: Contact (telefoon, e-mail, adres)
- Kolom 4: Bedrijfsgegevens (KvK, BTW)
- Onderregel: "© 2025 Caseley Experience"

---

## Pagina: Home ( / )

### Sectie 1 — Hero

**Doel:** Direct vertrouwen wekken + primaire actie uitlokken.

**Kop-opties (kies 1):**

1. "Uw transport door heel Europa. Geregeld binnen 30 minuten."
2. "Transport over de weg — snel, betrouwbaar, persoonlijk."
3. "Wegtransport door Europa. Eén telefoontje. Geregeld."

**Subtekst:**
"Van spoedzending tot complete lading: Caseley Experience regelt uw
wegtransport met 20+ jaar ervaring en een netwerk door heel Europa.
24/7 bereikbaar, reactie binnen 30 minuten."

**CTA's:**

- Primair: "Vraag een offerte aan" → /contact
- Secundair: "Bel +31 6 1438 5060" → tel-link

### Sectie 2 — USP-balk

Vier blokken naast elkaar (icoon + tekst):

| Icoon | Tekst | Bron |
|-------|-------|------|
| Klok | 24/7 bereikbaar | Homepage + Over Mij |
| Bliksem | Reactie binnen 30 minuten | Homepage + Werkwijze |
| Schild | 20+ jaar ervaring | Over Mij |
| Globe | Netwerk door heel Europa | Over Mij |

### Sectie 3 — Diensten-overzicht

**Kop-opties:**

1. "Van spoedzending tot exceptioneel transport"
2. "Zeven diensten. Eén aanspreekpunt."
3. "Wat we voor u regelen"

**Layout:** Grid van 7 kaarten (ServicesGrid). Elke kaart:

- Icoon
- Dienstnaam
- Korte beschrijving (1 zin uit CONTENT_SOURCE)
- Link: "Meer over [dienst]" → /diensten#anchor

**CTA onder grid:** "Twijfelt u welke dienst past? Bel ons — we denken mee."

### Sectie 4 — Hoe het werkt (verkort)

**Kop-opties:**

1. "In drie stappen geregeld"
2. "Zo werkt het"

**Drie stappen:**

1. "U deelt uw transportbehoefte" — telefonisch, per mail, of via het formulier
2. "Wij schakelen ons netwerk in" — direct contact met vervoerders
3. "Binnen 30 minuten een offerte" — scherp, betrouwbaar, passend

**CTA:** "Bekijk de volledige werkwijze" → /werkwijze

### Sectie 5 — Over Marc (kort)

**Kop-opties:**

1. "De persoon achter Caseley Experience"
2. "Persoonlijk contact met Marc Caseley"

**Tekst:**
"Caseley Experience is opgericht in 2018 door Marc Caseley. Met meer
dan 20 jaar ervaring in transport en logistiek en een uitgebreid netwerk
van vervoerders, biedt Marc persoonlijke begeleiding bij elke zending.
Korte lijnen, snelle schakels, en de zekerheid dat uw goederen veilig
aankomen — voor een concurrerende prijs."

**CTA:** "Lees meer over ons" → /over

### Sectie 6 — Contact CTA (afsluitend)

**Kop-opties:**

1. "Klaar om te verzenden?"
2. "Laat ons uw transport regelen"
3. "Neem vandaag nog contact op"

**Subtekst:** "Bel, mail, of vul het formulier in. U ontvangt binnen een half uur een reactie."

**CTA's:**

- "Offerte aanvragen" (primair)
- "Bel +31 6 1438 5060" (secundair)

---

## Pagina: Diensten ( /diensten )

### Sectie 1 — Hero

**Kop-opties:**

1. "Onze diensten — transport op maat"
2. "Alles wat u nodig heeft voor wegtransport"

**Subtekst:** "Van een kleine koerierszending tot exceptioneel transport: wij regelen het. Persoonlijk, snel, en betrouwbaar."

### Sectie 2 — Snelmenu (anchor-links)

Horizontaal menu naar alle 7 diensten:
Complete ladingen | Deelpartijen | Koeriersdiensten | Spoedzendingen | Groupage | Geconditioneerd | Exceptioneel

### Secties 3–9 — Per dienst een blok

#### 3. Complete ladingen (#complete-ladingen)

**Tekst:** "Een hele vrachtwagen, volledig voor uw zending. Direct geladen en doorgezet — zonder overladen. De snelste en veiligste optie voor grote volumes."
**CTA:** "Offerte aanvragen voor een complete lading"

#### 4. Deelpartijen (#deelpartijen)

**Tekst:** "Geen volledige vrachtwagen nodig? Wij regelen een gedeelte van de wagen. Uw goederen worden voorgehaald en overgeladen — efficiënt en kostenbesparend."
**CTA:** "Offerte aanvragen voor een deelpartij"

#### 5. Koeriersdiensten (#koeriersdiensten)

**Tekst:** "Groot of klein — een koerier wordt direct weggereden. De snelste mogelijkheid om uw zending te verplaatsen."
**CTA:** "Offerte aanvragen voor een koeriersdienst"

#### 6. Spoedzendingen (#spoedzendingen)

**Tekst:** "Specialist in spoedzendingen met supersnelle service. Of het nu Praag, Helsinki, Stockholm, Barcelona of Milaan is — wij leveren binnen 2 dagen."
**CTA:** "Spoed? Bel direct: +31 6 1438 5060"

#### 7. Groupage diensten (#groupage)

**Tekst:** "Uw goederen worden voorgehaald en vervoerd van hub naar hub. Ideaal voor zendingen zonder haast — scherpe tarieven, betrouwbare planning."
**CTA:** "Offerte aanvragen voor groupage"

#### 8. Geconditioneerd transport (#geconditioneerd)

**Tekst:** "Transport op de gewenste temperatuur. Van +20 tot -8 graden — uw temperatuurgevoelige goederen in de beste condities."
**CTA:** "Offerte aanvragen voor geconditioneerd transport"

#### 9. Exceptioneel transport (#exceptioneel)

**Tekst:** "Niet-standaard maten of gewichten? Wij regelen transport voor ladingen tot 3 meter breed en 18 meter lang. Neem eerst telefonisch contact op zodat we de verwachtingen kunnen afstemmen."
**CTA:** "Bel voor exceptioneel transport: +31 6 1438 5060"

### Sectie 10 — Twijfel-CTA

**Kop:** "Niet zeker welke dienst u nodig heeft?"
**Tekst:** "Geen probleem. Bel of mail ons — we denken graag mee."
**CTA's:** "Bel direct" + "Mail ons"

---

## Pagina: Werkwijze ( /werkwijze )

### Sectie 1 — Hero

**Kop-opties:**

1. "Zo werkt een aanvraag bij Caseley Experience"
2. "Van aanvraag tot levering — zo werkt het"

**Subtekst:** "Wij schakelen direct met ons netwerk van vervoerders. Geef ons de details, en u ontvangt binnen 30 minuten een offerte."

### Sectie 2 — Processtappen

**Stap 1:** "Deel uw transportbehoefte" — Bel, mail, of vul het formulier in met de gegevens van uw zending.
**Stap 2:** "Wij zoeken de beste vervoerder" — Via ons netwerk schakelen we direct met vervoerders die bij uw zending passen.
**Stap 3:** "Offerte binnen 30 minuten" — U ontvangt een scherpe offerte. Akkoord? Dan regelen wij de rest.
**Stap 4:** "Uw zending wordt opgepakt" — Veilig, betrouwbaar, en op de afgesproken datum.

### Sectie 3 — Wat hebben wij nodig? (checklist)

**Kop:** "Dit hebben wij nodig voor uw offerte"

| # | Gegeven | Toelichting |
|---|---------|-------------|
| 1 | Gewenste laad- en losdag | Wanneer moet het opgehaald en afgeleverd worden? |
| 2 | Laadplaats en losplaats | Volledig adres van ophaal- en afleverlocatie |
| 3 | Goederenbeschrijving | Wat wordt er vervoerd? Afmetingen en gewicht |
| 4 | Faciliteiten | Laad- en losfaciliteiten ter plaatse. Is er een klep nodig? |

### Sectie 4 — Uitzondering: exceptioneel transport

**Kop:** "Exceptioneel transport? Bel eerst even."
**Tekst:** "Bij niet-standaard maten of gewichten stemmen we graag eerst telefonisch de verwachtingen af. Zo voorkomen we verrassingen."
**CTA:** "Bel +31 6 1438 5060"

### Sectie 5 — Offerte-formulier

**Kop:** "Vraag direct een offerte aan"
**Subtekst:** "Vul onderstaande gegevens in. U ontvangt binnen 30 minuten een reactie."

**Velden:**

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

**Verzendknop:** "Offerte aanvragen"
**Onder formulier:** "Of bel direct: +31 6 1438 5060"

---

## Pagina: Over ( /over )

### Sectie 1 — Hero

**Kop-opties:**

1. "Persoonlijk transport — met Marc Caseley aan het roer"
2. "20+ jaar ervaring. Eén persoonlijk aanspreekpunt."

**Subtekst:** "Caseley Experience is opgericht in augustus 2018 door Marc Caseley. Met meer dan twee decennia ervaring in transport en logistiek staat persoonlijk contact centraal."

### Sectie 2 — Het verhaal

**Kop:** "Over Caseley Experience"

**Tekst (herschreven, alle feiten uit CONTENT_SOURCE):**
"Na 20+ jaar in de transport- en logistiekbranche richtte Marc Caseley in augustus 2018 Caseley Experience op. Het idee: wegtransport regelen zoals het hoort — snel, persoonlijk, en zonder omwegen.

Marc werkt met een uitgebreid netwerk van vervoerders, binnen en buiten Europa. Bij voorkeur werkt hij met Nederlandse vervoerders, voor langdurige en betrouwbare relaties.

De werkwijze is eenvoudig: korte communicatielijnen, kennis van zaken, een oplossingsgerichte aanpak, en persoonlijk contact bij elke zending.

De belofte: uw goederen komen op de meest veilige en vertrouwde manier op de plaats van bestemming aan. En dit voor een concurrerende prijs."

### Sectie 3 — Kernwaarden (grid van 4)

| Icoon | Waarde | Toelichting |
|-------|--------|-------------|
| Gesprek | Korte communicatielijnen | Geen omwegen — direct contact met Marc |
| Boek | Kennis van zaken | 20+ jaar ervaring in transport en logistiek |
| Puzzel | Oplossingsgerichte werkwijze | Altijd meedenken, altijd een passende oplossing |
| Handdruk | Persoonlijk contact | Eén vast aanspreekpunt voor elke zending |

### Sectie 4 — Belofte

**Kop:** "Onze belofte"
**Tekst:** "Uw goederen zullen op de meest veilige en vertrouwde manier op de plaats van bestemming aankomen. En dit voor een concurrerende prijs."
**Extra:** "We bieden ook on-site consultaties aan. Neem contact op om de mogelijkheden te bespreken."

### Sectie 5 — CTA

**Kop:** "Laten we samenwerken"
**CTA:** "Neem contact op" → /contact

---

## Pagina: Contact ( /contact )

### Sectie 1 — Hero

**Kop-opties:**

1. "Neem contact op met Caseley Experience"
2. "Wij horen graag van u"

**Subtekst:** "Bel, mail, of vul het formulier in. U ontvangt binnen een half uur een reactie."

### Sectie 2 — Twee-koloms layout

**Links:** QuoteForm (volledig offerte-formulier + tab "Stel een vraag" met kort formulier)
**Rechts:** ContactCard

| Gegeven | Waarde |
|---------|--------|
| Telefoon | +31 6 1438 5060 (tel-link) |
| E-mail | info@caseleyexperience.nl (mailto-link) |
| Adres | Oosthoutlaan 4, 2171 TZ Sassenheim |
| Bereikbaarheid | 24/7 |
| Reactietijd | Binnen 30 minuten |

### Sectie 3 — Bedrijfsgegevens

| Gegeven | Waarde |
|---------|--------|
| KvK | 72213388 |
| BTW | NL002060699B85 |
| IBAN | NL12RABO0331574551 |
| BIC | RABONL2U |

### Sectie 4 — Kaart (optioneel)

Google Maps embed met pin op Oosthoutlaan 4, Sassenheim.
Alleen als geen extra API-kosten of privacy-issues.

### Sectie 5 — Afsluitende tekst

"Ik kijk uit naar een prettige samenwerking." — Marc Caseley

---

## SEO-metadata per pagina

| Pagina | Title tag | Meta description |
|--------|-----------|------------------|
| Home | Caseley Experience — Wegtransport door heel Europa | Transport over de weg, snel en betrouwbaar. 24/7 bereikbaar, offerte binnen 30 minuten. 20+ jaar ervaring. |
| Diensten | Diensten — Caseley Experience | Complete ladingen, spoedzendingen, geconditioneerd en exceptioneel transport. Ontdek onze 7 transportdiensten. |
| Werkwijze | Werkwijze — Caseley Experience | Zo werkt een aanvraag. Deel uw transportbehoefte en ontvang binnen 30 minuten een offerte. |
| Over | Over ons — Caseley Experience | Marc Caseley: 20+ jaar ervaring in transport en logistiek. Persoonlijk contact, betrouwbaar netwerk. |
| Contact | Contact — Caseley Experience | Neem contact op: +31 6 1438 5060 of info@caseleyexperience.nl. Reactie binnen 30 minuten. |

## Schema.org (JSON-LD — alleen op Home)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Caseley Experience",
  "description": "Wegtransport door heel Europa",
  "founder": "Marc Caseley",
  "foundingDate": "2018-08",
  "telephone": "+31614385060",
  "email": "info@caseleyexperience.nl",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Oosthoutlaan 4",
    "postalCode": "2171 TZ",
    "addressLocality": "Sassenheim",
    "addressCountry": "NL"
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "areaServed": "Europe"
}
```
