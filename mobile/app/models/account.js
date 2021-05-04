export default class Account {
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
