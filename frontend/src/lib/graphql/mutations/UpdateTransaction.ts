import { gql } from "@apollo/client";

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $data: UpdateTransactionInput!
    $updateTransactionId: String!
  ) {
    updateTransaction(data: $data, id: $updateTransactionId) {
      id
      title
      amount
      date
      type
      category {
        title
        id
        color
        icon
      }
    }
  }
`;
