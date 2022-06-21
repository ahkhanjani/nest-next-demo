import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateMaterialCategoryResponse {
  @Field({ defaultValue: false })
  readonly success?: boolean;

  @Field({ nullable: true })
  readonly error?: string;
}
