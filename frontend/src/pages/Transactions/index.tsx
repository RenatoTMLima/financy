import { Search } from "lucide-react";
import {
  UtensilsCrossed,
  Fuel,
  ShoppingCart,
  Leaf,
  Home,
  Briefcase,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionsTable } from "./TransactionsTable";
import type { TransactionRow } from "./TransactionsTable";

const mockTransactions: TransactionRow[] = [
  {
    id: "1",
    icon: <UtensilsCrossed className="size-4" />,
    iconBgClassName: "bg-blue-base",
    description: "Jantar no Restaurante",
    date: "30/11/25",
    category: "Alimentação",
    categoryVariant: "blue",
    type: "saida",
    amount: -89.5,
  },
  {
    id: "2",
    icon: <Fuel className="size-4" />,
    iconBgClassName: "bg-purple-base",
    description: "Posto de Gasolina",
    date: "29/11/25",
    category: "Transporte",
    categoryVariant: "purple",
    type: "saida",
    amount: -150,
  },
  {
    id: "3",
    icon: <ShoppingCart className="size-4" />,
    iconBgClassName: "bg-orange-base",
    description: "Compras no Mercado",
    date: "28/11/25",
    category: "Mercado",
    categoryVariant: "orange",
    type: "saida",
    amount: -220.45,
  },
  {
    id: "4",
    icon: <Leaf className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Retorno de Investimento",
    date: "27/11/25",
    category: "Investimento",
    categoryVariant: "green",
    type: "entrada",
    amount: 340.25,
  },
  {
    id: "5",
    icon: <Home className="size-4" />,
    iconBgClassName: "bg-orange-base",
    description: "Aluguel",
    date: "25/11/25",
    category: "Utilidades",
    categoryVariant: "yellow",
    type: "saida",
    amount: -1700,
  },
  {
    id: "6",
    icon: <Briefcase className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Freelance",
    date: "24/11/25",
    category: "Salário",
    categoryVariant: "green",
    type: "entrada",
    amount: 1200,
  },
  {
    id: "7",
    icon: <Film className="size-4" />,
    iconBgClassName: "bg-pink-base",
    description: "Cinema",
    date: "23/11/25",
    category: "Entretenimento",
    categoryVariant: "pink",
    type: "saida",
    amount: -65,
  },
  {
    id: "8",
    icon: <UtensilsCrossed className="size-4" />,
    iconBgClassName: "bg-blue-base",
    description: "Almoço delivery",
    date: "22/11/25",
    category: "Alimentação",
    categoryVariant: "blue",
    type: "saida",
    amount: -42,
  },
  {
    id: "9",
    icon: <Fuel className="size-4" />,
    iconBgClassName: "bg-purple-base",
    description: "Uber",
    date: "21/11/25",
    category: "Transporte",
    categoryVariant: "purple",
    type: "saida",
    amount: -28.5,
  },
  {
    id: "10",
    icon: <ShoppingCart className="size-4" />,
    iconBgClassName: "bg-orange-base",
    description: "Supermercado",
    date: "20/11/25",
    category: "Mercado",
    categoryVariant: "orange",
    type: "saida",
    amount: -185.9,
  },
  {
    id: "11",
    icon: <Leaf className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Dividendos",
    date: "19/11/25",
    category: "Investimento",
    categoryVariant: "green",
    type: "entrada",
    amount: 95,
  },
  {
    id: "12",
    icon: <Home className="size-4" />,
    iconBgClassName: "bg-orange-base",
    description: "Conta de luz",
    date: "18/11/25",
    category: "Utilidades",
    categoryVariant: "yellow",
    type: "saida",
    amount: -210,
  },
  {
    id: "13",
    icon: <Briefcase className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Pagamento de Salário",
    date: "15/11/25",
    category: "Salário",
    categoryVariant: "green",
    type: "entrada",
    amount: 4250,
  },
  {
    id: "14",
    icon: <Film className="size-4" />,
    iconBgClassName: "bg-pink-base",
    description: "Streaming",
    date: "14/11/25",
    category: "Entretenimento",
    categoryVariant: "pink",
    type: "saida",
    amount: -39.9,
  },
  {
    id: "15",
    icon: <UtensilsCrossed className="size-4" />,
    iconBgClassName: "bg-blue-base",
    description: "Café",
    date: "13/11/25",
    category: "Alimentação",
    categoryVariant: "blue",
    type: "saida",
    amount: -18,
  },
  {
    id: "16",
    icon: <Fuel className="size-4" />,
    iconBgClassName: "bg-purple-base",
    description: "Estacionamento",
    date: "12/11/25",
    category: "Transporte",
    categoryVariant: "purple",
    type: "saida",
    amount: -35,
  },
  {
    id: "17",
    icon: <ShoppingCart className="size-4" />,
    iconBgClassName: "bg-orange-base",
    description: "Farmácia",
    date: "11/11/25",
    category: "Mercado",
    categoryVariant: "orange",
    type: "saida",
    amount: -78.5,
  },
  {
    id: "18",
    icon: <Leaf className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Aplicação",
    date: "10/11/25",
    category: "Investimento",
    categoryVariant: "green",
    type: "saida",
    amount: -500,
  },
  {
    id: "19",
    icon: <Home className="size-4" />,
    iconBgClassName: "bg-orange-base",
    description: "Internet",
    date: "09/11/25",
    category: "Utilidades",
    categoryVariant: "yellow",
    type: "saida",
    amount: -99.9,
  },
  {
    id: "20",
    icon: <Briefcase className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Consultoria",
    date: "08/11/25",
    category: "Salário",
    categoryVariant: "green",
    type: "entrada",
    amount: 800,
  },
  {
    id: "21",
    icon: <Film className="size-4" />,
    iconBgClassName: "bg-pink-base",
    description: "Show",
    date: "07/11/25",
    category: "Entretenimento",
    categoryVariant: "pink",
    type: "saida",
    amount: -120,
  },
  {
    id: "22",
    icon: <UtensilsCrossed className="size-4" />,
    iconBgClassName: "bg-blue-base",
    description: "Jantar",
    date: "06/11/25",
    category: "Alimentação",
    categoryVariant: "blue",
    type: "saida",
    amount: -95,
  },
  {
    id: "23",
    icon: <Fuel className="size-4" />,
    iconBgClassName: "bg-purple-base",
    description: "Manutenção carro",
    date: "05/11/25",
    category: "Transporte",
    categoryVariant: "purple",
    type: "saida",
    amount: -320,
  },
  {
    id: "24",
    icon: <ShoppingCart className="size-4" />,
    iconBgClassName: "bg-orange-base",
    description: "Padaria",
    date: "04/11/25",
    category: "Mercado",
    categoryVariant: "orange",
    type: "saida",
    amount: -45,
  },
  {
    id: "25",
    icon: <Leaf className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Resgate investimento",
    date: "03/11/25",
    category: "Investimento",
    categoryVariant: "green",
    type: "entrada",
    amount: 1500,
  },
  {
    id: "26",
    icon: <Home className="size-4" />,
    iconBgClassName: "bg-orange-base",
    description: "Água",
    date: "02/11/25",
    category: "Utilidades",
    categoryVariant: "yellow",
    type: "saida",
    amount: -65,
  },
  {
    id: "27",
    icon: <Briefcase className="size-4" />,
    iconBgClassName: "bg-green-base",
    description: "Bônus",
    date: "01/11/25",
    category: "Salário",
    categoryVariant: "green",
    type: "entrada",
    amount: 500,
  },
];

export function Transactions() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Transações</h1>
            <p className="mt-1 text-sm text-gray-400">
              Gerencie todas as suas transações financeiras
            </p>
          </div>
          <Button
            type="button"
            className="shrink-0 shadow-sm"
            leftIcon={<span className="text-lg leading-none">+</span>}
          >
            Nova transação
          </Button>
        </div>

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
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="saida">Saída</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="todas">
              <SelectTrigger label="Categoria">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="alimentacao">Alimentação</SelectItem>
                <SelectItem value="transporte">Transporte</SelectItem>
                <SelectItem value="mercado">Mercado</SelectItem>
                <SelectItem value="investimento">Investimento</SelectItem>
                <SelectItem value="utilidades">Utilidades</SelectItem>
                <SelectItem value="salario">Salário</SelectItem>
                <SelectItem value="entretenimento">Entretenimento</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="nov-2025">
              <SelectTrigger label="Período">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nov-2025">Novembro / 2025</SelectItem>
                <SelectItem value="out-2025">Outubro / 2025</SelectItem>
                <SelectItem value="set-2025">Setembro / 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TransactionsTable transactions={mockTransactions} pageSize={10} />
      </div>
    </div>
  );
}
