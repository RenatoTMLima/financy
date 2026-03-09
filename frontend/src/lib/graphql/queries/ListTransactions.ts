import { Transaction } from "@/types/transaction";
import { gql } from "@apollo/client";

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      id
      title
      type
      amount
      date
      category {
        id
        title
        icon
        color
      }
    }
  }
`;

export type ListTransactionsQuery = {
  listTransactions: Transaction[];
};
