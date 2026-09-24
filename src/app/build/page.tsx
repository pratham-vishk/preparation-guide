import Link from "next/link";

const certs = [
  ["AWS Solutions Architect Associate", "Do, after you can draw a VPC", "Supporting credential once IAM, networking, and the data plane are real to you. Not the way you learn AWS."],
  ["CKAD", "Later, after you can debug a pod", "Hands-on and relevant. It comes after Docker, a Spring deploy, probes, HPA, and Helm. It is not the Kubernetes course."],
  ["AWS Generative AI Developer Professional", "Later", "Closest cloud badge to the AI-backend profile. Take it after the flagship project has evals, not this quarter."],
  ["Azure AI-901", "Optional", "The English Azure AI Fundamentals exam moved from AI-900 to AI-901 in April 2026. Still vocabulary. The project outranks it."],
  ["AWS AI Practitioner", "Optional", "Foundational. Skip it if the project already shows RAG and tool calling."],
  ["AWS Cloud Practitioner", "Skip", "Aimed at people new to cloud. Wrong level for this switch."],
  ["Python, LangChain, Docker, or Kubernetes beginner badges", "Skip", "The repo is the evidence. A pile of completion certificates does not move a 22 LPA seat."],
];

export default function BuildPage() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">One project, two credentials, a degree on the side</p>
        <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
          An operations platform for a fake object store. No Dell data in it.
        </h1>
        <p className="text-lg leading-relaxed">
          Java and Spring stay the system of record. Python is the agent. Kafka, Redis, Postgres,
          Docker, then Kubernetes, then AWS labels. The syllabus has the milestone dates and the
          four agents.
        </p>
        <Link href="/learn/project/flagship" className="text-sm text-primary">
          Open the flagship lesson
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">25 Oct · 25 Nov</p>
          <h2 className="mt-2 font-heading text-3xl">The Java system</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Buckets, objects, and cluster state in Postgres. Synthetic metrics and logs only.</li>
            <li>A write and an outbox row commit together. A worker publishes, retries, and dead-letters.</li>
            <li>Kafka carries object events. Redis holds agent session state, a cache, and a rate limit.</li>
            <li>Docker Compose runs Spring Boot, Postgres, Kafka, and Redis by 25 November.</li>
          </ul>
        </article>
        <article className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">20 Dec · 15 Jan</p>
          <h2 className="mt-2 font-heading text-3xl">The agents</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Debugger: high bucket latency, from metrics, logs, and traces to a likely cause.</li>
            <li>Capacity: will this cluster hit 80%, from a short history and a stated assumption.</li>
            <li>Incident RCA: similar incidents and notes, retrieved, with citations.</li>
            <li>Safe executor: suggestion, human approval, tool call, then a check that it happened.</li>
            <li>By 15 January the README shows an approval gate and an eval score.</li>
          </ul>
        </article>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-3xl">Certificates</h2>
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
          M.Tech AI and ML is a real degree: agentic systems, LLMs, cloud-native AI, MLOps, and a
          dissertation, about ₹3.34 lakh across four semesters. It does not place you. Public pages
          have disagreed on the October 2026 deadline, so confirm the live date and fee with BITS
          before you pay.
        </p>
        <p className="leading-relaxed">
          If the workload fits beside Dell, marriage plans, and the 2.5 weeknight hours, it is a
          legitimate long-term option. It is not the preparation for the January applications. The
          interview gap is retrieval, design, Java depth, cloud, and the project.
        </p>
      </section>
    </div>
  );
}
