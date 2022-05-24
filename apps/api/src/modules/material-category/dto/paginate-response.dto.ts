import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MaterialCategory } from '../interfaces/material-category.interface';

@ObjectType()
export class PaginateResponse {
  @Field(() => Int)
  readonly pagesCount: number;

  @Field(() => [MaterialCategory])
  readonly categories: MaterialCategory[];
}
