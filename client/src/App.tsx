// client/src/App.tsx
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import ProjectModal from "@/components/ProjectModal";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/projects";

type ProjectRouteParams = {
  id: string;
};

function ProjectRoute({ params }: { params: ProjectRouteParams }) {
  const [, navigate] = useLocation();

  const project: Project | undefined = PROJECTS.find(
    (p) => p.id === params.id,
  );

  // If no project matches this id, show NotFound
  if (!project) {
    return <NotFound />;
  }

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      {/* Full homepage in the background */}
      <Home />
      {/* Modal overlay on top */}
      <ProjectModal project={project} onClose={handleClose} />
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/project/:id" component={ProjectRoute} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
