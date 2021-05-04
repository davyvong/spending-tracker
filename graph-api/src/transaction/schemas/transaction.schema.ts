import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false })
class TransactionDocument extends Document {
  @Prop({ index: true, ref: 'accounts', required: true, type: MongooseSchema.Types.ObjectId })
  accountId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ index: true, ref: 'cards', required: true, type: MongooseSchema.Types.ObjectId })
  cardId: string;

  @Prop({ index: true, ref: 'categories', required: true, type: MongooseSchema.Types.ObjectId })
  categoryId: string;

  @Prop({ required: true })
  createTime: number;

  @Prop({ required: true })
  currencyCode: string;

  @Prop()
  description: string;

  @Prop({ index: true, required: true })
  postTime: string;

  @Prop({ index: true, required: true })
  type: string;

  @Prop({ required: true })
  updateTime: number;

  @Prop({ required: true })
  vendor: string;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionDocument);

TransactionSchema.index({ vendor: 'text' });
