import { Field, ObjectType } from '@nestjs/graphql';
import { Material } from './material.interface';

@ObjectType()
export class CreatedMaterial {
  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  materialTitle?: string;

  @Field(() => Material)
  createdMaterial?: Material;
}
