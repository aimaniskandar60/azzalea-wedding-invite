"use client";

import { useEffect, useRef, useState } from "react";
import { RsvpForm } from "@/components/rsvp-form";
import { BackgroundMusicPlayer, type BackgroundMusicPlayerHandle } from "@/components/background-music-player";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { rsvpConfig } from "@/content/rsvp-config";
import { siteContent } from "@/content/site-content";

const BACKGROUND_MUSIC_MP3_URL = "/audio/the-way-i-loved-you-michal-leah-original-key-karaoke-piano-instrumental-cover_nfqdWXEw.mp3";

export default function Home() {
  const musicPlayerRef = useRef<BackgroundMusicPlayerHandle>(null);
  const [canShowMusicControl, setCanShowMusicControl] = useState(false);

  useEffect(() => {
    const handleEnvelopeOpened = async () => {
      setCanShowMusicControl(true);
      await musicPlayerRef.current?.play();
    };

    window.addEventListener("invite-envelope-opened", handleEnvelopeOpened);

    return () => {
      window.removeEventListener("invite-envelope-opened", handleEnvelopeOpened);
    };
  }, []);

  const event = siteContent.events[0];
  const bride = siteContent.couple.bride;
  const groom = siteContent.couple.groom;

  if (!event) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-semibold text-stone-900">Nikah Invitation</h1>
        <p className="mt-3 text-stone-700">Event details will be added soon.</p>
      </main>
    );
  }

  return (
    <main>
      <BackgroundMusicPlayer
        ref={musicPlayerRef}
        src={BACKGROUND_MUSIC_MP3_URL}
        isVisible={canShowMusicControl}
      />

      <RevealOnScroll animateOnMount>
        <section id="hero" className="relative isolate overflow-hidden border-b border-[var(--border-soft)] bg-[var(--bg-soft)]">
          <div
            aria-hidden="true"
            className="hero-hue-primary pointer-events-none z-0 opacity-95 bg-[linear-gradient(180deg,var(--bg-soft)_0%,var(--bg-base)_100%),radial-gradient(circle_at_14%_18%,color-mix(in_oklab,var(--teal-500)_52%,white)_0%,transparent_58%),radial-gradient(circle_at_86%_24%,color-mix(in_oklab,var(--purple-500)_50%,white)_0%,transparent_56%)]"
          />
          <div
            aria-hidden="true"
            className="hero-hue-secondary pointer-events-none z-0 opacity-72 bg-[radial-gradient(circle_at_18%_78%,color-mix(in_oklab,var(--teal-200)_78%,white)_0%,transparent_52%),radial-gradient(circle_at_82%_12%,color-mix(in_oklab,var(--purple-200)_76%,white)_0%,transparent_50%)]"
          />
          <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-24">
            <p className="font-arabic text-2xl text-[var(--teal-700)] sm:text-3xl">
              السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-base text-[var(--text-muted)] sm:text-lg">{siteContent.introLine}</p>
            <h1 className="mt-8 text-5xl font-semibold leading-tight text-[var(--foreground)] sm:text-7xl">
              <span className="block">{bride.name}</span>
              <span className="mt-2 block font-sans text-sm text-[var(--text-muted)] sm:text-base">
                <span className="tracking-[0.02em]">{bride.relationLabel} {bride.parents}</span>
              </span>
              <span className="mx-auto mt-6 block" aria-hidden="true">&</span>
              <span className="mt-6 block">{groom.name}</span>
              <span className="mt-2 block font-sans text-sm text-[var(--text-muted)] sm:text-base">
                <span className="tracking-[0.02em]">{groom.relationLabel} {groom.parents}</span>
              </span>
            </h1>
            <p className="mt-5 text-lg text-[var(--purple-700)] sm:text-xl">{event.date}</p>
            <p className="mx-auto mt-8 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg">{siteContent.tagline}</p>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section id="event-details" className="border-b border-[var(--border-soft)] bg-[var(--bg-soft)]">
          <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
            <h2 className="text-4xl font-semibold text-[var(--text-strong)] sm:text-5xl">Event Details</h2>

            <article className="mt-8 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
              <p className="text-sm uppercase tracking-[0.16em] text-[var(--teal-700)]">{event.title}</p>
              <p className="mt-3 text-3xl text-[var(--text-strong)]">{event.venue}</p>
              <p className="mt-2 text-[var(--text-muted)]">{event.address}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--teal-200)] bg-[var(--teal-50)] px-4 py-2 text-sm font-medium text-[var(--teal-700)] transition hover:bg-[var(--teal-200)]/45"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 21s7-5.85 7-11a7 7 0 1 0-14 0c0 5.15 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  Location
                </a>
                {event.calendarUrl ? (
                  <a
                    href={event.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--purple-700)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--purple-500)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M12 13v5M9.5 15.5h5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    Add to Calendar
                  </a>
                ) : null}
              </div>

              <h3 className="mt-8 text-lg font-semibold text-[var(--text-strong)]">Schedule</h3>
              <ul className="mt-4 space-y-3">
                {event.schedule.map((item) => (
                  <li
                    key={`${event.title}-${item.label}`}
                    className="flex items-center justify-between rounded-xl border border-[var(--border-soft)] bg-[var(--surface-subtle)] px-4 py-3"
                  >
                    <span className="text-[var(--text-muted)]">{item.label}</span>
                    <span className="font-semibold text-[var(--purple-700)]">{item.time}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section
          id="rsvp"
          className="bg-[radial-gradient(circle_at_90%_18%,var(--purple-50)_0%,transparent_36%),radial-gradient(circle_at_8%_80%,var(--teal-50)_0%,transparent_34%),var(--bg-base)]"
        >
          <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
            <h2 className="text-4xl font-semibold text-[var(--text-strong)] sm:text-5xl">RSVP</h2>
            <p className="mt-3 text-[var(--text-muted)]">Please respond by {siteContent.rsvpDeadline}.</p>

            <div className="mt-8">
              <RsvpForm
                formId={rsvpConfig.formId}
                guestNameEntryId={rsvpConfig.entries.guestName}
                attendanceEntryId={rsvpConfig.entries.attendance}
                guestsEntryId={rsvpConfig.entries.guests}
                defaultGuestName={rsvpConfig.defaults.guestName}
                defaultAttendance={rsvpConfig.defaults.attendance}
                defaultGuests={rsvpConfig.defaults.guests}
              />
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </main>
  );
}
