import { getCurrency } from 'constants/currencies';
import PropTypes from 'prop-types';

export default class Transaction {
  static propTypes = PropTypes.shape({
    amount: PropTypes.number,
    cardId: PropTypes.string,
    categoryId: PropTypes.string,
    currencyCode: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    icon: PropTypes.string,
    postDate: PropTypes.string,
    type: PropTypes.string,
    vendor: PropTypes.string,
  });

  constructor(data) {
    Object.assign(this, data);
  }

  get isCredit() {
    return this.type === 'credit';
  }

  get isDebit() {
    return this.type === 'debit';
  }

  getFormattedAmount(locale) {
    const currency = getCurrency(this.currencyCode);
    const amount = locale.toCurrency(this.amount, { precision: currency?.precision, unit: '' });
    if (this.amount === 0) {
      return amount;
    }
    return `${this.isCredit ? '+' : '-'}${amount}`;
  }
}
