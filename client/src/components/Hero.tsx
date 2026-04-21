import { Button } from "@/components/ui/button";
import { LINKS } from "@/config/links";
import { ArrowRight, FileText } from "lucide-react";

const trustIndicators = [
  {
    label: "Selected work",
    value: "Transit, internal tools, event systems",
  },
  {
    label: "Core focus",
    value: "Dashboards, automation, structured workflows",
  },
  {
    label: "Delivery stack",
    value: "SQL, Python, BI, React",
  },
];

const focusAreas = [
  {
    label: "Reporting",
    value: "Dashboards, KPI layers, and analysis workflows designed to support real operational decisions.",
  },
  {
    label: "Automation",
    value: "Repeatable ETL, scripting, and workflow tooling that reduces manual effort and improves reliability.",
  },
  {
    label: "Delivery",
    value: "Internal tools and public-facing products built with structure, usability, and follow-through in mind.",
  },
];

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-10 md:pb-24 md:pt-14 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-[70%] rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/40 p-6 shadow-sm backdrop-blur-sm md:p-8 lg:p-12">
          <div className="absolute inset-y-0 right-[37%] hidden w-px bg-border/70 lg:block" />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-border/80 bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                {"Data \u00b7 Automation \u00b7 Systems"}
              </div>

              <div className="space-y-5">
                <p
                  className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground"
                  data-testid="text-hero-name"
                >
                  Yazid Mouayn
                </p>

                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                  Data, automation, and internal systems for real operations.
                </h1>

                <p
                  className="max-w-2xl text-xl leading-relaxed text-foreground/90 md:text-2xl"
                  data-testid="text-hero-tagline"
                >
                  I build dashboards, ETL workflows, and practical software that
                  make reporting clearer, faster, and easier to run.
                </p>

                <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  My work sits between analytics, automation, and product delivery
                  {" \u2014 "}from KPI reporting and data workflows to stakeholder-driven
                  internal tools and public-facing platforms.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={scrollToProjects}
                  data-testid="button-view-projects"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  data-testid="button-resume"
                  className="bg-background/70"
                >
                  <a href={LINKS.resume} target="_blank" rel="noreferrer">
                    Resume
                    <FileText className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div
                id="impact"
                className="grid gap-3 pt-2 sm:grid-cols-3"
              >
                {trustIndicators.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border/80 bg-background/70 px-4 py-4 shadow-sm"
                  >
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base font-semibold tracking-tight text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="relative">
              <div className="rounded-[1.75rem] border border-border/80 bg-background/75 p-6 shadow-sm md:p-7">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                      Current Focus
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                      Operational systems with clear business value.
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {focusAreas.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-border/70 bg-card/75 p-4"
                      >
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-foreground/90">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
