import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import moment from 'moment-timezone';
import { AccountModel } from 'src/account/models/account.model';
import { CurrentAccount } from 'src/auth/decorators/current-account.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Timezone } from 'src/common/decorators/timezone.decorator';
import { getDateStringFromMoment, getMonthStringFromMoment } from 'src/common/utils/date.util';

import { DateSpendingModel } from './models/date-spending.model';
import { SummaryService } from './summary.service';

@Resolver()
export class SummaryResolver {
  constructor(private readonly summaryService: SummaryService) {}

  @Query(() => [DateSpendingModel])
  @UseGuards(JwtAuthGuard)
  async getDailySpending(
    @CurrentAccount() currentAccount: AccountModel,
    @Timezone() timezone: string,
  ): Promise<DateSpendingModel[]> {
    const { id, preferredCurrency } = currentAccount;
    const tempDate = moment().tz(timezone);
    const endDate = getDateStringFromMoment(tempDate);
    tempDate.subtract(6, 'days');
    const startDate = getDateStringFromMoment(tempDate);
    return this.summaryService.getSpendingByDay(id, startDate, endDate, preferredCurrency);
  }

  @Query(() => DateSpendingModel)
  @UseGuards(JwtAuthGuard)
  async getMonthlySpending(
    @CurrentAccount() currentAccount: AccountModel,
    @Timezone() timezone: string,
    @Args('cardId') cardId: string,
    @Args('month') monthDate: string,
  ): Promise<DateSpendingModel> {
    const { preferredCurrency } = currentAccount;
    let tempDate = moment(monthDate, 'YYYY-MM');
    const startDate = getMonthStringFromMoment(tempDate);
    const currentDate = moment().tz(timezone);
    let endDate;
    if (tempDate.isSame(currentDate, 'month')) {
      tempDate = currentDate;
      endDate = getDateStringFromMoment(tempDate);
    } else {
      tempDate.add(1, 'months');
      endDate = getMonthStringFromMoment(tempDate);
    }
    const filters: any = {};
    if (cardId) {
      filters.cardId = cardId;
    }
    return this.summaryService.getSpendingByMonth(currentAccount.id, startDate, endDate, preferredCurrency, filters);
  }
}
