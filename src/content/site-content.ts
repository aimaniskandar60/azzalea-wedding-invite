export type EventScheduleItem = {
  label: string;
  time: string;
};

export type EventDetails = {
  title: string;
  date: string;
  venue: string;
  address: string;
  mapsUrl: string;
  calendarUrl?: string;
  schedule: EventScheduleItem[];
};

export type SiteContent = {
  couple: {
    bride: {
      name: string;
      relationLabel: "daughter of" | "son of";
      parents: string;
    };
    groom: {
      name: string;
      relationLabel: "daughter of" | "son of";
      parents: string;
    };
  };
  introLine: string;
  tagline: string;
  rsvpDeadline: string;
  contacts: {
    name: string;
    phone: string;
    email?: string;
  }[];
  events: EventDetails[];
};

export const siteContent: SiteContent = {
  couple: {
    bride: {
      name: "Azzalea",
      relationLabel: "daughter of",
      parents: "Gazali bin Abdul Rahman & Noorshida binti Hashim",
    },
    groom: {
      name: "Aiman",
      relationLabel: "son of",
      parents: "Murhiz bin Mohd Nor & Anita binti Osman",
    },
  },
  introLine: "With gratitude to Allah, we invite you to celebrate the Nikah of",
  tagline: "Join us for a day of love, faith, and togetherness.",
  rsvpDeadline: "TBD",
  contacts: [
    {
      name: "Contact Person 1",
      phone: "+60 1111 1111",
      email: "contact1@example.com",
    },
    {
      name: "Contact Person 2",
      phone: "+60 1222 2222",
      email: "contact2@example.com",
    },
    {
      name: "Contact Person 3",
      phone: "+60 1333 3333",
      email: "contact3@example.com",
    },
    {
      name: "Contact Person 4",
      phone: "+60 1444 4444",
      email: "contact4@example.com",
    },
  ],
  events: [
    {
      title: "Nikah Ceremony",
      date: "Saturday, September 8, 2028",
      venue: "Azzalea's House",
      address: "9, Jalan Rimba Riang 9/2, Kota Damansara, 47810 Petaling Jaya, Selangor",
      mapsUrl: "https://maps.app.goo.gl/wT6KUMCr7Ksugmm19",
      calendarUrl:"https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nikah+-+Azzalea+%26+Aiman&dates=20280908T030000Z/20280908T050000Z&details=Join+us+to+celebrate+our+Nikah.&location=9,+Jalan+Rimba+Riang+9/2,+Kota+Damansara,+47810+Petaling+Jaya,+Selangor&sf=true&output=xml",
      // I think we're doing it at night?
      schedule: [
        { label: "Guest Arrival", time: "10:30 AM" },
        { label: "Nikah", time: "11:00 AM" },
        { label: "Makan-makan", time: "12:00 PM" },
      ],
    },
  ],
};
