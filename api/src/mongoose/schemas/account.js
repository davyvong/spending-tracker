import { colorSchemeEnum } from 'constants/color-scheme';
import { currencyEnum } from 'constants/currency';
import { Schema } from 'mongoose';
import { isEmail, isEmpty } from 'validator';

export default new Schema(
  {
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
    theme: {
      enum: colorSchemeEnum,
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    updateTime: {
      minLength: 6,
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
