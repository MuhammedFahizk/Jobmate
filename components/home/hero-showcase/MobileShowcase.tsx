"use client";

import { column1, column2, column3 } from "./cardData";
import {
    MobileCandidateChip,
    MobileCompanyChip,
    MobileJobChip,
    MobileSkillPill,
    MobileStatChip,
} from "./MobileCards";

const allCards = [...column1, ...column2, ...column3];
const candidates = allCards.filter((c) => c.type === "candidate");
const companies = allCards.filter((c) => c.type === "company");
const jobs = allCards.filter((c) => c.type === "job");
const stats = allCards.filter((c) => c.type === "stat");
const allSkills = Array.from(
    new Set(allCards.filter((c) => c.type === "skill").flatMap((c: any) => c.skills as string[]))
);

const rowClass = "flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 pr-10";

export function MobileShowcase() {
    const mixedRow2 = [companies[0], jobs[0], companies[1], jobs[1], companies[2]].filter(Boolean);
    const mixedRow4 = [stats[0], companies[2] ?? companies[0], jobs[2] ?? jobs[0], stats[1], jobs[3] ?? jobs[1]].filter(Boolean);

    return (
        <div className="flex flex-col gap-3 -mx-4">
            {/* Row 1 — candidates */}
            <div className={rowClass}>
                {candidates.map((c, i) => (
                    <MobileCandidateChip key={i} card={c as any} />
                ))}
            </div>

            {/* Row 2 — mixed company + job */}
            <div className={rowClass}>
                {mixedRow2.map((c: any, i) =>
                    c.type === "company" ? (
                        <MobileCompanyChip key={i} card={c} />
                    ) : (
                        <MobileJobChip key={i} card={c} />
                    )
                )}
            </div>

            {/* Row 3 — skill pills */}
            <div className={rowClass}>
                {allSkills.map((s, i) => (
                    <MobileSkillPill key={i} skill={s} />
                ))}
            </div>

            {/* Row 4 — mixed analytics + companies + jobs */}
            <div className={rowClass}>
                {mixedRow4.map((c: any, i) => {
                    if (c.type === "stat") return <MobileStatChip key={i} value={c.value} label={c.label} />;
                    if (c.type === "company") return <MobileCompanyChip key={i} card={c} />;
                    return <MobileJobChip key={i} card={c} />;
                })}
            </div>
        </div>
    );
}