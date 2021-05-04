import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountModel {
  @Field()
  createTime: number;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field(() => ID)
  id: string;

  @Field()
  lastName: string;

  passwordHash: string;

  @Field()
  preferredCurrency: string;

  @Field()
  updateTime: number;
}
