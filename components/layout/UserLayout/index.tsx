// ─────────────────────────────────────────────────────────────────────────────
// components/layouts/UserLayout/index.tsx
// Public/candidate-facing chrome — Navbar + Footer. Used by app/(user)/layout.tsx.
//
// NOTE: Footer is still imported from its original location
// (components/Footer.tsx) — I don't have that file's content in this
// session, so I didn't move/rewrite it blind. If you want it colocated
// here too (components/layouts/UserLayout/Footer.tsx, matching Navbar),
// just move the file as-is and flip this import path; no content changes
// needed.
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "@/components/Footer";

export default function UserLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
        </>
    );
}