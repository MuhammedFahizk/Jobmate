'use client';

import { motion } from 'framer-motion';
import { usePublicTestimonials } from '@/hooks/usepublictestimonials';

export function TestimonialsSection() {
  const { data: testimonials, isLoading } = usePublicTestimonials();

  // Fully hidden — not just an empty state — once we know there's
  // nothing to show. No point rendering the section header either.
  if (!isLoading && (!testimonials || testimonials.length === 0)) {
    return null;
  }

  return (
    <section className="bg-background p-10 px-6">
      <div className=" mx-auto">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-primary-500 mb-2.5 block">Placed & Happy</span>
        <h2 className="font-display font-semibold text-[34px] tracking-tight mb-2">What candidates say</h2>
        <p className="text-muted text-sm max-w-[480px] leading-[1.6] mb-10">Records straight from the source.</p>

        <div className="flex flex-col gap-5">
          {isLoading &&
            [0, 1].map((idx) => (
              <div
                key={idx}
                className="bg-white border border-border rounded-[14px] p-7 flex flex-col md:flex-row gap-4 md:gap-6 items-start relative overflow-hidden animate-pulse"
              >
                <div className="hidden md:block absolute left-0 top-5 bottom-5 w-0 border-l-[1.5px] border-dashed border-border" />

                <span className="font-display text-[44px] leading-[0.8] text-primary-100 shrink-0 md:ml-2 mt-2 md:mt-0">&ldquo;</span>

                <div className="flex-1 w-full">
                  <div className="h-4 bg-gray-200/60 rounded w-11/12 mb-2" />
                  <div className="h-4 bg-gray-200/60 rounded w-2/3 mb-4" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded border border-border bg-gray-200/60 flex-shrink-0" />
                      <div>
                        <div className="h-3 w-24 bg-gray-200/60 rounded mb-1.5" />
                        <div className="h-2.5 w-32 bg-gray-200/60 rounded" />
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-muted/40 tracking-wider uppercase">JM-PLC-0{231 + idx}</span>
                  </div>
                </div>
              </div>
            ))}

          {!isLoading &&
            testimonials!.map((t, idx) => (
              <motion.div
                key={t.name}
                className="bg-white border border-border rounded-[14px] p-7 flex flex-col md:flex-row gap-4 md:gap-6 items-start relative overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
              >
                <div className="hidden md:block absolute left-0 top-5 bottom-5 w-0 border-l-[1.5px] border-dashed border-border" />

                <span className="font-display text-[44px] leading-[0.8] text-primary-500 shrink-0 md:ml-2 mt-2 md:mt-0">&ldquo;</span>

                <div className="flex-1 w-full">
                  <p className="font-display text-[16px] leading-[1.55] text-foreground mb-4">
                    {t.review}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded border border-border overflow-hidden  flex-shrink-0">
                        {t.avatar ? (
                          <img src={t.avatar} alt={t.name} className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-primary-100" />
                        )}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold font-body">{t.name}</div>
                        <div className="text-[11px] text-muted font-body">
                          {t.designation}
                          {t.location ? ` — ${t.location}` : ''}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-muted tracking-wider uppercase">JM-PLC-0{231 + idx}</span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}