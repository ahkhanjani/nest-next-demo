import { ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../../user/interface/user.interface';
import { SessionState } from '../enums/session-state.enum';

@Schema()
class Session {
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: () => [ID] })
  participantIds: string[];

  @Prop()
  date: Date;

  @Prop({ type: () => SessionState })
  state: SessionState;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
