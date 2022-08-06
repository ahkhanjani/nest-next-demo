import type { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/interface/user.interface';

@ObjectType()
export class Enum {
  @Field(() => ID)
  readonly id: string;

  @Field(() => Date)
  readonly createdAt: Date;

  @Field(() => Date)
  readonly updatedAt: Date;

  @Field(() => ID)
  readonly creatorId: string;

  @Field(() => User)
  readonly creator: User;

  @Field({
    description:
      'The title of the enum that the value is for. Example: "user-role"',
  })
  readonly enumTitle: string;

  @Field({ description: 'The value for this enum item. Example: "admin"' })
  readonly value: string;
}

export type EnumModel = Enum & Document;
