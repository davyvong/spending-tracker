import { Schema, Types } from 'mongoose';
import { getCurrency } from 'utils/currency';
import { isEmpty, isNumeric } from 'validator';

export default new Schema(
  {
    accountId: {
      index: true,
      ref: 'Account',
      required: true,
      type: Schema.Types.ObjectId,
      validate: {
        validator: value => Types.ObjectId.isValid(value),
      },
    },
    amount: {
      required: true,
      type: Number,
      validate: {
        validator: value => isNumeric(value) && value >= 0,
      },
    },
    cardId: {
      index: true,
      ref: 'Card',
      required: true,
      type: Schema.Types.ObjectId,
      validate: {
        validator: value => Types.ObjectId.isValid(value),
      },
    },
    categoryId: {
      index: true,
      ref: 'Category',
      required: true,
      type: Schema.Types.ObjectId,
      validate: {
        validator: value => Types.ObjectId.isValid(value),
      },
    },
    createTime: {
      required: true,
      type: Number,
    },
    currencyCode: {
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value) && getCurrency(value),
      },
    },
    description: {
      type: String,
    },
    postTime: {
      index: true,
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    type: {
      index: true,
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    updateTime: {
      required: true,
      type: Number,
    },
    vendor: {
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
  },
  {
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  },
);
