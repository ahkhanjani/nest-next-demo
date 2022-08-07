import { ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Enum } from '../../enum/interface/enum.interface';

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

  @Prop({ type: () => ID })
  statusId: string;

  @Prop({ type: () => Enum })
  status: Enum;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
