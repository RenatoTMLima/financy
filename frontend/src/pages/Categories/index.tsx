import { useState } from "react";
import {
  FolderOpen,
  ArrowUpDown,
  UtensilsCrossed,
  Film,
  TrendingUp,
  ShoppingCart,
  Briefcase,
  HeartPulse,
  Fuel,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateCategory } from "@/components/CreateCategory";
import { CategorySummaryCard } from "./CategorySummaryCard";
import { CategoryCard } from "./CategoryCard";
import type { TagVariant } from "@/components/ui/tag";

const categories: Array<{
  id: string;
  icon: React.ReactNode;
  variant: TagVariant;
  title: string;
  description: string;
  itemCount: number;
}> = [
  {
    id: "1",
    icon: <UtensilsCrossed className="size-5" />,
    variant: "blue",
    title: "Alimentação",
    description: "Restaurantes, delivery e refeições",
    itemCount: 12,
  },
  {
    id: "2",
    icon: <Film className="size-5" />,
    variant: "pink",
    title: "Entretenimento",
    description: "Cinema, jogos e lazer",
    itemCount: 2,
  },
  {
    id: "3",
    icon: <TrendingUp className="size-5" />,
    variant: "green",
    title: "Investimento",
    description: "Aplicações e retornos financeiros",
    itemCount: 1,
  },
  {
    id: "4",
    icon: <ShoppingCart className="size-5" />,
    variant: "orange",
    title: "Mercado",
    description: "Compras de supermercado e mantimentos",
    itemCount: 3,
  },
  {
    id: "5",
    icon: <Briefcase className="size-5" />,
    variant: "green",
    title: "Salário",
    description: "Renda mensal e bonificações",
    itemCount: 3,
  },
  {
    id: "6",
    icon: <HeartPulse className="size-5" />,
    variant: "red",
    title: "Saúde",
    description: "Medicamentos, consultas e exames",
    itemCount: 0,
  },
  {
    id: "7",
    icon: <Fuel className="size-5" />,
    variant: "purple",
    title: "Transporte",
    description: "Gasolina, transporte público e viagens",
    itemCount: 8,
  },
  {
    id: "8",
    icon: <Zap className="size-5" />,
    variant: "yellow",
    title: "Utilidades",
    description: "Energia, água, internet e telefone",
    itemCount: 7,
  },
];

export function Categories() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
            <p className="mt-1 text-sm text-gray-500">
              Organize suas transações por categorias
            </p>
          </div>
          <Button
            type="button"
            className="shrink-0"
            leftIcon={<span className="text-lg leading-none">+</span>}
            onClick={() => setCreateModalOpen(true)}
          >
            Nova categoria
          </Button>
        </div>

        <CreateCategory
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
        />

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <CategorySummaryCard
            icon={<FolderOpen className="size-5 text-gray-400" />}
            label="Total de categorias"
            value={8}
          />
          <CategorySummaryCard
            icon={<ArrowUpDown className="size-5 text-gray-400" />}
            label="Total de transações"
            value={27}
          />
          <CategorySummaryCard
            icon={<UtensilsCrossed className="size-5 text-blue-base" />}
            label="Categoria mais utilizada"
            categoryName="Alimentação"
          />
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              icon={cat.icon}
              variant={cat.variant}
              title={cat.title}
              description={cat.description}
              itemCount={cat.itemCount}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
