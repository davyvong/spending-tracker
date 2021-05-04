import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false })
class CardDocument extends Document {
  @Prop({ index: true, ref: 'accounts', required: true, type: MongooseSchema.Types.ObjectId })
  accountId: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  createTime: number;

  @Prop({ required: true })
  name: string;

  @Prop({ index: true, required: true })
  type: string;

  @Prop({ required: true })
  updateTime: number;
}

export const CardSchema = SchemaFactory.createForClass(CardDocument);
