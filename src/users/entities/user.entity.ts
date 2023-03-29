import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

@Schema()
export class User extends Document {
  @Prop()
  email: string;
  
  @Prop()
  password: string;

  @Prop({enum:Role, default:Role.Regular})
  role:Role
}

export const UserSchema = SchemaFactory.createForClass(User);
