'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface ToolbarFilterOption {
    value: string;
    label: string;
}

export interface ToolbarFilter {
    key: string;
    label: string; // used as the "All {label}" placeholder option
    options: ToolbarFilterOption[];
    value: string; // '' means "all"
    onChange: (value: string) => void;
}

export interface ToolbarSortOption {
    value: string; // e.g. '-createdAt'
    label: string;
}

interface AdminListToolbarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    filters?: ToolbarFilter[];
    sortOptions?: ToolbarSortOption[];
    sortValue?: string;
    onSortChange?: (value: string) => void;
    /** Debounce delay for search input, in ms. */
    debounceMs?: number;
}

/**
 * Generic search + filter + sort bar for admin list pages (jobs,
 * applications, candidates, services, contacts, reviews...).
 * Search is debounced internally; filters/sort fire immediately on change.
 */
export function AdminListToolbar({
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Search...',
    filters = [],
    sortOptions,
    sortValue,
    onSortChange,
    debounceMs = 400,
}: AdminListToolbarProps) {
    const [localSearch, setLocalSearch] = useState(searchValue);

    // Keep local input in sync if parent resets search externally (e.g. "Clear filters").
    useEffect(() => setLocalSearch(searchValue), [searchValue]);

    useEffect(() => {
        const handle = setTimeout(() => {
            if (localSearch !== searchValue) onSearchChange(localSearch);
        }, debounceMs);
        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localSearch]);

    return (
        <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="relative flex-1 min-w-[220px] max-w-[320px]">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full pl-8 pr-3 py-1.5 rounded-md border border-border text-[13px] focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
            </div>

            {filters.map((f) => (
                <select
                    key={f.key}
                    value={f.value}
                    onChange={(e) => f.onChange(e.target.value)}
                    className="px-2.5 py-1.5 rounded-md border border-border text-[13px] bg-white"
                >
                    <option value="">All {f.label}</option>
                    {f.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ))}

            {sortOptions && onSortChange && (
                <select
                    value={sortValue}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="ml-auto px-2.5 py-1.5 rounded-md border border-border text-[13px] bg-white"
                >
                    {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            )}
        </div>
    );
}