import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CurrencyService } from './currency.service';
import { ExchangeRatesModel } from './models/exchange-rates.model';

@Resolver()
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Query(() => ExchangeRatesModel)
  @UseGuards(JwtAuthGuard)
  async getExchangeRates(@Args('date') date: string, @Args('currency') currency: string): Promise<ExchangeRatesModel> {
    return this.currencyService.getExchangeRates(date, currency);
  }
}
