import { Field, ObjectType } from '@nestjs/graphql';
// intefaces
import { MaterialCategory } from '../interface';

@ObjectType()
export class CreateMaterialCategoryResponse {
  @Field(() => MaterialCategory, { nullable: true })
  readonly materialCategory?: MaterialCategory;

  @Field({ nullable: true })
  readonly message?: string;
}
