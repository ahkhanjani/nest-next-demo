import { Field, ID, ObjectType } from '@nestjs/graphql';
import type { Document } from 'mongoose';

@ObjectType()
export class Material {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly type: string;

  @Field()
  readonly title: string;

  @Field()
  readonly status: string;

  @Field(() => [ID])
  readonly category: string[];

  @Field()
  readonly formData: string;
}

export type MaterialModel = Material & Document;
