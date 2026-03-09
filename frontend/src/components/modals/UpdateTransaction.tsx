import { useMutation } from "@apollo/client/react";
import { TransactionModalBase } from "./TransactionModalBase";
import {
  UpsertTransactionInput,
  Transaction,
  upsertTransactionSchema,
} from "@/types/transaction";
import { UPDATE_TRANSACTION } from "@/lib/graphql/mutations/UpdateTransaction";
import { toast } from "sonner";

export interface UpdateTransactionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitted: () => void;
  transaction: Transaction | null;
}

export function UpdateTransaction({
  open = false,
  onOpenChange,
  onSubmitted,
  transaction,
}: UpdateTransactionProps) {
  if (!transaction) return null;
  const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted: () => {
      onSubmitted?.();
      onOpenChange(false);
      toast.success("Transação atualizada com sucesso");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao atualizar transação");
    },
  });

  const handleSubmit = async (data: UpsertTransactionInput) => {
    try {
      const validatedData = upsertTransactionSchema.parse(data);
      await updateTransaction({
        variables: {
          data: validatedData,
          updateTransactionId: transaction.id,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar transação");
    }
  };

  return (
    <TransactionModalBase
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={handleSubmit}
      isSubmitting={loading}
      initialData={transaction}
      locales={{
        title: "Editar transação",
        description: "Edite sua transação",
      }}
    />
  );
}
