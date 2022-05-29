import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Material } from '../interface';

@ObjectType()
export class MaterialsPaginateResponse {
  @Field(() => Int)
  readonly pagesCount: number;

  @Field(() => [Material])
  readonly materials: Material[];
}
