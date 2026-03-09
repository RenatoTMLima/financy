import type { ReactNode } from "react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface SummaryCardProps {
  title: ReactNode;
  amount: number;
  className?: string;
}

export function SummaryCard({ title, amount, className }: SummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-neutral-white p-6",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
        {title}
      </div>
      <p className="text-2xl font-bold text-gray-800">
        {formatCurrency(amount)}
      </p>
    </div>
  );
}
