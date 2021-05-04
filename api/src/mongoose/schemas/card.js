import { Schema } from 'mongoose';

export default new Schema(
  {
    accountId: {
      index: true,
      ref: 'Account',
      required: true,
      type: Schema.Types.ObjectId,
    },
    color: {
      required: true,
      type: String,
    },
    company: {
      required: true,
      type: String,
    },
    createTime: {
      required: true,
      type: Number,
    },
    name: {
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
  },
  {
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  },
);
