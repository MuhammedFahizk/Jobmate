'use client';

import { useMemo, useState, type ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  width?: string;
  align?: 'left' | 'right' | 'center';
}

export interface ServerPagination {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** True only when there's no data yet — shows full skeleton rows. */
  loading?: boolean;
  /**
   * True during a background refetch (filter/search/sort/page change) while
   * previous rows are still shown. Dims existing rows instead of replacing
   * them with skeletons, so the table doesn't visibly "reload".
   */
  isFetching?: boolean;
  emptyLabel?: string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  serverPagination?: ServerPagination;
}

const SKELETON_ROWS = 6;

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  loading = false,
  isFetching = false,
  emptyLabel = 'Nothing to show yet.',
  pageSize = 10,
  onRowClick,
  serverPagination,
}: DataTableProps<T>) {
  const [clientPage, setClientPage] = useState(1);

  const isServer = !!serverPagination;

  const totalPages = isServer
    ? serverPagination!.totalPages
    : Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = isServer ? serverPagination!.page : Math.min(clientPage, totalPages);
  const totalCount = isServer ? serverPagination!.total : rows.length;

  const pageRows = useMemo(() => {
    if (isServer) return rows;
    return rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [rows, currentPage, pageSize, isServer]);

  const goToPage = (p: number) => {
    if (isServer) serverPagination!.onPageChange(p);
    else setClientPage(p);
  };

  const alignClass = (align?: 'left' | 'right' | 'center') =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

  const showPagination = isServer ? totalPages > 1 : rows.length > pageSize;

  // Only show the full skeleton when there's genuinely nothing to show yet.
  const showSkeleton = loading && rows.length === 0;

  return (
    <div className="border border-border rounded-md bg-white overflow-hidden relative">
      {/* Thin top progress bar during background refetch — table stays put. */}
      {isFetching && !showSkeleton && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary-100 overflow-hidden z-10">
          <div className="h-full w-1/3 bg-primary-500 animate-[loading-bar_1s_ease-in-out_infinite]" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-[#FAFAF9]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`px-4 py-2.5 font-medium text-[12px] uppercase tracking-wide text-muted whitespace-nowrap ${alignClass(col.align)}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={isFetching && !showSkeleton ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
            {showSkeleton &&
              Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b border-border last:border-0">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-3.5 rounded bg-[#EEEEEC] animate-pulse w-[70%]" />
                    </td>
                  ))}
                </tr>
              ))}

            {!showSkeleton && pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-muted">
                  {emptyLabel}
                </td>
              </tr>
            )}

            {!showSkeleton &&
              pageRows.map((row) => (
                <tr
                  key={rowKey(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`border-b border-border last:border-0 ${onRowClick ? 'cursor-pointer hover:bg-[#FAFAF9]' : ''
                    }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3 text-foreground ${alignClass(col.align)}`}>
                      {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!showSkeleton && showPagination && (
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border text-xs text-muted">
          <span>
            Page {currentPage} of {totalPages} · {totalCount} total
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled={currentPage <= 1 || isFetching}
              onClick={() => goToPage(currentPage - 1)}
              className="px-2.5 py-1 rounded border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAFAF9]"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages || isFetching}
              onClick={() => goToPage(currentPage + 1)}
              className="px-2.5 py-1 rounded border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAFAF9]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status, tone }: { status: string; tone: 'neutral' | 'positive' | 'warning' | 'negative' }) {
  const toneClass = {
    neutral: 'bg-[#F0F0EE] text-muted border-border',
    positive: 'bg-[#EAF4FD] text-primary-700 border-primary-100',
    warning: 'bg-[#FEF6E7] text-[#8A5A14] border-[#F3E0B8]',
    negative: 'bg-[#FCEAEA] text-[#B3261E] border-[#F3CBCB]',
  }[tone];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border capitalize ${toneClass}`}>
      {status}
    </span>
  );
}