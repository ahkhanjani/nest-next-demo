import { ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/interface/user.interface';

@Schema()
class Session {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: () => ID })
  studentId: string;

  @Prop({ type: () => User })
  student: User;

  @Prop({ type: () => ID })
  teacherId: string;

  @Prop({ type: () => User })
  teacher: User;

  @Prop()
  date: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
