import { prismaClient } from "../../prisma/prisma";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    return prismaClient.transaction.create({
      data: {
        title: data.title,
        type: data.type,
        amount: data.amount,
        date: data.date,
        categoryId: data.categoryId,
        userId,
      },
    });
  }

  async updateTransaction(id: string, data: UpdateTransactionInput) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) throw new Error("Transação não encontrada");

    return prismaClient.transaction.update({
      where: { id },
      data: {
        title: data.title,
        amount: data.amount,
        categoryId: data.categoryId,
        date: data.date,
        type: data.type,
      },
    });
  }

  async deleteTransaction(id: string) {
    const findTransaction = await prismaClient.transaction.findUnique({
      where: {
        id,
      },
    });
    if (!findTransaction) throw new Error("Transação não encontrada");
    return prismaClient.transaction.delete({
      where: {
        id,
      },
    });
  }

  async listTransactions(userId: string) {
    return prismaClient.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  async listTransactionsByCategory(categoryId: string, userId: string) {
    return prismaClient.transaction.findMany({
      where: {
        categoryId,
        userId,
      },
    });
  }
}
