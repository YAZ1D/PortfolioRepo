import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project, ProjectSection } from "@/data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  const contentSections: ProjectSection[] = [
    { title: "Overview", paragraphs: project.content.overview },
    ...(project.content.problem
      ? [{ title: "Problem", paragraphs: project.content.problem }]
      : []),
    ...(project.content.solution
      ? [{ title: "Solution", paragraphs: project.content.solution }]
      : []),
    ...(project.content.impact
      ? [{ title: "Impact", bullets: project.content.impact }]
      : []),
    ...(project.content.tools
      ? [{ title: "Tools", bullets: project.content.tools }]
      : []),
    ...(project.content.highlights
      ? [{ title: "Highlights", bullets: project.content.highlights }]
      : []),
    ...(project.content.sections ?? []),
  ];

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-md backdrop-brightness-75"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby={`project-title-${project.id}`}
    >
      <article
        className="my-8 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border/80 bg-card/95 text-card-foreground shadow-2xl ring-1 ring-border/60"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="border-b border-border/80 px-6 py-6 md:px-8 md:py-7">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                {project.tagline}
              </p>
              <h2
                id={`project-title-${project.id}`}
                className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                {project.title}
              </h2>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close project details"
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-medium text-foreground/80"
              >
                {chip}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-8 px-6 py-6 md:px-8 md:py-8">
          <div className="space-y-8">
            {contentSections.map((section, index) => (
              <section
                key={`${project.id}-${section.title}`}
                className={index === 0 ? "space-y-5" : "space-y-5 border-t border-border/80 pt-8"}
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {section.title}
                  </h3>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-3xl text-base leading-7 text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="space-y-3 pl-5 text-sm leading-7 text-muted-foreground marker:text-primary">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {section.orderedBullets && (
                  <ol className="space-y-3 pl-5 text-sm leading-7 text-muted-foreground marker:font-medium marker:text-foreground">
                    {section.orderedBullets.map((bullet) => (
                      <li key={bullet} className="list-decimal">
                        {bullet}
                      </li>
                    ))}
                  </ol>
                )}

                {section.codeBlocks && (
                  <div className="space-y-4">
                    {section.codeBlocks.map((block) => (
                      <div
                        key={`${section.title}-${block.title ?? block.language ?? "code"}`}
                        className="overflow-hidden rounded-2xl border border-border bg-muted/45"
                      >
                        {(block.title || block.language) && (
                          <div className="flex items-center justify-between border-b border-border/80 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            <span>{block.title ?? "Code"}</span>
                            {block.language && <span>{block.language}</span>}
                          </div>
                        )}
                        <pre className="overflow-x-auto px-4 py-4 text-sm leading-6 text-foreground">
                          <code>{block.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {section.note && (
                  <p className="rounded-2xl border border-border/80 bg-background/70 px-4 py-4 text-sm leading-6 text-muted-foreground">
                    {section.note}
                  </p>
                )}
              </section>
            ))}

            {project.content.note && (
              <section className="border-t border-border/80 pt-8">
                <p className="rounded-2xl border border-border/80 bg-background/70 px-4 py-4 text-sm leading-6 text-muted-foreground">
                  {project.content.note}
                </p>
              </section>
            )}
          </div>

          {project.gallery.length > 0 && (
            <section className="border-t border-border/80 pt-8">
              <div className="mb-4 space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  Gallery
                </h3>
                <p className="text-sm text-muted-foreground">
                  Supporting visuals and screenshots from the project.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.gallery.map((item, index) => (
                  <div
                    key={item.src}
                    className="overflow-hidden rounded-2xl border border-border bg-muted/35"
                  >
                    <img
                      src={item.src}
                      alt={item.alt || `${project.title} visual ${index + 1}`}
                      className="h-56 w-full object-cover sm:h-64"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {(project.links.length > 0 || project.accessNote) && (
            <section className="border-t border-border/80 pt-8">
              <div className="mb-4 space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {project.links.length > 0 ? "Related Links" : "Project Access"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.links.length > 0
                    ? "External resources, writeups, and project artifacts."
                    : "This project is intentionally shown as a private internal build."}
                </p>
              </div>

              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <Button
                      key={link.href}
                      variant="outline"
                      asChild
                      className="bg-background/70"
                    >
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              )}

              {!project.links.length && project.accessNote && (
                <p className="rounded-2xl border border-border/80 bg-background/70 px-4 py-4 text-sm leading-6 text-muted-foreground">
                  {project.accessNote}
                </p>
              )}
            </section>
          )}
        </div>

        <footer className="flex justify-end border-t border-border/80 px-6 py-5 md:px-8">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </footer>
      </article>
    </div>
  );
}
