export const CATEGORY_COLORS = [
  {
    id: "blue",
    bg: {
      dark: "bg-blue-dark",
      base: "bg-blue-base",
      light: "bg-blue-light",
    },
    text: {
      dark: "text-blue-dark",
      base: "text-blue-base",
      light: "text-blue-light",
    },
  },
  {
    id: "green",
    bg: {
      dark: "bg-green-dark",
      base: "bg-green-base",
      light: "bg-green-light",
    },
    text: {
      dark: "text-green-dark",
      base: "text-green-base",
      light: "text-green-light",
    },
  },
  {
    id: "red",
    bg: {
      dark: "bg-red-dark",
      base: "bg-red-base",
      light: "bg-red-light",
    },
    text: {
      dark: "text-red-dark",
      base: "text-red-base",
      light: "text-red-light",
    },
  },
  {
    id: "yellow",
    bg: {
      dark: "bg-yellow-dark",
      base: "bg-yellow-base",
      light: "bg-yellow-light",
    },
    text: {
      dark: "text-yellow-dark",
      base: "text-yellow-base",
      light: "text-yellow-light",
    },
  },
  {
    id: "purple",
    bg: {
      dark: "bg-purple-dark",
      base: "bg-purple-base",
      light: "bg-purple-light",
    },
    text: {
      dark: "text-purple-dark",
      base: "text-purple-base",
      light: "text-purple-light",
    },
  },
  {
    id: "pink",
    bg: {
      dark: "bg-pink-dark",
      base: "bg-pink-base",
      light: "bg-pink-light",
    },
    text: {
      dark: "text-pink-dark",
      base: "text-pink-base",
      light: "text-pink-light",
    },
  },
  {
    id: "orange",
    bg: {
      dark: "bg-orange-dark",
      base: "bg-orange-base",
      light: "bg-orange-light",
    },
    text: {
      dark: "text-orange-dark",
      base: "text-orange-base",
      light: "text-orange-light",
    },
  },
] as const;

export type CategoryColor = (typeof CATEGORY_COLORS)[number]["id"];
