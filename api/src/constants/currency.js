const currencyMap = {
  AUD: {
    id: 'AUD',
    name: 'Australian Dollar',
  },
  BTC: {
    id: 'BTC',
    name: 'Bitcoin',
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
  ETH: {
    id: 'ETH',
    name: 'Ethereum',
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

export const currencyEnum = Object.keys(currencyMap);

export const getCurrency = currencyCode => currencyMap[currencyCode];
