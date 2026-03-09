import { cn } from "@/lib/utils";
import { TransactionType } from "@/types/transaction";
import { Icon } from "../ui/icon";

export function TransactionTypeBadge({ type }: { type: TransactionType }) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 flex-nowrap",
        type === "income" ? "text-green-base" : "text-red-base",
      )}
    >
      <Icon
        id={type === "income" ? "circle-arrow-up" : "circle-arrow-down"}
        color={type === "income" ? "green" : "red"}
        className="size-3.5"
        aria-hidden
      />
      <span className="flex items-center justify-center rounded-full text-inherit text-xs font-bold">
        {type === "income" ? "Entrada" : "Saída"}
      </span>
    </span>
  );
}
