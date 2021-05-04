import { Schema } from 'mongoose';

export default new Schema(
  {
    accountId: {
      index: true,
      ref: 'Account',
      required: true,
      type: Schema.Types.ObjectId,
    },
    amount: {
      min: 0,
      required: true,
      type: Number,
    },
    cardId: {
      index: true,
      ref: 'Card',
      required: true,
      type: Schema.Types.ObjectId,
    },
    categoryId: {
      index: true,
      ref: 'Category',
      required: true,
      type: Schema.Types.ObjectId,
    },
    createTime: {
      required: true,
      type: Number,
    },
    currencyCode: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },
    postTime: {
      index: true,
      required: true,
      type: String,
    },
    type: {
      index: true,
      required: true,
      type: String,
    },
    updateTime: {
      required: true,
      type: Number,
    },
    vendor: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  },
);
