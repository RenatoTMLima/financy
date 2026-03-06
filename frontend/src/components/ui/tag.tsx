import * as React from "react";
import { tv } from "tailwind-variants";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const tag = tv(
  {
    base: "inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-sm font-medium",
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700",
        brand: "bg-green-light text-brand-dark",
        success: "bg-green-light text-green-dark",
        danger: "bg-red-light text-red-dark",
        blue: "bg-blue-light text-blue-dark",
        purple: "bg-purple-light text-purple-dark",
        pink: "bg-pink-light text-pink-dark",
        red: "bg-red-light text-red-dark",
        orange: "bg-orange-light text-orange-dark",
        yellow: "bg-yellow-light text-yellow-dark",
        green: "bg-green-light text-green-dark",
      },
      removable: {
        true: "pr-1.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      removable: false,
    },
  },
  { twMerge: true },
);

export type TagVariant =
  | "default"
  | "brand"
  | "success"
  | "danger"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  /** When provided, shows a remove button and calls this on click. */
  onRemove?: () => void;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "default", onRemove, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tag({ variant, removable: onRemove != null }), className)}
        {...props}
      >
        {children}
        {onRemove != null && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={cn(
              "inline-flex shrink-0 rounded p-0.5 transition-colors",
              "hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400",
              "cursor-pointer touch-manipulation",
            )}
            aria-label="Remove tag"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        )}
      </span>
    );
  },
);

Tag.displayName = "Tag";

export { Tag };
