import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtModel {
  @Field({ nullable: true })
  exp: number;

  @Field()
  iat: number;

  @Field()
  token: string;
}
