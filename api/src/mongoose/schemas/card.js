import { cardTypeEnum } from 'constants/card';
import { currencyEnum } from 'constants/currency';
import { Schema, Types } from 'mongoose';
import { isEmpty } from 'validator';

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
    color: {
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    company: {
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    createTime: {
      required: true,
      type: Number,
    },
    currencyCode: {
      enum: currencyEnum,
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    name: {
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    type: {
      enum: cardTypeEnum,
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
  },
);
