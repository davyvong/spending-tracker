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
    postTime: PropTypes.string,
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

  get sign() {
    return this.isCredit ? '+' : '-';
  }
}
