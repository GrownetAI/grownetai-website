"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Compact pager: "X–Y of N" + prev/next, used under tables. */
export default function Pagination({
  page,
  pageCount,
  pageSize,
  total,
  onPage,
}: {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const btn =
    "inline-flex items-center justify-center w-8 h-8 rounded-lg border border-line text-fg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-elevated enabled:hover:text-fg";

  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-fg-muted tabular-nums">
        <span className="font-medium text-fg">{from}</span>–
        <span className="font-medium text-fg">{to}</span> of{" "}
        <span className="font-medium text-fg">{total}</span>
      </span>
      <div className="flex items-center gap-2">
        <button
          className={btn}
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-fg-muted tabular-nums px-1">
          {page} / {pageCount}
        </span>
        <button
          className={btn}
          onClick={() => onPage(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
