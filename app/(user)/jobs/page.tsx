'use client';

import { Suspense, useState } from 'react';
import { useJobsListing } from '@/hooks/useJobsListing'
import { JobSearchBar } from '@/components/jobs/JobSearchBar';
import { JobFilterDrawer } from '@/components/jobs/JobFilterDrawer';
import { JobList } from '@/components/jobs/JobList';
import { JobDetailPanel } from '@/components/jobs//JobDetailPanel';

function JobsListContent() {
  const {
    jobs, total, totalPages, page, initialLoading, isFetching, error, selectedJob,
    filters, searchInput, activeFilterCount,
    setSearchInput, updateFilter, toggleTypeFilter, clearFilters, goToPage,
    setSelectedJob, applyOnWhatsApp, retry,
  } = useJobsListing();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);

  const handleSelect = (job: typeof selectedJob) => {
    setSelectedJob(job);
    setShowMobileList(false);
  };

  return (
    // h-screen + flex-col + min-h-0 children is what fixes uncontrolled page
    // overflow: only the list/detail panes scroll, this shell never does.
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 min-h-0 max-w-7xl w-full mx-auto px-4 md:px-6 flex flex-col py-4 gap-4">
        <div className="flex-shrink-0">
          <JobSearchBar
            value={searchInput}
            onChange={setSearchInput}
            onOpenFilters={() => setFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
          <div className={`lg:col-span-4 min-h-0 ${!showMobileList ? 'hidden lg:block' : 'block'}`}>
            <JobList
              jobs={jobs}
              selectedJob={selectedJob}
              onSelect={handleSelect}
              initialLoading={initialLoading}
              isFetching={isFetching}
              error={error}
              onRetry={retry}
              page={page}
              totalPages={totalPages}
              onPageChange={goToPage}
              totalResults={total}
            />
          </div>

          <div className={`lg:col-span-8 min-h-0 ${showMobileList ? 'hidden lg:block' : 'block'}`}>
            {!showMobileList && (
              <button
                onClick={() => setShowMobileList(true)}
                className="lg:hidden mb-3 text-[13px] font-semibold text-muted hover:text-foreground"
              >
                ← Back to roles
              </button>
            )}
            <JobDetailPanel job={selectedJob} onApply={applyOnWhatsApp} />
          </div>
        </div>
      </div>

      <JobFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onUpdate={updateFilter}
        onToggleType={toggleTypeFilter}
        onClear={clearFilters}
        activeFilterCount={activeFilterCount}
      />
    </div>
  );
}

export default function JobsListing() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
      </div>
    }>
      <JobsListContent />
    </Suspense>
  );
}