import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class NewAccountInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  readonly firstName: string;

  @Field()
  @IsNotEmpty()
  readonly lastName: string;

  @Field()
  @IsNotEmpty()
  readonly plainPassword: string;
}
