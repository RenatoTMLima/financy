import type { ReactNode } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Tag, type TagVariant } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

const iconBgByVariant: Record<TagVariant, string> = {
  default: "bg-gray-200 text-gray-700",
  brand: "bg-brand-base text-neutral-white",
  success: "bg-green-base text-neutral-white",
  danger: "bg-red-base text-neutral-white",
  blue: "bg-blue-base text-neutral-white",
  purple: "bg-purple-base text-neutral-white",
  pink: "bg-pink-base text-neutral-white",
  red: "bg-red-base text-neutral-white",
  orange: "bg-orange-base text-neutral-white",
  yellow: "bg-yellow-base text-neutral-white",
  green: "bg-green-base text-neutral-white",
};

export interface CategoryCardProps {
  icon: ReactNode;
  variant: TagVariant;
  title: string;
  description: string;
  itemCount: number;
  className?: string;
}

export function CategoryCard({
  icon,
  variant,
  title,
  description,
  itemCount,
  className,
}: CategoryCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-gray-200 bg-neutral-white p-5 shadow-sm",
        className
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg [&>svg]:size-5",
            iconBgByVariant[variant]
          )}
        >
          {icon}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-base focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-1"
            aria-label="Editar"
          >
            <Pencil className="size-4" />
          </button>
          <button
            type="button"
            className="rounded p-2 text-gray-400 transition-colors hover:bg-red-light hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-1"
            aria-label="Excluir"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
      <h3 className="text-base font-bold text-gray-800">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <Tag variant={variant}>{title}</Tag>
        <span className="text-sm text-gray-500">
          {itemCount} {itemCount === 1 ? "item" : "itens"}
        </span>
      </div>
    </div>
  );
}
