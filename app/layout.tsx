import type { Metadata } from "next";
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { ConfirmModalProvider } from "@/components/ui/ConfirmModal";
import "./globals.css";
import { ReactQueryProvider } from "@/components/ui/QueryClientProvider";
import { SITE_URL } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-fraunces",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "JobMate - Find Jobs in Kerala",
    template: "%s | JobMate",
  },

  description:
    "Discover the latest job opportunities across Kerala including Kozhikode, Mukkam, Koduvally, Kattangal and nearby locations. Find jobs and apply easily with JobMate.",

  applicationName: "JobMate",

  keywords: [
    "JobMate",
    "jobs in Kerala",
    "Kerala jobs",
    "jobs in Kozhikode",
    "jobs in Calicut",
    "Kozhikode job vacancies",
    "jobs in Mukkam",
    "jobs in Koduvally",
    "jobs in Kattangal",
    "jobs near NIT Calicut",
    "latest jobs Kerala",
    "fresher jobs Kerala",
  ],

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/jobmate-icon.svg", type: "image/svg+xml" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: "/images/logo.png",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "JobMate",
    title: "JobMate - Find Jobs in Kerala",
    description:
      "Discover job opportunities in Kerala, Kozhikode, Mukkam, Koduvally and nearby locations.",
    url: SITE_URL,
    images: [
      {
        url: "/images/logo.png",
        alt: "JobMate Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "JobMate - Find Jobs in Kerala",
    description:
      "Discover the latest job opportunities across Kerala with JobMate.",
    images: ["/images/logo.png"],
  },
};

// Just <html>, <body>, and app-wide providers. No nav, no chrome — that's
// owned per-section by app/(user)/layout.tsx and app/mc-ops/(admin)/layout.tsx.

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "JobMate",
  "url": SITE_URL,
  "logo": `${SITE_URL}/images/logo.png`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable} bg-background text-foreground min-h-screen flex flex-col antialiased font-body`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ReactQueryProvider>
          <ConfirmModalProvider>
            <ToastProvider>
              <AuthProvider>{children}</AuthProvider>
            </ToastProvider>
          </ConfirmModalProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}