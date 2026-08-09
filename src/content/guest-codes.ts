export type GuestCodeEntry = {
  displayName: string;
};

// TODO: Replace these sample entries with your real guest list.
const guestCodeDirectory: Record<string, GuestCodeEntry> = {
  AZZA01: { displayName: "Azzalea's Family" },
  AIMN01: { displayName: "Aiman's Family" },
};

export function resolveGuestByCode(rawCode: string | null): GuestCodeEntry | null {
  if (!rawCode) {
    return null;
  }

  const normalizedCode = rawCode.trim().toUpperCase();

  if (!normalizedCode) {
    return null;
  }

  return guestCodeDirectory[normalizedCode] ?? null;
}