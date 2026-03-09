import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Tag } from "@/components/ui/tag";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category";
import { useMemo } from "react";

export interface CategoriesTableProps {
  categories: Category[];
  className?: string;
}

export function CategoriesTable({
  categories,
  className,
}: CategoriesTableProps) {
  const sortedCategories = useMemo(() => {
    return categories
      .map((category) => {
        return {
          ...category,
          totalAmount: category.transactions.reduce(
            (acc, transaction) => acc + transaction.amount,
            0,
          ),
        };
      })
      .sort((a, b) => {
        return b.totalAmount - a.totalAmount;
      });
  }, [categories]);

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-gray-200 bg-neutral-white shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Categorias
        </h2>
        <Link
          to="/categories"
          className="text-sm text-nowrap flex items-center gap-1 flex-nowrap"
        >
          Gerenciar <Icon id="chevron-right" className="size-4" />
        </Link>
      </div>

      {sortedCategories.length > 0 ? (
        <table className="w-full border-collapse my-3">
          <tbody>
            {sortedCategories.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <td className="w-full px-5 py-3">
                  <Tag color={row.color}>{row.title}</Tag>
                </td>
                <td className="py-3">
                  <span className="text-gray-500 text-nowrap">
                    {row.transactions.length}{" "}
                    {row.transactions.length === 1 ? "item" : "itens"}
                  </span>
                </td>
                <td className="shrink-0 pl-1 pr-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-4 text-sm">
                    <span className="font-medium text-gray-800">
                      {formatCurrency(row.totalAmount)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
