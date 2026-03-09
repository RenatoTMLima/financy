import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateCategory } from "@/components/modals/CreateCategory";
import { CategorySummaryCard } from "./CategorySummaryCard";
import { CategoryCard } from "./CategoryCard";
import { useQuery } from "@apollo/client/react";
import {
  LIST_CATEGORIES,
  ListCategoriesQuery,
} from "@/lib/graphql/queries/ListCategories";
import { UpdateCategory } from "@/components/modals/UpdateCategory";
import { Category } from "@/types/category";
import { Icon } from "@/components/ui/icon";

export function Categories() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const { data, refetch } = useQuery<ListCategoriesQuery>(LIST_CATEGORIES);

  const categories = data?.listCategories || [];

  const summary = useMemo(() => {
    if (!categories.length)
      return {
        totalCategories: 0,
        totalTransactions: 0,
        mostUsedCategory: "",
      };

    return {
      totalCategories: categories.length,
      totalTransactions: categories.reduce(
        (acc, cat) => acc + cat.transactions.length,
        0,
      ),
      mostUsedCategory: categories.reduce((acc, cat) =>
        acc.transactions.length > cat.transactions.length ? acc : cat,
      )?.title,
    };
  }, [categories]);

  const openEditModal = (id: string) => {
    const foundCategory = categories.find((cat) => cat.id === id);
    if (!foundCategory) return;
    setSelectedCategory(foundCategory);
    setEditModalOpen(true);
  };

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
          onSubmitted={refetch}
        />

        <UpdateCategory
          key={selectedCategory?.id}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onSubmitted={() => {
            refetch();
            setSelectedCategory(null);
          }}
          category={selectedCategory}
        />

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <CategorySummaryCard
            icon={<Icon id="tag" className="text-gray-700" />}
            label="Total de categorias"
            value={summary.totalCategories}
          />
          <CategorySummaryCard
            icon={<Icon id="arrow-up-down" className="text-purple-base" />}
            label="Total de transações"
            value={summary.totalTransactions}
          />
          <CategorySummaryCard
            icon={<Icon id="utensils" className="text-blue-base" />}
            label="Categoria mais utilizada"
            categoryName={summary.mostUsedCategory}
          />
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onDeleted={refetch}
              openEditModal={openEditModal}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
