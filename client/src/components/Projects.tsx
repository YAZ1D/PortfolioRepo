import { useLocation } from "wouter";
import { FEATURED_PROJECT_IDS, PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SupportingProjectCard from "./SupportingProjectCard";
import type { Project } from "@/data/projects";

const ADDITIONAL_PROJECT_IDS = ["marketsim", "ml-education"] as const;

const ADDITIONAL_PROJECT_COPY = {
  marketsim: {
    title: "MarketSim Trading App",
    tagline: "Cross-platform product polish | Flutter + Firebase",
    impact:
      "Improved authentication, build stability, and content depth for a trading simulator across Android, iOS, and Web.",
  },
  "ml-education": {
    title: "Exam Performance Prediction",
    tagline: "Applied modeling | regression + KNN workflow",
    impact:
      "Built a reproducible Python workflow to model student performance and identify the factors most tied to exam outcomes.",
  },
} as const;

export default function Projects() {
  const [, navigate] = useLocation();
  const featuredProjects = FEATURED_PROJECT_IDS.map((id) =>
    PROJECTS.find((project) => project.id === id),
  ).filter((project): project is Project => Boolean(project));
  const additionalProjects = ADDITIONAL_PROJECT_IDS.map((id) => {
    const project = PROJECTS.find((entry) => entry.id === id);
    if (!project) return null;

    return {
      project,
      copy: ADDITIONAL_PROJECT_COPY[id],
    };
  }).filter(
    (
      item,
    ): item is {
      project: Project;
      copy: (typeof ADDITIONAL_PROJECT_COPY)[keyof typeof ADDITIONAL_PROJECT_COPY];
    } => Boolean(item),
  );

  const handleOpenProject = (project: Project) => {
    navigate(`/project/${project.id}`);
  };

  return (
    <section id="projects" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center md:mb-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-primary/80">
            Selected Work
          </p>
          <h2
            className="mb-4 text-3xl font-semibold md:text-4xl"
            data-testid="text-projects-heading"
          >
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Four case studies across transit operations, internal tools, event
            systems, and demographic analysis.
          </p>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={handleOpenProject}
            />
          ))}
        </div>

        <div className="mt-16 border-t border-border/70 pt-12 md:mt-20 md:pt-14">
          <div className="mb-8 max-w-2xl">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              Additional Projects
            </h3>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Two supporting builds that show product polish, applied modeling,
              and technical range.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {additionalProjects.map(({ project, copy }) => (
              <SupportingProjectCard
                key={project.id}
                project={project}
                title={copy.title}
                tagline={copy.tagline}
                impact={copy.impact}
                onOpen={handleOpenProject}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
