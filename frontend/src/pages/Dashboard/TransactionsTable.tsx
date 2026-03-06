import type { ReactNode } from "react";
import { ArrowDownLeft, ArrowUpRight, Plus } from "lucide-react";
import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { Tag, type TagVariant } from "@/components/ui/tag";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface TransactionRow {
  id: string;
  icon: ReactNode;
  iconBgClassName: string;
  description: string;
  date: string;
  category: string;
  categoryVariant: TagVariant;
  amount: number;
}

export interface TransactionsTableProps {
  transactions: TransactionRow[];
  className?: string;
}

export function TransactionsTable({
  transactions,
  className,
}: TransactionsTableProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-gray-200 bg-neutral-white shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-800">
          Transações recentes
        </h2>
        <Link to="/transacoes" className="text-sm">
          Ver todas &gt;
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        {transactions.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-3 last:border-b-0"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg text-neutral-white",
                  row.iconBgClassName
                )}
              >
                {row.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-800">
                  {row.description}
                </p>
                <p className="text-xs text-gray-500">{row.date}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Tag variant={row.categoryVariant}>{row.category}</Tag>
              <span
                className={cn(
                  "flex items-center gap-1 text-sm font-bold",
                  row.amount >= 0 ? "text-gray-800" : "text-gray-800"
                )}
              >
                {row.amount >= 0 ? (
                  <ArrowUpRight className="size-4 text-success" aria-hidden />
                ) : (
                  <ArrowDownLeft className="size-4 text-danger" aria-hidden />
                )}
                {row.amount >= 0 ? "+ " : "- "}
                {formatCurrency(Math.abs(row.amount))}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 p-4">
        <Button
          type="button"
          variant="outline"
          className="w-full bg-gray-50 hover:bg-gray-100"
          leftIcon={<Plus className="size-4" />}
        >
          Nova transação
        </Button>
      </div>
    </div>
  );
}
