import { z } from "zod";
import { Category } from "./category";

export const transactionTypeSchema = z.enum(["income", "expense"]);

export type TransactionType = z.infer<typeof transactionTypeSchema>;

export type Transaction = {
  id: string;
  title: string;
  type: TransactionType;
  amount: number;
  date: string;
  category: Category;
};

export const upsertTransactionSchema = z.object({
  title: z.string().min(1),
  type: transactionTypeSchema,
  amount: z.number().min(0),
  date: z.string().min(1),
  categoryId: z.string().min(1),
});

export type UpsertTransactionInput = z.infer<typeof upsertTransactionSchema>;
