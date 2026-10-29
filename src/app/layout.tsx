import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Energize Talk 2026 | Anargya ITS EV Team",
  description:
    "Kenali proses perancangan mobil balap listrik bersama Anargya ITS EV Team. Daftar Energize Talk 2026 untuk belajar tentang baterai, aerodinamika, dan Formula Student.",
  keywords: [
    "Energize Talk",
    "Anargya ITS",
    "Anargya EV Team",
    "Pendaftaran Energize Talk",
    "Mobil Listrik ITS",
    "Formula Student",
    "Electric Vehicle Webinar",
    "ITS Surabaya",
  ],
  authors: [{ name: "Anargya ITS EV Team" }],
  openGraph: {
    title: "Energize Talk 2026 | Anargya ITS EV Team",
    description:
      "Cerita di balik perancangan mobil balap listrik Anargya ITS, dari sistem baterai hingga persiapan Formula Student.",
    url: "https://www.anargyaits.com/energize-talk",
    siteName: "Anargya ITS EV Team",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`dark scroll-smooth ${plusJakarta.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-[#080b09] text-zinc-100 antialiased selection:bg-[#00ff87]/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
