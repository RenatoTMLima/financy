import { Category } from "@/types/category";
import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
      color
      icon
      transactions {
        id
        amount
      }
    }
  }
`;

export type ListCategoriesQuery = {
  listCategories: Category[];
};

export const LIST_CATEGORIES_ONLY = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
      color
      icon
    }
  }
`;

export type ListCategoriesOnlyQuery = {
  listCategories: Omit<Category, "transactions">[];
};
