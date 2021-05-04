import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class CategoryModel {
  @Field()
  icon: string;

  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
