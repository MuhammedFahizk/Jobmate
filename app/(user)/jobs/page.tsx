'use client';

import { Suspense, useState } from 'react';
import { useJobsListing } from '@/hooks/useJobsListing';
import { JobSearchBar } from '@/components/jobs/JobSearchBar';
import { JobFilterDrawer } from '@/components/jobs/JobFilterDrawer';
import { JobList } from '@/components/jobs/JobList';
import { JobDetailPanel } from '@/components/jobs/JobDetailPanel'; // fixed double slash

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
    // Auto switch to detail view on mobile when a job is selected
    if (window.innerWidth < 1024) {
      setShowMobileList(false);
      // Scroll to top for a better mobile experience when reading detail
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 pt-6 md:pt-10 flex flex-col gap-6">
        <div>
          <JobSearchBar
            value={searchInput}
            onChange={setSearchInput}
            onOpenFilters={() => setFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className={`lg:col-span-5 xl:col-span-4 flex flex-col ${!showMobileList ? 'hidden lg:flex' : 'flex'}`}>
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

          <div className={`lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto custom-scrollbar ${showMobileList ? 'hidden lg:block' : 'block'}`}>
            {!showMobileList && (
              <button
                onClick={() => setShowMobileList(true)}
                className="lg:hidden mb-4 text-[13px] font-semibold text-muted hover:text-foreground flex items-center gap-1"
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