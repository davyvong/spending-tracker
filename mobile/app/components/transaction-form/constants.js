import { getCurrency, getSupportedCurrencies } from 'constants/currencies';

export const currencyOptions = getSupportedCurrencies().map(currencyCode => {
  const currency = getCurrency(currencyCode);
  return { label: `${currency.id} (${currency.name})`, value: currency.id };
});

export const typeOptions = [
  {
    label: 'Credit',
    value: 'credit',
  },
  {
    label: 'Debit',
    value: 'debit',
  },
];
