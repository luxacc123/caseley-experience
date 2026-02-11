const items = [
  {
    label: "Gewenste laad- en losdag",
    description: "Wanneer moet het opgehaald en afgeleverd worden?",
  },
  {
    label: "Laadplaats en losplaats",
    description: "Volledig adres van ophaal- en afleverlocatie.",
  },
  {
    label: "Goederenbeschrijving",
    description: "Wat wordt er vervoerd? Afmetingen en gewicht.",
  },
  {
    label: "Faciliteiten",
    description: "Laad- en losfaciliteiten ter plaatse. Is er een klep nodig?",
  },
];

export default function ChecklistBlock() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary lg:text-4xl">
            Dit hebben wij nodig voor uw offerte
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Zorg dat u deze gegevens bij de hand heeft voor een snelle
            afhandeling.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={item.label}
              className="flex gap-4 rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-primary">{item.label}</h3>
                <p className="mt-1 text-sm text-text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
