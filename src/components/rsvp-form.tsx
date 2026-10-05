"use client";

import { FormEvent, useId, useState } from "react";

type AttendanceValue = "Yes" | "No";

type RsvpFormProps = {
  formId: string;
  guestNameEntryId: string;
  attendanceEntryId: string;
  guestsEntryId: string;
  defaultGuestName?: string;
  defaultAttendance?: AttendanceValue;
  defaultGuests?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type SubmissionSummaryProps = {
  attendance: AttendanceValue;
  guestName: string;
};

function SubmissionSummary({ attendance, guestName }: SubmissionSummaryProps) {
  const safeGuestName = guestName.trim() || "Dear guest";

  if (attendance === "Yes") {
    return (
      <section
        className="rounded-2xl border border-[var(--teal-200)] bg-[var(--teal-50)] p-6 shadow-sm sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm uppercase tracking-[0.16em] text-[var(--teal-700)]">RSVP Received</p>
        <h3 className="mt-2 text-2xl font-semibold text-[var(--teal-700)]">Alhamdulillah, thank you {safeGuestName}.</h3>
        <p className="mt-3 text-[var(--teal-700)]">
          We are truly grateful that you will be attending and celebrating this special day with us.
          Your presence means so much to our families.
        </p>
      </section>
    );
  }

  return (
    <section
      className="rounded-2xl border border-[var(--blue-200)] bg-[var(--blue-50)] p-6 shadow-sm sm:p-8"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm uppercase tracking-[0.16em] text-[var(--blue-700)]">RSVP Received</p>
      <h3 className="mt-2 text-2xl font-semibold text-[var(--blue-700)]">Thank you for letting us know, {safeGuestName}.</h3>
      <p className="mt-3 text-[var(--blue-700)]">
        We are sorry you are unable to attend and we will miss celebrating with you.
        We sincerely appreciate your swift response.
      </p>
    </section>
  );
}

export function RsvpForm({
  formId,
  guestNameEntryId,
  attendanceEntryId,
  guestsEntryId,
  defaultGuestName = "",
  defaultAttendance = "Yes",
  defaultGuests = "1",
}: RsvpFormProps) {
  const frameName = `google-form-submit-${useId()}`;
  const submissionUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
  const [guestName, setGuestName] = useState(defaultGuestName);
  const [attendance, setAttendance] = useState<AttendanceValue>(defaultAttendance);
  const [guests, setGuests] = useState(defaultGuests);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submittedAttendance, setSubmittedAttendance] = useState<AttendanceValue | null>(null);
  const [submittedGuestName, setSubmittedGuestName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setSubmitState("submitting");

    if (!guestName.trim() || (attendance === "Yes" && !guests.trim())) {
      event.preventDefault();
      setSubmitState("error");
      setSubmittedAttendance(null);
      setSubmittedGuestName("");
      return;
    }

    setSubmittedAttendance(attendance);
    setSubmittedGuestName(guestName);
  }

  function handleSubmissionFrameLoad() {
    if (submitState === "submitting") {
      setSubmitState("success");
    }
  }

  if (submitState === "success" && submittedAttendance) {
    return <SubmissionSummary attendance={submittedAttendance} guestName={submittedGuestName} />;
  }

  return (
    <>
      <iframe name={frameName} title="Google Form Submission" className="hidden" onLoad={handleSubmissionFrameLoad} />
      <form
        action={submissionUrl}
        method="POST"
        target={frameName}
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="guest-name" className="text-sm uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Guest Name
          </label>
          <input
            id="guest-name"
            name={`entry.${guestNameEntryId}`}
            type="text"
            required
            value={guestName}
            onChange={(event) => {
              setGuestName(event.target.value);
              if (submitState === "error") {
                setSubmitState("idle");
              }
            }}
            placeholder="Enter your name"
            className="mt-3 w-full rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 text-[var(--text-strong)] outline-none ring-[var(--blue-200)] transition focus:ring"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-muted)]">Will you be attending?</p>
          <fieldset className="mt-3 flex flex-wrap gap-3" aria-label="Attendance response">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--teal-200)] bg-[var(--teal-50)] px-4 py-2 text-sm text-[var(--teal-700)]">
              <input
                type="radio"
                name={`entry.${attendanceEntryId}`}
                value="Yes"
                checked={attendance === "Yes"}
                onChange={() => {
                  setAttendance("Yes");
                  if (submitState === "error") {
                    setSubmitState("idle");
                  }
                }}
                className="h-4 w-4 accent-[var(--teal-700)]"
                required
              />
              Yes
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--blue-200)] bg-[var(--blue-50)] px-4 py-2 text-sm text-[var(--blue-700)]">
              <input
                type="radio"
                name={`entry.${attendanceEntryId}`}
                value="No"
                checked={attendance === "No"}
                onChange={() => {
                  setAttendance("No");
                  if (submitState === "error") {
                    setSubmitState("idle");
                  }
                }}
                className="h-4 w-4 accent-[var(--blue-700)]"
                required
              />
              No
            </label>
          </fieldset>
        </div>

        {attendance === "Yes" ? (
          <div>
            <label htmlFor="guest-count" className="text-sm uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Number of Guests
            </label>
            <input
              id="guest-count"
              name={`entry.${guestsEntryId}`}
              type="number"
              min={0}
              max={20}
              required
              value={guests}
              onChange={(event) => {
                setGuests(event.target.value);
                if (submitState === "error") {
                  setSubmitState("idle");
                }
              }}
              className="mt-3 w-full rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 text-[var(--text-strong)] outline-none ring-[var(--blue-200)] transition focus:ring"
            />
          </div>
        ) : (
          <input type="hidden" name={`entry.${guestsEntryId}`} value="0" />
        )}

        <div className="pt-1">
          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="inline-flex items-center justify-center rounded-full bg-[var(--blue-700)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--blue-500)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState === "submitting" ? "Submitting..." : "Submit RSVP"}
          </button>
        </div>

        {submitState === "error" ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
            We could not submit your RSVP right now. Please try again.
          </p>
        ) : null}
      </form>
    </>
  );
}