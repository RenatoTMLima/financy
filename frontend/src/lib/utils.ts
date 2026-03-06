import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  options: { locale?: string; currency?: string } = {}
): string {
  const { locale = "pt-BR", currency = "BRL" } = options;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}
