import { Schema } from 'mongoose';
import { isEmpty } from 'validator';

export default new Schema(
  {
    icon: {
      required: true,
      type: String,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
    name: {
      index: true,
      required: true,
      type: String,
      unique: true,
      validate: {
        validator: value => !isEmpty(value),
      },
    },
  },
  {
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  },
);
