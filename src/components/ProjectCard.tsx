import type { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({ project, size = "md" }: { project: Project; size?: "sm" | "md" | "lg" }) {
  const padding = size === "lg" ? "p-8 sm:p-10" : size === "sm" ? "p-5" : "p-6 sm:p-7";
  const title = size === "lg" ? "text-3xl sm:text-4xl" : size === "sm" ? "text-lg" : "text-xl";

  const Wrapper: React.ElementType = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? { href: project.link, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative flex flex-col justify-between h-full ${padding} rounded-2xl bg-surface border border-border/60 hover:border-mint/50 transition-all duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: "radial-gradient(circle at top right, color-mix(in oklab, var(--mint) 12%, transparent), transparent 60%)" }} />

      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-xs uppercase tracking-widest text-mint font-medium">{project.year}</span>
          {project.link && (
            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-mint group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
          )}
        </div>
        <h3 className={`${title} font-display font-semibold mb-2`}>{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
      </div>

      <div className="relative flex flex-wrap gap-2 mt-5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground border border-border/40"
          >
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}
