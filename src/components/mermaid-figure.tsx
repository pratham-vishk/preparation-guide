"use client";

import { useEffect, useId, useState } from "react";

export function MermaidFigure({ chart }: { chart: string }) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "strict",
          fontFamily: "Outfit, sans-serif",
        });
        const { svg: next } = await mermaid.render(`fig${rawId}`, chart);
        if (!cancelled) setSvg(next);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, rawId]);

  if (failed) {
    return <pre className="overflow-x-auto rounded-xl bg-secondary p-3 text-xs">{chart}</pre>;
  }
  if (!svg) {
    return <p className="text-sm text-muted-foreground">Drawing the figure…</p>;
  }
  return (
    <div
      className="overflow-x-auto rounded-xl bg-card p-3 ring-1 ring-foreground/10 [&_svg]:mx-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
