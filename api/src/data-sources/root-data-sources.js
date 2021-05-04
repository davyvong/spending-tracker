import CurrencyDataSource from 'data-sources/api/currency';
import VendorDataSource from 'data-sources/api/vendor';
import AccountDataSource from 'data-sources/mongo/account';
import CardDataSource from 'data-sources/mongo/card';
import CategoryDataSource from 'data-sources/mongo/category';
import TransactionDataSource from 'data-sources/mongo/transaction';
import AccountSchema from 'mongoose/schemas/account';
import CardSchema from 'mongoose/schemas/card';
import CategorySchema from 'mongoose/schemas/category';
import TransactionSchema from 'mongoose/schemas/transaction';

export default mongoose => ({
  account: new AccountDataSource(mongoose.model('Account', AccountSchema)),
  card: new CardDataSource(mongoose.model('Card', CardSchema)),
  category: new CategoryDataSource(mongoose.model('Category', CategorySchema)),
  currency: new CurrencyDataSource(),
  transaction: new TransactionDataSource(mongoose.model('Transaction', TransactionSchema)),
  vendor: new VendorDataSource(),
});
