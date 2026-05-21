import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Eydokimos Petrakis" },
      { name: "description", content: "Selected projects by Eydokimos Petrakis — web apps, data pipelines, and embedded firmware." },
      { property: "og:title", content: "Projects — Eydokimos Petrakis" },
      { property: "og:description", content: "A selection of recent work across React, Python and C." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 sm:pt-24">
      <header className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-mint font-medium">Portfolio</span>
        <h1 className="mt-3 text-5xl sm:text-6xl font-display font-bold">Projects</h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          A working archive — full-stack web platforms, data tooling, and lower-level systems work.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
