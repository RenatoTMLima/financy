import * as React from "react";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/categoryColors";

const tag = tv(
  {
    base: "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium",
    variants: {
      color: CATEGORY_COLORS.reduce(
        (acc, color) => ({
          ...acc,
          [color.id]: `${color.bg.light} ${color.text.dark}`,
        }),
        {} as Record<string, string>,
      ),
      variant: {
        icon: "p-3 rounded-lg",
        text: "",
      },
    },
    defaultVariants: {
      variant: "text",
      color: "blue",
    },
  },
  { twMerge: true },
);

export type TagProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tag>;

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, color, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tag({ variant, color }), className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Tag.displayName = "Tag";

export { Tag };
