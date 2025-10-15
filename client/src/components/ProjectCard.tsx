import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  onOpen: (p: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  const media = project.media ?? [];
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);

  // preload
  useEffect(() => {
    media.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [media]);

  // rotate every 3s
  useEffect(() => {
    if (media.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIdx(i => (i + 1) % media.length);
    }, 3000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [media.length]);

  const pause = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
  };
  const resume = () => {
    if (media.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIdx(i => (i + 1) % media.length);
    }, 3000);
  };

  const heroSrc = useMemo(() => media[idx] ?? "", [media, idx]);

  return (
    <article 
      className="rounded-2xl border border-gray-700 bg-gray-900 text-gray-100 overflow-hidden h-full flex flex-col"
      aria-label={project.title}
    >
      {/* slideshow */}
      <div
        onMouseEnter={pause}
        onMouseLeave={resume}
        className="relative h-40 md:h-48 w-full bg-gray-800"
      >
        {heroSrc ? (
          <img
            src={heroSrc}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-gray-400 text-sm">
            No image yet
          </div>
        )}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* body */}
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="text-gray-300">{project.tagline}</p>

        <ul className="list-disc pl-5 space-y-1 text-gray-300">
          {project.bullets.slice(0, 2).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.chips.slice(0, 6).map((c, i) => (
            <span key={i} className="px-2 py-1 rounded-md border border-gray-700 bg-gray-800 text-xs">
              {c}
            </span>
          ))}
          {project.chips.length > 6 && (
            <span className="px-2 py-1 rounded-md border border-gray-700 bg-gray-800 text-xs">
              +{project.chips.length - 6}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-2">
          <button
            onClick={() => onOpen(project)}
            className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20 transition"
          >
            View Details
          </button>

          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-white/10 bg-transparent px-3 py-1.5 text-xs hover:bg-white/10 transition"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
