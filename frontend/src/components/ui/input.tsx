import * as React from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";

const input = tv(
  {
    slots: {
      root: "group/field grid w-full gap-1.5",
      label: [
        "text-sm font-medium leading-none text-gray-700 transition-colors",
        "group-focus-within/field:text-brand-base",
      ],
      wrapper: [
        "group/input relative flex items-center rounded-md border transition-colors",
        "focus-within:bg-white [&:has(input:not(:placeholder-shown))]:bg-white",
      ],
      icon: [
        "pointer-events-none flex shrink-0 items-center justify-center text-gray-400 transition-colors",
        "pl-3 pr-2 group-focus-within/input:text-brand-base",
      ],
      rightIcon: [
        "flex shrink-0 items-center justify-center pr-3 text-gray-400 transition-colors",
        "group-focus-within/input:text-brand-base [&>button]:cursor-pointer",
      ],
      input: [
        "flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm text-gray-800 transition-colors",
        "placeholder:text-gray-400",
        "focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-gray-400",
        "pr-3",
      ],
      helper: "text-sm text-gray-500",
    },
    variants: {
      error: {
        true: {
          label: "!text-danger",
          wrapper: "border-danger bg-white",
          icon: "!text-danger",
        },
        false: {
          wrapper:
            "border-gray-300 focus-within:border-brand-base focus-within:ring-1 focus-within:ring-brand-base",
        },
      },
      disabled: {
        true: {
          label: "cursor-not-allowed text-gray-400",
          wrapper: "cursor-not-allowed bg-gray-100",
          icon: "!text-gray-400",
          helper: "text-gray-400",
        },
        false: {},
      },
      hasLeftIcon: {
        true: {
          input: "pl-0",
        },
        false: {
          input: "pl-3",
        },
      },
      hasRightIcon: {
        true: {
          input: "pr-0",
        },
        false: {},
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
      hasLeftIcon: false,
      hasRightIcon: false,
    },
  },
  { twMerge: true },
);

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  helperText?: string;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      label,
      helperText,
      error = false,
      leftIcon,
      rightIcon,
      id: idProp,
      disabled,
      ...props
    },
    ref,
  ) => {
    const id = React.useId();
    const inputId = idProp ?? id;
    const styles = input({
      error,
      disabled: !!disabled,
      hasLeftIcon: !!leftIcon,
      hasRightIcon: !!rightIcon,
    });

    return (
      <div className={cn(styles.root(), className)} data-error={error}>
        {label && (
          <label htmlFor={inputId} className={styles.label()}>
            {label}
          </label>
        )}
        <div className={styles.wrapper()}>
          {leftIcon && (
            <span className={styles.icon()} aria-hidden>
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            className={cn(styles.input(), inputClassName)}
            {...props}
          />
          {rightIcon && (
            <span className={styles.rightIcon()} aria-hidden>
              {rightIcon}
            </span>
          )}
        </div>
        {helperText && (
          <p id={`${inputId}-helper`} className={styles.helper()}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
