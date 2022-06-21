import { Field, ObjectType } from '@nestjs/graphql';
import { MaterialCategory } from '../interface/material-category.interface';
// intefaces

@ObjectType()
export class CreateMaterialCategoryResponse {
  @Field(() => MaterialCategory, { nullable: true })
  readonly materialCategory?: MaterialCategory;

  @Field({ nullable: true })
  readonly message?: string;
}
