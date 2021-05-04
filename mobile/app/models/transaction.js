export default class Transaction {
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
