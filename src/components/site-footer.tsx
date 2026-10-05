import { siteContent } from "@/content/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--surface-subtle)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 text-sm text-[var(--text-muted)] sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="shrink-0 rounded-full border border-[var(--blue-200)] bg-[var(--blue-50)] px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--blue-700)]">
          Contacts
        </div>

        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteContent.contacts.map((contact) => (
            <div key={`${contact.name}-${contact.phone}`} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4">
              <p className="font-medium text-[var(--teal-700)]">{contact.name}</p>
              <p className="mt-1">{contact.phone}</p>
              {contact.email ? <p className="mt-1 break-all">{contact.email}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
