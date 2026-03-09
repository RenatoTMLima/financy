import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateTransaction } from "@/components/modals/CreateTransaction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionsTable } from "./TransactionsTable";
import { useQuery } from "@apollo/client/react";
import {
  LIST_TRANSACTIONS,
  ListTransactionsQuery,
} from "@/lib/graphql/queries/ListTransactions";
import { UpdateTransaction } from "@/components/modals/UpdateTransaction";
import { Transaction } from "@/types/transaction";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Transactions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { data, refetch } = useQuery<ListTransactionsQuery>(LIST_TRANSACTIONS);

  const transactions = data?.listTransactions || [];

  const categories =
    Array.from(
      new Set(
        data?.listTransactions.map((transaction) => transaction.category),
      ).values(),
    ) || [];

  const openUpdateModal = (id: string) => {
    const foundTransaction = transactions.find(
      (transaction) => transaction.id === id,
    );
    if (!foundTransaction) return;
    setSelectedTransaction(foundTransaction);
    setUpdateModalOpen(true);
  };

  const handleCreateModalOpenChange = (open: boolean) => {
    navigate(`/transactions${open ? "?op=create" : ""}`);
  };

  useEffect(() => {
    setCreateModalOpen(searchParams.get("op") === "create");
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transações</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie todas as suas transações financeiras
            </p>
          </div>
          <Button
            type="button"
            className="shrink-0 shadow-sm"
            leftIcon={<span className="text-lg leading-none">+</span>}
            onClick={() => handleCreateModalOpenChange(true)}
          >
            Nova transação
          </Button>
        </div>

        <CreateTransaction
          open={createModalOpen}
          onOpenChange={handleCreateModalOpenChange}
          onSubmitted={refetch}
        />

        <UpdateTransaction
          key={selectedTransaction?.id}
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          onSubmitted={() => {
            refetch();
            setSelectedTransaction(null);
          }}
          transaction={selectedTransaction}
        />

        <div className="mb-6 rounded-xl border border-gray-200 bg-neutral-white p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="Buscar"
              placeholder="Buscar por descrição"
              leftIcon={<Search className="size-4" />}
            />
            <Select defaultValue="todos">
              <SelectTrigger label="Tipo">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="income">Entrada</SelectItem>
                <SelectItem value="expense">Saída</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="todas">
              <SelectTrigger label="Categoria">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="feb-2026">
              <SelectTrigger label="Período">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feb-2026">Fevereiro / 2026</SelectItem>
                <SelectItem value="mar-2026">Março / 2026</SelectItem>
                <SelectItem value="apr-2026">Abril / 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TransactionsTable
          transactions={transactions}
          pageSize={10}
          onUpdate={openUpdateModal}
          onDelete={refetch}
        />
      </div>
    </div>
  );
}
