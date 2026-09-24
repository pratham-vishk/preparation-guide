"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";

const links = [
  { href: "/", label: "Today" },
  { href: "/learn", label: "Syllabus" },
  { href: "/patterns", label: "Patterns" },
  { href: "/drill", label: "Drill" },
  { href: "/plan", label: "Weeks" },
  { href: "/market", label: "Market" },
  { href: "/build", label: "Build" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur print:hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-baseline justify-between gap-4">
          <Link href="/" className="font-heading text-2xl tracking-tight">
            Switch Desk
          </Link>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Dell SDE II · Java first · apply January · switch April
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-1">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-sm",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
