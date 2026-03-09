import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/DeleteTransaction";
import { useMutation } from "@apollo/client/react";
import { Icon } from "@/components/ui/icon";
import { TransactionTypeBadge } from "@/components/app/transactionType";

export interface TransactionsTableProps {
  transactions: Transaction[];
  pageSize?: number;
  className?: string;
  onUpdate: (id: string) => void;
  onDelete: () => void;
}

export function TransactionsTable({
  transactions,
  pageSize = 10,
  onUpdate,
  onDelete,
}: TransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, transactions.length);
  const pageData = transactions.slice(start, end);

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => {
      onDelete();
    },
  });

  const handleDelete = async (id: string) => {
    await deleteTransaction({
      variables: {
        deleteTransactionId: id,
      },
    });
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-neutral-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 py-5 text-gray-600">
              <th className="p-5 text-left text-xs font-medium uppercase tracking-wide">
                Descrição
              </th>
              <th className="p-5 text-center text-xs font-medium uppercase tracking-wide">
                Data
              </th>
              <th className="p-5 text-center text-xs font-medium uppercase tracking-wide">
                Categoria
              </th>
              <th className="p-5 text-center text-xs font-medium uppercase tracking-wide">
                Tipo
              </th>
              <th className="p-5 text-right text-xs font-medium uppercase tracking-wide">
                Valor
              </th>
              <th className="p-5 text-right text-xs font-medium uppercase tracking-wide">
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
                      )}
                    >
                      <Tag variant="icon" color={row.category.color}>
                        <Icon
                          id={row.category.icon}
                          color={row.category.color}
                          className="size-4"
                        />
                      </Tag>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {row.title}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600 text-center">
                  {formatDate(row.date)}
                </td>
                <td className="px-5 py-3 text-center">
                  <Tag color={row.category.color}>{row.category.title}</Tag>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-center">
                    <TransactionTypeBadge type={row.type} />
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      row.amount >= 0 ? "text-gray-800" : "text-gray-800",
                    )}
                  >
                    {row.type === "income" ? "+ " : "- "}
                    {formatCurrency(Math.abs(row.amount))}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="icon"
                      aria-label="Excluir"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon id="trash" className="size-4 text-red-base" />
                    </Button>
                    <Button
                      type="button"
                      variant="icon"
                      aria-label="Editar"
                      onClick={() => onUpdate(row.id)}
                    >
                      <Icon id="square-pen" className="size-4" />
                    </Button>
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
          ))}
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
