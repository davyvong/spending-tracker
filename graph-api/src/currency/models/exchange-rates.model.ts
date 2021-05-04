import { Field, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@ObjectType()
export class ExchangeRatesModel {
  @Field()
  base: string;

  @Field()
  date: string;

  @Field(() => JSON)
  rates: Record<string, number>;
}
