import { useMutation } from "@apollo/client/react";
import { CategoryModalBase } from "./CategoryModalBase";
import {
  Category,
  UpsertCategoryInput,
  upsertCategorySchema,
} from "@/types/category";
import { UPDATE_CATEGORY } from "@/lib/graphql/mutations/UpdateCategory";
import { toast } from "sonner";

export interface UpdateCategoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onSubmitted?: () => void;
}

export function UpdateCategory({
  open = false,
  onOpenChange,
  onSubmitted,
  category,
}: UpdateCategoryProps) {
  if (!category) return null;
  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => {
      onOpenChange?.(false);
      onSubmitted?.();
      toast.success("Categoria atualizada com sucesso");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao atualizar categoria");
    },
  });

  const handleSubmit = async (data: UpsertCategoryInput) => {
    try {
      const validatedData = upsertCategorySchema.parse(data);
      updateCategory({
        variables: {
          data: validatedData,
          updateCategoryId: category.id,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar categoria");
    }
  };

  return (
    <CategoryModalBase
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      initialData={category}
      isSubmitting={loading}
      locales={{
        title: "Editar categoria",
        description: "Edite a categoria para organizar suas transações",
      }}
    />
  );
}
