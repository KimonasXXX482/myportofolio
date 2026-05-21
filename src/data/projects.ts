export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "2greekdevs-platform",
    title: "More info",
    description:
      "Full-stack web platform for a developer collective — services, portfolio, and client onboarding flows.",
    tags: ["React", "TailwindCSS", "Node.js"],
    year: "2025",
    link: "https://2greekdevs.gr",
    featured: true,
  },
  {
    slug: "portfolio-site",
    title: "Personal Portfolio",
    description:
      "This site. A bento-style portfolio built with TanStack Start, React 19, and a custom design system.",
    tags: ["TanStack Start", "React", "Tailwind v4"],
    year: "2025",
  },
  {
    slug: "data-pipeline",
    title: "Python Data Pipeline",
    description:
      "ETL pipeline processing millions of rows daily with Pandas, scheduled via cron and monitored with custom dashboards.",
    tags: ["Python", "Pandas", "PostgreSQL"],
    year: "2024",
  },
  {
    slug: "embedded-firmware",
    title: "Embedded Sensor Firmware",
    description:
      "Low-level C firmware for an IoT sensor array — efficient memory management and real-time data acquisition.",
    tags: ["C", "Embedded", "IoT"],
    year: "2024",
  },
  {
    slug: "react-component-lib",
    title: "React Component Library",
    description:
      "Internal design-system library with 40+ accessible components, full TypeScript support, and Storybook docs.",
    tags: ["React", "TypeScript", "Storybook"],
    year: "2023",
  },
];
