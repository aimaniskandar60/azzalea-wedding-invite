const formId = "1FAIpQLSfJ8JEkst8r0qs3oql7weGsh84D29gIOojqqj-xqGIADHBicg";
const formViewUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;

export const rsvpConfig = {
  formId,
  formViewUrl,
  entries: {
    guestName: "1498135098",
    attendance: "877086558",
    guests: "1424661284",
  },
  defaults: {
    guestName: "",
    attendance: "Yes",
    guests: "1",
  },
  guidance: {
    deadline: "September 15, 2026",
    notes: [
      "If the form does not load, use the direct RSVP link below.",
      "If you have urgent updates after submitting, contact the family directly.",
    ],
  },
} as const;