//import type { Project } from "@/app/components/ProjectCard";
export interface Project {
  title: string;
  description: string;
  tags: string[];
  highlights?: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "LifeLens – AI Emergency Response",
    description:
      "Image hazard analysis + alerts. DETR-based inference API, secure auth, real-time notifications.",
    tags: ["React", "Tailwind", "FastAPI", "Firebase"],
    highlights: ["Role-based access + 2FA", "Realtime alerts", "CI/CD"],
    repo: "https://github.com/ShreyamPatel22/lifelens-stack",
    demo: "https://lifelens.<domain>", // TODO: replace
    featured: true,
  },
  {
    title: "Kithli – Member Booking Flow",
    description:
      "Date/Time → Facilities → Trip → Nearby Kiths. State persisted with react-hook-form. Figma-match UI.",
    tags: ["Next.js", "Go API", "Maps", "React Hook Form"],
    highlights: ["Search component", "Geo distance", "Pixel-perfect"],
    repo: "https://github.com/<you>/kithli", // TODO: replace
    demo: "https://kithli.<domain>", // TODO: replace
  },
  {
    title: "Secure Login System",
    description:
      "Membership-tier vault access, RBAC, sessions, TOTP 2FA, production SQL seed data.",
    tags: ["Python", "FastAPI", "SQL", "2FA"],
    highlights: ["RBAC", "Session mgmt", "Prod SQL scripts"],
    repo: "https://github.com/<you>/secure-login", // TODO: replace
  },
];
