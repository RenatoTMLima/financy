import { cn } from "@/lib/utils";
import { ICON_OPTIONS } from "./options";
import { CATEGORY_COLORS } from "@/lib/categoryColors";

export function Icon({
  id,
  color,
  className,
}: {
  id: string;
  color?: string;
  className?: string;
}) {
  const IconComponent = ICON_OPTIONS.find((icon) => icon.id === id)?.Icon;
  const iconTextColor = color
    ? (CATEGORY_COLORS.find((cl) => cl.id === color)?.text.dark ??
      "text-inherit")
    : "text-inherit";
  if (!IconComponent) return null;
  return (
    <IconComponent
      className={cn("size-5", iconTextColor, className)}
      aria-hidden
    />
  );
}
