import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  onOpen: (p: Project) => void;
};

function ProjectCard({ project, onOpen }: Props) {
  const previewImage = project.gallery[0];
  const impactStatement = project.bullets[0] ?? project.tagline;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/80 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-primary/35 hover:shadow-xl"
      aria-label={project.title}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col p-6 md:p-7">
        <div className="space-y-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            {project.tagline}
          </p>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {impactStatement}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.chips.slice(0, 6).map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors duration-300 group-hover:border-primary/25"
            >
              {chip}
            </span>
          ))}
          {project.chips.length > 6 && (
            <span className="rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
              +{project.chips.length - 6}
            </span>
          )}
        </div>

        <div className="mt-6">
          {previewImage ? (
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-muted/40">
              <div className="relative aspect-[16/10]">
                <img
                  src={previewImage.src}
                  alt={previewImage.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-background/10 to-transparent" />
              </div>
            </div>
          ) : (
            <div className="grid aspect-[16/10] place-items-center rounded-2xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
              Preview coming soon
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-6">
          <Button
            onClick={() => onOpen(project)}
            className="w-full justify-center sm:w-auto"
          >
            View Details
          </Button>

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.links.slice(0, 2).map((link) => (
                <Button
                  key={link.href}
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-background/60"
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              ))}
            </div>
          )}

          {!project.links.length && project.accessNote && (
            <p className="text-sm leading-6 text-muted-foreground">
              {project.accessNote}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default memo(ProjectCard);
