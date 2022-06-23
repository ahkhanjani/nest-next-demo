import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MaterialFormSchema {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly createdAt: Date;

  @Field({ nullable: true })
  readonly updatedAt: Date;

  @Field()
  readonly title: string;

  @Field()
  readonly strSchema: string;
}

export type MaterialFormSchemaModel = MaterialFormSchema & Document;
