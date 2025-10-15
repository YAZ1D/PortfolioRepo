import type { Project } from "@/data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
      <article className="w-full max-w-5xl bg-gray-900 border border-gray-700 rounded-2xl text-gray-100">
        <header className="flex items-start justify-between p-5 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p className="text-gray-300">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-gray-700 px-3 py-1 hover:bg-gray-800"
            aria-label="Close project details"
          >
            ✕
          </button>
        </header>

        {/* 1) TEXT FIRST */}
        <div className="prose prose-invert max-w-none p-5">
          {/* Keep images OUT of modal.html to avoid duplicates */}
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: project.modal.html }} />
        </div>

        {/* 2) GALLERY AFTER THE TEXT */}
        {project.media && project.media.length > 0 && (
          <section className="p-5 pt-0">
            <h3 className="text-lg font-semibold mb-3">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.media.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} visual ${i + 1}`}
                  className="w-full h-56 sm:h-64 object-cover rounded-xl border border-gray-700"
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}

        {/* 3) EXTERNAL LINKS - only show if links exist */}
        {project.links && project.links.length > 0 && (
          <section className="p-5 pt-0">
            <div className="flex flex-wrap gap-3">
              {project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 hover:bg-gray-700 transition"
                >
                  {link.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
