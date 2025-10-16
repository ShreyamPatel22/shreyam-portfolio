import { Code2, Globe } from "lucide-react";

export type Project = {
    title: string;
    description: string;
    tags: string[];
    repo?: string;
    demo?: string;
    highlights?: string[];
    featured?: boolean;
};
export function ProjectCard({ title, description, tags, repo, demo, highlights }: Project) {
    return (
      <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700">
              {t}
            </span>
          ))}
        </div>

        {highlights && highlights.length > 0 && (
          <ul className = "mt-3 text-sn text-gray-700 space-y-1">
            {highlights.map((h) => (
              <li key={h}> * {h}</li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex gap-4">
          {repo && (
            <a 
              className="inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:no-underline" 
              href={repo} 
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${title}`}
              >
            <Code2 size={14} /> Code
            </a>
          )}
          {demo && (
            <a 
              className="inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:no-underline" 
              href={demo} 
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${title}`}
              >
              <Globe size={14} /> Live
            </a>
          )}
        </div>
      </article>
    );
}