// Source: https://gist.github.com/Fluidbyte/2973986

const currencyMap = {
  AUD: {
    id: 'AUD',
    name: 'Australian Dollar',
    precision: 2,
  },
  CAD: {
    id: 'CAD',
    name: 'Canadian Dollar',
    precision: 2,
  },
  CHF: {
    id: 'CHF',
    name: 'Swiss Franc',
    precision: 2,
  },
  CNY: {
    id: 'CNY',
    name: 'Chinese Yuan',
    precision: 2,
  },
  EUR: {
    id: 'EUR',
    name: 'Euro',
    precision: 2,
  },
  GBP: {
    id: 'GBP',
    name: 'British Pound Sterling',
    precision: 2,
  },
  JPY: {
    id: 'JPY',
    name: 'Japanese Yen',
    precision: 2,
  },
  USD: {
    id: 'USD',
    name: 'US Dollar',
    precision: 2,
  },
};

export const getCurrency = currencyCode => currencyMap[currencyCode];

export const getSupportedCurrencies = () => ['AUD', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'JPY', 'USD'];

export const currencyOptions = getSupportedCurrencies().map(currencyCode => {
  const currency = getCurrency(currencyCode);
  return {
    label: `${currency.id} (${currency.name})`,
    value: currency.id,
  };
});
