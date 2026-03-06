import { Link } from "@/components/ui/link";
import { Tag, type TagVariant } from "@/components/ui/tag";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface CategoryRow {
  id: string;
  name: string;
  variant: TagVariant;
  itemCount: number;
  totalAmount: number;
}

export interface CategoriesTableProps {
  categories: CategoryRow[];
  className?: string;
}

export function CategoriesTable({
  categories,
  className,
}: CategoriesTableProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-gray-200 bg-neutral-white shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-800">
          Categorias
        </h2>
        <Link to="/categorias" className="text-sm">
          Gerenciar &gt;
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        {categories.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-3 last:border-b-0"
          >
            <Tag variant={row.variant}>{row.name}</Tag>
            <div className="flex shrink-0 items-center gap-4 text-sm">
              <span className="text-gray-500">
                {row.itemCount} {row.itemCount === 1 ? "item" : "itens"}
              </span>
              <span className="font-medium text-gray-800">
                {formatCurrency(row.totalAmount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
