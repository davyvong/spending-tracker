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
    attributes: [
      {
        name: {
          required: true,
          type: String,
          validate: {
            validator: value => !isEmpty(value),
          },
        },
        value: {
          required: true,
          type: String,
          validate: {
            validator: value => !isEmpty(value),
          },
        },
      },
    ],
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
    updateTime: {
      required: true,
      type: Number,
    },
    value: {
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
