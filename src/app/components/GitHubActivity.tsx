type PushCommit = { message?: string };
type PushPayload = { commits?: PushCommit[] };

type Event = {
  type: string;
  created_at: string;
  repo?: { name: string };
  payload?: PushPayload;
};

async function getEvents(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}/events/public`,
    {
      headers: { "User-Agent": "shreyam-portfolio" },
      next: { revalidate: 3600 }, 
    }
  );
  if (!res.ok) return [];
  const all = (await res.json()) as Event[];
  return all.filter((e) => e.type === "PushEvent").slice(0, 5);
}

export async function GitHubActivity() {
  const username = process.env.GITHUB_USERNAME || "your-github-username";
  const pushes = await getEvents(username);

  if (!pushes.length)
    return (
      <p className="mt-3 text-sm text-gray-600">
        No recent pushes (or username not set).
      </p>
    );

  return (
    <ul className="mt-4 space-y-2">
      {pushes.map((e, i) => {
        const repo = e.repo?.name ?? "repo";
        const commitMsg = e.payload?.commits?.[0]?.message?.slice(0, 140) ?? "";
        return (
          <li key={i} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm">
              <span className="font-medium">{repo}</span>{" "}
              <span className="text-gray-500">
                — {new Date(e.created_at).toLocaleString()}
              </span>
            </div>
            {commitMsg && (
              <div className="mt-1 text-sm text-gray-700">“{commitMsg}”</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
