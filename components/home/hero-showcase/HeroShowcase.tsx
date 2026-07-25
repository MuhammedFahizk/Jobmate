"use client";

import { MarqueeColumn } from "./MarqueeColumn";
import { ShowcaseCard } from "./ShowcaseCard";
import { column1, column2, column3 } from "./cardData";

export function HeroShowcase() {
    return (
        <div className="w-full h-full">
            {/* Desktop — 3 columns, alternating scroll direction */}
            <div className="hidden lg:grid grid-cols-3 gap-5 h-[560px]">
                <MarqueeColumn items={column1} direction="up" duration={32} />
                <MarqueeColumn items={column2} direction="down" duration={28} />
                <MarqueeColumn items={column3} direction="up" duration={35} />
            </div>

            {/* Tablet — 2 columns */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-5 h-[520px]">
                <MarqueeColumn items={column1} direction="up" duration={30} />
                <MarqueeColumn items={[...column2, ...column3]} direction="down" duration={32} />
            </div>

            {/* Mobile — animation off, simple stacked list */}
            <div className="md:hidden flex flex-col gap-4">
                {[...column1, ...column2].slice(0, 6).map((card, idx) => (
                    <ShowcaseCard key={idx} card={card} />
                ))}
            </div>
        </div>
    );
}