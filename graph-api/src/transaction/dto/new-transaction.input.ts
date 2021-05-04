import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class NewTransactionInput {
  @Field()
  @IsNotEmpty()
  readonly amount: number;

  @Field()
  @IsNotEmpty()
  readonly cardId: string;

  @Field()
  @IsNotEmpty()
  readonly categoryId: string;

  @Field()
  @IsNotEmpty()
  readonly currencyCode: string;

  @Field({ nullable: true })
  readonly description: string;

  @Field()
  @IsNotEmpty()
  readonly postTime: string;

  @Field()
  @IsNotEmpty()
  readonly type: string;

  @Field()
  @IsNotEmpty()
  readonly vendor: string;
}
