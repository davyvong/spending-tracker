import { currencyEnum } from 'constants/currency';
import { Schema, Types } from 'mongoose';
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
        validator: value => isNumeric(value.toString()),
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
    currency: {
      enum: currencyEnum,
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    items: [
      {
        amount: {
          required: true,
          type: Number,
          validate: {
            validator: value => isNumeric(value.toString()),
          },
        },
        description: {
          required: true,
          type: String,
          validate: {
            validator: value => !isEmpty(value),
          },
        },
      },
    ],
    postDate: {
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
      virtuals: true,
    },
    versionKey: false,
  },
);
