import PropTypes from 'prop-types';

export default class Card {
  static propTypes = PropTypes.shape({
    color: PropTypes.string,
    company: PropTypes.string,
    currency: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    visible: PropTypes.bool,
  });

  constructor(data) {
    Object.assign(this, data);
  }
}
