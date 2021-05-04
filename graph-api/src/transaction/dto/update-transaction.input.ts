import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionInput {
  @Field({ nullable: true })
  readonly amount: number;

  @Field({ nullable: true })
  readonly cardId: string;

  @Field({ nullable: true })
  readonly categoryId: string;

  @Field({ nullable: true })
  readonly currencyCode: string;

  @Field({ nullable: true })
  readonly description: string;

  @Field({ nullable: true })
  readonly postTime: string;

  @Field({ nullable: true })
  readonly type: string;

  @Field({ nullable: true })
  readonly vendor: string;
}
