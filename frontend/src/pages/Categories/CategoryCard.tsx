import type { ReactNode } from "react";
import { Tag } from "@/components/ui/tag";
import { Category } from "@/types/category";
import { useMutation } from "@apollo/client/react";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/DeleteCategory";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export interface CategoryCardProps {
  icon: ReactNode;
  variant: string;
  title: string;
  description: string;
  itemCount: number;
  className?: string;
}

export function CategoryCard({
  category,
  onDeleted,
  openEditModal,
}: {
  category: Category;
  onDeleted: () => void;
  openEditModal: (id: string) => void;
}) {
  const { color, icon, title, description, id } = category;
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const handleDelete = async () => {
    await deleteCategory({
      variables: {
        deleteCategoryId: id,
      },
    });
    onDeleted?.();
  };

  return (
    <div className="relative rounded-xl border border-gray-200 bg-neutral-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <Tag variant="icon" color={color}>
          <Icon id={icon} color={color} className="size-4" />
        </Tag>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="icon"
            aria-label="Excluir"
            onClick={handleDelete}
          >
            <Icon id="trash" className="size-4 text-red-base" />
          </Button>
          <Button
            type="button"
            variant="icon"
            aria-label="Editar"
            onClick={() => openEditModal(id)}
          >
            <Icon id="square-pen" className="size-4" />
          </Button>
        </div>
      </div>
      <h3 className="text-base font-bold text-gray-800">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <Tag color={color}>{title}</Tag>
        <span className="text-sm text-gray-500">
          {category.transactions.length}{" "}
          {category.transactions.length === 1 ? "item" : "itens"}
        </span>
      </div>
    </div>
  );
}
