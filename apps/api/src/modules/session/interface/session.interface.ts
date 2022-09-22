import type { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/interface/user.interface';
import { SessionState } from '../enums/session-state.enum';

@ObjectType()
export class Session {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;

  @Field(() => [ID])
  readonly participantIds: string[];

  @Field(() => [User])
  readonly participants: User[];

  @Field()
  readonly date: Date;

  @Field(() => SessionState)
  readonly state: SessionState;
}

export type SessionModel = Session & Document;
