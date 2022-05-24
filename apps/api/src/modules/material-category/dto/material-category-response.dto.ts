import { Field, ObjectType } from '@nestjs/graphql';
// intefaces
import { MaterialCategory } from '../interfaces/material-category.interface';

@ObjectType()
export class MaterialCategoryResponse {
  @Field(() => MaterialCategory, { nullable: true })
  readonly category?: MaterialCategory;

  @Field({ nullable: true })
  readonly message?: string;
}
