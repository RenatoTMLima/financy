import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { tv } from "tailwind-variants";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const selectTrigger = tv(
  {
    base: [
      "group/select flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 transition-colors",
      "hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-brand-base focus:ring-offset-0 focus:border-brand-base",
      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
      "data-[placeholder]:text-gray-400",
      "[&>span]:line-clamp-1 [&>span]:flex [&>span]:items-center [&>span]:gap-2",
      "pr-3",
    ],
    variants: {
      hasLeftIcon: {
        true: "pl-0",
        false: "pl-3",
      },
    },
    defaultVariants: {
      hasLeftIcon: false,
    },
  },
  { twMerge: true }
);

const selectContent = tv(
  {
    base: [
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-800 shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    ],
    variants: {
      position: {
        "item-aligned": "",
        popper:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      },
    },
    defaultVariants: {
      position: "popper",
    },
  },
  { twMerge: true }
);

const selectViewport = tv({
  base: "p-1",
  variants: {
    position: {
      "item-aligned": "",
      popper:
        "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
    },
  },
  defaultVariants: {
    position: "popper",
  },
});

const selectItem = tv(
  {
    base: [
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-3 pr-8 text-sm outline-none",
      "focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    ],
  },
  { twMerge: true }
);

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  label?: string;
  leftIcon?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, label, leftIcon, id: idProp, ...props }, ref) => {
  const id = React.useId();
  const triggerId = idProp ?? id;

  return (
    <div className="grid w-full gap-1.5">
      {label && (
        <label
          htmlFor={triggerId}
          className="text-sm font-medium leading-none text-gray-700"
        >
          {label}
        </label>
      )}
      <SelectPrimitive.Trigger
        ref={ref}
        id={triggerId}
        className={cn(selectTrigger({ hasLeftIcon: !!leftIcon }), className)}
        {...props}
      >
        <span className="flex flex-1 items-center gap-2">
          {leftIcon && (
            <span
              className="flex shrink-0 items-center justify-center text-gray-500"
              aria-hidden
            >
              {leftIcon}
            </span>
          )}
          {children}
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            className="size-4 shrink-0 text-gray-500 transition-transform group-data-[state=open]/select:rotate-180"
            aria-hidden
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </div>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(selectContent({ position }), className)}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={selectViewport({ position })}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(selectItem(), className)}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4 text-brand-base" aria-hidden />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
};
