import { Field, ObjectType } from '@nestjs/graphql';
import { CreatedMaterial } from '../interface';

@ObjectType()
export class CreateMaterialsResponse {
  @Field()
  readonly message?: string;

  @Field(() => [CreatedMaterial])
  readonly createdMaterials?: CreatedMaterial[];
}
