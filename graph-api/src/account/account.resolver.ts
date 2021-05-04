import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { AccountService } from './account.service';
import { NewAccountInput } from './dto/new-account.input';
import { NewPasswordInput } from './dto/new-password.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { AccountModel } from './models/account.model';

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => AccountModel)
  async createAccount(@Args('data') newAccountInput: NewAccountInput): Promise<AccountModel> {
    return this.accountService.create(newAccountInput);
  }

  @Query(() => AccountModel)
  @UseGuards(JwtAuthGuard)
  async getMyAccount(@CurrentAccount() currentAccount: AccountModel): Promise<AccountModel> {
    return currentAccount;
  }

  @Mutation(() => AccountModel)
  @UseGuards(JwtAuthGuard)
  async updateAccount(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('data') updateAccountInput: UpdateAccountInput,
  ): Promise<AccountModel> {
    return this.accountService.updateAccount(currentAccount, updateAccountInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('data') newPasswordInput: NewPasswordInput,
  ): Promise<boolean> {
    const { currentPassword, nextPassword } = newPasswordInput;
    return this.accountService.changePassword(currentAccount, currentPassword, nextPassword);
  }
}
