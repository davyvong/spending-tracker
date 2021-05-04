import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class NewCardInput {
  @Field()
  @IsNotEmpty()
  readonly color: string;

  @Field()
  @IsNotEmpty()
  readonly company: string;

  @Field()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsNotEmpty()
  readonly type: string;
}
