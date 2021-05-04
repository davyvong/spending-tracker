import { Injectable } from '@nestjs/common';
import moment from 'moment-timezone';
import { getDateStringFromMoment } from 'src/common/utils/date.util';
import { CurrencyService } from 'src/currency/currency.service';
import { TransactionModel } from 'src/transaction/models/transaction.model';
import { TransactionService } from 'src/transaction/transaction.service';

import { DateSpendingModel } from './models/date-spending.model';

@Injectable()
export class SummaryService {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly transactionService: TransactionService,
  ) {}

  async getSpendingByDay(
    accountId: string,
    startDate: string,
    endDate: string,
    currency: string,
  ): Promise<DateSpendingModel[]> {
    const dayCount = moment(endDate).diff(moment(startDate), 'days');
    let transactions = await this.transactionService.getByDateRange(accountId, startDate, endDate);
    if (transactions.some(t => t.currencyCode !== currency)) {
      transactions = await this.currencyService.convertCurrency(transactions, currency);
    }
    const spendingSummary = Array(dayCount + 1)
      .fill(null)
      .reduce((summary: Record<string, DateSpendingModel>, item, index: number) => {
        const date = moment(endDate);
        date.subtract(dayCount - index, 'days');
        const dateString = getDateStringFromMoment(date);
        summary[dateString] = {
          credit: 0,
          currencyCode: currency,
          date: dateString,
          debit: 0,
        };
        return summary;
      }, {});
    transactions.forEach((transaction: TransactionModel) => {
      if (transaction.type === 'credit') {
        spendingSummary[transaction.postTime].credit += transaction.amount;
      } else if (transaction.type === 'debit') {
        spendingSummary[transaction.postTime].debit += transaction.amount;
      }
    });
    return Object.values(spendingSummary);
  }

  async getSpendingByMonth(
    accountId: string,
    startDate: string,
    endDate: string,
    currency: string,
    filters: any,
  ): Promise<DateSpendingModel> {
    let transactions = await this.transactionService.getByDateRange(accountId, startDate, endDate, filters);
    if (transactions.some(t => t.currencyCode !== currency)) {
      transactions = await this.currencyService.convertCurrency(transactions, currency);
    }
    let creditTotal = 0,
      debitTotal = 0;
    transactions.forEach((transaction: TransactionModel) => {
      if (transaction.type === 'credit') {
        creditTotal += transaction.amount;
      } else if (transaction.type === 'debit') {
        debitTotal += transaction.amount;
      }
    });
    return {
      credit: creditTotal,
      currencyCode: currency,
      date: startDate,
      debit: debitTotal,
    };
  }
}
