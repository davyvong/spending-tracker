// Source: https://gist.github.com/Fluidbyte/2973986

export const getCurrency = currencyCode => currencyMap[currencyCode];

export const getSupportedCurrencies = () => ['AUD', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'JPY', 'USD'];

const currencyMap = {
  AUD: {
    id: 'AUD',
    name: 'Australian Dollar',
  },
  CAD: {
    id: 'CAD',
    name: 'Canadian Dollar',
  },
  CHF: {
    id: 'CHF',
    name: 'Swiss Franc',
  },
  CNY: {
    id: 'CNY',
    name: 'Chinese Yuan',
  },
  EUR: {
    id: 'EUR',
    name: 'Euro',
  },
  GBP: {
    id: 'GBP',
    name: 'British Pound Sterling',
  },
  JPY: {
    id: 'JPY',
    name: 'Japanese Yen',
  },
  USD: {
    id: 'USD',
    name: 'US Dollar',
  },
};
