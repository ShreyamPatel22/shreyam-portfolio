import type { Project } from "@/app/components/ProjectCard";

export const projects: Project[] = [
  {
    title: "Kithli — Member Booking Flow",
    blurb:
      "Built core booking screens (Select Date/Time → Facilities → Kith selection) with React + TypeScript; state persisted via react-hook-form; pixel-perfect Figma alignment.",
    tags: ["React", "TypeScript", "UI/UX", "Figma"],
    repo: "https://github.com/", // TODO: replace
  },
  {
    title: "Lifeful Habits — Secure Login",
    blurb:
      "Designed login with Google OAuth 2.0, 2FA, role-based access, and dynamic Vault permissions. SQL schema with real product data.",
    tags: ["FastAPI", "SQL", "OAuth2", "2FA"],
    repo: "https://github.com/", // TODO: replace
  },
  {
    title: "Personal Finance Tracker",
    blurb:
      "C# WinForms app to log expenses, show category analytics, and export to CSV/Excel.",
    tags: ["C#", "WinForms", "Data Viz"],
    repo: "https://github.com/", // TODO: replace
  },
  {
    title: "WGU D287 — Spring Boot Inventory",
    blurb:
      "Customized UI, min/max validation, Buy Now flow, sample data, and unit tests.",
    tags: ["Java", "Spring Boot", "JUnit"],
    repo: "https://github.com/", // TODO: replace
  },
];
