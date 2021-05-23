import { DataSource } from 'apollo-datasource';
import fetch from 'node-fetch';

export default class CurrencyDataSource extends DataSource {
  initialize(config) {
    this.cache = config.cache;
    this.context = config.context;
  }

  async getExchangeRates(date = 'latest', currency = 'USD') {
    const url = new URL(`http://api.exchangerate.host/${date}?base=${currency}`);
    let exchangeRates = await this.cache.get(url.href);
    if (exchangeRates) {
      return exchangeRates;
    }
    const response = await fetch(url);
    exchangeRates = await response.json();
    await this.cache.set(url.href, exchangeRates);
    return exchangeRates;
  }

  async convert(transactions, currency) {
    const convertedTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      if (transaction.currencyCode === currency) {
        convertedTransactions.push(transaction);
      } else {
        const exchangeRates = await this.getExchangeRates(transaction.postDate, transaction.currencyCode);
        const conversionRate = exchangeRates.rates[currency];
        Object.assign(transaction, {
          amount: transaction.amount * conversionRate,
          currencyCode: currency,
        });
        convertedTransactions.push(transaction);
      }
    }
    return convertedTransactions;
  }
}
