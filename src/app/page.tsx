import Link from "next/link";
import { projects } from "@/app/data/projects";
import { ProjectCard } from "@/app/components/ProjectCard";
import { GitHubActivity } from "@/app/components/GitHubActivity";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { SignatureUnderline } from "@/app/components/SignatureUnderline";
import { Reveal } from "@/app/components/Reveal";
import { SITE } from "@/app/data/site";
import { ProjectsGrid } from "@/app/components/ProjectsGrid";
import { HeroTitle } from "@/app/components/HeroTitle";
import { IntroSplash } from "@/app/components/IntroSplash";


const container = { show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35} } };



export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <IntroSplash />
      <ScrollProgress />
      <Reveal> 
        <section className="mx-auto max-w-5xl px-6 py-16">
          <p className="text-sm tracking-wide uppercase text-gray-500">Hello, I’m</p>
            {/* <h1 className="mt-1 text-4xl font-bold sm:text-5xl">Shreyam Patel</h1>
            <SignatureUnderline /> */}
            <HeroTitle name = "Shreyam Patel" />
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Full-stack developer focused on clean UIs, secure backends, and shipping features that matter.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="#projects" className="rounded-2xl px-4 py-2 bg-black text-white hover:opacity-90">
                Projects
              </Link>
              <Link href="/Shreyam_Patel_Resume.pdf" className="rounded-2xl px-4 py-2 border border-gray-300 hover:bg-gray-100">
                Resume
              </Link>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="projects" className="mx-auto max-w-5xl px-6 py-10">
            <h2 className="text-2xl font-semibold">Selected Projects</h2>
            <p className="mt-1 text-sm text-gray-500">Built for internships, classes, and side projects.</p>
            <ProjectsGrid projects={projects} />  
          </section>
        </Reveal>

      <Reveal>
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Latest GitHub Activity</h2>
          <p className="mt-1 text-sm text-gray-500">Auto-updates hourly (free, no token).</p>
            <GitHubActivity />
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SITE.skills.map((s) => (
              <span key={s} className="rounded-full border px-3 py-1 text-sm">
                {s}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="projects" className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="text-2xl font-semibold">Selected Projects</h2>
          <p className="mt-1 text-sm text-gray-500">
            Built for internships, classes, and side projects.
          </p>
          <ProjectsGrid projects={projects} />
        </section>
      </Reveal>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-semibold">Get in touch</h2>
        <p className="mt-2 text-gray-600">Email me or book a quick intro call.</p>
        <div className="mt-4 flex gap-3">
          <a href="mailto:janmesh.v.shroff@gmail.com" className="rounded-2xl px-4 py-2 bg-black text-white hover:opacity-90">
            Email
          </a>
          <a href="https://cal.com/" target="_blank" className="rounded-2xl px-4 py-2 border border-gray-300 hover:bg-gray-100">
            Schedule
          </a>
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Shreyam Patel · Built with Next.js & Tailwind
      </footer>
    </main>

  )
}