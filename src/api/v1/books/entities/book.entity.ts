import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop()
  title: string;
  @Prop()
  author: string;
  @Prop()
  publisher: string;
  @Prop()
  lengthInPages: string;
  @Prop()
  publishedIn: string;
  @Prop([String])
  topic: string[];
  @Prop([String])
  format: string[];
  @Prop()
  isAvailable:boolean
}

export const BookSchema = SchemaFactory.createForClass(Book);
