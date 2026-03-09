import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  options: { locale?: string; currency?: string } = {},
): string {
  const { locale = "pt-BR", currency = "BRL" } = options;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(date: string, options: { locale?: string } = {}) {
  const { locale = "pt-BR" } = options;
  return new Intl.DateTimeFormat(locale).format(new Date(date));
}

export function parseInputDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toISOString();
}

export function parseOutputDate(date: string) {
  return date.split("T")[0];
}
