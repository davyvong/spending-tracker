import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class NewPasswordInput {
  @Field()
  @IsNotEmpty()
  readonly currentPassword: string;

  @Field()
  @IsNotEmpty()
  readonly nextPassword: string;
}
