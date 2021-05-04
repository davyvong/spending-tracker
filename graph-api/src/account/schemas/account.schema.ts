import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
class AccountDocument extends Document {
  @Prop({ required: true })
  createTime: number;

  @Prop({ index: true, lowercase: true, required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  preferredCurrency: string;

  @Prop({ required: true })
  updateTime: number;
}

export const AccountSchema = SchemaFactory.createForClass(AccountDocument);
