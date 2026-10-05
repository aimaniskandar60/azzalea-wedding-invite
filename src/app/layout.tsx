import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Naskh_Arabic, Parisienne, Source_Sans_3 } from "next/font/google";
import { InviteGateController } from "@/components/invite-gate-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const titleFont = Cormorant_Garamond({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const coupleFont = Parisienne({
  variable: "--font-couple",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

const arabicFont = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Azzalea & Aiman | Nikah Invitation",
  description: "Nikah invitation with event details and RSVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${titleFont.variable} ${coupleFont.variable} ${bodyFont.variable} ${arabicFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--bg-base)] text-[var(--text-strong)]">
        <InviteGateController>
          <SiteHeader />
          {children}
          <SiteFooter />
        </InviteGateController>
      </body>
    </html>
  );
}
