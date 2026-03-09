import { CREATE_CATEGORY } from "@/lib/graphql/mutations/CreateCategory";
import { useMutation } from "@apollo/client/react";
import { CategoryModalBase } from "./CategoryModalBase";
import { UpsertCategoryInput, upsertCategorySchema } from "@/types/category";
import { toast } from "sonner";

export interface CreateCategoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted?: () => void;
}

export function CreateCategory({
  open = false,
  onOpenChange,
  onSubmitted,
}: CreateCategoryProps) {
  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      onOpenChange?.(false);
      onSubmitted?.();
      toast.success("Categoria criada com sucesso");
    },
  });

  const handleSubmit = async (data: UpsertCategoryInput) => {
    try {
      const validatedData = upsertCategorySchema.parse(data);
      await createCategory({
        variables: {
          data: validatedData,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar categoria");
    }
  };

  return (
    <CategoryModalBase
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      isSubmitting={loading}
      locales={{
        title: "Nova categoria",
        description: "Organize suas transações com categorias",
      }}
    />
  );
}
