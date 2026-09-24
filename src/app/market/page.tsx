const rows = [
  ["Walmart Global Tech, Bengaluru", "SWE III ~₹39L. Senior ~₹56L (base ~₹40L, stock ~₹8.4L/yr, bonus ~₹7.7L).", "Java 17, Spring, Kafka, SQL and NoSQL, Docker/Kubernetes, Azure or GCP. Newer reqs add practical LLM use and sometimes React. Senior postings ask about 5–9 years."],
  ["Microsoft India", "SDE II (61) ~₹44L. Level 62 ~₹55L. Senior (63) ~₹73L.", "DSA, design, and coding. 61/62 is the band that matches a strong SE2 moving up, not a staff loop."],
  ["Amazon, Bengaluru", "L5 ~₹61L. L6 senior ~₹1.4Cr.", "Leadership principles plus DSA and design. L5 already sits above 50. The bar and the on-call load are both real."],
  ["Adobe India", "P30 ~₹53L. P40 ~₹72L.", "Product engineering. P30 is the nearer title if your total experience is still in the early years."],
  ["Atlassian India", "P30 ~₹43L. P40 ~₹75L. Senior title is P50, ~₹1.07Cr.", "Coding and design. P30/P40 is the honest application, not the senior title."],
  ["Apple IS&T, Bengaluru", "Public Levels medians for this exact team are thin. The live req is Java, Spring Boot, microservices, 3+ years.", "Distributed systems, concurrency, REST, caching, schema design. Interview reports include DSA, Java threads, and designs like a rate limiter or large upload."],
  ["Goldman Sachs India", "Associate ~₹38L. VP ~₹65L.", "More cash, less stock. VP is a later title. Stable, not the fastest way to a ₹50L package from SE2."],
];

export default function MarketPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Job descriptions, not vibes</p>
        <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
          40–50 LPA is a Java SDE II number. Senior and FDE are different bets.
        </h1>
        <p className="text-lg leading-relaxed">
          Your line, “40–50 with base and stock,” is total compensation around two times the
          current 22. It is not a 40 base plus a large grant. Reported medians below are
          Levels.fyi figures from mid to late 2026, self-reported, in lakhs of rupees per year.
          They move. They are not an offer.
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl bg-card ring-1 ring-foreground/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Where</th>
              <th className="px-4 py-3 font-medium">Pay near your target</th>
              <th className="px-4 py-3 font-medium">What the req actually tests</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
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

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">Apply here first</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Walmart Global Tech SWE III, and Senior only if your total experience is near the 5-year line.</li>
            <li>Apple Bengaluru, the Java / Spring Boot / microservices req. Same stack you already have.</li>
            <li>Microsoft 61 or 62, Adobe around P30, Atlassian P30 or P40.</li>
            <li>Intuit, Salesforce, ServiceNow, Cisco, JPMorgan, Morgan Stanley if you want a second list of stable Java shops.</li>
            <li>Amazon L5 if you want the brand and can carry the leadership stories. Do not make it the only target.</li>
          </ul>
        </article>
        <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">FDE is real, and it is not this switch</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Through early 2026, forward-deployed hiring grew very fast. Across roughly a thousand
            postings, the common skills were Python or TypeScript, SQL, AWS or GCP, Docker,
            RAG, evals, and agent orchestration. The part that grew fastest, in about 70% of
            posts, was customer discovery: sit with an ambiguous business problem and turn it
            into something a team will actually use. Palantir also accepts Java. OpenAI’s
            Singapore FDE posting asked for 5+ years and customer-facing delivery.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            US posted bands often quote $300k–$550k and are equity-heavy. That is not a stable
            India 40–50 package, and it is not a role you reach by collecting LangChain
            certificates while Python is still new. Keep one agent project so the door stays
            open. Take the Java offer first.
          </p>
        </article>
      </section>

      <section className="max-w-3xl space-y-2 text-sm leading-relaxed text-muted-foreground">
        <h2 className="font-heading text-2xl text-foreground">Sources</h2>
        <p>Levels.fyi: Walmart Bengaluru SWE (updated 29 Jul 2026), Microsoft India (2 Sep 2026), Amazon Greater Bengaluru (2 Sep 2026), Atlassian India (31 Aug 2026), Adobe India (28 Jul 2026), Goldman Sachs India (27 Jul 2026).</p>
        <p>Walmart senior Java reqs summarized from 2026 Bengaluru postings: Java 17, Spring, Kafka, cloud, containers. Apple jobs site, Software Engineer — Java, Spring Boot and Microservices, Bengaluru, Software and Services, around September 2026, 3+ years.</p>
        <p>FDE skill mix from Perspective AI, “2026 FDE Hiring Trends,” 8 Jun 2026, and public Palantir / OpenAI forward-deployed descriptions.</p>
      </section>
    </div>
  );
}
