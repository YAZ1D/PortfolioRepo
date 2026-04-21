const snapshotItems = [
  {
    eyebrow: "Dashboards & Reporting",
    title: "Business-facing reporting built for real operational use",
    summary:
      "I build dashboards, KPI views, and structured reporting layers that help teams track operations, monitor performance, and make clearer decisions.",
    labels: ["MetroLINK", "Power BI / Tableau", "Operational reporting"],
    note:
      "Strongest when the work needs business relevance, consistent reporting, and usable outputs instead of one-off analysis.",
  },
  {
    eyebrow: "Automation & Workflows",
    title: "Repeatable systems that reduce manual work",
    summary:
      "I connect scripts, ETL steps, validation, and data movement into workflows that are easier to run, easier to trust, and easier to maintain.",
    labels: ["Python", "SQL / ETL", "Workflow automation"],
    note:
      "The focus is not automation for its own sake. It is automation that improves reporting quality, speed, and operational consistency.",
  },
  {
    eyebrow: "Internal Tools & Systems",
    title: "Structured tools shaped around messy real-world needs",
    summary:
      "I translate stakeholder needs into systems for tracking, validation, observations, and day-to-day operational work, with usability kept in view from the start.",
    labels: ["DAJAJ LLC", "Stakeholder-driven", "Operational systems"],
    note:
      "This is where systems thinking matters most: turning unclear workflows into tools people can actually use.",
  },
  {
    eyebrow: "Product-Style Delivery",
    title: "End-to-end execution when software and workflow meet",
    summary:
      "When the problem needs both interface and logic, I can deliver the full stack: application flows, data-backed features, integrations, and deployment-ready experiences.",
    labels: ["React / Next.js", "Supabase / APIs", "Deployment-ready"],
    note:
      "Useful for internal tools, conference workflows, dashboard layers, and other practical software with clear operational value.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/35 p-6 shadow-sm backdrop-blur-sm md:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-70" />

          <div className="relative">
            <div className="max-w-3xl space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/80">
                Experience Snapshot
              </p>
              <h2
                className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                data-testid="text-about-heading"
              >
                What I build when the work needs structure, usability, and real-world follow-through.
              </h2>
              <p className="text-base leading-7 text-muted-foreground md:text-lg">
                This portfolio is strongest as proof of practical systems work:
                reporting that supports decisions, automation that reduces
                repetitive effort, and tools that turn operational needs into
                usable software.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2">
              {snapshotItems.map((item) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-background/75 p-5 shadow-sm transition-colors duration-300 hover:border-primary/25 md:p-6"
                >
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    <div className="space-y-4">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        {item.eyebrow}
                      </p>
                      <h3 className="max-w-[24rem] text-2xl font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-muted-foreground md:text-[0.98rem]">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.labels.map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-border/80 bg-card/80 px-3 py-1 text-xs font-medium text-foreground/80"
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    <p className="mt-6 border-t border-border/80 pt-4 text-sm leading-6 text-foreground/85">
                      {item.note}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
