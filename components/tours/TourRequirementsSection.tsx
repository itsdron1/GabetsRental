function RequirementCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-2xl border border-border bg-glass p-5 md:p-6">
      <h3 className="font-head text-base font-bold text-cream md:text-lg">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
            <span className="min-w-0 flex-1 text-sm leading-[1.7] text-cream/85">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

type TourRequirementsSectionProps = {
  safetyRequirements: string[];
  riderRequirements: string[];
};

export default function TourRequirementsSection({
  safetyRequirements,
  riderRequirements,
}: TourRequirementsSectionProps) {
  return (
    <>
      <section className="bg-surface py-12 md:py-14">
        <div className="section-inner">
          <RequirementCard title="Safety Requirements" items={safetyRequirements} />
        </div>
      </section>
      <section className="bg-[#070b10] py-12 md:py-14">
        <div className="section-inner">
          <RequirementCard title="Rider Requirements" items={riderRequirements} />
        </div>
      </section>
    </>
  );
}
