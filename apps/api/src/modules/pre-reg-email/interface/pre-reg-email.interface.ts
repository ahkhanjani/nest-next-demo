import type { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PreRegEmail {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly email: string;
}

export type PreRegEmailModel = PreRegEmail & Document;
