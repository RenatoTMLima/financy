import { Field, GraphQLISODateTime, InputType } from "type-graphql";
import { TransactionType } from "@prisma/client";

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  title!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date;

  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}
