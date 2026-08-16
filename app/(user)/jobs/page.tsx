'use client';

import { Suspense, useState, useCallback } from 'react';
import { useJobsListing } from '@/hooks/useJobsListing';
import { JobSearchBar } from '@/components/jobs/JobSearchBar';
import { JobFilterDrawer } from '@/components/jobs/JobFilterDrawer';
import { JobList } from '@/components/jobs/JobList';
import { JobDetailPanel } from '@/components/jobs/JobDetailPanel';
import { ApplyBlockModal } from '@/components/jobs/ApplyBlockModal';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmModal';
import type { AdminJob } from '@/lib/types/job.type';

function JobsListContent() {
  const {
    jobs, total, totalPages, page, initialLoading, isFetching, error, selectedJob,
    filters, searchInput, activeFilterCount,
    setSearchInput, updateFilter, toggleTypeFilter, clearFilters, goToPage,
    setSelectedJob, applyToJob, isApplying, applyBlock, dismissApplyBlock,
    appliedJobIds, retry,
  } = useJobsListing();

  const { success, error: toastError, info } = useToast();
  const confirm = useConfirm();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);

  const handleSelect = (job: typeof selectedJob) => {
    setSelectedJob(job);
    if (window.innerWidth < 1024) {
      setShowMobileList(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApply = useCallback(async (job: AdminJob) => {
    if (appliedJobIds.has(job._id)) {
      info('Already Applied', 'You have already applied to this job. Check your dashboard for status updates.');
      return;
    }

    const ok = await confirm({
      variant: 'info',
      title: `Apply to "${job.title}"?`,
      description: `You're about to apply for the ${job.title} position at ${job.company}. Your profile will be shared with the recruiter.`,
      confirmLabel: 'Yes, Apply',
      cancelLabel: 'Not Now',
    });

    if (!ok) return;

    const result = await applyToJob(job);
    if (!result) return;
    console.log(result)
    if (result.ok) {
      if (result.code === 'ALREADY_APPLIED') {
        info('Already Applied', 'You\'ve already applied to this job. Check your dashboard for updates.');
      } else {
        success('Application Sent!', `Your application for ${job.title} at ${job.company} has been submitted successfully.`);
      }
    } else {
      if (result.code !== 'PAYMENT_REQUIRED' && result.code !== 'ACCOUNT_INACTIVE') {
        toastError('Application Failed', result.message || 'Something went wrong. Please try again later.');
      }
    }
  }, [appliedJobIds, applyToJob, confirm, success, toastError, info]);

  const hasApplied = selectedJob ? appliedJobIds.has(selectedJob._id) : false;

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 pt-6 md:pt-10 flex flex-col gap-6">
        <div>
          <JobSearchBar
            value={searchInput}
            onChange={setSearchInput}
            experienceRequired={filters.experienceRequired ?? ''}
            onExperienceChange={(v) => updateFilter('experienceRequired', v)}
            location={filters.location ?? ''}
            onLocationChange={(v) => updateFilter('location', v)}
            onOpenFilters={() => setFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className={`lg:col-span-5 xl:col-span-4 flex flex-col lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto custom-scrollbar lg:pr-2 ${!showMobileList ? 'hidden lg:flex' : 'flex'}`}>
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

          <div className={`lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24 lg:overflow-y-auto custom-scrollbar ${showMobileList ? 'hidden lg:block' : 'block'}`}>
            {!showMobileList && (
              <button
                onClick={() => setShowMobileList(true)}
                className="lg:hidden mb-4 text-[13px] font-semibold text-muted hover:text-foreground flex items-center gap-1"
              >
                ← Back to roles
              </button>
            )}
            <JobDetailPanel
              job={selectedJob}
              onApply={handleApply}
              isApplying={isApplying}
              hasApplied={hasApplied}
            />
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

      <ApplyBlockModal reason={applyBlock} onClose={dismissApplyBlock} />
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