import { ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Session {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: () => ID })
  studentId: string;

  @Prop({ type: () => ID })
  teacherId: string;

  @Prop()
  date: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
