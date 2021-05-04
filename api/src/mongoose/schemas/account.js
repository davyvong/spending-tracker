import { Schema } from 'mongoose';

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
    },
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    passwordHash: {
      required: true,
      type: String,
    },
    preferredCurrency: {
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
