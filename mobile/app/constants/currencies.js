// Source: https://gist.github.com/Fluidbyte/2973986

const currencyMap = {
  AUD: {
    cryptocurrency: false,
    id: 'AUD',
    name: 'Australian Dollar',
    precision: 2,
  },
  BTC: {
    cryptocurrency: true,
    id: 'BTC',
    name: 'Bitcoin',
    precision: 8,
  },
  CAD: {
    cryptocurrency: false,
    id: 'CAD',
    name: 'Canadian Dollar',
    precision: 2,
  },
  CHF: {
    cryptocurrency: false,
    id: 'CHF',
    name: 'Swiss Franc',
    precision: 2,
  },
  CNY: {
    cryptocurrency: false,
    id: 'CNY',
    name: 'Chinese Yuan',
    precision: 2,
  },
  ETH: {
    cryptocurrency: true,
    id: 'ETH',
    name: 'Ethereum',
    precision: 8,
  },
  EUR: {
    cryptocurrency: false,
    id: 'EUR',
    name: 'Euro',
    precision: 2,
  },
  GBP: {
    cryptocurrency: false,
    id: 'GBP',
    name: 'British Pound Sterling',
    precision: 2,
  },
  JPY: {
    cryptocurrency: false,
    id: 'JPY',
    name: 'Japanese Yen',
    precision: 2,
  },
  USD: {
    cryptocurrency: false,
    id: 'USD',
    name: 'US Dollar',
    precision: 2,
  },
};

export const getCurrency = currencyCode => currencyMap[currencyCode];

export const getSupportedCurrencies = () => ['AUD', 'BTC', 'CAD', 'CHF', 'CNY', 'ETH', 'EUR', 'GBP', 'JPY', 'USD'];

export const currencyOptions = getSupportedCurrencies().map(currencyCode => {
  const currency = getCurrency(currencyCode);
  return {
    label: `${currency.id} (${currency.name})`,
    value: currency.id,
  };
});
