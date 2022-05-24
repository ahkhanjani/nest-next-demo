// nest
import { Field, ID, ObjectType } from '@nestjs/graphql';
// others
import { Document } from 'mongoose';

@ObjectType()
export class MaterialCategory {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly title: string;

  @Field(() => ID, { nullable: true })
  readonly parentId: string;
}

export type MaterialCategoryModel = MaterialCategory & Document;
