'use client';

import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS } from '@/lib/types/job.type';
import { SORT_OPTIONS, type JobFiltersState } from '@/hooks/useJobsListing';
import { CustomSelect } from '@/components/ui/CustomSelect';

interface JobFilterDrawerProps {
    open: boolean;
    onClose: () => void;
    filters: JobFiltersState;
    onUpdate: <K extends keyof JobFiltersState>(key: K, value: JobFiltersState[K]) => void;
    onToggleType: (value: string) => void;
    onClear: () => void;
    activeFilterCount: number;
}

export function JobFilterDrawer({
    open, onClose, filters, onUpdate, onToggleType, onClear, activeFilterCount,
}: JobFilterDrawerProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/20 z-40"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    {/* panel */}
                    <motion.div
                        className="fixed top-0 right-0 bottom-0 w-full sm:w-[380px] bg-white z-50 shadow-2xl flex flex-col"
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.25 }}
                    >
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
                            <h2 className="font-display font-bold text-lg">Filter</h2>
                            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-[#F0F0EE] flex items-center justify-center transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-7">
                            <FilterSection title="Location">
                                <input
                                    type="text"
                                    value={filters.location || ''}
                                    onChange={(e) => onUpdate('location', e.target.value)}
                                    placeholder="Enter location"
                                    className="w-full px-3 py-2.5 rounded-lg border border-border text-[13px] outline-none focus:border-primary-500 bg-white"
                                />
                            </FilterSection>

                            <FilterSection title="Category">
                                <CustomSelect
                                    value={filters.category}
                                    onChange={(v) => onUpdate('category', v)}
                                    options={[
                                        { label: 'All categories', value: '' },
                                        ...JOB_CATEGORIES.map((c) => ({ label: c, value: c }))
                                    ]}
                                    placeholder="All categories"
                                />
                            </FilterSection>

                            <FilterSection title="Job Type">
                                <div className="grid grid-cols-2 gap-2.5">
                                    {JOB_TYPES.map((t) => (
                                        <CheckboxRow
                                            key={t.value}
                                            label={t.label}
                                            checked={filters.type.includes(t.value)}
                                            onChange={() => onToggleType(t.value)}
                                        />
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Experience level">
                                <CustomSelect
                                    value={filters.experienceRequired}
                                    onChange={(v) => onUpdate('experienceRequired', v)}
                                    options={[
                                        { label: 'Any experience', value: '' },
                                        ...EXPERIENCE_LEVELS
                                    ]}
                                    placeholder="Any experience"
                                />
                            </FilterSection>

                            <FilterSection title="Featured">
                                <div className="flex flex-col gap-2.5">
                                    <CheckboxRow
                                        label="Featured only"
                                        checked={filters.isFeatured === 'true'}
                                        onChange={() => onUpdate('isFeatured', filters.isFeatured === 'true' ? '' : 'true')}
                                    />
                                </div>
                            </FilterSection>

                            <FilterSection title="Salary range">
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="number"
                                        value={filters.salaryMin}
                                        onChange={(e) => onUpdate('salaryMin', e.target.value)}
                                        placeholder="Min"
                                        className="px-3 py-2.5 rounded-lg border border-border text-[13px] outline-none focus:border-primary-500"
                                    />
                                    <input
                                        type="number"
                                        value={filters.salaryMax}
                                        onChange={(e) => onUpdate('salaryMax', e.target.value)}
                                        placeholder="Max"
                                        className="px-3 py-2.5 rounded-lg border border-border text-[13px] outline-none focus:border-primary-500"
                                    />
                                </div>
                            </FilterSection>

                            <FilterSection title="Date posted">
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="date"
                                        value={filters.dateFrom}
                                        onChange={(e) => onUpdate('dateFrom', e.target.value)}
                                        className="px-3 py-2.5 rounded-lg border border-border text-[13px] outline-none focus:border-primary-500"
                                    />
                                    <input
                                        type="date"
                                        value={filters.dateTo}
                                        onChange={(e) => onUpdate('dateTo', e.target.value)}
                                        className="px-3 py-2.5 rounded-lg border border-border text-[13px] outline-none focus:border-primary-500"
                                    />
                                </div>
                            </FilterSection>



                            <FilterSection title="Sort by">
                                <CustomSelect
                                    value={filters.sort}
                                    onChange={(v) => onUpdate('sort', v)}
                                    options={SORT_OPTIONS}
                                />
                            </FilterSection>
                        </div>

                        <div className="flex-shrink-0 border-t border-border p-4 flex gap-3">
                            <button
                                onClick={onClear}
                                disabled={activeFilterCount === 0}
                                className="flex-1 px-4 py-2.5 rounded-lg border border-border text-[13px] font-semibold text-foreground hover:bg-[#F0F0EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Clear all
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-[13px] font-semibold transition-colors"
                            >
                                Show results
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-2.5">
            <span className="font-display font-semibold text-[13px] text-foreground">{title}</span>
            {children}
        </div>
    );
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <label className="flex items-center gap-2 text-[13px] text-foreground cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500"
            />
            {label}
        </label>
    );
}