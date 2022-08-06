import { Field, ID, ObjectType } from '@nestjs/graphql';
import type { Document } from 'mongoose';

@ObjectType()
export class MaterialCategory {
  @Field(() => ID)
  readonly id: string;

  @Field({ defaultValue: new Date() })
  readonly createdAt: Date;

  @Field()
  readonly title: string;

  @Field(() => ID, { nullable: true })
  readonly parentId: string;
}

export type MaterialCategoryModel = MaterialCategory & Document;
