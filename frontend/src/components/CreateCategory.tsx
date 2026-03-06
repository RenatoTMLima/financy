import * as React from "react";
import {
  Briefcase,
  Car,
  Heart,
  MapPin,
  ShoppingCart,
  Tag,
  ShoppingBag,
  UtensilsCrossed,
  Cloud,
  Home,
  Gift,
  CircleDollarSign,
  BookOpen,
  FileText,
  type LucideIcon,
} from "lucide-react";
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

export interface CreateCategoryProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ICON_OPTIONS: { id: string; Icon: LucideIcon }[] = [
  { id: "briefcase", Icon: Briefcase },
  { id: "car", Icon: Car },
  { id: "heart", Icon: Heart },
  { id: "map-pin", Icon: MapPin },
  { id: "shopping-cart", Icon: ShoppingCart },
  { id: "tag", Icon: Tag },
  { id: "shopping-bag", Icon: ShoppingBag },
  { id: "utensils", Icon: UtensilsCrossed },
  { id: "cloud", Icon: Cloud },
  { id: "home", Icon: Home },
  { id: "gift", Icon: Gift },
  { id: "dollar", Icon: CircleDollarSign },
  { id: "book", Icon: BookOpen },
  { id: "file", Icon: FileText },
];

const COLOR_OPTIONS: { id: string; bgClass: string; label: string }[] = [
  { id: "green", bgClass: "bg-green-dark", label: "Verde" },
  { id: "blue", bgClass: "bg-blue-base", label: "Azul" },
  { id: "purple", bgClass: "bg-purple-base", label: "Roxo" },
  { id: "pink", bgClass: "bg-pink-base", label: "Rosa" },
  { id: "red", bgClass: "bg-red-base", label: "Vermelho" },
  { id: "orange", bgClass: "bg-orange-base", label: "Laranja" },
  { id: "yellow", bgClass: "bg-yellow-base", label: "Amarelo" },
];

export function CreateCategory({
  open = false,
  onOpenChange,
}: CreateCategoryProps) {
  const [selectedIconId, setSelectedIconId] = React.useState(ICON_OPTIONS[0].id);
  const [selectedColorId, setSelectedColorId] = React.useState(
    COLOR_OPTIONS[0].id
  );

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-xl rounded-xl border-gray-200 p-6 shadow-lg">
        <ModalHeader className="space-y-1">
          <ModalTitle className="text-xl font-semibold text-gray-900">
            Nova categoria
          </ModalTitle>
          <ModalDescription className="text-sm text-gray-600">
            Organize suas transações com categorias
          </ModalDescription>
        </ModalHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            label="Título"
            placeholder="Ex. Alimentação"
            autoComplete="off"
          />

          <div className="grid w-full gap-1.5">
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium leading-none text-gray-700">
                Descrição
              </label>
              <span className="text-xs text-gray-500">Opcional</span>
            </div>
            <textarea
              placeholder="Descrição da categoria"
              rows={3}
              className={cn(
                "w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 transition-colors",
                "placeholder:text-gray-400 focus:border-brand-base focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-base"
              )}
            />
          </div>

          <div className="grid w-full gap-1.5">
            <label className="text-sm font-medium leading-none text-gray-700">
              Ícone
            </label>
            <div
              className="grid grid-cols-7 gap-2"
              role="group"
              aria-label="Selecione um ícone"
            >
              {ICON_OPTIONS.map(({ id, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedIconId(id)}
                  aria-pressed={selectedIconId === id}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-md border border-transparent transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-brand-base focus:ring-offset-2",
                    selectedIconId === id
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200/80"
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </button>
              ))}
            </div>
          </div>

          <div className="grid w-full gap-1.5">
            <label className="text-sm font-medium leading-none text-gray-700">
              Cor
            </label>
            <div
              className="flex flex-wrap gap-3"
              role="group"
              aria-label="Selecione uma cor"
            >
              {COLOR_OPTIONS.map(({ id, bgClass, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedColorId(id)}
                  aria-pressed={selectedColorId === id}
                  aria-label={label}
                  className={cn(
                    "size-8 rounded-full transition-[box-shadow] focus:outline-none focus:ring-2 focus:ring-brand-base focus:ring-offset-2",
                    bgClass,
                    selectedColorId === id
                      ? "ring-2 ring-white ring-offset-2 ring-offset-gray-100 shadow-md"
                      : "hover:opacity-90"
                  )}
                />
              ))}
            </div>
          </div>

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
