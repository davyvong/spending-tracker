import { Schema, Types } from 'mongoose';
import { getCardType } from 'utils/card';
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
    name: {
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
        validator: value => !isEmpty(value) || getCardType(value),
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
