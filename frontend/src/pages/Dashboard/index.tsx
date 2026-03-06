import {
  Wallet,
  TrendingUp,
  TrendingDown,
  FileText,
  UtensilsCrossed,
  Fuel,
  ShoppingCart,
  Leaf,
} from "lucide-react";
import { SummaryCard } from "./SummaryCard";
import { TransactionsTable } from "./TransactionsTable";
import { CategoriesTable } from "./CategoriesTable";
import type { TransactionRow } from "./TransactionsTable";
import type { CategoryRow } from "./CategoriesTable";

const mockTransactions: TransactionRow[] = [
  {
    id: "1",
    icon: <FileText className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Pagamento de Salário",
    date: "01/12/25",
    category: "Receita",
    categoryVariant: "green",
    amount: 4250,
  },
  {
    id: "2",
    icon: <UtensilsCrossed className="size-4" />,
    iconBgClassName: "bg-blue-base",
    description: "Jantar no Restaurante",
    date: "02/12/25",
    category: "Alimentação",
    categoryVariant: "blue",
    amount: -89.5,
  },
  {
    id: "3",
    icon: <Fuel className="size-4" />,
    iconBgClassName: "bg-purple-base",
    description: "Posto de Gasolina",
    date: "03/12/25",
    category: "Transporte",
    categoryVariant: "purple",
    amount: -150,
  },
  {
    id: "4",
    icon: <ShoppingCart className="size-4" />,
    iconBgClassName: "bg-orange-base",
    description: "Compras no Mercado",
    date: "04/12/25",
    category: "Mercado",
    categoryVariant: "orange",
    amount: -220.45,
  },
  {
    id: "5",
    icon: <Leaf className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Retorno de Investimento",
    date: "05/12/25",
    category: "Investimento",
    categoryVariant: "green",
    amount: 180.5,
  },
];

const mockCategories: CategoryRow[] = [
  {
    id: "1",
    name: "Alimentação",
    variant: "blue",
    itemCount: 12,
    totalAmount: 542.3,
  },
  {
    id: "2",
    name: "Transporte",
    variant: "purple",
    itemCount: 8,
    totalAmount: 385.5,
  },
  {
    id: "3",
    name: "Mercado",
    variant: "orange",
    itemCount: 15,
    totalAmount: 892.0,
  },
  {
    id: "4",
    name: "Entretenimento",
    variant: "pink",
    itemCount: 5,
    totalAmount: 210.0,
  },
  {
    id: "5",
    name: "Utilidades",
    variant: "yellow",
    itemCount: 7,
    totalAmount: 340.25,
  },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <section className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            title={
              <>
                <Wallet className="size-4 shrink-0 text-purple-base" />
                Saldo total
              </>
            }
            amount={12847.32}
          />
          <SummaryCard
            title={
              <>
                <TrendingUp className="size-4 shrink-0 text-success" />
                Receitas do mês
              </>
            }
            amount={4250.0}
          />
          <SummaryCard
            title={
              <>
                <TrendingDown className="size-4 shrink-0 text-danger" />
                Despesas do mês
              </>
            }
            amount={2180.45}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TransactionsTable transactions={mockTransactions} />
          </div>
          <div>
            <CategoriesTable categories={mockCategories} />
          </div>
        </section>
      </div>
    </div>
  );
}
