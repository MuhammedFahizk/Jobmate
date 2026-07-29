"use client";

import {
    column1,
    column2,
    column3,
    type CandidateCardData,
    type CompanyCardData,
    type JobCardData,
    type ShowcaseCard,
    type StatCardData,
} from "./cardData";

import {
    MobileCandidateChip,
    MobileCompanyChip,
    MobileJobChip,
    MobileSkillPill,
    MobileStatChip,
} from "./MobileCards";

const allCards: ShowcaseCard[] = [...column1, ...column2, ...column3];

const candidates = allCards.filter(
    (card): card is CandidateCardData => card.type === "candidate"
);

const companies = allCards.filter(
    (card): card is CompanyCardData => card.type === "company"
);

const jobs = allCards.filter(
    (card): card is JobCardData => card.type === "job"
);

const stats = allCards.filter(
    (card): card is StatCardData => card.type === "stat"
);

const allSkills = Array.from(
    new Set(
        allCards
            .filter(
                (
                    card
                ): card is Extract<ShowcaseCard, { type: "skill" }> =>
                    card.type === "skill"
            )
            .flatMap((card) => card.skills)
    )
);

const rowClass =
    "flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 pr-10";

export function MobileShowcase() {
    const mixedRow2: Array<CompanyCardData | JobCardData> = [
        companies[0],
        jobs[0],
        companies[1],
        jobs[1],
        companies[2],
    ].filter(Boolean) as Array<CompanyCardData | JobCardData>;

    const mixedRow4: Array<
        StatCardData | CompanyCardData | JobCardData
    > = [
        stats[0],
        companies[2] ?? companies[0],
        jobs[2] ?? jobs[0],
        stats[1],
        jobs[3] ?? jobs[1],
    ].filter(Boolean) as Array<
        StatCardData | CompanyCardData | JobCardData
    >;

    return (
        <div className="flex flex-col gap-3 -mx-4">
            {/* Row 1 — Candidates */}
            <div className={rowClass}>
                {candidates.map((card, index) => (
                    <MobileCandidateChip
                        key={index}
                        card={card}
                    />
                ))}
            </div>

            {/* Row 2 — Companies & Jobs */}
            <div className={rowClass}>
                {mixedRow2.map((card, index) =>
                    card.type === "company" ? (
                        <MobileCompanyChip
                            key={index}
                            card={card}
                        />
                    ) : (
                        <MobileJobChip
                            key={index}
                            card={card}
                        />
                    )
                )}
            </div>

            {/* Row 3 — Skills */}
            <div className={rowClass}>
                {allSkills.map((skill, index) => (
                    <MobileSkillPill
                        key={index}
                        skill={skill}
                    />
                ))}
            </div>

            {/* Row 4 — Stats, Companies & Jobs */}
            <div className={rowClass}>
                {mixedRow4.map((card, index) => {
                    switch (card.type) {
                        case "stat":
                            return (
                                <MobileStatChip
                                    key={index}
                                    value={card.value}
                                    label={card.label}
                                />
                            );

                        case "company":
                            return (
                                <MobileCompanyChip
                                    key={index}
                                    card={card}
                                />
                            );

                        case "job":
                            return (
                                <MobileJobChip
                                    key={index}
                                    card={card}
                                />
                            );
                    }
                })}
            </div>
        </div>
    );
}