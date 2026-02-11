interface Step {
  number: number;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    number: 1,
    title: "Deel uw transportbehoefte",
    description: "Bel, mail, of vul het formulier in met de gegevens van uw zending.",
  },
  {
    number: 2,
    title: "Wij zoeken de beste vervoerder",
    description:
      "Via ons netwerk schakelen we direct met vervoerders die bij uw zending passen.",
  },
  {
    number: 3,
    title: "Offerte binnen 30 minuten",
    description:
      "U ontvangt een scherpe offerte. Akkoord? Dan regelen wij de rest.",
  },
  {
    number: 4,
    title: "Uw zending wordt opgepakt",
    description: "Veilig, betrouwbaar, en op de afgesproken datum.",
  },
];

export default function ProcessSteps({
  steps,
}: ProcessStepsProps) {
  const displaySteps = steps || defaultSteps;

  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary lg:text-4xl">
            Van aanvraag tot levering
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Zo werkt het bij Caseley Experience.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displaySteps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { defaultSteps };
export type { Step };
