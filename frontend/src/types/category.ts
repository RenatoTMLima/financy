import { Transaction } from "./transaction";
import { z } from "zod";

export type Category = {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  transactions: Transaction[];
};

export const upsertCategorySchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  color: z.string().min(1),
  icon: z.string().min(1),
});

export type UpsertCategoryInput = z.infer<typeof upsertCategorySchema>;
