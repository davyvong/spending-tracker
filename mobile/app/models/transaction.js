import { getCurrency } from 'constants/currencies';
import PropTypes from 'prop-types';

export default class Transaction {
  static propTypes = PropTypes.shape({
    amount: PropTypes.number,
    cardId: PropTypes.string,
    categoryId: PropTypes.string,
    currency: PropTypes.string,
    id: PropTypes.string,
    icon: PropTypes.string,
    postDate: PropTypes.string,
    vendor: PropTypes.string,
  });

  constructor(data) {
    Object.assign(this, data);
  }

  get isCredit() {
    return this.amount > 0;
  }

  get isDebit() {
    return this.amount < 0;
  }

  getFormattedAmount(locale) {
    const currency = getCurrency(this.currency);
    const amount = locale.toCurrency(this.amount, { precision: currency?.precision, unit: '' });
    if (this.amount === 0) {
      return amount;
    }
    return `${this.isCredit ? '+' : ''}${amount}`;
  }
}
