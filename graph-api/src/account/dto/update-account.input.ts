import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateAccountInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  readonly lastName: string;

  @Field()
  @IsNotEmpty()
  readonly plainPassword: string;

  @Field({ nullable: true })
  readonly preferredCurrency: string;
}
