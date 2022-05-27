import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Material } from '../interface';

@ObjectType()
export class MaterialPaginateResponse {
  @Field(() => Int)
  readonly pagesCount: number;

  @Field(() => [Material])
  readonly materials: Material[];
}
