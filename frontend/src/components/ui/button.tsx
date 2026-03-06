import * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";

const button = tv(
  {
    base: [
      "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:cursor-not-allowed",
    ],
    variants: {
      variant: {
        default: [
          "bg-brand-base text-white",
          "hover:bg-brand-dark",
          "disabled:bg-brand-base/50 disabled:text-white/90",
        ],
        outline: [
          "border border-gray-300 bg-white text-gray-700",
          "hover:border-gray-400 hover:text-gray-800",
          "disabled:border-gray-200 disabled:text-gray-400",
        ],
        pagination: "h-8 min-w-8 px-2 text-sm",
      },
      size: {
        md: "",
        sm: "",
      },
      active: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "pagination",
        active: true,
        class: "border-0 bg-brand-base text-white",
      },
      {
        variant: "pagination",
        active: false,
        disabled: true,
        class: "border border-gray-300 bg-white text-gray-400 hover:bg-white",
      },
      {
        variant: "pagination",
        active: false,
        disabled: false,
        class:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
      },
      { variant: "default", size: "md", class: "h-10 px-4 text-sm" },
      { variant: "default", size: "sm", class: "h-8 px-3 text-xs" },
      { variant: "outline", size: "md", class: "h-10 px-4 text-sm" },
      { variant: "outline", size: "sm", class: "h-8 px-3 text-xs" },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      active: false,
      disabled: false,
    },
  },
  { twMerge: true }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "pagination";
  size?: "md" | "sm";
  leftIcon?: React.ReactNode;
  /** When true and variant is "pagination", shows the active (selected page) style. */
  active?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      leftIcon,
      active = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-current={variant === "pagination" && active ? "page" : undefined}
        className={cn(
          button({
            variant,
            size,
            active,
            disabled: !!disabled,
          }),
          className
        )}
        {...props}
      >
        {leftIcon && (
          <span
            className={cn(
              "flex shrink-0 items-center",
              size === "md" && "[&>svg]:size-4",
              size === "sm" && "[&>svg]:size-3.5"
            )}
          >
            {leftIcon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
