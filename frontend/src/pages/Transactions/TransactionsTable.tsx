import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, Pencil, Trash2 } from "lucide-react";
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
  type: "entrada" | "saida";
  amount: number;
}

export interface TransactionsTableProps {
  transactions: TransactionRow[];
  pageSize?: number;
  className?: string;
}

export function TransactionsTable({
  transactions,
  pageSize = 10,
  className,
}: TransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, transactions.length);
  const pageData = transactions.slice(start, end);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-neutral-white shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600">
                Descrição
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600">
                Data
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600">
                Categoria
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600">
                Tipo
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600">
                Valor
              </th>
              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-600">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50/50"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg text-neutral-white",
                        row.iconBgClassName
                      )}
                    >
                      {row.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {row.description}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">{row.date}</td>
                <td className="px-5 py-3">
                  <Tag variant={row.categoryVariant}>{row.category}</Tag>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    {row.type === "entrada" ? (
                      <>
                        <span className="flex size-5 items-center justify-center rounded-full bg-green-light text-success">
                          <Plus className="size-3" aria-hidden />
                        </span>
                        Entrada
                      </>
                    ) : (
                      <>
                        <span className="flex size-5 items-center justify-center rounded-full bg-red-light text-danger">
                          <Minus className="size-3" aria-hidden />
                        </span>
                        Saída
                      </>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      row.amount >= 0 ? "text-gray-800" : "text-gray-800"
                    )}
                  >
                    {row.amount >= 0 ? "+ " : "- "}
                    {formatCurrency(Math.abs(row.amount))}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-1"
                      aria-label="Editar"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded p-2 text-gray-400 transition-colors hover:bg-red-light hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-1"
                      aria-label="Excluir"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 px-5 py-3">
        <p className="text-sm text-gray-600">
          {transactions.length === 0
            ? "0 resultados"
            : `${start + 1} a ${end} / ${transactions.length} resultados`}
        </p>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="pagination"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Button
                key={page}
                type="button"
                variant="pagination"
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
                aria-label={`Página ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Button>
            )
          )}
          <Button
            type="button"
            variant="pagination"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Próxima página"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
