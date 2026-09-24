const certs = [
  ["Python programming certificate", "Skip", "Nobody hiring a Java SDE II is screening for it. Three focused weekends of Python inside the copilot project teach the syntax you will actually type."],
  ["Azure AI-900", "Skip", "Vocabulary for non-builders. Walmart mentions Azure, but a weekend in the docs while you deploy beats the badge."],
  ["AWS Cloud Practitioner", "Skip", "Too shallow for a software engineer loop. It does not substitute for Docker, Postgres, or an outbox."],
  ["AWS AI Practitioner", "Optional, week 15", "About $100 and a few evenings. It checks whether you can say what Bedrock and RAG are. It does not check whether you can build them. Take it only after project 2 has an eval score in the README."],
  ["LangChain or agentic certificates", "Skip", "The repo is the certificate. Hiring managers who tried credential-heavy candidates and then a live RAG walkthrough stopped trusting the badge."],
  ["Neal Davis, Jon Bonso, A Cloud Guru", "Not this quarter", "These are exam-passing courses. Bonso's practice tests are useful the week you have already booked an exam. Cantrill is the one worth it later if a team wants Solutions Architect depth. None of them is your teacher for the switch."],
];

export default function BuildPage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Projects, certificates, BITS</p>
        <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
          Two repos. Zero certificates until the second repo can fail an eval in public.
        </h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Project 1 · weeks 1–11</p>
          <h2 className="mt-2 font-heading text-3xl">Orders, in Java</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Spring Boot, Java 21, Postgres, Docker Compose.</li>
            <li>POST /orders is idempotent on a client key. Two identical calls, one order.</li>
            <li>The write and an outbox row commit together. A worker sends, retries, and dead-letters.</li>
            <li>Token bucket rate limit, keyed by client. 429 when it trips.</li>
            <li>README a stranger can run, plus a one-page design: sync path, async path, what you measure.</li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed">
            This is the interview. Apple and Walmart will ask you to talk about a service you
            owned. Dell work counts too, once it has a number. This repo covers the hole if the
            Dell story is still vague.
          </p>
        </article>
        <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Project 2 · weeks 12–15</p>
          <h2 className="mt-2 font-heading text-3xl">A copilot with a score</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Fifteen fake support runbooks. Chunk them and say why the size is what it is.</li>
            <li>Retrieve, then answer. A tool calls the Java order API for status.</li>
            <li>Python and FastAPI are allowed here. Java is allowed if you would rather stay in one language. Pick one and ship.</li>
            <li>Twenty questions with expected facts. Write pass/fail and one failure you fixed.</li>
            <li>If you have no API key, stub the model and still show retrieval. A key is not the project.</li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed">
            This is the FDE proof, sized for evenings. It is not a framework tour. Customer
            discovery, the other half of that job, you practice by writing the runbooks from a
            made-up support team&apos;s complaints before you embed anything.
          </p>
        </article>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-3xl">Certificates, in the order of damage</h2>
        <div className="overflow-x-auto rounded-2xl bg-card ring-1 ring-foreground/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Item</th>
                <th className="px-4 py-3 font-medium">Verdict</th>
                <th className="px-4 py-3 font-medium">Why</th>
              </tr>
            </thead>
            <tbody>
              {certs.map((row) => (
                <tr key={row[0]} className="border-b border-border/70 align-top last:border-0">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3 leading-relaxed">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-3xl space-y-3">
        <h2 className="font-heading text-3xl">BITS Pilani WILP</h2>
        <p className="leading-relaxed">
          The work-integrated M.Tech is a real BITS programme: four semesters, you stay employed,
          there is a dissertation, and the 2026 Software Systems track leans cyber, data, and
          cloud. Software Engineering is the closer match to the job you are interviewing for.
          Data Science is the closer match only if you later commit to that work.
        </p>
        <p className="leading-relaxed">
          It does not place you. BITS says so on the programme pages. It will not move a 22 LPA
          offer to 45 while you are also trying to leave Dell after this year. The hours it takes
          are the same hours as the blank rewrites and the two repos.
        </p>
        <p className="leading-relaxed">
          Enroll after the next offer, if you still want the degree for a later staff or architect
          track, or if a non-CS bachelor&apos;s is getting you screened out. Do not enroll in the
          batch that overlaps this 16-week run.
        </p>
      </section>

      <section className="max-w-3xl space-y-3">
        <h2 className="font-heading text-3xl">How the week actually fits around Dell</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>Same desk, same time, five weekdays. Phone in another room. 1 hour 45, then stop. A second late-night session is how the last attempts died.</li>
          <li>One new problem only if yesterday&apos;s rewrite worked. Otherwise the new problem is the rewrite.</li>
          <li>Close the video after the idea is clear. Coding along with it feels like progress and leaves nothing to retrieve.</li>
          <li>Sunday has no syllabus. Red and yellow only.</li>
          <li>Track energy at work too. A promotion story inside Dell is useful, and a burned weekday makes the rewrite sloppy.</li>
        </ul>
      </section>
    </div>
  );
}
