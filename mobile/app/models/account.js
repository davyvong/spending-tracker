import PropTypes from 'prop-types';

export default class Account {
  static propTypes = PropTypes.shape({
    currencyCode: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.string,
    lastName: PropTypes.string,
  });

  constructor(data) {
    Object.assign(this, data);
  }

  get fullName() {
    if (!this.firstName) {
      return this.lastName;
    }
    if (!this.lastName) {
      return this.firstName;
    }
    return `${this.firstName} ${this.lastName}`;
  }
}
