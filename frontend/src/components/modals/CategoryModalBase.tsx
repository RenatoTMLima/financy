import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORY_ICON_OPTIONS } from "@/components/ui/icon/options";
import { useState } from "react";
import { UpsertCategoryInput } from "@/types/category";
import { CATEGORY_COLORS } from "@/lib/categoryColors";

type CategoryModalBaseProps = {
  locales: {
    title: string;
    description: string;
  };
  initialData?: UpsertCategoryInput;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpsertCategoryInput) => Promise<void>;
  isSubmitting: boolean;
};

export function CategoryModalBase({
  initialData,
  open,
  onOpenChange,
  onSubmit,
  locales,
  isSubmitting,
}: CategoryModalBaseProps) {
  const [selectedIconId, setSelectedIconId] = useState(
    initialData?.icon || CATEGORY_ICON_OPTIONS[0].id,
  );
  const [selectedColorId, setSelectedColorId] = useState(
    initialData?.color || CATEGORY_COLORS[0].id,
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({
      title,
      description,
      icon: selectedIconId,
      color: selectedColorId,
    });
    setTitle("");
    setDescription("");
    setSelectedIconId(CATEGORY_ICON_OPTIONS[0].id);
    setSelectedColorId(CATEGORY_COLORS[0].id);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="min-w-[448px] rounded-xl border-gray-200 p-6 shadow-lg">
        <ModalHeader className="space-y-1">
          <ModalTitle className="text-xl font-semibold text-gray-900">
            {locales.title}
          </ModalTitle>
          <ModalDescription className="text-sm text-gray-600">
            {locales.description}
          </ModalDescription>
        </ModalHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="Título"
            placeholder="Ex. Alimentação"
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
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
                "placeholder:text-gray-400 focus:border-brand-base focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-base",
              )}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="grid w-full gap-3">
            <label className="text-sm font-medium leading-none text-gray-700">
              Ícone
            </label>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Selecione um ícone"
            >
              {CATEGORY_ICON_OPTIONS.map(({ id, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedIconId(id)}
                  aria-pressed={selectedIconId === id}
                  className={cn(
                    "flex size-12 items-center justify-center rounded-md border border-gray-300 transition-colors focus:outline-none",
                    selectedIconId === id
                      ? "bg-gray-100 text-gray-800 border-brand-base"
                      : "text-gray-600 hover:bg-gray-100/80",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full gap-5">
            <label className="text-sm font-medium leading-none text-gray-700">
              Cor
            </label>
            <div
              className="flex flex-wrap gap-6 px-1"
              role="group"
              aria-label="Selecione uma cor"
            >
              {CATEGORY_COLORS.map(({ id, bg }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedColorId(id)}
                  aria-pressed={selectedColorId === id}
                  aria-label={id}
                  className={cn(
                    "h-6 rounded-md transition-[box-shadow] focus:outline-none focus:ring-2 focus:ring-brand-base focus:ring-offset-4 flex-1 ring-2 ring-gray-300 ring-offset-4 shadow-md",
                    bg.base,
                    selectedColorId === id
                      ? "ring-brand-base"
                      : "hover:opacity-90",
                  )}
                />
              ))}
            </div>
          </div>

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
