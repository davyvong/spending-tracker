import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionModel {
  @Field()
  accountId: string;

  @Field()
  amount: number;

  @Field()
  cardId: string;

  @Field()
  categoryId: string;

  @Field()
  createTime: number;

  @Field()
  currencyCode: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => ID)
  id: string;

  @Field()
  postTime: string;

  @Field()
  type: string;

  @Field()
  updateTime: number;

  @Field()
  vendor: string;
}
