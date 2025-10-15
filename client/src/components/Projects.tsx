// client/src/components/Projects.tsx
import { useState, useRef, useEffect } from "react";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "@/data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroller = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const cardWidthRef = useRef<number>(384); // fallback (min-w-[360]+~24 gap)

  // Measure the card width on mount
  useEffect(() => {
    const measure = () => {
      const card = firstCardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();

      // Add gap from flex container
      const parent = card.parentElement;
      let gap = 0;
      if (parent) {
        const cs = window.getComputedStyle(parent);
        const g = parseFloat(cs.columnGap || cs.gap || "0");
        gap = Number.isFinite(g) ? g : 0;
      }
      cardWidthRef.current = Math.round(rect.width + gap);
    };

    measure();
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll function
  const scrollByCards = (n: number) => {
    const el = scroller.current;
    if (!el) return;
    const dx = n * cardWidthRef.current;
    const target = Math.max(
      0,
      Math.min(el.scrollLeft + dx, el.scrollWidth - el.clientWidth),
    );
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  // Track scroll to toggle arrow visibility
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const atStart = scrollLeft <= 10;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 10;
      setShowLeftArrow(!atStart);
      setShowRightArrow(!atEnd);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="projects" className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            data-testid="text-projects-heading"
          >
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing expertise in automation,
            visualization, and data analytics
          </p>
        </div>

        <div className="relative">
          {/* Left arrow */}
          {showLeftArrow && (
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByCards(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 hover:bg-background border border-border px-3 py-2 backdrop-blur-sm transition-all duration-300"
              data-testid="button-scroll-left"
            >
              ‹
            </button>
          )}

          {/* Right arrow */}
          {showRightArrow && (
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByCards(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 hover:bg-background border border-border px-3 py-2 backdrop-blur-sm transition-all duration-300"
              data-testid="button-scroll-right"
            >
              ›
            </button>
          )}

          {/* Manual scroller */}
          <div
            ref={scroller}
            className="no-scrollbar overflow-x-auto scroll-smooth snap-x snap-mandatory pr-2 pl-1 overscroll-x-contain"
            role="region"
            aria-label="Projects carousel"
            tabIndex={0}
          >
            <div className="flex gap-6 py-2 flex-nowrap">
              {PROJECTS.map((project, idx) => (
                <div
                  key={project.id}
                  className="snap-start shrink-0 min-w-[360px]"
                  ref={idx === 0 ? firstCardRef : undefined}
                >
                  <ProjectCard project={project} onOpen={setSelectedProject} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
