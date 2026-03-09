import { Toaster as Sonner } from "sonner";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ className, toastOptions, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className={cn("toaster group", className)}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-neutral-white group-[.toaster]:text-gray-800 group-[.toaster]:border-gray-200 group-[.toaster]:!shadow-lg",
          description: "group-[.toaster]:text-gray-600",
          actionButton:
            "group-[.toaster]:!bg-brand-base group-[.toaster]:!text-white group-[.toaster]:hover:!bg-brand-dark",
          cancelButton:
            "group-[.toaster]:!bg-gray-200 group-[.toaster]:!text-gray-700 group-[.toaster]:hover:!bg-gray-300",
          closeButton:
            "group-[.toaster]:!bg-neutral-white group-[.toaster]:!text-gray-600 group-[.toaster]:!border-gray-200",
          success:
            "group-[.toaster]:!border-success group-[.toaster]:text-success group-[.toaster]:!bg-green-light group-[.toaster]:[&>svg]:!text-success",
          error:
            "group-[.toaster]:!border-danger group-[.toaster]:text-danger group-[.toaster]:!bg-red-light group-[.toaster]:[&>svg]:!text-danger",
          warning:
            "group-[.toaster]:!border-orange-base group-[.toaster]:[&>svg]:!text-orange-base",
          info: "group-[.toaster]:!border-blue-base group-[.toaster]:[&>svg]:!text-blue-base",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
