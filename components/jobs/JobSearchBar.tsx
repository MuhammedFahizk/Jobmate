
import { Search, SlidersHorizontal } from 'lucide-react';

interface JobSearchBarProps {
    value: string;
    onChange: (v: string) => void;
    onOpenFilters: () => void;
    activeFilterCount: number;
    placeholder?: string;
}

export function JobSearchBar({ value, onChange, onOpenFilters, activeFilterCount, placeholder }: JobSearchBarProps) {
    return (
        <div className="bg-white rounded-full border border-border shadow-sm flex items-center gap-2 p-1.5 pl-5">
            <Search size={18} className="text-muted flex-shrink-0" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ?? 'Search roles, companies, or locations...'}
                className="flex-1 min-w-0 py-2 text-[14px] text-foreground placeholder-muted outline-none bg-transparent"
            />
            <button
                onClick={onOpenFilters}
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-[13px] font-semibold transition-colors"
            >
                <SlidersHorizontal size={14} />
                Filter
                {activeFilterCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-white text-primary-700 text-[10px] font-bold flex items-center justify-center">
                        {activeFilterCount}
                    </span>
                )}
            </button>
        </div>
    );
}