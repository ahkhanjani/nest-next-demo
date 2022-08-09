import type { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/interface/user.interface';
import { Enum } from '../../enum/interface/enum.interface';

@ObjectType()
export class Session {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;

  @Field(() => ID)
  readonly studentId: string;

  @Field(() => User)
  readonly student: User;

  @Field(() => ID)
  readonly teacherId: string;

  @Field(() => User)
  readonly teacher: User;

  @Field()
  readonly date: Date;

  @Field(() => ID)
  readonly statusId: string;

  @Field(() => Enum)
  readonly status: Enum;
}

export type SessionModel = Session & Document;
