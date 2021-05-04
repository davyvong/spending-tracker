import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCardInput {
  @Field({ nullable: true })
  readonly color: string;

  @Field({ nullable: true })
  readonly company: string;

  @Field({ nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly type: string;
}
