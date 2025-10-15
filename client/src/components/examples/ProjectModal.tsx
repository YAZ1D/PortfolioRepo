import { useState } from "react";
import ProjectModal from "../ProjectModal";
import { PROJECTS } from "@/data/projects";

export default function ProjectModalExample() {
  const [project, setProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div className="p-6">
      <button
        onClick={() => setProject(PROJECTS[0])}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Project Modal
      </button>
      {project && (
        <ProjectModal
          project={project}
          onClose={() => setProject(null)}
        />
      )}
    </div>
  );
}
