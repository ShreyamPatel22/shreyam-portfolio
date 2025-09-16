export type Project = {
    title: string;
    blurb: string;
    tags: string[];
    repo?: string;
    demo?: string;
};

export function ProjectCard({ title, blurb, tags, repo, demo }: Project) {
    return (
      <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{blurb}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          {repo && (
            <a className="text-sm underline" href={repo} target="_blank">
              Code
            </a>
          )}
          {demo && (
            <a className="text-sm underline" href={demo} target="_blank">
              Live
            </a>
          )}
        </div>
      </article>
    );
}