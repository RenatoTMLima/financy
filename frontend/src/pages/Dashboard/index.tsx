import { SummaryCard } from "./SummaryCard";
import { TransactionsTable } from "./TransactionsTable";
import { CategoriesTable } from "./CategoriesTable";
import {
  LIST_TRANSACTIONS,
  ListTransactionsQuery,
} from "@/lib/graphql/queries/ListTransactions";
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import {
  LIST_CATEGORIES,
  ListCategoriesQuery,
} from "@/lib/graphql/queries/ListCategories";
import { Icon } from "@/components/ui/icon";

export function Dashboard() {
  const { data: transactionsData } =
    useQuery<ListTransactionsQuery>(LIST_TRANSACTIONS);
  const { data: categoriesData } =
    useQuery<ListCategoriesQuery>(LIST_CATEGORIES);

  const transactions = transactionsData?.listTransactions || [];
  const categories = categoriesData?.listCategories || [];

  const summary = useMemo(() => {
    const { totalIncome, totalExpense } = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpense += transaction.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 },
    );

    return {
      totalIncome,
      totalExpense,
      totalBalance: totalIncome - totalExpense,
    };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <section className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            title={
              <>
                <Icon
                  id="wallet"
                  className="size-4 shrink-0 text-purple-base"
                />
                Saldo total
              </>
            }
            amount={summary.totalBalance}
          />
          <SummaryCard
            title={
              <>
                <Icon
                  id="circle-arrow-up"
                  className="size-4 shrink-0 text-green-base"
                />
                Receitas do mês
              </>
            }
            amount={summary.totalIncome}
          />
          <SummaryCard
            title={
              <>
                <Icon
                  id="circle-arrow-down"
                  className="size-4 shrink-0 text-red-base"
                />
                Despesas do mês
              </>
            }
            amount={summary.totalExpense}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TransactionsTable transactions={transactions} />
          </div>
          <div>
            <CategoriesTable categories={categories} />
          </div>
        </section>
      </div>
    </div>
  );
}
