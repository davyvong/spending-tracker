import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CardModel {
  @Field()
  accountId: string;

  @Field()
  color: string;

  @Field()
  company: string;

  @Field()
  createTime: number;

  @Field()
  name: string;

  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  updateTime: number;
}
