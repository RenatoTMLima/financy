import { cn, parseInputDate, parseOutputDate } from "@/lib/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  UpsertTransactionInput,
  Transaction,
  TransactionType,
} from "@/types/transaction";
import {
  LIST_CATEGORIES_ONLY,
  ListCategoriesOnlyQuery,
} from "@/lib/graphql/queries/ListCategories";
import { useQuery } from "@apollo/client/react";
import { Icon } from "../ui/icon";

type TransactionModalBaseProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Transaction;
  onSubmit: (data: UpsertTransactionInput) => Promise<void>;
  isSubmitting: boolean;
  locales: {
    title: string;
    description: string;
  };
};

export function TransactionModalBase(data: TransactionModalBaseProps) {
  const { locales, initialData, onSubmit, open, onOpenChange, isSubmitting } =
    data;

  const [type, setType] = useState<TransactionType>(
    initialData?.type || "expense",
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [amount, setAmount] = useState(initialData?.amount || 0);
  const [date, setDate] = useState(initialData?.date || "");
  const [category, setCategory] = useState(initialData?.category.id || "");

  const { data: categoriesData } =
    useQuery<ListCategoriesOnlyQuery>(LIST_CATEGORIES_ONLY);
  const categories = categoriesData?.listCategories || [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({
      title,
      amount,
      date,
      type,
      categoryId: category,
    });
    setTitle("");
    setAmount(0);
    setDate("");
    setCategory("");
    setType("expense");
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-xl rounded-xl border-gray-200 p-6 shadow-lg">
        <ModalHeader className="space-y-1">
          <ModalTitle className="text-xl font-semibold text-gray-900">
            {locales.title}
          </ModalTitle>
          <ModalDescription className="text-sm text-gray-600">
            {locales.description}
          </ModalDescription>
        </ModalHeader>

        <div
          className="grid grid-cols-2 gap-0 rounded-md bg-gray-100 p-1"
          role="tablist"
          aria-label="Tipo de transação"
        >
          <button
            type="button"
            role="tab"
            aria-selected={type === "expense"}
            onClick={() => setType("expense")}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-900 transition-colors",
              type === "expense"
                ? "border border-red-base bg-white"
                : "border border-transparent bg-transparent hover:bg-gray-200/80",
            )}
          >
            <Icon
              id="circle-arrow-down"
              className={type === "expense" ? "text-red-base" : "text-gray-500"}
            />
            Despesa
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={type === "income"}
            onClick={() => setType("income")}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-900 transition-colors",
              type === "income"
                ? "border border-green-base bg-white"
                : "border border-transparent bg-transparent hover:bg-gray-200/80",
            )}
          >
            <Icon
              id="circle-arrow-up"
              className={
                type === "income" ? "text-green-base" : "text-gray-500"
              }
            />
            Receita
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="Descrição"
            placeholder="Ex. Almoço no restaurante"
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Data"
              type="date"
              placeholder="Selecione"
              className="[&_input]:text-gray-500 [&_input]:placeholder:text-gray-400"
              onChange={(e) => {
                console.log("DATE", new Date(e.target.value).toISOString());
                setDate(parseInputDate(e.target.value));
              }}
              value={date ? parseOutputDate(date) : ""}
            />
            <Input
              label="Valor"
              type="text"
              inputMode="decimal"
              placeholder="R$ 0,00"
              autoComplete="off"
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
            />
          </div>

          <Select
            onValueChange={(value) => setCategory(value)}
            value={category}
          >
            <SelectTrigger label="Categoria">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="w-full bg-green-dark font-semibold text-white hover:bg-green-base focus-visible:ring-green-base"
            disabled={isSubmitting}
          >
            Salvar
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
}
