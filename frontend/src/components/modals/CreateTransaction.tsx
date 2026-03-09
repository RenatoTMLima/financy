import { useMutation } from "@apollo/client/react";
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/CreateTransaction";
import { TransactionModalBase } from "./TransactionModalBase";
import {
  UpsertTransactionInput,
  upsertTransactionSchema,
} from "@/types/transaction";
import { toast } from "sonner";

export interface CreateTransactionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
}

export function CreateTransaction({
  open = false,
  onOpenChange,
  onSubmitted,
}: CreateTransactionProps) {
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    onCompleted: () => {
      onSubmitted?.();
      onOpenChange(false);
      toast.success("Transação criada com sucesso");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao criar transação");
    },
  });

  const handleSubmit = async (data: UpsertTransactionInput) => {
    try {
      const validatedData = upsertTransactionSchema.parse(data);
      await createTransaction({
        variables: {
          data: validatedData,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar transação");
    }
  };

  return (
    <TransactionModalBase
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      isSubmitting={loading}
      locales={{
        title: "Nova transação",
        description: "Registre sua transação",
      }}
    />
  );
}
