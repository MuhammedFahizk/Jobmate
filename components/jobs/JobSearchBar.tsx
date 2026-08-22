import { ChevronDown } from 'lucide-react';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { CustomSelect } from '@/components/ui/CustomSelect';

const EXPERIENCE_OPTIONS = [
    { value: '', label: 'Select experience' },
    { value: 'fresher', label: 'Fresher' },
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5+', label: '5+ years' },
];

interface JobSearchBarProps {
    value: string;
    onChange: (v: string) => void;
    experienceRequired: string;
    onExperienceChange: (v: string) => void;
    location: string;
    onLocationChange: (v: string) => void;
    onOpenFilters: () => void;
    activeFilterCount: number;
}

export function JobSearchBar({
    value,
    onChange,
    experienceRequired,
    onExperienceChange,
    location,
    onLocationChange,
    onOpenFilters,
    activeFilterCount,
}: JobSearchBarProps) {
    return (
        <div className="bg-white rounded-full border border-border shadow-sm flex items-center gap-1 p-1.5 pl-6 w-full">
            {/* Keyword */}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter keyword / designation / companies"
                className="flex-[1.6] min-w-0 py-2.5 text-[14px] text-foreground placeholder-muted outline-none bg-transparent"
            />

            <span className="h-6 w-px bg-border flex-shrink-0 hidden md:block" />

            {/* Experience */}
            <div className="relative flex-1 min-w-0 hidden md:block">
                <CustomSelect
                    value={experienceRequired}
                    onChange={(v) => onExperienceChange(v)}
                    options={EXPERIENCE_OPTIONS}
                    placeholder="Select experience"
                    variant="ghost"
                />
            </div>

            <span className="h-6 w-px bg-border flex-shrink-0 hidden md:block" />

            {/* Location */}
            <input
                type="text"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="Enter location"
                className="flex-1 min-w-0 py-2.5 text-[14px] text-foreground placeholder-muted outline-none bg-transparent hidden md:block"
            />

            {/* Advanced filters (type, salary, category, etc.) still live in the drawer */}
            <button
                type="button"
                onClick={onOpenFilters}
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-[14px] font-semibold transition-colors"
            >
                <SlidersHorizontal size={14} />
                {activeFilterCount > 0 ? (
                    <span className="w-4 h-4 rounded-full bg-white text-primary-700 text-[10px] font-bold flex items-center justify-center">
                        {activeFilterCount}
                    </span>
                ) : (
                    <SearchIcon size={14} />
                )}
            </button>
        </div>
    );
}