import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryModel } from "../models/category.model";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { TransactionModel } from "../models/transaction.model";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { GqlUser } from "../graphql/decorators/user.decorator";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService();
  private userService = new UserService();
  private categoryService = new CategoryService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id);
    return true;
  }

  @Query(() => [TransactionModel])
  async listTransactions(): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions();
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.userId);
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel,
  ): Promise<CategoryModel> {
    return this.categoryService.getCategory(transaction.categoryId);
  }
}
