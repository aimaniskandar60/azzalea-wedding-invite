import Link from "next/link";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#event-details", label: "Event Details" },
  { href: "#rsvp", label: "RSVP" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-soft)] bg-[color:color-mix(in_oklab,var(--bg-soft)_90%,white)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="#hero" className="text-sm font-semibold tracking-[0.2em] text-[var(--teal-700)]">
          WEDDING INVITE
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--blue-700)]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
