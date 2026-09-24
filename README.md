# Switch Desk

Office study desk for Pratham, a Dell SDE II (3+ years, about 22 LPA) aiming at a stable product-company backend seat around 40–50 LPA total compensation. That number is a target, not an offer.

The profile is one line: Java and Spring backend, then cloud-native, then AI and agents on the same systems. Python is the second language. Go is later. Forward-deployed engineering stays an optional track.

## Run

```bash
npm install
npm run dev -- --port 43123 --hostname 0.0.0.0
```

Open the URL Next prints. Marks stay in this browser (`localStorage`).

## What to open

1. **Today** — the day's blocks once you set a start date. Weekdays are 2.5 hours.
2. **Syllabus** — the study guide. The skill map is the checklist. Each DSA pattern has a Java template and the problems that count. Same text is in `guide/` and in `guide/pratham-preparation-guide.pdf`.
3. **Patterns** — about 37 shapes and the representative problems, with review marks.
4. **Drill** — name the pattern before the code.
5. **Weeks** — the pattern order inside the September 2026 to January 2027 calendar.
6. **Market** — reported compensation bands, not promises.
7. **Build** — the object-storage operations project, the certificate list, and BITS as a side degree.

`guide/pratham-preparation-guide.pdf` is the printable copy of the syllabus. Regenerate the Markdown with:

```bash
node --experimental-strip-types scripts/export-guide.mjs
```

## Study rule

A problem counts when you can rewrite it from an empty file later. After a mark, reviews fall on day 1, 3, 7, 15, and 30.

Applications start in January 2027. The switch window is April 2027, after a year at Dell. Do not put Dell proprietary data or code into the project.
