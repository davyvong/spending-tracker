import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DateSpendingModel {
  @Field()
  credit: number;

  @Field()
  currencyCode: string;

  @Field()
  date: string;

  @Field()
  debit: number;
}
