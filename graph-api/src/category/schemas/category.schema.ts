import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ versionKey: false })
class CategoryDocument extends Document {
  @Prop({ required: true })
  icon: string;

  @Prop({ index: true, required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDocument);
