import type { Metadata } from "next";
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { ConfirmModalProvider } from "@/components/ui/ConfirmModal";
import "./globals.css";

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
  title: "JobMate - Find Your Dream Job Here",
  description: "A candidate-facing platform to apply for top jobs easily via WhatsApp.",
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
        <ConfirmModalProvider>
          <ToastProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </ToastProvider>
        </ConfirmModalProvider>
      </body>
    </html>
  );
}

