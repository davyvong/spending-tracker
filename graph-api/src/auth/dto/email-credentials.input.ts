import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class EmailCredentialsInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  readonly plainPassword: string;
}
