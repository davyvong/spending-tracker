import { getCurrency } from 'constants/currencies';
import PropTypes from 'prop-types';

export default class Barcode {
  static propTypes = PropTypes.shape({
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    format: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
  });

  constructor(data) {
    Object.assign(this, data);
  }

  getFormattedAmount(locale) {
    const currency = getCurrency(this.currency);
    return locale.toCurrency(this.amount, { precision: currency?.precision, unit: '' });
  }
}
