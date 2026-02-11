export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  ctaLabel: string;
  ctaHref: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "complete-ladingen",
    name: "Complete ladingen",
    shortDescription: "Hele vrachtwagen, direct geladen en doorgezet.",
    fullDescription:
      "Een hele vrachtwagen, volledig voor uw zending. Direct geladen en doorgezet — zonder overladen. De snelste en veiligste optie voor grote volumes.",
    ctaLabel: "Offerte aanvragen voor een complete lading",
    ctaHref: "/contact",
    icon: "truck",
  },
  {
    id: "deelpartijen",
    name: "Deelpartijen",
    shortDescription: "Gedeelte van de wagen, voorhalen en overladen.",
    fullDescription:
      "Geen volledige vrachtwagen nodig? Wij regelen een gedeelte van de wagen. Uw goederen worden voorgehaald en overgeladen — efficiënt en kostenbesparend.",
    ctaLabel: "Offerte aanvragen voor een deelpartij",
    ctaHref: "/contact",
    icon: "package",
  },
  {
    id: "koeriersdiensten",
    name: "Koeriersdiensten",
    shortDescription: "Groot of klein, direct weggereden.",
    fullDescription:
      "Groot of klein — een koerier wordt direct weggereden. De snelste mogelijkheid om uw zending te verplaatsen.",
    ctaLabel: "Offerte aanvragen voor een koeriersdienst",
    ctaHref: "/contact",
    icon: "zap",
  },
  {
    id: "spoedzendingen",
    name: "Spoedzendingen",
    shortDescription: "Supersnelle service, levering binnen 2 dagen.",
    fullDescription:
      "Specialist in spoedzendingen met supersnelle service. Of het nu Praag, Helsinki, Stockholm, Barcelona of Milaan is — wij leveren binnen 2 dagen.",
    ctaLabel: "Spoed? Bel direct: +31 6 1438 5060",
    ctaHref: "tel:+31614385060",
    icon: "clock",
  },
  {
    id: "groupage",
    name: "Groupage diensten",
    shortDescription: "Hub naar hub, ideaal zonder haast.",
    fullDescription:
      "Uw goederen worden voorgehaald en vervoerd van hub naar hub. Ideaal voor zendingen zonder haast — scherpe tarieven, betrouwbare planning.",
    ctaLabel: "Offerte aanvragen voor groupage",
    ctaHref: "/contact",
    icon: "layers",
  },
  {
    id: "geconditioneerd",
    name: "Geconditioneerd transport",
    shortDescription: "Transport op temperatuur: +20 tot -8 graden.",
    fullDescription:
      "Transport op de gewenste temperatuur. Van +20 tot -8 graden — uw temperatuurgevoelige goederen in de beste condities.",
    ctaLabel: "Offerte aanvragen voor geconditioneerd transport",
    ctaHref: "/contact",
    icon: "thermometer",
  },
  {
    id: "exceptioneel",
    name: "Exceptioneel transport",
    shortDescription: "Niet-standaard maten en gewichten.",
    fullDescription:
      "Niet-standaard maten of gewichten? Wij regelen transport voor ladingen tot 3 meter breed en 18 meter lang. Neem eerst telefonisch contact op zodat we de verwachtingen kunnen afstemmen.",
    ctaLabel: "Bel voor exceptioneel transport: +31 6 1438 5060",
    ctaHref: "tel:+31614385060",
    icon: "maximize",
  },
];
