import { Schema } from 'mongoose';
import { getCurrency } from 'utils/currency';
import { isEmail, isEmpty } from 'validator';

export default new Schema(
  {
    createTime: {
      required: true,
      type: Number,
    },
    email: {
      index: true,
      required: true,
      type: String,
      unique: true,
      validate: {
        validator: value => !isEmpty(value) && isEmail(value),
      },
    },
    firstName: {
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    lastName: {
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    passwordHash: {
      required: true,
      type: String,
    },
    preferredCurrency: {
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value) && getCurrency(value),
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
