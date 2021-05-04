import { Schema } from 'mongoose';

export default new Schema(
  {
    icon: {
      required: true,
      type: String,
    },
    name: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  },
);
