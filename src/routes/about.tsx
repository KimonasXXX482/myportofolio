import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Eydokimos Petrakis" },
      { name: "description", content: "About Eydokimos Petrakis, Full Stack Developer working with React, Python and C." },
      { property: "og:title", content: "About — Eydokimos Petrakis" },
      { property: "og:description", content: "Full Stack Developer based in Greece, partnered with 2GreekDevs." },
    ],
  }),
  component: AboutPage,
});

const skills = [
  { group: "Frontend", items: ["HTML", "TailwindCSS", "JavaScript", "React"] },
  { group: "Backend", items: ["Python", "Node.js", "REST APIs"] },
  { group: "Systems", items: ["C", "Embedded", "Linux"] },
];

function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 sm:pt-24">
      <span className="text-xs uppercase tracking-widest text-mint font-medium">About</span>
      <h1 className="mt-3 text-5xl sm:text-6xl font-display font-bold">
        Hey, I'm Eydokimos.
      </h1>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-5 text-lg text-muted-foreground leading-relaxed">
          <p>
            I'm a <span className="text-foreground font-medium">Full Stack Developer</span> who
            cares about clean architecture, sharp UI, and software that feels considered.
          </p>
          <p>
            I move comfortably between the browser and the metal — from React interfaces and
            Tailwind design systems to Python data work and C systems programming.
          </p>
          <p>
            Today, I'm helping ship product at{" "}
            <a href="https://2greekdevs.gr" target="_blank" rel="noreferrer" className="text-mint hover:underline">
              2GreekDevs
            </a>
            , a Greek developer collective building digital products for startups and
            growing teams.
          </p>
        </div>

        <aside className="space-y-6">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="text-sm uppercase tracking-widest text-mint mb-3">{g.group}</h3>
              <ul className="space-y-1.5">
                {g.items.map((s) => (
                  <li key={s} className="text-foreground">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
