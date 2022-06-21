import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MaterialCategory } from '../interface/material-category.interface';

@ObjectType()
export class MaterialCategoriesPaginateResponse {
  @Field(() => Int)
  readonly pagesCount: number;

  @Field(() => [MaterialCategory])
  readonly materialCategories: MaterialCategory[];
}
