import { Link } from "@/components/ui/link";
import { Tag } from "@/components/ui/tag";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import { Icon } from "@/components/ui/icon";

export interface TransactionsTableProps {
  transactions: Transaction[];
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
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Transações recentes
        </h2>
        <Link
          to="/transactions"
          className="text-sm text-nowrap flex items-center gap-1 flex-nowrap"
        >
          Ver todas
          <Icon id="chevron-right" className="size-4" />
        </Link>
      </div>

      <table className="w-full border-collapse">
        <tbody>
          {transactions.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-5 py-4 w-full">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg text-neutral-white">
                    <Tag variant="icon" color={row.category.color}>
                      <Icon
                        id={row.category.icon}
                        color={row.category.color}
                        className="size-4"
                      />
                    </Tag>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {row.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(row.date)}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-center">
                <Tag color={row.category.color}>{row.category.title}</Tag>
              </td>
              <td className="px-5 py-4 text-right">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-bold text-gray-800 text-nowrap flex-nowrap",
                  )}
                >
                  {row.type === "income" ? "+ " : "- "}
                  {formatCurrency(Math.abs(row.amount))}
                  {row.type === "income" ? (
                    <Icon
                      id="circle-arrow-up"
                      className="size-4 text-green-base"
                      aria-hidden
                    />
                  ) : (
                    <Icon
                      id="circle-arrow-down"
                      className="size-4 text-red-base"
                      aria-hidden
                    />
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-center border-t border-gray-200 px-5 py-5">
        <Link
          to="/transactions?op=create"
          className="text-nowrap flex items-center gap-1 flex-nowrap"
        >
          <Icon id="plus" />
          Nova transação
        </Link>
      </div>
    </div>
  );
}
