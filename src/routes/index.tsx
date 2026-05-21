import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectCard } from "@/components/ProjectCard";
import { FeedbackSection } from "@/components/FeedbackSection";
import { projects } from "@/data/projects";
import { ArrowRight, Code2, Sparkles, Star, Terminal } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eydokimos Petrakis — Full Stack Developer" },
      { name: "description", content: "Full Stack Developer crafting modern web apps with React, Python and C." },
    ],
  }),
  component: Index,
});

const skills = ["HTML", "TailwindCSS", "JavaScript", "React", "Python", "C"];

function Index() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 sm:pt-24">
      {/* HERO */}
      <section className="relative">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mint font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-mint animate-glow" />
          Available for new projects
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold leading-[0.95] max-w-5xl">
          Full Stack Developer<br />
          building <span className="text-mint">clean</span>,<br />
          <span className="italic font-light">considered</span> software.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          I'm <span className="text-foreground font-medium">Eydokimos Petrakis</span> — a developer
          working across the stack with React, Python and C. Currently helping ship product at
          a Greek dev studio.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[image:var(--gradient-mint)] text-primary-foreground font-medium hover:shadow-[var(--shadow-glow)] transition-shadow"
          >
            See my work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-mint/60 text-foreground font-medium transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="mt-24 sm:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
        {/* Skills */}
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 p-7 rounded-2xl bg-surface border border-border/60 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-mint text-sm">
            <Code2 className="w-4 h-4" /> Toolkit
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold mb-5">
              Pragmatic stack, used end-to-end.
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-lg bg-muted/60 border border-border/40 text-sm font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2GreekDevs — hidden */}
        <div className="hidden"></div>

        <div className="p-6 rounded-2xl bg-surface border border-border/60 flex flex-col justify-between">
          <Terminal className="w-5 h-5 text-mint" />
          <div>
            <div className="text-3xl font-display font-bold">5+</div>
            <div className="text-sm text-muted-foreground">Years writing code</div>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border/60 flex flex-col justify-between">
          <Sparkles className="w-5 h-5 text-mint" />
          <div>
            <div className="text-3xl font-display font-bold">20+</div>
            <div className="text-sm text-muted-foreground">Shipped projects</div>
          </div>
        </div>
        <div className="sm:col-span-2 p-6 rounded-2xl bg-surface border border-border/60 flex flex-col justify-between gap-3">
          <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-mint text-mint" />
            ))}
            <span className="ml-2 text-xs uppercase tracking-widest text-muted-foreground">Client feedback</span>
          </div>
          <p className="text-base sm:text-lg leading-relaxed">
            <span className="text-mint">"</span>
            Eydokimos delivered beyond expectations — clean code, sharp eye, and a calm process from start to ship.
            <span className="text-mint">"</span>
          </p>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mt-24 sm:mt-32">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-mint font-medium">Selected work</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mt-2">Recent projects</h2>
          </div>
          <Link to="/projects" className="text-sm text-mint hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-fr">
          {featured.map((p) => (
            <div key={p.slug} className="lg:col-span-2 lg:row-span-2">
              <ProjectCard project={p} size="lg" />
            </div>
          ))}
          {rest.slice(0, 2).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* FEEDBACK */}
      <FeedbackSection />
    </div>
  );
}
