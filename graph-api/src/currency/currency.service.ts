import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import fetch from 'node-fetch';
import { TransactionModel } from 'src/transaction/models/transaction.model';

import { ExchangeRatesModel } from './models/exchange-rates.model';

@Injectable()
export class CurrencyService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getExchangeRates(date = 'latest', currency = 'USD'): Promise<ExchangeRatesModel> {
    const apiUrl = `https://api.exchangeratesapi.io/${date}?base=${currency}`;
    const cachedResponse = await this.cacheManager.get(apiUrl);
    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }
    const response = await fetch(apiUrl);
    const exchangeRates = await response.json();
    const ttl = date === 'latest' ? 86400 : 2592000;
    await this.cacheManager.set(apiUrl, JSON.stringify(exchangeRates), { ttl });
    return exchangeRates;
  }

  async convertCurrency(transactionList: TransactionModel[], currency: string): Promise<TransactionModel[]> {
    const convertedTransactionList = [];
    for (let i = 0; i < transactionList.length; i++) {
      const transaction = transactionList[i];
      if (transaction.currencyCode === currency) {
        convertedTransactionList.push(transaction);
      } else {
        const exchangeRates = await this.getExchangeRates(transaction.postTime, transaction.currencyCode);
        const conversionRate = exchangeRates.rates[currency];
        const convertedTransaction = Object.assign(transaction, {
          amount: transaction.amount * conversionRate,
          currencyCode: currency,
        });
        console.log(convertedTransaction);
        convertedTransactionList.push(convertedTransaction);
      }
    }
    return convertedTransactionList;
  }
}
