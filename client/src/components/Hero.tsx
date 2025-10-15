import { Button } from "@/components/ui/button";
import { LINKS } from "@/config/links";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" data-testid="text-hero-name">
          Yazid Mouayn
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-tagline">
          Computer Science, Data Science, and Applied Math Graduate
        </p>
        
        <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
          Specializing in automation, real-time visualization, and analytics integration
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            onClick={scrollToProjects}
            data-testid="button-view-projects"
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            asChild
            data-testid="button-resume"
          >
            <a href={LINKS.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
