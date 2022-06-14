import { Field, ObjectType } from '@nestjs/graphql';
import { Material } from '../interface/material.interface';
import { FailedMaterialResponse } from './failed-material-response.dto';

@ObjectType()
export class CreateMaterialsResponse {
  @Field(() => [FailedMaterialResponse])
  readonly failedMaterials?: FailedMaterialResponse[];

  @Field(() => [Material])
  readonly createdMaterials?: Material[];

  @Field(() => [String])
  readonly errors?: string[];
}
