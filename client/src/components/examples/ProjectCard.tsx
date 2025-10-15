import ProjectCard from "../ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function ProjectCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <ProjectCard
        project={PROJECTS[0]}
        onOpen={(project) => console.log("Open modal for:", project.title)}
      />
    </div>
  );
}
