import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountModel } from 'src/account/models/account.model';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CardService } from './card.service';
import { NewCardInput } from './dto/new-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { CardModel } from './models/card.model';

@Resolver()
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Mutation(() => CardModel)
  @UseGuards(JwtAuthGuard)
  async createCard(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('data') newCardInput: NewCardInput,
  ): Promise<CardModel> {
    return this.cardService.create(currentAccount.id, newCardInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteCard(@CurrentAccount() currentAccount: AccountModel, @Args('cardId') cardId: string): Promise<boolean> {
    return this.cardService.deleteById(currentAccount.id, cardId);
  }

  @Query(() => [CardModel])
  @UseGuards(JwtAuthGuard)
  async getAllCards(): Promise<CardModel[]> {
    return this.cardService.getAll();
  }

  @Query(() => CardModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getCard(@CurrentAccount() currentAccount: AccountModel, @Args('cardId') cardId: string): Promise<CardModel> {
    return this.cardService.getById(currentAccount.id, cardId);
  }

  @Mutation(() => CardModel)
  @UseGuards(JwtAuthGuard)
  async updateCard(
    @CurrentAccount() currentAccount: AccountModel,
    @Args('cardId') cardId: string,
    @Args('data') updateCardInput: UpdateCardInput,
  ): Promise<CardModel> {
    return this.cardService.updateById(currentAccount.id, cardId, updateCardInput);
  }
}
