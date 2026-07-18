// ─────────────────────────────────────────────────────────────────────────────
// components/admin/DataTable.tsx
//
// One generic table used by every admin list page (jobs, applications,
// candidates, services, contacts, reviews). Configure via `columns`, don't
// hand-roll a new table per page.
// ─────────────────────────────────────────────────────────────────────────────

'use client';

import { useMemo, useState, type ReactNode } from 'react';

export interface DataTableColumn<T> {
  /** Unique key for this column. */
  key: string;
  /** Column header label. */
  header: string;
  /** Render the cell. Defaults to `String(row[key])` if omitted. */
  render?: (row: T) => ReactNode;
  /** Optional fixed width, e.g. '120px'. */
  width?: string;
  /** Right-align (useful for numbers/actions). */
  align?: 'left' | 'right' | 'center';
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  emptyLabel?: string;
  pageSize?: number;
  /** Optional row click handler (e.g. navigate to detail page). */
  onRowClick?: (row: T) => void;
}

const SKELETON_ROWS = 6;

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  loading = false,
  emptyLabel = 'Nothing to show yet.',
  pageSize = 10,
  onRowClick,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = useMemo(
    () => rows.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [rows, currentPage, pageSize],
  );

  const alignClass = (align?: 'left' | 'right' | 'center') =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className="border border-border rounded-md bg-white overflow-hidden">
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
          <tbody>
            {loading &&
              Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b border-border last:border-0">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-3.5 rounded bg-[#EEEEEC] animate-pulse w-[70%]" />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-muted">
                  {emptyLabel}
                </td>
              </tr>
            )}

            {!loading &&
              pageRows.map((row) => (
                <tr
                  key={rowKey(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`border-b border-border last:border-0 ${
                    onRowClick ? 'cursor-pointer hover:bg-[#FAFAF9]' : ''
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

      {!loading && rows.length > pageSize && (
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border text-xs text-muted">
          <span>
            Page {currentPage} of {totalPages} · {rows.length} total
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAFAF9]"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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

/** Small status pill, reused across list pages for status columns. */
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
