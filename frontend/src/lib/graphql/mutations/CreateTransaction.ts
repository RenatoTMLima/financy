import { UpsertTransactionInput } from "@/types/transaction";
import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      title
      amount
      categoryId
      date
      type
    }
  }
`;

export type CreateTransactionMutationInput = {
  data: UpsertTransactionInput;
};
