import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $data: UpdateCategoryInput!
    $updateCategoryId: String!
  ) {
    updateCategory(data: $data, id: $updateCategoryId) {
      title
      color
      description
      icon
      id
    }
  }
`;
