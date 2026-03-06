import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
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

export type TransactionType = "expense" | "income";

export interface CreateTransactionProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const categoryOptions = [
  { value: "alimentacao", label: "Alimentação" },
  { value: "transporte", label: "Transporte" },
  { value: "mercado", label: "Mercado" },
  { value: "investimento", label: "Investimento" },
  { value: "utilidades", label: "Utilidades" },
  { value: "salario", label: "Salário" },
  { value: "entretenimento", label: "Entretenimento" },
];

export function CreateTransaction({
  open = false,
  onOpenChange,
}: CreateTransactionProps) {
  const [type, setType] = React.useState<TransactionType>("expense");

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-xl rounded-xl border-gray-200 p-6 shadow-lg">
        <ModalHeader className="space-y-1">
          <ModalTitle className="text-xl font-semibold text-gray-900">
            Nova transação
          </ModalTitle>
          <ModalDescription className="text-sm text-gray-600">
            Registre sua despesa ou receita
          </ModalDescription>
        </ModalHeader>

        {/* Transaction type toggle */}
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
                : "border border-transparent bg-transparent hover:bg-gray-200/80"
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full",
                type === "expense" ? "bg-red-base" : "bg-gray-500"
              )}
              aria-hidden
            >
              <Minus className="size-3.5 text-white" strokeWidth={2.5} />
            </span>
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
                : "border border-transparent bg-transparent hover:bg-gray-200/80"
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full",
                type === "income" ? "bg-green-base" : "bg-gray-500"
              )}
              aria-hidden
            >
              <Plus className="size-3.5 text-white" strokeWidth={2.5} />
            </span>
            Receita
          </button>
        </div>

        {/* Form fields */}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            label="Descrição"
            placeholder="Ex. Almoço no restaurante"
            autoComplete="off"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Data"
              type="date"
              placeholder="Selecione"
              className="[&_input]:text-gray-500 [&_input]:placeholder:text-gray-400"
            />
            <Input
              label="Valor"
              type="text"
              inputMode="decimal"
              placeholder="R$ 0,00"
              autoComplete="off"
            />
          </div>

          <Select>
            <SelectTrigger label="Categoria">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="w-full bg-green-dark font-semibold text-white hover:bg-green-base focus-visible:ring-green-base"
          >
            Salvar
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
}
