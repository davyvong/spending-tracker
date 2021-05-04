import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountModel } from 'src/account/models/account.model';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { NewTransactionInput } from './dto/new-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { TransactionModel } from './models/transaction.model';
import { TransactionService } from './transaction.service';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => TransactionModel)
  @UseGuards(JwtAuthGuard)
  async createTransaction(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('data') newTransactionInput: NewTransactionInput,
  ): Promise<TransactionModel> {
    return this.transactionService.create(currentAccount.id, newTransactionInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteTransaction(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('transactionId') transactionId: string,
  ): Promise<boolean> {
    return this.transactionService.deleteById(currentAccount.id, transactionId);
  }

  @Query(() => [TransactionModel])
  @UseGuards(JwtAuthGuard)
  async getRecentTransactions(@CurrentAccount() currentAccount: AccountModel): Promise<TransactionModel[]> {
    return this.transactionService.getByPage(currentAccount.id, 0);
  }

  @Query(() => TransactionModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getTransaction(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('transactionId') transactionId: string,
  ): Promise<TransactionModel> {
    return this.transactionService.getById(currentAccount.id, transactionId);
  }

  @Query(() => [TransactionModel])
  @UseGuards(JwtAuthGuard)
  async getTransactions(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('skip') skip: number,
  ): Promise<TransactionModel[]> {
    return this.transactionService.getByPage(currentAccount.id, skip);
  }

  @Query(() => [TransactionModel])
  @UseGuards(JwtAuthGuard)
  async getTransactionsInCard(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('cardId') cardId: string,
    @Args('skip') skip: number,
  ): Promise<TransactionModel[]> {
    return this.transactionService.getByCard(currentAccount.id, cardId, skip);
  }

  @Query(() => [TransactionModel])
  @UseGuards(JwtAuthGuard)
  async getTransactionsInCategory(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('categoryId') categoryId: string,
    @Args('skip') skip: number,
  ): Promise<TransactionModel[]> {
    return this.transactionService.getByCategory(currentAccount.id, categoryId, skip);
  }

  @Mutation(() => TransactionModel)
  @UseGuards(JwtAuthGuard)
  async updateTransaction(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('transactionId') transactionId: string,
    @Args('data') updateTransactionInput: UpdateTransactionInput,
  ): Promise<TransactionModel> {
    return this.transactionService.updateById(currentAccount.id, transactionId, updateTransactionInput);
  }
}
