import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateMaterialResponse {
  @Field()
  readonly message: string;
}
