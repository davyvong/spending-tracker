// Source: https://gist.github.com/Fluidbyte/2973986

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

export const getCurrency = currencyCode => currencyMap[currencyCode];

export const getSupportedCurrencies = () => ['AUD', 'BTC', 'CAD', 'CHF', 'CNY', 'ETH', 'EUR', 'GBP', 'JPY', 'USD'];

export const currencyOptions = getSupportedCurrencies().map(currencyCode => {
  const currency = getCurrency(currencyCode);
  return {
    label: `${currency.id} (${currency.name})`,
    value: currency.id,
  };
});
