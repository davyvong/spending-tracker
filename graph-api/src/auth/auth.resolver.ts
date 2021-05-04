import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AccountModel } from 'src/account/models/account.model';

import { AuthService } from './auth.service';
import { CurrentAccount } from './decorators/current-account.decorator';
import { EmailCredentialsInput } from './dto/email-credentials.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModel } from './models/jwt.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => JwtModel)
  async signInWithEmail(@Args('data') emailCredentialsInput: EmailCredentialsInput): Promise<JwtModel> {
    const { email, plainPassword } = emailCredentialsInput;
    return this.authService.signInWithEmail(email.toLowerCase(), plainPassword);
  }

  @Query(() => JwtModel)
  @UseGuards(JwtAuthGuard)
  async refreshToken(@CurrentAccount() account: AccountModel): Promise<JwtModel> {
    const { id, passwordHash } = account;
    return this.authService.signToken(id, passwordHash);
  }
}
