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
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { TransactionModel } from "../models/transaction.model";
import { CategoryService } from "../services/category.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { TransactionService } from "../services/transaction.service";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();
  private userService = new UserService();
  private transactionService = new TransactionService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => String) id: string): Promise<boolean> {
    await this.categoryService.deleteCategory(id);
    return true;
  }

  @Query(() => [CategoryModel])
  async listCategories(): Promise<CategoryModel[]> {
    return this.categoryService.listCategories();
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUser(category.userId);
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(
    @Root() category: CategoryModel,
  ): Promise<TransactionModel[]> {
    return this.transactionService.listTransactionsByCategory(category.id);
  }
}
