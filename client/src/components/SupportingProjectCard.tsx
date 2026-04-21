import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  title: string;
  tagline: string;
  impact: string;
  onOpen: (project: Project) => void;
};

function SupportingProjectCard({
  project,
  title,
  tagline,
  impact,
  onOpen,
}: Props) {
  return (
    <article className="rounded-[1.5rem] border border-border/70 bg-background/55 p-5 shadow-sm transition-colors duration-300 hover:border-primary/25 hover:bg-background/75">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {tagline}
        </p>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          {impact}
        </p>
      </div>

      <div className="mt-5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpen(project)}
          className="bg-background/70"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}

export default memo(SupportingProjectCard);
