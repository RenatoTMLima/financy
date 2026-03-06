import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CategorySummaryCardProps {
  icon: ReactNode;
  label: string;
  /** Numeric or string value (e.g. 8, 27). Ignored when categoryName is set. */
  value?: number | string;
  /** For "most used category" card: show this as the main text instead of value. */
  categoryName?: string;
  className?: string;
}

export function CategorySummaryCard({
  icon,
  label,
  value,
  categoryName,
  className,
}: CategorySummaryCardProps) {
  const mainContent = categoryName ?? (value !== undefined ? String(value) : null);

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-neutral-white p-5 shadow-sm",
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2 text-gray-500">
        {icon}
      </div>
      {mainContent !== null && (
        <p className="text-2xl font-bold text-gray-800">{mainContent}</p>
      )}
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
    </div>
  );
}
