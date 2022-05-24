import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Material } from '../interfaces/material.interface';

@ObjectType()
export class MaterialPaginateResponse {
  @Field(() => Int)
  readonly pagesCount: number;

  @Field(() => [Material])
  readonly materials: Material[];
}
