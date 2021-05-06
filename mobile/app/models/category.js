import PropTypes from 'prop-types';

export default class Category {
  static propTypes = PropTypes.shape({
    icon: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  });

  constructor(data) {
    Object.assign(this, data);
  }
}
