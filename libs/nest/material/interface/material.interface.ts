import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { MaterialStatusPolicy, MaterialTypePolicy } from '.';

@ObjectType()
export class Material {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly type: MaterialTypePolicy;

  @Field()
  readonly title: string;

  @Field()
  readonly status: MaterialStatusPolicy;

  @Field(() => [ID])
  readonly category: string[];

  @Field()
  readonly formData: string;
}

export type MaterialModel = Material & Document;
