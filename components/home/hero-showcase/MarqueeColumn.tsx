"use client";

import { motion } from "framer-motion";
import { ShowcaseCard } from "./ShowcaseCard";
import type { ShowcaseCard as ShowcaseCardData } from "./cardData";

interface MarqueeColumnProps {
  items: ShowcaseCardData[];
  direction: "up" | "down";
  duration: number;
}

export function MarqueeColumn({ items, direction, duration }: MarqueeColumnProps) {
  // Duplicate the list so the loop point is invisible — animating exactly
  // -50% of a doubled list lands back on the same visual frame it started on.
  const doubled = [...items, ...items];

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="flex flex-col gap-4"
        animate={{ y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {doubled.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <ShowcaseCard card={card} />
          </motion.div>
        ))}
      </motion.div>

      {/* fade masks top/bottom so cards don't hard-cut at the column edge */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}