import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MaterialFormSchema {
  @Field(() => ID)
  readonly id: string;

  @Field({ defaultValue: new Date() })
  readonly createdAt: Date;

  @Field()
  readonly strSchema: string;
}

export type MaterialFormSchemaModel = MaterialFormSchema & Document;
